const feed = [
  { id: "f01", type: "SURFACE", source: "Kompas", severity: "HIGH", content: "Artikel negatif tentang klien", time: "2 jam lalu" },
  { id: "f02", type: "DARKWEB", source: "Paste Site", severity: "CRITICAL", content: "Email+password klien ditemukan", time: "5 jam lalu" },
];

const severityColor: Record<string, string> = {
  CRITICAL: "text-red-600",
  HIGH: "text-orange-600",
  MEDIUM: "text-yellow-600",
  LOW: "text-slate-500",
};

export default function AdminIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Admin — Raw Intelligence Feed</h1>
      <p className="mt-2 text-slate-600">Feed intelijen mentah dari semua sumber dan klien.</p>
      <div className="mt-6 space-y-3">
        {feed.map((f) => (
          <article key={f.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded bg-slate-100 px-2 py-0.5 text-xs">{f.type}</span>
                <span className="text-xs text-slate-400">{f.source}</span>
              </div>
              <span className={`text-xs font-semibold ${severityColor[f.severity]}`}>{f.severity}</span>
            </div>
            <p className="mt-2 text-sm">{f.content}</p>
            <p className="mt-1 text-xs text-slate-400">{f.time}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
