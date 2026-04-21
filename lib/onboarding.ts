import { query } from './db';
import { randomBytes } from 'crypto';
import { createNeonProject } from './provisioning/neon';
import { createSubdomain } from './provisioning/cloudflare';
import { createVercelProject } from './provisioning/vercel';
import { logClubEvent } from './logger';
import { scrapeClubWebsite } from './scraper';

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
  website_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  social_placement?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

// ─── Slug generation ─────────────────────────────────────────────────────────

function sanitizeSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 50);
}

export async function generateTempSubdomain(): Promise<string> {
  const suffix = randomBytes(3).toString('hex'); // 6 chars hex
  let slug = `tmp-${suffix}`;
  while (await subdomainExists(slug)) {
    slug = `tmp-${randomBytes(3).toString('hex')}`;
  }
  return slug;
}

export function generateSuggestedSubdomain(clubName: string): string {
  return sanitizeSlug(clubName);
}

export async function generateUniqueSubdomain(clubName: string): Promise<string> {
  const base = sanitizeSlug(clubName);
  let counter = 1;
  let finalSlug = base;
  while (await subdomainExists(finalSlug)) {
    finalSlug = `${base}-${counter}`;
    counter++;
  }
  return finalSlug;
}

async function subdomainExists(slug: string): Promise<boolean> {
  const rows = await query<{ count: string }>(
    'SELECT COUNT(*) as count FROM club_domains WHERE subdomain = $1 OR temp_subdomain = $1',
    [slug]
  );
  return parseInt(rows[0].count, 10) > 0;
}

// ─── Create club in DB ────────────────────────────────────────────────────────

export async function createClubInDB(data: ClubData): Promise<number> {
  // Upsert: if same email already exists (e.g. webhook retry), update instead
  const rows = await query<{ id: number }>(
    `INSERT INTO clubs (nom_club, sport, ville, nom_responsable, prenom_responsable, email, telephone, formule, stripe_subscription_id, stripe_customer_id, onboarding_status, website_url, instagram_url, facebook_url, social_placement)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending', $11, $12, $13, $14)
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
      data.website_url ?? null,
      data.instagram_url ?? null,
      data.facebook_url ?? null,
      data.social_placement ?? 'footer',
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

// ─── Provision club infrastructure (Neon + Vercel + Cloudflare) ──────────────

export async function provisionClubSite(params: {
  clubId: number;
  slug: string;
  suggestedSubdomain: string;
  club: string;
  sport: string;
  ville: string;
  email: string;
  nom: string;
  prenom: string;
  formule: string;
  adminTempPassword: string;
  website_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  logoUrl?: string;
  bannerUrl?: string;
  colorPrimary?: string;
  description?: string;
}): Promise<{ siteUrl: string }> {
  const { clubId, slug, suggestedSubdomain, club, sport, ville, email, nom, prenom, formule, adminTempPassword,
          website_url, instagram_url, facebook_url, logoUrl, bannerUrl, colorPrimary, description } = params;
  const domain = `${slug}.dashclub.app`;
  const siteUrl = `https://${domain}`;

  // 1. Create Neon DB
  console.log(`[provision] Creating Neon DB for slug=${slug}`);
  const neon = await createNeonProject(slug);
  console.log(`[provision] Neon projectId=${neon.projectId}`);
  await logClubEvent(clubId, 'neon_db_created', `Base de données Neon créée (projet ${neon.projectId})`, {
    level: 'success', metadata: { neonProjectId: neon.projectId },
  });

  // 2. Create Cloudflare subdomain
  console.log(`[provision] Creating Cloudflare CNAME ${slug}.dashclub.app`);
  await createSubdomain(slug);
  await logClubEvent(clubId, 'cloudflare_cname_created', `CNAME Cloudflare créé : ${slug}.dashclub.app`, { level: 'success' });

  // 3. Deploy club-starter on Vercel
  const jwtSecret = randomBytes(32).toString('hex');
  console.log(`[provision] Creating Vercel project dashclub-${slug}`);
  const vercel = await createVercelProject({
    slug,
    domain,
    envVars: [
      { key: 'DATABASE_URL',          value: neon.databaseUrl },
      { key: 'DIRECT_URL',            value: neon.directUrl },
      { key: 'NEXT_PUBLIC_SITE_URL',  value: siteUrl, type: 'plain' },
      { key: 'JWT_SECRET',            value: jwtSecret },
      { key: 'RESEND_API_KEY',        value: process.env.RESEND_API_KEY ?? '' },
      { key: 'RESEND_FROM',           value: `${club} <noreply@dashclub.app>`, type: 'plain' },
      { key: 'STRIPE_SECRET_KEY',     value: process.env.STRIPE_SECRET_KEY ?? '' },
      // Seed variables — used once during build to initialize the DB
      { key: 'CLUB_NAME',             value: club, type: 'plain' },
      { key: 'CLUB_EMAIL',            value: email, type: 'plain' },
      { key: 'CLUB_SPORT',            value: sport, type: 'plain' },
      { key: 'CLUB_CITY',             value: ville, type: 'plain' },
      { key: 'ADMIN_EMAIL',           value: email, type: 'plain' },
      { key: 'ADMIN_NAME',            value: `${prenom} ${nom}`, type: 'plain' },
      { key: 'ADMIN_TEMP_PASSWORD',   value: adminTempPassword },
      { key: 'DASHCLUB_FORMULE',      value: formule, type: 'plain' },
      // Social links & branding scraped from existing website
      { key: 'CLUB_WEBSITE_URL',      value: website_url ?? '', type: 'plain' },
      { key: 'CLUB_INSTAGRAM_URL',    value: instagram_url ?? '', type: 'plain' },
      { key: 'CLUB_FACEBOOK_URL',     value: facebook_url ?? '', type: 'plain' },
      ...(logoUrl       ? [{ key: 'CLUB_LOGO_URL',     value: logoUrl,       type: 'plain' as const }] : []),
      ...(bannerUrl     ? [{ key: 'CLUB_BANNER_URL',   value: bannerUrl,     type: 'plain' as const }] : []),
      ...(colorPrimary  ? [{ key: 'CLUB_COLOR_PRIMARY',value: colorPrimary,  type: 'plain' as const }] : []),
      ...(description   ? [{ key: 'CLUB_DESCRIPTION',  value: description,   type: 'plain' as const }] : []),
    ],
  });
  console.log(`[provision] Vercel project created, url=${vercel.projectUrl}`);
  await logClubEvent(clubId, 'vercel_project_created', `Projet Vercel déployé — ${vercel.projectUrl}`, {
    level: 'success', metadata: { vercelProjectId: vercel.projectId, projectUrl: vercel.projectUrl },
  });

  // 4. Save domain record in Portfolio DB (temp subdomain, pending validation)
  await query(
    `INSERT INTO club_domains (club_id, subdomain, temp_subdomain, suggested_subdomain, subdomain_status, custom_domain, created_at, activated_at, vercel_project_id, neon_project_id)
     VALUES ($1, $2, $2, $3, 'pending_validation', NULL, NOW(), NOW(), $4, $5)
     ON CONFLICT (subdomain) DO UPDATE SET
       vercel_project_id    = EXCLUDED.vercel_project_id,
       neon_project_id      = EXCLUDED.neon_project_id,
       temp_subdomain       = EXCLUDED.temp_subdomain,
       suggested_subdomain  = EXCLUDED.suggested_subdomain,
       subdomain_status     = EXCLUDED.subdomain_status`,
    [clubId, slug, suggestedSubdomain, vercel.projectId, neon.projectId]
  );

  return { siteUrl };
}

// ─── Send welcome email ───────────────────────────────────────────────────────

export async function sendWelcomeEmail(params: {
  email: string;
  prenom: string;
  club: string;
  setupToken: string;
  siteUrl?: string;
  adminTempPassword?: string;
  isTempUrl?: boolean;
}): Promise<void> {
  const { email, prenom, club, setupToken, siteUrl, adminTempPassword, isTempUrl } = params;
  const backOfficeUrl = siteUrl ? `${siteUrl}/admin` : undefined;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dashclub.app';
  const setupUrl = `${baseUrl}/setup-password/${setupToken}`;

  const subject = isTempUrl
    ? `🎉 Bienvenue sur DashClub — votre site ${club} est en ligne !`
    : `🎉 Bienvenue sur DashClub — activez votre accès ${club}`;

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
      <p>Paiement confirmé — votre site est en préparation ✅</p>
    </div>
    <div class="body">
      <div class="greeting">Bonjour ${prenom},</div>
      <p class="intro">
        Merci pour votre confiance ! Votre paiement a bien été reçu.<br><br>
        ${isTempUrl && siteUrl
          ? `Votre site <strong>${club}</strong> est déjà en ligne ! Il est accessible dès maintenant sur une adresse temporaire, le temps que nous validions votre adresse définitive.`
          : `Votre site <strong>${club}</strong> est maintenant en cours de préparation par l'équipe DashClub. Voici ce qui va se passer dans les prochaines heures.`
        }
      </p>

      ${isTempUrl && siteUrl ? `
      <div class="info-box" style="border-left-color:#C9A84C;background:#fffbf0;">
        <div class="label">🌐 Adresse temporaire de votre site</div>
        <div class="value"><a href="${siteUrl}" style="color:#0D1F3C;">${siteUrl}</a></div>
        <div style="font-size:13px;color:#888;margin-top:4px;">
          ⚠️ Cette adresse est <strong>temporaire</strong>. Votre adresse définitive (ex&nbsp;: <em>${club.toLowerCase().replace(/\s+/g,'-')}.dashclub.app</em>) vous sera communiquée sous peu, après validation par notre équipe.
        </div>
      </div>
      ` : ''}

      <div class="section-title">${isTempUrl ? 'Prochaines étapes' : 'Ce que nous préparons pour vous'}</div>

      ${isTempUrl ? `
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <strong>Créez votre mot de passe</strong><br>
          Accédez à votre backoffice pour personnaliser votre site dès maintenant.
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <strong>Votre adresse définitive</strong><br>
          Notre équipe valide votre nom de domaine <em>${club.toLowerCase().replace(/\s+/g,'-')}.dashclub.app</em> et vous envoie un email de confirmation. <em style="color:#888">Sous 24–48h</em>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <strong>Mise en ligne publique</strong><br>
          Votre site passe sur son adresse définitive et est prêt à être partagé.
        </div>
      </div>
      ` : `
      <div class="step">
        <div class="step-num">1</div>
        <div class="step-content">
          <strong>Création de votre environnement</strong><br>
          Provisionnement de l'hébergement dédié à votre club. <em style="color:#888">En cours…</em>
        </div>
      </div>
      <div class="step">
        <div class="step-num">2</div>
        <div class="step-content">
          <strong>Génération de votre site</strong><br>
          Mise en place du modèle de site aux couleurs de <strong>${club}</strong>. <em style="color:#888">Sous 24h</em>
        </div>
      </div>
      <div class="step">
        <div class="step-num">3</div>
        <div class="step-content">
          <strong>Création de votre backoffice</strong><br>
          Votre espace d'administration pour gérer membres, événements et paiements. <em style="color:#888">Sous 24h</em>
        </div>
      </div>
      <div class="step">
        <div class="step-num">4</div>
        <div class="step-content">
          <strong>Mise en ligne & domaine personnalisé</strong><br>
          Activation de votre domaine et ouverture publique de votre site. <em style="color:#888">Sous 5 jours</em>
        </div>
      </div>
      `}

      ${backOfficeUrl ? `
      <div class="creds-box" style="margin-top:28px;">
        <div class="creds-label">🚀 Votre backoffice est prêt</div>
        <div class="creds-label" style="margin-top:12px;">Adresse</div>
        <div class="creds-value">${backOfficeUrl}</div>
        <div class="creds-label">Email</div>
        <div class="creds-value">${email}</div>
        <div class="creds-label">Mot de passe temporaire</div>
        <div class="creds-value">${adminTempPassword}</div>
        <div class="creds-value" style="font-family:sans-serif;font-size:12px;color:rgba(255,255,255,0.5);margin-top:8px;">
          Changez ce mot de passe dès votre première connexion.
        </div>
      </div>
      <a href="${backOfficeUrl}" class="cta-btn" style="margin-top:8px;">Accéder à mon backoffice →</a>
      ` : `
      <div class="creds-box" style="margin-top:28px;">
        <div class="creds-label">🔑 Préparez votre accès dès maintenant</div>
        <div class="creds-value" style="font-family:sans-serif;font-size:13px;line-height:1.6;">
          Créez votre mot de passe en cliquant ci-dessous.<br>
          Vous pourrez accéder à votre backoffice dès que votre site sera prêt.<br>
          <strong style="color:#C9A84C">Ce lien est valable 72 heures.</strong>
        </div>
      </div>
      <a href="${setupUrl}" class="cta-btn" style="margin-top:16px;">Créer mon mot de passe →</a>
      `}

      <div class="section-title" style="margin-top:28px;">Ressources utiles</div>

      <div class="step">
        <div class="step-num">📖</div>
        <div class="step-content">
          <strong>Documentation & guides pas à pas</strong><br>
          DNS, Stripe, création d'événement — tout est expliqué :<br>
          <a href="${baseUrl}/docs">→ Accéder à la documentation</a>
        </div>
      </div>
      <div class="step">
        <div class="step-num">❓</div>
        <div class="step-content">
          <strong>FAQ</strong><br>
          Réponses aux questions les plus fréquentes :<br>
          <a href="${baseUrl}/faq">→ Consulter la FAQ</a>
        </div>
      </div>

      <div class="support" style="margin-top:24px;">
        <strong>Besoin d'aide ?</strong><br>
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

Merci pour votre confiance ! Votre paiement a bien été reçu.

Votre site ${club} est en cours de préparation par l'équipe DashClub.

--- Ce que nous préparons pour vous ---

1️⃣ Création de votre environnement (en cours…)
2️⃣ Génération de votre site (sous 24h)
3️⃣ Création de votre backoffice (sous 24h)
4️⃣ Mise en ligne & domaine personnalisé (sous 5 jours)

--- Préparez votre accès ---

Créez votre mot de passe dès maintenant (lien valable 72h) :
${setupUrl}

Vous pourrez accéder à votre backoffice dès que votre site sera prêt.

--- Ressources utiles ---

📖 Documentation & guides : ${baseUrl}/docs
❓ FAQ : ${baseUrl}/faq

--- Support ---
Des questions ? Écrivez-nous à hello@dashclub.app
Nous répondons sous 24h ouvrées.

À bientôt sur DashClub !
L'équipe DashClub
  `.trim();

  console.log(`[onboarding/email] sendWelcomeEmail — to="${email}" subject="${subject}" resend_configured=${!!process.env.RESEND_API_KEY}`);

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    const billingNotifHtml = `
<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:system-ui,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e7e5e4">
        <tr><td style="background:#0D1F3C;padding:32px 40px">
          <p style="margin:0;color:#C9A84C;font-size:11px;font-weight:600;letter-spacing:.1em;text-transform:uppercase">DashClub · Nouvel abonné</p>
          <h1 style="margin:8px 0 0;color:#fff;font-size:24px;font-weight:700">Nouveau club abonné</h1>
        </td></tr>
        <tr><td style="padding:32px 40px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7e5e4;border-radius:12px;overflow:hidden">
            <tr style="background:#fafaf9"><td colspan="2" style="padding:12px 16px;font-size:12px;color:#78716c;font-weight:600;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e7e5e4">Détails</td></tr>
            <tr><td style="padding:12px 16px;font-size:14px;color:#78716c;border-bottom:1px solid #e7e5e4">Club</td><td style="padding:12px 16px;font-size:14px;color:#1c1917;font-weight:600;border-bottom:1px solid #e7e5e4">${club}</td></tr>
            <tr style="background:#fafaf9"><td style="padding:12px 16px;font-size:14px;color:#78716c;border-bottom:1px solid #e7e5e4">Contact</td><td style="padding:12px 16px;font-size:14px;color:#1c1917;font-weight:500;border-bottom:1px solid #e7e5e4">${prenom} — ${email}</td></tr>
            <tr><td style="padding:12px 16px;font-size:14px;color:#78716c">Formule</td><td style="padding:12px 16px;font-size:14px;color:#1c1917;font-weight:600">${subject}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

    const [clientResult, billingResult] = await Promise.allSettled([
      resend.emails.send({
        from: 'DashClub <hello@dashclub.app>',
        to: email,
        subject,
        html,
        text,
      }),
      resend.emails.send({
        from: 'DashClub <hello@dashclub.app>',
        to: 'billing@dashclub.app',
        subject: `[DashClub] Nouvel abonné — ${club}`,
        html: billingNotifHtml,
      }),
    ]);

    if (clientResult.status === 'fulfilled') {
      console.log(`[onboarding/email] client email sent — id=${(clientResult.value as { id?: string }).id}`);
    } else {
      console.error('[onboarding/email] client email FAILED:', clientResult.reason);
    }
    if (billingResult.status === 'fulfilled') {
      console.log(`[onboarding/email] billing email sent — id=${(billingResult.value as { id?: string }).id}`);
    } else {
      console.error('[onboarding/email] billing email FAILED:', billingResult.reason);
    }
  } else {
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
  website_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  social_placement?: string;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
}

export async function handleSuccessfulSubscription(payload: OnboardingPayload): Promise<void> {
  const { nom, prenom, email, telephone, club, sport, ville, formule,
          website_url, instagram_url, facebook_url, social_placement,
          stripeSubscriptionId, stripeCustomerId } = payload;

  console.log(`[onboarding] Starting for club="${club}" email="${email}"`);

  // A. Generate temp subdomain (tmp-xxxxxx) + suggested final subdomain
  const slug = await generateTempSubdomain();
  const suggestedSubdomain = generateSuggestedSubdomain(club);
  console.log(`[onboarding] tempSlug=${slug} suggested=${suggestedSubdomain}`);

  // B. Create club in DB
  const clubId = await createClubInDB({
    nom, prenom, email, telephone, club, sport, ville, formule, slug,
    website_url, instagram_url, facebook_url, social_placement,
    stripeSubscriptionId, stripeCustomerId,
  });
  console.log(`[onboarding] clubId=${clubId}`);

  await logClubEvent(clubId, 'subscription_created', `Paiement Stripe confirmé — formule ${formule}`, {
    level: 'success',
    metadata: { formule, stripeSubscriptionId, stripeCustomerId },
  });

  // B2. Scrape the club's existing website for branding (non-blocking)
  let branding: { logoUrl?: string; bannerUrl?: string; colorPrimary?: string; description?: string } = {};
  if (website_url) {
    try {
      await logClubEvent(clubId, 'scraping_started', `Analyse du site existant : ${website_url}`, { level: 'info' });
      branding = await scrapeClubWebsite(website_url);
      if (branding.logoUrl || branding.colorPrimary || branding.bannerUrl) {
        await logClubEvent(clubId, 'scraping_completed', `Branding extrait — logo: ${branding.logoUrl ? 'oui' : 'non'}, couleur: ${branding.colorPrimary ?? 'non'}`, {
          level: 'success',
          metadata: { logoUrl: branding.logoUrl, bannerUrl: branding.bannerUrl, colorPrimary: branding.colorPrimary },
        });
      } else {
        await logClubEvent(clubId, 'scraping_no_data', `Aucun élément de branding trouvé sur ${website_url}`, { level: 'info' });
      }
    } catch (scrapeErr) {
      await logClubEvent(clubId, 'scraping_error', `Échec de l'analyse du site : ${(scrapeErr as Error).message}`, { level: 'warning' });
    }
  }

  try {
    // C. Create admin user credentials
    const { setupToken } = await createAdminUser({ clubId, email, nom, prenom });
    console.log(`[onboarding] admin user created`);
    await logClubEvent(clubId, 'admin_user_created', `Compte administrateur créé pour ${email}`, { level: 'info' });

    // D. Generate temp password for the club-starter seed
    const adminTempPassword = randomBytes(10).toString('base64url') + 'A1!';

    // E. Provision infrastructure (Neon + Vercel + Cloudflare)
    let siteUrl: string | undefined;
    try {
      await logClubEvent(clubId, 'provisioning_started', `Provisionnement de l'infrastructure — slug temporaire ${slug}`, { level: 'info' });
      const result = await provisionClubSite({
        clubId, slug, suggestedSubdomain, club, sport, ville, email, nom, prenom, formule, adminTempPassword,
        website_url: website_url ?? '',
        instagram_url: instagram_url ?? '',
        facebook_url: facebook_url ?? '',
        logoUrl: branding.logoUrl,
        bannerUrl: branding.bannerUrl,
        colorPrimary: branding.colorPrimary,
        description: branding.description,
      });
      siteUrl = result.siteUrl;
      console.log(`[onboarding] infrastructure provisioned, siteUrl=${siteUrl}`);
      await logClubEvent(clubId, 'provisioning_completed', `Infrastructure prête — site accessible sur ${siteUrl}`, {
        level: 'success',
        metadata: { siteUrl, slug, suggestedSubdomain },
      });
    } catch (provErr) {
      console.error(`[onboarding] Infrastructure provisioning failed (non-blocking):`, provErr);
      await logClubEvent(clubId, 'provisioning_error', `Échec du provisionnement : ${(provErr as Error).message}`, {
        level: 'error',
        metadata: { error: String(provErr) },
      });
    }

    // F. Send welcome email with magic link + back office URL
    console.log(`[onboarding] calling sendWelcomeEmail for email="${email}"`);
    await sendWelcomeEmail({ email, prenom, club, setupToken, siteUrl, adminTempPassword, isTempUrl: !!siteUrl });
    console.log(`[onboarding] sendWelcomeEmail returned`);
    await logClubEvent(clubId, 'welcome_email_sent', `Email de bienvenue envoyé à ${email}`, { level: 'info' });

    // E2. Schedule follow-up email sequence (J+1, J+3, J+5)
    await scheduleEmailSequence({ clubId, email });
    console.log(`[onboarding] email sequence scheduled`);
    await logClubEvent(clubId, 'email_sequence_scheduled', 'Séquence email programmée (J+1, J+3, J+5)', { level: 'info' });

    // F. Mark onboarding as completed
    await updateOnboardingStatus(clubId, 'completed');
    console.log(`[onboarding] completed for clubId=${clubId}`);
    await logClubEvent(clubId, 'onboarding_completed', 'Onboarding terminé avec succès', { level: 'success' });

    // Clean up provisioning-only fields from Portfolio DB — data now lives in the club's own Neon DB
    await query(
      `UPDATE clubs SET website_url = NULL, instagram_url = NULL, facebook_url = NULL WHERE id = $1`,
      [clubId]
    );
  } catch (err) {
    console.error(`[onboarding] Error for clubId=${clubId}:`, err);
    await logClubEvent(clubId, 'onboarding_error', `Erreur critique : ${(err as Error).message}`, {
      level: 'error',
      metadata: { error: String(err) },
    });
    await updateOnboardingStatus(clubId, 'error').catch(() => {});
    throw err;
  }
}
