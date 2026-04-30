"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type OSTheme = "system" | "light" | "dark";

type OSSettings = {
  theme: OSTheme;
  accent: string;
  wallpaper: string;
  animationsEnabled: boolean;
  isLoggedIn: boolean;
  username: string;
};

type OSActions = {
  setTheme: (theme: OSTheme) => void;
  setAccent: (accent: string) => void;
  setWallpaper: (wallpaper: string) => void;
  setAnimationsEnabled: (enabled: boolean) => void;
  setLoggedIn: (val: boolean) => void;
  setUsername: (val: string) => void;
  resetLocalSettings: () => void;
};

export const DEFAULT_WALLPAPER =
  "radial-gradient(circle at top, #fde68a, #fb7185 35%, #1d4ed8 80%)";

const DEFAULTS: OSSettings = {
  theme: "dark",
  accent: "#3b82f6",
  wallpaper: DEFAULT_WALLPAPER,
  animationsEnabled: true,
  isLoggedIn: false,
  username: "Suman Jana",
};

export const useOSStore = create<OSSettings & OSActions>()(
  persist(
    (set) => ({
      ...DEFAULTS,
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setWallpaper: (wallpaper) => set({ wallpaper }),
      setAnimationsEnabled: (animationsEnabled) => set({ animationsEnabled }),
      setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setUsername: (username) => set({ username }),
      resetLocalSettings: () => set({ ...DEFAULTS }),
    }),
    {
      name: "web-os:settings",
      version: 3,
      storage: createJSONStorage(() => localStorage),
      migrate: (persisted) => {
        const saved =
          typeof persisted === "object" && persisted !== null
            ? (persisted as Partial<OSSettings>)
            : {};

        return {
          ...DEFAULTS,
          ...saved,
          wallpaper: DEFAULT_WALLPAPER,
        };
      },
    }
  )
);
