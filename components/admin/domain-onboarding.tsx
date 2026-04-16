"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type RegistrarId =
  | "ovh"
  | "ionos"
  | "gandi"
  | "namecheap"
  | "cloudflare"
  | "godaddy"
  | "lws"
  | "infomaniak"
  | "other";

type Screen = "start" | "purchase" | "domain" | "registrar" | "guide" | "verify";

type RegistrarGuide = {
  id: RegistrarId;
  name: string;
  summary: string;
  portalLabel: string;
  dnsLocation: string;
  helperLabel: string;
  helperNote: string;
  steps: string[];
  menu: string[];
  accent: string;
};

const registrarOptions: Array<{ value: RegistrarId; label: string }> = [
  { value: "ovh", label: "OVH / OVHcloud" },
  { value: "ionos", label: "Ionos (1&1)" },
  { value: "gandi", label: "Gandi" },
  { value: "namecheap", label: "Namecheap" },
  { value: "cloudflare", label: "Cloudflare" },
  { value: "godaddy", label: "GoDaddy" },
  { value: "lws", label: "LWS" },
  { value: "infomaniak", label: "Infomaniak" },
  { value: "other", label: "Autre" },
];

const guides: Record<RegistrarId, RegistrarGuide> = {
  ovh: {
    id: "ovh",
    name: "OVHcloud",
    summary: "Guide prioritaire pour les clubs hébergés chez OVH.",
    portalLabel: "Espace client OVHcloud",
    dnsLocation: "Zone DNS > Ajouter une entrée",
    helperLabel: "Menu clé",
    helperNote: "Passez par le produit Domaine puis ouvrez la zone DNS.",
    steps: [
      "Connectez-vous à votre espace client OVHcloud avec le compte qui gère le domaine.",
      "Ouvrez le domaine concerné, puis allez dans Zone DNS.",
      "Ajoutez ou modifiez les entrées demandées par DashClub. Si une entrée existe déjà, éditez-la plutôt que d'en créer une seconde.",
    ],
    menu: ["Web Cloud", "Domaines", "Zone DNS", "Ajouter une entrée"],
    accent: "from-[#f2994a]/30 via-[#f7f1e6] to-white",
  },
  ionos: {
    id: "ionos",
    name: "Ionos",
    summary: "Guide prioritaire pour les clubs qui ont acheté leur domaine chez Ionos.",
    portalLabel: "Console Ionos",
    dnsLocation: "Domaines & SSL > DNS > Modifier",
    helperLabel: "Menu clé",
    helperNote: "Cherchez le domaine, puis entrez dans les réglages DNS.",
    steps: [
      "Connectez-vous à Ionos et ouvrez la rubrique Domaines & SSL.",
      "Choisissez votre domaine puis cliquez sur DNS.",
      "Utilisez Modifier pour mettre à jour les deux enregistrements. Laissez les autres lignes inchangées si elles ne concernent pas le site principal.",
    ],
    menu: ["Accueil", "Domaines & SSL", "DNS", "Modifier"],
    accent: "from-[#8cc9ff]/26 via-[#eef7ff] to-white",
  },
  gandi: {
    id: "gandi",
    name: "Gandi",
    summary: "Guide prioritaire pour les clubs présents chez Gandi.",
    portalLabel: "Tableau de bord Gandi",
    dnsLocation: "Domaines > Enregistrements DNS",
    helperLabel: "Menu clé",
    helperNote: "La zone DNS s'ouvre depuis la fiche du domaine.",
    steps: [
      "Connectez-vous à Gandi puis ouvrez le domaine à connecter.",
      "Allez dans l'onglet Enregistrements DNS.",
      "Remplacez les entrées existantes pour @ et www si besoin, puis enregistrez la zone.",
    ],
    menu: ["Domaines", "Nom du domaine", "Enregistrements DNS", "Enregistrer"],
    accent: "from-[#9ed6b3]/28 via-[#eef7ef] to-white",
  },
  namecheap: {
    id: "namecheap",
    name: "Namecheap",
    summary: "Guide générique adapté à Namecheap.",
    portalLabel: "Tableau de bord Namecheap",
    dnsLocation: "Domain List > Advanced DNS",
    helperLabel: "Repère",
    helperNote: "Cherchez l'onglet Advanced DNS pour gérer les enregistrements.",
    steps: [
      "Connectez-vous à votre espace Namecheap.",
      "Ouvrez Domain List puis Advanced DNS.",
      "Mettez à jour les enregistrements @ et www avec les valeurs DashClub.",
    ],
    menu: ["Domain List", "Manage", "Advanced DNS", "Host Records"],
    accent: "from-[#f6d98b]/30 via-[#fff9ed] to-white",
  },
  cloudflare: {
    id: "cloudflare",
    name: "Cloudflare",
    summary: "Guide générique adapté à Cloudflare.",
    portalLabel: "Dashboard Cloudflare",
    dnsLocation: "Websites > DNS > Records",
    helperLabel: "Repère",
    helperNote: "Vérifiez que le proxy orange est désactivé pour le CNAME www pendant la connexion initiale si besoin.",
    steps: [
      "Connectez-vous au dashboard Cloudflare.",
      "Ouvrez le site puis l'onglet DNS.",
      "Ajoutez ou modifiez les records @ et www pour pointer vers DashClub.",
    ],
    menu: ["Websites", "DNS", "Records", "Add record"],
    accent: "from-[#ffb46e]/32 via-[#fff2e4] to-white",
  },
  godaddy: {
    id: "godaddy",
    name: "GoDaddy",
    summary: "Guide générique adapté à GoDaddy.",
    portalLabel: "Compte GoDaddy",
    dnsLocation: "Mes produits > DNS",
    helperLabel: "Repère",
    helperNote: "L'action DNS se trouve au niveau du produit Domaine.",
    steps: [
      "Connectez-vous à GoDaddy.",
      "Ouvrez Mes produits puis DNS sur le domaine concerné.",
      "Modifiez les enregistrements demandés et sauvegardez.",
    ],
    menu: ["Mes produits", "Domaines", "DNS", "Save"],
    accent: "from-[#d8d2ff]/28 via-[#f4f1ff] to-white",
  },
  lws: {
    id: "lws",
    name: "LWS",
    summary: "Guide générique adapté à LWS.",
    portalLabel: "Panel LWS",
    dnsLocation: "Nom de domaine > Zone DNS",
    helperLabel: "Repère",
    helperNote: "Cherchez la section Zone DNS dans le panel du domaine.",
    steps: [
      "Connectez-vous à votre compte LWS.",
      "Ouvrez le nom de domaine puis la Zone DNS.",
      "Ajoutez ou modifiez les records en gardant uniquement une version active de @ et de www.",
    ],
    menu: ["Nom de domaine", "Administration", "Zone DNS", "Ajouter"],
    accent: "from-[#ffd9d0]/28 via-[#fff1ee] to-white",
  },
  infomaniak: {
    id: "infomaniak",
    name: "Infomaniak",
    summary: "Guide générique adapté à Infomaniak.",
    portalLabel: "Manager Infomaniak",
    dnsLocation: "Domaines > Zone DNS",
    helperLabel: "Repère",
    helperNote: "Le gestionnaire DNS est dans le manager du domaine.",
    steps: [
      "Connectez-vous à Infomaniak.",
      "Entrez dans le domaine puis dans la Zone DNS.",
      "Mettez à jour les entrées A et CNAME puis validez.",
    ],
    menu: ["Domaines", "Nom du domaine", "Zone DNS", "Valider"],
    accent: "from-[#f7c9ff]/24 via-[#fff0ff] to-white",
  },
  other: {
    id: "other",
    name: "Autre registrar",
    summary: "Guide générique pour tout autre prestataire.",
    portalLabel: "Espace client du registrar",
    dnsLocation: "Section Domaine > DNS > Zone ou Enregistrements",
    helperLabel: "Repère",
    helperNote: "Cherchez les mots DNS, Zone DNS, Records ou Enregistrements.",
    steps: [
      "Connectez-vous au compte qui a servi à acheter le domaine.",
      "Ouvrez le domaine, puis la section DNS, Zone DNS ou Enregistrements.",
      "Créez ou modifiez les deux lignes demandées par DashClub et enregistrez les changements.",
    ],
    menu: ["Compte", "Nom de domaine", "DNS", "Enregistrer"],
    accent: "from-[#d2e0ef]/28 via-[#f5f8fb] to-white",
  },
};

const stepLabels = ["Domaine", "Registrar", "DNS", "Vérification"];

const helpHref =
  "mailto:hello@dashclub.fr?subject=Aide%20connexion%20domaine%20DashClub";

function normalizeDomain(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .replace(/\.$/, "");
}

function isValidDomain(value: string) {
  return /^(?!-)(?:[a-z0-9-]{1,63}\.)+[a-z]{2,}$/i.test(value);
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {stepLabels.map((label, index) => {
        const step = index + 1;
        const state =
          step < currentStep ? "done" : step === currentStep ? "current" : "upcoming";

        return (
          <div
            key={label}
            className={`rounded-[1.4rem] border px-4 py-4 transition ${
              state === "done"
                ? "border-emerald-200 bg-emerald-50"
                : state === "current"
                  ? "border-orange-300 bg-orange-50"
                  : "border-stone-200 bg-stone-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                  state === "done"
                    ? "bg-emerald-600 text-white"
                    : state === "current"
                      ? "bg-stone-950 text-white"
                      : "bg-white text-stone-500"
                }`}
              >
                {state === "done" ? "✓" : step}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.26em] text-stone-500">
                  Étape {step}/4
                </p>
                <p className="mt-1 text-sm font-medium text-stone-900">{label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function HelpFooter() {
  return (
    <div className="mt-8 flex flex-col gap-3 rounded-[1.4rem] border border-stone-900/10 bg-stone-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-stone-900">
          Besoin d&apos;aide ? Contactez-nous
        </p>
        <p className="mt-1 text-sm text-stone-600">
          Nous pouvons vous guider pendant le transfert ou vérifier vos DNS avec vous.
        </p>
      </div>
      <a
        className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
        href={helpHref}
      >
        Écrire à hello@dashclub.fr
      </a>
    </div>
  );
}

function RegistrarMockup({ guide }: { guide: RegistrarGuide }) {
  return (
    <div
      className={`overflow-hidden rounded-[1.8rem] border border-stone-900/10 bg-gradient-to-br ${guide.accent} p-4 shadow-[0_18px_50px_rgba(28,25,23,0.08)]`}
    >
      <div className="rounded-[1.5rem] border border-stone-900/10 bg-white/92 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-stone-500">
              Illustration simple
            </p>
            <p className="mt-2 font-display text-2xl leading-none text-stone-950">
              {guide.portalLabel}
            </p>
          </div>
          <div className="rounded-full bg-stone-950 px-3 py-1.5 text-xs font-medium text-white">
            {guide.name}
          </div>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[1.2rem] bg-stone-950 p-3 text-white">
            <p className="text-[10px] uppercase tracking-[0.28em] text-stone-400">
              {guide.helperLabel}
            </p>
            <div className="mt-3 space-y-2">
              {guide.menu.map((item, index) => (
                <div
                  key={item}
                  className={`rounded-xl border px-3 py-2 text-sm ${
                    index === guide.menu.length - 1
                      ? "border-orange-300/60 bg-orange-500/20 text-white"
                      : "border-white/10 text-slate-200"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.2rem] border border-stone-900/10 bg-[#f8f4ed] p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-sans text-[10px] uppercase tracking-[0.28em] text-stone-500">
                Zone DNS
              </p>
              <div className="rounded-full bg-white px-3 py-1 text-xs text-stone-600">
                {guide.dnsLocation}
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-[1rem] border border-stone-900/10 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-stone-900">A</span>
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-xs text-orange-700">
                    @
                  </span>
                  <span className="text-stone-600">76.76.21.21</span>
                </div>
              </div>
              <div className="rounded-[1rem] border border-stone-900/10 bg-white px-4 py-3">
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-stone-900">CNAME</span>
                  <span className="rounded-full bg-orange-50 px-2 py-1 text-xs text-orange-700">
                    www
                  </span>
                  <span className="text-stone-600">sites.dashclub.app</span>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-stone-600">
              {guide.helperNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RecordCard({
  type,
  host,
  value,
  note,
}: {
  type: string;
  host: string;
  value: string;
  note: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-stone-900/10 bg-white px-4 py-4 shadow-[0_12px_30px_rgba(28,25,23,0.04)]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-stone-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
          {type}
        </span>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
          {host}
        </span>
      </div>
      <p className="mt-3 font-mono text-sm text-stone-800">{value}</p>
      <p className="mt-2 text-sm leading-6 text-stone-600">{note}</p>
    </div>
  );
}

export function DomainOnboarding() {
  const [screen, setScreen] = useState<Screen>("start");
  const [domainInput, setDomainInput] = useState("");
  const [domain, setDomain] = useState("");
  const [domainError, setDomainError] = useState("");
  const [registrar, setRegistrar] = useState<RegistrarId | "">("");
  const [otherRegistrar, setOtherRegistrar] = useState("");
  const [verificationState, setVerificationState] = useState<
    "idle" | "checking" | "pending" | "success"
  >("idle");
  const [verificationCount, setVerificationCount] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const selectedGuide = guides[(registrar || "other") as RegistrarId];
  const registrarName =
    registrar === "other" && otherRegistrar.trim() ? otherRegistrar.trim() : selectedGuide.name;

  const currentStep =
    screen === "domain"
      ? 1
      : screen === "registrar"
        ? 2
        : screen === "guide"
          ? 3
          : screen === "verify"
            ? 4
            : 0;

  function startVerification() {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }

    setScreen("verify");
    setVerificationState("checking");

    const nextCount = verificationCount + 1;
    setVerificationCount(nextCount);

    timerRef.current = window.setTimeout(() => {
      setVerificationState(nextCount > 1 ? "success" : "pending");
    }, 2200);
  }

  function handleDomainContinue() {
    const normalized = normalizeDomain(domainInput);

    if (!isValidDomain(normalized)) {
      setDomainError("Entrez un nom de domaine valide, par exemple monclub.fr.");
      return;
    }

    setDomain(normalized);
    setDomainInput(normalized);
    setDomainError("");
    setScreen("registrar");
  }

  function handleRegistrarContinue() {
    if (!registrar) {
      return;
    }

    if (registrar === "other" && !otherRegistrar.trim()) {
      return;
    }

    setScreen("guide");
  }

  return (
    <section className="rounded-[2rem] border border-stone-900/10 bg-white p-5 shadow-[0_28px_80px_rgba(28,25,23,0.08)] sm:p-7">
      <div className="flex flex-col gap-4 border-b border-stone-900/10 pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-orange-700">
            Paramètres &gt; Domaine personnalisé
          </span>
          <span className="rounded-full border border-stone-200 bg-stone-50 px-3 py-1 text-xs text-stone-600">
            Mobile friendly
          </span>
        </div>
        <div className="max-w-3xl">
          <h2 className="font-display text-4xl leading-none text-stone-950 sm:text-[3.4rem]">
            Votre domaine
          </h2>
          <p className="mt-3 text-base leading-7 text-stone-600 sm:text-lg">
            Un parcours simple pour connecter votre nom de domaine à DashClub,
            même si vous n&apos;avez jamais touché à un réglage DNS.
          </p>
        </div>
      </div>

      {(screen === "domain" || screen === "registrar" || screen === "guide" || screen === "verify") && (
        <div className="mt-6">
          <Stepper currentStep={currentStep} />
        </div>
      )}

      {screen === "start" && (
        <div className="mt-8 grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="rounded-[1.8rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Point de départ
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
              Choisissez votre situation.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Votre site est déjà disponible en `monclub.dashclub.app`. Ce module
              vous accompagne si vous voulez brancher `monclub.fr` ou acheter un
              nouveau domaine.
            </p>

            <div className="mt-6 grid gap-4">
              <button
                type="button"
                onClick={() => setScreen("domain")}
                className="group rounded-[1.5rem] border border-stone-900/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-stone-900/20 hover:shadow-[0_14px_34px_rgba(28,25,23,0.08)]"
              >
                <p className="text-sm font-semibold text-stone-950">
                  J&apos;ai déjà un nom de domaine
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Saisissez votre domaine, choisissez votre registrar et suivez un
                  guide pas à pas.
                </p>
                <p className="mt-4 text-sm font-medium text-orange-700">
                  Ouvrir le flux de connexion →
                </p>
              </button>

              <button
                type="button"
                onClick={() => setScreen("purchase")}
                className="group rounded-[1.5rem] border border-stone-900/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-stone-900/20 hover:shadow-[0_14px_34px_rgba(28,25,23,0.08)]"
              >
                <p className="text-sm font-semibold text-stone-950">
                  Je veux acheter un nouveau nom de domaine
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Nous recommandons Cloudflare Registrar pour son coût et sa
                  simplicité côté DNS.
                </p>
                <p className="mt-4 text-sm font-medium text-orange-700">
                  Voir la recommandation →
                </p>
              </button>

              <Link
                href="/admin"
                className="group rounded-[1.5rem] border border-stone-900/10 bg-white p-5 text-left transition hover:-translate-y-0.5 hover:border-stone-900/20 hover:shadow-[0_14px_34px_rgba(28,25,23,0.08)]"
              >
                <p className="text-sm font-semibold text-stone-950">
                  Je reste sur monclub.dashclub.app pour l&apos;instant
                </p>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  Revenez plus tard, votre site DashClub reste accessible
                  immédiatement.
                </p>
                <p className="mt-4 text-sm font-medium text-stone-700">
                  Revenir au back-office →
                </p>
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-stone-900/10 bg-stone-950 p-5 text-white sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-orange-200/80">
              Ce que DashClub attend
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-white">
              Deux lignes DNS à modifier.
            </h3>
            <div className="mt-6 grid gap-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">A record</p>
                <p className="mt-2 font-mono text-sm text-white">@ → 76.76.21.21</p>
              </div>
              <div className="rounded-[1.3rem] border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">CNAME</p>
                <p className="mt-2 font-mono text-sm text-white">
                  www → sites.dashclub.app
                </p>
              </div>
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Les changements DNS prennent parfois effet rapidement, mais la
              propagation complète peut durer entre 15 minutes et 48 heures.
            </p>
          </div>
        </div>
      )}

      {screen === "purchase" && (
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.06fr_0.94fr]">
          <div className="rounded-[1.8rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Flux B
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
              Acheter un nouveau domaine
            </h3>
            <p className="mt-4 text-base leading-7 text-stone-600">
              Nous recommandons Cloudflare Registrar pour son prix coûtant,
              autour de 10€/an pour un `.fr` ou un `.app`, et pour une gestion DNS
              simple à reprendre ensuite dans DashClub.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="https://registrar.cloudflare.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Ouvrir Cloudflare Registrar
              </a>
              <button
                type="button"
                onClick={() => setScreen("start")}
                className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-stone-50"
              >
                Revenir au choix
              </button>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-orange-200 bg-orange-50 px-4 py-4 text-sm leading-7 text-orange-900">
              Une fois votre domaine acheté, revenez ici et suivez le flux
              <span className="font-semibold"> “J&apos;ai déjà un nom de domaine”</span>.
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Pourquoi ce choix
            </p>
            <div className="mt-5 space-y-4">
              {[
                "Tarification proche du coût réel du registre, sans marge cachée.",
                "Interface DNS claire pour ajouter l'enregistrement A et le CNAME www.",
                "Changement de nameservers et de zone DNS plus simple à relire avec le support DashClub.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-stone-900/10 bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "domain" && (
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Étape A1
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
              Quel est votre nom de domaine ?
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Entrez le domaine que vous possédez déjà, par exemple `monclub.fr`.
            </p>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-stone-800">
                Nom de domaine
              </span>
              <input
                type="text"
                inputMode="url"
                autoComplete="off"
                placeholder="monclub.fr"
                value={domainInput}
                onChange={(event) => setDomainInput(event.target.value)}
                className="w-full rounded-[1.2rem] border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950"
              />
            </label>

            {domainError && (
              <p className="mt-3 text-sm text-red-600">{domainError}</p>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDomainContinue}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
              >
                Continuer
              </button>
              <button
                type="button"
                onClick={() => setScreen("start")}
                className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-stone-50"
              >
                Retour
              </button>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Conseil DashClub
            </p>
            <p className="mt-3 text-base leading-7 text-stone-700">
              Entrez uniquement le domaine principal, sans `https://` et sans
              chemin. Exemple correct: `monclub.fr`.
            </p>

            <div className="mt-6 rounded-[1.4rem] border border-stone-900/10 bg-stone-50 px-4 py-4">
              <p className="text-sm font-medium text-stone-900">Après cette étape</p>
              <p className="mt-2 text-sm leading-7 text-stone-600">
                Nous vous demanderons chez quel prestataire vous avez acheté le
                domaine pour afficher les bonnes instructions.
              </p>
            </div>
          </div>
        </div>
      )}

      {screen === "registrar" && (
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Étape A2
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
              Chez quel prestataire avez-vous acheté ce domaine ?
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Domaine détecté: <span className="font-semibold text-stone-950">{domain}</span>
            </p>

            <label className="mt-6 block">
              <span className="mb-2 block text-sm font-medium text-stone-800">
                Registrar
              </span>
              <select
                value={registrar}
                onChange={(event) => setRegistrar(event.target.value as RegistrarId)}
                className="w-full rounded-[1.2rem] border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950"
              >
                <option value="">Choisir un prestataire</option>
                {registrarOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {registrar === "other" && (
              <label className="mt-4 block">
                <span className="mb-2 block text-sm font-medium text-stone-800">
                  Précisez le nom du prestataire
                </span>
                <input
                  type="text"
                  value={otherRegistrar}
                  onChange={(event) => setOtherRegistrar(event.target.value)}
                  placeholder="Exemple: Amen, Hostinger..."
                  className="w-full rounded-[1.2rem] border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 outline-none transition focus:border-stone-950"
                />
              </label>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleRegistrarContinue}
                disabled={!registrar || (registrar === "other" && !otherRegistrar.trim())}
                className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800 disabled:cursor-not-allowed disabled:bg-stone-300"
              >
                Voir les instructions
              </button>
              <button
                type="button"
                onClick={() => setScreen("domain")}
                className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-stone-50"
              >
                Retour
              </button>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Ce que vous verrez ensuite
            </p>
            <div className="mt-5 space-y-3">
              {[
                "Où se connecter dans l'espace client de votre registrar.",
                "Comment retrouver la gestion DNS sans jargon technique.",
                "Les deux lignes exactes à créer ou modifier dans la zone DNS.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.2rem] border border-stone-900/10 bg-stone-50 px-4 py-4 text-sm leading-7 text-stone-700"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {screen === "guide" && (
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-4 rounded-[1.6rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:flex-row sm:items-end sm:justify-between sm:p-6">
            <div>
              <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
                Étape A3
              </p>
              <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
                Instructions pour {registrarName}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600 sm:text-base">
                Domaine à connecter: <span className="font-semibold text-stone-950">{domain}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setScreen("registrar")}
              className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-stone-50"
            >
              Changer de registrar
            </button>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <RegistrarMockup guide={selectedGuide} />

              <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
                <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Pas à pas
                </p>
                <div className="mt-5 space-y-4">
                  {selectedGuide.steps.map((step, index) => (
                    <div key={step} className="flex gap-4 rounded-[1.2rem] bg-stone-50 px-4 py-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-950 text-sm font-semibold text-white">
                        {index + 1}
                      </div>
                      <p className="text-sm leading-7 text-stone-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
                <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
                  Enregistrements à appliquer
                </p>
                <div className="mt-5 grid gap-4">
                  <RecordCard
                    type="A"
                    host="@"
                    value="76.76.21.21"
                    note="Ce record pointe le domaine principal vers l'hébergement DashClub."
                  />
                  <RecordCard
                    type="CNAME"
                    host="www"
                    value="sites.dashclub.app"
                    note="Ce CNAME garantit que la version www du domaine rejoint le même site."
                  />
                </div>

                <div className="mt-5 rounded-[1.3rem] border border-orange-200 bg-orange-50 px-4 py-4 text-sm leading-7 text-orange-900">
                  Les modifications DNS peuvent prendre entre 15 minutes et 48 heures.
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-stone-900/10 bg-stone-950 p-5 text-white sm:p-6">
                <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-orange-200/80">
                  Avant de vérifier
                </p>
                <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                  <p>Vérifiez qu&apos;il n&apos;y a pas un autre record A actif pour `@`.</p>
                  <p>Vérifiez qu&apos;un seul CNAME existe pour `www`.</p>
                  <p>Enregistrez la zone DNS avant de revenir dans DashClub.</p>
                </div>

                <button
                  type="button"
                  onClick={startVerification}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:-translate-y-0.5 hover:bg-stone-100"
                >
                  J&apos;ai modifié mes DNS — Vérifier la connexion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {screen === "verify" && (
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.8rem] border border-stone-900/10 bg-[#f8f4ed] p-5 sm:p-6">
            <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
              Étape A4
            </p>
            <h3 className="mt-3 font-display text-3xl leading-none text-stone-950">
              Vérification du domaine
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-600 sm:text-base">
              Nous vérifions si <span className="font-semibold text-stone-950">{domain}</span> pointe
              bien vers DashClub.
            </p>

            <div className="mt-6 rounded-[1.6rem] border border-stone-900/10 bg-white p-5">
              {verificationState === "checking" && (
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-9 w-9 animate-spin rounded-full border-4 border-orange-200 border-t-orange-600" />
                  <div>
                    <p className="text-base font-semibold text-stone-950">
                      Vérification en cours...
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-600">
                      Cela peut prendre quelques minutes selon la propagation DNS.
                    </p>
                  </div>
                </div>
              )}

              {verificationState === "pending" && (
                <div className="space-y-3">
                  <p className="text-base font-semibold text-stone-950">
                    ⏳ La propagation DNS est en cours.
                  </p>
                  <p className="text-sm leading-7 text-stone-600">
                    Réessayez dans 30 minutes. Les serveurs DNS n&apos;ont pas tous
                    encore pris en compte vos changements.
                  </p>
                </div>
              )}

              {verificationState === "success" && (
                <div className="space-y-3">
                  <p className="text-base font-semibold text-emerald-700">
                    ✅ Votre domaine {domain} est bien connecté à DashClub !
                  </p>
                  <p className="text-sm leading-7 text-stone-600">
                    Votre site est maintenant accessible avec votre nom de domaine.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {(verificationState === "pending" || verificationState === "success") && (
                <button
                  type="button"
                  onClick={startVerification}
                  className="inline-flex items-center justify-center rounded-full bg-stone-950 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-stone-800"
                >
                  {verificationState === "success"
                    ? "Relancer une vérification"
                    : "Réessayer la vérification"}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  setVerificationState("idle");
                  setScreen("guide");
                }}
                className="inline-flex items-center justify-center rounded-full border border-stone-900/10 bg-white px-5 py-3 text-sm font-medium text-stone-800 transition hover:border-stone-900/20 hover:bg-stone-50"
              >
                Revenir aux instructions
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[1.8rem] border border-stone-900/10 bg-white p-5 sm:p-6">
              <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-stone-500">
                Résumé
              </p>
              <div className="mt-5 space-y-3 text-sm leading-7 text-stone-700">
                <p>
                  <span className="font-semibold text-stone-950">Domaine:</span> {domain}
                </p>
                <p>
                  <span className="font-semibold text-stone-950">Registrar:</span> {registrarName}
                </p>
                <p>
                  <span className="font-semibold text-stone-950">CNAME www:</span>{" "}
                  sites.dashclub.app
                </p>
                <p>
                  <span className="font-semibold text-stone-950">A @:</span> 76.76.21.21
                </p>
              </div>
            </div>

            <div className="rounded-[1.8rem] border border-stone-900/10 bg-stone-950 p-5 text-white sm:p-6">
              <p className="font-sans text-[11px] uppercase tracking-[0.32em] text-orange-200/80">
                Après validation
              </p>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
                <p>Le domaine principal pourra devenir l&apos;adresse publique de votre site.</p>
                <p>Vous pourrez ensuite gérer les redirections ou variantes supplémentaires.</p>
                <p>Si la propagation tarde, le support DashClub peut vous aider à relire la zone DNS.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <HelpFooter />
    </section>
  );
}
