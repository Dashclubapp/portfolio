import type { Metadata } from "next";
import { Suspense } from "react";
import InscriptionForm from "./InscriptionForm";
import { buildPageMetadata } from "../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Lancez votre club en ligne — DashClub",
  description:
    "Créez votre site de club en 5 jours. Gérez inscriptions, adhérents et événements. À partir de 19€/mois.",
  path: "/signup",
});

export default function InscriptionPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--background)]">
          <div className="text-stone-500 text-sm">Chargement…</div>
        </div>
      }
    >
      <InscriptionForm />
    </Suspense>
  );
}
