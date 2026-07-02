(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/utils/supabase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabaseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co";
const supabaseAnonKey = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "missing-supabase-anon-key";
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/supabase.ts [app-client] (ecmascript)");
;
const api = {
    baseUrl: "",
    async health () {
        return {
            status: "healthy",
            service: "Supabase Backend"
        };
    },
    users: {
        async list () {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("os_users").select("*");
            if (error) throw error;
            return data;
        },
        async save (user) {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("os_users").upsert(user);
            if (error) throw error;
            return data;
        },
        async delete (id) {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("os_users").delete().eq("id", id);
            if (error) throw error;
        }
    },
    files: {
        async list (fileType, skip = 0, limit = 100) {
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").select("*").order("created_at", {
                ascending: false
            }).range(skip, skip + limit - 1);
            if (fileType) {
                query = query.eq("file_type", fileType);
            }
            const { data, error } = await query;
            if (error) throw new Error(`Failed to list files: ${error.message}`);
            return data || [];
        },
        async getInfo (fileId) {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").select("*").eq("id", fileId).maybeSingle();
            if (error) throw new Error(`Failed to get file info: ${error.message}`);
            if (!data) throw new Error("File not found in database");
            return data;
        },
        async upload (file, description, tags) {
            void description;
            void tags;
            const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
            const originalFilename = file.name;
            const uniqueFilename = `${Math.random().toString(36).substring(2, 15)}_${originalFilename}`;
            const { data: storageData, error: storageError } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from("uploads").upload(uniqueFilename, file);
            if (storageError) throw new Error(`Upload failed: ${storageError.message}`);
            let fileType = "other";
            if ([
                "jpg",
                "jpeg",
                "png",
                "gif",
                "bmp",
                "webp",
                "svg"
            ].includes(fileExt)) {
                fileType = "image";
            } else if ([
                "mp4",
                "avi",
                "mkv",
                "mov",
                "wmv",
                "flv",
                "webm"
            ].includes(fileExt)) {
                fileType = "video";
            } else if ([
                "mp3",
                "wav",
                "flac",
                "aac",
                "wma",
                "ogg"
            ].includes(fileExt)) {
                fileType = "audio";
            } else if ([
                "pdf",
                "doc",
                "docx",
                "txt",
                "xlsx",
                "xls",
                "ppt",
                "pptx"
            ].includes(fileExt)) {
                fileType = "document";
            } else if ([
                "zip",
                "rar",
                "7z",
                "tar",
                "gz"
            ].includes(fileExt)) {
                fileType = "archive";
            }
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").insert({
                filename: uniqueFilename,
                original_filename: originalFilename,
                file_type: fileType,
                mime_type: file.type || "application/octet-stream",
                file_size: file.size,
                storage_path: storageData.path
            }).select().single();
            if (error) throw new Error(`Database insert failed: ${error.message}`);
            return data;
        },
        downloadUrl (fileId) {
            return api.mediaServer.streamUrl(fileId);
        },
        async download (fileId) {
            const fileInfo = await this.getInfo(fileId);
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from("uploads").download(fileInfo.storage_path);
            if (error) throw new Error(`Download failed: ${error.message}`);
            return data;
        },
        async delete (fileId) {
            const { data: fileInfo, error: infoError } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").select("*").eq("id", fileId).maybeSingle();
            if (!fileInfo || infoError) {
                return {
                    message: "File deleted successfully"
                };
            }
            const { error: storageError } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].storage.from("uploads").remove([
                fileInfo.storage_path
            ]);
            if (storageError) console.error(`Storage delete failed: ${storageError.message}`);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").delete().eq("id", fileId);
            if (error) throw new Error(`Delete failed: ${error.message}`);
            return {
                message: "File deleted successfully"
            };
        },
        async getStats () {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("files").select("file_size, file_type");
            if (error) throw new Error("Failed to get stats");
            let total_size = 0;
            const file_types = {};
            const file_type_sizes = {};
            data.forEach((file)=>{
                total_size += Number(file.file_size);
                file_types[file.file_type] = (file_types[file.file_type] || 0) + 1;
                file_type_sizes[file.file_type] = (file_type_sizes[file.file_type] || 0) + Number(file.file_size);
            });
            return {
                total_files: data.length,
                total_size,
                file_types,
                file_type_sizes
            };
        }
    },
    folders: {
        async create (name, parentId) {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("folders").insert({
                name,
                parent_id: parentId || null
            }).select().single();
            if (error) throw new Error(`Failed to create folder: ${error.message}`);
            return data;
        },
        async list (parentId) {
            let query = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("folders").select("*").order("name", {
                ascending: true
            });
            if (parentId) {
                query = query.eq("parent_id", parentId);
            } else {
                query = query.is("parent_id", null);
            }
            const { data, error } = await query;
            if (error) throw new Error(`Failed to list folders: ${error.message}`);
            return data || [];
        },
        async getContents (folderId) {
            const { data: folder, error: folderError } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("folders").select("*").eq("id", folderId).single();
            if (folderError) throw new Error(`Folder not found: ${folderError.message}`);
            const { data: subfolders, error: subError } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("folders").select("*").eq("parent_id", folderId).order("name", {
                ascending: true
            });
            if (subError) throw new Error(`Failed to get subfolders: ${subError.message}`);
            return {
                folder,
                files: [],
                subfolders: subfolders || []
            };
        },
        async delete (folderId) {
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from("folders").delete().eq("id", folderId);
            if (error) throw new Error(`Failed to delete folder: ${error.message}`);
            return {
                message: "Folder deleted successfully"
            };
        }
    },
    /**
   * mediaServer — connects to the standalone video-server backend.
   * URL is stored in localStorage under "webos_media_server_url".
   * Supports large file streaming (HTTP Range) and chunked upload.
   */ mediaServer: {
        getBaseUrl () {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return localStorage.getItem("webos_media_server_url") || "http://localhost:3001";
        },
        /** Streaming URL for a file (supports Range requests for seeking) */ streamUrl (fileId) {
            return `${this.getBaseUrl()}/stream/${encodeURIComponent(fileId)}`;
        },
        /** Check if the server is reachable */ async health () {
            const res = await fetch(`${this.getBaseUrl()}/health`, {
                signal: AbortSignal.timeout(5000)
            });
            if (!res.ok) throw new Error(`Media server health check failed: ${res.status}`);
            return res.json();
        },
        /** List all files on the media server */ async listFiles (userId, role, type) {
            const params = new URLSearchParams();
            if (type) params.append("type", type);
            if (userId) params.append("userId", userId);
            if (role) params.append("role", role);
            const url = `${this.getBaseUrl()}/files?${params.toString()}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Failed to list media server files: ${res.status}`);
            return res.json();
        },
        /**
     * Upload a file to the media server with progress callback.
     * Automatically uses chunked upload for files > 50 MB.
     */ async uploadFile (file, userId, onProgress) {
            const CHUNK_SIZE = 50 * 1024 * 1024; // 50 MB per chunk
            const baseUrl = this.getBaseUrl();
            if (file.size <= CHUNK_SIZE) {
                // Single upload
                const formData = new FormData();
                formData.append("file", file);
                if (userId) formData.append("userId", userId);
                const res = await fetch(`${baseUrl}/upload`, {
                    method: "POST",
                    body: formData
                });
                if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
                onProgress?.(100);
                return res.json();
            }
            // Chunked upload
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            const fileId = crypto.randomUUID();
            let lastResult = null;
            for(let i = 0; i < totalChunks; i++){
                const start = i * CHUNK_SIZE;
                const end = Math.min(start + CHUNK_SIZE, file.size);
                const chunk = file.slice(start, end);
                const formData = new FormData();
                formData.append("file", chunk, file.name);
                const res = await fetch(`${baseUrl}/upload`, {
                    method: "POST",
                    headers: {
                        "X-File-Id": fileId,
                        "X-Chunk-Index": String(i),
                        "X-Total-Chunks": String(totalChunks),
                        "X-Original-Name": encodeURIComponent(file.name),
                        ...userId ? {
                            "X-User-Id": userId
                        } : {}
                    },
                    body: formData
                });
                if (!res.ok) throw new Error(`Chunk ${i} upload failed: ${res.status}`);
                lastResult = await res.json();
                onProgress?.(Math.round((i + 1) / totalChunks * 100));
            }
            return lastResult;
        },
        /** Delete a file from the media server */ async deleteFile (fileId, userId, role) {
            const url = new URL(`${this.getBaseUrl()}/files/${fileId}`);
            if (userId) url.searchParams.append("userId", userId);
            if (role) url.searchParams.append("role", role);
            const res = await fetch(url.toString(), {
                method: "DELETE"
            });
            if (!res.ok) throw new Error(`Failed to delete media server file: ${res.status}`);
            return res.json();
        },
        /** Update file permissions */ async updatePermissions (fileId, visibility, sharedWith) {
            const res = await fetch(`${this.getBaseUrl()}/files/${fileId}/permissions`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    visibility,
                    sharedWith
                })
            });
            if (!res.ok) throw new Error(`Failed to update permissions: ${res.status}`);
            return res.json();
        }
    },
    workspace: {
        getBaseUrl () {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return localStorage.getItem("webos_media_server_url") || "http://localhost:3001";
        },
        async getTree () {
            const res = await fetch(`${this.getBaseUrl()}/workspace/tree`);
            if (!res.ok) throw new Error(`Failed to load workspace tree: ${res.status}`);
            return res.json();
        },
        async readFile (filePath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/file?path=${encodeURIComponent(filePath)}`);
            if (!res.ok) throw new Error(`Failed to read file: ${res.status}`);
            return res.text();
        },
        async writeFile (filePath, content) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/file`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    path: filePath,
                    content
                })
            });
            if (!res.ok) throw new Error(`Failed to write file: ${res.status}`);
            return res.json();
        },
        async runCode (filePath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    path: filePath
                })
            });
            if (!res.ok) {
                let err = await res.text();
                try {
                    err = JSON.parse(err).error || err;
                } catch  {}
                throw new Error(`Execution failed: ${err}`);
            }
            return res.json();
        },
        async runTerminal (command) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/terminal`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    command
                })
            });
            if (!res.ok) throw new Error(`Terminal execution failed: ${res.status}`);
            return res.json();
        },
        async createFolder (folderPath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/folder`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    path: folderPath
                })
            });
            if (!res.ok) throw new Error(`Failed to create folder: ${res.status}`);
            return res.json();
        },
        async deletePath (targetPath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/path?path=${encodeURIComponent(targetPath)}`, {
                method: "DELETE"
            });
            if (!res.ok) throw new Error(`Failed to delete path: ${res.status}`);
            return res.json();
        },
        async renamePath (oldPath, newPath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/rename`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    oldPath,
                    newPath
                })
            });
            if (!res.ok) throw new Error(`Failed to rename path: ${res.status}`);
            return res.json();
        },
        async runCode (filePath) {
            const res = await fetch(`${this.getBaseUrl()}/workspace/run`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    path: filePath
                })
            });
            if (!res.ok) {
                let err = await res.text();
                try {
                    err = JSON.parse(err).error || err;
                } catch  {}
                throw new Error(`Execution failed: ${err}`);
            }
            return res.json();
        }
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/useFileManager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useFileManager",
    ()=>useFileManager
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/authStore.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function getErrorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}
function useFileManager() {
    _s();
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "useFileManager.useAuthStore[currentUser]": (s)=>s.currentUser
    }["useFileManager.useAuthStore[currentUser]"]);
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[loadFiles]": async (fileType)=>{
            try {
                setLoading(true);
                setError(null);
                let allFiles = [];
                try {
                    const msData = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].mediaServer.listFiles(currentUser?.id, currentUser?.role, fileType);
                    allFiles = msData.files.map({
                        "useFileManager.useCallback[loadFiles]": (f)=>({
                                id: f.fileId,
                                original_filename: f.originalName,
                                file_type: f.fileType,
                                mime_type: f.mimeType,
                                file_size: f.size,
                                created_at: f.uploadedAt,
                                updated_at: f.uploadedAt,
                                storage_path: f.streamUrl,
                                source: 'media-server',
                                ownerId: f.ownerId,
                                visibility: f.visibility,
                                sharedWith: f.sharedWith
                            })
                    }["useFileManager.useCallback[loadFiles]"]);
                } catch (err) {
                    throw new Error("Failed to load local files. Is the media server running?");
                }
                // Sort by date descending
                allFiles.sort({
                    "useFileManager.useCallback[loadFiles]": (a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                }["useFileManager.useCallback[loadFiles]"]);
                setFiles(allFiles);
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Failed to load files");
                setError(errorMsg);
                console.error("Failed to load files:", err);
            } finally{
                setLoading(false);
            }
        }
    }["useFileManager.useCallback[loadFiles]"], [
        currentUser?.id,
        currentUser?.role
    ]);
    const uploadFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[uploadFile]": async (file)=>{
            try {
                setError(null);
                // Fully use local backend for all sizes
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].mediaServer.uploadFile(file, currentUser?.id);
                await new Promise({
                    "useFileManager.useCallback[uploadFile]": (resolve)=>setTimeout(resolve, 500)
                }["useFileManager.useCallback[uploadFile]"]);
                await loadFiles();
                return response;
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Upload failed");
                setError(errorMsg);
                console.error("Upload error:", err);
                throw err;
            }
        }
    }["useFileManager.useCallback[uploadFile]"], [
        loadFiles,
        currentUser?.id
    ]);
    const downloadFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[downloadFile]": async (fileId, filename)=>{
            try {
                setError(null);
                // Wait for the state or find in existing files
                // Because we don't have access to the latest files in this callback without dependency,
                // we can use a functional update or just rely on the files array if it's up to date.
                // But a better approach is to pass the source directly, or find it here.
                // Let's find it in the files array:
                const file = files.find({
                    "useFileManager.useCallback[downloadFile].file": (f)=>f.id === fileId
                }["useFileManager.useCallback[downloadFile].file"]);
                let url = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].mediaServer.streamUrl(fileId);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = filename;
                document.body.appendChild(anchor);
                anchor.click();
                window.setTimeout({
                    "useFileManager.useCallback[downloadFile]": ()=>{
                        document.body.removeChild(anchor);
                    }
                }["useFileManager.useCallback[downloadFile]"], 100);
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Download failed");
                setError(errorMsg);
                console.error("Download error:", err);
                throw err;
            }
        }
    }["useFileManager.useCallback[downloadFile]"], [
        files
    ]);
    const deleteFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[deleteFile]": async (fileId)=>{
            try {
                setError(null);
                // Fully use local backend
                await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].mediaServer.deleteFile(fileId, currentUser?.id, currentUser?.role);
                await loadFiles();
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Delete failed");
                setError(errorMsg);
                console.error("Delete error:", err);
                throw err;
            }
        }
    }["useFileManager.useCallback[deleteFile]"], [
        loadFiles,
        files
    ]);
    const loadStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[loadStats]": async ()=>{
            try {
                setError(null);
                // We compute it from local backend
                let currentFiles = files;
                if (currentFiles.length === 0) {
                    const mData = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].mediaServer.listFiles().catch({
                        "useFileManager.useCallback[loadStats]": ()=>({
                                files: []
                            })
                    }["useFileManager.useCallback[loadStats]"]);
                    currentFiles = mData.files.map({
                        "useFileManager.useCallback[loadStats]": (f)=>({
                                file_size: f.size,
                                file_type: f.fileType
                            })
                    }["useFileManager.useCallback[loadStats]"]);
                }
                currentFiles.forEach({
                    "useFileManager.useCallback[loadStats]": (file)=>{
                        total_size += Number(file.file_size);
                        file_types[file.file_type] = (file_types[file.file_type] || 0) + 1;
                        file_type_sizes[file.file_type] = (file_type_sizes[file.file_type] || 0) + Number(file.file_size);
                    }
                }["useFileManager.useCallback[loadStats]"]);
                const newStats = {
                    total_files: currentFiles.length,
                    total_size,
                    file_types,
                    file_type_sizes
                };
                setStats(newStats);
                return newStats;
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Failed to load stats");
                setError(errorMsg);
                console.error("Failed to load stats:", err);
                return null;
            }
        }
    }["useFileManager.useCallback[loadStats]"], [
        files
    ]);
    return {
        files,
        loading,
        error,
        stats,
        loadFiles,
        uploadFile,
        downloadFile,
        deleteFile,
        loadStats
    };
}
_s(useFileManager, "fEfUTG6s7EQ8jjwM9cw06iq1Ilk=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboard/DashboardApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardApp",
    ()=>DashboardApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/activity.js [app-client] (ecmascript) <export default as Activity>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-pie.js [app-client] (ecmascript) <export default as PieChart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/share-2.js [app-client] (ecmascript) <export default as Share2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/useFileManager.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const STORAGE_QUOTA_BYTES = 500 * 1024 * 1024 * 1024;
function formatStorage(bytes) {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
function colorForType(index) {
    const colors = [
        'bg-blue-500',
        'bg-purple-500',
        'bg-pink-500',
        'bg-orange-500',
        'bg-green-500',
        'bg-cyan-500',
        'bg-indigo-500',
        'bg-red-500'
    ];
    return colors[index % colors.length];
}
function DashboardApp({}) {
    _s();
    const { files, loadFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"])();
    const [timeRange, setTimeRange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('7d');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardApp.useEffect": ()=>{
            loadFiles();
        }
    }["DashboardApp.useEffect"], [
        loadFiles
    ]);
    const totalSize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardApp.useMemo[totalSize]": ()=>files.reduce({
                "DashboardApp.useMemo[totalSize]": (sum, file)=>sum + file.file_size
            }["DashboardApp.useMemo[totalSize]"], 0)
    }["DashboardApp.useMemo[totalSize]"], [
        files
    ]);
    const fileStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardApp.useMemo[fileStats]": ()=>{
            const byExtension = {};
            for (const file of files){
                const ext = file.original_filename.split('.').pop()?.toLowerCase() || 'unknown';
                byExtension[ext] ??= {
                    type: ext.toUpperCase(),
                    count: 0,
                    size: 0,
                    percentage: 0
                };
                byExtension[ext].count += 1;
                byExtension[ext].size += file.file_size;
            }
            return Object.values(byExtension).map({
                "DashboardApp.useMemo[fileStats]": (stat)=>({
                        ...stat,
                        percentage: totalSize > 0 ? Math.round(stat.size / totalSize * 100) : 0
                    })
            }["DashboardApp.useMemo[fileStats]"]).sort({
                "DashboardApp.useMemo[fileStats]": (a, b)=>b.size - a.size
            }["DashboardApp.useMemo[fileStats]"]);
        }
    }["DashboardApp.useMemo[fileStats]"], [
        files,
        totalSize
    ]);
    const stats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardApp.useMemo[stats]": ()=>{
            const imageCount = files.filter({
                "DashboardApp.useMemo[stats]": (file)=>file.file_type === 'image'
            }["DashboardApp.useMemo[stats]"]).length;
            const videoCount = files.filter({
                "DashboardApp.useMemo[stats]": (file)=>file.file_type === 'video'
            }["DashboardApp.useMemo[stats]"]).length;
            const documentCount = files.filter({
                "DashboardApp.useMemo[stats]": (file)=>file.file_type === 'document'
            }["DashboardApp.useMemo[stats]"]).length;
            return [
                {
                    label: 'Total Files',
                    value: files.length,
                    change: 12,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 102,
                        columnNumber: 15
                    }, this),
                    color: 'text-blue-500'
                },
                {
                    label: 'Total Storage',
                    value: formatStorage(totalSize),
                    change: 8,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 109,
                        columnNumber: 15
                    }, this),
                    color: 'text-green-500'
                },
                {
                    label: 'Images',
                    value: imageCount,
                    change: 5,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$activity$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Activity$3e$__["Activity"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 116,
                        columnNumber: 15
                    }, this),
                    color: 'text-purple-500'
                },
                {
                    label: 'Videos',
                    value: videoCount,
                    change: 3,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 123,
                        columnNumber: 15
                    }, this),
                    color: 'text-orange-500'
                },
                {
                    label: 'Documents',
                    value: documentCount,
                    change: 4,
                    icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                        className: "h-5 w-5"
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 130,
                        columnNumber: 15
                    }, this),
                    color: 'text-cyan-500'
                }
            ];
        }
    }["DashboardApp.useMemo[stats]"], [
        files,
        totalSize
    ]);
    const storageUsePercent = Math.min(100, Math.round(totalSize / STORAGE_QUOTA_BYTES * 100));
    const rangeLabel = timeRange === '7d' ? 'Last 7 days' : timeRange === '30d' ? 'Last 30 days' : 'Last 90 days';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-white/10 bg-white/[0.04] backdrop-blur",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-6 py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap items-center justify-between gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-bold",
                                        children: "Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 154,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-1 text-sm text-slate-400",
                                        children: [
                                            "Storage analytics, media health, and recent activity for ",
                                            rangeLabel,
                                            "."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: timeRange,
                                        onChange: (e)=>setTimeRange(e.target.value),
                                        className: "rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium outline-none transition hover:bg-slate-800",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "7d",
                                                children: "Last 7 days"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 166,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "30d",
                                                children: "Last 30 days"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: "90d",
                                                children: "Last 90 days"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 168,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 161,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "rounded-lg border border-white/10 p-2 transition hover:bg-white/10",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            className: "h-5 w-5"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                            lineNumber: 172,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 160,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                lineNumber: 150,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-auto max-w-7xl p-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5",
                        children: stats.map((stat)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-white/20",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-4 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: `${stat.color} opacity-90`,
                                                children: stat.icon
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 187,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300",
                                                children: [
                                                    "+",
                                                    stat.change,
                                                    "%"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 188,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "mb-1 text-sm text-slate-400",
                                        children: stat.label
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 192,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-2xl font-bold",
                                        children: stat.value
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 193,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, stat.label, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 182,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-2xl border border-white/10 bg-white/[0.04] p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "flex items-center gap-2 text-lg font-semibold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PieChart$3e$__["PieChart"], {
                                                        className: "h-5 w-5 text-blue-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 202,
                                                        columnNumber: 17
                                                    }, this),
                                                    "File Type Distribution"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 201,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-lg p-2 transition hover:bg-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                    lineNumber: 206,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 205,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 200,
                                        columnNumber: 13
                                    }, this),
                                    fileStats.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "py-12 text-center text-slate-500",
                                        children: "No files to display"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 211,
                                        columnNumber: 15
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-4",
                                        children: fileStats.map((stat, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mb-2 flex items-center justify-between gap-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-sm font-medium",
                                                                children: stat.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-slate-400",
                                                                children: [
                                                                    stat.count,
                                                                    " files - ",
                                                                    formatStorage(stat.size)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 218,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 216,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "h-2 w-full rounded-full bg-slate-800",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: `${colorForType(index)} h-2 rounded-full transition`,
                                                            style: {
                                                                width: `${stat.percentage}%`
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 223,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 222,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, stat.type, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 215,
                                                columnNumber: 19
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 213,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 199,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "rounded-2xl border border-white/10 bg-white/[0.04] p-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-6 flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                className: "flex items-center gap-2 text-lg font-semibold",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"], {
                                                        className: "h-5 w-5 text-green-400"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 17
                                                    }, this),
                                                    "Storage Usage"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 236,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "rounded-lg p-2 transition hover:bg-white/10",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$share$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Share2$3e$__["Share2"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 240,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 235,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex flex-col items-center justify-center gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "relative h-40 w-40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                                        className: "h-40 w-40 -rotate-90",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "80",
                                                                cy: "80",
                                                                r: "70",
                                                                fill: "none",
                                                                stroke: "#1e293b",
                                                                strokeWidth: "8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                                                cx: "80",
                                                                cy: "80",
                                                                r: "70",
                                                                fill: "none",
                                                                stroke: "#3b82f6",
                                                                strokeDasharray: `${439.6 * (storageUsePercent / 100)} 439.6`,
                                                                strokeLinecap: "round",
                                                                strokeWidth: "8"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 256,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 247,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 flex flex-col items-center justify-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-2xl font-bold",
                                                                children: [
                                                                    storageUsePercent,
                                                                    "%"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 268,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-slate-400",
                                                                children: "Used"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 269,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 246,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full space-y-3 text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "Used Space"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                children: formatStorage(totalSize)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 274,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "Available"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 279,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                children: formatStorage(Math.max(0, STORAGE_QUOTA_BYTES - totalSize))
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 280,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 278,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-between border-t border-white/10 pt-3",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-slate-400",
                                                                children: "Local Quota"
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 285,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-semibold",
                                                                children: formatStorage(STORAGE_QUOTA_BYTES)
                                                            }, void 0, false, {
                                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 284,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 273,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 245,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 234,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "rounded-2xl border border-white/10 bg-white/[0.04] p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "mb-6 flex items-center gap-2 text-lg font-semibold",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                        className: "h-5 w-5 text-purple-400"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                        lineNumber: 295,
                                        columnNumber: 13
                                    }, this),
                                    "Recent Files"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 294,
                                columnNumber: 11
                            }, this),
                            files.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-12 text-center text-slate-500",
                                children: "No files in system"
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 300,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-sm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            className: "border-b border-white/10 text-xs font-semibold uppercase text-slate-400",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left",
                                                        children: "File Name"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 306,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left",
                                                        children: "Kind"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 307,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-left",
                                                        children: "MIME"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 308,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right",
                                                        children: "Size"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 309,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "px-4 py-3 text-right",
                                                        children: "Created"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                lineNumber: 305,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                            lineNumber: 304,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-white/10",
                                            children: files.slice(0, 10).map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    className: "transition hover:bg-white/[0.04]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "max-w-80 truncate px-4 py-3 font-medium",
                                                            children: file.original_filename
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 316,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 capitalize text-slate-300",
                                                            children: file.file_type
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 319,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-slate-400",
                                                            children: file.mime_type
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 322,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-right",
                                                            children: formatStorage(file.file_size)
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 323,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "px-4 py-3 text-right text-slate-400",
                                                            children: new Date(file.created_at).toLocaleDateString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, file.id, true, {
                                                    fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                            lineNumber: 313,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                    lineNumber: 303,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                                lineNumber: 302,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/dashboard/DashboardApp.tsx",
                lineNumber: 179,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/dashboard/DashboardApp.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s(DashboardApp, "kWsdA0JGey9HI6HIyIRZegfPGc0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"]
    ];
});
_c = DashboardApp;
var _c;
__turbopack_context__.k.register(_c, "DashboardApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/dashboard/DashboardApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/dashboard/DashboardApp.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_dbb9a51d._.js.map