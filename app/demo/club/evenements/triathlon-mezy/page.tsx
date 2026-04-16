"use client";

import Link from "next/link";
import { useState } from "react";
import { usmEvents } from "../../../usm-data";

const event = usmEvents[0]!;

export default function TriathlonMezyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    licence: "",
    categorie: "",
    reglement: false,
    rgpd: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="rounded-2xl border border-green-200 bg-green-50 p-10">
          <div className="mb-4 text-5xl">✅</div>
          <h2
            className="text-2xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Inscription enregistrée !
          </h2>
          <p className="mt-4 text-[#0D1F3C]/70">
            Vous recevrez un email de confirmation dans quelques minutes.
          </p>
          <div className="mt-6 rounded-xl bg-white p-6">
            <p className="text-sm text-[#0D1F3C]/60">Votre dossard</p>
            <p
              className="text-5xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              #088
            </p>
            <p className="mt-2 text-sm text-[#0D1F3C]/60">Triathlon de Mézy — Sprint · 14 juin 2025</p>
          </div>
          <p className="mt-4 text-sm text-[#0D1F3C]/50">
            ℹ️ Simulation démo — aucun email réel envoyé, aucun paiement débité.
          </p>
          <Link
            href="/demo/club/evenements"
            className="mt-6 inline-flex items-center rounded-full bg-[#0D1F3C] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#152e55]"
          >
            Retour aux événements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-[#0D1F3C]/50">
        <Link href="/demo/club" className="hover:text-[#0D1F3C]">
          Accueil
        </Link>
        <span>/</span>
        <Link href="/demo/club/evenements" className="hover:text-[#0D1F3C]">
          Événements
        </Link>
        <span>/</span>
        <span className="text-[#0D1F3C]">{event.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main content */}
        <div>
          {/* Hero */}
          <div className="rounded-2xl bg-[#0D1F3C] p-8 text-white">
            <span className="inline-block rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-300">
              Inscriptions ouvertes
            </span>
            <h1
              className="mt-4 text-4xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {event.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
              <span>📅 {event.dateLabel}</span>
              <span>📍 {event.location}</span>
              <span>
                🏁 {event.registered}/{event.capacity} inscrits
              </span>
            </div>
          </div>

          {/* Distances */}
          <div className="mt-6 rounded-2xl border border-[#0D1F3C]/10 bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Format Sprint
            </h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="rounded-xl bg-[#F8F6F1] p-4">
                <p className="text-2xl">🏊</p>
                <p className="mt-1 text-xl font-bold text-[#0D1F3C]">750m</p>
                <p className="text-xs text-[#0D1F3C]/60">Natation</p>
              </div>
              <div className="rounded-xl bg-[#F8F6F1] p-4">
                <p className="text-2xl">🚴</p>
                <p className="mt-1 text-xl font-bold text-[#0D1F3C]">20km</p>
                <p className="text-xs text-[#0D1F3C]/60">Vélo</p>
              </div>
              <div className="rounded-xl bg-[#F8F6F1] p-4">
                <p className="text-2xl">🏃</p>
                <p className="mt-1 text-xl font-bold text-[#0D1F3C]">5km</p>
                <p className="text-xs text-[#0D1F3C]/60">Course à pied</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6 rounded-2xl border border-[#0D1F3C]/10 bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              À propos de l&apos;épreuve
            </h2>
            <p className="text-sm leading-relaxed text-[#0D1F3C]/70">{event.description}</p>
            <ul className="mt-4 space-y-2">
              {event.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-sm text-[#0D1F3C]/70">
                  <span className="text-[#C9A84C]">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Programme */}
          <div className="mt-6 rounded-2xl border border-[#0D1F3C]/10 bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Programme de la journée
            </h2>
            <ul className="space-y-3">
              {event.schedule.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <span className="rounded bg-[#0D1F3C]/10 px-2 py-0.5 font-mono text-xs text-[#0D1F3C]">
                    {item.split("—")[0]}
                  </span>
                  <span className="text-[#0D1F3C]/70">{item.split("—")[1]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Carte fictive */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#0D1F3C]/10 bg-white">
            <div className="flex h-48 items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
              <div className="text-center text-[#0D1F3C]/40">
                <p className="text-4xl">🗺️</p>
                <p className="mt-2 text-sm font-medium">Plan d&apos;eau de Mézy-sur-Seine</p>
                <p className="text-xs">Mézy-sur-Seine, 78250 (78)</p>
              </div>
            </div>
          </div>

          {/* Règlement */}
          <div className="mt-6 rounded-2xl border border-[#0D1F3C]/10 bg-white p-6">
            <h2
              className="mb-4 text-xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Règlement
            </h2>
            <ul className="space-y-2">
              {event.reglement.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-[#0D1F3C]/70">
                  <span className="text-[#0D1F3C]/40">•</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Registration form */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {/* Tarifs */}
          <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm">
            <h3
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Tarifs
            </h3>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-[#0D1F3C]/10">
                {event.tarifs.map((t) => (
                  <tr key={t.categorie}>
                    <td className="py-2.5 text-[#0D1F3C]/70">{t.categorie}</td>
                    <td className="py-2.5 text-right font-semibold text-[#0D1F3C]">{t.prix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm"
          >
            <h3
              className="mb-4 text-lg font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Inscription
            </h3>
            <div className="grid grid-cols-2 gap-3">
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
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                N° Licence FFTri
              </label>
              <input
                value={form.licence}
                onChange={(e) => setForm({ ...form, licence: e.target.value })}
                placeholder="Ex: 78123456"
                className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                Catégorie *
              </label>
              <select
                required
                value={form.categorie}
                onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
              >
                <option value="">Choisir...</option>
                <option>S1 (18-24 ans)</option>
                <option>S2 (25-29 ans)</option>
                <option>S3 (30-34 ans)</option>
                <option>M30 (30-34 ans)</option>
                <option>M35 (35-39 ans)</option>
                <option>M40 (40-44 ans)</option>
                <option>M45 (45-49 ans)</option>
                <option>M50 (50-54 ans)</option>
                <option>Jeune -23 ans</option>
              </select>
            </div>
            <div className="mt-4 space-y-2">
              <label className="flex items-start gap-2 text-xs text-[#0D1F3C]/60">
                <input
                  required
                  type="checkbox"
                  checked={form.reglement}
                  onChange={(e) => setForm({ ...form, reglement: e.target.checked })}
                  className="mt-0.5 shrink-0"
                />
                J&apos;accepte le règlement de l&apos;épreuve *
              </label>
              <label className="flex items-start gap-2 text-xs text-[#0D1F3C]/60">
                <input
                  required
                  type="checkbox"
                  checked={form.rgpd}
                  onChange={(e) => setForm({ ...form, rgpd: e.target.checked })}
                  className="mt-0.5 shrink-0"
                />
                J&apos;accepte la politique de confidentialité (RGPD) *
              </label>
            </div>
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-[#C9A84C] py-3.5 font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]"
            >
              S&apos;inscrire et payer 35€ →
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
