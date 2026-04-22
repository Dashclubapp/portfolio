const ROWS = [
  {
    subject: "Votre site",
    before: "WordPress vieillissant, personne pour le maintenir, factures d'hébergeur qui s'empilent",
    after: "Site pro hébergé, mobile-first, maintenu par DashClub",
  },
  {
    subject: "Vos inscriptions",
    before: "Google Forms + Excel + virements à pointer manuellement",
    after: "Formulaire structuré, capacité et liste d'attente gérées",
  },
  {
    subject: "Vos paiements",
    before: "Commission prélevée sur chaque inscrit par la plateforme d'inscription",
    after: "Paiements Stripe direct sur le compte du club, 0% de commission",
  },
  {
    subject: "Votre domaine",
    before: "monclub.wordpress.com ou un .fr qu'on a oublié de renouveler",
    after: "Votre domaine connecté au site, ou domaine géré par DashClub (+20€/an)",
  },
  {
    subject: "Votre back-office",
    before: "Un tableur partagé, des onglets sans fin",
    after: "Tableau de bord temps réel : inscrits, recettes, événements",
  },
  {
    subject: "Vos week-ends bénévoles",
    before: "Passés à relancer, pointer, corriger",
    after: "Passés à faire vivre le club",
  },
];

export function BeforeAfter() {
  return (
    <section className="border-t border-stone-900/10 py-8">
      <div className="rounded-[2rem] border border-stone-900/10 bg-stone-50/80 px-6 py-10 sm:px-8">
        {/* En-tête */}
        <h2 className="text-center font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
          Avant DashClub. Après DashClub.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-stone-600">
          Les trois galères deviennent trois leviers de croissance pour votre club.
        </p>

        {/* Tableau desktop */}
        <div className="mt-8 hidden overflow-hidden rounded-[1.6rem] border border-stone-900/10 bg-white shadow-[0_16px_40px_rgba(41,37,36,0.07)] md:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-[14%] px-5 py-4 text-left font-sans text-[10px] uppercase tracking-[0.22em]"
                  style={{ backgroundColor: "#f8f6f1", color: "#8a96a8" }}>
                </th>
                <th className="w-[43%] px-5 py-4 text-left font-sans text-[10px] uppercase tracking-[0.22em]"
                  style={{ backgroundColor: "#f8f6f1", color: "#8a96a8" }}>
                  ❌ Avant
                </th>
                <th className="w-[43%] px-5 py-4 text-left font-sans text-[10px] uppercase tracking-[0.22em] text-white"
                  style={{ backgroundColor: "#0D1F3C" }}>
                  ✅ Avec DashClub
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <tr key={row.subject} className={idx % 2 !== 0 ? "bg-stone-50/60" : ""} style={{ borderTop: "1px solid rgba(41,37,36,0.07)" }}>
                  <td className="px-5 py-4 font-semibold text-[13px]" style={{ color: "#0D1F3C" }}>
                    {row.subject}
                  </td>
                  <td className="px-5 py-4 text-[13px] leading-6" style={{ color: "#8a96a8" }}>
                    {row.before}
                  </td>
                  <td className="px-5 py-4 text-[13px] leading-6 font-medium" style={{ backgroundColor: "rgba(13,31,60,0.04)", color: "#0D1F3C" }}>
                    {row.after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards mobile (≤ md) */}
        <div className="mt-6 space-y-4 md:hidden">
          {ROWS.map((row) => (
            <div key={row.subject} className="overflow-hidden rounded-[1.2rem] border border-stone-900/10 bg-white">
              <div className="px-4 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ backgroundColor: "#f8f6f1", color: "#8a96a8" }}>
                {row.subject}
              </div>
              <div className="grid grid-cols-2 divide-x" style={{ borderTop: "1px solid rgba(41,37,36,0.07)" }}>
                <div className="px-4 py-3 text-xs leading-5" style={{ color: "#8a96a8" }}>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider">❌ Avant</span>
                  {row.before}
                </div>
                <div className="px-4 py-3 text-xs font-medium leading-5" style={{ backgroundColor: "rgba(13,31,60,0.04)", color: "#0D1F3C" }}>
                  <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider" style={{ color: "#C9A84C" }}>✅ DashClub</span>
                  {row.after}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloc promesse commission */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <h3 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "#C9A84C" }}>
            0% de commission. Vous encaissez sur votre compte.
          </h3>
          {/* Encadré central */}
          <div className="mx-auto mt-5 rounded-2xl px-6 py-7"
            style={{ border: "2px solid rgba(201,168,76,0.55)", backgroundColor: "rgba(201,168,76,0.12)" }}>
            <p className="text-base font-medium" style={{ color: "rgba(255,255,255,0.85)" }}>
              Sur un triathlon M de 200 dossards à 40€, votre club perçoit :
            </p>
            <p className="mt-4 text-sm leading-6" style={{ color: "rgba(255,255,255,0.55)" }}>
              Recette brute : 8 000€&nbsp;&nbsp;—&nbsp;&nbsp;Frais Stripe : 170€&nbsp;&nbsp;—&nbsp;&nbsp;Commission DashClub : 0€
            </p>
            <p className="mt-4 font-display text-2xl font-bold sm:text-3xl" style={{ color: "#C9A84C" }}>
              7 830€ nets
            </p>
            <p className="mt-0.5 text-sm font-medium" style={{ color: "rgba(255,255,255,0.7)" }}>
              pour votre club
            </p>
            <p className="mt-5 text-xs italic leading-6" style={{ color: "rgba(255,255,255,0.5)" }}>
              Les seuls frais sont ceux de Stripe (1,5% + 0,25€ par transaction).<br />
              Aucune marge DashClub sur vos inscriptions, quelle que soit votre formule.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-6">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-full px-7 py-4 text-base font-bold transition hover:-translate-y-0.5"
              style={{ backgroundColor: "#C9A84C", color: "#0D1F3C" }}
            >
              Lancer mon site club →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
