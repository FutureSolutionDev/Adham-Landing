"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  isNavLinkActive,
  navbarLinks,
  scrollSpySectionIds,
} from "@/lib/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Link, usePathname } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";

const HEADER_SCROLL_OFFSET_PX = 96;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSectionId = useActiveSection(
    scrollSpySectionIds,
    HEADER_SCROLL_OFFSET_PX,
  );
  const t = useTranslations("Nav");

  const handleNavClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        setMobileOpen(false);
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
      setMobileOpen(false);

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", href);
    },
    [pathname],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        scrolled
          ? "bg-surface backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between gap-4 py-4 md:gap-8">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.webp"
            alt="Master Land"
            width={40}
            height={40}
            className="h-10 w-10"
            priority
          />
        </Link>

        <div className="hidden flex-1 items-center justify-end gap-10 md:flex">
          <ul className="flex items-center gap-10">
            {navbarLinks.map((link) => {
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
                    className={` font-medium leading-none tracking-[-0.01em] transition-colors ${
                      isActive
                        ? "text-copper"
                        : "text-primary hover:text-primary/80"
                    }`}
                    onClick={handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
          <LocaleSwitcher />
        </div>

        {/* Mobile hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <LocaleSwitcher />
          <button
            className="flex flex-col gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t("toggleMenu")}
          >
            <span
              className={`h-0.5 w-6 bg-navy transition-transform ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-6 bg-navy transition-transform ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="border-t border-navy/10 bg-cream px-6 pb-6 md:hidden">
          <ul className="flex flex-col gap-4 pt-4">
            {navbarLinks.map((link) => {
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
                    className={`font-medium leading-none tracking-[-0.01em] transition-colors ${
                      isActive
                        ? "text-copper"
                        : "text-navy/70 hover:text-navy"
                    }`}
                    onClick={handleNavClick(link.href)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
