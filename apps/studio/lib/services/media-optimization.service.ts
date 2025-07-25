/**
 * Service d'optimisation des médias
 * Gère la compression, conversion et optimisation des images
 */

interface ImageDimensions {
  width: number;
  height: number;
}

interface OptimizationOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
  generateThumbnail?: boolean;
}

export class MediaOptimizationService {
  private static readonly DEFAULT_MAX_WIDTH = 1920;
  private static readonly DEFAULT_MAX_HEIGHT = 1080;
  private static readonly DEFAULT_QUALITY = 0.85;
  private static readonly THUMBNAIL_SIZE = 300;

  /**
   * Optimise une image avant l'upload
   */
  static async optimizeImage(
    file: File,
    options: OptimizationOptions = {}
  ): Promise<{ optimized: Blob; thumbnail?: Blob; metadata: any }> {
    const {
      maxWidth = this.DEFAULT_MAX_WIDTH,
      maxHeight = this.DEFAULT_MAX_HEIGHT,
      quality = this.DEFAULT_QUALITY,
      format = 'webp',
      generateThumbnail = true
    } = options;

    // Créer un canvas pour le traitement
    const img = await this.loadImage(file);
    const dimensions = this.calculateDimensions(img, maxWidth, maxHeight);
    
    // Image principale optimisée
    const optimized = await this.processImage(img, dimensions, format, quality);
    
    // Thumbnail si demandé
    let thumbnail;
    if (generateThumbnail) {
      const thumbDimensions = this.calculateDimensions(img, this.THUMBNAIL_SIZE, this.THUMBNAIL_SIZE);
      thumbnail = await this.processImage(img, thumbDimensions, 'webp', 0.8);
    }

    // Métadonnées
    const metadata = {
      originalSize: file.size,
      optimizedSize: optimized.size,
      compression: Math.round((1 - optimized.size / file.size) * 100),
      dimensions,
      format
    };

    return { optimized, thumbnail, metadata };
  }

  /**
   * Charge une image depuis un fichier
   */
  private static loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load image'));
      };
      
      img.src = url;
    });
  }

  /**
   * Calcule les dimensions optimales en gardant le ratio
   */
  private static calculateDimensions(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ): ImageDimensions {
    let { width, height } = img;
    
    // Calculer le ratio de redimensionnement
    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;
    const ratio = Math.min(widthRatio, heightRatio, 1);
    
    return {
      width: Math.round(width * ratio),
      height: Math.round(height * ratio)
    };
  }

  /**
   * Traite l'image avec les paramètres spécifiés
   */
  private static processImage(
    img: HTMLImageElement,
    dimensions: ImageDimensions,
    format: string,
    quality: number
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }

      canvas.width = dimensions.width;
      canvas.height = dimensions.height;
      
      // Fond blanc pour JPEG
      if (format === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      // Dessiner l'image redimensionnée
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
      
      // Convertir en blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        },
        `image/${format}`,
        quality
      );
    });
  }

  /**
   * Génère un nom de fichier optimisé pour le SEO
   */
  static generateSEOFilename(originalName: string, context?: string): string {
    // Retirer l'extension
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    
    // Nettoyer et formater
    let seoName = nameWithoutExt
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    // Ajouter le contexte si fourni
    if (context) {
      seoName = `${context}-${seoName}`;
    }
    
    // Ajouter un timestamp pour l'unicité
    const timestamp = Date.now();
    
    return `${seoName}-${timestamp}`;
  }

  /**
   * Vérifie si un fichier est une image valide
   */
  static isValidImage(file: File): boolean {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    return validTypes.includes(file.type);
  }

  /**
   * Obtient les dimensions d'une image sans la charger complètement
   */
  static async getImageDimensions(file: File): Promise<ImageDimensions> {
    const img = await this.loadImage(file);
    return {
      width: img.width,
      height: img.height
    };
  }
}

/**
 * Service de stockage local pour Netlify
 */
export class LocalMediaStorage {
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  private static readonly ALLOWED_FORMATS = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];

  /**
   * Prépare les images pour l'export Netlify
   */
  static async prepareImagesForExport(
    images: Array<{ path: string; blob: Blob }>
  ): Promise<Array<{ path: string; data: Buffer }>> {
    const prepared = [];

    for (const { path, blob } of images) {
      const buffer = await this.blobToBuffer(blob);
      prepared.push({ path, data: buffer });
    }

    return prepared;
  }

  /**
   * Convertit un Blob en Buffer
   */
  private static async blobToBuffer(blob: Blob): Promise<Buffer> {
    const arrayBuffer = await blob.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Valide la taille du fichier
   */
  static validateFileSize(file: File): boolean {
    return file.size <= this.MAX_FILE_SIZE;
  }

  /**
   * Valide le format du fichier
   */
  static validateFileFormat(file: File): boolean {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? this.ALLOWED_FORMATS.includes(extension) : false;
  }

  /**
   * Génère un chemin optimisé pour l'image
   */
  static generateImagePath(filename: string, category: string = 'general'): string {
    return `/images/${category}/${filename}.webp`;
  }
}

/**
 * Gestionnaire d'images pour l'éditeur
 */
export interface EditorImage {
  id: string;
  url: string;
  thumbnailUrl?: string;
  alt: string;
  title?: string;
  width: number;
  height: number;
  size: number;
  format: string;
  category?: string;
  createdAt: Date;
}

export class EditorMediaManager {
  private images: Map<string, EditorImage> = new Map();

  /**
   * Ajoute une image à la bibliothèque
   */
  async addImage(file: File, metadata?: Partial<EditorImage>): Promise<EditorImage> {
    // Valider le fichier
    if (!MediaOptimizationService.isValidImage(file)) {
      throw new Error('Format de fichier non supporté');
    }

    if (!LocalMediaStorage.validateFileSize(file)) {
      throw new Error('Fichier trop volumineux (max 5MB)');
    }

    // Optimiser l'image
    const { optimized, thumbnail, metadata: optMeta } = await MediaOptimizationService.optimizeImage(file);
    
    // Générer les chemins
    const filename = MediaOptimizationService.generateSEOFilename(file.name, metadata?.category);
    const imagePath = LocalMediaStorage.generateImagePath(filename, metadata?.category);
    const thumbPath = thumbnail ? LocalMediaStorage.generateImagePath(`thumb-${filename}`, 'thumbnails') : undefined;

    // Créer l'objet image
    const image: EditorImage = {
      id: crypto.randomUUID(),
      url: imagePath,
      thumbnailUrl: thumbPath,
      alt: metadata?.alt || file.name,
      title: metadata?.title,
      width: optMeta.dimensions.width,
      height: optMeta.dimensions.height,
      size: optimized.size,
      format: optMeta.format,
      category: metadata?.category || 'general',
      createdAt: new Date(),
      ...metadata
    };

    // Stocker dans la map
    this.images.set(image.id, image);

    // Retourner avec les blobs pour l'upload
    return {
      ...image,
      _blob: optimized,
      _thumbnailBlob: thumbnail
    } as any;
  }

  /**
   * Récupère toutes les images d'une catégorie
   */
  getImagesByCategory(category?: string): EditorImage[] {
    const images = Array.from(this.images.values());
    
    if (category) {
      return images.filter(img => img.category === category);
    }
    
    return images;
  }

  /**
   * Export pour l'inclusion dans le site
   */
  exportForSite(): Array<{ path: string; blob: Blob }> {
    const exports: Array<{ path: string; blob: Blob }> = [];
    
    this.images.forEach(image => {
      if ((image as any)._blob) {
        exports.push({
          path: image.url,
          blob: (image as any)._blob
        });
      }
      
      if ((image as any)._thumbnailBlob && image.thumbnailUrl) {
        exports.push({
          path: image.thumbnailUrl,
          blob: (image as any)._thumbnailBlob
        });
      }
    });
    
    return exports;
  }
}