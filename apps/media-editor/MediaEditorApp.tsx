'use client';

/* eslint-disable @next/next/no-img-element */

import { Upload, Plus, Trash2, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager, type FileStats } from '@/utils/useFileManager';
import { api } from '@/utils/api';

export function MediaEditorApp({}: AppComponentProps) {
  const {
    files,
    loading,
    loadFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    loadStats,
  } = useFileManager();

  const [stats, setStats] = useState<FileStats | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadFiles();
    loadStats().then(data => { if (data) setStats(data); });
  }, [loadFiles, loadStats]);

  const filteredFiles = files.filter((f) => {
    if (selectedFilter === 'all') return true;
    return f.file_type === selectedFilter;
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const fileList = target.files;
    if (!fileList) return;

    setUploading(true);
    try {
      for (const file of fileList) {
        await uploadFile(file);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
      target.value = '';
    }
  };

  const fileTypes = ['all', 'image', 'video', 'audio', 'document', 'archive'];

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-[color:var(--os-border)] bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Media Manager</h1>
          <label className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--os-border)] bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 cursor-pointer transition-colors">
            <Plus className="h-4 w-4" />
            {uploading ? 'Uploading...' : 'Upload Media'}
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
              accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx"
            />
          </label>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="rounded bg-black/10 p-2 dark:bg-white/5">
              <div className="opacity-70">Total Files</div>
              <div className="text-lg font-semibold">{stats.total_files}</div>
            </div>
            <div className="rounded bg-black/10 p-2 dark:bg-white/5">
              <div className="opacity-70">Total Size</div>
              <div className="text-lg font-semibold">
                {(stats.total_size / (1024 * 1024)).toFixed(1)} MB
              </div>
            </div>
            {Object.entries(stats.file_types || {}).map(([type, count]) => (
              <div key={type} className="rounded bg-black/10 p-2 dark:bg-white/5">
                <div className="opacity-70 capitalize">{type}s</div>
                <div className="text-lg font-semibold">{count}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 border-b border-[color:var(--os-border)] px-4 py-2 overflow-x-auto">
        {fileTypes.map((type) => (
          <button
            key={type}
            onClick={() => setSelectedFilter(type)}
            className={`whitespace-nowrap rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
              selectedFilter === type
                ? 'bg-blue-500 text-white'
                : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            {type === 'all' ? 'All Files' : `${type.charAt(0).toUpperCase()}${type.slice(1)}`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex h-full items-center justify-center text-sm opacity-60">
            Loading files…
          </div>
        ) : filteredFiles.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-sm opacity-60">
            <Upload className="mb-2 h-8 w-8 opacity-30" />
            No {selectedFilter === 'all' ? '' : selectedFilter} files yet
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredFiles.map((file) => {
              const getIcon = (type: string) => {
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
                <div
                  key={file.id}
                  className="group relative rounded-lg border border-[color:var(--os-border)] p-2 hover:border-blue-500 hover:bg-blue-500/5 transition-all"
                >
                  {/* Thumbnail/Icon */}
                  <div className="relative mb-2 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded aspect-square flex items-center justify-center">
                    {file.file_type === 'image' ? (
                      <img
                        src={api.files.downloadUrl(file.id)}
                        alt={file.original_filename}
                        className="h-full w-full object-cover rounded"
                      />
                    ) : (
                      <div className="text-3xl">{getIcon(file.file_type)}</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 mb-2">
                    <p className="truncate text-xs font-medium">
                      {file.original_filename}
                    </p>
                    <p className="text-xs opacity-60">
                      {(
                        file.file_size < 1024 * 1024
                          ? file.file_size / 1024
                          : file.file_size / (1024 * 1024)
                      ).toFixed(1)}{' '}
                      {file.file_size < 1024 * 1024 ? 'KB' : 'MB'}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={() =>
                        downloadFile(file.id, file.original_filename)
                      }
                      className="flex-1 rounded bg-blue-500 px-2 py-1 text-xs font-medium text-white hover:bg-blue-600"
                      title="Download"
                    >
                      <Download className="h-3 w-3 inline mr-1" />
                      Download
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete ${file.original_filename}?`)) {
                          deleteFile(file.id);
                        }
                      }}
                      className="rounded bg-red-500/20 px-2 py-1 text-red-600 hover:bg-red-500/30"
                      title="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-[color:var(--os-border)] bg-black/2 dark:bg-white/2 px-4 py-2 text-xs opacity-70">
        {filteredFiles.length > 0
          ? `Showing ${filteredFiles.length} ${selectedFilter === 'all' ? 'file' : selectedFilter}${filteredFiles.length !== 1 ? 's' : ''}`
          : 'No files'}
      </div>
    </div>
  );
}
