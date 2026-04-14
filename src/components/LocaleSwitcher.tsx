"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  const targetLocale = locale === "ar" ? "en" : "ar";
  const ariaLabel =
    targetLocale === "en" ? t("switchToEnglish") : t("switchToArabic");
  const label = targetLocale === "en" ? "EN" : "AR";

  /* Same surface + motion as BackToTop button */
  return (
    <Link
      href={pathname}
      locale={targetLocale}
      aria-label={ariaLabel}
      className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-primary text-[13px] font-semibold tracking-widest text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition-all duration-300 ease-[cubic-bezier(0.34,1.35,0.64,1)] will-change-transform hover:-translate-y-px hover:scale-[1.06] hover:bg-primary-light hover:shadow-[0_22px_48px_rgba(0,0,0,0.22)] active:translate-y-0 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      {label}
    </Link>
  );
}
