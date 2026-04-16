// USM Triathlon — Club fictif pour la démo DashClub

export type UsmEvent = {
  slug: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  location: string;
  capacity: number;
  registered: number;
  remaining: number;
  waitingList: number;
  price: string;
  priceMember: string;
  status: "Inscriptions ouvertes" | "Complet" | "Bientôt";
  cta: string;
  description: string;
  teaser: string;
  imageSrc: string;
  imageAlt: string;
  distances: Record<string, string>;
  tarifs: Array<{ categorie: string; prix: string }>;
  highlights: string[];
  schedule: string[];
  reglement: string[];
};

export const usmClub = {
  name: "Union Sportive de Mézy",
  shortName: "USM Triathlon",
  sport: "Triathlon / Multisport",
  city: "Mézy-sur-Seine",
  founded: "1998",
  tagline: "Club de triathlon à Mézy-sur-Seine depuis 1998",
  contactEmail: "hello@usm-triathlon.fr",
  phone: "01 34 77 XX XX",
  address: "Base Nautique de Mézy-sur-Seine, 78250 Mézy-sur-Seine",
  website: "usm-triathlon.dashclub.app",
};

export const usmEvents: UsmEvent[] = [
  {
    slug: "triathlon-mezy",
    title: "Triathlon de Mézy — Sprint",
    dateLabel: "14 juin 2025",
    isoDate: "2025-06-14",
    location: "Plan d'eau de Mézy-sur-Seine (78)",
    capacity: 120,
    registered: 87,
    remaining: 33,
    waitingList: 0,
    price: "35€",
    priceMember: "28€",
    status: "Inscriptions ouvertes" as const,
    cta: "M'inscrire",
    description:
      "Le grand rendez-vous annuel de l'USM — 750m de natation, 20km vélo, 5km course à pied. Parcours technique longeant la Seine, ambiance conviviale, village finishers.",
    teaser:
      "750m natation · 20km vélo · 5km course. Parcours longeant la Seine, ambiance conviviale, village finishers.",
    imageSrc: "/demo/events/triathlon-mezy.jpg",
    imageAlt:
      "Départ natation d'un triathlon en eau libre avec plusieurs athlètes en pleine course.",
    distances: { natation: "750m", velo: "20km", cap: "5km" },
    tarifs: [
      { categorie: "Non-membre", prix: "35€" },
      { categorie: "Membre USM", prix: "28€" },
      { categorie: "Jeune -23 ans", prix: "22€" },
    ],
    highlights: [
      "Retrait des dossards possible la veille (13/06) et le matin de l'épreuve",
      "Parcours vélo sécurisé avec signaleurs et bénévoles du club",
      "Village partenaires, ravitaillement complet et espace finishers",
      "Douches et vestiaires disponibles sur site",
    ],
    schedule: [
      "07:00 — Ouverture du parc à vélos",
      "08:30 — Briefing athlètes obligatoire",
      "09:00 — Départ format Sprint",
      "11:30 — Remise des prix",
      "12:00 — Barbecue club",
    ],
    reglement: [
      "Licence FFTri ou certificat médical obligatoire",
      "Casque homologué obligatoire (contrôle au départ)",
      "Combinaison néoprène autorisée si eau < 22°C",
      "Assistance extérieure interdite",
    ],
  },
  {
    slug: "duathlon-printanier",
    title: "Duathlon Printanier USM",
    dateLabel: "3 mai 2025",
    isoDate: "2025-05-03",
    location: "Parc des Sports de Mantes-la-Jolie (78)",
    capacity: 80,
    registered: 80,
    remaining: 0,
    waitingList: 12,
    price: "25€",
    priceMember: "25€",
    status: "Complet" as const,
    cta: "Rejoindre la liste d'attente",
    description:
      "Course d'ouverture de saison — 5km course / 20km vélo / 2,5km course. Format accessible, idéal pour les premières compétitions.",
    teaser:
      "5km course · 20km vélo · 2,5km course. Format accessible, parfait pour lancer la saison.",
    imageSrc: "/demo/events/duathlon-printanier.jpg",
    imageAlt:
      "Deux cyclistes lancés sur une portion rapide de course sur route, ambiance compétition.",
    distances: { course1: "5km", velo: "20km", course2: "2,5km" },
    tarifs: [{ categorie: "Tous", prix: "25€" }],
    highlights: [],
    schedule: [],
    reglement: [],
  },
  {
    slug: "stage-la-baule",
    title: "Stage d'été La Baule",
    dateLabel: "12-19 juillet 2025",
    isoDate: "2025-07-12",
    location: "La Baule (44)",
    capacity: 24,
    registered: 9,
    remaining: 15,
    waitingList: 0,
    price: "480€",
    priceMember: "480€",
    status: "Inscriptions ouvertes" as const,
    cta: "Réserver ma place",
    description:
      "Une semaine de stage intensif à La Baule — entraînements matin et soir, logement en résidence sportive, encadrement par les coachs du club.",
    teaser:
      "7 jours · hébergement inclus · entraînements matin & soir. Encadrement par les coachs USM.",
    imageSrc: "/demo/events/stage-la-baule.jpg",
    imageAlt:
      "Groupe de triathlètes en combinaison courant sur une plage, ambiance mer et stage estival.",
    distances: {},
    tarifs: [{ categorie: "Membre USM", prix: "480€ (hébergement inclus)" }],
    highlights: [],
    schedule: [],
    reglement: [],
  },
];

export const usmNews = [
  {
    title: "Résultats du Triathlon des Yvelines — 3 podiums pour l'USM",
    date: "8 avril 2025",
    description:
      "Sophie Martin monte sur la 2e marche du podium en catégorie F30-34, Pierre Dubois termine 3e en M40-44. Bravo à tous les finishers USM !",
  },
  {
    title: "Nouveau créneau natation à la piscine de Mantes",
    date: "1 avril 2025",
    description:
      "Le club ouvre un nouveau créneau le mercredi soir de 20h à 21h30 à la piscine Éole de Mantes-la-Jolie. Places limitées à 16 nageurs.",
  },
];

export const usmPartners = [
  {
    name: "Sport 2000 Mantes",
    initials: "S2",
    color: "#E63946",
    description: "Partenaire matériel — remise de 15% sur présentation de la licence USM.",
  },
  {
    name: "Banque Populaire Val de France",
    initials: "BP",
    color: "#003DA5",
    description: "Partenaire financier du club depuis 2019.",
  },
  {
    name: "Cabinet Dr. Moreau",
    initials: "CM",
    color: "#2D9D56",
    description: "Suivi médical et certificats sportifs — tarifs préférentiels pour les membres.",
  },
  {
    name: "Vélo Passion 78",
    initials: "VP",
    color: "#C9A84C",
    description: "Atelier vélo partenaire — révision complète à tarif club.",
  },
];

export const usmMembershipOptions = [
  {
    id: "adulte",
    name: "Licence Adulte",
    price: "120€/an",
    description:
      "Pour les + 23 ans. Inclut assurance FFTri, accès à tous les entraînements et tarifs membres sur les événements club.",
    features: [
      "Assurance compétition FFTri incluse",
      "Accès illimité aux entraînements",
      "Tarifs préférentiels événements USM",
      "Accès à l'espace membre en ligne",
    ],
  },
  {
    id: "jeune",
    name: "Licence Jeune",
    price: "60€/an",
    description:
      "Pour les - 23 ans. Mêmes avantages que la licence adulte avec encadrement spécifique jeunes.",
    features: [
      "Assurance compétition FFTri incluse",
      "Encadrement spécifique jeunes",
      "Accès aux entraînements",
      "Tarifs préférentiels événements",
    ],
  },
  {
    id: "decouverte",
    name: "Licence Découverte",
    price: "45€/an",
    description:
      "Hors compétition. Idéale pour découvrir le triathlon et participer aux entraînements sans objectif de course.",
    features: [
      "Assurance loisir incluse",
      "Accès aux entraînements",
      "Événements hors compétition",
      "Parfait pour débuter",
    ],
  },
];

// Admin mock data
export const adminRecentRegistrations = [
  { nom: "Martin", prenom: "Sophie", evenement: "Triathlon Mézy Sprint", formule: "Adulte", montant: "35€", statut: "Payé", date: "12/04/2025" },
  { nom: "Dubois", prenom: "Pierre", evenement: "Triathlon Mézy Sprint", formule: "Membre", montant: "28€", statut: "Payé", date: "11/04/2025" },
  { nom: "Leroy", prenom: "Emma", evenement: "Stage La Baule", formule: "Standard", montant: "480€", statut: "Payé", date: "11/04/2025" },
  { nom: "Bernard", prenom: "Lucas", evenement: "Triathlon Mézy Sprint", formule: "Jeune", montant: "22€", statut: "En attente", date: "10/04/2025" },
  { nom: "Petit", prenom: "Marie", evenement: "Duathlon Printanier", formule: "Standard", montant: "25€", statut: "Payé", date: "09/04/2025" },
  { nom: "Simon", prenom: "Julien", evenement: "Triathlon Mézy Sprint", formule: "Adulte", montant: "35€", statut: "Payé", date: "08/04/2025" },
  { nom: "Laurent", prenom: "Chloé", evenement: "Stage La Baule", formule: "Standard", montant: "480€", statut: "Payé", date: "07/04/2025" },
  { nom: "Moreau", prenom: "Thomas", evenement: "Triathlon Mézy Sprint", formule: "Adulte", montant: "35€", statut: "Payé", date: "06/04/2025" },
];

export const adminAdherents = [
  { nom: "Martin", prenom: "Sophie", email: "sophie.martin@email.fr", licence: "Adulte", expire: "31/08/2025", statut: "Actif" },
  { nom: "Dubois", prenom: "Pierre", email: "p.dubois@gmail.com", licence: "Adulte", expire: "31/08/2025", statut: "Actif" },
  { nom: "Leroy", prenom: "Emma", email: "emma.leroy@email.fr", licence: "Jeune", expire: "31/08/2025", statut: "Actif" },
  { nom: "Bernard", prenom: "Lucas", email: "lucas.b@email.fr", licence: "Jeune", expire: "30/04/2025", statut: "Renouvellement" },
  { nom: "Petit", prenom: "Marie", email: "m.petit@email.fr", licence: "Adulte", expire: "30/04/2025", statut: "Renouvellement" },
  { nom: "Simon", prenom: "Julien", email: "j.simon@email.fr", licence: "Adulte", expire: "31/08/2025", statut: "Actif" },
  { nom: "Laurent", prenom: "Chloé", email: "c.laurent@email.fr", licence: "Découverte", expire: "31/08/2025", statut: "Actif" },
  { nom: "Moreau", prenom: "Thomas", email: "t.moreau@email.fr", licence: "Adulte", expire: "30/04/2025", statut: "Renouvellement" },
  { nom: "Fontaine", prenom: "Claire", email: "c.fontaine@email.fr", licence: "Adulte", expire: "31/08/2025", statut: "Actif" },
  { nom: "Garnier", prenom: "Antoine", email: "a.garnier@email.fr", licence: "Jeune", expire: "28/02/2025", statut: "Expiré" },
];

export const adminPayments = [
  { nom: "Martin Sophie", objet: "Triathlon Mézy Sprint", montant: "35€", methode: "Carte", statut: "Payé", date: "12/04/2025" },
  { nom: "Dubois Pierre", objet: "Triathlon Mézy Sprint", montant: "28€", methode: "Carte", statut: "Payé", date: "11/04/2025" },
  { nom: "Leroy Emma", objet: "Stage La Baule", montant: "480€", methode: "Carte", statut: "Payé", date: "11/04/2025" },
  { nom: "Bernard Lucas", objet: "Triathlon Mézy Sprint", montant: "22€", methode: "Virement", statut: "En attente", date: "10/04/2025" },
  { nom: "Petit Marie", objet: "Duathlon Printanier", montant: "25€", methode: "Carte", statut: "Payé", date: "09/04/2025" },
  { nom: "Simon Julien", objet: "Triathlon Mézy Sprint", montant: "35€", methode: "Carte", statut: "Payé", date: "08/04/2025" },
  { nom: "Laurent Chloé", objet: "Stage La Baule", montant: "480€", methode: "Carte", statut: "Payé", date: "07/04/2025" },
  { nom: "Moreau Thomas", objet: "Triathlon Mézy Sprint", montant: "35€", methode: "Carte", statut: "Payé", date: "06/04/2025" },
  { nom: "Fontaine Claire", objet: "Licence Adulte 2025", montant: "120€", methode: "Carte", statut: "Payé", date: "05/04/2025" },
  { nom: "Garnier Antoine", objet: "Licence Jeune 2025", montant: "60€", methode: "Carte", statut: "Payé", date: "04/04/2025" },
  { nom: "Richard Paul", objet: "Triathlon Mézy Sprint", montant: "35€", methode: "Carte", statut: "Payé", date: "03/04/2025" },
  { nom: "Blanc Isabelle", objet: "Licence Adulte 2025", montant: "120€", methode: "Virement", statut: "En attente", date: "02/04/2025" },
  { nom: "Girard Marc", objet: "Stage La Baule", montant: "480€", methode: "Carte", statut: "Payé", date: "01/04/2025" },
  { nom: "Rousseau Julie", objet: "Triathlon Mézy Sprint", montant: "22€", methode: "Carte", statut: "Payé", date: "31/03/2025" },
  { nom: "Morin Nicolas", objet: "Licence Découverte 2025", montant: "45€", methode: "Virement", statut: "En attente", date: "30/03/2025" },
];

export const adminBoutiqueProducts = [
  { nom: "Maillot USM Triathlon", prix: "45€", stock: 23, vendus: 12 },
  { nom: "Cuissard USM", prix: "65€", stock: 8, vendus: 6 },
  { nom: "Casquette USM", prix: "18€", stock: 47, vendus: 31 },
  { nom: "Gourde USM 750ml", prix: "12€", stock: 15, vendus: 44 },
];

export const adminEmailHistory = [
  { destinataire: "sophie.martin@email.fr", objet: "Confirmation inscription — Triathlon Mézy Sprint", sequence: "Confirmation", statut: "Ouvert", date: "12/04" },
  { destinataire: "p.dubois@gmail.com", objet: "Votre dossard #042 — Triathlon Mézy Sprint", sequence: "Confirmation", statut: "Lu", date: "11/04" },
  { destinataire: "emma.leroy@email.fr", objet: "Confirmation réservation — Stage La Baule", sequence: "Confirmation", statut: "Ouvert", date: "11/04" },
  { destinataire: "m.petit@email.fr", objet: "Rappel — Duathlon Printanier dans 7 jours", sequence: "Rappel J-7", statut: "Non ouvert", date: "26/04" },
  { destinataire: "j.simon@email.fr", objet: "Merci d'avoir participé — Triathlon Mézy Sprint", sequence: "Débrief J+1", statut: "Ouvert", date: "08/04" },
  { destinataire: "c.fontaine@email.fr", objet: "Bienvenue à l'USM Triathlon !", sequence: "Confirmation adhésion", statut: "Lu", date: "05/04" },
  { destinataire: "lucas.b@email.fr", objet: "Votre licence expire dans 30 jours", sequence: "Relance renouvellement J-30", statut: "Ouvert", date: "01/04" },
  { destinataire: "a.garnier@email.fr", objet: "Prochain événement — Triathlon de Mézy", sequence: "Teaser J+7", statut: "Ouvert", date: "30/03" },
  { destinataire: "m.petit@email.fr", objet: "Votre licence expire dans 30 jours", sequence: "Relance renouvellement J-30", statut: "Non ouvert", date: "01/04" },
  { destinataire: "t.moreau@email.fr", objet: "Enquête de satisfaction — Triathlon Mézy", sequence: "Satisfaction J+3", statut: "Lu", date: "09/04" },
];
