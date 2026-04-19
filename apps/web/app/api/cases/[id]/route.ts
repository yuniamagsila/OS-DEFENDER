import { NextRequest, NextResponse } from "next/server";

type RouteParams = { params: Promise<{ id: string }> };

const caseStore: Record<string, {
  id: string; title: string; description: string; status: string; priority: string;
  profileId: string; clientId: string; createdAt: string; updatedAt: string;
}> = {
  case_01: {
    id: "case_01",
    title: "Krisis reputasi viral di Twitter",
    description: "Lonjakan mention negatif >300% dalam 4 jam, viral di Twitter.",
    status: "IN_PROGRESS",
    priority: "HIGH",
    profileId: "prof_demo",
    clientId: "user_demo",
    createdAt: "2026-04-18T08:00:00Z",
    updatedAt: "2026-04-19T10:00:00Z",
  },
  case_02: {
    id: "case_02",
    title: "Credential bocor, butuh respons cepat",
    description: "Email dan password ditemukan di dark web marketplace, perlu reset segera.",
    status: "OPEN",
    priority: "CRITICAL",
    profileId: "prof_demo",
    clientId: "user_demo",
    createdAt: "2026-04-15T06:00:00Z",
    updatedAt: "2026-04-15T06:00:00Z",
  },
};

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const c = caseStore[id];
  if (!c) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }
  return NextResponse.json(c);
}

export async function PATCH(req: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const c = caseStore[id];
  if (!c) {
    return NextResponse.json({ error: "Case not found" }, { status: 404 });
  }

  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { status } = body as { status?: string };

  const validStatuses = ["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"];
  if (status && !validStatuses.includes(status)) {
    return NextResponse.json({ error: `status must be one of: ${validStatuses.join(", ")}` }, { status: 400 });
  }

  const updated = { ...c, ...(status ? { status } : {}), updatedAt: new Date().toISOString() };
  return NextResponse.json(updated);
}
