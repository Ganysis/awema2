'use client';

import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { ImagePickerModal } from './MediaGallery';
import { useNetlifyMedia } from '@/lib/services/netlify-media.service';
import type { SiteImage } from '@/lib/services/netlify-media.service';

interface ImagePickerWithDetailsProps {
  value: any;
  onChange: (value: any) => void;
  projectId?: string;
  showAlt?: boolean;
  showTitle?: boolean;
  placeholder?: string;
  required?: boolean;
}

export function ImagePickerWithDetails({
  value,
  onChange,
  projectId,
  showAlt = true,
  showTitle = false,
  placeholder = 'Image URL',
  required = false
}: ImagePickerWithDetailsProps) {
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { images, getPreviewUrl } = useNetlifyMedia(projectId || 'default');
  
  // IMPORTANT: Si showAlt et showTitle sont false, on travaille avec une string simple
  const isSimpleString = !showAlt && !showTitle;
  
  // Normaliser la valeur - peut être une string (URL) ou un objet
  const imageData = typeof value === 'string' 
    ? { url: value, alt: '', title: '' }
    : (value || { url: '', alt: '', title: '' });

  // Gérer l'URL de preview pour les images uploadées
  useEffect(() => {
    if (imageData.url && imageData.url.startsWith('/images/')) {
      // C'est une image uploadée, trouver son URL de preview
      const image = images.find(img => img.path === imageData.url);
      if (image) {
        const url = getPreviewUrl(image.id);
        setPreviewUrl(url);
      } else {
        setPreviewUrl(imageData.url);
      }
    } else {
      // URL externe ou relative
      setPreviewUrl(imageData.url);
    }
  }, [imageData.url, images]); // Retirer getPreviewUrl des dépendances

  const handleImageSelect = (image: SiteImage) => {
    // Utiliser le chemin de l'image (qui sera transformé lors de l'export)
    const imageUrl = image.path;
    
    if (isSimpleString) {
      // Pour les propriétés qui attendent une string simple (hero backgrounds, etc.)
      onChange(imageUrl);
    } else {
      // Pour les propriétés qui peuvent avoir alt/title
      onChange({
        url: imageUrl,
        alt: imageData.alt || image.alt,
        title: imageData.title || image.alt
      });
    }
  };

  const handleUrlChange = (url: string) => {
    if (isSimpleString) {
      onChange(url);
    } else {
      onChange({ ...imageData, url });
    }
  };

  const handleAltChange = (alt: string) => {
    if (!isSimpleString) {
      onChange({ ...imageData, alt });
    }
  };

  const handleTitleChange = (title: string) => {
    if (!isSimpleString) {
      onChange({ ...imageData, title });
    }
  };

  return (
    <div className="space-y-2">
      {/* URL Field with Gallery Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={imageData.url || ''}
          onChange={(e) => handleUrlChange(e.target.value)}
          placeholder={placeholder}
          className="property-input flex-1"
          required={required}
        />
        {projectId && (
          <button
            type="button"
            onClick={() => setShowImagePicker(true)}
            className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            title="Sélectionner depuis la bibliothèque"
          >
            <PhotoIcon className="w-5 h-5 text-gray-600" />
          </button>
        )}
      </div>

      {/* Alt Text Field */}
      {showAlt && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Texte alternatif (SEO)
          </label>
          <input
            type="text"
            value={imageData.alt || ''}
            onChange={(e) => handleAltChange(e.target.value)}
            placeholder="Description de l'image pour le SEO"
            className="property-input"
          />
        </div>
      )}

      {/* Title Field */}
      {showTitle && (
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Titre de l'image
          </label>
          <input
            type="text"
            value={imageData.title || ''}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Titre affiché au survol"
            className="property-input"
          />
        </div>
      )}

      {/* Image Preview */}
      {previewUrl && (
        <div className="relative w-full h-32 bg-gray-100 rounded overflow-hidden">
          <img 
            src={previewUrl} 
            alt={imageData.alt || 'Preview'} 
            title={imageData.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Image Picker Modal */}
      {showImagePicker && projectId && (
        <ImagePickerModal
          projectId={projectId}
          isOpen={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          onSelect={handleImageSelect}
          currentImageId={imageData.url}
        />
      )}
    </div>
  );
}