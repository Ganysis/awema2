'use client';

import { useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { 
  XMarkIcon, 
  CloudArrowDownIcon,
  CodeBracketIcon,
  FolderArrowDownIcon,
  DocumentIcon
} from '@heroicons/react/24/outline';

interface ExportModalProps {
  onClose: () => void;
}

export function ExportModal({ onClose }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState<'download' | 'code' | 'deploy'>('download');
  const { exportSite, projectName } = useEditorStore();

  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      const { html, css, js } = await exportSite();
      
      if (exportType === 'download') {
        // Create a zip file with all assets
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${projectName.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success message
        alert('Site exported successfully!');
        onClose();
      } else if (exportType === 'code') {
        // Show code in a modal
        const newWindow = window.open('', '_blank');
        if (newWindow) {
          newWindow.document.write(`
            <html>
              <head>
                <title>Exported Code - ${projectName}</title>
                <style>
                  body { font-family: monospace; padding: 20px; background: #1e1e1e; color: #fff; }
                  pre { white-space: pre-wrap; word-wrap: break-word; }
                  .copy-btn { 
                    position: fixed; 
                    top: 20px; 
                    right: 20px; 
                    padding: 10px 20px; 
                    background: #007ACC; 
                    color: white; 
                    border: none; 
                    border-radius: 4px; 
                    cursor: pointer; 
                  }
                </style>
              </head>
              <body>
                <button class="copy-btn" onclick="navigator.clipboard.writeText(document.querySelector('pre').textContent)">Copy Code</button>
                <pre>${html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>
              </body>
            </html>
          `);
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-x-4 top-[10%] max-w-2xl mx-auto bg-white rounded-lg shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Export Your Site</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button
              onClick={() => setExportType('download')}
              className={`p-6 rounded-lg border-2 transition-all ${
                exportType === 'download' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <FolderArrowDownIcon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
              <h3 className="font-medium text-gray-900">Download Files</h3>
              <p className="text-sm text-gray-500 mt-1">
                Get HTML files ready to upload
              </p>
            </button>
            
            <button
              onClick={() => setExportType('code')}
              className={`p-6 rounded-lg border-2 transition-all ${
                exportType === 'code' 
                  ? 'border-primary-500 bg-primary-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CodeBracketIcon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
              <h3 className="font-medium text-gray-900">View Code</h3>
              <p className="text-sm text-gray-500 mt-1">
                Copy the generated code
              </p>
            </button>
            
            <button
              onClick={() => setExportType('deploy')}
              disabled
              className="p-6 rounded-lg border-2 border-gray-200 opacity-50 cursor-not-allowed"
            >
              <CloudArrowDownIcon className="w-8 h-8 mx-auto mb-3 text-gray-400" />
              <h3 className="font-medium text-gray-900">Deploy</h3>
              <p className="text-sm text-gray-500 mt-1">
                Coming soon
              </p>
            </button>
          </div>
          
          {/* Export Options */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Export Options</h4>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Optimize images</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Minify code</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Include custom fonts</span>
              </label>
            </div>
          </div>
          
          {/* File Info */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <DocumentIcon className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-medium">Your export will include:</p>
                <ul className="mt-1 space-y-1">
                  <li>• Complete HTML file with embedded styles</li>
                  <li>• Optimized and responsive design</li>
                  <li>• All custom theme settings</li>
                  <li>• SEO-friendly markup</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Exporting...</span>
              </>
            ) : (
              <>
                <CloudArrowDownIcon className="w-4 h-4" />
                <span>Export</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}