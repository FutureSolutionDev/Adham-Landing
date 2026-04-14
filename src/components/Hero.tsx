import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Hero() {
  const t = await getTranslations("Hero");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Background brush texture */}
      <div className="absolute left-0 top-20 h-[50%] w-[80%] overflow-hidden">
        <Image
          src="/images/bg-top.webp"
          alt=""
          width={1200}
          height={150}
          sizes="80vw"
          priority
          className="h-full w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-[50%] w-[80%] overflow-hidden">
        <Image
          src="/images/bg-botton.webp"
          alt=""
          width={900}
          height={600}
          sizes="80vw"
          className="h-full w-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 hidden h-[50%] w-[20%] overflow-hidden sm:block">
        <Image
          src="/images/Hand-Drawn Ink  Brush Strokes.webp"
          alt=""
          width={900}
          height={600}
          sizes="20vw"
          className="h-full w-full"
        />
      </div>

      <div className="container relative z-20 flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6">
        {/* Left content — above phone mockups */}
        <div className="relative z-30 flex w-full flex-col items-center max-lg:text-center lg:w-2/3 lg:items-start">
          <h1
            className="font-semibold tracking-normal text-primary leading-[1.1]"
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              // 64px (4rem) cap; reaches max from ~1150px+ viewport width
              fontSize: "clamp(1.75rem, 5vw + 0.5rem, 4rem)",
            }}
          >
            {t("titleBefore")}{" "}
            <span className="inline-flex translate-y-[0.125em] items-center">
              <span className="mx-2">
                <Image
                  src="/images/tabler_home.webp"
                  alt={t("logoAlt")}
                  width={50}
                  height={50}
                />
              </span>
            </span>{" "}
            {t("titleMiddle")}
            <br />
            {t("titleAfter")}
          </h1>

          <p
            className="mt-8 max-w-lg font-medium tracking-normal text-primary leading-[100%] text-[clamp(1rem,2.2vw+0.5rem,1.75rem)] sm:text-[28px]"
            style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
          >
            {t("subtitle")}
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg"
            >
              {t("download")}
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white/70 px-8 py-4 text-base font-semibold text-primary transition-all hover:border-primary/35 hover:bg-white hover:shadow-md"
            >
              {t("consultation")}
            </Link>
          </div>
          <Image
            src="/images/arrow.webp"
            alt=""
            width={220}
            height={140}
            className={`pointer-events-none absolute -top-40 hidden lg:block ${
              isArabic ? "right-[65%] scale-x-[-1]" : "left-[65%]"
            }`}
            priority
          />
        </div>

       
      </div>
      {/* Phone: one image; tighter cap at 1600px+ (e.g. 1536×864 uses the larger slot only) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-28 z-10 flex items-end justify-center lg:inset-x-auto lg:right-0 lg:top-32 lg:w-1/2 lg:justify-end">
        <Image
          src="/images/phone.webp"
          alt={t("heroImageAlt")}
          width={420}
          height={809}
          sizes="(max-width: 1599px) min(92vw, 560px), min(90vw, 400px)"
          quality={90}
          className="h-auto w-auto max-h-[min(72vh,809px)] max-w-[min(92vw,560px)] object-contain object-bottom min-[1600px]:max-h-[min(58vh,650px)] min-[1600px]:max-w-[min(90vw,400px)]"
          priority
        />
      </div>
    </section>
  );
}
