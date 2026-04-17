import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return NextResponse.json({ error: 'STRIPE_SECRET_KEY not set' }, { status: 500 });

  const p19 = process.env.STRIPE_PRICE_19;
  const p49 = process.env.STRIPE_PRICE_49;
  const p99 = process.env.STRIPE_PRICE_99;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  try {
    const stripe = new Stripe(key, { httpClient: Stripe.createFetchHttpClient(), maxNetworkRetries: 0 });
    const prices = await stripe.prices.list({ limit: 1 });
    return NextResponse.json({
      ok: true,
      keyPrefix: key.slice(0, 12),
      STRIPE_PRICE_19: p19,
      STRIPE_PRICE_49: p49,
      STRIPE_PRICE_99: p99,
      NEXT_PUBLIC_SITE_URL: siteUrl,
      stripeConnected: true,
      pricesCount: prices.data.length,
    });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      keyPrefix: key.slice(0, 12),
      STRIPE_PRICE_19: p19,
      STRIPE_PRICE_49: p49,
      STRIPE_PRICE_99: p99,
      NEXT_PUBLIC_SITE_URL: siteUrl,
      error: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
