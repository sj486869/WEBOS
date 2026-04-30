"use client";

import { motion } from "framer-motion";
import { Minus, Square, X } from "lucide-react";
import type React from "react";
import { useMemo, useRef } from "react";

import { appRegistry } from "@/core/os/appRegistry";
import {
  MIN_WINDOW_H,
  MIN_WINDOW_W,
  WINDOW_ANIM_MS,
} from "@/core/window-manager/constants";
import type { WindowRect, WindowState } from "@/core/window-manager/types";
import { getSnapFromPointer, useWindowStore } from "@/store/windowStore";
import { clamp } from "@/utils/math";

type ResizeDir =
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw";

function getAnimState(win: WindowState) {
  if (win.lifecycle === "opening") return "open";
  if (win.lifecycle === "closing") return "close";
  if (win.lifecycle === "minimizing") return "minimize";
  if (win.lifecycle === "restoring") return "restore";
  if (win.lifecycle === "maximizing") return "maximize";
  if (win.lifecycle === "unmaximizing") return "restore";
  return "idle";
}

export function WindowFrame({
  win,
  animationsEnabled,
}: {
  win: WindowState;
  animationsEnabled: boolean;
}) {
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const toggleMaximizeWindow = useWindowStore((s) => s.toggleMaximizeWindow);
  const moveWindow = useWindowStore((s) => s.moveWindow);
  const resizeWindow = useWindowStore((s) => s.resizeWindow);
  const snapWindow = useWindowStore((s) => s.snapWindow);

  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  const resizeRef = useRef<{
    pointerId: number;
    dir: ResizeDir;
    startX: number;
    startY: number;
    origin: WindowRect;
  } | null>(null);

  const App = appRegistry[win.appId].component;

  const style = useMemo(() => {
    const r = win.rect;
    return {
      left: r.x,
      top: r.y,
      width: r.w,
      height: r.h,
      zIndex: win.zIndex,
    };
  }, [win.rect, win.zIndex]);

  const animate = useMemo(() => {
    if (!animationsEnabled) return undefined;
    return getAnimState(win);
  }, [win, animationsEnabled]);

  const variants = useMemo(
    () => ({
      idle: { opacity: 1, scale: 1, y: 0 },
      open: { opacity: [0, 1], scale: [0.96, 1], y: [8, 0] },
      close: { opacity: 0, scale: 0.96, y: 6 },
      minimize: { opacity: 0, scale: 0.9, y: 30 },
      restore: { opacity: [0, 1], scale: [0.96, 1], y: [14, 0] },
      maximize: { opacity: 1, scale: 1, y: 0 },
    }),
    []
  );

  function onTitlePointerDown(e: React.PointerEvent) {
    if (e.button !== 0) return;
    if (win.isMaximized) return;

    e.stopPropagation();
    focusWindow(win.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    dragRef.current = {
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: win.rect.x,
      originY: win.rect.y,
    };
  }

  function onTitlePointerMove(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    moveWindow(win.id, d.originX + dx, d.originY + dy);
  }

  function onTitlePointerUp(e: React.PointerEvent) {
    const d = dragRef.current;
    if (!d || d.pointerId !== e.pointerId) return;

    dragRef.current = null;

    const snap = getSnapFromPointer(e.clientX, e.clientY);
    if (snap !== "none") snapWindow(win.id, snap);
  }

  function startResize(e: React.PointerEvent, dir: ResizeDir) {
    if (e.button !== 0) return;
    if (win.isMaximized) return;

    e.stopPropagation();
    focusWindow(win.id);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    resizeRef.current = {
      pointerId: e.pointerId,
      dir,
      startX: e.clientX,
      startY: e.clientY,
      origin: win.rect,
    };
  }

  function onResizeMove(e: React.PointerEvent) {
    const r = resizeRef.current;
    if (!r || r.pointerId !== e.pointerId) return;

    const dx = e.clientX - r.startX;
    const dy = e.clientY - r.startY;

    const o = r.origin;

    let x = o.x;
    let y = o.y;
    let w = o.w;
    let h = o.h;

    if (r.dir.includes("e")) w = clamp(o.w + dx, MIN_WINDOW_W, window.innerWidth);
    if (r.dir.includes("s")) h = clamp(o.h + dy, MIN_WINDOW_H, window.innerHeight);

    if (r.dir.includes("w")) {
      const nextW = clamp(o.w - dx, MIN_WINDOW_W, window.innerWidth);
      x = o.x + (o.w - nextW);
      w = nextW;
    }

    if (r.dir.includes("n")) {
      const nextH = clamp(o.h - dy, MIN_WINDOW_H, window.innerHeight);
      y = o.y + (o.h - nextH);
      h = nextH;
    }

    resizeWindow(win.id, { x, y, w, h });
  }

  function onResizeUp(e: React.PointerEvent) {
    const r = resizeRef.current;
    if (!r || r.pointerId !== e.pointerId) return;
    resizeRef.current = null;
  }

  return (
    <motion.div
      className="pointer-events-auto absolute overflow-hidden rounded-[var(--os-radius)] border border-[color:var(--os-border)] bg-[color:var(--os-panel-solid)] shadow-2xl"
      style={style}
      initial={false}
      animate={animate}
      variants={variants}
      transition={{ duration: WINDOW_ANIM_MS / 1000, ease: [0.2, 0.8, 0.2, 1] }}
      onPointerDown={() => focusWindow(win.id)}
    >
      {/* Titlebar */}
      <div
        className="flex h-10 items-center justify-between gap-2 border-b border-[color:var(--os-border)] bg-black/10 px-3"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onDoubleClick={() => toggleMaximizeWindow(win.id)}
      >
        <div className="min-w-0 flex-1 truncate text-sm font-medium">
          {win.title}
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-white/10"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(win.id)}
            aria-label="Minimize"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-white/10"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => toggleMaximizeWindow(win.id)}
            aria-label="Maximize"
          >
            <Square className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-md p-1.5 hover:bg-white/10"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(win.id)}
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-2.5rem)] bg-[color:var(--os-panel-solid)]">
        <App windowId={win.id} />
      </div>

      {/* Resize handles */}
      {([
        ["n", "cursor-n-resize"],
        ["s", "cursor-s-resize"],
        ["e", "cursor-e-resize"],
        ["w", "cursor-w-resize"],
        ["ne", "cursor-ne-resize"],
        ["nw", "cursor-nw-resize"],
        ["se", "cursor-se-resize"],
        ["sw", "cursor-sw-resize"],
      ] as Array<[ResizeDir, string]>).map(([dir, cursor]) => {
        const common = `absolute ${cursor} pointer-events-auto`;
        const size = 10;
        const edge = 5;

        const pos:
          | React.CSSProperties
          | undefined =
          dir === "n"
            ? { top: -edge, left: size, right: size, height: size }
            : dir === "s"
              ? { bottom: -edge, left: size, right: size, height: size }
              : dir === "e"
                ? { right: -edge, top: size, bottom: size, width: size }
                : dir === "w"
                  ? { left: -edge, top: size, bottom: size, width: size }
                  : dir === "ne"
                    ? { right: -edge, top: -edge, width: size * 1.5, height: size * 1.5 }
                    : dir === "nw"
                      ? { left: -edge, top: -edge, width: size * 1.5, height: size * 1.5 }
                      : dir === "se"
                        ? {
                            right: -edge,
                            bottom: -edge,
                            width: size * 1.5,
                            height: size * 1.5,
                          }
                        : { left: -edge, bottom: -edge, width: size * 1.5, height: size * 1.5 };

        return (
          <div
            key={dir}
            className={common}
            style={pos}
            onPointerDown={(e) => startResize(e, dir)}
            onPointerMove={onResizeMove}
            onPointerUp={onResizeUp}
          />
        );
      })}
    </motion.div>
  );
}
