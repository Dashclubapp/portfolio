'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SiteHeader } from '@/components/site-header';
import {
  plans,
  hasNavyPricingCard,
} from '../pricing-data';

const planBullets: Record<string, string[]> = {
  essentiel: [
    'Paiement en ligne via Stripe',
    'Création de site web pour votre club',
    'Hébergement inclus',
    'Connectez votre propre domaine (monclub.fr) en quelques minutes — inclus dans votre abonnement.',
    'Base éditoriale (pages, articles, agenda)',
    '1 événement inclus',
    'Zéro commission sur les inscriptions',
  ],
  saison: [
    'Tout Essentiel, plus :',
    "Jusqu'à 3 événements par saison",
    "Ouverture des inscriptions programmée + file d'attente virtuelle",
    'Connectez votre propre domaine (monclub.fr) en quelques minutes — inclus dans votre abonnement.',
    'Emails automatiques (J-7, J-1, débrief, satisfaction J+3, teaser J+7)',
    'Dashboard temps réel + pages événement réutilisables',
  ],
  illimite: [
    'Tout Compétition, plus :',
    'Événements illimités',
    'Connectez votre propre domaine (monclub.fr) en quelques minutes — inclus dans votre abonnement.',
    'Gestion des membres + adhésions en ligne',
    'Export comptable mensuel + rapport de fin de saison PDF',
    'Accès anticipé aux nouvelles fonctionnalités',
  ],
};

function CheckIcon({ variant = 'default' }: { variant?: 'default' | 'featured' | 'navy' }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      className={`mt-0.5 h-5 w-5 shrink-0 ${
        variant === 'featured' ? 'text-orange-400' : variant === 'navy' ? '!text-white' : 'text-orange-600'
      }`}
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8.2"
        className={
          variant === 'featured'
            ? 'fill-orange-900/40 stroke-orange-500/40'
            : variant === 'navy'
              ? 'fill-white/10 stroke-white/25'
              : 'fill-orange-100 stroke-orange-200'
        }
      />
      <path d="m6.5 10 2.2 2.3 4.8-5" />
    </svg>
  );
}


type Plan = (typeof plans)[0];

function PlanCard({ plan }: { plan: Plan }) {
  const bullets = planBullets[plan.id] || plan.landingBullets;
  const hasNavyCard = hasNavyPricingCard(plan.id);

  return (
    <div
      className={`relative flex flex-col h-full rounded-[2rem] border overflow-hidden p-6 sm:p-7 ${
        plan.featured
          ? 'border-orange-400/50 bg-stone-950 text-white'
          : hasNavyCard
            ? 'border-[#1F3C6B] bg-[linear-gradient(180deg,#152E55_0%,#0D1F3C_100%)] text-white'
            : 'border-stone-900/10 bg-white text-stone-950'
      }`}
    >
      {plan.featured && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(251,146,60,0.28),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_28%)]" />
      )}
      {!plan.featured && hasNavyCard && (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.14),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(96,165,250,0.14),_transparent_32%)]" />
      )}

      <div className="relative flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <p
            className={`font-sans text-[11px] uppercase tracking-[0.34em] ${
              plan.featured ? 'text-stone-300' : hasNavyCard ? '!text-white' : 'text-stone-500'
            }`}
          >
            {plan.name}
          </p>
          {plan.featured && (
            <span className="inline-flex rounded-full bg-orange-400 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-950">
              Recommandé
            </span>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-end gap-2">
          <span className="font-display text-5xl leading-none">{plan.price}</span>
          <span
            className={`pb-1 text-sm ${
              plan.featured ? 'text-stone-300' : hasNavyCard ? '!text-white' : 'text-stone-500'
            }`}
          >
            {plan.period}
          </span>
        </div>

        <ul className={`${bullets[0]?.endsWith(':') ? 'mt-1' : 'mt-3'} flex-1 space-y-3`}>
          {!bullets[0]?.endsWith(':') && (
            <li className="px-1 pt-1 pb-0 invisible select-none text-xs font-semibold uppercase tracking-wider">placeholder</li>
          )}
          {bullets.map((bullet, i) => {
            const isHeader = bullet.endsWith(':');
            return isHeader ? (
              <li key={i} className="px-1 pt-1 pb-0">
                <span className={`text-xs font-semibold uppercase tracking-wider ${
                  plan.featured ? 'text-orange-300' : hasNavyCard ? 'text-white/50' : 'text-stone-400'
                }`}>
                  {bullet}
                </span>
              </li>
            ) : (
              <li key={i} className={`flex items-start gap-3 rounded-[1.2rem] px-4 py-3 text-sm leading-6 ${
                plan.featured
                  ? 'border border-[#C9A84C]/40 bg-[#C9A84C]/10 text-stone-100'
                  : hasNavyCard
                    ? 'bg-white/10 !text-white'
                    : 'bg-stone-50 text-stone-800'
              }`}>
                <CheckIcon variant={plan.featured ? 'featured' : hasNavyCard ? 'navy' : 'default'} />
                <span className={hasNavyCard ? '!text-white' : undefined}>{bullet}</span>
              </li>
            );
          })}
        </ul>

        <a
          href={plan.checkoutHref}
          className={`mt-7 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
            plan.featured
              ? 'bg-orange-400 text-stone-950 hover:bg-orange-300'
              : hasNavyCard
                ? 'border border-white/18 bg-white/10 text-white hover:bg-white/16'
                : 'bg-stone-950 text-white hover:bg-stone-800'
          }`}
        >
          {plan.detailCta}
        </a>
      </div>
    </div>
  );
}

export default function FormulasContent() {
  const [activeIndex, setActiveIndex] = useState(1); // Saison = index 1
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll to Saison on mount
  useEffect(() => {
    const container = scrollRef.current;
    const card = cardRefs.current[1];
    if (!container || !card) return;
    const containerWidth = container.clientWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.clientWidth;
    container.scrollLeft = cardLeft - (containerWidth - cardWidth) / 2;
  }, []);

  // Track active card on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closestIndex = 0;
      let closestDist = Infinity;

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const dist = Math.abs(center - cardCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToCard = useCallback((index: number) => {
    const card = cardRefs.current[index];
    const container = scrollRef.current;
    if (!card || !container) return;
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    container.scrollTo({
      left: cardCenter - container.clientWidth / 2,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main className="relative overflow-hidden bg-[#f6f1e8] text-stone-950">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(223,111,54,0.14),_transparent_26%),linear-gradient(180deg,_rgba(255,255,255,0.86),_rgba(246,241,232,1))]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pb-36 pt-5 sm:px-8 lg:px-12">
        <SiteHeader />

        {/* Page title */}
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-display text-4xl leading-none text-stone-950 sm:text-5xl">
              Les formules, en détail.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-stone-700 sm:text-lg">
              Comparez les trois formules et choisissez le niveau d&apos;automatisation qui correspond
              à votre saison.
            </p>
          </div>
          <div className="shrink-0 rounded-[1.6rem] border border-orange-200 bg-orange-50 px-5 py-4 text-sm leading-6 text-orange-950">
            <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-orange-700">
              Toujours inclus
            </p>
            <p className="mt-2 font-medium">
              Zéro commission sur les inscriptions. Vos recettes restent au club.
            </p>
          </div>
        </div>

        {/* Plans section */}
        <section className="mt-8">
          {/* Mobile carousel */}
          <div className="md:hidden">
            <div
              ref={scrollRef}
              className="flex snap-x snap-mandatory overflow-x-scroll gap-3 pb-4"
              style={
                {
                  scrollbarWidth: 'none',
                  WebkitOverflowScrolling: 'touch',
                  paddingLeft: '20px',
                  paddingRight: '20px',
                } as React.CSSProperties
              }
            >
              {plans.map((plan, i) => (
                <div
                  key={plan.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="snap-center shrink-0"
                  style={{ width: 'calc(100vw - 60px)' }}
                >
                  <PlanCard plan={plan} />
                </div>
              ))}
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center items-center gap-2 mt-2">
              {plans.map((p, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Voir formule ${p.name}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6 bg-orange-500' : 'w-2 bg-stone-300'
                  }`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex justify-between px-4 mt-4">
              <button
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                disabled={activeIndex === 0}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 disabled:opacity-30 transition hover:bg-stone-50"
              >
                ← Précédent
              </button>
              <button
                onClick={() => scrollToCard(Math.min(plans.length - 1, activeIndex + 1))}
                disabled={activeIndex === plans.length - 1}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 disabled:opacity-30 transition hover:bg-stone-50"
              >
                Suivant →
              </button>
            </div>
          </div>

          {/* Desktop 3 columns side-by-side */}
          <div className="hidden md:flex md:items-stretch gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex-1 ${
                  plan.featured
                    ? 'relative z-10 scale-[1.03] shadow-[0_32px_80px_rgba(28,25,23,0.18)] rounded-[2rem]'
                    : ''
                }`}
              >
                <PlanCard plan={plan} />
              </div>
            ))}
          </div>
        </section>

        {/* Competitor differentiation block */}
        <section className="mt-8 rounded-[2rem] border border-stone-900/10 bg-white/84 px-6 py-6 shadow-[0_8px_32px_rgba(41,37,36,0.06)] sm:px-8 sm:py-7">
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
        </section>

      </div>

    </main>
  );
}
