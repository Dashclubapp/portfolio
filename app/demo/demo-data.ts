export type DemoEvent = {
  slug: string;
  title: string;
  dateLabel: string;
  isoDate: string;
  location: string;
  address: string;
  price: string;
  status: "Inscriptions ouvertes" | "Complet" | "Bientot";
  capacity: number;
  registered: number;
  waitingList: number;
  format: string;
  description: string;
  teaser: string;
  highlights: string[];
  schedule: string[];
};

export const club = {
  name: "Club Athletique de Pontoise",
  shortName: "CAP Sport",
  city: "Pontoise",
  founded: "1998",
  tagline: "Le club qui fait bouger l'Oise, du premier dossard au format longue distance.",
  intro:
    "CAP Sport rassemble une communaute locale de sportifs, du jeune debutant au competiteur confirme, avec un calendrier vivant, un site clair et une organisation club simple a suivre.",
  contactEmail: "contact@cap-sport.demo",
  phone: "01 34 43 22 18",
  trainingBase: "Base de loisirs de Cergy-Pontoise",
};

export const demoEvents: DemoEvent[] = [
  {
    slug: "epreuve-de-pontoise",
    title: "Epreuve de Pontoise - 15 juin",
    dateLabel: "15 juin 2026",
    isoDate: "2026-06-15",
    location: "Base de loisirs de Cergy-Pontoise",
    address: "Rue des Etangs, 95000 Cergy",
    price: "45 EUR",
    status: "Inscriptions ouvertes",
    capacity: 150,
    registered: 128,
    waitingList: 3,
    format: "solo, relais et format decouverte",
    teaser:
      "Le grand rendez-vous du club avec un parcours accessible, une ambiance conviviale et une organisation fluide pour tous les niveaux.",
    description:
      "L'Epreuve de Pontoise est le rendez-vous signature du CAP. La page est pensee pour les licencies, les relais entreprise et les nouveaux pratiquants qui veulent vivre une premiere experience bien cadree.",
    highlights: [
      "Retrait des dossards possible la veille et le matin de l'epreuve",
      "Parcours velo securise avec benevoles et signaleurs du club",
      "Village partenaires, ravitaillement complet et espace finishers",
    ],
    schedule: [
      "07:00 - ouverture du parc a velos",
      "08:30 - briefing athlètes",
      "09:00 - depart format S",
      "11:45 - relais entreprises",
      "13:00 - remise des prix",
    ],
  },
  {
    slug: "duathlon-printemps",
    title: "Duathlon Printemps - 3 mai",
    dateLabel: "3 mai 2026",
    isoDate: "2026-05-03",
    location: "Stade Philippe Hemet",
    address: "2 avenue Marcel Perrin, 95300 Pontoise",
    price: "22 EUR",
    status: "Inscriptions ouvertes",
    capacity: 80,
    registered: 45,
    waitingList: 0,
    format: "XS et format jeunes",
    teaser:
      "Une course d'ouverture de saison accessible, ideale pour lancer les jeunes et les nouveaux adherents.",
    description:
      "Le Duathlon Printemps ouvre la saison club avec un format plus court et une logistique simple. C'est la porte d'entree parfaite pour les familles et pour les benevoles qui decouvrent l'organisation d'une epreuve.",
    highlights: [
      "Circuit compact autour du stade pour une lecture facile de la course",
      "Tarif doux pour encourager les premieres inscriptions",
      "Animations jeunes et accueil benevoles des 07:30",
    ],
    schedule: [
      "07:30 - accueil et confirmation des licences",
      "09:00 - courses jeunes",
      "10:30 - depart format XS",
      "12:15 - podiums et barbecue club",
    ],
  },
];

export const newsItems = [
  {
    title: "Stage natation eau libre en mai",
    date: "12 avril 2026",
    description:
      "Une matinee technique ouverte a tous les adherents pour preparer l'Epreuve de Pontoise.",
  },
  {
    title: "Nouveau textile club disponible",
    date: "8 avril 2026",
    description:
      "Les commandes de trifonctions et vestes coupe-vent sont ouvertes jusqu'au 25 avril.",
  },
  {
    title: "CAP Sport passe en mode DashClub",
    date: "2 avril 2026",
    description:
      "Le site, les evenements et les adhesions du club sont maintenant centralises sur un espace unique de demonstration.",
  },
];

export const partnerLogos = [
  {
    name: "Oise Energie",
    initials: "OE",
    accent: "from-orange-400 to-orange-500",
    description: "Partenaire historique des benevoles et du ravitaillement finishers.",
  },
  {
    name: "Velo Studio 95",
    initials: "VS",
    accent: "from-sky-400 to-cyan-500",
    description: "Atelier velo local pour la maintenance et les essais route.",
  },
  {
    name: "Aquarena Cergy",
    initials: "AQ",
    accent: "from-amber-300 to-orange-400",
    description: "Centre aquatique partenaire pour les creneaux natation du club.",
  },
];

export const membershipOptions = [
  {
    id: "adulte",
    name: "Licence adulte",
    price: "120 EUR",
    description: "Acces aux entrainements, au calendrier club et au suivi de saison.",
  },
  {
    id: "jeune",
    name: "Licence jeune",
    price: "60 EUR",
    description: "Formule reservee aux moins de 18 ans avec encadrement multisport.",
  },
];

export const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/evenements", label: "Evenements" },
  { href: "/adhesion", label: "Adhesion" },
  { href: "/partenaires", label: "Partenaires" },
  { href: "/contact", label: "Contact" },
];

export const clubHighlights = [
  { label: "Adherents", value: "47" },
  { label: "Evenements saison", value: "2" },
  { label: "Actifs", value: "35" },
  { label: "Coachs et encadrants", value: "6" },
];

export function getEventBySlug(slug: string) {
  return demoEvents.find((event) => event.slug === slug);
}
