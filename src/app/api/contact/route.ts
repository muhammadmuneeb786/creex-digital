import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email";
import { PACKAGE_OPTIONS } from "@/lib/site";

export const runtime = "nodejs";

/* Best-effort rate limit: 5 submissions per IP per 10 minutes (per server instance). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages from this connection. Please try again in a few minutes." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (str(body.website, 10)) return NextResponse.json({ ok: true });

  const name = str(body.name, 80);
  const email = str(body.email, 120);
  const phone = str(body.phone, 40);
  const pkg = str(body.package, 20) || "unsure";
  const message = str(body.message, 2000);
  const option = PACKAGE_OPTIONS.find((o) => o.value === pkg);

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email)) return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  if (!option) return NextResponse.json({ ok: false, error: "Please choose a package option." }, { status: 400 });

  try {
    await sendContactEmail({ name, email, phone, package: pkg, packageLabel: option.label, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your message right now. Please try again or reach us on WhatsApp." },
      { status: 500 },
    );
  }
}
