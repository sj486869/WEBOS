"use client";

import { useCallback, useState } from "react";

import { api } from "./api";

export interface FileItem {
  id: string;
  original_filename: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  storage_path?: string;
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
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<FileStats | null>(null);

  const loadFiles = useCallback(async (fileType?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.files.list(fileType);
      setFiles(data || []);
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, "Failed to load files");
      setError(errorMsg);
      console.error("Failed to load files:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setError(null);
        const response = await api.files.upload(file);

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
    [loadFiles]
  );

  const downloadFile = useCallback(async (fileId: string, filename: string) => {
    try {
      setError(null);

      const url = api.files.downloadUrl(fileId);
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
  }, []);

  const deleteFile = useCallback(
    async (fileId: string) => {
      try {
        setError(null);
        await api.files.delete(fileId);
        await loadFiles();
      } catch (err: unknown) {
        const errorMsg = getErrorMessage(err, "Delete failed");
        setError(errorMsg);
        console.error("Delete error:", err);
        throw err;
      }
    },
    [loadFiles]
  );

  const loadStats = useCallback(async () => {
    try {
      setError(null);
      const data = await api.files.getStats();
      setStats(data);
      return data;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, "Failed to load stats");
      setError(errorMsg);
      console.error("Failed to load stats:", err);
      return null;
    }
  }, []);

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
