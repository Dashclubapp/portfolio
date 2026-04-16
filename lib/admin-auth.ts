import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export interface AdminTokenPayload {
  sub: string;
  clubId: number;
  nom: string;
  prenom: string;
  role: string;
}

export async function getAdminSession(request: NextRequest): Promise<AdminTokenPayload | null> {
  const token = request.cookies.get('admin_token')?.value;
  if (!token) return null;

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return null;

  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminTokenPayload;
  } catch {
    return null;
  }
}
