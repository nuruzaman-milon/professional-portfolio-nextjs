"use client";

import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2, Reply } from "lucide-react";
import { cardCls } from "@/components/admin/ui";

type Row = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Row[] | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    const res = await fetch("/api/messages");
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Failed to load messages.");
      setMessages([]);
      return;
    }
    setMessages(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const setRead = async (id: string, read: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setMessages(
      (prev) => prev?.map((m) => (m._id === id ? { ...m, read } : m)) ?? null,
    );
  };

  const toggleExpand = (msg: Row) => {
    const opening = expanded !== msg._id;
    setExpanded(opening ? msg._id : null);
    if (opening && !msg.read) setRead(msg._id, true);
  };

  const handleDelete = async (msg: Row) => {
    if (!confirm(`Delete message from ${msg.name}?`)) return;
    const res = await fetch(`/api/messages/${msg._id}`, { method: "DELETE" });
    if (res.ok) load();
    else alert("Failed to delete.");
  };

  const unread = messages?.filter((m) => !m.read).length ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
        <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white">
          Messages
        </h1>
        {messages && messages.length > 0 && (
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {messages.length} total · {unread} unread
          </span>
        )}
      </div>

      {error && (
        <div className={`${cardCls} p-5 mb-5 text-sm text-amber-600 dark:text-amber-400`}>
          {error}
        </div>
      )}

      {messages === null ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      ) : messages.length === 0 && !error ? (
        <div className={`${cardCls} p-8 text-center text-sm text-gray-500 dark:text-gray-400`}>
          No messages yet. When someone uses the contact form, it will appear
          here.
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const open = expanded === msg._id;
            return (
              <div
                key={msg._id}
                className={`${cardCls} transition-colors ${
                  !msg.read ? "border-teal-300/60 dark:border-teal-700/40" : ""
                }`}
              >
                {/* Row header — click to expand */}
                <button
                  onClick={() => toggleExpand(msg)}
                  className="w-full text-left p-4 sm:p-5 flex flex-wrap items-center gap-3"
                >
                  <span
                    className={`flex-shrink-0 ${
                      msg.read
                        ? "text-gray-300 dark:text-gray-600"
                        : "text-teal-600"
                    }`}
                  >
                    {msg.read ? <MailOpen size={16} /> : <Mail size={16} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <span
                        className={`text-sm ${
                          msg.read
                            ? "font-medium text-gray-700 dark:text-gray-300"
                            : "font-bold text-gray-900 dark:text-white"
                        }`}
                      >
                        {msg.name}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 font-mono truncate">
                        {msg.email}
                      </span>
                    </div>
                    <p
                      className={`text-sm truncate ${
                        msg.read
                          ? "text-gray-500 dark:text-gray-400"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      {msg.subject}
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500 flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </button>

                {/* Expanded body */}
                {open && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-gray-100/80 dark:border-white/[0.05]">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap mb-4 pt-3">
                      {msg.message}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(`Re: ${msg.subject}`)}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-teal-600 hover:bg-teal-700 text-white transition-colors"
                      >
                        <Reply size={12} /> Reply
                      </a>
                      <button
                        onClick={() => setRead(msg._id, !msg.read)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200/70 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-teal-300/50 hover:text-teal-700 dark:hover:text-teal-400 transition-colors"
                      >
                        {msg.read ? (
                          <>
                            <Mail size={12} /> Mark unread
                          </>
                        ) : (
                          <>
                            <MailOpen size={12} /> Mark read
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => handleDelete(msg)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-gray-200/70 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:border-red-300/50 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
