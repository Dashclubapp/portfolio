import { Suspense } from "react";
import BienvenueClient from "./BienvenueClient";

export const metadata = {
  robots: { index: false },
  title: "Bienvenue sur DashClub",
};

export default function BienvenuePage() {
  return (
    <Suspense fallback={<BienvenueLoading />}>
      <BienvenueClient />
    </Suspense>
  );
}

function BienvenueLoading() {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center">
      <div className="text-white/50 text-sm">Chargement…</div>
    </div>
  );
}
