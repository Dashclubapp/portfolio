import Link from "next/link";

const NAV_PRODUIT = [
  { label: "Tarifs", href: "/pricing" },
  { label: "Comparatif", href: "/compare" },
  { label: "Démo", href: "https://demo.dashclub.app", external: true },
];

const NAV_RESSOURCES = [
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/#faq" },
];

const NAV_LEGAL = [
  { label: "Mentions légales", href: "/legal/mentions" },
  { label: "CGV", href: "/legal/cgv" },
  { label: "Confidentialité", href: "/legal/confidentialite" },
  { label: "Cookies", href: "/legal/cookies" },
];

function FooterCol({ title, links }: { title: string; links: typeof NAV_PRODUIT }) {
  return (
    <div>
      <p
        className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em]"
        style={{ color: "rgba(201,168,76,0.7)" }}
      >
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition hover:opacity-80"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm transition hover:opacity-80"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        {/* Top row: logo + 3 columns */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dashclub-real.svg"
              alt="DashClub"
              style={{ height: "40px", width: "auto", marginBottom: "12px" }}
            />
            <p className="text-sm leading-6" style={{ color: "rgba(255,255,255,0.45)" }}>
              Site web, inscriptions et paiements pour clubs sportifs.
            </p>
          </div>

          {/* Nav columns */}
          <FooterCol title="Produit" links={NAV_PRODUIT} />
          <FooterCol title="Ressources" links={NAV_RESSOURCES} />
          <FooterCol title="Légal" links={NAV_LEGAL} />
        </div>

        {/* Bottom row */}
        <div
          className="mt-10 flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 DashClub — Site web et événements pour clubs sportifs
          </p>
          <a
            href="mailto:hello@dashclub.fr"
            className="text-xs transition hover:opacity-80"
            style={{ color: "rgba(201,168,76,0.75)" }}
          >
            hello@dashclub.fr
          </a>
        </div>
      </div>
    </footer>
  );
}
