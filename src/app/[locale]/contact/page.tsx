import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import ContactSection from "@/components/faq/ContactSection";
import { getFaqContacts } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  const isArabic = locale === "ar";
  return {
    title: t("title"),
    description: t("subtitle"),
    keywords: isArabic
      ? [
          "اتصل بنا",
          "تواصل أدهم فتح الله",
          "أدهم فتح الله تواصل",
          "دعم عقاري مصر",
        ]
      : [
          "contact Adham Fathallah",
          "Adham Fathallah contact",
          "real estate support Egypt",
        ],
    alternates: {
      canonical: "/contact",
      languages: { en: "/contact", ar: "/ar/contact" },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  let contacts: Awaited<
    ReturnType<typeof getFaqContacts>
  >["data"]["Contacts"];

  try {
    const res = await getFaqContacts();
    contacts = res.data.Contacts;
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-5xl px-4 py-8">
          <p className="text-primary">{t("loadError")}</p>
        </div>
      </LegalPageShell>
    );
  }

  return (
    <LegalPageShell>
      <div className="container max-w-5xl px-4">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-2 text-sm text-primary/65 sm:text-base">
            {t("subtitle")}
          </p>
        </header>
        <ContactSection contacts={contacts} showHeading={false} />
      </div>
    </LegalPageShell>
  );
}
