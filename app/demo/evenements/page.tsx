import Link from "next/link";
import { demoEvents } from "../demo-data";
import { getDemoEventHref } from "../routing";
import { DemoPageIntro, StatusPill } from "../ui";

export default function DemoEventsPage() {
  return (
    <>
      <DemoPageIntro
        eyebrow="Evenements"
        title="Deux courses fictives, un parcours de demonstration complet."
        description="La page liste des evenements montre le rendu catalogue DashClub avec statuts, capacites, prix et acces rapide vers chaque fiche d'inscription."
      />

      <section className="grid gap-5">
        {demoEvents.map((event) => (
          <article
            key={event.slug}
            className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] shadow-[0_24px_60px_rgba(4,10,24,0.26)]"
          >
            <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-orange-200">{event.dateLabel}</p>
                    <h2 className="mt-2 font-display text-4xl leading-none text-white">
                      {event.title}
                    </h2>
                  </div>
                  <StatusPill label={event.status} />
                </div>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                  {event.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-200">
                  <span className="rounded-full border border-white/10 px-3 py-2">
                    {event.location}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-2">
                    {event.format}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-2">
                    {event.price}
                  </span>
                </div>
              </div>

              <div className="bg-[#0d2140] p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm text-slate-300">Places confirmees</p>
                    <p className="mt-2 font-display text-4xl leading-none text-white">
                      {event.registered}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm text-slate-300">Capacite max</p>
                    <p className="mt-2 font-display text-4xl leading-none text-white">
                      {event.capacity}
                    </p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-sm text-slate-300">Liste d&apos;attente</p>
                    <p className="mt-2 font-display text-4xl leading-none text-white">
                      {event.waitingList}
                    </p>
                  </div>
                </div>
                <Link
                  href={getDemoEventHref(event.slug)}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-3 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
                >
                  Voir la fiche et tester l&apos;inscription
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
