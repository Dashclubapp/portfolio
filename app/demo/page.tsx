import Link from "next/link";

export default function DemoEntryPage() {
  return (
    <div className="min-h-screen bg-[#F8F6F1]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Demo banner */}
      <div className="bg-[#152e55] px-4 py-3 text-center text-sm text-white/80">
        ℹ️ Toutes les données sont fictives. Aucun paiement réel. Aucune inscription réelle.
      </div>

      {/* Header */}
      <header className="border-b border-[#0D1F3C]/10 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0D1F3C]">
              <span className="text-xs font-bold text-[#C9A84C]">DC</span>
            </div>
            <span className="font-semibold text-[#0D1F3C]" style={{ fontFamily: "'Playfair Display', serif" }}>
              DashClub
            </span>
          </div>
          <Link
            href="/"
            className="text-sm text-[#0D1F3C]/60 transition hover:text-[#0D1F3C]"
          >
            ← Retour sur dashclub.app
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0D1F3C] px-6 py-24 text-center">
        <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_30%_50%,#C9A84C,transparent_50%),radial-gradient(circle_at_70%_50%,#1a3a6e,transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl">
          <span className="inline-block rounded-full border border-[#C9A84C]/30 bg-[#C9A84C]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#C9A84C]">
            Démo interactive
          </span>
          <h1
            className="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Découvrez DashClub en action
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Explorez le produit complet — site public du club + interface d&apos;administration — avec des données réalistes.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/demo/club"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-4 text-base font-semibold text-[#0D1F3C] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e2c170]"
            >
              🌐 Voir le site public du club →
            </Link>
            <Link
              href="/demo/admin"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              ⚙️ Explorer l&apos;interface d&apos;administration →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2
            className="mb-12 text-center text-3xl font-bold text-[#0D1F3C]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ce que vous allez voir
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: "🌐",
                title: "Site public moderne",
                description:
                  "Accueil du club, liste des événements avec inscriptions, formulaire d'adhésion, partenaires et contact. Tout ce que les membres voient.",
              },
              {
                icon: "⚙️",
                title: "Dashboard complet",
                description:
                  "KPIs en temps réel, gestion des inscrits, emails automatiques configurables, suivi des adhérents et boutique en ligne.",
              },
              {
                icon: "💳",
                title: "Paiements Stripe",
                description:
                  "Simulation du flux de paiement — inscriptions, adhésions et boutique. Les fonds arrivent directement sur le compte du club.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-8 shadow-sm"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3
                  className="mb-3 text-xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#0D1F3C]/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Club intro */}
      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-[#C9A84C]/20 bg-[#0D1F3C]/[0.02] p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#0D1F3C] text-center">
                <div>
                  <div className="text-xs font-bold text-[#C9A84C]">USM</div>
                  <div className="text-[10px] text-white/60">TRI</div>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-[#C9A84C]">
                  Club fictif de démo
                </p>
                <h3
                  className="mt-1 text-2xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Union Sportive de Mézy (USM Triathlon)
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#0D1F3C]/60">
                  Club de triathlon à Mézy-sur-Seine depuis 1998. 142 adhérents actifs, 3 événements par saison.
                  Ce club fictif illustre toutes les fonctionnalités DashClub avec des données réalistes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0D1F3C] px-6 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <h2
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Prêt à lancer votre club ?
          </h2>
          <p className="mt-4 text-white/70">
            Démarrez en 5 minutes — site public, gestion des événements et paiements inclus.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#C9A84C] px-8 py-4 text-base font-semibold text-[#0D1F3C] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#e2c170]"
          >
            Démarrer avec DashClub →
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0a192f] px-6 py-8 text-center text-xs text-white/40">
        <p>© 2025 DashClub — Tous droits réservés</p>
        <p className="mt-1">Données fictives à des fins de démonstration uniquement.</p>
      </footer>
    </div>
  );
}
