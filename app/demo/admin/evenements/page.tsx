"use client";

import { useState } from "react";
import { usmEvents } from "../../usm-data";

const adminEvents = [
  ...usmEvents.map((e) => ({
    titre: e.title,
    date: e.dateLabel,
    capacite: e.capacity,
    inscrits: e.registered,
    statut: e.status === "Complet" ? "Complet" : "Ouvert",
  })),
  {
    titre: "Triathlon Automne USM",
    date: "15/09/2025",
    capacite: 150,
    inscrits: 0,
    statut: "Brouillon",
  },
];

const sampleInscrits = [
  { nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.fr", categorie: "F30-34", dossard: "#001", statut: "Payé" },
  { nom: "Dubois", prenom: "Pierre", email: "p.dubois@gmail.com", categorie: "M40-44", dossard: "#002", statut: "Payé" },
  { nom: "Leroy", prenom: "Emma", email: "emma.leroy@email.fr", categorie: "F18-23", dossard: "#003", statut: "Payé" },
  { nom: "Bernard", prenom: "Lucas", email: "lucas.b@email.fr", categorie: "M18-23", dossard: "#004", statut: "En attente" },
  { nom: "Petit", prenom: "Marie", email: "m.petit@email.fr", categorie: "F35-39", dossard: "#005", statut: "Payé" },
  { nom: "Simon", prenom: "Julien", email: "j.simon@email.fr", categorie: "M30-34", dossard: "#006", statut: "Payé" },
];

export default function AdminEvenementsPage() {
  const [showDetail, setShowDetail] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Événements
          </h1>
          <p className="text-sm text-[#0D1F3C]/50">Gérez vos événements et inscriptions.</p>
        </div>
        <button
          onClick={() => setShowCreateForm(true)}
          className="rounded-full bg-[#0D1F3C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152e55]"
        >
          + Créer un événement
        </button>
      </div>

      {/* Create form modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2
                className="text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Créer un événement
              </h2>
              <button onClick={() => setShowCreateForm(false)} className="text-[#0D1F3C]/40 hover:text-[#0D1F3C]">
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Titre de l'événement", type: "text" },
                { label: "Description", type: "textarea" },
                { label: "Date", type: "date" },
                { label: "Lieu", type: "text" },
                { label: "Capacité (dossards)", type: "number" },
                { label: "Prix non-membre (€)", type: "number" },
                { label: "Prix membre (€)", type: "number" },
                { label: "Date ouverture inscriptions", type: "date" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={2}
                      className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
                    />
                  )}
                </div>
              ))}
              <label className="flex items-center gap-2 text-sm text-[#0D1F3C]/70">
                <input type="checkbox" />
                Activer la file d&apos;attente automatique
              </label>
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 rounded-full border border-[#0D1F3C]/20 py-2.5 text-sm font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex-1 rounded-full bg-[#C9A84C] py-2.5 text-sm font-semibold text-[#0D1F3C]"
              >
                Créer l&apos;événement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Events table */}
      <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0D1F3C]/5 bg-[#F8F6F1] text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                <th className="px-6 py-3">Titre</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Capacité</th>
                <th className="px-4 py-3">Inscrits</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1F3C]/5">
              {adminEvents.map((ev, i) => (
                <tr key={i} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-6 py-3 font-medium text-[#0D1F3C]">{ev.titre}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{ev.date}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{ev.capacite}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#0D1F3C]">{ev.inscrits}</span>
                      <div className="h-1.5 w-16 rounded-full bg-[#0D1F3C]/10">
                        <div
                          className="h-1.5 rounded-full bg-[#C9A84C]"
                          style={{ width: `${(ev.inscrits / ev.capacite) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        ev.statut === "Ouvert"
                          ? "bg-green-50 text-green-700"
                          : ev.statut === "Complet"
                            ? "bg-red-50 text-red-600"
                            : "bg-[#0D1F3C]/5 text-[#0D1F3C]/60"
                      }`}
                    >
                      {ev.statut === "Ouvert"
                        ? "🟢"
                        : ev.statut === "Complet"
                          ? "🔴"
                          : "⚫"}{" "}
                      {ev.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowDetail(true)}
                        className="rounded-lg border border-[#0D1F3C]/15 px-3 py-1 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5"
                      >
                        Voir
                      </button>
                      <button className="rounded-lg border border-[#0D1F3C]/15 px-3 py-1 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                        Éditer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {showDetail && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/50 p-4 pt-10">
          <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#0D1F3C]/10 px-6 py-4">
              <h2
                className="text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Triathlon de Mézy — Sprint · 87 inscrits
              </h2>
              <button
                onClick={() => setShowDetail(false)}
                className="text-[#0D1F3C]/40 hover:text-[#0D1F3C]"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-4 flex flex-wrap gap-2">
                <button className="rounded-full border border-[#0D1F3C]/20 px-4 py-2 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                  📥 Exporter CSV
                </button>
                <button className="rounded-full border border-[#0D1F3C]/20 px-4 py-2 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                  ✉️ Envoyer email aux inscrits
                </button>
                <button className="rounded-full border border-[#0D1F3C]/20 px-4 py-2 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                  🏷️ Télécharger liste dossards
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#0D1F3C]/5 text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                      <th className="py-2">Nom</th>
                      <th className="py-2">Prénom</th>
                      <th className="py-2">Email</th>
                      <th className="py-2">Catégorie</th>
                      <th className="py-2">Dossard</th>
                      <th className="py-2">Paiement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0D1F3C]/5">
                    {sampleInscrits.map((inscrit, i) => (
                      <tr key={i}>
                        <td className="py-2.5 font-medium text-[#0D1F3C]">{inscrit.nom}</td>
                        <td className="py-2.5 text-[#0D1F3C]/70">{inscrit.prenom}</td>
                        <td className="py-2.5 text-[#0D1F3C]/70">{inscrit.email}</td>
                        <td className="py-2.5 text-[#0D1F3C]/70">{inscrit.categorie}</td>
                        <td className="py-2.5 font-mono text-xs text-[#0D1F3C]">{inscrit.dossard}</td>
                        <td className="py-2.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              inscrit.statut === "Payé"
                                ? "bg-green-50 text-green-700"
                                : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {inscrit.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-[#0D1F3C]/40">
                + 81 autres inscrits · 12 personnes en liste d&apos;attente
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
