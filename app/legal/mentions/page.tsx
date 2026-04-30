import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Mentions légales — DashClub",
  robots: { index: false },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-3 text-xl font-bold" style={{ color: "#0D1F3C" }}>{title}</h2>
      <div className="space-y-3 text-base leading-7" style={{ color: "#4a5568" }}>
        {children}
      </div>
    </section>
  );
}

export default function MentionsLegalesPage() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "#f8f6f1" }}>
      <MobileNav />
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 pb-16 sm:px-8 lg:px-12">
        <div className="hidden md:block">
          <SiteHeader />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9A84C" }}>
            Légal
          </p>
          <h1 className="mt-2 font-display text-4xl" style={{ color: "#0D1F3C" }}>
            Mentions légales
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#9ca3af" }}>
            Dernière mise à jour : avril 2026
          </p>

          <Section title="1. Éditeur du site">
            <p>
              Le site <strong>dashclub.app</strong> est édité par la société <strong>DashClub</strong>,
              dont le siège social est situé en France.
            </p>
            <p>
              Email de contact :{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
                hello@dashclub.fr
              </a>
            </p>
          </Section>

          <Section title="2. Directeur de la publication">
            <p>
              Le directeur de la publication est le représentant légal de la société DashClub.
            </p>
          </Section>

          <Section title="3. Hébergement">
            <p>
              Le site est hébergé par :
            </p>
            <p className="pl-4 border-l-2" style={{ borderColor: "#C9A84C" }}>
              <strong>Vercel Inc.</strong><br />
              340 Pine Street, Suite 701<br />
              San Francisco, CA 94104 — États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
                vercel.com
              </a>
            </p>
            <p>
              La base de données est hébergée par <strong>Neon Inc.</strong> sur des serveurs
              localisés dans l&apos;Union européenne (région eu-central-1).
            </p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur dashclub.app (textes, images, logos,
              icônes, graphismes, charte graphique) sont la propriété exclusive de DashClub
              ou de ses partenaires, et sont protégés par les lois françaises et internationales
              relatives à la propriété intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou adaptation, quel
              que soit le moyen utilisé, est interdite sans autorisation écrite préalable de DashClub.
            </p>
          </Section>

          <Section title="5. Liens hypertextes">
            <p>
              Le site dashclub.app peut contenir des liens vers des sites tiers. DashClub
              n&apos;est pas responsable des contenus de ces sites externes et ne peut être
              tenu responsable des dommages résultant de leur consultation.
            </p>
          </Section>

          <Section title="6. Limitation de responsabilité">
            <p>
              DashClub s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des
              informations publiées. Toutefois, DashClub ne peut garantir l&apos;exactitude,
              la complétude ou l&apos;actualité des informations diffusées et décline toute
              responsabilité pour toute imprécision ou omission portant sur les informations
              disponibles sur le site.
            </p>
          </Section>

          <Section title="7. Droit applicable">
            <p>
              Le présent site et ses mentions légales sont soumis au droit français. En cas de
              litige, les tribunaux français seront seuls compétents.
            </p>
          </Section>

          <div className="mt-12 border-t pt-8" style={{ borderColor: "#e7e5e4" }}>
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#C9A84C" }}>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
