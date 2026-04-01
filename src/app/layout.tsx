import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Tajawal:wght@200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
