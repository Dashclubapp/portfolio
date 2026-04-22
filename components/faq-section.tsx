'use client';

import { useState } from 'react';

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

const FAQ_ITEMS = [
  {
    q: "Quelle commission prend DashClub sur mes inscriptions ?",
    a: "Zéro. DashClub ne prend aucune commission. Seuls les frais Stripe standard s'appliquent (2,9% + 0,30€ par transaction).",
  },
  {
    q: "Puis-je annuler à tout moment ?",
    a: "Oui, sans frais ni préavis. L'abonnement est mensuel.",
  },
  {
    q: "Combien de temps pour avoir mon site en ligne ?",
    a: "Comptez 5 jours ouvrés entre la commande et la mise en ligne.",
  },
  {
    q: "Les paiements d'inscription sont-ils gérés ?",
    a: "Oui, les inscriptions en ligne avec paiement sont incluses dans toutes les formules.",
  },
  {
    q: "Est-ce que je peux modifier le contenu moi-même ?",
    a: "Oui, via un backoffice simple, sans aucune compétence technique.",
  },
  {
    q: "Le domaine est-il inclus ?",
    a: "Tout dépend de votre situation. Vous avez déjà un domaine : nous le connectons gratuitement à votre site, quelle que soit la formule. Vous n'avez pas encore de domaine : soit vous le gérez vous-même (10-15€/an chez un registrar comme OVH ou Gandi), soit nous le gérons pour vous (20€/an tout compris, inclus dans la formule Illimité).",
  },
  {
    q: "C'est quoi \"configurer les DNS\" ?",
    a: "Les DNS relient votre domaine à votre site. Si vous gérez votre domaine vous-même, il faut créer 2-3 enregistrements chez votre registrar — opération simple de 10 minutes, avec les valeurs exactes à copier-coller que nous fournissons. Sinon, optez pour la gestion déléguée (+20€/an, ou inclus en formule Illimité).",
  },
  {
    q: "DashClub fonctionne-t-il pour tous les sports ?",
    a: "Oui. DashClub s'adresse à tous les clubs sportifs : course à pied, trail, vélo, natation, triathlon et bien d'autres. La plateforme est conçue pour s'adapter à n'importe quel type de club et de calendrier de saison.",
  },
  {
    q: "Comment fonctionne le support ?",
    a: "Le support est assuré par email avec une réponse sous 48h ouvrées.",
  },
];

const INITIAL_COUNT = 4;

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group rounded-[1.5rem] border border-stone-900/10 bg-white/82 px-6 shadow-[0_4px_20px_rgba(41,37,36,0.04)] open:pb-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-base font-medium text-stone-950 [&::-webkit-details-marker]:hidden">
        <span>{q}</span>
        <span className="shrink-0 rounded-full border border-stone-900/10 p-1 text-stone-500 transition-transform group-open:rotate-45">
          <PlusIcon />
        </span>
      </summary>
      <p className="pb-1 text-sm leading-7 text-stone-600">{a}</p>
    </details>
  );
}

export function FaqSection() {
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? FAQ_ITEMS : FAQ_ITEMS.slice(0, INITIAL_COUNT);
  const hidden = FAQ_ITEMS.slice(INITIAL_COUNT);

  return (
    <div className="mt-8">
      <div className="grid gap-3 sm:grid-cols-2">
        {visible.map((item) => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>

      {!expanded && hidden.length > 0 && (
        <div className="mt-5 text-center">
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border border-stone-900/10 bg-white px-5 py-2.5 text-sm font-medium text-stone-700 shadow-[0_2px_8px_rgba(41,37,36,0.06)] transition hover:border-stone-900/20 hover:shadow-[0_4px_12px_rgba(41,37,36,0.10)]"
          >
            Voir les {hidden.length} autres questions
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
