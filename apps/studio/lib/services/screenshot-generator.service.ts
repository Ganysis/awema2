import puppeteer, { Browser, Page } from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';

export interface ScreenshotOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
  fullPage?: boolean;
  waitForSelector?: string;
  waitForTimeout?: number;
  device?: 'desktop' | 'tablet' | 'mobile';
  darkMode?: boolean;
  hideElements?: string[];
}

export interface ScreenshotResult {
  success: boolean;
  filePath?: string;
  thumbnailPath?: string;
  fileSize?: number;
  dimensions?: { width: number; height: number };
  error?: string;
}

class ScreenshotGeneratorService {
  private browser: Browser | null = null;
  private isInitialized = false;

  /**
   * Initialise le navigateur Puppeteer
   */
  async initialize(): Promise<void> {
    if (this.isInitialized && this.browser) {
      return;
    }

    try {
      console.log('🚀 Initialisation du navigateur pour screenshots...');

      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ],
        timeout: 60000
      });

      this.isInitialized = true;
      console.log('✅ Navigateur initialisé');

    } catch (error) {
      console.error('❌ Erreur initialisation navigateur:', error);
      throw new Error(`Impossible d'initialiser le navigateur: ${error.message}`);
    }
  }

  /**
   * Génère un screenshot d'une URL
   */
  async generateScreenshot(
    url: string,
    outputPath: string,
    options: ScreenshotOptions = {}
  ): Promise<ScreenshotResult> {
    try {
      await this.initialize();

      if (!this.browser) {
        throw new Error('Navigateur non initialisé');
      }

      console.log(`📸 Génération screenshot: ${url}`);

      const page = await this.browser.newPage();

      // Configuration de la page
      await this.configurePage(page, options);

      // Navigation vers l'URL
      const navigationPromise = page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 60000
      });

      await navigationPromise;

      // Attendre le chargement complet
      await this.waitForPageReady(page, options);

      // Masquer les éléments indésirables
      if (options.hideElements) {
        await this.hideElements(page, options.hideElements);
      }

      // S'assurer que le dossier de destination existe
      const dir = path.dirname(outputPath);
      await fs.mkdir(dir, { recursive: true });

      // Prendre le screenshot
      const screenshotBuffer = await page.screenshot({
        path: outputPath,
        type: options.format || 'jpeg',
        quality: options.format === 'jpeg' ? (options.quality || 85) : undefined,
        fullPage: options.fullPage || false
      });

      // Obtenir les dimensions
      const dimensions = await page.evaluate(() => ({
        width: window.innerWidth,
        height: window.innerHeight
      }));

      await page.close();

      // Générer une miniature si demandé
      let thumbnailPath: string | undefined;
      if (options.width && options.width > 400) {
        thumbnailPath = await this.generateThumbnail(outputPath, options);
      }

      // Obtenir la taille du fichier
      const stats = await fs.stat(outputPath);
      const fileSize = stats.size;

      console.log(`✅ Screenshot généré: ${outputPath} (${fileSize} bytes)`);

      return {
        success: true,
        filePath: outputPath,
        thumbnailPath,
        fileSize,
        dimensions
      };

    } catch (error) {
      console.error(`❌ Erreur screenshot ${url}:`, error);

      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Génère des screenshots pour plusieurs URLs en parallèle
   */
  async generateMultipleScreenshots(
    urls: Array<{ url: string; outputPath: string; options?: ScreenshotOptions }>,
    concurrency = 3
  ): Promise<ScreenshotResult[]> {
    console.log(`📸 Génération de ${urls.length} screenshots (concurrence: ${concurrency})`);

    const results: ScreenshotResult[] = [];
    const chunks = this.chunkArray(urls, concurrency);

    for (const chunk of chunks) {
      const chunkPromises = chunk.map(({ url, outputPath, options }) =>
        this.generateScreenshot(url, outputPath, options)
      );

      const chunkResults = await Promise.all(chunkPromises);
      results.push(...chunkResults);

      // Petite pause entre les lots pour éviter de surcharger
      if (chunk.length === concurrency) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const successful = results.filter(r => r.success).length;
    console.log(`✅ ${successful}/${urls.length} screenshots générés avec succès`);

    return results;
  }

  /**
   * Génère des screenshots optimisés pour emails (format et taille)
   */
  async generateEmailScreenshots(
    mockups: Array<{ id: string; name: string; url: string }>
  ): Promise<Array<{ id: string; name: string; screenshot: string; thumbnail: string }>> {
    const baseDir = '/tmp/claude/email-screenshots';
    await fs.mkdir(baseDir, { recursive: true });

    const screenshotTasks = mockups.map(mockup => ({
      url: mockup.url,
      outputPath: path.join(baseDir, `${mockup.id}-full.jpg`),
      options: {
        width: 1200,
        height: 800,
        quality: 85,
        format: 'jpeg' as const,
        fullPage: false,
        waitForTimeout: 3000,
        hideElements: [
          '.cookie-banner',
          '.popup',
          '.modal',
          '[data-testid="cookie-banner"]'
        ]
      }
    }));

    const results = await this.generateMultipleScreenshots(screenshotTasks, 2);

    return mockups.map((mockup, index) => {
      const result = results[index];
      return {
        id: mockup.id,
        name: mockup.name,
        screenshot: result.success ? result.filePath! : '',
        thumbnail: result.success ? result.thumbnailPath || result.filePath! : ''
      };
    });
  }

  /**
   * Configure la page selon les options
   */
  private async configurePage(page: Page, options: ScreenshotOptions): Promise<void> {
    // Définir la taille de viewport
    const viewportConfig = this.getViewportConfig(options);
    await page.setViewport(viewportConfig);

    // Mode sombre si demandé
    if (options.darkMode) {
      await page.emulateMediaFeatures([
        { name: 'prefers-color-scheme', value: 'dark' }
      ]);
    }

    // Désactiver les images pour accélérer le chargement (optionnel)
    // await page.setRequestInterception(true);
    // page.on('request', (req) => {
    //   if(req.resourceType() == 'image'){
    //     req.abort();
    //   } else {
    //     req.continue();
    //   }
    // });

    // Injecter CSS pour masquer certains éléments par défaut
    await page.addStyleTag({
      content: `
        .cookie-banner,
        .gdpr-banner,
        .popup-overlay,
        .modal-overlay,
        [data-testid="cookie-banner"],
        .freshchat-widget,
        .intercom-launcher,
        .drift-chat-widget {
          display: none !important;
        }

        /* Masquer les barres de défilement */
        ::-webkit-scrollbar {
          display: none;
        }

        body {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `
    });
  }

  /**
   * Attend que la page soit prête
   */
  private async waitForPageReady(page: Page, options: ScreenshotOptions): Promise<void> {
    // Attendre un sélecteur spécifique si fourni
    if (options.waitForSelector) {
      try {
        await page.waitForSelector(options.waitForSelector, { timeout: 10000 });
      } catch (error) {
        console.warn(`⚠️ Sélecteur ${options.waitForSelector} non trouvé, continuons...`);
      }
    }

    // Attendre un délai fixe si fourni
    if (options.waitForTimeout) {
      await page.waitForTimeout(options.waitForTimeout);
    }

    // Attendre que toutes les polices soient chargées
    await page.evaluate(() => {
      return document.fonts.ready;
    });

    // Attendre que les images soient chargées
    await page.evaluate(() => {
      return new Promise((resolve) => {
        const images = Array.from(document.images);
        let loaded = 0;

        if (images.length === 0) {
          resolve(true);
          return;
        }

        images.forEach((img) => {
          if (img.complete) {
            loaded++;
          } else {
            img.addEventListener('load', () => {
              loaded++;
              if (loaded === images.length) {
                resolve(true);
              }
            });
            img.addEventListener('error', () => {
              loaded++;
              if (loaded === images.length) {
                resolve(true);
              }
            });
          }
        });

        if (loaded === images.length) {
          resolve(true);
        }

        // Timeout après 5 secondes
        setTimeout(() => resolve(true), 5000);
      });
    });
  }

  /**
   * Masque les éléments spécifiés
   */
  private async hideElements(page: Page, selectors: string[]): Promise<void> {
    await page.evaluate((selectors) => {
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          (el as HTMLElement).style.display = 'none';
        });
      });
    }, selectors);
  }

  /**
   * Génère une miniature
   */
  private async generateThumbnail(
    originalPath: string,
    options: ScreenshotOptions
  ): Promise<string | undefined> {
    try {
      const thumbnailPath = originalPath.replace(/\.(jpg|jpeg|png|webp)$/i, '-thumb.$1');

      // Ici on pourrait utiliser une librairie comme Sharp pour redimensionner
      // Pour l'instant, on retourne le chemin même si on ne génère pas vraiment la miniature

      return thumbnailPath;
    } catch (error) {
      console.error('❌ Erreur génération miniature:', error);
      return undefined;
    }
  }

  /**
   * Obtient la configuration de viewport selon les options
   */
  private getViewportConfig(options: ScreenshotOptions) {
    if (options.device === 'mobile') {
      return { width: 375, height: 667 };
    } else if (options.device === 'tablet') {
      return { width: 768, height: 1024 };
    } else {
      return {
        width: options.width || 1200,
        height: options.height || 800
      };
    }
  }

  /**
   * Divise un tableau en chunks
   */
  private chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  /**
   * Nettoie les ressources
   */
  async cleanup(): Promise<void> {
    if (this.browser) {
      console.log('🧹 Nettoyage du navigateur...');
      await this.browser.close();
      this.browser = null;
      this.isInitialized = false;
    }
  }

  /**
   * Nettoie les anciens screenshots
   */
  async cleanupOldScreenshots(olderThanHours = 24): Promise<void> {
    try {
      const screenshotDir = '/tmp/claude/email-screenshots';
      const files = await fs.readdir(screenshotDir);
      const cutoffTime = Date.now() - (olderThanHours * 60 * 60 * 1000);

      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(screenshotDir, file);
        const stats = await fs.stat(filePath);

        if (stats.mtime.getTime() < cutoffTime) {
          await fs.unlink(filePath);
          deletedCount++;
        }
      }

      if (deletedCount > 0) {
        console.log(`🧹 ${deletedCount} anciens screenshots supprimés`);
      }

    } catch (error) {
      console.error('❌ Erreur nettoyage screenshots:', error);
    }
  }
}

// Instance singleton
export const screenshotGeneratorService = new ScreenshotGeneratorService();

// Nettoyage automatique à l'arrêt du process
process.on('SIGINT', async () => {
  await screenshotGeneratorService.cleanup();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await screenshotGeneratorService.cleanup();
  process.exit(0);
});

export default ScreenshotGeneratorService;