import { NextRequest, NextResponse } from "next/server";

const profiles = [
  {
    id: "prof_demo",
    fullName: "Budi Santoso",
    alias: "budiS",
    emails: ["budi@example.com"],
    phones: ["+628123456789"],
    domains: ["budisantoso.com"],
    reputationScore: 78,
  },
];

export async function GET() {
  return NextResponse.json({ items: profiles });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { fullName, alias } = body as { fullName?: string; alias?: string };

  if (!fullName) {
    return NextResponse.json({ error: "fullName is required" }, { status: 400 });
  }

  const profile = {
    id: `prof_${Date.now()}`,
    fullName,
    alias: alias ?? null,
    emails: [],
    phones: [],
    domains: [],
    reputationScore: 100,
  };

  return NextResponse.json(profile, { status: 201 });
}
