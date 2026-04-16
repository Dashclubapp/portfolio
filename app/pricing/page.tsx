import type { Metadata } from "next";
import FormulasContent from "./FormulasContent";
import { buildPageMetadata } from "../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Formules et tarifs — DashClub",
  description:
    "Essentiel 19€, Compétition 49€, Illimité 99€/mois. Sans engagement, zéro commission DashClub sur vos paiements.",
  path: "/pricing",
});

export default function FormulesPage() {
  return <FormulasContent />;
}
