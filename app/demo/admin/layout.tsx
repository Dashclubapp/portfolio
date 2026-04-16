"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarLinks = [
  { href: "/demo/admin", label: "Dashboard", icon: "📊", exact: true },
  { href: "/demo/admin/evenements", label: "Événements", icon: "📅", exact: false },
  { href: "/demo/admin/adherents", label: "Adhérents", icon: "👥", exact: false },
  { href: "/demo/admin/emails", label: "Emails auto", icon: "✉️", exact: false },
  { href: "/demo/admin/paiements", label: "Paiements", icon: "💳", exact: false },
  { href: "/demo/admin/boutique", label: "Boutique", icon: "🛒", exact: false },
  { href: "/demo/admin/parametres", label: "Paramètres", icon: "⚙️", exact: false },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-[#0D1F3C]/10 bg-white">
      {/* Logo */}
      <div className="border-b border-[#0D1F3C]/10 px-6 py-5">
        <Link href="/demo/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0D1F3C]">
            <span className="text-[9px] font-bold text-[#C9A84C]">DC</span>
          </div>
          <div>
            <p className="text-xs font-bold text-[#0D1F3C]">DashClub</p>
            <p className="text-[10px] text-[#0D1F3C]/40">USM Triathlon</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-[#0D1F3C] text-white"
                      : "text-[#0D1F3C]/60 hover:bg-[#0D1F3C]/5 hover:text-[#0D1F3C]"
                  }`}
                >
                  <span className="text-base">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer links */}
      <div className="border-t border-[#0D1F3C]/10 p-4">
        <Link
          href="/demo/club"
          className="flex items-center gap-2 text-xs text-[#0D1F3C]/40 hover:text-[#0D1F3C]"
        >
          🌐 Voir le site public
        </Link>
        <Link
          href="/demo"
          className="mt-2 flex items-center gap-2 text-xs text-[#0D1F3C]/40 hover:text-[#0D1F3C]"
        >
          ← Retour à la démo
        </Link>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F8F6F1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* Demo banner */}
        <div className="bg-[#0D1F3C] px-6 py-2.5 text-sm text-white/80">
          🎯 Mode démo DashClub — Données fictives |{" "}
          <span className="text-white/50">Explorez librement</span>
        </div>
        <main className="flex-1 overflow-auto px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
