import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000")
  .trim()
  .replace(/\/+$/, "");

const PATHS = ["/", "/contact", "/faq", "/privacy", "/terms"] as const;

function withLocalePrefix(locale: string, path: (typeof PATHS)[number]) {
  if (locale === routing.defaultLocale) return path;
  if (path === "/") return `/${locale}`;
  return `/${locale}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [];
  for (const path of PATHS) {
    const alternates: Record<string, string> = {};
    for (const locale of routing.locales) {
      alternates[locale] = `${siteUrl}${withLocalePrefix(locale, path)}`;
    }

    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}${withLocalePrefix(locale, path)}`,
        lastModified,
        changeFrequency: "weekly",
        priority: path === "/" ? 1 : 0.7,
        alternates: { languages: alternates },
      });
    }
  }

  return entries;
}
