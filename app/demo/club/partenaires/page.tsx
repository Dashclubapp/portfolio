import { usmPartners } from "../../usm-data";

export default function PartenairesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-widest text-[#C9A84C]">
          Nos soutiens
        </p>
        <h1
          className="mt-2 text-4xl font-bold text-[#0D1F3C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Partenaires du club
        </h1>
        <p className="mt-3 text-[#0D1F3C]/60">
          L&apos;USM Triathlon est soutenu par des acteurs locaux engagés dans le développement du
          sport en Île-de-France.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {usmPartners.map((partner) => (
          <div
            key={partner.name}
            className="rounded-2xl border border-[#0D1F3C]/10 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-2xl font-bold text-white"
                style={{ backgroundColor: partner.color }}
              >
                {partner.initials}
              </div>
              <div>
                <h3
                  className="text-xl font-bold text-[#0D1F3C]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {partner.name}
                </h3>
                <p className="mt-1 text-sm text-[#0D1F3C]/60">{partner.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl bg-[#0D1F3C] p-8 text-center text-white">
        <h2
          className="text-2xl font-bold"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Intéressé par un partenariat ?
        </h2>
        <p className="mt-3 text-white/70">
          Rejoignez nos partenaires et soutenez le développement du triathlon dans les Yvelines.
        </p>
        <a
          href="mailto:hello@usm-triathlon.fr"
          className="mt-6 inline-flex items-center rounded-full bg-[#C9A84C] px-6 py-3 font-semibold text-[#0D1F3C] transition hover:bg-[#e2c170]"
        >
          Contactez-nous →
        </a>
      </div>
    </div>
  );
}
