"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: string;
};

const navItems: NavItem[] = [
  { href: "/admin", label: "Tableau de bord", icon: "🏠" },
  { href: "/admin/evenements", label: "Événements", icon: "🏟️" },
  { href: "/admin/club", label: "Mon site / Infos club", icon: "🎨" },
  { href: "/admin/stripe", label: "Stripe Connect", icon: "⚡" },
  { href: "/admin/parametres", label: "Paramètres", icon: "⚙️" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === href;
  return pathname.startsWith(href);
}

function NavLink({ item, pathname, onClick }: { item: NavItem; pathname: string; onClick?: () => void }) {
  const active = isActive(pathname, item.href);
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30"
          : "text-white/70 hover:bg-white/8 hover:text-white border border-transparent"
      }`}
    >
      <span className="text-base leading-none">{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] shrink-0">
        <div className="sticky top-4 flex flex-col gap-0 rounded-2xl overflow-hidden border border-white/10 bg-[#0D1F3C] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          {/* Logo */}
          <div className="px-6 py-5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#0D1F3C] font-black text-sm">D</div>
              <span className="text-white font-bold text-base tracking-wide">DashClub</span>
            </div>
            <p className="mt-2 text-white/40 text-xs">Back-office club</p>
          </div>

          {/* Nav */}
          <nav className="p-3 space-y-1 flex-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
          </nav>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full text-left text-xs text-white/40 hover:text-white/70 transition flex items-center gap-2"
            >
              <span>→</span> Déconnexion
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between bg-[#0D1F3C] rounded-2xl px-4 py-3 border border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#C9A84C] flex items-center justify-center text-[#0D1F3C] font-black text-xs">D</div>
            <span className="text-white font-bold text-sm">DashClub</span>
          </div>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white/70 text-sm border border-white/20 rounded-lg px-3 py-1.5"
          >
            {mobileOpen ? "✕" : "☰ Menu"}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-2 bg-[#0D1F3C] rounded-2xl border border-white/10 p-3 space-y-1">
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onClick={() => setMobileOpen(false)} />
            ))}
            <div className="pt-2 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full text-left text-xs text-white/40 px-4 py-2 hover:text-white/70 transition"
              >
                → Déconnexion
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
