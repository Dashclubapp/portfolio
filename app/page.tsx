import Link from "next/link";
import { hasNavyPricingCard, plans } from "./pricing-data";
import { buildPageMetadata, homeDescription, homeTitle, siteName, siteUrl } from "./seo";
import { MobileNav } from "@/components/mobile-nav";
import { FaqSection } from "@/components/faq-section";
import { Hero } from "@/components/marketing/Hero";
import { PainPoints } from "@/components/marketing/PainPoints";
import { BeforeAfter } from "@/components/marketing/BeforeAfter";
import { StickyCTAMobile } from "@/components/marketing/StickyCTAMobile";

export const metadata = buildPageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
  description: homeDescription,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@dashclub.fr",
      availableLanguage: ["fr"],
    },
  ],
};

const demoUrl = "https://demo.dashclub.app";

function CheckIcon({ variant = "default" }: { variant?: "default" | "featured" | "navy" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={`mt-0.5 h-5 w-5 shrink-0 ${
        variant === "featured" ? "text-orange-400" : variant === "navy" ? "!text-white" : "text-orange-600"
      }`}
    >
      <circle
        cx="10"
        cy="10"
        r="8.2"
        className={
          variant === "featured"
            ? "fill-orange-900/40 stroke-orange-500/40"
            : variant === "navy"
              ? "fill-white/10 stroke-white/25"
              : "fill-orange-100 stroke-orange-200"
        }
      />
      <path d="m6.5 10 2.2 2.3 4.8-5" />
    </svg>
  );
}


function LaunchCTA({ className }: { className?: string }) {
  return (
    <a
      href="/register"
      className={`inline-flex items-center justify-center rounded-full bg-stone-950 px-7 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800 ${className ?? ""}`}
    >
      Lancer mon site club →
    </a>
  );
}


export default function Home() {
  return (
    <main
      id="top"
      className="relative overflow-x-hidden overflow-y-visible bg-[var(--background)] text-[var(--foreground)]"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(223,111,54,0.16),_transparent_28%),radial-gradient(circle_at_82%_18%,_rgba(38,84,124,0.16),_transparent_24%),linear-gradient(180deg,_rgba(250,246,240,0.98),_rgba(241,234,224,1))]" />
      <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(28,25,23,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(28,25,23,0.05)_1px,transparent_1px)] [background-size:92px_92px]" />

      <MobileNav />
      <StickyCTAMobile />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-6 sm:px-8 lg:px-12 lg:pb-16">

        {/* ── HEADER ── */}
        <header className="desktop-site-header flex flex-col gap-5 rounded-[2rem] border border-stone-900/10 bg-white/72 px-5 py-5 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <a href="#top" className="inline-flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dashclub-real.svg"
              alt="DashClub"
              height={44}
              style={{ height: "44px", width: "auto" }}
            />
            <span className="text-xl font-bold tracking-[0.08em] text-[#C9A84C] sm:text-2xl">
              DashClub
            </span>
          </a>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-stone-700">
            <a className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="#produit">
              Le produit
            </a>
            <Link
              className="rounded-full px-3 py-2 transition hover:bg-stone-900/5"
              href="/pricing"
            >
              Tarifs
            </Link>
            <Link
              className="rounded-full px-3 py-2 transition hover:bg-stone-900/5"
              href="/compare"
            >
              Comparer
            </Link>
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Lancer mon site club →
            </a>
          </nav>
        </header>

        {/* ── 1. HERO ── */}
        <Hero />

        {/* ── 2. DOULEURS ── */}
        <PainPoints />

        {/* ── 3. AVANT / APRÈS ── */}
        <BeforeAfter />

        {/* ── 6. SECTION ÉTAPES / PRODUIT ── */}
        <section id="produit" className="border-t border-stone-900/10 py-8">
          <div className="rounded-[2rem] border border-stone-900/10 bg-stone-50/80 px-6 py-10 sm:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="font-sans text-sm uppercase tracking-[0.34em]" style={{ color: "#C9A84C" }}>
                Comment ça marche
              </p>
              <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl" style={{ color: "#ffffff" }}>
                Un club sportif en ligne en quelques jours.
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              <article className="rounded-[1.9rem] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="inline-flex rounded-2xl p-3" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth={1.5} className="h-6 w-6">
                    <rect x="3" y="4" width="18" height="12" rx="2.5" />
                    <path d="M8 20h8M12 16v4" />
                  </svg>
                </div>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Étape 01</p>
                <h3 className="mt-2 font-display text-2xl leading-tight" style={{ color: "#0D1F3C" }}>
                  Site moderne en quelques clics
                </h3>
                <ul className="mt-3 space-y-1.5 text-sm leading-7" style={{ color: "#4a5568" }}>
                  <li className="flex items-start gap-2"><span className="mt-1 shrink-0" style={{ color: "#C9A84C" }}>✓</span>Votre club en ligne, clair sur mobile, prêt à recevoir vos actus et événements</li>
                  <li className="flex items-start gap-2"><span className="mt-1 shrink-0" style={{ color: "#C9A84C" }}>✓</span>Votre domaine personnalisé connecté au site</li>
                  <li className="flex items-start gap-2"><span className="mt-1 shrink-0" style={{ color: "#C9A84C" }}>✓</span>Configuration technique guidée ou prise en charge par DashClub</li>
                </ul>
                <p className="mt-3 text-xs italic leading-6" style={{ color: "#8a96a8" }}>
                  Déjà un domaine ? Nous le connectons. Besoin d&apos;un domaine ? Vous le gérez vous-même, ou nous nous en chargeons pour 20€/an (inclus en formule Illimité).
                </p>
                <p className="mt-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#C9A84C" }}>
                  ⏱ Votre site est créé et en ligne sous 5 jours ouvrés
                </p>
              </article>

              <article className="rounded-[1.9rem] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="inline-flex rounded-2xl p-3" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth={1.5} className="h-6 w-6">
                    <path d="M7 3v4M17 3v4M4 9h16" />
                    <rect x="4" y="5" width="16" height="15" rx="2.5" />
                    <path d="M8 13h3M8 16h6" />
                  </svg>
                </div>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Étape 02</p>
                <h3 className="mt-2 font-display text-2xl leading-tight" style={{ color: "#0D1F3C" }}>
                  Événements prêts à ouvrir
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "#4a5568" }}>
                  Ouvrez vos inscriptions à la date exacte que vous choisissez. File d&apos;attente automatique, 5 emails automatiques par événement (J-7, J-1, débrief, satisfaction, teaser) — zéro gestion manuelle.
                </p>
                <p className="mt-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#C9A84C" }}>
                  ⏱ Votre 1er événement sportif est prêt à accueillir des inscrits
                </p>
              </article>

              <article className="rounded-[1.9rem] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.15)]" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
                <div className="inline-flex rounded-2xl p-3" style={{ backgroundColor: "rgba(201,168,76,0.15)" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth={1.5} className="h-6 w-6">
                    <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M5 21a7 7 0 0 1 14 0" />
                    <path d="M18 17h3M19.5 15.5v3" />
                  </svg>
                </div>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em]" style={{ color: "#C9A84C" }}>Étape 03</p>
                <h3 className="mt-2 font-display text-2xl leading-tight" style={{ color: "#0D1F3C" }}>
                  Adhérents et paiements intégrés
                </h3>
                <p className="mt-3 text-sm leading-7" style={{ color: "#4a5568" }}>
                  Stripe, licences, relances, exports et bilan de saison dans le même outil.
                </p>
                <p className="mt-4 rounded-xl px-4 py-3 text-sm font-medium" style={{ backgroundColor: "rgba(201,168,76,0.12)", color: "#C9A84C" }}>
                  ⏱ Changez de formule à tout moment selon votre saison
                </p>
              </article>
            </div>
          </div>

        </section>

        {/* ── 5. TARIFS ── */}
        <section id="offres" className="border-t border-stone-900/10 py-8">
          {/* Anchor #abonnement preserved */}
          <span id="abonnement" className="invisible absolute" aria-hidden="true" />

          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
              Formules
            </p>
            <h2 className="mt-3 font-display text-5xl leading-none text-stone-950 sm:text-6xl">
              Trois formules. Un seul outil. Zéro commission.
            </h2>
            <p className="mt-5 text-lg leading-8 text-stone-700">
              Choisissez la formule qui correspond à votre club. Zéro commission sur tous vos paiements.
            </p>
          </div>

          <div className="mt-10 grid items-stretch gap-5 xl:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col overflow-hidden rounded-[2rem] border p-6 shadow-[0_24px_60px_rgba(41,37,36,0.08)] sm:p-7 ${
                  plan.featured
                    ? "border-orange-400/50 bg-stone-950 text-white"
                    : hasNavyPricingCard(plan.id)
                      ? "border-[#1F3C6B] bg-[linear-gradient(180deg,#152E55_0%,#0D1F3C_100%)] text-white"
                      : "border-stone-900/10 bg-white/88 text-stone-950"
                }`}
              >
                {plan.featured ? (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.28),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.1),_transparent_28%)]" />
                ) : hasNavyPricingCard(plan.id) ? (
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.14),_transparent_32%)]" />
                ) : null}

                <div className="relative flex flex-1 flex-col">
                  <div className="flex items-center gap-2">
                    <p
                      className={`font-sans text-sm font-bold uppercase tracking-[0.22em] ${
                        plan.featured
                          ? "text-white"
                          : hasNavyPricingCard(plan.id)
                            ? "!text-white"
                            : "text-stone-800"
                      }`}
                    >
                      {plan.name}
                    </p>
                    {plan.featured && (
                      <span className="inline-flex rounded-full bg-orange-400 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-950">
                        {plan.badge ?? "Recommandé"}
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap items-end gap-2">
                    <span className="font-display text-5xl leading-none">
                      {plan.price}
                    </span>
                    <span
                      className={`pb-1 text-sm ${
                        plan.featured
                          ? "text-stone-300"
                          : hasNavyPricingCard(plan.id)
                            ? "!text-white"
                            : "text-stone-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>
                  <p
                    className={`mt-4 text-base leading-7 ${
                      plan.featured
                        ? "text-orange-100"
                        : hasNavyPricingCard(plan.id)
                          ? "!text-white"
                          : "text-stone-700"
                    }`}
                  >
                    {plan.landingHook}
                  </p>

                  <ul className={`${plan.landingBullets[0]?.endsWith(":") ? "mt-1" : "mt-3"} flex-1 space-y-3`}>
                    {!plan.landingBullets[0]?.endsWith(":") && (
                      <li className="px-1 pt-1 pb-0 invisible select-none text-xs font-semibold uppercase tracking-wider">placeholder</li>
                    )}
                    {plan.landingBullets.map((bullet) => {
                      const isHeader = bullet.endsWith(":");
                      return isHeader ? (
                        <li key={bullet} className="px-1 pt-1 pb-0">
                          <span className={`text-xs font-semibold uppercase tracking-wider ${
                            plan.featured ? "text-orange-300" : hasNavyPricingCard(plan.id) ? "text-white/50" : "text-stone-400"
                          }`}>
                            {bullet}
                          </span>
                        </li>
                      ) : (
                        <li
                          key={bullet}
                          className={`flex items-start gap-3 rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                            plan.featured
                              ? "border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-stone-100"
                              : hasNavyPricingCard(plan.id)
                                ? "bg-white/10 !text-white"
                                : "bg-stone-50 text-stone-800"
                          }`}
                        >
                          <CheckIcon
                            variant={
                              plan.featured
                                ? "featured"
                                : hasNavyPricingCard(plan.id)
                                  ? "navy"
                                  : "default"
                            }
                          />
                          <span className={hasNavyPricingCard(plan.id) ? "!text-white" : undefined}>
                            {bullet}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={plan.checkoutHref}
                    className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                      plan.featured
                        ? "bg-orange-400 text-stone-950 hover:bg-orange-300"
                        : hasNavyPricingCard(plan.id)
                          ? "border border-white/18 bg-white/10 text-white hover:bg-white/16"
                          : "bg-stone-950 text-white hover:bg-stone-800"
                    }`}
                  >
                    Choisir
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            {["Sans engagement", "Résiliable à tout moment", "Zéro commission sur vos paiements"].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-900/10 bg-white/80 px-4 py-2 text-sm font-medium text-stone-700 shadow-[0_2px_8px_rgba(41,37,36,0.06)]"
              >
                <span className="text-[#C9A84C] font-bold">✓</span>
                {item}
              </span>
            ))}
          </div>

          <div className="mx-auto mt-4 max-w-[680px] rounded-[12px] border-l-[3px] border-l-[#C9A84C] bg-[rgba(201,168,76,0.08)] px-4 py-4 sm:px-7 sm:py-6">
            <p className="text-base font-semibold text-[#0D1F3C]">
              💳 Les paiements arrivent directement sur le compte du club
            </p>
            <p className="mt-3 text-sm leading-6 text-[#4A5568]">
              DashClub s&apos;intègre à votre compte Stripe existant ou vous guide pour en créer
              un gratuitement. Les inscriptions sont versées directement sur votre compte bancaire
              — DashClub ne touche pas à l&apos;argent, ne prend aucune commission. Un guide
              pas-à-pas est disponible dans votre backoffice DashClub.
            </p>
            <a
              href="https://stripe.com/fr"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-[#C9A84C] transition hover:opacity-80"
            >
              Créer un compte Stripe gratuitement →
            </a>
          </div>

          {/* ── Tableau comparatif simplifié ── */}
          <div className="mt-10">
            <p className="mb-5 text-center font-sans text-[11px] uppercase tracking-[0.28em] text-stone-500">
              Ce qui change selon la formule
            </p>
            <div className="relative overflow-hidden rounded-[1.6rem] border border-stone-900/10 bg-white shadow-[0_16px_40px_rgba(41,37,36,0.07)]">
              {/* Fade hint on mobile to suggest scroll */}
              <div
                className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white via-white/80 to-transparent sm:hidden"
                aria-hidden="true"
              />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px] border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#0D1F3C] text-white">
                      <th
                        scope="col"
                        className="sticky left-0 z-20 min-w-[180px] bg-[#0D1F3C] px-5 py-4 text-left font-sans text-[10px] uppercase tracking-[0.22em] text-[#8A9AB5] shadow-[6px_0_12px_-8px_rgba(0,0,0,0.6)]"
                      >
                        Fonctionnalité
                      </th>
                      <th scope="col" className="min-w-[110px] px-4 py-4 text-center">
                        <span className="block font-sans text-[10px] uppercase tracking-[0.22em] text-[#8A9AB5]">
                          Essentiel
                        </span>
                        <span className="mt-1 block font-display text-xl leading-none text-white">
                          19€
                          <span className="ml-0.5 font-sans text-xs font-normal text-stone-400">
                            /mois
                          </span>
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="min-w-[110px] bg-orange-400/[0.12] px-4 py-4 text-center"
                      >
                        <span className="mb-1.5 block">
                          <span className="inline-flex rounded-full bg-orange-400 px-2 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-stone-950">
                            Recommandé
                          </span>
                        </span>
                        <span className="block font-sans text-[10px] uppercase tracking-[0.22em] text-orange-200">
                          Compétition
                        </span>
                        <span className="mt-1 block font-display text-xl leading-none text-white">
                          49€
                          <span className="ml-0.5 font-sans text-xs font-normal text-stone-400">
                            /mois
                          </span>
                        </span>
                      </th>
                      <th scope="col" className="min-w-[110px] px-4 py-4 text-center">
                        <span className="block font-sans text-[10px] uppercase tracking-[0.22em] text-[#8A9AB5]">
                          Illimité
                        </span>
                        <span className="mt-1 block font-display text-xl leading-none text-white">
                          99€
                          <span className="ml-0.5 font-sans text-xs font-normal text-stone-400">
                            /mois
                          </span>
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(
                      [
                        {
                          label: "Site du club créé et hébergé",
                          e: true,
                          s: true,
                          i: true,
                        },
                        {
                          label: "Connexion domaine personnalisé",
                          e: true,
                          s: true,
                          i: true,
                        },
                        {
                          label: "Gestion domaine par DashClub",
                          e: "+20€/an",
                          s: "+20€/an",
                          i: "Inclus",
                        },
                        {
                          label: "Paiement en ligne via Stripe",
                          e: true,
                          s: true,
                          i: true,
                        },
                        {
                          label: "Événements par saison",
                          e: "1",
                          s: "3",
                          i: "Illimité",
                        },
                        {
                          label: "File d'attente + inscriptions auto",
                          e: false,
                          s: true,
                          i: true,
                        },
                        {
                          label: "Emails automatiques (J-7, J-1, débrief)",
                          e: false,
                          s: true,
                          i: true,
                        },
                        {
                          label: "Gestion adhérents et licences",
                          e: false,
                          s: false,
                          i: true,
                        },
                        {
                          label: "Boutique en ligne",
                          e: false,
                          s: false,
                          i: true,
                        },
                        {
                          label: "Commission sur les dossards",
                          e: "Zéro",
                          s: "Zéro",
                          i: "Zéro",
                        },
                      ] as { label: string; e: boolean | string; s: boolean | string; i: boolean | string }[]
                    ).map((row, idx) => {
                      const isOdd = idx % 2 !== 0;
                      const rowBg = isOdd ? "bg-stone-100/70" : "";
                      const stickyBg = isOdd ? "bg-stone-100" : "bg-white";
                      return (
                        <tr
                          key={row.label}
                          className={`border-t border-stone-900/[0.07] ${rowBg}`}
                        >
                          <th
                            scope="row"
                            className={`sticky left-0 z-10 min-w-[180px] px-5 py-3.5 text-left text-[13px] font-medium text-[#0D1F3C] shadow-[6px_0_12px_-8px_rgba(0,0,0,0.10)] ${stickyBg}`}
                          >
                            {row.label}
                          </th>
                          {([row.e, row.s, row.i] as (boolean | string)[]).map(
                            (val, vi) => (
                              <td
                                key={vi}
                                className={`min-w-[110px] px-4 py-3.5 text-center align-middle${vi === 1 ? " bg-orange-50/50" : ""}`}
                              >
                                {typeof val === "boolean" ? (
                                  val ? (
                                    <svg
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={1.8}
                                      className="mx-auto h-5 w-5 text-emerald-600"
                                      aria-hidden="true"
                                    >
                                      <circle
                                        cx="10"
                                        cy="10"
                                        r="8.2"
                                        className="fill-emerald-100 stroke-emerald-200"
                                      />
                                      <path d="m6.5 10 2.2 2.3 4.8-5" />
                                    </svg>
                                  ) : (
                                    <svg
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth={1.8}
                                      className="mx-auto h-5 w-5 text-stone-300"
                                      aria-hidden="true"
                                    >
                                      <circle
                                        cx="10"
                                        cy="10"
                                        r="8.2"
                                        className="fill-stone-100 stroke-stone-200"
                                      />
                                      <path d="M6.5 10h7" />
                                    </svg>
                                  )
                                ) : (
                                  <span className="inline-flex items-center justify-center rounded-full bg-stone-950 px-2.5 py-1 text-xs font-medium text-white">
                                    {val}
                                  </span>
                                )}
                              </td>
                            )
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-2 text-center text-xs text-stone-400 sm:hidden">
              ← Faites glisser pour voir →
            </p>
          </div>

          <div className="mt-5 text-center">
            <Link
              href="/compare"
              className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white/80 px-6 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-white"
            >
              Comparer toutes les fonctionnalités en détail →
            </Link>
          </div>

          {/* CTA 3/4 — After #offres */}
          <div className="mt-8 text-center">
            <LaunchCTA />
          </div>
        </section>


        {/* ── 7. FAQ ── */}
        <section className="border-t border-stone-900/10 py-8">
          <div className="mx-auto max-w-3xl">
            <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
              Questions fréquentes
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-stone-950 sm:text-5xl">
              FAQ
            </h2>
            <FaqSection />
          </div>
        </section>


        {/* ── DEMO SECTION ── */}
        <section className="border-t border-stone-900/10 py-8">
          <div className="rounded-[2rem] border border-[#1F3C6B] bg-[linear-gradient(135deg,#152E55_0%,#0D1F3C_100%)] px-8 py-8 text-center">
            <p className="font-display text-2xl leading-tight text-white sm:text-3xl">
              Vous voulez voir à quoi ressemble votre futur site ?
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/70">
              Découvrez l&apos;exemple de l&apos;USM Triathlon — un vrai site club construit avec DashClub.
            </p>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/16"
            >
              Voir le site démo →
            </a>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="site-footer h-auto overflow-visible border-t border-stone-900/10 pt-8 pb-12 text-sm leading-7 text-stone-600">
          DashClub — Site web et événements pour clubs sportifs.{" "}
          <a
            className="font-medium text-stone-950 underline decoration-stone-300 underline-offset-4"
            href="mailto:hello@dashclub.fr"
          >
            hello@dashclub.fr
          </a>
        </footer>
      </div>
    </main>
  );
}
