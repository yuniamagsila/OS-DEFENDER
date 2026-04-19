import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { name, email, password } = body as { name?: string; email?: string; password?: string };

  if (!name || !email || !password) {
    return NextResponse.json({ error: "name, email, password required" }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "password must be at least 8 characters" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Registration successful (stub — connect auth provider in production)",
    user: { name, email, role: "CLIENT" },
  }, { status: 201 });
}
