'use client';

import { Copy, Trash2, RotateCw, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager, type FileItem } from '@/utils/useFileManager';

function findDuplicateGroups(files: FileItem[]) {
  const grouped = new Map<string, FileItem[]>();

  files.forEach((file) => {
    const key = file.original_filename;
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(file);
  });

  const duplicates = new Map<string, FileItem[]>();
  grouped.forEach((fileList, name) => {
    if (fileList.length > 1) {
      const sorted = [...fileList].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      duplicates.set(name, sorted);
    }
  });

  return duplicates;
}

export function DuplicateFinderApp({}: AppComponentProps) {
  const { files, loadFiles, deleteFile } = useFileManager();
  const [duplicates, setDuplicates] = useState<Map<string, FileItem[]>>(new Map());
  const [isScanning, setIsScanning] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const scanForDuplicates = (sourceFiles = files) => {
    setIsScanning(true);
    setSelectedForDelete(new Set());
    setDuplicates(findDuplicateGroups(sourceFiles));
    setIsScanning(false);
  };

  const handleSelectForDelete = (fileId: string) => {
    const newSet = new Set(selectedForDelete);
    if (newSet.has(fileId)) {
      newSet.delete(fileId);
    } else {
      newSet.add(fileId);
    }
    setSelectedForDelete(newSet);
  };

  const handleDeleteSelected = async () => {
    if (selectedForDelete.size === 0) return;
    
    if (!confirm(`Delete ${selectedForDelete.size} duplicate file(s)?`)) return;

    const deletedIds = new Set<string>();

    for (const fileId of selectedForDelete) {
      try {
        await deleteFile(fileId);
        deletedIds.add(fileId);
      } catch (err) {
        console.error(`Failed to delete ${fileId}:`, err);
      }
    }

    setSelectedForDelete(new Set());
    await loadFiles();
    scanForDuplicates(files.filter((file) => !deletedIds.has(file.id)));
  };

  const spaceWasted = Array.from(duplicates.values())
    .flat()
    .reduce((sum, file) => {
      // Only count files that are not the latest version
      const fileName = file.original_filename;
      const allVersions = duplicates.get(fileName) || [];
      return sum + (allVersions[0].id !== file.id ? file.file_size : 0);
    }, 0);

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-[color:var(--os-border)] bg-gradient-to-r from-orange-500/5 to-red-500/5 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="font-semibold">Duplicate File Finder</h1>
          <button
            onClick={() => scanForDuplicates()}
            disabled={isScanning}
            className="flex items-center gap-2 rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-orange-600 disabled:opacity-50"
          >
            <RotateCw className={`h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Now'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="rounded bg-black/10 p-2 dark:bg-white/5">
            <div className="opacity-70">Duplicate Sets</div>
            <div className="text-lg font-semibold">{duplicates.size}</div>
          </div>
          <div className="rounded bg-black/10 p-2 dark:bg-white/5">
            <div className="opacity-70">Total Wasted</div>
            <div className="text-lg font-semibold">
              {(spaceWasted / (1024 * 1024)).toFixed(1)} MB
            </div>
          </div>
          <div className="rounded bg-black/10 p-2 dark:bg-white/5">
            <div className="opacity-70">Selected</div>
            <div className="text-lg font-semibold">{selectedForDelete.size}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {duplicates.size === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <Copy className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm opacity-60">
                {isScanning
                  ? 'Scanning for duplicates...'
                  : 'Click "Scan Now" to find duplicate files'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3 p-4">
            {Array.from(duplicates.entries()).map(([name, versions]) => (
              <div
                key={name}
                className="rounded-lg border border-[color:var(--os-border)] overflow-hidden"
              >
                <div className="border-b border-[color:var(--os-border)] bg-black/5 p-3 dark:bg-white/5">
                  <p className="font-medium text-sm">{name}</p>
                  <p className="text-xs opacity-60">
                    {versions.length} versions found
                  </p>
                </div>
                <div className="divide-y divide-[color:var(--os-border)]">
                  {versions.map((file, idx) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-3 p-3 hover:bg-black/2 dark:hover:bg-white/2"
                    >
                      <input
                        type="checkbox"
                        checked={selectedForDelete.has(file.id)}
                        onChange={() => handleSelectForDelete(file.id)}
                        disabled={idx === 0} // Can't delete latest
                        className="rounded"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-xs opacity-70">
                            {idx === 0 ? '⭐ Latest' : `Version ${idx}`}
                          </p>
                          <p className="text-xs opacity-60">
                            {(file.file_size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs opacity-60">
                          <Clock className="h-3 w-3" />
                          {new Date(file.created_at).toLocaleString()}
                        </div>
                      </div>
                      {idx > 0 && (
                        <Trash2 className="h-4 w-4 text-red-500 opacity-50" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {selectedForDelete.size > 0 && (
        <div className="border-t border-[color:var(--os-border)] bg-red-500/10 p-3 flex items-center justify-between">
          <p className="text-sm">
            Delete {selectedForDelete.size} file{selectedForDelete.size !== 1 ? 's' : ''}?
          </p>
          <button
            onClick={handleDeleteSelected}
            className="rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-600"
          >
            Delete Selected
          </button>
        </div>
      )}
    </div>
  );
}
