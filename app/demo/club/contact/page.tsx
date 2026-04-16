"use client";

import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#C9A84C]">Nous écrire</p>
        <h1
          className="mt-2 text-4xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Contact
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {sent ? (
            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
              <div className="mb-3 text-4xl">✉️</div>
              <h2
                className="text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Message envoyé !
              </h2>
              <p className="mt-2 text-sm text-[#0D1F3C]/60">
                Nous vous répondrons dans les 48h. Simulation démo — aucun email réel envoyé.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 text-sm font-medium text-[#C9A84C] hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-8 shadow-sm"
            >
              <h2
                className="mb-6 text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Envoyer un message
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                    Prénom *
                  </label>
                  <input
                    required
                    className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                    Nom *
                  </label>
                  <input
                    required
                    className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none"
                />
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">Sujet</label>
                <select className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none">
                  <option>Renseignements adhésion</option>
                  <option>Inscription événement</option>
                  <option>Partenariat</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="mt-4">
                <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                  Message *
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2.5 text-sm focus:border-[#0D1F3C] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-[#0D1F3C] py-3.5 font-semibold text-white transition hover:bg-[#152e55]"
              >
                Envoyer le message →
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {[
            { icon: "📧", label: "Email", value: "hello@usm-triathlon.fr" },
            { icon: "📞", label: "Téléphone", value: "01 34 77 XX XX" },
            {
              icon: "📍",
              label: "Adresse",
              value: "Base Nautique de Mézy-sur-Seine\n78250 Mézy-sur-Seine",
            },
            { icon: "🕐", label: "Permanence", value: "Mardi & jeudi 18h–20h\nBase Nautique" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium whitespace-pre-line text-[#0D1F3C]">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
