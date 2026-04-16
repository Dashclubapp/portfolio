"use client";

import { useState } from "react";

const tabs = ["Informations club", "Domaine", "Stripe", "Apparence"];

export default function AdminParametresPage() {
  const [activeTab, setActiveTab] = useState("Informations club");

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Paramètres
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">Configurez votre club et votre site.</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex rounded-xl border border-[#0D1F3C]/10 bg-white overflow-hidden w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 text-sm font-medium transition ${
              activeTab === tab
                ? "bg-[#0D1F3C] text-white"
                : "text-[#0D1F3C]/60 hover:text-[#0D1F3C]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-8 shadow-sm">
        {activeTab === "Informations club" && (
          <div className="max-w-lg space-y-4">
            <h2
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Informations du club
            </h2>
            {[
              { label: "Nom du club", value: "Union Sportive de Mézy" },
              { label: "Email de contact", value: "hello@usm-triathlon.fr" },
              { label: "Téléphone", value: "01 34 77 XX XX" },
              { label: "Adresse", value: "Base Nautique de Mézy-sur-Seine, 78250" },
              { label: "Sport principal", value: "Triathlon / Multisport" },
            ].map((field) => (
              <div key={field.label}>
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                  {field.label}
                </label>
                <input
                  defaultValue={field.value}
                  className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none"
                />
              </div>
            ))}
            <button className="mt-2 rounded-full bg-[#C9A84C] px-6 py-2.5 text-sm font-semibold text-[#0D1F3C]">
              Enregistrer les modifications
            </button>
          </div>
        )}

        {activeTab === "Domaine" && (
          <div className="max-w-lg">
            <h2
              className="mb-2 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Domaine de votre site
            </h2>
            <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <p className="text-sm text-blue-800">
                🌐 Votre site est accessible sur{" "}
                <strong>usm-triathlon.dashclub.app</strong>
              </p>
            </div>
            <h3 className="mb-4 font-semibold text-[#0D1F3C]">
              Connecter votre domaine propre (usm-triathlon.fr)
            </h3>
            <div className="space-y-3">
              {[
                { step: "1", label: "Acheter le domaine", desc: "usm-triathlon.fr sur OVH, Gandi ou Google Domains (~12€/an)" },
                { step: "2", label: "Accéder à vos DNS", desc: "Dans l'interface de votre registrar, ouvrez la gestion DNS" },
                { step: "3", label: "Ajouter un enregistrement CNAME", desc: 'Pointez www.usm-triathlon.fr vers cname.dashclub.app' },
                { step: "4", label: "Validation automatique", desc: "DashClub détecte la configuration et active le HTTPS (~24h)" },
              ].map((step) => (
                <div key={step.step} className="flex gap-4 rounded-xl border border-[#0D1F3C]/10 p-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0D1F3C] text-sm font-bold text-[#C9A84C]">
                    {step.step}
                  </div>
                  <div>
                    <p className="font-medium text-[#0D1F3C]">{step.label}</p>
                    <p className="text-sm text-[#0D1F3C]/60">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                Votre domaine personnalisé
              </label>
              <div className="flex gap-2">
                <input
                  placeholder="usm-triathlon.fr"
                  className="flex-1 rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:outline-none"
                />
                <button className="rounded-lg bg-[#0D1F3C] px-4 py-2.5 text-sm font-medium text-white">
                  Vérifier
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Stripe" && (
          <div className="max-w-lg">
            <h2
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Compte Stripe
            </h2>
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-green-800">Compte Stripe connecté</p>
                  <p className="text-sm text-green-700">Compte USM Triathlon</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  { label: "Prochaine mise en paiement", value: "14/04/2025" },
                  { label: "Montant", value: "2 847€" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-white p-3">
                    <p className="text-xs text-green-700/70">{item.label}</p>
                    <p className="font-bold text-green-800">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-[#0D1F3C]/10 p-4 text-sm text-[#0D1F3C]/60">
              <p>
                💳 Les paiements sont versés directement sur votre compte bancaire. DashClub ne
                conserve aucune commission sur les transactions.
              </p>
            </div>
          </div>
        )}

        {activeTab === "Apparence" && (
          <div className="max-w-lg">
            <h2
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Apparence du site
            </h2>
            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0D1F3C]">
                  Couleur principale
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg border-2 border-white shadow"
                    style={{ backgroundColor: "#0D1F3C" }}
                  />
                  <input
                    defaultValue="#0D1F3C"
                    className="w-32 rounded-lg border border-[#0D1F3C]/20 px-3 py-2 font-mono text-sm"
                  />
                  <span className="text-sm text-[#0D1F3C]/50">Bleu marine USM</span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0D1F3C]">
                  Couleur d&apos;accent
                </label>
                <div className="flex items-center gap-3">
                  <div
                    className="h-10 w-10 rounded-lg border-2 border-white shadow"
                    style={{ backgroundColor: "#C9A84C" }}
                  />
                  <input
                    defaultValue="#C9A84C"
                    className="w-32 rounded-lg border border-[#0D1F3C]/20 px-3 py-2 font-mono text-sm"
                  />
                  <span className="text-sm text-[#0D1F3C]/50">Or USM</span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0D1F3C]">Logo du club</label>
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#0D1F3C]">
                    <span className="text-xs font-bold text-[#C9A84C]">USM</span>
                  </div>
                  <button className="rounded-lg border border-[#0D1F3C]/20 px-4 py-2 text-sm text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                    📎 Changer le logo
                  </button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#0D1F3C]">Favicon</label>
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-[#0D1F3C]">
                    <span className="text-[8px] font-bold text-[#C9A84C]">DC</span>
                  </div>
                  <button className="rounded-lg border border-[#0D1F3C]/20 px-4 py-2 text-sm text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                    📎 Changer le favicon
                  </button>
                </div>
              </div>
              <button className="rounded-full bg-[#C9A84C] px-6 py-2.5 text-sm font-semibold text-[#0D1F3C]">
                Enregistrer l&apos;apparence
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
