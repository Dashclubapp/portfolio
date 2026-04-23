"use client";

import { useState } from "react";

const COMPARISONS = [
  {
    id: "wordpress",
    title: "DashClub vs WordPress",
    points: [
      {
        dashclub: "Site créé et en ligne en 5 jours",
        competitor: "Installation + plugins : plusieurs semaines de configuration",
      },
      {
        dashclub: "Hébergement et sécurité inclus",
        competitor: "Hébergeur payant séparé + mises à jour plugins à gérer",
      },
      {
        dashclub: "Inscriptions et paiements intégrés nativement",
        competitor: "WooCommerce + extensions payantes, configuration complexe",
      },
      {
        dashclub: "0 % commission sur les dossards",
        competitor: "Frais de transaction ~1,5 % + 0,25 € par inscription",
      },
      {
        dashclub: "Back-office pensé pour les clubs sportifs",
        competitor: "Outil généraliste, aucune fonctionnalité sport",
      },
    ],
  },
  {
    id: "helloasso",
    title: "DashClub vs HelloAsso / Weezevent",
    points: [
      {
        dashclub: "Paiements Stripe directs sur votre compte bancaire",
        competitor: "Versements différés ou frais de retrait selon la plateforme",
      },
      {
        dashclub: "0 % commission (seuls les frais Stripe s'appliquent)",
        competitor: "Don volontaire suggéré (HelloAsso) ou commission ~1,5 % (Weezevent)",
      },
      {
        dashclub: "Site public + inscriptions dans un seul outil",
        competitor: "Page de billetterie uniquement, pas de site club",
      },
      {
        dashclub: "Votre branding, votre domaine personnalisé",
        competitor: "Page HelloAsso ou Weezevent à votre nom",
      },
      {
        dashclub: "Gestion des licences FFTRI intégrée",
        competitor: "Non disponible",
      },
    ],
  },
  {
    id: "google-forms",
    title: "DashClub vs Google Forms",
    points: [
      {
        dashclub: "Paiement Stripe sécurisé, confirmation instantanée",
        competitor: "Aucun paiement intégré — virement bancaire manuel à pointer",
      },
      {
        dashclub: "Capacité max et liste d'attente automatiques",
        competitor: "Aucune limite de places native",
      },
      {
        dashclub: "Données structurées, exports prêts à l'emploi",
        competitor: "Tableur brut à trier, nettoyer et corriger manuellement",
      },
      {
        dashclub: "Emails automatiques J-7, J-1, débrief, satisfaction",
        competitor: "Aucune automatisation — tout est manuel",
      },
      {
        dashclub: "RGPD : données hébergées en Europe, contrat clair",
        competitor: "Données chez Google, conformité RGPD à gérer soi-même",
      },
    ],
  },
];

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#22c55e" }} aria-hidden="true">
      <circle cx="10" cy="10" r="8.2" style={{ fill: "rgba(34,197,94,0.12)", stroke: "rgba(34,197,94,0.3)" }} />
      <path d="m6.5 10 2.2 2.3 4.8-5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#ef4444" }} aria-hidden="true">
      <circle cx="10" cy="10" r="8.2" style={{ fill: "rgba(239,68,68,0.1)", stroke: "rgba(239,68,68,0.25)" }} />
      <path d="m7 7 6 6M13 7l-6 6" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className="h-4 w-4 shrink-0 transition-transform duration-200"
      style={{ color: "#C9A84C", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
      aria-hidden="true"
    >
      <path d="m5 8 5 5 5-5" />
    </svg>
  );
}

export function CompareAccordionMobile() {
  const [openId, setOpenId] = useState<string | null>(COMPARISONS[0].id);

  return (
    <div className="space-y-3">
      {COMPARISONS.map((section) => {
        const isOpen = openId === section.id;
        return (
          <div
            key={section.id}
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(201,168,76,0.25)", backgroundColor: "#0D1F3C" }}
          >
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : section.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="text-sm font-bold" style={{ color: "#ffffff" }}>
                {section.title}
              </span>
              <ChevronIcon open={isOpen} />
            </button>

            {isOpen && (
              <div className="border-t px-5 pb-5 pt-4 space-y-4" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {section.points.map((point, i) => (
                  <div key={i} className="grid grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <CheckIcon />
                      <p className="text-xs leading-5" style={{ color: "rgba(255,255,255,0.88)" }}>
                        {point.dashclub}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CrossIcon />
                      <p className="text-xs leading-5" style={{ color: "rgba(255,255,255,0.45)" }}>
                        {point.competitor}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
