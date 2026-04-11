import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { getFaqContacts } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 3600;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Faq" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: isArabic
      ? [
          "الأسئلة الشائعة",
          "مساعدة أدهم فتح الله",
          "أسئلة عقارية",
          "أدهم فتح الله",
        ]
      : [
          "FAQ",
          "frequently asked questions",
          "Adham Fathallah help",
          "Adham Fathallah FAQ",
          "real estate FAQ Egypt",
        ],
    alternates: {
      canonical: "/faq",
      languages: { en: "/faq", ar: "/ar/faq" },
    },
  };
}

export default async function FaqPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Faq");

  let faq: Awaited<ReturnType<typeof getFaqContacts>>["data"]["Faq"];

  try {
    const res = await getFaqContacts();
    faq = res.data.Faq;
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">{t("loadError")}</p>
        </div>
      </LegalPageShell>
    );
  }

  return (
    <LegalPageShell>
      <div className="container max-w-3xl px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-primary/65">{t("subtitle")}</p>
        </header>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="sr-only">
            {t("sectionHeading")}
          </h2>
          <FaqAccordion items={faq} />
        </section>
      </div>
    </LegalPageShell>
  );
}
