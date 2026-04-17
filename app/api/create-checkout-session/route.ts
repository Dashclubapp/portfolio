import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

// Required environment variables (Vercel project settings + .env.local):
//
// STRIPE_SECRET_KEY=sk_live_xxx   (or sk_test_xxx for testing)
// STRIPE_PRICE_19=price_xxx       ← Stripe Price ID for 19€/month recurring (Essentiel)
// STRIPE_PRICE_49=price_xxx       ← Stripe Price ID for 49€/month recurring (Compétition)
// STRIPE_PRICE_99=price_xxx       ← Stripe Price ID for 99€/month recurring (Illimité)
// NEXT_PUBLIC_SITE_URL=https://triflow.nanocorp.app
//
// To create Price IDs in Stripe Dashboard (account: acct_1TMUfYEKm4b9BxhY):
// 1. Go to Products > Add Product
// 2. "DashClub Essentiel"    → 19.00 EUR → Monthly recurring → copy Price ID → STRIPE_PRICE_19
// 3. "DashClub Compétition"  → 49.00 EUR → Monthly recurring → copy Price ID → STRIPE_PRICE_49
// 4. "DashClub Illimité"     → 99.00 EUR → Monthly recurring → copy Price ID → STRIPE_PRICE_99

const PRICE_IDS: Record<string, string | undefined> = {
  essentiel: process.env.STRIPE_PRICE_19 ?? process.env.STRIPE_PRICE_ESSENTIEL,
  competition: process.env.STRIPE_PRICE_49 ?? process.env.STRIPE_PRICE_SAISON,
  saison: process.env.STRIPE_PRICE_49 ?? process.env.STRIPE_PRICE_SAISON, // rétrocompatibilité
  illimite: process.env.STRIPE_PRICE_99 ?? process.env.STRIPE_PRICE_ILLIMITE,
};

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: 'Configuration Stripe manquante. Contactez hello@dashclub.fr' },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    httpClient: Stripe.createFetchHttpClient(),
  });

  let body: {
    formule: string;
    email: string;
    nom: string;
    prenom: string;
    club: string;
    sport?: string;
    ville?: string;
    telephone?: string;
    current_domain?: string;
    want_new_domain?: boolean;
    website_url?: string;
    instagram_url?: string;
    facebook_url?: string;
    social_placement?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Corps de requête invalide' }, { status: 400 });
  }

  const { formule, email, nom, prenom, club, sport, ville, telephone,
          current_domain, want_new_domain,
          website_url, instagram_url, facebook_url, social_placement } = body;

  if (!formule || !email || !nom || !club) {
    return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 });
  }

  // Normaliser "saison" → "competition" pour rétrocompatibilité
  const normalizedFormule = formule === 'saison' ? 'competition' : formule;

  const rawPriceId = PRICE_IDS[normalizedFormule];
  if (!rawPriceId) {
    return NextResponse.json(
      {
        error: `Price ID Stripe pour la formule "${normalizedFormule}" non configuré. Veuillez contacter hello@dashclub.fr`,
      },
      { status: 500 }
    );
  }

  // Résoudre automatiquement prod_xxx → price_xxx
  let priceId = rawPriceId;
  if (rawPriceId.startsWith('prod_')) {
    try {
      const prices = await stripe.prices.list({ product: rawPriceId, active: true, type: 'recurring', limit: 1 });
      if (prices.data.length === 0) {
        return NextResponse.json(
          { error: `Aucun tarif récurrent actif trouvé pour le produit ${rawPriceId}. Créez un prix récurrent dans Stripe Dashboard.` },
          { status: 500 }
        );
      }
      priceId = prices.data[0].id;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur inconnue';
      return NextResponse.json({ error: `Erreur lors de la résolution du produit : ${message}` }, { status: 500 });
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dashclub.app';

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        { price: priceId, quantity: 1 },
        ...(want_new_domain && process.env.STRIPE_PRICE_DOMAIN
          ? [{ price: process.env.STRIPE_PRICE_DOMAIN, quantity: 1 }]
          : []),
      ],
      metadata: {
        nom,
        prenom,
        club,
        sport: sport ?? '',
        ville: ville ?? '',
        telephone: telephone ?? '',
        formule: normalizedFormule,
        current_domain: current_domain ?? '',
        want_new_domain: want_new_domain ? '1' : '0',
        website_url: website_url ?? '',
        instagram_url: instagram_url ?? '',
        facebook_url: facebook_url ?? '',
        social_placement: social_placement ?? 'footer',
      },
      subscription_data: {
        metadata: { nom, prenom, club, sport: sport ?? '', ville: ville ?? '', telephone: telephone ?? '' },
      },
      success_url: `${siteUrl}/welcome?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/register`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur Stripe inconnue';
    return NextResponse.json({ error: `Erreur lors de la création de la session : ${message}` }, { status: 500 });
  }
}
