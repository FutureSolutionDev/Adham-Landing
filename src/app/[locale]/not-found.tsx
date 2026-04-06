import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("NotFound");
  return {
    title: t("title"),
    robots: { index: false, follow: true },
  };
}

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <>
      <Navbar />
      <main className="relative min-h-[calc(100vh-10rem)] overflow-hidden bg-linear-to-b from-cream via-surface to-cream-dark/40 pt-24 pb-20">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-copper/15 blur-[100px]" />
          <div className="absolute -right-32 bottom-0 h-[480px] w-[480px] rounded-full bg-primary/6 blur-[110px]" />
          <div className="absolute left-1/2 top-[18%] h-px w-[min(90%,42rem)] -translate-x-1/2 bg-linear-to-r from-transparent via-copper/20 to-transparent" />
        </div>

        <div className="container relative flex min-h-[min(36rem,calc(100vh-12rem))] flex-col items-center justify-center px-4">
          <div className="w-full max-w-md rounded-4xl border border-primary/7 bg-white/90 p-9 shadow-[0_32px_100px_rgba(45,55,72,0.1)] backdrop-blur-md sm:max-w-lg sm:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6 flex flex-col items-center gap-5">
                <p
                  className="bg-linear-to-br from-primary via-primary to-primary/45 bg-clip-text text-7xl font-bold leading-none tracking-tight text-transparent sm:text-8xl"
                  aria-hidden="true"
                >
                  404
                </p>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-cream-dark to-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] ring-1 ring-primary/8">
                  <Image
                    src="/images/tabler_home.webp"
                    alt=""
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-copper/20 bg-copper-soft/25 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/75">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-copper" />
                {t("badge")}
              </span>

              <h1 className="mt-5 text-[1.35rem] font-semibold leading-snug tracking-tight text-primary sm:text-2xl">
                {t("heading")}
              </h1>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary/65 sm:text-[15px]">
                {t("description")}
              </p>

              <div className="mt-9 grid w-full gap-3 sm:grid-cols-2 sm:gap-4">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(45,55,72,0.2)] transition-all hover:bg-primary-light hover:shadow-[0_18px_44px_rgba(45,55,72,0.16)]"
                >
                  {t("backHome")}
                </Link>
                <Link
                  href="/#features"
                  className="inline-flex items-center justify-center rounded-2xl border border-primary/18 bg-white px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:border-primary/32 hover:bg-cream/50"
                >
                  {t("viewFeatures")}
                </Link>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-sm text-center text-xs leading-relaxed text-primary/40">
            {t("footnote")}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
