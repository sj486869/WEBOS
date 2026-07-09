import { supabase } from "./supabase";
import { MEDIA_SERVER_URL } from "./config";

export const api = {
  baseUrl: "",

  async health() {
    return { status: "healthy", service: "Supabase Backend" };
  },

  users: {
    async list() {
      const { data, error } = await supabase.from("os_users").select("*");
      if (error) throw error;
      return data.map((u: any) => ({
        id: u.id,
        username: u.username,
        password: u.password,
        role: u.role,
        createdAt: new Date(u.created_at).getTime(),
      }));
    },
    async save(user: any) {
      const payload = {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
        created_at: new Date(user.createdAt || user.created_at || Date.now()).toISOString(),
      };
      const { data, error } = await supabase.from("os_users").upsert(payload).select();
      if (error && error.code !== "PGRST116") throw error; // PGRST116 is No rows returned
      return data;
    },
    async delete(id: string) {
      const { error } = await supabase.from("os_users").delete().eq("id", id);
      if (error) throw error;
    }
  },

  files: {
    async list(fileType?: string, skip = 0, limit = 100) {
      let query = supabase
        .from("files")
        .select("*")
        .order("created_at", { ascending: false })
        .range(skip, skip + limit - 1);

      if (fileType) {
        query = query.eq("file_type", fileType);
      }

      const { data, error } = await query;
      if (error) throw new Error(`Failed to list files: ${error.message}`);
      return data || [];
    },

    async getInfo(fileId: string) {
      const { data, error } = await supabase
        .from("files")
        .select("*")
        .eq("id", fileId)
        .maybeSingle();

      if (error) throw new Error(`Failed to get file info: ${error.message}`);
      if (!data) throw new Error("File not found in database");
      return data;
    },

    async upload(file: File, description?: string, tags?: string) {
      void description;
      void tags;

      const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
      const originalFilename = file.name;
      const uniqueFilename = `${Math.random().toString(36).substring(2, 15)}_${originalFilename}`;

      const { data: storageData, error: storageError } = await supabase.storage
        .from("uploads")
        .upload(uniqueFilename, file);

      if (storageError) throw new Error(`Upload failed: ${storageError.message}`);

      let fileType = "other";
      if (["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"].includes(fileExt)) {
        fileType = "image";
      } else if (["mp4", "avi", "mkv", "mov", "wmv", "flv", "webm"].includes(fileExt)) {
        fileType = "video";
      } else if (["mp3", "wav", "flac", "aac", "wma", "ogg"].includes(fileExt)) {
        fileType = "audio";
      } else if (["pdf", "doc", "docx", "txt", "xlsx", "xls", "ppt", "pptx"].includes(fileExt)) {
        fileType = "document";
      } else if (["zip", "rar", "7z", "tar", "gz"].includes(fileExt)) {
        fileType = "archive";
      }

      const { data, error } = await supabase
        .from("files")
        .insert({
          filename: uniqueFilename,
          original_filename: originalFilename,
          file_type: fileType,
          mime_type: file.type || "application/octet-stream",
          file_size: file.size,
          storage_path: storageData.path,
        })
        .select()
        .single();

      if (error) throw new Error(`Database insert failed: ${error.message}`);
      return data;
    },

    downloadUrl(storage_path: string) {
      if (!storage_path) return "";
      const { data } = supabase.storage.from("uploads").getPublicUrl(storage_path);
      return data.publicUrl;
    },

    async download(fileId: string) {
      const fileInfo = await this.getInfo(fileId);
      const { data, error } = await supabase.storage
        .from("uploads")
        .download(fileInfo.storage_path);

      if (error) throw new Error(`Download failed: ${error.message}`);
      return data;
    },

    async delete(fileId: string) {
      const { data: fileInfo, error: infoError } = await supabase
        .from("files")
        .select("*")
        .eq("id", fileId)
        .maybeSingle();

      if (!fileInfo || infoError) {
        return { message: "File deleted successfully" };
      }

      const { error: storageError } = await supabase.storage
        .from("uploads")
        .remove([fileInfo.storage_path]);

      if (storageError) console.error(`Storage delete failed: ${storageError.message}`);

      const { error } = await supabase.from("files").delete().eq("id", fileId);
      if (error) throw new Error(`Delete failed: ${error.message}`);

      return { message: "File deleted successfully" };
    },

    async getStats() {
      const { data, error } = await supabase.from("files").select("file_size, file_type");
      if (error) throw new Error("Failed to get stats");

      let total_size = 0;
      const file_types: Record<string, number> = {};
      const file_type_sizes: Record<string, number> = {};

      data.forEach((file) => {
        total_size += Number(file.file_size);
        file_types[file.file_type] = (file_types[file.file_type] || 0) + 1;
        file_type_sizes[file.file_type] =
          (file_type_sizes[file.file_type] || 0) + Number(file.file_size);
      });

      return {
        total_files: data.length,
        total_size,
        file_types,
        file_type_sizes,
      };
    },
  },

  folders: {
    async create(name: string, parentId?: string) {
      const { data, error } = await supabase
        .from("folders")
        .insert({
          name,
          parent_id: parentId || null,
        })
        .select()
        .single();

      if (error) throw new Error(`Failed to create folder: ${error.message}`);
      return data;
    },

    async list(parentId?: string) {
      let query = supabase.from("folders").select("*").order("name", { ascending: true });
      if (parentId) {
        query = query.eq("parent_id", parentId);
      } else {
        query = query.is("parent_id", null);
      }

      const { data, error } = await query;
      if (error) throw new Error(`Failed to list folders: ${error.message}`);
      return data || [];
    },

    async getContents(folderId: string) {
      const { data: folder, error: folderError } = await supabase
        .from("folders")
        .select("*")
        .eq("id", folderId)
        .single();

      if (folderError) throw new Error(`Folder not found: ${folderError.message}`);

      const { data: subfolders, error: subError } = await supabase
        .from("folders")
        .select("*")
        .eq("parent_id", folderId)
        .order("name", { ascending: true });

      if (subError) throw new Error(`Failed to get subfolders: ${subError.message}`);

      return { folder, files: [], subfolders: subfolders || [] };
    },

    async delete(folderId: string) {
      const { error } = await supabase.from("folders").delete().eq("id", folderId);
      if (error) throw new Error(`Failed to delete folder: ${error.message}`);
      return { message: "Folder deleted successfully" };
    },
  },

  /**
   * mediaServer — connects to the standalone video-server backend.
   * URL is stored in localStorage under "webos_media_server_url".
   * Supports large file streaming (HTTP Range) and chunked upload.
   */
  mediaServer: {
    getBaseUrl(): string {
      return MEDIA_SERVER_URL;
    },

    /** Streaming URL for a file (supports Range requests for seeking) */
    streamUrl(fileId: string): string {
      return `${this.getBaseUrl()}/stream/${encodeURIComponent(fileId)}`;
    },

    /** Check if the server is reachable */
    async health() {
      const res = await fetch(`${this.getBaseUrl()}/health`, {
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) throw new Error(`Media server health check failed: ${res.status}`);
      return res.json();
    },

    /** List all files on the media server */
    async listFiles(userId?: string, role?: string, type?: string) {
      const params = new URLSearchParams();
      if (type) params.append("type", type);
      if (userId) params.append("userId", userId);
      if (role) params.append("role", role);

      const url = `${this.getBaseUrl()}/files?${params.toString()}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to list media server files: ${res.status}`);
      return res.json() as Promise<{
        files: Array<{
          fileId: string;
          originalName: string;
          fileType: string;
          mimeType: string;
          size: number;
          sizeHuman: string;
          uploadedAt: string;
          streamUrl: string;
        }>;
        total: number;
      }>;
    },

    /**
     * Upload a file to the media server with progress callback.
     * Automatically uses chunked upload for files > 50 MB.
     */
    async uploadFile(
      file: File,
      userId?: string,
      onProgress?: (percent: number) => void,
      destination?: "local" | "b2"
    ): Promise<{ fileId: string; filename: string; size: number; streamUrl: string }> {
      const CHUNK_SIZE = 50 * 1024 * 1024; // 50 MB per chunk
      const baseUrl = this.getBaseUrl();
      const destQuery = destination === "b2" ? "?destination=b2" : "";

      if (file.size <= CHUNK_SIZE) {
        // Single upload
        const formData = new FormData();
        formData.append("file", file);
        if (userId) formData.append("userId", userId);
        const res = await fetch(`${baseUrl}/upload${destQuery}`, { method: "POST", body: formData });
        if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
        onProgress?.(100);
        return res.json();
      }

      // Chunked upload
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const fileId = crypto.randomUUID();
      let lastResult: Record<string, unknown> | null = null;

      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("file", chunk, file.name);

        const res = await fetch(`${baseUrl}/upload${destQuery}`, {
          method: "POST",
          headers: {
            "X-File-Id": fileId,
            "X-Chunk-Index": String(i),
            "X-Total-Chunks": String(totalChunks),
            "X-Original-Name": encodeURIComponent(file.name),
            ...(userId ? { "X-User-Id": userId } : {}),
          },
          body: formData,
        });

        if (!res.ok) throw new Error(`Chunk ${i} upload failed: ${res.status}`);
        lastResult = await res.json() as Record<string, unknown>;
        onProgress?.(Math.round(((i + 1) / totalChunks) * 100));
      }

      return lastResult as { fileId: string; filename: string; size: number; streamUrl: string };
    },

    /** Delete a file from the media server */
    async deleteFile(fileId: string, userId?: string, role?: string) {
      const url = new URL(`${this.getBaseUrl()}/files/${fileId}`);
      if (userId) url.searchParams.append("userId", userId);
      if (role) url.searchParams.append("role", role);
      const res = await fetch(url.toString(), { method: "DELETE" });
      if (!res.ok) throw new Error(`Failed to delete media server file: ${res.status}`);
      return res.json();
    },

    /** Update file permissions */
    async updatePermissions(fileId: string, visibility: string, sharedWith: { userId: string, canEdit: boolean }[]) {
      const res = await fetch(`${this.getBaseUrl()}/files/${fileId}/permissions`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibility, sharedWith }),
      });
      if (!res.ok) throw new Error(`Failed to update permissions: ${res.status}`);
      return res.json();
    },
  },

  workspace: {
    getBaseUrl(): string {
      if (typeof window === "undefined") return "https://asj.qzz.io";
      return localStorage.getItem("webos_media_server_url") || "https://asj.qzz.io";
    },

    async getTree() {
      const res = await fetch(`${this.getBaseUrl()}/workspace/tree`);
      if (!res.ok) throw new Error(`Failed to load workspace tree: ${res.status}`);
      return res.json();
    },

    async readFile(filePath: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/file?path=${encodeURIComponent(filePath)}`);
      if (!res.ok) throw new Error(`Failed to read file: ${res.status}`);
      return res.text();
    },

    async writeFile(filePath: string, content: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/file`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: filePath, content }),
      });
      if (!res.ok) throw new Error(`Failed to write file: ${res.status}`);
      return res.json();
    },

    async runCode(filePath: string, role: string = 'guest') {
      const res = await fetch(`${this.getBaseUrl()}/workspace/run`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-User-Role": role
        },
        body: JSON.stringify({ path: filePath }),
      });
      if (!res.ok) {
        let err = await res.text();
        try { err = JSON.parse(err).error || err; } catch {}
        throw new Error(`Execution failed: ${err}`);
      }
      return res.json();
    },

    async createFolder(folderPath: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/folder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: folderPath }),
      });
      if (!res.ok) throw new Error(`Failed to create folder: ${res.status}`);
      return res.json();
    },

    async deletePath(targetPath: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/path?path=${encodeURIComponent(targetPath)}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Failed to delete path: ${res.status}`);
      return res.json();
    },

    async renamePath(oldPath: string, newPath: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/rename`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPath, newPath }),
      });
      if (!res.ok) throw new Error(`Failed to rename path: ${res.status}`);
      return res.json();
    },

    async runTerminal(command: string, role: string = 'guest') {
      const res = await fetch(`${this.getBaseUrl()}/workspace/terminal`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-User-Role": role
        },
        body: JSON.stringify({ command }),
      });
      if (!res.ok) {
        let err = await res.text();
        try { err = JSON.parse(err).error || err; } catch {}
        throw new Error(`Terminal execution failed: ${err}`);
      }
      return res.json();
    },

    async search(query: string) {
      const res = await fetch(`${this.getBaseUrl()}/workspace/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error(`Search failed: ${res.status}`);
      return res.json();
    },
  },

  downloader: {
    getBaseUrl() {
      return MEDIA_SERVER_URL;
    },
    async downloadLink(url: string, destination: "local" | "b2" = "local") {
      const res = await fetch(`${this.getBaseUrl()}/download`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, destination }),
      });
      if (!res.ok) {
        let err = await res.text();
        try { err = JSON.parse(err).error || err; } catch {}
        throw new Error(`${err}`);
      }
      return res.json();
    }
  }
};

