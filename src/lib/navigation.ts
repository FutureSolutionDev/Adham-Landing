/** Hash target id for in-page links (e.g. `/#home` → `home`). */
export function linkSectionId(href: string): string {
  if (href.startsWith("/#")) return href.slice(2);
  if (href.startsWith("#")) return href.slice(1);
  return "";
}

/** Standalone routes (used before nav link arrays). */
export const legalRoutes = {
  faq: "/faq",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",
} as const;

export const navbarLinks = [
  { labelKey: "home" as const, href: "/#home" },
  { labelKey: "features" as const, href: "/#features" },
  { labelKey: "howItWork" as const, href: "/#how-it-works" },
  { labelKey: "developers" as const, href: "/#developers" },
  { labelKey: "faq" as const, href: legalRoutes.faq },
  { labelKey: "contact" as const, href: legalRoutes.contact },
] as const;

/** FAQ & Contact appear in the footer only (not in the main navbar). */
export const footerLinks = [
  { labelKey: "home" as const, href: "/#home" },
  { labelKey: "features" as const, href: "/#features" },
  { labelKey: "developers" as const, href: "/#developers" },
  { labelKey: "faq" as const, href: legalRoutes.faq },
  { labelKey: "contact" as const, href: legalRoutes.contact },
] as const;

export const scrollSpySectionIds = [
  "home",
  "features",
  "how-it-works",
  "developers",
] as const;

/** Active state: hash links on home, or full path match for routes like `/faq`. */
export function isNavLinkActive(
  href: string,
  pathname: string,
  isHome: boolean,
  activeSectionId: string,
): boolean {
  if (href.startsWith("/#") || href.startsWith("#")) {
    return isHome && activeSectionId === linkSectionId(href);
  }
  return pathname === href;
}

/** Footer bottom row — legal pages only (FAQ & Contact are in `footerLinks`). */
export const legalPageLinks = [
  { labelKey: "terms" as const, href: legalRoutes.terms },
  { labelKey: "privacy" as const, href: legalRoutes.privacy },
] as const;
