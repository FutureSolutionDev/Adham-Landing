import Image from "next/image";
import { storeLinks } from "@/lib/store-links";

export default function DownloadCTA() {
  return (
    <section id="download" className="relative py-16">
      <div
        id="fqa"
        className="pointer-events-none absolute left-0 top-0 h-px w-px overflow-hidden"
        aria-hidden="true"
      />
      <div className="container">
        <div className="mx-auto max-w-3xl rounded-3xl bg-surface px-6 py-10 text-center  sm:px-10">
          <h3 className="text-xl font-semibold leading-snug text-primary sm:text-2xl">
            finding proper property is much simpler
            <br />
            when search with adham
          </h3>
          <p className="mt-3 text-sm text-primary sm:text-base">
            See for yourself, try Adham&apos;s App for free.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a
              href={storeLinks.googlePlay}
              target={storeLinks.googlePlay.startsWith("http") ? "_blank" : undefined}
              rel={
                storeLinks.googlePlay.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-white shadow-sm transition-colors hover:bg-primary-light"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center">
                <Image
                  src="/images/google-play-icon.webp"
                  alt=""
                  width={28}
                  height={28}
                  className="h-6 w-6"
                />
              </span>
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-white/70">Get it on</span>
                <span className="text-sm font-semibold">Google Play</span>
              </span>
            </a>

            <a
              href={storeLinks.appStore}
              target={storeLinks.appStore.startsWith("http") ? "_blank" : undefined}
              rel={
                storeLinks.appStore.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="inline-flex items-center gap-3 rounded-2xl bg-primary px-5 py-3 text-white shadow-sm transition-colors hover:bg-primary-light"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center">
                <Image
                  src="/images/apple-icon.webp"
                  alt=""
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
              </span>
              <span className="flex flex-col items-start leading-none">
                <span className="text-[10px] text-white/70">Get it on</span>
                <span className="text-sm font-semibold">Apple store</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

