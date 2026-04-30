"use client";

import { Activity, Cpu, MemoryStick } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { installedApps } from "@/core/os/appRegistry";
import { useWindowStore } from "@/store/windowStore";

export function SystemMonitorApp({}: AppComponentProps) {
  const windows = useWindowStore((s) => s.windows);

  const [cpu, setCpu] = useState(12);
  const [ram, setRam] = useState(34);

  useEffect(() => {
    const t = window.setInterval(() => {
      setCpu((v) => Math.max(2, Math.min(100, v + (Math.random() * 18 - 9))));
      setRam((v) => Math.max(5, Math.min(100, v + (Math.random() * 10 - 5))));
    }, 700);
    return () => window.clearInterval(t);
  }, []);

  const running = useMemo(() => {
    return Object.values(windows).sort((a, b) => b.zIndex - a.zIndex);
  }, [windows]);

  return (
    <div className="flex h-full flex-col gap-3 p-3">
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-[color:var(--os-border)] bg-black/5 p-3 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Cpu className="h-4 w-4" /> CPU
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">{cpu.toFixed(0)}%</div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${cpu}%`, background: "var(--os-accent)" }}
            />
          </div>
        </div>
        <div className="rounded-xl border border-[color:var(--os-border)] bg-black/5 p-3 dark:bg-white/5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MemoryStick className="h-4 w-4" /> RAM
          </div>
          <div className="mt-2 text-2xl font-semibold tabular-nums">{ram.toFixed(0)}%</div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full"
              style={{ width: `${ram}%`, background: "var(--os-accent)" }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-[color:var(--os-border)]">
        <div className="flex items-center gap-2 border-b border-[color:var(--os-border)] px-3 py-2 text-sm font-medium">
          <Activity className="h-4 w-4" /> Running apps
        </div>
        <div className="divide-y divide-[color:var(--os-border)]">
          {running.map((w) => {
            const app = installedApps.find((a) => a.id === w.appId);
            const Icon = app?.icon;
            return (
              <div key={w.id} className="flex items-center gap-3 px-3 py-2 text-sm">
                {Icon ? <Icon className="h-4 w-4 opacity-80" /> : null}
                <div className="min-w-0 flex-1">
                  <div className="truncate font-medium">{w.title}</div>
                  <div className="truncate text-xs opacity-60">{w.id}</div>
                </div>
                <div className="text-xs opacity-70 tabular-nums">z {w.zIndex}</div>
              </div>
            );
          })}
          {running.length === 0 ? (
            <div className="p-4 text-sm opacity-60">No running apps</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
