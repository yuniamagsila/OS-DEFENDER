import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/webhooks
 *
 * Receives events from internal services (crawlers, AI service).
 * In production: verify HMAC-SHA256 signature from X-Webhook-Signature header.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-webhook-signature");

  // Signature verification stub
  if (!signature) {
    return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { event, data } = body as { event?: string; data?: unknown };

  if (!event) {
    return NextResponse.json({ error: "event field required" }, { status: 400 });
  }

  // Route webhook events
  switch (event) {
    case "mention.created":
      // TODO: trigger alert evaluation + scoring update
      break;
    case "darkweb.finding":
      // TODO: create CRITICAL/HIGH alert + notify user
      break;
    case "breach.detected":
      // TODO: create CRITICAL alert + emit via Socket.io
      break;
    case "score.updated":
      // TODO: update profile reputation score in DB
      break;
    default:
      // Unknown event — log and accept
      console.warn("[webhook] unknown event:", event, data);
  }

  return NextResponse.json({ received: true, event });
}
