"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroPhoneMockupProps = {
  isArabic: boolean;
  alt: string;
};

export default function HeroPhoneMockup({ isArabic, alt }: HeroPhoneMockupProps) {
  const [phoneVariant, setPhoneVariant] = useState<"mid" | "large" | null>(null);

  useEffect(() => {
    const m1200 = window.matchMedia("(min-width: 1200px)");
    const m1500 = window.matchMedia("(min-width: 1600px)");

    const sync = () => {
      if (m1500.matches) setPhoneVariant("large");
      else if (m1200.matches) setPhoneVariant("mid");
      else setPhoneVariant(null);
    };
    sync();

    const add = (m: MediaQueryList, fn: () => void) => {
      if (typeof m.addEventListener === "function")
        m.addEventListener("change", fn);
      else m.addListener(fn);
    };
    const remove = (m: MediaQueryList, fn: () => void) => {
      if (typeof m.removeEventListener === "function")
        m.removeEventListener("change", fn);
      else m.removeListener(fn);
    };

    add(m1200, sync);
    add(m1500, sync);
    return () => {
      remove(m1200, sync);
      remove(m1500, sync);
    };
  }, []);

  if (!phoneVariant) return null;

  const imgWidth = phoneVariant === "large" ? 650 : 450;
  const bottomOffsetPx = phoneVariant === "large" ? 140 : 120;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-28 z-10 flex items-end justify-center lg:inset-x-auto lg:top-32 lg:w-1/2 ${
        isArabic
          ? "lg:left-0 lg:right-auto lg:justify-end"
          : "lg:right-0 lg:left-auto lg:justify-end"
      }`}
      style={{ bottom: `-${bottomOffsetPx}px` }}
    >
      <Image
        src="/images/phone.webp"
        alt={alt}
        width={imgWidth}
        height={Math.round(imgWidth * (873 / 528))}
        className={`block h-auto w-auto object-contain object-bottom ${
          phoneVariant === "large"
            ? "max-h-[min(58vh,650px)] max-w-[min(50vw,650px)]"
            : "max-h-[min(72vh,809px)] max-w-[min(50vw,450px)]"
        }`}
        priority
      />
    </div>
  );
}
