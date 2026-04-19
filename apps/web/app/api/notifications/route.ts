import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    items: [
      { id: "notif_01", channel: "email", message: "Alert CRITICAL: credential bocor di dark web.", sentAt: "2026-04-19T10:00:00Z" },
      { id: "notif_02", channel: "whatsapp", message: "Score turun 20 poin dalam 24 jam.", sentAt: "2026-04-18T08:00:00Z" },
    ],
  });
}
