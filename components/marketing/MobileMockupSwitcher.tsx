"use client";

import { useState } from "react";
import Image from "next/image";

function BrowserChrome({ url, dark }: { url: string; dark?: boolean }) {
  return (
    <div
      className="flex items-center gap-1.5 px-3 py-2"
      style={{ backgroundColor: dark ? "#0d1f3c" : "#1e2433" }}
    >
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#febc2e" }} />
      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#28c840" }} />
      <div
        className="ml-2 flex-1 truncate rounded px-2 py-0.5 text-[9px]"
        style={{ backgroundColor: dark ? "#152e55" : "#2a3142", color: "#8a96a8" }}
      >
        {url}
      </div>
    </div>
  );
}

export function MobileMockupSwitcher() {
  const [active, setActive] = useState<"site" | "back">("back");

  return (
    <div className="lg:hidden">
      {/* Tab switcher */}
      <div
        className="mb-3 flex rounded-full p-1"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <button
          onClick={() => setActive("site")}
          className="flex-1 rounded-full py-1.5 text-xs font-semibold transition"
          style={
            active === "site"
              ? { backgroundColor: "#C9A84C", color: "#0D1F3C" }
              : { color: "rgba(255,255,255,0.6)" }
          }
        >
          Site public
        </button>
        <button
          onClick={() => setActive("back")}
          className="flex-1 rounded-full py-1.5 text-xs font-semibold transition"
          style={
            active === "back"
              ? { backgroundColor: "#C9A84C", color: "#0D1F3C" }
              : { color: "rgba(255,255,255,0.6)" }
          }
        >
          Back-office
        </button>
      </div>

      {/* Mockup */}
      <div className="overflow-hidden rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/15">
        <BrowserChrome
          url={active === "site" ? "clubtri-cotedazur.fr" : "app.dashclub.fr/back"}
          dark={active === "back"}
        />
        <Image
          src={
            active === "site"
              ? "/hero/hero-mockup-site.svg"
              : "/hero/hero-mockup-backoffice.svg"
          }
          alt={
            active === "site"
              ? "Site public d'un club de triathlon — powered by DashClub"
              : "Back-office DashClub — tableau de bord club sportif"
          }
          width={560}
          height={320}
          className="w-full"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
