import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SimpleMobileHeader } from "@/components/marketing/SimpleMobileHeader";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Blog — DashClub",
  description: "Conseils, guides et actualités pour les clubs sportifs qui utilisent DashClub.",
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "#f8f6f1" }}>
      <SimpleMobileHeader />
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 pb-16 sm:px-8 lg:px-12">
        <div className="hidden md:block">
          <SiteHeader />
        </div>
        <div className="mx-auto mt-16 max-w-2xl text-center">
          <p
            className="font-sans text-xs uppercase tracking-[0.3em]"
            style={{ color: "#C9A84C" }}
          >
            Blog DashClub
          </p>
          <h1
            className="mt-4 font-display text-4xl leading-tight sm:text-5xl"
            style={{ color: "#0D1F3C" }}
          >
            Bientôt disponible
          </h1>
          <p className="mt-5 text-base leading-7" style={{ color: "#4a5568" }}>
            Guides pratiques, conseils de gestion et actualités pour les clubs sportifs.
            Les premiers articles arrivent prochainement.
          </p>
          <p className="mt-3 text-sm" style={{ color: "#8a96a8" }}>
            En attendant, contactez-nous :{" "}
            <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
              hello@dashclub.fr
            </a>
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:opacity-90"
            style={{ backgroundColor: "#C9A84C", color: "#0D1F3C" }}
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
