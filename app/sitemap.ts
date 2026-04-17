import type { MetadataRoute } from "next";
import { siteUrl } from "./seo";

const publicPages = [
  {
    path: "/",
    changeFrequency: "weekly" as const,
    priority: 1,
  },
  {
    path: "/pricing",
    changeFrequency: "weekly" as const,
    priority: 0.8,
  },
  {
    path: "/register",
    changeFrequency: "monthly" as const,
    priority: 0.7,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-04-15T00:00:00.000Z");

  return publicPages.map((page) => ({
    url: new URL(page.path, siteUrl).toString(),
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
