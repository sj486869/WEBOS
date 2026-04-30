"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { useVfsStore } from "@/store/vfsStore";
import type { VfsNode, VfsNodeId } from "@/utils/vfs/types";

type Line = { type: "in" | "out"; text: string };

function isFolder(n: VfsNode): n is Extract<VfsNode, { type: "folder" }> {
  return n.type === "folder";
}

function joinPath(base: string, rel: string) {
  if (rel.startsWith("/")) return rel;
  const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${cleanBase}/${rel}`.replaceAll("//", "/");
}

export function TerminalApp({}: AppComponentProps) {
  const hydrated = useVfsStore((s) => s.hydrated);
  const vfs = useVfsStore((s) => s.vfs);
  const resolve = useVfsStore((s) => s.resolve);
  const list = useVfsStore((s) => s.list);
  const getPath = useVfsStore((s) => s.getPath);
  const mkdir = useVfsStore((s) => s.mkdir);
  const touch = useVfsStore((s) => s.touch);
  const rm = useVfsStore((s) => s.rm);

  const [cwdId, setCwdId] = useState<VfsNodeId>(vfs.rootId);
  const [lines, setLines] = useState<Line[]>([
    { type: "out", text: "web-os terminal — type 'help'" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const prompt = useMemo(() => {
    const p = getPath(cwdId);
    return `guest@webos:${p}$`;
  }, [cwdId, getPath]);

  function println(text: string) {
    setLines((l) => [...l, { type: "out", text }]);
  }

  function run(cmdline: string) {
    const trimmed = cmdline.trim();
    if (!trimmed) return;

    setLines((l) => [...l, { type: "in", text: `${prompt} ${trimmed}` }]);

    const [cmd, ...rest] = trimmed.split(/\s+/);
    const arg = rest.join(" ");

    try {
      switch (cmd) {
        case "help":
          println(
            [
              "Commands:",
              "  ls",
              "  cd <path>",
              "  mkdir <name>",
              "  touch <name>",
              "  rm <name>",
              "  clear",
              "  whoami",
              "  date",
              "  neofetch",
            ].join("\n")
          );
          break;
        case "clear":
          setLines([]);
          break;
        case "whoami":
          println("guest");
          break;
        case "date":
          println(new Date().toString());
          break;
        case "neofetch":
          println(
            [
              "      _      __      ____  ____",
              " __  / | /| / /__  / __ \\/ __/",
              "/ _ \/  |/ |/ / _ \/ /_/ / _/  ",
              "\\___/_/|__/\__/\___/\____/_/    ",
              "",
              "Web OS Desktop (Next.js)",
            ].join("\n")
          );
          break;
        case "ls": {
          const nodes = list(cwdId);
          const names = nodes
            .map((n) => (n.type === "folder" ? `${n.name}/` : n.name))
            .join("  ");
          println(names || "");
          break;
        }
        case "cd": {
          const nextPath = arg ? joinPath(getPath(cwdId), arg) : "/";
          const node = resolve(nextPath);
          if (!node) {
            println(`cd: no such file or directory: ${arg}`);
            break;
          }
          if (!isFolder(node)) {
            println(`cd: not a directory: ${arg}`);
            break;
          }
          setCwdId(node.id);
          break;
        }
        case "mkdir": {
          if (!arg) {
            println("mkdir: missing name");
            break;
          }
          mkdir(cwdId, arg);
          break;
        }
        case "touch": {
          if (!arg) {
            println("touch: missing name");
            break;
          }
          touch(cwdId, arg, "");
          break;
        }
        case "rm": {
          if (!arg) {
            println("rm: missing name");
            break;
          }
          const nodes = list(cwdId);
          const match = nodes.find((n) => n.name === arg);
          if (!match) {
            println(`rm: no such file: ${arg}`);
            break;
          }
          rm(match.id);
          break;
        }
        default:
          println(`command not found: ${cmd}`);
      }
    } catch (e) {
      println(`error: ${(e as Error).message}`);
    }
  }

  if (!hydrated) {
    return <div className="p-4 text-sm opacity-70">Booting terminal…</div>;
  }

  return (
    <div className="flex h-full flex-col bg-black/25 font-mono text-sm">
      <div className="flex-1 overflow-auto p-3">
        {lines.map((l, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap leading-5 ${l.type === "in" ? "text-[color:var(--os-fg)]" : "text-white/80"}`}
          >
            {l.text}
          </pre>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/10 p-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(input);
            setInput("");
          }}
        >
          <div className="flex items-center gap-2">
            <span className="truncate text-white/70">{prompt}</span>
            <input
              className="min-w-0 flex-1 rounded-md bg-black/40 px-2 py-1 text-white/90 outline-none focus:ring-2 focus:ring-[color:var(--os-accent)]"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoFocus
              spellCheck={false}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
