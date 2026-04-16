'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

type PlanId = 'essentiel' | 'competition' | 'illimite';

type ClubData = {
  club: string;
  sport: string;
  ville: string;
};

type ContactData = {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
};

const SPORTS = [
  'Triathlon',
  'Course à pied',
  'Trail',
  'Natation',
  'Cyclisme',
  'Duathlon',
  'Athlétisme',
  'Rugby',
  'Football',
  'Tennis',
  'Autre',
];

const PLANS: {
  id: PlanId;
  name: string;
  price: string;
  priceNum: number;
  hook: string;
  bullets: string[];
  badge?: string;
  featured?: boolean;
}[] = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '19€',
    priceNum: 19,
    hook: 'Pour démarrer proprement.',
    bullets: [
      'Site du club créé et hébergé',
      'Domaine personnalisé inclus',
      '1ère épreuve organisée sans supplément',
      'Zéro commission sur les inscriptions',
    ],
  },
  {
    id: 'competition',
    name: 'Compétition',
    price: '49€',
    priceNum: 49,
    hook: 'Pour les clubs avec un calendrier.',
    bullets: [
      'Tout Essentiel',
      "Jusqu'à 3 épreuves par saison",
      'Emails automatiques aux inscrits',
      'Tableau de bord en temps réel',
    ],
    badge: 'Recommandé',
    featured: true,
  },
  {
    id: 'illimite',
    name: 'Illimité',
    price: '99€',
    priceNum: 99,
    hook: 'Pour les clubs qui veulent tout automatiser.',
    bullets: [
      'Tout Compétition',
      'Épreuves illimitées',
      'Gestion des adhérents et licences',
      'Bilan de saison exportable en PDF',
      'Boutique en ligne (vente de produits)',
    ],
  },
];

function normalizeFormuleParam(value: string | null): PlanId {
  if (value === 'essentiel') return 'essentiel';
  if (value === 'competition') return 'competition';
  if (value === 'saison') return 'competition'; // rétrocompatibilité
  if (value === 'illimite') return 'illimite';
  return 'competition'; // défaut
}

// ── Progress indicator ──────────────────────────────────────────────────────

function StepIndicator({ step }: { step: 1 | 2 | 3 | 4 }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all ${
              s === step
                ? 'bg-[#C9A84C] text-[#0D1F3C]'
                : s < step
                ? 'bg-[#C9A84C]/30 text-[#C9A84C]'
                : 'bg-white/10 text-white/40'
            }`}
          >
            {s < step ? (
              <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
              </svg>
            ) : (
              s
            )}
          </div>
          {s < 4 && (
            <div
              className={`h-px w-6 transition-all ${s < step ? 'bg-[#C9A84C]/50' : 'bg-white/15'}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Shared UI ──────────────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeOpacity="0.3" />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="#C9A84C"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const inputBase =
  'w-full rounded-xl border bg-[#F8F6F1] px-4 py-3 text-sm text-[#0D1F3C] placeholder-[#0D1F3C]/40 outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/20';

// ── Step 1 — Club info ─────────────────────────────────────────────────────

type ClubErrors = { club?: string; ville?: string };

function Step1({
  data,
  onNext,
}: {
  data: ClubData;
  onNext: (data: ClubData) => void;
}) {
  const [form, setForm] = useState<ClubData>(data);
  const [errors, setErrors] = useState<ClubErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: keyof ClubErrors, value: string): string => {
    if (name === 'club') return value.trim() ? '' : 'Le nom du club est requis';
    if (name === 'ville') return value.trim() ? '' : 'La ville est requise';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name as keyof ClubErrors, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name as keyof ClubErrors, value) }));
  };

  const handleSubmit = () => {
    const newErrors: ClubErrors = {
      club: validate('club', form.club),
      ville: validate('ville', form.ville),
    };
    const hasErrors = Object.values(newErrors).some(Boolean);
    setErrors(newErrors);
    setTouched({ club: true, ville: true });
    if (!hasErrors) onNext(form);
  };

  return (
    <div className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Nom du club <span className="text-[#C9A84C]">*</span>
        </label>
        <input
          name="club"
          type="text"
          value={form.club}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ex : USM Triathlon"
          className={`${inputBase} ${errors.club ? 'border-red-400' : 'border-white/20'}`}
        />
        {errors.club && <p className="mt-1 text-xs text-red-400">{errors.club}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Sport pratiqué <span className="text-[#C9A84C]">*</span>
        </label>
        <select
          name="sport"
          value={form.sport}
          onChange={handleChange}
          className={`${inputBase} border-white/20 cursor-pointer`}
        >
          <option value="">Sélectionner un sport</option>
          {SPORTS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Ville <span className="text-[#C9A84C]">*</span>
        </label>
        <input
          name="ville"
          type="text"
          value={form.ville}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Ex : Mézy-sur-Seine"
          className={`${inputBase} ${errors.ville ? 'border-red-400' : 'border-white/20'}`}
        />
        {errors.ville && <p className="mt-1 text-xs text-red-400">{errors.ville}</p>}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-2 w-full rounded-full bg-[#C9A84C] px-7 py-4 text-base font-semibold text-[#0D1F3C] transition hover:-translate-y-0.5 hover:bg-[#d4b460]"
      >
        Continuer →
      </button>
    </div>
  );
}

// ── Step 2 — Responsable info ──────────────────────────────────────────────

type ContactErrors = {
  prenom?: string;
  nom?: string;
  email?: string;
  telephone?: string;
};

function Step2({
  data,
  onNext,
  onBack,
}: {
  data: ContactData;
  onNext: (data: ContactData) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState<ContactData>(data);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = (name: keyof ContactErrors, value: string): string => {
    if (name === 'prenom') return value.trim() ? '' : 'Le prénom est requis';
    if (name === 'nom') return value.trim() ? '' : 'Le nom est requis';
    if (name === 'email') {
      if (!value.trim()) return "L'email est requis";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email invalide';
      return '';
    }
    if (name === 'telephone') {
      if (!value.trim()) return 'Le téléphone est requis';
      if (!/^0[67][0-9]{8}$/.test(value.replace(/\s/g, '')))
        return 'Format invalide (ex : 0612345678)';
      return '';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name as keyof ContactErrors, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name as keyof ContactErrors, value) }));
  };

  const handleSubmit = () => {
    const fields: (keyof ContactErrors)[] = ['prenom', 'nom', 'email', 'telephone'];
    const newErrors: ContactErrors = {};
    fields.forEach((f) => {
      const err = validate(f, form[f]);
      if (err) newErrors[f] = err;
    });
    setErrors(newErrors);
    setTouched({ prenom: true, nom: true, email: true, telephone: true });
    if (Object.keys(newErrors).length === 0) onNext(form);
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            Prénom <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            name="prenom"
            type="text"
            value={form.prenom}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="given-name"
            placeholder="Jean"
            className={`${inputBase} ${errors.prenom ? 'border-red-400' : 'border-white/20'}`}
          />
          {errors.prenom && <p className="mt-1 text-xs text-red-400">{errors.prenom}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-white/80">
            Nom <span className="text-[#C9A84C]">*</span>
          </label>
          <input
            name="nom"
            type="text"
            value={form.nom}
            onChange={handleChange}
            onBlur={handleBlur}
            autoComplete="family-name"
            placeholder="Dupont"
            className={`${inputBase} ${errors.nom ? 'border-red-400' : 'border-white/20'}`}
          />
          {errors.nom && <p className="mt-1 text-xs text-red-400">{errors.nom}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Email <span className="text-[#C9A84C]">*</span>
        </label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          placeholder="contact@monclub.fr"
          className={`${inputBase} ${errors.email ? 'border-red-400' : 'border-white/20'}`}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-white/80">
          Téléphone mobile <span className="text-[#C9A84C]">*</span>
        </label>
        <input
          name="telephone"
          type="tel"
          value={form.telephone}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="tel"
          placeholder="0612345678"
          className={`${inputBase} ${errors.telephone ? 'border-red-400' : 'border-white/20'}`}
        />
        {errors.telephone && <p className="mt-1 text-xs text-red-400">{errors.telephone}</p>}
        <p className="mt-1 text-xs text-white/30">Format 06 ou 07, 10 chiffres sans espace</p>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-2 w-full rounded-full bg-[#C9A84C] px-7 py-4 text-base font-semibold text-[#0D1F3C] transition hover:-translate-y-0.5 hover:bg-[#d4b460]"
      >
        Choisir ma formule →
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/60 transition hover:border-white/30 hover:text-white/80"
      >
        ← Retour
      </button>
    </div>
  );
}

// ── Step 3 — Formule selection ─────────────────────────────────────────────

function Step3({
  selectedPlan,
  onSelect,
  onBack,
}: {
  selectedPlan: PlanId;
  onSelect: (plan: PlanId) => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative cursor-pointer rounded-2xl border p-5 transition-all ${
                plan.featured
                  ? isSelected
                    ? 'border-[#C9A84C] bg-[#C9A84C]/10 shadow-[0_0_0_2px_#C9A84C]'
                    : 'border-[#C9A84C]/40 bg-white/5'
                  : isSelected
                  ? 'border-[#C9A84C] bg-white/8 shadow-[0_0_0_2px_#C9A84C]'
                  : 'border-white/15 bg-white/5 hover:border-white/30'
              }`}
              onClick={() => onSelect(plan.id)}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#C9A84C] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#0D1F3C]">
                  {plan.badge}
                </span>
              )}

              <div className="mb-3 flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {plan.name}
                  </p>
                  <p className="mt-1 font-display text-3xl text-white">{plan.price}</p>
                  <p className="text-xs text-white/40">/mois TTC</p>
                </div>
                <div
                  className={`mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 transition ${
                    isSelected ? 'border-[#C9A84C] bg-[#C9A84C]' : 'border-white/30'
                  }`}
                >
                  {isSelected && (
                    <svg viewBox="0 0 10 10" fill="#0D1F3C" className="h-3 w-3">
                      <path
                        d="M2 5l2 2 4-4"
                        stroke="#0D1F3C"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <p className="mb-3 text-xs text-white/60">{plan.hook}</p>

              <ul className="space-y-1.5">
                {plan.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-xs text-white/70">
                    <CheckIcon />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onSelect(plan.id)}
                className={`mt-5 w-full rounded-full px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${
                  isSelected
                    ? 'bg-[#C9A84C] text-[#0D1F3C]'
                    : 'bg-white/10 text-white hover:bg-white/15'
                }`}
              >
                Choisir {plan.name} →
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onBack}
        className="mt-2 w-full rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/60 transition hover:border-white/30 hover:text-white/80"
      >
        ← Retour
      </button>
    </div>
  );
}

// ── Step 4 — Summary + payment ─────────────────────────────────────────────

function Step4({
  club,
  contact,
  planId,
  onBack,
}: {
  club: ClubData;
  contact: ContactData;
  planId: PlanId;
  onBack: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const plan = PLANS.find((p) => p.id === planId)!;
  const today = new Date();
  const day = today.getDate();

  const handlePay = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formule: planId,
          email: contact.email,
          nom: contact.nom,
          prenom: contact.prenom,
          club: club.club,
          sport: club.sport,
          ville: club.ville,
          telephone: contact.telephone,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        setError(json.error || 'Une erreur est survenue. Veuillez réessayer.');
        return;
      }
      window.location.href = json.url;
    } catch {
      setError('Une erreur réseau est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <div className="rounded-2xl border border-white/15 bg-white/5 p-5 space-y-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
          Récapitulatif
        </p>

        {/* Club */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]/60">
            Club
          </p>
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <span className="text-white/50">Nom du club</span>
            <span className="text-white font-medium">{club.club}</span>

            {club.sport && (
              <>
                <span className="text-white/50">Sport</span>
                <span className="text-white font-medium">{club.sport}</span>
              </>
            )}

            <span className="text-white/50">Ville</span>
            <span className="text-white font-medium">{club.ville}</span>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Responsable */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]/60">
            Responsable
          </p>
          <div className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            <span className="text-white/50">Nom</span>
            <span className="text-white font-medium">
              {contact.prenom} {contact.nom}
            </span>

            <span className="text-white/50">Email</span>
            <span className="text-white font-medium break-all">{contact.email}</span>

            <span className="text-white/50">Téléphone</span>
            <span className="text-white font-medium">{contact.telephone}</span>
          </div>
        </div>

        <div className="border-t border-white/10" />

        {/* Formule */}
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#C9A84C]/60">
            Formule
          </p>
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold text-base">{plan.name}</span>
            <span className="text-[#C9A84C] font-bold text-xl">{plan.price}/mois TTC</span>
          </div>
        </div>

        {/* Billing info */}
        <div className="rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 px-4 py-3 flex items-start gap-2">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-[#C9A84C] mt-0.5"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-xs text-[#C9A84C]/90">
            Premier prélèvement aujourd&apos;hui · Renouvellement automatique le {day} de chaque
            mois
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handlePay}
        disabled={isLoading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#C9A84C] px-7 py-4 text-base font-semibold text-[#0D1F3C] transition hover:-translate-y-0.5 hover:bg-[#d4b460] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {isLoading ? (
          <>
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Redirection vers le paiement…
          </>
        ) : (
          <>Payer {plan.price}/mois →</>
        )}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="w-full rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white/60 transition hover:border-white/30 hover:text-white/80"
      >
        ← Modifier ma formule
      </button>

      <p className="text-center text-xs text-white/30">
        Sans engagement · Résiliable à tout moment · Paiement sécurisé par Stripe
      </p>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export default function InscriptionForm() {
  const searchParams = useSearchParams();
  const formuleParam = searchParams.get('formule');

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [clubData, setClubData] = useState<ClubData>({ club: '', sport: '', ville: '' });
  const [contactData, setContactData] = useState<ContactData>({
    prenom: '',
    nom: '',
    email: '',
    telephone: '',
  });
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(
    normalizeFormuleParam(formuleParam)
  );

  useEffect(() => {
    setSelectedPlan(normalizeFormuleParam(formuleParam));
  }, [formuleParam]);

  const stepLabels = ['Votre club', 'Responsable', 'Formule', 'Récapitulatif'];

  const stepTitles = [
    'Parlez-nous de votre club',
    'Informations du responsable',
    'Choisissez votre formule',
    'Confirmez et payez',
  ];

  const stepSubtitles = [
    'Les informations de base pour configurer votre espace.',
    'Le compte administrateur qui gérera le club.',
    "Votre abonnement démarre dès aujourd'hui. Sans engagement.",
    'Vérifiez vos informations avant de procéder au paiement.',
  ];

  return (
    <div className="min-h-screen bg-[#0D1F3C]">
      {/* Subtle background texture */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(201,168,76,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.04),_transparent_40%)]" />

      <div className="relative mx-auto w-full max-w-2xl px-5 py-10 sm:px-8">
        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <Link href="/" className="inline-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-dashclub-real.svg"
              alt="DashClub"
              style={{ height: '36px', width: 'auto' }}
            />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/60 transition hover:border-white/30 hover:text-white/80"
          >
            ← Accueil
          </Link>
        </header>

        {/* Step indicator */}
        <StepIndicator step={step} />

        {/* Step label */}
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#C9A84C]/70">
            Étape {step} sur 4 — {stepLabels[step - 1]}
          </p>
          <h1 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            {stepTitles[step - 1]}
          </h1>
          <p className="mt-2 text-sm text-white/50">{stepSubtitles[step - 1]}</p>
        </div>

        {/* Step content */}
        <div>
          {step === 1 && (
            <Step1
              data={clubData}
              onNext={(data) => {
                setClubData(data);
                setStep(2);
              }}
            />
          )}
          {step === 2 && (
            <Step2
              data={contactData}
              onNext={(data) => {
                setContactData(data);
                setStep(3);
              }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <Step3
              selectedPlan={selectedPlan}
              onSelect={(plan) => {
                setSelectedPlan(plan);
                setStep(4);
              }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <Step4
              club={clubData}
              contact={contactData}
              planId={selectedPlan}
              onBack={() => setStep(3)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
