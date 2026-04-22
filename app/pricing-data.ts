export const contactEmail = "hello@dashclub.fr";
export const contactHref = `mailto:${contactEmail}?subject=Créer%20mon%20site%20de%20club`;
export const stripePaymentLink = "https://buy.stripe.com/4gMcN6fpWdThayS2SneOK42";

export type Plan = {
  id: "essentiel" | "saison" | "illimite";
  name: string;
  price: string;
  period: string;
  billingProductId: string;
  checkoutHref: string;
  landingHook: string;
  landingBullets: string[];
  landingCta: string;
  description: string;
  detailedBullets: string[];
  detailCta: string;
  featured?: boolean;
  badge?: string;
};

export function hasNavyPricingCard(planId: Plan["id"]) {
  return planId === "essentiel" || planId === "illimite";
}

export const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: "19€",
    period: "/mois TTC",
    billingProductId: "03f2b3b2-b6d7-4d62-bd8a-d1790110e454",
    checkoutHref: "/register?formule=essentiel",
    landingHook: "Pour démarrer proprement.",
    landingBullets: [
      "Paiement en ligne via Stripe",
      "Site du club créé et hébergé",
      "Connexion de votre domaine (ou géré par DashClub : +20€/an)",
      "1ère épreuve organisée sans supplément",
    ],
    landingCta: "Démarrer",
    description:
      "Le point de départ idéal pour mettre le club en ligne et lancer son premier événement sans effort.",
    detailedBullets: [
      "Site du club créé sur mesure",
      "Hébergement inclus",
      "Base éditoriale structurée",
      "1er événement organisé dans l'abonnement",
      "Page événement avec infos pratiques",
      "Zéro commission sur les inscriptions",
    ],
    detailCta: "Démarrer avec Essentiel",
  },
  {
    id: "saison",
    name: "Compétition",
    price: "49€",
    period: "/mois TTC",
    billingProductId: "d72faa87-48a1-40a3-b715-28fdb2e20c4f",
    checkoutHref: "/register?formule=competition",
    landingHook: "Pour les clubs avec un calendrier.",
    landingBullets: [
      "Tout Essentiel, plus :",
      "Connexion de votre domaine (ou domaine géré par DashClub : +20€/an)",
      "Jusqu'à 3 événements par saison",
      "File d'attente automatique",
      "Remboursement en 1 clic",
      "Emails automatiques aux inscrits (J-7, J-1, débrief...)",
    ],
    landingCta: "Choisir Compétition",
    description:
      "La formule pour les clubs qui organisent plusieurs rendez-vous dans la saison et veulent que tout tourne seul.",
    detailedBullets: [
      "Tout ce qui est inclus dans Essentiel",
      "Jusqu'à 3 événements par saison",
      "Ouverture des inscriptions programmée",
      "File d'attente virtuelle à l'ouverture",
      "Gestion automatique de la liste d'attente",
      "Confirmation d'inscription automatique avec dossard",
      "Email de préparation J-7",
      "Email de rappel J-1",
      "Email de débrief post-événement",
      "Formulaire de satisfaction automatique J+3",
      "Email de teaser prochain événement J+7",
      "Tableau de bord : inscrits en temps réel, taux d'ouverture, retours",
      "Pages événement réutilisables",
      "Remboursement en 1 clic",
      "Zéro commission sur les inscriptions",
    ],
    detailCta: "Choisir Compétition",
    featured: true,
    badge: "Recommandé",
  },
  {
    id: "illimite",
    name: "Illimité",
    price: "99€",
    period: "/mois TTC",
    billingProductId: "fe8af9b6-81ae-4c54-9578-55a77f9ff2cd",
    checkoutHref: "/register?formule=illimite",
    landingHook: "Pour les clubs qui veulent tout automatiser.",
    landingBullets: [
      "Tout Compétition, plus :",
      "Domaine .fr géré par DashClub inclus (valeur 20€/an)",
      "Épreuves illimitées",
      "Gestion des adhérents et licences",
      "Bilan de saison exportable en PDF",
      "Boutique en ligne",
    ],
    landingCta: "Choisir Illimité",
    description:
      "Pour les clubs qui veulent piloter tout leur club depuis un seul outil, sans limite d'épreuves ni de membres.",
    detailedBullets: [
      "Tout ce qui est inclus dans Compétition",
      "Événements illimités sur la saison",
      "Paiement en ligne intégré via Stripe",
      "Tarifs différenciés automatiques (membre / non-membre / licencié / -18 ans)",
      "Codes promo pour bénévoles et partenaires",
      "Remboursement automatique selon conditions définies",
      "Export comptable mensuel pour le trésorier",
      "Formulaire d'adhésion en ligne avec paiement Stripe",
      "Gestion des licences et renouvellements automatiques",
      "Relances automatiques d'adhésion avant expiration",
      "Tarif membre appliqué automatiquement aux licenciés",
      "Export adhérents pour dépôt fédéral",
      "Newsletter de saison vers toute la base membres",
      "Page partenaires et sponsors avec rapport annuel automatique",
      "Bilan de saison généré automatiquement en PDF",
      "Accès aux nouvelles fonctionnalités en avant-première",
      "Boutique en ligne — vendez maillots, équipements, goodies et inscriptions à des stages",
      "Zéro commission sur les inscriptions",
    ],
    detailCta: "Choisir Illimité",
  },
];

export const featuredPlanCheckoutHref =
  plans.find((plan) => plan.featured)?.checkoutHref ?? "/register";

export type ComparisonValue = boolean | string;

export type ComparisonRow = {
  feature: string;
  values: [ComparisonValue, ComparisonValue, ComparisonValue];
};

export const comparisonRows: ComparisonRow[] = [
  {
    feature: "Site du club créé et hébergé",
    values: [true, true, true],
  },
  {
    feature: "Connexion domaine personnalisé",
    values: [true, true, true],
  },
  {
    feature: "Paiement en ligne Stripe",
    values: [true, true, true],
  },
  {
    feature: "Nombre d'événements par saison",
    values: ["1", "3", "Illimité"],
  },
  {
    feature: "Gestion domaine par DashClub",
    values: ["+20€/an", "+20€/an", "Inclus"],
  },
  {
    feature: "Pages événement réutilisables",
    values: [false, true, true],
  },
  {
    feature: "Ouverture des inscriptions programmée",
    values: [false, true, true],
  },
  {
    feature: "File d'attente virtuelle",
    values: [false, true, true],
  },
  {
    feature: "Gestion liste d'attente automatique",
    values: [false, true, true],
  },
  {
    feature: "Emails automatiques aux inscrits (J-7, J-1)",
    values: [false, true, true],
  },
  {
    feature: "Débrief post-événement automatique",
    values: [false, true, true],
  },
  {
    feature: "Formulaire de satisfaction J+3",
    values: [false, true, true],
  },
  {
    feature: "Tableau de bord temps réel",
    values: [false, true, true],
  },
  {
    feature: "Boutique en ligne",
    values: [false, false, true],
  },
  {
    feature: "Tarifs différenciés membres / non-membres",
    values: [false, false, true],
  },
  {
    feature: "Codes promo",
    values: [false, false, true],
  },
  {
    feature: "Remboursement automatique",
    values: [false, false, true],
  },
  {
    feature: "Export comptable mensuel",
    values: [false, false, true],
  },
  {
    feature: "Gestion des adhérents et licences",
    values: [false, false, true],
  },
  {
    feature: "Formulaire d'adhésion en ligne",
    values: [false, false, true],
  },
  {
    feature: "Relances renouvellement automatiques",
    values: [false, false, true],
  },
  {
    feature: "Newsletter de saison",
    values: [false, false, true],
  },
  {
    feature: "Page partenaires + rapport sponsors",
    values: [false, false, true],
  },
  {
    feature: "Bilan de saison PDF automatique",
    values: [false, false, true],
  },
  {
    feature: "Nouvelles fonctionnalités en avant-première",
    values: [false, false, true],
  },
  {
    feature: "Commission sur les dossards",
    values: ["Zéro", "Zéro", "Zéro"],
  },
];
