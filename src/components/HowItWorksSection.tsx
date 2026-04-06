import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

function StepNumber({ n }: { n: number }) {
  return (
    <span
      className="inline-flex rounded-full p-px"
      style={{
        background:
          "linear-gradient(90deg, rgba(45, 55, 72, 0.64) 26.34%, rgba(45, 55, 72, 0.24) 63.17%, rgba(45, 55, 72, 0) 100%)",
      }}
    >
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-medium text-primary">
        {n}
      </span>
    </span>
  );
}

export default async function HowItWorksSection() {
  const t = await getTranslations("HowItWorks");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  const steps = [
    {
      number: 1,
      text: t("step1"),
      image: "/images/how-step1-appstore.webp",
      imageAlt: t("step1Alt"),
    },
    {
      number: 2,
      text: t("step2"),
      image: "/images/how-step2-browse.webp",
      imageAlt: t("step2Alt"),
    },
    {
      number: 3,
      text: t("step3"),
      image: "/images/how-step3-booking.webp",
      imageAlt: t("step3Alt"),
    },
  ] as const;

  return (
    <section
      id="how-it-works"
      className="py-20 font-medium leading-none tracking-normal sm:py-24"
    >
      <div className="container">
        <h2 className="text-primary">{t("heading")}</h2>

        {/* Desktop zigzag layout */}
        <div className="mt-14 hidden lg:block">
          <div className="relative">
            {/* Step 1: text left, phone right */}
            <div className="grid grid-cols-2 items-center gap-16">
              <div className="max-w-sm">
                <StepNumber n={1} />
                <p className="mt-4 text-primary/80">{steps[0].text}</p>
              </div>
              <div className="flex justify-center">
                <Image
                  src={steps[0].image}
                  alt={steps[0].imageAlt}
                  width={320}
                  height={640}
                  className="h-auto w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>

            {/* Connector 1: from step 1 (right) to step 2 (left) */}
            <div className="relative my-[-40px] flex justify-center">
              <Image
                src="/images/vector-connector-2.webp"
                alt=""
                width={500}
                height={300}
                className={`h-auto w-[250px] ${isArabic ? "scale-x-[-1]" : ""}`}
              />
            </div>

            {/* Step 2: phone left, text right */}
            <div className="grid grid-cols-2 items-center gap-16">
              <div className="flex justify-center">
                <Image
                  src={steps[1].image}
                  alt={steps[1].imageAlt}
                  width={320}
                  height={640}
                  className="h-auto w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                />
              </div>
              <div className="max-w-sm">
                <StepNumber n={2} />
                <p className="mt-4 text-primary/80">{steps[1].text}</p>
              </div>
            </div>

            {/* Connector 2: from step 2 (left) to step 3 (right) */}
            <div className="relative my-[-40px] flex justify-center">
              <Image
                src="/images/vector-connector-1.webp"
                alt=""
                width={200}
                height={500}
                className={`h-auto w-[420px] ${isArabic ? "scale-x-[-1]" : ""}`}
              />
            </div>

            {/* Step 3: text left, phone right */}
            <div className="grid grid-cols-2 items-center gap-16">
              <div className="max-w-sm">
                <StepNumber n={3} />
                <p className="mt-4 text-primary/80">{steps[2].text}</p>
                <a
                  href="#download"
                  className="mt-6 inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-2.5 text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  {t("getApp")}
                </a>
              </div>
              <div className="flex justify-center">
                <Image
                  src={steps[2].image}
                  alt={steps[2].imageAlt}
                  width={320}
                  height={640}
                  className="h-auto w-[280px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet stacked layout */}
        <div className="mt-12 flex flex-col gap-16 lg:hidden">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center gap-6 text-center"
            >
              <StepNumber n={step.number} />
              <p className="max-w-sm text-primary/80">{step.text}</p>
              <Image
                src={step.image}
                alt={step.imageAlt}
                width={320}
                height={640}
                className="h-auto w-[260px] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
              />
              {i === 2 && (
                <a
                  href="#download"
                  className="mt-2 inline-flex items-center justify-center rounded-full border border-primary/20 px-6 py-2.5 text-primary transition-colors hover:bg-primary hover:text-white"
                >
                  {t("getApp")}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
