import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { handleSuccessfulSubscription } from '@/lib/onboarding';

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey) {
    console.error('[webhook/stripe] STRIPE_SECRET_KEY not configured');
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey);

  // Read raw body for signature verification
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  if (webhookSecret && signature) {
    // Production: verify signature
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[webhook/stripe] Signature verification failed:', msg);
      return NextResponse.json({ error: `Webhook signature invalid: ${msg}` }, { status: 400 });
    }
  } else {
    // Dev mode without webhook secret: parse directly (stripe listen --forward-to)
    try {
      event = JSON.parse(rawBody) as Stripe.Event;
    } catch {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    console.warn('[webhook/stripe] No STRIPE_WEBHOOK_SECRET — skipping signature check (dev mode)');
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const metadata = session.metadata ?? {};
  const email = session.customer_email ?? metadata.email ?? '';

  if (!email) {
    console.error('[webhook/stripe] No customer email found');
    return NextResponse.json({ error: 'Missing customer email' }, { status: 400 });
  }

  // Fetch full session to get subscription details
  let fullSession: Stripe.Checkout.Session;
  try {
    fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ['subscription'],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[webhook/stripe] Failed to expand session:', msg);
    fullSession = session;
  }

  const subscription = fullSession.subscription as Stripe.Subscription | null;

  await handleSuccessfulSubscription({
    nom: metadata.nom ?? '',
    prenom: metadata.prenom ?? '',
    email,
    telephone: metadata.telephone ?? '',
    club: metadata.club ?? email.split('@')[0],
    sport: metadata.sport ?? '',
    ville: metadata.ville ?? '',
    formule: metadata.formule ?? 'essentiel',
    website_url: metadata.website_url ?? '',
    instagram_url: metadata.instagram_url ?? '',
    facebook_url: metadata.facebook_url ?? '',
    social_placement: metadata.social_placement ?? 'footer',
    stripeSubscriptionId:
      typeof subscription === 'object' && subscription !== null ? subscription.id : undefined,
    stripeCustomerId:
      typeof fullSession.customer === 'string' ? fullSession.customer : undefined,
  }).catch((err) => {
    console.error('[webhook/stripe] Onboarding failed:', err);
  });

  return NextResponse.json({ ok: true });
}
