"use client";

import { Paintbrush, RefreshCcw, SunMoon, Wallpaper, Server, Wifi, WifiOff, CheckCircle2, XCircle } from "lucide-react";
import { useState, useEffect } from "react";
import type { AppComponentProps } from "@/core/os/appRegistry";
import { useOSStore } from "@/store/osStore";
import { useAuthStore } from "@/store/authStore";

const WALLPAPERS: Array<{ name: string; value: string }> = [
  {
    name: "Nebula",
    value: "radial-gradient(circle at top, #1b2133, #0b0d12 55%, #07080b)",
  },
  {
    name: "Dawn",
    value: "radial-gradient(circle at top, #fde68a, #fb7185 35%, #1d4ed8 80%)",
  },
  {
    name: "Forest",
    value: "radial-gradient(circle at top, #065f46, #0b0d12 55%, #030712)",
  },
];

export function SettingsApp({}: AppComponentProps) {
  const theme = useOSStore((s) => s.theme);
  const accent = useOSStore((s) => s.accent);
  const wallpaper = useOSStore((s) => s.wallpaper);
  const animationsEnabled = useOSStore((s) => s.animationsEnabled);
  const currentUser = useAuthStore((s) => s.currentUser);

  const setTheme = useOSStore((s) => s.setTheme);
  const setAccent = useOSStore((s) => s.setAccent);
  const setWallpaper = useOSStore((s) => s.setWallpaper);
  const setAnimationsEnabled = useOSStore((s) => s.setAnimationsEnabled);

  // ── Media Server ───────────────────────────────────────────────────────────
  const [mediaServerUrl, setMediaServerUrl] = useState("https://asj.qzz.io");
  const [serverStatus, setServerStatus] = useState<"idle" | "checking" | "connected" | "error">("idle");
  const [serverInfo, setServerInfo] = useState<{ files?: number; totalSizeHuman?: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("webos_media_server_url");
    if (stored) setMediaServerUrl(stored);
  }, []);

  const saveMediaServerUrl = (url: string) => {
    setMediaServerUrl(url);
    localStorage.setItem("webos_media_server_url", url);
    setServerStatus("idle");
    setServerInfo(null);
  };

  const testConnection = async () => {
    setServerStatus("checking");
    setServerInfo(null);
    try {
      let baseUrl = mediaServerUrl.replace(/\/+$/, "");
      if (baseUrl.endsWith("/health")) baseUrl = baseUrl.slice(0, -7);
      const res = await fetch(`${baseUrl}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json() as { storage?: { files?: number; totalSizeHuman?: string } };
      setServerStatus("connected");
      setServerInfo({
        files: data.storage?.files,
        totalSizeHuman: data.storage?.totalSizeHuman,
      });
    } catch {
      setServerStatus("error");
    }
  };

  return (
    <div className="h-full overflow-auto p-4">
      <div className="max-w-2xl space-y-5">

        {/* Theme */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SunMoon className="h-4 w-4" /> Theme
          </div>
          <div className="mt-2 flex gap-2">
            {(["system", "dark", "light"] as const).map((value) => (
              <button
                key={value}
                className={`rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 ${
                  theme === value ? "bg-black/5 dark:bg-white/5" : ""
                }`}
                onClick={() => setTheme(value)}
              >
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Accent */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Paintbrush className="h-4 w-4" /> Accent color
          </div>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="color"
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-md border border-[color:var(--os-border)] bg-transparent"
            />
            <div className="text-sm opacity-70">{accent}</div>
          </div>
        </div>

        {/* Wallpaper */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Wallpaper className="h-4 w-4" /> Wallpaper
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {WALLPAPERS.map((w) => (
              <button
                key={w.name}
                className={`overflow-hidden rounded-xl border border-[color:var(--os-border)] text-left ${
                  wallpaper === w.value ? "ring-2 ring-[color:var(--os-accent)]" : ""
                }`}
                onClick={() => setWallpaper(w.value)}
              >
                <div className="h-12" style={{ background: w.value }} />
                <div className="px-2 py-2 text-xs font-medium">{w.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Animations */}
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">Animations</div>
          <label className="mt-2 flex items-center gap-3 text-sm">
            <input
              type="checkbox"
              checked={animationsEnabled}
              onChange={(e) => setAnimationsEnabled(e.target.checked)}
            />
            Enable window animations
          </label>
        </div>

        {/* Media Server - Admin Only */}
        {currentUser?.role === 'admin' && (
          <div className="rounded-xl border border-[color:var(--os-border)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Server className="h-4 w-4" /> Media Server (Admin Only)
              </div>
              {serverStatus === "connected" && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-500">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Connected
                </div>
              )}
              {serverStatus === "error" && (
                <div className="flex items-center gap-1.5 text-xs text-red-400">
                  <XCircle className="h-3.5 w-3.5" /> Cannot connect
                </div>
              )}
            </div>

          <div className="flex gap-2">
            <input
              type="password"
              value={mediaServerUrl}
              onChange={(e) => saveMediaServerUrl(e.target.value)}
              placeholder="https://your-media-server.com"
              className="flex-1 rounded-lg border border-[color:var(--os-border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-[color:var(--os-accent)]"
            />
            <button
              onClick={testConnection}
              disabled={serverStatus === "checking"}
              className="flex items-center gap-1.5 rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 disabled:opacity-50 dark:hover:bg-white/5"
            >
              {serverStatus === "checking" ? (
                <><WifiOff className="h-3.5 w-3.5 animate-pulse" /> Testing…</>
              ) : (
                <><Wifi className="h-3.5 w-3.5" /> Test</>
              )}
            </button>
          </div>

          {serverStatus === "connected" && serverInfo && (
            <div className="flex gap-4 text-xs opacity-60">
              {serverInfo.files !== undefined && <span>📁 {serverInfo.files} files stored</span>}
              {serverInfo.totalSizeHuman && <span>💾 {serverInfo.totalSizeHuman} used</span>}
            </div>
          )}
          {serverStatus === "error" && (
            <p className="text-xs text-red-400">
              Could not reach the server. Check the URL and make sure the server is running.
            </p>
          )}
        </div>
        )}

        {/* Reset */}
        <div className="rounded-xl border border-[color:var(--os-border)] p-3">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <RefreshCcw className="h-4 w-4" /> Reset
          </div>
          <div className="mt-1 text-sm opacity-70">
            Resets local settings and virtual file system.
          </div>
          <button
            className="mt-3 rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5"
            onClick={async () => {
              if (!confirm("Reset OS data? This will clear files and settings.")) return;
              localStorage.clear();
              location.reload();
            }}
          >
            Reset OS
          </button>
        </div>

      </div>
    </div>
  );
}
