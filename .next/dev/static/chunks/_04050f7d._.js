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
"[project]/apps/search-app/SearchAppApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SearchAppApp",
    ()=>SearchAppApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/useFileManager.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function SearchAppApp({}) {
    _s();
    const { files, loadFiles } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"])();
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [filters, setFilters] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        type: 'all',
        sizeMin: 0,
        sizeMax: 999999
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchAppApp.useEffect": ()=>{
            loadFiles();
        }
    }["SearchAppApp.useEffect"], [
        loadFiles
    ]);
    const searchResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "SearchAppApp.useMemo[searchResults]": ()=>{
            if (!searchQuery.trim()) {
                return [];
            }
            const query = searchQuery.toLowerCase();
            return files.filter({
                "SearchAppApp.useMemo[searchResults]": (file)=>{
                    // Text search
                    const matchesQuery = file.original_filename.toLowerCase().includes(query) || file.file_type.toLowerCase().includes(query);
                    // Type filter
                    const matchesType = filters.type === 'all' || file.file_type === filters.type;
                    // Size filter
                    const matchesSize = file.file_size >= filters.sizeMin && file.file_size <= filters.sizeMax;
                    return matchesQuery && matchesType && matchesSize;
                }
            }["SearchAppApp.useMemo[searchResults]"]);
        }
    }["SearchAppApp.useMemo[searchResults]"], [
        searchQuery,
        files,
        filters
    ]);
    const handleClearSearch = ()=>{
        setSearchQuery('');
    };
    const handleResetFilters = ()=>{
        setFilters({
            type: 'all',
            sizeMin: 0,
            sizeMax: 999999
        });
    };
    const getFileIcon = (type)=>{
        switch(type){
            case 'image':
                return '🖼️';
            case 'video':
                return '🎬';
            case 'audio':
                return '🎵';
            case 'document':
                return '📄';
            case 'archive':
                return '📦';
            default:
                return '📁';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-[color:var(--os-border)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-3 flex gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                    className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50"
                                }, void 0, false, {
                                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                    lineNumber: 78,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "text",
                                    placeholder: "Search files by name or type...",
                                    value: searchQuery,
                                    onChange: (e)=>setSearchQuery(e.target.value),
                                    className: "w-full rounded-lg border border-[color:var(--os-border)] bg-white dark:bg-black py-2 pl-9 pr-8 text-sm focus:border-blue-500 focus:outline-none",
                                    autoFocus: true
                                }, void 0, false, {
                                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                searchQuery && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleClearSearch,
                                    className: "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-black/10 dark:hover:bg-white/10",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 92,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                    lineNumber: 88,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-medium",
                                        children: "File Type"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleResetFilters,
                                        className: "flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                                lineNumber: 106,
                                                columnNumber: 15
                                            }, this),
                                            "Reset"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 100,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: filters.type,
                                onChange: (e)=>setFilters({
                                        ...filters,
                                        type: e.target.value
                                    }),
                                className: "w-full rounded border border-[color:var(--os-border)] bg-white dark:bg-black px-2 py-1 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "all",
                                        children: "All Files"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "image",
                                        children: "Images"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 118,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "video",
                                        children: "Videos"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 119,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "audio",
                                        children: "Audio"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "document",
                                        children: "Documents"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "archive",
                                        children: "Archives"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                        lineNumber: 122,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                lineNumber: 75,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto",
                children: searchQuery.trim() === '' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full items-center justify-center text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "mx-auto mb-2 h-8 w-8 opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm opacity-60",
                                children: "Enter search terms to find files"
                            }, void 0, false, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                        lineNumber: 131,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                    lineNumber: 130,
                    columnNumber: 11
                }, this) : searchResults.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-full items-center justify-center text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "mx-auto mb-2 h-8 w-8 opacity-30"
                            }, void 0, false, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm opacity-60",
                                children: "No files match your search"
                            }, void 0, false, {
                                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                        lineNumber: 138,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                    lineNumber: 137,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "divide-y divide-[color:var(--os-border)]",
                    children: searchResults.map((file)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 px-4 py-3 hover:bg-blue-500/5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-2xl",
                                    children: getFileIcon(file.file_type)
                                }, void 0, false, {
                                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                    lineNumber: 150,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "min-w-0 flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "truncate font-medium text-sm",
                                            children: file.original_filename
                                        }, void 0, false, {
                                            fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                            lineNumber: 152,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs opacity-60",
                                            children: [
                                                file.file_type,
                                                " •",
                                                ' ',
                                                (file.file_size < 1024 * 1024 ? file.file_size / 1024 : file.file_size / (1024 * 1024)).toFixed(1),
                                                ' ',
                                                file.file_size < 1024 * 1024 ? 'KB' : 'MB',
                                                " •",
                                                ' ',
                                                new Date(file.created_at).toLocaleDateString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                            lineNumber: 155,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                                    lineNumber: 151,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, file.id, true, {
                            fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                            lineNumber: 146,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                lineNumber: 128,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-[color:var(--os-border)] bg-black/2 px-4 py-2 text-xs opacity-70 dark:bg-white/2",
                children: searchQuery.trim() === '' ? 'Ready to search' : `Found ${searchResults.length} file${searchResults.length !== 1 ? 's' : ''}`
            }, void 0, false, {
                fileName: "[project]/apps/search-app/SearchAppApp.tsx",
                lineNumber: 173,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/search-app/SearchAppApp.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
_s(SearchAppApp, "mFhtYrToVYWP9xSNfR2mpaKJsWM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$useFileManager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useFileManager"]
    ];
});
_c = SearchAppApp;
var _c;
__turbopack_context__.k.register(_c, "SearchAppApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/search-app/SearchAppApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/search-app/SearchAppApp.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=_04050f7d._.js.map