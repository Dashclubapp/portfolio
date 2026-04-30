import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Politique de confidentialité — DashClub",
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

export default function ConfidentialitePage() {
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
            Politique de confidentialité
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#9ca3af" }}>
            Dernière mise à jour : avril 2026 — Conforme RGPD (UE) 2016/679
          </p>

          <Section title="1. Responsable du traitement">
            <p>
              Le responsable du traitement des données personnelles collectées sur dashclub.app
              est la société <strong>DashClub</strong>, joignable à :{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
                hello@dashclub.fr
              </a>
            </p>
          </Section>

          <Section title="2. Données collectées et finalités">
            <p>DashClub collecte uniquement les données nécessaires au fonctionnement du service :</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm mt-3">
                <thead>
                  <tr style={{ backgroundColor: "#f1ede4" }}>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Données</th>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Finalité</th>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Base légale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Nom, prénom, email du responsable", "Création et gestion du compte", "Exécution du contrat"],
                    ["Coordonnées de facturation", "Facturation et paiement", "Exécution du contrat"],
                    ["Données de navigation (logs, IP)", "Sécurité et débogage", "Intérêt légitime"],
                    ["Contenu du formulaire de contact", "Traitement de votre demande", "Intérêt légitime"],
                  ].map(([d, f, b], i) => (
                    <tr key={i}>
                      <td className="border p-3" style={{ borderColor: "#e2ddd5" }}>{d}</td>
                      <td className="border p-3" style={{ borderColor: "#e2ddd5" }}>{f}</td>
                      <td className="border p-3" style={{ borderColor: "#e2ddd5" }}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Données des adhérents de clubs (sous-traitance)">
            <p>
              Lorsque les clubs utilisent DashClub pour gérer leurs adhérents et inscriptions,
              DashClub agit en tant que <strong>sous-traitant</strong> au sens de l&apos;article 28
              du RGPD. Le club reste seul responsable du traitement des données de ses membres.
            </p>
            <p>
              DashClub n&apos;utilise pas ces données à ses propres fins et ne les revend jamais.
              Un contrat de sous-traitance conforme au RGPD est disponible sur demande à{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>hello@dashclub.fr</a>.
            </p>
          </Section>

          <Section title="4. Destinataires et transferts">
            <p>Les données peuvent être transmises aux sous-traitants suivants :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stripe</strong> — paiements (États-Unis, clauses contractuelles types UE)</li>
              <li><strong>Vercel</strong> — hébergement (États-Unis, clauses contractuelles types UE)</li>
              <li><strong>Neon</strong> — base de données (UE, région eu-central-1)</li>
              <li><strong>Resend</strong> — emails transactionnels (États-Unis, clauses contractuelles types UE)</li>
            </ul>
            <p>
              Ces transferts hors UE sont encadrés par des garanties appropriées conformément
              au RGPD (clauses contractuelles types approuvées par la Commission européenne).
            </p>
          </Section>

          <Section title="5. Durée de conservation">
            <ul className="list-disc pl-6 space-y-1">
              <li>Données de compte : durée de l&apos;abonnement + 3 ans après résiliation</li>
              <li>Données de facturation : 10 ans (obligation légale comptable)</li>
              <li>Logs de connexion : 12 mois</li>
              <li>Demandes de contact : 3 ans</li>
            </ul>
          </Section>

          <Section title="6. Vos droits (RGPD)">
            <p>
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des
              droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Accès</strong> — obtenir une copie de vos données</li>
              <li><strong>Rectification</strong> — corriger des données inexactes</li>
              <li><strong>Effacement</strong> — demander la suppression (« droit à l&apos;oubli »)</li>
              <li><strong>Portabilité</strong> — recevoir vos données dans un format structuré</li>
              <li><strong>Opposition</strong> — vous opposer à certains traitements</li>
              <li><strong>Limitation</strong> — restreindre temporairement le traitement</li>
            </ul>
            <p>
              Pour exercer ces droits, écrivez à{" "}
              <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>hello@dashclub.fr</a>.
              Réponse sous 30 jours. Vous pouvez également introduire une réclamation auprès de
              la{" "}
              <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
                CNIL
              </a>.
            </p>
          </Section>

          <Section title="7. Sécurité">
            <p>
              DashClub met en œuvre des mesures techniques et organisationnelles appropriées :
              chiffrement des communications (HTTPS/TLS), hachage des mots de passe (bcrypt),
              contrôle des accès par rôles, journalisation des accès aux données sensibles.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              Pour toute information sur les cookies, consultez notre{" "}
              <Link href="/legal/cookies" style={{ color: "#C9A84C" }}>
                Politique de cookies
              </Link>.
            </p>
          </Section>

          <Section title="9. Modifications">
            <p>
              En cas de modification substantielle, nous vous informerons par email. La date de
              mise à jour est indiquée en haut de cette page.
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
