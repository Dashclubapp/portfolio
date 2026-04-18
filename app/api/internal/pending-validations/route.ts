import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

function authorized(req: NextRequest) {
  const secret = process.env.INTERNAL_API_SECRET;
  return secret && req.headers.get('x-internal-secret') === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const rows = await query<{
    club_id: number;
    club_nom: string;
    email: string;
    ville: string;
    sport: string;
    formule: string;
    temp_subdomain: string;
    suggested_subdomain: string;
    subdomain_status: string;
    vercel_project_id: string;
    created_at: string;
  }>(`
    SELECT
      c.id AS club_id,
      c.nom_club AS club_nom,
      c.email,
      c.ville,
      c.sport,
      c.formule,
      cd.temp_subdomain,
      cd.suggested_subdomain,
      cd.subdomain_status,
      cd.vercel_project_id,
      cd.created_at
    FROM club_domains cd
    JOIN clubs c ON c.id = cd.club_id
    WHERE cd.subdomain_status = 'pending_validation'
    ORDER BY cd.created_at DESC
  `);

  return NextResponse.json(rows);
}
