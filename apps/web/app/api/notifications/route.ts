import { NextRequest, NextResponse } from "next/server";

const notifications = [
  { id: "notif_01", userId: "user_demo", channel: "email", message: "Alert CRITICAL: credential bocor di dark web.", sentAt: "2026-04-19T10:00:00Z", isRead: false },
  { id: "notif_02", userId: "user_demo", channel: "whatsapp", message: "Score turun 20 poin dalam 24 jam.", sentAt: "2026-04-18T08:00:00Z", isRead: true },
];

export async function GET() {
  return NextResponse.json({ items: notifications });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { userId, channel, message } = body as {
    userId?: string; channel?: string; message?: string;
  };

  if (!userId || !channel || !message) {
    return NextResponse.json({ error: "userId, channel, message required" }, { status: 400 });
  }

  const validChannels = ["email", "whatsapp", "telegram", "in_app"];
  if (!validChannels.includes(channel)) {
    return NextResponse.json({ error: `channel must be one of: ${validChannels.join(", ")}` }, { status: 400 });
  }

  const notification = {
    id: `notif_${Date.now()}`,
    userId,
    channel,
    message,
    sentAt: new Date().toISOString(),
    isRead: false,
  };

  // Production: INSERT notification + dispatch via lib/notifications.ts
  return NextResponse.json(notification, { status: 201 });
}
