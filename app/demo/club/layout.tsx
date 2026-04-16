"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { path: "", label: "Accueil", exact: true },
  { path: "/evenements", label: "Événements", exact: false },
  { path: "/adhesion", label: "Adhésion", exact: false },
  { path: "/partenaires", label: "Partenaires", exact: false },
  { path: "/contact", label: "Contact", exact: false },
];

function ClubHeader() {
  const pathname = usePathname();
  const [clubBase, setClubBase] = useState("/demo/club");

  useEffect(() => {
    if (window.location.hostname === "demo.dashclub.app") {
      setClubBase("");
    }
  }, []);

  const navLinks = NAV_ITEMS.map((item) => ({
    href: clubBase + item.path || "/",
    label: item.label,
    exact: item.exact,
  }));

  return (
    <header className="sticky top-10 z-30 border-b border-[#0D1F3C]/10 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
        {/* Logo */}
        <Link href={clubBase || "/"} className="flex items-center gap-3">
          <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-[#0D1F3C]">
            <span className="text-[10px] font-bold leading-none text-[#C9A84C]">USM</span>
            <span className="text-[8px] text-white/50">TRI</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-[#C9A84C]">
              USM Triathlon
            </p>
            <p
              className="text-lg font-bold leading-none text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Union Sportive de Mézy
            </p>
          </div>
        </Link>
        {/* Nav */}
        <nav className="flex flex-wrap items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                pathname === link.href || pathname === "/demo/club" + (link.href.replace(clubBase, "") || "")
                  ? "bg-[#0D1F3C] text-white"
                  : "text-[#0D1F3C]/70 hover:bg-[#0D1F3C]/5 hover:text-[#0D1F3C]"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={clubBase + "/adhesion"}
            className="ml-2 inline-flex items-center rounded-full bg-[#C9A84C] px-5 py-2 text-sm font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]"
          >
            Rejoindre le club
          </Link>
        </nav>
      </div>
    </header>
  );
}

function ClubFooter() {
  const [clubBase, setClubBase] = useState("/demo/club");
  const [isDemoHost, setIsDemoHost] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "demo.dashclub.app") {
      setClubBase("");
      setIsDemoHost(true);
    }
  }, []);

  const navLinks = NAV_ITEMS.map((item) => ({
    href: clubBase + item.path || "/",
    label: item.label,
  }));

  return (
    <footer className="mt-auto border-t border-[#0D1F3C]/10 bg-[#0D1F3C] px-6 py-12 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C9A84C]">
              <span className="text-xs font-bold text-[#0D1F3C]">USM</span>
            </div>
            <span
              className="text-lg font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              USM Triathlon
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Club de triathlon à Mézy-sur-Seine depuis 1998. 142 adhérents actifs, une communauté engagée.
          </p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-white/70">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#C9A84C]">
            Contact
          </h4>
          <div className="space-y-2 text-sm text-white/70">
            <p>📧 hello@usm-triathlon.fr</p>
            <p>📞 01 34 77 XX XX</p>
            <p>📍 Base Nautique de Mézy-sur-Seine, 78250</p>
          </div>
          {!isDemoHost && (
            <div className="mt-4">
              <p className="text-xs text-white/30">
                Site fictif DashClub —{" "}
                <Link href="/demo" className="underline hover:text-white/50">
                  Voir la démo
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}

export default function ClubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F6F1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <ClubHeader />
      <main>{children}</main>
      <ClubFooter />
    </div>
  );
}
