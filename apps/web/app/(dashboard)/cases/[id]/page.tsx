type CaseDetailPageProps = { params: Promise<{ id: string }> };

export default async function CaseDetailPage({ params }: CaseDetailPageProps) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-2xl font-bold">Detail Kasus</h1>
      <p className="mt-1 text-xs text-slate-400">ID: {id}</p>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Krisis reputasi viral di Twitter</h2>
          <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">
            IN_PROGRESS
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-700">
          Terjadi lonjakan mention negatif lebih dari 300% dalam 4 jam. Diperlukan strategi
          counter-narrative segera oleh tim PR.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="font-semibold">Komunikasi dengan Konsultan</h2>
        <div className="mt-3 space-y-3">
          <div className="rounded-lg bg-slate-100 p-3 text-sm">
            <p className="font-medium text-slate-700">Konsultan</p>
            <p className="text-slate-600">
              Kami sudah menerima laporan Anda. Sedang menyiapkan strategi respons awal.
            </p>
          </div>
          <div className="rounded-lg bg-slate-900 p-3 text-sm text-white">
            <p className="font-medium">Anda</p>
            <p className="text-slate-300">
              Terima kasih, tolong prioritaskan kanal Twitter dan berita nasional.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
