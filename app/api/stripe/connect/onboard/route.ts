import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { query } from '@/lib/db';

/**
 * POST /api/stripe/connect/onboard
 * Creates a Stripe Connect Express account for a club and returns an onboarding URL.
 * Direct charge model — DashClub never touches club funds.
 */
export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  let clubId: number;
  let email: string;
  let clubName: string;

  try {
    const body = await req.json();
    clubId = body.clubId;
    email = body.email;
    clubName = body.clubName;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!clubId || !email || !clubName) {
    return NextResponse.json({ error: 'Missing required fields: clubId, email, clubName' }, { status: 400 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://triflow.nanocorp.app';

  try {
    // Check if account already exists for this club
    const existing = await query<{ stripe_connect_account_id: string | null }>(
      'SELECT stripe_connect_account_id FROM clubs WHERE id = $1',
      [clubId]
    );

    if (!existing.length) {
      return NextResponse.json({ error: 'Club not found' }, { status: 404 });
    }

    let accountId = existing[0].stripe_connect_account_id;

    if (!accountId) {
      // Create a new Stripe Connect Express account
      const account = await stripe.accounts.create({
        type: 'express',
        country: 'FR',
        email: email,
        business_profile: {
          name: clubName,
          mcc: '7941', // Sports clubs / associations
        },
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
      });

      accountId = account.id;

      // Store account ID and update status to 'pending'
      await query(
        `UPDATE clubs SET stripe_connect_account_id = $1, stripe_connect_status = 'pending' WHERE id = $2`,
        [accountId, clubId]
      );
    }

    // Create a fresh onboarding link
    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${siteUrl}/admin/stripe-connect?refresh=true`,
      return_url: `${siteUrl}/admin/stripe-connect?success=true`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[stripe/connect/onboard] Error:', msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
