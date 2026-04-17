import type { ReactNode } from 'react';
import Link from 'next/link';

export const metadata = {
  robots: { index: false },
};

const NAV_LINKS = [
  { href: '/docs', label: 'Accueil docs' },
  { href: '/docs/dns', label: 'Configurer son domaine' },
  { href: '/docs/stripe', label: 'Connecter Stripe' },
  { href: '/docs/premiere-course', label: 'Créer sa première course' },
];

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-[#C9A84C]/20 bg-[#0D1F3C]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <Link href="/docs" className="flex items-center gap-2.5">
            <span className="text-base font-bold tracking-[0.08em] text-[#C9A84C]">DashClub</span>
            <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium text-white/60">Documentation</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.slice(1).map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="/" className="text-xs text-white/40 transition hover:text-white/70">
            ← Retour au site
          </Link>
        </div>
      </header>

      {/* Sidebar + content */}
      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <aside className="hidden w-56 shrink-0 md:block">
          <nav className="sticky top-20 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <div className="bg-[#0D1F3C] px-4 py-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9A84C]">Guides</p>
            </div>
            <div className="p-2 space-y-0.5">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-[#C9A84C]/10 hover:text-[#C9A84C]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
