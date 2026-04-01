import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Master Land",
    short_name: "Master Land",
    description:
      "Explore exclusive units with live prices, clear layouts, and flexible payment plans with expert support.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F8FA",
    theme_color: "#2D3748",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}

