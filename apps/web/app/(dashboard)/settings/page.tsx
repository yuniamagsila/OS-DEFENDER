"use client";

import { useState } from "react";

type NotifSetting = { label: string; key: string; checked: boolean };

const defaultNotifSettings: NotifSetting[] = [
  { label: "Email untuk alert CRITICAL", key: "email_critical", checked: true },
  { label: "WhatsApp untuk alert HIGH", key: "wa_high", checked: true },
  { label: "Telegram untuk semua alert", key: "telegram_all", checked: false },
  { label: "In-app notification", key: "inapp_all", checked: true },
];

export default function SettingsPage() {
  const [notifs, setNotifs] = useState<NotifSetting[]>(defaultNotifSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  function toggle(key: string) {
    setNotifs((prev) =>
      prev.map((n) => (n.key === key ? { ...n, checked: !n.checked } : n))
    );
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    setSaveError("");
    try {
      // Simulate API save — in production: PUT /api/settings/notifications
      await new Promise<void>((resolve) => setTimeout(resolve, 600));
      setSaved(true);
    } catch {
      setSaveError("Gagal menyimpan pengaturan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="text-2xl font-bold">Pengaturan</h1>
      <p className="mt-2 text-slate-600">Kelola akun, notifikasi, dan preferensi platform.</p>

      {/* Notification settings */}
      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold">Notifikasi</h2>
        {notifs.map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-200 bg-white p-4 transition hover:border-slate-300"
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => toggle(item.key)}
              className="size-4 rounded border-slate-300 accent-slate-900"
            />
            <span className="text-sm">{item.label}</span>
          </label>
        ))}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
          >
            {saving ? "Menyimpan…" : "Simpan Pengaturan"}
          </button>
          {saved && <p className="text-sm text-green-600 font-medium">✓ Tersimpan</p>}
          {saveError && <p className="text-sm text-red-600">{saveError}</p>}
        </div>
      </section>

      {/* Account info */}
      <section className="mt-10 space-y-4">
        <h2 className="text-lg font-semibold">Akun</h2>
        <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="font-medium">demo@example.com</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Role</span>
            <span className="font-medium">CLIENT</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Plan</span>
            <span className="font-medium">Professional</span>
          </div>
        </div>
        <button className="text-sm text-red-500 hover:underline">
          Hapus akun &amp; semua data
        </button>
      </section>
    </main>
  );
}
