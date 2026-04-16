import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { query } from '@/lib/db';

// In-memory rate limiter (resets on cold start — acceptable for demo)
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes
const JWT_EXPIRY = '24h';

function getClientIP(request: NextRequest): string {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

export async function POST(request: NextRequest) {
  const ip = getClientIP(request);

  // Rate limiting check
  const attempts = failedAttempts.get(ip);
  const now = Date.now();
  if (attempts && attempts.count >= MAX_ATTEMPTS && now < attempts.resetAt) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Réessayez dans 15 minutes.' },
      { status: 429 }
    );
  }

  let body: { username?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 400 });
  }

  const { username, password } = body;
  const jwtSecret = process.env.JWT_SECRET ?? '';

  if (!username || !password) {
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  // Look up user in club_admin_users table
  const users = await query<{
    id: number;
    club_id: number;
    email: string;
    nom: string;
    prenom: string;
    password_hash: string;
  }>(
    'SELECT id, club_id, email, nom, prenom, password_hash FROM club_admin_users WHERE email = $1 LIMIT 1',
    [username]
  );

  const user = users[0];
  let passwordMatch = false;

  if (user && password) {
    passwordMatch = await bcrypt.compare(password, user.password_hash);
  }

  if (!user || !passwordMatch) {
    // Track failed attempt
    const entry = failedAttempts.get(ip);
    if (!entry || now >= entry.resetAt) {
      failedAttempts.set(ip, { count: 1, resetAt: now + LOCKOUT_MS });
    } else {
      failedAttempts.set(ip, { count: entry.count + 1, resetAt: entry.resetAt });
    }
    return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
  }

  // Reset failed attempts on success
  failedAttempts.delete(ip);

  // Update last login
  await query('UPDATE club_admin_users SET last_login = NOW() WHERE id = $1', [user.id]);

  const secret = new TextEncoder().encode(jwtSecret);

  // Issue access token (24h) with clubId embedded
  const accessToken = await new SignJWT({
    sub: user.email,
    clubId: user.club_id,
    nom: user.nom,
    prenom: user.prenom,
    role: 'club_admin',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRY)
    .sign(secret);

  const response = NextResponse.json({ ok: true });

  response.cookies.set('admin_token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 24 * 60 * 60, // 24 hours
  });

  return response;
}
