'use client';

import { Search, X, RotateCcw } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';

export function SearchAppApp({}: AppComponentProps) {
  const { files, loadFiles } = useFileManager();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    sizeMin: 0,
    sizeMax: 999999,
  });

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const searchResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return files.filter((file) => {
      // Text search
      const matchesQuery =
        !query ||
        file.original_filename.toLowerCase().includes(query) ||
        file.file_type.toLowerCase().includes(query);

      // Type filter
      const matchesType =
        filters.type === 'all' || file.file_type === filters.type;

      // Size filter
      const matchesSize =
        file.file_size >= filters.sizeMin &&
        file.file_size <= filters.sizeMax;

      return matchesQuery && matchesType && matchesSize;
    });
  }, [searchQuery, files, filters]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleResetFilters = () => {
    setFilters({ type: 'all', sizeMin: 0, sizeMax: 999999 });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return '🖼️';
      case 'video':
        return '🎬';
      case 'audio':
        return '🎵';
      case 'document':
        return '📄';
      case 'archive':
        return '📦';
      default:
        return '📁';
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Search Header */}
      <div className="border-b border-[color:var(--os-border)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4">
        <div className="mb-3 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search files by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-[color:var(--os-border)] bg-white dark:bg-black py-2 pl-9 pr-8 text-sm focus:border-blue-500 focus:outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium">File Type</label>
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
            >
              <RotateCcw className="h-3 w-3" />
              Reset
            </button>
          </div>
          <select
            value={filters.type}
            onChange={(e) =>
              setFilters({ ...filters, type: e.target.value })
            }
            className="w-full rounded border border-[color:var(--os-border)] bg-white dark:bg-black px-2 py-1 text-xs"
          >
            <option value="all">All Files</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
            <option value="audio">Audio</option>
            <option value="document">Documents</option>
            <option value="archive">Archives</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-auto">
        {searchResults.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <Search className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm opacity-60">No files match your search</p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-[color:var(--os-border)]">
            {searchResults.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/5"
              >
                <div className="text-2xl">{getFileIcon(file.file_type)}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-sm">
                    {file.original_filename}
                  </p>
                  <p className="text-xs opacity-60">
                    {file.file_type} •{' '}
                    {(
                      file.file_size < 1024 * 1024
                        ? file.file_size / 1024
                        : file.file_size / (1024 * 1024)
                    ).toFixed(1)}{' '}
                    {file.file_size < 1024 * 1024 ? 'KB' : 'MB'} •{' '}
                    {new Date(file.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[color:var(--os-border)] bg-black/2 px-4 py-2 text-xs opacity-70 dark:bg-white/2">
        {searchQuery.trim() === ''
          ? 'Ready to search'
          : `Found ${searchResults.length} file${searchResults.length !== 1 ? 's' : ''}`}
      </div>
    </div>
  );
}
