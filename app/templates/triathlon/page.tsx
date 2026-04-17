import Link from 'next/link';

export const metadata = { robots: { index: false }, title: 'Template Triathlon — DashClub' };

const EVENTS = [
  { name: 'Sprint de Printemps', date: '15 Avr 2025', distances: '750m / 20km / 5km', spots: '120 places', price: '35€', status: 'Inscriptions ouvertes' },
  { name: 'Triathlon Olympique', date: '14 Juin 2025', distances: '1,5km / 40km / 10km', spots: '200 places', price: '55€', status: 'Inscriptions ouvertes' },
  { name: 'Longue Distance', date: '20 Sep 2025', distances: '2km / 80km / 20km', spots: '80 places', price: '75€', status: 'Bientôt' },
];

const MEMBERSHIP = [
  { name: 'Licence Découverte', price: '45€/an', desc: 'Pour débuter le triathlon, entraînements encadrés et accès aux épreuves club.' },
  { name: 'Licence Compétition', price: '85€/an', desc: 'FFTri incluse, accès à toutes les courses federales et suivi sportif personnalisé.' },
  { name: 'Pass Famille', price: '120€/an', desc: '2 adultes + enfants. La formule idéale pour les familles de triathlètes.' },
];

export default function TriathlonTemplate() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Template banner */}
      <div className="bg-[#C9A84C] px-4 py-2 text-center text-xs font-bold uppercase tracking-widest text-[#0D1F3C]">
        ✦ Aperçu du modèle Triathlon — DashClub ✦{' '}
        <Link href="/templates" className="ml-4 underline">← Autres modèles</Link>
      </div>

      {/* Nav */}
      <nav className="flex items-center justify-between border-b border-stone-200 bg-white px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: '#0D1F3C' }}>
            <span className="text-[10px] font-bold" style={{ color: '#C9A84C' }}>TRI</span>
          </div>
          <div>
            <p className="text-sm font-bold text-stone-900">Club Triathlon Demo</p>
            <p className="text-[10px] text-stone-400">Votre ville (XX)</p>
          </div>
        </div>
        <div className="hidden items-center gap-6 text-sm font-medium text-stone-600 md:flex">
          <span className="cursor-pointer hover:text-stone-900">Accueil</span>
          <span className="cursor-pointer hover:text-stone-900">Événements</span>
          <span className="cursor-pointer hover:text-stone-900">Adhérer</span>
          <span className="cursor-pointer hover:text-stone-900">Contact</span>
        </div>
        <button className="rounded-full px-5 py-2 text-sm font-semibold" style={{ backgroundColor: '#C9A84C', color: '#0D1F3C' }}>
          S&apos;inscrire →
        </button>
      </nav>

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6 py-28 text-white"
        style={{
          backgroundColor: '#0D1F3C',
          backgroundImage: "linear-gradient(135deg, rgba(13,31,60,0.78) 0%, rgba(21,46,85,0.60) 60%, rgba(13,31,60,0.82) 100%), url('/triathlon-hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_20%_60%,#C9A84C,transparent_40%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C9A84C]">
            Votre ville · Depuis 20XX
          </p>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Club Triathlon<br />Demo
          </h1>
          <p className="mt-4 max-w-xl text-xl text-white/80">
            Natation · Vélo · Course à pied — tous niveaux bienvenus
          </p>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/55">
            XXX adhérents passionnés, des entraînements hebdomadaires sur les trois disciplines
            et un calendrier de courses du sprint à la longue distance.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="inline-flex items-center rounded-full bg-[#C9A84C] px-7 py-3.5 font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]">
              Voir les courses →
            </button>
            <button className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-7 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20">
              Adhérer au club
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[#0D1F3C]/8 bg-white px-6 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: 'XXX', label: 'Adhérents' },
            { value: '20XX', label: 'Fondation' },
            { value: '3', label: 'Courses 2025' },
            { value: 'FFTri', label: 'Fédération' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-4xl font-bold text-[#0D1F3C]">{s.value}</p>
              <p className="mt-1 text-sm text-[#0D1F3C]/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold text-[#0D1F3C]">Prochaines courses</h2>
            <button className="text-sm font-medium text-[#C9A84C] hover:underline">Voir tout →</button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {EVENTS.map((e) => (
              <div key={e.name} className="flex flex-col rounded-2xl border border-[#0D1F3C]/10 bg-white shadow-sm transition hover:shadow-md hover:-translate-y-0.5">
                <div className="rounded-t-2xl bg-[#0D1F3C] px-5 py-4">
                  <p className="text-xs font-medium text-[#C9A84C]">{e.date}</p>
                  <p className="mt-1 font-serif text-lg font-bold text-white">{e.name}</p>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <p className="text-xs font-mono text-[#0D1F3C]/60">{e.distances}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#0D1F3C]/60">{e.spots}</span>
                    <span className="font-semibold text-[#0D1F3C]">{e.price}</span>
                  </div>
                  <span className={`mt-auto self-start rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    e.status === 'Inscriptions ouvertes'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-stone-100 text-stone-500'
                  }`}>{e.status}</span>
                </div>
                <div className="px-5 pb-5">
                  <button className="w-full rounded-xl bg-[#C9A84C] py-2.5 text-sm font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]">
                    S&apos;inscrire →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="bg-[#F8F6F1] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-8 font-serif text-3xl font-bold text-[#0D1F3C]">Entraînements</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { discipline: '🏊 Natation', details: 'Mar & Jeu 20h — Piscine municipale', level: 'Tous niveaux' },
              { discipline: '🚴 Vélo', details: 'Dim 8h — Départ parking mairie', level: 'Intermédiaire → Expert' },
              { discipline: '🏃 Course', details: 'Mer 19h30 — Stade', level: 'Tous niveaux' },
            ].map((t) => (
              <div key={t.discipline} className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-5 shadow-sm">
                <p className="text-2xl">{t.discipline.split(' ')[0]}</p>
                <p className="mt-2 font-semibold text-[#0D1F3C]">{t.discipline.slice(3)}</p>
                <p className="mt-1 text-sm text-[#0D1F3C]/60">{t.details}</p>
                <span className="mt-3 inline-block rounded-full bg-[#C9A84C]/10 px-2.5 py-0.5 text-xs font-medium text-[#C9A84C]">
                  {t.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="bg-[#C9A84C] px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-2 font-serif text-3xl font-bold text-[#0D1F3C]">Rejoignez le club</h2>
          <p className="mb-8 text-[#0D1F3C]/70">Inscription et paiement en ligne sécurisé</p>
          <div className="grid gap-4 md:grid-cols-3">
            {MEMBERSHIP.map((m) => (
              <div key={m.name} className="rounded-2xl border border-[#0D1F3C]/10 bg-white/85 p-5 shadow-sm transition hover:-translate-y-0.5 hover:bg-white">
                <p className="text-sm font-bold text-[#C9A84C]">{m.price}</p>
                <p className="mt-1 font-semibold text-[#0D1F3C]">{m.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#0D1F3C]/65">{m.desc}</p>
                <button className="mt-4 w-full rounded-xl bg-[#0D1F3C] py-2.5 text-sm font-semibold text-white transition hover:bg-[#152e55]">
                  Choisir →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D1F3C] px-6 py-10 text-center text-sm text-white/40">
        <p className="text-[#C9A84C] font-semibold">Club Triathlon Demo</p>
        <p className="mt-1">contact@monclub.fr · monclub.fr</p>
        <p className="mt-4 text-xs">Site propulsé par <span className="text-[#C9A84C]">DashClub</span></p>
      </footer>
    </div>
  );
}
