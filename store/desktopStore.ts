"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { AppId } from "@/core/os/appIds";

export type DesktopIconPos = { x: number; y: number };

type DesktopState = {
  iconPos: Partial<Record<AppId, DesktopIconPos>>;
  setIconPos: (appId: AppId, pos: DesktopIconPos) => void;
  resetLayout: () => void;
};

export const useDesktopStore = create<DesktopState>()(
  persist(
    (set) => ({
      iconPos: {},
      setIconPos: (appId, pos) =>
        set((s) => ({ iconPos: { ...s.iconPos, [appId]: pos } })),
      resetLayout: () => set({ iconPos: {} }),
    }),
    {
      name: "web-os:desktop",
      version: 1,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
