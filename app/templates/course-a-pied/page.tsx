import Link from 'next/link';

export const metadata = { robots: { index: false }, title: 'Template Course à pied — DashClub' };

const EVENTS = [
  { name: '10km du Printemps', date: '6 Avr 2025', format: '10km route', spots: '300 places', price: '18€', status: 'Inscriptions ouvertes' },
  { name: 'Trail des Forêts', date: '24 Mai 2025', format: '25km trail / 12km', spots: '250 places', price: '28€', status: 'Inscriptions ouvertes' },
  { name: 'Semi-marathon Club', date: '27 Sep 2025', format: '21,1km route', spots: '400 places', price: '22€', status: 'Bientôt' },
];

const GROUPS = [
  { name: 'Groupe Découverte', pace: '7:00–8:30 min/km', desc: 'Débutants et reprise. On prend le temps, on rigole et on progresse ensemble.', days: 'Mar & Sam' },
  { name: 'Groupe Intermédiaire', pace: '5:30–7:00 min/km', desc: 'Pour ceux qui veulent progresser sur 10km ou semi, avec plans et sorties structurées.', days: 'Mer & Dim' },
  { name: 'Groupe Performance', pace: '< 5:00 min/km', desc: 'Sorties de qualité, fractionné, préparation compétition. Engagement requis.', days: 'Lun, Jeu & Sam' },
];

const MEMBERSHIP = [
  { name: 'Licence Running', price: '40€/an', desc: 'FFA incluse. Accès à tous les groupes et sorties organisées.' },
  { name: 'Licence Trail', price: '50€/an', desc: 'FFA incluse + accès aux sorties trail et stages montagne.' },
  { name: 'Pass Famille', price: '90€/an', desc: 'Jusqu\'à 4 membres. La formule idéale pour courir en famille.' },
];

// Couleurs spécifiques Running : vert forêt + vert clair
const C = { bg: '#1B4332', accent: '#52B788', light: '#F0FDF4', text: '#081c15' };

export default function CourseAPiedTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Template banner */}
      <div className="px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-white" style={{ backgroundColor: C.bg }}>
        ✦ Aperçu du modèle Course à pied — DashClub ✦{' '}
        <Link href="/templates" className="ml-4 underline opacity-70">← Autres modèles</Link>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between border-b px-8 py-4" style={{ borderColor: `${C.bg}15` }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: C.bg }}>
            <span className="text-[10px] font-bold" style={{ color: C.accent }}>RUN</span>
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: C.text }}>Club Running Demo</p>
            <p className="text-[10px] opacity-40" style={{ color: C.text }}>Votre ville (XX)</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium md:flex" style={{ color: `${C.bg}99` }}>
          <span className="cursor-pointer hover:opacity-100">Accueil</span>
          <span className="cursor-pointer hover:opacity-100">Courses</span>
          <span className="cursor-pointer hover:opacity-100">Groupes</span>
          <span className="cursor-pointer hover:opacity-100">Adhérer</span>
        </div>
        <button
          className="rounded-full px-5 py-2 text-sm font-semibold text-white transition"
          style={{ backgroundColor: C.accent }}
        >
          S&apos;inscrire →
        </button>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-28 text-white"
        style={{
          backgroundColor: C.bg,
          backgroundImage: `linear-gradient(135deg, rgba(27,67,50,0.82) 0%, rgba(27,67,50,0.60) 60%, rgba(27,67,50,0.85) 100%), url('/running-hero.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 15% 70%, ${C.accent}, transparent 45%)` }} />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: C.accent }}>
            Votre ville · Depuis 20XX
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Club Running<br />Demo
          </h1>
          <p className="mt-4 max-w-xl text-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Route · Trail · Cross — du 5km à l&apos;ultra
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            XXX coureurs de tous niveaux, des groupes adaptés à votre allure, des courses sur route
            et des aventures trail en pleine nature.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="inline-flex items-center rounded-full px-7 py-3.5 font-semibold transition"
              style={{ backgroundColor: C.accent, color: C.text }}
            >
              Voir les courses →
            </button>
            <button className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Rejoindre un groupe
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b px-6 py-10" style={{ borderColor: `${C.bg}10` }}>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: 'XXX', label: 'Coureurs' },
            { value: '3', label: 'Groupes de niveau' },
            { value: '5', label: 'Courses 2025' },
            { value: 'FFA', label: 'Fédération' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-bold" style={{ color: C.bg }}>{s.value}</p>
              <p className="mt-1 text-sm" style={{ color: `${C.bg}70` }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold" style={{ color: C.bg }}>Prochaines courses</h2>
            <button className="text-sm font-medium hover:underline" style={{ color: C.accent }}>Voir tout →</button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {EVENTS.map((e) => (
              <div
                key={e.name}
                className="flex flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md hover:-translate-y-0.5"
                style={{ borderColor: `${C.bg}12` }}
              >
                <div className="px-5 py-4" style={{ backgroundColor: C.bg }}>
                  <p className="text-xs font-medium" style={{ color: C.accent }}>{e.date}</p>
                  <p className="mt-1 font-serif text-lg font-bold text-white">{e.name}</p>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-mono" style={{ color: `${C.bg}80` }}>{e.format}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: `${C.bg}70` }}>{e.spots}</span>
                    <span className="font-semibold" style={{ color: C.bg }}>{e.price}</span>
                  </div>
                  <span className={`mt-auto self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    e.status === 'Inscriptions ouvertes' ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'
                  }`}>{e.status}</span>
                </div>
                <div className="px-5 pb-5">
                  <button
                    className="w-full rounded-xl py-2.5 text-sm font-semibold text-white transition"
                    style={{ backgroundColor: C.accent }}
                  >
                    S&apos;inscrire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training groups */}
      <section className="px-6 py-16" style={{ backgroundColor: C.light }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 font-serif text-3xl font-bold" style={{ color: C.bg }}>Groupes d&apos;entraînement</h2>
          <p className="mb-8 text-sm" style={{ color: `${C.bg}70` }}>Trouvez votre groupe selon votre allure</p>
          <div className="grid gap-5 md:grid-cols-3">
            {GROUPS.map((g) => (
              <div key={g.name} className="rounded-2xl border bg-white p-5 shadow-sm" style={{ borderColor: `${C.bg}12` }}>
                <span
                  className="inline-block rounded-full px-3 py-0.5 text-xs font-bold"
                  style={{ backgroundColor: `${C.accent}20`, color: C.bg }}
                >
                  {g.pace}
                </span>
                <h3 className="mt-3 font-bold" style={{ color: C.bg }}>{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.bg}70` }}>{g.desc}</p>
                <p className="mt-3 text-xs font-semibold" style={{ color: C.accent }}>📅 {g.days}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="px-6 py-16" style={{ backgroundColor: C.accent }}>
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 font-serif text-3xl font-bold" style={{ color: C.bg }}>Rejoignez le club</h2>
          <p className="mb-8 text-sm" style={{ color: `${C.bg}80` }}>Inscription et paiement en ligne sécurisé</p>
          <div className="grid gap-4 md:grid-cols-3">
            {MEMBERSHIP.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
                style={{ borderColor: `${C.bg}15` }}
              >
                <p className="text-sm font-bold" style={{ color: C.accent }}>{m.price}</p>
                <p className="mt-1 font-semibold" style={{ color: C.bg }}>{m.name}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: `${C.bg}70` }}>{m.desc}</p>
                <button
                  className="mt-4 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition"
                  style={{ backgroundColor: C.bg }}
                >
                  Choisir →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 text-center text-sm" style={{ backgroundColor: C.bg }}>
        <p className="font-semibold" style={{ color: C.accent }}>Club Running Demo</p>
        <p className="mt-1 text-white/40">contact@monclub.fr · monclub.fr</p>
        <p className="mt-4 text-xs text-white/30">Site propulsé par <span style={{ color: C.accent }}>DashClub</span></p>
      </footer>
    </div>
  );
}
