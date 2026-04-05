/** Base URL for Adham public API — edit here if the host changes. */
export const ADHAM_API_BASE = "https://adham.futuresolutionsdev.com";

const REVALIDATE_SECONDS = 3600;

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

export function findLegalSection(
  data: TermsPrivacyData,
  sectionType: string,
): LegalSection | undefined {
  return data.Sections.find((s) => s.SectionType === sectionType);
}
