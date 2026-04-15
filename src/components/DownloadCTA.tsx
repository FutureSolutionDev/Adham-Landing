import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getStoreLinks } from "@/lib/api/adham";

export default async function DownloadCTA() {
  const [t, storeLinks] = await Promise.all([
    getTranslations("DownloadCTA"),
    getStoreLinks(),
  ]);

  return (
    <section id="download" className="relative py-16">
      <div
        id="faq"
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden"
        aria-hidden="true"
      />
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-2xl bg-surface px-6 py-10 text-center  sm:px-10">
          <h3 className="text-2xl font-medium leading-none text-primary sm:text-[32px]">
            {t("heading")}
            <br />
            {t("headingLine2")}
          </h3>
          <p className="mt-3 text-lg font-normal leading-none text-primary sm:text-[24px]">
            {t("sub")}
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={storeLinks.Google}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 rounded-2xl bg-primary px-8 py-4 text-white shadow-sm transition-colors hover:bg-primary-light"
            >
              <Image
                src="/images/google-play-icon.webp"
                alt=""
                width={29}
                height={34}
                className="h-[34px] w-[29px] shrink-0"
              />
              <span className="flex flex-col items-start leading-none">
                <span className="text-base font-medium text-white/70">{t("getItOn")}</span>
                <span className="text-2xl font-semibold">{t("googlePlay")}</span>
              </span>
            </a>

            <a
              href={storeLinks.Apple}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 rounded-2xl bg-primary px-8 py-4 text-white shadow-sm transition-colors hover:bg-primary-light"
            >
              <Image
                src="/images/apple-icon.webp"
                alt=""
                width={29}
                height={34}
                className="h-[34px] w-[29px] shrink-0"
              />
              <span className="flex flex-col items-start leading-none">
                <span className="text-base font-medium text-white">{t("getItOn")}</span>
                <span className="text-2xl font-semibold">{t("appleStore")}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
