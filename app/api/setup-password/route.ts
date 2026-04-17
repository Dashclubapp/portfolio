import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';

export async function POST(req: NextRequest) {
  const { token, password, turnstileToken } = await req.json();

  if (!token || !password || !turnstileToken) {
    return NextResponse.json({ error: 'Paramètres manquants.' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: 'Mot de passe trop court (8 caractères minimum).' }, { status: 400 });
  }

  // Verify Turnstile
  const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: process.env.TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  });
  const turnstileData = await turnstileRes.json() as { success: boolean };
  if (!turnstileData.success) {
    return NextResponse.json({ error: 'Vérification de sécurité échouée. Réessayez.' }, { status: 400 });
  }

  // Look up token in DB
  const rows = await query<{
    id: number;
    setup_token_expires_at: Date;
  }>(
    'SELECT id, setup_token_expires_at FROM club_admin_users WHERE setup_token = $1',
    [token]
  );

  if (rows.length === 0) {
    return NextResponse.json({ error: 'Lien invalide ou déjà utilisé.', code: 'INVALID' }, { status: 400 });
  }

  const user = rows[0];
  if (new Date() > new Date(user.setup_token_expires_at)) {
    return NextResponse.json({ error: 'Ce lien a expiré.', code: 'EXPIRED' }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await query(
    'UPDATE club_admin_users SET password_hash = $1, setup_token = NULL, setup_token_expires_at = NULL WHERE id = $2',
    [passwordHash, user.id]
  );

  const response = NextResponse.json({ ok: true });
  response.cookies.set('dashclub_access', '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 an
    path: '/',
  });
  return response;
}
