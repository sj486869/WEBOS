'use client';

import {
  Play, Pause, Volume2, VolumeX,
  Users, MessageSquare, Link, LogIn, Plus, Wifi, WifiOff,
  Crown, Send, X, Film, Smile, Copy, Check, Maximize,
} from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';
import { api } from '@/utils/api';

// ─── Types ────────────────────────────────────────────────────────────────────
type Participant = { id: string; name: string; isHost: boolean };
type ChatMsg = {
  id: string;
  name: string;
  msg: string;
  from: string;
  timestamp: string;
  isSelf?: boolean;
  isSystem?: boolean;
};
type WatchState = 'lobby' | 'in-room';
type RoomVideo = { videoId: string; videoUrl: string; videoName: string } | null;

const EMOJI_QUICK = ['👍', '😂', '❤️', '😮', '😢', '🔥', '🎉', '👏'];

function useMediaServerUrl() {
  const [url, setUrl] = useState('http://localhost:3001');
  useEffect(() => {
    let stored = localStorage.getItem('webos_media_server_url') || 'http://localhost:3001';
    stored = stored.replace(/\/+$/, '');
    if (stored.endsWith('/health')) stored = stored.slice(0, -7);
    setUrl(stored);
  }, []);
  return url;
}

function getAvatarColor(name: string) {
  const colors = [
    'linear-gradient(135deg,#7c3aed,#4f46e5)',
    'linear-gradient(135deg,#2563eb,#0891b2)',
    'linear-gradient(135deg,#059669,#16a34a)',
    'linear-gradient(135deg,#dc2626,#e11d48)',
    'linear-gradient(135deg,#d97706,#f59e0b)',
    'linear-gradient(135deg,#7c3aed,#ec4899)',
    'linear-gradient(135deg,#0891b2,#2563eb)',
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

function formatTimestamp(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch { return ''; }
}

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// ─── Component ────────────────────────────────────────────────────────────────
export function WatchTogetherApp({}: AppComponentProps) {
  const mediaServerUrl = useMediaServerUrl();

  // ── State ──────────────────────────────────────────────────────────────────
  const [screenState, setScreenState] = useState<WatchState>('lobby');
  const [myName, setMyName] = useState('');
  const [roomIdInput, setRoomIdInput] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [wsStatus, setWsStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [error, setError] = useState('');
  const [sidebarTab, setSidebarTab] = useState<'participants' | 'chat'>('participants');
  const [unreadChat, setUnreadChat] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copied, setCopied] = useState(false);

  // ── Video State ─────────────────────────────────────────────────────────────
  const [currentVideo, setCurrentVideo] = useState<RoomVideo>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showVideoSelector, setShowVideoSelector] = useState(false);

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const wsRef = useRef<WebSocket | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const isSyncingRef = useRef(false);
  // Tracks the currently-active sidebar tab without requiring an impure
  // functional state updater (see addChatMsg below).
  const sidebarTabRef = useRef(sidebarTab);
  // Holds a play/seek state that arrived before the <video> element existed
  // in the DOM (e.g. joining a room where a video is already playing).
  // Applied once the element mounts and fires onLoadedMetadata.
  const pendingSyncRef = useRef<{ time: number; playing: boolean } | null>(null);

  const { files, loadFiles } = useFileManager();
  const videos = files.filter(f => f.file_type === 'video' || f.mime_type?.startsWith('video/'));

  useEffect(() => { loadFiles(); }, [loadFiles]);

  useEffect(() => { sidebarTabRef.current = sidebarTab; }, [sidebarTab]);

  // ── Auto-scroll chat ────────────────────────────────────────────────────────
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (sidebarTab === 'chat') setUnreadChat(0);
  }, [chatMessages, sidebarTab]);

  // ── Unread badge when chat tab is not active ────────────────────────────────
  // NOTE: previously this called setUnreadChat from inside the functional
  // updater passed to setSidebarTab. Updater functions must be pure (React
  // may invoke them more than once, e.g. under Strict Mode), so that side
  // effect could double-increment the unread badge. Reading the tab from a
  // ref avoids the impure updater entirely.
  const addChatMsg = useCallback((msg: ChatMsg) => {
    setChatMessages(prev => [...prev, msg]);
    if (sidebarTabRef.current !== 'chat') {
      setUnreadChat(u => u + 1);
    }
  }, []);

  // ── Video sync ──────────────────────────────────────────────────────────────
  // Owns all play()/pause() calls driven by `isPlaying`. Handlers (local or
  // remote) should just update `isPlaying`/`isSyncingRef` rather than also
  // calling play()/pause() directly, to avoid double-firing playback calls.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || isSyncingRef.current) return;
    if (isPlaying) void v.play().catch(() => setIsPlaying(false));
    else v.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // ── WebSocket ────────────────────────────────────────────────────────────────
  const connectWs = useCallback((onOpen: (ws: WebSocket) => void) => {
    if (!mediaServerUrl) { setError('Media Server URL not set. Go to Settings → Media Server.'); return; }
    const wsUrl = mediaServerUrl.replace(/^http/, 'ws') + '/watch-together';
    setWsStatus('connecting');
    setError('');
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => { setWsStatus('connected'); onOpen(ws); };

    ws.onmessage = (ev) => {
      let msg: Record<string, unknown>;
      try { msg = JSON.parse(ev.data as string); } catch { return; }

      switch (msg.type) {
        case 'room_created':
          setRoomId(msg.roomId as string);
          setIsHost(true);
          setParticipants(msg.participants as Participant[] || []);
          setScreenState('in-room');
          break;

        case 'joined': {
          setRoomId(msg.roomId as string);
          setIsHost(false);
          setParticipants(msg.participants as Participant[] || []);
          setScreenState('in-room');
          if (msg.currentVideo) setCurrentVideo(msg.currentVideo as RoomVideo);

          // The <video> element for the in-room screen doesn't exist yet
          // (we're still rendering the lobby tree), so videoRef.current is
          // null here. Stash the target time/playing state and apply it
          // once the element mounts and reports onLoadedMetadata instead.
          const joinTime = (msg.currentTime as number) || 0;
          const joinPlaying = (msg.isPlaying as boolean) ?? false;
          pendingSyncRef.current = { time: joinTime, playing: joinPlaying };
          setIsPlaying(joinPlaying);
          break;
        }

        case 'participant_joined': {
          const p = msg.participant as Participant;
          setParticipants(prev => [...prev.filter(x => x.id !== p.id), p]);
          addChatMsg({ id: uid(), name: 'System', msg: `🟢 ${p.name} joined the room`, from: 'system', timestamp: new Date().toISOString(), isSystem: true });
          break;
        }

        case 'participant_left':
          setParticipants(prev => prev.filter(p => p.id !== (msg.participantId as string)));
          addChatMsg({ id: uid(), name: 'System', msg: `🔴 ${msg.name as string} left the room`, from: 'system', timestamp: new Date().toISOString(), isSystem: true });
          break;

        case 'host_changed':
          setParticipants(prev => prev.map(p => ({ ...p, isHost: p.id === (msg.hostId as string) })));
          addChatMsg({ id: uid(), name: 'System', msg: `👑 ${msg.hostName as string} is now the host`, from: 'system', timestamp: new Date().toISOString(), isSystem: true });
          break;

        case 'play': {
          isSyncingRef.current = true;
          const t = msg.time as number;
          if (videoRef.current) {
            if (Math.abs(videoRef.current.currentTime - t) > 1) videoRef.current.currentTime = t;
            videoRef.current.play().catch(() => {});
          }
          setIsPlaying(true);
          setTimeout(() => { isSyncingRef.current = false; }, 400);
          break;
        }

        case 'pause': {
          isSyncingRef.current = true;
          const t = msg.time as number;
          if (videoRef.current) {
            videoRef.current.currentTime = t;
            videoRef.current.pause();
          }
          setIsPlaying(false);
          setTimeout(() => { isSyncingRef.current = false; }, 400);
          break;
        }

        case 'seek': {
          isSyncingRef.current = true;
          const t = msg.time as number;
          if (videoRef.current) videoRef.current.currentTime = t;
          setCurrentTime(t);
          setTimeout(() => { isSyncingRef.current = false; }, 400);
          break;
        }

        case 'video':
          setCurrentVideo({ videoId: msg.videoId as string, videoUrl: msg.videoUrl as string, videoName: msg.videoName as string });
          setIsPlaying(false); setCurrentTime(0);
          addChatMsg({ id: uid(), name: 'System', msg: `🎬 ${msg.from as string} changed video to "${msg.videoName as string}"`, from: 'system', timestamp: new Date().toISOString(), isSystem: true });
          break;

        case 'chat':
          addChatMsg({
            id: uid(),
            name: msg.name as string,
            msg: msg.msg as string,
            from: msg.from as string,
            timestamp: msg.timestamp as string,
            isSelf: false,
          });
          break;

        case 'error':
          setError(msg.message as string);
          break;
      }
    };

    ws.onclose = () => { setWsStatus('disconnected'); wsRef.current = null; };
    ws.onerror = () => { setError('Cannot connect to Media Server. Is it running?'); setWsStatus('disconnected'); };
  }, [mediaServerUrl, addChatMsg]);

  const sendMsg = (payload: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify(payload));
  };

  const handleCreateRoom = () => {
    if (!myName.trim()) { setError('Enter your name'); return; }
    connectWs(ws => ws.send(JSON.stringify({ type: 'create', name: myName.trim() })));
  };

  const handleJoinRoom = () => {
    if (!myName.trim()) { setError('Enter your name'); return; }
    if (!roomIdInput.trim()) { setError('Enter a room code'); return; }
    connectWs(ws => ws.send(JSON.stringify({ type: 'join', name: myName.trim(), roomId: roomIdInput.trim().toUpperCase() })));
  };

  const handleLeaveRoom = () => {
    wsRef.current?.close();
    setScreenState('lobby'); setRoomId(''); setIsHost(false);
    setParticipants([]); setChatMessages([]); setCurrentVideo(null); setIsPlaying(false);
    pendingSyncRef.current = null;
  };

  const handlePlayPause = () => {
    if (isSyncingRef.current) return;
    const t = videoRef.current?.currentTime ?? currentTime;
    const newPlaying = !isPlaying;
    // Only flip state here — the `isPlaying` sync effect above is solely
    // responsible for calling play()/pause() on the element. Calling it
    // here too caused overlapping play() requests (benign AbortError spam).
    setIsPlaying(newPlaying);
    sendMsg({ type: newPlaying ? 'play' : 'pause', time: t });
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || duration <= 0) return;
    const rect = progressRef.current.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)) * duration;
    videoRef.current.currentTime = t; setCurrentTime(t);
    sendMsg({ type: 'seek', time: t });
  };

  const handleSelectVideo = (v: typeof videos[0]) => {
    const url = v.source === 'media-server' ? api.mediaServer.streamUrl(v.id) : api.files.downloadUrl(v.id);
    const payload: RoomVideo = { videoId: v.id, videoUrl: url, videoName: v.original_filename };
    setCurrentVideo(payload); setIsPlaying(false); setCurrentTime(0); setShowVideoSelector(false);
    sendMsg({ type: 'video', ...payload, time: 0 });
  };

  const handleSendChat = () => {
    const txt = chatInput.trim();
    if (!txt) return;
    sendMsg({ type: 'chat', msg: txt });
    setChatMessages(prev => [...prev, { id: uid(), name: myName, msg: txt, from: 'self', timestamp: new Date().toISOString(), isSelf: true }]);
    setChatInput('');
    setShowEmojiPicker(false);
    chatInputRef.current?.focus();
  };

  const handleEmojiClick = (emoji: string) => {
    setChatInput(prev => prev + emoji);
    setShowEmojiPicker(false);
    chatInputRef.current?.focus();
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (s: number) => {
    if (!isFinite(s)) return '0:00';
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = Math.floor(s % 60);
    return h > 0 ? `${h}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}` : `${m}:${String(sec).padStart(2,'0')}`;
  };

  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  // ─── LOBBY ────────────────────────────────────────────────────────────────────
  if (screenState === 'lobby') {
    return (
      <div style={{
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg,#0f0c29 0%,#302b63 50%,#24243e 100%)',
      }}>
        <div style={{
          width: 420, background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '36px 32px',
          color: 'white', boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28 }}>
            <div style={{
              background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
              borderRadius: 14, padding: 12, display: 'flex',
            }}>
              <Film style={{ width: 24, height: 24 }} />
            </div>
            <div>
              <h1 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Watch Together</h1>
              <p style={{ fontSize: 13, opacity: 0.5, margin: '3px 0 0' }}>Watch videos in real-time sync</p>
            </div>
          </div>

          {/* Features */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 24,
          }}>
            {[
              ['▶', 'Sync play & pause'],
              ['⏩', 'Sync seek'],
              ['💬', 'Real-time chat'],
              ['👥', 'See participants'],
            ].map(([icon, label]) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: 10,
                padding: '8px 12px', fontSize: 12, opacity: 0.7,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <span>{icon}</span>{label}
              </div>
            ))}
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: 10, padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#fca5a5',
            }}>
              {error}
            </div>
          )}

          {/* Name input */}
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 12, opacity: 0.5, display: 'block', marginBottom: 6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Your Name
            </label>
            <input value={myName} onChange={e => setMyName(e.target.value)}
              placeholder="Enter your display name…"
              onKeyDown={e => e.key === 'Enter' && handleCreateRoom()}
              style={{
                width: '100%', padding: '11px 14px', boxSizing: 'border-box',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 11, color: 'white', fontSize: 14, outline: 'none',
              }}
            />
          </div>

          {/* Create button */}
          <button onClick={handleCreateRoom} disabled={wsStatus === 'connecting'}
            style={{
              width: '100%', padding: '13px', marginBottom: 12,
              background: wsStatus === 'connecting' ? 'rgba(124,58,237,0.4)' : 'linear-gradient(135deg,#7c3aed,#3b82f6)',
              border: 'none', borderRadius: 12, color: 'white', fontWeight: 700, fontSize: 15,
              cursor: wsStatus === 'connecting' ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <Plus style={{ width: 18, height: 18 }} />
            {wsStatus === 'connecting' ? 'Connecting…' : 'Create New Room'}
          </button>

          {/* Divider */}
          <div style={{ position: 'relative', margin: '18px 0' }}>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
            <span style={{
              position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)',
              background: '#1a1735', padding: '0 10px', fontSize: 11, opacity: 0.4, whiteSpace: 'nowrap',
            }}>OR JOIN A ROOM</span>
          </div>

          {/* Join inputs */}
          <input value={roomIdInput} onChange={e => setRoomIdInput(e.target.value.toUpperCase())}
            placeholder="Room code — e.g. ABC123"
            maxLength={6}
            onKeyDown={e => e.key === 'Enter' && handleJoinRoom()}
            style={{
              width: '100%', padding: '11px 14px', marginBottom: 10, boxSizing: 'border-box',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 11, color: 'white', fontSize: 16, fontWeight: 800,
              letterSpacing: 6, textTransform: 'uppercase', outline: 'none', textAlign: 'center',
            }}
          />

          <button onClick={handleJoinRoom} disabled={wsStatus === 'connecting'}
            style={{
              width: '100%', padding: '12px',
              background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 12, color: 'white', fontWeight: 700, fontSize: 14, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <LogIn style={{ width: 16, height: 16 }} /> Join Room
          </button>

          <p style={{ marginTop: 18, fontSize: 11, opacity: 0.3, textAlign: 'center' }}>
            Server: {mediaServerUrl}
          </p>
        </div>
      </div>
    );
  }

  // ─── IN ROOM ──────────────────────────────────────────────────────────────────
  return (
    <div style={{ height: '100%', display: 'flex', background: '#08080f', color: 'white', position: 'relative', overflow: 'hidden' }}>

      {/* ── LEFT: Video area ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, position: 'relative' }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '9px 14px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Connection dot */}
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: wsStatus === 'connected' ? '#22c55e' : '#ef4444',
              boxShadow: wsStatus === 'connected' ? '0 0 6px #22c55e' : '0 0 6px #ef4444',
            }} />

            {/* Room code badge */}
            <button onClick={copyRoomCode} style={{
              display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px',
              background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 8, cursor: 'pointer', color: '#c4b5fd', fontWeight: 800,
              fontSize: 14, letterSpacing: 3,
            }}>
              {roomId}
              {copied
                ? <Check style={{ width: 13, height: 13, color: '#22c55e' }} />
                : <Copy style={{ width: 12, height: 12, opacity: 0.6 }} />}
            </button>

            {isHost && (
              <span style={{ fontSize: 12, color: '#f59e0b', display: 'flex', alignItems: 'center', gap: 4 }}>
                <Crown style={{ width: 13, height: 13 }} /> Host
              </span>
            )}

            <button onClick={() => { setIsSidebarOpen(true); setSidebarTab('participants'); }} style={{ fontSize: 12, opacity: 0.7, display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px 8px', borderRadius: 6 }}>
              <Users style={{ width: 13, height: 13 }} /> {participants.length}
            </button>
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            <button
              onClick={() => { setIsSidebarOpen(true); setSidebarTab('chat'); setUnreadChat(0); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px',
                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8, color: 'white', cursor: 'pointer', fontSize: 12,
                position: 'relative',
              }}>
              <MessageSquare style={{ width: 14, height: 14 }} /> Chat
              {unreadChat > 0 && (
                <span style={{
                  position: 'absolute', top: -6, right: -6, minWidth: 18, height: 18,
                  background: '#7c3aed', borderRadius: 20, fontSize: 11, fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                }}>
                  {unreadChat > 9 ? '9+' : unreadChat}
                </span>
              )}
            </button>

            <button onClick={handleLeaveRoom}
              style={{
                display: 'flex', alignItems: 'center', gap: 5, padding: '5px 11px',
                background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: 8, color: '#fca5a5', cursor: 'pointer', fontSize: 12,
              }}>
              <X style={{ width: 14, height: 14 }} /> Leave
            </button>
          </div>
        </div>

        {/* Video */}
        <div className="flex-1 relative overflow-hidden group" style={{ background: '#000' }}
          onClick={() => !showVideoSelector && handlePlayPause()}>
          {currentVideo ? (
            <>
              <video ref={videoRef} src={currentVideo.videoUrl}
                preload="metadata"
                className="w-full h-full object-contain"
                onLoadedMetadata={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  setDuration(v.duration);

                  // Apply any sync state that arrived before this element
                  // existed (e.g. joining a room mid-playback).
                  const pending = pendingSyncRef.current;
                  if (pending) {
                    isSyncingRef.current = true;
                    v.currentTime = pending.time;
                    setCurrentTime(pending.time);
                    if (pending.playing) {
                      v.play().catch(() => setIsPlaying(false));
                    } else {
                      v.pause();
                    }
                    pendingSyncRef.current = null;
                    setTimeout(() => { isSyncingRef.current = false; }, 400);
                  }
                }}
                onTimeUpdate={() => { if (videoRef.current && !isSyncingRef.current) setCurrentTime(videoRef.current.currentTime); }}
                onEnded={() => { setIsPlaying(false); sendMsg({ type: 'pause', time: duration }); }}
              />

              {/* Center play button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition pointer-events-none">
                <div style={{
                  background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                  borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)', padding: 16,
                }}>
                  {isPlaying ? <Pause style={{ width: 40, height: 40 }} /> : <Play style={{ width: 40, height: 40, marginLeft: 2 }} />}
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition"
                style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.88),transparent)', padding: '36px 14px 12px' }}
                onClick={e => e.stopPropagation()}>
                {/* Progress */}
                <div ref={progressRef} onClick={handleSeek}
                  style={{
                    width: '100%', height: 4, background: 'rgba(255,255,255,0.15)',
                    borderRadius: 4, cursor: 'pointer', position: 'relative', marginBottom: 10,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.height = '6px'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.height = '4px'; }}>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '100%',
                    width: `${progressPct}%`, borderRadius: 4,
                    background: 'linear-gradient(90deg,#7c3aed,#3b82f6)',
                  }}>
                    <div style={{
                      position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)',
                      width: 11, height: 11, borderRadius: '50%', background: 'white',
                    }} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <button onClick={handlePlayPause}
                      style={{ background: 'none', border: 'none', color: 'white', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 6 }}>
                      {isPlaying ? <Pause style={{ width: 20, height: 20 }} /> : <Play style={{ width: 20, height: 20 }} />}
                    </button>
                    <button onClick={() => setIsMuted(m => !m)}
                      style={{ background: 'none', border: 'none', color: 'white', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 6 }}>
                      {isMuted ? <VolumeX style={{ width: 16, height: 16 }} /> : <Volume2 style={{ width: 16, height: 16 }} />}
                    </button>
                    <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume}
                      onChange={e => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }}
                      style={{ width: 64, cursor: 'pointer', accentColor: '#7c3aed' }}
                    />
                    <span style={{ fontSize: 12, opacity: 0.5 }}>{formatTime(currentTime)} / {formatTime(duration)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {isHost && (
                      <button onClick={(e) => { e.stopPropagation(); setShowVideoSelector(true); }}
                        style={{
                          padding: '5px 12px', background: 'rgba(124,58,237,0.3)',
                          border: '1px solid rgba(124,58,237,0.5)', borderRadius: 8,
                          color: 'white', cursor: 'pointer', fontSize: 12, fontWeight: 600,
                        }}>
                        Change Video
                      </button>
                    )}
                    <button onClick={(e) => { e.stopPropagation(); if (videoRef.current) videoRef.current.requestFullscreen().catch(()=>{}); }}
                      style={{ background: 'none', border: 'none', color: 'white', padding: 6, cursor: 'pointer', display: 'flex', borderRadius: 6 }}
                      title="Fullscreen">
                      <Maximize style={{ width: 16, height: 16 }} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
              <Film style={{ width: 56, height: 56, opacity: 0.15 }} />
              <p style={{ opacity: 0.4, fontSize: 14 }}>
                {isHost ? 'Choose a video to start watching' : 'Waiting for host to select a video…'}
              </p>
              {isHost && (
                <button onClick={(e) => { e.stopPropagation(); setShowVideoSelector(true); }}
                  style={{
                    padding: '10px 24px', background: 'linear-gradient(135deg,#7c3aed,#3b82f6)',
                    border: 'none', borderRadius: 10, color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: 14,
                  }}>
                  Choose Video
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: Floating Sidebar ── */}
      {isSidebarOpen && (
        <div style={{
          width: 320, flexShrink: 0,
          borderLeft: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(12,12,18,0.95)',
          backdropFilter: 'blur(16px)',
          display: 'flex', flexDirection: 'column',
          position: 'absolute', right: 0, top: 0, bottom: 0, zIndex: 40,
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        }}>
          {/* Tabs & Close Button */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ flex: 1, display: 'flex' }}>
              {(['participants', 'chat'] as const).map(tab => (
                <button key={tab} onClick={() => { setSidebarTab(tab); if (tab === 'chat') setUnreadChat(0); }}
                  style={{
                    flex: 1, padding: '11px 0', background: 'none', border: 'none', cursor: 'pointer',
                    color: sidebarTab === tab ? 'white' : 'rgba(255,255,255,0.35)',
                    borderBottom: `2px solid ${sidebarTab === tab ? '#7c3aed' : 'transparent'}`,
                    fontSize: 13, fontWeight: sidebarTab === tab ? 700 : 400,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                    position: 'relative',
                  }}>
                  {tab === 'participants'
                    ? <><Users style={{ width: 13, height: 13 }} /> People</>
                    : (
                      <>
                        <MessageSquare style={{ width: 13, height: 13 }} /> Chat
                        {unreadChat > 0 && tab === 'chat' && sidebarTab !== 'chat' && (
                          <span style={{
                            position: 'absolute', top: 6, right: 12, minWidth: 16, height: 16,
                            background: '#7c3aed', borderRadius: 20, fontSize: 10, fontWeight: 700,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px',
                          }}>{unreadChat}</span>
                        )}
                      </>
                    )}
                </button>
              ))}
            </div>
            <button onClick={() => setIsSidebarOpen(false)} style={{
              padding: '0 16px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
            }} onMouseEnter={e => e.currentTarget.style.color='white'} onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
              <X style={{ width: 18, height: 18 }} />
            </button>
          </div>

          {/* Participants tab */}
        {sidebarTab === 'participants' && (
          <div style={{ flex: 1, overflow: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {participants.map(p => (
              <div key={p.id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '9px 11px', background: 'rgba(255,255,255,0.04)', borderRadius: 12,
              }}>
                <div style={{
                  width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                  background: getAvatarColor(p.name),
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 14,
                }}>
                  {p.name[0]?.toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.4 }}>
                    {p.isHost ? '👑 Host' : 'Watching'}
                  </div>
                </div>
                {p.isHost && <Crown style={{ width: 14, height: 14, color: '#f59e0b', flexShrink: 0 }} />}
              </div>
            ))}
          </div>
        )}

        {/* Chat tab */}
        {sidebarTab === 'chat' && (
          <>
            {/* Messages */}
            <div style={{ flex: 1, overflow: 'auto', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
              {chatMessages.length === 0 && (
                <div style={{ textAlign: 'center', opacity: 0.3, fontSize: 13, marginTop: 48 }}>
                  <MessageSquare style={{ width: 28, height: 28, margin: '0 auto 8px', opacity: 0.4 }} />
                  No messages yet.<br />Say hello! 👋
                </div>
              )}

              {chatMessages.map((m, i) => {
                const isSelf = m.isSelf;
                const isSystem = m.isSystem;
                const prevMsg = chatMessages[i - 1];
                const sameAuthor = prevMsg && prevMsg.from === m.from && !prevMsg.isSystem && !isSystem;

                if (isSystem) {
                  return (
                    <div key={m.id} style={{ textAlign: 'center', fontSize: 11, opacity: 0.4, padding: '2px 0' }}>
                      {m.msg}
                    </div>
                  );
                }

                return (
                  <div key={m.id} style={{
                    display: 'flex', flexDirection: isSelf ? 'row-reverse' : 'row',
                    gap: 8, alignItems: 'flex-end',
                    marginTop: sameAuthor ? 2 : 8,
                  }}>
                    {/* Avatar (only if not self and not same author) */}
                    {!isSelf && !sameAuthor ? (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        background: getAvatarColor(m.name),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700,
                      }}>
                        {m.name[0]?.toUpperCase()}
                      </div>
                    ) : !isSelf ? (
                      <div style={{ width: 28, flexShrink: 0 }} />
                    ) : null}

                    <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isSelf ? 'flex-end' : 'flex-start' }}>
                      {!isSelf && !sameAuthor && (
                        <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.5, marginBottom: 3, paddingLeft: 2, color: getAvatarColor(m.name).includes('7c3aed') ? '#c4b5fd' : '#93c5fd' }}>
                          {m.name}
                        </span>
                      )}
                      <div style={{
                        padding: '8px 12px', borderRadius: isSelf ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                        background: isSelf
                          ? 'linear-gradient(135deg,#7c3aed,#4f46e5)'
                          : 'rgba(255,255,255,0.08)',
                        fontSize: 13, lineHeight: 1.45, wordBreak: 'break-word',
                      }}>
                        {m.msg}
                      </div>
                      <span style={{ fontSize: 10, opacity: 0.3, marginTop: 3, paddingLeft: 2, paddingRight: 2 }}>
                        {formatTimestamp(m.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Chat input */}
            <div style={{
              padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.07)',
              background: 'rgba(255,255,255,0.02)',
            }}>
              {/* Emoji picker */}
              {showEmojiPicker && (
                <div style={{
                  display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8,
                  padding: '8px 10px', background: 'rgba(255,255,255,0.06)',
                  borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                }}>
                  {EMOJI_QUICK.map(e => (
                    <button key={e} onClick={() => handleEmojiClick(e)}
                      style={{
                        background: 'none', border: 'none', fontSize: 20, cursor: 'pointer',
                        padding: '2px 4px', borderRadius: 6, transition: 'transform 0.1s',
                      }}
                      onMouseEnter={ev => { (ev.currentTarget as HTMLButtonElement).style.transform = 'scale(1.3)'; }}
                      onMouseLeave={ev => { (ev.currentTarget as HTMLButtonElement).style.transform = 'scale(1)'; }}>
                      {e}
                    </button>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setShowEmojiPicker(s => !s)}
                  style={{
                    background: showEmojiPicker ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${showEmojiPicker ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 9, padding: '0 10px', cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center',
                  }}>
                  <Smile style={{ width: 16, height: 16, color: showEmojiPicker ? '#c4b5fd' : 'rgba(255,255,255,0.5)' }} />
                </button>

                <input
                  ref={chatInputRef}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendChat(); } }}
                  placeholder="Send a message…"
                  style={{
                    flex: 1, padding: '9px 13px',
                    background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10, color: 'white', fontSize: 13, outline: 'none',
                  }}
                />

                <button onClick={handleSendChat} disabled={!chatInput.trim()}
                  style={{
                    background: chatInput.trim() ? 'linear-gradient(135deg,#7c3aed,#3b82f6)' : 'rgba(255,255,255,0.06)',
                    border: 'none', borderRadius: 9, padding: '0 12px', cursor: chatInput.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', flexShrink: 0, transition: 'background 0.2s',
                  }}>
                  <Send style={{ width: 15, height: 15, color: chatInput.trim() ? 'white' : 'rgba(255,255,255,0.3)' }} />
                </button>
              </div>

              <p style={{ fontSize: 10, opacity: 0.25, marginTop: 5, textAlign: 'center' }}>
                Enter to send · Emoji button for reactions
              </p>
            </div>
          </>
        )}
      </div>
      )}


      {/* ── Video Selector Modal ── */}
      {showVideoSelector && (
        <div className="absolute inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowVideoSelector(false)}>
          <div style={{
            background: '#12121f', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 18, width: 460, maxHeight: '65vh',
            overflow: 'hidden', display: 'flex', flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <h3 style={{ fontWeight: 700, margin: 0, fontSize: 15 }}>Select Video</h3>
              <button onClick={() => setShowVideoSelector(false)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ overflow: 'auto', flex: 1 }}>
              {videos.length === 0 ? (
                <div style={{ padding: 40, textAlign: 'center', opacity: 0.4, fontSize: 13 }}>
                  No videos in your library.<br />Upload videos via File Explorer.
                </div>
              ) : (
                videos.map(v => (
                  <button key={v.id} onClick={() => handleSelectVideo(v)}
                    style={{
                      width: '100%', padding: '12px 20px', background: 'none', border: 'none',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                      color: 'white', cursor: 'pointer', textAlign: 'left',
                      display: 'flex', alignItems: 'center', gap: 12, transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(124,58,237,0.15)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      background: 'linear-gradient(135deg,rgba(124,58,237,0.25),rgba(59,130,246,0.2))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Film style={{ width: 18, height: 18, opacity: 0.7 }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {v.original_filename}
                      </div>
                      <div style={{ fontSize: 12, opacity: 0.4 }}>
                        {(v.file_size / (1024 * 1024)).toFixed(1)} MB
                      </div>
                    </div>
                    <Play style={{ width: 16, height: 16, opacity: 0.3, flexShrink: 0 }} />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}