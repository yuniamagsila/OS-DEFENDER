const reports = [
  { id: "rep_01", title: "Laporan Bulanan April 2026", generated: "2026-04-01", type: "MONTHLY" },
  { id: "rep_02", title: "Laporan Krisis — Maret 2026", generated: "2026-03-15", type: "CRISIS" },
];

export default function ReportsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Reports</h1>
      <p className="mt-2 text-slate-600">Laporan reputasi digital yang dibuat otomatis.</p>
      <div className="mt-6 space-y-3">
        {reports.map((r) => (
          <article key={r.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4">
            <div>
              <h2 className="font-semibold">{r.title}</h2>
              <p className="mt-1 text-xs text-slate-400">{r.type} · {r.generated}</p>
            </div>
            <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm hover:bg-slate-50">
              Unduh PDF
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
