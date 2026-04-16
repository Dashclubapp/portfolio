import { club } from "../demo-data";
import { DemoPageIntro } from "../ui";

export default function DemoContactPage() {
  return (
    <>
      <DemoPageIntro
        eyebrow="Contact"
        title="Un point d'entree simple pour les questions club."
        description="Page contact fictive avec informations utiles et formulaire court. Le but est de montrer le rendu public DashClub sur une page de contact classique."
      />

      <section className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
        <aside className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8">
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-orange-300">
            Infos pratiques
          </p>
          <h2 className="mt-4 font-display text-4xl leading-none text-white">
            CAP Sport
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-300">
            <p>Email : {club.contactEmail}</p>
            <p>Telephone : {club.phone}</p>
            <p>Base : {club.trainingBase}</p>
            <p>Ville : {club.city}</p>
          </div>
          <div className="mt-8 rounded-[1.6rem] border border-white/10 bg-[#0d2140] p-5 text-sm leading-7 text-slate-300">
            Reponse sous 48h ouvrées pour les demandes d&apos;essai, d&apos;adhesion ou
            de benevolat evenement.
          </div>
        </aside>

        <article className="rounded-[2rem] border border-white/10 bg-[#0d2140] p-6 shadow-[0_24px_60px_rgba(4,10,24,0.26)] sm:p-8">
          <h2 className="font-display text-4xl leading-none text-white">
            Formulaire de contact
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Version demo non connectee, suffisante pour tester la mise en page
            et le niveau de finition d&apos;une page de contact club.
          </p>

          <form action="#" method="get" className="mt-8 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Prenom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  placeholder="Sofia"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Nom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  placeholder="Bernard"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-200">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                placeholder="sofia@email.fr"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Sujet
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                placeholder="Essai club / benevolat / partenariat"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Message
              <textarea
                className="mt-2 min-h-[160px] w-full rounded-[1.7rem] border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                placeholder="Bonjour, je souhaite en savoir plus sur les horaires d'entrainement et le calendrier des courses."
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Envoyer le message
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
