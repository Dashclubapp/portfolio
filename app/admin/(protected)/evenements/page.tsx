import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import EventsListClient from "./EventsListClient";

async function getEventsData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const jwtSecret = process.env.JWT_SECRET ?? "";
  let clubId: number;
  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    clubId = (payload as { clubId?: number }).clubId ?? 0;
    if (!clubId) redirect("/admin/login");
  } catch {
    redirect("/admin/login");
  }

  const events = await query<{
    id: number;
    titre: string;
    slug: string;
    date_evenement: string;
    nb_places: number;
    tarif_standard: string;
    statut: string;
    created_at: string;
  }>(
    `SELECT id, titre, slug, date_evenement, nb_places, tarif_standard, statut, created_at
     FROM club_events WHERE club_id = $1 ORDER BY created_at DESC`,
    [clubId]
  );

  const domains = await query<{ subdomain: string }>(
    "SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1",
    [clubId]
  );

  return { events, slug: domains[0]?.subdomain ?? "" };
}

export default async function EventsPage() {
  const { events, slug } = await getEventsData();
  return <EventsListClient events={events} slug={slug} />;
}
