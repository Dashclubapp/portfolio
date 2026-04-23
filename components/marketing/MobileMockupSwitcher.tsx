"use client";

import { useState } from "react";
import Image from "next/image";

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
        <Image
          src={
            active === "site"
              ? "/hero/screenshot-site-mobile.png"
              : "/hero/screenshot-backoffice-mobile.png"
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
