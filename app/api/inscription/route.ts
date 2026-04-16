import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { NanoCorpEmailAttachment, sendNanoCorpEmail } from '@/lib/nanocorp-email';

// Simple in-memory rate limiter — resets on cold start (acceptable for this use case)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function getClientIP(request: Request): string {
  const xff = (request as unknown as { headers: { get: (k: string) => string | null } }).headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now >= entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  rateLimitMap.set(ip, { count: entry.count + 1, resetAt: entry.resetAt });
  return true;
}

type PlanId = 'essentiel' | 'saison' | 'illimite';

type InscriptionPayload = {
  formule: PlanId;
  nomClub: string;
  siteActuel: string;
  nom: string;
  prenom: string;
  telephone: string;
  email: string;
  instagram: string;
  facebook: string;
  rgpd: boolean;
  attachments: NanoCorpEmailAttachment[];
};

type DeliveryResult = {
  previewPath?: string;
};

const NOTIFICATION_EMAIL = process.env.INSCRIPTION_NOTIFICATION_EMAIL ?? 'hello@triflow.fr';
const DELIVERY_MODE = process.env.INSCRIPTION_EMAIL_MODE ?? 'nanocorp';
const CAPTURE_DIR =
  process.env.INSCRIPTION_EMAIL_CAPTURE_DIR ??
  path.join(process.cwd(), '.tmp', 'inscription-emails');

const PLAN_DETAILS: Record<PlanId, { name: string; price: string }> = {
  essentiel: { name: 'Essentiel', price: '19€' },
  saison: { name: 'Saison', price: '49€' },
  illimite: { name: 'Illimité', price: '99€' },
};

function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isPlanId(value: string): value is PlanId {
  return value === 'essentiel' || value === 'saison' || value === 'illimite';
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidFrenchMobile(value: string) {
  return /^0[67][0-9]{8}$/.test(value.replace(/[\s\-.]/g, ''));
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeAttachments(value: unknown): NanoCorpEmailAttachment[] {
  if (value == null) {
    return [];
  }

  if (!Array.isArray(value)) {
    throw new Error('Pièce jointe invalide');
  }

  return value.map((item) => {
    if (!item || typeof item !== 'object') {
      throw new Error('Pièce jointe invalide');
    }

    const source = item as Record<string, unknown>;
    const filename = normalizeText(source.filename ?? source.name);
    const contentBase64 = normalizeText(source.content_base64 ?? source.contentBase64);
    const mimeType = normalizeText(source.mime_type ?? source.mimeType ?? source.type);

    if (!filename || !contentBase64 || !mimeType) {
      throw new Error('Pièce jointe invalide');
    }

    return {
      filename,
      contentBase64,
      mimeType,
    };
  });
}

function validatePayload(input: unknown): InscriptionPayload {
  if (!input || typeof input !== 'object') {
    throw new Error('Format de payload invalide');
  }

  const source = input as Record<string, unknown>;
  const formule = normalizeText(source.formule);
  const nomClub = normalizeText(source.nomClub);
  const siteActuel = normalizeText(source.siteActuel);
  const nom = normalizeText(source.nom);
  const prenom = normalizeText(source.prenom);
  const telephone = normalizeText(source.telephone);
  const email = normalizeText(source.email);
  const instagram = normalizeText(source.instagram);
  const facebook = normalizeText(source.facebook);
  const rgpd = source.rgpd === true;
  const attachments = normalizeAttachments(
    source.attachments ?? source.piecesJointes ?? source.pieces_jointes
  );

  if (!isPlanId(formule)) {
    throw new Error('Formule invalide');
  }

  if (!nomClub) {
    throw new Error('Nom du club requis');
  }

  if (!prenom) {
    throw new Error('Prénom requis');
  }

  if (!nom) {
    throw new Error('Nom requis');
  }

  if (!isValidFrenchMobile(telephone)) {
    throw new Error('Téléphone invalide');
  }

  if (!isValidEmail(email)) {
    throw new Error('Email invalide');
  }

  if (!rgpd) {
    throw new Error('Consentement RGPD requis');
  }

  if (siteActuel && !isValidUrl(siteActuel)) {
    throw new Error('URL du site invalide');
  }

  if (instagram && !isValidUrl(instagram)) {
    throw new Error('URL Instagram invalide');
  }

  if (facebook && !isValidUrl(facebook)) {
    throw new Error('URL Facebook invalide');
  }

  return {
    formule,
    nomClub,
    siteActuel,
    nom,
    prenom,
    telephone,
    email,
    instagram,
    facebook,
    rgpd,
    attachments,
  };
}

function renderNotificationEmail(payload: InscriptionPayload, submittedAt: Date) {
  const plan = PLAN_DETAILS[payload.formule];
  const timestampIso = submittedAt.toISOString();
  const timestampDisplay = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Europe/Paris',
  }).format(submittedAt);

  const subject = `Nouvelle inscription Triflow — ${payload.nomClub} — ${plan.name}`;

  const rows = [
    ['Nom du club', payload.nomClub],
    ['Site web actuel', payload.siteActuel || 'Aucun site renseigné'],
    ['Nom / Prénom du dirigeant', `${payload.prenom} ${payload.nom}`],
    ['Téléphone', payload.telephone],
    ['Email', payload.email],
    ['Instagram', payload.instagram || 'Non renseigné'],
    ['Facebook', payload.facebook || 'Non renseigné'],
    [
      'Pièces jointes',
      payload.attachments.length > 0
        ? payload.attachments.map((attachment) => attachment.filename).join(', ')
        : 'Aucune',
    ],
    ['Formule choisie', `${plan.name} — ${plan.price}/mois`],
    ['Consentement RGPD', payload.rgpd ? 'Oui' : 'Non'],
    ['Timestamp', `${timestampDisplay} (${timestampIso})`],
  ] as const;

  const htmlRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #e7e5e4;color:#57534e;font-size:14px;font-weight:600;width:38%;">${escapeHtml(label)}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:14px;line-height:1.5;">${escapeHtml(value)}</td>
        </tr>`
    )
    .join('');

  const text = [
    'Nouvelle inscription recue sur Triflow',
    '',
    ...rows.map(([label, value]) => `${label} : ${value}`),
  ].join('\n');

  const html = `<!doctype html>
<html lang="fr">
  <body style="margin:0;background:#f5f5f4;font-family:Arial,sans-serif;color:#1c1917;">
    <div style="max-width:720px;margin:0 auto;padding:32px 20px;">
      <div style="background:#1c1917;border-radius:24px;padding:28px 32px;color:#fafaf9;">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.24em;text-transform:uppercase;color:#fdba74;">Triflow</p>
        <h1 style="margin:0;font-size:30px;line-height:1.15;">Nouvelle demande d'inscription</h1>
        <p style="margin:14px 0 0;font-size:16px;line-height:1.6;color:#d6d3d1;">
          ${escapeHtml(payload.nomClub)} souhaite lancer le plan ${escapeHtml(plan.name)}.
        </p>
      </div>

      <div style="background:#ffffff;border:1px solid #e7e5e4;border-radius:24px;padding:10px 0;margin-top:18px;box-shadow:0 14px 30px rgba(28,25,23,0.06);">
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          <tbody>
            ${htmlRows}
          </tbody>
        </table>
      </div>

      <p style="margin:18px 4px 0;color:#78716c;font-size:13px;line-height:1.6;">
        Notification envoyée à ${escapeHtml(NOTIFICATION_EMAIL)}.
      </p>
    </div>
  </body>
</html>`;

  return { subject, html, text, timestampIso };
}

async function deliverNotification(
  to: string,
  subject: string,
  html: string,
  text: string,
  timestampIso: string,
  attachments: NanoCorpEmailAttachment[]
): Promise<DeliveryResult> {
  if (DELIVERY_MODE === 'capture') {
    await mkdir(CAPTURE_DIR, { recursive: true });
    const filePath = path.join(CAPTURE_DIR, `${timestampIso.replaceAll(/[:.]/g, '-')}.json`);

    await writeFile(
      filePath,
      JSON.stringify(
        {
          to,
          subject,
          text,
          html,
          attachments,
        },
        null,
        2
      ),
      'utf8'
    );

    return { previewPath: filePath };
  }

  await sendNanoCorpEmail({ to, subject, html, attachments });
  return {};
}

export async function POST(request: Request) {
  const ip = getClientIP(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Trop de demandes. Veuillez réessayer dans une heure.' },
      { status: 429 }
    );
  }

  try {
    const rawPayload = await request.json();
    const payload = validatePayload(rawPayload);
    const submittedAt = new Date();
    const { subject, html, text, timestampIso } = renderNotificationEmail(payload, submittedAt);
    const delivery = await deliverNotification(
      NOTIFICATION_EMAIL,
      subject,
      html,
      text,
      timestampIso,
      payload.attachments
    );

    return NextResponse.json({
      success: true,
      previewPath: delivery.previewPath ?? null,
    });
  } catch (error) {
    console.error('Inscription submission error:', error);

    const message =
      error instanceof Error ? error.message : "Une erreur inattendue s'est produite";

    const isValidationError =
      message === 'Format de payload invalide' ||
      message === 'Formule invalide' ||
      message === 'Nom du club requis' ||
      message === 'Prénom requis' ||
      message === 'Nom requis' ||
      message === 'Téléphone invalide' ||
      message === 'Email invalide' ||
      message === 'Consentement RGPD requis' ||
      message === 'Pièce jointe invalide' ||
      message === 'URL du site invalide' ||
      message === 'URL Instagram invalide' ||
      message === 'URL Facebook invalide';

    return NextResponse.json(
      {
        success: false,
        error: isValidationError ? message : "Impossible d'envoyer la demande pour le moment",
      },
      {
        status: isValidationError ? 400 : 500,
      }
    );
  }
}
