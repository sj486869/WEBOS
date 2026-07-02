'use client';

import { Trash2, Download, X, Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Users } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';
import { useWindowStore } from '@/store/windowStore';
import { api } from '@/utils/api';

export function VideoPlayerApp({ args }: AppComponentProps) {
  const { files, loading, loadFiles, downloadFile, deleteFile } = useFileManager();
  const openApp = useWindowStore(s => s.openApp);

  const [selectedId, setSelectedId] = useState<string | null>(args?.fileId || null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => { loadFiles('video'); }, [loadFiles]);

  // Handle updates to args if the app was already open and user double-clicked another video
  useEffect(() => {
    if (args?.fileId) {
      setSelectedId(args.fileId);
      setIsPlaying(true);
    }
  }, [args?.fileId]);

  const videos = files.filter(f => f.file_type === 'video');
  const selectedVideo = videos.find(v => v.id === selectedId) ?? null;

  // ── Video effects ─────────────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) void v.play().catch(() => setIsPlaying(false));
    else v.pause();
  }, [isPlaying, selectedId]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Reset state when video changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
  }, [selectedId]);

  // ── Auto-hide controls ────────────────────────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    if (isPlaying) hideTimerRef.current = setTimeout(() => setShowControls(false), 3000);
  }, [isPlaying]);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimerRef.current) clearTimeout(hideTimerRef.current); };
  }, [isPlaying, resetHideTimer]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    if (!selectedVideo) return;
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      switch (e.code) {
        case 'Space': e.preventDefault(); setIsPlaying(p => !p); break;
        case 'ArrowRight': e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
          break;
        case 'ArrowLeft': e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
          break;
        case 'KeyM': setIsMuted(m => !m); break;
        case 'KeyF': toggleFullscreen(); break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedVideo, duration]);

  // ── Fullscreen ────────────────────────────────────────────────────────────
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };
  useEffect(() => {
    const h = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', h);
    return () => document.removeEventListener('fullscreenchange', h);
  }, []);

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * duration;
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const playedPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-sm opacity-60">Loading videos…</div>
      </div>
    );
  }

  // ── Player view ───────────────────────────────────────────────────────────
  if (selectedVideo) {
    return (
      <div ref={containerRef} className="flex h-full flex-col" style={{ background: '#000', color: 'white' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.04)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, opacity: 0.85 }}>
            {selectedVideo.original_filename}
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 10 }}>
            <button onClick={() => openApp('watch-together')}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px',
                background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.35)',
                borderRadius: 7, color: '#c4b5fd', cursor: 'pointer', fontSize: 12, fontWeight: 600,
              }}>
              <Users style={{ width: 13, height: 13 }} /> Watch Together
            </button>
            <button onClick={() => downloadFile(selectedVideo.id, selectedVideo.original_filename)}
              style={{ padding: '4px 7px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, color: 'white', cursor: 'pointer' }}
              title="Download">
              <Download style={{ width: 14, height: 14 }} />
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete ${selectedVideo.original_filename}?`)) {
                  void deleteFile(selectedVideo.id);
                  setSelectedId(null);
                }
              }}
              style={{ padding: '4px 7px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 7, color: '#f87171', cursor: 'pointer' }}
              title="Delete">
              <Trash2 style={{ width: 14, height: 14 }} />
            </button>
            <button onClick={() => setSelectedId(null)}
              style={{ padding: '4px 7px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
              title="Close">
              <X style={{ width: 14, height: 14 }} />
            </button>
          </div>
        </div>

        {/* Video + controls */}
        <div
          className="flex-1 relative overflow-hidden group"
          onMouseMove={resetHideTimer}
          onMouseLeave={() => isPlaying && setShowControls(false)}
          onClick={() => { resetHideTimer(); setIsPlaying(p => !p); }}
          style={{ cursor: showControls ? 'default' : 'none' }}
        >
          <video
            ref={videoRef}
            src={selectedVideo.source === 'media-server' ? api.mediaServer.streamUrl(selectedVideo.id) : api.files.downloadUrl(selectedVideo.storage_path || '')}
            preload="metadata"
            className="w-full h-full object-contain"
            onLoadedMetadata={() => { if (videoRef.current) setDuration(videoRef.current.duration); }}
            onTimeUpdate={() => {
              const v = videoRef.current;
              if (!v) return;
              setCurrentTime(v.currentTime);
              if (v.buffered.length > 0) setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100 || 0);
            }}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Center play icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: showControls ? 1 : 0, transition: 'opacity 0.25s' }}>
            <div style={{
              background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)',
              borderRadius: '50%', border: '2px solid rgba(255,255,255,0.18)', padding: 14,
            }}>
              {isPlaying ? <Pause style={{ width: 40, height: 40 }} /> : <Play style={{ width: 40, height: 40, marginLeft: 2 }} />}
            </div>
          </div>

          {/* Bottom controls overlay */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
              padding: '32px 14px 12px',
              opacity: showControls ? 1 : 0, transition: 'opacity 0.25s',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Progress bar */}
            <div style={{ marginBottom: 10 }}>
              <div
                ref={progressRef}
                onClick={handleSeek}
                style={{
                  width: '100%', height: 4, background: 'rgba(255,255,255,0.15)',
                  borderRadius: 4, cursor: 'pointer', position: 'relative',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.height = '6px'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.height = '4px'; }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${buffered}%`, background: 'rgba(255,255,255,0.2)', borderRadius: 4,
                }} />
                <div style={{
                  position: 'absolute', top: 0, left: 0, height: '100%',
                  width: `${playedPct}%`, background: 'linear-gradient(90deg,#7c3aed,#3b82f6)', borderRadius: 4,
                }}>
                  <div style={{
                    position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
                    width: 11, height: 11, borderRadius: '50%', background: 'white',
                  }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.5, marginTop: 4 }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control buttons */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <button onClick={() => setIsPlaying(p => !p)}
                  style={{ background: 'none', border: 'none', color: 'white', padding: 6, borderRadius: 6, cursor: 'pointer', display: 'flex' }}>
                  {isPlaying ? <Pause style={{ width: 20, height: 20 }} /> : <Play style={{ width: 20, height: 20 }} />}
                </button>
                <button onClick={() => setIsMuted(m => !m)}
                  style={{ background: 'none', border: 'none', color: 'white', padding: 6, borderRadius: 6, cursor: 'pointer', display: 'flex' }}>
                  {isMuted || volume === 0 ? <VolumeX style={{ width: 16, height: 16 }} /> : <Volume2 style={{ width: 16, height: 16 }} />}
                </button>
                <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                  onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                  style={{ width: 68, cursor: 'pointer', accentColor: '#7c3aed' }}
                />
                <span style={{ fontSize: 12, opacity: 0.5, marginLeft: 4 }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              <div style={{ display: 'flex', gap: 2 }}>
                <span style={{ fontSize: 11, opacity: 0.4, alignSelf: 'center', marginRight: 4 }}>
                  Space · ←→ · M · F
                </span>
                <button onClick={toggleFullscreen}
                  style={{ background: 'none', border: 'none', color: 'white', padding: 6, borderRadius: 6, cursor: 'pointer', display: 'flex' }}
                  title="Fullscreen (F)">
                  {isFullscreen ? <Minimize style={{ width: 16, height: 16 }} /> : <Maximize style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '7px 14px', fontSize: 12, opacity: 0.45, flexShrink: 0,
        }}>
          {selectedVideo.original_filename} · {(selectedVideo.file_size / (1024 * 1024)).toFixed(1)} MB
        </div>
      </div>
    );
  }

  // ── File list view ────────────────────────────────────────────────────────
  return (
    <div className="flex h-full flex-col">
      <div style={{
        borderBottom: '1px solid var(--os-border)', padding: '10px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontWeight: 600, fontSize: 14 }}>
          Video Player <span style={{ opacity: 0.4, fontWeight: 400, fontSize: 12 }}>({videos.length} videos)</span>
        </span>
        <button
          onClick={() => openApp('watch-together')}
          style={{
            display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px',
            background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)',
            borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
            color: 'var(--os-fg)',
          }}>
          <Users style={{ width: 13, height: 13 }} /> Watch Together
        </button>
      </div>

      {videos.length === 0 ? (
        <div className="flex flex-1 items-center justify-center text-sm opacity-50">
          No videos uploaded. Upload videos in File Explorer.
        </div>
      ) : (
        <div className="flex-1 overflow-auto">
          <div className="divide-y divide-[color:var(--os-border)]">
            {videos.map(video => (
              <div
                key={video.id}
                onClick={() => { setSelectedId(video.id); setIsPlaying(true); }}
                className="flex w-full items-center gap-4 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 text-left cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedId(video.id); setIsPlaying(true); } }}
              >
                <div style={{
                  width: 64, height: 44, flexShrink: 0, borderRadius: 8, overflow: 'hidden',
                  background: 'linear-gradient(135deg,#7c3aed33,#3b82f633)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Play style={{ width: 20, height: 20, opacity: 0.5 }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{video.original_filename}</div>
                  <div className="text-xs opacity-50">{(video.file_size / (1024 * 1024)).toFixed(1)} MB</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={e => { e.stopPropagation(); downloadFile(video.id, video.original_filename); }}
                    className="rounded p-1.5 hover:bg-black/10 dark:hover:bg-white/10" title="Download">
                    <Download style={{ width: 14, height: 14 }} />
                  </button>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      if (confirm(`Delete ${video.original_filename}?`)) void deleteFile(video.id);
                    }}
                    className="rounded p-1.5 hover:bg-red-500/20 text-red-500" title="Delete">
                    <Trash2 style={{ width: 14, height: 14 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
