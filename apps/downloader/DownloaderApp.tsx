'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, CheckCircle2, AlertCircle, Loader2, FileArchive, Film, Music, FileText, Package } from 'lucide-react';
import type { AppComponentProps } from '@/core/os/appRegistry';

const FILE_TYPES = [
  { icon: Film, label: 'Video', color: 'text-purple-400', bg: 'bg-purple-500/10', examples: 'YouTube, Twitter, TikTok, MP4 links' },
  { icon: Music, label: 'Audio', color: 'text-green-400', bg: 'bg-green-500/10', examples: 'MP3, FLAC, M4A links' },
  { icon: FileArchive, label: 'Archives', color: 'text-yellow-400', bg: 'bg-yellow-500/10', examples: 'ZIP, RAR, 7Z, TAR files' },
  { icon: Package, label: 'Apps', color: 'text-blue-400', bg: 'bg-blue-500/10', examples: 'APK, XAPK, EXE files' },
  { icon: FileText, label: 'Docs', color: 'text-red-400', bg: 'bg-red-500/10', examples: 'PDF, TXT files' },
];

const QUICK_EXAMPLES = [
  { label: 'MediaFire', url: 'https://www.mediafire.com/file/5df1l97rot7gwff/Free+Fire_+9th+Anniversary_1.126.1_APKPure.xapk/file', type: 'APK' },
];

export function DownloaderApp({}: AppComponentProps) {
  const [url, setUrl] = useState('');
  const [destination, setDestination] = useState<'local' | 'b2'>('local');
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadedFile, setDownloadedFile] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus('downloading');
    setErrorMsg('');
    setDownloadedFile('');

    try {
      // Use Next.js proxy to avoid browser CORS/network issues with external servers
      const res = await fetch('/api/media-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), destination }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Download failed');
      }

      setStatus('success');
      setDownloadedFile(data?.filename || '');
      setUrl('');
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to download file');
    }
  };

  return (
    <div className="flex h-full flex-col" style={{ background: 'linear-gradient(135deg, #0f0c29, #302b63, #24243e)', color: 'white', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-white/10" style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)' }}>
        <div className="rounded-2xl p-3" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
          <Download className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-lg text-white">Universal Downloader</h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Download any file — video, zip, apk, mp3, pdf — to your media server</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-5 space-y-5">

        {/* Supported Types */}
        <div className="grid grid-cols-5 gap-2">
          {FILE_TYPES.map(({ icon: Icon, label, color, bg, examples }) => (
            <div key={label} className="rounded-xl p-3 flex flex-col items-center gap-1 text-center cursor-default" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }} title={examples}>
              <div className={`rounded-lg p-2 ${bg}`}>
                <Icon className={`h-4 w-4 ${color}`} />
              </div>
              <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>{label}</span>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <form onSubmit={handleDownload} className="space-y-4">
          
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              File URL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <LinkIcon className="h-4 w-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
              </div>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '14px 14px 14px 44px',
                  width: '100%',
                  fontSize: '14px',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                placeholder="https://www.mediafire.com/... or https://youtube.com/... or any direct link"
                required
                disabled={status === 'downloading'}
              />
            </div>
          </div>

          {/* Quick Fill Buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs self-center" style={{ color: 'rgba(255,255,255,0.4)' }}>Quick test:</span>
            {QUICK_EXAMPLES.map(ex => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setUrl(ex.url)}
                className="text-xs px-3 py-1 rounded-full font-medium transition-all hover:scale-105"
                style={{ background: 'rgba(102,126,234,0.3)', border: '1px solid rgba(102,126,234,0.5)', color: '#a5b4fc' }}
              >
                {ex.label} ({ex.type})
              </button>
            ))}
          </div>

          {/* Destination */}
          <div>
            <label htmlFor="destination" className="block text-sm font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Save to
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value as 'local' | 'b2')}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'white',
                borderRadius: '12px',
                padding: '12px 14px',
                width: '100%',
                fontSize: '14px',
                outline: 'none',
              }}
              disabled={status === 'downloading'}
            >
              <option value="local" style={{ background: '#1a1a2e' }}>💾 Local Storage (Media Server)</option>
              <option value="b2" style={{ background: '#1a1a2e' }}>☁️ Backblaze B2 (Cloud — Permanent)</option>
            </select>
          </div>

          {/* Download Button */}
          <button
            type="submit"
            disabled={status === 'downloading' || !url.trim()}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: 600,
              fontSize: '15px',
              cursor: status === 'downloading' || !url.trim() ? 'not-allowed' : 'pointer',
              opacity: status === 'downloading' || !url.trim() ? 0.5 : 1,
              background: status === 'downloading'
                ? 'rgba(255,255,255,0.1)'
                : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              boxShadow: status !== 'downloading' ? '0 4px 20px rgba(102,126,234,0.4)' : 'none',
            }}
          >
            {status === 'downloading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Downloading... Please wait
              </>
            ) : (
              <>
                <Download className="h-5 w-5" />
                Download File
              </>
            )}
          </button>
        </form>

        {/* Status Messages */}
        {status === 'success' && (
          <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)' }}>
            <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-emerald-400">Download Complete! 🎉</p>
              {downloadedFile && <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.6)' }}>File: {downloadedFile}</p>}
              <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {destination === 'b2' ? 'Saved to ☁️ Backblaze B2. Open File Manager → B2 tab.' : 'Saved to media server. Open File Manager to see it.'}
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl p-4" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}>
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-400">Download Failed</p>
              <p className="text-xs mt-1 break-words" style={{ color: 'rgba(255,255,255,0.6)' }}>{errorMsg}</p>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="rounded-xl p-4 space-y-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs font-semibold" style={{ color: 'rgba(255,255,255,0.5)' }}>📌 Supported sources</p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>YouTube • Twitter/X • Instagram • TikTok • MediaFire • Direct links (.zip .apk .mp3 .pdf ...)</p>
        </div>

      </div>
    </div>
  );
}
