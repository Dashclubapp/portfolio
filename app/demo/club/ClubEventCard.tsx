import Image from "next/image";
import Link from "next/link";
import type { UsmEvent } from "../usm-data";

type ClubEventCardProps = {
  event: UsmEvent;
  variant?: "preview" | "full";
};

function getStatusClasses(status: UsmEvent["status"]) {
  if (status === "Complet") {
    return "bg-red-50 text-red-600";
  }

  if (status === "Bientôt") {
    return "bg-amber-50 text-amber-700";
  }

  return "bg-green-50 text-green-700";
}

function getDateBadge(isoDate: string) {
  const date = new Date(isoDate);

  return {
    day: new Intl.DateTimeFormat("fr-FR", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("fr-FR", { month: "short" })
      .format(date)
      .replace(".", "")
      .toUpperCase(),
    year: new Intl.DateTimeFormat("fr-FR", { year: "numeric" }).format(date),
  };
}

export function ClubEventCard({
  event,
  variant = "preview",
}: ClubEventCardProps) {
  const isFull = variant === "full";
  const dateBadge = getDateBadge(event.isoDate);

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#0D1F3C]/10 bg-white shadow-[0_20px_45px_rgba(13,31,60,0.08)]">
      <div className="relative aspect-[5/3] overflow-hidden bg-[#0D1F3C]/5">
        <Image
          src={event.imageSrc}
          alt={event.imageAlt}
          fill
          sizes={isFull ? "(min-width: 1280px) 42rem, 100vw" : "(min-width: 768px) 32vw, 100vw"}
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D1F3C]/80 via-[#0D1F3C]/25 to-transparent" />
        <div className="absolute left-5 top-5 rounded-[1.2rem] bg-white/92 px-3 py-2 text-center text-[#0D1F3C] shadow-lg backdrop-blur">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C9A84C]">
            {dateBadge.month}
          </p>
          <p
            className="text-3xl font-bold leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {dateBadge.day}
          </p>
          <p className="text-[10px] text-[#0D1F3C]/45">{dateBadge.year}</p>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-6">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#C9A84C]/90">
              {event.dateLabel}
            </p>
            <h3
              className="mt-2 text-2xl font-bold text-white sm:text-[2rem]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {event.title}
            </h3>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(
              event.status,
            )}`}
          >
            {event.status}
          </span>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-sm font-medium text-[#0D1F3C]/55">📍 {event.location}</p>
        <p className="mt-3 text-sm leading-relaxed text-[#0D1F3C]/70">
          {isFull ? event.description : event.teaser}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-[#F8F6F1] px-3 py-1.5 text-xs font-medium text-[#0D1F3C]/70">
            {event.price}
          </span>
          {event.priceMember !== event.price ? (
            <span className="rounded-full bg-[#C9A84C]/12 px-3 py-1.5 text-xs font-medium text-[#8C6A17]">
              {event.priceMember} membres USM
            </span>
          ) : null}
          <span className="rounded-full bg-[#F8F6F1] px-3 py-1.5 text-xs font-medium text-[#0D1F3C]/70">
            {event.registered}/{event.capacity} inscrits
          </span>
          {event.waitingList > 0 ? (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700">
              {event.waitingList} en attente
            </span>
          ) : (
            <span className="rounded-full bg-[#F8F6F1] px-3 py-1.5 text-xs font-medium text-[#0D1F3C]/70">
              {event.remaining} places restantes
            </span>
          )}
        </div>

        {isFull ? (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs text-[#0D1F3C]/55">
              <span>Capacité remplie</span>
              <span className="font-medium text-[#0D1F3C]">
                {Math.round((event.registered / event.capacity) * 100)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-[#0D1F3C]/10">
              <div
                className={`h-2 rounded-full ${event.remaining === 0 ? "bg-red-500" : "bg-[#C9A84C]"}`}
                style={{ width: `${(event.registered / event.capacity) * 100}%` }}
              />
            </div>
          </div>
        ) : null}

        {event.status === "Complet" ? (
          <button className="mt-6 w-full rounded-full border border-[#0D1F3C]/15 px-4 py-3 text-sm font-semibold text-[#0D1F3C]/55">
            Liste d&apos;attente
          </button>
        ) : (
          <Link
            href={`/demo/club/evenements/${event.slug}`}
            className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#0D1F3C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#152e55]"
          >
            {event.cta}
          </Link>
        )}
      </div>
    </article>
  );
}
