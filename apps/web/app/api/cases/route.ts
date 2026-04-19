import { NextRequest, NextResponse } from "next/server";

const cases = [
  { id: "case_01", title: "Krisis reputasi viral di Twitter", status: "OPEN", priority: "HIGH", profileId: "prof_demo" },
  { id: "case_02", title: "Credential bocor, butuh respons cepat", status: "IN_PROGRESS", priority: "CRITICAL", profileId: "prof_demo" },
];

export async function GET() {
  return NextResponse.json({ items: cases });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { title, priority, description } = body as {
    title?: string;
    priority?: string;
    description?: string;
  };

  if (!title || !priority || !description) {
    return NextResponse.json({ error: "title, priority, description required" }, { status: 400 });
  }

  const newCase = {
    id: `case_${Date.now()}`,
    title,
    priority,
    description,
    status: "OPEN",
    profileId: "prof_demo",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(newCase, { status: 201 });
}
