import type { Metadata } from "next";
import DemoBanner from "./DemoBanner";

export const metadata: Metadata = {
  title: {
    default: "DashClub Démo — USM Triathlon",
    template: "%s | DashClub Démo",
  },
  description:
    "Découvrez DashClub en action avec le club fictif USM Triathlon — site public, dashboard administration, paiements simulés.",
};

export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DemoBanner />
      {children}
    </>
  );
}
