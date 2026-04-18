import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { getClubLogs, getRecentLogsAllClubs } from '@/lib/logger';

function authorized(req: NextRequest) {
  const secret = process.env.INTERNAL_API_SECRET;
  return secret && req.headers.get('x-internal-secret') === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  const clubId = req.nextUrl.searchParams.get('clubId');

  if (clubId) {
    const logs = await getClubLogs(Number(clubId));
    return NextResponse.json(logs);
  }

  // No clubId → return one summary row per club (latest log + total count)
  const rows = await query<{
    club_id: number;
    club_nom: string;
    email: string;
    formule: string;
    onboarding_status: string;
    log_count: string;
    last_event: string | null;
    last_level: string | null;
    last_message: string | null;
    last_at: string | null;
  }>(`
    SELECT
      c.id AS club_id,
      c.nom_club AS club_nom,
      c.email,
      c.formule,
      c.onboarding_status,
      COUNT(l.id)::text AS log_count,
      (SELECT event_type FROM club_logs WHERE club_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_event,
      (SELECT level        FROM club_logs WHERE club_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_level,
      (SELECT message      FROM club_logs WHERE club_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_message,
      (SELECT created_at   FROM club_logs WHERE club_id = c.id ORDER BY created_at DESC LIMIT 1) AS last_at
    FROM clubs c
    LEFT JOIN club_logs l ON l.club_id = c.id
    GROUP BY c.id
    ORDER BY last_at DESC NULLS LAST
  `);

  return NextResponse.json(rows);
}
