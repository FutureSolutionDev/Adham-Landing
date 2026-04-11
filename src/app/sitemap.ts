import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/lib/constants";

const siteUrl = getSiteUrl();

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
