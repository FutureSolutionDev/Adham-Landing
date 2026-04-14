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
    minimumCacheTTL: 31536000,
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
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:path(.+\\.(?:js|css|woff2?))",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
