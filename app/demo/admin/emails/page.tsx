"use client";

import { useState } from "react";
import { adminEmailHistory } from "../../usm-data";

type EmailSequence = {
  label: string;
  timing: string;
  active: boolean;
  preview: string;
};

const eventSequences: EmailSequence[] = [
  {
    label: "Confirmation inscription",
    timing: "Immédiat",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nVotre inscription au Triathlon de Mézy — Sprint est confirmée !\n\n🏁 Votre dossard : #{{dossard}}\n📅 Date : 14 juin 2025\n📍 Lieu : Plan d'eau de Mézy-sur-Seine\n\nRDV le 14 juin pour récupérer votre dossard dès 07h00.\n\nBonne préparation !\nL'équipe USM Triathlon",
  },
  {
    label: "Rappel J-7",
    timing: "7 jours avant",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nPlus que 7 jours avant le Triathlon de Mézy !\n\n🔧 Pensez à vérifier votre vélo\n🏊 Derniers entraînements natation conseillés\n📋 Rappel règlement joint\n\nÀ samedi !\nUSM Triathlon",
  },
  {
    label: "Rappel J-1",
    timing: "Veille de l'événement",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nC'est demain ! Dernier rappel avant le Triathlon de Mézy.\n\n⏰ Ouverture transition : 07h00\n📍 Accès vélo via chemin nord\n🎒 Check-list gear joint\n\nBonne nuit récupératrice !\nUSM Triathlon",
  },
  {
    label: "Débrief post-événement",
    timing: "J+1",
    active: true,
    preview:
      "Bravo {{prénom}} pour votre participation au Triathlon de Mézy !\n\n🏅 Votre temps : {{temps}}\n🏆 Classement : {{classement}}\n\nRetrouvez les résultats complets sur notre site.\n\nÀ bientôt sur les parcours !\nUSM Triathlon",
  },
  {
    label: "Formulaire satisfaction",
    timing: "J+3",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nComment s'est passé votre Triathlon de Mézy ?\n\nPartagez votre expérience en 2 minutes → [Formulaire]\n\nVos retours nous aident à améliorer chaque édition.\n\nMerci !\nUSM Triathlon",
  },
  {
    label: "Teaser prochain événement",
    timing: "J+7",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nVous avez adoré le Triathlon de Mézy ? Le prochain événement approche !\n\n🗓️ Stage d'été La Baule — 12-19 juillet 2025\n15 places restantes · 480€ hébergement inclus\n\n[Réserver ma place] →\n\nUSM Triathlon",
  },
];

const adhesionSequences: EmailSequence[] = [
  {
    label: "Confirmation adhésion",
    timing: "Immédiat",
    active: true,
    preview:
      "Bienvenue à l'USM Triathlon, {{prénom}} !\n\nVotre adhésion est confirmée.\n\n🎽 Licence : {{type_licence}}\n🔢 N° licence FFTri : {{numero}}\n📅 Valable jusqu'au : 31/08/2025\n\nVotre espace membre est disponible sur usm-triathlon.dashclub.app\n\nÀ bientôt sur les parcours !\nUSM Triathlon",
  },
  {
    label: "Relance renouvellement J-30",
    timing: "30 jours avant expiration",
    active: true,
    preview:
      "Bonjour {{prénom}},\n\nVotre licence USM Triathlon expire dans 30 jours ({{date_expiration}}).\n\nRenouveler maintenant → [Lien adhésion]\n\nTarifs inchangés · Renouvellement en 2 minutes\n\nUSM Triathlon",
  },
  {
    label: "Relance renouvellement J-7",
    timing: "7 jours avant expiration",
    active: true,
    preview:
      "⚠️ Bonjour {{prénom}},\n\nVotre licence expire dans 7 jours !\n\nSans renouvellement, vous ne pourrez plus participer aux entraînements ni aux événements club.\n\nRenouveler maintenant → [Lien adhésion]\n\nUSM Triathlon",
  },
  {
    label: "Relance renouvellement J+1",
    timing: "Lendemain de l'expiration",
    active: false,
    preview:
      "Bonjour {{prénom}},\n\nVotre licence a expiré hier. Revenez nous rejoindre !\n\n[Renouveler ma licence] →\n\nUSM Triathlon",
  },
];

export default function AdminEmailsPage() {
  const [sequences, setSequences] = useState(eventSequences);
  const [adhesionSeqs, setAdhesionSeqs] = useState(adhesionSequences);
  const [previewModal, setPreviewModal] = useState<EmailSequence | null>(null);

  function toggleSequence(index: number, type: "event" | "adhesion") {
    if (type === "event") {
      setSequences((prev) =>
        prev.map((s, i) => (i === index ? { ...s, active: !s.active } : s))
      );
    } else {
      setAdhesionSeqs((prev) =>
        prev.map((s, i) => (i === index ? { ...s, active: !s.active } : s))
      );
    }
  }

  return (
    <div>
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#0D1F3C]/10 px-6 py-4">
              <div>
                <p className="text-xs font-medium text-[#C9A84C]">{previewModal.timing}</p>
                <h3
                  className="text-lg font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {previewModal.label}
                </h3>
              </div>
              <button
                onClick={() => setPreviewModal(null)}
                className="text-[#0D1F3C]/40 hover:text-[#0D1F3C]"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="rounded-xl border border-[#0D1F3C]/10 bg-[#F8F6F1] p-5">
                <p className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-[#0D1F3C]/80">
                  {previewModal.preview}
                </p>
              </div>
              <p className="mt-3 text-xs text-[#0D1F3C]/40">
                Les variables entre {"{{"}accolades{"}}"}  sont remplacées automatiquement.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Emails automatiques
        </h1>
        <p className="text-sm text-[#0D1F3C]/50">
          Configurez les séquences d&apos;emails envoyées automatiquement.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Event sequences */}
        <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm">
          <h2
            className="mb-4 text-lg font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            📅 Séquences événement
          </h2>
          <div className="space-y-3">
            {sequences.map((seq, i) => (
              <div
                key={seq.label}
                className="flex items-center gap-3 rounded-xl border border-[#0D1F3C]/10 p-3"
              >
                <button
                  onClick={() => toggleSequence(i, "event")}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                    seq.active ? "bg-green-500" : "bg-[#0D1F3C]/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      seq.active ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0D1F3C] truncate">{seq.label}</p>
                  <p className="text-xs text-[#0D1F3C]/50">{seq.timing}</p>
                </div>
                <button
                  onClick={() => setPreviewModal(seq)}
                  className="shrink-0 rounded-lg border border-[#0D1F3C]/10 px-2.5 py-1 text-xs font-medium text-[#0D1F3C]/60 hover:text-[#0D1F3C]"
                >
                  Aperçu
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Adhesion sequences */}
        <div className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm">
          <h2
            className="mb-4 text-lg font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            🎽 Séquences adhésion
          </h2>
          <div className="space-y-3">
            {adhesionSeqs.map((seq, i) => (
              <div
                key={seq.label}
                className="flex items-center gap-3 rounded-xl border border-[#0D1F3C]/10 p-3"
              >
                <button
                  onClick={() => toggleSequence(i, "adhesion")}
                  className={`relative h-5 w-9 shrink-0 rounded-full transition ${
                    seq.active ? "bg-green-500" : "bg-[#0D1F3C]/20"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      seq.active ? "translate-x-4" : "translate-x-0.5"
                    }`}
                  />
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#0D1F3C] truncate">{seq.label}</p>
                  <p className="text-xs text-[#0D1F3C]/50">{seq.timing}</p>
                </div>
                <button
                  onClick={() => setPreviewModal(seq)}
                  className="shrink-0 rounded-lg border border-[#0D1F3C]/10 px-2.5 py-1 text-xs font-medium text-[#0D1F3C]/60 hover:text-[#0D1F3C]"
                >
                  Aperçu
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email history */}
      <div className="mt-6 rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm">
        <div className="border-b border-[#0D1F3C]/10 px-6 py-4">
          <h2
            className="font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Historique des envois
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#0D1F3C]/5 bg-[#F8F6F1] text-left text-xs font-medium uppercase tracking-wider text-[#0D1F3C]/40">
                <th className="px-6 py-3">Destinataire</th>
                <th className="px-4 py-3">Objet</th>
                <th className="px-4 py-3">Séquence</th>
                <th className="px-4 py-3">Statut</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0D1F3C]/5">
              {adminEmailHistory.map((email, i) => (
                <tr key={i} className="hover:bg-[#F8F6F1]/50">
                  <td className="px-6 py-3 font-medium text-[#0D1F3C]">{email.destinataire}</td>
                  <td className="max-w-xs px-4 py-3 truncate text-[#0D1F3C]/70">{email.objet}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-[#0D1F3C]/5 px-2 py-0.5 text-xs text-[#0D1F3C]/70">
                      {email.sequence}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        email.statut === "Ouvert" || email.statut === "Lu"
                          ? "bg-green-50 text-green-700"
                          : "bg-[#0D1F3C]/5 text-[#0D1F3C]/50"
                      }`}
                    >
                      {email.statut === "Ouvert" ? "✅" : email.statut === "Lu" ? "✅" : "📧"}{" "}
                      {email.statut}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#0D1F3C]/50">{email.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
