const alerts = [
  {
    id: "alrt_01",
    severity: "CRITICAL",
    title: "Kredensial terdeteksi di dark web marketplace",
  },
  {
    id: "alrt_02",
    severity: "HIGH",
    title: "Lonjakan mention negatif dalam 2 jam terakhir",
  },
];

export default function AlertsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Crisis Alerts</h1>
      <p className="mt-2 text-slate-600">Daftar alert prioritas untuk tindakan cepat.</p>
      <div className="mt-6 space-y-3">
        {alerts.map((alert) => (
          <article key={alert.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-xs font-medium text-red-600">{alert.severity}</p>
            <h2 className="mt-1 font-semibold">{alert.title}</h2>
            <p className="text-xs text-slate-500">{alert.id}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
