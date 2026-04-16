import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

async function makeUniqueEventSlug(base: string, clubId: number): Promise<string> {
  let slug = slugify(base);
  let counter = 1;
  while (true) {
    const rows = await query<{ count: string }>(
      'SELECT COUNT(*) as count FROM club_events WHERE slug = $1 AND club_id = $2',
      [slug, clubId]
    );
    if (parseInt(rows[0].count, 10) === 0) break;
    slug = `${slugify(base)}-${counter}`;
    counter++;
  }
  return slug;
}

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const events = await query<{
    id: number;
    titre: string;
    slug: string;
    date_evenement: string;
    nb_places: number;
    tarif_standard: string;
    tarif_membre: string;
    statut: string;
    created_at: string;
    inscrits: string;
  }>(
    `SELECT e.id, e.titre, e.slug, e.date_evenement, e.nb_places,
            e.tarif_standard, e.tarif_membre, e.statut, e.created_at,
            0 as inscrits
     FROM club_events e
     WHERE e.club_id = $1
     ORDER BY e.created_at DESC`,
    [session.clubId]
  );

  return NextResponse.json({ events });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  let body: {
    titre?: string;
    description?: string;
    date_evenement?: string;
    nb_places?: number;
    tarif_standard?: number;
    tarif_membre?: number;
    statut?: 'draft' | 'published';
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.titre || !body.date_evenement || !body.tarif_standard) {
    return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
  }

  const slug = await makeUniqueEventSlug(body.titre, session.clubId);

  const rows = await query<{ id: number; slug: string }>(
    `INSERT INTO club_events (club_id, titre, slug, description, date_evenement, nb_places, tarif_standard, tarif_membre, statut)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
     RETURNING id, slug`,
    [
      session.clubId,
      body.titre,
      slug,
      body.description ?? null,
      body.date_evenement,
      body.nb_places ?? null,
      body.tarif_standard,
      body.tarif_membre ?? null,
      body.statut ?? 'draft',
    ]
  );

  return NextResponse.json({ ok: true, event: rows[0] });
}
