import { createId } from "@/utils/id";
import type {
  VfsFileNode,
  VfsFolderNode,
  VfsNode,
  VfsNodeId,
  VfsState,
} from "@/utils/vfs/types";

export function isFolder(n: VfsNode): n is VfsFolderNode {
  return n.type === "folder";
}

export function isFile(n: VfsNode): n is VfsFileNode {
  return n.type === "file";
}

export function pathToSegments(path: string): string[] {
  const clean = path.trim();
  if (clean === "/") return [];
  return clean
    .replaceAll("\\", "/")
    .split("/")
    .filter(Boolean);
}

export function getChildByName(
  state: VfsState,
  folderId: VfsNodeId,
  name: string
): VfsNode | undefined {
  const folder = state.nodes[folderId];
  if (!folder || folder.type !== "folder") return undefined;
  const id = folder.children.find((cid) => state.nodes[cid]?.name === name);
  return id ? state.nodes[id] : undefined;
}

export function resolvePath(state: VfsState, absPath: string): VfsNode | undefined {
  const segs = pathToSegments(absPath);
  let current: VfsNode = state.nodes[state.rootId];

  for (const seg of segs) {
    if (current.type !== "folder") return undefined;
    const next = getChildByName(state, current.id, seg);
    if (!next) return undefined;
    current = next;
  }

  return current;
}

export function listChildren(state: VfsState, folderId: VfsNodeId): VfsNode[] {
  const folder = state.nodes[folderId];
  if (!folder || folder.type !== "folder") return [];
  return folder.children.map((id) => state.nodes[id]).filter(Boolean);
}

export function ensureUniqueName(
  state: VfsState,
  parentId: VfsNodeId,
  requested: string,
  ignoreId?: VfsNodeId
) {
  const base = requested.trim() || "untitled";
  const siblings = listChildren(state, parentId)
    .filter((n) => n.id !== ignoreId)
    .map((n) => n.name);
  if (!siblings.includes(base)) return base;

  let i = 2;
  while (siblings.includes(`${base} (${i})`)) i++;
  return `${base} (${i})`;
}

export function createFolder(
  state: VfsState,
  parentId: VfsNodeId,
  name: string
): { next: VfsState; id: VfsNodeId } {
  const parent = state.nodes[parentId];
  if (!parent || parent.type !== "folder") throw new Error("Parent is not a folder");

  const now = Date.now();
  const id = createId("dir");

  const folder: VfsFolderNode = {
    id,
    type: "folder",
    name: ensureUniqueName(state, parentId, name),
    parentId,
    children: [],
    createdAt: now,
    updatedAt: now,
  };

  const nextParent: VfsFolderNode = {
    ...parent,
    children: [...parent.children, id],
    updatedAt: now,
  };

  return {
    next: {
      rootId: state.rootId,
      nodes: { ...state.nodes, [id]: folder, [parentId]: nextParent },
    },
    id,
  };
}

export function createFile(
  state: VfsState,
  parentId: VfsNodeId,
  name: string,
  content = "",
  mime = "text/plain"
): { next: VfsState; id: VfsNodeId } {
  const parent = state.nodes[parentId];
  if (!parent || parent.type !== "folder") throw new Error("Parent is not a folder");

  const now = Date.now();
  const id = createId("file");

  const file: VfsFileNode = {
    id,
    type: "file",
    name: ensureUniqueName(state, parentId, name),
    parentId,
    content,
    mime,
    createdAt: now,
    updatedAt: now,
  };

  const nextParent: VfsFolderNode = {
    ...parent,
    children: [...parent.children, id],
    updatedAt: now,
  };

  return {
    next: {
      rootId: state.rootId,
      nodes: { ...state.nodes, [id]: file, [parentId]: nextParent },
    },
    id,
  };
}

export function writeFile(
  state: VfsState,
  fileId: VfsNodeId,
  content: string
): VfsState {
  const node = state.nodes[fileId];
  if (!node || node.type !== "file") throw new Error("Not a file");

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [fileId]: { ...node, content, updatedAt: Date.now() },
    },
  };
}

export function renameNode(
  state: VfsState,
  id: VfsNodeId,
  name: string
): VfsState {
  const node = state.nodes[id];
  if (!node) throw new Error("Not found");

  const parentId = node.parentId;
  if (!parentId) throw new Error("Cannot rename root");

  const nextName = ensureUniqueName(state, parentId, name, id);

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [id]: { ...node, name: nextName, updatedAt: Date.now() },
    },
  };
}

function collectSubtreeIds(state: VfsState, id: VfsNodeId, out: Set<VfsNodeId>) {
  out.add(id);
  const n = state.nodes[id];
  if (!n || n.type !== "folder") return;
  for (const childId of n.children) collectSubtreeIds(state, childId, out);
}

export function deleteNode(state: VfsState, id: VfsNodeId): VfsState {
  const node = state.nodes[id];
  if (!node) return state;
  if (!node.parentId) throw new Error("Cannot delete root");

  const parent = state.nodes[node.parentId];
  if (!parent || parent.type !== "folder") throw new Error("Invalid parent");

  const ids = new Set<VfsNodeId>();
  collectSubtreeIds(state, id, ids);

  const nextNodes: VfsState["nodes"] = { ...state.nodes };
  for (const delId of ids) delete nextNodes[delId];

  const nextParent: VfsFolderNode = {
    ...parent,
    children: parent.children.filter((cid) => cid !== id),
    updatedAt: Date.now(),
  };

  nextNodes[nextParent.id] = nextParent;

  return { ...state, nodes: nextNodes };
}

export function moveNode(
  state: VfsState,
  id: VfsNodeId,
  targetFolderId: VfsNodeId
): VfsState {
  const node = state.nodes[id];
  const target = state.nodes[targetFolderId];
  if (!node) throw new Error("Not found");
  if (!node.parentId) throw new Error("Cannot move root");
  if (!target || target.type !== "folder") throw new Error("Target not a folder");

  if (node.parentId === targetFolderId) return state;

  // Prevent moving folder into itself/descendant
  if (node.type === "folder") {
    let cur: VfsNodeId | null = targetFolderId;
    while (cur) {
      if (cur === node.id) throw new Error("Cannot move a folder into itself");
      const nextNode: VfsNode | undefined = state.nodes[cur];
      cur = nextNode?.parentId ?? null;
    }
  }

  const fromParent = state.nodes[node.parentId];
  if (!fromParent || fromParent.type !== "folder") throw new Error("Invalid from parent");

  const now = Date.now();
  const nextFrom: VfsFolderNode = {
    ...fromParent,
    children: fromParent.children.filter((cid) => cid !== id),
    updatedAt: now,
  };

  const nextTo: VfsFolderNode = {
    ...target,
    children: [...target.children, id],
    updatedAt: now,
  };

  const nextName = ensureUniqueName(state, targetFolderId, node.name, id);

  return {
    ...state,
    nodes: {
      ...state.nodes,
      [nextFrom.id]: nextFrom,
      [nextTo.id]: nextTo,
      [id]: { ...node, parentId: targetFolderId, name: nextName, updatedAt: now },
    },
  };
}
