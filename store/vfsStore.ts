"use client";

import { create } from "zustand";

import { createDefaultVfsState } from "@/utils/vfs/defaultState";
import { kvClearAll, kvGet, kvSet } from "@/utils/vfs/db";
import type { VfsNode, VfsNodeId, VfsState } from "@/utils/vfs/types";
import {
  createFile,
  createFolder,
  deleteNode,
  listChildren,
  moveNode,
  renameNode,
  resolvePath,
  writeFile,
  updateNodePermissions,
} from "@/utils/vfs/ops";
import { useAuthStore } from "@/store/authStore";

const VFS_KEY = "vfs";

type VfsStoreState = {
  hydrated: boolean;
  vfs: VfsState;

  init: () => Promise<void>;
  reset: () => Promise<void>;

  getNode: (id: VfsNodeId) => VfsNode | undefined;
  getPath: (id: VfsNodeId) => string;
  resolve: (absPath: string) => VfsNode | undefined;
  list: (folderId: VfsNodeId) => VfsNode[];

  mkdir: (parentId: VfsNodeId, name: string) => VfsNodeId;
  touch: (parentId: VfsNodeId, name: string, content?: string) => VfsNodeId;
  write: (fileId: VfsNodeId, content: string) => void;
  rename: (id: VfsNodeId, name: string) => void;
  rm: (id: VfsNodeId) => void;
  mv: (id: VfsNodeId, targetFolderId: VfsNodeId) => void;
  updatePermissions: (id: VfsNodeId, visibility: 'public' | 'private', sharedWith: { userId: string, canEdit: boolean }[]) => void;
};

export const useVfsStore = create<VfsStoreState>((set, get) => ({
  hydrated: false,
  vfs: createDefaultVfsState(),

  init: async () => {
    const saved = await kvGet<VfsState>(VFS_KEY);
    if (saved?.rootId && saved.nodes) {
      set({ vfs: saved, hydrated: true });
    } else {
      const fresh = createDefaultVfsState();
      await kvSet(VFS_KEY, fresh);
      set({ vfs: fresh, hydrated: true });
    }
  },

  reset: async () => {
    const fresh = createDefaultVfsState();
    await kvClearAll();
    await kvSet(VFS_KEY, fresh);
    set({ vfs: fresh, hydrated: true });
  },

  getNode: (id) => get().vfs.nodes[id],

  getPath: (id) => {
    const { vfs } = get();
    const parts: string[] = [];
    let cur: VfsNode | undefined = vfs.nodes[id];
    while (cur && cur.parentId) {
      parts.unshift(cur.name);
      cur = vfs.nodes[cur.parentId];
    }
    return `/${parts.join("/")}`;
  },

  resolve: (absPath) => resolvePath(get().vfs, absPath),

  list: (folderId) => {
    const user = useAuthStore.getState().currentUser;
    return listChildren(get().vfs, folderId).filter((n) => {
      if (user?.role === "admin") return true;
      if (n.ownerId === user?.id) return true;
      if (n.visibility === "public") return true;
      if (n.sharedWith?.some(s => typeof s === 'string' ? s === user?.id : s.userId === user?.id)) return true;
      return false;
    });
  },

  mkdir: (parentId, name) => {
    const user = useAuthStore.getState().currentUser;
    const { next, id } = createFolder(get().vfs, parentId, name, user?.id);
    set({ vfs: next });
    return id;
  },

  touch: (parentId, name, content) => {
    const user = useAuthStore.getState().currentUser;
    const { next, id } = createFile(get().vfs, parentId, name, content ?? "", "text/plain", user?.id);
    set({ vfs: next });
    return id;
  },

  write: (fileId, content) => {
    set({ vfs: writeFile(get().vfs, fileId, content) });
  },

  rename: (id, name) => {
    set({ vfs: renameNode(get().vfs, id, name) });
  },

  rm: (id) => {
    set({ vfs: deleteNode(get().vfs, id) });
  },

  mv: (id, targetFolderId) => {
    set({ vfs: moveNode(get().vfs, id, targetFolderId) });
  },

  updatePermissions: (id, visibility, sharedWith) => {
    set({ vfs: updateNodePermissions(get().vfs, id, visibility, sharedWith) });
  },
}));

// Persist to IndexedDB with a small debounce.
if (typeof window !== "undefined") {
  let saveTimer: number | null = null;
  useVfsStore.subscribe((state) => {
    if (!state.hydrated) return;
    if (saveTimer) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      kvSet(VFS_KEY, useVfsStore.getState().vfs).catch(() => {
        // best-effort persistence
      });
    }, 150);
  });
}
