'use client';

import { Trash2, Download, X } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';
import { api } from '@/utils/api';

export function VideoPlayerApp({}: AppComponentProps) {
  const {
    files,
    loading,
    loadFiles,
    downloadFile,
    deleteFile,
  } = useFileManager();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    loadFiles('video');
  }, [loadFiles]);

  const videos = files.filter((f) => f.file_type === 'video');
  const selectedVideo = videos.find((v) => v.id === selectedId);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-sm opacity-70">Loading videos…</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      {selectedVideo ? (
        <div className="flex h-full flex-col bg-black">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="truncate text-sm text-white">
              {selectedVideo.original_filename}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  downloadFile(selectedVideo.id, selectedVideo.original_filename)
                }
                className="rounded p-1 hover:bg-white/10"
                title="Download"
              >
                <Download className="h-4 w-4 text-white" />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${selectedVideo.original_filename}?`)) {
                    deleteFile(selectedVideo.id);
                    setSelectedId(null);
                  }
                }}
                className="rounded p-1 hover:bg-red-500/20"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
              <button
                onClick={() => setSelectedId(null)}
                className="rounded p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={api.files.downloadUrl(selectedVideo.id)}
              className="h-full w-full object-contain"
              controls
              autoPlay
            />
          </div>

          <div className="border-t border-white/10 px-4 py-2 text-xs text-white/70">
            {selectedVideo.original_filename} •{' '}
            {(selectedVideo.file_size / (1024 * 1024)).toFixed(1)} MB
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-col">
          <div className="border-b border-[color:var(--os-border)] px-4 py-2 font-medium">
            Video Player ({videos.length} videos)
          </div>

          {videos.length === 0 ? (
            <div className="flex flex-1 items-center justify-center text-sm opacity-60">
              No videos uploaded. Upload videos in File Explorer.
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <div className="divide-y divide-[color:var(--os-border)]">
                {videos.map((video) => (
                  <button
                    key={video.id}
                    onClick={() => setSelectedId(video.id)}
                    className="flex w-full items-center gap-4 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5"
                  >
                    <div className="h-16 w-24 flex-shrink-0 rounded bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
                      🎬
                    </div>
                    <div className="min-w-0 flex-1 text-left">
                      <div className="truncate text-sm font-medium">
                        {video.original_filename}
                      </div>
                      <div className="text-xs opacity-70">
                        {(video.file_size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadFile(video.id, video.original_filename);
                        }}
                        className="rounded p-1 hover:bg-black/10 dark:hover:bg-white/10"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete ${video.original_filename}?`)) {
                            deleteFile(video.id);
                          }
                        }}
                        className="rounded p-1 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
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
