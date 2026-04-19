import { MentionCard } from "@/components/intelligence/MentionCard";
import { ExposureMap } from "@/components/intelligence/ExposureMap";

const mentions = [
  { id: "m01", source: "Kompas.com", sentiment: "NEGATIVE" as const, snippet: "Sejumlah keluhan muncul terkait pelayanan perusahaan tersebut…", date: "2026-04-18" },
  { id: "m02", source: "Kaskus", sentiment: "NEUTRAL" as const, snippet: "Ada yang tahu info terbaru soal brand ini? Kayanya lagi ramai dibahas.", date: "2026-04-17" },
  { id: "m03", source: "Twitter/X", sentiment: "NEGATIVE" as const, snippet: "Thread viral tentang pengalaman buruk pelanggan — sudah 2.000 RT.", date: "2026-04-17" },
  { id: "m04", source: "Google News", sentiment: "POSITIVE" as const, snippet: "Brand ini raih penghargaan nasional untuk inovasi produk.", date: "2026-04-16" },
];

const exposurePoints = [
  { source: "Twitter/X", count: 142, severity: "HIGH" as const },
  { source: "Kaskus", count: 38, severity: "MEDIUM" as const },
  { source: "Kompas.com", count: 22, severity: "HIGH" as const },
  { source: "Google News", count: 15, severity: "LOW" as const },
];

export default function SurfaceIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Surface Web Intelligence</h1>
      <p className="mt-2 text-slate-600">Temuan crawl dari permukaan internet publik.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-3">
          {mentions.map((m) => (
            <MentionCard
              key={m.id}
              source={m.source}
              sentiment={m.sentiment}
              snippet={m.snippet}
              date={m.date}
            />
          ))}
        </div>
        <div>
          <ExposureMap points={exposurePoints} />
        </div>
      </div>
    </main>
  );
}
