import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

export const metadata: Metadata = {
  title: "Mentions légales — DashClub",
  robots: { index: false },
};

export default function MentionsLegalesPage() {
  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "#f8f6f1" }}>
      <MobileNav />
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 pb-16 sm:px-8 lg:px-12">
        <div className="hidden md:block">
          <SiteHeader />
        </div>
        <div className="mx-auto mt-12 max-w-2xl">
          <h1 className="font-display text-4xl" style={{ color: "#0D1F3C" }}>
            Mentions légales
          </h1>
          <p className="mt-6 text-base leading-7" style={{ color: "#4a5568" }}>
            Cette page est en cours de rédaction. Pour toute question relative aux mentions légales,
            contactez-nous à{" "}
            <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
              hello@dashclub.fr
            </a>
            .
          </p>
          <Link href="/" className="mt-8 inline-flex text-sm font-medium" style={{ color: "#C9A84C" }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
