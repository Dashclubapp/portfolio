import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";

async function getAdminData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const jwtSecret = process.env.JWT_SECRET ?? "";
  let payload: { clubId?: number; prenom?: string; nom?: string; sub?: string };
  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload: p } = await jwtVerify(token, secret);
    payload = p as typeof payload;
  } catch {
    redirect("/admin/login");
  }

  const clubId = payload.clubId;
  if (!clubId) redirect("/admin/login");

  const clubs = await query<{
    id: number;
    nom_club: string;
    sport: string;
    ville: string;
    prenom_responsable: string;
    stripe_connect_status: string;
    stripe_connect_account_id: string;
    formule: string;
    created_at: string;
  }>(
    `SELECT id, nom_club, sport, ville, prenom_responsable,
            stripe_connect_status, stripe_connect_account_id, formule, created_at
     FROM clubs WHERE id = $1`,
    [clubId]
  );

  const club = clubs[0];
  if (!club) redirect("/admin/login");

  const domains = await query<{ subdomain: string }>(
    "SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1",
    [clubId]
  );
  const slug = domains[0]?.subdomain ?? "";

  const events = await query<{ count: string }>(
    "SELECT COUNT(*) as count FROM club_events WHERE club_id = $1",
    [clubId]
  );
  const eventCount = parseInt(events[0]?.count ?? "0", 10);

  return {
    prenom: payload.prenom ?? club.prenom_responsable ?? "",
    club,
    slug,
    eventCount,
  };
}

export default async function AdminDashboardPage() {
  const data = await getAdminData();
  return <AdminDashboardClient {...data} />;
}
