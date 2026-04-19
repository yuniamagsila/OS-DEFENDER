const summaryCards = [
  { label: "Reputation Score", value: "78", tone: "Waspada" },
  { label: "Open Alerts", value: "3", tone: "1 HIGH" },
  { label: "Active Cases", value: "1", tone: "Consultation ongoing" },
];

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-slate-600">
        Ringkasan metrik inti untuk modul monitoring dan crisis response.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-2xl font-semibold">{card.value}</p>
            <p className="mt-1 text-sm text-slate-600">{card.tone}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
