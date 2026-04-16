"use client";

import { useState } from "react";
import { adminAdherents } from "../../usm-data";

const filters = [
  { label: "Tous", value: "all", count: 154 },
  { label: "Actifs", value: "Actif", count: 119 },
  { label: "Renouvellement", value: "Renouvellement", count: 23 },
  { label: "Expirés", value: "Expiré", count: 12 },
];

export default function AdminAdherentsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = adminAdherents.filter((a) => {
    const matchFilter = activeFilter === "all" || a.statut === activeFilter;
    const matchSearch =
      !search ||
      a.nom.toLowerCase().includes(search.toLowerCase()) ||
      a.prenom.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Adhérents
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">154 adhérents au total cette saison.</p>
      </div>

      {/* Filters + search */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex rounded-xl border border-[#0D1F3C]/10 bg-white overflow-hidden">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-2 text-sm font-medium transition ${
                activeFilter === f.value
                  ? "bg-[#0D1F3C] text-white"
                  : "text-[#0D1F3C]/60 hover:text-[#0D1F3C]"
              }`}
            >
              {f.label}{" "}
              <span className="ml-1 text-xs opacity-60">({f.count})</span>
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-[#0D1F3C]/10 bg-white px-4 py-2 text-sm focus:border-[#0D1F3C] focus:outline-none"
        />
        <div className="ml-auto flex gap-2">
          <button className="rounded-full border border-[#0D1F3C]/15 px-4 py-2 text-sm font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
            📥 Exporter CSV
          </button>
          <button className="rounded-full bg-[#C9A84C] px-4 py-2 text-sm font-semibold text-[#0D1F3C] hover:bg-[#e2c170]">
            ✉️ Envoyer relance
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0D1F3C]/5 bg-[#F8F6F1] text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                <th className="px-6 py-3">Nom</th>
                <th className="px-4 py-3">Prénom</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Licence</th>
                <th className="px-4 py-3">Expiration</th>
                <th className="px-4 py-3">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1F3C]/5">
              {filtered.map((a, i) => (
                <tr key={i} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-6 py-3 font-medium text-[#0D1F3C]">{a.nom}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{a.prenom}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/60">{a.email}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/70">{a.licence}</td>
                  <td className="px-4 py-3 text-[#0D1F3C]/60">{a.expire}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        a.statut === "Actif"
                          ? "bg-green-50 text-green-700"
                          : a.statut === "Renouvellement"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-red-50 text-red-600"
                      }`}
                    >
                      {a.statut === "Actif" ? "🟢" : a.statut === "Renouvellement" ? "🟡" : "🔴"}{" "}
                      {a.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="px-6 py-8 text-center text-sm text-[#0D1F3C]/40">Aucun résultat.</p>
        )}
        <div className="border-t border-[#0D1F3C]/5 px-6 py-3 text-xs text-[#0D1F3C]/40">
          Affichage de {filtered.length} adhérents (données de démo)
        </div>
      </div>
    </div>
  );
}
