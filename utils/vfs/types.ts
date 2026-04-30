export type VfsNodeId = string;

export type VfsNodeBase = {
  id: VfsNodeId;
  name: string;
  parentId: VfsNodeId | null;
  createdAt: number;
  updatedAt: number;
};

export type VfsFolderNode = VfsNodeBase & {
  type: "folder";
  children: VfsNodeId[];
};

export type VfsFileNode = VfsNodeBase & {
  type: "file";
  mime: string;
  content: string;
};

export type VfsNode = VfsFolderNode | VfsFileNode;

export type VfsState = {
  rootId: VfsNodeId;
  nodes: Record<VfsNodeId, VfsNode>;
};

export type VfsPath = string; // e.g. "/Notes/todo.md"
