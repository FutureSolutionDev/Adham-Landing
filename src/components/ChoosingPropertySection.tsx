import Image from "next/image";
import { getTranslations } from "next-intl/server";

type Feature = {
  title: string;
  body: string;
};

function FeatureBlock({ title, body }: Feature) {
  return (
    <div className="max-w-sm">
      <h3 className="text-base  font-medium text-primary sm:text-lg">
        {title}
      </h3>
      <p className="mt-2 text-sm w-58  font-normal text-primary sm:text-base">
        {body}
      </p>
    </div>
  );
}

export default async function ChoosingPropertySection() {
  const t = await getTranslations("Choosing");

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 416"
          fill="none"
          className="h-auto w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M-61.8598 25.2214C-60.3245 9.83424 -46.6065 -1.39448 -31.2191 0.140381C118.372 15.0623 263.182 57.5548 370.141 96.0261C423.731 115.301 468.071 133.66 499.069 147.225C500.527 147.864 501.956 148.492 503.355 149.109C530.788 71.3885 604.892 15.6972 692.003 15.697C802.46 15.697 892.003 105.24 892.003 215.697C892.003 222 891.71 228.234 891.139 234.388C1033.76 214.919 1171.62 174.152 1276.56 136.906C1332.88 116.918 1379.48 98.0288 1411.95 84.1609C1428.18 77.2288 1440.86 71.5559 1449.45 67.6355C1453.75 65.6755 1457.02 64.1544 1459.19 63.1326C1460.28 62.6217 1461.09 62.2354 1461.63 61.9822C1461.89 61.8557 1462.09 61.7622 1462.21 61.7029C1462.27 61.6734 1462.32 61.6528 1462.34 61.6404C1462.36 61.6343 1462.36 61.6296 1462.37 61.6277C1462.37 61.6268 1462.37 61.6272 1462.37 61.6267V61.6277C1476.3 54.9145 1493.03 60.7613 1499.75 74.6892C1506.46 88.6183 1500.62 105.354 1486.69 112.07L1474.53 86.8503C1486.59 111.864 1486.68 112.072 1486.68 112.077L1486.6 112.112C1486.56 112.135 1486.49 112.166 1486.41 112.206C1486.24 112.285 1486 112.399 1485.69 112.546C1485.08 112.84 1484.18 113.267 1483 113.819C1480.65 114.925 1477.19 116.533 1472.7 118.581C1463.73 122.676 1450.62 128.535 1433.94 135.66C1400.59 149.906 1352.89 169.238 1295.29 189.68C1183.07 229.512 1032.38 273.879 876.629 292.717C846.465 364.94 775.163 415.697 692.003 415.697C581.546 415.697 492.003 326.154 492.003 215.697C492.003 212.267 492.089 208.856 492.259 205.469C487.537 203.343 482.314 201.021 476.618 198.528C446.566 185.377 403.405 167.504 351.188 148.722C246.535 111.081 106.511 70.1563 -36.7787 55.863C-52.1659 54.3277 -63.3947 40.6088 -61.8598 25.2214Z"
            fill="var(--color-surface)"
          />
        </svg>
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
                    src="/images/phone-mockup.webp"
                    alt={t("phoneAlt")}
                    width={420}
                    height={820}
                    className="h-auto w-[230px] -rotate-12 drop-shadow-[0_24px_50px_rgba(0,0,0,0.16)]"
                    priority
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
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Image
                src="/images/phone-mockup.webp"
                alt={t("phoneAlt")}
                width={520}
                height={980}
                className="h-auto w-[260px]"
                priority
              />
            </div>

            {/* Right – top */}
            <div className="absolute top-[30%] xl:top-[10%] lg:right-50 xl:right-0 max-w-[260px]">
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
