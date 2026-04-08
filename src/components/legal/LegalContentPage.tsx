import { LegalArticleView } from "./LegalArticleBlocks";
import LegalPageShell from "./LegalPageShell";
import type { LegalSection, TermsPrivacyData } from "@/lib/api/adham";
import { findLegalSection, getTermsPrivacy } from "@/lib/api/adham";

type Props = {
  sectionType: string;
  locale: string;
  translations: {
    loadError: string;
    notFound: string;
    lastUpdated: string;
    version: string;
  };
};

export default async function LegalContentPage({
  sectionType,
  locale,
  translations,
}: Props) {
  const isArabic = locale === "ar";

  let meta: TermsPrivacyData;
  let section: LegalSection | undefined;

  try {
    const res = await getTermsPrivacy();
    meta = res.data;
    section = findLegalSection(res.data, sectionType);
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">{translations.loadError}</p>
        </div>
      </LegalPageShell>
    );
  }

  if (!section) {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">{translations.notFound}</p>
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
            {translations.lastUpdated} {meta.LastUpdated} ·{" "}
            {translations.version} {meta.Version}
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
