import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";
import BackToTop from "@/components/BackToTop";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-tajawal",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Adham Fathallah — Find Your Ideal Property Unit with Ease | Master Land",
    template: "%s — Adham Fathallah | Master Land",
  },
  description:
    "Browse exclusive real-estate units in Egypt's top compounds with live prices, transparent layouts, flexible payment plans, and free expert consultation. Download the Adham Fathallah app today.",
  applicationName: "Master Land",
  keywords: [
    "Adham Fathallah",
    "Master Land",
    "real estate Egypt",
    "compounds Egypt",
    "property finder",
    "buy apartment Egypt",
    "New Cairo real estate",
    "flexible payment plans",
    "live property prices",
    "real estate app",
    "عقارات مصر",
    "شقق للبيع",
    "كمبوندات",
    "أدهم فتح الله",
  ],
  authors: [{ name: "Adham Fathallah" }],
  creator: "Adham Fathallah",
  publisher: "Master Land",
  category: "Real Estate",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Master Land — Adham Fathallah",
    title:
      "Adham Fathallah — Find Your Ideal Property Unit with Ease",
    description:
      "Browse exclusive real-estate units in Egypt's top compounds with live prices, transparent layouts, flexible payment plans, and free expert consultation.",
    url: "/",
    images: [
      {
        url: "/android-chrome-512x512.webp",
        width: 512,
        height: 512,
        alt: "Adham Fathallah — Master Land",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Adham Fathallah — Find Your Ideal Property Unit with Ease",
    description:
      "Browse exclusive real-estate units in Egypt's top compounds with live prices, transparent layouts, and flexible payment plans.",
    images: ["/android-chrome-512x512.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.webp", sizes: "16x16", type: "image/webp" },
      { url: "/favicon-32x32.webp", sizes: "32x32", type: "image/webp" },
    ],
    apple: [
      {
        url: "/apple-touch-icon.webp",
        sizes: "180x180",
        type: "image/webp",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Adham Fathallah — Master Land",
  url: siteUrl,
  logo: `${siteUrl}/android-chrome-512x512.webp`,
  description:
    "Browse exclusive real-estate units in Egypt's top compounds with live prices, transparent layouts, flexible payment plans, and free expert consultation.",
  areaServed: {
    "@type": "Country",
    name: "Egypt",
  },
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${tajawal.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <BackToTop />
      </body>
    </html>
  );
}
