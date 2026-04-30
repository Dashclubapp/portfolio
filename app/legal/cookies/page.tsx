import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Politique de cookies — DashClub",
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

export default function CookiesPage() {
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
            Politique de cookies
          </h1>
          <p className="mt-3 text-sm" style={{ color: "#9ca3af" }}>
            Dernière mise à jour : avril 2026
          </p>

          <Section title="1. Qu'est-ce qu'un cookie ?">
            <p>
              Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
              smartphone) lors de votre visite sur un site web. Il permet de mémoriser certaines
              informations pour améliorer votre expérience et assurer le fonctionnement du service.
            </p>
          </Section>

          <Section title="2. Cookies déposés par DashClub">
            <p>
              Le site dashclub.app utilise uniquement des cookies <strong>strictement nécessaires</strong>{" "}
              au fonctionnement du service. Aucun cookie publicitaire ni traceur tiers
              de ciblage n&apos;est utilisé.
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ backgroundColor: "#f1ede4" }}>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Nom</th>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Type</th>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Finalité</th>
                    <th className="border p-3 text-left font-semibold" style={{ borderColor: "#e2ddd5", color: "#0D1F3C" }}>Durée</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["__session", "Nécessaire", "Authentification du compte administrateur", "24 heures"],
                    ["dashclub_access", "Nécessaire", "Accès à la documentation partenaires", "Session"],
                  ].map(([name, type, purpose, duration], i) => (
                    <tr key={i}>
                      <td className="border p-3 font-mono text-xs" style={{ borderColor: "#e2ddd5" }}>{name}</td>
                      <td className="border p-3" style={{ borderColor: "#e2ddd5" }}>{type}</td>
                      <td className="border p-3" style={{ borderColor: "#e2ddd5" }}>{purpose}</td>
                      <td className="border p-3 whitespace-nowrap" style={{ borderColor: "#e2ddd5" }}>{duration}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="3. Cookies tiers">
            <p>Certains services intégrés peuvent déposer leurs propres cookies :</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Stripe</strong> — cookies de sécurité lors du processus de paiement.{" "}
                <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
                  Politique Stripe
                </a>
              </li>
              <li>
                <strong>Cloudflare Turnstile</strong> — protection anti-robots des formulaires.{" "}
                <a href="https://www.cloudflare.com/fr-fr/privacypolicy/" target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
                  Politique Cloudflare
                </a>
              </li>
            </ul>
          </Section>

          <Section title="4. Base légale">
            <p>
              Les cookies strictement nécessaires sont exemptés de consentement préalable en
              vertu de l&apos;article 82 de la loi Informatique et Libertés, car ils sont
              indispensables au fonctionnement du service demandé.
            </p>
            <p>
              DashClub ne dépose aucun cookie nécessitant votre consentement préalable (cookies
              analytiques, publicitaires ou de réseaux sociaux).
            </p>
          </Section>

          <Section title="5. Comment gérer les cookies ?">
            <p>
              Vous pouvez configurer votre navigateur pour refuser ou supprimer les cookies.
              Notez que la désactivation des cookies nécessaires peut altérer le fonctionnement
              du service.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              {[
                ["Google Chrome", "https://support.google.com/chrome/answer/95647"],
                ["Mozilla Firefox", "https://support.mozilla.org/fr/kb/activer-desactiver-cookies"],
                ["Apple Safari", "https://support.apple.com/fr-fr/guide/safari/sfri11471/mac"],
                ["Microsoft Edge", "https://support.microsoft.com/fr-fr/windows/supprimer-et-g%C3%A9rer-les-cookies-168dab11-0753-043d-7c16-ede5947fc64d"],
              ].map(([browser, url]) => (
                <li key={browser}>
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#C9A84C" }}>
                    {browser}
                  </a>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="6. Contact">
            <p>
              Pour toute question :{" "}
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
