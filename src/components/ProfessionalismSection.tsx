"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type TabKey = "sales" | "financial" | "legal";

const tabs: { key: TabKey; label: string }[] = [
  { key: "sales", label: "Sales" },
  { key: "financial", label: "Financial" },
  { key: "legal", label: "Legal Affairs" },
];

const contentByTab: Record<
  TabKey,
  { title: string; body: string; imageSrc: string; imageAlt: string }
> = {
  sales: {
    title: "Sales & Investment Management Team",
    body:
      "Our experts are your direct bridge to the best opportunities. They help you understand the market, provide smart investment recommendations, and accompany you until the deal is finalized to ensure maximum return.",
    imageSrc: "/images/team.webp",
    imageAlt: "Sales & investment management team",
  },
  financial: {
    title: "Financial & Administrative Team",
    body:
      "We guarantee you complete transparency in all financial matters. This team is dedicated to designing flexible and clear payment systems and managing all financial details with precision for a secure and smooth transaction.",
    imageSrc: "/images/prof-financial.webp",
    imageAlt: "Financial & administrative team",
  },
  legal: {
    title: "Legal Affairs & Regulatory Department",
    body:
      "We prioritize your legal safety. Our legal team verifies all property documentation and reviews contracts to ensure every transaction is completed within a sound and secure legal framework, giving you total peace of mind.",
    imageSrc: "/images/proflegal.webp",
    imageAlt: "Legal affairs & regulatory department",
  },
};

type StatFormat = "kPlus1Decimal" | "plusInt" | "int";

function formatStat(value: number, format: StatFormat) {
  if (format === "kPlus1Decimal") {
    const k = value / 1000;
    return `+${k.toFixed(1)} K`;
  }
  if (format === "plusInt") return `+${Math.round(value)}`;
  return `${Math.round(value)}`;
}

function useCountUp({
  start,
  end,
  durationMs,
  enabled,
}: {
  start: number;
  end: number;
  durationMs: number;
  enabled: boolean;
}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) {
      let cancelled = false;
      const id = requestAnimationFrame(() => {
        if (!cancelled) setValue(end);
      });
      return () => {
        cancelled = true;
        cancelAnimationFrame(id);
      };
    }

    const startTime = performance.now();
    const from = start;
    const to = end;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(from + (to - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [durationMs, enabled, end, start]);

  return value;
}

function StatCard({
  label,
  end,
  format,
  enabled,
}: {
  label: string;
  end: number;
  format: StatFormat;
  enabled: boolean;
}) {
  const animated = useCountUp({
    start: 0,
    end,
    durationMs: 900,
    enabled,
  });

  return (
    <div className="rounded-2xl bg-surface px-6 py-6 text-center">
      <div className="text-2xl font-semibold tracking-tight text-primary">
        {formatStat(animated, format)}
      </div>
      <div className="mt-2 text-sm text-primary">{label}</div>
    </div>
  );
}

export default function ProfessionalismSection() {
  const [active, setActive] = useState<TabKey>("sales");
  const content = contentByTab[active];
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    if (statsVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [statsVisible]);

  return (
    <section id="consultation" className="py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-semibold text-primary sm:text-3xl">
            We believe trust is built on professionalism.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-primary sm:text-lg">
            Every department in our team is designed to provide you with expert
            support at every step of your journey towards owning the perfect
            property.
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface bg-white p-1">
            {tabs.map((t) => {
              const isActive = t.key === active;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActive(t.key)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-copper-soft text-primary"
                      : "text-primary hover:text-primary"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_520px] lg:gap-12">
            <div className="text-center lg:text-left">
              <h3 className="text-lg font-semibold text-primary sm:text-xl">
                {content.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-primary sm:text-base">
                {content.body}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] overflow-hidden rounded-3xl bg-white shadow-[0_18px_55px_rgba(0,0,0,0.08)]">
                <div className="relative aspect-16/10 w-full">
                  <Image
                    src={content.imageSrc}
                    alt={content.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 520px, 90vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold text-primary sm:text-2xl">
            Adham by numbers
          </h3>

          <div
            ref={statsRef}
            className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6"
          >
            <StatCard
              end={4800}
              format="kPlus1Decimal"
              label="satisfied client"
              enabled={statsVisible}
            />
            <StatCard
              end={862}
              format="plusInt"
              label="residential & commercial unit"
              enabled={statsVisible}
            />
            <StatCard end={7} format="int" label="city" enabled={statsVisible} />
          </div>
        </div>
      </div>
    </section>
  );
}

