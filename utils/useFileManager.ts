"use client";

import { useCallback, useState } from "react";
import { api } from "./api";
import { useAuthStore } from "@/store/authStore";

export interface FileItem {
  id: string;
  original_filename: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  storage_path?: string;
  source?: "supabase" | "media-server";
  ownerId?: string;
  visibility?: 'public' | 'private';
  sharedWith?: { userId: string; canEdit: boolean }[];
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
}

export interface FileStats {
  total_files: number;
  total_size: number;
  file_types: Record<string, number>;
  file_type_sizes?: Record<string, number>;
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useFileManager() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FileStats | null>(null);

  const loadFiles = useCallback(async (fileType?: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let allFiles: FileItem[] = [];
      try {
        const dbFiles = await api.files.list(fileType);
        const sbFiles = dbFiles.map((f: any) => ({
          id: f.id,
          original_filename: f.original_filename,
          file_type: f.file_type,
          mime_type: f.mime_type,
          file_size: f.file_size,
          created_at: f.created_at,
          updated_at: f.created_at,
          storage_path: f.storage_path,
          source: 'supabase' as const,
        }));
        allFiles = [...allFiles, ...sbFiles];
      } catch (err) {
        console.error("Failed to load local files from Supabase.", err);
      }

      try {
        const msData = await api.mediaServer.listFiles(currentUser?.id, currentUser?.role, fileType);
        const msFiles = msData.files.map((f: any) => ({
          id: f.fileId,
          original_filename: f.originalName,
          file_type: f.fileType,
          mime_type: f.mimeType,
          file_size: f.size,
          created_at: f.uploadedAt,
          updated_at: f.uploadedAt,
          storage_path: f.streamUrl,
          source: 'media-server' as const,
          ownerId: f.ownerId,
          visibility: f.visibility,
          sharedWith: f.sharedWith
        }));
        allFiles = [...allFiles, ...msFiles];
      } catch (err) {
        console.error("Failed to load local files from media server.", err);
      }

      // Sort by date descending
      allFiles.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setFiles(allFiles);
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, "Failed to load files");
      setError(errorMsg);
      console.error("Failed to load files:", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser?.id, currentUser?.role]);

  const uploadFile = useCallback(
    async (file: File, destination?: "local" | "b2") => {
      try {
        setError(null);
        const MAX_SUPABASE_SIZE = 50 * 1024 * 1024; // 50MB
        
        let response;
        if (file.size > MAX_SUPABASE_SIZE) {
          // If > 50MB, it goes to mediaServer and respects the user's destination choice
          response = await api.mediaServer.uploadFile(file, currentUser?.id, undefined, destination);
        } else {
          // If <= 50MB, force it to Supabase, ignoring the dropdown
          response = await api.files.upload(file);
        }

        await new Promise((resolve) => setTimeout(resolve, 500));
        await loadFiles();

        return response;
      } catch (err: unknown) {
        const errorMsg = getErrorMessage(err, "Upload failed");
        setError(errorMsg);
        console.error("Upload error:", err);
        throw err;
      }
    },
    [loadFiles, currentUser?.id]
  );

  const downloadFile = useCallback(async (fileId: string, filename: string) => {
    try {
      setError(null);
      // Wait for the state or find in existing files
      // Because we don't have access to the latest files in this callback without dependency,
      // we can use a functional update or just rely on the files array if it's up to date.
      // But a better approach is to pass the source directly, or find it here.
      // Let's find it in the files array:
      const file = files.find(f => f.id === fileId);
      if (!file) throw new Error("File not found");
      
      let url = "";
      if (file.source === 'media-server') {
        url = api.mediaServer.streamUrl(fileId);
      } else {
        url = api.files.downloadUrl(file.storage_path || "");
      }

      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;

      document.body.appendChild(anchor);
      anchor.click();

      window.setTimeout(() => {
        document.body.removeChild(anchor);
      }, 100);
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, "Download failed");
      setError(errorMsg);
      console.error("Download error:", err);
      throw err;
    }
  }, [files]);

  const deleteFile = useCallback(
    async (fileId: string) => {
      try {
        setError(null);
        const file = files.find(f => f.id === fileId);
        if (file?.source === 'media-server') {
          await api.mediaServer.deleteFile(fileId, currentUser?.id, currentUser?.role);
        } else {
          await api.files.delete(fileId);
        }
        
        await loadFiles();
      } catch (err: unknown) {
        const errorMsg = getErrorMessage(err, "Delete failed");
        setError(errorMsg);
        console.error("Delete error:", err);
        throw err;
      }
    },
    [loadFiles, files]
  );

  const loadStats = useCallback(async () => {
    try {
      setError(null);
      
      let total_files = 0;
      let total_size = 0;
      const file_types: Record<string, number> = {};
      const file_type_sizes: Record<string, number> = {};

      try {
        const statsData = await api.files.getStats();
        total_files += statsData.total_files || 0;
        total_size += statsData.total_size || 0;
        for (const [k, v] of Object.entries(statsData.file_types || {})) {
          file_types[k] = (file_types[k] || 0) + Number(v);
        }
        for (const [k, v] of Object.entries(statsData.file_type_sizes || {})) {
          file_type_sizes[k] = (file_type_sizes[k] || 0) + Number(v);
        }
      } catch (err) {
        console.error("Failed to load Supabase stats", err);
      }

      const msFiles = files.filter(f => f.source === 'media-server');
      total_files += msFiles.length;
      msFiles.forEach(file => {
        total_size += Number(file.file_size);
        file_types[file.file_type] = (file_types[file.file_type] || 0) + 1;
        file_type_sizes[file.file_type] = (file_type_sizes[file.file_type] || 0) + Number(file.file_size);
      });

      const newStats = {
        total_files,
        total_size,
        file_types,
        file_type_sizes,
      };

      setStats(newStats);
      return newStats;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, "Failed to load stats");
      setError(errorMsg);
      console.error("Failed to load stats:", err);
      return null;
    }
  }, [files]);

  return {
    files,
    loading,
    error,
    stats,
    loadFiles,
    uploadFile,
    downloadFile,
    deleteFile,
    loadStats,
  };
}
