import { headers } from "next/headers";

const DEMO_HOSTS = new Set(["triflow-demo.nanocorp.app"]);
const DEMO_PATH_PREFIX = "/demo";

function normalizeHost(host: string | null): string {
  if (!host) {
    return "";
  }

  const firstForwardedHost = host.trim().toLowerCase().split(",")[0]?.trim() ?? "";
  if (!firstForwardedHost) {
    return "";
  }

  if (firstForwardedHost.startsWith("[")) {
    const closingBracketIndex = firstForwardedHost.indexOf("]");
    if (closingBracketIndex !== -1) {
      return firstForwardedHost.slice(1, closingBracketIndex);
    }
  }

  return firstForwardedHost.split(":")[0] ?? firstForwardedHost;
}

function requestTargetsDemoHost() {
  const requestHeaders = headers();
  const host =
    normalizeHost(requestHeaders.get("x-forwarded-host")) ||
    normalizeHost(requestHeaders.get("host"));

  return DEMO_HOSTS.has(host);
}

export function getDemoHref(pathname: string) {
  const normalizedPathname =
    pathname === "/" ? "/" : pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (requestTargetsDemoHost()) {
    return normalizedPathname;
  }

  return normalizedPathname === "/"
    ? DEMO_PATH_PREFIX
    : `${DEMO_PATH_PREFIX}${normalizedPathname}`;
}

export function getDemoEventHref(slug: string) {
  return getDemoHref(`/evenements/${slug}`);
}
