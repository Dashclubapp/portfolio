"use client";

import Link from "next/link";

interface Props {
  prenom: string;
  club: {
    id: number;
    nom_club: string;
    stripe_connect_status: string;
    created_at: string;
  };
  slug: string;
  eventCount: number;
}

function OnboardingBar({ stripeConnected, hasEvents }: { stripeConnected: boolean; hasEvents: boolean }) {
  const steps = [
    { label: "Site créé", done: true },
    { label: "Stripe connecté", done: stripeConnected },
    { label: "Premier événement", done: hasEvents },
  ];

  const doneCount = steps.filter((s) => s.done).length;
  const progress = (doneCount / steps.length) * 100;

  return (
    <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 p-4 mb-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-white/60 uppercase tracking-widest">Progression</p>
        <span className="text-xs text-[#C9A84C] font-semibold">{doneCount}/{steps.length} étapes</span>
      </div>
      <div className="flex items-center gap-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border ${
              step.done
                ? "bg-[#C9A84C] border-[#C9A84C] text-[#0D1F3C]"
                : "bg-transparent border-white/30 text-white/30"
            }`}>
              {step.done ? "✓" : "○"}
            </div>
            <span className={`text-xs ${step.done ? "text-white/80" : "text-white/30"}`}>{step.label}</span>
            {i < steps.length - 1 && (
              <div className={`h-px w-6 ${step.done ? "bg-[#C9A84C]/50" : "bg-white/10"}`} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 h-1 rounded-full bg-white/10">
        <div
          className="h-1 rounded-full bg-[#C9A84C] transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function StripeWidget({ status }: { status: string; slug: string }) {
  if (status === "connected") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-5 py-4">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
        <p className="text-sm text-emerald-300 font-medium">
          Paiements activés — les inscriptions arrivent sur votre compte
        </p>
      </div>
    );
  }
  if (status === "pending" || status === "in_review") {
    return (
      <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 px-5 py-4">
        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 animate-pulse" />
        <p className="text-sm text-amber-300 font-medium">
          Votre compte Stripe est en cours de validation
        </p>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-between rounded-2xl bg-red-500/10 border border-red-500/20 px-5 py-4">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 shrink-0" />
        <p className="text-sm text-red-300 font-medium">Stripe non connecté — les paiements sont désactivés</p>
      </div>
      <Link
        href="/admin/stripe"
        className="shrink-0 ml-3 rounded-xl bg-[#C9A84C] px-4 py-2 text-xs font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition"
      >
        Connecter →
      </Link>
    </div>
  );
}

export default function AdminDashboardClient({ prenom, club, slug, eventCount }: Props) {
  const createdAt = new Date(club.created_at);
  const daysSinceCreation = Math.floor((Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
  const showWelcomeBanner = daysSinceCreation <= 7;
  const stripeConnected = club.stripe_connect_status === "connected";
  const hasEvents = eventCount > 0;

  const siteUrl = slug ? `https://${slug}.dashclub.app` : "#";

  return (
    <div className="space-y-4">
      {/* Welcome banner */}
      {showWelcomeBanner && (
        <div className="rounded-2xl bg-gradient-to-r from-[#C9A84C]/20 to-[#0D1F3C] border border-[#C9A84C]/30 px-6 py-5">
          <p className="text-xl font-bold text-white">
            🎉 Bienvenue sur DashClub, {prenom} !
          </p>
          <p className="mt-1 text-sm text-white/70">
            Votre site <strong className="text-[#C9A84C]">{club.nom_club}</strong> est en ligne →{" "}
            <a href={siteUrl} target="_blank" rel="noopener noreferrer" className="underline text-[#C9A84C] hover:text-[#D4B860]">
              {slug}.dashclub.app
            </a>
          </p>
        </div>
      )}

      {/* Onboarding progress */}
      <OnboardingBar stripeConnected={stripeConnected} hasEvents={hasEvents} />

      {/* Stripe status widget */}
      <StripeWidget status={club.stripe_connect_status} slug={slug} />

      {/* 4 action blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ActionCard
          emoji="🎨"
          title="Personnaliser mon site"
          desc="Modifiez logo, couleurs, description…"
          cta="Modifier mes infos →"
          href="/admin/club"
          accent={false}
        />
        <ActionCard
          emoji="⚡"
          title="Connecter Stripe"
          desc="Pour encaisser vos inscriptions directement."
          cta="Connecter Stripe →"
          href="/admin/stripe"
          accent={!stripeConnected}
          disabled={stripeConnected}
          disabledLabel="✓ Déjà connecté"
        />
        <ActionCard
          emoji="📅"
          title="Créer mon 1er événement"
          desc="Formulaire en 3 étapes simples."
          cta="Créer un événement →"
          href="/admin/evenements"
          accent={stripeConnected && !hasEvents}
        />
        <ActionCard
          emoji="👁️"
          title="Voir mon site public"
          desc={slug ? `${slug}.dashclub.app` : "Votre site est en ligne"}
          cta="Ouvrir →"
          href={siteUrl}
          external
          accent={false}
        />
      </div>

      {/* Quick stats */}
      {hasEvents && (
        <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 px-5 py-4">
          <p className="text-xs uppercase tracking-widest text-white/40 mb-3">Résumé</p>
          <div className="flex items-center gap-6">
            <div>
              <p className="text-2xl font-bold text-white">{eventCount}</p>
              <p className="text-xs text-white/50">événement{eventCount > 1 ? "s" : ""}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ActionCard({
  emoji, title, desc, cta, href, accent, external, disabled, disabledLabel
}: {
  emoji: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  accent?: boolean;
  external?: boolean;
  disabled?: boolean;
  disabledLabel?: string;
}) {
  const cardClass = `group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-200 ${
    accent
      ? "bg-[#C9A84C]/10 border-[#C9A84C]/30 hover:bg-[#C9A84C]/15"
      : "bg-[#0D1F3C] border-white/10 hover:border-white/20 hover:bg-white/5"
  }`;

  const ctaClass = `mt-4 inline-flex items-center text-sm font-semibold transition ${
    accent ? "text-[#C9A84C] hover:text-[#D4B860]" : "text-white/60 hover:text-white"
  }`;

  const content = (
    <>
      <div>
        <span className="text-2xl">{emoji}</span>
        <h3 className="mt-2 font-bold text-white text-sm leading-snug">{title}</h3>
        <p className="mt-1 text-xs text-white/50 leading-relaxed">{desc}</p>
      </div>
      {disabled ? (
        <span className="mt-4 text-sm text-emerald-400 font-medium">{disabledLabel}</span>
      ) : (
        <span className={ctaClass}>{cta}</span>
      )}
    </>
  );

  if (disabled) {
    return <div className={cardClass}>{content}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cardClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cardClass}>
      {content}
    </Link>
  );
}
