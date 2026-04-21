"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SessionData {
  email?: string;
  club?: string;
  formule?: string;
  wantDomain?: boolean;
}

const ALL_TASKS = [
  {
    key: "domain",
    icon: "🌐",
    title: "Mise en place du domaine personnalisé",
    desc: "Configuration et activation de votre nom de domaine dédié.",
    delay: "Sous 24h",
  },
  {
    key: "stripe",
    icon: "💳",
    title: "Connexion Stripe",
    desc: "Intégration de votre compte de paiement pour recevoir les inscriptions sans commission.",
    delay: "Sous 48h",
  },
  {
    key: "site",
    icon: "🎨",
    title: "Génération de votre site",
    desc: "Mise en place du modèle de site aux couleurs de votre club, avec vos pages par défaut.",
    delay: "Sous 72h",
  },
  {
    key: "backoffice",
    icon: "🔐",
    title: "Création de votre backoffice",
    desc: "Configuration de votre espace d'administration pour gérer membres, événements et paiements.",
    delay: "Sous 72h",
  },
];

export default function BienvenueClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [data, setData] = useState<SessionData>({});

  useEffect(() => {
    if (!sessionId) return;
    fetch(`/api/session-info?session_id=${sessionId}`)
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {});
  }, [sessionId]);

  const tasks = ALL_TASKS.filter(t => t.key !== "domain" || data.wantDomain);

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4 py-12">
      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(201,168,76,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative w-full max-w-lg space-y-4">

        {/* Hero card */}
        <div className="rounded-3xl bg-[#0D1F3C] border border-[#C9A84C]/20 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-4xl mb-5">
            🎉
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Paiement confirmé !
          </h1>
          <p className="text-white/60 text-sm leading-relaxed">
            Bienvenue dans la famille DashClub.{" "}
            {data?.formule
              ? <>Votre formule <strong className="text-[#C9A84C]">{data.formule}</strong> est activée.</>
              : "Votre abonnement est activé."}
          </p>

          {/* Confirmations */}
          <div className="mt-5 space-y-2 text-left">
            <CheckItem>Paiement reçu et enregistré</CheckItem>
            <CheckItem>
              {data?.email
                ? <>Email de confirmation envoyé à <strong className="text-white">{data.email}</strong></>
                : "Email de confirmation envoyé"}
            </CheckItem>
            <CheckItem>Notre équipe est notifiée et commence à travailler</CheckItem>
          </div>
        </div>

        {/* Timeline card */}
        <div className="rounded-3xl bg-[#0D1F3C] border border-white/10 p-6 shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <p className="text-xs font-bold text-[#C9A84C] uppercase tracking-widest mb-5">
            Ce que l&apos;équipe DashClub fait pour vous
          </p>
          <div className="space-y-0">
            {tasks.map((task, i) => (
              <div key={task.key} className="flex gap-4 group">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 rounded-xl bg-[#0a1628] border border-white/10 flex items-center justify-center text-lg shrink-0 group-first:border-[#C9A84C]/30">
                    {task.icon}
                  </div>
                  {i < tasks.length - 1 && (
                    <div className="w-px flex-1 bg-white/[0.06] my-1" />
                  )}
                </div>
                {/* Content */}
                <div className={`pb-5 flex-1 ${i === tasks.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-sm font-semibold text-white">{task.title}</p>
                    <span className="shrink-0 text-[11px] text-[#C9A84C]/70 bg-[#C9A84C]/10 px-2 py-0.5 rounded-full border border-[#C9A84C]/10">
                      {task.delay}
                    </span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{task.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] text-white/25 leading-relaxed border-t border-white/[0.05] pt-4">
            * Les délais indiqués sont donnés à titre indicatif et peuvent évoluer selon la complexité du projet (reprise d&apos;un site existant, récupération d&apos;un nom de domaine en cours, configuration Stripe spécifique, etc.).
          </p>
        </div>

        {/* Info banner */}
        <div className="rounded-2xl bg-emerald-900/20 border border-emerald-500/20 px-5 py-4 flex gap-3 items-start">
          <span className="text-emerald-400 text-lg shrink-0">📬</span>
          <p className="text-sm text-emerald-300/80 leading-relaxed">
            Vous recevrez vos accès backoffice par email dès que votre site sera prêt.
            En attendant, notre équipe reste disponible à{" "}
            <a href="mailto:hello@dashclub.app" className="text-emerald-300 underline underline-offset-2">
              hello@dashclub.app
            </a>
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="block w-full rounded-2xl bg-[#C9A84C] px-6 py-4 text-center text-base font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition shadow-[0_8px_32px_rgba(201,168,76,0.25)]"
        >
          Retour à l&apos;accueil →
        </Link>

      </div>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs shrink-0 mt-0.5">
        ✓
      </div>
      <p className="text-sm text-white/60 leading-relaxed">{children}</p>
    </div>
  );
}
