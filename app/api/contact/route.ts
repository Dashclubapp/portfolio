import { NextResponse } from "next/server";
import { sendNanoCorpEmail } from "@/lib/nanocorp-email";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function getClientIP(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const NOTIFICATION_EMAIL = process.env.INSCRIPTION_NOTIFICATION_EMAIL ?? "hello@dashclub.fr";

export async function POST(request: Request) {
  const ip = getClientIP(request);
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Trop de tentatives. Réessayez dans une heure." },
      { status: 429 }
    );
  }

  try {
    const raw = await request.json();
    const name = normalize(raw.name);
    const email = normalize(raw.email);
    const subject = normalize(raw.subject);
    const message = normalize(raw.message);

    if (!name) return NextResponse.json({ success: false, error: "Nom requis." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ success: false, error: "Email invalide." }, { status: 400 });
    if (!subject) return NextResponse.json({ success: false, error: "Sujet requis." }, { status: 400 });
    if (message.length < 10) return NextResponse.json({ success: false, error: "Message trop court." }, { status: 400 });

    const submittedAt = new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "full",
      timeStyle: "short",
      timeZone: "Europe/Paris",
    }).format(new Date());

    const html = `<!doctype html>
<html lang="fr">
<body style="margin:0;background:#f5f5f4;font-family:Arial,sans-serif;color:#1c1917;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="background:#0D1F3C;border-radius:20px;padding:28px 32px;color:#fafaf9;">
      <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#C9A84C;">DashClub</p>
      <h1 style="margin:0;font-size:26px;line-height:1.2;">Nouveau message de contact</h1>
    </div>
    <div style="background:#fff;border:1px solid #e7e5e4;border-radius:20px;padding:10px 0;margin-top:16px;">
      <table role="presentation" style="width:100%;border-collapse:collapse;">
        <tr>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#57534e;font-size:13px;font-weight:600;width:36%;">Nom</td>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:14px;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#57534e;font-size:13px;font-weight:600;">Email</td>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:14px;">${escapeHtml(email)}</td>
        </tr>
        <tr>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#57534e;font-size:13px;font-weight:600;">Sujet</td>
          <td style="padding:12px 20px;border-bottom:1px solid #e7e5e4;color:#1c1917;font-size:14px;">${escapeHtml(subject)}</td>
        </tr>
        <tr>
          <td style="padding:12px 20px;color:#57534e;font-size:13px;font-weight:600;vertical-align:top;">Message</td>
          <td style="padding:12px 20px;color:#1c1917;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(message)}</td>
        </tr>
      </table>
    </div>
    <p style="margin:14px 4px 0;color:#78716c;font-size:12px;">
      Reçu le ${submittedAt} — Répondre à <a href="mailto:${escapeHtml(email)}" style="color:#C9A84C;">${escapeHtml(email)}</a>
    </p>
  </div>
</body>
</html>`;

    await sendNanoCorpEmail({
      to: NOTIFICATION_EMAIL,
      subject: `[Contact DashClub] ${subject} — ${name}`,
      html,
      attachments: [],
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, error: "Impossible d'envoyer le message pour le moment." },
      { status: 500 }
    );
  }
}
