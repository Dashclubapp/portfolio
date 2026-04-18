export interface ScrapedBranding {
  logoUrl?: string;
  bannerUrl?: string;
  colorPrimary?: string;
  colorAccent?: string;
  description?: string;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function resolveUrl(href: string | undefined, base: string): string | undefined {
  if (!href) return undefined;
  try { return new URL(href, base).toString(); } catch { return undefined; }
}

function extractMeta(html: string, property: string): string | undefined {
  // <meta property="X" content="Y"> or <meta content="Y" property="X">
  const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`, 'i');
  return html.match(re1)?.[1] ?? html.match(re2)?.[1];
}

function extractLinkHref(html: string, rel: string): string | undefined {
  // <link rel="X" href="Y"> or <link href="Y" rel="X">
  const re1 = new RegExp(`<link[^>]+rel=["'][^"']*${rel}[^"']*["'][^>]+href=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*${rel}[^"']*["']`, 'i');
  return html.match(re1)?.[1] ?? html.match(re2)?.[1];
}

function extractCssColor(css: string): string | undefined {
  // Look for CSS custom properties likely to be primary brand colors
  const patterns = [
    /--(?:color-?)?primary\s*:\s*(#[0-9a-fA-F]{3,8})/i,
    /--brand(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})/i,
    /--main-color\s*:\s*(#[0-9a-fA-F]{3,8})/i,
    /--accent-color\s*:\s*(#[0-9a-fA-F]{3,8})/i,
    /--color-accent\s*:\s*(#[0-9a-fA-F]{3,8})/i,
  ];
  for (const re of patterns) {
    const m = css.match(re);
    if (m) return m[1];
  }

  // Look for background on header or nav
  const headerBg = css.match(/(?:header|\.header|nav|\.navbar)[^{]*\{[^}]*background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,8})/i)?.[1];
  if (headerBg && headerBg.toLowerCase() !== '#ffffff' && headerBg.toLowerCase() !== '#fff') {
    return headerBg;
  }

  return undefined;
}

function extractLogoFromImgTags(html: string, base: string): string | undefined {
  // <img> tags where class/id/alt/src contains "logo"
  const imgRe = /<img[^>]+>/gi;
  const matches = html.match(imgRe) ?? [];
  for (const tag of matches) {
    if (/logo/i.test(tag)) {
      const src = tag.match(/src=["']([^"']+)["']/i)?.[1];
      const resolved = resolveUrl(src, base);
      if (resolved) return resolved;
    }
  }
  return undefined;
}

export async function scrapeClubWebsite(rawUrl: string): Promise<ScrapedBranding> {
  const url = normalizeUrl(rawUrl);
  if (!url) return {};

  let html: string;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'DashClub/1.0 (club-site-scanner; contact: hello@dashclub.app)',
        Accept: 'text/html',
      },
      redirect: 'follow',
    });
    clearTimeout(timeout);
    if (!res.ok) return {};
    html = await res.text();
  } catch {
    return {};
  }

  // ── Logo ──────────────────────────────────────────────────────────────────
  const ogImage     = extractMeta(html, 'og:image');
  const touchIcon   = extractLinkHref(html, 'apple-touch-icon');
  const faviconPng  = (() => {
    // Only take PNG favicons (SVG/ico are low quality for display)
    const re1 = /<link[^>]+rel=["'](?:shortcut )?icon["'][^>]+href=["']([^"']+\.png[^"']*)["']/i;
    const re2 = /<link[^>]+href=["']([^"']+\.png[^"']*)["'][^>]+rel=["'](?:shortcut )?icon["']/i;
    return html.match(re1)?.[1] ?? html.match(re2)?.[1];
  })();
  const imgLogo = extractLogoFromImgTags(html, url);

  // Priority: apple-touch-icon > img.logo > favicon png (og:image goes to banner)
  const logoUrl =
    resolveUrl(touchIcon, url) ??
    imgLogo ??
    resolveUrl(faviconPng, url);

  const bannerUrl = resolveUrl(ogImage, url);

  // ── Colors ────────────────────────────────────────────────────────────────
  const themeColor = extractMeta(html, 'theme-color');

  const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map(m => m[1])
    .join('\n');
  const cssColor = extractCssColor(styleBlocks);

  const colorPrimary = themeColor ?? cssColor;

  // ── Description ───────────────────────────────────────────────────────────
  const description =
    extractMeta(html, 'og:description') ??
    extractMeta(html, 'description');

  return {
    logoUrl:      logoUrl      || undefined,
    bannerUrl:    bannerUrl    || undefined,
    colorPrimary: colorPrimary || undefined,
    description:  description?.slice(0, 300) || undefined,
  };
}
