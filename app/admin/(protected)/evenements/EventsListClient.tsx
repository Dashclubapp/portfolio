"use client";

import Link from "next/link";

interface Event {
  id: number;
  titre: string;
  slug: string;
  date_evenement: string;
  nb_places: number;
  tarif_standard: string;
  statut: string;
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  draft: { label: "Brouillon", className: "bg-white/10 text-white/50" },
  published: { label: "Publié", className: "bg-emerald-500/20 text-emerald-400" },
  closed: { label: "Clôturé", className: "bg-amber-500/20 text-amber-400" },
  cancelled: { label: "Annulé", className: "bg-red-500/20 text-red-400" },
};

export default function EventsListClient({ events, slug }: { events: Event[]; slug: string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Événements</h1>
          <p className="text-sm text-white/50 mt-0.5">{events.length} événement{events.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/evenements/nouveau"
          className="rounded-xl bg-[#C9A84C] px-5 py-2.5 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition"
        >
          + Créer un événement
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 p-10 text-center">
          <div className="text-4xl mb-3">📅</div>
          <h2 className="text-lg font-bold text-white mb-2">Aucun événement pour l&apos;instant</h2>
          <p className="text-sm text-white/50 mb-6">
            Créez votre premier événement et publiez-le sur votre site.
          </p>
          <Link
            href="/admin/evenements/nouveau"
            className="inline-flex rounded-xl bg-[#C9A84C] px-6 py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition"
          >
            Créer mon premier événement →
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl bg-[#0D1F3C] border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-5 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Titre</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Date</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Places</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Tarif</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Statut</th>
                  <th className="text-left px-4 py-3 text-white/40 text-xs uppercase tracking-widest font-medium">Lien</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, i) => {
                  const st = STATUS_LABELS[event.statut] ?? STATUS_LABELS.draft;
                  const eventUrl = slug ? `https://${slug}.dashclub.app/evenements/${event.slug}` : "#";
                  return (
                    <tr key={event.id} className={`border-b border-white/5 ${i % 2 === 0 ? "" : "bg-white/2"}`}>
                      <td className="px-5 py-4 font-medium text-white">{event.titre}</td>
                      <td className="px-4 py-4 text-white/60">
                        {new Date(event.date_evenement).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-4 text-white/60">{event.nb_places ?? "—"}</td>
                      <td className="px-4 py-4 text-white/60">
                        {event.tarif_standard ? `${parseFloat(event.tarif_standard).toFixed(2)} €` : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${st.className}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        {event.statut === "published" && slug ? (
                          <a
                            href={eventUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C9A84C] hover:text-[#D4B860] text-xs underline"
                          >
                            Voir →
                          </a>
                        ) : (
                          <span className="text-white/20 text-xs">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
