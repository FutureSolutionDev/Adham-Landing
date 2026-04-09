import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ChoosingPropertySection from "@/components/ChoosingPropertySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustedDevelopersSection from "@/components/TrustedDevelopersSection";
import ProfessionalismSection from "@/components/ProfessionalismSection";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";
import { getStats } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    alternates: {
      canonical: "/",
      languages: { en: "/", ar: "/ar" },
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  let stats: { clients: number; units: number; cities: number } | undefined;
  try {
    const res = await getStats();
    stats = {
      clients: res.data.Stats.Client,
      units: res.data.Stats.Units,
      cities: res.data.Stats.City,
    };
  } catch {
    /* falls back to defaults inside ProfessionalismSection */
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ChoosingPropertySection />
        <HowItWorksSection />
        <ProfessionalismSection stats={stats} />
        <TrustedDevelopersSection />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
