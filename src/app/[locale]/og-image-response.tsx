import { ImageResponse } from "next/og";
import { SEO, getSiteUrl } from "@/lib/constants";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const interBold = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.16/files/inter-latin-700-normal.ttf",
).then((r) => r.arrayBuffer());

const notoArabic = fetch(
  "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-arabic@5.1.0/files/noto-sans-arabic-arabic-500-normal.ttf",
).then((r) => r.arrayBuffer());

function truncate(s: string, max: number) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

export async function createOgImage(locale: string, title: string, description: string) {
  const isAr = locale === "ar";
  const [fontEn, fontAr] = await Promise.all([interBold, notoArabic]);
  const fonts = isAr
    ? [
        {
          name: "NotoArabic",
          data: fontAr,
          weight: 500 as const,
          style: "normal" as const,
        },
      ]
    : [
        {
          name: "Inter",
          data: fontEn,
          weight: 700 as const,
          style: "normal" as const,
        },
      ];

  const host = new URL(getSiteUrl()).host;
  const headline = truncate(title, isAr ? 72 : 80);
  const sub = truncate(description, isAr ? 140 : 160);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #2D3748 0%, #3B4A63 42%, #1a202c 100%)",
          color: "#F7F8FA",
          padding: 56,
          fontFamily: isAr ? "NotoArabic" : "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            direction: isAr ? "rtl" : "ltr",
            textAlign: isAr ? "right" : "left",
          }}
        >
          <div
            style={{
              fontSize: headline.length > 50 ? 44 : 52,
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: isAr ? 0 : -0.02,
            }}
          >
            {headline}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(247,248,250,0.88)",
              lineHeight: 1.45,
              maxWidth: 980,
            }}
          >
            {sub}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            direction: "ltr",
          }}
        >
          <div style={{ fontSize: 28, color: "#c4956a", fontWeight: 700 }}>
            Adham Fathallah
          </div>
          <div style={{ fontSize: 22, color: "rgba(247,248,250,0.55)" }}>
            {host}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

/** Default home / layout OG copy from SEO constants. */
export async function createDefaultOgImage(locale: string) {
  const seo = locale === "ar" ? SEO.ar : SEO.en;
  return createOgImage(locale, seo.title, seo.description);
}
