import Image from "next/image";
import Link from "next/link";
import { MobileMockupSwitcher } from "./MobileMockupSwitcher";

const demoUrl = "https://demo.dashclub.app";

const REASSURANCE = [
  "0% commission",
  "Stripe direct",
  "Dès 19€/mois",
  "En ligne en 5j",
];

function MockupPill({ children }: { children: string }) {
  return (
    <span
      className="rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em]"
      style={{
        backgroundColor: "rgba(201,168,76,0.22)",
        border: "1px solid rgba(201,168,76,0.5)",
        color: "#C9A84C",
      }}
    >
      {children}
    </span>
  );
}

export function Hero() {
  return (
    <section
      className="relative grid gap-3 overflow-hidden rounded-[2rem] py-4 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-8 lg:py-6"
      style={{
        backgroundColor: "#0D1F3C",
        backgroundImage:
          "linear-gradient(135deg, rgba(13,31,60,0.86) 0%, rgba(21,46,85,0.80) 60%, rgba(13,31,60,0.90) 100%), url('/triathlon-hero.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Eyebrow — pleine largeur, centré */}
      <div className="col-span-full text-center">
        <div
          className="inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            borderColor: "rgba(201,168,76,0.4)",
            color: "#C9A84C",
            backgroundColor: "rgba(201,168,76,0.1)",
          }}
        >
          Site web · Inscriptions · Paiements — Pour clubs sportifs
        </div>
      </div>

      {/* Colonne texte */}
      <div className="relative z-10 px-5 sm:px-8 lg:pl-12 lg:pr-0">
        <h1
          className="mt-3 font-display leading-[1.05] text-white"
          style={{ fontSize: "clamp(2rem, 8vw, 3.5rem)" }}
        >
          Le club, le site, les inscriptions.<br />
          <em style={{ color: "#C9A84C", fontStyle: "italic" }}>Un seul outil.</em>
        </h1>

        <p
          className="mt-4 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          Site pro, inscriptions et paiements Stripe — sans commission.{" "}
          En ligne en 5 jours, dès 19€/mois.
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-col gap-3">
          <Link
            href="/register"
            className="inline-flex w-full items-center justify-center rounded-full px-7 py-4 text-base font-bold transition hover:-translate-y-0.5 sm:w-auto sm:self-start"
            style={{ backgroundColor: "#C9A84C", color: "#0D1F3C" }}
          >
            Lancer mon site club →
          </Link>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm font-medium underline underline-offset-4 transition hover:opacity-80 sm:text-left"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Voir la démo en 2 min
          </a>
        </div>

        {/* Puces de réassurance — grille 2×2 mobile, flex desktop */}
        <div className="relative z-20 mt-5 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-1.5">
          {REASSURANCE.map((item) => (
            <span
              key={item}
              className="inline-flex items-center justify-center gap-1 rounded-full border px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em]"
              style={{
                borderColor: "rgba(201,168,76,0.4)",
                color: "#C9A84C",
                backgroundColor: "rgba(201,168,76,0.1)",
              }}
            >
              ✓ {item}
            </span>
          ))}
        </div>
      </div>

      {/* Colonne visuel */}
      <div className="relative px-4 pb-5 sm:px-8 lg:pl-0 lg:pr-6 lg:pb-0">
        <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.14),_transparent_70%)]" />

        {/* Double mockup — desktop uniquement */}
        <div className="relative hidden lg:block" style={{ height: "340px" }}>

          {/* Arrière-plan : site public (bas-gauche, z=1) */}
          <div
            className="absolute bottom-0 left-0 overflow-hidden rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/10"
            style={{ width: "74%", zIndex: 1 }}
          >
            <Image
              src="/hero/screenshot-site-desktop.png"
              alt="Site public d'un club de triathlon — powered by DashClub"
              width={600}
              height={340}
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute" style={{ bottom: 12, left: 10, zIndex: 2 }}>
            <MockupPill>Site public</MockupPill>
          </div>

          {/* Premier plan : back-office (haut-droite, z=3) */}
          <div
            className="absolute top-0 right-0 overflow-hidden rounded-xl shadow-[0_28px_80px_rgba(0,0,0,0.70)] ring-1 ring-white/15"
            style={{ width: "71%", zIndex: 3 }}
          >
            <Image
              src="/hero/screenshot-backoffice-desktop.png"
              alt="Back-office DashClub — tableau de bord club sportif"
              width={560}
              height={320}
              className="w-full"
              style={{ display: "block" }}
            />
          </div>
          <div className="absolute" style={{ top: 10, right: 10, zIndex: 4 }}>
            <MockupPill>Back-office</MockupPill>
          </div>
        </div>

        {/* Mobile : tab switcher Site public / Back-office */}
        <MobileMockupSwitcher />
      </div>
    </section>
  );
}
