"use client";

import { useState } from "react";

const SPORTS = [
  "Triathlon", "Course à pied", "Trail", "Natation", "Cyclisme",
  "Duathlon", "Athlétisme", "Rugby", "Football", "Tennis", "Autre",
];

interface ClubData {
  id: number;
  nom_club: string;
  sport: string;
  ville: string;
  description_courte: string;
  logo_url: string;
  couleur_primaire: string;
  couleur_secondaire: string;
  email_contact: string;
  telephone_contact: string;
  email: string;
  telephone: string;
}

export default function ClubInfoClient({ club, slug }: { club: ClubData; slug: string }) {
  const [form, setForm] = useState({
    nom_club: club.nom_club ?? "",
    sport: club.sport ?? "",
    ville: club.ville ?? "",
    description_courte: club.description_courte ?? "",
    couleur_primaire: club.couleur_primaire ?? "#0D1F3C",
    couleur_secondaire: club.couleur_secondaire ?? "#C9A84C",
    email_contact: club.email_contact ?? club.email ?? "",
    telephone_contact: club.telephone_contact ?? club.telephone ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const siteUrl = slug ? `https://${slug}.dashclub.app` : "#";

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/admin/club", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Une erreur est survenue. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Mon site / Infos club</h1>
          <p className="text-sm text-white/50 mt-0.5">Ces informations apparaissent sur votre site public.</p>
        </div>
        {slug && (
          <a
            href={siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 rounded-xl border border-white/20 px-4 py-2 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
          >
            <span>👁️</span> Voir mon site
          </a>
        )}
      </div>

      {/* Form card */}
      <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 p-5 sm:p-6">
        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nom du club *">
              <input
                type="text"
                value={form.nom_club}
                onChange={(e) => setForm({ ...form, nom_club: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                placeholder="ex: USM Triathlon"
              />
            </Field>

            <Field label="Sport *">
              <select
                value={form.sport}
                onChange={(e) => setForm({ ...form, sport: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                required
              >
                <option value="">Choisissez un sport</option>
                {SPORTS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

            <Field label="Ville *">
              <input
                type="text"
                value={form.ville}
                onChange={(e) => setForm({ ...form, ville: e.target.value })}
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                placeholder="ex: Paris"
              />
            </Field>

            <Field label="Email de contact public">
              <input
                type="email"
                value={form.email_contact}
                onChange={(e) => setForm({ ...form, email_contact: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                placeholder="contact@monclub.fr"
              />
            </Field>

            <Field label="Téléphone de contact public">
              <input
                type="tel"
                value={form.telephone_contact}
                onChange={(e) => setForm({ ...form, telephone_contact: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                placeholder="06 00 00 00 00"
              />
            </Field>
          </div>

          <Field label="Description courte (max 500 caractères)">
            <textarea
              value={form.description_courte}
              onChange={(e) => setForm({ ...form, description_courte: e.target.value.slice(0, 500) })}
              rows={3}
              className="input-field resize-none"
              placeholder="Présentez votre club en quelques mots…"
            />
            <p className="text-xs text-white/30 mt-1 text-right">
              {form.description_courte.length}/500
            </p>
          </Field>

          {/* Color pickers */}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Couleur principale">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.couleur_primaire}
                  onChange={(e) => setForm({ ...form, couleur_primaire: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                />
                <span className="text-sm text-white/60">{form.couleur_primaire}</span>
              </div>
            </Field>
            <Field label="Couleur secondaire (accent)">
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={form.couleur_secondaire}
                  onChange={(e) => setForm({ ...form, couleur_secondaire: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer border border-white/20 bg-transparent"
                />
                <span className="text-sm text-white/60">{form.couleur_secondaire}</span>
              </div>
            </Field>
          </div>

          {/* Aperçu */}
          {slug && (
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Aperçu de votre site</p>
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#C9A84C] underline hover:text-[#D4B860]"
              >
                {slug}.dashclub.app →
              </a>
            </div>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-50 transition"
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
            {saved && (
              <span className="text-sm text-emerald-400 font-medium">✓ Enregistré !</span>
            )}
          </div>
        </form>
      </div>

    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-white/50 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
