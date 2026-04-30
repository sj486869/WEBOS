"use client";

import { FilePlus, Trash2 } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { useVfsStore } from "@/store/vfsStore";
import type { VfsNode, VfsNodeId } from "@/utils/vfs/types";

function isFile(n: VfsNode): n is Extract<VfsNode, { type: "file" }> {
  return n.type === "file";
}

export function NotesApp({}: AppComponentProps) {
  const hydrated = useVfsStore((s) => s.hydrated);
  const vfs = useVfsStore((s) => s.vfs);
  const resolve = useVfsStore((s) => s.resolve);
  const mkdir = useVfsStore((s) => s.mkdir);
  const touch = useVfsStore((s) => s.touch);
  const write = useVfsStore((s) => s.write);
  const rm = useVfsStore((s) => s.rm);

  const [activeId, setActiveId] = useState<VfsNodeId | null>(null);
  const [draft, setDraft] = useState("");
  const saveTimer = useRef<number | null>(null);

  const notesDir = hydrated ? resolve("/Notes") : undefined;
  const notesDirId = notesDir?.type === "folder" ? notesDir.id : null;

  const notes = useMemo(() => {
    if (!notesDirId) return [];
    const dir = vfs.nodes[notesDirId];
    if (!dir || dir.type !== "folder") return [];
    return dir.children
      .map((id) => vfs.nodes[id])
      .filter(Boolean)
      .filter(isFile)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notesDirId, vfs.nodes]);

  const active = activeId ? vfs.nodes[activeId] : undefined;

  function scheduleSave(next: string) {
    if (!activeId) return;
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      write(activeId, next);
    }, 200);
  }

  if (!hydrated) {
    return <div className="p-4 text-sm opacity-70">Loading notes…</div>;
  }

  return (
    <div className="flex h-full">
      <aside className="w-64 border-r border-[color:var(--os-border)] p-2">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="text-xs font-semibold uppercase tracking-wide opacity-70">
            Notes
          </div>
          <button
            className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
            title="New note"
            onClick={() => {
              const targetNotesDirId = notesDirId ?? mkdir(vfs.rootId, "Notes");
              const title = prompt("Note title", "New Note");
              if (!title) return;
              const content = "# " + title + "\n";
              const id = touch(targetNotesDirId, `${title}.md`, content);
              setActiveId(id);
              setDraft(content);
            }}
          >
            <FilePlus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          {notes.map((n) => (
            <button
              key={n.id}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5 ${
                n.id === activeId ? "bg-black/5 dark:bg-white/5" : ""
              }`}
              onClick={() => {
                setActiveId(n.id);
                setDraft(n.content);
              }}
            >
              <div className="truncate font-medium">{n.name}</div>
              <div className="truncate text-xs opacity-60">
                {new Date(n.updatedAt).toLocaleString()}
              </div>
            </button>
          ))}
          {notes.length === 0 ? (
            <div className="p-3 text-sm opacity-60">No notes yet</div>
          ) : null}
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2 border-b border-[color:var(--os-border)] p-2">
          <div className="min-w-0 flex-1 truncate text-sm font-medium">
            {active && active.type === "file" ? active.name : "Select a note"}
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            disabled={!activeId}
            onClick={() => {
              if (!activeId) return;
              if (!confirm("Delete this note?") ) return;
              rm(activeId);
              setActiveId(null);
              setDraft("");
            }}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </header>

        <div className="flex-1 p-2">
          <textarea
            className="h-full w-full resize-none rounded-xl border border-[color:var(--os-border)] bg-transparent p-3 font-mono text-sm outline-none focus:ring-2 focus:ring-[color:var(--os-accent)]"
            value={draft}
            onChange={(e) => {
              const next = e.target.value;
              setDraft(next);
              scheduleSave(next);
            }}
            placeholder={activeId ? "Start typing…" : "Select or create a note"}
            disabled={!activeId}
          />
        </div>
      </section>
    </div>
  );
}
