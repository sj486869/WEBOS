"use client";

import { useMemo } from "react";

import { WindowFrame } from "@/core/window-manager/WindowFrame";
import { useWindowStore } from "@/store/windowStore";

export function WindowLayer({ animationsEnabled }: { animationsEnabled: boolean }) {
  const windows = useWindowStore((s) => s.windows);

  const list = useMemo(() => {
    return Object.values(windows)
      .filter((w) => !w.isMinimized)
      .sort((a, b) => a.zIndex - b.zIndex);
  }, [windows]);

  return (
    <div className="pointer-events-none absolute inset-0">
      {list.map((w) => (
        <WindowFrame key={w.id} win={w} animationsEnabled={animationsEnabled} />
      ))}
    </div>
  );
}
