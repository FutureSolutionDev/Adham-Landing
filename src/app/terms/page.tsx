import type { Metadata } from "next";
import { LegalArticleView } from "@/components/legal/LegalArticleBlocks";
import LegalPageShell from "@/components/legal/LegalPageShell";
import type { LegalSection } from "@/lib/api/adham";
import { findLegalSection, getTermsPrivacy } from "@/lib/api/adham";

/** Avoid calling the CMS at build time if the API is unreachable. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Adham Fathallah platform operated by AF Property.",
};

export default async function TermsPage() {
  let meta: Awaited<ReturnType<typeof getTermsPrivacy>>["data"];
  let section: LegalSection | undefined;

  try {
    const res = await getTermsPrivacy();
    meta = res.data;
    section = findLegalSection(res.data, "TermsOfUse");
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">
            Unable to load terms. Please try again later.
          </p>
        </div>
      </LegalPageShell>
    );
  }

  if (!section) {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">Terms of use could not be found.</p>
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
            {section.TitleEn}
          </h1>
          <p className="mt-2 font-serif text-sm text-primary/65" dir="rtl">
            {section.Title}
          </p>
          <p className="mt-4 text-xs text-primary/50">
            Last updated {meta.LastUpdated} · Version {meta.Version}
          </p>
        </header>
        <div className="space-y-12">
          {articles.map((article) => (
            <LegalArticleView key={article.ArticleId} article={article} />
          ))}
        </div>
      </div>
    </LegalPageShell>
  );
}
