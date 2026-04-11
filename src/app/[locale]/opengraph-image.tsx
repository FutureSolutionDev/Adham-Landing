import { createDefaultOgImage, OG_SIZE } from "./og-image-response";

export const alt = "Adham Fathallah — Real estate in Egypt";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return createDefaultOgImage(locale);
}
