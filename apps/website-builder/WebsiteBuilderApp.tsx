'use client';

import {
  Plus,
  Eye,
  Layout,
  Type,
  Square,
  Smartphone,
  Monitor,
  Download,
  X,
} from 'lucide-react';
import { useState } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';

interface Element {
  id: string;
  type: 'heading' | 'paragraph' | 'button' | 'image' | 'container' | 'input';
  content: string;
  styles: {
    color?: string;
    fontSize?: string;
    backgroundColor?: string;
    padding?: string;
    borderRadius?: string;
    width?: string;
  };
}

interface Page {
  id: string;
  name: string;
  elements: Element[];
}

const TEMPLATES = [
  {
    name: 'Blank',
    elements: [] as Element[],
  },
  {
    name: 'Landing Page',
    elements: [
      {
        id: '1',
        type: 'heading' as const,
        content: 'Welcome to My Website',
        styles: { fontSize: '2.5rem', color: '#ffffff', padding: '2rem' },
      },
      {
        id: '2',
        type: 'paragraph' as const,
        content: 'Build amazing websites without coding',
        styles: { fontSize: '1.2rem', color: '#e0e0e0', padding: '1rem' },
      },
      {
        id: '3',
        type: 'button' as const,
        content: 'Get Started',
        styles: { backgroundColor: '#3b82f6', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem' },
      },
    ],
  },
  {
    name: 'Portfolio',
    elements: [
      {
        id: '1',
        type: 'heading' as const,
        content: 'My Portfolio',
        styles: { fontSize: '2rem', color: '#ffffff', padding: '1.5rem' },
      },
      {
        id: '2',
        type: 'paragraph' as const,
        content: 'Showcase your work',
        styles: { fontSize: '1rem', color: '#9ca3af', padding: '1rem' },
      },
    ],
  },
];

export function WebsiteBuilderApp({}: AppComponentProps) {
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      name: 'Home',
      elements: TEMPLATES[1].elements,
    },
  ]);
  const [currentPageId, setCurrentPageId] = useState('1');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(false);

  const currentPage = pages.find((p) => p.id === currentPageId);
  const selectedElement = currentPage?.elements.find((e) => e.id === selectedElementId);

  const addElement = (type: Element['type']) => {
    if (!currentPage) return;

    const newElement: Element = {
      id: Date.now().toString(),
      type,
      content:
        type === 'heading'
          ? 'New Heading'
          : type === 'paragraph'
            ? 'New paragraph text'
            : type === 'button'
              ? 'Click me'
              : type === 'image'
                ? 'Image URL'
                : type === 'input'
                  ? ''
                  : 'Box',
      styles: {
        padding: '1rem',
        color: '#ffffff',
      },
    };

    const updatedPages = pages.map((p) =>
      p.id === currentPageId
        ? { ...p, elements: [...p.elements, newElement] }
        : p
    );
    setPages(updatedPages);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<Element>) => {
    const updatedPages = pages.map((p) =>
      p.id === currentPageId
        ? {
            ...p,
            elements: p.elements.map((e) =>
              e.id === id ? { ...e, ...updates } : e
            ),
          }
        : p
    );
    setPages(updatedPages);
  };

  const deleteElement = (id: string) => {
    const updatedPages = pages.map((p) =>
      p.id === currentPageId
        ? { ...p, elements: p.elements.filter((e) => e.id !== id) }
        : p
    );
    setPages(updatedPages);
    setSelectedElementId(null);
  };

  const addPage = () => {
    const newPage: Page = {
      id: Date.now().toString(),
      name: `Page ${pages.length + 1}`,
      elements: [],
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
  };

  const renderElement = (element: Element) => {
    const baseStyle = {
      padding: element.styles.padding || '1rem',
      color: element.styles.color || '#000',
      backgroundColor: element.styles.backgroundColor,
      borderRadius: element.styles.borderRadius,
      width: element.styles.width || 'auto',
      fontSize: element.styles.fontSize,
    };

    switch (element.type) {
      case 'heading':
        return (
          <h1 style={baseStyle} className="font-bold">
            {element.content}
          </h1>
        );
      case 'paragraph':
        return <p style={baseStyle}>{element.content}</p>;
      case 'button':
        return (
          <button
            style={baseStyle}
            className="cursor-pointer hover:opacity-80 transition"
          >
            {element.content}
          </button>
        );
      case 'input':
        return (
          <input
            type="text"
            placeholder={element.content}
            style={baseStyle}
            className="w-full border rounded"
          />
        );
      case 'container':
        return (
          <div
            style={{
              ...baseStyle,
              minHeight: '100px',
              border: '2px dashed #666',
            }}
            className="flex items-center justify-center"
          >
            {element.content}
          </div>
        );
      default:
        return <div style={baseStyle}>{element.content}</div>;
    }
  };

  return (
    <div className="flex h-full bg-gray-900 text-gray-100">
      {/* Sidebar - Components & Pages */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button className="flex-1 px-4 py-2 bg-gray-700 text-sm font-medium">
            Elements
          </button>
          <button className="flex-1 px-4 py-2 bg-gray-800 text-sm">Pages</button>
        </div>

        {/* Elements to Add */}
        <div className="flex-1 overflow-auto p-4 space-y-2">
          <p className="text-xs font-semibold opacity-70 mb-3">ADD ELEMENTS</p>
          <button
            onClick={() => addElement('heading')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition"
          >
            <Type className="h-4 w-4" />
            Heading
          </button>
          <button
            onClick={() => addElement('paragraph')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition"
          >
            <Type className="h-4 w-4" />
            Paragraph
          </button>
          <button
            onClick={() => addElement('button')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition"
          >
            <Square className="h-4 w-4" />
            Button
          </button>
          <button
            onClick={() => addElement('input')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition"
          >
            <Type className="h-4 w-4" />
            Input
          </button>
          <button
            onClick={() => addElement('container')}
            className="w-full flex items-center gap-2 px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm transition"
          >
            <Layout className="h-4 w-4" />
            Container
          </button>
        </div>

        {/* Pages Section */}
        <div className="border-t border-gray-700 p-4 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold opacity-70">PAGES</p>
            <button
              onClick={addPage}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-1">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPageId(page.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                  currentPageId === page.id
                    ? 'bg-blue-600'
                    : 'hover:bg-gray-700'
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-semibold">{currentPage?.name}</h2>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-2 rounded transition ${
                  viewMode === 'desktop'
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Monitor className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-2 rounded transition ${
                  viewMode === 'mobile'
                    ? 'bg-blue-600'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Smartphone className="h-4 w-4" />
              </button>
            </div>

            {/* Preview */}
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-3 py-2 rounded transition ${
                showPreview
                  ? 'bg-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>

            {/* Export */}
            <button className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded transition">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto bg-gray-900 p-8 flex justify-center">
          {showPreview ? (
            // Preview Mode
            <div
              className={`bg-white text-black shadow-lg ${
                viewMode === 'mobile' ? 'w-96' : 'w-full'
              }`}
            >
              <div className="p-8">
                {currentPage?.elements.map((element) => (
                  <div key={element.id} className="mb-4">
                    {renderElement(element)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Edit Mode
            <div
              className={`bg-white text-black shadow-lg p-8 space-y-4 ${
                viewMode === 'mobile' ? 'w-96' : 'w-full max-w-4xl'
              }`}
            >
              {currentPage?.elements.length === 0 ? (
                <div className="flex items-center justify-center h-64 text-gray-400 text-center">
                  <div>
                    <Layout className="h-12 w-12 mx-auto mb-3 opacity-30" />
                    <p>Add elements from the sidebar to get started</p>
                  </div>
                </div>
              ) : (
                currentPage?.elements.map((element) => (
                  <div
                    key={element.id}
                    onClick={() => setSelectedElementId(element.id)}
                    className={`p-4 rounded border-2 transition cursor-pointer ${
                      selectedElementId === element.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-300'
                    }`}
                  >
                    {renderElement(element)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Properties Panel */}
      {selectedElement && !showPreview && (
        <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col max-h-full overflow-auto">
          <div className="border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 bg-gray-800">
            <h3 className="font-semibold text-sm">Properties</h3>
            <button
              onClick={() => setSelectedElementId(null)}
              className="p-1 hover:bg-gray-700 rounded"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-auto">
            {/* Content */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Content</label>
              <input
                type="text"
                value={selectedElement.content}
                onChange={(e) => updateElement(selectedElement.id, { content: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Font Size</label>
              <select
                value={selectedElement.styles.fontSize || '1rem'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, fontSize: e.target.value },
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              >
                <option value="0.75rem">Small</option>
                <option value="1rem">Normal</option>
                <option value="1.5rem">Large</option>
                <option value="2rem">XL</option>
                <option value="2.5rem">2XL</option>
              </select>
            </div>

            {/* Color */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Text Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedElement.styles.color || '#000000'}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      styles: { ...selectedElement.styles, color: e.target.value },
                    })
                  }
                  className="h-10 w-20 rounded border border-gray-600 cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedElement.styles.color || '#000000'}
                  onChange={(e) =>
                    updateElement(selectedElement.id, {
                      styles: { ...selectedElement.styles, color: e.target.value },
                    })
                  }
                  className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
                />
              </div>
            </div>

            {/* Background Color */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Background</label>
              <input
                type="color"
                value={selectedElement.styles.backgroundColor || '#ffffff'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, backgroundColor: e.target.value },
                  })
                }
                className="w-full h-10 rounded border border-gray-600 cursor-pointer"
              />
            </div>

            {/* Padding */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Padding</label>
              <input
                type="text"
                value={selectedElement.styles.padding || '1rem'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, padding: e.target.value },
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
                placeholder="e.g., 1rem"
              />
            </div>

            {/* Border Radius */}
            <div>
              <label className="text-xs font-semibold opacity-70 block mb-2">Border Radius</label>
              <input
                type="text"
                value={selectedElement.styles.borderRadius || '0'}
                onChange={(e) =>
                  updateElement(selectedElement.id, {
                    styles: { ...selectedElement.styles, borderRadius: e.target.value },
                  })
                }
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
                placeholder="e.g., 0.5rem"
              />
            </div>

            {/* Delete Button */}
            <button
              onClick={() => deleteElement(selectedElement.id)}
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded text-sm font-medium transition mt-4"
            >
              Delete Element
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
