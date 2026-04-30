'use client';

import { Download, FileType, Image as ImageIcon, RefreshCw, Wand2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import type { AppComponentProps } from '@/core/os/appRegistry';
import { api } from '@/utils/api';
import { useFileManager, type FileItem } from '@/utils/useFileManager';

type ConversionTarget = {
  extension: string;
  mimeType: string;
  label: string;
};

type HistoryItem = {
  from: string;
  to: string;
  timestamp: string;
  status: 'success' | 'error';
};

const IMAGE_TARGETS: ConversionTarget[] = [
  { extension: 'png', mimeType: 'image/png', label: 'PNG' },
  { extension: 'jpg', mimeType: 'image/jpeg', label: 'JPG' },
  { extension: 'webp', mimeType: 'image/webp', label: 'WEBP' },
];

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function replaceExtension(filename: string, extension: string) {
  const base = filename.includes('.')
    ? filename.slice(0, filename.lastIndexOf('.'))
    : filename;
  return `${base}.${extension}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  window.setTimeout(() => {
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  }, 100);
}

async function convertImage(file: FileItem, target: ConversionTarget) {
  const source = await api.files.download(file.id);
  const image = await createImageBitmap(source);
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available in this browser');

  ctx.drawImage(image, 0, 0);
  image.close();

  const output = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('The browser could not encode this image format'));
      },
      target.mimeType,
      0.92
    );
  });

  downloadBlob(output, replaceExtension(file.original_filename, target.extension));
}

export function FileConverterApp({}: AppComponentProps) {
  const { files, loadFiles } = useFileManager();
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [targetFormat, setTargetFormat] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [conversionHistory, setConversionHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const convertibleFiles = useMemo(
    () =>
      files.filter(
        (file) =>
          file.file_type === 'image' ||
          file.file_type === 'audio' ||
          file.file_type === 'document'
      ),
    [files]
  );

  const availableTargets = useMemo<ConversionTarget[]>(() => {
    if (!selectedFile) return [];
    if (selectedFile.file_type === 'image') {
      return IMAGE_TARGETS.filter((target) => target.mimeType !== selectedFile.mime_type);
    }
    return [];
  }, [selectedFile]);

  const selectedTarget = availableTargets.find(
    (target) => target.extension === targetFormat
  );

  async function handleConvert() {
    if (!selectedFile || !selectedTarget || isConverting) return;

    setIsConverting(true);
    setMessage(null);

    try {
      if (selectedFile.file_type !== 'image') {
        throw new Error('Only image conversion is available in the browser right now');
      }

      await convertImage(selectedFile, selectedTarget);
      const to = replaceExtension(selectedFile.original_filename, selectedTarget.extension);
      const historyItem: HistoryItem = {
        from: selectedFile.original_filename,
        to,
        timestamp: new Date().toLocaleString(),
        status: 'success',
      };
      setConversionHistory((items) =>
        [historyItem, ...items].slice(0, 10)
      );
      setMessage(`Converted and downloaded ${to}`);
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Conversion failed';
      const historyItem: HistoryItem = {
        from: selectedFile.original_filename,
        to: selectedTarget.extension.toUpperCase(),
        timestamp: new Date().toLocaleString(),
        status: 'error',
      };
      setConversionHistory((items) =>
        [historyItem, ...items].slice(0, 10)
      );
      setMessage(detail);
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <div className="flex h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="flex w-1/2 flex-col border-r border-white/10">
        <div className="border-b border-white/10 bg-white/[0.04] p-5">
          <h1 className="flex items-center gap-2 text-lg font-semibold">
            <Wand2 className="h-5 w-5 text-purple-300" />
            File Converter
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Real browser-side image conversion with safe downloads.
          </p>
        </div>

        <div className="flex-1 space-y-5 overflow-auto p-5">
          <section>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
              Select Source File
            </label>
            <div className="max-h-72 space-y-2 overflow-auto rounded-2xl border border-white/10 bg-black/20 p-2">
              {convertibleFiles.length === 0 ? (
                <div className="p-4 text-sm text-slate-500">
                  No convertible files found. Upload images in File Explorer first.
                </div>
              ) : (
                convertibleFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => {
                      setSelectedFile(file);
                      setTargetFormat('');
                      setMessage(null);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                      selectedFile?.id === file.id
                        ? 'bg-purple-500 text-white'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    {file.file_type === 'image' ? (
                      <ImageIcon className="h-4 w-4 shrink-0" />
                    ) : (
                      <FileType className="h-4 w-4 shrink-0" />
                    )}
                    <span className="min-w-0 flex-1 truncate">
                      {file.original_filename}
                    </span>
                    <span className="text-xs opacity-70">{formatSize(file.file_size)}</span>
                  </button>
                ))
              )}
            </div>
          </section>

          {selectedFile && (
            <section>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-400">
                Convert To
              </label>
              {availableTargets.length === 0 ? (
                <div className="rounded-2xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm text-amber-100">
                  This file type is visible for planning, but browser-side conversion is
                  currently available for image files only.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {availableTargets.map((target) => (
                    <button
                      key={target.extension}
                      onClick={() => setTargetFormat(target.extension)}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        targetFormat === target.extension
                          ? 'border-purple-300 bg-purple-500 text-white'
                          : 'border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {selectedFile && selectedTarget && (
            <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4 text-sm">
              <div className="mb-1 font-semibold text-emerald-100">Ready</div>
              <div className="text-slate-300">
                {selectedFile.original_filename} to{' '}
                {replaceExtension(selectedFile.original_filename, selectedTarget.extension)}
              </div>
            </section>
          )}

          {message && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
              {message}
            </div>
          )}

          <button
            onClick={handleConvert}
            disabled={!selectedFile || !selectedTarget || isConverting}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-sm font-semibold transition ${
              selectedFile && selectedTarget && !isConverting
                ? 'bg-purple-500 text-white hover:bg-purple-400'
                : 'cursor-not-allowed bg-white/10 text-slate-500'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isConverting ? 'animate-spin' : ''}`} />
            {isConverting ? 'Converting...' : 'Convert and Download'}
          </button>
        </div>
      </div>

      <div className="flex w-1/2 flex-col">
        <div className="border-b border-white/10 bg-white/[0.04] p-5">
          <h2 className="text-sm font-semibold">Conversion History</h2>
          <p className="mt-1 text-xs text-slate-400">Last 10 conversion attempts</p>
        </div>

        <div className="flex-1 overflow-auto">
          {conversionHistory.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center">
              <div>
                <FileType className="mx-auto mb-2 h-8 w-8 opacity-30" />
                <p className="text-xs text-slate-500">No conversions yet</p>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {conversionHistory.map((item, index) => (
                <div key={`${item.timestamp}-${index}`} className="p-4 hover:bg-white/[0.04]">
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.from}</p>
                      <p className="truncate text-xs text-slate-400">to {item.to}</p>
                    </div>
                    <Download
                      className={`h-4 w-4 shrink-0 ${
                        item.status === 'success' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{item.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
