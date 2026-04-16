import type { Metadata } from "next";

export const siteName = "DashClub";
export const siteUrl = "https://dashclub.app";
export const ogImagePath = "/opengraph-image";
export const ogImageUrl = new URL(ogImagePath, siteUrl).toString();

export const homeTitle = "DashClub — Dashboard pour clubs sportifs";
export const homeDescription =
  "Gérez votre club, votre site et vos inscriptions en un seul dashboard. À partir de 19€/mois, zéro commission.";

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
