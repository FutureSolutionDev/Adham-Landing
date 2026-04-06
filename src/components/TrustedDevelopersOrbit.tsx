"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type DevLogo = { Name: string; Image: string };

type StatsPayload = {
  data?: {
    Devs?: Record<string, DevLogo[]>;
  };
};

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
  const [devsByCity, setDevsByCity] = useState<Record<string, DevLogo[]>>({});
  const [cityIdx, setCityIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/stats", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const json = (await res.json()) as StatsPayload;
        const next = json.data?.Devs ?? {};
        if (!cancelled) setDevsByCity(next);
      } catch {
        // Ignore; fallback UI will show.
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const cities = useMemo(() => Object.keys(devsByCity), [devsByCity]);
  const currentCity = cities.length ? cities[cityIdx % cities.length] : null;
  const logos = currentCity ? devsByCity[currentCity] ?? [] : [];

  useEffect(() => {
    if (!cities.length) return;
    if (cities.length === 1) return;
    const id = window.setInterval(() => {
      setCityIdx((i) => (i + 1) % cities.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [cities.length, intervalMs]);

  // 3 rings (render only real logos — no placeholders).
  const ring1 = clampLogos(logos, 12);
  const ring2 = clampLogos(logos.slice(12), 8);
  const ring3 = clampLogos(logos.slice(20), 6);

  if (loading) {
    const size = 520;
    return (
      <div className="w-full max-w-[520px]">
        <div
          className="relative mx-auto overflow-hidden rounded-full animate-pulse"
          style={{ width: size, height: size }}
          aria-label="Loading developer logos"
        >
          <div className="absolute inset-[4%] rounded-full border border-[#F2F2F2]" />
          <div className="absolute inset-[16%] rounded-full border border-[#F2F2F2]" />
          <div className="absolute inset-[28%] rounded-full border border-[#F2F2F2]" />

          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F2F2F2] ring-1 ring-white/15" />

          {computeRingPositions(12, 230, 0.25).map((p, i) => (
            <div
              key={`sk1-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10 ring-1 ring-white/15" />
            </div>
          ))}
          {computeRingPositions(8, 160, -0.15).map((p, i) => (
            <div
              key={`sk2-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10 ring-1 ring-white/15" />
            </div>
          ))}
          {computeRingPositions(6, 105, 0.05).map((p, i) => (
            <div
              key={`sk3-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10 ring-1 ring-white/15" />
            </div>
          ))}
          
        </div>
      </div>
    );
  }

  if (!cities.length || logos.length === 0) {
    return (
      <Image
        src={fallbackSrc}
        alt=""
        width={720}
        height={720}
        className="h-auto w-full max-w-[520px]"
        priority
      />
    );
  }

  const size = 520;
  // Slightly tighter radii so logo tiles never spill outside the circle.
  const r1 = 220;
  const r2 = 155;
  const r3 = 105;
  const ring1Pos = computeRingPositions(ring1.length, r1, 0.25);
  const ring2Pos = computeRingPositions(ring2.length, r2, -0.15);
  const ring3Pos = computeRingPositions(ring3.length, r3, 0.05);

  return (
    <div className="w-full max-w-[520px]">
      <div
        className="relative mx-auto overflow-hidden rounded-full"
        style={{ width: size, height: size }}
      >
        <style>{`
          @keyframes orbitRotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes orbitRotateReverse {
            from { transform: rotate(0deg); }
            to { transform: rotate(-360deg); }
          }
        `}</style>
    
      
        {/* Rings */}
        <div
          className="absolute inset-[4%] rounded-full border border-[#F2F2F2]"
          style={{ animation: "orbitRotate 28s linear infinite" }}
        />
        <div
          className="absolute inset-[16%] rounded-full border border-[#F2F2F2]"
          style={{ animation: "orbitRotateReverse 22s linear infinite" }}
        />
        <div
          className="absolute inset-[28%] rounded-full border border-[#F2F2F2]"
          style={{ animation: "orbitRotate 18s linear infinite" }}
        />

        {/* Center logo */}
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F7F8FA]">
          <div className="relative h-full w-full">
            <Image
              src="/images/logo.webp"
              alt="AF Property"
              fill
              className="object-contain p-6"
              priority
            />
          </div>
        </div>

        {/* City label */}
        <div className="absolute left-1/2 top-1/2 mt-20 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/85 ring-1 ring-white/15">
          {currentCity}
        </div>

        {/* Ring 1 (outer) */}
        {ring1.map((d, i) => {
          const p = ring1Pos[i] ?? { x: 0, y: 0 };
          return (
            <div
              key={`${d.Name}-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white ring-1 ring-white/20">
                <Image
                  src={d.Image}
                  alt={d.Name}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          );
        })}

        {/* Ring 2 (middle) */}
        {ring2.map((d, i) => {
          const p = ring2Pos[i] ?? { x: 0, y: 0 };
          return (
            <div
              key={`${d.Name}-${i}-mid`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-14 w-14 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white ring-1 ring-white/20">
                <Image
                  src={d.Image}
                  alt={d.Name}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          );
        })}

        {/* Ring 3 (inner) */}
        {ring3.map((d, i) => {
          const p = ring3Pos[i] ?? { x: 0, y: 0 };
          return (
            <div
              key={`${d.Name}-${i}-inner`}
              className="absolute left-1/2 top-1/2"
              style={{ transform: `translate(${p.x}px, ${p.y}px)` }}
            >
              <div className="h-12 w-12 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white ring-1 ring-white/20">
                <Image
                  src={d.Image}
                  alt={d.Name}
                  width={48}
                  height={48}
                  className="h-full w-full object-contain p-2"
                  unoptimized
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

