"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const BASE = 520;

type DevLogo = { Name: string; Image: string };
type StatsPayload = { data?: { Devs?: Record<string, DevLogo[]> } };

function clampLogos(logos: DevLogo[], max: number) {
  return logos.slice(0, Math.max(0, max));
}

function computeRingPositions(count: number, radius: number, angleOffsetRad = 0) {
  if (count <= 0) return [];
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2 + angleOffsetRad;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  });
}

export default function TrustedDevelopersOrbit({
  fallbackSrc = "/images/trusted-developers.webp",
  intervalMs = 15000,
}: {
  fallbackSrc?: string;
  intervalMs?: number;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // null = not measured yet; avoids the 520px-overflow flash on first render.
  const [scale, setScale] = useState<number | null>(null);

  const [devsByCity, setDevsByCity] = useState<Record<string, DevLogo[]>>({});
  const [cityIdx, setCityIdx] = useState(0);
  const [loading, setLoading] = useState(true);

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
  }, []);

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

  const ring1 = clampLogos(logos, 12);
  const ring2 = clampLogos(logos.slice(12), 8);
  const ring3 = clampLogos(logos.slice(20), 6);

  return (
    // w-full on all screens, capped at 520px on sm+
    <div ref={wrapperRef} className="w-full sm:max-w-[520px]">

      {/* Pure-CSS placeholder shown before the container is measured.
          Uses aspect-ratio so it never overflows. */}
      {scale === null ? (
        <div className="w-full animate-pulse rounded-full bg-[#F2F2F2]" style={{ aspectRatio: "1 / 1" }} />

      ) : loading ? (
        /* ── Skeleton (scale is known, data still loading) ─────── */
        (() => {
          const s = scale;
          const size = Math.round(BASE * s);
          return (
            <div className="relative mx-auto animate-pulse rounded-full" style={{ width: size, height: size }}>
              <div className="absolute inset-[4%] rounded-full border border-[#F2F2F2]" />
              <div className="absolute inset-[16%] rounded-full border border-[#F2F2F2]" />
              <div className="absolute inset-[28%] rounded-full border border-[#F2F2F2]" />
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2F2F2]"
                style={{ width: Math.round(112 * s), height: Math.round(112 * s) }}
              />
              {computeRingPositions(12, 230 * s, 0.25).map((p, i) => (
                <div key={`sk1-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  <div className="-translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10" style={{ width: Math.round(56 * s), height: Math.round(56 * s) }} />
                </div>
              ))}
              {computeRingPositions(8, 160 * s, -0.15).map((p, i) => (
                <div key={`sk2-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  <div className="-translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10" style={{ width: Math.round(56 * s), height: Math.round(56 * s) }} />
                </div>
              ))}
              {computeRingPositions(6, 105 * s, 0.05).map((p, i) => (
                <div key={`sk3-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                  <div className="-translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10" style={{ width: Math.round(48 * s), height: Math.round(48 * s) }} />
                </div>
              ))}
            </div>
          );
        })()

      ) : !cities.length || logos.length === 0 ? (
        /* ── Fallback image ────────────────────────────────────── */
        <Image src={fallbackSrc} alt="" width={720} height={720} className="h-auto w-full" priority />

      ) : (
        /* ── Orbit canvas ──────────────────────────────────────── */
        (() => {
          const s = scale;
          const size       = Math.round(BASE * s);
          const r1         = computeRingPositions(ring1.length, 220 * s, 0.25);
          const r2         = computeRingPositions(ring2.length, 155 * s, -0.15);
          const r3         = computeRingPositions(ring3.length, 105 * s, 0.05);
          const tileOuter  = Math.round(56 * s);
          const tileInner  = Math.round(48 * s);
          const tilePad    = Math.max(4, Math.round(8 * s));
          const centerSize = Math.round(112 * s);
          const centerPad  = Math.max(8, Math.round(24 * s));
          const cityOffset = Math.max(32, Math.round(80 * s));

          return (
            <div className="relative mx-auto rounded-full" style={{ width: size, height: size }}>
              <style>{`
                @keyframes orbitRotate        { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
                @keyframes orbitRotateReverse { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
              `}</style>

              <div className="absolute inset-[4%] rounded-full border border-[#F2F2F2]"  style={{ animation: "orbitRotate 28s linear infinite" }} />
              <div className="absolute inset-[16%] rounded-full border border-[#F2F2F2]" style={{ animation: "orbitRotateReverse 22s linear infinite" }} />
              <div className="absolute inset-[28%] rounded-full border border-[#F2F2F2]" style={{ animation: "orbitRotate 18s linear infinite" }} />

              {/* Center logo */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface"
                style={{ width: centerSize, height: centerSize }}
              >
                <div className="relative h-full w-full">
                  <Image src="/logo.svg" alt="AF Property" fill  style={{ padding: centerPad }} priority />
                </div>
              </div>

              {/* City label */}
              <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/85 ring-1 ring-white/15"
                style={{ marginTop: cityOffset }}
              >
                {currentCity}
              </div>

              {/* Ring 1 – outer */}
              {ring1.map((d, i) => {
                const p = r1[i] ?? { x: 0, y: 0 };
                return (
                  <div key={`${d.Name}-${i}`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                    <div className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-surface" style={{ width: tileOuter, height: tileOuter }}>
                      <Image src={d.Image} alt={d.Name} width={56} height={56} className="h-full w-full rounded-2xl object-contain" style={{ padding: tilePad }} unoptimized />
                    </div>
                  </div>
                );
              })}

              {/* Ring 2 – middle */}
              {ring2.map((d, i) => {
                const p = r2[i] ?? { x: 0, y: 0 };
                return (
                  <div key={`${d.Name}-${i}-mid`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                    <div className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-surface" style={{ width: tileOuter, height: tileOuter }}>
                      <Image src={d.Image} alt={d.Name} width={56} height={56} className="h-full w-full rounded-2xl object-contain" style={{ padding: tilePad }} unoptimized />
                    </div>
                  </div>
                );
              })}

              {/* Ring 3 – inner */}
              {ring3.map((d, i) => {
                const p = r3[i] ?? { x: 0, y: 0 };
                return (
                  <div key={`${d.Name}-${i}-inner`} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${p.x}px, ${p.y}px)` }}>
                    <div className="-translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-surface" style={{ width: tileInner, height: tileInner }}>
                      <Image src={d.Image} alt={d.Name} width={48} height={48} className="h-full w-full rounded-2xl object-contain" style={{ padding: tilePad }} unoptimized />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()
      )}
    </div>
  );
}
