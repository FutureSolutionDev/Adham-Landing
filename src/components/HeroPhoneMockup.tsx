"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroPhoneMockupProps = {
  isArabic: boolean;
  alt: string;
  /** When screen is >= breakpointPx -> display block, otherwise none */
  breakpointPx?: number;
};

export default function HeroPhoneMockup({
  isArabic,
  alt,
  breakpointPx = 1025,
}: HeroPhoneMockupProps) {
  const [isOverBreakpoint, setIsOverBreakpoint] = useState<boolean>(false);
  /** Which phone asset to show: 1200–1499px vs ≥1500px (set in JS, not Tailwind breakpoints). */
  const [phoneVariant, setPhoneVariant] = useState<"mid" | "large" | null>(null);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${breakpointPx}px)`);

    const update = () => setIsOverBreakpoint(media.matches);
    update();

    // Safari < 14 fallback
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, [breakpointPx]);

  useEffect(() => {
    const m1200 = window.matchMedia("(min-width: 1200px)");
    const m1500 = window.matchMedia("(min-width: 1600px)");

    const syncPhoneVariant = () => {
      if (m1500.matches) setPhoneVariant("large");
      else if (m1200.matches) setPhoneVariant("mid");
      else setPhoneVariant(null);
    };

    syncPhoneVariant();

    const add = (m: MediaQueryList, fn: () => void) => {
      if (typeof m.addEventListener === "function") {
        m.addEventListener("change", fn);
      } else {
        m.addListener(fn);
      }
    };
    const remove = (m: MediaQueryList, fn: () => void) => {
      if (typeof m.removeEventListener === "function") {
        m.removeEventListener("change", fn);
      } else {
        m.removeListener(fn);
      }
    };

    add(m1200, syncPhoneVariant);
    add(m1500, syncPhoneVariant);

    return () => {
      remove(m1200, syncPhoneVariant);
      remove(m1500, syncPhoneVariant);
    };
  }, []);

  const bottomOffsetPx =
    phoneVariant === "large" ? 140 : phoneVariant === "mid" ? 120 : 80;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-28 z-10 items-end justify-center lg:inset-x-auto lg:top-32 lg:w-1/2 ${
        isArabic
          ? "lg:left-0 lg:right-auto lg:justify-end"
          : "lg:right-0 lg:left-auto lg:justify-end"
      }`}
      style={{
        display: isOverBreakpoint ? "flex" : "none",
        bottom: `-${bottomOffsetPx}px`,
      }}
    >
      {phoneVariant === "mid" && (
        <Image
          src="/images/phone.webp"
          alt={alt}
          width={500}
          height={809}
          sizes="(min-width: 1200px) and (max-width: 1499px) min(92vw, 560px), 100vw"
          quality={90}
          className="block h-auto w-auto max-h-[min(72vh,809px)] max-w-[min(92vw,560px)] object-contain object-bottom"
          priority
        />
      )}
      {phoneVariant === "large" && (
        <Image
          src="/images/phone.webp"
          alt={alt}
          width={650}
          height={809}
          sizes="(min-width: 1500px) min(90vw, 400px), 100vw"
          quality={90}
          className="block h-auto w-auto max-h-[min(58vh,650px)] max-w-[min(90vw,400px)] object-contain object-bottom"
          priority
        />
      )}
    </div>
  );
}

