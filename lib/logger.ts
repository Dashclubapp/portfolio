import { query } from './db';

export type LogLevel = 'info' | 'success' | 'warning' | 'error';

export interface ClubLogEntry {
  id: number;
  club_id: number;
  event_type: string;
  level: LogLevel;
  message: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

let tableEnsured = false;

async function ensureTable() {
  if (tableEnsured) return;
  await query(`
    CREATE TABLE IF NOT EXISTS club_logs (
      id          SERIAL PRIMARY KEY,
      club_id     INTEGER NOT NULL,
      event_type  VARCHAR(100) NOT NULL,
      level       VARCHAR(20) NOT NULL DEFAULT 'info',
      message     TEXT NOT NULL,
      metadata    JSONB,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query(`
    CREATE INDEX IF NOT EXISTS club_logs_club_id_idx ON club_logs(club_id, created_at DESC)
  `);
  tableEnsured = true;
}

export async function logClubEvent(
  clubId: number,
  eventType: string,
  message: string,
  options?: { level?: LogLevel; metadata?: Record<string, unknown> }
): Promise<void> {
  const level = options?.level ?? 'info';
  const metadata = options?.metadata ?? null;
  try {
    await ensureTable();
    await query(
      `INSERT INTO club_logs (club_id, event_type, level, message, metadata)
       VALUES ($1, $2, $3, $4, $5)`,
      [clubId, eventType, level, message, metadata ? JSON.stringify(metadata) : null]
    );
  } catch (err) {
    // Never let logging block the main flow
    console.error('[logger] Failed to write log:', err);
  }
}

export async function getClubLogs(clubId: number, limit = 200): Promise<ClubLogEntry[]> {
  await ensureTable();
  return query<ClubLogEntry>(
    `SELECT id, club_id, event_type, level, message, metadata, created_at
     FROM club_logs WHERE club_id = $1
     ORDER BY created_at DESC LIMIT $2`,
    [clubId, limit]
  );
}

export async function getRecentLogsAllClubs(limit = 5): Promise<(ClubLogEntry & { club_nom: string; email: string })[]> {
  await ensureTable();
  return query(
    `SELECT l.id, l.club_id, l.event_type, l.level, l.message, l.metadata, l.created_at,
            c.nom_club AS club_nom, c.email
     FROM club_logs l
     JOIN clubs c ON c.id = l.club_id
     ORDER BY l.created_at DESC LIMIT $1`,
    [limit]
  );
}
