"use client";

import { useState } from "react";
import { Mail, MailOpen, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const markRead = async (id: string, read: boolean) => {
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (expanded === id) setExpanded(null);
    setDeleteConfirm(null);
  };

  const toggle = (id: string) => {
    const next = expanded === id ? null : id;
    setExpanded(next);
    if (next) {
      const msg = messages.find((m) => m.id === id);
      if (msg && !msg.read) markRead(id, true);
    }
  };

  const unread = messages.filter((m) => !m.read).length;

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-gray-400">
        <Mail size={48} className="mb-4 opacity-30" />
        <p className="text-sm">No messages yet</p>
      </div>
    );
  }

  return (
    <div>
      {unread > 0 && (
        <p className="text-xs text-yellow-600 font-medium mb-4">
          {unread} unread message{unread !== 1 ? "s" : ""}
        </p>
      )}
      <div className="space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`bg-white border rounded-sm shadow-sm transition-all ${
              !msg.read ? "border-l-4 border-l-yellow-400 border-gray-100" : "border-gray-100"
            }`}
          >
            {/* Header row */}
            <div
              className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggle(msg.id)}
            >
              <div className="flex-shrink-0">
                {msg.read ? (
                  <MailOpen size={18} className="text-gray-400" />
                ) : (
                  <Mail size={18} className="text-yellow-500" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${!msg.read ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                    {msg.name}
                  </p>
                  {!msg.read && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded font-medium">
                      New
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 truncate">{msg.email}</p>
              </div>
              <p className="text-xs text-gray-400 flex-shrink-0 hidden sm:block">
                {formatDate(msg.createdAt)}
              </p>
              <div className="flex items-center gap-1 flex-shrink-0">
                {deleteConfirm === msg.id ? (
                  <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="text-xs bg-red-500 text-white px-2 py-1 rounded font-medium"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={(e) => { e.stopPropagation(); setDeleteConfirm(msg.id); }}
                    className="p-1.5 text-gray-300 hover:text-red-400 transition-colors rounded"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                {expanded === msg.id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </div>
            </div>

            {/* Expanded message body */}
            {expanded === msg.id && (
              <div className="px-5 pb-5 border-t border-gray-50">
                <div className="pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-yellow-600 hover:underline font-medium"
                    >
                      {msg.email}
                    </a>
                    <p className="text-xs text-gray-400 sm:hidden">{formatDate(msg.createdAt)}</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {msg.message}
                  </p>
                  {msg.read && (
                    <button
                      onClick={() => markRead(msg.id, false)}
                      className="text-xs text-gray-400 hover:text-gray-600 transition-colors mt-2"
                    >
                      Mark as unread
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
