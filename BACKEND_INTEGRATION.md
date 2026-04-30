# Backend Integration Guide

Your Web OS Desktop now has a complete Python backend for managing files, images, videos, and all types of media. This guide shows how everything is integrated and how to use it.

## ✅ What's Been Setup

### Backend (`/backend`)
- **Framework**: FastAPI (Python)
- **Database**: SQLite (for file metadata)
- **Storage**: Local filesystem (`/backend/storage/uploads/`)
- **Port**: 8000
- **API Docs**: http://127.0.0.1:8000/docs (Swagger UI)

### Frontend Integration
- **API Client**: `/utils/api.ts` - Handles all backend communication
- **File Manager Hook**: `/utils/useFileManager.ts` - React hook for file operations
- **Updated File Explorer**: Includes "Backend" tab to upload/download files
- **Environment**: `.env.local` configured with backend URL

## 🚀 Starting the Backend

### Already Running!
The backend is currently running on **http://127.0.0.1:8000**

To start manually:
```bash
cd backend
py -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```

## 📁 Frontend Usage

### File Explorer App
The File Explorer now has two views:

#### Local Storage Tab
- Browse local VFS (Virtual File System)
- Create folders and files
- Drag and drop operations

#### Backend Storage Tab (Cloud ☁️)
- Upload files by clicking "Upload File"
- Supports all file types:
  - **Images**: jpg, png, gif, webp, svg
  - **Videos**: mp4, avi, mkv, mov, wmv, flv, webm
  - **Audio**: mp3, wav, flac, aac, ogg
  - **Documents**: pdf, doc, docx, txt, xlsx, xls, ppt, pptx
  - **Archives**: zip, rar, 7z, tar, gz
  - **And more**: json, xml, yaml, csv, sql
- Download uploaded files
- Delete files
- View file info (size, type, upload date)

## 💻 API Endpoints

### Health Check
```
GET /health
```

### File Operations
```
POST /api/upload - Upload file
GET /api/files - List files (supports ?file_type=image filtering)
GET /api/files/{id} - Get file info
GET /api/download/{id} - Download file
DELETE /api/files/{id} - Delete file
GET /api/files/stats/summary - Get storage statistics
```

### Folder Operations
```
POST /api/folders - Create folder
GET /api/folders - List folders
GET /api/folders/{id} - Get folder contents
DELETE /api/folders/{id} - Delete folder
```

## 🔧 Using the API in Code

### Upload a File
```typescript
import { api } from '@/utils/api';

const response = await api.files.upload(fileObject);
// Returns: { message, file_id, filename, file_size, mime_type }
```

### List Files
```typescript
const files = await api.files.list(); // All files
const images = await api.files.list('image'); // Only images
```

### Download File
```typescript
const blob = await api.files.download(fileId);
```

### Using the useFileManager Hook
```typescript
const {
  files,
  loading,
  error,
  uploadFile,
  downloadFile,
  deleteFile,
  loadFiles,
  loadStats
} = useFileManager();

// Load all files
await loadFiles();

// Upload
await uploadFile(file);

// Download
await downloadFile(fileId, filename);

// Delete
await deleteFile(fileId);
```

## 📦 File Storage

- Files are stored in: `backend/storage/uploads/`
- Database: `backend/storage/database/webos.db`
- Each file is renamed with UUID to prevent conflicts
- Original filename is preserved in metadata

## ⚙️ Configuration

### Backend Settings (`.env`)
```env
HOST=127.0.0.1              # Server host
PORT=8000                   # Server port
DEBUG=True                  # Auto-reload on code changes
```

### Frontend Settings (`.env.local`)
```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

Change these values for production deployment.

## 📊 File Statistics

View storage statistics:
```typescript
const stats = await api.files.getStats();
// Returns: { total_files, total_size, file_types }
```

## 🎯 Features

✅ **File Upload** - Multiple file support, up to 500MB each  
✅ **File Download** - Download with original filename  
✅ **File Management** - Delete, view metadata  
✅ **File Types** - 40+ file types supported  
✅ **Organization** - Folder structure support  
✅ **Metadata** - Automatic file type detection, size tracking  
✅ **CORS** - Enabled for frontend integration  
✅ **API Docs** - Interactive Swagger UI at /docs  

## 🔌 API Documentation

View interactive API documentation:
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

Test all endpoints directly in the browser.

## 🐛 Troubleshooting

### Backend Won't Start
```bash
# Check if port 8000 is in use
# Kill any process on port 8000, or change PORT in .env
```

### Upload Fails
- Check file type is supported
- Verify file size < 500MB
- Ensure backend is running

### Files Not Showing
- Refresh the page
- Check browser console for errors
- Verify API URL in .env.local

### Storage Issues
```bash
# Clear database and start fresh
rm backend/storage/database/webos.db
# Backend will recreate it on next startup
```

## 📈 Next Steps

1. **Test File Upload**
   - Open File Explorer
   - Switch to "Backend" tab
   - Upload an image/video
   - Download to verify

2. **Integrate with Other Apps**
   - Import `useFileManager` in any app
   - Use for media handling
   - Build image gallery, video player, etc.

3. **Extend Backend**
   - Add user authentication
   - Implement sharing/permissions
   - Add image resizing, transcoding
   - Build full cloud storage solution

## 🚀 Production Deployment

When deploying:

1. Update `.env` with production settings
2. Use a proper database (PostgreSQL)
3. Use object storage (S3, Azure Blob)
4. Add authentication/authorization
5. Configure CORS for production domain
6. Use reverse proxy (Nginx)
7. Enable HTTPS

## 📚 Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: SQLAlchemy + SQLite
- **Frontend**: Next.js + React
- **File Management**: Custom API client
- **Storage**: Local filesystem (replaceable with S3)

---

**Backend Running**: ✅ http://127.0.0.1:8000  
**Frontend**: http://localhost:3000 (Next.js dev server)  
**API Docs**: http://127.0.0.1:8000/docs
