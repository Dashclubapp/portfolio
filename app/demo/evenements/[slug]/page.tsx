import Link from "next/link";
import { notFound } from "next/navigation";
import { demoEvents, getEventBySlug } from "../../demo-data";
import { getDemoHref } from "../../routing";
import { DemoPageIntro, StatusPill } from "../../ui";

export function generateStaticParams() {
  return demoEvents.map((event) => ({ slug: event.slug }));
}

export default function DemoEventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const event = getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <>
      <DemoPageIntro
        eyebrow="Fiche evenement"
        title={event.title}
        description={`${event.dateLabel} a ${event.location}. Une page detaillee de demonstration avec description, infos pratiques et formulaire d'inscription pret a etre explore.`}
      />

      <section className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_60px_rgba(4,10,24,0.26)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-orange-200">{event.dateLabel}</p>
              <h2 className="mt-2 font-display text-4xl leading-none text-white">
                {event.title}
              </h2>
            </div>
            <StatusPill label={event.status} />
          </div>

          <p className="mt-6 text-base leading-8 text-slate-300">
            {event.description}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-[#08162d] p-4">
              <p className="text-sm text-slate-400">Lieu</p>
              <p className="mt-2 text-sm leading-6 text-white">{event.address}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#08162d] p-4">
              <p className="text-sm text-slate-400">Tarif</p>
              <p className="mt-2 text-2xl font-semibold text-white">{event.price}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[#08162d] p-4">
              <p className="text-sm text-slate-400">Inscrits</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {event.registered}/{event.capacity}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-3xl leading-none text-white">
                Ce qui est prevu
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                {event.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-3xl leading-none text-white">
                Timing de la journee
              </h3>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
                {event.schedule.map((line) => (
                  <li
                    key={line}
                    className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-3"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-white/10 bg-[#0d2140] p-6 sm:p-8">
          <h3 className="font-display text-4xl leading-none text-white">
            Formulaire d&apos;inscription
          </h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Version demo : les champs sont la pour tester le rendu DashClub
            et le parcours de saisie cote participant.
          </p>

          <form action="#" method="get" className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm text-slate-200">
                Prenom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  name="firstName"
                  placeholder="Camille"
                />
              </label>
              <label className="block text-sm text-slate-200">
                Nom
                <input
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                  name="lastName"
                  placeholder="Martin"
                />
              </label>
            </div>

            <label className="block text-sm text-slate-200">
              Email
              <input
                type="email"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                name="email"
                placeholder="camille@club.fr"
              />
            </label>

            <label className="block text-sm text-slate-200">
              Format
              <select className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition focus:border-orange-300">
                <option>{event.format}</option>
                <option>Format decouverte</option>
                <option>Relais club</option>
              </select>
            </label>

            <label className="block text-sm text-slate-200">
              Numero de licence
              <input
                className="mt-2 w-full rounded-2xl border border-white/10 bg-[#08162d] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-300"
                name="license"
                placeholder="FFTRI-2026-00452"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-5 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
            >
              Tester l&apos;inscription
            </button>
          </form>

          <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm text-slate-300">
              Liste d&apos;attente actuelle : <span className="font-semibold text-white">{event.waitingList}</span>
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Dans la version produit complete, cette carte serait reliee aux
              paiements, au dossard et aux emails automatiques.
            </p>
          </div>

          <Link
            href={getDemoHref("/evenements")}
            className="mt-6 inline-flex text-sm font-medium text-orange-200 transition hover:text-orange-100"
          >
            Retour a la liste des evenements →
          </Link>
        </aside>
      </section>
    </>
  );
}
