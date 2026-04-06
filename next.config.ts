import type { NextConfig } from "next";
const BuildDistDir = process.env.NEXT_BUILD_DIST_DIR?.trim();
const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  distDir: BuildDistDir && BuildDistDir.length > 0 ? BuildDistDir : ".next",
  reactStrictMode: false,
  turbopack: {
    root: process.cwd()
  }
};

export default nextConfig;
