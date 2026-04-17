const CF_API = 'https://api.cloudflare.com/client/v4';

export async function createSubdomain(slug: string): Promise<void> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  if (!token || !zoneId) throw new Error('CLOUDFLARE_API_TOKEN ou CLOUDFLARE_ZONE_ID non configurés');

  const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: 'CNAME',
      name: slug,                       // slug.dashclub.app
      content: 'cname.vercel-dns.com',  // Vercel's CNAME target
      proxied: false,                   // must be false for Vercel SSL to work
      ttl: 1,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Cloudflare API error ${res.status}: ${body}`);
  }

  const data = await res.json() as { success: boolean; errors: unknown[] };
  if (!data.success) {
    throw new Error(`Cloudflare DNS error: ${JSON.stringify(data.errors)}`);
  }
}
