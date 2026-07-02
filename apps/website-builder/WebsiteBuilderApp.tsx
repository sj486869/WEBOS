'use client';

import {
  Plus, Eye, Layout, Type, Square, Smartphone, Monitor, Download, X,
  Trash2, Copy, ArrowUp, ArrowDown, Settings, Maximize2
} from 'lucide-react';
import { useState } from 'react';
import type { AppComponentProps } from '@/core/os/appRegistry';
import { useFileManager } from '@/utils/useFileManager';

interface BuilderElement {
  id: string;
  type: 'heading' | 'paragraph' | 'button' | 'image' | 'container' | 'input';
  content: string;
  styles: {
    color?: string;
    fontSize?: string;
    backgroundColor?: string;
    padding?: string;
    margin?: string;
    borderRadius?: string;
    width?: string;
    display?: string;
    flexDirection?: 'row' | 'column';
    gap?: string;
    justifyContent?: string;
    alignItems?: string;
  };
  children: BuilderElement[]; // Nested elements!
}

interface Page {
  id: string;
  name: string;
  elements: BuilderElement[];
}

const TEMPLATES: Page[] = [
  {
    id: 'blank',
    name: 'Blank',
    elements: [],
  },
  {
    id: 'landing',
    name: 'Landing Page',
    elements: [
      {
        id: '1',
        type: 'container',
        content: '',
        styles: { backgroundColor: '#1e293b', padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
        children: [
          {
            id: '1-1',
            type: 'heading',
            content: 'Welcome to My Website',
            styles: { fontSize: '3rem', color: '#ffffff' },
            children: []
          },
          {
            id: '1-2',
            type: 'paragraph',
            content: 'Build amazing websites without coding',
            styles: { fontSize: '1.25rem', color: '#94a3b8' },
            children: []
          },
          {
            id: '1-3',
            type: 'button',
            content: 'Get Started',
            styles: { backgroundColor: '#3b82f6', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontSize: '1.1rem' },
            children: []
          }
        ]
      }
    ],
  }
];

export function WebsiteBuilderApp({}: AppComponentProps) {
  const { uploadFile } = useFileManager();

  const [pages, setPages] = useState<Page[]>([
    { id: 'home', name: 'Home', elements: JSON.parse(JSON.stringify(TEMPLATES[1].elements)) },
  ]);
  const [currentPageId, setCurrentPageId] = useState('home');
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [showPreview, setShowPreview] = useState(false);
  const [activeTab, setActiveTab] = useState<'elements' | 'pages'>('elements');

  const currentPage = pages.find((p) => p.id === currentPageId);

  // --- Helper to find, update, or delete elements in the tree ---
  const mapElementTree = (
    elements: BuilderElement[],
    callback: (el: BuilderElement) => BuilderElement | null
  ): BuilderElement[] => {
    return elements.map(el => {
      const mapped = callback(el);
      if (!mapped) return null; // deleted
      if (mapped.children) {
        mapped.children = mapElementTree(mapped.children, callback);
      }
      return mapped;
    }).filter(Boolean) as BuilderElement[];
  };

  const findElement = (elements: BuilderElement[], id: string): BuilderElement | null => {
    for (const el of elements) {
      if (el.id === id) return el;
      const found = findElement(el.children, id);
      if (found) return found;
    }
    return null;
  };

  const updateCurrentPage = (newElements: BuilderElement[]) => {
    setPages(pages.map(p => p.id === currentPageId ? { ...p, elements: newElements } : p));
  };

  const selectedElement = currentPage ? findElement(currentPage.elements, selectedElementId || '') : null;

  // --- Actions ---

  const addElement = (type: BuilderElement['type']) => {
    if (!currentPage) return;

    const newElement: BuilderElement = {
      id: Math.random().toString(36).substring(2, 15),
      type,
      content:
        type === 'heading' ? 'New Heading'
        : type === 'paragraph' ? 'New paragraph text'
        : type === 'button' ? 'Click me'
        : type === 'image' ? 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'
        : type === 'input' ? 'Placeholder'
        : '',
      styles: {
        padding: type === 'container' ? '2rem' : '0.5rem',
        color: '#ffffff',
        backgroundColor: type === 'button' ? '#3b82f6' : type === 'container' ? '#0f172a' : 'transparent',
        borderRadius: type === 'button' ? '0.5rem' : '0',
        display: type === 'container' ? 'flex' : undefined,
        flexDirection: type === 'container' ? 'column' : undefined,
        gap: type === 'container' ? '1rem' : undefined,
        width: type === 'image' ? '100%' : 'auto',
      },
      children: [],
    };

    // If a container is selected, add inside it. Otherwise, add to root.
    if (selectedElement && selectedElement.type === 'container') {
      const newElements = mapElementTree(currentPage.elements, (el) => {
        if (el.id === selectedElement.id) {
          return { ...el, children: [...el.children, newElement] };
        }
        return el;
      });
      updateCurrentPage(newElements);
    } else {
      updateCurrentPage([...currentPage.elements, newElement]);
    }
    
    setSelectedElementId(newElement.id);
  };

  const updateElementProps = (id: string, updates: Partial<BuilderElement>) => {
    if (!currentPage) return;
    const newElements = mapElementTree(currentPage.elements, (el) => {
      if (el.id === id) return { ...el, ...updates };
      return el;
    });
    updateCurrentPage(newElements);
  };

  const updateElementStyle = (id: string, styleUpdates: Partial<BuilderElement['styles']>) => {
    if (!currentPage) return;
    const newElements = mapElementTree(currentPage.elements, (el) => {
      if (el.id === id) return { ...el, styles: { ...el.styles, ...styleUpdates } };
      return el;
    });
    updateCurrentPage(newElements);
  };

  const deleteElement = (id: string) => {
    if (!currentPage) return;
    const newElements = mapElementTree(currentPage.elements, (el) => {
      if (el.id === id) return null; // remove
      return el;
    });
    updateCurrentPage(newElements);
    setSelectedElementId(null);
  };

  const moveElement = (id: string, direction: 'up' | 'down') => {
    if (!currentPage) return;

    // Helper to move item in an array
    const moveInArray = (arr: BuilderElement[]): BuilderElement[] => {
      const index = arr.findIndex(e => e.id === id);
      if (index === -1) return arr.map(e => ({ ...e, children: moveInArray(e.children) }));
      
      const newArr = [...arr];
      if (direction === 'up' && index > 0) {
        [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
      } else if (direction === 'down' && index < newArr.length - 1) {
        [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
      }
      return newArr;
    };

    updateCurrentPage(moveInArray(currentPage.elements));
  };

  const addPage = () => {
    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 15),
      name: `Page ${pages.length + 1}`,
      elements: [],
    };
    setPages([...pages, newPage]);
    setCurrentPageId(newPage.id);
  };

  const deletePage = (id: string) => {
    if (pages.length === 1) return; // Cannot delete last page
    const newPages = pages.filter(p => p.id !== id);
    setPages(newPages);
    if (currentPageId === id) setCurrentPageId(newPages[0].id);
  };

  // --- Export to HTML ---
  const exportToHtml = async () => {
    if (!currentPage) return;

    // Recursive function to generate HTML string
    const generateHtml = (elements: BuilderElement[]): string => {
      return elements.map(el => {
        const styleStr = Object.entries(el.styles)
          .map(([k, v]) => {
            const cssKey = k.replace(/([A-Z])/g, "-$1").toLowerCase();
            return `${cssKey}:${v}`;
          })
          .join(';');

        const inlineStyle = styleStr ? ` style="${styleStr}"` : '';
        
        switch (el.type) {
          case 'heading': return `<h1${inlineStyle}>${el.content}</h1>`;
          case 'paragraph': return `<p${inlineStyle}>${el.content}</p>`;
          case 'button': return `<button${inlineStyle}>${el.content}</button>`;
          case 'input': return `<input type="text" placeholder="${el.content}"${inlineStyle} />`;
          case 'image': return `<img src="${el.content}" alt="Image"${inlineStyle} />`;
          case 'container': return `<div${inlineStyle}>\n${generateHtml(el.children)}\n</div>`;
          default: return '';
        }
      }).join('\n');
    };

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${currentPage.name}</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; color: white; }
    * { box-sizing: border-box; }
  </style>
</head>
<body>
${generateHtml(currentPage.elements)}
</body>
</html>`;

    try {
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const file = new File([blob], `${currentPage.name.toLowerCase().replace(/\s+/g, '-')}.html`, { type: 'text/html' });
      await uploadFile(file);
      alert(`Export successful! Saved as ${file.name} to your File Explorer.`);
    } catch (e) {
      alert("Failed to export HTML.");
      console.error(e);
    }
  };

  // --- Render Editor Canvas ---
  const renderElement = (element: BuilderElement) => {
    const isSelected = element.id === selectedElementId;
    
    const baseStyle: React.CSSProperties = {
      ...element.styles,
      minHeight: element.type === 'container' ? '50px' : undefined,
      position: 'relative',
    };

    const wrapperClass = `transition-all ${isSelected && !showPreview ? 'ring-2 ring-blue-500 z-10' : 'hover:ring-1 hover:ring-blue-400/50'}`;
    const cursorStyle = { cursor: showPreview ? 'default' : 'pointer' };

    const actionMenu = isSelected && !showPreview && (
      <div className="absolute -top-8 right-0 bg-blue-500 text-white text-xs px-2 py-1 rounded-t flex gap-2 shadow-lg z-50">
        <span className="font-semibold uppercase tracking-wider">{element.type}</span>
        <button onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'up'); }} className="hover:text-gray-200"><ArrowUp className="w-3 h-3" /></button>
        <button onClick={(e) => { e.stopPropagation(); moveElement(element.id, 'down'); }} className="hover:text-gray-200"><ArrowDown className="w-3 h-3" /></button>
        <button onClick={(e) => { e.stopPropagation(); deleteElement(element.id); }} className="hover:text-red-200"><Trash2 className="w-3 h-3" /></button>
      </div>
    );

    const commonProps = {
      key: element.id,
      onClick: (e: React.MouseEvent) => { e.stopPropagation(); setSelectedElementId(element.id); },
      className: wrapperClass,
      style: { ...baseStyle, ...cursorStyle }
    };

    switch (element.type) {
      case 'heading': 
        return <h1 {...commonProps}>{actionMenu}{element.content || 'Heading'}</h1>;
      case 'paragraph': 
        return <p {...commonProps}>{actionMenu}{element.content || 'Paragraph'}</p>;
      case 'button': 
        return <button {...commonProps}>{actionMenu}{element.content || 'Button'}</button>;
      case 'container': 
        return (
          <div {...commonProps}>
            {actionMenu}
            {element.children.length === 0 && <div className="opacity-30 p-4 text-center w-full">Empty Container</div>}
            {element.children.map(renderElement)}
          </div>
        );
      case 'input':
      case 'image':
        return (
          <div 
            key={element.id} 
            onClick={(e) => { e.stopPropagation(); setSelectedElementId(element.id); }} 
            className={`${wrapperClass} relative inline-block`} 
            style={{ ...cursorStyle, width: element.styles.width === '100%' ? '100%' : 'auto', display: 'flex' }}
          >
            {actionMenu}
            {element.type === 'input' 
              ? <input type="text" placeholder={element.content} style={{...baseStyle, width: '100%'}} readOnly /> 
              : <img src={element.content} alt="" style={{...baseStyle, width: '100%', position: 'static'}} />}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar - Components & Pages */}
      <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col z-20">
        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button 
            onClick={() => setActiveTab('elements')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === 'elements' ? 'bg-gray-700 border-b-2 border-blue-500' : 'text-gray-400 hover:bg-gray-700/50'}`}
          >
            Elements
          </button>
          <button 
            onClick={() => setActiveTab('pages')}
            className={`flex-1 px-4 py-3 text-sm font-medium ${activeTab === 'pages' ? 'bg-gray-700 border-b-2 border-blue-500' : 'text-gray-400 hover:bg-gray-700/50'}`}
          >
            Pages
          </button>
        </div>

        {activeTab === 'elements' && (
          <div className="flex-1 overflow-auto p-4 space-y-2">
            <p className="text-xs font-semibold opacity-70 mb-3 uppercase">Add Elements</p>
            {[
              { type: 'container', icon: Layout, label: 'Container' },
              { type: 'heading', icon: Type, label: 'Heading' },
              { type: 'paragraph', icon: Type, label: 'Paragraph' },
              { type: 'button', icon: Square, label: 'Button' },
              { type: 'image', icon: Layout, label: 'Image' },
              { type: 'input', icon: Square, label: 'Input Field' },
            ].map(item => (
              <button
                key={item.type}
                onClick={() => addElement(item.type as BuilderElement['type'])}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded bg-gray-700/50 hover:bg-gray-600 text-sm transition border border-gray-600/50"
              >
                <item.icon className="h-4 w-4 text-blue-400" />
                {item.label}
              </button>
            ))}
            {selectedElement?.type === 'container' && (
              <p className="text-xs text-blue-400 mt-2 px-1">
                Adding to selected container
              </p>
            )}
          </div>
        )}

        {activeTab === 'pages' && (
          <div className="flex-1 overflow-auto p-4 space-y-2">
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-semibold opacity-70 uppercase">Pages</p>
              <button onClick={addPage} className="p-1 hover:bg-gray-700 rounded"><Plus className="w-4 h-4 text-blue-400"/></button>
            </div>
            {pages.map((p) => (
              <div
                key={p.id}
                className={`flex items-center justify-between w-full px-3 py-2 rounded text-sm transition cursor-pointer border ${
                  currentPageId === p.id ? 'bg-blue-600/20 border-blue-500/50 text-blue-300' : 'bg-gray-700/30 border-transparent hover:bg-gray-700'
                }`}
                onClick={() => setCurrentPageId(p.id)}
              >
                <span>{p.name}</span>
                {pages.length > 1 && (
                  <button onClick={(e) => { e.stopPropagation(); deletePage(p.id); }} className="p-1 hover:text-red-400 opacity-50 hover:opacity-100">
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-950">
        {/* Topbar */}
        <div className="h-14 border-b border-gray-700 bg-gray-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-2 bg-gray-900 rounded-lg p-1 border border-gray-700">
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded transition ${viewMode === 'desktop' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded transition ${viewMode === 'mobile' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded transition text-sm font-medium ${showPreview ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600'}`}
            >
              <Eye className="h-4 w-4" />
              Preview
            </button>
            <button
              onClick={exportToHtml}
              className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded transition text-sm font-medium text-white shadow-lg shadow-green-900/20"
            >
              <Download className="h-4 w-4" />
              Export HTML
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start" onClick={() => setSelectedElementId(null)}>
          <div
            className="bg-[#0f172a] shadow-2xl transition-all duration-300 relative border border-gray-800"
            style={{
              width: viewMode === 'desktop' ? '100%' : '375px',
              maxWidth: viewMode === 'desktop' ? '1200px' : '375px',
              minHeight: '800px',
            }}
          >
            {currentPage?.elements.map(renderElement)}
            {currentPage?.elements.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-30 text-xl font-light">
                Add elements to start building
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Properties Sidebar (Right) */}
      {!showPreview && selectedElement && (
        <div className="w-72 bg-gray-800 border-l border-gray-700 flex flex-col z-20">
          <div className="p-4 border-b border-gray-700 flex justify-between items-center bg-gray-900">
            <h3 className="font-semibold flex items-center gap-2"><Settings className="w-4 h-4"/> Properties</h3>
            <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-300 uppercase">{selectedElement.type}</span>
          </div>

          <div className="flex-1 overflow-auto p-4 space-y-4">
            {/* Content Field (if applicable) */}
            {selectedElement.type !== 'container' && (
              <div className="space-y-1">
                <label className="text-xs text-gray-400 font-medium">Content / Text</label>
                <input
                  type="text"
                  value={selectedElement.content}
                  onChange={(e) => updateElementProps(selectedElement.id, { content: e.target.value })}
                  className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            )}

            {/* Layout Options for Containers */}
            {selectedElement.type === 'container' && (
              <>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium">Layout Direction</label>
                  <div className="flex bg-gray-900 p-1 rounded border border-gray-700">
                    <button onClick={() => updateElementStyle(selectedElement.id, { flexDirection: 'row' })} className={`flex-1 py-1 text-xs rounded ${selectedElement.styles.flexDirection === 'row' ? 'bg-gray-700' : ''}`}>Row</button>
                    <button onClick={() => updateElementStyle(selectedElement.id, { flexDirection: 'column' })} className={`flex-1 py-1 text-xs rounded ${selectedElement.styles.flexDirection === 'column' ? 'bg-gray-700' : ''}`}>Column</button>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium">Gap (Spacing)</label>
                  <input
                    type="text"
                    value={selectedElement.styles.gap || ''}
                    onChange={(e) => updateElementStyle(selectedElement.id, { gap: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 1rem"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-400 font-medium">Align Items</label>
                  <select
                    value={selectedElement.styles.alignItems || 'stretch'}
                    onChange={(e) => updateElementStyle(selectedElement.id, { alignItems: e.target.value })}
                    className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="flex-start">Start</option>
                    <option value="center">Center</option>
                    <option value="flex-end">End</option>
                    <option value="stretch">Stretch</option>
                  </select>
                </div>
              </>
            )}

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Color (Text)</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedElement.styles.color || '#ffffff'}
                  onChange={(e) => updateElementStyle(selectedElement.id, { color: e.target.value })}
                  className="w-8 h-8 rounded bg-gray-900 border border-gray-700 p-0"
                />
                <input
                  type="text"
                  value={selectedElement.styles.color || '#ffffff'}
                  onChange={(e) => updateElementStyle(selectedElement.id, { color: e.target.value })}
                  className="flex-1 bg-gray-900 border border-gray-700 rounded p-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Background Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={selectedElement.styles.backgroundColor || '#000000'}
                  onChange={(e) => updateElementStyle(selectedElement.id, { backgroundColor: e.target.value })}
                  className="w-8 h-8 rounded bg-gray-900 border border-gray-700 p-0"
                />
                <input
                  type="text"
                  value={selectedElement.styles.backgroundColor || 'transparent'}
                  onChange={(e) => updateElementStyle(selectedElement.id, { backgroundColor: e.target.value })}
                  className="flex-1 bg-gray-900 border border-gray-700 rounded p-1.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Font Size</label>
              <input
                type="text"
                value={selectedElement.styles.fontSize || ''}
                onChange={(e) => updateElementStyle(selectedElement.id, { fontSize: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. 1.5rem"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Padding</label>
              <input
                type="text"
                value={selectedElement.styles.padding || ''}
                onChange={(e) => updateElementStyle(selectedElement.id, { padding: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. 1rem 2rem"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Border Radius</label>
              <input
                type="text"
                value={selectedElement.styles.borderRadius || ''}
                onChange={(e) => updateElementStyle(selectedElement.id, { borderRadius: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. 0.5rem"
              />
            </div>
            
             <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Width</label>
              <input
                type="text"
                value={selectedElement.styles.width || ''}
                onChange={(e) => updateElementStyle(selectedElement.id, { width: e.target.value })}
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 text-sm text-white focus:outline-none focus:border-blue-500"
                placeholder="e.g. 100%, 300px, auto"
              />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
