import type { Metadata } from "next";
import LegalPageShell from "@/components/legal/LegalPageShell";
import ContactSection from "@/components/faq/ContactSection";
import { getFaqContacts } from "@/lib/api/adham";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Phone, WhatsApp, social channels, email, and office location for Adham Fathallah and AF Property.",
};

export default async function ContactPage() {
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
          <p className="text-primary">
            Unable to load contact information. Please try again later.
          </p>
        </div>
      </LegalPageShell>
    );
  }

  return (
    <LegalPageShell>
      <div className="container max-w-5xl px-4">
        <header className="mb-6 text-center sm:mb-8">
          <h1 className="text-3xl font-semibold text-primary sm:text-4xl">
            Contact us
          </h1>
          <p className="mt-2 text-sm text-primary/65 sm:text-base">
            Reach the team by phone, social, email, or visit our office.
          </p>
        </header>
        <ContactSection contacts={contacts} showHeading={false} />
      </div>
    </LegalPageShell>
  );
}
