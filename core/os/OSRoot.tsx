"use client";

import { useEffect } from "react";

import { Desktop } from "@/core/desktop/Desktop";
import { Taskbar } from "@/core/taskbar/Taskbar";
import { WindowLayer } from "@/core/window-manager/WindowLayer";
import { useOSStore } from "@/store/osStore";
import { useVfsStore } from "@/store/vfsStore";
import { useWindowStore } from "@/store/windowStore";
import { LoginScreen } from "./LoginScreen";
import { AnimatePresence } from "framer-motion";

function applyTheme(theme: "light" | "dark") {
  document.documentElement.dataset.theme = theme;
}

export function OSRoot() {
  const { theme, accent, wallpaper, animationsEnabled, isLoggedIn } = useOSStore();
  const initVfs = useVfsStore((s) => s.init);
  const hydrated = useVfsStore((s) => s.hydrated);

  const cycleFocus = useWindowStore((s) => s.cycleFocus);
  const openApp = useWindowStore((s) => s.openApp);

  // Hydrate VFS
  useEffect(() => {
    initVfs().catch(() => {
      // best effort
    });
  }, [initVfs]);

  // Apply theme + css vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--os-accent", accent);
    root.style.setProperty("--os-wallpaper", wallpaper);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const set = () => applyTheme(mq.matches ? "dark" : "light");
      set();
      mq.addEventListener?.("change", set);
      return () => mq.removeEventListener?.("change", set);
    }

    applyTheme(theme);
  }, [theme, accent, wallpaper]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isLoggedIn) return;

    function onKeyDown(e: KeyboardEvent) {
      // Alt+Tab
      if (e.altKey && e.key.toLowerCase() === "tab") {
        e.preventDefault();
        cycleFocus();
      }

      // Ctrl+Alt+Del (mock)
      if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "delete") {
        e.preventDefault();
        openApp("system-monitor");
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cycleFocus, isLoggedIn, openApp]);

  return (
    <div className="relative h-dvh w-dvw overflow-hidden">
      <AnimatePresence>
        {!isLoggedIn && <LoginScreen key="login" />}
      </AnimatePresence>

      {isLoggedIn ? (
        <>
          <Desktop disabled={!hydrated} />

          <div className="pointer-events-none absolute inset-0">
            <WindowLayer animationsEnabled={animationsEnabled} />
          </div>

          <Taskbar />
        </>
      ) : null}
    </div>
  );
}
