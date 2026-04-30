'use client';

import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  SkipBack,
  SkipForward,
  ListVideo,
  Download,
  Share2,
  Trash2,
  Zap,
  X,
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { api } from '@/utils/api';
import { useFileManager } from '@/utils/useFileManager';

export function ProVideoPlayerApp({}: AppComponentProps) {
  const { files, downloadFile, deleteFile, loadFiles } = useFileManager();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [quality, setQuality] = useState('auto');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSubtitles, setShowSubtitles] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const videos = useMemo(
    () => files.filter((file) => file.file_type === 'video' || file.mime_type.startsWith('video/')),
    [files]
  );
  const safeCurrentIndex =
    videos.length === 0 ? 0 : Math.min(currentIndex, videos.length - 1);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = playbackSpeed;
  }, [playbackSpeed]);

  const handleMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleProgressChange = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const percent = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    videoRef.current.currentTime = percent * duration;
  };

  const handlePlayPrevious = () => {
    if (safeCurrentIndex > 0) {
      setCurrentIndex(safeCurrentIndex - 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handlePlayNext = () => {
    if (safeCurrentIndex < videos.length - 1) {
      setCurrentIndex(safeCurrentIndex + 1);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleDeleteVideo = async () => {
    const video = videos[safeCurrentIndex];
    if (!video) return;
    if (!confirm('Delete this video?')) return;

    try {
      await deleteFile(video.id);
      await loadFiles();
      const newIndex = Math.min(safeCurrentIndex, videos.length - 2);
      setCurrentIndex(Math.max(0, newIndex));
    } catch (err) {
      console.error('Error deleting video:', err);
    }
  };

  const currentVideo = videos[safeCurrentIndex];

  const formatTime = (seconds: number) => {
    if (!isFinite(seconds)) return '0:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const bufferPercent = Math.min(100, Math.max(0, (currentTime / duration) * 100 || 0));

  return (
    <div className="flex h-full bg-black text-white">
      {/* Main Video Area */}
      <div className="flex-1 flex flex-col">
        {currentVideo ? (
          <>
            {/* Video Player */}
            <div className="flex-1 bg-gray-950 relative overflow-hidden group">
              <video
                ref={videoRef}
                src={api.files.downloadUrl(currentVideo.id)}
                className="w-full h-full object-contain"
                onLoadedMetadata={handleMetadata}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                  if (safeCurrentIndex < videos.length - 1) {
                    handlePlayNext();
                  } else {
                    setIsPlaying(false);
                  }
                }}
              />

              {/* Video Title Overlay */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                <h2 className="text-lg font-semibold">{currentVideo.original_filename}</h2>
                <p className="text-xs opacity-75">
                  {formatTime(duration)} • {(currentVideo.file_size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              {/* Play/Pause Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-4 rounded-full bg-white/20 hover:bg-white/40 transition"
                >
                  {isPlaying ? (
                    <Pause className="h-12 w-12" />
                  ) : (
                    <Play className="h-12 w-12 ml-1" />
                  )}
                </button>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition">
                {/* Progress Bar */}
                <div className="mb-3">
                  <div
                    ref={progressRef}
                    onClick={handleProgressChange}
                    className="w-full h-1.5 bg-gray-700 rounded-full cursor-pointer hover:h-2 transition group/bar"
                  >
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${bufferPercent}%` }}>
                      <div className="w-3 h-3 bg-white rounded-full -translate-y-3/4 -translate-x-1/2 ml-auto opacity-0 group-hover/bar:opacity-100" />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs mt-1 opacity-75">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 hover:bg-white/20 rounded"
                    >
                      {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </button>

                    <button onClick={handlePlayPrevious} disabled={safeCurrentIndex === 0} className="p-2 hover:bg-white/20 rounded disabled:opacity-50">
                      <SkipBack className="h-5 w-5" />
                    </button>

                    <button
                      onClick={handlePlayNext}
                      disabled={safeCurrentIndex === videos.length - 1}
                      className="p-2 hover:bg-white/20 rounded disabled:opacity-50"
                    >
                      <SkipForward className="h-5 w-5" />
                    </button>

                    {/* Volume Control */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 hover:bg-white/20 rounded"
                      >
                        {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                          setVolume(parseFloat(e.target.value));
                          setIsMuted(false);
                        }}
                        className="w-20 h-1 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Settings */}
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 hover:bg-white/20 rounded relative"
                    >
                      <Settings className="h-5 w-5" />
                      {showSettings && (
                        <div className="absolute right-0 bottom-full mb-2 bg-gray-900 rounded-lg shadow-lg p-2 w-48 text-sm space-y-2">
                          <div>
                            <p className="text-xs opacity-75 mb-1">Playback Speed</p>
                            <select
                              value={playbackSpeed}
                              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                              className="w-full bg-gray-800 rounded px-2 py-1 text-xs"
                            >
                              <option value={0.5}>0.5x</option>
                              <option value={0.75}>0.75x</option>
                              <option value={1}>Normal</option>
                              <option value={1.25}>1.25x</option>
                              <option value={1.5}>1.5x</option>
                              <option value={2}>2x</option>
                            </select>
                          </div>
                          <div>
                            <p className="text-xs opacity-75 mb-1">Quality</p>
                            <select
                              value={quality}
                              onChange={(e) => setQuality(e.target.value)}
                              className="w-full bg-gray-800 rounded px-2 py-1 text-xs"
                            >
                              <option value="auto">Auto</option>
                              <option value="1080p">1080p</option>
                              <option value="720p">720p</option>
                              <option value="480p">480p</option>
                              <option value="360p">360p</option>
                            </select>
                          </div>
                          <label className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={showSubtitles}
                              onChange={(e) => setShowSubtitles(e.target.checked)}
                            />
                            Subtitles
                          </label>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => downloadFile(currentVideo.id, currentVideo.original_filename)}
                      className="p-2 hover:bg-white/20 rounded"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>

                    <button className="p-2 hover:bg-white/20 rounded" title="Share">
                      <Share2 className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => setShowPlaylist(!showPlaylist)}
                      className="p-2 hover:bg-white/20 rounded"
                    >
                      <ListVideo className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Info Bar */}
            <div className="bg-gray-900 border-t border-gray-700 p-4 flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-semibold">{currentVideo.original_filename}</h3>
                <p className="text-sm opacity-60">
                  Video {safeCurrentIndex + 1} of {videos.length}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => downloadFile(currentVideo.id, currentVideo.original_filename)}
                  className="p-2 hover:bg-gray-800 rounded transition"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={handleDeleteVideo}
                  className="p-2 hover:bg-red-900 text-red-400 rounded transition"
                  title="Delete"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <ListVideo className="h-12 w-12 opacity-30 mx-auto mb-3" />
              <p className="text-sm opacity-60">No videos available</p>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar - Playlist */}
      {showPlaylist && (
        <div className="w-80 bg-gray-900 border-l border-gray-700 flex flex-col">
          <div className="border-b border-gray-700 p-4 flex items-center justify-between">
            <h3 className="font-semibold">Playlist</h3>
            <button
              onClick={() => setShowPlaylist(false)}
              className="p-1 hover:bg-gray-800 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-auto divide-y divide-gray-700">
            {videos.length === 0 ? (
              <div className="flex items-center justify-center h-full p-4 text-center text-sm opacity-60">
                No videos in system
              </div>
            ) : (
              videos.map((video, idx) => (
                <button
                  key={video.id}
                  onClick={() => {
                    setCurrentIndex(idx);
                    setCurrentTime(0);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-3 transition ${
                    safeCurrentIndex === idx
                      ? 'bg-blue-600 border-l-2 border-blue-400'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className="text-xs opacity-75 font-semibold w-6">#{idx + 1}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{video.original_filename}</p>
                      <p className="text-xs opacity-60">
                        {(video.file_size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-gray-700 p-4 bg-gray-800">
            <p className="text-xs opacity-70">
              <Zap className="h-3 w-3 inline mr-1" />
              {videos.length} videos • {(videos.reduce((acc, v) => acc + v.file_size, 0) / (1024 * 1024 * 1024)).toFixed(2)} GB total
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
