import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };

const messagesByCase: Record<string, Array<{
  id: string; caseId: string; senderRole: string; senderName: string; body: string; createdAt: string;
}>> = {
  case_01: [
    { id: "msg_01", caseId: "case_01", senderRole: "CONSULTANT", senderName: "Andi — Konsultan", body: "Kami sudah menerima laporan Anda. Sedang menyiapkan strategi respons awal dalam 1 jam.", createdAt: "2026-04-19T10:00:00Z" },
    { id: "msg_02", caseId: "case_01", senderRole: "CLIENT", senderName: "Budi Santoso", body: "Terima kasih, tolong prioritaskan kanal Twitter dan berita nasional.", createdAt: "2026-04-19T10:15:00Z" },
    { id: "msg_03", caseId: "case_01", senderRole: "CONSULTANT", senderName: "Andi — Konsultan", body: "Siap. Kami sudah kontak editor dua portal berita. Update dalam 2 jam.", createdAt: "2026-04-19T10:20:00Z" },
  ],
};

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const messages = messagesByCase[id] ?? [];
  return NextResponse.json({ items: messages, caseId: id });
}

export async function POST(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { body: msgBody, senderRole, senderName } = body as {
    body?: string; senderRole?: string; senderName?: string;
  };

  if (!msgBody || !senderRole || !senderName) {
    return NextResponse.json({ error: "body, senderRole, senderName required" }, { status: 400 });
  }

  const validRoles = ["CLIENT", "CONSULTANT", "ADMIN"];
  if (!validRoles.includes(senderRole)) {
    return NextResponse.json({ error: `senderRole must be one of: ${validRoles.join(", ")}` }, { status: 400 });
  }

  const message = {
    id: `msg_${Date.now()}`,
    caseId: id,
    senderRole,
    senderName,
    body: msgBody,
    createdAt: new Date().toISOString(),
  };

  // Append to in-memory store
  if (!messagesByCase[id]) messagesByCase[id] = [];
  messagesByCase[id].push(message);

  // Production: INSERT INTO case_messages; then emit via Socket.io to case room
  return NextResponse.json(message, { status: 201 });
}
