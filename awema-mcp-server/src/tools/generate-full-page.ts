/**
 * Générateur de PAGE COMPLÈTE depuis URL
 * 1 URL = 1 site complet avec tous les blocs
 */

import { ScreenshotService } from '../services/screenshot-service.js';
import { OfflineAnalyzer } from '../services/offline-analyzer.js';
import { BlockGeneratorUltra } from '../services/block-generator-ultra.js';
import { PageAssembler } from '../services/page-assembler.js';

export async function generateFullPage(params: {
  url: string;
  style?: 'corporate' | 'modern' | 'creative';
  businessInfo?: any;
}): Promise<GeneratedPage> {
  const { url, style = 'corporate', businessInfo = {} } = params;
  
  console.log(`🚀 Génération page complète depuis: ${url}`);
  
  // 1. Screenshot et analyse du site
  const screenshotService = new ScreenshotService();
  const analyzer = new OfflineAnalyzer();
  const generator = new BlockGeneratorUltra();
  const assembler = new PageAssembler();
  
  try {
    // Capturer le site complet avec tous les éléments
    const capture = await screenshotService.captureWebsite(url, {
      elements: [
        'header',
        'hero',
        'services',
        'features',
        'gallery',
        'testimonials',
        'pricing',
        'faq',
        'cta',
        'contact',
        'footer'
      ],
      waitForAnimations: true,
    });
    
    console.log('📸 Screenshots capturés');
    
    // 2. Analyser chaque élément détecté
    const blocks: GeneratedBlock[] = [];
    const detectedElements = Object.keys(capture.screenshots.elements);
    
    console.log(`🔍 Éléments détectés: ${detectedElements.join(', ')}`);
    
    // Analyser le style global depuis le screenshot principal
    const globalAnalysis = await analyzer.analyzeImage(capture.screenshots.fullPage);
    
    // 3. Générer un bloc pour chaque élément détecté
    for (const element of detectedElements) {
      console.log(`⚙️ Génération du bloc: ${element}`);
      
      const elementScreenshot = capture.screenshots.elements[element];
      if (!elementScreenshot) continue;
      
      // Analyser l'élément spécifique
      const elementAnalysis = await analyzer.analyzeImage(elementScreenshot);
      
      // Fusionner avec l'analyse globale pour cohérence
      const mergedAnalysis = {
        ...elementAnalysis,
        colors: globalAnalysis.colors, // Garder la palette globale
        style: globalAnalysis.style,    // Style cohérent
      };
      
      // Générer le bloc optimisé
      const block = await generator.generateFromAnalysis(
        mergedAnalysis,
        element,
        { targetPageSpeed: 95 }
      );
      
      // Enrichir avec les données business si disponibles
      const enrichedBlock = enrichBlockWithBusinessData(block, element, businessInfo);
      
      blocks.push(enrichedBlock);
    }
    
    // 4. Détecter les blocs manquants et les ajouter
    const requiredBlocks = ['header', 'hero', 'services', 'contact', 'footer'];
    const existingTypes = blocks.map(b => b.type);
    
    for (const required of requiredBlocks) {
      if (!existingTypes.includes(required)) {
        console.log(`➕ Ajout du bloc manquant: ${required}`);
        
        // Générer un bloc par défaut avec le style détecté
        const defaultBlock = await generator.generateFromAnalysis(
          globalAnalysis,
          required,
          { targetPageSpeed: 95 }
        );
        
        blocks.push(enrichBlockWithBusinessData(defaultBlock, required, businessInfo));
      }
    }
    
    // 5. Assembler la page complète
    const page = await assembler.assemblePage(blocks, {
      style: globalAnalysis.style.style,
      colors: globalAnalysis.colors.harmoniousPalette,
      performance: true,
    });
    
    // 6. Optimiser la page complète
    const optimizedPage = await optimizeFullPage(page);
    
    // Nettoyer
    await screenshotService.close();
    
    console.log(`✅ Page générée avec ${blocks.length} blocs`);
    
    return {
      url,
      timestamp: new Date().toISOString(),
      blocks,
      page: optimizedPage,
      analysis: {
        style: globalAnalysis.style,
        colors: globalAnalysis.colors,
        performance: {
          estimatedPageSpeed: calculatePageSpeed(blocks),
          totalSize: optimizedPage.html.length + optimizedPage.css.length,
        },
      },
    };
    
  } catch (error) {
    await screenshotService.close();
    throw error;
  }
}

/**
 * Enrichit un bloc avec les données business
 */
function enrichBlockWithBusinessData(
  block: GeneratedBlock,
  type: string,
  businessInfo: any
): GeneratedBlock {
  const enrichments: Record<string, any> = {
    header: {
      logo: businessInfo.businessName || 'LOGO',
      phone: businessInfo.phone,
      email: businessInfo.email,
    },
    hero: {
      title: businessInfo.headline || 'Excellence & Innovation',
      subtitle: businessInfo.tagline || 'Solutions professionnelles sur mesure',
    },
    services: {
      title: 'Nos Services',
      services: businessInfo.services || [],
    },
    contact: {
      businessName: businessInfo.businessName,
      phone: businessInfo.phone,
      email: businessInfo.email,
      address: businessInfo.address,
    },
    footer: {
      companyName: businessInfo.businessName,
      year: new Date().getFullYear(),
    },
  };
  
  // Injecter les données dans le HTML
  if (enrichments[type]) {
    block.html = injectDataIntoHTML(block.html, enrichments[type]);
  }
  
  return block;
}

/**
 * Injecte les données dans le HTML
 */
function injectDataIntoHTML(html: string, data: any): string {
  let enrichedHTML = html;
  
  // Remplacer les placeholders
  Object.entries(data).forEach(([key, value]) => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    enrichedHTML = enrichedHTML.replace(regex, String(value));
  });
  
  return enrichedHTML;
}

/**
 * Optimise la page complète pour PageSpeed 95+
 */
async function optimizeFullPage(page: AssembledPage): Promise<AssembledPage> {
  // 1. Extraire et inline le CSS critique
  const criticalCSS = extractCriticalCSS(page.css);
  
  // 2. Optimiser les images
  const optimizedHTML = page.html
    .replace(/<img([^>]+)>/g, (match, attrs) => {
      // Ajouter loading="lazy" sauf pour les images above-the-fold
      if (!attrs.includes('loading=')) {
        const isAboveFold = attrs.includes('hero') || attrs.includes('header');
        return `<img${attrs} loading="${isAboveFold ? 'eager' : 'lazy'}" decoding="async">`;
      }
      return match;
    })
    // Convertir en picture avec formats modernes
    .replace(/<img([^>]+src="([^"]+\.(?:jpg|png))")([^>]*)>/g, (match, before, src, after) => {
      const name = src.replace(/\.(jpg|png)$/, '');
      return `<picture>
        <source srcset="${name}.avif" type="image/avif">
        <source srcset="${name}.webp" type="image/webp">
        <img${before}${after}>
      </picture>`;
    });
  
  // 3. Minifier HTML/CSS
  const minifiedHTML = optimizedHTML
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
    
  const minifiedCSS = page.css
    .replace(/\s+/g, ' ')
    .replace(/:\s+/g, ':')
    .replace(/;\s+/g, ';')
    .trim();
  
  // 4. Ajouter les meta performance
  const performanceHTML = minifiedHTML.replace(
    '</head>',
    `<style>${criticalCSS}</style>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="dns-prefetch" href="https://cdn.jsdelivr.net">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    </head>`
  );
  
  return {
    html: performanceHTML,
    css: minifiedCSS,
    js: page.js || '',
  };
}

/**
 * Extrait le CSS critique (above-the-fold)
 */
function extractCriticalCSS(css: string): string {
  // Garder seulement les règles pour header, hero et structure de base
  const criticalSelectors = [
    ':root',
    'body',
    'html',
    '.header',
    '.hero',
    '.container',
    '.btn',
    'h1', 'h2', 'h3',
    '@media'
  ];
  
  const lines = css.split('\n');
  const critical: string[] = [];
  let inCriticalRule = false;
  
  lines.forEach(line => {
    if (criticalSelectors.some(sel => line.includes(sel))) {
      inCriticalRule = true;
    }
    if (inCriticalRule) {
      critical.push(line);
    }
    if (line.includes('}') && inCriticalRule) {
      inCriticalRule = false;
    }
  });
  
  return critical.join('').replace(/\s+/g, ' ');
}

/**
 * Calcule le PageSpeed estimé
 */
function calculatePageSpeed(blocks: GeneratedBlock[]): number {
  const totalCSS = blocks.reduce((sum, block) => sum + block.css.length, 0);
  const totalHTML = blocks.reduce((sum, block) => sum + block.html.length, 0);
  
  let score = 100;
  
  // Pénalités selon la taille
  if (totalCSS > 50000) score -= 5;
  if (totalCSS > 100000) score -= 10;
  if (totalHTML > 30000) score -= 3;
  if (totalHTML > 50000) score -= 7;
  
  // Bonus pour optimisations
  const hasLazyLoad = blocks.some(b => b.html.includes('loading="lazy"'));
  const hasPicture = blocks.some(b => b.html.includes('<picture>'));
  
  if (hasLazyLoad) score += 2;
  if (hasPicture) score += 3;
  
  return Math.max(85, Math.min(100, score));
}

// Types
interface GeneratedBlock {
  type: string;
  variant: string;
  html: string;
  css: string;
  js?: string;
  performance?: any;
}

interface AssembledPage {
  html: string;
  css: string;
  js?: string;
}

interface GeneratedPage {
  url: string;
  timestamp: string;
  blocks: GeneratedBlock[];
  page: AssembledPage;
  analysis: {
    style: any;
    colors: any;
    performance: {
      estimatedPageSpeed: number;
      totalSize: number;
    };
  };
}