"use client";

import { FilePlus, FolderPlus, Pencil, Trash2, Upload, Download, Cloud } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { AppComponentProps } from "@/core/os/appRegistry";
import { useVfsStore } from "@/store/vfsStore";
import type { VfsNode, VfsNodeId } from "@/utils/vfs/types";
import { useFileManager } from "@/utils/useFileManager";
import { useAuthStore } from "@/store/authStore";
import { useWindowStore } from "@/store/windowStore";
import { api } from "@/utils/api";

function isFolder(n: VfsNode): n is Extract<VfsNode, { type: "folder" }> {
  return n.type === "folder";
}

function isFile(n: VfsNode): n is Extract<VfsNode, { type: "file" }> {
  return n.type === "file";
}

function NodeRow({
  node,
  onOpen,
  onRename,
  onDelete,
  onContextMenu,
  canEdit,
}: {
  node: VfsNode;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  canEdit?: boolean;
}) {
  return (
    <div
      className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("application/x-webos-node", node.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDoubleClick={onOpen}
      onContextMenu={onContextMenu}
    >
      <div className="min-w-0 flex-1 truncate">
        <span className="mr-2 text-xs opacity-70">{node.type === "folder" ? "📁" : "📄"}</span>
        {node.name}
      </div>
      <div className="flex items-center gap-1">
        {canEdit !== false && (
          <>
            <button
              className="rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
              onClick={onRename}
              title="Rename"
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
              onClick={onDelete}
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FolderTree({
  rootId,
  currentId,
  onSelect,
}: {
  rootId: VfsNodeId;
  currentId: VfsNodeId;
  onSelect: (id: VfsNodeId) => void;
}) {
  const vfs = useVfsStore((s) => s.vfs);
  const mv = useVfsStore((s) => s.mv);

  function renderNode(id: VfsNodeId, depth: number) {
    const node = vfs.nodes[id];
    if (!node || node.type !== "folder") return null;

    return (
      <div key={id} className="select-none">
        <div
          className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/5 ${
            id === currentId ? "bg-black/5 dark:bg-white/5" : ""
          }`}
          style={{ paddingLeft: 8 + depth * 12 }}
          onClick={() => onSelect(id)}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          }}
          onDrop={(e) => {
            e.preventDefault();
            const dragId = e.dataTransfer.getData("application/x-webos-node");
            if (!dragId) return;
            if (dragId === id) return;
            try {
              mv(dragId, id);
            } catch {
              // ignore
            }
          }}
        >
          <span className="opacity-70">📁</span>
          <span className="truncate">{node.name}</span>
        </div>
        <div>
          {node.children
            .map((cid) => vfs.nodes[cid])
            .filter((n): n is VfsNode => Boolean(n))
            .filter(isFolder)
            .map((child) => renderNode(child.id, depth + 1))}
        </div>
      </div>
    );
  }

  return <div className="py-1">{renderNode(rootId, 0)}</div>;
}

export function FileExplorerApp({}: AppComponentProps) {
  const hydrated = useVfsStore((s) => s.hydrated);
  const vfs = useVfsStore((s) => s.vfs);

  const mkdir = useVfsStore((s) => s.mkdir);
  const touch = useVfsStore((s) => s.touch);
  const rename = useVfsStore((s) => s.rename);
  const rm = useVfsStore((s) => s.rm);
  const mv = useVfsStore((s) => s.mv);
  const openApp = useWindowStore((s) => s.openApp);

  // Backend file manager
  const { 
    files: backendFiles, 
    loading: backendLoading, 
    error: uploadError,
    uploadFile, 
    downloadFile, 
    deleteFile, 
    loadFiles 
  } = useFileManager();

  const [currentId, setCurrentId] = useState<VfsNodeId>(vfs.rootId);
  const [viewMode, setViewMode] = useState<"local" | "cloud">("local");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>("");

  const users = useAuthStore((s) => s.users);
  const currentUser = useAuthStore((s) => s.currentUser);
  const updateNodePermissions = useVfsStore((s) => s.updatePermissions);

  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; id: string; type: "local" | "cloud" } | null>(null);
  const [shareModal, setShareModal] = useState<{ id: string; type: "local" | "cloud", sharedWith: {userId: string, canEdit: boolean}[] } | null>(null);

  // Close context menu on click outside
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    if (hydrated) setCurrentId(vfs.rootId);
  }, [hydrated, vfs.rootId]);

  // Load backend files on mount
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const current = vfs.nodes[currentId];
  const children = useMemo(() => {
    if (!current || current.type !== "folder") return [];
    return current.children.map((id) => vfs.nodes[id]).filter(Boolean) as VfsNode[];
  }, [current, vfs.nodes]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setUploading(true);
    setUploadStatus("Uploading...");
    let successCount = 0;
    let failedCount = 0;
    
    // Save target reference before async await
    const target = e.currentTarget;

    try {
      for (const file of files) {
        try {
          await uploadFile(file);
          successCount++;
          setUploadStatus(`Uploaded ${successCount}/${files.length}...`);
        } catch (err) {
          failedCount++;
          console.error(`Failed to upload ${file.name}:`, err);
        }
      }
      
      if (successCount > 0) {
        setUploadStatus(`✅ ${successCount} file(s) uploaded`);
      }
      if (failedCount > 0) {
        setUploadStatus(`⚠️ ${failedCount} file(s) failed to upload`);
      }
      
      // Clear status after 3 seconds
      setTimeout(() => setUploadStatus(""), 3000);
    } catch (err) {
      setUploadStatus("❌ Upload failed");
      console.error("Upload failed:", err);
      setTimeout(() => setUploadStatus(""), 3000);
    } finally {
      setUploading(false);
      target.value = "";
    }
  };

  if (!hydrated && viewMode === "local") {
    return <div className="p-4 text-sm opacity-70">Loading file system…</div>;
  }

  return (
    <div className="flex h-full">
      <aside className="w-64 border-r border-[color:var(--os-border)] p-2">
        <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wide opacity-70">
          Storage
        </div>
        <div className="mb-3 flex gap-1">
          <button
            onClick={() => setViewMode("local")}
            className={`text-xs px-2 py-1 rounded ${
              viewMode === "local"
                ? "bg-blue-500 text-white"
                : "bg-black/5 dark:bg-white/5"
            }`}
          >
            Local
          </button>
          <button
            onClick={() => setViewMode("cloud")}
            className={`text-xs px-2 py-1 rounded flex items-center gap-1 ${
              viewMode === "cloud"
                ? "bg-blue-500 text-white"
                : "bg-black/5 dark:bg-white/5"
            }`}
          >
            <Cloud className="h-3 w-3" />
            Backend
          </button>
        </div>
        {viewMode === "local" && (
          <>
            <div className="px-2 py-2 text-xs font-semibold uppercase tracking-wide opacity-70">
              Folders
            </div>
            <FolderTree
              rootId={vfs.rootId}
              currentId={currentId}
              onSelect={(id) => setCurrentId(id)}
            />
          </>
        )}
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-2 border-b border-[color:var(--os-border)] p-2">
          <div className="min-w-0 flex-1 truncate text-sm font-medium">
            {viewMode === "local"
              ? current
                ? current.name
                : "(missing)"
              : "Backend Storage"}
            {uploadStatus && (
              <span className="ml-2 text-xs opacity-70">{uploadStatus}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {viewMode === "local" ? (
              <>
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => {
                    const name = prompt("Folder name", "New Folder");
                    if (!name) return;
                    mkdir(currentId, name);
                  }}
                >
                  <FolderPlus className="h-4 w-4" />
                  New Folder
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5"
                  onClick={() => {
                    const name = prompt("File name", "New File.txt");
                    if (!name) return;
                    touch(currentId, name, "");
                  }}
                >
                  <FilePlus className="h-4 w-4" />
                  New File
                </button>
              </>
            ) : (
              <label className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                <Upload className="h-4 w-4" />
                {uploading ? "Uploading..." : "Upload File"}
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  accept="*"
                />
              </label>
            )}
          </div>
        </header>

        <div
          className="flex-1 overflow-auto p-2"
          onDragOver={viewMode === "local" ? (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
          } : undefined}
          onDrop={viewMode === "local" ? (e) => {
            e.preventDefault();
            const dragId = e.dataTransfer.getData("application/x-webos-node");
            if (!dragId) return;
            try {
              mv(dragId, currentId);
            } catch {
              // ignore
            }
          } : undefined}
        >
          <div className="grid grid-cols-1 gap-1">
            {viewMode === "local" ? (
              <>
                {children.map((n) => {
                  let canEdit = false;
                  if (currentUser?.role === "admin") canEdit = true;
                  else if (n.ownerId === currentUser?.id) canEdit = true;
                  else if (n.sharedWith?.some(s => s.userId === currentUser?.id && s.canEdit)) canEdit = true;

                  return (
                  <NodeRow
                    key={n.id}
                    node={n}
                    canEdit={canEdit}
                    onOpen={() => {
                      if (isFolder(n)) setCurrentId(n.id);
                    }}
                    onRename={() => {
                      const name = prompt("Rename to", n.name);
                      if (!name) return;
                      rename(n.id, name);
                    }}
                    onDelete={() => {
                      if (!confirm(`Delete ${n.name}?`)) return;
                      rm(n.id);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setContextMenu({ x: e.clientX, y: e.clientY, id: n.id, type: "local" });
                    }}
                  />
                  );
                })}
                {children.length === 0 ? (
                  <div className="p-4 text-sm opacity-60">Empty folder</div>
                ) : null}
              </>
            ) : (
              <>
                {backendLoading ? (
                  <div className="p-4 text-sm opacity-60">Loading files…</div>
                ) : uploadError ? (
                  <div className="p-4 text-sm text-red-600">
                    Error: {uploadError}
                  </div>
                ) : backendFiles.length === 0 ? (
                  <div className="p-4 text-sm opacity-60">No files uploaded</div>
                ) : (
                  backendFiles.map((file) => {
                    let canEdit = false;
                    if (currentUser?.role === "admin") canEdit = true;
                    else if (file.ownerId === currentUser?.id) canEdit = true;
                    else if (file.sharedWith?.some((s: any) => typeof s === 'object' ? s.userId === currentUser?.id && s.canEdit : s === currentUser?.id)) canEdit = true;

                    return (
                    <div
                      key={file.id}
                      className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                      onDoubleClick={() => {
                        if (file.file_type === "video") {
                          openApp("pro-video-player", { fileId: file.id, source: file.source || 'supabase' });
                        }
                      }}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        setContextMenu({ x: e.clientX, y: e.clientY, id: file.id, type: "cloud" });
                      }}
                    >
                      <div className="min-w-0 flex-1 truncate">
                        <span className="mr-2 text-xs opacity-70">
                          {file.file_type === "image"
                            ? "🖼️"
                            : file.file_type === "video"
                            ? "🎬"
                            : file.file_type === "audio"
                            ? "🎵"
                            : "📄"}
                        </span>
                        <span className="text-sm">{file.original_filename}</span>
                        <span className="ml-1 text-xs opacity-50">
                          ({(file.file_size / 1024).toFixed(1)} KB)
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          className="rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
                          onClick={() =>
                            downloadFile(file.id, file.original_filename)
                          }
                          title="Download"
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        {canEdit !== false && (
                          <button
                            className="rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10"
                            onClick={() => {
                              if (!confirm(`Delete ${file.original_filename}?`))
                                return;
                              deleteFile(file.id);
                            }}
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                  })
                )}
              </>
            )}
          </div>
        </div>

        <footer className="border-t border-[color:var(--os-border)] px-3 py-2 text-xs opacity-70">
          {viewMode === "local"
            ? `${children.filter(isFolder).length} folders · ${children.filter(isFile).length} files`
            : `${backendFiles.length} files uploaded`}
        </footer>
      </section>

      {/* Context Menu */}
      {contextMenu && (() => {
        let isPublic = false;
        if (contextMenu.type === "local") {
          isPublic = vfs.nodes[contextMenu.id]?.visibility === "public";
        } else {
          const bf = backendFiles.find((f: any) => f.fileId === contextMenu.id || f.id === contextMenu.id);
          isPublic = bf?.visibility === "public";
        }
        
        return (
        <div
          className="fixed z-50 min-w-[150px] rounded-md border border-[color:var(--os-border)] bg-white p-1 shadow-lg dark:bg-[#2d2d2d]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          {!isPublic && (
            <button
              className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-black/10 dark:hover:bg-white/10"
            onClick={async () => {
              if (contextMenu.type === "local") {
                updateNodePermissions(contextMenu.id, "public", []);
              } else {
                await api.mediaServer.updatePermissions(contextMenu.id, "public", []);
                loadFiles();
              }
              setContextMenu(null);
            }}
          >
            Make Public
          </button>
          )}
          {isPublic && (
          <button
            className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-black/10 dark:hover:bg-white/10"
            onClick={async () => {
              if (contextMenu.type === "local") {
                updateNodePermissions(contextMenu.id, "private", []);
              } else {
                await api.mediaServer.updatePermissions(contextMenu.id, "private", []);
                loadFiles();
              }
              setContextMenu(null);
            }}
          >
            Make Private
          </button>
          )}
          <button
            className="w-full rounded px-2 py-1.5 text-left text-sm hover:bg-black/10 dark:hover:bg-white/10"
            onClick={() => {
              let currentShared: { userId: string, canEdit: boolean }[] = [];
              if (contextMenu.type === "local") {
                currentShared = vfs.nodes[contextMenu.id]?.sharedWith || [];
              } else {
                const bf = backendFiles.find((f: any) => f.fileId === contextMenu.id || f.id === contextMenu.id);
                if (bf && bf.sharedWith && Array.isArray(bf.sharedWith)) {
                  currentShared = bf.sharedWith.map((s: any) => typeof s === 'string' ? { userId: s, canEdit: false } : s);
                }
              }
              setShareModal({ id: contextMenu.id, type: contextMenu.type, sharedWith: currentShared });
              setContextMenu(null);
            }}
          >
            Share...
          </button>
        </div>
        );
      })()}

      {/* Share Modal */}
      {shareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-[300px] rounded-lg border border-[color:var(--os-border)] bg-white p-4 shadow-xl dark:bg-[#2d2d2d]">
            <h3 className="mb-4 text-lg font-semibold">Share File</h3>
            <div className="max-h-60 overflow-auto border-y border-[color:var(--os-border)] py-2">
              {users.map((u) => {
                const shareObj = shareModal.sharedWith.find(s => s.userId === u.id);
                const isShared = !!shareObj;
                const canEdit = shareObj?.canEdit || false;
                
                return (
                <div key={u.id} className="flex items-center justify-between p-1 text-sm border-b border-[color:var(--os-border)] last:border-0">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={isShared}
                      onChange={(e) => {
                        setShareModal((prev) => {
                          if (!prev) return null;
                          const checked = e.target.checked;
                          const sharedWith = checked
                            ? [...prev.sharedWith, { userId: u.id, canEdit: false }]
                            : prev.sharedWith.filter((s) => s.userId !== u.id);
                          return { ...prev, sharedWith };
                        });
                      }}
                    />
                    {u.username} ({u.role})
                  </label>
                  {isShared && (
                    <label className="flex items-center gap-1 text-xs text-blue-500">
                      <input
                        type="checkbox"
                        checked={canEdit}
                        onChange={(e) => {
                          setShareModal((prev) => {
                            if (!prev) return null;
                            const sharedWith = prev.sharedWith.map(s => s.userId === u.id ? { ...s, canEdit: e.target.checked } : s);
                            return { ...prev, sharedWith };
                          });
                        }}
                      />
                      Can Edit
                    </label>
                  )}
                </div>
              )})}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded px-3 py-1 text-sm hover:bg-black/10 dark:hover:bg-white/10"
                onClick={() => setShareModal(null)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                onClick={async () => {
                  if (shareModal.type === "local") {
                    updateNodePermissions(shareModal.id, "private", shareModal.sharedWith);
                  } else {
                    await api.mediaServer.updatePermissions(shareModal.id, "private", shareModal.sharedWith);
                    loadFiles();
                  }
                  setShareModal(null);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
