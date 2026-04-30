'use client';

import { FileText, Plus, Save, Code } from 'lucide-react';
import { useState } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';

interface OpenFile {
  id: string;
  name: string;
  content: string;
  language: string;
  saved: boolean;
}

const LANGUAGE_SNIPPETS: Record<string, string> = {
  typescript: `// TypeScript Code
interface User {
  id: string;
  name: string;
  email: string;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`;
}

const myUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

console.log(greetUser(myUser));`,
  
  javascript: `// JavaScript Code
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

class Calculator {
  add(a, b) { return a + b; }
  subtract(a, b) { return a - b; }
  multiply(a, b) { return a * b; }
  divide(a, b) { return a / b; }
}

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8`,

  python: `# Python Code
def calculate_factorial(n):
    """Calculate factorial of n"""
    if n <= 1:
        return 1
    return n * calculate_factorial(n - 1)

class DataProcessor:
    def __init__(self, name):
        self.name = name
        self.data = []
    
    def add_data(self, item):
        self.data.append(item)
    
    def process(self):
        return f"Processing {len(self.data)} items"

processor = DataProcessor("MyProcessor")
processor.add_data("item1")
print(processor.process())`,

  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width">
  <title>My Page</title>
</head>
<body>
  <h1>Welcome to Web Development</h1>
  <p>This is a sample HTML page.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</body>
</html>`,

  css: `/* CSS Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}`,

  sql: `-- SQL Code
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
  ('John Doe', 'john@example.com'),
  ('Jane Smith', 'jane@example.com'),
  ('Bob Wilson', 'bob@example.com');

SELECT * FROM users WHERE email LIKE '%@example.com';

UPDATE users SET name = 'John Updated' WHERE id = 1;

DELETE FROM users WHERE id = 3;`,
};

export function CodeEditorApp({}: AppComponentProps) {
  const [openFiles, setOpenFiles] = useState<OpenFile[]>([
    {
      id: '1',
      name: 'example.ts',
      content: LANGUAGE_SNIPPETS.typescript,
      language: 'typescript',
      saved: true,
    },
  ]);
  const [activeFileId, setActiveFileId] = useState('1');
  const [showNewFile, setShowNewFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const activeFile = openFiles.find((f) => f.id === activeFileId);

  const handleCreateFile = () => {
    if (!newFileName.trim()) return;

    const ext = newFileName.split('.').pop() || 'txt';
    const languageMap: Record<string, string> = {
      ts: 'typescript',
      js: 'javascript',
      py: 'python',
      html: 'html',
      css: 'css',
      sql: 'sql',
    };

    const language = languageMap[ext] || 'typescript';
    const content = LANGUAGE_SNIPPETS[language] || '';

    const newFile: OpenFile = {
      id: Date.now().toString(),
      name: newFileName,
      content: content,
      language: language,
      saved: true,
    };

    setOpenFiles([...openFiles, newFile]);
    setActiveFileId(newFile.id);
    setNewFileName('');
    setShowNewFile(false);
  };

  const handleCloseFile = (id: string) => {
    const newFiles = openFiles.filter((f) => f.id !== id);
    setOpenFiles(newFiles);
    if (activeFileId === id && newFiles.length > 0) {
      setActiveFileId(newFiles[0].id);
    }
  };

  const handleSaveFile = () => {
    if (!activeFile) return;

    setOpenFiles(
      openFiles.map((f) =>
        f.id === activeFileId ? { ...f, saved: true } : f
      )
    );
  };

  const handleUpdateContent = (newContent: string) => {
    setOpenFiles(
      openFiles.map((f) =>
        f.id === activeFileId ? { ...f, content: newContent, saved: false } : f
      )
    );
  };

  const getLanguageColor = (lang: string) => {
    const colors: Record<string, string> = {
      typescript: 'text-blue-500',
      javascript: 'text-yellow-500',
      python: 'text-green-500',
      html: 'text-orange-500',
      css: 'text-purple-500',
      sql: 'text-pink-500',
    };
    return colors[lang] || 'text-gray-500';
  };

  return (
    <div className="flex h-full flex-col bg-gray-900 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="font-semibold flex items-center gap-2">
            <Code className="h-5 w-5" />
            Code Editor
          </h1>
          <button
            onClick={() => setShowNewFile(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            <Plus className="h-4 w-4" />
            New File
          </button>
        </div>
      </div>

      {/* New File Dialog */}
      {showNewFile && (
        <div className="border-b border-gray-700 bg-gray-800 p-3 flex gap-2">
          <input
            autoFocus
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateFile();
              if (e.key === 'Escape') {
                setShowNewFile(false);
                setNewFileName('');
              }
            }}
            placeholder="filename.ts"
            className="flex-1 px-3 py-1.5 rounded bg-gray-700 border border-gray-600 text-sm"
          />
          <button
            onClick={handleCreateFile}
            className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm"
          >
            Create
          </button>
          <button
            onClick={() => {
              setShowNewFile(false);
              setNewFileName('');
            }}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-700 bg-gray-800 flex overflow-x-auto">
        {openFiles.map((file) => (
          <div
            key={file.id}
            className={`flex items-center gap-2 px-4 py-2 border-r border-gray-700 cursor-pointer transition ${
              activeFileId === file.id
                ? 'bg-gray-900 border-b-2 border-blue-500'
                : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveFileId(file.id)}
          >
            <FileText className={`h-4 w-4 ${getLanguageColor(file.language)}`} />
            <span className="text-sm">{file.name}</span>
            {!file.saved && <span className="text-red-500">●</span>}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCloseFile(file.id);
              }}
              className="hover:text-red-500 ml-1"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Editor */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {activeFile ? (
          <>
            {/* Toolbar */}
            <div className="border-b border-gray-700 bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs opacity-70">
                <span>{activeFile.language.toUpperCase()}</span>
                <span>|</span>
                <span>{activeFile.content.length} chars</span>
              </div>
              <button
                onClick={handleSaveFile}
                disabled={activeFile.saved}
                className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>

            {/* Code Area */}
            <div className="flex-1 overflow-hidden flex">
              <textarea
                value={activeFile.content}
                onChange={(e) => handleUpdateContent(e.target.value)}
                className="flex-1 bg-gray-900 text-gray-100 font-mono text-sm p-4 overflow-auto resize-none"
                spellCheck="false"
              />

              {/* Line Numbers */}
              <div className="w-12 bg-gray-800 border-l border-gray-700 text-right text-xs text-gray-600 p-4 overflow-auto">
                {activeFile.content.split('\n').map((_, idx) => (
                  <div key={idx} className="h-[1.5em] leading-[1.5em]">
                    {idx + 1}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <Code className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm opacity-60">No files open</p>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-gray-700 bg-gray-800 px-4 py-2 text-xs text-gray-400 flex justify-between">
        <div>
          {activeFile &&
            `Ln ${activeFile.content.split('\n').length}, Col ${
              activeFile.content.split('\n').pop()?.length || 0
            }`}
        </div>
        <div>UTF-8 • {activeFile?.language.toUpperCase()}</div>
      </div>
    </div>
  );
}
