(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/ai-assistant/AIAssistantApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AIAssistantApp",
    ()=>AIAssistantApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/store/vfsStore.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
async function askServer(message) {
    const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    });
    if (!res.ok) throw new Error("Request failed");
    return await res.json();
}
function AIAssistantApp({}) {
    _s();
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "AIAssistantApp.useVfsStore[hydrated]": (s)=>s.hydrated
    }["AIAssistantApp.useVfsStore[hydrated]"]);
    const resolve = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "AIAssistantApp.useVfsStore[resolve]": (s)=>s.resolve
    }["AIAssistantApp.useVfsStore[resolve]"]);
    const touch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "AIAssistantApp.useVfsStore[touch]": (s)=>s.touch
    }["AIAssistantApp.useVfsStore[touch]"]);
    const list = (0, __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"])({
        "AIAssistantApp.useVfsStore[list]": (s)=>s.list
    }["AIAssistantApp.useVfsStore[list]"]);
    const [msgs, setMsgs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            role: "assistant",
            text: "Hi — I'm the Web OS assistant. Try: 'list files in /Notes' or 'create note: Shopping List'."
        }
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const bottomRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AIAssistantApp.useEffect": ()=>{
            bottomRef.current?.scrollIntoView({
                block: "end"
            });
        }
    }["AIAssistantApp.useEffect"], [
        msgs,
        busy
    ]);
    const commands = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "AIAssistantApp.useMemo[commands]": ()=>({
                async tryHandle (message) {
                    if (!hydrated) return "File system is still starting up.";
                    const lower = message.toLowerCase();
                    // create note: <title>
                    const m = message.match(/create\s+note\s*:\s*(.+)$/i);
                    if (m?.[1]) {
                        const title = m[1].trim();
                        const notes = resolve("/Notes");
                        if (!notes || notes.type !== "folder") return "Couldn't find /Notes";
                        touch(notes.id, `${title}.md`, `# ${title}\n`);
                        return `Created note '${title}'.`;
                    }
                    // list files in /path
                    const m2 = message.match(/list\s+files\s+in\s+(.+)$/i);
                    if (m2?.[1]) {
                        const path = m2[1].trim();
                        const node = resolve(path);
                        if (!node) return `No such path: ${path}`;
                        if (node.type !== "folder") return `${path} is not a folder.`;
                        const items = list(node.id);
                        return items.length ? items.map({
                            "AIAssistantApp.useMemo[commands]": (n)=>n.type === "folder" ? `${n.name}/` : n.name
                        }["AIAssistantApp.useMemo[commands]"]).join("\n") : "(empty)";
                    }
                    if (lower.includes("help")) {
                        return [
                            "Commands I understand:",
                            "- create note: <title>",
                            "- list files in <absolute path>"
                        ].join("\n");
                    }
                    return null;
                }
            })
    }["AIAssistantApp.useMemo[commands]"], [
        hydrated,
        resolve,
        touch,
        list
    ]);
    async function send() {
        const text = input.trim();
        if (!text || busy) return;
        setInput("");
        setMsgs((m)=>[
                ...m,
                {
                    role: "user",
                    text
                }
            ]);
        const local = await commands.tryHandle(text);
        if (local) {
            setMsgs((m)=>[
                    ...m,
                    {
                        role: "assistant",
                        text: local
                    }
                ]);
            return;
        }
        try {
            setBusy(true);
            const { reply } = await askServer(text);
            setMsgs((m)=>[
                    ...m,
                    {
                        role: "assistant",
                        text: reply
                    }
                ]);
        } catch  {
            setMsgs((m)=>[
                    ...m,
                    {
                        role: "assistant",
                        text: "Sorry — I couldn't reach the assistant service."
                    }
                ]);
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 border-b border-[color:var(--os-border)] px-3 py-2 text-sm font-medium",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    " Assistant"
                ]
            }, void 0, true, {
                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-3",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        msgs.map((m, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `max-w-[85%] rounded-2xl border border-[color:var(--os-border)] px-3 py-2 text-sm whitespace-pre-wrap ${m.role === "user" ? "ml-auto bg-[color:var(--os-accent)]/15" : "bg-black/5 dark:bg-white/5"}`,
                                children: m.text
                            }, idx, false, {
                                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                                lineNumber: 121,
                                columnNumber: 13
                            }, this)),
                        busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-sm opacity-60",
                            children: "Thinking…"
                        }, void 0, false, {
                            fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                            lineNumber: 132,
                            columnNumber: 19
                        }, this) : null,
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            ref: bottomRef
                        }, void 0, false, {
                            fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                    lineNumber: 119,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                lineNumber: 118,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-[color:var(--os-border)] p-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: (e)=>{
                        e.preventDefault();
                        void send();
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "min-w-0 flex-1 rounded-xl border border-[color:var(--os-border)] bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--os-accent)]",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                placeholder: "Ask something…"
                            }, void 0, false, {
                                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                className: "inline-flex items-center gap-2 rounded-xl border border-[color:var(--os-border)] px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/5",
                                disabled: busy,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, this),
                                    "Send"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                                lineNumber: 150,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                    lineNumber: 137,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/ai-assistant/AIAssistantApp.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(AIAssistantApp, "51JTq/FkewGbZjVY60OHpcZrH1c=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"],
        __TURBOPACK__imported__module__$5b$project$5d2f$store$2f$vfsStore$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useVfsStore"]
    ];
});
_c = AIAssistantApp;
var _c;
__turbopack_context__.k.register(_c, "AIAssistantApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/ai-assistant/AIAssistantApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/ai-assistant/AIAssistantApp.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Send
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
            d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
            key: "1ffxy3"
        }
    ],
    [
        "path",
        {
            d: "m21.854 2.147-10.94 10.939",
            key: "12cjpa"
        }
    ]
];
const Send = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("send", __iconNode);
;
 //# sourceMappingURL=send.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Send",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_8556fa37._.js.map