"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { MobileNav } from "@/components/mobile-nav";
import { SiteFooter } from "@/components/marketing/SiteFooter";

const SUBJECTS = [
  "Demande d'informations",
  "Question sur les tarifs",
  "Demande de démo personnalisée",
  "Support technique",
  "Partenariat",
  "Autre",
] as const;

type FormState = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    if (!siteKey) return;
    // Global callbacks used by Cloudflare implicit rendering
    (window as unknown as Record<string, unknown>).dashclubTurnstileOk = (t: string) => setTurnstileToken(t);
    (window as unknown as Record<string, unknown>).dashclubTurnstileExpired = () => setTurnstileToken("");
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      delete (window as unknown as Record<string, unknown>).dashclubTurnstileOk;
      delete (window as unknown as Record<string, unknown>).dashclubTurnstileExpired;
    };
  }, [siteKey]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, turnstileToken }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setState("success");
      } else {
        setErrorMsg(data.error ?? "Une erreur est survenue.");
        setState("error");
        if (window.turnstile) window.turnstile.reset();
        setTurnstileToken("");
      }
    } catch {
      setErrorMsg("Impossible d'envoyer le message. Vérifiez votre connexion.");
      setState("error");
      if (window.turnstile) window.turnstile.reset();
      setTurnstileToken("");
    }
  }

  return (
    <main className="relative min-h-screen" style={{ backgroundColor: "#f8f6f1" }}>
      <MobileNav />
      <div className="mx-auto w-full max-w-7xl px-5 pt-6 pb-16 sm:px-8 lg:px-12">
        <div className="hidden md:block">
          <SiteHeader />
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: "#C9A84C" }}>
            Contact
          </p>
          <h1 className="mt-2 font-display text-4xl" style={{ color: "#0D1F3C" }}>
            Parlons de votre club
          </h1>
          <p className="mt-4 text-base leading-7" style={{ color: "#4a5568" }}>
            Une question sur DashClub ? Envie d&apos;une démo personnalisée ? Écrivez-nous,
            nous vous répondrons dès que possible.
          </p>

          {state === "success" ? (
            <div
              className="mt-10 rounded-2xl border p-8 text-center"
              style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ backgroundColor: "#dcfce7" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth={2} className="h-7 w-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold" style={{ color: "#15803d" }}>Message envoyé !</h2>
              <p className="mt-2 text-sm" style={{ color: "#4a5568" }}>
                Merci pour votre message. Nous reviendrons vers vous dès que possible.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium" style={{ color: "#0D1F3C" }}>
                    Nom complet <span style={{ color: "#C9A84C" }}>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2"
                    style={{ borderColor: "#d6d3cd", backgroundColor: "#fff", color: "#1c1917" }}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium" style={{ color: "#0D1F3C" }}>
                    Téléphone <span style={{ color: "#C9A84C" }}>*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="06 12 34 56 78"
                    className="w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2"
                    style={{ borderColor: "#d6d3cd", backgroundColor: "#fff", color: "#1c1917" }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium" style={{ color: "#0D1F3C" }}>
                  Email <span style={{ color: "#C9A84C" }}>*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jean@monclub.fr"
                  className="w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2"
                  style={{ borderColor: "#d6d3cd", backgroundColor: "#fff", color: "#1c1917" }}
                />
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium" style={{ color: "#0D1F3C" }}>
                  Sujet <span style={{ color: "#C9A84C" }}>*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2"
                  style={{ borderColor: "#d6d3cd", backgroundColor: "#fff", color: form.subject ? "#1c1917" : "#9ca3af" }}
                >
                  <option value="" disabled>Choisissez un sujet…</option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium" style={{ color: "#0D1F3C" }}>
                  Message <span style={{ color: "#C9A84C" }}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre demande, votre club, vos besoins…"
                  className="w-full resize-none rounded-xl border px-4 py-3 text-base outline-none transition focus:ring-2"
                  style={{ borderColor: "#d6d3cd", backgroundColor: "#fff", color: "#1c1917" }}
                />
              </div>

              {siteKey && (
                <div
                  className="cf-turnstile"
                  data-sitekey={siteKey}
                  data-callback="dashclubTurnstileOk"
                  data-expired-callback="dashclubTurnstileExpired"
                />
              )}

              {state === "error" && (
                <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={state === "loading"}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                style={{ backgroundColor: "#0D1F3C" }}
              >
                {state === "loading" ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Envoi en cours…
                  </>
                ) : (
                  "Envoyer le message →"
                )}
              </button>

              <p className="text-center text-xs" style={{ color: "#9ca3af" }}>
                Vous pouvez aussi nous écrire directement à{" "}
                <a href="mailto:hello@dashclub.fr" style={{ color: "#C9A84C" }}>
                  hello@dashclub.fr
                </a>
              </p>
            </form>
          )}

          <div className="mt-12 border-t pt-8" style={{ borderColor: "#e7e5e4" }}>
            <Link href="/" className="text-sm font-medium hover:underline" style={{ color: "#C9A84C" }}>
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </div>
      <SiteFooter />
    </main>
  );
}
