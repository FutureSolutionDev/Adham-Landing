import type { Metadata } from "next";
import LegalContentPage from "@/components/legal/LegalContentPage";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Terms" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: t("description"),
    keywords: isArabic
      ? ["شروط الاستخدام", "الشروط والأحكام", "أدهم فتح الله"]
      : ["terms of use", "terms and conditions", "Adham Fathallah terms"],
    alternates: {
      canonical: "/terms",
      languages: { en: "/terms", ar: "/ar/terms" },
    },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Terms");

  return (
    <LegalContentPage
      sectionType="TermsOfUse"
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
