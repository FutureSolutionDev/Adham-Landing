"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const BASE = 700;

type DevLogo = { Name: string; Image: string };
type StatsPayload = { data?: { Devs?: Record<string, DevLogo[]> } };

function computeRingPositions(count: number, radius: number, angleOffsetRad = 0) {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + angleOffsetRad;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
}

const RINGS = [
  { max: 4, radius: 325, offset: 0.3,  tile: 62 },
  { max: 2, radius: 265, offset: -0.4, tile: 58 },
  { max: 2, radius: 200, offset: 0.6,  tile: 54 },
  { max: 2, radius: 145, offset: -0.2, tile: 50 },
  { max: 2, radius: 105, offset: 0.8,  tile: 46 },
] as const;

export default function TrustedDevelopersOrbit({
  fallbackSrc = "/images/trusted-developers.webp",
  intervalMs = 15000,
  initialDevsByCity,
}: {
  fallbackSrc?: string;
  intervalMs?: number;
  initialDevsByCity?: Record<string, DevLogo[]>;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  const hasServerData = initialDevsByCity && Object.keys(initialDevsByCity).length > 0;
  const [devsByCity, setDevsByCity] = useState<Record<string, DevLogo[]>>(
    initialDevsByCity ?? {},
  );
  const [cityIdx, setCityIdx] = useState(0);
  const [loading, setLoading] = useState(!hasServerData);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = () => {
      const w = el.getBoundingClientRect().width;
      if (w > 0) setScale(Math.min(1, w / BASE));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (hasServerData) return;
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as StatsPayload;
        const next = json.data?.Devs ?? {};
        if (!cancelled) setDevsByCity(next);
      } catch {
        // fallback UI shows instead
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [hasServerData]);

  const cities = useMemo(() => Object.keys(devsByCity), [devsByCity]);
  const currentCity = cities.length ? cities[cityIdx % cities.length] : null;
  const logos = currentCity ? devsByCity[currentCity] ?? [] : [];

  useEffect(() => {
    if (cities.length <= 1) return;
    const id = window.setInterval(
      () => setCityIdx((i) => (i + 1) % cities.length),
      intervalMs,
    );
    return () => window.clearInterval(id);
  }, [cities.length, intervalMs]);

  const ringLogos = useMemo(() => {
    let idx = 0;
    return RINGS.map((cfg) => {
      const slice = logos.slice(idx, idx + cfg.max);
      idx += cfg.max;
      return slice;
    });
  }, [logos]);

  return (
    <div ref={wrapperRef} className="w-full sm:max-w-[700px]">

      {scale === null ? (
        <div className="w-full animate-pulse rounded-full bg-[#F2F2F2]" style={{ aspectRatio: "1 / 1" }} />

      ) : loading ? (
        (() => {
          const s = scale;
          const size = Math.round(BASE * s);
          return (
            <div className="relative mx-auto animate-pulse rounded-full" style={{ width: size, height: size }}>
              <div className="absolute inset-[2%] rounded-full border-[1.5px] border-[#EBEBEB]" />
              <div className="absolute inset-[12%] rounded-full border-[1.5px] border-[#EBEBEB]" />
              <div className="absolute inset-[22%] rounded-full border-[1.5px] border-[#EBEBEB]" />
              <div className="absolute inset-[32%] rounded-full border-[1.5px] border-[#EBEBEB]" />
              <div className="absolute inset-[42%] rounded-full border-[1.5px] border-[#EBEBEB]" />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2F2F2]"
                style={{ width: Math.round(140 * s), height: Math.round(140 * s) }}
              />
              {RINGS.map((cfg, ri) =>
                computeRingPositions(cfg.max, cfg.radius * s, cfg.offset).map((p, i) => (
                  <div key={`sk-${ri}-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                    <div className="-translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10" style={{ width: Math.round(cfg.tile * s), height: Math.round(cfg.tile * s) }} />
                  </div>
                ))
              )}
            </div>
          );
        })()

      ) : !cities.length || logos.length === 0 ? (
        <Image src={fallbackSrc} alt="" width={720} height={720} sizes="(min-width: 640px) 700px, 100vw" className="h-auto w-full" />

      ) : (
        (() => {
          const s = scale;
          const size       = Math.round(BASE * s);
          const centerSize = Math.round(140 * s);
          const centerPad  = Math.max(12, Math.round(28 * s));
          const tilePad    = Math.max(4, Math.round(8 * s));

          return (
            <div className="relative mx-auto rounded-full" style={{ width: size, height: size }}>
              {/* 5 orbit ring outlines */}
              <div className="absolute inset-[2%] rounded-full border-[1.5px] border-[#EBEBEB]"  style={{ animation: "orbitRotate 30s linear infinite" }} />
              <div className="absolute inset-[12%] rounded-full border-[1.5px] border-[#EBEBEB]" style={{ animation: "orbitRotateReverse 26s linear infinite" }} />
              <div className="absolute inset-[22%] rounded-full border-[1.5px] border-[#EBEBEB]" style={{ animation: "orbitRotate 22s linear infinite" }} />
              <div className="absolute inset-[32%] rounded-full border-[1.5px] border-[#EBEBEB]" style={{ animation: "orbitRotateReverse 18s linear infinite" }} />
              <div className="absolute inset-[42%] rounded-full border-[1.5px] border-[#EBEBEB]" style={{ animation: "orbitRotate 14s linear infinite" }} />

              {/* Center circle with logo */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface"
                style={{ width: centerSize, height: centerSize }}
              >
                <div className="relative h-full w-full">
                  <Image src="/logo.svg" alt="AF Property" fill style={{ padding: centerPad }} priority />
                </div>
              </div>

              {/* 5 rings — 2 individual logo tiles per ring */}
              {RINGS.map((cfg, ri) => {
                const items = ringLogos[ri] ?? [];
                const positions = computeRingPositions(items.length, cfg.radius * s, cfg.offset);
                const tileSize = Math.round(cfg.tile * s);

                return items.map((d, i) => {
                  const p = positions[i] ?? { x: 0, y: 0 };
                  return (
                    <div key={`r${ri}-${d.Name}-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                      <div className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-surface shadow-sm" style={{ width: tileSize, height: tileSize }}>
                        <Image src={d.Image} alt={d.Name} width={cfg.tile} height={cfg.tile} className="h-full w-full rounded-2xl object-contain" style={{ padding: tilePad }} unoptimized />
                      </div>
                    </div>
                  );
                });
              })}
            </div>
          );
        })()
      )}
    </div>
  );
}
