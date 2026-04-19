const stats = [
  { label: "Total Klien Aktif", value: "24" },
  { label: "Kasus Bulan Ini", value: "7" },
  { label: "Rata-rata SLA (jam)", value: "3.2" },
  { label: "Revenue MTD (juta)", value: "48" },
];

export default function AdminAnalyticsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Admin — Analytics</h1>
      <p className="mt-2 text-slate-600">Metrik performa bisnis dan operasional.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <article key={s.label} className="rounded-xl bg-white p-5 shadow-sm">
            <p className="text-xs text-slate-500">{s.label}</p>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
