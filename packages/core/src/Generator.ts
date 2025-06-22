import {
  Project,
  GeneratorConfig,
  GeneratorOptions,
  GeneratorResult,
  GeneratorContext,
  GeneratorMetrics,
  GeneratorError,
  GeneratedFile,
  FileType
} from '@awema/shared';
import { TemplateEngine } from './TemplateEngine';
import { PerformanceEngine } from './PerformanceEngine';
import { AssetPipeline } from './AssetPipeline';
import { SEOEngine } from './SEOEngine';
import { CriticalCSSGenerator } from './CriticalCSSGenerator';
import * as fs from 'fs/promises';
import * as path from 'path';
import { createHash } from 'crypto';

export class AWEMAGenerator {
  private templateEngine: TemplateEngine;
  private performanceEngine: PerformanceEngine;
  private assetPipeline: AssetPipeline;
  private seoEngine: SEOEngine;
  private criticalCSSGenerator: CriticalCSSGenerator;
  private context: GeneratorContext;

  constructor(
    private config: GeneratorConfig,
    private options: GeneratorOptions = {
      parallel: true,
      workers: 4,
      cache: true,
      watch: false,
      verbose: false,
      dryRun: false
    }
  ) {
    this.templateEngine = new TemplateEngine();
    this.performanceEngine = new PerformanceEngine();
    this.assetPipeline = new AssetPipeline();
    this.seoEngine = new SEOEngine();
    this.criticalCSSGenerator = new CriticalCSSGenerator();
    
    // Initialize context (will be set properly in generate method)
    this.context = {} as GeneratorContext;
  }

  async generate(project: Project): Promise<GeneratorResult> {
    const startTime = Date.now();
    const metrics: GeneratorMetrics = {
      startTime,
      endTime: 0,
      duration: 0,
      filesGenerated: 0,
      totalSize: 0,
      compressedSize: 0,
      performanceScore: 0,
      seoScore: 0
    };

    this.context = {
      project,
      config: this.config,
      options: this.options,
      cache: new Map(),
      metrics
    };

    const errors: GeneratorError[] = [];
    const warnings: string[] = [];
    const files: GeneratedFile[] = [];

    try {
      if (this.options.verbose) {
        console.log('Starting generation for project:', project.name);
      }

      // Create output directory
      if (!this.options.dryRun) {
        await this.ensureOutputDirectory();
      }

      // Process assets first
      const assetFiles = await this.processAssets(project);
      files.push(...assetFiles);

      // Generate pages
      const pageFiles = await this.generatePages(project);
      files.push(...pageFiles);

      // Generate static files (robots.txt, sitemap.xml, etc.)
      const staticFiles = await this.generateStaticFiles(project);
      files.push(...staticFiles);

      // Calculate metrics
      metrics.endTime = Date.now();
      metrics.duration = metrics.endTime - metrics.startTime;
      metrics.filesGenerated = files.length;
      metrics.totalSize = files.reduce((sum, file) => sum + file.size, 0);
      metrics.compressedSize = files
        .filter(f => f.compressed)
        .reduce((sum, file) => sum + file.size, 0);
      
      // Calculate performance score (mock for now)
      metrics.performanceScore = 95;
      metrics.seoScore = 98;

      if (this.options.verbose) {
        console.log(`Generation completed in ${metrics.duration}ms`);
        console.log(`Generated ${metrics.filesGenerated} files`);
        console.log(`Total size: ${this.formatBytes(metrics.totalSize)}`);
      }

      return {
        success: true,
        project,
        outputPath: this.config.outputPath,
        files,
        metrics,
        errors,
        warnings
      };

    } catch (error) {
      errors.push({
        code: 'GENERATION_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        stack: error instanceof Error ? error.stack : undefined
      });

      return {
        success: false,
        project,
        outputPath: this.config.outputPath,
        files,
        metrics,
        errors,
        warnings
      };
    }
  }

  private async ensureOutputDirectory(): Promise<void> {
    try {
      await fs.mkdir(this.config.outputPath, { recursive: true });
    } catch (error) {
      throw new Error(`Failed to create output directory: ${error}`);
    }
  }

  private async processAssets(project: Project): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    for (const asset of project.assets) {
      try {
        const processedAsset = await this.assetPipeline.process(asset, this.context);
        
        if (!this.options.dryRun) {
          const outputPath = path.join(this.config.outputPath, processedAsset.path);
          await fs.mkdir(path.dirname(outputPath), { recursive: true });
          await fs.writeFile(outputPath, processedAsset.content);
        }

        files.push({
          path: processedAsset.path,
          type: this.getFileType(processedAsset.path),
          size: processedAsset.content.length,
          hash: this.generateHash(processedAsset.content),
          optimized: true,
          compressed: processedAsset.compressed
        });
      } catch (error) {
        console.error(`Failed to process asset ${asset.path}:`, error);
      }
    }

    return files;
  }

  private async generatePages(project: Project): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    for (const page of project.pages) {
      try {
        // Render page HTML
        const html = await this.templateEngine.renderPage(page, project, this.context);
        
        // Apply SEO optimizations
        const seoOptimizedHtml = await this.seoEngine.optimize(html, page, project);
        
        // Extract and inline critical CSS
        const criticalOptimizedHtml = await this.criticalCSSGenerator.process(
          seoOptimizedHtml,
          page,
          this.context
        );
        
        // Apply performance optimizations
        const optimizedHtml = await this.performanceEngine.optimizeHTML(
          criticalOptimizedHtml,
          this.context
        );

        const outputPath = this.getPageOutputPath(page.path);
        
        if (!this.options.dryRun) {
          const fullPath = path.join(this.config.outputPath, outputPath);
          await fs.mkdir(path.dirname(fullPath), { recursive: true });
          await fs.writeFile(fullPath, optimizedHtml);
        }

        files.push({
          path: outputPath,
          type: FileType.HTML,
          size: Buffer.byteLength(optimizedHtml),
          hash: this.generateHash(optimizedHtml),
          optimized: true,
          compressed: true
        });

        // Generate CSS and JS files for the page
        const pageAssets = await this.generatePageAssets(page, project);
        files.push(...pageAssets);

      } catch (error) {
        console.error(`Failed to generate page ${page.path}:`, error);
      }
    }

    return files;
  }

  private async generatePageAssets(page: any, project: Project): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    // Generate CSS file
    const css = await this.templateEngine.generatePageCSS(page, project, this.context);
    const optimizedCSS = await this.performanceEngine.optimizeCSS(css, this.context);
    
    const cssPath = `css/${page.id}.css`;
    if (!this.options.dryRun) {
      const fullPath = path.join(this.config.outputPath, cssPath);
      await fs.mkdir(path.dirname(fullPath), { recursive: true });
      await fs.writeFile(fullPath, optimizedCSS);
    }

    files.push({
      path: cssPath,
      type: FileType.CSS,
      size: Buffer.byteLength(optimizedCSS),
      hash: this.generateHash(optimizedCSS),
      optimized: true,
      compressed: true
    });

    // Generate JS file if needed
    const js = await this.templateEngine.generatePageJS(page, project, this.context);
    if (js) {
      const optimizedJS = await this.performanceEngine.optimizeJS(js, this.context);
      
      const jsPath = `js/${page.id}.js`;
      if (!this.options.dryRun) {
        const fullPath = path.join(this.config.outputPath, jsPath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, optimizedJS);
      }

      files.push({
        path: jsPath,
        type: FileType.JS,
        size: Buffer.byteLength(optimizedJS),
        hash: this.generateHash(optimizedJS),
        optimized: true,
        compressed: true
      });
    }

    return files;
  }

  private async generateStaticFiles(project: Project): Promise<GeneratedFile[]> {
    const files: GeneratedFile[] = [];

    // Generate robots.txt
    const robotsTxt = await this.seoEngine.generateRobotsTxt(project);
    if (!this.options.dryRun) {
      await fs.writeFile(path.join(this.config.outputPath, 'robots.txt'), robotsTxt);
    }
    files.push({
      path: 'robots.txt',
      type: FileType.OTHER,
      size: Buffer.byteLength(robotsTxt),
      hash: this.generateHash(robotsTxt),
      optimized: false,
      compressed: false
    });

    // Generate sitemap.xml
    const sitemap = await this.seoEngine.generateSitemap(project, this.config.baseUrl);
    if (!this.options.dryRun) {
      await fs.writeFile(path.join(this.config.outputPath, 'sitemap.xml'), sitemap);
    }
    files.push({
      path: 'sitemap.xml',
      type: FileType.XML,
      size: Buffer.byteLength(sitemap),
      hash: this.generateHash(sitemap),
      optimized: false,
      compressed: false
    });

    return files;
  }

  private getPageOutputPath(pagePath: string): string {
    if (pagePath === '/' || pagePath === '') {
      return 'index.html';
    }
    
    // Remove leading slash
    const cleanPath = pagePath.startsWith('/') ? pagePath.slice(1) : pagePath;
    
    // Add .html if not present
    if (!cleanPath.endsWith('.html')) {
      return `${cleanPath}/index.html`;
    }
    
    return cleanPath;
  }

  private getFileType(filePath: string): FileType {
    const ext = path.extname(filePath).toLowerCase();
    
    switch (ext) {
      case '.html':
      case '.htm':
        return FileType.HTML;
      case '.css':
        return FileType.CSS;
      case '.js':
      case '.mjs':
        return FileType.JS;
      case '.jpg':
      case '.jpeg':
      case '.png':
      case '.gif':
      case '.webp':
      case '.svg':
      case '.avif':
        return FileType.IMAGE;
      case '.woff':
      case '.woff2':
      case '.ttf':
      case '.eot':
      case '.otf':
        return FileType.FONT;
      case '.json':
        return FileType.JSON;
      case '.xml':
        return FileType.XML;
      default:
        return FileType.OTHER;
    }
  }

  private generateHash(content: string | Buffer): string {
    return createHash('sha256').update(content).digest('hex').slice(0, 8);
  }

  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}