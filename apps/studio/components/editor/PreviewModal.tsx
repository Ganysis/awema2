'use client';

import { useState, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';
import { XMarkIcon, DevicePhoneMobileIcon, DeviceTabletIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';
import { DeviceFrame } from './DeviceFrame';

interface PreviewModalProps {
  onClose: () => void;
  projectId?: string;
}

export function PreviewModal({ onClose, projectId }: PreviewModalProps) {
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [showFrame, setShowFrame] = useState(true);
  const { blocks, theme, globalHeader, globalFooter } = useEditorStore();
  
  useEffect(() => {
    // Generate preview with image transformation
    const generatePreview = async () => {
      try {
        // Import direct pour éviter les erreurs de chunk
        const previewGenerator = new (await import('@/lib/services/preview-generator')).PreviewGenerator();
        
        // Set projectId if available for image transformation
        if (projectId) {
          await previewGenerator.setProjectId(projectId);
        }
        
        const html = previewGenerator.generatePreview(blocks, theme, globalHeader, globalFooter);
        
        // Debug: vérifier le contenu généré
        console.log('📄 Preview HTML generated, length:', html.length);
        console.log('📄 Contains hero--modern class:', html.includes('hero--modern'));
        console.log('📄 Contains gradient CSS:', html.includes('gradient'));
        
        // Debug: afficher un extrait du CSS dans la console
        const styleMatch = html.match(/<style[^>]*>([\s\S]*?)<\/style>/g);
        if (styleMatch) {
          console.log('📄 Number of style tags:', styleMatch.length);
          styleMatch.forEach((style, index) => {
            const content = style.match(/<style[^>]*>([\s\S]*?)<\/style>/)?.[1] || '';
            const id = style.match(/id="([^"]+)"/)?.[1] || 'no-id';
            console.log(`📄 Style tag ${index + 1} (${id}):`, 
              content.length > 0 ? `${content.length} chars - ${content.substring(0, 200)}...` : 'EMPTY');
          });
        }
        
        setPreviewHtml(html);
      } catch (error) {
        console.error('Error generating preview:', error);
        // Fallback: generate basic preview without the preview generator
        setPreviewHtml(generateBasicPreview());
      }
    };
    
    generatePreview();
  }, [blocks, theme, globalHeader, globalFooter, projectId]);

  const generateBasicPreview = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Preview</title>
        <style>
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          .preview-error {
            padding: 20px;
            text-align: center;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="preview-error">
          <h2>Aperçu temporairement indisponible</h2>
          <p>Veuillez rafraîchir la page pour réessayer.</p>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-4 bg-white rounded-lg shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
          
          <div className="flex items-center space-x-4">
            {/* Device Selector */}
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded ${
                  previewDevice === 'mobile' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Mobile"
              >
                <DevicePhoneMobileIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded ${
                  previewDevice === 'tablet' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Tablet"
              >
                <DeviceTabletIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded ${
                  previewDevice === 'desktop' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                }`}
                title="Desktop"
              >
                <ComputerDesktopIcon className="w-5 h-5" />
              </button>
            </div>
            
            {/* Frame Toggle */}
            {previewDevice !== 'desktop' && (
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showFrame}
                  onChange={(e) => setShowFrame(e.target.checked)}
                  className="rounded"
                />
                <span>Afficher le cadre</span>
              </label>
            )}
            
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Preview Frame */}
        <div className="flex-1 overflow-hidden">
          {previewHtml ? (
            <DeviceFrame device={previewDevice} showFrame={showFrame}>
              <iframe
                srcDoc={previewHtml}
                className="w-full h-full border-0"
                title="Site Preview"
              />
            </DeviceFrame>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-500">Generating preview...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}