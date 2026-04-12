import type { Metadata } from "next";
import nextDynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProfessionalismSection from "@/components/ProfessionalismSection";
import TrustedDevelopersSection from "@/components/TrustedDevelopersSection";
import { getStats } from "@/lib/api/adham";
import { getTranslations, setRequestLocale } from "next-intl/server";

const ProblemSection = nextDynamic(() => import("@/components/ProblemSection"));
const ChoosingPropertySection = nextDynamic(
  () => import("@/components/ChoosingPropertySection"),
);
const HowItWorksSection = nextDynamic(() => import("@/components/HowItWorksSection"));
const DownloadCTA = nextDynamic(() => import("@/components/DownloadCTA"));
const Footer = nextDynamic(() => import("@/components/Footer"));

/** Home loads fresh stats from the API each time (not a static snapshot). */
export const dynamic = "force-dynamic";

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

  let devsByCity: Record<string, { Name: string; Image: string }[]> | undefined;
  try {
    const res = await getStats();
    devsByCity = res.data.Devs;
  } catch {
    /* TrustedDevelopersSection can load without initial data */
  }

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <ChoosingPropertySection />
        <HowItWorksSection />
        <ProfessionalismSection />
        <TrustedDevelopersSection initialDevsByCity={devsByCity} />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
