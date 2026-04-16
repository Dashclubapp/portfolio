import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleSuccessfulSubscription } from '@/lib/onboarding';

/**
 * NanoCorp webhook handler — receives checkout.session.completed events
 * forwarded by NanoCorp from Stripe.
 *
 * Payload format:
 * {
 *   event_type: "checkout.session.completed",
 *   payment: {
 *     amount_cents: 1900,
 *     currency: "eur",
 *     customer_email: "...",
 *     stripe_session_id: "cs_..."
 *   }
 * }
 */
export async function POST(req: NextRequest) {
  let body: {
    event_type: string;
    payment?: {
      amount_cents?: number;
      currency?: string;
      customer_email?: string;
      stripe_session_id?: string;
    };
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  // Only handle checkout.session.completed
  if (body.event_type !== 'checkout.session.completed') {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const stripeSessionId = body.payment?.stripe_session_id;
  if (!stripeSessionId) {
    console.error('[webhook/nanocorp] Missing stripe_session_id');
    return NextResponse.json({ error: 'Missing stripe_session_id' }, { status: 400 });
  }

  // Fetch full Stripe session to get metadata (nom, prenom, club, etc.)
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('[webhook/nanocorp] STRIPE_SECRET_KEY not configured');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(stripeSessionId, {
      expand: ['subscription'],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[webhook/nanocorp] Failed to fetch Stripe session:', msg);
    return NextResponse.json({ error: `Failed to fetch session: ${msg}` }, { status: 500 });
  }

  const metadata = session.metadata ?? {};
  const email = session.customer_email ?? body.payment?.customer_email ?? '';

  if (!email) {
    console.error('[webhook/nanocorp] No customer email found');
    return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
  }

  const subscription = session.subscription as Stripe.Subscription | null;

  // Run onboarding asynchronously so webhook returns fast (< 5s)
  // We respond 200 immediately, then process in background
  const onboardingPromise = handleSuccessfulSubscription({
    nom: metadata.nom ?? '',
    prenom: metadata.prenom ?? '',
    email,
    telephone: metadata.telephone ?? '',
    club: metadata.club ?? email.split('@')[0],
    sport: metadata.sport ?? '',
    ville: metadata.ville ?? '',
    formule: metadata.formule ?? 'essentiel',
    stripeSubscriptionId: typeof subscription === 'object' && subscription !== null ? subscription.id : undefined,
    stripeCustomerId: typeof session.customer === 'string' ? session.customer : undefined,
  }).catch((err) => {
    console.error('[webhook/nanocorp] Onboarding failed:', err);
  });

  // In serverless environments we can use waitUntil if available,
  // otherwise the promise runs in the same request lifecycle
  // (Vercel's Node.js runtime keeps the function alive until promises settle)
  if (typeof (globalThis as { EdgeRuntime?: unknown }).EdgeRuntime === 'undefined') {
    // Node.js runtime: await to ensure completion within the request
    await onboardingPromise;
  }

  return NextResponse.json({ ok: true });
}
