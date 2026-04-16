import Link from "next/link";
import { hasNavyPricingCard, plans } from "./pricing-data";
import { buildPageMetadata, homeDescription, homeTitle, siteName, siteUrl } from "./seo";
import { MobileNav } from "@/components/mobile-nav";

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

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

function LaunchCTA({ className }: { className?: string }) {
  return (
    <a
      href="/signup"
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

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-6 sm:px-8 lg:px-12 lg:pb-24">

        {/* ── HEADER ── */}
        <header className="desktop-site-header flex flex-col gap-5 rounded-[2rem] border border-stone-900/10 bg-white/72 px-5 py-5 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <a href="#top" className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-dashclub-real.svg"
                alt="DashClub"
                height={44}
                style={{ height: "44px", width: "auto" }}
              />
            </a>
            <span className="text-xl font-bold tracking-[0.08em] text-[#C9A84C] sm:text-2xl">
              DashClub
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-3 text-sm text-stone-700">
            <a className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="#produit">
              Le produit
            </a>
            <a className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="#offres">
              Tarifs
            </a>
            <Link
              className="rounded-full px-3 py-2 transition hover:bg-stone-900/5"
              href="/pricing"
            >
              Comparer
            </Link>
            <a
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
            >
              Lancer mon site club →
            </a>
          </nav>
        </header>

        {/* ── 1. HERO ── */}
        <section
          className="relative grid gap-10 overflow-hidden rounded-[2rem] py-14 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-16 lg:py-20"
          style={{
            backgroundColor: "#0D1F3C",
            backgroundImage:
              "linear-gradient(135deg, rgba(13,31,60,0.72) 0%, rgba(21,46,85,0.55) 60%, rgba(13,31,60,0.78) 100%), url('/triathlon-hero.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="relative z-10 px-5 sm:px-8 lg:pl-12 lg:pr-0">
            <h1 className="mt-6 font-display text-[3.2rem] leading-[0.92] text-white sm:text-[4.4rem] lg:text-[5.2rem]">
              Votre club sportif mérite un vrai site
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
              DashClub crée votre site, gère vos inscriptions et organise vos événements — sans développeur, sans galère, dès 19€/mois.
            </p>
            <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-white/85">
              <li className="flex items-center gap-2">
                <span className="text-[#C9A84C] font-bold">✓</span>
                <span>Votre domaine personnalisé (monclub.fr) inclus — dès 19€/mois</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A84C] font-bold">✓</span>
                <span>Zéro commission sur vos inscriptions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A84C] font-bold">✓</span>
                <span>En ligne en 5 jours ouvrés</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C9A84C] font-bold">✓</span>
                <span>File d&apos;attente automatique incluse</span>
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              {/* CTA 1/4 — Hero */}
              <LaunchCTA />
              <a
                className="inline-flex items-center justify-center rounded-full border border-stone-950/10 bg-white/80 px-7 py-4 text-base font-medium text-stone-800 transition hover:border-stone-950/20 hover:bg-white"
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir le site démo →
              </a>
            </div>
          </div>

          <div className="relative px-5 pb-8 sm:px-8 lg:pl-0 lg:pr-12 lg:pb-0">
            {/* Screenshot product — replace dashboard-screenshot.jpg with the real backoffice screenshot when ready */}
            <div className="relative overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
              <img
                src="/dashboard-screenshot.jpg"
                alt="Backoffice DashClub — tableau de bord club sportif"
                className="w-full rounded-2xl"
                width={1200}
                height={780}
                style={{ display: "block" }}
              />
            </div>
          </div>
        </section>

        {/* ── 2. SECTION PROBLÈME ── */}
        <section className="problem-section border-t border-stone-900/10 py-14">
          <div className="rounded-[2rem] border border-stone-900/10 bg-stone-50/80 px-6 py-12 sm:px-8">
            <h2 className="text-center font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
              Aujourd&apos;hui, gérer votre club c&apos;est...
            </h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              <div className="problem-card flex flex-col items-center gap-4 rounded-[1.5rem] border border-stone-900/8 bg-white p-6 text-center shadow-[0_8px_24px_rgba(41,37,36,0.05)]">
                <span className="text-4xl" role="img" aria-label="Outil">🛠️</span>
                <h3 className="problem-card-title text-lg font-sans">
                  Un site fragile
                </h3>
                <p className="problem-card-description">
                  Un site WordPress planté que personne ne sait maintenir
                </p>
              </div>
              <div className="problem-card flex flex-col items-center gap-4 rounded-[1.5rem] border border-stone-900/8 bg-white p-6 text-center shadow-[0_8px_24px_rgba(41,37,36,0.05)]">
                <span className="text-4xl" role="img" aria-label="Formulaire">📋</span>
                <h3 className="problem-card-title text-lg font-sans">
                  Des inscriptions bricolées
                </h3>
                <p className="problem-card-description">
                  Des inscriptions gérées par email ou Google Form
                </p>
              </div>
              <div className="problem-card flex flex-col items-center gap-4 rounded-[1.5rem] border border-stone-900/8 bg-white p-6 text-center shadow-[0_8px_24px_rgba(41,37,36,0.05)]">
                <span className="text-4xl" role="img" aria-label="Annonce">📣</span>
                <h3 className="problem-card-title text-lg font-sans">
                  Une communication dispersée
                </h3>
                <p className="problem-card-description">
                  Des événements annoncés sur Facebook faute de mieux
                </p>
              </div>
            </div>
            <p className="mt-8 text-center text-lg font-semibold text-stone-900">
              DashClub règle les trois en quelques jours.
            </p>
          </div>
        </section>

        {/* ── 6. SECTION ÉTAPES / PRODUIT ── */}
        <section id="produit" className="border-t border-stone-900/10 py-14">
          <div className="mb-10 max-w-2xl">
            <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
              Comment ça marche
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-stone-950 sm:text-5xl">
              Un club sportif en ligne en quelques jours.
            </h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="rounded-[1.9rem] border border-stone-900/10 bg-white/82 p-6 shadow-[0_20px_50px_rgba(41,37,36,0.06)]">
              <div className="inline-flex rounded-2xl border border-orange-100 bg-orange-50 p-3 text-orange-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                  <rect x="3" y="4" width="18" height="12" rx="2.5" />
                  <path d="M8 20h8M12 16v4" />
                </svg>
              </div>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em] text-stone-400">Étape 01</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-stone-950">
                Site moderne en quelques clics
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Votre club en ligne, clair sur mobile, prêt à recevoir vos actus, vos événements et vos membres. Connectez votre domaine existant en quelques clics — DashClub gère la configuration technique complète.
              </p>
              <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
                ⏱ Votre site est créé et en ligne sous 5 jours ouvrés
              </p>
            </article>

            <article className="rounded-[1.9rem] border border-stone-900/10 bg-white/82 p-6 shadow-[0_20px_50px_rgba(41,37,36,0.06)]">
              <div className="inline-flex rounded-2xl border border-orange-100 bg-orange-50 p-3 text-orange-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                  <path d="M7 3v4M17 3v4M4 9h16" />
                  <rect x="4" y="5" width="16" height="15" rx="2.5" />
                  <path d="M8 13h3M8 16h6" />
                </svg>
              </div>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em] text-stone-400">Étape 02</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-stone-950">
                Événements prêts à ouvrir
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Ouvrez vos inscriptions à la date exacte que vous choisissez. File d&apos;attente automatique, 5 emails automatiques par événement (J-7, J-1, débrief, satisfaction, teaser) — zéro gestion manuelle.
              </p>
              <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
                ⏱ Votre 1er événement sportif est prêt à accueillir des inscrits
              </p>
            </article>

            <article className="rounded-[1.9rem] border border-stone-900/10 bg-white/82 p-6 shadow-[0_20px_50px_rgba(41,37,36,0.06)]">
              <div className="inline-flex rounded-2xl border border-orange-100 bg-orange-50 p-3 text-orange-700">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                  <path d="M5 21a7 7 0 0 1 14 0" />
                  <path d="M18 17h3M19.5 15.5v3" />
                </svg>
              </div>
              <p className="mt-3 font-sans text-xs uppercase tracking-[0.28em] text-stone-400">Étape 03</p>
              <h3 className="mt-2 font-display text-2xl leading-tight text-stone-950">
                Adhérents et paiements intégrés
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                Stripe, licences, relances, exports et bilan de saison dans le même outil.
              </p>
              <p className="mt-4 rounded-xl bg-orange-50 px-4 py-3 text-sm font-medium text-orange-800">
                ⏱ Changez de formule à tout moment selon votre saison
              </p>
            </article>
          </div>

          {/* CTA 2/4 — After #produit */}
          <div className="mt-10 text-center">
            <LaunchCTA />
          </div>
        </section>

        {/* ── 3. PREUVE SOCIALE ── */}
        <section className="border-t border-stone-900/10 py-14">
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
              Ils nous font confiance
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-stone-950 sm:text-5xl">
              Ils ont lancé leur site avec DashClub
            </h2>
          </div>
          <div className="testimonials-grid mt-10 grid items-stretch gap-5 lg:grid-cols-2">
            {/* [À REMPLACER] Témoignage 1 — Marc D., Président du TC Bordeaux Métropole */}
            <blockquote className="testimonial-card flex h-auto flex-col overflow-visible rounded-[1.9rem] border border-stone-900/10 bg-white/82 p-7 shadow-[0_20px_50px_rgba(41,37,36,0.06)]">
              <svg viewBox="0 0 32 24" fill="none" className="mb-4 h-7 w-auto text-orange-300" aria-hidden="true">
                <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 3.2C11.2 4.4 8.8 6.8 8 10.4h6.4V24H0Zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l1.6 3.2c-4.8 1.2-7.2 3.6-8 7.2H32V24H17.6Z" fill="currentColor" />
              </svg>
              <p className="flex-1 text-base leading-8 text-stone-700">
                En 4 jours on avait notre site en ligne et nos premières inscriptions. Je n&apos;y connais rien en informatique — ça n&apos;a pas été un problème.
              </p>
              <footer className="mt-5 border-t border-stone-900/8 pt-4">
                <p className="font-semibold text-stone-950">Marc D.</p>
                <p className="text-sm text-stone-500">Président du TC Bordeaux Métropole</p>
              </footer>
            </blockquote>
            {/* [À REMPLACER] Témoignage 2 — Sophie L., Trésorière d'un club sportif à Annecy */}
            <blockquote className="testimonial-card flex h-auto flex-col overflow-visible rounded-[1.9rem] border border-stone-900/10 bg-white/82 p-7 shadow-[0_20px_50px_rgba(41,37,36,0.06)]">
              <svg viewBox="0 0 32 24" fill="none" className="mb-4 h-7 w-auto text-orange-300" aria-hidden="true">
                <path d="M0 24V14.4C0 6.4 4.8 1.6 14.4 0l1.6 3.2C11.2 4.4 8.8 6.8 8 10.4h6.4V24H0Zm17.6 0V14.4C17.6 6.4 22.4 1.6 32 0l1.6 3.2c-4.8 1.2-7.2 3.6-8 7.2H32V24H17.6Z" fill="currentColor" />
              </svg>
              <p className="flex-1 text-base leading-8 text-stone-700">
                Fini les Google Forms et les virements à vérifier à la main. Tout est automatisé, je gagne facilement 3h par semaine.
              </p>
              <footer className="mt-5 border-t border-stone-900/8 pt-4">
                <p className="font-semibold text-stone-950">Sophie L.</p>
                <p className="text-sm text-stone-500">Trésorière d&apos;un club sportif à Annecy</p>
              </footer>
            </blockquote>
          </div>
          <div className="mt-8 text-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white/88 px-6 py-3 text-lg font-semibold text-stone-950 shadow-[0_8px_24px_rgba(41,37,36,0.07)]">
              🚀 <span id="clubs-count">12</span>&nbsp;clubs déjà sur DashClub
            </p>
          </div>
        </section>

        {/* ── 5. TARIFS ── */}
        <section id="offres" className="border-t border-stone-900/10 py-14">
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
              Choisissez la formule qui correspond à votre club. Domaine personnalisé inclus dans toutes les formules.
            </p>
          </div>

          <div className="mt-10 grid gap-5 xl:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`relative overflow-hidden rounded-[2rem] border p-6 shadow-[0_24px_60px_rgba(41,37,36,0.08)] sm:p-7 ${
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

                <div className="relative">
                  {plan.featured ? (
                    <div className="inline-flex rounded-full bg-orange-400 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-950">
                      {plan.badge ?? "Le plus choisi"}
                    </div>
                  ) : null}
                  <p
                    className={`mt-5 font-sans text-[11px] uppercase tracking-[0.34em] ${
                      plan.featured
                        ? "text-stone-300"
                        : hasNavyPricingCard(plan.id)
                          ? "!text-white"
                          : "text-stone-500"
                    }`}
                  >
                    {plan.name}
                  </p>
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

                  <ul className="mt-6 space-y-3">
                    {plan.landingBullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-start gap-3 rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                          plan.featured
                            ? "bg-white/8 text-stone-100"
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
                    ))}
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
                    {plan.landingCta}
                  </a>
                  <p
                    className={`mt-3 text-center text-xs ${
                      plan.featured
                        ? "text-stone-500"
                        : hasNavyPricingCard(plan.id)
                          ? "!text-white"
                          : "text-stone-400"
                    }`}
                  >
                    Sans engagement · Résiliable à tout moment
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-[#8A96A8]">
            Sans engagement · Zéro commission DashClub sur les paiements reçus (des frais Stripe
            peuvent être appliqués)
          </p>

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
                          label: "Domaine personnalisé inclus",
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
              href="/pricing"
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

        {/* ── 7. FAQ — CSS-only accordion ── */}
        <section className="border-t border-stone-900/10 py-14">
          <div className="mx-auto max-w-3xl">
            <p className="font-sans text-sm uppercase tracking-[0.34em] text-orange-700">
              Questions fréquentes
            </p>
            <h2 className="mt-3 font-display text-4xl leading-none text-stone-950 sm:text-5xl">
              FAQ
            </h2>
            <div className="mt-8 space-y-3">

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Est-ce que je peux modifier le contenu moi-même ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Oui, via un backoffice simple, sans aucune compétence technique.
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Combien de temps pour avoir mon site en ligne ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Comptez 5 jours ouvrés entre la commande et la mise en ligne.
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Les paiements d&apos;inscription sont-ils gérés ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Oui, les inscriptions en ligne avec paiement sont incluses dans toutes les formules.
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Puis-je annuler à tout moment ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Oui, sans frais ni préavis. L&apos;abonnement est mensuel.
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Est-ce que mon club garde son nom de domaine ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Oui, et mieux encore : si vous avez déjà un domaine (monclub.fr), vous pouvez le connecter à DashClub en quelques minutes — inclus dans toutes nos formules, sans frais supplémentaires. DashClub s&apos;occupe de la configuration technique complète. Si vous n&apos;avez pas encore de domaine, vous disposez d&apos;un sous-domaine gratuit (monclub.dashclub.app).
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>Comment fonctionne le support ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Le support est assuré par email avec une réponse sous 48h ouvrées.
                </p>
              </details>

              <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
                  <span>DashClub fonctionne-t-il pour tous les sports ?</span>
                  <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
                    <PlusIcon />
                  </span>
                </summary>
                <p className="pb-1 text-sm leading-7 text-stone-600">
                  Oui. DashClub s&apos;adresse à tous les clubs sportifs : course à pied, trail, vélo, natation, triathlon et bien d&apos;autres. La plateforme est conçue pour s&apos;adapter à n&apos;importe quel type de club et de calendrier de saison.
                </p>
              </details>

            </div>
          </div>
        </section>

        {/* ── CTA 4/4 — Before footer ── */}
        <section className="border-t border-stone-900/10 py-14">
          <div className="rounded-[2.3rem] border border-stone-900/10 bg-stone-950 px-8 py-12 text-center text-white shadow-[0_28px_70px_rgba(28,25,23,0.18)]">
            <p className="font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Le site du club tourne. La saison sportive aussi.
            </p>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-stone-300">
              Commencez à 19€/mois TTC, gardez vos recettes et faites évoluer
              l&apos;outil à mesure que le club grandit.
            </p>
            <a
              href="/signup"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-stone-100"
            >
              Lancer mon site club →
            </a>
          </div>
        </section>

        {/* ── DEMO SECTION ── */}
        <section
          style={{ backgroundColor: "#152E55" }}
          className="py-[60px] px-4"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-2xl font-bold text-white leading-snug">
              🏆 Vous voulez voir à quoi ressemble votre futur site ?
            </p>
            <p
              className="mt-4 text-base text-white leading-7"
              style={{ opacity: 0.85 }}
            >
              Découvrez l&apos;exemple du FC Démo — un vrai site club construit
              avec DashClub.
            </p>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="demo-cta-btn mt-8 inline-flex items-center justify-center rounded-[8px] px-8 py-[14px] text-base font-bold transition"
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
