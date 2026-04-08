import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic, Inter, Tajawal } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import BackToTop from "@/components/BackToTop";
import { routing } from "@/i18n/routing";
import { LINKS, SEO } from "@/lib/constants";
import "../globals.css";

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

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isArabic = locale === "ar";
  const seo = isArabic ? SEO.ar : SEO.en;
  const title = seo.title || t("homeTitle");
  const description = seo.description || t("homeDescription");

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: title,
      template: `%s — Adham Fathallah`,
    },
    description,
    applicationName: "Adham Fathallah",
    keywords: seo.keywords,
    authors: [{ name: "Adham Fathallah" }],
    creator: "Adham Fathallah",
    publisher: "Adham Fathallah",
    category: "Real Estate",
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      siteName: t("siteName"),
      title,
      description,
      url: "/",
      images: [
        {
          url: "/android-chrome-512x512.webp",
          width: 512,
          height: 512,
          alt: "Adham Fathallah",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
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
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Adham Fathallah",
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.webp`,
    description: t("homeDescription"),
    areaServed: {
      "@type": "Country",
      name: "Egypt",
    },
    sameAs: [
      LINKS.socials.instagram,
      LINKS.socials.youtube,
      LINKS.socials.facebook,
    ],
  };

  const dir = locale === "ar" ? "rtl" : "ltr";
  const htmlClass = `${inter.variable} ${tajawal.variable} ${ibmPlexArabic.variable} antialiased`;
  const bodyStyle =
    locale === "ar"
      ? ({
          ["--font-sans" as never]: "var(--font-ibm-plex-arabic)",
        } as React.CSSProperties)
      : undefined;

  return (
    <html
      lang={locale}
      dir={dir}
      className={htmlClass}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={bodyStyle} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
