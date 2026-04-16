import { partnerLogos } from "../demo-data";
import { DemoPageIntro } from "../ui";

export default function DemoPartnersPage() {
  return (
    <>
      <DemoPageIntro
        eyebrow="Partenaires"
        title="Trois partenaires fictifs pour habiller un vrai rendu club."
        description="La page partenaires montre comment le club peut exposer ses soutiens avec logos, descriptions courtes et tonalite visuelle coherente avec la charte marine et orange."
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {partnerLogos.map((partner) => (
          <article
            key={partner.name}
            className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-[0_24px_60px_rgba(4,10,24,0.26)] sm:p-8"
          >
            <div
              className={`flex h-28 items-center justify-center rounded-[1.6rem] bg-gradient-to-br ${partner.accent} text-4xl font-bold tracking-[0.22em] text-slate-950`}
            >
              {partner.initials}
            </div>
            <h2 className="mt-6 font-display text-4xl leading-none text-white">
              {partner.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-300">
              {partner.description}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-[2rem] border border-orange-400/20 bg-orange-400/10 p-6 sm:p-8">
        <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-orange-100">
          Pack sponsoring
        </p>
        <h2 className="mt-4 font-display text-4xl leading-none text-white">
          Un bloc simple pour valoriser les partenaires du club.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-orange-50/90">
          Dans une version produit complete, cette section pourrait afficher des
          liens, des visuels uploades par le club et des emplacements associes
          aux pages evenement.
        </p>
      </section>
    </>
  );
}
