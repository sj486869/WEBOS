"use client";

import { useEffect, useMemo, useState } from "react";

import { installedApps } from "@/core/os/appRegistry";
import type { AppId } from "@/core/os/appIds";
import { TASKBAR_HEIGHT } from "@/core/window-manager/constants";
import { useWindowStore } from "@/store/windowStore";

export function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const order = useWindowStore((s) => s.order);
  const activeId = useWindowStore((s) => s.activeId);
  const openApp = useWindowStore((s) => s.openApp);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);

  const [startOpen, setStartOpen] = useState(false);
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
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              <span className="max-w-40 truncate">{w.title}</span>
            </button>
          );
        })}
      </div>

      {/* System tray */}
      <div className="flex items-center gap-3 px-2 text-sm tabular-nums">
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
          <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide opacity-70">
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
          <div className="mt-2 border-t border-white/10 pt-2">
            <button
              className="w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10"
              onClick={() => {
                // simulated shutdown
                setStartOpen(false);
                openApp("ai-assistant");
              }}
            >
              Power ▸ (simulated)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
