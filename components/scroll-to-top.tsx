"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Remonter en haut"
      className="fixed bottom-6 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#0D1F3C] text-white shadow-lg transition hover:bg-[#1E3F6E] sm:hidden"
    >
      <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M10 17a.75.75 0 0 1-.75-.75V5.56L5.03 9.78a.75.75 0 0 1-1.06-1.06l5.5-5.5a.75.75 0 0 1 1.06 0l5.5 5.5a.75.75 0 1 1-1.06 1.06L10.75 5.56v10.69A.75.75 0 0 1 10 17Z" clipRule="evenodd" />
      </svg>
    </button>
  );
}
