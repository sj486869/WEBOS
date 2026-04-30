"use client";

import { useMemo, useRef, useState } from "react";

import { installedApps } from "@/core/os/appRegistry";
import type { AppId } from "@/core/os/appIds";
import { useDesktopStore } from "@/store/desktopStore";
import { useWindowStore } from "@/store/windowStore";

type MenuState = { open: boolean; x: number; y: number };

export function Desktop({ disabled }: { disabled?: boolean }) {
  const openApp = useWindowStore((s) => s.openApp);

  const iconPos = useDesktopStore((s) => s.iconPos);
  const setIconPos = useDesktopStore((s) => s.setIconPos);
  const resetLayout = useDesktopStore((s) => s.resetLayout);

  const [menu, setMenu] = useState<MenuState>({ open: false, x: 0, y: 0 });

  const dragging = useRef<{
    appId: AppId;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const appIcons = useMemo(() => installedApps, []);

  return (
    <div
      className="absolute inset-0 select-none"
      style={{ background: "var(--os-wallpaper)" }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenu({ open: true, x: e.clientX, y: e.clientY });
      }}
      onPointerDown={() => {
        if (menu.open) setMenu((m) => ({ ...m, open: false }));
      }}
    >
      {/* Icons */}
      <div className="absolute inset-0">
        {appIcons.map((app, idx) => {
          const pos = iconPos[app.id] ?? { x: 24, y: 24 + idx * 84 };
          const Icon = app.icon;

          return (
            <button
              key={app.id}
              type="button"
              className="group absolute flex w-20 flex-col items-center gap-2 rounded-lg p-2 text-xs text-[color:var(--os-fg)] hover:bg-white/10 active:bg-white/15"
              style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
              onDoubleClick={() => {
                if (!disabled) openApp(app.id);
              }}
              onPointerDown={(e) => {
                if (disabled) return;
                if (e.button !== 0) return;
                e.currentTarget.setPointerCapture(e.pointerId);

                dragging.current = {
                  appId: app.id,
                  startX: e.clientX,
                  startY: e.clientY,
                  originX: pos.x,
                  originY: pos.y,
                };
              }}
              onPointerMove={(e) => {
                const d = dragging.current;
                if (!d || d.appId !== app.id) return;
                const dx = e.clientX - d.startX;
                const dy = e.clientY - d.startY;
                setIconPos(app.id, { x: d.originX + dx, y: d.originY + dy });
              }}
              onPointerUp={() => {
                dragging.current = null;
              }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 ring-1 ring-white/10 group-hover:bg-black/30">
                <Icon className="h-5 w-5" />
              </div>
              <span className="line-clamp-2 text-center leading-4 drop-shadow">
                {app.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Context Menu */}
      {menu.open && (
        <div
          className="absolute z-50 min-w-48 rounded-xl border border-white/10 bg-[color:var(--os-panel-solid)]/95 p-1 text-sm shadow-2xl backdrop-blur"
          style={{ left: menu.x, top: menu.y }}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <button
            className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/10"
            onClick={() => {
              setMenu((m) => ({ ...m, open: false }));
              resetLayout();
            }}
          >
            Reset icon layout
          </button>
          <button
            className="w-full rounded-lg px-3 py-2 text-left hover:bg-white/10"
            onClick={() => {
              setMenu((m) => ({ ...m, open: false }));
              openApp("settings");
            }}
          >
            Settings
          </button>
        </div>
      )}
    </div>
  );
}
