import { getTranslations } from "next-intl/server";
import TrustedDevelopersOrbit from "@/components/TrustedDevelopersOrbit";

export default async function TrustedDevelopersSection() {
  const t = await getTranslations("TrustedDevelopers");

  return (
    <section id="developers" className="py-16 sm:py-20">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <TrustedDevelopersOrbit />
          </div>

          {/* Right text */}
          <div className="max-lg:text-center ">
            <h3 className="text-2xl font-semibold text-primary sm:text-3xl">
              {t("heading")}
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary sm:text-lg lg:mx-0 mx-auto">
              {t("body")}
            </p>

            <div className="mt-7">
              <a
                href="#developers"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                {t("cta")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
