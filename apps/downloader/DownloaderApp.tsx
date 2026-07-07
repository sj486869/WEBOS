'use client';

import { useState } from 'react';
import { Download, Link as LinkIcon, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { api } from '@/utils/api';

export function DownloaderApp({}: AppComponentProps) {
  const [url, setUrl] = useState('');
  const [destination, setDestination] = useState<'local' | 'b2'>('local');
  const [status, setStatus] = useState<'idle' | 'downloading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setStatus('downloading');
    setErrorMsg('');

    try {
      await api.downloader.downloadLink(url.trim(), destination);
      setStatus('success');
      setUrl('');
      
      // Reset success message after a few seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'Failed to download link');
    }
  };

  return (
    <div className="flex h-full flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center gap-2 border-b bg-white dark:bg-gray-950 p-4 shadow-sm dark:border-gray-800">
        <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 dark:text-gray-100">Universal Downloader</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Download videos from anywhere directly to your media server</p>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        <form onSubmit={handleDownload} className="w-full max-w-md space-y-4">
          <div className="space-y-2">
            <label htmlFor="url" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Video URL
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LinkIcon className="h-4 w-4 text-gray-400" />
              </div>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="https://youtube.com/... or https://twitter.com/..."
                required
                disabled={status === 'downloading'}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="destination" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Save to
            </label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value as 'local' | 'b2')}
              className="block w-full rounded-lg border border-gray-300 bg-white p-3 text-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500"
              disabled={status === 'downloading'}
            >
              <option value="local">Local Storage</option>
              <option value="b2">Backblaze B2 (Cloud)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'downloading' || !url.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {status === 'downloading' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Downloading to Server...
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Start Download
              </>
            )}
          </button>
        </form>

        {/* Status Messages */}
        <div className="mt-8 w-full max-w-md">
          {status === 'success' && (
            <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/30 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              <div>
                <p className="text-sm font-medium">Download Complete!</p>
                <p className="text-xs opacity-90">The file is now available in your File Manager.</p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">Download Failed</p>
                <p className="text-xs opacity-90 break-words">{errorMsg}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
