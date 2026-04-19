import { NextResponse } from "next/server";

const intelligence = [
  { id: "int_01", type: "SURFACE", source: "Kompas.com", sentiment: "NEGATIVE", severity: "HIGH", snippet: "Artikel negatif tentang klien.", date: "2026-04-18" },
  { id: "int_02", type: "DARKWEB", source: "Paste Site", sentiment: "N/A", severity: "CRITICAL", snippet: "Credential bocor.", date: "2026-04-19" },
];

export async function GET() {
  return NextResponse.json({ items: intelligence });
}
