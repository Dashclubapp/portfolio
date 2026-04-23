"use client";

import { useEffect, useState } from "react";

export function StickyCTAMobile() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 md:hidden"
      style={{
        transform: visible ? "translateY(0)" : "translateY(110%)",
        backgroundColor: "rgba(13,31,60,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(201,168,76,0.25)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      aria-hidden={!visible}
    >
      <div className="px-5 py-3">
        <a
          href="/register"
          className="flex w-full items-center justify-center rounded-full py-3.5 text-sm font-bold transition hover:opacity-90"
          style={{ backgroundColor: "#C9A84C", color: "#0D1F3C" }}
        >
          Lancer mon site club →
        </a>
      </div>
    </div>
  );
}
