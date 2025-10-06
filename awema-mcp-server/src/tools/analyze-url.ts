import puppeteer from 'puppeteer';
import { extractColors } from '../services/color-extractor.js';
import { analyzeWithVision } from '../services/vision-api.js';
import { DesignAnalysis, WebsiteAnalysisParams } from '../types/analysis.js';

export async function analyzeWebsite(params: WebsiteAnalysisParams): Promise<DesignAnalysis> {
  const {
    url,
    elements = ['hero', 'services', 'features'],
    extractColors: shouldExtractColors = true,
    extractFonts: shouldExtractFonts = true,
    extractLayouts: shouldExtractLayouts = true,
  } = params;

  console.log(`Analyzing website: ${url}`);

  // Launch browser and take screenshot
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Take full page screenshot
    const screenshotBuffer = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    // Extract specific elements if requested
    const elementScreenshots: Record<string, Buffer> = {};
    for (const element of elements) {
      const selector = getElementSelector(element);
      const elementHandle = await page.$(selector);
      
      if (elementHandle) {
        const screenshot = await elementHandle.screenshot({ type: 'png' });
        elementScreenshots[element] = screenshot;
      }
    }

    // Extract CSS information
    const styles = await page.evaluate(() => {
      const computedStyles = window.getComputedStyle(document.body);
      const rootStyles = window.getComputedStyle(document.documentElement);
      
      return {
        fonts: {
          primary: computedStyles.fontFamily,
          size: computedStyles.fontSize,
          lineHeight: computedStyles.lineHeight,
        },
        colors: {
          background: computedStyles.backgroundColor,
          text: computedStyles.color,
          primary: rootStyles.getPropertyValue('--primary-color') || '',
          secondary: rootStyles.getPropertyValue('--secondary-color') || '',
        },
      };
    });

    // Analyze with Vision API
    const visionAnalysis = await analyzeWithVision(screenshotBuffer, {
      analyzeLayout: shouldExtractLayouts,
      analyzeColors: shouldExtractColors,
      analyzeTypography: shouldExtractFonts,
    });

    // Extract color palette from screenshot
    let colorPalette = null;
    if (shouldExtractColors) {
      colorPalette = await extractColors(screenshotBuffer);
    }

    // Combine all analysis results
    const analysis: DesignAnalysis = {
      url,
      timestamp: new Date().toISOString(),
      elements: {},
      styles: {
        ...styles,
        colorPalette,
      },
      visionAnalysis,
      recommendations: generateRecommendations(visionAnalysis, styles),
    };

    // Add element-specific analysis
    for (const [element, screenshot] of Object.entries(elementScreenshots)) {
      const elementAnalysis = await analyzeWithVision(screenshot, {
        elementType: element,
      });
      analysis.elements[element] = elementAnalysis;
    }

    return analysis;
  } finally {
    await browser.close();
  }
}

function getElementSelector(element: string): string {
  const selectors: Record<string, string> = {
    header: 'header, nav, .header, .navbar, #header',
    hero: '.hero, .banner, .jumbotron, section:first-of-type, main > section:first-child',
    services: '.services, #services, section:has(h2:contains("Services"))',
    features: '.features, #features, section:has(h2:contains("Features"))',
    gallery: '.gallery, #gallery, .portfolio, section:has(h2:contains("Gallery"))',
    testimonials: '.testimonials, #testimonials, section:has(h2:contains("Testimonials"))',
    pricing: '.pricing, #pricing, section:has(h2:contains("Pricing"))',
    contact: '.contact, #contact, section:has(h2:contains("Contact"))',
    footer: 'footer, .footer, #footer',
  };

  return selectors[element] || element;
}

function generateRecommendations(visionAnalysis: any, styles: any): string[] {
  const recommendations: string[] = [];

  // Analyze and provide recommendations based on the analysis
  if (visionAnalysis.layout?.type === 'grid') {
    recommendations.push('Consider using grid-based layouts for better structure');
  }

  if (visionAnalysis.colors?.contrast < 4.5) {
    recommendations.push('Improve color contrast for better accessibility');
  }

  if (!styles.fonts.primary.includes('system')) {
    recommendations.push('Consider using system fonts for faster loading');
  }

  return recommendations;
}