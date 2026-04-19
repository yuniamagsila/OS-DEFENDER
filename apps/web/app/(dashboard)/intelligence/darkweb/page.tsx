const findings = [
  {
    id: "dw01",
    severity: "CRITICAL",
    category: "credential_leak",
    description: "Email dan password terdeteksi dalam dump data yang dijual di marketplace.",
    date: "2026-04-19",
  },
  {
    id: "dw02",
    severity: "HIGH",
    category: "pii_exposure",
    description: "Nomor telepon klien ditemukan di paste site bersama data lainnya.",
    date: "2026-04-17",
  },
];

const severityColor: Record<string, string> = {
  CRITICAL: "bg-red-100 text-red-700",
  HIGH: "bg-orange-100 text-orange-700",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  LOW: "bg-slate-100 text-slate-600",
};

export default function DarkWebIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Dark Web Intelligence</h1>
      <p className="mt-2 text-slate-600">
        Temuan dari operasi monitoring dark web (paste, marketplace, forum, breach).
      </p>
      <div className="mt-6 space-y-3">
        {findings.map((f) => (
          <article key={f.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${severityColor[f.severity]}`}
                >
                  {f.severity}
                </span>
                <p className="mt-2 text-sm text-slate-700">{f.description}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {f.category} · {f.date}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
