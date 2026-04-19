const clients = [
  { id: "cl_01", name: "Budi Santoso", type: "Individu", plan: "Professional", score: 78, joined: "2026-01-10" },
  { id: "cl_02", name: "PT Maju Bersama", type: "Bisnis", plan: "Enterprise", score: 55, joined: "2026-02-20" },
];

export default function AdminClientsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-2xl font-bold">Admin — Klien</h1>
      <p className="mt-2 text-slate-600">Manajemen seluruh klien yang terdaftar di platform.</p>
      <div className="mt-6 overflow-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold text-slate-500">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="px-4 py-3">Tipe</th>
              <th className="px-4 py-3">Plan</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Bergabung</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-slate-500">{c.type}</td>
                <td className="px-4 py-3">{c.plan}</td>
                <td className="px-4 py-3">{c.score}</td>
                <td className="px-4 py-3 text-slate-400">{c.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
