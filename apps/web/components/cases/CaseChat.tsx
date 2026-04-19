"use client";

import { useState } from "react";

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

export function CaseChat({ caseId: _caseId, initialMessages = [], currentRole = "CLIENT" }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setSending(true);
    const optimistic: Message = {
      id: `tmp_${Date.now()}`,
      senderRole: currentRole,
      senderName: "Anda",
      body,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);
    setBody("");
    setSending(false);
    // In production: POST /api/cases/:id/messages and emit via Socket.io
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="max-h-96 space-y-3 overflow-y-auto">
        {messages.map((m) => {
          const isMe = m.senderRole === currentRole;
          return (
            <div
              key={m.id}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs rounded-xl px-4 py-3 text-sm ${
                  isMe
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-800"
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
      </div>
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
          Kirim
        </button>
      </form>
    </div>
  );
}
