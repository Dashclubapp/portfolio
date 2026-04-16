import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { query } from "@/lib/db";
import { redirect } from "next/navigation";
import NewEventClient from "./NewEventClient";

async function getSlug() {
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

  const domains = await query<{ subdomain: string }>(
    "SELECT subdomain FROM club_domains WHERE club_id = $1 LIMIT 1",
    [clubId]
  );

  return domains[0]?.subdomain ?? "";
}

export default async function NewEventPage() {
  const slug = await getSlug();
  return <NewEventClient slug={slug} />;
}
