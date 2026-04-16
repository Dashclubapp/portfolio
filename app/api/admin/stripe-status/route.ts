import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  const session = await getAdminSession(request);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const clubs = await query<{
    stripe_connect_status: string;
    stripe_connect_account_id: string;
    nom_club: string;
  }>(
    'SELECT stripe_connect_status, stripe_connect_account_id, nom_club FROM clubs WHERE id = $1',
    [session.clubId]
  );

  const club = clubs[0];
  if (!club) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    status: club.stripe_connect_status ?? 'not_connected',
    account_id: club.stripe_connect_account_id ?? null,
    club_name: club.nom_club,
  });
}
