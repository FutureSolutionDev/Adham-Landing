import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import FaqAccordion from "@/components/faq/FaqAccordion";
import { getFaqContacts } from "@/lib/api/adham";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about the Adham Fathallah platform and AF Property.",
};

export default async function FaqPage() {
  let faq: Awaited<ReturnType<typeof getFaqContacts>>["data"]["Faq"];

  try {
    const res = await getFaqContacts();
    faq = res.data.Faq;
  } catch {
    return (
      <LegalPageShell>
        <div className="container max-w-3xl px-4 py-8">
          <p className="text-primary">
            Unable to load FAQ. Please try again later.
          </p>
        </div>
      </LegalPageShell>
    );
  }

  return (
    <LegalPageShell>
      <div className="container max-w-3xl px-4">
        <header className="mb-10 text-center">
          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">
            Frequently asked questions
          </h1>
          <p className="mt-2 text-sm text-primary/65">
            Answers about the Adham Fathallah platform and your data.
          </p>
        </header>

        <section aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="sr-only">
            FAQ
          </h2>
          <FaqAccordion items={faq} />
        </section>
      </div>
    </LegalPageShell>
  );
}
