"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 769px)");
    const handleDesktopEnter = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    mediaQuery.addEventListener("change", handleDesktopEnter);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      mediaQuery.removeEventListener("change", handleDesktopEnter);
    };
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <div className="mobile-site-header fixed inset-x-0 top-0 z-[60] h-14 border-b border-white/10 bg-[#0D1F3C]">
        <div className="flex h-full items-center justify-between px-4">
          <a
            href="#top"
            className="inline-block"
            onClick={closeMenu}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dashclub-real.svg"
              alt="DashClub"
              style={{ height: "36px", width: "auto" }}
            />
          </a>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-site-menu"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="inline-flex h-10 w-10 items-center justify-center text-[#C9A84C]"
            onClick={() => setIsOpen((open) => !open)}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen ? (
        <>
          <button
            type="button"
            aria-label="Fermer le menu"
            className="mobile-site-overlay fixed inset-x-0 bottom-0 top-14 z-[55] bg-transparent"
            onClick={closeMenu}
          />
          <div
            id="mobile-site-menu"
            className="mobile-site-menu fixed inset-x-0 top-14 z-[60] w-full bg-[#152E55]"
          >
            <button
              type="button"
              aria-label="Fermer le menu"
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center text-2xl leading-none text-white"
              onClick={closeMenu}
            >
              ✕
            </button>

            <div className="flex flex-col pt-12">
              <a
                className="border-b border-white/10 px-[18px] py-[18px] text-center text-base text-white"
                href="#produit"
                onClick={closeMenu}
              >
                Le produit
              </a>
              <a
                className="border-b border-white/10 px-[18px] py-[18px] text-center text-base text-white"
                href="#offres"
                onClick={closeMenu}
              >
                Tarifs
              </a>
              <Link
                className="border-b border-white/10 px-[18px] py-[18px] text-center text-base text-white"
                href="/pricing"
                onClick={closeMenu}
              >
                Comparer
              </Link>
              <a
                href="#offres"
                className="mx-auto my-4 inline-flex w-[90%] items-center justify-center rounded-full bg-[#C9A84C] px-5 py-4 text-base font-bold text-[#0D1F3C]"
                onClick={closeMenu}
              >
                Lancer mon site club →
              </a>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
