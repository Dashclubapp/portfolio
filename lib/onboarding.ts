import { query } from './db';
import { randomBytes } from 'crypto';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ClubData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  club: string;
  sport: string;
  ville: string;
  formule: string;
  slug: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

// ─── Slug generation ─────────────────────────────────────────────────────────

export async function generateUniqueSubdomain(clubName: string): Promise<string> {
  const slug = clubName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);

  let counter = 1;
  let finalSlug = slug;
  while (await subdomainExists(finalSlug)) {
    finalSlug = `${slug}-${counter}`;
    counter++;
  }

  return finalSlug;
}

async function subdomainExists(slug: string): Promise<boolean> {
  const rows = await query<{ count: string }>(
    'SELECT COUNT(*) as count FROM club_domains WHERE subdomain = $1',
    [slug]
  );
  return parseInt(rows[0].count, 10) > 0;
}

// ─── Create club in DB ────────────────────────────────────────────────────────

export async function createClubInDB(data: ClubData): Promise<number> {
  // Upsert: if same email already exists (e.g. webhook retry), update instead
  const rows = await query<{ id: number }>(
    `INSERT INTO clubs (nom_club, sport, ville, nom_responsable, prenom_responsable, email, telephone, formule, stripe_subscription_id, stripe_customer_id, onboarding_status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')
     ON CONFLICT (email) DO UPDATE SET
       onboarding_status = EXCLUDED.onboarding_status,
       stripe_subscription_id = COALESCE(EXCLUDED.stripe_subscription_id, clubs.stripe_subscription_id),
       stripe_customer_id = COALESCE(EXCLUDED.stripe_customer_id, clubs.stripe_customer_id)
     RETURNING id`,
    [
      data.club,
      data.sport,
      data.ville,
      data.nom,
      data.prenom,
      data.email,
      data.telephone,
      data.formule,
      data.stripeSubscriptionId ?? null,
      data.stripeCustomerId ?? null,
    ]
  );
  return rows[0].id;
}

// ─── Create admin user ────────────────────────────────────────────────────────

export async function createAdminUser(params: {
  clubId: number;
  email: string;
  nom: string;
  prenom: string;
}): Promise<{ setupToken: string }> {
  const setupToken = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 72 * 60 * 60 * 1000); // 72h

  await query(
    `INSERT INTO club_admin_users (club_id, email, nom, prenom, setup_token, setup_token_expires_at)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (email) DO UPDATE SET
       setup_token = EXCLUDED.setup_token,
       setup_token_expires_at = EXCLUDED.setup_token_expires_at`,
    [params.clubId, params.email, params.nom, params.prenom, setupToken, expiresAt]
  );

  return { setupToken };
}

// ─── Provision club site ──────────────────────────────────────────────────────

export async function provisionClubSite(params: {
  clubId: number;
  slug: string;
  club: string;
  sport: string;
  ville: string;
}): Promise<void> {
  const { clubId, slug, club, sport, ville } = params;

  // Create subdomain record
  await query(
    `INSERT INTO club_domains (club_id, subdomain, custom_domain, created_at, activated_at)
     VALUES ($1, $2, NULL, NOW(), NOW())
     ON CONFLICT (subdomain) DO NOTHING`,
    [clubId, slug]
  );

  // Create default pages
  const pages = [
    {
      slug: 'accueil',
      titre: `Bienvenue sur le site de ${club}`,
      contenu: `Bienvenue sur le site officiel de **${club}** — votre club de ${sport || 'sport'} à ${ville || 'votre ville'}.\n\nRetrouvez ici toutes nos actualités, événements et informations pratiques.`,
    },
    {
      slug: 'evenements',
      titre: 'Événements',
      contenu: `Retrouvez tous les événements de ${club}.\n\n[CTA] Créer un événement → /admin/evenements/nouveau`,
    },
    {
      slug: 'contact',
      titre: 'Contact',
      contenu: `Contactez ${club}.\n\nUtilisez le formulaire ci-dessous pour nous envoyer un message. Nous vous répondrons dans les plus brefs délais.`,
    },
    {
      slug: 'agenda',
      titre: 'Agenda',
      contenu: `L'agenda de ${club} — tous nos événements et compétitions à venir.`,
    },
  ];

  for (const page of pages) {
    await query(
      `INSERT INTO club_pages (club_id, slug, titre, contenu, publie)
       VALUES ($1, $2, $3, $4, true)
       ON CONFLICT DO NOTHING`,
      [clubId, page.slug, page.titre, page.contenu]
    );
  }
}

// ─── Send welcome email ───────────────────────────────────────────────────────

export async function sendWelcomeEmail(params: {
  email: string;
  nom: string;
  prenom: string;
  club: string;
  slug: string;
  setupToken: string;
}): Promise<void> {
  const { email, nom, prenom, club, slug, setupToken } = params;
  const siteUrl = `https://${slug}.dashclub.app`;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dashclub.app';
  const setupUrl = `${baseUrl}/setup-password/${setupToken}`;

  const subject = `🎉 Bienvenue sur DashClub — activez votre accès ${club}`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #0D1F3C; padding: 32px 40px; text-align: center; }
    .header h1 { color: #C9A84C; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 32px 40px; }
    .greeting { font-size: 18px; font-weight: 600; color: #0D1F3C; margin-bottom: 16px; }
    .intro { color: #444; line-height: 1.6; margin-bottom: 24px; }
    .info-box { background: #f8f9fa; border-left: 4px solid #C9A84C; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; }
    .info-box .label { font-size: 12px; color: #8A9AB5; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .info-box .value { font-size: 15px; color: #0D1F3C; font-weight: 600; margin-bottom: 12px; }
    .info-box .value:last-child { margin-bottom: 0; }
    .creds-box { background: #0D1F3C; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; }
    .creds-box .creds-label { font-size: 12px; color: #C9A84C; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .creds-box .creds-value { font-size: 14px; color: white; margin-bottom: 6px; font-family: monospace; }
    .section-title { font-size: 14px; font-weight: 700; color: #0D1F3C; text-transform: uppercase; letter-spacing: 0.05em; margin: 28px 0 12px; }
    .step { display: flex; align-items: flex-start; margin-bottom: 16px; }
    .step-num { background: #C9A84C; color: white; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; margin-right: 12px; margin-top: 2px; }
    .step-content { color: #444; line-height: 1.5; }
    .step-content a { color: #0D1F3C; font-weight: 600; }
    .cta-btn { display: inline-block; background: #C9A84C; color: white; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 8px 0 24px; }
    .support { background: #f8f9fa; border-radius: 8px; padding: 20px 24px; color: #666; font-size: 14px; line-height: 1.6; }
    .footer { background: #0D1F3C; padding: 24px 40px; text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DashClub</h1>
      <p>Votre site club est en ligne 🚀</p>
    </div>
    <div class="body">
      <div class="greeting">Bonjour ${prenom} ${nom},</div>
      <p class="intro">
        Votre site DashClub est maintenant en ligne !<br>
        Voici tout ce dont vous avez besoin pour commencer.
      </p>

      <div class="info-box">
        <div class="label">URL de votre site</div>
        <div class="value">🌐 <a href="${siteUrl}">${siteUrl}</a></div>
        <div class="label">Accès backoffice</div>
        <div class="value">🔐 <a href="${siteUrl}/admin">${siteUrl}/admin</a></div>
      </div>

      <div class="creds-box">
        <div class="creds-label">🔑 Activez votre accès</div>
        <div class="creds-value" style="font-family:sans-serif;font-size:13px;">Cliquez sur le bouton ci-dessous pour créer votre mot de passe.<br>Ce lien est valable <strong style="color:#C9A84C">72 heures</strong>.</div>
      </div>

      <a href="${setupUrl}" class="cta-btn">Créer mon mot de passe →</a>

      <div class="section-title">Prochaines étapes</div>

      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <strong>Connectez votre compte Stripe</strong> pour recevoir les paiements de vos membres<br>
          <a href="${siteUrl}/admin/stripe">→ Configurer Stripe Connect</a>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <strong>Créez votre premier événement</strong><br>
          <a href="${siteUrl}/admin/evenements/nouveau">→ Créer un événement</a>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <strong>Découvrez votre guide de démarrage</strong><br>
          <a href="https://dashclub.app/guide">→ Guide de démarrage</a>
        </div>
      </div>

      <div class="support">
        <strong>Des questions ?</strong><br>
        Répondez à cet email ou écrivez-nous à <a href="mailto:hello@dashclub.app">hello@dashclub.app</a><br>
        Nous répondons sous 24h ouvrées.
      </div>
    </div>
    <div class="footer">
      © DashClub — Le dashboard pour clubs sportifs<br>
      <a href="https://dashclub.app" style="color: #C9A84C;">dashclub.app</a>
    </div>
  </div>
</body>
</html>
  `.trim();

  const text = `
Bonjour ${prenom},

Votre site DashClub est maintenant en ligne ! 🚀

🌐 URL de votre site : ${siteUrl}
🔐 Accès backoffice : ${siteUrl}/admin

🔑 Créez votre mot de passe (lien valable 72h) :
   ${setupUrl}

⚡ Votre site est en ligne. Vous pouvez le personnaliser dès votre première connexion.

--- Prochaines étapes ---

1️⃣ Connectez votre compte Stripe pour recevoir les paiements
   → ${siteUrl}/admin/stripe

2️⃣ Créez votre premier événement
   → ${siteUrl}/admin/evenements/nouveau

3️⃣ Découvrez votre guide de démarrage
   → https://dashclub.app/guide

--- Support ---
Des questions ? Répondez à cet email ou écrivez-nous à hello@dashclub.app
Réponse sous 24h.

À bientôt sur DashClub !
L'équipe DashClub
  `.trim();

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'DashClub <hello@dashclub.app>',
      to: email,
      subject,
      html,
      text,
    });
  } else {
    // Fallback: log (in production, configure RESEND_API_KEY)
    console.log('[onboarding] RESEND_API_KEY not set — email would be sent to:', email);
    console.log('[onboarding] Subject:', subject);
  }
}

// ─── Schedule email sequence ──────────────────────────────────────────────────

/**
 * Queue the J+1 / J+3 / J+5 follow-up emails for a newly created club.
 * J+0 (welcome) is sent synchronously in handleSuccessfulSubscription.
 */
export async function scheduleEmailSequence(params: {
  clubId: number;
  email: string;
}): Promise<void> {
  const { clubId, email } = params;

  const entries = [
    { type: 'stripe_reminder', daysOffset: 1 },
    { type: 'event_reminder', daysOffset: 3 },
    { type: 'share_reminder', daysOffset: 5 },
  ];

  for (const { type, daysOffset } of entries) {
    await query(
      `INSERT INTO email_queue (club_id, email_type, recipient_email, send_at, status)
       VALUES ($1, $2, $3, NOW() + INTERVAL '${daysOffset} days', 'pending')
       ON CONFLICT DO NOTHING`,
      [clubId, type, email]
    );
  }
}

// ─── Update onboarding status ─────────────────────────────────────────────────

export async function updateOnboardingStatus(
  clubId: number,
  status: 'pending' | 'completed' | 'error'
): Promise<void> {
  await query('UPDATE clubs SET onboarding_status = $1 WHERE id = $2', [status, clubId]);
}

// ─── Main orchestrator ────────────────────────────────────────────────────────

export interface OnboardingPayload {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  club: string;
  sport: string;
  ville: string;
  formule: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

export async function handleSuccessfulSubscription(payload: OnboardingPayload): Promise<void> {
  const { nom, prenom, email, telephone, club, sport, ville, formule, stripeSubscriptionId, stripeCustomerId } = payload;

  console.log(`[onboarding] Starting for club="${club}" email="${email}"`);

  // A. Generate unique subdomain slug
  const slug = await generateUniqueSubdomain(club);
  console.log(`[onboarding] slug=${slug}`);

  // B. Create club in DB
  const clubId = await createClubInDB({
    nom, prenom, email, telephone, club, sport, ville, formule, slug,
    stripeSubscriptionId, stripeCustomerId,
  });
  console.log(`[onboarding] clubId=${clubId}`);

  try {
    // C. Create admin user credentials
    const { setupToken } = await createAdminUser({ clubId, email, nom, prenom });
    console.log(`[onboarding] admin user created`);

    // D. Provision club site (pages + domain record)
    await provisionClubSite({ clubId, slug, club, sport, ville });
    console.log(`[onboarding] site provisioned`);

    // E. Send welcome email with magic link
    await sendWelcomeEmail({ email, nom, prenom, club, slug, setupToken });
    console.log(`[onboarding] welcome email sent`);

    // E2. Schedule follow-up email sequence (J+1, J+3, J+5)
    await scheduleEmailSequence({ clubId, email });
    console.log(`[onboarding] email sequence scheduled`);

    // F. Mark onboarding as completed
    await updateOnboardingStatus(clubId, 'completed');
    console.log(`[onboarding] completed for clubId=${clubId}`);
  } catch (err) {
    console.error(`[onboarding] Error for clubId=${clubId}:`, err);
    await updateOnboardingStatus(clubId, 'error').catch(() => {});
    throw err;
  }
}
