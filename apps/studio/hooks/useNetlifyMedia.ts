import { useState, useEffect } from 'react';
import { NetlifyMediaService, SiteImage } from '@/lib/services/netlify-media.service';

/**
 * Hook React pour utiliser le service de médias
 */
export function useNetlifyMedia(projectId: string) {
  const [service] = useState(() => new NetlifyMediaService());
  const [images, setImages] = useState<SiteImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Charger les images au montage
    const loadImages = async () => {
      setIsLoading(true);
      await service.loadFromLocalStorage(projectId);
      setImages(service.getProjectImages());
      setIsLoading(false);
    };
    
    loadImages();
  }, [projectId]);

  const uploadImage = async (file: File, options?: { alt?: string; category?: string }) => {
    const image = await service.uploadImage(file, projectId, options);
    await service.saveToLocalStorage(projectId);
    setImages(service.getProjectImages());
    return image;
  };

  const deleteImage = async (imageId: string) => {
    service.deleteImage(imageId);
    await service.saveToLocalStorage(projectId);
    setImages(service.getProjectImages());
  };

  const getPreviewUrl = (imageId: string) => {
    return service.getPreviewUrl(imageId);
  };

  return {
    images,
    uploadImage,
    deleteImage,
    getPreviewUrl,
    isLoading,
    service // Exposer le service pour accéder aux méthodes
  };
}