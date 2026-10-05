import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import DeleteAccountForm from "@/components/DeleteAccountForm";
import LegalPageShell from "@/components/legal/LegalPageShell";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "DeleteAccount" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/delete-account",
      languages: { en: "/delete-account", ar: "/ar/delete-account" },
    },
  };
}

const DELETED_KEYS = ["deleted1", "deleted2", "deleted3", "deleted4"] as const;
const KEPT_KEYS = ["kept1", "kept2", "kept3"] as const;

export default async function DeleteAccountPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("DeleteAccount");

  return (
    <LegalPageShell>
      <div className="container max-w-3xl px-4">
        <header className="mb-8 border-b border-primary/10 pb-6">
          <h1 className="text-3xl font-semibold text-primary text-balance sm:text-4xl">{t("title")}</h1>
          <p className="mt-4 leading-7 text-primary/80">{t("intro")}</p>
        </header>
        <section className="grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-primary">{t("deletedHeading")}</h2>
            <ul className="mt-2 list-disc space-y-1 ps-5 leading-7 text-primary/80">
              {DELETED_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-copper">{t("keptHeading")}</h2>
            <ul className="mt-2 list-disc space-y-1 ps-5 leading-7 text-primary/80">
              {KEPT_KEYS.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ul>
          </div>
        </section>
        <DeleteAccountForm locale={locale} />
      </div>
    </LegalPageShell>
  );
}
