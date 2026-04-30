(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/settings/SettingsApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SettingsApp",
    ()=>SettingsApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paintbrush$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paintbrush.js [app-client] (ecmascript) <export default as Paintbrush>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SunMoon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun-moon.js [app-client] (ecmascript) <export default as SunMoon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallpaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallpaper$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallpaper.js [app-client] (ecmascript) <export default as Wallpaper>");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/osStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const WALLPAPERS = [
    {
        name: "Nebula",
        value: "radial-gradient(circle at top, #1b2133, #0b0d12 55%, #07080b)"
    },
    {
        name: "Dawn",
        value: "radial-gradient(circle at top, #fde68a, #fb7185 35%, #1d4ed8 80%)"
    },
    {
        name: "Forest",
        value: "radial-gradient(circle at top, #065f46, #0b0d12 55%, #030712)"
    }
];
function SettingsApp({}) {
    _s();
    const theme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[theme]": (s)=>s.theme
    }["SettingsApp.useOSStore[theme]"]);
    const accent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[accent]": (s)=>s.accent
    }["SettingsApp.useOSStore[accent]"]);
    const wallpaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[wallpaper]": (s)=>s.wallpaper
    }["SettingsApp.useOSStore[wallpaper]"]);
    const animationsEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[animationsEnabled]": (s)=>s.animationsEnabled
    }["SettingsApp.useOSStore[animationsEnabled]"]);
    const setTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[setTheme]": (s)=>s.setTheme
    }["SettingsApp.useOSStore[setTheme]"]);
    const setAccent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[setAccent]": (s)=>s.setAccent
    }["SettingsApp.useOSStore[setAccent]"]);
    const setWallpaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[setWallpaper]": (s)=>s.setWallpaper
    }["SettingsApp.useOSStore[setWallpaper]"]);
    const setAnimationsEnabled = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"])({
        "SettingsApp.useOSStore[setAnimationsEnabled]": (s)=>s.setAnimationsEnabled
    }["SettingsApp.useOSStore[setAnimationsEnabled]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "h-full overflow-auto p-4",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-2xl space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__SunMoon$3e$__["SunMoon"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 41,
                                    columnNumber: 13
                                }, this),
                                " Theme"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex gap-2",
                            children: [
                                [
                                    "system",
                                    "System"
                                ],
                                [
                                    "dark",
                                    "Dark"
                                ],
                                [
                                    "light",
                                    "Light"
                                ]
                            ].map(([value, label])=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5 ${theme === value ? "bg-black/5 dark:bg-white/5" : ""}`,
                                    onClick: ()=>setTheme(value),
                                    children: label
                                }, value, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 49,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Paintbrush$3e$__["Paintbrush"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                " Accent color"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "color",
                                    value: accent,
                                    onChange: (e)=>setAccent(e.target.value),
                                    className: "h-10 w-14 cursor-pointer rounded-md border border-[color:var(--os-border)] bg-transparent"
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-sm opacity-70",
                                    children: accent
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 73,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallpaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallpaper$3e$__["Wallpaper"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 79,
                                    columnNumber: 13
                                }, this),
                                " Wallpaper"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 78,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-2 grid grid-cols-3 gap-2",
                            children: WALLPAPERS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `overflow-hidden rounded-xl border border-[color:var(--os-border)] text-left ${wallpaper === w.value ? "ring-2 ring-[color:var(--os-accent)]" : ""}`,
                                    onClick: ()=>setWallpaper(w.value),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "h-12",
                                            style: {
                                                background: w.value
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                                            lineNumber: 90,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "px-2 py-2 text-xs font-medium",
                                            children: w.name
                                        }, void 0, false, {
                                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                                            lineNumber: 91,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, w.name, true, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 83,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                    lineNumber: 77,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold",
                            children: "Animations"
                        }, void 0, false, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: "mt-2 flex items-center gap-3 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    type: "checkbox",
                                    checked: animationsEnabled,
                                    onChange: (e)=>setAnimationsEnabled(e.target.checked)
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                "Enable window animations"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-[color:var(--os-border)] p-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-sm font-semibold",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this),
                                " Reset"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-1 text-sm opacity-70",
                            children: "Resets local settings and virtual file system."
                        }, void 0, false, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "mt-3 rounded-lg border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5",
                            onClick: async ()=>{
                                if (!confirm("Reset OS data? This will clear files and settings.")) return;
                                localStorage.clear();
                                location.reload();
                            },
                            children: "Reset OS"
                        }, void 0, false, {
                            fileName: "[project]/apps/settings/SettingsApp.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/settings/SettingsApp.tsx",
                    lineNumber: 109,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/apps/settings/SettingsApp.tsx",
            lineNumber: 38,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/apps/settings/SettingsApp.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_s(SettingsApp, "MlIAGuv8oJf2tF/7lLfSCu2vaEM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$osStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOSStore"]
    ];
});
_c = SettingsApp;
var _c;
__turbopack_context__.k.register(_c, "SettingsApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/settings/SettingsApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/settings/SettingsApp.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/lucide-react/dist/esm/icons/paintbrush.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Paintbrush
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "m14.622 17.897-10.68-2.913",
            key: "vj2p1u"
        }
    ],
    [
        "path",
        {
            d: "M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",
            key: "18tc5c"
        }
    ],
    [
        "path",
        {
            d: "M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",
            key: "ytzfxy"
        }
    ]
];
const Paintbrush = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("paintbrush", __iconNode);
;
 //# sourceMappingURL=paintbrush.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/paintbrush.js [app-client] (ecmascript) <export default as Paintbrush>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Paintbrush",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paintbrush$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/paintbrush.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>RefreshCcw
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
            key: "14sxne"
        }
    ],
    [
        "path",
        {
            d: "M3 3v5h5",
            key: "1xhq8a"
        }
    ],
    [
        "path",
        {
            d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16",
            key: "1hlbsb"
        }
    ],
    [
        "path",
        {
            d: "M16 16h5v5",
            key: "ccwih5"
        }
    ]
];
const RefreshCcw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("refresh-ccw", __iconNode);
;
 //# sourceMappingURL=refresh-ccw.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RefreshCcw",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun-moon.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>SunMoon
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 2v2",
            key: "tus03m"
        }
    ],
    [
        "path",
        {
            d: "M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715",
            key: "xlf6rm"
        }
    ],
    [
        "path",
        {
            d: "M16 12a4 4 0 0 0-4-4",
            key: "6vsxu"
        }
    ],
    [
        "path",
        {
            d: "m19 5-1.256 1.256",
            key: "1yg6a6"
        }
    ],
    [
        "path",
        {
            d: "M20 12h2",
            key: "1q8mjw"
        }
    ]
];
const SunMoon = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("sun-moon", __iconNode);
;
 //# sourceMappingURL=sun-moon.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/sun-moon.js [app-client] (ecmascript) <export default as SunMoon>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SunMoon",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2d$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun-moon.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/wallpaper.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Wallpaper
]);
/**
 * @license lucide-react v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M12 17v4",
            key: "1riwvh"
        }
    ],
    [
        "path",
        {
            d: "M8 21h8",
            key: "1ev6f3"
        }
    ],
    [
        "path",
        {
            d: "m9 17 6.1-6.1a2 2 0 0 1 2.81.01L22 15",
            key: "1sl52q"
        }
    ],
    [
        "circle",
        {
            cx: "8",
            cy: "9",
            r: "2",
            key: "gjzl9d"
        }
    ],
    [
        "rect",
        {
            x: "2",
            y: "3",
            width: "20",
            height: "14",
            rx: "2",
            key: "x3v2xh"
        }
    ]
];
const Wallpaper = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("wallpaper", __iconNode);
;
 //# sourceMappingURL=wallpaper.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/wallpaper.js [app-client] (ecmascript) <export default as Wallpaper>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Wallpaper",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallpaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallpaper$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallpaper.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_2d8f4a03._.js.map