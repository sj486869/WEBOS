import type { AppId } from "@/core/os/appIds";

export type WindowId = string;

export type WindowLifecycle =
  | "opening"
  | "normal"
  | "closing"
  | "minimizing"
  | "restoring"
  | "maximizing"
  | "unmaximizing";

export type WindowSnap = "none" | "left" | "right" | "fullscreen";

export type WindowRect = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type WindowState = {
  id: WindowId;
  appId: AppId;
  title: string;

  rect: WindowRect;
  restoreRect?: WindowRect;

  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  snap: WindowSnap;
  lifecycle: WindowLifecycle;

  createdAt: number;
  updatedAt: number;
};
