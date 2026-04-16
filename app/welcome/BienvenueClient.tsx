"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SessionData {
  email?: string;
  clubName?: string;
  slug?: string;
  formule?: string;
}

export default function BienvenueClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [data, setData] = useState<SessionData | null>(null);

  useEffect(() => {
    // Try to fetch session data if we have a session_id
    // For now, we display a generic welcome page since we don't have the session lookup API
    setData({});
  }, [sessionId]);

  const siteUrl = data?.slug ? `https://${data.slug}.dashclub.app` : null;

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(201,168,76,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative w-full max-w-md space-y-6">
        {/* Header card */}
        <div className="rounded-3xl bg-[#0D1F3C] border border-[#C9A84C]/20 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <div className="text-5xl mb-4">🚀</div>
          <h1 className="text-2xl font-bold text-white mb-2">
            Encore quelques étapes…
          </h1>
          <p className="text-sm text-white/60 mb-1">
            Le nouveau site DashClub sera bientôt en ligne !
          </p>
          {data?.formule && (
            <p className="text-sm text-white/60 mb-1">
              Votre abonnement <strong className="text-[#C9A84C]">{data.formule}</strong> est enregistré.
            </p>
          )}

          {/* Confirmations */}
          <div className="mt-5 space-y-2 text-left">
            <CheckItem>
              Votre paiement a bien été reçu
            </CheckItem>
            <CheckItem>
              {data?.email
                ? <>Votre email de confirmation a été envoyé à <strong className="text-white">{data.email}</strong></>
                : "Votre email de confirmation a été envoyé"
              }
            </CheckItem>
          </div>
        </div>

        {/* Next steps */}
        <div className="rounded-3xl bg-[#0D1F3C] border border-white/10 p-6">
          <p className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Prochaines étapes</p>
          <div className="space-y-3">
            {[
              { n: 1, text: "Notre équipe vous contacte sous 24h pour recueillir vos contenus", href: null, cta: null },
              { n: 2, text: "Votre site de club sera mis en ligne sous 5 jours ouvrés", href: null, cta: null },
              { n: 3, text: "Vous recevrez vos accès backoffice par email dès l'ouverture", href: null, cta: null },
            ].map((step) => (
              <div key={step.n} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-xs text-[#C9A84C] font-bold shrink-0 mt-0.5">
                  {step.n}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white/70 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="block w-full rounded-2xl bg-[#C9A84C] px-6 py-4 text-center text-base font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition shadow-[0_8px_32px_rgba(201,168,76,0.3)]"
        >
          Retour à l&apos;accueil →
        </Link>

        <p className="text-center text-xs text-white/30">
          Besoin d&apos;aide ?{" "}
          <a href="mailto:hello@dashclub.fr" className="text-white/50 underline hover:text-white/70">
            hello@dashclub.fr
          </a>
        </p>
      </div>
    </div>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-xs shrink-0 mt-0.5">✓</div>
      <p className="text-sm text-white/60">{children}</p>
    </div>
  );
}
