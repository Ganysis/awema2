/**
 * Service de gestion des médias pour Netlify
 * Les images sont stockées avec le site lors de l'export
 */

import { MediaOptimizationService } from './media-optimization.service';

export interface SiteImage {
  id: string;
  path: string;
  alt: string;
  width: number;
  height: number;
  size: number;
  thumbnailPath?: string;
  createdAt: Date;
}

export class NetlifyMediaService {
  /**
   * Stockage temporaire des images du projet en mémoire
   * Les images sont incluses dans l'export Netlify
   */
  private projectImages: Map<string, {
    metadata: SiteImage;
    blob: Blob;
    thumbnailBlob?: Blob;
  }> = new Map();

  /**
   * Cache des URLs de preview pour éviter de recréer des blob URLs
   */
  private previewUrlCache: Map<string, string> = new Map();

  /**
   * Upload une image dans le projet
   */
  async uploadImage(
    file: File,
    projectId: string,
    options?: {
      alt?: string;
      category?: string;
    }
  ): Promise<SiteImage> {
    // Optimiser l'image
    const { optimized, thumbnail, metadata } = await MediaOptimizationService.optimizeImage(file, {
      generateThumbnail: true,
      format: 'webp'
    });

    // Générer les chemins
    const filename = MediaOptimizationService.generateSEOFilename(file.name, options?.category);
    const imagePath = `/images/${filename}.webp`;
    const thumbnailPath = thumbnail ? `/images/thumbnails/${filename}.webp` : undefined;

    // Créer les métadonnées
    const imageData: SiteImage = {
      id: crypto.randomUUID(),
      path: imagePath,
      alt: options?.alt || file.name.replace(/\.[^/.]+$/, ''),
      width: metadata.dimensions.width,
      height: metadata.dimensions.height,
      size: optimized.size,
      thumbnailPath,
      createdAt: new Date()
    };

    // Stocker en mémoire pour l'export
    this.projectImages.set(imageData.id, {
      metadata: imageData,
      blob: optimized,
      thumbnailBlob: thumbnail
    });

    // Retourner les métadonnées pour l'éditeur
    return imageData;
  }

  /**
   * Récupère toutes les images du projet
   */
  getProjectImages(): SiteImage[] {
    return Array.from(this.projectImages.values()).map(img => img.metadata);
  }

  /**
   * Supprime une image
   */
  deleteImage(imageId: string): boolean {
    // Nettoyer l'URL du cache si elle existe
    const cachedUrl = this.previewUrlCache.get(imageId);
    if (cachedUrl) {
      URL.revokeObjectURL(cachedUrl);
      this.previewUrlCache.delete(imageId);
    }
    return this.projectImages.delete(imageId);
  }

  /**
   * Prépare les images pour l'export Netlify
   */
  async prepareImagesForExport(): Promise<Array<{ path: string; content: Buffer }>> {
    const exportFiles: Array<{ path: string; content: Buffer }> = [];

    for (const [_, imageData] of this.projectImages) {
      // Image principale
      const imageBuffer = await this.blobToBuffer(imageData.blob);
      exportFiles.push({
        path: imageData.metadata.path,
        content: imageBuffer
      });

      // Thumbnail si présent
      if (imageData.thumbnailBlob && imageData.metadata.thumbnailPath) {
        const thumbBuffer = await this.blobToBuffer(imageData.thumbnailBlob);
        exportFiles.push({
          path: imageData.metadata.thumbnailPath,
          content: thumbBuffer
        });
      }
    }

    return exportFiles;
  }

  /**
   * Convertit un Blob en Buffer pour l'export
   */
  private async blobToBuffer(blob: Blob): Promise<Buffer> {
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Sauvegarde les images dans le localStorage pour persistance
   */
  async saveToLocalStorage(projectId: string): Promise<void> {
    const images: any[] = [];
    
    for (const [id, data] of this.projectImages) {
      // Convertir le blob en base64 pour le stockage
      const base64 = await this.blobToBase64(data.blob);
      const thumbBase64 = data.thumbnailBlob ? await this.blobToBase64(data.thumbnailBlob) : null;
      
      images.push({
        id,
        metadata: data.metadata,
        base64,
        thumbBase64
      });
    }

    localStorage.setItem(`project-images-${projectId}`, JSON.stringify(images));
  }

  /**
   * Charge les images depuis le localStorage
   */
  async loadFromLocalStorage(projectId: string): Promise<void> {
    const stored = localStorage.getItem(`project-images-${projectId}`);
    if (!stored) return;

    const images = JSON.parse(stored);
    this.projectImages.clear();

    for (const img of images) {
      const blob = await this.base64ToBlob(img.base64);
      const thumbnailBlob = img.thumbBase64 ? await this.base64ToBlob(img.thumbBase64) : undefined;
      
      this.projectImages.set(img.id, {
        metadata: img.metadata,
        blob,
        thumbnailBlob
      });
    }
  }

  /**
   * Convertit un blob en base64
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Convertit base64 en blob
   */
  private async base64ToBlob(base64: string): Promise<Blob> {
    const response = await fetch(base64);
    return response.blob();
  }

  /**
   * Obtient l'URL temporaire pour preview dans l'éditeur
   */
  getPreviewUrl(imageId: string): string | null {
    // Vérifier le cache d'abord
    if (this.previewUrlCache.has(imageId)) {
      return this.previewUrlCache.get(imageId)!;
    }

    const imageData = this.projectImages.get(imageId);
    if (!imageData) return null;

    // Créer une URL temporaire pour le preview et la mettre en cache
    const url = URL.createObjectURL(imageData.blob);
    this.previewUrlCache.set(imageId, url);
    return url;
  }

  /**
   * Nettoie les URLs temporaires
   */
  cleanupPreviewUrls(): void {
    // Les URLs seront automatiquement nettoyées par le garbage collector
    // mais on peut forcer le nettoyage si nécessaire
  }
}