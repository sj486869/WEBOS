'use client';

import {
  Activity,
  BarChart3,
  Download,
  FileText,
  HardDrive,
  PieChart,
  Settings,
  Share2,
  TrendingUp,
} from 'lucide-react';
import { useEffect, useMemo, useState, type ReactNode } from 'react';

import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';

interface Stat {
  label: string;
  value: string | number;
  change: number;
  icon: ReactNode;
  color: string;
}

interface FileTypeStats {
  type: string;
  count: number;
  size: number;
  percentage: number;
}

const STORAGE_QUOTA_BYTES = 500 * 1024 * 1024 * 1024;

function formatStorage(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function colorForType(index: number) {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-green-500',
    'bg-cyan-500',
    'bg-indigo-500',
    'bg-red-500',
  ];
  return colors[index % colors.length];
}

export function DashboardApp({}: AppComponentProps) {
  const { files, loadFiles } = useFileManager();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const totalSize = useMemo(
    () => files.reduce((sum, file) => sum + file.file_size, 0),
    [files]
  );

  const fileStats = useMemo<FileTypeStats[]>(() => {
    const byExtension: Record<string, FileTypeStats> = {};

    for (const file of files) {
      const ext = file.original_filename.split('.').pop()?.toLowerCase() || 'unknown';
      byExtension[ext] ??= {
        type: ext.toUpperCase(),
        count: 0,
        size: 0,
        percentage: 0,
      };
      byExtension[ext].count += 1;
      byExtension[ext].size += file.file_size;
    }

    return Object.values(byExtension)
      .map((stat) => ({
        ...stat,
        percentage: totalSize > 0 ? Math.round((stat.size / totalSize) * 100) : 0,
      }))
      .sort((a, b) => b.size - a.size);
  }, [files, totalSize]);

  const stats = useMemo<Stat[]>(() => {
    const imageCount = files.filter((file) => file.file_type === 'image').length;
    const videoCount = files.filter((file) => file.file_type === 'video').length;
    const documentCount = files.filter((file) => file.file_type === 'document').length;

    return [
      {
        label: 'Total Files',
        value: files.length,
        change: 12,
        icon: <FileText className="h-5 w-5" />,
        color: 'text-blue-500',
      },
      {
        label: 'Total Storage',
        value: formatStorage(totalSize),
        change: 8,
        icon: <HardDrive className="h-5 w-5" />,
        color: 'text-green-500',
      },
      {
        label: 'Images',
        value: imageCount,
        change: 5,
        icon: <Activity className="h-5 w-5" />,
        color: 'text-purple-500',
      },
      {
        label: 'Videos',
        value: videoCount,
        change: 3,
        icon: <TrendingUp className="h-5 w-5" />,
        color: 'text-orange-500',
      },
      {
        label: 'Documents',
        value: documentCount,
        change: 4,
        icon: <FileText className="h-5 w-5" />,
        color: 'text-cyan-500',
      },
    ];
  }, [files, totalSize]);

  const storageUsePercent = Math.min(
    100,
    Math.round((totalSize / STORAGE_QUOTA_BYTES) * 100)
  );

  const rangeLabel =
    timeRange === '7d'
      ? 'Last 7 days'
      : timeRange === '30d'
        ? 'Last 30 days'
        : 'Last 90 days';

  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="border-b border-white/10 bg-white/[0.04] backdrop-blur">
        <div className="px-6 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="mt-1 text-sm text-slate-400">
                Storage analytics, media health, and recent activity for {rangeLabel}.
              </p>
            </div>

            <div className="flex gap-3">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as typeof timeRange)}
                className="rounded-lg border border-white/10 bg-slate-900 px-4 py-2 text-sm font-medium outline-none transition hover:bg-slate-800"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>

              <button className="rounded-lg border border-white/10 p-2 transition hover:bg-white/10">
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 transition hover:-translate-y-0.5 hover:border-white/20"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className={`${stat.color} opacity-90`}>{stat.icon}</div>
                <div className="rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-semibold text-emerald-300">
                  +{stat.change}%
                </div>
              </div>
              <h3 className="mb-1 text-sm text-slate-400">{stat.label}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <PieChart className="h-5 w-5 text-blue-400" />
                File Type Distribution
              </h2>
              <button className="rounded-lg p-2 transition hover:bg-white/10">
                <Download className="h-4 w-4" />
              </button>
            </div>

            {fileStats.length === 0 ? (
              <div className="py-12 text-center text-slate-500">No files to display</div>
            ) : (
              <div className="space-y-4">
                {fileStats.map((stat, index) => (
                  <div key={stat.type}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="text-sm font-medium">{stat.type}</span>
                      <span className="text-xs text-slate-400">
                        {stat.count} files - {formatStorage(stat.size)}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800">
                      <div
                        className={`${colorForType(index)} h-2 rounded-full transition`}
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <HardDrive className="h-5 w-5 text-green-400" />
                Storage Usage
              </h2>
              <button className="rounded-lg p-2 transition hover:bg-white/10">
                <Share2 className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center gap-8">
              <div className="relative h-40 w-40">
                <svg className="h-40 w-40 -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="#3b82f6"
                    strokeDasharray={`${439.6 * (storageUsePercent / 100)} 439.6`}
                    strokeLinecap="round"
                    strokeWidth="8"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold">{storageUsePercent}%</span>
                  <span className="text-xs text-slate-400">Used</span>
                </div>
              </div>

              <div className="w-full space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Used Space</span>
                  <span className="font-semibold">{formatStorage(totalSize)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Available</span>
                  <span className="font-semibold">
                    {formatStorage(Math.max(0, STORAGE_QUOTA_BYTES - totalSize))}
                  </span>
                </div>
                <div className="flex justify-between border-t border-white/10 pt-3">
                  <span className="text-slate-400">Local Quota</span>
                  <span className="font-semibold">{formatStorage(STORAGE_QUOTA_BYTES)}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold">
            <BarChart3 className="h-5 w-5 text-purple-400" />
            Recent Files
          </h2>

          {files.length === 0 ? (
            <div className="py-12 text-center text-slate-500">No files in system</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-white/10 text-xs font-semibold uppercase text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">File Name</th>
                    <th className="px-4 py-3 text-left">Kind</th>
                    <th className="px-4 py-3 text-left">MIME</th>
                    <th className="px-4 py-3 text-right">Size</th>
                    <th className="px-4 py-3 text-right">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {files.slice(0, 10).map((file) => (
                    <tr key={file.id} className="transition hover:bg-white/[0.04]">
                      <td className="max-w-80 truncate px-4 py-3 font-medium">
                        {file.original_filename}
                      </td>
                      <td className="px-4 py-3 capitalize text-slate-300">
                        {file.file_type}
                      </td>
                      <td className="px-4 py-3 text-slate-400">{file.mime_type}</td>
                      <td className="px-4 py-3 text-right">{formatStorage(file.file_size)}</td>
                      <td className="px-4 py-3 text-right text-slate-400">
                        {new Date(file.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
