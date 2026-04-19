const closed = [
  { id: "case_99", title: "Review negatif massal Google Business", resolvedAt: "2026-03-10" },
  { id: "case_88", title: "Artikel opini menyerang brand", resolvedAt: "2026-02-22" },
];

export default function CaseHistoryPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Riwayat Kasus</h1>
      <p className="mt-2 text-slate-600">Kasus yang sudah selesai ditangani.</p>
      <div className="mt-6 space-y-3">
        {closed.map((c) => (
          <article key={c.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{c.title}</h2>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                RESOLVED
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{c.id} · Selesai: {c.resolvedAt}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
