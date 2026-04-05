import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function LegalPageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-linear-to-b from-cream via-surface to-cream-dark/30 pt-24 pb-16">
        {children}
      </div>
      <Footer />
    </>
  );
}
