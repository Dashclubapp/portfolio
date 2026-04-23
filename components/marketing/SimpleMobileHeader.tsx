"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function SimpleMobileHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="mobile-site-header fixed inset-x-0 top-0 z-[60] h-14"
      style={{
        backgroundColor: "rgba(13,31,60,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(201,168,76,0.28)" : "transparent"}`,
        transition: "border-color 220ms ease",
      }}
    >
      <div className="flex h-full items-center justify-between px-5">
        <Link href="/" aria-label="DashClub — Accueil">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dashclub-real.svg"
            alt="DashClub"
            style={{ height: "34px", width: "auto" }}
          />
        </Link>
        <Link
          href="/register"
          className="inline-flex items-center rounded-full px-4 py-2 text-sm font-bold transition hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#0D1F3C" }}
        >
          Lancer mon site →
        </Link>
      </div>
    </div>
  );
}
