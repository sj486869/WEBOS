'use client';

/* eslint-disable @next/next/no-img-element */

import {
  Trash2,
  Download,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';
import { api } from '@/utils/api';

export function ImageGalleryApp({}: AppComponentProps) {
  const {
    files,
    loading,
    loadFiles,
    downloadFile,
    deleteFile,
  } = useFileManager();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [zoom, setZoom] = useState(100);

  useEffect(() => {
    loadFiles('image');
  }, [loadFiles]);

  const images = files.filter((f) => f.file_type === 'image');

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
      setZoom(100);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      setZoom(100);
    }
  };

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!selectedImage) return;
      if (e.key === 'ArrowRight' && selectedIndex !== null && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
        setZoom(100);
      }
      if (e.key === 'ArrowLeft' && selectedIndex !== null && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
        setZoom(100);
      }
      if (e.key === 'Escape') setSelectedIndex(null);
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedImage, selectedIndex, images.length]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-sm opacity-70">Loading images…</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {selectedImage ? (
        <div className="flex h-full flex-col bg-black">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="text-sm text-white">
              {selectedIndex! + 1} / {images.length}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                className="rounded p-1 hover:bg-white/10"
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4 text-white" />
              </button>
              <span className="text-xs text-white">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 10))}
                className="rounded p-1 hover:bg-white/10"
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() =>
                  downloadFile(selectedImage.id, selectedImage.original_filename)
                }
                className="rounded p-1 hover:bg-white/10"
                title="Download"
              >
                <Download className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${selectedImage.original_filename}?`)) {
                    deleteFile(selectedImage.id);
                    setSelectedIndex(null);
                  }
                }}
                className="rounded p-1 hover:bg-red-500/20"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
              <button
                onClick={() => setSelectedIndex(null)}
                className="rounded p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
            <button
              onClick={handlePrev}
              className="absolute left-4 rounded-lg bg-black/50 p-2 hover:bg-black/75"
              disabled={selectedIndex === 0}
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>

            <img
              src={api.files.downloadUrl(selectedImage.id)}
              alt={selectedImage.original_filename}
              style={{ maxWidth: `${zoom}%`, maxHeight: '100%' }}
              className="object-contain"
            />

            <button
              onClick={handleNext}
              className="absolute right-4 rounded-lg bg-black/50 p-2 hover:bg-black/75"
              disabled={selectedIndex === images.length - 1}
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="border-t border-white/10 px-4 py-2 text-xs text-white/70">
            {selectedImage.original_filename} •{' '}
            {(selectedImage.file_size / 1024).toFixed(1)} KB
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="border-b border-[color:var(--os-border)] px-4 py-2 font-medium">
            Image Gallery ({images.length} images)
          </div>

          {images.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm opacity-60">
              No images uploaded. Upload images in File Explorer.
            </div>
          ) : (
            <div className="flex-1 overflow-auto p-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => {
                      setSelectedIndex(index);
                      setZoom(100);
                    }}
                    className="group relative overflow-hidden rounded-lg border border-[color:var(--os-border)] bg-black/2 hover:border-blue-500"
                  >
                    <img
                      src={api.files.downloadUrl(image.id)}
                      alt={image.original_filename}
                      className="h-32 w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="truncate text-xs text-white">
                        {image.original_filename}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
