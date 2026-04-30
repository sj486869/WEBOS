'use client';

import { Terminal, Trash2, Copy, Play } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';

interface Command {
  id: string;
  text: string;
  output: string;
  timestamp: number;
  status: 'executing' | 'success' | 'error';
}

interface CommandHistory {
  text: string;
  timestamp: number;
}

const COMMON_COMMANDS = [
  { cmd: 'whoami', desc: 'Current user' },
  { cmd: 'pwd', desc: 'Current directory' },
  { cmd: 'node --version', desc: 'Node.js version' },
  { cmd: 'npm --version', desc: 'NPM version' },
  { cmd: 'python --version', desc: 'Python version' },
  { cmd: 'git --version', desc: 'Git version' },
  { cmd: 'date', desc: 'Current date/time' },
  { cmd: 'echo "Hello from Terminal"', desc: 'Echo command' },
];

function readCommandHistory(): CommandHistory[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('terminal-history');
    return saved ? (JSON.parse(saved) as CommandHistory[]) : [];
  } catch (err) {
    console.error('Failed to load terminal history:', err);
    return [];
  }
}

export function AdvancedTerminalApp({}: AppComponentProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const [inputHistory, setInputHistory] = useState<CommandHistory[]>(readCommandHistory);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showQuickCommands, setShowQuickCommands] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commands]);

  const saveHistory = (newHistory: CommandHistory[]) => {
    setInputHistory(newHistory);
    localStorage.setItem('terminal-history', JSON.stringify(newHistory));
  };

  const simulateCommandExecution = (cmd: string): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
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

  const handleExecuteCommand = async () => {
    if (!input.trim()) return;

    // Add to history
    const newHistory = [{ text: input, timestamp: Date.now() }, ...inputHistory].slice(
      0,
      100
    );
    saveHistory(newHistory);
    setHistoryIndex(-1);

    const commandId = Date.now().toString();
    const newCommand: Command = {
      id: commandId,
      text: input,
      output: '',
      timestamp: Date.now(),
      status: 'executing',
    };

    setCommands((prev) => [...prev, newCommand]);
    setInput('');
    setShowQuickCommands(false);

    try {
      const output = await simulateCommandExecution(input);

      setCommands((prev) =>
        prev.map((cmd) =>
          cmd.id === commandId
            ? { ...cmd, output, status: 'success' }
            : cmd
        )
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setCommands((prev) =>
        prev.map((cmd) =>
          cmd.id === commandId
            ? { ...cmd, output: `Error: ${errorMsg}`, status: 'error' }
            : cmd
        )
      );
    }
  };

  const handleHistoryUp = () => {
    if (inputHistory.length === 0) return;

    let newIndex = historyIndex + 1;
    if (newIndex >= inputHistory.length) {
      newIndex = inputHistory.length - 1;
    }

    setHistoryIndex(newIndex);
    setInput(inputHistory[newIndex].text);
  };

  const handleHistoryDown = () => {
    if (historyIndex <= 0) {
      setHistoryIndex(-1);
      setInput('');
    } else {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(inputHistory[newIndex].text);
    }
  };

  const handleClearTerminal = () => {
    if (confirm('Clear all terminal history?')) {
      setCommands([]);
    }
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
  };

  return (
    <div className="flex h-full flex-col bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="border-b border-green-700 bg-gray-900 px-4 py-3 flex items-center justify-between">
        <h1 className="font-semibold flex items-center gap-2">
          <Terminal className="h-5 w-5" />
          Advanced Terminal
        </h1>
        <button
          onClick={handleClearTerminal}
          className="flex items-center gap-2 px-3 py-1 text-red-400 hover:text-red-300 border border-red-900 rounded text-sm"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>
      </div>

      {/* Quick Commands */}
      {showQuickCommands && (
        <div className="border-b border-green-700 bg-gray-900 p-3 grid grid-cols-2 gap-2 max-h-[150px] overflow-auto">
          {COMMON_COMMANDS.map((cmd, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(cmd.cmd);
                setShowQuickCommands(false);
                inputRef.current?.focus();
              }}
              className="text-left p-2 rounded border border-green-700 hover:bg-green-900/20 text-xs"
            >
              <div className="font-semibold text-green-400">{cmd.cmd}</div>
              <div className="opacity-60 text-green-600">{cmd.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Terminal Output */}
      <div className="flex-1 overflow-auto p-4 space-y-3 bg-black">
        {commands.length === 0 && (
          <div className="text-green-600 opacity-60 text-sm">
            <p>$ Advanced Terminal</p>
            <p>Type &apos;help&apos; for available commands</p>
            <p>Or press Ctrl+Space to see quick commands</p>
          </div>
        )}

        {commands.map((cmd) => (
          <div key={cmd.id}>
            {/* Command */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-green-600">$</span>
                <span className="text-green-400">{cmd.text}</span>
              </div>
              <button
                onClick={() => handleCopyCommand(cmd.text)}
                className="opacity-0 hover:opacity-100 text-green-600 transition"
              >
                <Copy className="h-3 w-3" />
              </button>
            </div>

            {/* Output */}
            {cmd.status === 'executing' && (
              <div className="text-green-600 opacity-60 ml-6 text-sm animate-pulse">
                ⌛ Executing...
              </div>
            )}
            {cmd.output && (
              <pre className="text-green-400 ml-6 text-sm whitespace-pre-wrap break-words">
                {cmd.output}
              </pre>
            )}
            {cmd.status === 'error' && (
              <div className="text-red-400 ml-6 text-sm">{cmd.output}</div>
            )}
          </div>
        ))}

        <div ref={terminalEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-green-700 bg-black p-3">
        <div className="flex items-center gap-2">
          <span className="text-green-600">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
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
            }}
            placeholder="Enter command... (Ctrl+Space for quick commands)"
            className="flex-1 bg-black text-green-400 outline-none border-none"
            autoFocus
          />
          <button
            onClick={handleExecuteCommand}
            className="text-green-600 hover:text-green-400 transition"
          >
            <Play className="h-4 w-4" />
          </button>
        </div>

        {/* Command History Info */}
        {inputHistory.length > 0 && (
          <div className="text-xs text-green-600 opacity-50 mt-2">
            History: {inputHistory.length} commands | Use ↑↓ to navigate
          </div>
        )}
      </div>
    </div>
  );
}
