(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/terminal/TerminalApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TerminalApp",
    ()=>TerminalApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/vfsStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/authStore.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/api.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function isFolder(n) {
    return n.type === "folder";
}
function joinPath(base, rel) {
    if (rel.startsWith("/")) return rel;
    const cleanBase = base.endsWith("/") ? base.slice(0, -1) : base;
    return `${cleanBase}/${rel}`.replaceAll("//", "/");
}
function TerminalApp({}) {
    _s();
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[hydrated]": (s)=>s.hydrated
    }["TerminalApp.useVfsStore[hydrated]"]);
    const vfs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[vfs]": (s)=>s.vfs
    }["TerminalApp.useVfsStore[vfs]"]);
    const resolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[resolve]": (s)=>s.resolve
    }["TerminalApp.useVfsStore[resolve]"]);
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[list]": (s)=>s.list
    }["TerminalApp.useVfsStore[list]"]);
    const getPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[getPath]": (s)=>s.getPath
    }["TerminalApp.useVfsStore[getPath]"]);
    const mkdir = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[mkdir]": (s)=>s.mkdir
    }["TerminalApp.useVfsStore[mkdir]"]);
    const touch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[touch]": (s)=>s.touch
    }["TerminalApp.useVfsStore[touch]"]);
    const rm = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "TerminalApp.useVfsStore[rm]": (s)=>s.rm
    }["TerminalApp.useVfsStore[rm]"]);
    const [cwdId, setCwdId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(vfs.rootId);
    const [lines, setLines] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            type: "out",
            text: "web-os terminal — type 'help'"
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TerminalApp.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                block: "end"
            });
        }
    }["TerminalApp.useEffect"], [
        lines
    ]);
    const prompt = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "TerminalApp.useMemo[prompt]": ()=>{
            const p = getPath(cwdId);
            return `guest@webos:${p}$`;
        }
    }["TerminalApp.useMemo[prompt]"], [
        cwdId,
        getPath
    ]);
    function println(text) {
        setLines((l)=>[
                ...l,
                {
                    type: "out",
                    text
                }
            ]);
    }
    const currentUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"])({
        "TerminalApp.useAuthStore[currentUser]": (s)=>s.currentUser
    }["TerminalApp.useAuthStore[currentUser]"]);
    async function run(cmdline) {
        const trimmed = cmdline.trim();
        if (!trimmed) return;
        setLines((l)=>[
                ...l,
                {
                    type: "in",
                    text: `${prompt} ${trimmed}`
                }
            ]);
        const [cmd, ...rest] = trimmed.split(/\s+/);
        const arg = rest.join(" ");
        // Keep some local commands for navigation
        try {
            if (cmd === "clear") {
                setLines([]);
                return;
            }
            if (cmd === "cd") {
                const nextPath = arg ? joinPath(getPath(cwdId), arg) : "/";
                const node = resolve(nextPath);
                if (!node) {
                    println(`cd: no such file or directory: ${arg}`);
                    return;
                }
                if (!isFolder(node)) {
                    println(`cd: not a directory: ${arg}`);
                    return;
                }
                setCwdId(node.id);
                return;
            }
            // Execute remotely on backend
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].workspace.runTerminal(`cd ${getPath(cwdId)} && ${trimmed}`, currentUser?.role || 'guest');
            if (res.stdout) println(res.stdout);
            if (res.stderr) println(res.stderr);
            if (res.error) println(`Error: ${res.error}`);
        } catch (e) {
            println(e.message || "Execution failed");
        }
    }
    if (!hydrated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-4 text-sm opacity-70",
            children: "Booting terminal…"
        }, void 0, false, {
            fileName: "[project]/apps/terminal/TerminalApp.tsx",
            lineNumber: 97,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col bg-black/25 font-mono text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-3",
                children: [
                    lines.map((l, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                            className: `whitespace-pre-wrap leading-5 ${l.type === "in" ? "text-[color:var(--os-fg)]" : "text-white/80"}`,
                            children: l.text
                        }, i, false, {
                            fileName: "[project]/apps/terminal/TerminalApp.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bottomRef
                    }, void 0, false, {
                        fileName: "[project]/apps/terminal/TerminalApp.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/terminal/TerminalApp.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-white/10 p-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: (e)=>{
                        e.preventDefault();
                        run(input);
                        setInput("");
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate text-white/70",
                                children: prompt
                            }, void 0, false, {
                                fileName: "[project]/apps/terminal/TerminalApp.tsx",
                                lineNumber: 122,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "min-w-0 flex-1 rounded-md bg-black/40 px-2 py-1 text-white/90 outline-none focus:ring-2 focus:ring-[color:var(--os-accent)]",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                autoFocus: true,
                                spellCheck: false
                            }, void 0, false, {
                                fileName: "[project]/apps/terminal/TerminalApp.tsx",
                                lineNumber: 123,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/terminal/TerminalApp.tsx",
                        lineNumber: 121,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/terminal/TerminalApp.tsx",
                    lineNumber: 114,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/terminal/TerminalApp.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/terminal/TerminalApp.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_s(TerminalApp, "naBji1SEuh/RCibySFozy8eDfsg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$authStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuthStore"]
    ];
});
_c = TerminalApp;
var _c;
__turbopack_context__.k.register(_c, "TerminalApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/terminal/TerminalApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/terminal/TerminalApp.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=apps_terminal_TerminalApp_tsx_4d52cc7e._.js.map