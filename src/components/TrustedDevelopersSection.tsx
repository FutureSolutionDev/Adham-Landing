import { getTranslations } from "next-intl/server";
import TrustedDevelopersOrbit from "@/components/TrustedDevelopersOrbit";

type DevLogo = { Name: string; Image: string };

export default async function TrustedDevelopersSection({
  initialDevsByCity,
}: {
  initialDevsByCity?: Record<string, DevLogo[]>;
}) {
  const t = await getTranslations("TrustedDevelopers");

  return (
    <section id="developers" className="py-16 sm:py-20">
      <div className="container">
        <div className="grid items-center  lg:grid-cols-2  overflow-hidden">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <TrustedDevelopersOrbit initialDevsByCity={initialDevsByCity} />
          </div>

          {/* Right text */}
          <div className="max-lg:text-center ">
            <h3 className="text-2xl  font-medium text-primary sm:text-3xl">
              {t("heading")}
            </h3>
            <p className="mt-4 max-w-md text-base leading-relaxed font-normal text-primary sm:text-lg lg:mx-0 mx-auto">
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
