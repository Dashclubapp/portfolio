import { club, membershipOptions } from "../demo-data";
import { DemoPageIntro } from "../ui";

export default function DemoMembershipPage() {
  return (
    <>
      <DemoPageIntro
        eyebrow="Adhesion"
        title="Un formulaire simple pour rejoindre CAP Sport."
        description="Cette page de demonstration reproduit un parcours d'adhesion club avec choix de licence adulte ou jeune, informations de contact et message d'accueil."
      />

      <section className="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-orange-300">
            Pourquoi adherer
          </p>
          <h2 className="mt-4 font-display text-4xl leading-none text-white">
            Une saison cadree, des entrainements suivis, un club lisible.
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-300">
            L&apos;adhesion donne acces aux entrainements natation, velo, course a
            pied, aux communications club et aux benevolats evenementiels.
          </p>

          <div className="mt-8 space-y-4">
            {membershipOptions.map((option) => (
              <article
                key={option.id}
                className="rounded-[1.6rem] border border-white/10 bg-[#0d2140] p-5"
              >
                <p className="text-sm text-orange-200">{option.price}</p>
                <h3 className="mt-2 font-display text-3xl leading-none text-white">
                  {option.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  {option.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-6 rounded-[1.6rem] border border-orange-400/20 bg-orange-400/10 p-5 text-sm leading-7 text-orange-100">
            Permanence licences tous les mercredis au club-house, a partir de
            18:30.
          </div>
        </aside>

        <article className="rounded-[2rem] border border-white/10 bg-[#0d2140] p-6 shadow-[0_24px_60px_rgba(4,10,24,0.26)] sm:p-8">
          <h2 className="font-display text-4xl leading-none text-white">
            Formulaire d&apos;adhesion
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Version demo pour tester le rendu du formulaire et le choix de
            licence. Aucun traitement reel n&apos;est branche dans ce lot.
          </p>

          <form action="#" method="get" className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Prenom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  placeholder="Lena"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Nom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  placeholder="Roussel"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-200">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                placeholder="lena@cap.fr"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Telephone
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  placeholder="06 12 34 56 78"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Date de naissance
                <input
                  type="date"
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition focus:border-orange-300"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-200">
              Type de licence
              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition focus:border-orange-300">
                {membershipOptions.map((option) => (
                  <option key={option.id}>{`${option.name} - ${option.price}`}</option>
                ))}
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Message pour le club
              <textarea
                className="mt-2 min-h-[140px] w-full rounded-[1.7rem] border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                placeholder={`Bonjour ${club.shortName}, je souhaite decouvrir le club et participer aux entrainements de la saison.`}
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Envoyer ma demande d&apos;adhesion
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
