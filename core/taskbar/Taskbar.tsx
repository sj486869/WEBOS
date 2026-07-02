"use client";

import { useEffect, useMemo, useState } from "react";

import { installedApps } from "@/core/os/appRegistry";
import type { AppId } from "@/core/os/appIds";
import { TASKBAR_HEIGHT } from "@/core/window-manager/constants";
import { useWindowStore } from "@/store/windowStore";
import { useAuthStore } from "@/store/authStore";
import { UserCircle, LogOut, X, Server, CheckCircle2, XCircle, WifiOff } from "lucide-react";

function MediaServerTray() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking");
  const [info, setInfo] = useState<{ files?: number } | null>(null);

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      try {
        const url = localStorage.getItem("webos_media_server_url") || "https://asj.qzz.io";
        let baseUrl = url.replace(/\/+$/, "");
        if (baseUrl.endsWith("/health")) baseUrl = baseUrl.slice(0, -7);
        const res = await fetch(`${baseUrl}/health`, { signal: AbortSignal.timeout(3000) });
        if (!res.ok) throw new Error("error");
        const data = await res.json() as { storage?: { files?: number } };
        if (mounted) {
          setStatus("connected");
          setInfo({ files: data.storage?.files });
        }
      } catch {
        if (mounted) setStatus("error");
      }
    };
    
    check();
    const t = setInterval(check, 10000); // Check every 10s
    return () => {
      mounted = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg hover:bg-white/10 text-xs cursor-pointer group relative" title="Media Server Status">
      {status === "connected" ? <Server className="h-4 w-4 text-emerald-400" /> : <Server className="h-4 w-4 text-red-400 opacity-50" />}
      <div className="hidden group-hover:block absolute bottom-full mb-2 right-0 w-48 bg-[color:var(--os-panel-solid)] border border-white/10 rounded-xl p-3 shadow-2xl backdrop-blur-xl">
         <div className="text-sm font-semibold mb-1 flex items-center gap-2"><Server className="w-4 h-4" /> Media Server</div>
         {status === "checking" && <div className="text-xs opacity-70 flex gap-1 items-center"><WifiOff className="w-3 h-3 animate-pulse" /> Checking...</div>}
         {status === "error" && <div className="text-xs text-red-400 flex gap-1 items-center"><XCircle className="w-3 h-3" /> Disconnected</div>}
         {status === "connected" && (
           <div className="text-xs text-emerald-400 flex gap-1 items-center">
             <CheckCircle2 className="w-3 h-3" /> Connected {info?.files !== undefined ? `(${info.files} files)` : ''}
           </div>
         )}
      </div>
    </div>
  );
}

export function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const order = useWindowStore((s) => s.order);
  const activeId = useWindowStore((s) => s.activeId);
  const openApp = useWindowStore((s) => s.openApp);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);

  const { currentUser, logout } = useAuthStore();

  const [startOpen, setStartOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ id: string; x: number } | null>(null);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const running = useMemo(() => order.map((id) => windows[id]).filter(Boolean), [order, windows]);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-[1000] flex items-center gap-2 border-t border-white/10 bg-[color:var(--os-panel)] px-2 backdrop-blur"
      style={{ height: TASKBAR_HEIGHT }}
      onPointerDown={() => {
        if (startOpen) setStartOpen(false);
      }}
    >
      <button
        type="button"
        className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => setStartOpen((v) => !v)}
      >
        Start
      </button>

      {/* Running apps */}
      <div className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
        {running.map((w) => {
          const isActive = w.id === activeId;
          const app = installedApps.find((a) => a.id === w.appId);
          const Icon = app?.icon;
          return (
            <button
              key={w.id}
              type="button"
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10 ${
                isActive ? "bg-white/10" : ""
              }`}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => {
                if (w.isMinimized) restoreWindow(w.id);
                focusWindow(w.id);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setContextMenu({ id: w.id, x: e.clientX });
              }}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              <span className="max-w-40 truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-2 px-2 text-sm tabular-nums">
        <MediaServerTray />
        <button
          type="button"
          className="rounded-lg px-2 py-1 hover:bg-white/10"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => openApp("settings" satisfies AppId)}
        >
          ⚙
        </button>
        <div className="text-right leading-4">
          <div>{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
          <div className="text-xs opacity-80">
            {now.toLocaleDateString([], { year: "numeric", month: "short", day: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Start menu */}
      {startOpen && (
        <div
          className="absolute bottom-[52px] left-2 z-[1100] w-72 rounded-2xl border border-white/10 bg-[color:var(--os-panel-solid)]/95 p-2 shadow-2xl backdrop-blur"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="px-3 pb-3 pt-1 flex items-center gap-3 border-b border-white/10 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <UserCircle className="h-6 w-6 text-white/80" />
            </div>
            <div>
              <div className="text-sm font-semibold">{currentUser?.username || "Guest"}</div>
              <div className="text-xs text-white/50 capitalize">{currentUser?.role || "user"}</div>
            </div>
          </div>
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide opacity-70 mt-1">
            Apps
          </div>
          <div className="grid grid-cols-2 gap-1">
            {installedApps.map((app) => {
              const Icon = app.icon;
              return (
                <button
                  key={app.id}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
                  onClick={() => {
                    openApp(app.id);
                    setStartOpen(false);
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span className="truncate">{app.title}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-2 border-t border-white/10 pt-2 grid grid-cols-2 gap-1">
            <button
              className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
              onClick={() => {
                setStartOpen(false);
                logout();
              }}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </button>
            <button
              className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
              onClick={() => {
                // simulated shutdown
                setStartOpen(false);
                openApp("ai-assistant");
              }}
            >
              Power ▸
            </button>
          </div>
        </div>
      )}
      {/* Context Menu for Taskbar Apps */}
      {contextMenu && (
        <>
          <div className="fixed inset-0 z-[1200]" onPointerDown={() => setContextMenu(null)} onContextMenu={(e) => e.preventDefault()} />
          <div
            className="fixed z-[1300] w-48 rounded-xl border border-white/10 bg-[color:var(--os-panel-solid)]/95 py-1 shadow-2xl backdrop-blur"
            style={{ left: Math.min(contextMenu.x, window.innerWidth - 200), bottom: TASKBAR_HEIGHT + 10 }}
          >
            <button
              type="button"
              className="flex w-full items-center gap-3 px-3 py-2 text-sm hover:bg-white/10 transition-colors"
              onClick={() => {
                closeWindow(contextMenu.id);
                setContextMenu(null);
              }}
            >
              <X className="h-4 w-4" />
              <span>Close window</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
