import Link from 'next/link';

export const metadata = { robots: { index: false }, title: 'Modèles de sites — DashClub' };

const TEMPLATES = [
  {
    href: '/templates/triathlon',
    sport: 'Triathlon',
    tag: 'Natation · Vélo · Course',
    colors: { bg: '#0D1F3C', accent: '#C9A84C', light: '#F8F6F1' },
    desc: 'Adapté aux clubs multisport avec calendrier de courses, gestion des épreuves (sprint, olympique, LD) et adhésions FFC/FFTri.',
    emoji: '🏊‍♂️🚴‍♂️🏃‍♂️',
  },
  {
    href: '/templates/course-a-pied',
    sport: 'Course à pied',
    tag: 'Running · Trail · Route',
    colors: { bg: '#1B4332', accent: '#52B788', light: '#F0FDF4' },
    desc: 'Idéal pour les clubs running et trail. Calendrier de sorties, résultats de course, groupes de niveau et inscriptions en ligne.',
    emoji: '🏃‍♂️🌲⏱️',
  },
];

export default function TemplatesIndex() {
  return (
    <main className="min-h-screen bg-stone-100 py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 text-center">
          <span className="rounded-full bg-[#C9A84C]/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[#C9A84C]">
            Modèles de sites
          </span>
        </div>
        <h1 className="mt-4 text-center text-4xl font-bold text-stone-900">
          Choisissez votre template
        </h1>
        <p className="mt-3 text-center text-stone-500">
          Chaque modèle est pré-configuré pour votre sport — contenu, structure et vocabulaire adaptés.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {TEMPLATES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="group overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:shadow-lg hover:-translate-y-1"
            >
              {/* Color band */}
              <div
                className="flex h-24 items-center justify-center text-4xl"
                style={{ backgroundColor: t.colors.bg }}
              >
                <span className="tracking-widest">{t.emoji}</span>
              </div>
              <div className="p-6">
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: t.colors.accent }}>
                  {t.tag}
                </span>
                <h2 className="mt-1 text-xl font-bold text-stone-900 group-hover:text-[#C9A84C] transition">
                  {t.sport}
                </h2>
                <p className="mt-2 text-sm text-stone-500 leading-relaxed">{t.desc}</p>
                <div className="mt-4 inline-flex items-center text-sm font-semibold text-stone-700 group-hover:text-[#C9A84C] transition">
                  Voir le modèle →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-stone-400">
          D&apos;autres modèles arrivent : Natation, Football, Tennis, Cyclisme…
        </p>
        <div className="mt-6 flex justify-center">
          <Link href="/" className="text-sm text-stone-400 hover:text-stone-600 transition">← Retour à l&apos;accueil</Link>
        </div>
      </div>
    </main>
  );
}
