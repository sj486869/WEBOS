"use client";

import { Paintbrush, RefreshCcw, SunMoon, Wallpaper } from "lucide-react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { useOSStore } from "@/store/osStore";

const WALLPAPERS: Array<{ name: string; value: string }> = [
  {
    name: "Nebula",
    value: "radial-gradient(circle at top, #1b2133, #0b0d12 55%, #07080b)",
  },
  {
    name: "Dawn",
    value:
      "radial-gradient(circle at top, #fde68a, #fb7185 35%, #1d4ed8 80%)",
  },
  {
    name: "Forest",
    value:
      "radial-gradient(circle at top, #065f46, #0b0d12 55%, #030712)",
  },
];

export function SettingsApp({}: AppComponentProps) {
  const theme = useOSStore((s) => s.theme);
  const accent = useOSStore((s) => s.accent);
  const wallpaper = useOSStore((s) => s.wallpaper);
  const animationsEnabled = useOSStore((s) => s.animationsEnabled);

  const setTheme = useOSStore((s) => s.setTheme);
  const setAccent = useOSStore((s) => s.setAccent);
  const setWallpaper = useOSStore((s) => s.setWallpaper);
  const setAnimationsEnabled = useOSStore((s) => s.setAnimationsEnabled);

  return (
    <div className="h-full overflow-auto p-4">
      <div className="max-w-2xl space-y-5">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <SunMoon className="h-4 w-4" /> Theme
          </div>
          <div className="mt-2 flex gap-2">
            {([
              ["system", "System"],
              ["dark", "Dark"],
              ["light", "Light"],
            ] as const).map(([value, label]) => (
              <button
                key={value}
                className={`rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 ${
                  theme === value ? "bg-black/5 dark:bg-white/5" : ""
                }`}
                onClick={() => setTheme(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

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
