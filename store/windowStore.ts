"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { appRegistry } from "@/core/os/appRegistry";
import type { AppId } from "@/core/os/appIds";
import {
  MIN_WINDOW_H,
  MIN_WINDOW_W,
  SNAP_THRESHOLD_PX,
  TASKBAR_HEIGHT,
  WINDOW_ANIM_MS,
} from "@/core/window-manager/constants";
import type {
  WindowId,
  WindowLifecycle,
  WindowRect,
  WindowSnap,
  WindowState,
} from "@/core/window-manager/types";
import { createId } from "@/utils/id";
import { clamp } from "@/utils/math";

type WindowManagerState = {
  windows: Record<WindowId, WindowState>;
  order: WindowId[];
  activeId: WindowId | null;
  nextZ: number;

  openApp: (appId: AppId) => WindowId;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;

  minimizeWindow: (id: WindowId) => void;
  restoreWindow: (id: WindowId) => void;
  toggleMaximizeWindow: (id: WindowId) => void;

  moveWindow: (id: WindowId, x: number, y: number) => void;
  resizeWindow: (id: WindowId, rect: Partial<WindowRect>) => void;
  snapWindow: (id: WindowId, snap: WindowSnap) => void;

  cycleFocus: () => void;

  _setLifecycle: (id: WindowId, lifecycle: WindowLifecycle) => void;
};

function getWorkArea() {
  const w = window.innerWidth;
  const h = Math.max(200, window.innerHeight - TASKBAR_HEIGHT);
  return { w, h };
}

function clampRect(rect: WindowRect, allowOffscreenPx = 24): WindowRect {
  const work = getWorkArea();
  const w = clamp(rect.w, MIN_WINDOW_W, work.w);
  const h = clamp(rect.h, MIN_WINDOW_H, work.h);

  const xMax = work.w - allowOffscreenPx;
  const yMax = work.h - allowOffscreenPx;

  return {
    x: clamp(rect.x, -w + allowOffscreenPx, xMax),
    y: clamp(rect.y, -h + allowOffscreenPx, yMax),
    w,
    h,
  };
}

const DEFAULT_RECT: WindowRect = { x: 80, y: 80, w: 860, h: 560 };

export const useWindowStore = create<WindowManagerState>()(
  persist(
    (set, get) => ({
      windows: {},
      order: [],
      activeId: null,
      nextZ: 10,

      openApp: (appId) => {
        const def = appRegistry[appId];

        if (def.singleton) {
          const existing = Object.values(get().windows).find(
            (w) => w.appId === appId
          );
          if (existing) {
            if (existing.isMinimized) get().restoreWindow(existing.id);
            get().focusWindow(existing.id);
            return existing.id;
          }
        }

        const id = createId("win");
        const now = Date.now();
        const cascade = get().order.length * 18;

        const work = getWorkArea();
        const base: WindowRect = {
          ...DEFAULT_RECT,
          x: clamp(DEFAULT_RECT.x + cascade, 0, Math.max(0, work.w - 80)),
          y: clamp(DEFAULT_RECT.y + cascade, 0, Math.max(0, work.h - 80)),
        };

        const zIndex = get().nextZ;

        const win: WindowState = {
          id,
          appId,
          title: def.title,
          rect: clampRect(base),
          zIndex,
          isMinimized: false,
          isMaximized: false,
          snap: "none",
          lifecycle: "opening",
          createdAt: now,
          updatedAt: now,
        };

        set((s) => ({
          windows: { ...s.windows, [id]: win },
          order: [...s.order, id],
          activeId: id,
          nextZ: s.nextZ + 1,
        }));

        // mark as 'normal' after open animation
        window.setTimeout(() => get()._setLifecycle(id, "normal"), WINDOW_ANIM_MS);
        return id;
      },

      closeWindow: (id) => {
        const w = get().windows[id];
        if (!w) return;

        get()._setLifecycle(id, "closing");
        window.setTimeout(() => {
          set((s) => {
            const rest = { ...s.windows };
            delete rest[id];
            const order = s.order.filter((x) => x !== id);
            const activeId = s.activeId === id ? order.at(-1) ?? null : s.activeId;
            return { windows: rest, order, activeId };
          });
        }, WINDOW_ANIM_MS);
      },

      focusWindow: (id) => {
        const w = get().windows[id];
        if (!w) return;

        set((s) => ({
          windows: {
            ...s.windows,
            [id]: { ...w, zIndex: s.nextZ, updatedAt: Date.now() },
          },
          activeId: id,
          nextZ: s.nextZ + 1,
        }));
      },

      minimizeWindow: (id) => {
        const w = get().windows[id];
        if (!w || w.isMinimized) return;

        get()._setLifecycle(id, "minimizing");
        window.setTimeout(() => {
          set((s) => ({
            windows: {
              ...s.windows,
              [id]: {
                ...s.windows[id],
                isMinimized: true,
                lifecycle: "normal",
                updatedAt: Date.now(),
              },
            },
            activeId: s.activeId === id ? null : s.activeId,
          }));
        }, WINDOW_ANIM_MS);
      },

      restoreWindow: (id) => {
        const w = get().windows[id];
        if (!w) return;

        set((s) => ({
          windows: {
            ...s.windows,
            [id]: { ...w, isMinimized: false, lifecycle: "restoring" },
          },
          activeId: id,
        }));

        get().focusWindow(id);
        window.setTimeout(() => get()._setLifecycle(id, "normal"), WINDOW_ANIM_MS);
      },

      toggleMaximizeWindow: (id) => {
        const w = get().windows[id];
        if (!w) return;

        if (!w.isMaximized) {
          const work = getWorkArea();
          set((s) => ({
            windows: {
              ...s.windows,
              [id]: {
                ...w,
                lifecycle: "maximizing",
                isMaximized: true,
                snap: "fullscreen",
                restoreRect: w.rect,
                rect: { x: 0, y: 0, w: work.w, h: work.h },
                updatedAt: Date.now(),
              },
            },
          }));
          window.setTimeout(() => get()._setLifecycle(id, "normal"), WINDOW_ANIM_MS);
        } else {
          const restore = w.restoreRect ?? DEFAULT_RECT;
          set((s) => ({
            windows: {
              ...s.windows,
              [id]: {
                ...w,
                lifecycle: "unmaximizing",
                isMaximized: false,
                snap: "none",
                rect: clampRect(restore),
                restoreRect: undefined,
                updatedAt: Date.now(),
              },
            },
          }));
          window.setTimeout(() => get()._setLifecycle(id, "normal"), WINDOW_ANIM_MS);
        }
      },

      moveWindow: (id, x, y) => {
        const w = get().windows[id];
        if (!w || w.isMaximized) return;

        set((s) => ({
          windows: {
            ...s.windows,
            [id]: {
              ...w,
              rect: clampRect({ ...w.rect, x, y }),
              snap: "none",
              updatedAt: Date.now(),
            },
          },
        }));
      },

      resizeWindow: (id, rectPatch) => {
        const w = get().windows[id];
        if (!w || w.isMaximized) return;

        const next = clampRect({ ...w.rect, ...rectPatch });

        set((s) => ({
          windows: {
            ...s.windows,
            [id]: { ...w, rect: next, snap: "none", updatedAt: Date.now() },
          },
        }));
      },

      snapWindow: (id, snap) => {
        const w = get().windows[id];
        if (!w) return;

        const work = getWorkArea();

        if (snap === "none") {
          set((s) => ({
            windows: {
              ...s.windows,
              [id]: {
                ...w,
                snap: "none",
                isMaximized: false,
                rect: clampRect(w.restoreRect ?? w.rect),
              },
            },
          }));
          return;
        }

        const rect: WindowRect =
          snap === "fullscreen"
            ? { x: 0, y: 0, w: work.w, h: work.h }
            : snap === "left"
              ? { x: 0, y: 0, w: Math.floor(work.w / 2), h: work.h }
              : { x: Math.floor(work.w / 2), y: 0, w: Math.floor(work.w / 2), h: work.h };

        set((s) => ({
          windows: {
            ...s.windows,
            [id]: {
              ...w,
              snap,
              isMaximized: snap === "fullscreen",
              restoreRect: w.restoreRect ?? w.rect,
              rect,
              updatedAt: Date.now(),
            },
          },
        }));
      },

      cycleFocus: () => {
        const ids = get()
          .order.map((id) => get().windows[id])
          .filter((w) => w && !w.isMinimized)
          .sort((a, b) => b.zIndex - a.zIndex)
          .map((w) => w.id);

        if (ids.length === 0) return;

        const active = get().activeId;
        const idx = active ? ids.indexOf(active) : -1;
        const next = ids[(idx + 1) % ids.length];
        get().focusWindow(next);
      },

      _setLifecycle: (id, lifecycle) => {
        const w = get().windows[id];
        if (!w) return;
        set((s) => ({
          windows: {
            ...s.windows,
            [id]: { ...w, lifecycle, updatedAt: Date.now() },
          },
        }));
      },
    }),
    {
      name: "web-os:windows",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        windows: s.windows,
        order: s.order,
        activeId: s.activeId,
        nextZ: s.nextZ,
      }),
      onRehydrateStorage: () => (state) => {
        // After hydration, ensure all windows are in a sane lifecycle state.
        if (!state) return;
        for (const id of Object.keys(state.windows)) {
          state.windows[id].lifecycle = "normal";
        }
      },
    }
  )
);

export function getSnapFromPointer(x: number, y: number): WindowSnap {
  const work = getWorkArea();
  if (y <= SNAP_THRESHOLD_PX) return "fullscreen";
  if (x <= SNAP_THRESHOLD_PX) return "left";
  if (x >= work.w - SNAP_THRESHOLD_PX) return "right";
  return "none";
}
