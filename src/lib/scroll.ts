export const HEADER_OFFSET_PX = 96;

export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top =
    window.scrollY + el.getBoundingClientRect().top - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  return true;
}
