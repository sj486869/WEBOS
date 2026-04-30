'use client';

import {
  FileText,
  Folder,
  FolderOpen,
  Search,
  GitBranch,
  Bug,
  Settings,
  Maximize2,
  ChevronRight,
  X,
  Save,
  Code,
} from 'lucide-react';
import { useState, useRef } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
  language?: string;
  isOpen?: boolean;
}

interface OpenTab {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  saved: boolean;
}

const INITIAL_FILES: FileNode[] = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    isOpen: true,
    children: [
      {
        id: '1-1',
        name: 'app.tsx',
        type: 'file',
        language: 'typescript',
        content: `import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-white">Welcome to VS Code</h1>
      </div>
    </div>
  );
}`,
      },
      {
        id: '1-2',
        name: 'utils.ts',
        type: 'file',
        language: 'typescript',
        content: `// Utility functions

export function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}`,
      },
    ],
  },
  {
    id: '2',
    name: 'public',
    type: 'folder',
    children: [
      {
        id: '2-1',
        name: 'index.html',
        type: 'file',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VS Code Editor</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>`,
      },
    ],
  },
  {
    id: '3',
    name: 'package.json',
    type: 'file',
    language: 'json',
    content: `{
  "name": "web-os-desktop",
  "version": "1.0.0",
  "description": "Full-featured web-based operating system",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "zustand": "^4.4.0"
  }
}`,
  },
];

const LANGUAGES: Record<string, string> = {
  typescript: 'text-blue-400',
  javascript: 'text-yellow-400',
  python: 'text-green-400',
  html: 'text-orange-400',
  css: 'text-purple-400',
  json: 'text-pink-400',
};

export function VSCodeEditorApp({}: AppComponentProps) {
  const [files] = useState<FileNode[]>(INITIAL_FILES);
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([
    {
      id: '1-1',
      name: 'app.tsx',
      path: 'src/app.tsx',
      content: INITIAL_FILES[0].children?.[0].content || '',
      language: 'typescript',
      saved: true,
    },
  ]);
  const [activeTab, setActiveTab] = useState('1-1');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState('explorer');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', '2']));
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const activeFile = openTabs.find((t) => t.id === activeTab);

  const toggleFolder = (id: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedFolders(newExpanded);
  };

  const openFile = (node: FileNode, path: string = '') => {
    if (node.type === 'file') {
      const fullPath = path ? `${path}/${node.name}` : node.name;
      const existing = openTabs.find((t) => t.id === node.id);

      if (existing) {
        setActiveTab(node.id);
      } else {
        const newTab: OpenTab = {
          id: node.id,
          name: node.name,
          path: fullPath,
          content: node.content || '',
          language: node.language || 'typescript',
          saved: true,
        };
        setOpenTabs([...openTabs, newTab]);
        setActiveTab(node.id);
      }
    }
  };

  const renderFileTree = (nodes: FileNode[], parentPath: string = '') => {
    return nodes.map((node) => {
      const isExpanded = expandedFolders.has(node.id);
      const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;

      return (
        <div key={node.id}>
          <div
            className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700/50 cursor-pointer group text-sm"
            onClick={() => {
              if (node.type === 'folder') toggleFolder(node.id);
              else openFile(node, parentPath);
            }}
          >
            {node.type === 'folder' ? (
              <>
                <ChevronRight
                  className={`h-4 w-4 transition ${isExpanded ? 'rotate-90' : ''}`}
                />
                <FolderOpen className="h-4 w-4 text-yellow-500" />
              </>
            ) : (
              <>
                <div className="w-4" />
                <FileText className={`h-4 w-4 ${LANGUAGES[node.language || 'typescript'] || 'text-gray-400'}`} />
              </>
            )}
            <span className="flex-1">{node.name}</span>
          </div>

          {node.type === 'folder' && isExpanded && node.children && (
            <div className="ml-2">{renderFileTree(node.children, fullPath)}</div>
          )}
        </div>
      );
    });
  };

  const closeTab = (id: string) => {
    const newTabs = openTabs.filter((t) => t.id !== id);
    setOpenTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[0].id);
    }
  };

  const updateTab = (id: string, content: string) => {
    setOpenTabs(
      openTabs.map((t) =>
        t.id === id ? { ...t, content, saved: false } : t
      )
    );
  };

  const saveTab = (id: string) => {
    setOpenTabs(
      openTabs.map((t) =>
        t.id === id ? { ...t, saved: true } : t
      )
    );
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-200">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 border-r border-gray-700 bg-gray-900 flex flex-col">
          {/* Activity Bar */}
          <div className="flex gap-1 p-2 border-b border-gray-700">
            <button
              onClick={() => setSelectedPanel('explorer')}
              className={`p-2 rounded ${selectedPanel === 'explorer' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              title="Explorer"
            >
              <Folder className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('search')}
              className={`p-2 rounded ${selectedPanel === 'search' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              title="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('git')}
              className={`p-2 rounded ${selectedPanel === 'git' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              title="Source Control"
            >
              <GitBranch className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('debug')}
              className={`p-2 rounded ${selectedPanel === 'debug' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              title="Debug"
            >
              <Bug className="h-5 w-5" />
            </button>
            <button
              onClick={() => setSelectedPanel('settings')}
              className={`p-2 rounded ${selectedPanel === 'settings' ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
              title="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-auto">
            {selectedPanel === 'explorer' && (
              <div className="p-2">
                <h3 className="text-xs font-semibold text-gray-400 mb-2 px-2">EXPLORER</h3>
                <div className="text-xs text-gray-300">{renderFileTree(files)}</div>
              </div>
            )}
            {selectedPanel === 'search' && (
              <div className="p-4 text-center text-gray-500">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Search functionality</p>
              </div>
            )}
            {selectedPanel === 'git' && (
              <div className="p-4 text-center text-gray-500">
                <GitBranch className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Git integration</p>
              </div>
            )}
            {selectedPanel === 'debug' && (
              <div className="p-4 text-center text-gray-500">
                <Bug className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Debugger</p>
              </div>
            )}
            {selectedPanel === 'settings' && (
              <div className="p-4 text-center text-gray-500">
                <Settings className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Settings</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Title Bar */}
        <div className="border-b border-gray-700 bg-gray-900 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">VS Code</span>
            {activeFile && <span className="text-gray-500">• {activeFile.path}</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-gray-800 rounded"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700 bg-gray-900 flex overflow-x-auto">
          {openTabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer group transition ${
                activeTab === tab.id
                  ? 'bg-gray-800 border-b-2 border-blue-500'
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <FileText className={`h-4 w-4 ${LANGUAGES[tab.language] || 'text-gray-400'}`} />
              <span className="text-sm">{tab.name}</span>
              {!tab.saved && <span className="text-white text-xs">●</span>}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-500"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Editor Area */}
        <div className={`flex-1 flex flex-col overflow-hidden ${showTerminal ? 'flex-1' : ''}`}>
          {activeFile ? (
            <>
              {/* Editor Toolbar */}
              <div className="border-b border-gray-700 bg-gray-900 px-4 py-2 flex items-center justify-between text-sm">
                <div className="text-xs text-gray-500">
                  Ln {activeFile.content.split('\n').length} • Col{' '}
                  {activeFile.content.split('\n').pop()?.length || 0}
                </div>
                <div className="flex gap-2">
                  <select className="bg-gray-800 text-xs p-1 rounded border border-gray-700">
                    <option>{activeFile.language.toUpperCase()}</option>
                  </select>
                  <button
                    onClick={() => saveTab(activeFile.id)}
                    disabled={activeFile.saved}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded text-xs"
                  >
                    <Save className="h-3 w-3" />
                    Save
                  </button>
                </div>
              </div>

              {/* Code Editor */}
              <div className="flex-1 overflow-hidden flex">
                <textarea
                  value={activeFile.content}
                  onChange={(e) => updateTab(activeFile.id, e.target.value)}
                  className="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-4 resize-none focus:outline-none"
                  spellCheck="false"
                />

                {/* Mini Map */}
                <div className="w-16 bg-gray-900 border-l border-gray-700 opacity-20">
                  {/* Simplified minimap - just a visual placeholder */}
                  <div className="h-full bg-gradient-to-b from-blue-900/20 to-green-900/20" />
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Code className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-gray-500 text-sm mb-2">No file selected</p>
                <p className="text-gray-600 text-xs">Select a file from the explorer to start editing</p>
              </div>
            </div>
          )}
        </div>

        {/* Terminal */}
        {showTerminal && (
          <div className="border-t border-gray-700 bg-black flex flex-col h-40">
            <div className="border-b border-gray-700 px-4 py-2 flex items-center justify-between bg-gray-900">
              <span className="text-xs font-semibold">Terminal</span>
              <button
                onClick={() => setShowTerminal(false)}
                className="p-1 hover:bg-gray-800 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-3 font-mono text-sm text-green-400">
              <div>$ npm run dev</div>
              <div className="opacity-70">web-os-desktop@1.0.0 dev</div>
              <div className="opacity-70">next dev</div>
              <div className="text-blue-400 mt-2">✓ Ready in 2.3s</div>
              <div className="opacity-60">  ▲ Next.js 16.1.3 (Turbopack)</div>
              <div className="opacity-60">  - Local: http://localhost:3001</div>
              <div ref={terminalEndRef} />
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-900 px-4 py-2 flex items-center justify-between text-xs text-gray-500">
          <div className="flex gap-4">
            <button
              onClick={() => setShowTerminal(!showTerminal)}
              className="hover:text-white transition"
            >
              ⌘ Terminal {showTerminal ? '◄' : '►'}
            </button>
            <button className="hover:text-white transition">Problems</button>
            <button className="hover:text-white transition">Output</button>
          </div>
          <div className="text-xs">
            ✓ ES256 • UTF-8 • CRLF {activeFile ? `• ${activeFile.language.toUpperCase()}` : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
