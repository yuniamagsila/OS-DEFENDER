const allCases = [
  { id: "case_01", client: "Budi Santoso", title: "Krisis reputasi viral", status: "OPEN", priority: "HIGH" },
  { id: "case_02", client: "PT Maju Bersama", title: "Kredensial bocor", status: "IN_PROGRESS", priority: "CRITICAL" },
];

export default function AdminCasesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Admin — Semua Kasus</h1>
      <p className="mt-2 text-slate-600">Semua kasus dari seluruh klien yang masuk ke konsultan.</p>
      <div className="mt-6 space-y-3">
        {allCases.map((c) => (
          <article key={c.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold">{c.title}</h2>
                <p className="text-xs text-slate-500">{c.client} · {c.id}</p>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="rounded-full bg-slate-100 px-2 py-0.5">{c.priority}</span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">{c.status}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
