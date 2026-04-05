"use client";

import { useEffect, useState } from "react";

export function useActiveSection(
  sectionIds: readonly string[],
  headerOffsetPx: number,
) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

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

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sectionIds, headerOffsetPx]);

  return activeId;
}
