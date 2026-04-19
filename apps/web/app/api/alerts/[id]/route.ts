import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { isRead } = body as { isRead?: boolean };

  if (typeof isRead !== "boolean") {
    return NextResponse.json({ error: "isRead (boolean) required" }, { status: 400 });
  }

  // Production: UPDATE alerts SET isRead = $isRead WHERE id = $id
  return NextResponse.json({ id, isRead, updatedAt: new Date().toISOString() });
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  // Production: SELECT * FROM alerts WHERE id = $id
  return NextResponse.json({
    id,
    profileId: "prof_demo",
    severity: "CRITICAL",
    category: "credential_leak",
    title: "Kredensial ditemukan di dark web marketplace",
    summary: "Email dan password klien terdeteksi dalam dump data yang dijual.",
    isRead: false,
    createdAt: "2026-04-19T10:00:00Z",
  });
}
