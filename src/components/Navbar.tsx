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
import { HEADER_OFFSET_PX, scrollToSection } from "@/lib/scroll";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [forcedActiveSectionId, setForcedActiveSectionId] = useState(
    null as string | null,
  );
  const activeSectionId = useActiveSection(
    scrollSpySectionIds,
    HEADER_OFFSET_PX,
  );
  const t = useTranslations("Nav");

  // ✅ Breakpoint controlled by JS — 1200px exactly
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1200);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!forcedActiveSectionId) return;
    if (activeSectionId === forcedActiveSectionId) {
      setForcedActiveSectionId(null);
    }
  }, [activeSectionId, forcedActiveSectionId]);

  const handleNavClick = useCallback(
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith("/#")) {
        e.preventDefault();
        setMobileOpen(false);
        const id = href.slice(2);
        if (pathname === "/") {
          setForcedActiveSectionId(id);
          if (scrollToSection(id)) {
            history.replaceState(null, "", href);
          }
        } else {
          window.location.assign(href);
        }
        return;
      }
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setMobileOpen(false);

      const id = href.slice(1);
      setForcedActiveSectionId(id);
      if (scrollToSection(id)) {
        history.replaceState(null, "", href);
      }
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
      <nav className="container flex items-center justify-between gap-4 py-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.webp"
            alt="Adham Fathallah"
            width={50}
            height={50}
            className="h-18 w-18"
            priority
          />
        </Link>

        {/* ✅ Desktop nav — JS controlled, shows at >= 1200px */}
        {isDesktop === true && (
          <div className="flex flex-1 items-center gap-6">
            <div className="flex flex-1 justify-center">
              <ul className="flex items-center gap-10">
              {navbarLinks.map((link) => {
                const isActive = isNavLinkActive(
                  link.href,
                  pathname,
                  isHome,
                  forcedActiveSectionId ?? activeSectionId,
                );
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-xl md:text-base xl:text-xl font-medium leading-none tracking-[-0.01em] transition-colors ${
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
            </div>
            <div className="shrink-0">
              <LocaleSwitcher />
            </div>
          </div>
        )}

        {/* ✅ Mobile hamburger — JS controlled, shows at < 1200px */}
        {isDesktop === false && (
          <div className="flex items-center gap-3">
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={t("toggleMenu")}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-navy transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        )}
      </nav>

      {/* ✅ Mobile dropdown — only when hamburger is open */}
      {isDesktop === false && mobileOpen && (
        <div className="border-t border-navy/10 bg-cream px-6 pb-6">
          <ul className="flex flex-col gap-4 pt-4">
            {navbarLinks.map((link) => {
              const isActive = isNavLinkActive(
                link.href,
                pathname,
                isHome,
                forcedActiveSectionId ?? activeSectionId,
              );
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-xl md:text-base xl:text-xl font-medium leading-none tracking-[-0.01em] transition-colors ${
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
          <div
            className="flex pt-4"
            onClickCapture={() => setMobileOpen(false)}
          >
            <LocaleSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}