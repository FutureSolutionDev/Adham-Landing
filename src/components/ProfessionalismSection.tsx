"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

type TabKey = "sales" | "financial" | "legal";

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
  value,
  format,
  enabled,
}: {
  label: string;
  value: number | null;
  format: StatFormat;
  enabled: boolean;
}) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const animated = useCountUp({
    start: 0,
    end: value ?? 0,
    durationMs: 900,
    enabled: hasMounted && enabled && value !== null,
  });

  if (value === null) {
    return (
      <div className="rounded-2xl bg-surface px-6 py-6 text-center">
        <div className="text-2xl font-semibold tracking-tight text-primary/45">
          —
        </div>
        <div className="mt-2 text-md font-normal text-primary">{label}</div>
      </div>
    );
  }

  /** Match SSR/first paint: never use `animated` until mounted; then prefer final value until count-up runs. */
  const shown =
    !hasMounted || !enabled ? value : animated;

  return (
    <div className="rounded-2xl bg-surface px-6 py-6 text-center">
      <div className="text-2xl font-semibold tracking-tight text-primary">
        {formatStat(shown, format)}
      </div>
      <div className="mt-2 text-md font-normal text-primary">{label}</div>
    </div>
  );
}

type Stats = { clients: number; units: number; cities: number };

function formatForClientCount(value: number): StatFormat {
  return value >= 1000 ? "kPlus1Decimal" : "plusInt";
}

type StatsApiPayload = {
  data?: { Stats?: { Client: number; Units: number; City: number } };
};

export default function ProfessionalismSection() {
  const t = useTranslations("Professionalism");
  const [active, setActive] = useState<TabKey>("sales");
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [liveStats, setLiveStats] = useState<Stats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/stats", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: StatsApiPayload) => {
        const s = json?.data?.Stats;
        if (cancelled || !s) return;
        setLiveStats({
          clients: s.Client,
          units: s.Units,
          cities: s.City,
        });
      })
      .catch(() => {
        if (!cancelled) setLiveStats(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const tabs: { key: TabKey; label: string }[] = [
    { key: "sales", label: t("tabSales") },
    { key: "financial", label: t("tabFinancial") },
    { key: "legal", label: t("tabLegal") },
  ];

  const contentByTab: Record<
    TabKey,
    { title: string; body: string; imageSrc: string; imageAlt: string }
  > = {
    sales: {
      title: t("salesTitle"),
      body: t("salesBody"),
      imageSrc: "/images/team.webp",
      imageAlt: t("salesImageAlt"),
    },
    financial: {
      title: t("financialTitle"),
      body: t("financialBody"),
      imageSrc: "/images/prof-financial.webp",
      imageAlt: t("financialImageAlt"),
    },
    legal: {
      title: t("legalTitle"),
      body: t("legalBody"),
      imageSrc: "/images/proflegal.webp",
      imageAlt: t("legalImageAlt"),
    },
  };

  const content = contentByTab[active];

  const clients = liveStats?.clients ?? null;
  const units = liveStats?.units ?? null;
  const cities = liveStats?.cities ?? null;

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
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [statsVisible]);

  return (
    <section id="consultation" className="py-16 sm:py-20">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-medium text-primary sm:text-3xl">
            {t("heading")}
          </h2>
          <p className="mt-3 text-base leading-relaxed font-normal text-primary sm:text-lg">
            {t("intro")}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-surface bg-white p-1">
            {tabs.map((tab) => {
              const isActive = tab.key === active;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActive(tab.key)}
                  className={`rounded-full cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-copper-soft text-primary"
                      : "text-primary hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 p-6 sm:p-10">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-0">
            <div className="max-lg:text-center flex flex-col justify-center h-full">
              <h3 className="text-lg font-medium text-primary sm:text-xl">
                {content.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed max-w-md max-lg:mx-auto font-normal text-primary sm:text-base">
                {content.body}
              </p>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[620px] overflow-hidden rounded-3xl">
                <div className="relative w-full h-[420px] ">
                  <Image
                    src={content.imageSrc}
                    alt={content.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center text-xl font-semibold text-primary sm:text-2xl">
            {t("numbersHeading")}
          </h3>

          <div
            ref={statsRef}
            className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6 "
          >
            <StatCard
              value={clients}
              format={
                clients === null ? "plusInt" : formatForClientCount(clients)
              }
              label={t("statClients")}
              enabled={statsVisible}
            />
            <StatCard
              value={units}
              format="plusInt"
              label={t("statUnits")}
              enabled={statsVisible}
            />
            <StatCard
              value={cities}
              format="int"
              label={t("statCities")}
              enabled={statsVisible}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
