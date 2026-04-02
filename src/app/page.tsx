import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import ChoosingPropertySection from "@/components/ChoosingPropertySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TrustedDevelopersSection from "@/components/TrustedDevelopersSection";
import ProfessionalismSection from "@/components/ProfessionalismSection";
import DownloadCTA from "@/components/DownloadCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProblemSection />
      <ChoosingPropertySection />
      <HowItWorksSection />
      <TrustedDevelopersSection />
      <ProfessionalismSection />
      <DownloadCTA />
      <Footer />
    </>
  );
}
