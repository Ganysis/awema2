import { Asset, AssetType, GeneratorContext, ImageFormat } from '@awema/shared';
import sharp from 'sharp';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface ProcessedAsset {
  path: string;
  content: Buffer;
  mimeType: string;
  compressed: boolean;
}

export class AssetPipeline {
  async process(asset: Asset, context: GeneratorContext): Promise<ProcessedAsset> {
    const { performance } = context.config;
    
    switch (asset.type) {
      case AssetType.IMAGE:
        return this.processImage(asset, context);
      case AssetType.FONT:
        return this.processFont(asset, context);
      default:
        return this.processGeneric(asset, context);
    }
  }

  private async processImage(asset: Asset, context: GeneratorContext): Promise<ProcessedAsset> {
    const { images } = context.config.performance;
    
    try {
      // Read the original image
      const inputBuffer = await this.readAsset(asset.originalPath);
      
      // Determine output format
      const ext = path.extname(asset.path).toLowerCase();
      let outputFormat: keyof sharp.FormatEnum = 'jpeg';
      let outputPath = asset.path;
      
      // Convert to modern formats if enabled
      if (images.webp && this.supportsWebP(ext)) {
        outputFormat = 'webp';
        outputPath = asset.path.replace(ext, '.webp');
      } else if (images.avif && this.supportsAvif(ext)) {
        outputFormat = 'avif';
        outputPath = asset.path.replace(ext, '.avif');
      } else if (ext === '.jpg' || ext === '.jpeg') {
        outputFormat = 'jpeg';
      } else if (ext === '.png') {
        outputFormat = 'png';
      }
      
      // Process with sharp
      let sharpInstance = sharp(inputBuffer);
      
      // Get metadata
      const metadata = await sharpInstance.metadata();
      
      // Resize if needed for responsive images
      if (images.responsive && images.sizes.length > 0) {
        // For POC, we'll just optimize the original size
        // In production, we'd generate multiple sizes
      }
      
      // Apply format-specific optimizations
      switch (outputFormat) {
        case 'jpeg':
          sharpInstance = sharpInstance.jpeg({
            quality: images.quality,
            progressive: true,
            mozjpeg: true
          });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({
            quality: images.quality,
            compressionLevel: 9,
            adaptiveFiltering: true
          });
          break;
        case 'webp':
          sharpInstance = sharpInstance.webp({
            quality: images.quality,
            effort: 6,
            lossless: false
          });
          break;
        case 'avif':
          sharpInstance = sharpInstance.avif({
            quality: images.quality,
            effort: 9,
            lossless: false
          });
          break;
      }
      
      // Output buffer
      const outputBuffer = await sharpInstance.toBuffer();
      
      return {
        path: outputPath,
        content: outputBuffer,
        mimeType: this.getMimeType(outputFormat),
        compressed: true
      };
      
    } catch (error) {
      console.error(`Failed to process image ${asset.path}:`, error);
      // Return original if processing fails
      const content = await this.readAsset(asset.originalPath);
      return {
        path: asset.path,
        content,
        mimeType: asset.mimeType,
        compressed: false
      };
    }
  }

  private async processFont(asset: Asset, context: GeneratorContext): Promise<ProcessedAsset> {
    const { fonts } = context.config.performance;
    
    // For POC, we'll just copy fonts
    // In production, we'd subset fonts based on usage
    const content = await this.readAsset(asset.originalPath);
    
    return {
      path: asset.path,
      content,
      mimeType: asset.mimeType,
      compressed: false
    };
  }

  private async processGeneric(asset: Asset, context: GeneratorContext): Promise<ProcessedAsset> {
    const content = await this.readAsset(asset.originalPath);
    
    return {
      path: asset.path,
      content,
      mimeType: asset.mimeType,
      compressed: false
    };
  }

  private async readAsset(filePath: string): Promise<Buffer> {
    try {
      return await fs.readFile(filePath);
    } catch (error) {
      // For POC, return empty buffer if file doesn't exist
      console.warn(`Asset not found: ${filePath}`);
      return Buffer.from('');
    }
  }

  private supportsWebP(ext: string): boolean {
    return ['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase());
  }

  private supportsAvif(ext: string): boolean {
    return ['.jpg', '.jpeg', '.png'].includes(ext.toLowerCase());
  }

  private getMimeType(format: string): string {
    const mimeTypes: Record<string, string> = {
      jpeg: 'image/jpeg',
      jpg: 'image/jpeg',
      png: 'image/png',
      webp: 'image/webp',
      avif: 'image/avif',
      svg: 'image/svg+xml',
      gif: 'image/gif'
    };
    
    return mimeTypes[format] || 'application/octet-stream';
  }

  async generateImageSrcset(
    imagePath: string,
    sizes: Array<{ width: number; suffix: string }>,
    context: GeneratorContext
  ): Promise<string> {
    const srcset: string[] = [];
    
    for (const size of sizes) {
      const sizedPath = imagePath.replace(
        path.extname(imagePath),
        `${size.suffix}${path.extname(imagePath)}`
      );
      srcset.push(`${sizedPath} ${size.width}w`);
    }
    
    return srcset.join(', ');
  }

  generatePictureSources(
    imagePath: string,
    formats: ImageFormat[],
    sizes: string
  ): string {
    const sources: string[] = [];
    
    for (const format of formats) {
      if (format === ImageFormat.AVIF) {
        sources.push(`<source srcset="${imagePath.replace(/\.[^.]+$/, '.avif')}" type="image/avif" sizes="${sizes}">`);
      } else if (format === ImageFormat.WEBP) {
        sources.push(`<source srcset="${imagePath.replace(/\.[^.]+$/, '.webp')}" type="image/webp" sizes="${sizes}">`);
      }
    }
    
    return sources.join('\n');
  }

  async generatePlaceholder(
    imagePath: string,
    type: 'blur' | 'lqip' | 'color',
    context: GeneratorContext
  ): Promise<string> {
    try {
      const inputBuffer = await this.readAsset(imagePath);
      const sharpInstance = sharp(inputBuffer);
      
      switch (type) {
        case 'blur':
          // Generate a small blurred version
          const blurred = await sharpInstance
            .resize(20, 20, { fit: 'inside' })
            .blur(5)
            .toBuffer();
          return `data:image/jpeg;base64,${blurred.toString('base64')}`;
          
        case 'lqip':
          // Generate a low-quality image placeholder
          const lqip = await sharpInstance
            .resize(50, 50, { fit: 'inside' })
            .jpeg({ quality: 20 })
            .toBuffer();
          return `data:image/jpeg;base64,${lqip.toString('base64')}`;
          
        case 'color':
          // Extract dominant color
          const { dominant } = await sharpInstance.stats();
          const { r, g, b } = dominant;
          return `rgb(${r}, ${g}, ${b})`;
          
        default:
          return '';
      }
    } catch (error) {
      console.error(`Failed to generate placeholder for ${imagePath}:`, error);
      return '';
    }
  }
}