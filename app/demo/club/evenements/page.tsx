import { ClubEventCard } from "../ClubEventCard";
import { usmEvents } from "../../usm-data";

export default function EvenementsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#C9A84C]">
          Calendrier 2025
        </p>
        <h1
          className="mt-2 text-4xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Événements USM Triathlon
        </h1>
        <p className="mt-3 text-[#0D1F3C]/60">
          Inscrivez-vous aux événements du club — dossards limités, inscriptions en ligne sécurisées.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {usmEvents.map((event) => (
          <ClubEventCard key={event.slug} event={event} variant="full" />
        ))}
      </div>
    </div>
  );
}
