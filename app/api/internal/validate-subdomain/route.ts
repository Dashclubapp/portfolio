import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { createSubdomain } from '@/lib/provisioning/cloudflare';
import { addDomainToProject } from '@/lib/provisioning/vercel';
import { logClubEvent } from '@/lib/logger';

function authorized(req: NextRequest) {
  const secret = process.env.INTERNAL_API_SECRET;
  return secret && req.headers.get('x-internal-secret') === secret;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const { clubId, finalSubdomain } = await req.json().catch(() => ({}));
  if (!clubId || !finalSubdomain) {
    return NextResponse.json({ error: 'clubId et finalSubdomain requis' }, { status: 400 });
  }

  // Validate slug format
  if (!/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/.test(finalSubdomain)) {
    return NextResponse.json({ error: 'Format de sous-domaine invalide' }, { status: 400 });
  }

  // Check slug not already taken (excluding current club)
  const conflict = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM club_domains
     WHERE (subdomain = $1 OR final_subdomain = $1) AND club_id != $2`,
    [finalSubdomain, clubId]
  );
  if (parseInt(conflict[0].count, 10) > 0) {
    return NextResponse.json({ error: 'Ce sous-domaine est déjà utilisé' }, { status: 409 });
  }

  // Get the domain record
  const rows = await query<{
    vercel_project_id: string;
    temp_subdomain: string;
    club_nom: string;
    email: string;
    prenom: string;
    formule: string;
  }>(`
    SELECT cd.vercel_project_id, cd.temp_subdomain,
           c.nom_club AS club_nom, c.email, c.prenom_responsable AS prenom, c.formule
    FROM club_domains cd
    JOIN clubs c ON c.id = cd.club_id
    WHERE cd.club_id = $1 AND cd.subdomain_status = 'pending_validation'
  `, [clubId]);

  if (!rows.length) {
    return NextResponse.json({ error: 'Club introuvable ou déjà validé' }, { status: 404 });
  }

  const { vercel_project_id, club_nom, email, prenom, formule } = rows[0];
  const finalDomain = `${finalSubdomain}.dashclub.app`;
  const siteUrl = `https://${finalDomain}`;

  await logClubEvent(clubId, 'subdomain_validation_started', `Validation du sous-domaine : ${finalSubdomain}.dashclub.app`, { level: 'info' });

  // 1. Create Cloudflare CNAME for final domain
  await createSubdomain(finalSubdomain);
  await logClubEvent(clubId, 'cloudflare_cname_created', `CNAME Cloudflare créé : ${finalDomain}`, { level: 'success' });

  // 2. Add final domain to Vercel project
  await addDomainToProject(vercel_project_id, finalDomain);
  await logClubEvent(clubId, 'vercel_domain_added', `Domaine final ajouté sur Vercel : ${finalDomain}`, { level: 'success' });

  // 3. Update DB
  await query(
    `UPDATE club_domains
     SET subdomain = $1, final_subdomain = $1, subdomain_status = 'validated'
     WHERE club_id = $2`,
    [finalSubdomain, clubId]
  );

  // 4. Send confirmation email to club
  const hasManagedDomain = formule === 'illimite';
  await sendValidationEmail({ email, prenom, club: club_nom, siteUrl, hasManagedDomain });
  await logClubEvent(clubId, 'subdomain_validated', `Sous-domaine définitif activé — ${siteUrl}`, {
    level: 'success', metadata: { finalSubdomain, siteUrl },
  });
  await logClubEvent(clubId, 'validation_email_sent', `Email de confirmation envoyé à ${email}`, { level: 'info' });

  return NextResponse.json({ ok: true, siteUrl });
}

async function sendValidationEmail(params: {
  email: string;
  prenom: string;
  club: string;
  siteUrl: string;
  hasManagedDomain: boolean;
}) {
  const { email, prenom, club, siteUrl, hasManagedDomain } = params;

  const subject = `✅ ${club} — votre site est en ligne sur son adresse définitive`;
  const html = `
<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{font-family:-apple-system,sans-serif;background:#f4f4f5;margin:0;padding:20px;}
  .container{max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);}
  .header{background:#0D1F3C;padding:32px 40px;text-align:center;}
  .header h1{color:#C9A84C;margin:0;font-size:28px;font-weight:700;}
  .body{padding:32px 40px;}
  .url-box{background:#0D1F3C;border-radius:10px;padding:20px 24px;margin:24px 0;text-align:center;}
  .url-box a{color:#C9A84C;font-size:20px;font-weight:700;text-decoration:none;}
  .dns-box{background:#f8f9fa;border-left:4px solid #C9A84C;border-radius:8px;padding:20px 24px;margin:20px 0;}
  .cta-btn{display:inline-block;background:#C9A84C;color:white;text-decoration:none;padding:14px 28px;border-radius:8px;font-weight:700;font-size:15px;}
  .footer{background:#0D1F3C;padding:24px 40px;text-align:center;color:rgba(255,255,255,0.5);font-size:12px;}
</style>
</head><body>
<div class="container">
  <div class="header"><h1>DashClub</h1></div>
  <div class="body">
    <p style="font-size:18px;font-weight:600;color:#0D1F3C;">Bonjour ${prenom},</p>
    <p style="color:#444;line-height:1.6;">
      Bonne nouvelle ! L'adresse définitive de <strong>${club}</strong> a été validée par notre équipe.
      Votre site est maintenant accessible sur :
    </p>
    <div class="url-box">
      <a href="${siteUrl}">${siteUrl}</a>
    </div>
    <a href="${siteUrl}/admin" class="cta-btn">Accéder à mon backoffice →</a>
    ${hasManagedDomain ? `
    <div class="dns-box" style="margin-top:28px;">
      <strong style="color:#0D1F3C;">Domaine personnalisé</strong><br>
      <p style="color:#444;margin:8px 0 0;font-size:14px;line-height:1.6;">
        Vous avez souscrit à l'option domaine personnalisé. Notre équipe vous contactera séparément pour configurer votre domaine.
      </p>
    </div>
    ` : `
    <div class="dns-box" style="margin-top:28px;">
      <strong style="color:#0D1F3C;">Vous avez un nom de domaine ?</strong><br>
      <p style="color:#444;margin:8px 0 0;font-size:14px;line-height:1.6;">
        Pour pointer <code>www.votreclub.fr</code> vers votre site DashClub, créez simplement un enregistrement DNS :<br><br>
        <strong>Type</strong> : CNAME<br>
        <strong>Nom</strong> : www (ou @)<br>
        <strong>Valeur</strong> : <code>${siteUrl.replace('https://', '')}</code>
      </p>
    </div>
    `}
    <p style="color:#888;font-size:13px;margin-top:24px;">Des questions ? Écrivez-nous à <a href="mailto:hello@dashclub.app">hello@dashclub.app</a></p>
  </div>
  <div class="footer">© DashClub — <a href="https://dashclub.app" style="color:#C9A84C;">dashclub.app</a></div>
</div>
</body></html>`;

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({ from: 'DashClub <hello@dashclub.app>', to: email, subject, html });
  } else {
    console.log('[validate-subdomain] Email would be sent to:', email, subject);
  }
}
