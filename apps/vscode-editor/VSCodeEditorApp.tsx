'use client';

import {
  FileText, Folder, FolderOpen, Search, GitBranch, Bug, Settings,
  Maximize2, ChevronRight, ChevronDown, X, Save, Code, Play, RefreshCw, 
  Plus, FolderPlus, Trash, Wand2, Terminal, PanelBottom
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import Editor from '@monaco-editor/react';
import { api } from '@/utils/api';
import { useAuthStore } from "@/store/authStore";

interface OpenTab {
  id: string; // path
  name: string;
  path: string;
  content: string;
  language: string;
  saved: boolean;
}

interface TreeNode {
  type: 'file' | 'folder';
  name: string;
  path: string;
  children?: TreeNode[];
}

const LANGUAGES: Record<string, string> = {
  typescript: 'text-blue-400',
  javascript: 'text-yellow-400',
  python: 'text-green-400',
  html: 'text-orange-400',
  css: 'text-purple-400',
  json: 'text-pink-400',
  text: 'text-gray-300'
};

function getLanguageFromExt(filename: string) {
  const ext = filename.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'ts': case 'tsx': return 'typescript';
    case 'js': case 'jsx': return 'javascript';
    case 'py': return 'python';
    case 'html': case 'htm': return 'html';
    case 'css': return 'css';
    case 'json': return 'json';
    default: return 'text';
  }
}

// Minimal missing lucide icon for layout
function Layout(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="9" x2="9" y1="3" y2="21" />
    </svg>
  );
}

const FileTreeItem = ({
  node, onFileClick, onDelete, onContextMenu, onMove
}: {
  node: TreeNode,
  onFileClick: (path: string, name: string) => void,
  onDelete: (path: string) => void,
  onContextMenu: (e: React.MouseEvent, node: TreeNode) => void,
  onMove: (source: string, target: string) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', node.path);
    e.stopPropagation();
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onContextMenu(e, node);
  };

  if (node.type === 'folder') {
    return (
      <div className="text-xs text-[#cccccc]">
        <div
          draggable
          onDragStart={handleDragStart}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDragOver(false);
            const source = e.dataTransfer.getData('text/plain');
            if (source && source !== node.path) {
              onMove(source, node.path);
            }
          }}
          onContextMenu={handleContextMenu}
          className={`flex items-center justify-between px-2 py-1 cursor-pointer group ${isDragOver ? 'bg-[#2a2d2e] ring-1 ring-blue-500' : 'hover:bg-[#37373d]'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center gap-1 overflow-hidden">
            {isOpen ? <ChevronDown className="h-3 w-3 shrink-0" /> : <ChevronRight className="h-3 w-3 shrink-0" />}
            <Folder className="h-4 w-4 text-blue-400 shrink-0" />
            <span className="truncate">{node.name}</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onDelete(node.path); }} className="opacity-0 group-hover:opacity-100 hover:text-red-400 shrink-0" title="Delete folder">
            <Trash className="h-3 w-3" />
          </button>
        </div>
        {isOpen && node.children && (
          <div className="pl-3 border-l border-[#333] ml-2">
            {node.children.map(child => <FileTreeItem key={child.path} node={child} onFileClick={onFileClick} onDelete={onDelete} onContextMenu={onContextMenu} onMove={onMove} />)}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div
        draggable
        onDragStart={handleDragStart}
        onContextMenu={handleContextMenu}
        className="flex items-center justify-between px-2 py-1 hover:bg-[#37373d] cursor-pointer group text-xs text-[#cccccc]"
        onClick={() => onFileClick(node.path, node.name)}
      >
        <div className="flex items-center gap-2 pl-4 overflow-hidden">
          <FileText className={`h-4 w-4 shrink-0 ${LANGUAGES[getLanguageFromExt(node.name)] || 'text-gray-400'}`} />
          <span className="truncate">{node.name}</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onDelete(node.path); }} className="opacity-0 group-hover:opacity-100 hover:text-red-400 shrink-0" title="Delete file">
          <Trash className="h-3 w-3" />
        </button>
      </div>
    );
  }
};

export function VSCodeEditorApp({}: AppComponentProps) {
  const currentUser = useAuthStore((s) => s.currentUser);
  const [fileTree, setFileTree] = useState<TreeNode[]>([]);
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTab, setActiveTab] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showTerminal, setShowTerminal] = useState(false);
  const [previewContent, setPreviewContent] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<{stdout: string, stderr: string, error: string} | null>(null);
  const [selectedPanel, setSelectedPanel] = useState('explorer');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; node: TreeNode } | null>(null);

  // ── Search State ──
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{file: string, line: number, text: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // ── Settings State ──
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [minimapEnabled, setMinimapEnabled] = useState(false);
  const [wordWrap, setWordWrap] = useState<'off'|'on'>('off');
  
  const [terminals, setTerminals] = useState<{id: string, name: string, history: {type: 'cmd'|'out'|'err', text: string}[], input: string}[]>([
    { id: 'term-1', name: 'bash', history: [], input: '' }
  ]);
  const [activeTerminalId, setActiveTerminalId] = useState('term-1');
  const [terminalHeight, setTerminalHeight] = useState(192); // 48 tailwind units = 192px
  const [isDraggingTerminal, setIsDraggingTerminal] = useState(false);

  const handleGlobalClick = () => setContextMenu(null);

  const editorRef = useRef<any>(null);

  const loadTree = async () => {
    try {
      const res = await api.workspace.getTree();
      setFileTree(res.tree || []);
    } catch(e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadTree();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingTerminal) return;
      // Calculate height from bottom
      const newHeight = window.innerHeight - e.clientY - 30; // 30 is roughly the height of the bottom bar
      setTerminalHeight(Math.max(100, Math.min(newHeight, window.innerHeight - 200)));
    };
    const handleMouseUp = () => setIsDraggingTerminal(false);
    
    if (isDraggingTerminal) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingTerminal]);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // Add format on save command (Ctrl+S)
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      saveTab(activeFile?.id || '');
    });

    // Register basic Python autocomplete snippets
    if (!monaco.languages.getLanguages().some((l: any) => l.id === 'python_snippets_added')) {
      monaco.languages.registerCompletionItemProvider('python', {
        provideCompletionItems: (model: any, position: any) => {
          const suggestions = [
            {
              label: 'print',
              kind: monaco.languages.CompletionItemKind.Function,
              insertText: 'print(${1:text})',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Print to console',
            },
            {
              label: 'def',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'def ${1:name}(${2:args}):\n\t${3:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a function',
            },
            {
              label: 'class',
              kind: monaco.languages.CompletionItemKind.Class,
              insertText: 'class ${1:ClassName}:\n\tdef __init__(self):\n\t\t${2:pass}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Define a class',
            },
            {
              label: 'ifmain',
              kind: monaco.languages.CompletionItemKind.Snippet,
              insertText: 'if __name__ == "__main__":\n\t${1:main()}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: 'Main block',
            },
            {
              label: 'import os',
              kind: monaco.languages.CompletionItemKind.Module,
              insertText: 'import os',
              documentation: 'Import the os module',
            },
            {
              label: 'import sys',
              kind: monaco.languages.CompletionItemKind.Module,
              insertText: 'import sys',
              documentation: 'Import the sys module',
            },
            {
              label: 'import',
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: 'import ${1:module}',
              insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            }
          ];
          return { suggestions };
        }
      });
      monaco.languages.register({ id: 'python_snippets_added' });
    }
  };

  const formatCode = async () => {
    if (editorRef.current) {
      await editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await api.workspace.search(searchQuery);
      setSearchResults(res.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const activeFile = openTabs.find((t) => t.id === activeTab);

  const handleOpenFile = async (path: string, name: string) => {
    const existing = openTabs.find((t) => t.id === path);
    if (existing) {
      setActiveTab(path);
      return;
    }

    try {
      const text = await api.workspace.readFile(path);
      const newTab: OpenTab = {
        id: path,
        name,
        path,
        content: text,
        language: getLanguageFromExt(name),
        saved: true,
      };
      setOpenTabs([...openTabs, newTab]);
      setActiveTab(path);
    } catch (e: any) {
      console.error("Failed to load file content", e);
      alert("Failed to load file content");
    }
  };

  const createNewFile = async () => {
    const path = prompt("Enter full path for new file (e.g. src/app.js):");
    if (!path) return;
    try {
      await api.workspace.writeFile(path, "");
      await loadTree();
      handleOpenFile(path, path.split('/').pop() || path);
    } catch (e: any) {
      alert("Failed to create file: " + e.message);
    }
  };

  const createNewFolder = async () => {
    const path = prompt("Enter full path for new folder (e.g. src/components):");
    if (!path) return;
    try {
      await api.workspace.createFolder(path);
      await loadTree();
    } catch (e: any) {
      alert("Failed to create folder: " + e.message);
    }
  };

  const deletePath = async (path: string) => {
    if (!confirm(`Are you sure you want to delete ${path}?`)) return;
    try {
      await api.workspace.deletePath(path);
      closeTab(path);
      await loadTree();
    } catch (e: any) {
      alert("Failed to delete: " + e.message);
    }
  };

  const handleMove = async (source: string, targetFolder: string) => {
    const filename = source.split('/').pop();
    const newPath = targetFolder + '/' + filename;
    try {
      await api.workspace.renamePath(source, newPath);
      await loadTree();
    } catch (e: any) {
      alert("Failed to move: " + e.message);
    }
  };

  const renamePath = async (oldPath: string) => {
    const newPath = prompt("Enter new path:", oldPath);
    if (!newPath || newPath === oldPath) return;
    try {
      await api.workspace.renamePath(oldPath, newPath);
      await loadTree();
      // If it was open, close it since the path changed (or we could update the tab)
      closeTab(oldPath);
    } catch (e: any) {
      alert("Failed to rename: " + e.message);
    }
  };

  const closeTab = (id: string) => {
    const newTabs = openTabs.filter((t) => t.id !== id);
    setOpenTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    } else if (newTabs.length === 0) {
      setActiveTab('');
      setShowPreview(false);
    }
  };

  const updateTab = (id: string, content: string | undefined) => {
    if (content === undefined) return;
    setOpenTabs(
      openTabs.map((t) =>
        t.id === id ? { ...t, content, saved: false } : t
      )
    );
  };

  const saveTab = async (id: string) => {
    const tab = openTabs.find(t => t.id === id);
    if (!tab) return;

    try {
      let finalContent = tab.content;
      if (activeTab === id && editorRef.current) {
        // Auto format before save
        await editorRef.current.getAction('editor.action.formatDocument')?.run();
        finalContent = editorRef.current.getValue();
        updateTab(id, finalContent);
      }

      await api.workspace.writeFile(tab.path, finalContent);
      
      setOpenTabs(openTabs.map(t => t.id === id ? { ...t, content: finalContent, saved: true } : t));
    } catch (e: any) {
      console.error("Save failed", e);
      alert("Save failed: " + (e.message || e.toString()));
    }
  };

  const runCode = async () => {
    if (!activeFile) return;
    
    if (activeFile.language === 'html') {
      setPreviewContent(activeFile.content);
      setShowPreview(true);
      setShowTerminal(false);
    } else {
      try {
        setShowTerminal(true);
        setShowPreview(false);
        if (!activeFile.saved) {
          await saveTab(activeFile.id);
        }
        const result = await api.workspace.runCode(activeFile.path, currentUser?.role || 'guest');
        
        setTerminals(prev => prev.map(t => t.id === activeTerminalId ? {
          ...t,
          history: [
            ...t.history,
            { type: 'cmd' as const, text: `> run ${activeFile.path}` },
            ...(result.stdout ? [{ type: 'out' as const, text: result.stdout }] : []),
            ...(result.stderr ? [{ type: 'err' as const, text: result.stderr }] : []),
            ...(result.error ? [{ type: 'err' as const, text: result.error }] : [])
          ]
        } : t));
      } catch (e: any) {
        setTerminals(prev => prev.map(t => t.id === activeTerminalId ? {
          ...t,
          history: [...t.history, { type: 'err', text: e.message }]
        } : t));
      }
    }
  };

  const handleTerminalSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    const activeTerm = terminals.find(t => t.id === activeTerminalId);
    if (!activeTerm) return;

    if (e.key === 'Enter' && activeTerm.input.trim()) {
      const cmd = activeTerm.input.trim();
      
      setTerminals(prev => prev.map(t => t.id === activeTerminalId ? {
        ...t,
        input: '',
        history: [...t.history, { type: 'cmd', text: `C:\\workspace> ${cmd}` }]
      } : t));

      try {
        const res = await api.workspace.runTerminal(cmd, currentUser?.role || 'guest');
        setTerminals(prev => prev.map(t => t.id === activeTerminalId ? {
          ...t,
          history: [
            ...t.history,
            { type: 'cmd' as const, text: `> ${cmd}` },
            ...(res.stdout ? [{ type: 'out' as const, text: res.stdout }] : []),
            ...(res.stderr ? [{ type: 'err' as const, text: res.stderr }] : []),
            ...(res.error ? [{ type: 'err' as const, text: res.error }] : [])
          ],
        } : t));
      } catch (err: any) {
        setTerminals(prev => prev.map(t => t.id === activeTerminalId ? {
          ...t,
          history: [...t.history, { type: 'err' as const, text: err.message }]
        } : t));
      }
    }
  };

  return (
    <div className="flex h-full bg-[#1e1e1e] text-[#cccccc] font-sans relative" onClick={handleGlobalClick}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 border-r border-[#333333] bg-[#252526] flex flex-col shrink-0">
          {/* Activity Bar */}
          <div className="flex gap-1 p-2 border-b border-[#333333]">
            <button
              onClick={() => setSelectedPanel('explorer')}
              className={`p-2 rounded ${selectedPanel === 'explorer' ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
              title="Explorer"
            >
              <Folder className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('search')}
              className={`p-2 rounded ${selectedPanel === 'search' ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('git')}
              className={`p-2 rounded ${selectedPanel === 'git' ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
              title="Source Control"
            >
              <GitBranch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('settings')}
              className={`p-2 rounded ${selectedPanel === 'settings' ? 'bg-[#37373d]' : 'hover:bg-[#2a2d2e]'}`}
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto">
            {selectedPanel === 'explorer' && (
              <div className="p-2">
                <div className="flex items-center justify-between px-2 mb-2">
                  <h3 className="text-xs font-semibold text-gray-400 uppercase">Explorer</h3>
                  <div className="flex gap-1">
                    <button onClick={createNewFile} className="hover:text-white" title="New File">
                      <Plus className="h-4 w-4" />
                    </button>
                    <button onClick={createNewFolder} className="hover:text-white" title="New Folder">
                      <FolderPlus className="h-4 w-4" />
                    </button>
                    <button onClick={() => loadTree()} className="hover:text-white" title="Refresh">
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto py-2">
                  {fileTree.map((node) => (
                    <FileTreeItem 
                      key={node.path} 
                      node={node} 
                      onFileClick={handleOpenFile} 
                      onDelete={deletePath} 
                      onContextMenu={(e, n) => setContextMenu({ x: e.clientX, y: e.clientY, node: n })}
                      onMove={handleMove}
                    />
                  ))}
                  {fileTree.length === 0 && (
                    <div className="px-2 py-4 text-gray-500 text-center opacity-70">
                      Workspace is empty.
                    </div>
                  )}
                </div>
              </div>
            )}
            {selectedPanel === 'search' && (
              <div className="p-2 flex flex-col h-full">
                <h3 className="text-xs font-semibold text-gray-400 uppercase px-2 mb-2">Search</h3>
                <form onSubmit={handleSearch} className="px-2 mb-2 flex gap-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search files..."
                    className="flex-1 bg-[#3c3c3c] text-white text-xs px-2 py-1 rounded outline-none border border-transparent focus:border-[#007fd4]"
                  />
                  <button type="submit" disabled={isSearching} className="bg-[#3c3c3c] hover:bg-[#4d4d4d] px-2 rounded text-xs flex items-center justify-center">
                    <Search className="h-3 w-3" />
                  </button>
                </form>
                <div className="flex-1 overflow-auto px-2">
                  {isSearching ? (
                    <div className="text-xs text-gray-500 mt-2">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="text-xs">
                      {searchResults.map((res, i) => (
                        <div key={i} onClick={() => handleOpenFile(res.file, res.file.split('/').pop() || '')} className="py-1 cursor-pointer hover:bg-[#37373d] rounded px-1 mb-1">
                          <div className="text-blue-400 font-medium truncate">{res.file} <span className="text-gray-500 text-[10px]">:{res.line}</span></div>
                          <div className="text-gray-400 truncate opacity-80 pl-2">{res.text}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    searchQuery && <div className="text-xs text-gray-500 mt-2">No results found.</div>
                  )}
                </div>
              </div>
            )}
            
            {selectedPanel === 'settings' && (
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase px-2 mb-4">Settings</h3>
                <div className="px-2 space-y-4">
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Theme</label>
                    <select value={editorTheme} onChange={e => setEditorTheme(e.target.value)} className="w-full bg-[#3c3c3c] text-xs p-1 rounded border border-[#3c3c3c] outline-none">
                      <option value="vs-dark">Dark (Visual Studio)</option>
                      <option value="light">Light (Visual Studio)</option>
                      <option value="hc-black">High Contrast Black</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-300 block mb-1">Font Size: {fontSize}px</label>
                    <input type="range" min="10" max="24" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full accent-[#007fd4]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-300">Minimap</label>
                    <input type="checkbox" checked={minimapEnabled} onChange={e => setMinimapEnabled(e.target.checked)} className="accent-[#007fd4]" />
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-gray-300">Word Wrap</label>
                    <input type="checkbox" checked={wordWrap === 'on'} onChange={e => setWordWrap(e.target.checked ? 'on' : 'off')} className="accent-[#007fd4]" />
                  </div>
                </div>
              </div>
            )}

            {selectedPanel === 'git' && (
              <div className="p-4 text-center text-gray-500">
                <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-20" />
                <p className="text-xs">Source Control (Mock)</p>
                <p className="text-[10px] mt-2 opacity-60">Git integration not available</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Title Bar */}
        <div className="bg-[#333333] px-4 py-2 flex items-center justify-between select-none border-b border-[#2d2d2d] shrink-0">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-400" />
            <span className="font-semibold text-sm">VS Code Editor</span>
          </div>
          <div className="flex items-center gap-2">
             <button
              onClick={runCode}
              disabled={!activeFile}
              className="flex items-center gap-1 px-3 py-1 bg-[#04395e] hover:bg-[#064e82] disabled:opacity-30 rounded text-xs font-medium transition"
            >
              <Play className="h-3 w-3 text-green-400" />
              Run
            </button>
            <button
              onClick={() => { setShowTerminal(!showTerminal); setShowPreview(false); }}
              className="p-1 hover:bg-[#444] rounded transition"
              title="Toggle Terminal"
            >
              <Terminal className="h-4 w-4" />
            </button>
            <button
              onClick={() => { setShowPreview(!showPreview); setShowTerminal(false); }}
              className="p-1 hover:bg-[#444] rounded transition"
              title="Toggle Preview Pane"
            >
              <Layout className="h-4 w-4" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-[#444] rounded transition"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        {openTabs.length > 0 && (
          <div className="bg-[#2d2d2d] flex overflow-x-auto select-none shrink-0">
            {openTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer group border-r border-[#1e1e1e] ${
                  activeTab === tab.id
                    ? 'bg-[#1e1e1e] text-white border-t border-t-blue-500'
                    : 'bg-[#2d2d2d] hover:bg-[#2d2d2d]/80 text-gray-400'
                }`}
                style={{ minWidth: 120, borderTopWidth: activeTab === tab.id ? 2 : 0 }}
              >
                <FileText className={`h-4 w-4 shrink-0 ${LANGUAGES[tab.language] || 'text-gray-400'}`} />
                <span className="text-sm truncate flex-1">{tab.name}</span>
                <div className="flex items-center justify-center w-5 h-5 shrink-0">
                  {!tab.saved ? (
                    <span className="text-white text-[10px] group-hover:hidden">●</span>
                  ) : null}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(tab.id);
                    }}
                    className={`p-1 rounded hover:bg-[#444] ${!tab.saved ? 'hidden group-hover:block' : 'opacity-0 group-hover:opacity-100'}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editor & Preview Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="flex-1 flex overflow-hidden">
            {activeFile ? (
              <>
                {/* Monaco Editor */}
                <div className="flex-1 flex flex-col relative h-full w-full">
                  {/* Editor Toolbar */}
                  <div className="absolute top-2 right-4 z-10 flex gap-2">
                    <button
                      onClick={formatCode}
                      className="flex items-center gap-1 px-2 py-1 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded text-xs shadow-md transition-opacity duration-200 border border-[#333]"
                    >
                      <Wand2 className="h-3 w-3" />
                      Format
                    </button>
                    <button
                      onClick={() => saveTab(activeFile.id)}
                      disabled={activeFile.saved}
                      className="flex items-center gap-1 px-2 py-1 bg-[#0e639c] hover:bg-[#1177bb] disabled:opacity-50 disabled:pointer-events-none rounded text-xs shadow-md transition-opacity duration-200"
                    >
                      <Save className="h-3 w-3" />
                      Save
                    </button>
                  </div>

                  <Editor
                    height="100%"
                    theme={editorTheme}
                    path={activeFile.path}
                    defaultLanguage={activeFile.language}
                    value={activeFile.content}
                    onChange={(val) => updateTab(activeFile.id, val)}
                    onMount={handleEditorDidMount}
                    options={{
                      minimap: { enabled: minimapEnabled },
                      fontSize: fontSize,
                      wordWrap: wordWrap,
                      formatOnPaste: true,
                      padding: { top: 16 },
                      automaticLayout: true,
                      suggestOnTriggerCharacters: true,
                      quickSuggestions: true,
                    }}
                  />
                </div>

                {/* Live Preview Panel */}
                {showPreview && (
                  <div className="w-1/2 border-l border-[#333333] bg-white flex flex-col relative shrink-0">
                    <div className="bg-[#2d2d2d] px-3 py-2 flex items-center justify-between text-xs text-gray-300">
                      <span className="font-semibold flex items-center gap-2"><Play className="h-3 w-3"/> Live Preview</span>
                      <button onClick={() => runCode()} className="hover:text-white"><RefreshCw className="h-3 w-3" /></button>
                    </div>
                    <iframe 
                      title="preview"
                      srcDoc={previewContent}
                      className="flex-1 w-full bg-white border-none"
                      sandbox="allow-scripts allow-same-origin"
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center w-full h-full text-center">
                <div>
                  <Code className="h-16 w-16 mx-auto mb-4 opacity-10 text-gray-500" />
                  <p className="text-gray-500 text-lg mb-2 font-light">No file selected</p>
                  <p className="text-gray-600 text-sm">Create a new file or select one from Explorer</p>
                </div>
              </div>
            )}
          </div>

          {/* Terminal Panel */}
          {showTerminal && (
            <div style={{ height: terminalHeight }} className="border-t border-[#333] bg-[#1e1e1e] flex flex-col relative shrink-0">
              {/* Drag Handle */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 cursor-row-resize z-10 hover:bg-[#007acc] transition-colors"
                onMouseDown={() => setIsDraggingTerminal(true)}
              />
              <div className="bg-[#2d2d2d] px-3 py-1 flex items-center justify-between text-xs text-gray-300 select-none">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {terminals.map(term => (
                    <div 
                      key={term.id}
                      onClick={() => setActiveTerminalId(term.id)}
                      className={`px-3 py-1 cursor-pointer border-t-2 ${activeTerminalId === term.id ? 'border-[#007acc] bg-[#1e1e1e] text-white' : 'border-transparent text-gray-400 hover:bg-[#333]'}`}
                    >
                      {term.name}
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const id = `term-${Date.now()}`;
                      setTerminals(prev => [...prev, { id, name: `bash`, history: [], input: '' }]);
                      setActiveTerminalId(id);
                    }}
                    className="hover:text-white p-1 ml-1"
                    title="New Terminal"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setTerminals(prev => prev.map(t => t.id === activeTerminalId ? { ...t, history: [] } : t))} className="hover:text-white p-1" title="Clear Terminal">
                    <Trash className="h-3 w-3" />
                  </button>
                  <button onClick={() => {
                    if (terminals.length > 1) {
                      const filtered = terminals.filter(t => t.id !== activeTerminalId);
                      setTerminals(filtered);
                      setActiveTerminalId(filtered[0].id);
                    } else {
                      setShowTerminal(false);
                    }
                  }} className="hover:text-white p-1" title="Close Terminal">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-3 font-mono text-[12px] whitespace-pre-wrap flex flex-col">
                {terminals.find(t => t.id === activeTerminalId)?.history.map((item, i) => (
                  <div key={i} className={`mb-1 ${item.type === 'cmd' ? 'text-blue-300' : item.type === 'err' ? 'text-red-400' : 'text-gray-300'}`}>
                    {item.text}
                  </div>
                ))}
                <div className="flex items-center mt-2 text-gray-300">
                  <span className="text-green-400 mr-2">C:\workspace&gt;</span>
                  <input
                    type="text"
                    value={terminals.find(t => t.id === activeTerminalId)?.input || ''}
                    onChange={(e) => setTerminals(prev => prev.map(t => t.id === activeTerminalId ? { ...t, input: e.target.value } : t))}
                    onKeyDown={handleTerminalSubmit}
                    className="flex-1 bg-transparent outline-none border-none text-gray-300"
                    autoFocus
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom Bar */}
        <div className="bg-[#007acc] px-3 py-1 flex items-center justify-between text-xs text-white select-none shrink-0">
          <div className="flex items-center gap-3">
            <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition">
              <GitBranch className="h-3 w-3 inline mr-1" /> main*
            </span>
            <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition">
              <X className="h-3 w-3 inline mr-1" /> 0 
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition">UTF-8</span>
            <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition">
               {activeFile ? activeFile.language.toUpperCase() : 'Plain Text'}
            </span>
            <span className="hover:bg-white/20 px-2 py-0.5 rounded cursor-pointer transition">WebOS Desktop</span>
          </div>
        </div>
      </div>
      {/* Context Menu Overlay */}
      {contextMenu && (
        <div 
          className="fixed bg-[#252526] border border-[#454545] shadow-lg rounded py-1 z-50 text-[#cccccc] text-sm"
          style={{ top: contextMenu.y, left: contextMenu.x, minWidth: 160 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div 
            className="px-4 py-1.5 hover:bg-[#094771] hover:text-white cursor-pointer"
            onClick={() => { renamePath(contextMenu.node.path); setContextMenu(null); }}
          >
            Rename
          </div>
          <div 
            className="px-4 py-1.5 hover:bg-[#094771] hover:text-white cursor-pointer text-red-400"
            onClick={() => { deletePath(contextMenu.node.path); setContextMenu(null); }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}
