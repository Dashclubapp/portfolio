import Link from 'next/link';

const GUIDES = [
  {
    href: '/docs/dns',
    icon: '🌐',
    title: 'Configurer votre nom de domaine',
    desc: 'Connectez votre domaine personnalisé (monclub.fr) à votre site DashClub en quelques minutes.',
    time: '10 min',
  },
  {
    href: '/docs/stripe',
    icon: '💳',
    title: 'Connecter Stripe pour les paiements',
    desc: 'Activez la collecte d\'inscriptions en ligne avec zéro commission DashClub.',
    time: '15 min',
  },
  {
    href: '/docs/premiere-course',
    icon: '🏁',
    title: 'Créer votre première course',
    desc: 'Publiez un événement avec formulaire d\'inscription et paiement en ligne.',
    time: '5 min',
  },
];

export default function DocsHome() {
  return (
    <div>
      <div className="rounded-2xl bg-[#0D1F3C] px-7 py-6 mb-2">
        <h1 className="text-3xl font-bold text-white">Documentation DashClub</h1>
        <p className="mt-2 text-base text-white/60 leading-7">
          Tout ce qu&apos;il faut savoir pour configurer et utiliser votre plateforme club.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GUIDES.map(g => (
          <Link
            key={g.href}
            href={g.href}
            className="group flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-[#C9A84C]/40 hover:shadow-md"
          >
            <div className="text-3xl">{g.icon}</div>
            <div>
              <h2 className="font-semibold text-stone-900 group-hover:text-[#C9A84C] transition">{g.title}</h2>
              <p className="mt-1 text-sm text-stone-500 leading-relaxed">{g.desc}</p>
            </div>
            <span className="mt-auto text-xs text-stone-400">⏱ {g.time}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="font-semibold text-stone-900">Besoin d&apos;aide ?</h2>
        <p className="mt-1 text-sm text-stone-500">
          Notre équipe répond sous 24h ouvrées.{' '}
          <a href="mailto:hello@dashclub.app" className="text-[#C9A84C] underline underline-offset-2 hover:text-[#b8943f]">
            hello@dashclub.app
          </a>
        </p>
      </div>
    </div>
  );
}
