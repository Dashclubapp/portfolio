import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const clubs = await query<{
    id: number;
    nom_club: string;
    sport: string;
    ville: string;
    prenom_responsable: string;
    nom_responsable: string;
    email: string;
    formule: string;
    stripe_connect_status: string;
    stripe_connect_account_id: string;
    description_courte: string;
    logo_url: string;
    couleur_primaire: string;
    couleur_secondaire: string;
    email_contact: string;
    telephone_contact: string;
    created_at: string;
  }>(
    `SELECT c.id, c.nom_club, c.sport, c.ville, c.prenom_responsable, c.nom_responsable,
            c.email, c.formule, c.stripe_connect_status, c.stripe_connect_account_id,
            c.description_courte, c.logo_url, c.couleur_primaire, c.couleur_secondaire,
            c.email_contact, c.telephone_contact, c.created_at
     FROM clubs c WHERE c.id = $1`,
    [session.clubId]
  );

  const club = clubs[0];
  if (!club) {
    return NextResponse.json({ error: 'Club not found' }, { status: 404 });
  }

  // Get subdomain
  const domains = await query<{ subdomain: string }>(
    'SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1',
    [session.clubId]
  );
  const slug = domains[0]?.subdomain ?? '';

  return NextResponse.json({
    prenom: session.prenom,
    nom: session.nom,
    email: session.sub,
    club,
    slug,
  });
}
