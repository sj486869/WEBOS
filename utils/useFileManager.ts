// Hook for managing backend file operations
'use client';

import { useState, useCallback } from 'react';
import { api } from './api';

export interface FileItem {
  id: string;
  original_filename: string;
  file_type: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  updated_at: string;
}

export interface UploadProgress {
  fileId: string;
  progress: number;
  status: 'uploading' | 'success' | 'error';
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

  // Load files from backend
  const loadFiles = useCallback(async (fileType?: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.files.list(fileType);
      setFiles(data || []);
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Failed to load files');
      setError(errorMsg);
      console.error('Failed to load files:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Upload file to backend
  const uploadFile = useCallback(async (file: File) => {
    try {
      setError(null);
      const response = await api.files.upload(file);
      
      // Wait a moment then reload files list
      await new Promise(resolve => setTimeout(resolve, 500));
      await loadFiles();
      
      return response;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Upload failed');
      setError(errorMsg);
      console.error('Upload error:', err);
      throw err;
    }
  }, [loadFiles]);

  // Download file from backend
  const downloadFile = useCallback(async (fileId: string, filename: string) => {
    try {
      setError(null);
      console.log('Starting download for file:', fileId, filename);
      
      const url = api.files.downloadUrl(fileId);
      
      // Fetch the file directly
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      
      // Create a blob URL and force download
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      
      console.log('Triggering download:', filename);
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
        console.log('Download cleanup completed');
      }, 100);
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Download failed');
      setError(errorMsg);
      console.error('Download error:', {
        message: errorMsg,
        stack: err instanceof Error ? err.stack : undefined,
        details: err
      });
      throw err;
    }
  }, []);

  // Delete file from backend
  const deleteFile = useCallback(async (fileId: string) => {
    try {
      setError(null);
      await api.files.delete(fileId);
      
      // Reload files list
      await loadFiles();
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Delete failed');
      setError(errorMsg);
      console.error('Delete error:', err);
      throw err;
    }
  }, [loadFiles]);

  // Get file statistics
  const loadStats = useCallback(async () => {
    try {
      setError(null);
      const data = await api.files.getStats();
      setStats(data);
      return data;
    } catch (err: unknown) {
      const errorMsg = getErrorMessage(err, 'Failed to load stats');
      setError(errorMsg);
      console.error('Failed to load stats:', err);
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
