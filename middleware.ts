import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const ALLOWED_IPS = [
  '90.47.13.240',
  '2001:4860:7:150f::fc',
];
const DEMO_HOSTS = new Set(['demo.dashclub.app']);
const DEMO_PATH_PREFIX = '/demo';
const ADMIN_LOGIN_PATH = '/admin/login';
const NORMALIZED_ALLOWED_IPS = new Set(ALLOWED_IPS.map(normalizeIP));

function normalizeIP(ip: string): string {
  let normalizedIP = ip.trim().toLowerCase();

  if (!normalizedIP) {
    return '';
  }

  if (normalizedIP.startsWith('[')) {
    const closingBracketIndex = normalizedIP.indexOf(']');
    if (closingBracketIndex !== -1) {
      normalizedIP = normalizedIP.slice(1, closingBracketIndex);
    }
  }

  const ipv4WithPortMatch = normalizedIP.match(/^(\d{1,3}(?:\.\d{1,3}){3}):\d+$/);
  if (ipv4WithPortMatch) {
    normalizedIP = ipv4WithPortMatch[1];
  }

  if (normalizedIP.startsWith('::ffff:')) {
    normalizedIP = normalizedIP.slice(7);
  }

  return normalizedIP;
}

function normalizeHost(host: string): string {
  const normalizedHost = host.trim().toLowerCase();

  if (!normalizedHost) {
    return '';
  }

  const firstForwardedHost = normalizedHost.split(',')[0]?.trim() ?? '';
  if (!firstForwardedHost) {
    return '';
  }

  if (firstForwardedHost.startsWith('[')) {
    const closingBracketIndex = firstForwardedHost.indexOf(']');
    if (closingBracketIndex !== -1) {
      return firstForwardedHost.slice(1, closingBracketIndex);
    }
  }

  const hostSegments = firstForwardedHost.split(':');
  return hostSegments[0] ?? firstForwardedHost;
}

function getClientIP(request: NextRequest): string {
  const xForwardedFor = request.headers.get('x-forwarded-for');
  if (xForwardedFor) {
    return normalizeIP(xForwardedFor.split(',')[0]);
  }
  const xRealIP = request.headers.get('x-real-ip');
  if (xRealIP) {
    return normalizeIP(xRealIP);
  }
  return '';
}

function getRequestHost(request: NextRequest): string {
  const forwardedHost = request.headers.get('x-forwarded-host');
  if (forwardedHost) {
    return normalizeHost(forwardedHost);
  }

  const host = request.headers.get('host');
  if (host) {
    return normalizeHost(host);
  }

  return '';
}

function isDemoHost(host: string): boolean {
  return DEMO_HOSTS.has(host);
}

const ANALYTICS_ORIGIN = 'https://phospho-nanocorp-prod--nanocorp-api-fastapi-app.modal.run';

const IS_DEV = process.env.NODE_ENV === 'development';

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // unsafe-eval requis par Next.js HMR en développement
  `script-src 'self' 'unsafe-inline'${IS_DEV ? " 'unsafe-eval'" : ''} ${ANALYTICS_ORIGIN}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: https:",
  "font-src 'self' https://fonts.gstatic.com",
  `connect-src 'self' ${ANALYTICS_ORIGIN} https://api.stripe.com`,
  // stripe.com pour le checkout Stripe (redirection)
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  // stripe.com inclus pour la redirection vers checkout
  "form-action 'self' https://checkout.stripe.com",
].join('; ');

function addSecurityHeaders(response: NextResponse) {
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload',
  );
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=()',
  );
  response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY);
  return response;
}

function buildDemoUrl(request: NextRequest, pathname: string) {
  const demoUrl = request.nextUrl.clone();
  demoUrl.hostname = 'triflow-demo.nanocorp.app';
  demoUrl.pathname = pathname;
  return demoUrl;
}

const FORBIDDEN_HTML = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>403</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#fff;color:#000;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh}
p{font-size:1rem;letter-spacing:0.05em}
</style>
</head>
<body><p>Accès restreint.</p></body>
</html>`;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = getRequestHost(request);
  const requestTargetsDemoHost = isDemoHost(host);

  // Skip static assets and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/fonts/')
  ) {
    return NextResponse.next();
  }

  if (requestTargetsDemoHost) {
    // /back/* → rewrite to /demo/admin/*
    if (pathname === '/back' || pathname.startsWith('/back/')) {
      const adminPath = pathname === '/back'
        ? '/demo/admin'
        : `/demo/admin${pathname.slice('/back'.length)}`;
      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = adminPath;
      return addSecurityHeaders(NextResponse.rewrite(rewriteUrl));
    }

    // Canonical redirect: if someone navigates to /demo/club/* on the demo host
    if (pathname.startsWith('/demo/club')) {
      const cleanPath = pathname.slice('/demo/club'.length) || '/';
      return addSecurityHeaders(NextResponse.redirect(new URL(cleanPath, request.url)));
    }

    // Canonical redirect: if someone navigates to /demo/admin/* on the demo host
    if (pathname.startsWith('/demo/admin')) {
      const cleanPath = '/back' + (pathname.slice('/demo/admin'.length) || '');
      return addSecurityHeaders(NextResponse.redirect(new URL(cleanPath, request.url)));
    }

    // Canonical redirect: /demo → /
    if (pathname === '/demo' || pathname.startsWith('/demo/')) {
      return addSecurityHeaders(NextResponse.redirect(new URL('/', request.url)));
    }

    // Skip API routes
    if (pathname.startsWith('/api/')) {
      return addSecurityHeaders(NextResponse.next());
    }

    // All other paths → rewrite to /demo/club/*
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = pathname === '/' ? '/demo/club' : `/demo/club${pathname}`;
    return addSecurityHeaders(NextResponse.rewrite(rewriteUrl));

  } else {
    // /demo paths are publicly accessible on the main domain — no redirect
    if (pathname === DEMO_PATH_PREFIX || pathname.startsWith(`${DEMO_PATH_PREFIX}/`)) {
      return addSecurityHeaders(NextResponse.next());
    }

    // Admin routes are accessible on the main domain — JWT protection below
  }

  // Admin route protection (JWT check) — works on both demo host and main domain
  if (
    pathname.startsWith('/admin') &&
    pathname !== ADMIN_LOGIN_PATH &&
    !pathname.startsWith('/admin/login')
  ) {
    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return addSecurityHeaders(
        NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url)),
      );
    }

    try {
      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        return addSecurityHeaders(
          NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url)),
        );
      }
      const secret = new TextEncoder().encode(jwtSecret);
      await jwtVerify(token, secret);
    } catch {
      const response = NextResponse.redirect(new URL(ADMIN_LOGIN_PATH, request.url));
      response.cookies.delete('admin_token');
      return addSecurityHeaders(response);
    }
  }

  // Add security headers to all responses
  return addSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
