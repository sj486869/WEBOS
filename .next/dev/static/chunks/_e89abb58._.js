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
"[project]/apps/video-player/VideoPlayerApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "VideoPlayerApp",
    ()=>VideoPlayerApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/useFileManager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function VideoPlayerApp({}) {
    _s();
    const { files, loading, loadFiles, downloadFile, deleteFile } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"])();
    const [selectedId, setSelectedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const videoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VideoPlayerApp.useEffect": ()=>{
            loadFiles('video');
        }
    }["VideoPlayerApp.useEffect"], [
        loadFiles
    ]);
    const videos = files.filter((f)=>f.file_type === 'video');
    const selectedVideo = videos.find((v)=>v.id === selectedId);
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm opacity-70",
                children: "Loading videos…"
            }, void 0, false, {
                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                lineNumber: 31,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col",
        children: selectedVideo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col bg-black",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between border-b border-white/10 px-4 py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "truncate text-sm text-white",
                            children: selectedVideo.original_filename
                        }, void 0, false, {
                            fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>downloadFile(selectedVideo.id, selectedVideo.original_filename),
                                    className: "rounded p-1 hover:bg-white/10",
                                    title: "Download",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "h-4 w-4 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 52,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        if (confirm(`Delete ${selectedVideo.original_filename}?`)) {
                                            deleteFile(selectedVideo.id);
                                            setSelectedId(null);
                                        }
                                    },
                                    className: "rounded p-1 hover:bg-red-500/20",
                                    title: "Delete",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                        className: "h-4 w-4 text-red-400"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                    lineNumber: 54,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setSelectedId(null),
                                    className: "rounded p-1 hover:bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4 text-white"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 70,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                    lineNumber: 66,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                            lineNumber: 44,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 40,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 items-center justify-center overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: videoRef,
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].files.downloadUrl(selectedVideo.id),
                        className: "h-full w-full object-contain",
                        controls: true,
                        autoPlay: true
                    }, void 0, false, {
                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                        lineNumber: 76,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 75,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-t border-white/10 px-4 py-2 text-xs text-white/70",
                    children: [
                        selectedVideo.original_filename,
                        " •",
                        ' ',
                        (selectedVideo.file_size / (1024 * 1024)).toFixed(1),
                        " MB"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 85,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
            lineNumber: 39,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex h-full flex-col",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border-b border-[color:var(--os-border)] px-4 py-2 font-medium",
                    children: [
                        "Video Player (",
                        videos.length,
                        " videos)"
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this),
                videos.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 items-center justify-center text-sm opacity-60",
                    children: "No videos uploaded. Upload videos in File Explorer."
                }, void 0, false, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 97,
                    columnNumber: 13
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "divide-y divide-[color:var(--os-border)]",
                        children: videos.map((video)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedId(video.id),
                                className: "flex w-full items-center gap-4 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "h-16 w-24 flex-shrink-0 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold",
                                        children: "🎬"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 109,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "min-w-0 flex-1 text-left",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "truncate text-sm font-medium",
                                                children: video.original_filename
                                            }, void 0, false, {
                                                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                lineNumber: 113,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs opacity-70",
                                                children: [
                                                    (video.file_size / (1024 * 1024)).toFixed(1),
                                                    " MB"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                lineNumber: 116,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 112,
                                        columnNumber: 21
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    downloadFile(video.id, video.original_filename);
                                                },
                                                className: "rounded p-1 hover:bg-black/10 dark:hover:bg-white/10",
                                                title: "Download",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                    lineNumber: 129,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                lineNumber: 121,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: (e)=>{
                                                    e.stopPropagation();
                                                    if (confirm(`Delete ${video.original_filename}?`)) {
                                                        deleteFile(video.id);
                                                    }
                                                },
                                                className: "rounded p-1 hover:bg-red-500/20",
                                                title: "Delete",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                                    className: "h-4 w-4 text-red-500"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                    lineNumber: 141,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                                lineNumber: 131,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                        lineNumber: 120,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, video.id, true, {
                                fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                                lineNumber: 104,
                                columnNumber: 19
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                        lineNumber: 102,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
                    lineNumber: 101,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
            lineNumber: 91,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/video-player/VideoPlayerApp.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(VideoPlayerApp, "pd4C+HDKF7HOIMEMQtx1vwlHhg0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"]
    ];
});
_c = VideoPlayerApp;
var _c;
__turbopack_context__.k.register(_c, "VideoPlayerApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/video-player/VideoPlayerApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/video-player/VideoPlayerApp.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_e89abb58._.js.map