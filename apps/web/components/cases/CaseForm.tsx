"use client";

import { useState } from "react";

interface Props {
  onSubmit?: (data: { title: string; priority: string; description: string }) => void;
}

export function CaseForm({ onSubmit }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/cases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority, description }),
      });
      if (res.ok && onSubmit) {
        onSubmit({ title, priority, description });
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="cf-title" className="block text-sm font-medium">
          Judul Kasus
        </label>
        <input
          id="cf-title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ringkasan singkat masalah"
          className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="cf-priority" className="block text-sm font-medium">
          Prioritas
        </label>
        <select
          id="cf-priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        >
          <option value="LOW">LOW — Tidak mendesak</option>
          <option value="MEDIUM">MEDIUM — Perlu penanganan minggu ini</option>
          <option value="HIGH">HIGH — Perlu penanganan segera</option>
          <option value="CRITICAL">CRITICAL — Darurat, respons dalam jam ini</option>
        </select>
      </div>
      <div>
        <label htmlFor="cf-desc" className="block text-sm font-medium">
          Deskripsi
        </label>
        <textarea
          id="cf-desc"
          required
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Jelaskan situasi, dampak, dan tindakan yang sudah dilakukan."
          className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:opacity-50"
      >
        {submitting ? "Mengirim…" : "Kirim ke Konsultan"}
      </button>
    </form>
  );
}
