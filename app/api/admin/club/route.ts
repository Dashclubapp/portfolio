import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const clubs = await query<{
    id: number;
    nom_club: string;
    sport: string;
    ville: string;
    description_courte: string;
    logo_url: string;
    couleur_primaire: string;
    couleur_secondaire: string;
    email_contact: string;
    telephone_contact: string;
    email: string;
    telephone: string;
  }>(
    `SELECT id, nom_club, sport, ville, description_courte, logo_url,
            couleur_primaire, couleur_secondaire, email_contact, telephone_contact,
            email, telephone
     FROM clubs WHERE id = $1`,
    [session.clubId]
  );

  const club = clubs[0];
  if (!club) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const domains = await query<{ subdomain: string }>(
    'SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1',
    [session.clubId]
  );

  return NextResponse.json({ ...club, slug: domains[0]?.subdomain ?? '' });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: {
    nom_club?: string;
    sport?: string;
    ville?: string;
    description_courte?: string;
    couleur_primaire?: string;
    couleur_secondaire?: string;
    email_contact?: string;
    telephone_contact?: string;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  await query(
    `UPDATE clubs SET
      nom_club = COALESCE($2, nom_club),
      sport = COALESCE($3, sport),
      ville = COALESCE($4, ville),
      description_courte = COALESCE($5, description_courte),
      couleur_primaire = COALESCE($6, couleur_primaire),
      couleur_secondaire = COALESCE($7, couleur_secondaire),
      email_contact = COALESCE($8, email_contact),
      telephone_contact = COALESCE($9, telephone_contact)
    WHERE id = $1`,
    [
      session.clubId,
      body.nom_club ?? null,
      body.sport ?? null,
      body.ville ?? null,
      body.description_courte ?? null,
      body.couleur_primaire ?? null,
      body.couleur_secondaire ?? null,
      body.email_contact ?? null,
      body.telephone_contact ?? null,
    ]
  );

  return NextResponse.json({ ok: true });
}
