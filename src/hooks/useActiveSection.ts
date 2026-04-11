"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(
  sectionIds: readonly string[],
  headerOffsetPx: number,
) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const rafId = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      let current = sectionIds[0] ?? "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= headerOffsetPx) {
          current = id;
          break;
        }
      }
      setActiveId(current);
    };

    const scheduleUpdate = () => {
      if (rafId.current) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [sectionIds, headerOffsetPx]);

  return activeId;
}
