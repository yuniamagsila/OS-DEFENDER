"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  senderRole: "CLIENT" | "CONSULTANT" | "ADMIN";
  senderName: string;
  body: string;
  createdAt: string;
}

interface Props {
  caseId: string;
  initialMessages?: Message[];
  currentRole?: "CLIENT" | "CONSULTANT" | "ADMIN";
}

export function CaseChat({ caseId, initialMessages = [], currentRole = "CLIENT" }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;

    setError("");
    setSending(true);

    // Optimistic update
    const optimistic: Message = {
      id: `tmp_${Date.now()}`,
      senderRole: currentRole,
      senderName: currentRole === "CLIENT" ? "Anda" : "Konsultan",
      body: text,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setBody("");

    try {
      const res = await fetch(`/api/cases/${caseId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: text,
          senderRole: currentRole,
          senderName: currentRole === "CLIENT" ? "Anda" : "Konsultan",
        }),
      });

      if (res.ok) {
        const saved = await res.json() as Message;
        // Replace optimistic with real message
        setMessages((prev) =>
          prev.map((m) => (m.id === optimistic.id ? saved : m))
        );
      } else {
        // Rollback optimistic on failure
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setError("Gagal mengirim pesan. Coba lagi.");
      }
    } catch {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
      setError("Gagal mengirim pesan. Periksa koneksi Anda.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-96 space-y-3 overflow-y-auto rounded-xl border border-slate-100 bg-slate-50 p-4">
        {messages.length === 0 && (
          <p className="text-center text-sm text-slate-400 py-8">
            Belum ada pesan. Mulai percakapan dengan konsultan.
          </p>
        )}
        {messages.map((m) => {
          const isMe = m.senderRole === currentRole;
          return (
            <div key={m.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs rounded-xl px-4 py-3 text-sm ${
                  isMe ? "bg-slate-900 text-white" : "bg-white text-slate-800 shadow-sm"
                }`}
              >
                <p className="mb-1 text-xs font-medium opacity-70">{m.senderName}</p>
                <p>{m.body}</p>
                <p className="mt-1 text-xs opacity-50">
                  {new Date(m.createdAt).toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <form onSubmit={send} className="flex gap-2">
        <input
          type="text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Tulis pesan…"
          className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-slate-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={sending || !body.trim()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          {sending ? "…" : "Kirim"}
        </button>
      </form>
    </div>
  );
}
