export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold">Pengaturan</h1>
      <p className="mt-2 text-slate-600">Kelola akun, notifikasi, dan billing.</p>

      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Notifikasi</h2>
        {[
          { label: "Email untuk alert CRITICAL", checked: true },
          { label: "WhatsApp untuk alert HIGH", checked: true },
          { label: "Telegram untuk semua alert", checked: false },
          { label: "In-app notification", checked: true },
        ].map((item) => (
          <label key={item.label} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-4">
            <input
              type="checkbox"
              defaultChecked={item.checked}
              className="size-4 rounded border-slate-300"
              readOnly
            />
            <span className="text-sm">{item.label}</span>
          </label>
        ))}
      </section>
    </main>
  );
}
