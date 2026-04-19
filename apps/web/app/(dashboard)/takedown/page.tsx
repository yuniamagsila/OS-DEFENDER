const requests = [
  { id: "td_01", target: "artikel-fitnah.com/2026/04/nama-brand", platform: "Website", status: "PENDING", filed: "2026-04-17" },
  { id: "td_02", target: "@account_fake di Twitter", platform: "Twitter/X", status: "APPROVED", filed: "2026-04-10" },
];

const statusBadge: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function TakedownPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Takedown Requests</h1>
        <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700">
          + Ajukan Takedown
        </button>
      </div>
      <p className="mt-2 text-slate-600">Kelola permintaan takedown konten berbahaya.</p>
      <div className="mt-6 space-y-3">
        {requests.map((r) => (
          <article key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium break-all">{r.target}</p>
              <span className={`ml-3 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[r.status]}`}>
                {r.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">{r.platform} · Diajukan: {r.filed}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
