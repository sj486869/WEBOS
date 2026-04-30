'use client';

import { Globe, Star, History, Trash2, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';

interface BrowserPage {
  url: string;
  title: string;
  favicon?: string;
}

interface Bookmark {
  id: string;
  url: string;
  title: string;
  timestamp: number;
}

const HOME_URL = 'https://www.google.com';

function readBrowserHistory(): BrowserPage[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('browser-history');
    return saved ? (JSON.parse(saved) as BrowserPage[]) : [];
  } catch (err) {
    console.error('Failed to load history:', err);
    return [];
  }
}

function readBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('browser-bookmarks');
    return saved ? (JSON.parse(saved) as Bookmark[]) : [];
  } catch (err) {
    console.error('Failed to load bookmarks:', err);
    return [];
  }
}

function readInitialBrowserState() {
  const history = readBrowserHistory();
  const currentUrl = history.at(-1)?.url ?? HOME_URL;
  return {
    currentUrl,
    history,
    historyIndex: history.length - 1,
  };
}

export function InternetBrowserApp({}: AppComponentProps) {
  const [initialBrowserState] = useState(readInitialBrowserState);
  const [currentUrl, setCurrentUrl] = useState(initialBrowserState.currentUrl);
  const [urlInput, setUrlInput] = useState(initialBrowserState.currentUrl);
  const [history, setHistory] = useState<BrowserPage[]>(initialBrowserState.history);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(readBookmarks);
  const [historyIndex, setHistoryIndex] = useState(initialBrowserState.historyIndex);
  const [showHistory, setShowHistory] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Save bookmarks to localStorage
  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('browser-bookmarks', JSON.stringify(newBookmarks));
  };

  // Save history to localStorage
  const saveHistory = (newHistory: BrowserPage[]) => {
    setHistory(newHistory);
    localStorage.setItem('browser-history', JSON.stringify(newHistory));
  };

  const handleNavigate = (url: string) => {
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      let finalUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        finalUrl = 'https://' + url;
      }

      const title = new URL(finalUrl).hostname;
      const page: BrowserPage = {
        url: finalUrl,
        title: title || 'Web Page',
      };

      const newHistory = [...history.slice(0, historyIndex + 1), page];
      saveHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      setCurrentUrl(finalUrl);
      setUrlInput(finalUrl);
      setIsLoading(false);
    }, 1000);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex].url);
      setUrlInput(history[newIndex].url);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex].url);
      setUrlInput(history[newIndex].url);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleAddBookmark = () => {
    const exists = bookmarks.some((b) => b.url === currentUrl);
    if (!exists) {
      const newBookmark: Bookmark = {
        id: Date.now().toString(),
        url: currentUrl,
        title: history[historyIndex]?.title || currentUrl,
        timestamp: Date.now(),
      };
      saveBookmarks([...bookmarks, newBookmark]);
    }
  };

  const handleRemoveBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const handleClearHistory = () => {
    if (confirm('Clear all browsing history?')) {
      saveHistory([]);
      setHistoryIndex(-1);
      setCurrentUrl(HOME_URL);
      setUrlInput(HOME_URL);
    }
  };

  const isBookmarked = bookmarks.some((b) => b.url === currentUrl);

  return (
    <div className="flex h-full flex-col bg-white dark:bg-black">
      {/* Toolbar */}
      <div className="border-b border-[color:var(--os-border)] bg-gray-50 dark:bg-gray-900 p-3 space-y-3">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={historyIndex <= 0}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 rounded"
            title="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex >= history.length - 1}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 rounded"
            title="Forward"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            title="Refresh"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>

          <div className="flex-1 flex gap-2">
            {/* URL Bar */}
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleNavigate(urlInput);
                }
              }}
              className="flex-1 px-3 py-1.5 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
              placeholder="Enter URL..."
            />
            <button
              onClick={() => handleNavigate(urlInput)}
              className="px-3 py-1.5 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
            >
              Go
            </button>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleAddBookmark}
            className={`p-2 rounded ${
              isBookmarked
                ? 'bg-yellow-500 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-800'
            }`}
            title={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
          >
            <Star className="h-4 w-4" fill={isBookmarked ? 'currentColor' : 'none'} />
          </button>

          {/* History Button */}
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            title="History"
          >
            <History className="h-4 w-4" />
          </button>

          {/* Bookmarks Button */}
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            title="Bookmarks"
          >
            <Globe className="h-4 w-4" />
          </button>
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="border border-gray-300 dark:border-gray-700 rounded max-h-[200px] overflow-auto bg-white dark:bg-gray-800 p-2">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold">History</p>
              <button
                onClick={handleClearHistory}
                className="text-xs px-2 py-1 hover:bg-red-500 hover:text-white rounded"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1 text-xs">
              {history.length === 0 ? (
                <p className="opacity-50">No history</p>
              ) : (
                history.map((page, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setHistoryIndex(idx);
                      setCurrentUrl(page.url);
                      setUrlInput(page.url);
                      setShowHistory(false);
                    }}
                    className={`block w-full text-left p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      idx === historyIndex ? 'bg-blue-500 text-white' : ''
                    }`}
                  >
                    {page.title}
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Bookmarks Panel */}
        {showBookmarks && (
          <div className="border border-gray-300 dark:border-gray-700 rounded max-h-[200px] overflow-auto bg-white dark:bg-gray-800 p-2">
            <p className="text-xs font-semibold mb-2">Bookmarks ({bookmarks.length})</p>
            <div className="space-y-1 text-xs">
              {bookmarks.length === 0 ? (
                <p className="opacity-50">No bookmarks</p>
              ) : (
                bookmarks.map((bookmark) => (
                  <div
                    key={bookmark.id}
                    className="flex items-center gap-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded group"
                  >
                    <button
                      onClick={() => handleNavigate(bookmark.url)}
                      className="flex-1 text-left truncate hover:underline"
                    >
                      {bookmark.title}
                    </button>
                    <button
                      onClick={() => handleRemoveBookmark(bookmark.id)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white dark:bg-black">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="mb-3 text-3xl animate-spin">⌛</div>
              <p className="opacity-60">Loading page...</p>
            </div>
          </div>
        ) : (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs opacity-70 mb-2">Current Page:</p>
              <p className="font-mono text-sm break-all">{currentUrl}</p>
              <p className="text-xs opacity-60 mt-2">
                {history[historyIndex]?.title || 'Loading...'}
              </p>
            </div>

            <div className="prose dark:prose-invert max-w-none text-sm">
              <h2>🌐 Web Browser</h2>
              <p>
                This is a web browsing interface. You can:
              </p>
              <ul>
                <li><strong>Navigate:</strong> Enter URL and press Enter or click Go</li>
                <li><strong>Back/Forward:</strong> Use navigation buttons</li>
                <li><strong>Bookmark:</strong> Click the star icon to save pages</li>
                <li><strong>History:</strong> View all visited pages</li>
                <li><strong>Refresh:</strong> Reload the current page</li>
              </ul>

              <h3>Popular Sites:</h3>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {[
                  { title: 'Google', url: 'google.com' },
                  { title: 'GitHub', url: 'github.com' },
                  { title: 'Stack Overflow', url: 'stackoverflow.com' },
                  { title: 'MDN Web Docs', url: 'developer.mozilla.org' },
                  { title: 'YouTube', url: 'youtube.com' },
                  { title: 'Twitter', url: 'twitter.com' },
                ].map((site) => (
                  <button
                    key={site.url}
                    onClick={() => handleNavigate(site.url)}
                    className="p-2 rounded border border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900 text-left text-xs"
                  >
                    {site.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-[color:var(--os-border)] bg-gray-50 dark:bg-gray-900 px-4 py-2 text-xs opacity-60">
        <span>{currentUrl}</span>
      </div>
    </div>
  );
}
