import { chromium, Browser, Page, BrowserContext } from 'playwright';
import sharp from 'sharp';
import { PERFORMANCE_CONFIG } from '../config/performance.config.js';

export class ScreenshotService {
  private browser: Browser | null = null;

  async initialize() {
    this.browser = await chromium.launch({
      headless: true,
      args: [
        '--disable-blink-features=AutomationControlled',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--disable-web-security',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
      ],
    });
  }

  async captureWebsite(url: string, options: CaptureOptions = {}): Promise<CaptureResult> {
    if (!this.browser) await this.initialize();

    const context = await this.browser!.newContext({
      viewport: { width: 1920, height: 1080 },
      deviceScaleFactor: 2, // Retina quality
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    });

    const page = await context.newPage();

    try {
      // Bloquer les ressources inutiles pour accélérer
      await page.route('**/*.{gif,svg,ico}', route => route.abort());
      
      // Navigation avec timeout généreux
      await page.goto(url, {
        waitUntil: 'networkidle',
        timeout: 30000,
      });

      // Attendre que le contenu principal soit chargé
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(2000); // Laisser les animations se terminer

      // Capturer les métriques de performance
      const metrics = await this.capturePerformanceMetrics(page);

      // Screenshots haute qualité
      const screenshots: ScreenshotData = {
        fullPage: await this.captureFullPage(page),
        viewport: await this.captureViewport(page),
        mobile: await this.captureMobile(page),
        elements: {},
      };

      // Capturer les éléments spécifiques
      const elements = options.elements || ['header', 'hero', 'services', 'features'];
      for (const element of elements) {
        const screenshot = await this.captureElement(page, element);
        if (screenshot) {
          screenshots.elements[element] = screenshot;
        }
      }

      // Extraire les styles
      const styles = await this.extractStyles(page);

      // Analyser l'accessibilité
      const accessibility = await this.analyzeAccessibility(page);

      await context.close();

      return {
        url,
        screenshots,
        metrics,
        styles,
        accessibility,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      await context.close();
      throw error;
    }
  }

  private async captureFullPage(page: Page): Promise<Buffer> {
    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    // Optimiser avec Sharp
    return sharp(screenshot)
      .resize(3840, null, { // 4K width, hauteur proportionnelle
        withoutEnlargement: true,
        fit: 'inside',
      })
      .png({ quality: 95, compressionLevel: 9 })
      .toBuffer();
  }

  private async captureViewport(page: Page): Promise<Buffer> {
    const screenshot = await page.screenshot({
      fullPage: false,
      type: 'png',
    });

    return sharp(screenshot)
      .resize(1920, 1080, {
        fit: 'cover',
        position: 'top',
      })
      .png({ quality: 95 })
      .toBuffer();
  }

  private async captureMobile(page: Page): Promise<Buffer> {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
    const screenshot = await page.screenshot({
      fullPage: false,
      type: 'png',
    });
    await page.setViewportSize({ width: 1920, height: 1080 }); // Reset

    return sharp(screenshot)
      .png({ quality: 95 })
      .toBuffer();
  }

  private async captureElement(page: Page, selector: string): Promise<Buffer | null> {
    const selectors = this.getElementSelectors(selector);
    
    for (const sel of selectors) {
      try {
        const element = await page.$(sel);
        if (element) {
          const screenshot = await element.screenshot({ type: 'png' });
          return sharp(screenshot)
            .png({ quality: 95 })
            .toBuffer();
        }
      } catch (e) {
        continue;
      }
    }
    
    return null;
  }

  private getElementSelectors(element: string): string[] {
    const selectors: Record<string, string[]> = {
      header: ['header', 'nav', '.header', '.navbar', '#header', '[role="banner"]'],
      hero: ['.hero', '.banner', '.jumbotron', 'section:first-of-type', '[class*="hero"]', '[class*="banner"]'],
      services: ['.services', '#services', '[class*="service"]', 'section:has(h2:text-matches("service", "i"))'],
      features: ['.features', '#features', '[class*="feature"]', 'section:has(h2:text-matches("feature", "i"))'],
      pricing: ['.pricing', '#pricing', '[class*="pricing"]', '[class*="price"]'],
      testimonials: ['.testimonials', '#testimonials', '[class*="testimonial"]', '[class*="review"]'],
      contact: ['.contact', '#contact', '[class*="contact"]', 'section:has(form)'],
      footer: ['footer', '.footer', '#footer', '[role="contentinfo"]'],
    };

    return selectors[element] || [element];
  }

  private async capturePerformanceMetrics(page: Page): Promise<PerformanceMetrics> {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        FCP: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        LCP: 0, // Would need PerformanceObserver
        CLS: 0, // Would need PerformanceObserver
        FID: 0, // Would need user interaction
        TTFB: navigation.responseStart - navigation.requestStart,
        DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        LoadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      };
    });

    return metrics;
  }

  private async extractStyles(page: Page): Promise<ExtractedStyles> {
    return page.evaluate(() => {
      const computed = window.getComputedStyle(document.body);
      const root = window.getComputedStyle(document.documentElement);
      
      // Extraire toutes les couleurs utilisées
      const colors = new Set<string>();
      document.querySelectorAll('*').forEach(el => {
        const styles = window.getComputedStyle(el);
        colors.add(styles.color);
        colors.add(styles.backgroundColor);
        colors.add(styles.borderColor);
      });

      // Extraire les fonts
      const fonts = new Set<string>();
      document.querySelectorAll('*').forEach(el => {
        const fontFamily = window.getComputedStyle(el).fontFamily;
        if (fontFamily) fonts.add(fontFamily);
      });

      return {
        colors: {
          primary: root.getPropertyValue('--primary-color') || computed.color,
          secondary: root.getPropertyValue('--secondary-color') || '',
          background: computed.backgroundColor,
          text: computed.color,
          all: Array.from(colors).filter(c => c && c !== 'rgba(0, 0, 0, 0)'),
        },
        typography: {
          fonts: Array.from(fonts),
          baseFontSize: computed.fontSize,
          lineHeight: computed.lineHeight,
        },
        spacing: {
          unit: parseInt(computed.paddingTop) || 16,
        },
      };
    });
  }

  private async analyzeAccessibility(page: Page): Promise<AccessibilityReport> {
    const report = await page.evaluate(() => {
      // Analyser les contrastes
      const contrastIssues: any[] = [];
      document.querySelectorAll('*').forEach(el => {
        const styles = window.getComputedStyle(el);
        if (styles.color && styles.backgroundColor) {
          // Simplified contrast check (would need color library in real implementation)
          const contrast = 7.0; // Placeholder
          if (contrast < 7.0) {
            contrastIssues.push({
              element: el.tagName,
              foreground: styles.color,
              background: styles.backgroundColor,
              ratio: contrast,
            });
          }
        }
      });

      return {
        contrastIssues,
        missingAltTexts: document.querySelectorAll('img:not([alt])').length,
        headingStructure: Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6')).map(h => h.tagName),
      };
    });

    return report;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

// Types
interface CaptureOptions {
  elements?: string[];
  waitForAnimations?: boolean;
  blockAds?: boolean;
}

interface ScreenshotData {
  fullPage: Buffer;
  viewport: Buffer;
  mobile: Buffer;
  elements: Record<string, Buffer>;
}

interface PerformanceMetrics {
  FCP: number;
  LCP: number;
  CLS: number;
  FID: number;
  TTFB: number;
  DOMContentLoaded: number;
  LoadComplete: number;
}

interface ExtractedStyles {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    all: string[];
  };
  typography: {
    fonts: string[];
    baseFontSize: string;
    lineHeight: string;
  };
  spacing: {
    unit: number;
  };
}

interface AccessibilityReport {
  contrastIssues: any[];
  missingAltTexts: number;
  headingStructure: string[];
}

interface CaptureResult {
  url: string;
  screenshots: ScreenshotData;
  metrics: PerformanceMetrics;
  styles: ExtractedStyles;
  accessibility: AccessibilityReport;
  timestamp: string;
}