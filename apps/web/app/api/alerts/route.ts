import { NextResponse } from "next/server";

const alerts = [
  {
    id: "alrt_01",
    profileId: "prof_demo",
    severity: "CRITICAL",
    category: "dark_web_exposure",
    title: "Kredensial ditemukan di dark web marketplace",
  },
  {
    id: "alrt_02",
    profileId: "prof_demo",
    severity: "HIGH",
    category: "surface_negative_spike",
    title: "Lonjakan mention negatif >100%",
  },
];

export async function GET() {
  return NextResponse.json({ items: alerts });
}
