import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const BuildDistDir = process.env.NEXT_BUILD_DIST_DIR?.trim();

const nextConfig: NextConfig = {
  output: "standalone",
  distDir: BuildDistDir && BuildDistDir.length > 0 ? BuildDistDir : ".next",
  reactStrictMode: false,
  turbopack: {
    root: process.cwd(),
  },
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 560, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Keep low so `/_next/image` and CDNs revalidate after deploys (was 1y → browsers showed long-lived disk cache).
    minimumCacheTTL: Number(300),
    remotePatterns: [
      {
        protocol: "https",
        hostname: "master-cdn.futuresolutionsdev.com",
        pathname: "/cdn/**",
      },
    ],
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value:
            "public, max-age=300, stale-while-revalidate=86400, must-revalidate",
        },
      ],
    },
    {
      source: "/:path(.+\\.(?:js|css|woff2?))",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=30, stale-while-revalidate=30",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
