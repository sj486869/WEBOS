'use client';

import {
  Play, Pause, Volume2, VolumeX, Settings, SkipBack, SkipForward,
  ListVideo, Download, Trash2, Zap, X, Maximize, Minimize,
  Users, Database, Server, RefreshCw,
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { api } from '@/utils/api';
import { useFileManager } from '@/utils/useFileManager';
import { useWindowStore } from '@/store/windowStore';

// ─── Types ────────────────────────────────────────────────────────────────────
type VideoSource = 'supabase' | 'media-server';

interface MediaServerFile {
  fileId: string;
  originalName: string;
  fileType: string;
  mimeType: string;
  size: number;
  sizeHuman: string;
  uploadedAt: string;
  streamUrl: string;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function ProVideoPlayerApp({ windowId, args }: AppComponentProps) {
  const { files, downloadFile, deleteFile, loadFiles } = useFileManager();
  const openApp = useWindowStore(s => s.openApp);

  // ── Source toggle ─────────────────────────────────────────────────────────
  const [source, setSource] = useState<VideoSource>('supabase');

  // ── Playback state ────────────────────────────────────────────────────────
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Supabase videos ───────────────────────────────────────────────────────
  // ── Videos ───────────────────────────────────────────────────────
  const supabaseVideos = useMemo(
    () => files.filter(f => (f.file_type === 'video' || f.mime_type?.startsWith('video/')) && f.source !== 'media-server'),
    [files]
  );

  const msFiles = useMemo(
    () => files.filter(f => (f.file_type === 'video' || f.mime_type?.startsWith('video/')) && f.source === 'media-server'),
    [files]
  );

  useEffect(() => { loadFiles(); }, [loadFiles]);

  // Handle updates to args if the app was already open or just launched and user double-clicked a video
  useEffect(() => {
    if (args?.fileId) {
      if (args.source === 'media-server') {
        setSource('media-server');
        const idx = msFiles.findIndex(f => f.id === args.fileId);
        if (idx !== -1) {
          setCurrentIndex(idx);
          setIsPlaying(true);
        }
      } else {
        setSource('supabase');
        const idx = supabaseVideos.findIndex(f => f.id === args.fileId);
        if (idx !== -1) {
          setCurrentIndex(idx);
          setIsPlaying(true);
        }
      }
    }
  }, [args?.fileId, args?.source, supabaseVideos, msFiles]);

  // ── Active video list ─────────────────────────────────────────────────────
  const activeList = source === 'supabase' ? supabaseVideos : msFiles;
  const safeIndex = activeList.length === 0 ? 0 : Math.min(currentIndex, activeList.length - 1);

  // Compute current video URL based on source
  const currentSupabaseVideo = source === 'supabase' ? supabaseVideos[safeIndex] : null;
  const currentMsVideo = source === 'media-server' ? msFiles[safeIndex] : null;
  const currentVideoUrl = currentSupabaseVideo
    ? api.files.downloadUrl(currentSupabaseVideo.storage_path || "")
    : currentMsVideo
      ? api.mediaServer.streamUrl(currentMsVideo.id)
      : '';
  const currentVideoName = currentSupabaseVideo?.original_filename ?? currentMsVideo?.original_filename ?? '';
  const currentVideoSize = currentSupabaseVideo?.file_size ?? currentMsVideo?.file_size ?? 0;
  const videoCount = source === 'supabase' ? supabaseVideos.length : msFiles.length;

  // ── Video effects ─────────────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) void video.play().catch(() => setIsPlaying(false));
    else video.pause();
  }, [isPlaying, currentVideoUrl]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  // Reset playback on video change
  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
    setBuffered(0);
  }, [currentIndex, source]);

  // ── Auto-hide controls ────────────────────────────────────────────────────
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    if (isPlaying) {
      controlsTimerRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  useEffect(() => {
    resetControlsTimer();
    return () => { if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current); };
  }, [isPlaying, resetControlsTimer]);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.code) {
        case 'Space': e.preventDefault(); setIsPlaying(p => !p); break;
        case 'ArrowRight': e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 10, duration);
          break;
        case 'ArrowLeft': e.preventDefault();
          if (videoRef.current) videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 10, 0);
          break;
        case 'ArrowUp': e.preventDefault(); setVolume(v => Math.min(1, v + 0.1)); setIsMuted(false); break;
        case 'ArrowDown': e.preventDefault(); setVolume(v => Math.max(0, v - 0.1)); break;
        case 'KeyM': setIsMuted(m => !m); break;
        case 'KeyF': toggleFullscreen(); break;
        case 'KeyN': handlePlayNext(); break;
        case 'KeyP': handlePlayPrevious(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [duration]);

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

  // ── Event handlers ────────────────────────────────────────────────────────
  const handleMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    setCurrentTime(video.currentTime);
    if (video.buffered.length > 0) {
      const end = video.buffered.end(video.buffered.length - 1);
      setBuffered((end / video.duration) * 100 || 0);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const pct = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = pct * duration;
  };

  const handlePlayPrevious = () => {
    if (currentIndex > 0) { setCurrentIndex(i => i - 1); setIsPlaying(true); }
  };

  const handlePlayNext = () => {
    if (currentIndex < videoCount - 1) { setCurrentIndex(i => i + 1); setIsPlaying(true); }
  };

  const handleDeleteVideo = async () => {
    if (!currentSupabaseVideo) return;
    if (!confirm('Delete this video?')) return;
    try {
      await deleteFile(currentSupabaseVideo.id);
      await loadFiles();
      setCurrentIndex(Math.max(0, Math.min(safeIndex, supabaseVideos.length - 2)));
    } catch (err) { console.error(err); }
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const playedPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const hasVideo = currentVideoUrl !== '';

  // ── Playlist items for current source ─────────────────────────────────────
  const playlistItems = source === 'supabase'
    ? supabaseVideos.map(v => ({ key: v.id, name: v.original_filename, size: v.file_size }))
    : msFiles.map(v => ({ key: v.id, name: v.original_filename, size: v.file_size }));

  return (
    <div className="flex h-full" style={{ background: '#070711', color: 'white' }}>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Source Toggle Bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            {/* Supabase */}
            <button
              onClick={() => { setSource('supabase'); setCurrentIndex(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                border: '1px solid',
                borderColor: source === 'supabase' ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)',
                background: source === 'supabase' ? 'rgba(99,102,241,0.18)' : 'transparent',
                color: source === 'supabase' ? '#a5b4fc' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Database style={{ width: 13, height: 13 }} />
              Supabase
              <span style={{
                background: source === 'supabase' ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '1px 7px', fontSize: '11px',
              }}>{supabaseVideos.length}</span>
            </button>

            {/* Media Server */}
            <button
              onClick={() => { setSource('media-server'); setCurrentIndex(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600',
                border: '1px solid',
                borderColor: source === 'media-server' ? 'rgba(124,58,237,0.6)' : 'rgba(255,255,255,0.1)',
                background: source === 'media-server' ? 'rgba(124,58,237,0.18)' : 'transparent',
                color: source === 'media-server' ? '#c4b5fd' : 'rgba(255,255,255,0.45)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              <Server style={{ width: 13, height: 13 }} />
              Media Server
              <span style={{
                background: source === 'media-server' ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.08)',
                borderRadius: '20px', padding: '1px 7px', fontSize: '11px',
              }}>{msFiles.length}</span>
            </button>
          </div>

          {/* Right: Watch Together + refresh */}
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={() => openApp('watch-together')}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px', padding: '5px 12px',
                background: 'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(59,130,246,0.2))',
                border: '1px solid rgba(124,58,237,0.35)', borderRadius: '8px',
                color: '#c4b5fd', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
              }}
            >
              <Users style={{ width: 13, height: 13 }} />
              Watch Together
            </button>
          </div>
        </div>



        {/* Video area */}
        {hasVideo ? (
          <>
            <div
              ref={containerRef}
              className="flex-1 relative overflow-hidden"
              style={{ background: '#000', cursor: showControls ? 'default' : 'none' }}
              onMouseMove={resetControlsTimer}
              onMouseLeave={() => isPlaying && setShowControls(false)}
              onClick={() => { resetControlsTimer(); setIsPlaying(p => !p); }}
            >
              <video
                ref={videoRef}
                src={currentVideoUrl}
                preload="metadata"
                className="w-full h-full object-contain"
                onLoadedMetadata={handleMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  if (currentIndex < videoCount - 1) handlePlayNext();
                  else setIsPlaying(false);
                }}
              />

              {/* Source badge */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: source === 'media-server'
                  ? 'rgba(124,58,237,0.75)' : 'rgba(99,102,241,0.75)',
                backdropFilter: 'blur(8px)',
                borderRadius: '6px', padding: '3px 8px',
                fontSize: '10px', fontWeight: '700', letterSpacing: '0.5px',
                display: 'flex', alignItems: 'center', gap: '4px',
                opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
                pointerEvents: 'none',
              }}>
                {source === 'media-server' ? <Server style={{ width: 10, height: 10 }} /> : <Database style={{ width: 10, height: 10 }} />}
                {source === 'media-server' ? 'MEDIA SERVER' : 'SUPABASE'}
              </div>

              {/* Title overlay */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), transparent)',
                  padding: '40px 14px 16px',
                  opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
                }}
                onClick={e => e.stopPropagation()}
              >
                <h2 style={{ fontSize: '14px', fontWeight: '600', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentVideoName}
                </h2>
                <p style={{ fontSize: '11px', opacity: 0.55, margin: '3px 0 0 0' }}>
                  {formatTime(duration)} · {(currentVideoSize / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              {/* Center play button */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ opacity: showControls ? 1 : 0, transition: 'opacity 0.3s' }}
              >
                <div style={{
                  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                  borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', padding: '14px',
                }}>
                  {isPlaying ? <Pause className="h-10 w-10" /> : <Play className="h-10 w-10 ml-1" />}
                </div>
              </div>

              {/* Bottom controls */}
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.88), transparent)',
                  padding: '40px 14px 10px',
                  opacity: showControls ? 1 : 0, transition: 'opacity 0.3s',
                }}
                onClick={e => e.stopPropagation()}
              >
                {/* Progress */}
                <div style={{ marginBottom: '10px' }}>
                  <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    style={{
                      width: '100%', height: '4px', background: 'rgba(255,255,255,0.15)',
                      borderRadius: '4px', cursor: 'pointer', position: 'relative',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.height = '6px'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.height = '4px'; }}
                  >
                    {/* Buffered */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, height: '100%',
                      width: `${buffered}%`, borderRadius: '4px',
                      background: 'rgba(255,255,255,0.22)', transition: 'width 0.4s',
                    }} />
                    {/* Played */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, height: '100%',
                      width: `${playedPct}%`, borderRadius: '4px',
                      background: 'linear-gradient(90deg,#7c3aed,#3b82f6)',
                    }}>
                      <div style={{
                        position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
                        width: 12, height: 12, borderRadius: '50%',
                        background: 'white', boxShadow: '0 0 4px rgba(0,0,0,0.5)',
                      }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', opacity: 0.5, marginTop: 4 }}>
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Buttons row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <button onClick={() => setIsPlaying(p => !p)} className="ctrl-btn">
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>
                    <button onClick={handlePlayPrevious} disabled={currentIndex === 0} className="ctrl-btn" title="Prev (P)">
                      <SkipBack className="h-4 w-4" />
                    </button>
                    <button onClick={handlePlayNext} disabled={currentIndex >= videoCount - 1} className="ctrl-btn" title="Next (N)">
                      <SkipForward className="h-4 w-4" />
                    </button>
                    <button onClick={() => setIsMuted(m => !m)} className="ctrl-btn" title="Mute (M)">
                      {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </button>
                    <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                      onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                      style={{ width: 70, cursor: 'pointer', accentColor: '#7c3aed' }}
                    />
                    <span style={{ fontSize: '12px', opacity: 0.55, marginLeft: 4 }}>
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Settings */}
                    <div style={{ position: 'relative' }}>
                      <button onClick={() => setShowSettings(s => !s)} className="ctrl-btn" title="Settings">
                        <Settings className="h-4 w-4" />
                      </button>
                      {showSettings && (
                        <div style={{
                          position: 'absolute', right: 0, bottom: '100%', marginBottom: 8,
                          background: 'rgba(10,10,20,0.97)', backdropFilter: 'blur(12px)',
                          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12,
                          padding: 14, width: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                          zIndex: 50,
                        }}>
                          <p style={{ fontSize: 11, opacity: 0.45, marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            Playback Speed
                          </p>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(s => (
                              <button key={s} onClick={() => setPlaybackSpeed(s)}
                                style={{
                                  padding: '3px 8px', fontSize: 12, borderRadius: 6, cursor: 'pointer',
                                  background: playbackSpeed === s ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'rgba(255,255,255,0.08)',
                                  border: 'none', color: 'white',
                                }}>
                                {s === 1 ? 'Normal' : `${s}x`}
                              </button>
                            ))}
                          </div>
                          <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, cursor: 'pointer', marginTop: 12 }}>
                            <input type="checkbox" checked={showSubtitles}
                              onChange={e => setShowSubtitles(e.target.checked)}
                              style={{ accentColor: '#7c3aed' }}
                            />
                            Subtitles
                          </label>
                        </div>
                      )}
                    </div>

                    {source === 'supabase' && currentSupabaseVideo && (
                      <button
                        onClick={() => downloadFile(currentSupabaseVideo.id, currentSupabaseVideo.original_filename)}
                        className="ctrl-btn" title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    )}

                    <button onClick={() => setShowPlaylist(p => !p)} className="ctrl-btn" title="Playlist">
                      <ListVideo className="h-4 w-4" />
                    </button>
                    <button onClick={toggleFullscreen} className="ctrl-btn" title="Fullscreen (F)">
                      {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info bar */}
            <div style={{
              background: 'rgba(255,255,255,0.025)', borderTop: '1px solid rgba(255,255,255,0.06)',
              padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {currentVideoName}
                </h3>
                <p style={{ fontSize: 11, opacity: 0.4, margin: '2px 0 0', letterSpacing: '0.2px' }}>
                  {currentIndex + 1} of {videoCount} · Space=play · ←→=seek · ↑↓=vol · M=mute · F=fullscreen
                </p>
              </div>
              <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 12 }}>
                <button onClick={() => openApp('watch-together')}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px',
                    background: 'linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.15))',
                    border: '1px solid rgba(124,58,237,0.3)', borderRadius: 8,
                    color: '#c4b5fd', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                  }}>
                  <Users style={{ width: 14, height: 14 }} /> Watch Together
                </button>
                {source === 'supabase' && currentSupabaseVideo && (
                  <>
                    <button onClick={() => downloadFile(currentSupabaseVideo.id, currentSupabaseVideo.original_filename)}
                      style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: 'white', cursor: 'pointer' }}
                      title="Download">
                      <Download style={{ width: 14, height: 14 }} />
                    </button>
                    <button onClick={handleDeleteVideo}
                      style={{ padding: '5px 8px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 8, color: '#f87171', cursor: 'pointer' }}
                      title="Delete">
                      <Trash2 style={{ width: 14, height: 14 }} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex items-center justify-center text-center flex-col gap-4">
            <>
              <ListVideo style={{ width: 48, height: 48, opacity: 0.15, margin: '0 auto' }} />
              <div>
                <p style={{ fontSize: 14, opacity: 0.45, marginBottom: 6 }}>
                  {source === 'media-server' ? 'No videos on Media Server' : 'No videos in Supabase'}
                  </p>
                  <p style={{ fontSize: 12, opacity: 0.25 }}>
                    {source === 'media-server'
                      ? 'Upload videos to your Media Server'
                      : 'Upload videos via File Explorer'}
                  </p>
                </div>
              </>
          </div>
        )}
      </div>

      {/* ── Playlist Sidebar ── */}
      {showPlaylist && (
        <div style={{
          width: 272, flexShrink: 0,
          background: 'rgba(255,255,255,0.022)',
          borderLeft: '1px solid rgba(255,255,255,0.065)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{
            padding: '11px 14px', borderBottom: '1px solid rgba(255,255,255,0.065)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <h3 style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>Playlist</h3>
              <span style={{
                fontSize: 11, opacity: 0.4,
                background: 'rgba(255,255,255,0.07)', borderRadius: 20, padding: '1px 7px',
              }}>{videoCount}</span>
            </div>
            <button onClick={() => setShowPlaylist(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', padding: 2 }}>
              <X style={{ width: 15, height: 15 }} />
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {playlistItems.length === 0 ? (
              <div style={{ padding: 28, textAlign: 'center', opacity: 0.35, fontSize: 12 }}>
                No videos
              </div>
            ) : (
              playlistItems.map((v, idx) => (
                <button
                  key={v.key}
                  onClick={() => { setCurrentIndex(idx); setIsPlaying(true); }}
                  style={{
                    width: '100%', padding: '9px 13px',
                    background: safeIndex === idx
                      ? 'linear-gradient(90deg,rgba(124,58,237,0.22),rgba(59,130,246,0.08))'
                      : 'transparent',
                    borderLeft: `3px solid ${safeIndex === idx ? '#7c3aed' : 'transparent'}`,
                    borderTop: 'none', borderRight: 'none', borderBottom: '1px solid rgba(255,255,255,0.035)',
                    color: 'white', cursor: 'pointer', textAlign: 'left',
                    display: 'flex', alignItems: 'center', gap: 9,
                  }}
                  onMouseEnter={e => { if (safeIndex !== idx) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.035)'; }}
                  onMouseLeave={e => { if (safeIndex !== idx) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; }}
                >
                  <div style={{
                    width: 26, height: 26, borderRadius: 6, flexShrink: 0,
                    background: safeIndex === idx
                      ? 'linear-gradient(135deg,#7c3aed,#3b82f6)'
                      : 'rgba(255,255,255,0.07)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 700,
                  }}>
                    {safeIndex === idx
                      ? (isPlaying ? <Pause style={{ width: 11, height: 11 }} /> : <Play style={{ width: 11, height: 11, marginLeft: 1 }} />)
                      : idx + 1}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {v.name}
                    </p>
                    <p style={{ fontSize: 11, opacity: 0.35, margin: '2px 0 0' }}>
                      {(v.size / (1024 * 1024)).toFixed(1)} MB
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>

          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            padding: '9px 13px',
            background: 'rgba(255,255,255,0.015)',
          }}>
            <p style={{ fontSize: 11, opacity: 0.4, margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Zap style={{ width: 11, height: 11 }} />
              {videoCount} videos · {source === 'supabase' ? 'Supabase' : 'Media Server'}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ctrl-btn {
          background: none; border: none; color: white; padding: 6px;
          border-radius: 6px; cursor: pointer; display: flex;
          align-items: center; justify-content: center; transition: background 0.15s;
        }
        .ctrl-btn:hover { background: rgba(255,255,255,0.14); }
        .ctrl-btn:disabled { opacity: 0.28; cursor: not-allowed; }
      `}</style>
    </div>
  );
}
