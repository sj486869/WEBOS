import { createId } from "@/utils/id";
import type { VfsFolderNode, VfsState } from "@/utils/vfs/types";

function folder(name: string, parentId: string | null): VfsFolderNode {
  const now = Date.now();
  return {
    id: createId("dir"),
    type: "folder",
    name,
    parentId,
    children: [],
    createdAt: now,
    updatedAt: now,
  };
}

export function createDefaultVfsState(): VfsState {
  const now = Date.now();
  const rootId = "root";

  const root: VfsFolderNode = {
    id: rootId,
    type: "folder",
    name: "/",
    parentId: null,
    children: [],
    createdAt: now,
    updatedAt: now,
  };

  const desktop = folder("Desktop", rootId);
  const notes = folder("Notes", rootId);
  const documents = folder("Documents", rootId);
  const downloads = folder("Downloads", rootId);

  root.children = [desktop.id, notes.id, documents.id, downloads.id];

  const nodes: VfsState["nodes"] = {
    [rootId]: root,
    [desktop.id]: desktop,
    [notes.id]: notes,
    [documents.id]: documents,
    [downloads.id]: downloads,
  };

  return { rootId, nodes };
}
