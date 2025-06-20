'use client';

import { useEffect, useRef, useState } from 'react';
import { useEditorStore } from '@/lib/store/editor-store';

export function LivePreview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { blocks, theme, generateSitePreview } = useEditorStore();
  
  // Debounce preview updates
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (iframeRef.current) {
        setIsLoading(true);
        try {
          const html = await generateSitePreview();
          const iframe = iframeRef.current;
          
          // Utiliser srcdoc au lieu d'accéder directement au document
          // Cela évite les problèmes cross-origin
          iframe.srcdoc = html;
          
          // Attendre que l'iframe soit chargée
          iframe.onload = () => {
            setIsLoading(false);
          };
        } catch (error) {
          console.error('Error generating preview:', error);
          setIsLoading(false);
          
          // Afficher un message d'erreur dans l'iframe
          if (iframeRef.current) {
            iframeRef.current.srcdoc = `
              <html>
                <body style="font-family: sans-serif; padding: 20px;">
                  <h2>Erreur de prévisualisation</h2>
                  <p>Une erreur s'est produite lors de la génération de la prévisualisation.</p>
                  <pre style="background: #f5f5f5; padding: 10px; overflow: auto;">${error}</pre>
                </body>
              </html>
            `;
          }
        }
      }
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timer);
  }, [blocks, theme, generateSitePreview]);
  
  return (
    <div className="relative w-full h-full bg-white">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <p className="mt-2 text-sm text-gray-500">Updating preview...</p>
          </div>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Live Preview"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}