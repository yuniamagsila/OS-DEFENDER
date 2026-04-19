import { NextRequest, NextResponse } from "next/server";

const reports = [
  { id: "rep_01", title: "Laporan Bulanan April 2026", type: "MONTHLY", generatedAt: "2026-04-01", fileUrl: null },
  { id: "rep_02", title: "Laporan Krisis Maret 2026", type: "CRISIS", generatedAt: "2026-03-15", fileUrl: null },
];

export async function GET() {
  return NextResponse.json({ items: reports });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { title, type, profileId } = body as { title?: string; type?: string; profileId?: string };

  if (!title || !type) {
    return NextResponse.json({ error: "title and type required" }, { status: 400 });
  }

  const validTypes = ["MONTHLY", "CRISIS", "CUSTOM"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: `type must be one of: ${validTypes.join(", ")}` }, { status: 400 });
  }

  const report = {
    id: `rep_${Date.now()}`,
    title,
    type,
    profileId: profileId ?? "prof_demo",
    fileUrl: null,
    generatedAt: new Date().toISOString(),
  };

  // Production: trigger async PDF generation, upload to R2, update fileUrl
  return NextResponse.json(report, { status: 201 });
}
