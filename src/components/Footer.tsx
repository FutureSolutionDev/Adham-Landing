"use client";

import { useCallback } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  footerLinks,
  isNavLinkActive,
  legalPageLinks,
  scrollSpySectionIds,
} from "@/lib/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Link, usePathname } from "@/i18n/navigation";
import { LINKS } from "@/lib/constants";

const HEADER_SCROLL_OFFSET_PX = 96;

const socials = [
  { label: "Instagram", href: LINKS.socials.instagram },
  { label: "YouTube", href: LINKS.socials.youtube },
  { label: "Facebook", href: LINKS.socials.facebook },
  { label: "WhatsApp", href: LINKS.socials.whatsapp },
] as const;

function SocialIcon({ label }: { label: (typeof socials)[number]["label"] }) {
  if (label === "Instagram")
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    );
  if (label === "YouTube")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22.54 6.42a2.79 2.79 0 0 0-1.96-1.97C18.88 4 12 4 12 4s-6.88 0-8.58.45A2.79 2.79 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58 2.79 2.79 0 0 0 1.96 1.97C5.12 20 12 20 12 20s6.88 0 8.58-.45a2.79 2.79 0 0 0 1.96-1.97A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    );
  if (label === "Facebook")
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activeSectionId = useActiveSection(
    scrollSpySectionIds,
    HEADER_SCROLL_OFFSET_PX,
  );
  const t = useTranslations("Footer");

  const handleFooterClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.slice(2);
        if (pathname === "/") {
          const el = document.getElementById(id);
          if (!el) return;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", href);
        } else {
          window.location.assign(href);
        }
        return;
      }
      if (!href.startsWith("#")) return;
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    },
    [pathname],
  );

  return (
    <footer className="bg-primary">
      <div className="container py-10">
        {/* Top row */}
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/images/logo.webp"
              alt="Master Land"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </Link>

          {/* Nav links */}
          <ul className="flex flex-wrap items-center gap-6">
            {footerLinks.map((link) => {
              const isActive = isNavLinkActive(
                link.href,
                pathname,
                isHome,
                activeSectionId,
              );
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? "text-copper-light"
                        : "text-surface hover:text-white"
                    }`}
                    onClick={handleFooterClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Social icons */}
          <ul className="flex items-center gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http")
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {})}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface text-primary hover:border-white/50 hover:text-gray-500"
                >
                  <SocialIcon label={s.label} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/10" />

        {/* Bottom row */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-surface">{t("rights")}</p>
          <ul className="flex flex-wrap items-center gap-6">
            {legalPageLinks.map((item) => {
              const isLegalActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`text-sm transition-colors hover:text-white/80 ${
                      isLegalActive ? "text-copper-light" : "text-surface"
                    }`}
                    aria-current={isLegalActive ? "page" : undefined}
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </footer>
  );
}
