import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import StripeConnectClient from "./StripeConnectClient";

async function getStripeData() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) redirect("/admin/login");

  const jwtSecret = process.env.JWT_SECRET ?? "";
  let clubId: number;
  let email: string;
  try {
    const secret = new TextEncoder().encode(jwtSecret);
    const { payload } = await jwtVerify(token, secret);
    const p = payload as { clubId?: number; sub?: string };
    clubId = p.clubId ?? 0;
    email = p.sub ?? "";
    if (!clubId) redirect("/admin/login");
  } catch {
    redirect("/admin/login");
  }

  const clubs = await query<{
    id: number;
    nom_club: string;
    stripe_connect_status: string;
    stripe_connect_account_id: string;
  }>(
    "SELECT id, nom_club, stripe_connect_status, stripe_connect_account_id FROM clubs WHERE id = $1",
    [clubId]
  );

  const club = clubs[0];
  if (!club) redirect("/admin/login");

  return { club, clubId, email };
}

export default async function StripePage() {
  const { club, clubId, email } = await getStripeData();
  return (
    <StripeConnectClient
      status={club.stripe_connect_status ?? "not_connected"}
      accountId={club.stripe_connect_account_id ?? null}
      clubId={clubId}
      clubName={club.nom_club}
      email={email}
    />
  );
}
