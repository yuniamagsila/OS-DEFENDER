import { NextResponse } from "next/server";

const reports = [
  { id: "rep_01", title: "Laporan Bulanan April 2026", type: "MONTHLY", generatedAt: "2026-04-01" },
  { id: "rep_02", title: "Laporan Krisis Maret 2026", type: "CRISIS", generatedAt: "2026-03-15" },
];

export async function GET() {
  return NextResponse.json({ items: reports });
}
