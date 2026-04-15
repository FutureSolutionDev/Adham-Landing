"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type HeroPhoneMockupProps = {
  isArabic: boolean;
  alt: string;
};

export default function HeroPhoneMockup({ isArabic, alt }: HeroPhoneMockupProps) {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1600px)");

    const update = () => setIsLarge(mq.matches);
    update();

    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const imgWidth = isLarge ? 650 : 450;
  const bottomOffsetPx = isLarge ? 140 : 120;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-28 z-10 flex items-end justify-center max-[1199px]:hidden lg:inset-x-auto lg:top-32 lg:w-1/2 ${
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
        // className={`block h-auto w-auto object-contain object-bottom max-h-[min(72vh,809px)] max-w-[min(50vw,450px)] min-[1600px]:max-h-[min(58vh,650px)] min-[1600px]:max-w-[min(50vw,650px)]`}
        priority
      />
    </div>
  );
}
