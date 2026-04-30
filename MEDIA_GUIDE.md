# Media Management System - Complete Guide

Your Web OS Desktop now has a complete media management system with create, edit, view, and delete capabilities for images, videos, and all media types.

## 🎯 What You Can Do Now

### ✅ Create & Upload
- Upload images, videos, audio files, documents from File Explorer
- Batch upload multiple files at once
- Automatic file type detection

### ✅ View
- **Image Gallery**: View all images in a beautiful grid, zoom in/out, navigate with arrow keys
- **Video Player**: Play videos with full controls
- **Media Manager**: Browse all files with file info and statistics

### ✅ Edit (Metadata)
- View file details (name, size, type, upload date)
- Download files anytime
- Organize in folders (File Explorer)

### ✅ Delete
- Delete individual files
- Confirmation before deletion
- Automatic cleanup

## 📱 Available Apps

### 1. **File Explorer** (Already had this)
- Upload files to backend
- Switch between Local and Cloud storage
- Upload button for backend storage tab

### 2. **Image Gallery** (NEW)
- View all uploaded images
- Grid thumbnail view
- Full-screen image viewer
- Zoom in (⬆️) / Zoom out (⬇️)
- Navigate with arrow keys (← →)
- Download & delete buttons
- Close with Escape key

### 3. **Video Player** (NEW)
- List of all uploaded videos
- Click to play in full screen
- Built-in HTML5 video controls:
  - Play/Pause
  - Volume control
  - Fullscreen
  - Timeline scrubbing
- Download & delete options
- File size information

### 4. **Media Manager** (NEW)
- Complete media hub
- Upload new files
- View statistics:
  - Total files count
  - Total storage used
  - Files by type (Images, Videos, Audio, Documents, Archives)
- Filter by file type:
  - All Files
  - Images
  - Videos
  - Audio
  - Documents
  - Archives
- Thumbnail previews (images only)
- Download & delete
- File size display

## 🚀 How To Use

### Upload Files
**Method 1: File Explorer**
1. Click File Explorer
2. Switch to "Backend" tab
3. Click "Upload File"
4. Select one or more files
5. Files appear in list

**Method 2: Media Manager**
1. Click Media Manager
2. Click "Upload Media" button
3. Select files
4. Auto-filters by type

### View Images
1. Click **Image Gallery** from taskbar
2. See grid of image thumbnails
3. Click any image to open
4. Use arrow keys to navigate
5. Scroll to zoom (or use ⬆️⬇️ buttons)
6. Press Escape to close

### Watch Videos
1. Click **Video Player** from taskbar
2. See list of videos
3. Click video to play
4. Use standard video controls
5. Close window to stop

### Manage All Media
1. Click **Media Manager** from taskbar
2. See storage statistics
3. Filter by type (Images, Videos, etc.)
4. Hover over files to see download/delete
5. Upload new files anytime

## 📊 File Statistics

Media Manager shows:
- **Total Files**: All uploaded files
- **Total Size**: Combined file size in MB
- **Images**: Number of image files
- **Videos**: Number of video files
- **Audio**: Number of audio files
- **Documents**: Number of documents

## 🔧 Supported Formats

### Images
- JPEG, JPG, PNG, GIF, BMP, WebP, SVG

### Videos
- MP4, AVI, MKV, MOV, WMV, FLV, WebM

### Audio
- MP3, WAV, FLAC, AAC, WMA, OGG

### Documents
- PDF, DOC, DOCX, TXT, XLS, XLSX, PPT, PPTX

### Archives
- ZIP, RAR, 7Z, TAR, GZ

## 🎮 Keyboard Shortcuts

### Image Gallery
- **Arrow Right (→)**: Next image
- **Arrow Left (←)**: Previous image
- **+**: Zoom in (or use button)
- **-**: Zoom out (or use button)
- **Escape**: Close viewer

### Video Player
- **Space**: Play/Pause
- **F**: Fullscreen
- **M**: Mute/Unmute
- **←/→**: Rewind/Forward 10s

## 🌨️ Backend Storage Information

Your files are stored securely:
- **Location**: `backend/storage/uploads/`
- **Database**: `backend/storage/database/webos.db`
- **Maximum file**: 500 MB per file
- **Max total**: Unlimited (depends on disk space)

Each file is:
- Renamed with UUID to prevent conflicts
- Original filename preserved in database
- File type auto-detected
- File size tracked
- Upload time recorded

## 📈 Data

View in Media Manager:
- How many images you have
- How many videos
- Total storage used
- File type breakdown

## 🔌 System Architecture

```
Frontend (Next.js)
  ├── File Explorer
  │   ├── Local VFS
  │   └── Backend Storage
  ├── Image Gallery
  └── Video Player
  └── Media Manager
        ↓
Backend API (FastAPI)
  ├── File Upload/Download
  ├── File Management
  ├── Folder Organization
  └── Metadata Tracking
        ↓
Storage (SQLite + Filesystem)
  ├── Database (webos.db)
  │   └── Files, Folders, Metadata
  └── Files (uploads/)
      └── All user files
```

## 💡 Tips & Tricks

### Organize Files
1. Use File Explorer → Backend tab
2. Create folders for different types
3. Drag files between folders

### Quick Preview
- Image Gallery: One-click thumbnail view
- Media Manager: Stats about your files

### Batch Operations
- Upload multiple files at once
- All apps refresh automatically

### Free Space
- Monitor in Media Manager
- Delete unused files to save space

## ⚡ Performance

- Fast thumbnail loading
- Smooth image zooming
- Real-time video playback
- Instant file operations
- Database optimized for speed

## 🔒 Privacy

- All files stored locally on your machine
- No cloud upload (uses local backend)
- SQLite database is secure
- Files can be deleted anytime

## 🐛 Troubleshooting

### Files not showing?
- Refresh the app (close and reopen)
- Check File Explorer upload status
- Verify backend is running (http://127.0.0.1:8000/health)

### Upload fails?
- Check file type is supported
- File size must be < 500 MB
- Ensure backend is running

### Video won't play?
- Ensure video format is supported
- Check backend is accessible
- Try different video format

### Image not loading?
- Check image format is supported
- File may be corrupted
- Try uploading again

## 📱 Mobile Support

Apps work on:
- Desktop browsers ✅
- Tablets ✅
- Mobile phones ⚠️ (limited, best on desktop)

## 🌐 Backend Status

Check backend health:
- Visit: http://127.0.0.1:8000/health
- API Docs: http://127.0.0.1:8000/docs
- Should show: `{"status": "healthy"}`

## 📚 Learn More

Backend details: See `/BACKEND_INTEGRATION.md`
API Documentation: http://127.0.0.1:8000/docs

## 🎉 Features Summary

| Feature | Status |
|---------|--------|
| Upload files | ✅ |
| View images | ✅ |
| Play videos | ✅ |
| Download files | ✅ |
| Delete files | ✅ |
| View statistics | ✅ |
| Filter by type | ✅ |
| File organization | ✅ |
| Batch upload | ✅ |
| Image zoom | ✅ |
| Video controls | ✅ |
| Metadata tracking | ✅ |

---

**System Status**: ✅ Online
- Frontend: http://localhost:3001
- Backend: http://127.0.0.1:8000
- Storage: Ready
- Database: Active

Enjoy your complete media management system! 🎬 🖼️ 🎵
