module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/core/os/appRegistry.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appRegistry",
    ()=>appRegistry,
    "installedApps",
    ()=>installedApps
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/shared/lib/app-dynamic.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-ssr] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/folder.js [app-ssr] (ecmascript) <export default as Folder>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2d$cog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MonitorCog$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/monitor-cog.js [app-ssr] (ecmascript) <export default as MonitorCog>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-ssr] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-ssr] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/film.js [app-ssr] (ecmascript) <export default as Film>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-ssr] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-ssr] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tags$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/tags.js [app-ssr] (ecmascript) <export default as Tags>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-ssr] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareTerminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square-terminal.js [app-ssr] (ecmascript) <export default as SquareTerminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brackets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brackets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/brackets.js [app-ssr] (ecmascript) <export default as Brackets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-ssr] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-ssr] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart4$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column-increasing.js [app-ssr] (ecmascript) <export default as BarChart4>");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
"use client";
;
;
const FileExplorerApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/file-explorer/FileExplorerApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const NotesApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/notes/NotesApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const AIAssistantApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/ai-assistant/AIAssistantApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const SystemMonitorApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/system-monitor/SystemMonitorApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const TerminalApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/terminal/TerminalApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const SettingsApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/settings/SettingsApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ImageGalleryApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/image-gallery/ImageGalleryApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const VideoPlayerApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/video-player/VideoPlayerApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const MediaEditorApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/media-editor/MediaEditorApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const SearchApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/search-app/SearchAppApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DuplicateFinderApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/duplicate-finder/DuplicateFinderApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const FileConverterApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/file-converter/FileConverterApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DocumentViewerApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/document-viewer/DocumentViewerApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const FileOrganizerApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/file-organizer/FileOrganizerApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const InternetBrowserApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/internet-browser/InternetBrowserApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const CodeEditorApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/code-editor/CodeEditorApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const AdvancedTerminalApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const VSCodeEditorApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/vscode-editor/VSCodeEditorApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const ProVideoPlayerApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/pro-video-player/ProVideoPlayerApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const WebsiteBuilderApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/website-builder/WebsiteBuilderApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const DashboardApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$shared$2f$lib$2f$app$2d$dynamic$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(async ()=>{}, {
    loadableGenerated: {
        modules: [
            "[project]/apps/dashboard/DashboardApp.tsx [app-client] (ecmascript, next/dynamic entry)"
        ]
    },
    ssr: false
});
const appRegistry = {
    "file-explorer": {
        id: "file-explorer",
        title: "File Explorer",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$folder$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Folder$3e$__["Folder"],
        component: FileExplorerApp
    },
    notes: {
        id: "notes",
        title: "Notes",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
        component: NotesApp
    },
    "ai-assistant": {
        id: "ai-assistant",
        title: "AI Assistant",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"],
        component: AIAssistantApp
    },
    "system-monitor": {
        id: "system-monitor",
        title: "System Monitor",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$monitor$2d$cog$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MonitorCog$3e$__["MonitorCog"],
        component: SystemMonitorApp,
        singleton: true
    },
    terminal: {
        id: "terminal",
        title: "Terminal",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"],
        component: TerminalApp
    },
    settings: {
        id: "settings",
        title: "Settings",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"],
        component: SettingsApp,
        singleton: true
    },
    "image-gallery": {
        id: "image-gallery",
        title: "Image Gallery",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"],
        component: ImageGalleryApp
    },
    "video-player": {
        id: "video-player",
        title: "Video Player",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"],
        component: VideoPlayerApp
    },
    "media-editor": {
        id: "media-editor",
        title: "Media Manager",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$film$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Film$3e$__["Film"],
        component: MediaEditorApp
    },
    "search-app": {
        id: "search-app",
        title: "Search",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"],
        component: SearchApp
    },
    "duplicate-finder": {
        id: "duplicate-finder",
        title: "Duplicate Finder",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"],
        component: DuplicateFinderApp
    },
    "file-converter": {
        id: "file-converter",
        title: "File Converter",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"],
        component: FileConverterApp
    },
    "document-viewer": {
        id: "document-viewer",
        title: "Document Viewer",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
        component: DocumentViewerApp
    },
    "file-organizer": {
        id: "file-organizer",
        title: "File Organizer",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$tags$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Tags$3e$__["Tags"],
        component: FileOrganizerApp
    },
    "internet-browser": {
        id: "internet-browser",
        title: "Internet Browser",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"],
        component: InternetBrowserApp
    },
    "code-editor": {
        id: "code-editor",
        title: "Code Editor",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"],
        component: CodeEditorApp
    },
    "advanced-terminal": {
        id: "advanced-terminal",
        title: "Advanced Terminal",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2d$terminal$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__SquareTerminal$3e$__["SquareTerminal"],
        component: AdvancedTerminalApp
    },
    "vscode-editor": {
        id: "vscode-editor",
        title: "VS Code",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brackets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Brackets$3e$__["Brackets"],
        component: VSCodeEditorApp
    },
    "pro-video-player": {
        id: "pro-video-player",
        title: "Pro Video Player",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"],
        component: ProVideoPlayerApp
    },
    "website-builder": {
        id: "website-builder",
        title: "Website Builder",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
        component: WebsiteBuilderApp
    },
    dashboard: {
        id: "dashboard",
        title: "Dashboard",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2d$increasing$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart4$3e$__["BarChart4"],
        component: DashboardApp,
        singleton: true
    }
};
const installedApps = Object.values(appRegistry);
}),
"[project]/store/desktopStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useDesktopStore",
    ()=>useDesktopStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const useDesktopStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        iconPos: {},
        setIconPos: (appId, pos)=>set((s)=>({
                    iconPos: {
                        ...s.iconPos,
                        [appId]: pos
                    }
                })),
        resetLayout: ()=>set({
                iconPos: {}
            })
    }), {
    name: "web-os:desktop",
    version: 1,
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage)
}));
}),
"[project]/core/window-manager/constants.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MIN_WINDOW_H",
    ()=>MIN_WINDOW_H,
    "MIN_WINDOW_W",
    ()=>MIN_WINDOW_W,
    "SNAP_THRESHOLD_PX",
    ()=>SNAP_THRESHOLD_PX,
    "TASKBAR_HEIGHT",
    ()=>TASKBAR_HEIGHT,
    "WINDOW_ANIM_MS",
    ()=>WINDOW_ANIM_MS
]);
const TASKBAR_HEIGHT = 44;
const MIN_WINDOW_W = 320;
const MIN_WINDOW_H = 220;
const SNAP_THRESHOLD_PX = 28;
const WINDOW_ANIM_MS = 220;
}),
"[project]/utils/id.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createId",
    ()=>createId
]);
function createId(prefix) {
    const raw = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    return prefix ? `${prefix}_${raw}` : raw;
}
}),
"[project]/utils/math.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clamp",
    ()=>clamp,
    "roundTo",
    ()=>roundTo
]);
function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
}
function roundTo(n, step) {
    return Math.round(n / step) * step;
}
}),
"[project]/store/windowStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSnapFromPointer",
    ()=>getSnapFromPointer,
    "useWindowStore",
    ()=>useWindowStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/os/appRegistry.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/window-manager/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/id.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/math.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function getWorkArea() {
    const w = window.innerWidth;
    const h = Math.max(200, window.innerHeight - __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TASKBAR_HEIGHT"]);
    return {
        w,
        h
    };
}
function clampRect(rect, allowOffscreenPx = 24) {
    const work = getWorkArea();
    const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(rect.w, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_W"], work.w);
    const h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(rect.h, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_H"], work.h);
    const xMax = work.w - allowOffscreenPx;
    const yMax = work.h - allowOffscreenPx;
    return {
        x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(rect.x, -w + allowOffscreenPx, xMax),
        y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(rect.y, -h + allowOffscreenPx, yMax),
        w,
        h
    };
}
const DEFAULT_RECT = {
    x: 80,
    y: 80,
    w: 860,
    h: 560
};
const useWindowStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set, get)=>({
        windows: {},
        order: [],
        activeId: null,
        nextZ: 10,
        openApp: (appId)=>{
            const def = __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appRegistry"][appId];
            if (def.singleton) {
                const existing = Object.values(get().windows).find((w)=>w.appId === appId);
                if (existing) {
                    if (existing.isMinimized) get().restoreWindow(existing.id);
                    get().focusWindow(existing.id);
                    return existing.id;
                }
            }
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])("win");
            const now = Date.now();
            const cascade = get().order.length * 18;
            const work = getWorkArea();
            const base = {
                ...DEFAULT_RECT,
                x: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(DEFAULT_RECT.x + cascade, 0, Math.max(0, work.w - 80)),
                y: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(DEFAULT_RECT.y + cascade, 0, Math.max(0, work.h - 80))
            };
            const zIndex = get().nextZ;
            const win = {
                id,
                appId,
                title: def.title,
                rect: clampRect(base),
                zIndex,
                isMinimized: false,
                isMaximized: false,
                snap: "none",
                lifecycle: "opening",
                createdAt: now,
                updatedAt: now
            };
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: win
                    },
                    order: [
                        ...s.order,
                        id
                    ],
                    activeId: id,
                    nextZ: s.nextZ + 1
                }));
            // mark as 'normal' after open animation
            window.setTimeout(()=>get()._setLifecycle(id, "normal"), __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
            return id;
        },
        closeWindow: (id)=>{
            const w = get().windows[id];
            if (!w) return;
            get()._setLifecycle(id, "closing");
            window.setTimeout(()=>{
                set((s)=>{
                    const rest = {
                        ...s.windows
                    };
                    delete rest[id];
                    const order = s.order.filter((x)=>x !== id);
                    const activeId = s.activeId === id ? order.at(-1) ?? null : s.activeId;
                    return {
                        windows: rest,
                        order,
                        activeId
                    };
                });
            }, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
        },
        focusWindow: (id)=>{
            const w = get().windows[id];
            if (!w) return;
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            zIndex: s.nextZ,
                            updatedAt: Date.now()
                        }
                    },
                    activeId: id,
                    nextZ: s.nextZ + 1
                }));
        },
        minimizeWindow: (id)=>{
            const w = get().windows[id];
            if (!w || w.isMinimized) return;
            get()._setLifecycle(id, "minimizing");
            window.setTimeout(()=>{
                set((s)=>({
                        windows: {
                            ...s.windows,
                            [id]: {
                                ...s.windows[id],
                                isMinimized: true,
                                lifecycle: "normal",
                                updatedAt: Date.now()
                            }
                        },
                        activeId: s.activeId === id ? null : s.activeId
                    }));
            }, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
        },
        restoreWindow: (id)=>{
            const w = get().windows[id];
            if (!w) return;
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            isMinimized: false,
                            lifecycle: "restoring"
                        }
                    },
                    activeId: id
                }));
            get().focusWindow(id);
            window.setTimeout(()=>get()._setLifecycle(id, "normal"), __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
        },
        toggleMaximizeWindow: (id)=>{
            const w = get().windows[id];
            if (!w) return;
            if (!w.isMaximized) {
                const work = getWorkArea();
                set((s)=>({
                        windows: {
                            ...s.windows,
                            [id]: {
                                ...w,
                                lifecycle: "maximizing",
                                isMaximized: true,
                                snap: "fullscreen",
                                restoreRect: w.rect,
                                rect: {
                                    x: 0,
                                    y: 0,
                                    w: work.w,
                                    h: work.h
                                },
                                updatedAt: Date.now()
                            }
                        }
                    }));
                window.setTimeout(()=>get()._setLifecycle(id, "normal"), __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
            } else {
                const restore = w.restoreRect ?? DEFAULT_RECT;
                set((s)=>({
                        windows: {
                            ...s.windows,
                            [id]: {
                                ...w,
                                lifecycle: "unmaximizing",
                                isMaximized: false,
                                snap: "none",
                                rect: clampRect(restore),
                                restoreRect: undefined,
                                updatedAt: Date.now()
                            }
                        }
                    }));
                window.setTimeout(()=>get()._setLifecycle(id, "normal"), __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"]);
            }
        },
        moveWindow: (id, x, y)=>{
            const w = get().windows[id];
            if (!w || w.isMaximized) return;
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            rect: clampRect({
                                ...w.rect,
                                x,
                                y
                            }),
                            snap: "none",
                            updatedAt: Date.now()
                        }
                    }
                }));
        },
        resizeWindow: (id, rectPatch)=>{
            const w = get().windows[id];
            if (!w || w.isMaximized) return;
            const next = clampRect({
                ...w.rect,
                ...rectPatch
            });
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            rect: next,
                            snap: "none",
                            updatedAt: Date.now()
                        }
                    }
                }));
        },
        snapWindow: (id, snap)=>{
            const w = get().windows[id];
            if (!w) return;
            const work = getWorkArea();
            if (snap === "none") {
                set((s)=>({
                        windows: {
                            ...s.windows,
                            [id]: {
                                ...w,
                                snap: "none",
                                isMaximized: false,
                                rect: clampRect(w.restoreRect ?? w.rect)
                            }
                        }
                    }));
                return;
            }
            const rect = snap === "fullscreen" ? {
                x: 0,
                y: 0,
                w: work.w,
                h: work.h
            } : snap === "left" ? {
                x: 0,
                y: 0,
                w: Math.floor(work.w / 2),
                h: work.h
            } : {
                x: Math.floor(work.w / 2),
                y: 0,
                w: Math.floor(work.w / 2),
                h: work.h
            };
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            snap,
                            isMaximized: snap === "fullscreen",
                            restoreRect: w.restoreRect ?? w.rect,
                            rect,
                            updatedAt: Date.now()
                        }
                    }
                }));
        },
        cycleFocus: ()=>{
            const ids = get().order.map((id)=>get().windows[id]).filter((w)=>w && !w.isMinimized).sort((a, b)=>b.zIndex - a.zIndex).map((w)=>w.id);
            if (ids.length === 0) return;
            const active = get().activeId;
            const idx = active ? ids.indexOf(active) : -1;
            const next = ids[(idx + 1) % ids.length];
            get().focusWindow(next);
        },
        _setLifecycle: (id, lifecycle)=>{
            const w = get().windows[id];
            if (!w) return;
            set((s)=>({
                    windows: {
                        ...s.windows,
                        [id]: {
                            ...w,
                            lifecycle,
                            updatedAt: Date.now()
                        }
                    }
                }));
        }
    }), {
    name: "web-os:windows",
    version: 1,
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    partialize: (s)=>({
            windows: s.windows,
            order: s.order,
            activeId: s.activeId,
            nextZ: s.nextZ
        }),
    onRehydrateStorage: ()=>(state)=>{
            // After hydration, ensure all windows are in a sane lifecycle state.
            if (!state) return;
            for (const id of Object.keys(state.windows)){
                state.windows[id].lifecycle = "normal";
            }
        }
}));
function getSnapFromPointer(x, y) {
    const work = getWorkArea();
    if (y <= __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_PX"]) return "fullscreen";
    if (x <= __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_PX"]) return "left";
    if (x >= work.w - __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SNAP_THRESHOLD_PX"]) return "right";
    return "none";
}
}),
"[project]/core/desktop/Desktop.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Desktop",
    ()=>Desktop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/os/appRegistry.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$desktopStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/desktopStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/windowStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Desktop({ disabled }) {
    const openApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.openApp);
    const iconPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$desktopStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDesktopStore"])((s)=>s.iconPos);
    const setIconPos = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$desktopStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDesktopStore"])((s)=>s.setIconPos);
    const resetLayout = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$desktopStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useDesktopStore"])((s)=>s.resetLayout);
    const [menu, setMenu] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        x: 0,
        y: 0
    });
    const dragging = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const appIcons = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installedApps"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 select-none",
        style: {
            background: "var(--os-wallpaper)"
        },
        onContextMenu: (e)=>{
            e.preventDefault();
            setMenu({
                open: true,
                x: e.clientX,
                y: e.clientY
            });
        },
        onPointerDown: ()=>{
            if (menu.open) setMenu((m)=>({
                    ...m,
                    open: false
                }));
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0",
                children: appIcons.map((app, idx)=>{
                    const pos = iconPos[app.id] ?? {
                        x: 24,
                        y: 24 + idx * 84
                    };
                    const Icon = app.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "group absolute flex w-20 flex-col items-center gap-2 rounded-lg p-2 text-xs text-[color:var(--os-fg)] hover:bg-white/10 active:bg-white/15",
                        style: {
                            transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`
                        },
                        onDoubleClick: ()=>{
                            if (!disabled) openApp(app.id);
                        },
                        onPointerDown: (e)=>{
                            if (disabled) return;
                            if (e.button !== 0) return;
                            e.currentTarget.setPointerCapture(e.pointerId);
                            dragging.current = {
                                appId: app.id,
                                startX: e.clientX,
                                startY: e.clientY,
                                originX: pos.x,
                                originY: pos.y
                            };
                        },
                        onPointerMove: (e)=>{
                            const d = dragging.current;
                            if (!d || d.appId !== app.id) return;
                            const dx = e.clientX - d.startX;
                            const dy = e.clientY - d.startY;
                            setIconPos(app.id, {
                                x: d.originX + dx,
                                y: d.originY + dy
                            });
                        },
                        onPointerUp: ()=>{
                            dragging.current = null;
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex h-10 w-10 items-center justify-center rounded-xl bg-black/25 ring-1 ring-white/10 group-hover:bg-black/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    className: "h-5 w-5"
                                }, void 0, false, {
                                    fileName: "[project]/core/desktop/Desktop.tsx",
                                    lineNumber: 83,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/core/desktop/Desktop.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "line-clamp-2 text-center leading-4 drop-shadow",
                                children: app.title
                            }, void 0, false, {
                                fileName: "[project]/core/desktop/Desktop.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this)
                        ]
                    }, app.id, true, {
                        fileName: "[project]/core/desktop/Desktop.tsx",
                        lineNumber: 50,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/core/desktop/Desktop.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            menu.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-50 min-w-48 rounded-xl border border-white/10 bg-[color:var(--os-panel-solid)]/95 p-1 text-sm shadow-2xl backdrop-blur",
                style: {
                    left: menu.x,
                    top: menu.y
                },
                onPointerDown: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full rounded-lg px-3 py-2 text-left hover:bg-white/10",
                        onClick: ()=>{
                            setMenu((m)=>({
                                    ...m,
                                    open: false
                                }));
                            resetLayout();
                        },
                        children: "Reset icon layout"
                    }, void 0, false, {
                        fileName: "[project]/core/desktop/Desktop.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "w-full rounded-lg px-3 py-2 text-left hover:bg-white/10",
                        onClick: ()=>{
                            setMenu((m)=>({
                                    ...m,
                                    open: false
                                }));
                            openApp("settings");
                        },
                        children: "Settings"
                    }, void 0, false, {
                        fileName: "[project]/core/desktop/Desktop.tsx",
                        lineNumber: 109,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/core/desktop/Desktop.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/core/desktop/Desktop.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/core/taskbar/Taskbar.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Taskbar",
    ()=>Taskbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/os/appRegistry.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/window-manager/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/windowStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function Taskbar() {
    const windows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.windows);
    const order = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.order);
    const activeId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.activeId);
    const openApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.openApp);
    const focusWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.focusWindow);
    const restoreWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.restoreWindow);
    const [startOpen, setStartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>new Date());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const t = window.setInterval(()=>setNow(new Date()), 1000);
        return ()=>window.clearInterval(t);
    }, []);
    const running = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>order.map((id)=>windows[id]).filter(Boolean), [
        order,
        windows
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute bottom-0 left-0 right-0 z-[1000] flex items-center gap-2 border-t border-white/10 bg-[color:var(--os-panel)] px-2 backdrop-blur",
        style: {
            height: __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["TASKBAR_HEIGHT"]
        },
        onPointerDown: ()=>{
            if (startOpen) setStartOpen(false);
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "rounded-lg px-3 py-2 text-sm font-medium hover:bg-white/10",
                onPointerDown: (e)=>e.stopPropagation(),
                onClick: ()=>setStartOpen((v)=>!v),
                children: "Start"
            }, void 0, false, {
                fileName: "[project]/core/taskbar/Taskbar.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto",
                children: running.map((w)=>{
                    const isActive = w.id === activeId;
                    const app = __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installedApps"].find((a)=>a.id === w.appId);
                    const Icon = app?.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-white/10 ${isActive ? "bg-white/10" : ""}`,
                        onPointerDown: (e)=>e.stopPropagation(),
                        onClick: ()=>{
                            if (w.isMinimized) restoreWindow(w.id);
                            focusWindow(w.id);
                        },
                        children: [
                            Icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/core/taskbar/Taskbar.tsx",
                                lineNumber: 64,
                                columnNumber: 23
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "max-w-40 truncate",
                                children: w.title
                            }, void 0, false, {
                                fileName: "[project]/core/taskbar/Taskbar.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this)
                        ]
                    }, w.id, true, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 52,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/core/taskbar/Taskbar.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-3 px-2 text-sm tabular-nums",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "rounded-lg px-2 py-1 hover:bg-white/10",
                        onPointerDown: (e)=>e.stopPropagation(),
                        onClick: ()=>openApp("settings"),
                        children: "⚙"
                    }, void 0, false, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right leading-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: now.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit"
                                })
                            }, void 0, false, {
                                fileName: "[project]/core/taskbar/Taskbar.tsx",
                                lineNumber: 82,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs opacity-80",
                                children: now.toLocaleDateString([], {
                                    year: "numeric",
                                    month: "short",
                                    day: "2-digit"
                                })
                            }, void 0, false, {
                                fileName: "[project]/core/taskbar/Taskbar.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 81,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/core/taskbar/Taskbar.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            startOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-[52px] left-2 z-[1100] w-72 rounded-2xl border border-white/10 bg-[color:var(--os-panel-solid)]/95 p-2 shadow-2xl backdrop-blur",
                onPointerDown: (e)=>e.stopPropagation(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2 pb-2 text-xs font-semibold uppercase tracking-wide opacity-70",
                        children: "Apps"
                    }, void 0, false, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-1",
                        children: __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["installedApps"].map((app)=>{
                            const Icon = app.icon;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10",
                                onClick: ()=>{
                                    openApp(app.id);
                                    setStartOpen(false);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                                        lineNumber: 110,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: app.title
                                    }, void 0, false, {
                                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                                        lineNumber: 111,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, app.id, true, {
                                fileName: "[project]/core/taskbar/Taskbar.tsx",
                                lineNumber: 102,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 98,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 border-t border-white/10 pt-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-white/10",
                            onClick: ()=>{
                                // simulated shutdown
                                setStartOpen(false);
                                openApp("ai-assistant");
                            },
                            children: "Power ▸ (simulated)"
                        }, void 0, false, {
                            fileName: "[project]/core/taskbar/Taskbar.tsx",
                            lineNumber: 117,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/core/taskbar/Taskbar.tsx",
                        lineNumber: 116,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/core/taskbar/Taskbar.tsx",
                lineNumber: 91,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/core/taskbar/Taskbar.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/core/window-manager/WindowFrame.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WindowFrame",
    ()=>WindowFrame
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-ssr] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-ssr] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/os/appRegistry.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/window-manager/constants.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/windowStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/math.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function getAnimState(win) {
    if (win.lifecycle === "opening") return "open";
    if (win.lifecycle === "closing") return "close";
    if (win.lifecycle === "minimizing") return "minimize";
    if (win.lifecycle === "restoring") return "restore";
    if (win.lifecycle === "maximizing") return "maximize";
    if (win.lifecycle === "unmaximizing") return "restore";
    return "idle";
}
function WindowFrame({ win, animationsEnabled }) {
    const focusWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.focusWindow);
    const closeWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.closeWindow);
    const minimizeWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.minimizeWindow);
    const toggleMaximizeWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.toggleMaximizeWindow);
    const moveWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.moveWindow);
    const resizeWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.resizeWindow);
    const snapWindow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.snapWindow);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const resizeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const App = __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$appRegistry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["appRegistry"][win.appId].component;
    const style = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const r = win.rect;
        return {
            left: r.x,
            top: r.y,
            width: r.w,
            height: r.h,
            zIndex: win.zIndex
        };
    }, [
        win.rect,
        win.zIndex
    ]);
    const animate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        if (!animationsEnabled) return undefined;
        return getAnimState(win);
    }, [
        win,
        animationsEnabled
    ]);
    const variants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>({
            idle: {
                opacity: 1,
                scale: 1,
                y: 0
            },
            open: {
                opacity: [
                    0,
                    1
                ],
                scale: [
                    0.96,
                    1
                ],
                y: [
                    8,
                    0
                ]
            },
            close: {
                opacity: 0,
                scale: 0.96,
                y: 6
            },
            minimize: {
                opacity: 0,
                scale: 0.9,
                y: 30
            },
            restore: {
                opacity: [
                    0,
                    1
                ],
                scale: [
                    0.96,
                    1
                ],
                y: [
                    14,
                    0
                ]
            },
            maximize: {
                opacity: 1,
                scale: 1,
                y: 0
            }
        }), []);
    function onTitlePointerDown(e) {
        if (e.button !== 0) return;
        if (win.isMaximized) return;
        e.stopPropagation();
        focusWindow(win.id);
        e.currentTarget.setPointerCapture(e.pointerId);
        dragRef.current = {
            pointerId: e.pointerId,
            startX: e.clientX,
            startY: e.clientY,
            originX: win.rect.x,
            originY: win.rect.y
        };
    }
    function onTitlePointerMove(e) {
        const d = dragRef.current;
        if (!d || d.pointerId !== e.pointerId) return;
        const dx = e.clientX - d.startX;
        const dy = e.clientY - d.startY;
        moveWindow(win.id, d.originX + dx, d.originY + dy);
    }
    function onTitlePointerUp(e) {
        const d = dragRef.current;
        if (!d || d.pointerId !== e.pointerId) return;
        dragRef.current = null;
        const snap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getSnapFromPointer"])(e.clientX, e.clientY);
        if (snap !== "none") snapWindow(win.id, snap);
    }
    function startResize(e, dir) {
        if (e.button !== 0) return;
        if (win.isMaximized) return;
        e.stopPropagation();
        focusWindow(win.id);
        e.currentTarget.setPointerCapture(e.pointerId);
        resizeRef.current = {
            pointerId: e.pointerId,
            dir,
            startX: e.clientX,
            startY: e.clientY,
            origin: win.rect
        };
    }
    function onResizeMove(e) {
        const r = resizeRef.current;
        if (!r || r.pointerId !== e.pointerId) return;
        const dx = e.clientX - r.startX;
        const dy = e.clientY - r.startY;
        const o = r.origin;
        let x = o.x;
        let y = o.y;
        let w = o.w;
        let h = o.h;
        if (r.dir.includes("e")) w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(o.w + dx, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_W"], window.innerWidth);
        if (r.dir.includes("s")) h = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(o.h + dy, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_H"], window.innerHeight);
        if (r.dir.includes("w")) {
            const nextW = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(o.w - dx, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_W"], window.innerWidth);
            x = o.x + (o.w - nextW);
            w = nextW;
        }
        if (r.dir.includes("n")) {
            const nextH = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$math$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clamp"])(o.h - dy, __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MIN_WINDOW_H"], window.innerHeight);
            y = o.y + (o.h - nextH);
            h = nextH;
        }
        resizeWindow(win.id, {
            x,
            y,
            w,
            h
        });
    }
    function onResizeUp(e) {
        const r = resizeRef.current;
        if (!r || r.pointerId !== e.pointerId) return;
        resizeRef.current = null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        className: "pointer-events-auto absolute overflow-hidden rounded-[var(--os-radius)] border border-[color:var(--os-border)] bg-[color:var(--os-panel-solid)] shadow-2xl",
        style: style,
        initial: false,
        animate: animate,
        variants: variants,
        transition: {
            duration: __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$constants$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WINDOW_ANIM_MS"] / 1000,
            ease: [
                0.2,
                0.8,
                0.2,
                1
            ]
        },
        onPointerDown: ()=>focusWindow(win.id),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-10 items-center justify-between gap-2 border-b border-[color:var(--os-border)] bg-black/10 px-3",
                onPointerDown: onTitlePointerDown,
                onPointerMove: onTitlePointerMove,
                onPointerUp: onTitlePointerUp,
                onDoubleClick: ()=>toggleMaximizeWindow(win.id),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "min-w-0 flex-1 truncate text-sm font-medium",
                        children: win.title
                    }, void 0, false, {
                        fileName: "[project]/core/window-manager/WindowFrame.tsx",
                        lineNumber: 207,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-md p-1.5 hover:bg-white/10",
                                onPointerDown: (e)=>e.stopPropagation(),
                                onClick: ()=>minimizeWindow(win.id),
                                "aria-label": "Minimize",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                    lineNumber: 218,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-md p-1.5 hover:bg-white/10",
                                onPointerDown: (e)=>e.stopPropagation(),
                                onClick: ()=>toggleMaximizeWindow(win.id),
                                "aria-label": "Maximize",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                    lineNumber: 227,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded-md p-1.5 hover:bg-white/10",
                                onPointerDown: (e)=>e.stopPropagation(),
                                onClick: ()=>closeWindow(win.id),
                                "aria-label": "Close",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/core/window-manager/WindowFrame.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/core/window-manager/WindowFrame.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/core/window-manager/WindowFrame.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-[calc(100%-2.5rem)] bg-[color:var(--os-panel-solid)]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(App, {
                    windowId: win.id
                }, void 0, false, {
                    fileName: "[project]/core/window-manager/WindowFrame.tsx",
                    lineNumber: 243,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/core/window-manager/WindowFrame.tsx",
                lineNumber: 242,
                columnNumber: 7
            }, this),
            [
                [
                    "n",
                    "cursor-n-resize"
                ],
                [
                    "s",
                    "cursor-s-resize"
                ],
                [
                    "e",
                    "cursor-e-resize"
                ],
                [
                    "w",
                    "cursor-w-resize"
                ],
                [
                    "ne",
                    "cursor-ne-resize"
                ],
                [
                    "nw",
                    "cursor-nw-resize"
                ],
                [
                    "se",
                    "cursor-se-resize"
                ],
                [
                    "sw",
                    "cursor-sw-resize"
                ]
            ].map(([dir, cursor])=>{
                const common = `absolute ${cursor} pointer-events-auto`;
                const size = 10;
                const edge = 5;
                const pos = dir === "n" ? {
                    top: -edge,
                    left: size,
                    right: size,
                    height: size
                } : dir === "s" ? {
                    bottom: -edge,
                    left: size,
                    right: size,
                    height: size
                } : dir === "e" ? {
                    right: -edge,
                    top: size,
                    bottom: size,
                    width: size
                } : dir === "w" ? {
                    left: -edge,
                    top: size,
                    bottom: size,
                    width: size
                } : dir === "ne" ? {
                    right: -edge,
                    top: -edge,
                    width: size * 1.5,
                    height: size * 1.5
                } : dir === "nw" ? {
                    left: -edge,
                    top: -edge,
                    width: size * 1.5,
                    height: size * 1.5
                } : dir === "se" ? {
                    right: -edge,
                    bottom: -edge,
                    width: size * 1.5,
                    height: size * 1.5
                } : {
                    left: -edge,
                    bottom: -edge,
                    width: size * 1.5,
                    height: size * 1.5
                };
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: common,
                    style: pos,
                    onPointerDown: (e)=>startResize(e, dir),
                    onPointerMove: onResizeMove,
                    onPointerUp: onResizeUp
                }, dir, false, {
                    fileName: "[project]/core/window-manager/WindowFrame.tsx",
                    lineNumber: 286,
                    columnNumber: 11
                }, this);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/core/window-manager/WindowFrame.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
}),
"[project]/core/window-manager/WindowLayer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "WindowLayer",
    ()=>WindowLayer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$WindowFrame$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/window-manager/WindowFrame.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/windowStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function WindowLayer({ animationsEnabled }) {
    const windows = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.windows);
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        return Object.values(windows).filter((w)=>!w.isMinimized).sort((a, b)=>a.zIndex - b.zIndex);
    }, [
        windows
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "pointer-events-none absolute inset-0",
        children: list.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$WindowFrame$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WindowFrame"], {
                win: w,
                animationsEnabled: animationsEnabled
            }, w.id, false, {
                fileName: "[project]/core/window-manager/WindowLayer.tsx",
                lineNumber: 20,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/core/window-manager/WindowLayer.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/store/osStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_WALLPAPER",
    ()=>DEFAULT_WALLPAPER,
    "useOSStore",
    ()=>useOSStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/middleware.mjs [app-ssr] (ecmascript)");
"use client";
;
;
const DEFAULT_WALLPAPER = "radial-gradient(circle at top, #fde68a, #fb7185 35%, #1d4ed8 80%)";
const DEFAULTS = {
    theme: "dark",
    accent: "#3b82f6",
    wallpaper: DEFAULT_WALLPAPER,
    animationsEnabled: true,
    isLoggedIn: false,
    username: "Suman Jana"
};
const useOSStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])()((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["persist"])((set)=>({
        ...DEFAULTS,
        setTheme: (theme)=>set({
                theme
            }),
        setAccent: (accent)=>set({
                accent
            }),
        setWallpaper: (wallpaper)=>set({
                wallpaper
            }),
        setAnimationsEnabled: (animationsEnabled)=>set({
                animationsEnabled
            }),
        setLoggedIn: (isLoggedIn)=>set({
                isLoggedIn
            }),
        setUsername: (username)=>set({
                username
            }),
        resetLocalSettings: ()=>set({
                ...DEFAULTS
            })
    }), {
    name: "web-os:settings",
    version: 3,
    storage: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$middleware$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createJSONStorage"])(()=>localStorage),
    migrate: (persisted)=>{
        const saved = typeof persisted === "object" && persisted !== null ? persisted : {};
        return {
            ...DEFAULTS,
            ...saved,
            wallpaper: DEFAULT_WALLPAPER
        };
    }
}));
}),
"[project]/utils/vfs/defaultState.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createDefaultVfsState",
    ()=>createDefaultVfsState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/id.ts [app-ssr] (ecmascript)");
;
function folder(name, parentId) {
    const now = Date.now();
    return {
        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])("dir"),
        type: "folder",
        name,
        parentId,
        children: [],
        createdAt: now,
        updatedAt: now
    };
}
function createDefaultVfsState() {
    const now = Date.now();
    const rootId = "root";
    const root = {
        id: rootId,
        type: "folder",
        name: "/",
        parentId: null,
        children: [],
        createdAt: now,
        updatedAt: now
    };
    const desktop = folder("Desktop", rootId);
    const notes = folder("Notes", rootId);
    const documents = folder("Documents", rootId);
    const downloads = folder("Downloads", rootId);
    root.children = [
        desktop.id,
        notes.id,
        documents.id,
        downloads.id
    ];
    const nodes = {
        [rootId]: root,
        [desktop.id]: desktop,
        [notes.id]: notes,
        [documents.id]: documents,
        [downloads.id]: downloads
    };
    return {
        rootId,
        nodes
    };
}
}),
"[project]/utils/vfs/db.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getDb",
    ()=>getDb,
    "kvClearAll",
    ()=>kvClearAll,
    "kvDel",
    ()=>kvDel,
    "kvGet",
    ()=>kvGet,
    "kvSet",
    ()=>kvSet
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/idb/build/index.js [app-ssr] (ecmascript)");
;
const DB_NAME = "web-os";
const DB_VERSION = 1;
const STORE = "kv";
async function getDb() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$idb$2f$build$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["openDB"])(DB_NAME, DB_VERSION, {
        upgrade (db) {
            if (!db.objectStoreNames.contains(STORE)) {
                db.createObjectStore(STORE);
            }
        }
    });
}
async function kvGet(key) {
    const db = await getDb();
    return db.get(STORE, key);
}
async function kvSet(key, value) {
    const db = await getDb();
    return db.put(STORE, value, key);
}
async function kvDel(key) {
    const db = await getDb();
    return db.delete(STORE, key);
}
async function kvClearAll() {
    const db = await getDb();
    return db.clear(STORE);
}
}),
"[project]/utils/vfs/ops.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createFile",
    ()=>createFile,
    "createFolder",
    ()=>createFolder,
    "deleteNode",
    ()=>deleteNode,
    "ensureUniqueName",
    ()=>ensureUniqueName,
    "getChildByName",
    ()=>getChildByName,
    "isFile",
    ()=>isFile,
    "isFolder",
    ()=>isFolder,
    "listChildren",
    ()=>listChildren,
    "moveNode",
    ()=>moveNode,
    "pathToSegments",
    ()=>pathToSegments,
    "renameNode",
    ()=>renameNode,
    "resolvePath",
    ()=>resolvePath,
    "writeFile",
    ()=>writeFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/id.ts [app-ssr] (ecmascript)");
;
function isFolder(n) {
    return n.type === "folder";
}
function isFile(n) {
    return n.type === "file";
}
function pathToSegments(path) {
    const clean = path.trim();
    if (clean === "/") return [];
    return clean.replaceAll("\\", "/").split("/").filter(Boolean);
}
function getChildByName(state, folderId, name) {
    const folder = state.nodes[folderId];
    if (!folder || folder.type !== "folder") return undefined;
    const id = folder.children.find((cid)=>state.nodes[cid]?.name === name);
    return id ? state.nodes[id] : undefined;
}
function resolvePath(state, absPath) {
    const segs = pathToSegments(absPath);
    let current = state.nodes[state.rootId];
    for (const seg of segs){
        if (current.type !== "folder") return undefined;
        const next = getChildByName(state, current.id, seg);
        if (!next) return undefined;
        current = next;
    }
    return current;
}
function listChildren(state, folderId) {
    const folder = state.nodes[folderId];
    if (!folder || folder.type !== "folder") return [];
    return folder.children.map((id)=>state.nodes[id]).filter(Boolean);
}
function ensureUniqueName(state, parentId, requested, ignoreId) {
    const base = requested.trim() || "untitled";
    const siblings = listChildren(state, parentId).filter((n)=>n.id !== ignoreId).map((n)=>n.name);
    if (!siblings.includes(base)) return base;
    let i = 2;
    while(siblings.includes(`${base} (${i})`))i++;
    return `${base} (${i})`;
}
function createFolder(state, parentId, name) {
    const parent = state.nodes[parentId];
    if (!parent || parent.type !== "folder") throw new Error("Parent is not a folder");
    const now = Date.now();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])("dir");
    const folder = {
        id,
        type: "folder",
        name: ensureUniqueName(state, parentId, name),
        parentId,
        children: [],
        createdAt: now,
        updatedAt: now
    };
    const nextParent = {
        ...parent,
        children: [
            ...parent.children,
            id
        ],
        updatedAt: now
    };
    return {
        next: {
            rootId: state.rootId,
            nodes: {
                ...state.nodes,
                [id]: folder,
                [parentId]: nextParent
            }
        },
        id
    };
}
function createFile(state, parentId, name, content = "", mime = "text/plain") {
    const parent = state.nodes[parentId];
    if (!parent || parent.type !== "folder") throw new Error("Parent is not a folder");
    const now = Date.now();
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$id$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createId"])("file");
    const file = {
        id,
        type: "file",
        name: ensureUniqueName(state, parentId, name),
        parentId,
        content,
        mime,
        createdAt: now,
        updatedAt: now
    };
    const nextParent = {
        ...parent,
        children: [
            ...parent.children,
            id
        ],
        updatedAt: now
    };
    return {
        next: {
            rootId: state.rootId,
            nodes: {
                ...state.nodes,
                [id]: file,
                [parentId]: nextParent
            }
        },
        id
    };
}
function writeFile(state, fileId, content) {
    const node = state.nodes[fileId];
    if (!node || node.type !== "file") throw new Error("Not a file");
    return {
        ...state,
        nodes: {
            ...state.nodes,
            [fileId]: {
                ...node,
                content,
                updatedAt: Date.now()
            }
        }
    };
}
function renameNode(state, id, name) {
    const node = state.nodes[id];
    if (!node) throw new Error("Not found");
    const parentId = node.parentId;
    if (!parentId) throw new Error("Cannot rename root");
    const nextName = ensureUniqueName(state, parentId, name, id);
    return {
        ...state,
        nodes: {
            ...state.nodes,
            [id]: {
                ...node,
                name: nextName,
                updatedAt: Date.now()
            }
        }
    };
}
function collectSubtreeIds(state, id, out) {
    out.add(id);
    const n = state.nodes[id];
    if (!n || n.type !== "folder") return;
    for (const childId of n.children)collectSubtreeIds(state, childId, out);
}
function deleteNode(state, id) {
    const node = state.nodes[id];
    if (!node) return state;
    if (!node.parentId) throw new Error("Cannot delete root");
    const parent = state.nodes[node.parentId];
    if (!parent || parent.type !== "folder") throw new Error("Invalid parent");
    const ids = new Set();
    collectSubtreeIds(state, id, ids);
    const nextNodes = {
        ...state.nodes
    };
    for (const delId of ids)delete nextNodes[delId];
    const nextParent = {
        ...parent,
        children: parent.children.filter((cid)=>cid !== id),
        updatedAt: Date.now()
    };
    nextNodes[nextParent.id] = nextParent;
    return {
        ...state,
        nodes: nextNodes
    };
}
function moveNode(state, id, targetFolderId) {
    const node = state.nodes[id];
    const target = state.nodes[targetFolderId];
    if (!node) throw new Error("Not found");
    if (!node.parentId) throw new Error("Cannot move root");
    if (!target || target.type !== "folder") throw new Error("Target not a folder");
    if (node.parentId === targetFolderId) return state;
    // Prevent moving folder into itself/descendant
    if (node.type === "folder") {
        let cur = targetFolderId;
        while(cur){
            if (cur === node.id) throw new Error("Cannot move a folder into itself");
            const nextNode = state.nodes[cur];
            cur = nextNode?.parentId ?? null;
        }
    }
    const fromParent = state.nodes[node.parentId];
    if (!fromParent || fromParent.type !== "folder") throw new Error("Invalid from parent");
    const now = Date.now();
    const nextFrom = {
        ...fromParent,
        children: fromParent.children.filter((cid)=>cid !== id),
        updatedAt: now
    };
    const nextTo = {
        ...target,
        children: [
            ...target.children,
            id
        ],
        updatedAt: now
    };
    const nextName = ensureUniqueName(state, targetFolderId, node.name, id);
    return {
        ...state,
        nodes: {
            ...state.nodes,
            [nextFrom.id]: nextFrom,
            [nextTo.id]: nextTo,
            [id]: {
                ...node,
                parentId: targetFolderId,
                name: nextName,
                updatedAt: now
            }
        }
    };
}
}),
"[project]/store/vfsStore.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useVfsStore",
    ()=>useVfsStore
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$defaultState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/vfs/defaultState.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/vfs/db.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/vfs/ops.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const VFS_KEY = "vfs";
const useVfsStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set, get)=>({
        hydrated: false,
        vfs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$defaultState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDefaultVfsState"])(),
        init: async ()=>{
            const saved = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kvGet"])(VFS_KEY);
            if (saved?.rootId && saved.nodes) {
                set({
                    vfs: saved,
                    hydrated: true
                });
            } else {
                const fresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$defaultState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDefaultVfsState"])();
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kvSet"])(VFS_KEY, fresh);
                set({
                    vfs: fresh,
                    hydrated: true
                });
            }
        },
        reset: async ()=>{
            const fresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$defaultState$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createDefaultVfsState"])();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kvClearAll"])();
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$db$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["kvSet"])(VFS_KEY, fresh);
            set({
                vfs: fresh,
                hydrated: true
            });
        },
        getNode: (id)=>get().vfs.nodes[id],
        getPath: (id)=>{
            const { vfs } = get();
            const parts = [];
            let cur = vfs.nodes[id];
            while(cur && cur.parentId){
                parts.unshift(cur.name);
                cur = vfs.nodes[cur.parentId];
            }
            return `/${parts.join("/")}`;
        },
        resolve: (absPath)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resolvePath"])(get().vfs, absPath),
        list: (folderId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["listChildren"])(get().vfs, folderId),
        mkdir: (parentId, name)=>{
            const { next, id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFolder"])(get().vfs, parentId, name);
            set({
                vfs: next
            });
            return id;
        },
        touch: (parentId, name, content)=>{
            const { next, id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createFile"])(get().vfs, parentId, name, content ?? "", "text/plain");
            set({
                vfs: next
            });
            return id;
        },
        write: (fileId, content)=>{
            set({
                vfs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["writeFile"])(get().vfs, fileId, content)
            });
        },
        rename: (id, name)=>{
            set({
                vfs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["renameNode"])(get().vfs, id, name)
            });
        },
        rm: (id)=>{
            set({
                vfs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["deleteNode"])(get().vfs, id)
            });
        },
        mv: (id, targetFolderId)=>{
            set({
                vfs: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$vfs$2f$ops$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["moveNode"])(get().vfs, id, targetFolderId)
            });
        }
    }));
// Persist to IndexedDB with a small debounce.
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
}),
"[project]/core/os/LoginScreen.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoginScreen",
    ()=>LoginScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/osStore.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function LoginScreen() {
    const { wallpaper, username, setLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOSStore"])();
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const handleLogin = (e)=>{
        e.preventDefault();
        if (!password) {
            setError("Password cannot be empty");
            return;
        }
        if (password !== "2026") {
            setError("Incorrect password");
            return;
        }
        setLoading(true);
        setError(null);
        // Simulate authentication delay
        setTimeout(()=>{
            setLoggedIn(true);
        }, 1200);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
        exit: {
            opacity: 0,
            scale: 1.05
        },
        transition: {
            duration: 0.5,
            ease: "easeInOut"
        },
        className: "absolute inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat",
        style: {
            background: wallpaper
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 bg-black/40 backdrop-blur-md"
            }, void 0, false, {
                fileName: "[project]/core/os/LoginScreen.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    duration: 0.6,
                    ease: "easeOut"
                },
                className: "relative z-10 flex w-full max-w-sm flex-col items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            scale: 0.8
                        },
                        animate: {
                            scale: 1
                        },
                        transition: {
                            duration: 0.5,
                            delay: 0.2
                        },
                        className: "mb-6 flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                            size: 64,
                            className: "text-white/80"
                        }, void 0, false, {
                            fileName: "[project]/core/os/LoginScreen.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/core/os/LoginScreen.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "mb-8 text-3xl font-light text-white tracking-wider",
                        children: username
                    }, void 0, false, {
                        fileName: "[project]/core/os/LoginScreen.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: handleLogin,
                        className: "w-full",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `flex items-center overflow-hidden rounded-xl border border-white/20 bg-black/30 backdrop-blur-xl transition-all duration-300 focus-within:border-white/50 focus-within:bg-black/50 ${error ? 'border-red-500/50 focus-within:border-red-500/80 bg-red-950/20' : ''}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex h-12 w-12 items-center justify-center text-white/50 group-focus-within:text-white/90 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                size: 18
                                            }, void 0, false, {
                                                fileName: "[project]/core/os/LoginScreen.tsx",
                                                lineNumber: 71,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/core/os/LoginScreen.tsx",
                                            lineNumber: 70,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "password",
                                            placeholder: "Enter password...",
                                            value: password,
                                            onChange: (e)=>{
                                                setPassword(e.target.value);
                                                if (error) setError(null);
                                            },
                                            disabled: loading,
                                            className: "h-12 flex-1 bg-transparent px-2 text-white placeholder-white/40 outline-none transition-all disabled:opacity-50",
                                            autoFocus: true
                                        }, void 0, false, {
                                            fileName: "[project]/core/os/LoginScreen.tsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: !password || loading,
                                            className: "flex h-12 w-12 items-center justify-center text-white/50 hover:text-white disabled:opacity-30 transition-all",
                                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                size: 20,
                                                className: "animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/core/os/LoginScreen.tsx",
                                                lineNumber: 91,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                size: 20,
                                                className: password ? "text-white" : ""
                                            }, void 0, false, {
                                                fileName: "[project]/core/os/LoginScreen.tsx",
                                                lineNumber: 93,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/core/os/LoginScreen.tsx",
                                            lineNumber: 85,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/core/os/LoginScreen.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                    children: error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].p, {
                                        initial: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        exit: {
                                            opacity: 0,
                                            y: -10
                                        },
                                        className: "absolute -bottom-7 w-full text-center text-sm text-red-400 font-medium",
                                        children: error
                                    }, void 0, false, {
                                        fileName: "[project]/core/os/LoginScreen.tsx",
                                        lineNumber: 100,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/core/os/LoginScreen.tsx",
                                    lineNumber: 98,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/core/os/LoginScreen.tsx",
                            lineNumber: 68,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/core/os/LoginScreen.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                        initial: {
                            opacity: 0
                        },
                        animate: {
                            opacity: 1
                        },
                        transition: {
                            delay: 1
                        },
                        className: "mt-12 flex flex-col items-center text-white/40",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: "Web OS Desktop"
                        }, void 0, false, {
                            fileName: "[project]/core/os/LoginScreen.tsx",
                            lineNumber: 119,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/core/os/LoginScreen.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/core/os/LoginScreen.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/core/os/LoginScreen.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
}),
"[project]/core/os/OSRoot.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OSRoot",
    ()=>OSRoot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$desktop$2f$Desktop$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/desktop/Desktop.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$taskbar$2f$Taskbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/taskbar/Taskbar.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$WindowLayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/window-manager/WindowLayer.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/osStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/vfsStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/windowStore.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/core/os/LoginScreen.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
}
function OSRoot() {
    const { theme, accent, wallpaper, animationsEnabled, isLoggedIn } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useOSStore"])();
    const initVfs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVfsStore"])((s)=>s.init);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useVfsStore"])((s)=>s.hydrated);
    const cycleFocus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.cycleFocus);
    const openApp = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$windowStore$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useWindowStore"])((s)=>s.openApp);
    // Hydrate VFS
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        initVfs().catch(()=>{
        // best effort
        });
    }, [
        initVfs
    ]);
    // Apply theme + css vars
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const root = document.documentElement;
        root.style.setProperty("--os-accent", accent);
        root.style.setProperty("--os-wallpaper", wallpaper);
        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const set = ()=>applyTheme(mq.matches ? "dark" : "light");
            set();
            mq.addEventListener?.("change", set);
            return ()=>mq.removeEventListener?.("change", set);
        }
        applyTheme(theme);
    }, [
        theme,
        accent,
        wallpaper
    ]);
    // Keyboard shortcuts
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!isLoggedIn) return;
        function onKeyDown(e) {
            // Alt+Tab
            if (e.altKey && e.key.toLowerCase() === "tab") {
                e.preventDefault();
                cycleFocus();
            }
            // Ctrl+Alt+Del (mock)
            if (e.ctrlKey && e.altKey && e.key.toLowerCase() === "delete") {
                e.preventDefault();
                openApp("system-monitor");
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return ()=>window.removeEventListener("keydown", onKeyDown);
    }, [
        cycleFocus,
        isLoggedIn,
        openApp
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-dvh w-dvw overflow-hidden",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: !isLoggedIn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$os$2f$LoginScreen$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LoginScreen"], {}, "login", false, {
                    fileName: "[project]/core/os/OSRoot.tsx",
                    lineNumber: 75,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/core/os/OSRoot.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            isLoggedIn ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$desktop$2f$Desktop$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Desktop"], {
                        disabled: !hydrated
                    }, void 0, false, {
                        fileName: "[project]/core/os/OSRoot.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "pointer-events-none absolute inset-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$window$2d$manager$2f$WindowLayer$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["WindowLayer"], {
                            animationsEnabled: animationsEnabled
                        }, void 0, false, {
                            fileName: "[project]/core/os/OSRoot.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/core/os/OSRoot.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$core$2f$taskbar$2f$Taskbar$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Taskbar"], {}, void 0, false, {
                        fileName: "[project]/core/os/OSRoot.tsx",
                        lineNumber: 86,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true) : null
        ]
    }, void 0, true, {
        fileName: "[project]/core/os/OSRoot.tsx",
        lineNumber: 73,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f6b9f6de._.js.map