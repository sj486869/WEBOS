"use client";

import { Bot, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { useVfsStore } from "@/store/vfsStore";

type Msg = { role: "user" | "assistant"; text: string };

async function askServer(message: string) {
  const res = await fetch("/api/assistant", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ message }),
  });
  if (!res.ok) throw new Error("Request failed");
  return (await res.json()) as { reply: string };
}

export function AIAssistantApp({}: AppComponentProps) {
  const hydrated = useVfsStore((s) => s.hydrated);
  const resolve = useVfsStore((s) => s.resolve);
  const touch = useVfsStore((s) => s.touch);
  const list = useVfsStore((s) => s.list);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text:
        "Hi — I'm the Web OS assistant. Try: 'list files in /Notes' or 'create note: Shopping List'.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [msgs, busy]);

  const commands = useMemo(
    () => ({
      async tryHandle(message: string): Promise<string | null> {
        if (!hydrated) return "File system is still starting up.";

        const lower = message.toLowerCase();

        // create note: <title>
        const m = message.match(/create\s+note\s*:\s*(.+)$/i);
        if (m?.[1]) {
          const title = m[1].trim();
          const notes = resolve("/Notes");
          if (!notes || notes.type !== "folder") return "Couldn't find /Notes";
          touch(notes.id, `${title}.md`, `# ${title}\n`);
          return `Created note '${title}'.`;
        }

        // list files in /path
        const m2 = message.match(/list\s+files\s+in\s+(.+)$/i);
        if (m2?.[1]) {
          const path = m2[1].trim();
          const node = resolve(path);
          if (!node) return `No such path: ${path}`;
          if (node.type !== "folder") return `${path} is not a folder.`;
          const items = list(node.id);
          return items.length
            ? items.map((n) => (n.type === "folder" ? `${n.name}/` : n.name)).join("\n")
            : "(empty)";
        }

        if (lower.includes("help")) {
          return [
            "Commands I understand:",
            "- create note: <title>",
            "- list files in <absolute path>",
          ].join("\n");
        }

        return null;
      },
    }),
    [hydrated, resolve, touch, list]
  );

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    setInput("");
    setMsgs((m) => [...m, { role: "user", text }]);

    const local = await commands.tryHandle(text);
    if (local) {
      setMsgs((m) => [...m, { role: "assistant", text: local }]);
      return;
    }

    try {
      setBusy(true);
      const { reply } = await askServer(text);
      setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "assistant", text: "Sorry — I couldn't reach the assistant service." },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-[color:var(--os-border)] px-3 py-2 text-sm font-medium">
        <Bot className="h-4 w-4" /> Assistant
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="space-y-2">
          {msgs.map((m, idx) => (
            <div
              key={idx}
              className={`max-w-[85%] rounded-2xl border border-[color:var(--os-border)] px-3 py-2 text-sm whitespace-pre-wrap ${
                m.role === "user"
                  ? "ml-auto bg-[color:var(--os-accent)]/15"
                  : "bg-black/5 dark:bg-white/5"
              }`}
            >
              {m.text}
            </div>
          ))}
          {busy ? <div className="text-sm opacity-60">Thinking…</div> : null}
          <div ref={bottomRef} />
        </div>
      </div>
      <div className="border-t border-[color:var(--os-border)] p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void send();
          }}
        >
          <div className="flex items-center gap-2">
            <input
              className="min-w-0 flex-1 rounded-xl border border-[color:var(--os-border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--os-accent)]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something…"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
              disabled={busy}
            >
              <Send className="h-4 w-4" />
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
