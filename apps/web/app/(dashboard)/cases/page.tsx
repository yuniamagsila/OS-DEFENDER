import Link from "next/link";

const cases = [
  { id: "case_01", title: "Krisis reputasi viral di Twitter", status: "OPEN", priority: "HIGH", created: "2026-04-18" },
  { id: "case_02", title: "Credential bocor, butuh respons cepat", status: "IN_PROGRESS", priority: "CRITICAL", created: "2026-04-15" },
];

const statusColor: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-slate-100 text-slate-500",
};

export default function CasesPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Consultation Cases</h1>
        <Link
          href="/cases/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          + Buka Kasus Baru
        </Link>
      </div>
      <p className="mt-2 text-slate-600">Kelola kasus konsultasi Anda bersama konsultan PR.</p>
      <div className="mt-6 space-y-3">
        {cases.map((c) => (
          <Link key={c.id} href={`/cases/${c.id}`} className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{c.title}</h2>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColor[c.status]}`}>
                {c.status}
              </span>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              {c.id} · Prioritas: {c.priority} · {c.created}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
