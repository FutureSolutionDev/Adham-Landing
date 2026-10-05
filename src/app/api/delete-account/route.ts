import { NextResponse, type NextRequest } from "next/server";
import { ADHAM_API_BASE } from "@/lib/api/adham";
import { normalizePhone, outcomeFor, type DeleteOutcome } from "@/lib/deleteAccount";

export const runtime = "nodejs";

// Forwards the account-deletion form to Adham (POST /api/v3/account/delete), server to server.
// Adham locks per phone and per IP on its side; this per-IP limit keeps one visitor from using the
// form to burn through those locks for everyone.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 10;
// Caps the map so spoofed x-forwarded-for values cannot grow it without bound.
const MAX_TRACKED_IPS = 5000;
// Route handlers have no body limit; the form's JSON is far below this, so anything larger is refused unread.
const MAX_BODY_BYTES = 4096;
// Gives up on a hung Adham call instead of holding the visitor's request open.
const ADHAM_TIMEOUT_MS = 15_000;
const hits = new Map<string, { count: number; firstAt: number }>();

function visitorIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function makeRoom(now: number): void {
  if (hits.size < MAX_TRACKED_IPS) return;
  for (const [key, entry] of hits) {
    if (now - entry.firstAt > WINDOW_MS) hits.delete(key);
  }
  if (hits.size >= MAX_TRACKED_IPS) {
    const oldest = hits.keys().next().value;
    if (oldest !== undefined) hits.delete(oldest);
  }
}

function overLimit(ip: string, now = Date.now()): boolean {
  const entry = hits.get(ip);
  if (!entry || now - entry.firstAt > WINDOW_MS) {
    if (!entry) makeRoom(now);
    hits.set(ip, { count: 1, firstAt: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function reply(outcome: DeleteOutcome, status: number) {
  return NextResponse.json({ outcome }, { status, headers: { "cache-control": "no-store" } });
}

export async function POST(req: NextRequest) {
  const ip = visitorIp(req);
  if (overLimit(ip)) return reply("locked", 429);

  const lengthHeader = req.headers.get("content-length");
  const length = lengthHeader === null ? NaN : Number(lengthHeader);
  if (!Number.isFinite(length) || length > MAX_BODY_BYTES) return reply("invalid", 400);

  let parsed: unknown;
  try {
    parsed = await req.json();
  } catch {
    return reply("invalid", 400);
  }
  // A JSON body of `null` parses fine but would throw on property access below.
  if (parsed === null || typeof parsed !== "object") return reply("invalid", 400);
  const body = parsed as { phone?: unknown; password?: unknown; locale?: unknown };
  const phone = normalizePhone(typeof body.phone === "string" ? body.phone : "");
  const password = typeof body.password === "string" ? body.password : "";
  if (!phone || !password) return reply("invalid", 400);

  try {
    const res = await fetch(`${ADHAM_API_BASE}/api/v3/account/delete`, {
      method: "POST",
      cache: "no-store",
      // A redirect (host suspension page, WAF challenge) is an error, never a confirmed delete.
      redirect: "manual",
      signal: AbortSignal.timeout(ADHAM_TIMEOUT_MS),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        // Adham reads the caller IP from "ipadress" first; it is advisory there (per-phone lock is the control).
        ipadress: ip,
        local: body.locale === "ar" ? "ar" : "en",
      },
      body: JSON.stringify({ ClientPhoneNumber: phone, ClientPassword: password }),
    });
    const json: unknown = await res.json().catch(() => null);
    const outcome = outcomeFor(res.status, json);
    if (outcome === "deleted") return reply("deleted", 200);
    if (outcome === "locked") return reply("locked", 429);
    if (outcome === "invalid") return reply("invalid", 401);
    // Status only: never log the phone, password, body or IP.
    console.warn("[delete-account] Adham answered", res.status);
    return reply("error", 502);
  } catch (err) {
    // Error name only (e.g. TimeoutError, TypeError); the message or cause could carry request details.
    console.warn("[delete-account] Adham call failed", err instanceof Error ? err.name : typeof err);
    return reply("error", 502);
  }
}
