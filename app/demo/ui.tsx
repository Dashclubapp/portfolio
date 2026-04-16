import Link from "next/link";
import { club, navItems } from "./demo-data";
import { getDemoHref } from "./routing";

export function DemoLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(135deg,#f97316_0%,#fb923c_42%,#10274b_100%)] shadow-[0_14px_30px_rgba(15,23,42,0.28)]">
        <span className="font-display text-xl font-semibold tracking-[0.18em] text-white">
          CAP
        </span>
      </div>
      <div>
        <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-orange-200">
          DashClub demo
        </p>
        <p className="font-display text-2xl text-white">{club.shortName}</p>
      </div>
    </div>
  );
}

export function DemoHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#08162d]/88 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <DemoLogo />
        <nav className="flex flex-wrap items-center gap-2 text-sm text-slate-100">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={getDemoHref(item.href)}
              className="rounded-full border border-transparent px-4 py-2 transition hover:border-white/10 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={getDemoHref("/adhesion")}
            className="inline-flex items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-orange-400"
          >
            Rejoindre le club
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function DemoFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#08162d]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-orange-200">
            {club.name}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Site club fictif cree pour demonstrer le rendu public DashClub.
            Navigation complete, contenus de test et experience mobile-first.
          </p>
        </div>
        <div className="grid gap-3 text-sm text-slate-300 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-slate-400">Contact</p>
            <p className="mt-2">{club.contactEmail}</p>
            <p>{club.phone}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-slate-400">Base d&apos;entrainement</p>
            <p className="mt-2">{club.trainingBase}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function DemoPageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,34,66,0.96),rgba(12,24,44,0.92))] px-6 py-10 shadow-[0_28px_70px_rgba(8,22,45,0.34)] sm:px-8 sm:py-12">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.24),transparent_55%)]" />
      <div className="relative max-w-3xl">
        <p className="font-sans text-[11px] uppercase tracking-[0.38em] text-orange-200">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-4xl leading-none text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
          {description}
        </p>
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-sans text-[11px] uppercase tracking-[0.36em] text-orange-300">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl leading-none text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function StatusPill({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-orange-400/20 bg-orange-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-orange-200">
      {label}
    </span>
  );
}
