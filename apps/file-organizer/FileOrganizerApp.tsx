'use client';

import { FolderPlus, Inbox, Trash2, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  fileIds: string[];
}

export function FileOrganizerApp({}: AppComponentProps) {
  const { files, loadFiles } = useFileManager();
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'favorites',
      name: 'Favorites',
      icon: '⭐',
      color: 'amber',
      fileIds: [],
    },
    {
      id: 'recent',
      name: 'Recent',
      icon: '🕐',
      color: 'blue',
      fileIds: [],
    },
    {
      id: 'projects',
      name: 'Projects',
      icon: '📁',
      color: 'purple',
      fileIds: [],
    },
    {
      id: 'media',
      name: 'Media',
      icon: '🎨',
      color: 'pink',
      fileIds: [],
    },
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('favorites');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const categoryFiles = currentCategory
    ? files.filter((f) => currentCategory.fileIds.includes(f.id))
    : [];

  const handleAddToCategory = () => {
    if (selectedFiles.size === 0 || !currentCategory) return;

    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory) {
        const newFileIds = Array.from(selectedFiles).filter(
          (id) => !cat.fileIds.includes(id)
        );
        return {
          ...cat,
          fileIds: [...cat.fileIds, ...newFileIds],
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setSelectedFiles(new Set());
  };

  const handleRemoveFromCategory = (fileId: string) => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === selectedCategory) {
        return {
          ...cat,
          fileIds: cat.fileIds.filter((id) => id !== fileId),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
  };

  const handleCreateCategory = () => {
    if (!newCategoryName.trim()) return;

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      icon: '📁',
      color: 'gray',
      fileIds: [],
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setShowNewCategory(false);
  };

  const handleSelectFile = (fileId: string) => {
    const newSet = new Set(selectedFiles);
    if (newSet.has(fileId)) {
      newSet.delete(fileId);
    } else {
      newSet.add(fileId);
    }
    setSelectedFiles(newSet);
  };

  const unorganizedFiles = files.filter(
    (f) => !categories.some((cat) => cat.fileIds.includes(f.id))
  );

  return (
    <div className="flex h-full">
      {/* Sidebar - Categories */}
      <div className="w-56 border-r border-[color:var(--os-border)] flex flex-col bg-black/2 dark:bg-white/2">
        {/* Header */}
        <div className="border-b border-[color:var(--os-border)] p-4">
          <h2 className="font-semibold text-sm">Categories</h2>
          <p className="text-xs opacity-60">{categories.length} categories</p>
        </div>

        {/* Categories List */}
        <div className="flex-1 overflow-auto divide-y divide-[color:var(--os-border)]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSelectedFiles(new Set());
              }}
              className={`w-full text-left p-3 transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{cat.name}</p>
                  <p className="text-xs opacity-70">{cat.fileIds.length} files</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* New Category */}
        {showNewCategory && (
          <div className="border-t border-[color:var(--os-border)] p-3 space-y-2">
            <input
              autoFocus
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateCategory();
                if (e.key === 'Escape') setShowNewCategory(false);
              }}
              placeholder="Category name..."
              className="w-full px-2 py-1.5 rounded text-xs border border-[color:var(--os-border)] bg-black/5 dark:bg-white/5"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateCategory}
                className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewCategory(false);
                  setNewCategoryName('');
                }}
                className="flex-1 px-2 py-1 bg-black/10 rounded text-xs hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {!showNewCategory && (
          <button
            onClick={() => setShowNewCategory(true)}
            className="border-t border-[color:var(--os-border)] w-full p-3 flex items-center justify-center gap-2 text-sm hover:bg-white/10 transition"
          >
            <FolderPlus className="h-4 w-4" />
            New Category
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-[color:var(--os-border)] bg-gradient-to-r from-blue-500/5 to-purple-500/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <h1 className="font-semibold flex items-center gap-2">
              <span>{currentCategory?.icon}</span>
              {currentCategory?.name}
            </h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="opacity-70">{currentCategory?.fileIds.length} files</span>
              {selectedFiles.size > 0 && (
                <button
                  onClick={handleAddToCategory}
                  className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600"
                >
                  <Check className="h-3 w-3" />
                  Add ({selectedFiles.size})
                </button>
              )}
            </div>
          </div>

          {/* Info */}
          <p className="text-xs opacity-60">
            {selectedFiles.size > 0
              ? `${selectedFiles.size} file(s) selected from ${unorganizedFiles.length} unorganized`
              : `${unorganizedFiles.length} unorganized file(s) available`}
          </p>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {categoryFiles.length > 0 && (
            <div className="p-4">
              <h3 className="text-xs font-semibold mb-3 opacity-70">
                ✓ ORGANIZED FILES ({categoryFiles.length})
              </h3>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {categoryFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 rounded-lg border border-green-500/30 bg-green-500/5 hover:bg-green-500/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {file.original_filename}
                        </p>
                        <p className="text-xs opacity-60">
                          {(file.file_size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCategory(file.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {unorganizedFiles.length > 0 ? (
            <div className="p-4">
              <h3 className="text-xs font-semibold mb-3 opacity-70">
                ⬜ UNORGANIZED FILES ({unorganizedFiles.length})
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {unorganizedFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => handleSelectFile(file.id)}
                    className={`p-3 rounded-lg border transition text-left ${
                      selectedFiles.has(file.id)
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[color:var(--os-border)] hover:bg-black/2 dark:hover:bg-white/2'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {file.original_filename}
                        </p>
                        <p className="text-xs opacity-60">
                          {(file.file_size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      {selectedFiles.has(file.id) && (
                        <Check className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center">
              <div>
                <Inbox className="mx-auto mb-2 h-8 w-8 opacity-30" />
                <p className="text-sm opacity-60">All files are organized!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
