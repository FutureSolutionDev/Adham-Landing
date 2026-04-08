import type { Metadata } from "next";
import LegalContentPage from "@/components/legal/LegalContentPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: t("description"),
    keywords: isArabic
      ? ["سياسة الخصوصية", "حماية البيانات", "أدهم فتح الله"]
      : ["privacy policy", "data protection", "Adham Fathallah privacy"],
    alternates: {
      canonical: "/privacy",
      languages: { en: "/privacy", ar: "/ar/privacy" },
    },
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");

  return (
    <LegalContentPage
      sectionType="privacy_policy"
      locale={locale}
      translations={{
        loadError: t("loadError"),
        notFound: t("notFound"),
        lastUpdated: t("lastUpdated"),
        version: t("version"),
      }}
    />
  );
}
