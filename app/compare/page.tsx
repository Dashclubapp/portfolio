import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { comparisonRows, type ComparisonValue } from "../pricing-data";
import { buildPageMetadata } from "../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Comparatif des formules — DashClub",
  description:
    "Comparez en détail les fonctionnalités des formules Essentiel, Compétition et Illimité. Domaine inclus, Stripe intégré, zéro commission.",
  path: "/compare",
});

function renderValue(value: ComparisonValue) {
  if (typeof value === "boolean") {
    return value ? (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="mx-auto h-4 w-4 text-emerald-700 md:h-5 md:w-5"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8.2" className="fill-emerald-100 stroke-emerald-200" />
        <path d="m6.5 10 2.2 2.3 4.8-5" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="mx-auto h-4 w-4 text-stone-400 md:h-5 md:w-5"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="8.2" className="fill-stone-100 stroke-stone-200" />
        <path d="M6.5 10h7" />
      </svg>
    );
  }
  return (
    <span className="inline-flex min-w-[58px] items-center justify-center whitespace-nowrap rounded-full bg-stone-950 px-2.5 py-1 text-[12px] font-medium text-white md:px-3 md:py-1.5 md:text-sm">
      {value}
    </span>
  );
}

export default function ComparePage() {
  return (
    <main className="relative overflow-hidden text-stone-950" style={{ backgroundColor: '#f6f1e8' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(223,111,54,0.14),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(246,241,232,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-24 pt-5 sm:px-8 lg:px-12">
        <SiteHeader />

        {/* Page title */}
        <div className="mt-8 mb-8">
          <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
            Comparatif complet
          </p>
          <h1 className="mt-3 font-display text-4xl leading-none text-stone-950 sm:text-5xl">
            Tout ce qui change d&apos;une formule à l&apos;autre.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700">
            Domaine personnalisé, Stripe et hébergement inclus dans toutes les formules — sans commission sur vos inscriptions.
          </p>
        </div>

        {/* Comparison table */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-10 rounded-r-[1.8rem] bg-gradient-to-l from-[#f6f1e8] via-[#f6f1e8]/95 to-transparent md:hidden" />
          <div
            className="overflow-x-auto rounded-[1.8rem] border border-stone-900/10 bg-white shadow-[0_28px_80px_rgba(41,37,36,0.08)]"
            style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <table className="w-full min-w-[380px] border-collapse text-left text-[13px] text-stone-700 md:text-sm">
              <thead className="bg-stone-950 text-white">
                <tr>
                  <th className="sticky left-0 z-20 min-w-[140px] border-r border-white/10 bg-stone-950 px-2.5 py-3 text-left font-sans text-[10px] uppercase tracking-[0.18em] text-stone-300 shadow-[12px_0_24px_-20px_rgba(28,25,23,0.9)] md:min-w-[240px] md:px-4 md:py-4 md:text-[11px] md:tracking-[0.28em]">
                    Fonctionnalité
                  </th>
                  <th className="min-w-[80px] whitespace-nowrap px-2.5 py-3 text-center font-sans text-stone-300 md:px-4 md:py-4 md:text-[11px] md:uppercase md:tracking-[0.28em]">
                    <span className="block md:hidden">
                      <span className="block text-[12px] tracking-[0.08em] text-stone-200">Essentiel</span>
                      <span className="mt-0.5 block text-[12px] font-semibold text-white">19€</span>
                    </span>
                    <span className="hidden md:inline">Essentiel 19€</span>
                  </th>
                  <th className="min-w-[80px] whitespace-nowrap bg-orange-400/10 px-2.5 py-3 text-center font-sans text-orange-200 md:px-4 md:py-4 md:text-[11px] md:uppercase md:tracking-[0.28em]">
                    <span className="block md:hidden">
                      <span className="block text-[12px] tracking-[0.08em] text-orange-100">Compétition</span>
                      <span className="mt-0.5 block text-[12px] font-semibold text-white">49€</span>
                    </span>
                    <span className="hidden md:inline">Compétition 49€</span>
                  </th>
                  <th className="min-w-[80px] whitespace-nowrap px-2.5 py-3 text-center font-sans text-stone-300 md:px-4 md:py-4 md:text-[11px] md:uppercase md:tracking-[0.28em]">
                    <span className="block md:hidden">
                      <span className="block text-[12px] tracking-[0.08em] text-stone-200">Illimité</span>
                      <span className="mt-0.5 block text-[12px] font-semibold text-white">99€</span>
                    </span>
                    <span className="hidden md:inline">Illimité 99€</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => {
                  const isOdd = idx % 2 !== 0;
                  const rowBg = isOdd ? "bg-stone-100/70" : "";
                  const stickyBg = isOdd ? "bg-stone-100" : "bg-white";
                  return (
                    <tr key={row.feature} className={`border-t border-stone-900/[0.08] ${rowBg}`}>
                      <th className={`sticky left-0 z-10 min-w-[140px] border-r border-stone-900/[0.08] px-2.5 py-2 text-left text-[13px] font-medium leading-4 text-[#0D1F3C] shadow-[12px_0_24px_-20px_rgba(28,25,23,0.24)] md:min-w-[240px] md:px-4 md:py-4 md:text-sm md:leading-5 ${stickyBg}`}>
                        {row.feature}
                      </th>
                      {row.values.map((value, valueIndex) => (
                        <td
                          key={valueIndex}
                          className={`min-w-[80px] whitespace-nowrap px-2.5 py-2 text-center align-middle md:px-4 md:py-4 ${
                            valueIndex === 1 ? "bg-orange-50/60" : ""
                          }`}
                        >
                          <div className="flex min-h-8 items-center justify-center whitespace-nowrap md:min-h-10">
                            {renderValue(value)}
                          </div>
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-center text-xs text-stone-500 md:hidden">
            ← Faites glisser pour voir →
          </p>
        </div>

        {/* Domaine block */}
        <div className="mt-8 rounded-[2rem] border border-stone-900/10 px-6 py-6 shadow-[0_8px_32px_rgba(41,37,36,0.06)] sm:px-8 sm:py-7" style={{ backgroundColor: 'rgba(255,255,255,0.84)' }}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-6">
            <div className="shrink-0 text-2xl">🌐</div>
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-orange-700">
                Domaine personnalisé — inclus dès 19€/mois
              </p>
              <p className="mt-2 text-base leading-7 text-stone-700">
                Connectez votre domaine existant (monclub.fr) — inclus dans toutes les formules, sans frais supplémentaires. DashClub s&apos;occupe de la configuration technique complète.
              </p>
              <p className="mt-3 text-sm leading-6 text-stone-500">
                Wix et WordPress proposent le domaine custom en supplément. DashClub l&apos;inclut dès 19€/mois avec en plus la gestion des inscriptions, Stripe intégré et zéro commission.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/register"
            className="inline-flex items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
          >
            Lancer mon site club →
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white/80 px-7 py-4 text-base font-medium text-stone-800 transition hover:bg-white"
          >
            Voir le détail des formules
          </Link>
        </div>
      </div>
    </main>
  );
}
