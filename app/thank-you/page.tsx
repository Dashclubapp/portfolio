import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { buildPageMetadata } from '../seo';

export const metadata: Metadata = buildPageMetadata({
  title: 'Bienvenue sur DashClub — Abonnement activé',
  description: 'Votre abonnement DashClub est actif. Bienvenue dans la communauté des clubs sportifs qui innovent.',
  path: '/thank-you',
});

function MerciContent() {
  return (
    <div className="min-h-screen bg-[#0D1F3C]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,76,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.04),_transparent_40%)]" />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-5 py-16">
        <div className="w-full max-w-lg text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo-dashclub-real.svg"
                alt="DashClub"
                style={{ height: '44px', width: 'auto' }}
              />
            </Link>
          </div>

          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30">
            <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10">
              <path
                d="M5 13l4 4L19 7"
                stroke="#C9A84C"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <h1 className="font-display text-4xl leading-tight text-white sm:text-5xl">
            Bienvenue sur DashClub&nbsp;!
          </h1>

          <p className="mt-5 text-lg leading-8 text-white/70">
            Votre abonnement est maintenant actif. Nous allons créer votre site de club et vous
            contacter sous 24h pour démarrer ensemble.
          </p>

          {/* Info card */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-left space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]/70">
              Prochaines étapes
            </p>
            {[
              'Vous recevrez un email de confirmation Stripe dans quelques minutes',
              'Notre équipe vous contactera sous 24h pour recueillir vos contenus',
              'Votre site de club sera en ligne sous 5 jours ouvrés',
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/20 text-[10px] font-bold text-[#C9A84C]">
                  {i + 1}
                </div>
                <p className="text-sm text-white/70">{step}</p>
              </div>
            ))}
          </div>

          {/* Renewal info */}
          <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#C9A84C]/20 bg-[#C9A84C]/10 px-4 py-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 shrink-0 text-[#C9A84C]">
              <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-[#C9A84C]/90">
              Renouvellement automatique chaque mois à la même date · Sans engagement · Résiliable à tout moment
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-[#C9A84C] px-7 py-4 text-base font-semibold text-[#0D1F3C] transition hover:-translate-y-0.5 hover:bg-[#d4b460]"
            >
              Retour à l&apos;accueil →
            </Link>
            <a
              href="mailto:hello@dashclub.fr"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-7 py-4 text-base font-medium text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MerciPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0D1F3C]">
          <div className="text-white/50 text-sm">Chargement…</div>
        </div>
      }
    >
      <MerciContent />
    </Suspense>
  );
}
