import { Wrench, Wallet, ClipboardList } from "lucide-react";

const CARDS = [
  {
    icon: Wrench,
    title: "Un site qui vous échappe",
    body: "Un WordPress monté il y a 5 ans par un bénévole qui a quitté le club. Des plantages, des mises à jour oubliées, une facture d'hébergeur qui grimpe. Personne au bureau ne sait comment le faire évoluer.",
    result: "Résultat : une vitrine qui dessert votre image.",
  },
  {
    icon: Wallet,
    title: "Des commissions qui rongent vos recettes",
    body: "Les plateformes classiques d'inscription prélèvent 2% à 6% sur chaque inscrit. Pour un club qui organise 3 épreuves par an à 300 inscrits, ce sont jusqu'à 1 350€ qui n'arrivent jamais sur le compte du club. Chaque saison.",
    result: "Résultat : vous travaillez pour leur plateforme, pas pour votre club.",
  },
  {
    icon: ClipboardList,
    title: "Des inscriptions bricolées à la main",
    body: "Un Google Form par-ci, un tableur Excel par-là, des virements à pointer, des relances à envoyer. Le responsable épreuve y passe ses week-ends pendant 2 mois.",
    result: "Résultat : un bénévole épuisé, des erreurs, des inscrits mécontents.",
  },
];

export function PainPoints() {
  return (
    <section className="border-t border-stone-900/10 py-8">
      <div className="rounded-[2rem] border border-stone-900/10 bg-stone-50/80 px-6 py-10 sm:px-8">
        {/* Titre */}
        <h2 className="text-center font-display text-4xl leading-tight text-stone-950 sm:text-5xl">
          Gérer un club aujourd&apos;hui, c&apos;est trois galères parallèles.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-base text-stone-600">
          Si une seule de ces situations vous parle, vous êtes au bon endroit.
        </p>

        {/* Grid de cartes */}
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {CARDS.map(({ icon: Icon, title, body, result }) => (
            <div key={title} className="flex flex-col rounded-[1.5rem] bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
              style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "rgba(201,168,76,0.12)" }}>
                <Icon className="h-5 w-5" style={{ color: "#C9A84C" }} strokeWidth={1.8} />
              </div>
              <h3 className="font-sans text-base font-semibold leading-snug" style={{ color: "#0D1F3C" }}>
                {title}
              </h3>
              <p className="mt-3 text-sm leading-7" style={{ color: "#4a5568" }}>
                {body}
              </p>
              <p className="mt-auto pt-4 text-sm italic" style={{ color: "#8a96a8" }}>
                {result}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
