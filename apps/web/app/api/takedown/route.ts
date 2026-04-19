import { NextRequest, NextResponse } from "next/server";

const requests = [
  { id: "td_01", target: "artikel-fitnah.com/...", platform: "Website", status: "PENDING" },
];

export async function GET() {
  return NextResponse.json({ items: requests });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { target, platform } = body as { target?: string; platform?: string };

  if (!target || !platform) {
    return NextResponse.json({ error: "target and platform required" }, { status: 400 });
  }

  return NextResponse.json({
    id: `td_${Date.now()}`,
    target,
    platform,
    status: "PENDING",
    createdAt: new Date().toISOString(),
  }, { status: 201 });
}
