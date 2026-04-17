import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex flex-col gap-5 rounded-[2rem] border border-stone-900/10 bg-white/90 px-5 py-5 backdrop-blur-sm sm:px-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="inline-flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-dashclub-real.svg"
            alt="DashClub"
            height={44}
            style={{ height: "44px", width: "auto" }}
          />
        </Link>
        <span className="text-xl font-bold tracking-[0.08em] text-[#C9A84C] sm:text-2xl">
          DashClub
        </span>
      </div>
      <nav className="flex flex-wrap items-center gap-3 text-sm text-stone-700">
        <Link className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="/#produit">
          Le produit
        </Link>
        <Link className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="/pricing">
          Tarifs
        </Link>
        <Link className="rounded-full px-3 py-2 transition hover:bg-stone-900/5" href="/compare">
          Comparer
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
        >
          Lancer mon site club →
        </Link>
      </nav>
    </header>
  );
}
