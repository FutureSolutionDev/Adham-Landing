"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-2 rounded-full border border-primary/15 bg-white/60 px-2 py-1 text-xs font-semibold text-primary/80 backdrop-blur-sm md:text-[13px]"
      role="navigation"
      aria-label={t("ariaLabel")}
    >
      <Link
        href={pathname}
        locale="en"
        className={`rounded-full px-2 py-0.5 transition-colors ${
          locale === "en"
            ? "bg-copper-soft text-primary"
            : "text-primary/60 hover:text-primary"
        }`}
      >
        {t("en")}
      </Link>
      <span className="text-primary/25" aria-hidden>
        |
      </span>
      <Link
        href={pathname}
        locale="ar"
        className={`rounded-full px-2 py-0.5 transition-colors ${
          locale === "ar"
            ? "bg-copper-soft text-primary"
            : "text-primary/60 hover:text-primary"
        }`}
      >
        {t("ar")}
      </Link>
    </div>
  );
}
