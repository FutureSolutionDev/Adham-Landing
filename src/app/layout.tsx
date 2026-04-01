import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Find Your Ideal Unit with Ease",
    template: "%s — Master Land",
  },
  description:
    "Explore exclusive units with live prices, clear layouts, and flexible payment plans with expert support.",
  applicationName: "Master Land",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Master Land",
    title: "Find Your Ideal Unit with Ease",
    description:
      "Explore exclusive units with live prices, clear layouts, and flexible payment plans with expert support.",
    url: "/",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Master Land",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Your Ideal Unit with Ease",
    description:
      "Explore exclusive units with live prices, clear layouts, and flexible payment plans with expert support.",
    images: ["/android-chrome-512x512.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} antialiased`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
