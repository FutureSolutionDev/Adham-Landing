import Image from "next/image";

export default function TrustedDevelopersSection() {
  return (
    <section id="developers" className="py-16 sm:py-20">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left image */}
          <div className="flex items-center justify-center">
            <Image
              src="/images/trusted-developers.webp"
              alt="Trusted developers"
              width={720}
              height={720}
              className="h-auto w-full max-w-[520px]"
              priority
            />
          </div>

          {/* Right text */}
          <div className="text-center lg:text-left">
            <h3 className="text-2xl font-semibold text-primary sm:text-3xl">
              Trusted developers
            </h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-primary sm:text-lg lg:mx-0 mx-auto">
              We work with leading real estate developers to bring you verified
              projects, accurate unit details, and transparent pricing.
            </p>

            <div className="mt-7">
              <a
                href="#developers"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
              >
                Explore developer projects inside the app.
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

