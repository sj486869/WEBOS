(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdvancedTerminalApp",
    ()=>AdvancedTerminalApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const COMMON_COMMANDS = [
    {
        cmd: 'whoami',
        desc: 'Current user'
    },
    {
        cmd: 'pwd',
        desc: 'Current directory'
    },
    {
        cmd: 'node --version',
        desc: 'Node.js version'
    },
    {
        cmd: 'npm --version',
        desc: 'NPM version'
    },
    {
        cmd: 'python --version',
        desc: 'Python version'
    },
    {
        cmd: 'git --version',
        desc: 'Git version'
    },
    {
        cmd: 'date',
        desc: 'Current date/time'
    },
    {
        cmd: 'echo "Hello from Terminal"',
        desc: 'Echo command'
    }
];
function readCommandHistory() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const saved = localStorage.getItem('terminal-history');
        return saved ? JSON.parse(saved) : [];
    } catch (err) {
        console.error('Failed to load terminal history:', err);
        return [];
    }
}
function AdvancedTerminalApp({}) {
    _s();
    const [commands, setCommands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [inputHistory, setInputHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(readCommandHistory);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [showQuickCommands, setShowQuickCommands] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const terminalEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto scroll to bottom
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdvancedTerminalApp.useEffect": ()=>{
            terminalEndRef.current?.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }["AdvancedTerminalApp.useEffect"], [
        commands
    ]);
    const saveHistory = (newHistory)=>{
        setInputHistory(newHistory);
        localStorage.setItem('terminal-history', JSON.stringify(newHistory));
    };
    const simulateCommandExecution = (cmd)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>{
                // Simulate different command outputs
                if (cmd === 'whoami') {
                    resolve('suman_jana');
                } else if (cmd === 'pwd') {
                    resolve('C:\\Users\\Suman Jana\\Desktop\\web-os-desktop');
                } else if (cmd === 'node --version') {
                    resolve('v18.16.0');
                } else if (cmd === 'npm --version') {
                    resolve('9.6.7');
                } else if (cmd === 'python --version') {
                    resolve('Python 3.11.0');
                } else if (cmd === 'git --version') {
                    resolve('git version 2.40.0.windows.1');
                } else if (cmd === 'date') {
                    resolve(new Date().toString());
                } else if (cmd.startsWith('echo ')) {
                    resolve(cmd.substring(5).replace(/"/g, ''));
                } else if (cmd === 'ls' || cmd === 'dir') {
                    resolve('apps\nbackend\npublic\ncomponents\ncore\nstore\nutils\npackage.json\ntsconfig.json');
                } else if (cmd === 'clear' || cmd === 'cls') {
                    setCommands([]);
                    resolve('');
                } else if (cmd === 'help') {
                    resolve(`Available Commands:
- whoami: Show current user
- pwd: Print working directory
- date: Show current date/time
- echo [text]: Echo text
- ls/dir: List directory contents
- clear/cls: Clear terminal
- help: Show this help
- node --version: Node version
- npm --version: NPM version
- python --version: Python version
- git --version: Git version`);
                } else {
                    resolve(`Command executed: ${cmd}\n(Note: Terminal is simulated in browser)`);
                }
            }, 800);
        });
    };
    const handleExecuteCommand = async ()=>{
        if (!input.trim()) return;
        // Add to history
        const newHistory = [
            {
                text: input,
                timestamp: Date.now()
            },
            ...inputHistory
        ].slice(0, 100);
        saveHistory(newHistory);
        setHistoryIndex(-1);
        const commandId = Date.now().toString();
        const newCommand = {
            id: commandId,
            text: input,
            output: '',
            timestamp: Date.now(),
            status: 'executing'
        };
        setCommands((prev)=>[
                ...prev,
                newCommand
            ]);
        setInput('');
        setShowQuickCommands(false);
        try {
            const output = await simulateCommandExecution(input);
            setCommands((prev)=>prev.map((cmd)=>cmd.id === commandId ? {
                        ...cmd,
                        output,
                        status: 'success'
                    } : cmd));
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Unknown error';
            setCommands((prev)=>prev.map((cmd)=>cmd.id === commandId ? {
                        ...cmd,
                        output: `Error: ${errorMsg}`,
                        status: 'error'
                    } : cmd));
        }
    };
    const handleHistoryUp = ()=>{
        if (inputHistory.length === 0) return;
        let newIndex = historyIndex + 1;
        if (newIndex >= inputHistory.length) {
            newIndex = inputHistory.length - 1;
        }
        setHistoryIndex(newIndex);
        setInput(inputHistory[newIndex].text);
    };
    const handleHistoryDown = ()=>{
        if (historyIndex <= 0) {
            setHistoryIndex(-1);
            setInput('');
        } else {
            const newIndex = historyIndex - 1;
            setHistoryIndex(newIndex);
            setInput(inputHistory[newIndex].text);
        }
    };
    const handleClearTerminal = ()=>{
        if (confirm('Clear all terminal history?')) {
            setCommands([]);
        }
    };
    const handleCopyCommand = (cmd)=>{
        navigator.clipboard.writeText(cmd);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full flex-col bg-black text-green-400 font-mono",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-green-700 bg-gray-900 px-4 py-3 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-semibold flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                className: "h-5 w-5"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            "Advanced Terminal"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleClearTerminal,
                        className: "flex items-center gap-2 px-3 py-1 text-red-400 hover:text-red-300 border border-red-900 rounded text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trash2$3e$__["Trash2"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            "Clear"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                lineNumber: 188,
                columnNumber: 7
            }, this),
            showQuickCommands && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-green-700 bg-gray-900 p-3 grid grid-cols-2 gap-2 max-h-[150px] overflow-auto",
                children: COMMON_COMMANDS.map((cmd, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setInput(cmd.cmd);
                            setShowQuickCommands(false);
                            inputRef.current?.focus();
                        },
                        className: "text-left p-2 rounded border border-green-700 hover:bg-green-900/20 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-semibold text-green-400",
                                children: cmd.cmd
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 215,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "opacity-60 text-green-600",
                                children: cmd.desc
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 216,
                                columnNumber: 15
                            }, this)
                        ]
                    }, idx, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 206,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                lineNumber: 204,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto p-4 space-y-3 bg-black",
                children: [
                    commands.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-green-600 opacity-60 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "$ Advanced Terminal"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Type 'help' for available commands"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Or press Ctrl+Space to see quick commands"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    commands.map((cmd)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-600",
                                                    children: "$"
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-green-400",
                                                    children: cmd.text
                                                }, void 0, false, {
                                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleCopyCommand(cmd.text),
                                            className: "opacity-0 hover:opacity-100 text-green-600 transition",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                className: "h-3 w-3"
                                            }, void 0, false, {
                                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                                lineNumber: 244,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                            lineNumber: 240,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                cmd.status === 'executing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-green-600 opacity-60 ml-6 text-sm animate-pulse",
                                    children: "⌛ Executing..."
                                }, void 0, false, {
                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                    lineNumber: 250,
                                    columnNumber: 15
                                }, this),
                                cmd.output && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                    className: "text-green-400 ml-6 text-sm whitespace-pre-wrap break-words",
                                    children: cmd.output
                                }, void 0, false, {
                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                    lineNumber: 255,
                                    columnNumber: 15
                                }, this),
                                cmd.status === 'error' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-red-400 ml-6 text-sm",
                                    children: cmd.output
                                }, void 0, false, {
                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, cmd.id, true, {
                            fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: terminalEndRef
                    }, void 0, false, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 265,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-t border-green-700 bg-black p-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-green-600",
                                children: "$"
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 271,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: inputRef,
                                type: "text",
                                value: input,
                                onChange: (e)=>setInput(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Enter') {
                                        handleExecuteCommand();
                                    } else if (e.key === 'ArrowUp') {
                                        e.preventDefault();
                                        handleHistoryUp();
                                    } else if (e.key === 'ArrowDown') {
                                        e.preventDefault();
                                        handleHistoryDown();
                                    } else if (e.ctrlKey && e.code === 'Space') {
                                        e.preventDefault();
                                        setShowQuickCommands(!showQuickCommands);
                                    }
                                },
                                placeholder: "Enter command... (Ctrl+Space for quick commands)",
                                className: "flex-1 bg-black text-green-400 outline-none border-none",
                                autoFocus: true
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExecuteCommand,
                                className: "text-green-600 hover:text-green-400 transition",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                    className: "h-4 w-4"
                                }, void 0, false, {
                                    fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                                lineNumber: 295,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 270,
                        columnNumber: 9
                    }, this),
                    inputHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-green-600 opacity-50 mt-2",
                        children: [
                            "History: ",
                            inputHistory.length,
                            " commands | Use ↑↓ to navigate"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                        lineNumber: 305,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
                lineNumber: 269,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_s(AdvancedTerminalApp, "gaF70nRxJukyvLbeU7+KbJDRUCo=");
_c = AdvancedTerminalApp;
var _c;
__turbopack_context__.k.register(_c, "AdvancedTerminalApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/apps/advanced-terminal/AdvancedTerminalApp.tsx [app-client] (ecmascript)"));
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "__iconNode",
    ()=>__iconNode,
    "default",
    ()=>Trash2
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
            d: "M10 11v6",
            key: "nco0om"
        }
    ],
    [
        "path",
        {
            d: "M14 11v6",
            key: "outv1u"
        }
    ],
    [
        "path",
        {
            d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
            key: "miytrc"
        }
    ],
    [
        "path",
        {
            d: "M3 6h18",
            key: "d0wm0j"
        }
    ],
    [
        "path",
        {
            d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
            key: "e791ji"
        }
    ]
];
const Trash2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("trash-2", __iconNode);
;
 //# sourceMappingURL=trash-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) <export default as Trash2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Trash2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_55ccce5b._.js.map