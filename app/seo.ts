import type { Metadata } from "next";

export const siteName = "DashClub";
export const siteUrl = "https://dashclub.app";
export const ogImagePath = "/opengraph-image";
export const ogImageUrl = new URL(ogImagePath, siteUrl).toString();

export const homeTitle = "DashClub — Site web, inscriptions et gestion pour clubs sportifs";
export const homeDescription =
  "Site public, back-office et inscriptions Stripe dans un seul outil. En ligne en 5 jours, dès 19€/mois, zéro commission.";

const baseOpenGraph = {
  siteName,
  locale: "fr_FR",
  type: "website" as const,
  images: [
    {
      url: ogImageUrl,
      width: 1200,
      height: 630,
      alt: homeTitle,
    },
  ],
};

const baseTwitter = {
  card: "summary_large_image" as const,
  images: [ogImageUrl],
};

export function buildPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = new URL(path, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      ...baseOpenGraph,
      title,
      description,
      url,
    },
    twitter: {
      ...baseTwitter,
      title,
      description,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: siteName,
  title: homeTitle,
  description: homeDescription,
  openGraph: {
    ...baseOpenGraph,
    title: homeTitle,
    description: homeDescription,
    url: siteUrl,
  },
  twitter: {
    ...baseTwitter,
    title: homeTitle,
    description: homeDescription,
  },
};
