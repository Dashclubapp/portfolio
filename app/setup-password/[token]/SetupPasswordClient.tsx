'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'expired';

export default function SetupPasswordClient({ token }: { token: string }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (widgetRef.current && window.turnstile) {
        window.turnstile.render(widgetRef.current, {
          sitekey: siteKey,
          callback: (t: string) => setTurnstileToken(t),
          'expired-callback': () => setTurnstileToken(''),
          theme: 'dark',
        });
      }
    };

    return () => { document.head.removeChild(script); };
  }, [siteKey]);

  const passwordStrength = (p: string) => {
    if (p.length === 0) return null;
    if (p.length < 8) return 'weak';
    if (p.length < 12 || !/[0-9]/.test(p) || !/[A-Z]/.test(p)) return 'medium';
    return 'strong';
  };

  const strength = passwordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirm) {
      setErrorMsg('Les mots de passe ne correspondent pas.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (!turnstileToken) {
      setErrorMsg('Veuillez compléter la vérification de sécurité.');
      return;
    }

    setStatus('loading');

    const res = await fetch('/api/setup-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, turnstileToken }),
    });

    const json = await res.json();

    if (res.ok) {
      setStatus('success');
    } else if (json.code === 'EXPIRED') {
      setStatus('expired');
    } else {
      setStatus('error');
      setErrorMsg(json.error || 'Une erreur est survenue.');
      if (window.turnstile) window.turnstile.reset();
      setTurnstileToken('');
    }
  };

  if (status === 'success') {
    return (
      <PageShell>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-4xl">✅</div>
          <h1 className="text-2xl font-bold text-white">Mot de passe créé !</h1>
          <p className="text-white/60 text-sm">Vous pouvez maintenant vous connecter à votre backoffice.</p>
          <Link
            href="/admin/login"
            className="mt-4 block w-full rounded-2xl bg-[#C9A84C] px-6 py-4 text-center text-base font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition"
          >
            Se connecter →
          </Link>
        </div>
      </PageShell>
    );
  }

  if (status === 'expired') {
    return (
      <PageShell>
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-4xl">⏰</div>
          <h1 className="text-2xl font-bold text-white">Lien expiré</h1>
          <p className="text-white/60 text-sm">Ce lien n&apos;est valable que 72 heures. Contactez-nous pour en recevoir un nouveau.</p>
          <a
            href="mailto:hello@dashclub.app"
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center text-base font-medium text-white hover:bg-white/10 transition"
          >
            Contacter le support
          </a>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-3xl mb-4">🔐</div>
        <h1 className="text-2xl font-bold text-white">Créez votre mot de passe</h1>
        <p className="text-white/50 text-sm mt-1">Sécurisez votre accès DashClub</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5">
            Mot de passe
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="8 caractères minimum"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/25 focus:outline-none focus:border-[#C9A84C]/50 transition pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition text-sm"
            >
              {showPassword ? 'Masquer' : 'Voir'}
            </button>
          </div>
          {strength && (
            <div className="mt-1.5 flex items-center gap-2">
              <div className="flex gap-1">
                {(['weak', 'medium', 'strong'] as const).map((level, i) => (
                  <div
                    key={level}
                    className={`h-1 w-8 rounded-full transition-colors ${
                      ['weak', 'medium', 'strong'].indexOf(strength) >= i
                        ? strength === 'weak' ? 'bg-red-500'
                          : strength === 'medium' ? 'bg-yellow-400'
                          : 'bg-emerald-400'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/40">
                {strength === 'weak' ? 'Trop court' : strength === 'medium' ? 'Moyen' : 'Fort'}
              </span>
            </div>
          )}
        </div>

        {/* Confirm */}
        <div>
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-1.5">
            Confirmer le mot de passe
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            placeholder="Répétez votre mot de passe"
            className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-white placeholder-white/25 focus:outline-none transition ${
              confirm && confirm !== password ? 'border-red-500/50' : 'border-white/10 focus:border-[#C9A84C]/50'
            }`}
          />
          {confirm && confirm !== password && (
            <p className="mt-1 text-xs text-red-400">Les mots de passe ne correspondent pas.</p>
          )}
        </div>

        {/* Turnstile */}
        <div>
          <label className="block text-xs font-medium text-white/50 uppercase tracking-wider mb-2">
            Vérification de sécurité
          </label>
          <div ref={widgetRef} />
        </div>

        {errorMsg && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
            {errorMsg}
          </div>
        )}

        <button
          type="submit"
          disabled={status === 'loading' || !turnstileToken || password !== confirm || password.length < 8}
          className="w-full rounded-2xl bg-[#C9A84C] px-6 py-4 text-base font-bold text-[#0D1F3C] hover:bg-[#D4B860] transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Enregistrement…' : 'Créer mon mot de passe →'}
        </button>
      </form>
    </PageShell>
  );
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(201,168,76,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="text-xl font-bold tracking-[0.08em] text-[#C9A84C]">DashClub</span>
        </div>
        <div className="rounded-3xl bg-[#0D1F3C] border border-white/10 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    turnstile: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}
