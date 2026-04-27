/** Base URL for Adham public API — edit here if the host changes. */
export const ADHAM_API_BASE = "https://platform-api.adhamfathallah.com";

const REVALIDATE_SECONDS = 3600;
const STATS_REVALIDATE_SECONDS = 60;

import { unstable_cache } from "next/cache";

export type LegalPoint = Record<string, unknown>;

export interface LegalArticle {
  ArticleId: number;
  Title: string;
  TitleEn: string;
  Order: number;
  Content: string;
  ContentEn: string;
  Points?: LegalPoint[];
  footer?: string;
  footerEn?: string;
  additionalContent?: string;
  additionalContentEn?: string;
  additionalPoints?: LegalPoint[];
  ContactInfo?: { Email?: string; Phone?: string };
}

export interface LegalSection {
  SectionId: number;
  SectionType: string;
  Title: string;
  TitleEn: string;
  Articles: LegalArticle[];
}

export interface TermsPrivacyData {
  CompanyName: string;
  PlatformName: string;
  LastUpdated: string;
  Version: string;
  Sections: LegalSection[];
}

export interface TermsPrivacyResponse {
  message: string;
  error: boolean;
  code: number;
  data: TermsPrivacyData;
}

export interface FaqItem {
  Question: string;
  QuestionEn: string;
  Answer: string;
  AnswerEn: string;
}

export interface ContactItem {
  Platform: string;
  Title: string;
  TitleEn: string;
  Link: string;
}

export interface FaqContactsData {
  Faq: FaqItem[];
  Contacts: ContactItem[];
}

export interface FaqContactsResponse {
  message: string;
  error: boolean;
  code: number;
  data: FaqContactsData;
}

export interface DeveloperLogo {
  Name: string;
  Image: string;
}

export interface StoreLinks {
  Google: string;
  Apple: string;
}

export interface StatsResponse {
  message: string;
  error: boolean;
  code: number;
  data: {
    Stats: { City: number; Client: number; Units: number };
    Devs: Record<string, DeveloperLogo[]>;
    StoreLinks?: StoreLinks;
    meta?: { Source?: string; TimeLeft?: number };
  };
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${ADHAM_API_BASE}${path}`;
  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getTermsPrivacy(): Promise<TermsPrivacyResponse> {
  return fetchJson<TermsPrivacyResponse>("/api/v3/app/terms-privacy");
}

export async function getFaqContacts(): Promise<FaqContactsResponse> {
  return fetchJson<FaqContactsResponse>("/api/v3/app/faq-contacts");
}

/** Live stats — not cached so values match the upstream API on each request. */
async function fetchStats(): Promise<StatsResponse> {
  const url = `${ADHAM_API_BASE}/api/v3/app/stats`;
  const res = await fetch(url, {
    // Cache on the server for a short window to protect the upstream API
    // and speed up dynamic pages without changing layout/styles.
    next: { revalidate: STATS_REVALIDATE_SECONDS },
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API /api/v3/app/stats failed: ${res.status}`);
  }
  return res.json() as Promise<StatsResponse>;
}

const getStatsCached = unstable_cache(fetchStats, ["adham-stats"], {
  revalidate: STATS_REVALIDATE_SECONDS,
});

export async function getStats(): Promise<StatsResponse> {
  return getStatsCached();
}

export async function getStoreLinks(): Promise<StoreLinks> {
  try {
    const { data } = await getStats();
    if (data.StoreLinks?.Google && data.StoreLinks?.Apple) {
      return data.StoreLinks;
    }
  } catch {}
  return {
    Google: "https://play.google.com",
    Apple: "https://apps.apple.com",
  };
}

export function findLegalSection(
  data: TermsPrivacyData,
  sectionType: string,
): LegalSection | undefined {
  return data.Sections.find((s) => s.SectionType === sectionType);
}
