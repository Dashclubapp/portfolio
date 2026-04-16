"use client";

import { useState } from "react";
import { adminBoutiqueProducts } from "../../usm-data";

export default function AdminBoutiquePage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Boutique
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">Gérez vos produits et suivez vos ventes.</p>
      </div>

      {/* Banner */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-[#0D1F3C] to-[#152e55] p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#C9A84C]">Boutique en ligne — Formule Illimité 99€</p>
            <h2
              className="mt-1 text-2xl font-bold"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              🛒 Vendez vos produits directement depuis votre site club
            </h2>
            <p className="mt-2 text-sm text-white/70">
              Les commandes sont livrées ou retirées au club. Paiement via Stripe sur votre compte.
            </p>
          </div>
          <div className="shrink-0 rounded-xl bg-white/10 p-4 text-center">
            <p className="text-xs text-white/60">CA boutique du mois</p>
            <p
              className="text-3xl font-bold text-[#C9A84C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              387€
            </p>
          </div>
        </div>
      </div>

      {/* Add product modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3
                className="text-xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ajouter un produit
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-[#0D1F3C]/40 hover:text-[#0D1F3C]"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {[
                { label: "Nom du produit", type: "text" },
                { label: "Prix (€)", type: "number" },
                { label: "Stock disponible", type: "number" },
                { label: "Description", type: "textarea" },
              ].map((f) => (
                <div key={f.label}>
                  <label className="mb-1 block text-xs font-medium text-[#0D1F3C]/60">
                    {f.label}
                  </label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:outline-none"
                    />
                  ) : (
                    <input
                      type={f.type}
                      className="w-full rounded-lg border border-[#0D1F3C]/20 px-3 py-2 text-sm focus:outline-none"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 rounded-full border border-[#0D1F3C]/20 py-2.5 text-sm text-[#0D1F3C]"
              >
                Annuler
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 rounded-full bg-[#C9A84C] py-2.5 text-sm font-semibold text-[#0D1F3C]"
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mb-4 flex items-center justify-between">
        <h2
          className="text-lg font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Produits en vente
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="rounded-full bg-[#0D1F3C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#152e55]"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {adminBoutiqueProducts.map((product) => (
          <div
            key={product.nom}
            className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#F8F6F1] text-2xl">
                {product.nom.includes("Maillot")
                  ? "👕"
                  : product.nom.includes("Cuissard")
                    ? "🩳"
                    : product.nom.includes("Casquette")
                      ? "🧢"
                      : "🥤"}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-[#0D1F3C]">{product.nom}</h3>
                <p className="text-lg font-bold text-[#0D1F3C]">{product.prix}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-[#F8F6F1] p-3 text-center">
                <p className="text-xs text-[#0D1F3C]/50">Stock restant</p>
                <p
                  className={`text-xl font-bold ${product.stock < 10 ? "text-amber-600" : "text-[#0D1F3C]"}`}
                >
                  {product.stock}
                </p>
              </div>
              <div className="rounded-lg bg-[#F8F6F1] p-3 text-center">
                <p className="text-xs text-[#0D1F3C]/50">Vendus</p>
                <p className="text-xl font-bold text-green-700">{product.vendus}</p>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="flex-1 rounded-lg border border-[#0D1F3C]/15 py-2 text-xs font-medium text-[#0D1F3C] hover:bg-[#0D1F3C]/5">
                Modifier
              </button>
              <button className="flex-1 rounded-lg border border-red-200 py-2 text-xs font-medium text-red-600 hover:bg-red-50">
                Retirer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
