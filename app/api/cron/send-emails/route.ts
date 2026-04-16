import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmailQueueRow {
  id: number;
  club_id: number;
  email_type: string;
  recipient_email: string;
  send_at: string;
  nom_club: string;
  prenom_responsable: string;
  subdomain: string;
  stripe_connect_status: string;
}

// ─── Email builders ───────────────────────────────────────────────────────────

function buildStripeReminderEmail(row: EmailQueueRow): { subject: string; html: string; text: string } {
  const siteUrl = `https://${row.subdomain}.dashclub.app`;
  const connectUrl = `https://triflow.nanocorp.app/admin/stripe-connect`;

  const subject = '⚡ Dernière étape — Connectez votre Stripe pour recevoir vos paiements';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #0D1F3C; padding: 32px 40px; text-align: center; }
    .header h1 { color: #C9A84C; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 32px 40px; }
    .greeting { font-size: 18px; font-weight: 600; color: #0D1F3C; margin-bottom: 16px; }
    .content { color: #444; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
    .site-box { background: #f0f4ff; border: 1px solid #dce4f5; border-radius: 8px; padding: 16px 20px; margin-bottom: 24px; display: flex; align-items: center; gap: 12px; }
    .site-box .site-label { font-size: 12px; color: #8A9AB5; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
    .site-box .site-url { font-size: 15px; color: #0D1F3C; font-weight: 600; }
    .cta-btn { display: inline-block; background: #C9A84C; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 8px 0 24px; }
    .highlight-box { background: #fffbf0; border-left: 4px solid #C9A84C; border-radius: 0 8px 8px 0; padding: 16px 20px; margin-bottom: 24px; color: #444; font-size: 14px; line-height: 1.6; }
    .footer { background: #0D1F3C; padding: 24px 40px; text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; }
    .footer a { color: #C9A84C; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DashClub</h1>
      <p>⚡ Connectez votre compte Stripe</p>
    </div>
    <div class="body">
      <div class="greeting">Bonjour ${row.prenom_responsable},</div>
      <div class="content">
        Votre site <strong>${row.nom_club}</strong> est en ligne sur
        <a href="${siteUrl}" style="color: #0D1F3C; font-weight: 600;">${row.subdomain}.dashclub.app</a> 🎉
        <br><br>
        Il reste une étape pour pouvoir <strong>encaisser les inscriptions</strong> :
        connecter votre compte Stripe bancaire.
      </div>

      <a href="${connectUrl}" class="cta-btn">→ Connecter mon compte Stripe</a>

      <div class="highlight-box">
        ⏱ Ça prend <strong>5 minutes</strong>. Vous recevrez ensuite les paiements
        directement sur votre compte bancaire — DashClub ne prélève aucune commission.
      </div>

      <div class="content" style="font-size: 14px; color: #666;">
        Des questions ? Répondez à cet email ou écrivez-nous à
        <a href="mailto:hello@dashclub.app" style="color: #0D1F3C;">hello@dashclub.app</a>
      </div>
    </div>
    <div class="footer">
      © DashClub — Le dashboard pour clubs sportifs<br>
      <a href="https://dashclub.app">dashclub.app</a>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `Bonjour ${row.prenom_responsable},

Votre site ${row.nom_club} est en ligne sur ${siteUrl} 🎉

Il reste une étape pour pouvoir encaisser les inscriptions :
connecter votre compte Stripe bancaire.

→ Connecter mon compte Stripe : ${connectUrl}

Ça prend 5 minutes. Vous recevrez ensuite les paiements
directement sur votre compte bancaire.

L'équipe DashClub`;

  return { subject, html, text };
}

function buildEventReminderEmail(row: EmailQueueRow): { subject: string; html: string; text: string } {
  const newEventUrl = `https://triflow.nanocorp.app/admin/evenements/nouveau`;

  const subject = '📅 Créez votre premier événement sur DashClub';

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #0D1F3C; padding: 32px 40px; text-align: center; }
    .header h1 { color: #C9A84C; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 32px 40px; }
    .greeting { font-size: 18px; font-weight: 600; color: #0D1F3C; margin-bottom: 16px; }
    .content { color: #444; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
    .cta-btn { display: inline-block; background: #C9A84C; color: white !important; text-decoration: none; padding: 14px 28px; border-radius: 8px; font-weight: 700; font-size: 15px; margin: 8px 0 24px; }
    .steps-box { background: #f8f9fa; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; }
    .step { display: flex; align-items: flex-start; margin-bottom: 12px; }
    .step:last-child { margin-bottom: 0; }
    .step-num { background: #0D1F3C; color: #C9A84C; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; margin-right: 12px; margin-top: 2px; min-width: 28px; }
    .step-content { color: #444; line-height: 1.5; font-size: 14px; }
    .footer { background: #0D1F3C; padding: 24px 40px; text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; }
    .footer a { color: #C9A84C; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DashClub</h1>
      <p>📅 Créez votre premier événement</p>
    </div>
    <div class="body">
      <div class="greeting">Bonjour ${row.prenom_responsable},</div>
      <div class="content">
        Votre site club est prêt. Il ne manque plus qu'un événement !
      </div>

      <a href="${newEventUrl}" class="cta-btn">→ Créer mon premier événement</a>

      <div class="steps-box">
        <div style="font-size: 13px; font-weight: 700; color: #0D1F3C; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">En 3 étapes simples :</div>
        <div class="step">
          <div class="step-num">1</div>
          <div class="step-content"><strong>Nom de l'événement</strong> + description courte</div>
        </div>
        <div class="step">
          <div class="step-num">2</div>
          <div class="step-content"><strong>Date</strong> + nombre de places + tarif</div>
        </div>
        <div class="step">
          <div class="step-num">3</div>
          <div class="step-content"><strong>Confirmation</strong> → votre formulaire d'inscription est en ligne en quelques minutes</div>
        </div>
      </div>

      <div class="content" style="font-size: 14px; color: #666;">
        Des questions ? Répondez à cet email ou écrivez-nous à
        <a href="mailto:hello@dashclub.app" style="color: #0D1F3C;">hello@dashclub.app</a>
      </div>
    </div>
    <div class="footer">
      © DashClub — Le dashboard pour clubs sportifs<br>
      <a href="https://dashclub.app">dashclub.app</a>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `Bonjour ${row.prenom_responsable},

Votre site club est prêt. Il ne manque plus qu'un événement !

→ Créer mon premier événement : ${newEventUrl}

En 3 étapes simples : nom, date, tarif. Votre formulaire
d'inscription sera en ligne en quelques minutes.

L'équipe DashClub`;

  return { subject, html, text };
}

function buildShareReminderEmail(row: EmailQueueRow): { subject: string; html: string; text: string } {
  const siteUrl = `https://${row.subdomain}.dashclub.app`;

  const subject = `🚀 ${row.nom_club} — Votre site est prêt à être partagé`;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f4f4f5; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .header { background: #0D1F3C; padding: 32px 40px; text-align: center; }
    .header h1 { color: #C9A84C; margin: 0; font-size: 28px; font-weight: 700; }
    .header p { color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 15px; }
    .body { padding: 32px 40px; }
    .greeting { font-size: 18px; font-weight: 600; color: #0D1F3C; margin-bottom: 16px; }
    .content { color: #444; line-height: 1.7; font-size: 15px; margin-bottom: 24px; }
    .url-box { background: #0D1F3C; border-radius: 12px; padding: 24px 28px; margin-bottom: 24px; text-align: center; }
    .url-box .url-label { font-size: 12px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
    .url-box .url-value { font-size: 20px; color: #C9A84C; font-weight: 700; text-decoration: none; }
    .share-list { background: #f8f9fa; border-radius: 8px; padding: 20px 24px; margin-bottom: 24px; }
    .share-list p { margin: 0 0 8px; color: #444; font-size: 15px; line-height: 1.6; }
    .share-list p:last-child { margin-bottom: 0; }
    .footer { background: #0D1F3C; padding: 24px 40px; text-align: center; color: rgba(255,255,255,0.5); font-size: 12px; }
    .footer a { color: #C9A84C; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>DashClub</h1>
      <p>🚀 Votre site est prêt à être partagé !</p>
    </div>
    <div class="body">
      <div class="greeting">Bonjour ${row.prenom_responsable},</div>
      <div class="content">
        Votre site DashClub est maintenant complet.<br>
        Partagez-le avec vos membres :
      </div>

      <div class="url-box">
        <div class="url-label">Votre site club</div>
        <a href="${siteUrl}" class="url-value">👉 ${siteUrl}</a>
      </div>

      <div class="share-list">
        <div style="font-size: 13px; font-weight: 700; color: #0D1F3C; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 14px;">Idées pour partager</div>
        <p>✉️ Par email à vos membres</p>
        <p>📱 Dans votre groupe WhatsApp de club</p>
        <p>📱 Sur votre page Facebook / Instagram</p>
      </div>

      <div class="content" style="font-size: 14px; color: #666;">
        Des questions ? Répondez à cet email ou écrivez-nous à
        <a href="mailto:hello@dashclub.app" style="color: #0D1F3C;">hello@dashclub.app</a>
      </div>
    </div>
    <div class="footer">
      © DashClub — Le dashboard pour clubs sportifs<br>
      <a href="https://dashclub.app">dashclub.app</a>
    </div>
  </div>
</body>
</html>`.trim();

  const text = `Bonjour ${row.prenom_responsable},

Votre site DashClub est maintenant complet.
Partagez-le avec vos membres :

👉 ${siteUrl}

Idées pour partager :
✉️ Par email à vos membres
📱 Dans votre groupe WhatsApp de club
📱 Sur votre page Facebook / Instagram

À bientôt,
L'équipe DashClub`;

  return { subject, html, text };
}

// ─── Condition checks ─────────────────────────────────────────────────────────

async function checkEmailCondition(row: EmailQueueRow): Promise<boolean> {
  if (row.email_type === 'stripe_reminder') {
    // Skip if already connected
    return row.stripe_connect_status !== 'connected';
  }

  if (row.email_type === 'event_reminder') {
    // TODO: wire to events table when created; always send for now
    return true;
  }

  // share_reminder: always send
  return true;
}

// ─── Send email via Resend ────────────────────────────────────────────────────

async function sendEmail(row: EmailQueueRow): Promise<void> {
  let emailContent: { subject: string; html: string; text: string };

  if (row.email_type === 'stripe_reminder') {
    emailContent = buildStripeReminderEmail(row);
  } else if (row.email_type === 'event_reminder') {
    emailContent = buildEventReminderEmail(row);
  } else if (row.email_type === 'share_reminder') {
    emailContent = buildShareReminderEmail(row);
  } else {
    console.log(`[cron/send-emails] Unknown email_type="${row.email_type}" for id=${row.id}`);
    return;
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'DashClub <hello@dashclub.app>',
      to: row.recipient_email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text,
    });
  } else {
    console.log(`[cron/send-emails] RESEND_API_KEY not set — would send "${emailContent.subject}" to ${row.recipient_email}`);
  }
}

// ─── Cron handler ─────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  // Authenticate cron requests
  const authHeader = req.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Fetch pending emails due now
  const emails = await query<EmailQueueRow>(`
    SELECT eq.id, eq.club_id, eq.email_type, eq.recipient_email, eq.send_at,
           c.nom_club, c.prenom_responsable, cd.subdomain, c.stripe_connect_status
    FROM email_queue eq
    JOIN clubs c ON c.id = eq.club_id
    JOIN club_domains cd ON cd.club_id = c.id
    WHERE eq.status = 'pending' AND eq.send_at <= NOW()
    ORDER BY eq.send_at ASC
    LIMIT 50
  `);

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      const shouldSend = await checkEmailCondition(email);

      if (shouldSend) {
        await sendEmail(email);
        await query(
          `UPDATE email_queue SET status = 'sent', sent_at = NOW() WHERE id = $1`,
          [email.id]
        );
        sent++;
        console.log(`[cron/send-emails] Sent ${email.email_type} to ${email.recipient_email}`);
      } else {
        await query(
          `UPDATE email_queue SET status = 'skipped' WHERE id = $1`,
          [email.id]
        );
        skipped++;
        console.log(`[cron/send-emails] Skipped ${email.email_type} for club_id=${email.club_id} (condition not met)`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[cron/send-emails] Failed to send id=${email.id}:`, msg);
      await query(
        `UPDATE email_queue SET status = 'failed' WHERE id = $1`,
        [email.id]
      ).catch(() => {});
      failed++;
    }
  }

  return NextResponse.json({
    processed: emails.length,
    sent,
    skipped,
    failed,
  });
}
