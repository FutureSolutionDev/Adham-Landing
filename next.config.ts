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
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "master-cdn.futuresolutionsdev.com",
        pathname: "/cdn/**",
      },
      {
        protocol: "https",
        hostname: "cdn.masterv.net",
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
