import type { Metadata } from "next";
import { DomainOnboarding } from "@/components/admin/domain-onboarding";

export const metadata: Metadata = {
  title: "DashClub Admin | Domaine personnalisé",
  description:
    "Assistant guidé pour connecter ou acheter un nom de domaine dans le back-office DashClub.",
};

export default function CustomDomainPage() {
  return <DomainOnboarding />;
}
