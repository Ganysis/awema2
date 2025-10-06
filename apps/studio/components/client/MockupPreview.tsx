'use client';

import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MockupPreviewProps, DEVICE_DIMENSIONS } from '@/types/client-selection.types';

export const MockupPreview: React.FC<MockupPreviewProps> = ({
  mockup,
  device,
  onLoad,
  onError,
  className
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dimensions = DEVICE_DIMENSIONS[device];

  // Calcul du ratio pour le responsive
  const aspectRatio = dimensions.height / dimensions.width;
  const maxWidth = device === 'desktop' ? 400 : device === 'tablet' ? 300 : 200;
  const calculatedHeight = maxWidth * aspectRatio;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [mockup.previewUrl, device]);

  const handleIframeLoad = () => {
    setIsLoading(false);
    onLoad?.();

    // Injection CSS pour le responsive dans l'iframe
    if (iframeRef.current?.contentWindow) {
      try {
        const iframeDoc = iframeRef.current.contentDocument;
        if (iframeDoc) {
          const style = iframeDoc.createElement('style');
          style.textContent = `
            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              zoom: ${device === 'mobile' ? '0.5' : device === 'tablet' ? '0.7' : '1'};
            }
            * {
              box-sizing: border-box;
            }
          `;
          iframeDoc.head.appendChild(style);
        }
      } catch (error) {
        console.warn('Impossible d\'injecter les styles dans l\'iframe:', error);
      }
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.(new Error(`Impossible de charger le mockup: ${mockup.name}`));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 transition-all duration-300",
        className
      )}
      style={{
        width: '100%',
        maxWidth: `${maxWidth}px`,
        height: `${calculatedHeight}px`
      }}
    >
      {/* Header avec info device */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-gray-800 to-gray-900 text-white px-4 py-2 text-xs flex items-center justify-between">
        <span className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>{mockup.name}</span>
        </span>
        <span className="text-gray-300">
          {dimensions.width} × {dimensions.height}
        </span>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-10 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-sm text-gray-600">Chargement du mockup...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 z-10 bg-red-50 flex items-center justify-center">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-red-800 mb-1">Erreur de chargement</h3>
            <p className="text-xs text-red-600">Impossible de charger ce mockup</p>
            <button
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
                if (iframeRef.current) {
                  iframeRef.current.src = iframeRef.current.src;
                }
              }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Réessayer
            </button>
          </div>
        </div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={mockup.previewUrl}
        className={cn(
          "w-full h-full border-0 transition-opacity duration-300",
          isLoading || hasError ? "opacity-0" : "opacity-100"
        )}
        style={{
          marginTop: '32px', // Espace pour le header
          height: 'calc(100% - 32px)'
        }}
        loading="lazy"
        onLoad={handleIframeLoad}
        onError={handleIframeError}
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        title={`Aperçu ${mockup.name} en mode ${device}`}
      />

      {/* Device Frame Effect */}
      {device === 'mobile' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-300 rounded-full" />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full border-2 border-gray-300" />
        </div>
      )}

      {device === 'tablet' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-gray-300" />
        </div>
      )}
    </div>
  );
};