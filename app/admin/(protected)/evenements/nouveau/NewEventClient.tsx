"use client";

import { useState } from "react";
import Link from "next/link";

type Step = 1 | 2 | 3;

interface EventForm {
  titre: string;
  description: string;
  date_evenement: string;
  nb_places: string;
  tarif_standard: string;
  tarif_membre: string;
}

export default function NewEventClient({ slug }: { slug: string }) {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<EventForm>({
    titre: "",
    description: "",
    date_evenement: "",
    nb_places: "",
    tarif_standard: "",
    tarif_membre: "",
  });
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<{ id: number; slug: string } | null>(null);
  const [error, setError] = useState("");

  async function submit(statut: "draft" | "published") {
    setCreating(true);
    setError("");
    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titre: form.titre,
          description: form.description,
          date_evenement: form.date_evenement,
          nb_places: form.nb_places ? parseInt(form.nb_places) : null,
          tarif_standard: parseFloat(form.tarif_standard),
          tarif_membre: form.tarif_membre ? parseFloat(form.tarif_membre) : null,
          statut,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur");
      setCreated(data.event);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la création");
    } finally {
      setCreating(false);
    }
  }

  if (created) {
    const eventUrl = slug ? `https://${slug}.dashclub.app/evenements/${created.slug}` : null;
    return (
      <div className="max-w-xl space-y-5">
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6 text-center">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-lg font-bold text-white mb-2">Événement créé !</h2>
          <p className="text-sm text-white/60 mb-4">
            Il est maintenant accessible sur votre site.
          </p>
          {eventUrl && (
            <p className="text-sm text-[#C9A84C] break-all">
              <a href={eventUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-[#D4B860]">
                {eventUrl}
              </a>
            </p>
          )}
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/evenements"
            className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/70 hover:text-white hover:border-white/40 transition"
          >
            ← Retour aux événements
          </Link>
          <button
            onClick={() => { setCreated(null); setStep(1); setForm({ titre: "", description: "", date_evenement: "", nb_places: "", tarif_standard: "", tarif_membre: "" }); }}
            className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition"
          >
            Créer un autre événement
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/admin/evenements" className="text-white/40 hover:text-white text-sm transition">← Événements</Link>
        <span className="text-white/20">/</span>
        <h1 className="text-lg font-bold text-white">Nouvel événement</h1>
      </div>

      {/* Step indicators */}
      <div className="flex gap-3">
        {([1, 2, 3] as Step[]).map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border ${
              s < step ? "bg-[#C9A84C] border-[#C9A84C] text-[#0D1F3C]"
              : s === step ? "bg-[#C9A84C]/20 border-[#C9A84C]/50 text-[#C9A84C]"
              : "bg-transparent border-white/20 text-white/30"
            }`}>
              {s < step ? "✓" : s}
            </div>
            <span className={`text-xs ${s === step ? "text-white" : "text-white/30"}`}>
              {s === 1 ? "Infos" : s === 2 ? "Détails" : "Résumé"}
            </span>
            {s < 3 && <div className={`h-px w-8 ${s < step ? "bg-[#C9A84C]/50" : "bg-white/10"}`} />}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 p-5 sm:p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Étape 1 — Présentation</h2>
            <Field label="Nom de l'événement *">
              <input
                type="text"
                value={form.titre}
                onChange={(e) => setForm({ ...form, titre: e.target.value })}
                placeholder="ex: Triathlon Sprint de Mézy"
                required
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
              />
            </Field>
            <Field label="Description *">
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Décrivez votre événement…"
                rows={4}
                required
                className="input-field resize-none"
              />
            </Field>
            <button
              disabled={!form.titre || !form.description}
              onClick={() => setStep(2)}
              className="w-full rounded-xl bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-40 transition"
            >
              Continuer →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Étape 2 — Dates & tarifs</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date de l'événement *">
                <input
                  type="date"
                  value={form.date_evenement}
                  onChange={(e) => setForm({ ...form, date_evenement: e.target.value })}
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                />
              </Field>
              <Field label="Nombre de places">
                <input
                  type="number"
                  value={form.nb_places}
                  onChange={(e) => setForm({ ...form, nb_places: e.target.value })}
                  placeholder="ex: 100"
                  min="1"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                />
              </Field>
              <Field label="Tarif par personne (€) *">
                <input
                  type="number"
                  value={form.tarif_standard}
                  onChange={(e) => setForm({ ...form, tarif_standard: e.target.value })}
                  placeholder="ex: 25"
                  min="0"
                  step="0.01"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                />
              </Field>
              <Field label="Tarif membre du club (€, optionnel)">
                <input
                  type="number"
                  value={form.tarif_membre}
                  onChange={(e) => setForm({ ...form, tarif_membre: e.target.value })}
                  placeholder="ex: 15"
                  min="0"
                  step="0.01"
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                />
              </Field>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/70 hover:text-white transition"
              >
                ← Retour
              </button>
              <button
                disabled={!form.date_evenement || !form.tarif_standard}
                onClick={() => setStep(3)}
                className="flex-1 rounded-xl bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-40 transition"
              >
                Voir le résumé →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-base font-bold text-white">Étape 3 — Récapitulatif</h2>
            <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-2">
              <SummaryRow label="Nom" value={form.titre} />
              <SummaryRow label="Date" value={form.date_evenement ? new Date(form.date_evenement).toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" }) : "—"} />
              {form.nb_places && <SummaryRow label="Places" value={`${form.nb_places} places`} />}
              <SummaryRow label="Tarif" value={`${form.tarif_standard} €`} />
              {form.tarif_membre && <SummaryRow label="Tarif membre" value={`${form.tarif_membre} €`} />}
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="rounded-xl border border-white/20 px-5 py-2.5 text-sm text-white/70 hover:text-white transition"
              >
                ← Retour
              </button>
              <button
                onClick={() => submit("draft")}
                disabled={creating}
                className="flex-1 rounded-xl border border-white/20 px-5 py-3 text-sm font-medium text-white/70 hover:text-white hover:border-white/40 disabled:opacity-40 transition"
              >
                {creating ? "Création…" : "Créer en brouillon"}
              </button>
              <button
                onClick={() => submit("published")}
                disabled={creating}
                className="flex-1 rounded-xl bg-[#C9A84C] px-5 py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-40 transition"
              >
                {creating ? "Création…" : "Publier maintenant"}
              </button>
            </div>
          </div>
        )}
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

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/50">{label}</span>
      <span className="text-white font-medium">{value}</span>
    </div>
  );
}
