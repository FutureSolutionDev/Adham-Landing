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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "master-cdn.futuresolutionsdev.com",
        pathname: "/cdn/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
