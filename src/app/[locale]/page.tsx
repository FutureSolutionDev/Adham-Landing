import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { getStats } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

const ProblemSection = dynamic(() => import("@/components/ProblemSection"));
const ChoosingPropertySection = dynamic(() => import("@/components/ChoosingPropertySection"));
const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection"));
const ProfessionalismSection = dynamic(() => import("@/components/ProfessionalismSection"));
const TrustedDevelopersSection = dynamic(() => import("@/components/TrustedDevelopersSection"));
const DownloadCTA = dynamic(() => import("@/components/DownloadCTA"));
const Footer = dynamic(() => import("@/components/Footer"));

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
  let devsByCity: Record<string, { Name: string; Image: string }[]> | undefined;
  try {
    const res = await getStats();
    stats = {
      clients: res.data.Stats.Client,
      units: res.data.Stats.Units,
      cities: res.data.Stats.City,
    };
    devsByCity = res.data.Devs;
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
        <TrustedDevelopersSection initialDevsByCity={devsByCity} />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
