import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as Record<string, unknown>;
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "email and password required" }, { status: 400 });
  }

  return NextResponse.json({
    message: "Login successful (stub — connect auth provider in production)",
    user: { email, role: "CLIENT" },
    token: "stub_token_replace_with_jwt",
  });
}
