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
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "How it work", href: "/#how-it-works" },
  { label: "Developers", href: "/#developers" },
] as const;

/** FAQ & Contact appear in the footer only (not in the main navbar). */
export const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Features", href: "/#features" },
  { label: "Developers", href: "/#developers" },
  { label: "FAQ", href: legalRoutes.faq },
  { label: "Contact", href: legalRoutes.contact },
] as const;

export const scrollSpySectionIds = [
  "home",
  "features",
  "how-it-works",
  "developers",
  "fqa",
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
  { label: "Terms & conditions", href: legalRoutes.terms },
  { label: "Privacy policy", href: legalRoutes.privacy },
] as const;
