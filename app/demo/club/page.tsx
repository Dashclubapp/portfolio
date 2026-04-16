import Link from "next/link";
import { ClubEventCard } from "./ClubEventCard";
import { usmEvents, usmMembershipOptions, usmNews } from "../usm-data";

export default function ClubHomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0D1F3C] px-6 py-24 text-white">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_60%,#C9A84C,transparent_40%)]" />
        <div className="relative mx-auto max-w-5xl">
          <p className="text-sm font-medium uppercase tracking-widest text-[#C9A84C]">
            Mézy-sur-Seine (78) · Depuis 1998
          </p>
          <h1
            className="mt-4 text-5xl font-bold leading-tight sm:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            USM Triathlon
          </h1>
          <p className="mt-4 text-xl text-white/80">
            Club de triathlon à Mézy-sur-Seine depuis 1998
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            142 adhérents passionnés, des entraînements hebdomadaires et un calendrier ambitieux.
            De la licence découverte au format longue distance, l&apos;USM accueille tous les niveaux.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/demo/club/evenements"
              className="inline-flex items-center rounded-full bg-[#C9A84C] px-6 py-3 font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]"
            >
              Voir les événements
            </Link>
            <Link
              href="/demo/club/adhesion"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Adhérer au club
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-6 py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "142", label: "Adhérents actifs" },
            { value: "1998", label: "Année de fondation" },
            { value: "3", label: "Événements 2025" },
            { value: "6", label: "Coachs & encadrants" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-4xl font-bold text-[#0D1F3C]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[#0D1F3C]/60">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events preview */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-center justify-between">
            <h2
              className="text-3xl font-bold text-[#0D1F3C]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Prochains événements
            </h2>
            <Link
              href="/demo/club/evenements"
              className="text-sm font-medium text-[#C9A84C] hover:underline"
            >
              Voir tous →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {usmEvents.map((event) => (
              <ClubEventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-8 text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Actualités du club
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {usmNews.map((news) => (
              <article
                key={news.title}
                className="rounded-2xl border border-[#0D1F3C]/10 bg-[#F8F6F1] p-6"
              >
                <p className="text-xs font-medium text-[#C9A84C]">{news.date}</p>
                <h3
                  className="mt-2 text-xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {news.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#0D1F3C]/70">
                  {news.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA join */}
      <section className="bg-[#C9A84C] px-6 py-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Rejoignez l&apos;USM Triathlon
          </h2>
          <p className="mt-3 text-[#0D1F3C]/70">
            Licences à partir de 45€/an — découverte, compétition et tout niveau.
          </p>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-3">
            {usmMembershipOptions.map((option) => (
              <Link
                key={option.id}
                href={`/demo/club/adhesion?licence=${option.id}`}
                className="rounded-2xl border border-[#0D1F3C]/10 bg-white/80 p-4 shadow-[0_16px_30px_rgba(13,31,60,0.08)] transition hover:-translate-y-0.5 hover:bg-white"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C9A84C]">
                  {option.price}
                </p>
                <p className="mt-2 font-semibold text-[#0D1F3C]">{option.name}</p>
                <p className="mt-2 text-sm leading-6 text-[#0D1F3C]/65">{option.description}</p>
              </Link>
            ))}
          </div>
          <Link
            href="/demo/club/adhesion"
            className="mt-6 inline-flex items-center rounded-full bg-[#0D1F3C] px-8 py-3.5 font-semibold text-white transition hover:bg-[#152e55]"
          >
            Adhérer en ligne →
          </Link>
        </div>
      </section>
    </>
  );
}
