import { NextRequest, NextResponse } from "next/server";

import { dispatchAlertNotifications } from "@/lib/notifications";
import { emitAlert, emitCaseMessage } from "@/lib/socket";

/**
 * POST /api/webhooks
 *
 * Receives events from internal services (crawlers, AI service).
 * In production: verify HMAC-SHA256 signature from X-Webhook-Signature header.
 */
export async function POST(req: NextRequest) {
  const signature = req.headers.get("x-webhook-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing webhook signature" }, { status: 401 });
  }

  const body = await req.json().catch(() => null) as Record<string, unknown> | null;

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { event, data } = body as { event?: string; data?: Record<string, unknown> };

  if (!event) {
    return NextResponse.json({ error: "event field required" }, { status: 400 });
  }

  switch (event) {
    case "mention.created": {
      // Surface crawler found a new mention
      // 1. Evaluate risk score via AI service (in production: call AI_SERVICE_URL/analyze)
      // 2. If risk >= threshold, create alert in DB
      // 3. Dispatch notification based on severity
      const severity = (data?.severity as string) ?? "LOW";
      const userId = (data?.user_id as string) ?? "user_demo";
      if (severity === "HIGH" || severity === "CRITICAL") {
        const msg = `Mention baru terdeteksi dengan severity ${severity}: ${data?.title ?? ""}`;
        await dispatchAlertNotifications(userId, severity as "HIGH" | "CRITICAL", msg);
        emitAlert(userId, { event, data });
      }
      break;
    }

    case "darkweb.finding": {
      // Dark web crawler found something
      // 1. Create CRITICAL/HIGH alert in DB
      // 2. Notify user immediately via all channels
      const severity = (data?.severity as string) ?? "CRITICAL";
      const userId = (data?.user_id as string) ?? "user_demo";
      const msg = `Temuan dark web: ${data?.title ?? data?.category ?? "anomali terdeteksi"}`;
      await dispatchAlertNotifications(userId, severity as "HIGH" | "CRITICAL", msg);
      emitAlert(userId, { event, data });
      break;
    }

    case "breach.detected": {
      // Breach intelligence API reported a breach
      // Treat as CRITICAL — immediate multi-channel notification
      const userId = (data?.user_id as string) ?? "user_demo";
      const msg = `Data breach terdeteksi! Credential Anda mungkin terekspos. Segera ganti password.`;
      await dispatchAlertNotifications(userId, "CRITICAL", msg);
      emitAlert(userId, { event: "breach.detected", severity: "CRITICAL", data });
      break;
    }

    case "score.updated": {
      // Reputation score recalculated
      // Notify if score dropped significantly
      const userId = (data?.user_id as string) ?? "user_demo";
      const newScore = (data?.new_score as number) ?? 100;
      const delta = (data?.delta as number) ?? 0;
      if (delta <= -15) {
        const msg = `Reputation score turun ${Math.abs(delta)} poin menjadi ${newScore}.`;
        await dispatchAlertNotifications(userId, newScore < 50 ? "HIGH" : "MEDIUM", msg);
        emitAlert(userId, { event: "score.updated", score: newScore, delta });
      }
      break;
    }

    case "case.message": {
      // New message in a case — emit via Socket.io to case room
      const caseId = (data?.case_id as string) ?? "";
      if (caseId) {
        emitCaseMessage(caseId, data ?? {});
      }
      break;
    }

    default:
      console.warn("[webhook] unknown event:", event, data);
  }

  return NextResponse.json({ received: true, event });
}
