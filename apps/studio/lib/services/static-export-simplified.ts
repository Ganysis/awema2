import { renderToString } from 'react-dom/server';
import React from 'react';
import type { EditorBlock, Page, Theme } from '@/lib/store/editor-store';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';

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
      css: exportData.css
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
          css: exportData.css
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
      content: `User-agent: *\nAllow: /\n\nSitemap: /sitemap.xml`
    });

    const sitemap = generateSitemap(pages, businessInfo.domain);
    exportData.additionalFiles.push({
      path: 'sitemap.xml',
      content: sitemap
    });

    return exportData;
  }
}

// Fonctions utilitaires
function generateThemeCSS(theme: Theme): string {
  const { colors = {}, typography = {}, spacing = {} } = theme;
  
  return `
:root {
  /* Colors */
  --color-primary: ${colors.primary || '#3B82F6'};
  --color-secondary: ${colors.secondary || '#8B5CF6'};
  --color-accent: ${colors.accent || '#F59E0B'};
  --color-background: ${colors.background || '#FFFFFF'};
  --color-surface: ${colors.surface || '#F9FAFB'};
  --color-text: ${colors.text || '#1F2937'};
  --color-text-secondary: ${colors.textSecondary || '#6B7280'};
  --color-border: ${colors.border || '#E5E7EB'};
  --color-success: ${colors.success || '#10B981'};
  --color-warning: ${colors.warning || '#F59E0B'};
  --color-error: ${colors.error || '#EF4444'};
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
}): string {
  const { page, theme, businessInfo, projectName, globalHeader, globalFooter, css } = options;
  
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>${page.meta?.title || projectName}</title>
    <meta name="description" content="${page.meta?.description || `Site web de ${projectName}`}">
    <meta name="keywords" content="${page.meta?.keywords?.join(', ') || ''}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${page.meta?.title || projectName}">
    <meta property="og:description" content="${page.meta?.description || `Site web de ${projectName}`}">
    <meta property="og:type" content="website">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <!-- CSS -->
    <style>${css}</style>
    
    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="${theme.colors?.primary || '#3B82F6'}">
</head>
<body>
    ${globalHeader ? renderBlock(globalHeader) : ''}
    
    <main>
        ${page.blocks.map(block => renderBlock(block)).join('\n')}
    </main>
    
    ${globalFooter ? renderBlock(globalFooter) : ''}
    
    <script src="/assets/js/main.js" defer></script>
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
    // Appeler la fonction de rendu avec les props du bloc
    const rendered = renderFn(block.props || {}, []);
    
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