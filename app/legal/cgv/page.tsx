import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente — DashClub",
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

export default function CgvPage() {
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
            Conditions Générales de Vente
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#9ca3af" }}>
            Dernière mise à jour : avril 2026
          </p>

          <Section title="1. Objet et champ d'application">
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les relations
              contractuelles entre DashClub (ci-après « le Prestataire ») et tout club ou
              association sportive souscrivant à un abonnement DashClub (ci-après « le Client »).
            </p>
            <p>
              En souscrivant à un abonnement DashClub, le Client accepte sans réserve les
              présentes CGV dans leur intégralité.
            </p>
          </Section>

          <Section title="2. Description des services">
            <p>
              DashClub est une plateforme SaaS permettant aux clubs sportifs de disposer d&apos;un
              site web clé en main incluant, selon la formule souscrite :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Un site web personnalisé avec sous-domaine en .dashclub.app</li>
              <li>La gestion des événements et des inscriptions en ligne</li>
              <li>L&apos;encaissement des paiements via Stripe Connect</li>
              <li>La gestion des adhérents et des licences sportives</li>
              <li>Un back-office d&apos;administration complet</li>
            </ul>
            <p>
              Le détail des fonctionnalités par formule est disponible sur la page{" "}
              <Link href="/pricing" style={{ color: "#C9A84C" }}>Tarifs</Link>.
            </p>
          </Section>

          <Section title="3. Tarifs et modalités de paiement">
            <p>Les tarifs applicables au moment de la souscription sont :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Formule Essentiel</strong> : 19 € HT / mois</li>
              <li><strong>Formule Compétition</strong> : 49 € HT / mois</li>
              <li><strong>Formule Illimité</strong> : 99 € HT / mois</li>
            </ul>
            <p>
              Les prix sont indiqués en euros hors taxes. La TVA applicable est celle en vigueur
              au jour de la facturation.
            </p>
            <p>
              Le paiement s&apos;effectue par carte bancaire via la plateforme sécurisée Stripe.
              L&apos;abonnement est prélevé mensuellement à la date anniversaire de la souscription.
            </p>
          </Section>

          <Section title="4. Durée, renouvellement et résiliation">
            <p>
              L&apos;abonnement est souscrit pour une durée d&apos;un mois, renouvelable tacitement
              chaque mois.
            </p>
            <p>
              Le Client peut résilier son abonnement à tout moment depuis son espace client ou
              en contactant DashClub à{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>hello@dashclub.fr</a>.
              La résiliation prend effet à la fin de la période de facturation en cours. Aucun
              remboursement prorata temporis n&apos;est effectué pour la période restante.
            </p>
            <p>
              DashClub se réserve le droit de résilier un abonnement en cas de non-paiement,
              d&apos;utilisation frauduleuse ou de violation des présentes CGV, après mise en
              demeure restée sans effet pendant 7 jours.
            </p>
          </Section>

          <Section title="5. Droit de rétractation">
            <p>
              Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de
              rétractation ne s&apos;applique pas aux contrats de services pleinement exécutés
              avant la fin du délai légal, avec l&apos;accord préalable du consommateur.
            </p>
            <p>
              Pour les clients professionnels (associations, clubs sportifs), le droit légal de
              rétractation de 14 jours ne s&apos;applique pas. DashClub peut toutefois, à titre
              commercial, convenir d&apos;une période d&apos;essai lors de la souscription.
            </p>
          </Section>

          <Section title="6. Obligations du Client">
            <p>Le Client s&apos;engage à :</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fournir des informations exactes lors de la souscription et les maintenir à jour</li>
              <li>Ne pas utiliser le service à des fins illicites ou contraires à l&apos;ordre public</li>
              <li>Respecter les droits de propriété intellectuelle de DashClub</li>
              <li>Ne pas tenter de décompiler, modifier ou altérer la plateforme DashClub</li>
              <li>Assurer la sécurité de ses identifiants de connexion</li>
            </ul>
          </Section>

          <Section title="7. Responsabilité et garanties">
            <p>
              DashClub s&apos;engage à fournir le service avec le soin attendu d&apos;un
              prestataire professionnel et vise une disponibilité de 99,5 % par mois calendaire,
              hors maintenances planifiées.
            </p>
            <p>
              DashClub ne peut être tenu responsable des dommages indirects, pertes
              d&apos;exploitation ou manque à gagner résultant de l&apos;utilisation ou de
              l&apos;indisponibilité du service.
            </p>
            <p>
              La responsabilité de DashClub est limitée aux sommes effectivement payées par le
              Client au cours des 3 derniers mois précédant le fait générateur.
            </p>
          </Section>

          <Section title="8. Propriété intellectuelle">
            <p>
              La plateforme DashClub, son code source, ses interfaces et ses contenus sont la
              propriété exclusive de DashClub. L&apos;abonnement confère au Client une licence
              d&apos;utilisation personnelle, non exclusive et non transférable.
            </p>
            <p>
              Le Client conserve la pleine propriété des contenus qu&apos;il publie (textes,
              images, données membres). DashClub n&apos;acquiert aucun droit sur ces contenus.
            </p>
          </Section>

          <Section title="9. Protection des données personnelles">
            <p>
              DashClub agit en tant que sous-traitant pour les données des adhérents et inscrits
              du Client, et en tant que responsable de traitement pour les données du Client
              lui-même.
            </p>
            <p>
              Ces traitements sont régis par notre{" "}
              <Link href="/legal/confidentialite" style={{ color: "#C9A84C" }}>
                Politique de confidentialité
              </Link>.
            </p>
          </Section>

          <Section title="10. Droit applicable et litiges">
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties
              s&apos;efforceront de trouver une solution amiable. À défaut, le litige sera soumis
              aux tribunaux compétents du ressort du siège social de DashClub.
            </p>
          </Section>

          <Section title="11. Contact">
            <p>
              Pour toute question relative aux présentes CGV :{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
                hello@dashclub.fr
              </a>
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
