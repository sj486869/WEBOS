"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import {
  Bot,
  FileText,
  Folder,
  MonitorCog,
  Settings,
  Terminal,
  Image,
  Play,
  Film,
  Search,
  Copy,
  Zap,
  BookOpen,
  Tags,
  Globe,
  Code2,
  SquareTerminal,
  Brackets,
  Video,
  Layers,
  BarChart4,
} from "lucide-react";

import type { AppId } from "@/core/os/appIds";

export type AppComponentProps = { windowId: string };

export type AppDefinition = {
  id: AppId;
  title: string;
  icon: ComponentType<{ className?: string }>;
  component: ComponentType<AppComponentProps>;
  singleton?: boolean;
};

const FileExplorerApp = dynamic(
  () => import("@/apps/file-explorer/FileExplorerApp").then((m) => m.FileExplorerApp),
  { ssr: false }
);
const NotesApp = dynamic(
  () => import("@/apps/notes/NotesApp").then((m) => m.NotesApp),
  { ssr: false }
);
const AIAssistantApp = dynamic(
  () =>
    import("@/apps/ai-assistant/AIAssistantApp").then((m) => m.AIAssistantApp),
  { ssr: false }
);
const SystemMonitorApp = dynamic(
  () =>
    import("@/apps/system-monitor/SystemMonitorApp").then(
      (m) => m.SystemMonitorApp
    ),
  { ssr: false }
);
const TerminalApp = dynamic(
  () => import("@/apps/terminal/TerminalApp").then((m) => m.TerminalApp),
  { ssr: false }
);
const SettingsApp = dynamic(
  () => import("@/apps/settings/SettingsApp").then((m) => m.SettingsApp),
  { ssr: false }
);
const ImageGalleryApp = dynamic(
  () => import("@/apps/image-gallery/ImageGalleryApp").then((m) => m.ImageGalleryApp),
  { ssr: false }
);
const VideoPlayerApp = dynamic(
  () => import("@/apps/video-player/VideoPlayerApp").then((m) => m.VideoPlayerApp),
  { ssr: false }
);
const MediaEditorApp = dynamic(
  () => import("@/apps/media-editor/MediaEditorApp").then((m) => m.MediaEditorApp),
  { ssr: false }
);
const SearchApp = dynamic(
  () => import("@/apps/search-app/SearchAppApp").then((m) => m.SearchAppApp),
  { ssr: false }
);
const DuplicateFinderApp = dynamic(
  () => import("@/apps/duplicate-finder/DuplicateFinderApp").then((m) => m.DuplicateFinderApp),
  { ssr: false }
);
const FileConverterApp = dynamic(
  () => import("@/apps/file-converter/FileConverterApp").then((m) => m.FileConverterApp),
  { ssr: false }
);
const DocumentViewerApp = dynamic(
  () => import("@/apps/document-viewer/DocumentViewerApp").then((m) => m.DocumentViewerApp),
  { ssr: false }
);
const FileOrganizerApp = dynamic(
  () => import("@/apps/file-organizer/FileOrganizerApp").then((m) => m.FileOrganizerApp),
  { ssr: false }
);
const InternetBrowserApp = dynamic(
  () => import("@/apps/internet-browser/InternetBrowserApp").then((m) => m.InternetBrowserApp),
  { ssr: false }
);
const CodeEditorApp = dynamic(
  () => import("@/apps/code-editor/CodeEditorApp").then((m) => m.CodeEditorApp),
  { ssr: false }
);
const AdvancedTerminalApp = dynamic(
  () => import("@/apps/advanced-terminal/AdvancedTerminalApp").then((m) => m.AdvancedTerminalApp),
  { ssr: false }
);
const VSCodeEditorApp = dynamic(
  () => import("@/apps/vscode-editor/VSCodeEditorApp").then((m) => m.VSCodeEditorApp),
  { ssr: false }
);
const ProVideoPlayerApp = dynamic(
  () => import("@/apps/pro-video-player/ProVideoPlayerApp").then((m) => m.ProVideoPlayerApp),
  { ssr: false }
);
const WebsiteBuilderApp = dynamic(
  () => import("@/apps/website-builder/WebsiteBuilderApp").then((m) => m.WebsiteBuilderApp),
  { ssr: false }
);
const DashboardApp = dynamic(
  () => import("@/apps/dashboard/DashboardApp").then((m) => m.DashboardApp),
  { ssr: false }
);

export const appRegistry: Record<AppId, AppDefinition> = {
  "file-explorer": {
    id: "file-explorer",
    title: "File Explorer",
    icon: Folder,
    component: FileExplorerApp,
  },
  notes: {
    id: "notes",
    title: "Notes",
    icon: FileText,
    component: NotesApp,
  },
  "ai-assistant": {
    id: "ai-assistant",
    title: "AI Assistant",
    icon: Bot,
    component: AIAssistantApp,
  },
  "system-monitor": {
    id: "system-monitor",
    title: "System Monitor",
    icon: MonitorCog,
    component: SystemMonitorApp,
    singleton: true,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    icon: Terminal,
    component: TerminalApp,
  },
  settings: {
    id: "settings",
    title: "Settings",
    icon: Settings,
    component: SettingsApp,
    singleton: true,
  },
  "image-gallery": {
    id: "image-gallery",
    title: "Image Gallery",
    icon: Image,
    component: ImageGalleryApp,
  },
  "video-player": {
    id: "video-player",
    title: "Video Player",
    icon: Play,
    component: VideoPlayerApp,
  },
  "media-editor": {
    id: "media-editor",
    title: "Media Manager",
    icon: Film,
    component: MediaEditorApp,
  },
  "search-app": {
    id: "search-app",
    title: "Search",
    icon: Search,
    component: SearchApp,
  },
  "duplicate-finder": {
    id: "duplicate-finder",
    title: "Duplicate Finder",
    icon: Copy,
    component: DuplicateFinderApp,
  },
  "file-converter": {
    id: "file-converter",
    title: "File Converter",
    icon: Zap,
    component: FileConverterApp,
  },
  "document-viewer": {
    id: "document-viewer",
    title: "Document Viewer",
    icon: BookOpen,
    component: DocumentViewerApp,
  },
  "file-organizer": {
    id: "file-organizer",
    title: "File Organizer",
    icon: Tags,
    component: FileOrganizerApp,
  },
  "internet-browser": {
    id: "internet-browser",
    title: "Internet Browser",
    icon: Globe,
    component: InternetBrowserApp,
  },
  "code-editor": {
    id: "code-editor",
    title: "Code Editor",
    icon: Code2,
    component: CodeEditorApp,
  },
  "advanced-terminal": {
    id: "advanced-terminal",
    title: "Advanced Terminal",
    icon: SquareTerminal,
    component: AdvancedTerminalApp,
  },
  "vscode-editor": {
    id: "vscode-editor",
    title: "VS Code",
    icon: Brackets,
    component: VSCodeEditorApp,
  },
  "pro-video-player": {
    id: "pro-video-player",
    title: "Pro Video Player",
    icon: Video,
    component: ProVideoPlayerApp,
  },
  "website-builder": {
    id: "website-builder",
    title: "Website Builder",
    icon: Layers,
    component: WebsiteBuilderApp,
  },
  dashboard: {
    id: "dashboard",
    title: "Dashboard",
    icon: BarChart4,
    component: DashboardApp,
    singleton: true,
  },
};

export const installedApps: AppDefinition[] = Object.values(appRegistry);
