const mentions = [
  {
    id: "m01",
    source: "Kompas.com",
    sentiment: "NEGATIVE",
    snippet: "Sejumlah keluhan muncul terkait pelayanan perusahaan tersebut…",
    date: "2026-04-18",
  },
  {
    id: "m02",
    source: "Kaskus",
    sentiment: "NEUTRAL",
    snippet: "Ada yang tahu info terbaru soal brand ini? Kayanya lagi ramai dibahas.",
    date: "2026-04-17",
  },
];

const sentimentColor: Record<string, string> = {
  NEGATIVE: "text-red-600",
  NEUTRAL: "text-yellow-600",
  POSITIVE: "text-green-600",
};

export default function SurfaceIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Surface Web Intelligence</h1>
      <p className="mt-2 text-slate-600">Temuan crawl dari permukaan internet publik.</p>
      <div className="mt-6 space-y-3">
        {mentions.map((m) => (
          <article key={m.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{m.source}</span>
              <span className={`text-xs font-medium ${sentimentColor[m.sentiment]}`}>
                {m.sentiment}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-700">{m.snippet}</p>
            <p className="mt-1 text-xs text-slate-400">{m.date}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
