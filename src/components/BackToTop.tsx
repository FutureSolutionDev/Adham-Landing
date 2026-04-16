"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function BackToTop() {
  const t = useTranslations("Aria");
  const [visible, setVisible] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsRtl(document.documentElement.dir === "rtl");
  }, []);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const obs = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(Boolean(entry?.isIntersecting)),
      { root: null, threshold: 0.01 },
    );

    obs.observe(footer);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className={[
        "fixed z-60 flex flex-col items-end gap-3",
        isRtl ? "left-6" : "right-6",
        isFooterVisible ? "bottom-6" : "bottom-6",
      ].join(" ")}
    >
      <LocaleSwitcher />
      {visible && (
        <button
          type="button"
          aria-label={t("backToTop")}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="cursor-pointer inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.34,1.35,0.64,1)] will-change-transform hover:-translate-y-px hover:scale-[1.06] hover:bg-primary-light hover:shadow-[0_22px_48px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 5l-7 7m7-7l7 7M12 5v14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

