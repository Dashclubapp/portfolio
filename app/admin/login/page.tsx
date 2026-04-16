'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const form = e.currentTarget;
    const username = (form.elements.namedItem('username') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? 'Identifiants incorrects');
      }
    } catch {
      setError('Erreur de connexion. Réessayez.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a1628] p-4">
      {/* Grid bg */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(201,168,76,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(201,168,76,0.5)_1px,transparent_1px)] [background-size:64px_64px]" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#C9A84C] mb-3">
            <span className="text-[#0D1F3C] font-black text-xl">D</span>
          </div>
          <h1 className="text-white font-bold text-xl">DashClub</h1>
          <p className="text-white/40 text-sm mt-1">Back-office club</p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-[#0D1F3C] border border-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
          <h2 className="text-white font-semibold text-base mb-5">Connexion</h2>
          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs text-white/40 uppercase tracking-widest font-medium">
                Email
              </label>
              <input
                id="username"
                name="username"
                type="email"
                required
                autoComplete="username"
                spellCheck={false}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition placeholder-white/20"
                placeholder="vous@exemple.fr"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs text-white/40 uppercase tracking-widest font-medium">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#C9A84C]/50 transition"
                placeholder="••••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400 bg-red-500/10 rounded-xl px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#C9A84C] py-3 text-sm font-bold text-[#0D1F3C] hover:bg-[#D4B860] disabled:opacity-50 transition mt-1"
            >
              {loading ? 'Connexion…' : 'Se connecter'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-white/20 mt-5">
          Mot de passe oublié ?{' '}
          <a href="mailto:hello@dashclub.fr" className="underline hover:text-white/40 transition">
            Contactez le support
          </a>
        </p>
      </div>
    </div>
  );
}
