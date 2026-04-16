"use client";

import { useState } from "react";
import { usmMembershipOptions } from "../../usm-data";

export type LicenceId = (typeof usmMembershipOptions)[number]["id"];

export default function AdhesionPageClient({ initialLicence }: { initialLicence: LicenceId }) {
  const [submitted, setSubmitted] = useState(false);
  const [selectedLicence, setSelectedLicence] = useState<LicenceId>(initialLicence);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    ddn: "",
    email: "",
    telephone: "",
  });

  if (submitted) {
    const licence = usmMembershipOptions.find((o) => o.id === selectedLicence);
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10">
          <div className="mb-4 text-5xl">✅</div>
          <h2
            className="text-2xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bienvenue à l&apos;USM Triathlon !
          </h2>
          <p className="mt-3 text-[#0D1F3C]/70">
            Votre adhésion a bien été enregistrée. Vous recevrez un email de confirmation et votre
            licence FFTri vous sera envoyée sous 48h ouvrées.
          </p>
          <div className="mt-6 rounded-xl bg-white p-6">
            <p className="text-sm text-[#0D1F3C]/60">Licence souscrite</p>
            <p
              className="text-2xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {licence?.name}
            </p>
            <p className="mt-1 font-semibold text-[#C9A84C]">{licence?.price}</p>
          </div>
          <p className="mt-4 text-sm text-[#0D1F3C]/50">
            ℹ️ Simulation démo — aucun email réel envoyé.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#C9A84C]">Saison 2025</p>
        <h1
          className="mt-2 text-4xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Adhérer à l&apos;USM Triathlon
        </h1>
        <p className="mt-3 text-[#0D1F3C]/60">
          Choisissez votre licence et rejoignez la communauté USM. Inscription en ligne rapide et
          sécurisée.
        </p>
        <div className="mt-5 inline-flex max-w-2xl items-start gap-3 rounded-2xl border border-[#C9A84C]/30 bg-[#FFF9ED] px-4 py-3 text-left shadow-[0_16px_30px_rgba(13,31,60,0.06)]">
          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C9A84C]/15 text-sm text-[#0D1F3C]">
            ✉️
          </span>
          <p className="text-sm font-medium leading-6 text-[#0D1F3C]">
            Votre licence FFTri vous est envoyée par email sous 48h ouvrées.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#0D1F3C] shadow-[0_28px_60px_rgba(13,31,60,0.18)]">
            <img
              src="/club-membership-visual.jpg"
              alt="Athlète de triathlon pendant une séance en extérieur"
              className="h-[260px] w-full object-cover sm:h-[320px]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(13,31,60,0.18),rgba(13,31,60,0.88)_78%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#F8F6F1] backdrop-blur">
                Ambiance club
              </div>
              <h2
                className="mt-4 max-w-md text-3xl font-bold leading-tight text-white sm:text-[2.15rem]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Un club pour progresser, s&apos;entraîner ensemble et prendre sa licence sereinement.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/80 sm:text-base">
                Séances encadrées, accueil des nouveaux adhérents, suivi licence et communication
                club réunis dans un parcours simple.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2
                  className="text-2xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Choisissez votre licence
                </h2>
                <p className="mt-2 text-sm text-[#0D1F3C]/60">
                  La formule sélectionnée se répercute automatiquement dans le formulaire.
                </p>
              </div>
              <div className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#0D1F3C]/60 shadow-sm sm:block">
                3 formules pour tous les niveaux
              </div>
            </div>
            <div className="space-y-4">
              {usmMembershipOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedLicence(option.id)}
                  className={`w-full rounded-2xl border-2 p-6 text-left transition ${
                    selectedLicence === option.id
                      ? "border-[#C9A84C] bg-[#C9A84C]/5 shadow-[0_18px_34px_rgba(201,168,76,0.12)]"
                      : "border-[#0D1F3C]/10 bg-white hover:border-[#0D1F3C]/30"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                          selectedLicence === option.id
                            ? "border-[#C9A84C] bg-[#C9A84C]"
                            : "border-[#0D1F3C]/20"
                        }`}
                      >
                        {selectedLicence === option.id && (
                          <div className="h-2 w-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[#0D1F3C]">{option.name}</p>
                        <p className="mt-0.5 text-sm text-[#0D1F3C]/60">{option.description}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xl font-bold text-[#0D1F3C]">
                      {option.price}
                    </span>
                  </div>
                  <ul className="mt-4 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {option.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-[#0D1F3C]/60">
                        <span className="text-[#C9A84C]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm"
          >
            <h3
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Vos informations
            </h3>
            <div className="mb-4 rounded-2xl border border-[#C9A84C]/20 bg-[#FFF9ED] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]">
                Réassurance FFTri
              </p>
              <p className="mt-2 text-sm leading-6 text-[#0D1F3C]/75">
                Dès validation de votre adhésion, votre licence FFTri vous est envoyée par email
                sous 48h ouvrées.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                  Prénom *
                </label>
                <input
                  required
                  value={form.prenom}
                  onChange={(e) => setForm({ ...form, prenom: e.target.value })}
                  className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">Nom *</label>
                <input
                  required
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                Date de naissance *
              </label>
              <input
                required
                type="date"
                value={form.ddn}
                onChange={(e) => setForm({ ...form, ddn: e.target.value })}
                className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">Email *</label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                Téléphone
              </label>
              <input
                value={form.telephone}
                onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
              />
            </div>
            <div className="mt-3 rounded-lg bg-[#F8F6F1] p-3">
              <p className="text-xs text-[#0D1F3C]/60">Licence sélectionnée</p>
              <p className="font-semibold text-[#0D1F3C]">
                {usmMembershipOptions.find((o) => o.id === selectedLicence)?.name} —{" "}
                {usmMembershipOptions.find((o) => o.id === selectedLicence)?.price}
              </p>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-[#C9A84C] py-3.5 font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]"
            >
              Adhérer en ligne →
            </button>
            <p className="mt-2 text-center text-[10px] text-[#0D1F3C]/40">
              🔒 Paiement sécurisé · Simulation démo
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
