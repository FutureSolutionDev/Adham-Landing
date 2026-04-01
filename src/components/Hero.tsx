import Image from "next/image";

export default function Hero() {
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
          className="h-full w-full"
        />
      </div>
      <div className="absolute bottom-0 left-0 h-[50%] w-[80%] overflow-hidden">
        <Image
          src="/images/bg-botton.webp"
          alt=""
          width={900}
          height={600}
          className="h-full w-full"
        />
      </div>
      <div className="absolute bottom-0 right-0 hidden h-[50%] w-[20%] overflow-hidden sm:block">
        <Image
          src="/images/Hand-Drawn Ink  Brush Strokes.webp"
          alt=""
          width={900}
          height={600}
          className="h-full w-full"
        />
      </div>

      <div className="container relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-6">
        {/* Left content */}
        <div className="relative flex w-full flex-col items-center text-center lg:w-2/3 lg:items-start lg:text-left">
          <h1 className="font-(--font-playfair) text-5xl leading-[1.1] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Find your ideal{" "}
            <span className="inline-flex translate-y-1 items-center">
              <span className="mx-2">
                <Image src="/images/tabler_home.webp" alt="Master Land" width={50} height={50} />
              </span>
            </span>
            unit
            <br />
            with Ease
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary/50 sm:text-xl">
            Explore exclusive units with live prices, clear layouts,
            and flexible payment plans with expert support.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-2xl bg-primary px-8 py-4 text-base font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg"
            >
              Download App Now!
            </a>
            <a
              href="#consultation"
              className="inline-flex items-center justify-center rounded-2xl border border-primary/20 bg-white/70 px-8 py-4 text-base font-semibold text-primary transition-all hover:border-primary/35 hover:bg-white hover:shadow-md"
            >
              Get Free Consultation
            </a>
          </div>
          <Image
            src="/images/arrow.webp"
            alt=""
            width={220}
            height={140}
            className="pointer-events-none absolute -top-40 left-[65%] hidden lg:block"
            priority
          />
        </div>

        {/* Right side — arrow + phone */}
        <div className="relative flex w-full items-center justify-center lg:w-1/3 lg:justify-end">
          <Image
            src="/images/phone.webp"
            alt="Hero image"
            width={500}
            height={500}
            className="h-auto w-[340px] sm:w-[440px] lg:-translate-y-20 lg:w-[500px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
