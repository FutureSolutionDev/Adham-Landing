import { NextResponse } from "next/server";
import { ADHAM_API_BASE } from "@/lib/api/adham";

export const runtime = "nodejs";

export async function GET() {
  try {
    const res = await fetch(`${ADHAM_API_BASE}/api/v3/app/stats`, {
      // Avoid cached 403 responses; the upstream sets its own TTL.
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: true, status: res.status, message: "Upstream request failed" },
        { status: 502 },
      );
    }

    const json = await res.json();
    return NextResponse.json(json, {
      status: 200,
      headers: {
        // Allow CDN caching a bit while still keeping it fresh.
        "cache-control": "public, max-age=60, stale-while-revalidate=300,stale-if-error=3600",
      },
    });
  } catch {
    return NextResponse.json(
      { error: true, message: "Unable to reach upstream" },
      { status: 502 },
    );
  }
}

