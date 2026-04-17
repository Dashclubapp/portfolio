const NEON_API = 'https://console.neon.tech/api/v2';

export interface NeonProject {
  projectId: string;
  databaseUrl: string;   // pooled (Prisma runtime)
  directUrl: string;     // direct (Prisma migrations)
}

export async function createNeonProject(slug: string): Promise<NeonProject> {
  const apiKey = process.env.NEON_API_KEY;
  if (!apiKey) throw new Error('NEON_API_KEY non configurée');

  const res = await fetch(`${NEON_API}/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      project: {
        name: `dashclub-${slug}`,
        region_id: 'aws-eu-central-1',
        pg_version: 16,
      },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Neon API error ${res.status}: ${body}`);
  }

  const data = await res.json() as {
    project: { id: string };
    connection_uris: Array<{ connection_uri: string; pooler_host?: string; connection_parameters: { host: string } }>;
  };

  const uri = data.connection_uris[0]?.connection_uri;
  if (!uri) throw new Error('Neon: aucune connection_uri dans la réponse');

  // Neon returns the pooled URI. The direct URI uses a non-pooler host.
  // Replace "-pooler." with "." to get the direct connection.
  const directUri = uri.replace('-pooler.', '.');

  return {
    projectId: data.project.id,
    databaseUrl: uri,
    directUrl: directUri,
  };
}
