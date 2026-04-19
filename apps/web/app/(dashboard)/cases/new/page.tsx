export default function NewCasePage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold">Buka Kasus Baru</h1>
      <p className="mt-2 text-slate-600">
        Ceritakan ancaman atau krisis yang Anda hadapi. Tim konsultan akan segera merespons.
      </p>
      <form className="mt-8 space-y-5" action="/api/cases" method="POST">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Judul Kasus</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            placeholder="Ringkasan singkat masalah"
            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="priority" className="block text-sm font-medium">Prioritas</label>
          <select
            id="priority"
            name="priority"
            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          >
            <option value="LOW">LOW — Tidak mendesak</option>
            <option value="MEDIUM">MEDIUM — Perlu penanganan minggu ini</option>
            <option value="HIGH">HIGH — Perlu penanganan segera</option>
            <option value="CRITICAL">CRITICAL — Darurat, respons dalam jam ini</option>
          </select>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">Deskripsi</label>
          <textarea
            id="description"
            name="description"
            rows={5}
            required
            placeholder="Jelaskan situasi, dampak yang terjadi, dan tindakan apa yang sudah dilakukan."
            className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Kirim ke Konsultan
        </button>
      </form>
    </main>
  );
}
