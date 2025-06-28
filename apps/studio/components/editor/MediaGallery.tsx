'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, PhotoIcon, CheckCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useNetlifyMedia } from '@/lib/services/netlify-media.service';
import { MediaUploader } from './MediaUploader';
import type { SiteImage } from '@/lib/services/netlify-media.service';

interface MediaGalleryProps {
  projectId: string;
  onSelectImage?: (image: SiteImage) => void;
  selectedImageId?: string;
  mode?: 'gallery' | 'picker';
}

export function MediaGallery({ 
  projectId, 
  onSelectImage,
  selectedImageId,
  mode = 'gallery'
}: MediaGalleryProps) {
  const { images, deleteImage, getPreviewUrl } = useNetlifyMedia(projectId);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [imageUrls, setImageUrls] = useState<Map<string, string>>(new Map());

  // Charger les URLs de preview
  useEffect(() => {
    const urls = new Map<string, string>();
    images.forEach(image => {
      const url = getPreviewUrl(image.id);
      if (url) {
        urls.set(image.id, url);
      }
    });
    setImageUrls(urls);

    // Ne pas révoquer les URLs tant que le composant est monté
    // Les URLs seront nettoyées par le garbage collector
  }, [images]); // Retirer getPreviewUrl des dépendances pour éviter la boucle

  // Filtrer les images
  const filteredImages = images.filter(image => 
    image.alt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    image.path.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectImage = (image: SiteImage) => {
    if (mode === 'picker') {
      onSelectImage?.(image);
    } else {
      if (selectedImages.has(image.id)) {
        const newSelected = new Set(selectedImages);
        newSelected.delete(image.id);
        setSelectedImages(newSelected);
      } else {
        setSelectedImages(new Set([...selectedImages, image.id]));
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedImages.size === 0) return;
    
    if (confirm(`Supprimer ${selectedImages.size} image(s) ?`)) {
      for (const imageId of selectedImages) {
        await deleteImage(imageId);
      }
      setSelectedImages(new Set());
    }
  };

  const handleDeleteSingle = async (imageId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Supprimer cette image ?')) {
      await deleteImage(imageId);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-gray-900">
            Bibliothèque de médias
          </h3>
          <span className="text-sm text-gray-500">
            {images.length} image{images.length > 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {mode === 'gallery' && selectedImages.size > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="btn btn-sm btn-danger"
            >
              <TrashIcon className="w-4 h-4 mr-1" />
              Supprimer ({selectedImages.size})
            </button>
          )}
          
          <button
            onClick={() => setShowUploader(!showUploader)}
            className="btn btn-sm btn-primary"
          >
            <PhotoIcon className="w-4 h-4 mr-1" />
            Ajouter des images
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher des images..."
          className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Uploader */}
      {showUploader && (
        <div className="bg-gray-50 rounded-lg p-4">
          <MediaUploader 
            projectId={projectId}
            onImageSelect={(image) => {
              // Fermer l'uploader après un court délai pour voir l'upload
              setTimeout(() => setShowUploader(false), 500);
            }}
          />
        </div>
      )}

      {/* Gallery */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">
            {searchQuery ? 'Aucune image trouvée' : 'Aucune image dans la bibliothèque'}
          </p>
          {!searchQuery && (
            <button
              onClick={() => setShowUploader(true)}
              className="mt-3 text-sm text-blue-600 hover:text-blue-700"
            >
              Ajouter votre première image
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map(image => {
            const isSelected = mode === 'picker' 
              ? selectedImageId === image.id 
              : selectedImages.has(image.id);
            const previewUrl = imageUrls.get(image.id);

            return (
              <div
                key={image.id}
                onClick={() => handleSelectImage(image)}
                className={`
                  relative group cursor-pointer rounded-lg overflow-hidden
                  border-2 transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }
                `}
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Overlay */}
                <div className={`
                  absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40
                  transition-all duration-200 flex items-end
                `}>
                  {/* Info */}
                  <div className="w-full p-3 bg-gradient-to-t from-black/60 to-transparent
                    opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <p className="text-white text-xs font-medium truncate">
                      {image.alt}
                    </p>
                    <p className="text-white/80 text-xs">
                      {image.width} × {image.height} • {formatFileSize(image.size)}
                    </p>
                  </div>
                </div>

                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2">
                    <CheckCircleIcon className="w-6 h-6 text-blue-500 bg-white rounded-full" />
                  </div>
                )}

                {/* Delete button */}
                {mode === 'gallery' && (
                  <button
                    onClick={(e) => handleDeleteSingle(image.id, e)}
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100
                      transition-opacity duration-200 p-1.5 bg-red-500 text-white
                      rounded-full hover:bg-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Modal pour sélectionner une image
 */
interface ImagePickerModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (image: SiteImage) => void;
  currentImageId?: string;
}

export function ImagePickerModal({
  projectId,
  isOpen,
  onClose,
  onSelect,
  currentImageId
}: ImagePickerModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Sélectionner une image
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <MediaGallery
            projectId={projectId}
            mode="picker"
            selectedImageId={currentImageId}
            onSelectImage={(image) => {
              onSelect(image);
              onClose();
            }}
          />
        </div>

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}