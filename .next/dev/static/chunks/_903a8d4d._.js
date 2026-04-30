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
const supabaseUrl = ("TURBOPACK compile-time value", "https://dewmisgffvrbxpdzlxjm.supabase.co") || "https://example.supabase.co";
const supabaseAnonKey = ("TURBOPACK compile-time value", "sb_publishable__23pdJA2gK38u_D587qntw_1YepZfX3") || "missing-supabase-anon-key";
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
            const uniqueFilename = `${crypto.randomUUID()}_${originalFilename}`;
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
            return `/api/download?id=${encodeURIComponent(fileId)}`;
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
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function getErrorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}
function useFileManager() {
    _s();
    const [files, setFiles] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadFiles = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[loadFiles]": async (fileType)=>{
            try {
                setLoading(true);
                setError(null);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.list(fileType);
                setFiles(data || []);
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Failed to load files");
                setError(errorMsg);
                console.error("Failed to load files:", err);
            } finally{
                setLoading(false);
            }
        }
    }["useFileManager.useCallback[loadFiles]"], []);
    const uploadFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[uploadFile]": async (file)=>{
            try {
                setError(null);
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.upload(file);
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
        loadFiles
    ]);
    const downloadFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[downloadFile]": async (fileId, filename)=>{
            try {
                setError(null);
                const url = __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.downloadUrl(fileId);
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
    }["useFileManager.useCallback[downloadFile]"], []);
    const deleteFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[deleteFile]": async (fileId)=>{
            try {
                setError(null);
                await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.delete(fileId);
                await loadFiles();
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Delete failed");
                setError(errorMsg);
                console.error("Delete error:", err);
                throw err;
            }
        }
    }["useFileManager.useCallback[deleteFile]"], [
        loadFiles
    ]);
    const loadStats = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useFileManager.useCallback[loadStats]": async ()=>{
            try {
                setError(null);
                const data = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.getStats();
                setStats(data);
                return data;
            } catch (err) {
                const errorMsg = getErrorMessage(err, "Failed to load stats");
                setError(errorMsg);
                console.error("Failed to load stats:", err);
                return null;
            }
        }
    }["useFileManager.useCallback[loadStats]"], []);
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
_s(useFileManager, "v2Ry5L2n+XLPJrRjbR1z4FMkbE0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/file-explorer/FileExplorerApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileExplorerApp",
    ()=>FileExplorerApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-plus.js [app-client] (ecmascript) <export default as FilePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder-plus.js [app-client] (ecmascript) <export default as FolderPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud.js [app-client] (ecmascript) <export default as Cloud>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/vfsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/useFileManager.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function isFolder(n) {
    return n.type === "folder";
}
function isFile(n) {
    return n.type === "file";
}
function NodeRow({ node, onOpen, onRename, onDelete }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5",
        draggable: true,
        onDragStart: (e)=>{
            e.dataTransfer.setData("application/x-webos-node", node.id);
            e.dataTransfer.effectAllowed = "move";
        },
        onDoubleClick: onOpen,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "min-w-0 flex-1 truncate",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mr-2 text-xs opacity-70",
                        children: node.type === "folder" ? "📁" : "📄"
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    node.name
                ]
            }, void 0, true, {
                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10",
                        onClick: onRename,
                        title: "Rename",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 45,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10",
                        onClick: onDelete,
                        title: "Delete",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
        lineNumber: 31,
        columnNumber: 5
    }, this);
}
_c = NodeRow;
function FolderTree({ rootId, currentId, onSelect }) {
    _s();
    const vfs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FolderTree.useVfsStore[vfs]": (s)=>s.vfs
    }["FolderTree.useVfsStore[vfs]"]);
    const mv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FolderTree.useVfsStore[mv]": (s)=>s.mv
    }["FolderTree.useVfsStore[mv]"]);
    function renderNode(id, depth) {
        const node = vfs.nodes[id];
        if (!node || node.type !== "folder") return null;
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "select-none",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/5 ${id === currentId ? "bg-black/5 dark:bg-white/5" : ""}`,
                    style: {
                        paddingLeft: 8 + depth * 12
                    },
                    onClick: ()=>onSelect(id),
                    onDragOver: (e)=>{
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                    },
                    onDrop: (e)=>{
                        e.preventDefault();
                        const dragId = e.dataTransfer.getData("application/x-webos-node");
                        if (!dragId) return;
                        if (dragId === id) return;
                        try {
                            mv(dragId, id);
                        } catch  {
                        // ignore
                        }
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "opacity-70",
                            children: "📁"
                        }, void 0, false, {
                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "truncate",
                            children: node.name
                        }, void 0, false, {
                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: node.children.map((cid)=>vfs.nodes[cid]).filter((n)=>Boolean(n)).filter(isFolder).map((child)=>renderNode(child.id, depth + 1))
                }, void 0, false, {
                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, this)
            ]
        }, id, true, {
            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
            lineNumber: 81,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-1",
        children: renderNode(rootId, 0)
    }, void 0, false, {
        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
        lineNumber: 118,
        columnNumber: 10
    }, this);
}
_s(FolderTree, "PJT/fqaqzZtIXGTszi4BKPpMvwo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"]
    ];
});
_c1 = FolderTree;
function FileExplorerApp({}) {
    _s1();
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[hydrated]": (s)=>s.hydrated
    }["FileExplorerApp.useVfsStore[hydrated]"]);
    const vfs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[vfs]": (s)=>s.vfs
    }["FileExplorerApp.useVfsStore[vfs]"]);
    const mkdir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[mkdir]": (s)=>s.mkdir
    }["FileExplorerApp.useVfsStore[mkdir]"]);
    const touch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[touch]": (s)=>s.touch
    }["FileExplorerApp.useVfsStore[touch]"]);
    const rename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[rename]": (s)=>s.rename
    }["FileExplorerApp.useVfsStore[rename]"]);
    const rm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[rm]": (s)=>s.rm
    }["FileExplorerApp.useVfsStore[rm]"]);
    const mv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "FileExplorerApp.useVfsStore[mv]": (s)=>s.mv
    }["FileExplorerApp.useVfsStore[mv]"]);
    // Backend file manager
    const { files: backendFiles, loading: backendLoading, error: uploadError, uploadFile, downloadFile, deleteFile, loadFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"])();
    const [currentId, setCurrentId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(vfs.rootId);
    const [viewMode, setViewMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("local");
    const [uploading, setUploading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [uploadStatus, setUploadStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileExplorerApp.useEffect": ()=>{
            if (hydrated) setCurrentId(vfs.rootId);
        }
    }["FileExplorerApp.useEffect"], [
        hydrated,
        vfs.rootId
    ]);
    // Load backend files on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "FileExplorerApp.useEffect": ()=>{
            loadFiles();
        }
    }["FileExplorerApp.useEffect"], [
        loadFiles
    ]);
    const current = vfs.nodes[currentId];
    const children = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "FileExplorerApp.useMemo[children]": ()=>{
            if (!current || current.type !== "folder") return [];
            return current.children.map({
                "FileExplorerApp.useMemo[children]": (id)=>vfs.nodes[id]
            }["FileExplorerApp.useMemo[children]"]).filter(Boolean);
        }
    }["FileExplorerApp.useMemo[children]"], [
        current,
        vfs.nodes
    ]);
    const handleFileUpload = async (e)=>{
        const files = e.currentTarget.files;
        if (!files) return;
        setUploading(true);
        setUploadStatus("Uploading...");
        let successCount = 0;
        let failedCount = 0;
        try {
            for (const file of files){
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
            setTimeout(()=>setUploadStatus(""), 3000);
        } catch (err) {
            setUploadStatus("❌ Upload failed");
            console.error("Upload failed:", err);
            setTimeout(()=>setUploadStatus(""), 3000);
        } finally{
            setUploading(false);
            e.currentTarget.value = "";
        }
    };
    if (!hydrated && viewMode === "local") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 text-sm opacity-70",
            children: "Loading file system…"
        }, void 0, false, {
            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
            lineNumber: 203,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-64 border-r border-[color:var(--os-border)] p-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 py-2 text-xs font-semibold uppercase tracking-wide opacity-70",
                        children: "Storage"
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode("local"),
                                className: `text-xs px-2 py-1 rounded ${viewMode === "local" ? "bg-blue-500 text-white" : "bg-black/5 dark:bg-white/5"}`,
                                children: "Local"
                            }, void 0, false, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setViewMode("cloud"),
                                className: `text-xs px-2 py-1 rounded flex items-center gap-1 ${viewMode === "cloud" ? "bg-blue-500 text-white" : "bg-black/5 dark:bg-white/5"}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Cloud$3e$__["Cloud"], {
                                        className: "h-3 w-3"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                        lineNumber: 231,
                                        columnNumber: 13
                                    }, this),
                                    "Backend"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 223,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    viewMode === "local" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "px-2 py-2 text-xs font-semibold uppercase tracking-wide opacity-70",
                                children: "Folders"
                            }, void 0, false, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FolderTree, {
                                rootId: vfs.rootId,
                                currentId: currentId,
                                onSelect: (id)=>setCurrentId(id)
                            }, void 0, false, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "flex min-w-0 flex-1 flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "flex items-center justify-between gap-2 border-b border-[color:var(--os-border)] p-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "min-w-0 flex-1 truncate text-sm font-medium",
                                children: [
                                    viewMode === "local" ? current ? current.name : "(missing)" : "Backend Storage",
                                    uploadStatus && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-2 text-xs opacity-70",
                                        children: uploadStatus
                                    }, void 0, false, {
                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: viewMode === "local" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5",
                                            onClick: ()=>{
                                                const name = prompt("Folder name", "New Folder");
                                                if (!name) return;
                                                mkdir(currentId, name);
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FolderPlus$3e$__["FolderPlus"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                    lineNumber: 272,
                                                    columnNumber: 19
                                                }, this),
                                                "New Folder"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                            lineNumber: 264,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5",
                                            onClick: ()=>{
                                                const name = prompt("File name", "New File.txt");
                                                if (!name) return;
                                                touch(currentId, name, "");
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus$3e$__["FilePlus"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                    lineNumber: 283,
                                                    columnNumber: 19
                                                }, this),
                                                "New File"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                            lineNumber: 275,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            className: "h-4 w-4"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                            lineNumber: 289,
                                            columnNumber: 17
                                        }, this),
                                        uploading ? "Uploading..." : "Upload File",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "file",
                                            multiple: true,
                                            onChange: handleFileUpload,
                                            disabled: uploading,
                                            className: "hidden",
                                            accept: "*"
                                        }, void 0, false, {
                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                            lineNumber: 291,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                    lineNumber: 288,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 250,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 overflow-auto p-2",
                        onDragOver: viewMode === "local" ? (e)=>{
                            e.preventDefault();
                            e.dataTransfer.dropEffect = "move";
                        } : undefined,
                        onDrop: viewMode === "local" ? (e)=>{
                            e.preventDefault();
                            const dragId = e.dataTransfer.getData("application/x-webos-node");
                            if (!dragId) return;
                            try {
                                mv(dragId, currentId);
                            } catch  {
                            // ignore
                            }
                        } : undefined,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 gap-1",
                            children: viewMode === "local" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    children.map((n)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NodeRow, {
                                            node: n,
                                            onOpen: ()=>{
                                                if (isFolder(n)) setCurrentId(n.id);
                                            },
                                            onRename: ()=>{
                                                const name = prompt("Rename to", n.name);
                                                if (!name) return;
                                                rename(n.id, name);
                                            },
                                            onDelete: ()=>{
                                                if (!confirm(`Delete ${n.name}?`)) return;
                                                rm(n.id);
                                            }
                                        }, n.id, false, {
                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                            lineNumber: 325,
                                            columnNumber: 19
                                        }, this)),
                                    children.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-4 text-sm opacity-60",
                                        children: "Empty folder"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                        lineNumber: 343,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: backendLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 text-sm opacity-60",
                                    children: "Loading files…"
                                }, void 0, false, {
                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                    lineNumber: 349,
                                    columnNumber: 19
                                }, this) : uploadError ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 text-sm text-red-600",
                                    children: [
                                        "Error: ",
                                        uploadError
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                    lineNumber: 351,
                                    columnNumber: 19
                                }, this) : backendFiles.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 text-sm opacity-60",
                                    children: "No files uploaded"
                                }, void 0, false, {
                                    fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                    lineNumber: 355,
                                    columnNumber: 19
                                }, this) : backendFiles.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "min-w-0 flex-1 truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mr-2 text-xs opacity-70",
                                                        children: file.file_type === "image" ? "🖼️" : file.file_type === "video" ? "🎬" : file.file_type === "audio" ? "🎵" : "📄"
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                        lineNumber: 363,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm",
                                                        children: file.original_filename
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                        lineNumber: 372,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 text-xs opacity-50",
                                                        children: [
                                                            "(",
                                                            (file.file_size / 1024).toFixed(1),
                                                            " KB)"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                lineNumber: 362,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10",
                                                        onClick: ()=>downloadFile(file.id, file.original_filename),
                                                        title: "Download",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                        lineNumber: 378,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "rounded-md p-1 hover:bg-black/10 dark:hover:bg-white/10",
                                                        onClick: ()=>{
                                                            if (!confirm(`Delete ${file.original_filename}?`)) return;
                                                            deleteFile(file.id);
                                                        },
                                                        title: "Delete",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                            className: "h-4 w-4"
                                                        }, void 0, false, {
                                                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                            lineNumber: 396,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                                lineNumber: 377,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, file.id, true, {
                                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                                        lineNumber: 358,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false)
                        }, void 0, false, {
                            fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                            lineNumber: 321,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 304,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "border-t border-[color:var(--os-border)] px-3 py-2 text-xs opacity-70",
                        children: viewMode === "local" ? `${children.filter(isFolder).length} folders · ${children.filter(isFile).length} files` : `${backendFiles.length} files uploaded`
                    }, void 0, false, {
                        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                        lineNumber: 407,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/file-explorer/FileExplorerApp.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_s1(FileExplorerApp, "WQhLAntGWA2IFd2FiGn67JVctuM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"]
    ];
});
_c2 = FileExplorerApp;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "NodeRow");
__turbopack_context__.k.register(_c1, "FolderTree");
__turbopack_context__.k.register(_c2, "FileExplorerApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/file-explorer/FileExplorerApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/file-explorer/FileExplorerApp.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_903a8d4d._.js.map