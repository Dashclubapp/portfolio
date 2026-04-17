const VERCEL_API = 'https://api.vercel.com';

interface EnvVar {
  key: string;
  value: string;
  type?: 'plain' | 'encrypted' | 'secret';
  target?: ('production' | 'preview' | 'development')[];
}

export interface VercelProject {
  projectId: string;
  projectUrl: string;
}

export async function createVercelProject(params: {
  slug: string;
  envVars: EnvVar[];
  domain: string;
}): Promise<VercelProject> {
  const token = process.env.VERCEL_TOKEN;
  const githubRepo = process.env.VERCEL_GITHUB_REPO ?? 'Dashclubapp/club-starter';
  if (!token) throw new Error('VERCEL_TOKEN non configuré');

  // 1. Create project linked to GitHub repo
  const createRes = await fetch(`${VERCEL_API}/v10/projects`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `dashclub-${params.slug}`,
      framework: 'nextjs',
      gitRepository: {
        type: 'github',
        repo: githubRepo,
      },
      buildCommand:
        'npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts && next build',
      rootDirectory: null,
    }),
  });

  if (!createRes.ok) {
    const body = await createRes.text();
    throw new Error(`Vercel create project error ${createRes.status}: ${body}`);
  }

  const project = await createRes.json() as { id: string };
  const projectId = project.id;

  // 2. Add environment variables
  const envPayload = params.envVars.map((e) => ({
    key: e.key,
    value: e.value,
    type: e.type ?? 'encrypted',
    target: e.target ?? ['production'],
  }));

  const envRes = await fetch(`${VERCEL_API}/v10/projects/${projectId}/env`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(envPayload),
  });

  if (!envRes.ok) {
    const body = await envRes.text();
    throw new Error(`Vercel env vars error ${envRes.status}: ${body}`);
  }

  // 3. Add custom domain
  const domainRes = await fetch(`${VERCEL_API}/v10/projects/${projectId}/domains`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: params.domain }),
  });

  if (!domainRes.ok) {
    const body = await domainRes.text();
    console.warn(`[vercel] Domain add warning ${domainRes.status}: ${body}`);
  }

  // 4. Trigger initial deployment
  const deployRes = await fetch(`${VERCEL_API}/v13/deployments`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `dashclub-${params.slug}`,
      project: projectId,
      target: 'production',
      gitSource: {
        type: 'github',
        repo: githubRepo,
        ref: 'master',
      },
    }),
  });

  if (!deployRes.ok) {
    const body = await deployRes.text();
    console.warn(`[vercel] Deployment trigger warning ${deployRes.status}: ${body}`);
  }

  return {
    projectId,
    projectUrl: `https://${params.domain}`,
  };
}
