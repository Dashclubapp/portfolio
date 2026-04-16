import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import ClubInfoClient from "./ClubInfoClient";

async function getClubData() {
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
    [clubId]
  );

  const club = clubs[0];
  if (!club) redirect("/admin/login");

  const domains = await query<{ subdomain: string }>(
    "SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1",
    [clubId]
  );

  return { club, slug: domains[0]?.subdomain ?? "" };
}

export default async function ClubInfoPage() {
  const { club, slug } = await getClubData();
  return <ClubInfoClient club={club} slug={slug} />;
}
