import { supabase } from "./supabase";

export const api = {
  baseUrl: "",

  async health() {
    return { status: "healthy", service: "Supabase Backend" };
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
      const uniqueFilename = `${crypto.randomUUID()}_${originalFilename}`;

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

    downloadUrl(fileId: string) {
      return `/api/download?id=${encodeURIComponent(fileId)}`;
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
};
