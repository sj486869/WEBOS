'use client';

import { ChevronLeft, ChevronRight, Download, FileText, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import type { AppComponentProps } from '@/core/os/appRegistry';
import { api } from '@/utils/api';
import { useFileManager, type FileItem } from '@/utils/useFileManager';

function isDocument(file: FileItem) {
  return (
    file.file_type === 'document' ||
    file.mime_type === 'text/plain' ||
    file.mime_type === 'application/pdf' ||
    file.mime_type === 'application/msword' ||
    file.mime_type.includes('officedocument')
  );
}

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function documentLabel(file: FileItem) {
  if (file.mime_type === 'text/plain') return 'Text Document';
  if (file.mime_type === 'application/pdf') return 'PDF Document';
  if (file.mime_type.includes('word')) return 'Word Document';
  if (file.mime_type.includes('spreadsheet') || file.mime_type.includes('excel')) {
    return 'Spreadsheet';
  }
  if (file.mime_type.includes('presentation')) return 'Presentation';
  return 'Document';
}

export function DocumentViewerApp({}: AppComponentProps) {
  const { files, downloadFile, deleteFile, loadFiles } = useFileManager();
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fileContent, setFileContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const documents = useMemo(() => files.filter(isDocument), [files]);
  const textFiles = documents.filter((file) => file.mime_type === 'text/plain');
  const pdfFiles = documents.filter((file) => file.mime_type === 'application/pdf');
  const officeFiles = documents.filter(
    (file) => file.mime_type.includes('word') || file.mime_type.includes('officedocument')
  );

  useEffect(() => {
    if (!selectedFile) return;
    const nextIndex = documents.findIndex((file) => file.id === selectedFile.id);
    if (nextIndex === -1) {
      setSelectedFile(null);
      setFileContent('');
      setCurrentIndex(0);
    } else {
      setCurrentIndex(nextIndex);
    }
  }, [documents, selectedFile]);

  useEffect(() => {
    if (!selectedFile) return;
    if (selectedFile.mime_type === 'text/plain') {
      loadFileContent(selectedFile);
    } else {
      setFileContent('');
    }
  }, [selectedFile]);

  async function loadFileContent(file: FileItem) {
    setIsLoading(true);
    try {
      const response = await fetch(api.files.downloadUrl(file.id));
      if (!response.ok) throw new Error('Failed to load file');
      setFileContent(await response.text());
    } catch (error) {
      console.error('Error loading file:', error);
      setFileContent('Error loading file content');
    } finally {
      setIsLoading(false);
    }
  }

  function handlePrevious() {
    if (currentIndex <= 0) return;
    const nextIndex = currentIndex - 1;
    setCurrentIndex(nextIndex);
    setSelectedFile(documents[nextIndex]);
  }

  function handleNext() {
    if (currentIndex >= documents.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    setSelectedFile(documents[nextIndex]);
  }

  async function handleDelete() {
    if (!selectedFile) return;
    if (!confirm(`Delete ${selectedFile.original_filename}?`)) return;

    const remainingDocuments = documents.filter((file) => file.id !== selectedFile.id);

    try {
      await deleteFile(selectedFile.id);
      await loadFiles();

      if (remainingDocuments.length === 0) {
        setSelectedFile(null);
        setFileContent('');
        setCurrentIndex(0);
        return;
      }

      const nextIndex = Math.min(currentIndex, remainingDocuments.length - 1);
      setCurrentIndex(nextIndex);
      setSelectedFile(remainingDocuments[nextIndex]);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  return (
    <div className="flex h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <aside className="flex w-72 flex-col border-r border-white/10 bg-white/[0.03]">
        <div className="border-b border-white/10 p-4">
          <h2 className="text-sm font-semibold">Documents</h2>
          <p className="mt-1 text-xs text-slate-400">
            {documents.length} document{documents.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex-1 overflow-auto divide-y divide-white/10">
          {documents.length === 0 ? (
            <div className="flex h-full items-center justify-center p-4 text-center">
              <div>
                <FileText className="mx-auto mb-2 h-6 w-6 opacity-30" />
                <p className="text-xs text-slate-500">No documents uploaded</p>
              </div>
            </div>
          ) : (
            documents.map((doc, index) => (
              <button
                key={doc.id}
                onClick={() => {
                  setSelectedFile(doc);
                  setCurrentIndex(index);
                }}
                className={`w-full p-3 text-left transition ${
                  selectedFile?.id === doc.id ? 'bg-blue-500 text-white' : 'hover:bg-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{doc.original_filename}</p>
                    <p className="text-xs opacity-70">{formatSize(doc.file_size)}</p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {documents.length > 0 && (
          <div className="space-y-2 border-t border-white/10 p-3 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Text Files</span>
              <span className="font-semibold text-slate-200">{textFiles.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>PDF Files</span>
              <span className="font-semibold text-slate-200">{pdfFiles.length}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Office Files</span>
              <span className="font-semibold text-slate-200">{officeFiles.length}</span>
            </div>
          </div>
        )}
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        {selectedFile ? (
          <>
            <div className="border-b border-white/10 bg-white/[0.04] p-4">
              <div className="mb-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h1 className="truncate font-semibold">{selectedFile.original_filename}</h1>
                  <p className="text-xs text-slate-400">{documentLabel(selectedFile)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="rounded-lg p-2 transition hover:bg-white/10 disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="w-16 text-center text-xs text-slate-400">
                    {currentIndex + 1} / {documents.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === documents.length - 1}
                    className="rounded-lg p-2 transition hover:bg-white/10 disabled:opacity-40"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => downloadFile(selectedFile.id, selectedFile.original_filename)}
                  className="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-400"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-400"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto">
              {selectedFile.mime_type === 'text/plain' ? (
                isLoading ? (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-sm text-slate-400">Loading...</p>
                  </div>
                ) : (
                  <pre className="min-h-full whitespace-pre-wrap break-words bg-slate-950/60 p-6 font-mono text-sm leading-6">
                    {fileContent}
                  </pre>
                )
              ) : selectedFile.mime_type === 'application/pdf' ? (
                <iframe
                  title={selectedFile.original_filename}
                  src={api.files.downloadUrl(selectedFile.id)}
                  className="h-full w-full bg-white"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center">
                  <div>
                    <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
                    <p className="mb-2 text-sm text-slate-300">Preview not available</p>
                    <p className="text-xs text-slate-500">
                      Download the file to open it in a native document app.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-white/10 bg-white/[0.03] p-3 text-xs text-slate-400">
              <div>
                <span className="text-slate-500">Size:</span> {formatSize(selectedFile.file_size)}
              </div>
              <div>
                <span className="text-slate-500">MIME:</span> {selectedFile.mime_type}
              </div>
              <div>
                <span className="text-slate-500">Created:</span>{' '}
                {new Date(selectedFile.created_at).toLocaleDateString()}
              </div>
              <div>
                <span className="text-slate-500">ID:</span> {selectedFile.id.slice(0, 8)}...
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <FileText className="mx-auto mb-2 h-8 w-8 opacity-30" />
              <p className="text-sm text-slate-400">Select a document to view</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
