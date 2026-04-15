import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

type Feature = {
  title: string;
  body: string;
};

function FeatureBlock({ title, body }: Feature) {
  return (
    <div className="max-w-sm">
      <h3 className="text-xl font-medium leading-none text-primary sm:text-[28px]">
        {title}
      </h3>
      <p className="mt-2 text-base font-normal leading-none text-primary sm:text-[20px]">
        {body}
      </p>
    </div>
  );
}

export default async function ChoosingPropertySection() {
  const t = await getTranslations("Choosing");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  const left: Feature[] = [
    { title: t("f1Title"), body: t("f1Body") },
    { title: t("f2Title"), body: t("f2Body") },
  ];

  const right: Feature[] = [
    { title: t("f3Title"), body: t("f3Body") },
    { title: t("f4Title"), body: t("f4Body") },
  ];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white py-20 sm:py-24"
    >
      {/* Full-width wave + circle (inline SVG from design) */}
      <div className="pointer-events-none absolute inset-x-0 top-[60%] -translate-y-1/2">
        <Image src="/images/Union.png" alt="wave" width={100} height={100} className="w-full h-auto object-contain" />
      </div>

      <div className="container relative">
        <h2 className="mx-auto max-w-2xl text-center text-2xl font-semibold tracking-tight text-primary sm:text-3xl">
          {t("headingLine1")}{" "}
          <br className="hidden sm:block" />
          {t("headingLine2")}
        </h2>

        <div className="relative mt-12">
          {/* Mobile / small screens (stacked) */}
          <div className="grid items-center gap-10 lg:hidden">
            <div className="flex flex-col items-center gap-10 text-center">
              <FeatureBlock {...left[0]} />
              <FeatureBlock {...right[0]} />
            </div>

            <div className="flex justify-center">
              <div className="relative h-[320px] w-[320px]">
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Image
                    src="/images/Group 3.png"
                    alt={t("phoneAlt")}
                    width={420}
                    height={820}
                    sizes="230px"
                    className="h-auto w-[230px] -rotate-12 drop-shadow-[0_24px_50px_rgba(0,0,0,0.16)]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-10 text-center">
              <FeatureBlock {...left[1]} />
              <FeatureBlock {...right[1]} />
            </div>
          </div>

          {/* Desktop */}
          <div className="relative hidden h-[520px] lg:block">
            {/* Left – top */}
            <div className="absolute top-[5%] xl:top-0 lg:left-40 xl:left-0 max-w-[260px]">
              <FeatureBlock {...left[0]} />
            </div>
            {/* Left – bottom */}
            <div className="absolute top-[56%] lg:left-40 xl:left-0 max-w-[260px]">
              <FeatureBlock {...left[1]} />
            </div>

            {/* Centre phone */}
            <div
              className="macp-phone absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <Image
                src="/images/Group 3.png"
                alt={t("phoneAlt")}
                width={350}
                height={980}
                sizes="300px"
                className="h-auto w-[250px]"
              />
            </div>

            {/* Right – top */}
            <div className="absolute top-[10%] xl:top-[30%] lg:right-50 xl:right-0 max-w-[260px]">
              <FeatureBlock {...right[0]} />
            </div>
            {/* Right – bottom */}
            <div className="absolute top-[75%] lg:right-50 xl:right-0 max-w-[260px]">
              <FeatureBlock {...right[1]} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
