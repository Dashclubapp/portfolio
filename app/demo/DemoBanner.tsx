"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const BANNER_KEY = "demo_banner_dismissed";

export default function DemoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(BANNER_KEY, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Fixed banner */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          backgroundColor: "#1A8754",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 48px 0 16px",
        }}
        className="h-10 md:h-10"
      >
        {/* Desktop text */}
        <p className="hidden md:block text-white font-semibold text-sm text-center">
          🎯&nbsp; Ceci est un site de démonstration DashClub · Créez le vôtre en quelques minutes &nbsp;→&nbsp;
          <Link
            href="https://dashclub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-white/90 hover:text-white transition-colors"
          >
            Démarrer gratuitement
          </Link>
        </p>
        {/* Mobile text */}
        <p className="block md:hidden text-white font-semibold text-sm text-center">
          🎯 Démo DashClub ·{" "}
          <Link
            href="https://dashclub.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white/80 transition-colors"
          >
            Créer mon site →
          </Link>
        </p>
        {/* Close button */}
        <button
          onClick={dismiss}
          style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
          className="text-white/70 hover:text-white transition-colors text-base leading-none p-1"
          aria-label="Fermer le bandeau"
        >
          ✕
        </button>
      </div>
      {/* Spacer to push page content below the fixed banner */}
      <div className="h-10" aria-hidden="true" />
    </>
  );
}
