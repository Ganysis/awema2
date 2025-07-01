'use client';

import { useState, useCallback, useRef } from 'react';
import { PhotoIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { MediaOptimizationService } from '@/lib/services/media-optimization.service';
import { useNetlifyMedia } from '@/hooks/useNetlifyMedia';

interface MediaUploaderProps {
  projectId: string;
  onImageSelect?: (image: any) => void;
  maxFiles?: number;
  acceptedFormats?: string[];
}

export function MediaUploader({ 
  projectId, 
  onImageSelect,
  maxFiles = 10,
  acceptedFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
}: MediaUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { images, uploadImage, isLoading } = useNetlifyMedia(projectId);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, [images, uploadImage, onImageSelect]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handleFileSelect called', e.target.files);
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      console.log('Files selected:', files);
      await handleFiles(files);
    }
    // Reset l'input pour permettre de sélectionner le même fichier à nouveau
    e.target.value = '';
  }, [images, uploadImage, onImageSelect]);

  const handleFiles = async (files: File[]) => {
    console.log('handleFiles called with', files.length, 'files');
    setErrors([]);
    const validFiles: File[] = [];
    const newErrors: string[] = [];

    // Validation
    files.forEach(file => {
      if (!MediaOptimizationService.isValidImage(file)) {
        newErrors.push(`${file.name} : Format non supporté`);
        return;
      }

      if (file.size > 10 * 1024 * 1024) { // 10MB max
        newErrors.push(`${file.name} : Fichier trop volumineux (max 10MB)`);
        return;
      }

      validFiles.push(file);
    });

    if (validFiles.length + images.length > maxFiles) {
      newErrors.push(`Limite de ${maxFiles} images atteinte`);
      setErrors(newErrors);
      return;
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    // Upload des fichiers valides
    for (const file of validFiles) {
      const uploadId = `upload-${Date.now()}-${Math.random()}`;
      
      try {
        // Simuler la progression
        setUploadProgress(prev => ({ ...prev, [uploadId]: 0 }));
        
        // Simuler une progression pendant l'optimisation
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => ({
            ...prev,
            [uploadId]: Math.min((prev[uploadId] || 0) + 20, 90)
          }));
        }, 200);

        // Upload et optimisation
        console.log('Uploading file:', file.name);
        const image = await uploadImage(file, {
          alt: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
        });
        console.log('Image uploaded:', image);

        clearInterval(progressInterval);
        setUploadProgress(prev => ({ ...prev, [uploadId]: 100 }));

        // Nettoyer après 1 seconde
        setTimeout(() => {
          setUploadProgress(prev => {
            const newProgress = { ...prev };
            delete newProgress[uploadId];
            return newProgress;
          });
        }, 1000);

        // Callback si fourni
        if (onImageSelect) {
          onImageSelect(image);
        }
      } catch (error) {
        console.error('Erreur upload:', error);
        newErrors.push(`${file.name} : Erreur lors de l'upload`);
        setErrors(prev => [...prev, ...newErrors]);
        
        // Nettoyer la progression
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[uploadId];
          return newProgress;
        });
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Zone de drop */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats.join(',')}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="space-y-2">
          {isDragging ? (
            <>
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-blue-500" />
              <p className="text-sm font-medium text-blue-600">
                Déposez vos images ici
              </p>
            </>
          ) : (
            <>
              <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">
                Cliquez ou glissez-déposez des images
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, GIF, WebP ou SVG • Max 10MB • {maxFiles - images.length} emplacements restants
              </p>
            </>
          )}
        </div>
      </div>

      {/* Erreurs */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <XMarkIcon className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-red-700">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress bars */}
      {Object.entries(uploadProgress).map(([id, progress]) => (
        <div key={id} className="bg-white border border-gray-200 rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-700">Upload en cours...</span>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ))}

      {/* Info */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>• Les images sont automatiquement optimisées (compression, format WebP)</p>
        <p>• Des miniatures sont générées pour améliorer les performances</p>
        <p>• Les images sont incluses dans l'export du site</p>
      </div>
    </div>
  );
}