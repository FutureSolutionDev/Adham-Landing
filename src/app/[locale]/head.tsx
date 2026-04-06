export default async function Head({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  if (!isArabic) return null;

  // Font is loaded via `next/font/google` in `app/[locale]/layout.tsx`.
  return null;
}

