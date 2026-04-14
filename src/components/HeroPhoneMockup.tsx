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

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 top-28 z-10 items-end justify-center lg:inset-x-auto lg:top-32 lg:w-1/2 ${
        isArabic
          ? "lg:left-0 lg:right-auto lg:justify-end"
          : "lg:right-0 lg:left-auto lg:justify-end"
      }`}
      style={{ display: isOverBreakpoint ? "flex" : "none" }}
    >
      <Image
        src="/images/phone.webp"
        alt={alt}
        width={420}
        height={809}
        sizes="(max-width: 1599px) min(92vw, 560px), min(90vw, 400px)"
        quality={90}
        className="block h-auto w-auto max-h-[min(72vh,809px)] max-w-[min(92vw,560px)] object-contain object-bottom min-[1600px]:max-h-[min(58vh,650px)] min-[1600px]:max-w-[min(90vw,400px)]"
        priority
      />
    </div>
  );
}

