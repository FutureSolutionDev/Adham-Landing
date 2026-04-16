"use client";

import { useEffect, useRef, useState } from "react";

const THRESHOLD_BUFFER_PX = 8;
const BOTTOM_TOLERANCE_PX = 60;

export function useActiveSection(
  sectionIds: readonly string[],
  headerOffsetPx: number,
) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");
  const rafId = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      if (sectionIds.length === 0) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - BOTTOM_TOLERANCE_PX;
      if (atBottom) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      let current = sectionIds[0] ?? "";
      const threshold = headerOffsetPx + THRESHOLD_BUFFER_PX;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
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
