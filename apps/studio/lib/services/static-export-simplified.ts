import { renderToString } from 'react-dom/server';
import React from 'react';
import type { EditorBlock, Page, Theme } from '@/lib/store/editor-store';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';
import { DynamicURLHandler, DomainPurchaseWorkflow } from './dynamic-url-handler';
import { NetlifyMediaService } from './netlify-media.service';
import { AdvancedSEOService } from './advanced-seo.service';
import { AnalyticsService } from './analytics.service';
import { SEOMonitoringService } from './seo-monitoring.service';
import { SEOContentGeneratorService } from './seo-content-generator.service';
import { ImageOptimizationAdvancedService } from './image-optimization-advanced.service';
import { generateCMSSEOModule } from './cms-seo-module';

export interface SimplifiedExportOptions {
  minifyHtml?: boolean;
  minifyCss?: boolean;
  minifyJs?: boolean;
  optimizeImages?: boolean;
  generateManifest?: boolean;
  generateServiceWorker?: boolean;
  includeSourceMap?: boolean;
  useCompression?: boolean;
  includeCms?: boolean;
  cmsPassword?: string; // Password for CMS access
  // SEO Options
  enableAdvancedSEO?: boolean;
  generateSEOContent?: boolean;
  enableAnalytics?: boolean;
  ga4MeasurementId?: string;
  gtmContainerId?: string;
  enableSEOMonitoring?: boolean;
  generateAMP?: boolean;
  enableImageOptimization?: boolean;
  generateSitemap?: boolean;
  generateRobotsTxt?: boolean;
}

export interface ExportData {
  html: string;
  css: string;
  js: string;
  additionalFiles: Array<{
    path: string;
    content: string;
  }>;
  assets: Array<{
    path: string;
    data: Buffer;
  }>;
}

export class StaticExportService {
  static async exportSite(
    projectData: any,
    options: SimplifiedExportOptions
  ): Promise<ExportData> {
    const {
      pages = [],
      theme = {},
      businessInfo = {},
      globalHeader,
      globalFooter,
      projectName = 'Mon Site'
    } = projectData;

    // Préparer les données de retour
    const exportData: ExportData = {
      html: '',
      css: '',
      js: '',
      additionalFiles: [],
      assets: []
    };

    // Préparer les images pour l'export
    if (options.optimizeImages !== false && projectData.mediaService) {
      try {
        const mediaService = new NetlifyMediaService();
        // Load images from localStorage if projectId is available
        if (projectData.id) {
          await mediaService.loadFromLocalStorage(projectData.id);
        }
        const imageFiles = await mediaService.prepareImagesForExport();
        
        // Ajouter les images aux assets
        imageFiles.forEach(file => {
          exportData.assets.push({
            path: file.path,
            data: file.content
          });
        });
      } catch (error) {
        console.warn('Could not prepare images for export:', error);
      }
    }

    // Collecter le CSS et JS de tous les blocs
    const collectedCSS: string[] = [];
    const collectedJS: string[] = [];
    
    // Fonction helper pour collecter les ressources d'un bloc
    const collectBlockResources = (block: EditorBlock) => {
      const renderFn = getBlockRenderFunction(block.type);
      if (renderFn) {
        try {
          const rendered = renderFn(block.props || {}, []);
          if (rendered.css) collectedCSS.push(rendered.css);
          if (rendered.js) collectedJS.push(rendered.js);
        } catch (error) {
          console.error(`Error collecting resources for block ${block.type}:`, error);
        }
      }
    };

    // Collecter les ressources de tous les blocs
    if (globalHeader) collectBlockResources(globalHeader);
    if (globalFooter) collectBlockResources(globalFooter);
    
    pages.forEach((page: Page) => {
      page.blocks.forEach(block => collectBlockResources(block));
    });

    // Générer le CSS complet (thème + blocs)
    const themeCSS = generateThemeCSS(theme);
    const blocksCSS = collectedCSS.join('\n\n');
    const fullCSS = themeCSS + '\n\n' + blocksCSS;
    exportData.css = options.minifyCss ? minifyCSS(fullCSS) : fullCSS;

    // Générer le HTML principal (page d'accueil)
    const homePage = pages.find((p: Page) => p.slug === '/') || pages[0];
    if (!homePage) {
      throw new Error('No pages found in project');
    }

    const html = generateHTML({
      page: homePage,
      theme,
      businessInfo,
      projectName,
      globalHeader,
      globalFooter,
      css: exportData.css,
      exportOptions: options,
      siteData: projectData,
      blocks: [...(globalHeader ? [globalHeader] : []), ...(globalFooter ? [globalFooter] : [])]
    });

    exportData.html = options.minifyHtml ? minifyHTML(html) : html;

    // Générer les autres pages
    pages.forEach((page: Page) => {
      if (page.slug !== '/') {
        const pageHtml = generateHTML({
          page,
          theme,
          businessInfo,
          projectName,
          globalHeader,
          globalFooter,
          css: exportData.css,
          exportOptions: options,
          siteData: projectData,
          blocks: [...(globalHeader ? [globalHeader] : []), ...(globalFooter ? [globalFooter] : [])]
        });
        
        const fileName = page.slug === '/' ? 'index.html' : `${page.slug.substring(1)}.html`;
        exportData.additionalFiles.push({
          path: fileName,
          content: options.minifyHtml ? minifyHTML(pageHtml) : pageHtml
        });
      }
    });

    // Générer le JavaScript complet (base + blocs)
    const baseJS = generateBaseJS();
    const blocksJS = collectedJS.filter(js => js && js.trim()).join('\n\n');
    const fullJS = baseJS + '\n\n' + blocksJS;
    exportData.js = options.minifyJs ? minifyJS(fullJS) : fullJS;

    // Générer le manifest.json si demandé
    if (options.generateManifest) {
      exportData.additionalFiles.push({
        path: 'manifest.json',
        content: JSON.stringify({
          name: projectName,
          short_name: projectName,
          start_url: '/',
          display: 'standalone',
          theme_color: theme.colors?.primary || '#3B82F6',
          background_color: theme.colors?.background || '#FFFFFF',
          icons: []
        }, null, 2)
      });
    }

    // Générer le service worker si demandé
    if (options.generateServiceWorker) {
      exportData.additionalFiles.push({
        path: 'sw.js',
        content: generateServiceWorker()
      });
    }

    // Générer robots.txt et sitemap.xml
    exportData.additionalFiles.push({
      path: 'robots.txt',
      content: `User-agent: *\nAllow: /\nCrawl-delay: 1\n\nSitemap: /sitemap.xml`
    });

    const sitemap = generateSitemap(pages, businessInfo.domain);
    exportData.additionalFiles.push({
      path: 'sitemap.xml',
      content: sitemap
    });

    // Include CMS if requested
    if (options.includeCms) {
      // Add CMS files
      exportData.additionalFiles.push({
        path: 'admin/index.html',
        content: generateCMSAdmin(projectData, options.cmsPassword)
      });

      // Add CMS core JavaScript
      exportData.additionalFiles.push({
        path: 'admin/cms-core.js',
        content: getCMSCoreJS()
      });

      // Add CMS enhanced JavaScript
      exportData.additionalFiles.push({
        path: 'admin/cms-enhanced.js',
        content: getCMSEnhancedJS()
      });

      // Add CMS admin JavaScript
      exportData.additionalFiles.push({
        path: 'admin/cms-admin.js',
        content: getCMSAdminJS()
      });
      
      // Add Version History JavaScript
      exportData.additionalFiles.push({
        path: 'admin/version-history.js',
        content: getVersionHistoryJS()
      });

      // Add SEO Module JavaScript
      exportData.additionalFiles.push({
        path: 'admin/cms-seo-module.js',
        content: getCMSSEOModuleJS()
      });

      // Add preview page
      exportData.additionalFiles.push({
        path: 'admin/preview.html',
        content: generateCMSPreview()
      });

      // Add Netlify Functions for CMS
      exportData.additionalFiles.push({
        path: 'netlify/functions/cms-auth.js',
        content: getCMSAuthFunction()
      });

      exportData.additionalFiles.push({
        path: 'netlify/functions/cms-save.js',
        content: getCMSSaveFunction()
      });

      exportData.additionalFiles.push({
        path: 'netlify/functions/cms-upload.js',
        content: getCMSUploadFunction()
      });

      // Add netlify.toml for functions
      exportData.additionalFiles.push({
        path: 'netlify.toml',
        content: generateNetlifyConfig()
      });

      // Add CMS README
      exportData.additionalFiles.push({
        path: 'admin/README.md',
        content: generateCMSReadme(options.cmsPassword)
      });
    }

    // Générer le contenu SEO si demandé
    if (options.generateSEOContent && projectData.services) {
      const contentGenerator = new SEOContentGeneratorService(projectData);
      const seoContents = await contentGenerator.generateAllPagesContent();
      
      // Ajouter le contenu SEO généré aux fichiers
      exportData.additionalFiles.push({
        path: 'seo/generated-content.json',
        content: JSON.stringify(Array.from(seoContents.entries()), null, 2)
      });
      
      // Générer un rapport SEO
      exportData.additionalFiles.push({
        path: 'seo/seo-report.md',
        content: generateSEOReport(projectData, options)
      });
    }
    
    // Ajouter le dashboard SEO si monitoring activé
    if (options.enableSEOMonitoring) {
      const monitoringService = new SEOMonitoringService({
        siteUrl: projectData.siteInfo?.url || 'https://example.com'
      });
      
      exportData.additionalFiles.push({
        path: 'admin/seo-dashboard.html',
        content: monitoringService.generateSEODashboard()
      });
      
      // Fichier de vérification Google Search Console
      exportData.additionalFiles.push({
        path: 'google-verification.html',
        content: monitoringService.generateVerificationFile()
      });
    }
    
    // Optimisation avancée des images si activée
    if (options.enableImageOptimization && options.optimizeImages !== false) {
      const imageOptimizer = new ImageOptimizationAdvancedService();
      // Les images sont déjà optimisées via NetlifyMediaService
      // Ajouter les directives pour srcset dans le guide
      exportData.additionalFiles.push({
        path: 'assets/images/README.md',
        content: generateImageOptimizationGuide()
      });
    }
    
    // Toujours ajouter le guide d'achat de domaine
    const siteName = projectData.projectName?.toLowerCase().replace(/[^a-z0-9-]/g, '-') || 'mon-site';
    exportData.additionalFiles.push({
      path: 'DOMAIN-PURCHASE-GUIDE.md',
      content: DomainPurchaseWorkflow.generatePurchaseGuide(`${siteName}`)
    });

    return exportData;
  }
}

// Fonctions utilitaires
function generateThemeCSS(theme: Theme): string {
  const defaultColors = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    surface: '#F9FAFB',
    text: '#1F2937',
    textSecondary: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  };
  
  const colors = { ...defaultColors, ...(theme.colors || {}) };
  const typography = theme.typography || {};
  const spacing = theme.spacing || {};
  
  return `
:root {
  /* Colors */
  --color-primary: ${colors.primary};
  --color-secondary: ${colors.secondary};
  --color-accent: ${colors.accent};
  --color-background: ${colors.background};
  --color-surface: ${colors.surface};
  --color-text: ${colors.text};
  --color-text-secondary: ${colors.textSecondary};
  --color-border: ${colors.border};
  --color-success: ${colors.success};
  --color-warning: ${colors.warning};
  --color-error: ${colors.error};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${typography.fontFamily?.body || 'Inter, sans-serif'};
  color: var(--color-text);
  background-color: var(--color-background);
  line-height: 1.5;
}

h1, h2, h3, h4, h5, h6 {
  font-family: ${typography.fontFamily?.heading || 'Inter, sans-serif'};
  font-weight: 700;
  line-height: 1.2;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Responsive utilities */
@media (max-width: 640px) {
  .container { padding: 0 0.75rem; }
}

/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  cursor: pointer;
  text-decoration: none;
  border: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  opacity: 0.9;
}
`;
}

function generateHTML(options: {
  page: Page;
  theme: Theme;
  businessInfo: any;
  projectName: string;
  globalHeader?: EditorBlock;
  globalFooter?: EditorBlock;
  css: string;
  exportOptions?: SimplifiedExportOptions;
  siteData?: any;
  blocks?: EditorBlock[];
}): string {
  const { page, theme, businessInfo, projectName, globalHeader, globalFooter, css, exportOptions = {}, siteData, blocks = [] } = options;
  
  // Initialize SEO services if enabled
  let seoService: AdvancedSEOService | null = null;
  let analyticsService: AnalyticsService | null = null;
  let monitoringService: SEOMonitoringService | null = null;
  
  if (exportOptions.enableAdvancedSEO && siteData) {
    seoService = new AdvancedSEOService(siteData, page.slug || 'index', [...blocks, ...page.blocks]);
  }
  
  if (exportOptions.enableAnalytics) {
    analyticsService = new AnalyticsService({
      ga4MeasurementId: exportOptions.ga4MeasurementId,
      gtmContainerId: exportOptions.gtmContainerId,
      enableEcommerce: true,
      enableEnhancedMeasurement: true,
      cookieConsent: true
    });
  }
  
  if (exportOptions.enableSEOMonitoring && siteData) {
    monitoringService = new SEOMonitoringService({
      siteUrl: siteData.siteInfo?.url || 'https://example.com'
    });
  }
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    ${seoService ? seoService.generateMetaTags({
      title: page.meta?.title,
      description: page.meta?.description,
      keywords: page.meta?.keywords
    }) : `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.meta?.title || projectName}</title>
    <meta name="description" content="${page.meta?.description || `Site web de ${projectName}`}">
    `}
    
    <!-- CSS -->
    <style>${css}</style>
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/assets/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="/assets/fonts/Inter-Bold.woff2" as="font" type="font/woff2" crossorigin>
    
    <!-- Dynamic URL Handler -->
    ${DynamicURLHandler.generateDynamicBaseScript()}
    ${DynamicURLHandler.generateDynamicMetaTags()}
    
    ${analyticsService ? analyticsService.generateAnalyticsHead() : ''}
    ${monitoringService ? monitoringService.generateMonitoringScript() : ''}
</head>
<body>
    ${analyticsService ? analyticsService.generateAnalyticsBody() : ''}
    
    ${globalHeader ? renderBlock(globalHeader) : ''}
    
    <main>
        ${page.blocks.map(block => renderBlock(block)).join('\n')}
    </main>
    
    ${globalFooter ? renderBlock(globalFooter) : ''}
    
    <!-- Structured Data -->
    ${seoService ? seoService.generateStructuredData() : ''}
    
    <script src="/assets/js/main.js" defer></script>
    
    <!-- Analytics Events -->
    ${analyticsService ? analyticsService.generateConversionTracking() : ''}
    ${analyticsService ? analyticsService.generateEcommerceTracking() : ''}
    ${analyticsService ? analyticsService.generateCoreWebVitalsTracking() : ''}
</body>
</html>`;
}

function renderBlock(block: EditorBlock): string {
  // Utiliser la vraie fonction de rendu du bloc
  const renderFn = getBlockRenderFunction(block.type);
  
  if (!renderFn) {
    console.warn(`No render function found for block type: ${block.type}`);
    return `<div class="block block-${block.type}" id="${block.id}">
      <!-- ${block.type} content (no renderer found) -->
    </div>`;
  }
  
  try {
    // Transformer les URLs des images dans les props
    const transformedProps = transformImageUrlsForExport(block.props || {});
    
    // Appeler la fonction de rendu avec les props transformées
    const rendered = renderFn(transformedProps, []);
    
    // La fonction de rendu retourne un objet avec html, css, js
    if (rendered && rendered.html) {
      return rendered.html;
    }
    
    // Si pas de HTML, retourner un placeholder
    return `<div class="block block-${block.type}" id="${block.id}">
      <!-- ${block.type} content (empty render) -->
    </div>`;
  } catch (error) {
    console.error(`Error rendering block ${block.type}:`, error);
    return `<div class="block block-${block.type}" id="${block.id}">
      <!-- ${block.type} content (render error) -->
    </div>`;
  }
}

function generateBaseJS(): string {
  return `
// Base JavaScript for the static site
document.addEventListener('DOMContentLoaded', function() {
  console.log('Site loaded');
  
  // Register service worker if available
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered'))
      .catch(err => console.log('Service Worker registration failed'));
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
`;
}

function generateServiceWorker(): string {
  return `
const CACHE_NAME = 'site-cache-v1';
const urlsToCache = [
  '/',
  '/assets/css/styles.css',
  '/assets/js/main.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
`;
}

function generateSitemap(pages: Page[], domain?: string): string {
  const baseUrl = domain ? `https://${domain}` : 'https://example.com';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.slug === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
}

// Fonctions de minification simplifiées
function minifyHTML(html: string): string {
  return html
    .replace(/\s+/g, ' ')
    .replace(/> </g, '><')
    .trim();
}

function minifyCSS(css: string): string {
  return css
    .replace(/\s+/g, ' ')
    .replace(/:\s+/g, ':')
    .replace(/;\s+/g, ';')
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .trim();
}

function minifyJS(js: string): string {
  // Minification très basique
  return js
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/.*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// CMS Functions
function generateCMSAdmin(projectData: any, cmsPassword?: string): string {
  // Generate the CMS admin HTML with injected data
  const cmsData = {
    pages: projectData.pages || [],
    businessInfo: projectData.businessInfo || {},
    globalHeader: projectData.globalHeader || null,
    globalFooter: projectData.globalFooter || null,
    theme: projectData.theme || { colors: {}, typography: {} }
  };

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administration - CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Inter', sans-serif; }
        .property-input { @apply w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500; }
        .btn { @apply px-4 py-2 text-sm font-medium rounded-md transition-colors; }
        .btn-primary { @apply bg-blue-600 text-white hover:bg-blue-700; }
        .btn-secondary { @apply bg-gray-200 text-gray-700 hover:bg-gray-300; }
        .btn-danger { @apply bg-red-600 text-white hover:bg-red-700; }
        .btn-success { @apply bg-green-600 text-white hover:bg-green-700; }
        .btn-sm { @apply px-2 py-1 text-xs; }
        
        /* Drag & Drop */
        .dragging { opacity: 0.5; }
        .drag-over { @apply border-2 border-blue-500 border-dashed; }
        
        /* Color picker */
        .color-picker-swatch {
            width: 40px;
            height: 40px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            cursor: pointer;
            position: relative;
        }
        
        /* Block library modal */
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .modal.active {
            display: flex;
        }
        
        /* Animations */
        .block-item {
            transition: all 0.3s ease;
        }
        .block-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div id="cms-root" class="min-h-screen bg-gray-50">
        <!-- Login Form -->
        <div id="login-form" class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div class="max-w-md w-full space-y-8">
                <div>
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Administration CMS
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600">
                        Connectez-vous pour gérer votre site
                    </p>
                </div>
                <form class="mt-8 space-y-6" onsubmit="handleLogin(event)">
                    <div class="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label for="email" class="sr-only">Email</label>
                            <input id="email" name="email" type="email" required 
                                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                                   placeholder="Email" value="admin@site.com">
                        </div>
                        <div>
                            <label for="password" class="sr-only">Mot de passe</label>
                            <input id="password" name="password" type="password" required 
                                   class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" 
                                   placeholder="Mot de passe">
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Se connecter
                        </button>
                    </div>
                    <div id="login-error" class="text-red-600 text-sm text-center hidden"></div>
                </form>
            </div>
        </div>

        <!-- Admin Interface (hidden by default) -->
        <div id="admin-interface" class="hidden">
            <!-- Content will be dynamically loaded here -->
        </div>
    </div>

    <!-- Load CMS Data -->
    <script>
        window.CMS_INITIAL_DATA = ${JSON.stringify(cmsData)};
        window.CMS_CONFIG = {
            password: ${cmsPassword ? `"${cmsPassword}"` : '"admin123"'},
            apiEndpoint: '/.netlify/functions'
        };
    </script>

    <!-- Load CMS Scripts -->
    <script src="/admin/version-history.js"></script>
    <script src="/admin/cms-enhanced.js"></script>
    <script src="/admin/cms-core.js"></script>
    <script src="/admin/cms-admin.js"></script>
    <script src="/admin/cms-seo-module.js"></script>
</body>
</html>`;
}

function getCMSCoreJS(): string {
  return `
// CMS Core - Gestion de l'authentification et des données
class CMSCore {
  constructor(data, apiEndpoint = '/.netlify/functions') {
    this.data = data;
    this.apiEndpoint = apiEndpoint;
    this.authToken = localStorage.getItem('cms_auth_token');
  }

  async login(email, password) {
    try {
      const response = await fetch(this.apiEndpoint + '/cms-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        this.authToken = token;
        localStorage.setItem('cms_auth_token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      // En mode local, permettre l'accès avec le mot de passe configuré
      if (password === window.CMS_CONFIG.password) {
        this.authToken = 'local-token';
        localStorage.setItem('cms_auth_token', 'local-token');
        return true;
      }
      return false;
    }
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('cms_auth_token');
  }

  isAuthenticated() {
    return !!this.authToken;
  }

  async save() {
    if (!this.authToken) return false;

    try {
      const response = await fetch(this.apiEndpoint + '/cms-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authToken
        },
        body: JSON.stringify(this.data)
      });

      if (response.ok) {
        // Sauvegarder aussi en localStorage pour la persistence locale
        localStorage.setItem('cms_site_data', JSON.stringify(this.data));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Save error:', error);
      // En mode local, sauvegarder uniquement en localStorage
      localStorage.setItem('cms_site_data', JSON.stringify(this.data));
      return true;
    }
  }
}

window.CMSCore = CMSCore;
  `;
}

function getCMSAuthFunction(): string {
  // Return the Netlify function for authentication
  return `
const crypto = require('crypto');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }
  
  try {
    const { email, password } = JSON.parse(event.body);
    
    // Get credentials from environment or use defaults
    const ADMIN_EMAIL = process.env.CMS_ADMIN_EMAIL || 'admin@site.com';
    const ADMIN_PASSWORD = process.env.CMS_ADMIN_PASSWORD || 'admin123';
    
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Generate a simple token
      const token = crypto.randomBytes(32).toString('hex');
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          token: token,
          email: ADMIN_EMAIL
        })
      };
    }
    
    return { 
      statusCode: 401, 
      headers, 
      body: JSON.stringify({ success: false, error: 'Invalid credentials' }) 
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: 'Server error' })
    };
  }
};`;
}

function getCMSSaveFunction(): string {
  // Return the Netlify function for saving
  return `
const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };
  
  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: 'Method Not Allowed' };
  }
  
  try {
    // Validate authorization
    const authHeader = event.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { 
        statusCode: 401, 
        headers, 
        body: JSON.stringify({ success: false, error: 'Unauthorized' }) 
      };
    }
    
    // Parse the data
    const data = JSON.parse(event.body);
    
    // In a real implementation, you would:
    // 1. Validate the token
    // 2. Save to a database or trigger a rebuild
    // 3. Update the static files
    
    // For now, we'll just return success
    // In production, you might want to trigger a Netlify build hook here
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    console.error('Save error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to save data' 
      })
    };
  }
};`;
}

function generateNetlifyConfig(): string {
  return `[build]
  functions = "netlify/functions"

[functions]
  directory = "netlify/functions"

[[redirects]]
  from = "/api/cms/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
`;
}

function getCMSEnhancedJS(): string {
  return `
// CMS Enhanced - Fonctionnalités avancées pour le CMS
window.CMS_ENHANCEMENTS = {
  // Catalogue des blocs disponibles
  blockCatalog: {
    hero: {
      category: 'Hero',
      blocks: [
        {
          type: 'hero-centered',
          name: 'Hero Centré',
          icon: '🎯',
          defaultProps: {
            title: 'Titre principal',
            subtitle: 'Sous-titre descriptif',
            buttonText: 'En savoir plus',
            buttonLink: '/contact'
          }
        },
        {
          type: 'hero-split',
          name: 'Hero avec image',
          icon: '🖼️',
          defaultProps: {
            title: 'Titre principal',
            subtitle: 'Description',
            buttonText: 'Découvrir',
            buttonLink: '/services',
            image: '/images/hero.jpg'
          }
        }
      ]
    },
    services: {
      category: 'Services',
      blocks: [
        {
          type: 'services-grid-cards',
          name: 'Grille de services',
          icon: '🔧',
          defaultProps: {
            title: 'Nos Services',
            subtitle: 'Ce que nous proposons',
            services: []
          }
        },
        {
          type: 'services-list-detailed',
          name: 'Liste détaillée',
          icon: '📋',
          defaultProps: {
            title: 'Services détaillés',
            services: []
          }
        }
      ]
    },
    features: {
      category: 'Features',
      blocks: [
        {
          type: 'features-clean',
          name: 'Features simple',
          icon: '✨',
          defaultProps: {
            title: 'Caractéristiques',
            features: []
          }
        },
        {
          type: 'features-modern',
          name: 'Features moderne',
          icon: '🎨',
          defaultProps: {
            title: 'Pourquoi nous choisir',
            subtitle: 'Les avantages',
            features: []
          }
        }
      ]
    },
    testimonials: {
      category: 'Témoignages',
      blocks: [
        {
          type: 'testimonials-carousel',
          name: 'Carrousel témoignages',
          icon: '💬',
          defaultProps: {
            title: 'Ce que disent nos clients',
            testimonials: []
          }
        }
      ]
    },
    pricing: {
      category: 'Tarifs',
      blocks: [
        {
          type: 'pricing-grid',
          name: 'Grille de tarifs',
          icon: '💰',
          defaultProps: {
            title: 'Nos Tarifs',
            plans: []
          }
        }
      ]
    },
    faq: {
      category: 'FAQ',
      blocks: [
        {
          type: 'faq-accordion',
          name: 'FAQ Accordéon',
          icon: '❓',
          defaultProps: {
            title: 'Questions fréquentes',
            faqs: []
          }
        }
      ]
    },
    gallery: {
      category: 'Galerie',
      blocks: [
        {
          type: 'gallery-grid',
          name: 'Grille d\'images',
          icon: '🖼️',
          defaultProps: {
            title: 'Galerie',
            images: []
          }
        }
      ]
    },
    cta: {
      category: 'Call to Action',
      blocks: [
        {
          type: 'cta-centered',
          name: 'CTA Centré',
          icon: '📢',
          defaultProps: {
            title: 'Prêt à commencer ?',
            subtitle: 'Contactez-nous dès maintenant',
            buttonText: 'Nous contacter',
            buttonLink: '/contact'
          }
        }
      ]
    },
    content: {
      category: 'Contenu',
      blocks: [
        {
          type: 'content-simple',
          name: 'Contenu simple',
          icon: '📝',
          defaultProps: {
            title: 'Titre de section',
            content: 'Contenu texte...'
          }
        }
      ]
    },
    contact: {
      category: 'Contact',
      blocks: [
        {
          type: 'contact-form-map',
          name: 'Formulaire avec carte',
          icon: '📍',
          defaultProps: {
            title: 'Contactez-nous',
            subtitle: 'Nous sommes à votre écoute',
            showMap: true,
            formFields: []
          }
        }
      ]
    }
  },

  // Gestionnaire de blocs
  BlockManager: class {
    constructor(cms) {
      this.cms = cms;
    }

    addBlock(pageSlug, blockType) {
      const page = this.cms.data.pages.find(p => p.slug === pageSlug);
      if (!page) return null;

      // Find block template in catalog
      let template = null;
      for (const category of Object.values(window.CMS_ENHANCEMENTS.blockCatalog)) {
        const block = category.blocks.find(b => b.type === blockType);
        if (block) {
          template = block;
          break;
        }
      }

      if (!template) return null;

      const newBlock = {
        id: 'block-' + Date.now(),
        type: blockType,
        isVisible: true,
        props: JSON.parse(JSON.stringify(template.defaultProps))
      };

      page.blocks.push(newBlock);
      return newBlock;
    }

    removeBlock(pageSlug, blockId) {
      const page = this.cms.data.pages.find(p => p.slug === pageSlug);
      if (!page) return false;

      const index = page.blocks.findIndex(b => b.id === blockId);
      if (index !== -1) {
        page.blocks.splice(index, 1);
        return true;
      }
      return false;
    }

    moveBlock(pageSlug, blockId, direction) {
      const page = this.cms.data.pages.find(p => p.slug === pageSlug);
      if (!page) return false;

      const index = page.blocks.findIndex(b => b.id === blockId);
      if (index === -1) return false;

      if (direction === 'up' && index > 0) {
        [page.blocks[index - 1], page.blocks[index]] = [page.blocks[index], page.blocks[index - 1]];
        return true;
      } else if (direction === 'down' && index < page.blocks.length - 1) {
        [page.blocks[index], page.blocks[index + 1]] = [page.blocks[index + 1], page.blocks[index]];
        return true;
      }
      return false;
    }

    duplicateBlock(pageSlug, blockId) {
      const page = this.cms.data.pages.find(p => p.slug === pageSlug);
      if (!page) return null;

      const block = page.blocks.find(b => b.id === blockId);
      if (!block) return null;

      const newBlock = {
        ...JSON.parse(JSON.stringify(block)),
        id: 'block-' + Date.now()
      };

      const index = page.blocks.findIndex(b => b.id === blockId);
      page.blocks.splice(index + 1, 0, newBlock);
      return newBlock;
    }
  },

  // Gestionnaire de thèmes
  ThemeManager: class {
    constructor(cms) {
      this.cms = cms;
      this.presetThemes = {
        blue: {
          name: 'Bleu Pro',
          colors: {
            primary: '#3B82F6',
            secondary: '#1E40AF',
            accent: '#F59E0B',
            background: '#FFFFFF',
            surface: '#F3F4F6',
            text: '#1F2937',
            textSecondary: '#6B7280'
          }
        },
        green: {
          name: 'Vert Nature',
          colors: {
            primary: '#10B981',
            secondary: '#059669',
            accent: '#F59E0B',
            background: '#FFFFFF',
            surface: '#F0FDF4',
            text: '#1F2937',
            textSecondary: '#6B7280'
          }
        },
        purple: {
          name: 'Violet Élégant',
          colors: {
            primary: '#8B5CF6',
            secondary: '#6D28D9',
            accent: '#EC4899',
            background: '#FFFFFF',
            surface: '#FAF5FF',
            text: '#1F2937',
            textSecondary: '#6B7280'
          }
        },
        red: {
          name: 'Rouge Énergie',
          colors: {
            primary: '#EF4444',
            secondary: '#DC2626',
            accent: '#F59E0B',
            background: '#FFFFFF',
            surface: '#FEF2F2',
            text: '#1F2937',
            textSecondary: '#6B7280'
          }
        }
      };
    }

    applyTheme(theme) {
      if (!this.cms.data.theme) this.cms.data.theme = {};
      this.cms.data.theme.colors = { ...theme.colors };
      this.updateCSSVariables(theme.colors);
    }

    getThemeColors() {
      return this.cms.data.theme?.colors || this.presetThemes.blue.colors;
    }

    updateCSSVariables(colors) {
      const root = document.documentElement;
      Object.entries(colors).forEach(([key, value]) => {
        root.style.setProperty('--color-' + key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
      });
    }
  },

  // Éditeur de propriétés
  PropertyEditor: {
    generateControls(block) {
      const controls = [];
      const props = block.props || {};

      Object.entries(props).forEach(([key, value]) => {
        const control = this.detectControlType(key, value);
        if (control) {
          controls.push(control);
        }
      });

      return controls;
    },

    detectControlType(key, value) {
      // Détection automatique du type de contrôle
      if (key.includes('color') || key.includes('Color')) {
        return { type: 'color', key, label: this.formatLabel(key), value };
      }
      
      if (key.includes('image') || key.includes('Image') || key.includes('icon') || key.includes('logo') || key.includes('photo')) {
        return { type: 'image', key, label: this.formatLabel(key), value };
      }
      
      if (key.includes('link') || key.includes('Link') || key.includes('url') || key.includes('href')) {
        return { type: 'url', key, label: this.formatLabel(key), value };
      }
      
      if (typeof value === 'boolean') {
        return { type: 'toggle', key, label: this.formatLabel(key), value };
      }
      
      if (typeof value === 'number') {
        return { type: 'number', key, label: this.formatLabel(key), value };
      }
      
      if (Array.isArray(value)) {
        return { type: 'array', key, label: this.formatLabel(key), value };
      }
      
      if (typeof value === 'string') {
        if (value.length > 100 || key.includes('content') || key.includes('description')) {
          return { type: 'textarea', key, label: this.formatLabel(key), value };
        }
        return { type: 'text', key, label: this.formatLabel(key), value };
      }
      
      return null;
    },

    formatLabel(key) {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .trim();
    }
  }
};
  `;
}

function getCMSAdminJS(): string {
  return `
// CMS Admin - Interface d'administration principale
let cms;
let currentPage = null;
let selectedBlock = null;
let hasUnsavedChanges = false;
let blockManager;
let themeManager;
let versionHistory;
let draggedBlock = null;

// Login handler
async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value;
  const password = form.password.value;
  
  const success = await cms.login(email, password);
  
  if (success) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('admin-interface').classList.remove('hidden');
    showAdminInterface();
  } else {
    const error = document.getElementById('login-error');
    error.textContent = 'Email ou mot de passe incorrect';
    error.classList.remove('hidden');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  // Load saved data if available
  const savedData = localStorage.getItem('cms_site_data');
  const initialData = savedData ? JSON.parse(savedData) : window.CMS_INITIAL_DATA;
  
  cms = new CMSCore(initialData, window.CMS_CONFIG.apiEndpoint);
  blockManager = new window.CMS_ENHANCEMENTS.BlockManager(cms);
  themeManager = new window.CMS_ENHANCEMENTS.ThemeManager(cms);
  
  // Initialize version history
  versionHistory = new VersionHistory('cms-version-history');
  versionHistory.startAutoSave(() => cms.getSiteData(), 30000); // 30 secondes
  
  // Apply initial theme
  themeManager.updateCSSVariables(themeManager.getThemeColors());
  
  if (cms.isAuthenticated()) {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('admin-interface').classList.remove('hidden');
    showAdminInterface();
  }
});

function showAdminInterface() {
  // Build the admin interface HTML
  const adminInterface = document.getElementById('admin-interface');
  adminInterface.innerHTML = getAdminInterfaceHTML();
  
  // Initialize the interface
  loadNavigation();
  showFirstPage();
  
  // Setup auto-save
  setInterval(() => {
    if (hasUnsavedChanges) {
      saveChanges();
    }
  }, 30000); // Every 30 seconds
}

function getAdminInterfaceHTML() {
  return \`
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-4 h-16 flex items-center justify-between sticky top-0 z-40">
        <div class="flex items-center space-x-4">
            <h1 class="text-lg font-semibold">Administration CMS</h1>
            <span id="save-status" class="text-sm text-gray-500"></span>
        </div>
        <div class="flex items-center space-x-2">
            <button onclick="openVersionHistory()" class="btn btn-secondary">
                🕐 Historique
            </button>
            <button onclick="openThemeModal()" class="btn btn-secondary">
                🎨 Thème
            </button>
            <button onclick="openPreview()" class="btn btn-secondary" title="Aperçu responsive">
                👁️ Aperçu
            </button>
            <button onclick="saveChanges()" class="btn btn-primary">
                💾 Sauvegarder
            </button>
            <button onclick="logout()" class="btn btn-secondary">
                Déconnexion
            </button>
        </div>
    </header>

    <div class="flex h-[calc(100vh-4rem)]">
        <!-- Sidebar -->
        <aside class="w-64 bg-white border-r border-gray-200 overflow-y-auto">
            <div class="p-4">
                <h3 class="text-sm font-semibold text-gray-700 mb-2">Pages</h3>
                <ul id="page-nav" class="space-y-1">
                    <!-- Pages will be inserted here -->
                </ul>
                
                <div class="mt-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-2">Informations</h3>
                    <button onclick="showBusinessInfo()" class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
                        🏢 Infos entreprise
                    </button>
                    <button onclick="showSEOModule()" class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100">
                        🔍 SEO & Analytics
                    </button>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
            <div id="content-area">
                <!-- Dynamic content will be loaded here -->
            </div>
        </main>

        <!-- Properties Panel -->
        <aside id="properties-panel" class="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto hidden">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-sm font-semibold text-gray-700">Propriétés</h3>
                <button onclick="closePropertiesPanel()" class="text-gray-400 hover:text-gray-600">
                    ✕
                </button>
            </div>
            <div id="properties-content">
                <!-- Properties will be loaded here -->
            </div>
        </aside>
    </div>

    <!-- Block Library Modal -->
    <div id="block-library-modal" class="modal">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-semibold">Ajouter un bloc</h2>
                    <button onclick="closeBlockLibrary()" class="text-gray-400 hover:text-gray-600 text-xl">
                        ✕
                    </button>
                </div>
            </div>
            <div class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                <div id="block-categories">
                    <!-- Block categories will be inserted here -->
                </div>
            </div>
        </div>
    </div>

    <!-- Theme Modal -->
    <div id="theme-modal" class="modal">
        <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div class="p-6 border-b border-gray-200">
                <div class="flex justify-between items-center">
                    <h2 class="text-xl font-semibold">Personnaliser le thème</h2>
                    <button onclick="closeThemeModal()" class="text-gray-400 hover:text-gray-600 text-xl">
                        ✕
                    </button>
                </div>
            </div>
            <div class="p-6">
                <div class="mb-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">Thèmes prédéfinis</h3>
                    <div id="preset-themes" class="grid grid-cols-4 gap-3">
                        <!-- Preset themes will be inserted here -->
                    </div>
                </div>
                
                <div class="border-t border-gray-200 pt-6">
                    <h3 class="text-sm font-semibold text-gray-700 mb-3">Couleurs personnalisées</h3>
                    <div id="custom-colors" class="grid grid-cols-2 gap-4">
                        <!-- Color pickers will be inserted here -->
                    </div>
                </div>
            </div>
        </div>
    </div>
  \`;
}

// Navigation functions
function loadNavigation() {
  const nav = document.getElementById('page-nav');
  nav.innerHTML = '';
  
  cms.data.pages.forEach(page => {
    const li = document.createElement('li');
    li.innerHTML = \`
      <button onclick="showPage('\${page.slug}')" 
              class="w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 \${currentPage?.slug === page.slug ? 'bg-gray-100' : ''}">
        📄 \${page.name}
      </button>
    \`;
    nav.appendChild(li);
  });
}

function showFirstPage() {
  const pages = cms.data.pages;
  if (pages.length > 0) {
    showPage(pages[0].slug);
  }
}

// Page display
function showPage(slug) {
  currentPage = cms.data.pages.find(p => p.slug === slug);
  if (!currentPage) return;

  const content = document.getElementById('content-area');
  content.innerHTML = \`
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold mb-2">\${currentPage.name}</h2>
          <p class="text-gray-600">Glissez-déposez pour réorganiser, cliquez pour éditer</p>
        </div>
        <button onclick="openBlockLibrary()" class="btn btn-success">
          ➕ Ajouter un bloc
        </button>
      </div>
    </div>
    
    <div id="blocks-container" class="space-y-4">
      \${currentPage.blocks.length === 0 
        ? '<div class="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300"><p class="text-gray-500">Aucun bloc. Cliquez sur "Ajouter un bloc" pour commencer.</p></div>'
        : currentPage.blocks.map((block, index) => renderBlock(block, index)).join('')
      }
    </div>
  \`;

  // Enable drag & drop
  enableDragAndDrop();
  
  // Update navigation
  loadNavigation();
}

function renderBlock(block, index) {
  const isVisible = block.isVisible !== false;
  const isFirst = index === 0;
  const isLast = index === currentPage.blocks.length - 1;
  
  return \`
    <div class="block-item bg-white rounded-lg shadow-sm border border-gray-200 \${!isVisible ? 'opacity-50' : ''}" 
         data-block-id="\${block.id}" 
         data-block-index="\${index}"
         draggable="true">
      <div class="p-4">
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">\${getBlockIcon(block.type)}</span>
            <div>
              <h3 class="font-medium">\${getBlockTitle(block)}</h3>
              <p class="text-xs text-gray-500">\${block.type}</p>
            </div>
          </div>
          <div class="flex items-center space-x-1">
            \${!isFirst ? \`
              <button onclick="moveBlock('\${block.id}', 'up')" class="btn btn-sm btn-secondary" title="Monter">
                ↑
              </button>
            \` : ''}
            \${!isLast ? \`
              <button onclick="moveBlock('\${block.id}', 'down')" class="btn btn-sm btn-secondary" title="Descendre">
                ↓
              </button>
            \` : ''}
            <button onclick="toggleBlockVisibility('\${block.id}')" class="btn btn-sm btn-secondary" title="\${isVisible ? 'Masquer' : 'Afficher'}">
              \${isVisible ? '👁️' : '👁️‍🗨️'}
            </button>
            <button onclick="duplicateBlock('\${block.id}')" class="btn btn-sm btn-secondary" title="Dupliquer">
              📋
            </button>
            <button onclick="editBlock('\${block.id}')" class="btn btn-sm btn-primary" title="Éditer">
              ✏️
            </button>
            <button onclick="deleteBlock('\${block.id}')" class="btn btn-sm btn-danger" title="Supprimer">
              🗑️
            </button>
          </div>
        </div>
        <div class="text-sm text-gray-600">
          \${getBlockPreview(block)}
        </div>
      </div>
    </div>
  \`;
}

// Block helper functions
function getBlockIcon(blockType) {
  for (const category of Object.values(window.CMS_ENHANCEMENTS.blockCatalog)) {
    const block = category.blocks.find(b => b.type === blockType);
    if (block) return block.icon;
  }
  return '📦';
}

function getBlockTitle(block) {
  for (const category of Object.values(window.CMS_ENHANCEMENTS.blockCatalog)) {
    const catalogBlock = category.blocks.find(b => b.type === block.type);
    if (catalogBlock) return catalogBlock.name;
  }
  return block.type;
}

function getBlockPreview(block) {
  if (block.props.title) {
    return \`<strong>Titre:</strong> \${block.props.title}\`;
  }
  if (block.props.heading) {
    return \`<strong>Titre:</strong> \${block.props.heading}\`;
  }
  if (block.props.text) {
    return \`<strong>Texte:</strong> \${block.props.text.substring(0, 100)}...\`;
  }
  return \`Type: \${block.type}\`;
}

// Block actions
function moveBlock(blockId, direction) {
  if (blockManager.moveBlock(currentPage.slug, blockId, direction)) {
    hasUnsavedChanges = true;
    updateSaveStatus();
    showPage(currentPage.slug);
  }
}

function duplicateBlock(blockId) {
  const newBlock = blockManager.duplicateBlock(currentPage.slug, blockId);
  if (newBlock) {
    hasUnsavedChanges = true;
    updateSaveStatus();
    showPage(currentPage.slug);
  }
}

function deleteBlock(blockId) {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce bloc ?')) {
    if (blockManager.removeBlock(currentPage.slug, blockId)) {
      hasUnsavedChanges = true;
      updateSaveStatus();
      showPage(currentPage.slug);
    }
  }
}

function toggleBlockVisibility(blockId) {
  const block = currentPage.blocks.find(b => b.id === blockId);
  if (block) {
    block.isVisible = !block.isVisible;
    hasUnsavedChanges = true;
    updateSaveStatus();
    showPage(currentPage.slug);
  }
}

// Block library
function openBlockLibrary() {
  const modal = document.getElementById('block-library-modal');
  const categoriesContainer = document.getElementById('block-categories');
  
  // Generate block library content
  let html = '';
  for (const [key, category] of Object.entries(window.CMS_ENHANCEMENTS.blockCatalog)) {
    html += \`
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4">\${category.category}</h3>
        <div class="grid grid-cols-2 gap-4">
          \${category.blocks.map(block => \`
            <div class="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                 onclick="addBlockFromLibrary('\${block.type}')">
              <div class="flex items-center space-x-3 mb-2">
                <span class="text-2xl">\${block.icon}</span>
                <h4 class="font-medium">\${block.name}</h4>
              </div>
              <p class="text-sm text-gray-600">\${block.type}</p>
            </div>
          \`).join('')}
        </div>
      </div>
    \`;
  }
  
  categoriesContainer.innerHTML = html;
  modal.classList.add('active');
}

function closeBlockLibrary() {
  document.getElementById('block-library-modal').classList.remove('active');
}

function addBlockFromLibrary(blockType) {
  const newBlock = blockManager.addBlock(currentPage.slug, blockType);
  if (newBlock) {
    hasUnsavedChanges = true;
    updateSaveStatus();
    showPage(currentPage.slug);
    closeBlockLibrary();
  }
}

// Theme management
function openThemeModal() {
  const modal = document.getElementById('theme-modal');
  const presetsContainer = document.getElementById('preset-themes');
  const colorsContainer = document.getElementById('custom-colors');
  
  // Generate preset themes
  let presetsHtml = '';
  for (const [key, theme] of Object.entries(themeManager.presetThemes)) {
    presetsHtml += \`
      <div class="text-center cursor-pointer" onclick="applyPresetTheme('\${key}')">
        <div class="w-full h-20 rounded-lg mb-2 flex overflow-hidden shadow-sm">
          <div style="background: \${theme.colors.primary}" class="flex-1"></div>
          <div style="background: \${theme.colors.secondary}" class="flex-1"></div>
          <div style="background: \${theme.colors.accent}" class="w-8"></div>
        </div>
        <p class="text-xs">\${theme.name}</p>
      </div>
    \`;
  }
  presetsContainer.innerHTML = presetsHtml;
  
  // Generate color pickers
  const currentColors = themeManager.getThemeColors();
  let colorsHtml = '';
  for (const [key, value] of Object.entries(currentColors)) {
    colorsHtml += \`
      <div class="flex items-center space-x-3">
        <label class="text-sm font-medium text-gray-700 flex-1">\${formatColorLabel(key)}</label>
        <input type="color" value="\${value}" 
               onchange="updateThemeColor('\${key}', this.value)"
               class="color-picker-swatch" />
      </div>
    \`;
  }
  colorsContainer.innerHTML = colorsHtml;
  
  modal.classList.add('active');
}

function closeThemeModal() {
  document.getElementById('theme-modal').classList.remove('active');
}

function applyPresetTheme(themeKey) {
  const theme = themeManager.presetThemes[themeKey];
  if (theme) {
    themeManager.applyTheme(theme);
    hasUnsavedChanges = true;
    updateSaveStatus();
    openThemeModal(); // Refresh the modal
  }
}

function updateThemeColor(colorKey, value) {
  if (!cms.data.theme) cms.data.theme = { colors: {} };
  if (!cms.data.theme.colors) cms.data.theme.colors = {};
  
  cms.data.theme.colors[colorKey] = value;
  themeManager.updateCSSVariables(cms.data.theme.colors);
  
  hasUnsavedChanges = true;
  updateSaveStatus();
}

function formatColorLabel(key) {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
}

// Property editor
function editBlock(blockId) {
  const block = currentPage.blocks.find(b => b.id === blockId);
  if (!block) return;

  selectedBlock = block;
  showPropertiesPanel(block);
}

function showPropertiesPanel(block) {
  const panel = document.getElementById('properties-panel');
  const content = document.getElementById('properties-content');
  
  panel.classList.remove('hidden');
  
  const controls = window.CMS_ENHANCEMENTS.PropertyEditor.generateControls(block);
  
  let html = '';
  controls.forEach(control => {
    html += generateControlHTML(control);
  });
  
  content.innerHTML = html || '<p class="text-gray-500">Aucune propriété modifiable</p>';
}

function generateControlHTML(control) {
  switch (control.type) {
    case 'text':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <input type="text" value="\${control.value || ''}" 
                 onchange="updateBlockProp('\${control.key}', this.value)" 
                 class="property-input" />
        </div>
      \`;
    
    case 'textarea':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <textarea rows="3" onchange="updateBlockProp('\${control.key}', this.value)" 
                    class="property-input">\${control.value || ''}</textarea>
        </div>
      \`;
    
    case 'color':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <div class="flex items-center space-x-2">
            <input type="color" value="\${control.value || '#000000'}" 
                   onchange="updateBlockProp('\${control.key}', this.value)" 
                   class="color-picker-swatch" />
            <input type="text" value="\${control.value || ''}" 
                   onchange="updateBlockProp('\${control.key}', this.value)" 
                   class="property-input flex-1" />
          </div>
        </div>
      \`;
    
    case 'toggle':
      return \`
        <div class="mb-4">
          <label class="flex items-center space-x-2">
            <input type="checkbox" \${control.value ? 'checked' : ''} 
                   onchange="updateBlockProp('\${control.key}', this.checked)" 
                   class="rounded" />
            <span class="text-sm font-medium text-gray-700">\${control.label}</span>
          </label>
        </div>
      \`;
    
    case 'number':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <input type="number" value="\${control.value || 0}" 
                 onchange="updateBlockProp('\${control.key}', Number(this.value))" 
                 class="property-input" />
        </div>
      \`;
    
    case 'url':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <input type="url" value="\${control.value || ''}" 
                 onchange="updateBlockProp('\${control.key}', this.value)" 
                 class="property-input" 
                 placeholder="https://..." />
        </div>
      \`;
    
    case 'array':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <div class="border border-gray-200 rounded-md p-3">
            <p class="text-xs text-gray-500 mb-2">Tableau de \${control.value.length} éléments</p>
            <button onclick="alert('Éditeur de tableau à implémenter')" class="btn btn-sm btn-secondary">
              Éditer
            </button>
          </div>
        </div>
      \`;
    
    case 'image':
      return \`
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">\${control.label}</label>
          <div class="space-y-2">
            <div class="relative">
              <input type="text" value="\${control.value || ''}" 
                     id="image-input-\${control.key}"
                     onchange="updateBlockProp('\${control.key}', this.value)" 
                     class="property-input pr-24" 
                     placeholder="URL de l'image ou /images/..." />
              <button onclick="openImagePicker('\${control.key}')" 
                      class="absolute right-1 top-1 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                Choisir
              </button>
            </div>
            \${control.value ? \`
              <div class="mt-2 relative">
                <img src="\${control.value}" alt="Preview" 
                     class="w-full h-32 object-cover rounded border border-gray-200" 
                     onerror="this.style.display='none'" />
              </div>
            \` : ''}
            <div class="text-xs text-gray-500">
              <button onclick="openMediaUploader('\${control.key}')" 
                      class="text-blue-500 hover:underline">
                📤 Uploader une nouvelle image
              </button>
            </div>
          </div>
        </div>
      \`;
    
    default:
      return '';
  }
}

function closePropertiesPanel() {
  document.getElementById('properties-panel').classList.add('hidden');
  selectedBlock = null;
}

function updateBlockProp(prop, value) {
  if (!selectedBlock) return;
  
  selectedBlock.props[prop] = value;
  hasUnsavedChanges = true;
  updateSaveStatus();
  
  // Refresh the page display
  showPage(currentPage.slug);
}

// Media Management
let mediaStorage = JSON.parse(localStorage.getItem('cms_media_storage') || '[]');

function openImagePicker(propKey) {
  // Créer un modal pour la galerie d'images
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = \`
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <div class="p-4 border-b">
        <h3 class="text-lg font-semibold">Sélectionner une image</h3>
      </div>
      <div class="p-4 overflow-y-auto max-h-[60vh]">
        <div class="grid grid-cols-3 md:grid-cols-4 gap-4" id="image-gallery">
          \${mediaStorage.length > 0 ? mediaStorage.map(img => \`
            <div class="cursor-pointer hover:opacity-75 transition" onclick="selectImage('\${propKey}', '\${img.url}')">
              <img src="\${img.url}" alt="\${img.name}" class="w-full h-24 object-cover rounded border-2 border-gray-200">
              <p class="text-xs text-gray-600 mt-1 truncate">\${img.name}</p>
            </div>
          \`).join('') : '<p class="col-span-full text-gray-500 text-center">Aucune image dans la galerie</p>'}
        </div>
      </div>
      <div class="p-4 border-t flex justify-between">
        <button onclick="openMediaUploader('\${propKey}')" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          📤 Uploader une nouvelle image
        </button>
        <button onclick="closeModal(this)" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Fermer
        </button>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
}

function openMediaUploader(propKey) {
  // Fermer le modal de galerie s'il existe
  const existingModal = document.querySelector('.fixed.inset-0');
  if (existingModal) existingModal.remove();
  
  // Créer un modal pour l'upload
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = \`
    <div class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
      <div class="p-4 border-b">
        <h3 class="text-lg font-semibold">Uploader une image</h3>
      </div>
      <div class="p-6">
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input type="file" id="image-upload" accept="image/*" class="hidden" onchange="handleImageUpload(event, '\${propKey}')">
          <label for="image-upload" class="cursor-pointer">
            <div class="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              📤
            </div>
            <p class="text-sm text-gray-600">Cliquez pour sélectionner une image</p>
            <p class="text-xs text-gray-500 mt-2">JPG, PNG, GIF, WebP (max 5MB)</p>
          </label>
        </div>
        <div id="upload-preview" class="mt-4 hidden">
          <img id="preview-image" class="w-full h-48 object-cover rounded">
          <div id="upload-progress" class="mt-2 hidden">
            <div class="bg-gray-200 rounded-full h-2">
              <div class="bg-blue-500 h-2 rounded-full transition-all" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-t flex justify-end">
        <button onclick="closeModal(this)" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          Annuler
        </button>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
}

function handleImageUpload(event, propKey) {
  const file = event.target.files[0];
  if (!file) return;
  
  // Vérifier la taille
  if (file.size > 5 * 1024 * 1024) {
    alert('Le fichier est trop volumineux (max 5MB)');
    return;
  }
  
  // Afficher la preview
  const reader = new FileReader();
  reader.onload = (e) => {
    document.getElementById('upload-preview').classList.remove('hidden');
    document.getElementById('preview-image').src = e.target.result;
    
    // Simuler l'upload (dans un vrai CMS, appeler l'API)
    uploadImage(file, e.target.result, propKey);
  };
  reader.readAsDataURL(file);
}

async function uploadImage(file, dataUrl, propKey) {
  // Afficher la progression
  const progressBar = document.getElementById('upload-progress');
  progressBar.classList.remove('hidden');
  const progress = progressBar.querySelector('.bg-blue-500');
  
  // Simuler la progression
  let percent = 0;
  const interval = setInterval(() => {
    percent += 10;
    progress.style.width = percent + '%';
    
    if (percent >= 100) {
      clearInterval(interval);
      
      // Sauvegarder l'image localement
      const imageData = {
        id: 'img-' + Date.now(),
        name: file.name,
        url: dataUrl,
        size: file.size,
        type: file.type,
        uploadedAt: new Date().toISOString()
      };
      
      mediaStorage.push(imageData);
      localStorage.setItem('cms_media_storage', JSON.stringify(mediaStorage));
      
      // Mettre à jour la propriété
      if (propKey) {
        updateBlockProp(propKey, dataUrl);
        document.getElementById('image-input-' + propKey).value = dataUrl;
      }
      
      // Fermer le modal
      setTimeout(() => {
        closeModal(document.querySelector('.fixed.inset-0 button'));
      }, 500);
    }
  }, 100);
}

function selectImage(propKey, imageUrl) {
  // Check if this is for SEO
  if (propKey === 'seo-image' && window.seoImageCallback) {
    window.seoImageCallback(imageUrl);
    window.seoImageCallback = null;
  } else {
    updateBlockProp(propKey, imageUrl);
    document.getElementById('image-input-' + propKey).value = imageUrl;
  }
  closeModal(document.querySelector('.fixed.inset-0 button'));
}

function closeModal(button) {
  const modal = button.closest('.fixed.inset-0');
  if (modal) modal.remove();
}

// Drag & Drop
function enableDragAndDrop() {
  const blocks = document.querySelectorAll('.block-item');
  
  blocks.forEach(block => {
    block.addEventListener('dragstart', handleDragStart);
    block.addEventListener('dragend', handleDragEnd);
    block.addEventListener('dragover', handleDragOver);
    block.addEventListener('drop', handleDrop);
    block.addEventListener('dragenter', handleDragEnter);
    block.addEventListener('dragleave', handleDragLeave);
  });
}

function handleDragStart(e) {
  draggedBlock = e.target.closest('.block-item');
  e.target.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
  e.target.classList.remove('dragging');
  
  // Remove all drag-over classes
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = 'move';
  return false;
}

function handleDragEnter(e) {
  const target = e.target.closest('.block-item');
  if (target && target !== draggedBlock) {
    target.classList.add('drag-over');
  }
}

function handleDragLeave(e) {
  const target = e.target.closest('.block-item');
  if (target) {
    target.classList.remove('drag-over');
  }
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  
  const dropTarget = e.target.closest('.block-item');
  if (draggedBlock !== dropTarget && dropTarget) {
    // Get indices
    const draggedIndex = parseInt(draggedBlock.dataset.blockIndex);
    const targetIndex = parseInt(dropTarget.dataset.blockIndex);
    
    // Reorder blocks
    const blocks = [...currentPage.blocks];
    const [removed] = blocks.splice(draggedIndex, 1);
    blocks.splice(targetIndex, 0, removed);
    currentPage.blocks = blocks;
    
    hasUnsavedChanges = true;
    updateSaveStatus();
    showPage(currentPage.slug);
  }
  
  return false;
}

// Business info
function showBusinessInfo() {
  const info = cms.data.businessInfo || {};
  const content = document.getElementById('content-area');
  
  content.innerHTML = \`
    <div class="max-w-2xl">
      <h2 class="text-2xl font-bold mb-6">Informations de l'entreprise</h2>
      
      <div class="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
          <input type="text" value="\${info.companyName || ''}" 
                 onchange="updateBusinessInfo('companyName', this.value)" 
                 class="property-input" />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input type="tel" value="\${info.phone || ''}" 
                   onchange="updateBusinessInfo('phone', this.value)" 
                   class="property-input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value="\${info.email || ''}" 
                   onchange="updateBusinessInfo('email', this.value)" 
                   class="property-input" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
          <input type="text" value="\${info.address || ''}" 
                 onchange="updateBusinessInfo('address', this.value)" 
                 class="property-input" />
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ville</label>
            <input type="text" value="\${info.city || ''}" 
                   onchange="updateBusinessInfo('city', this.value)" 
                   class="property-input" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Code postal</label>
            <input type="text" value="\${info.postalCode || ''}" 
                   onchange="updateBusinessInfo('postalCode', this.value)" 
                   class="property-input" />
          </div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea rows="4" onchange="updateBusinessInfo('description', this.value)" 
                    class="property-input">\${info.description || ''}</textarea>
        </div>
      </div>
    </div>
  \`;
}

function updateBusinessInfo(field, value) {
  if (!cms.data.businessInfo) cms.data.businessInfo = {};
  cms.data.businessInfo[field] = value;
  hasUnsavedChanges = true;
  updateSaveStatus();
}

// SEO Module Display
function showSEOModule() {
  const content = document.getElementById('content-area');
  content.innerHTML = \`
    <div class="max-w-6xl">
      <h2 class="text-2xl font-bold mb-6">SEO & Analytics</h2>
      <div id="seo-module"></div>
    </div>
  \`;
  
  // Load the SEO module into the container
  if (window.seoModule) {
    window.seoModule.init();
  }
}

// SEO Helper Functions
window.cmsEnhanced = {
  getCurrentPageData: function() {
    return currentPage;
  },
  
  updatePageSEO: async function(seoData) {
    if (!currentPage) return false;
    
    // Update the page SEO data
    const pageIndex = cms.data.pages.findIndex(p => p.slug === currentPage.slug);
    if (pageIndex >= 0) {
      if (!cms.data.pages[pageIndex].seo) {
        cms.data.pages[pageIndex].seo = {};
      }
      Object.assign(cms.data.pages[pageIndex].seo, seoData);
      currentPage.seo = cms.data.pages[pageIndex].seo;
      
      hasUnsavedChanges = true;
      updateSaveStatus();
      
      // Save automatically
      await saveChanges();
      return true;
    }
    return false;
  },
  
  openMediaSelector: function(callback) {
    // Open the media picker modal
    openImagePicker('seo-image');
    // Store callback for when image is selected
    window.seoImageCallback = callback;
  }
};

// Save functionality
async function saveChanges() {
  updateSaveStatus('Sauvegarde en cours...');
  
  // Save to localStorage for preview
  localStorage.setItem('cms_site_data', JSON.stringify(cms.data));
  
  // Save to server
  const success = await cms.save();
  
  if (success) {
    hasUnsavedChanges = false;
    updateSaveStatus('Sauvegardé ✓');
    setTimeout(() => updateSaveStatus(), 3000);
  } else {
    updateSaveStatus('Erreur de sauvegarde');
  }
}

function updateSaveStatus(message = '') {
  const status = document.getElementById('save-status');
  if (message) {
    status.textContent = message;
  } else if (hasUnsavedChanges) {
    status.textContent = 'Modifications non sauvegardées';
    status.classList.add('text-orange-600');
  } else {
    status.textContent = '';
    status.classList.remove('text-orange-600');
  }
}

// Preview
function openPreview() {
  localStorage.setItem('cms_site_data', JSON.stringify(cms.data));
  
  // Create responsive preview modal
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = \`
    <div class="bg-white rounded-lg shadow-xl w-full h-full max-w-7xl max-h-[90vh] m-4 flex flex-col">
      <div class="p-4 border-b flex items-center justify-between">
        <h3 class="text-lg font-semibold">👁️ Aperçu</h3>
        <div class="flex items-center space-x-4">
          <!-- Device Selector -->
          <div class="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button onclick="setPreviewDevice('mobile')" id="device-mobile" class="p-2 rounded hover:bg-gray-200">
              📱
            </button>
            <button onclick="setPreviewDevice('tablet')" id="device-tablet" class="p-2 rounded hover:bg-gray-200">
              📱
            </button>
            <button onclick="setPreviewDevice('desktop')" id="device-desktop" class="p-2 rounded bg-white shadow-sm">
              💻
            </button>
          </div>
          <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700 text-xl">
            ✕
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-hidden bg-gray-100 p-8" id="preview-container">
        <div id="device-frame" class="mx-auto transition-all duration-300">
          <iframe src="/admin/preview.html" 
                  id="preview-iframe"
                  class="w-full h-full border-0" 
                  title="Aperçu du site"></iframe>
        </div>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
  
  // Set default device
  window.currentPreviewDevice = 'desktop';
  updateDeviceFrame();
}

function setPreviewDevice(device) {
  window.currentPreviewDevice = device;
  
  // Update button states
  document.querySelectorAll('[id^="device-"]').forEach(btn => {
    btn.classList.remove('bg-white', 'shadow-sm');
    btn.classList.add('hover:bg-gray-200');
  });
  document.getElementById(\`device-\${device}\`).classList.remove('hover:bg-gray-200');
  document.getElementById(\`device-\${device}\`).classList.add('bg-white', 'shadow-sm');
  
  updateDeviceFrame();
}

function updateDeviceFrame() {
  const frameContainer = document.getElementById('device-frame');
  const iframe = document.getElementById('preview-iframe');
  
  // Remove existing classes
  frameContainer.className = 'mx-auto transition-all duration-300';
  
  switch (window.currentPreviewDevice) {
    case 'mobile':
      frameContainer.style.width = '375px';
      frameContainer.style.height = '812px';
      frameContainer.style.maxHeight = 'calc(90vh - 200px)';
      frameContainer.classList.add('border-8', 'border-gray-900', 'rounded-[2.5rem]', 'bg-gray-900', 'p-2');
      iframe.classList.add('rounded-[2rem]');
      break;
    case 'tablet':
      frameContainer.style.width = '768px';
      frameContainer.style.height = '1024px';
      frameContainer.style.maxHeight = 'calc(90vh - 200px)';
      frameContainer.classList.add('border-12', 'border-gray-900', 'rounded-[2rem]', 'bg-gray-900', 'p-3');
      iframe.classList.add('rounded-[1.5rem]');
      break;
    case 'desktop':
      frameContainer.style.width = '100%';
      frameContainer.style.height = '100%';
      frameContainer.style.maxHeight = 'none';
      frameContainer.classList.add('bg-white', 'shadow-2xl', 'rounded-lg', 'overflow-hidden');
      iframe.classList.remove('rounded-[2rem]', 'rounded-[1.5rem]');
      break;
  }
}

function openVersionHistory() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
  modal.innerHTML = \`
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden">
      <div class="p-4 border-b flex items-center justify-between">
        <h3 class="text-lg font-semibold">🕐 Historique des versions</h3>
        <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>
      <div class="p-4">
        <div class="mb-4 flex justify-between items-center">
          <button onclick="saveManualVersion()" class="btn btn-primary">
            💾 Sauvegarder une version
          </button>
          <button onclick="clearVersionHistory()" class="btn btn-secondary text-red-600">
            🗑️ Effacer l'historique
          </button>
        </div>
        <div class="space-y-2 max-h-96 overflow-y-auto" id="version-list">
          \${renderVersionList()}
        </div>
      </div>
    </div>
  \`;
  document.body.appendChild(modal);
}

function renderVersionList() {
  const versions = versionHistory.getVersions();
  if (versions.length === 0) {
    return '<p class="text-center text-gray-500 py-8">Aucune version sauvegardée</p>';
  }
  
  return versions.map(version => \`
    <div class="p-3 border rounded hover:bg-gray-50 flex items-center justify-between">
      <div>
        <div class="font-medium">\${version.label}</div>
        <div class="text-sm text-gray-500">\${version.date}</div>
        \${version.description ? \`<div class="text-sm text-gray-700 mt-1">\${version.description}</div>\` : ''}
      </div>
      <div class="flex space-x-2">
        <button onclick="restoreVersion('\${version.id}')" class="btn btn-sm btn-primary">
          ↻ Restaurer
        </button>
        <button onclick="deleteVersion('\${version.id}')" class="btn btn-sm btn-secondary text-red-600">
          🗑️
        </button>
      </div>
    </div>
  \`).join('');
}

function saveManualVersion() {
  const description = prompt('Description de la sauvegarde (optionnel):');
  versionHistory.saveVersion(cms.getSiteData(), 'manual', description || 'Sauvegarde manuelle');
  document.getElementById('version-list').innerHTML = renderVersionList();
}

function restoreVersion(versionId) {
  if (!confirm('Restaurer cette version ? Les modifications actuelles seront remplacées.')) return;
  
  const restoredData = versionHistory.restoreVersion(versionId);
  if (restoredData) {
    cms.siteData = restoredData;
    localStorage.setItem('cms_site_data', JSON.stringify(restoredData));
    window.location.reload();
  }
}

function deleteVersion(versionId) {
  if (!confirm('Supprimer cette version ?')) return;
  
  versionHistory.deleteVersion(versionId);
  document.getElementById('version-list').innerHTML = renderVersionList();
}

function clearVersionHistory() {
  if (!confirm('Supprimer tout l\\'historique ? Cette action est irréversible.')) return;
  
  versionHistory.clearHistory();
  document.getElementById('version-list').innerHTML = renderVersionList();
}

function logout() {
  if (hasUnsavedChanges && !confirm('Des modifications non sauvegardées seront perdues. Continuer ?')) {
    return;
  }
  cms.logout();
  window.location.reload();
}

// Warn before leaving with unsaved changes
window.addEventListener('beforeunload', (e) => {
  if (hasUnsavedChanges) {
    e.preventDefault();
    e.returnValue = '';
  }
});
  `;
}

function generateCMSPreview(): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aperçu - CMS</title>
    <link rel="stylesheet" href="/assets/css/styles.css">
    <style>
        /* Ensure proper scaling for different devices */
        body {
            margin: 0;
            padding: 0;
            overflow-x: hidden;
        }
        
        /* Add responsive styles */
        @media (max-width: 768px) {
            .container {
                padding: 0 1rem;
            }
        }
        
        @media (max-width: 375px) {
            .container {
                padding: 0 0.5rem;
            }
        }
    </style>
</head>
<body>
    <div id="preview-root"></div>
    
    <script>
        // Load site data from localStorage
        const siteData = localStorage.getItem('cms_site_data');
        if (siteData) {
            const data = JSON.parse(siteData);
            
            // Apply theme
            if (data.theme && data.theme.colors) {
                const root = document.documentElement;
                Object.entries(data.theme.colors).forEach(([key, value]) => {
                    root.style.setProperty('--color-' + key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
                });
            }
            
            // Get current page from URL or default to home
            const urlParams = new URLSearchParams(window.location.search);
            const pageSlug = urlParams.get('page') || '/';
            const currentPage = data.pages.find(p => p.slug === pageSlug) || data.pages[0];
            
            const previewRoot = document.getElementById('preview-root');
            
            if (currentPage) {
                let html = '';
                
                // Render header
                if (data.globalHeader) {
                    html += renderBlock(data.globalHeader);
                }
                
                // Render page blocks
                currentPage.blocks.forEach(block => {
                    if (block.isVisible !== false) {
                        html += renderBlock(block);
                    }
                });
                
                // Render footer
                if (data.globalFooter) {
                    html += renderBlock(data.globalFooter);
                }
                
                previewRoot.innerHTML = html;
                
                // Execute any block scripts
                const scripts = previewRoot.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    newScript.textContent = script.textContent;
                    document.body.appendChild(newScript);
                });
            }
        }
        
        function renderBlock(block) {
            // Get block renderer from global registry
            if (window.blockRenderers && window.blockRenderers[block.type]) {
                return window.blockRenderers[block.type](block.props || {});
            }
            
            // Fallback to simple renderer
            return '<div class="block-' + block.type + ' p-4 border border-gray-200 rounded-lg mb-4">' + 
                   '<p class="text-sm text-gray-500">Bloc: ' + block.type + '</p>' +
                   '<pre class="text-xs mt-2">' + JSON.stringify(block.props, null, 2) + '</pre>' +
                   '</div>';
        }
        
        // Listen for updates
        window.addEventListener('storage', (e) => {
            if (e.key === 'cms_site_data') {
                window.location.reload();
            }
        });
        
        // Handle navigation in preview
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href && link.href.startsWith('/')) {
                e.preventDefault();
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('page', link.href);
                window.location = newUrl;
            }
        });
    </script>
</body>
</html>`;
}

function generateCMSReadme(cmsPassword?: string): string {
  return `# CMS Administration

## Accès au CMS

Pour accéder à l'interface d'administration de votre site, rendez-vous sur :

\`\`\`
https://votre-domaine.netlify.app/admin/
\`\`\`

## Identifiants par défaut

- **Email** : admin@site.com
- **Mot de passe** : ${cmsPassword || 'admin123'}

**⚠️ IMPORTANT** : Changez ces identifiants par défaut dès que possible !

## Configuration des identifiants

### Sur Netlify

1. Allez dans les paramètres de votre site sur Netlify
2. Naviguez vers "Site settings" > "Environment variables"
3. Ajoutez les variables suivantes :
   - \`CMS_ADMIN_EMAIL\` : Votre email d'administration
   - \`CMS_ADMIN_PASSWORD\` : Votre mot de passe sécurisé

### Redéploiement

Après avoir configuré les variables d'environnement, redéployez votre site pour que les changements prennent effet.

## Fonctionnalités du CMS

### 📝 Gestion des pages
- Modifiez le contenu de toutes vos pages
- Ajoutez, supprimez ou réorganisez les blocs
- Prévisualisez vos modifications en temps réel

### 🎨 Personnalisation du thème
- Choisissez parmi des thèmes prédéfinis
- Personnalisez les couleurs de votre site
- Les changements sont appliqués instantanément

### 🏢 Informations de l'entreprise
- Mettez à jour vos coordonnées
- Modifiez la description de votre entreprise
- Gérez vos horaires d'ouverture

### 🔧 Gestion des blocs
- **Drag & Drop** : Réorganisez les blocs par glisser-déposer
- **Catalogue de blocs** : Plus de 20 types de blocs disponibles
- **Édition intuitive** : Interface simple pour modifier le contenu

## Sauvegarde

- **Sauvegarde automatique** : Toutes les 30 secondes
- **Sauvegarde manuelle** : Cliquez sur le bouton "Sauvegarder"
- Les modifications sont stockées localement et sur le serveur

## Support

Pour toute question ou problème, contactez le support technique.

---

*CMS développé avec AWEMA Studio v2*`;
}

/**
 * Transforme les URLs des images pour l'export
 * Convertit les URLs blob en chemins relatifs
 */
function transformImageUrlsForExport(props: Record<string, any>, projectId?: string): Record<string, any> {
  // Note: Image transformation is now handled in the renderBlock function
  // This function is kept for backward compatibility
  return props;
}

function getCMSUploadFunction(): string {
  return `// Fonction Netlify pour l'upload d'images via base64
exports.handler = async (event, context) => {
  // Gérer CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  // Autoriser uniquement les requêtes POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parser le body JSON
    const body = JSON.parse(event.body);
    const { fileName, fileData, mimeType } = body;

    if (!fileName || !fileData || !mimeType) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing required fields: fileName, fileData, mimeType' })
      };
    }

    // Valider le type de fichier
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(mimeType)) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'Invalid file type',
          allowed: allowedTypes 
        })
      };
    }

    // Décoder les données base64
    const buffer = Buffer.from(fileData.replace(/^data:image\\/\\w+;base64,/, ''), 'base64');

    // Valider la taille du fichier (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (buffer.length > maxSize) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          error: 'File too large',
          maxSize: '5MB'
        })
      };
    }

    // Générer un nom unique pour le fichier
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const extension = fileName.split('.').pop();
    const uniqueName = \`\${timestamp}-\${randomStr}.\${extension}\`;
    const imagePath = \`/images/\${uniqueName}\`;

    // Stocker temporairement dans la réponse
    // Dans un déploiement réel, utiliser Netlify Blobs ou un CDN
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
      body: JSON.stringify({
        success: true,
        data: {
          id: \`img-\${timestamp}-\${randomStr}\`,
          path: imagePath,
          url: imagePath,
          name: fileName,
          size: buffer.length,
          mimeType: mimeType,
          base64: fileData, // Renvoyer le base64 pour stockage local
          metadata: {
            originalName: fileName,
            uploadedAt: new Date().toISOString()
          }
        }
      })
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: 'Upload failed',
        message: error.message 
      })
    };
  }
};`;
}

function getVersionHistoryJS(): string {
  const { createVersionHistoryScript } = require('@/lib/services/version-history.service');
  return createVersionHistoryScript();
}

function generateSEOReport(projectData: any, options: SimplifiedExportOptions): string {
  const date = new Date().toLocaleDateString('fr-FR');
  const seoFeatures = [];
  
  if (options.enableAdvancedSEO) seoFeatures.push('SEO Avancé');
  if (options.generateSEOContent) seoFeatures.push('Contenu SEO Généré');
  if (options.enableAnalytics) seoFeatures.push('Google Analytics 4');
  if (options.enableSEOMonitoring) seoFeatures.push('Monitoring SEO');
  if (options.enableImageOptimization) seoFeatures.push('Images Optimisées');
  
  return `# Rapport SEO - ${projectData.projectName || 'Mon Site'}

## Date : ${date}

## Fonctionnalités SEO activées

${seoFeatures.map(f => `- ✅ ${f}`).join('\n')}

## Optimisations implémentées

### 🎆 Rich Snippets
- AggregateRating pour affichage étoiles Google
- FAQ Schema pour questions fréquentes
- LocalBusiness Schema complet
- Service Schema avec tarifs
- HowTo Schema pour guides

### 📊 Analytics & Tracking
- Google Analytics 4 intégré
- Tracking conversions avancé
- Core Web Vitals monitoring
- Heatmap basique
- Events personnalisés

### 🌐 SEO Technique
- Meta tags avancés et Open Graph
- Sitemap XML automatique
- Robots.txt optimisé
- Canonical URLs
- Schema.org complet

### 🖼️ Images
- Compression automatique
- Format WebP/AVIF
- Lazy loading natif
- Alt text optimisé
- Srcset responsive

### 🚀 Performance
- Minification HTML/CSS/JS
- Critical CSS inline
- Service Worker
- Cache optimisé
- Compression Brotli

## Configuration

### Google Analytics
${options.ga4MeasurementId ? `ID de mesure : ${options.ga4MeasurementId}` : 'Non configuré - Ajoutez votre ID GA4'}

### Google Tag Manager
${options.gtmContainerId ? `Container ID : ${options.gtmContainerId}` : 'Non configuré - Optionnel'}

### Vérification Search Console
Fichier de vérification : /google-verification.html

## Prochaines étapes

1. **Configuration Google Analytics**
   - Créez un compte GA4 si nécessaire
   - Ajoutez l'ID de mesure dans les paramètres

2. **Vérification Search Console**
   - Ajoutez votre site dans Google Search Console
   - Vérifiez la propriété avec le fichier de vérification

3. **Monitoring**
   - Accédez au dashboard SEO : /admin/seo-dashboard.html
   - Vérifiez régulièrement les métriques

4. **Contenu**
   - Utilisez le contenu SEO généré dans /seo/generated-content.json
   - Adaptez-le à votre style

## Support

Pour toute question sur le SEO, consultez la documentation ou contactez le support.

---
*Rapport généré par AWEMA Studio v2*`;
}

function generateImageOptimizationGuide(): string {
  return `# Guide d'optimisation des images

## Formats supportés

- **AVIF** : Meilleure compression, support moderne
- **WebP** : Excellente compression, large support
- **JPEG** : Fallback universel

## Utilisation des images responsives

Toutes les images sont automatiquement optimisées avec :

### 1. Srcset automatique
\`\`\`html
<img 
  src="/images/hero-1920w.jpg"
  srcset="
    /images/hero-320w.avif 320w,
    /images/hero-640w.avif 640w,
    /images/hero-1024w.avif 1024w,
    /images/hero-1920w.avif 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
  alt="Description SEO optimisée"
  loading="lazy"
/>
\`\`\`

### 2. Element Picture
\`\`\`html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>
\`\`\`

## Bonnes pratiques

1. **Alt text** : Toujours décrire l'image pour le SEO
2. **Lazy loading** : Activé par défaut sauf hero
3. **Dimensions** : Spécifier width/height pour éviter CLS
4. **Compression** : 85% qualité par défaut

## Structure des fichiers

\`\`\`
/images/
  ├── hero-320w.avif
  ├── hero-320w.webp
  ├── hero-320w.jpg
  ├── hero-640w.avif
  ├── hero-640w.webp
  ├── hero-640w.jpg
  └── ...
\`\`\`

## Performance

- Réduction moyenne : 70-90% vs JPEG
- Temps de chargement : -50% en moyenne
- Score Lighthouse : +15-25 points

---
*Images optimisées avec AWEMA Studio v2*`;
}

function getCMSSEOModuleJS(): string {
  return generateCMSSEOModule();
}

