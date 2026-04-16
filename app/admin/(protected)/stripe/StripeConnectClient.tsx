"use client";

import { useState } from "react";

interface Props {
  status: string;
  accountId: string | null;
  clubId: number;
  clubName: string;
  email: string;
}

export default function StripeConnectClient({ status, accountId, clubId, clubName, email }: Props) {
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState("");

  async function handleConnect() {
    setConnecting(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/connect/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clubId, email, clubName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion Stripe");
      setConnecting(false);
    }
  }

  const isConnected = status === "connected";
  const isPending = status === "pending" || status === "in_review";

  return (
    <div className="space-y-5 max-w-2xl">
      <div>
        <h1 className="text-xl font-bold text-white">Stripe Connect</h1>
        <p className="text-sm text-white/50 mt-0.5">Recevez les paiements directement sur votre compte bancaire.</p>
      </div>

      {isConnected ? (
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
            <h2 className="text-base font-bold text-emerald-300">Stripe connecté</h2>
          </div>
          {accountId && (
            <p className="text-sm text-white/60">Compte : <span className="text-white font-mono text-xs">{accountId}</span></p>
          )}
          <p className="text-sm text-white/60">
            Les paiements d&apos;inscriptions sont versés directement sur votre compte bancaire.
            DashClub ne touche pas à l&apos;argent.
          </p>
          {accountId && (
            <a
              href={`https://dashboard.stripe.com/${accountId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 px-4 py-2.5 text-sm text-emerald-300 hover:bg-emerald-500/10 transition"
            >
              Gérer mon compte Stripe →
            </a>
          )}
        </div>
      ) : isPending ? (
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-base font-bold text-amber-300">En cours de validation</h2>
          </div>
          <p className="text-sm text-white/60">
            Votre compte Stripe est en cours de vérification. Cela prend généralement 1 à 2 jours ouvrés.
          </p>
          <button
            onClick={handleConnect}
            disabled={connecting}
            className="rounded-xl border border-amber-500/30 px-4 py-2.5 text-sm text-amber-300 hover:bg-amber-500/10 disabled:opacity-50 transition"
          >
            {connecting ? "Redirection…" : "Reprendre la configuration →"}
          </button>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/20 flex items-center justify-center text-xl">⚡</div>
            <div>
              <h2 className="text-base font-bold text-white">Connectez votre compte Stripe</h2>
              <p className="text-xs text-white/50">Pour recevoir les paiements d&apos;inscriptions</p>
            </div>
          </div>

          <p className="text-sm text-white/60 leading-relaxed">
            Les inscriptions à vos événements seront versées directement sur votre compte bancaire.
            <strong className="text-white"> DashClub ne touche pas à l&apos;argent.</strong>
          </p>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            onClick={handleConnect}
            disabled={connecting}
            className="w-full rounded-xl bg-[#C9A84C] px-6 py-3.5 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-50 transition"
          >
            {connecting ? "Redirection vers Stripe…" : "Connecter mon compte Stripe →"}
          </button>

          {/* How it works */}
          <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
            <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Comment ça marche ?</p>
            {[
              "Cliquez sur « Connecter mon compte Stripe »",
              "Créez un compte Stripe gratuit (ou connectez l'existant)",
              "Renseignez vos informations bancaires",
              "Prêt ! Les paiements arrivent sur votre compte.",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-[#C9A84C]/20 flex items-center justify-center text-xs text-[#C9A84C] font-bold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-white/60">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
