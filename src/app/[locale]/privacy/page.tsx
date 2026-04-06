import type { Metadata } from "next";
import { LegalArticleView } from "@/components/legal/LegalArticleBlocks";
import LegalPageShell from "@/components/legal/LegalPageShell";
import type { LegalSection } from "@/lib/api/adham";
import { findLegalSection, getTermsPrivacy } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return {
    title: t("title"),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Privacy");
  const isArabic = locale === "ar";

  let meta: Awaited<ReturnType<typeof getTermsPrivacy>>["data"];
  let section: LegalSection | undefined;

  try {
    const res = await getTermsPrivacy();
    meta = res.data;
    section = findLegalSection(res.data, "privacy_policy");
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">{t("loadError")}</p>
        </div>
      </LegalPageShell>
    );
  }

  if (!section) {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">{t("notFound")}</p>
        </div>
      </LegalPageShell>
    );
  }

  const articles = [...section.Articles].sort((a, b) => a.Order - b.Order);

  return (
    <LegalPageShell>
      <div className="container max-w-3xl px-4">
        <header className="mb-10 border-b border-primary/10 pb-8">
          <p className="text-xs font-medium uppercase tracking-wider text-copper">
            {meta.CompanyName}
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">
            {isArabic ? section.Title : section.TitleEn}
          </h1>
          {!isArabic ? (
            <p className="mt-2 font-serif text-sm text-primary/65" dir="rtl">
              {section.Title}
            </p>
          ) : (
            <p className="mt-2 text-sm text-primary/65">{section.TitleEn}</p>
          )}
          <p className="mt-4 text-xs text-primary/50">
            Last updated {meta.LastUpdated} · Version {meta.Version}
          </p>
        </header>
        <div className="space-y-12">
          {articles.map((article) => (
            <LegalArticleView
              key={article.ArticleId}
              article={article}
              locale={isArabic ? "ar" : "en"}
            />
          ))}
        </div>
      </div>
    </LegalPageShell>
  );
}
