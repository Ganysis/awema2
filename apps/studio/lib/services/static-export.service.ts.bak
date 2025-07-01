import { minify as minifyHtml } from 'html-minifier-terser';
import { transform } from '@swc/core';
import { optimize } from 'svgo';
import sharp from 'sharp';
import { gzip, brotliCompress } from 'zlib';
import { promisify } from 'util';
import { writeFile, mkdir, copyFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import type { Client } from '@/types/client';
import type { EditorBlock } from '../store/editor-store';
import { generateCMSIntegration, CMSExportUtils } from './cms';

const gzipAsync = promisify(gzip);
const brotliAsync = promisify(brotliCompress);

export interface ExportOptions {
  outputDir: string;
  client: Client;
  blocks: EditorBlock[];
  pages: Map<string, EditorBlock[]>;
  theme: any;
  includeAdmin?: boolean;
  includeCMS?: boolean;
  cmsPassword?: string;
  optimizeImages?: boolean;
  generateServiceWorker?: boolean;
}

export interface ExportResult {
  success: boolean;
  outputPath: string;
  files: string[];
  performance: {
    totalSize: number;
    compressedSize: number;
    imageOptimization: number;
    estimatedLoadTime: number;
  };
  seo: {
    score: number;
    issues: string[];
  };
}

export class StaticExportService {
  private criticalCSS: Set<string> = new Set();
  private usedCSS: Set<string> = new Set();
  private totalSize = 0;
  private compressedSize = 0;
  
  async exportSite(options: ExportOptions): Promise<ExportResult> {
    const { outputDir, client, blocks, pages, theme, includeAdmin = true, includeCMS = true, cmsPassword, optimizeImages = true } = options;
    const files: string[] = [];
    
    try {
      // 1. Créer la structure de dossiers
      await this.createDirectoryStructure(outputDir);
      
      // 2. Générer les pages HTML optimisées
      const indexHtml = await this.generateOptimizedHTML('home', blocks, client, theme);
      await this.writeCompressedFile(join(outputDir, 'index.html'), indexHtml);
      files.push('index.html');
      
      // 3. Générer toutes les pages
      for (const [slug, pageBlocks] of pages) {
        const pageHtml = await this.generateOptimizedHTML(slug, pageBlocks, client, theme);
        const pagePath = slug.includes('/') ? slug : `${slug}.html`;
        await this.writeCompressedFile(join(outputDir, pagePath), pageHtml);
        files.push(pagePath);
      }
      
      // 4. Générer les assets optimisés
      const { css, js } = await this.generateOptimizedAssets(blocks, pages, theme);
      await this.writeCompressedFile(join(outputDir, 'assets/css/main.css'), css);
      await this.writeCompressedFile(join(outputDir, 'assets/js/main.js'), js);
      files.push('assets/css/main.css', 'assets/js/main.js');
      
      // 5. Optimiser et copier les images
      if (optimizeImages) {
        await this.optimizeAndCopyImages(client, outputDir);
      }
      
      // 6. Générer les fichiers SEO
      await this.generateSEOFiles(client, pages, outputDir);
      files.push('sitemap.xml', 'robots.txt');
      
      // 7. Générer le service worker
      if (options.generateServiceWorker) {
        const sw = await this.generateServiceWorker(files);
        await this.writeCompressedFile(join(outputDir, 'sw.js'), sw);
        files.push('sw.js');
      }
      
      // 8. Générer l'interface admin si demandé
      if (includeAdmin) {
        await this.generateAdminInterface(outputDir, client);
        files.push('admin/index.html');
      }
      
      // 9. Générer le CMS si demandé
      if (includeCMS) {
        await this.generateCMSFiles(outputDir, client, cmsPassword);
        files.push('admin/index.html', 'admin/cms-editor.js', 'cms-server.js', 'content.json');
      }
      
      // 9. Calculer les métriques de performance
      const performance = {
        totalSize: this.totalSize,
        compressedSize: this.compressedSize,
        imageOptimization: Math.round((1 - this.compressedSize / this.totalSize) * 100),
        estimatedLoadTime: this.estimateLoadTime(this.compressedSize)
      };
      
      // 10. Analyse SEO
      const seo = await this.analyzeSEO(indexHtml, client);
      
      return {
        success: true,
        outputPath: outputDir,
        files,
        performance,
        seo
      };
      
    } catch (error) {
      console.error('Export failed:', error);
      return {
        success: false,
        outputPath: outputDir,
        files,
        performance: {
          totalSize: 0,
          compressedSize: 0,
          imageOptimization: 0,
          estimatedLoadTime: 0
        },
        seo: {
          score: 0,
          issues: ['Export failed']
        }
      };
    }
  }
  
  private async generateOptimizedHTML(
    pageSlug: string,
    blocks: EditorBlock[],
    client: Client,
    theme: any
  ): Promise<string> {
    // Générer le HTML de base
    const html = this.generateBaseHTML(pageSlug, blocks, client, theme);
    
    // Minifier le HTML
    const minified = await minifyHtml(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    });
    
    return minified;
  }
  
  private generateBaseHTML(
    pageSlug: string,
    blocks: EditorBlock[],
    client: Client,
    theme: any
  ): string {
    const isHomePage = pageSlug === 'home';
    const pageTitle = this.generatePageTitle(pageSlug, client);
    const pageDescription = this.generatePageDescription(pageSlug, client);
    const canonicalUrl = `https://${client.domain || 'example.com'}${isHomePage ? '' : `/${pageSlug}`}`;
    
    // Extraire le CSS critique
    const criticalCSS = this.extractCriticalCSS(blocks);
    
    // Générer les données structurées
    const structuredData = this.generateStructuredData(pageSlug, client, blocks);
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <!-- SEO Meta Tags -->
    <title>${pageTitle}</title>
    <meta name="description" content="${pageDescription}">
    <link rel="canonical" href="${canonicalUrl}">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="${pageTitle}">
    <meta property="og:description" content="${pageDescription}">
    <meta property="og:url" content="${canonicalUrl}">
    <meta property="og:image" content="/assets/images/og-image.jpg">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${pageTitle}">
    <meta name="twitter:description" content="${pageDescription}">
    <meta name="twitter:image" content="/assets/images/og-image.jpg">
    
    <!-- Performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://www.google-analytics.com">
    
    <!-- Critical CSS -->
    <style>${criticalCSS}</style>
    
    <!-- Async CSS -->
    <link rel="preload" href="/assets/css/main.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="/assets/css/main.css"></noscript>
    
    <!-- Structured Data -->
    ${structuredData.map(data => `<script type="application/ld+json">${JSON.stringify(data)}</script>`).join('\n    ')}
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <meta name="theme-color" content="${theme.colors?.primary || '#3B82F6'}">
    
    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
<body>
    ${this.renderBlocks(blocks)}
    
    <!-- Deferred JavaScript -->
    <script src="/assets/js/main.js" defer></script>
    
    <!-- Service Worker Registration -->
    <script>
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js');
        });
    }
    </script>
    
    <!-- CMS Integration -->
    ${generateCMSIntegration('/api/cms')}
</body>
</html>`;
  }
  
  private extractCriticalCSS(blocks: EditorBlock[]): string {
    // CSS critique pour le first paint
    return `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #111827; }
      .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
      .hero { min-height: 60vh; display: flex; align-items: center; background: #f3f4f6; }
      h1 { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 1rem; }
      .btn { display: inline-block; padding: 0.75rem 1.5rem; background: var(--primary, #3B82F6); color: white; text-decoration: none; border-radius: 0.375rem; }
    `;
  }
  
  private generateStructuredData(pageSlug: string, client: Client, blocks: EditorBlock[]): any[] {
    const data: any[] = [];
    
    // LocalBusiness (sur toutes les pages)
    data.push({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `https://${client.domain}/#business`,
      "name": client.businessName,
      "image": client.logo || client.photos?.[0],
      "description": client.description,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": client.address,
        "addressLocality": client.city,
        "postalCode": client.postalCode,
        "addressCountry": "FR"
      },
      "telephone": client.phone,
      "email": client.email,
      "url": `https://${client.domain}`,
      "priceRange": "€€",
      "openingHoursSpecification": this.generateOpeningHours(client.schedule),
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": client.testimonials?.length || 10
      }
    });
    
    // Service schema pour les pages services
    if (pageSlug.includes('service')) {
      const service = this.extractServiceFromSlug(pageSlug, client);
      if (service) {
        data.push({
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": service.name,
          "provider": { "@id": `https://${client.domain}/#business` },
          "areaServed": client.interventionCities,
          "description": service.description
        });
      }
    }
    
    // FAQ Schema si bloc FAQ présent
    const faqBlock = blocks.find(b => b.type.includes('faq'));
    if (faqBlock) {
      data.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqBlock.props.questions?.map((q: any) => ({
          "@type": "Question",
          "name": q.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": q.answer
          }
        }))
      });
    }
    
    return data;
  }
  
  private async generateOptimizedAssets(blocks: EditorBlock[], pages: Map<string, EditorBlock[]>, theme: any) {
    // Collecter tout le CSS et JS
    let css = '';
    let js = '';
    
    // CSS du thème
    css += this.generateThemeCSS(theme);
    
    // CSS des blocs
    // TODO: Implémenter la collecte du CSS des blocs
    
    // Minifier le CSS
    const minifiedCSS = css; // TODO: Utiliser un minifier CSS
    
    // Minifier le JS
    const { code: minifiedJS } = await transform(js, {
      minify: true,
      jsc: {
        target: 'es2020',
        minify: {
          compress: true,
          mangle: true
        }
      }
    });
    
    return { css: minifiedCSS, js: minifiedJS || '' };
  }
  
  private generateThemeCSS(theme: any): string {
    return `
      :root {
        --primary: ${theme.colors?.primary || '#3B82F6'};
        --secondary: ${theme.colors?.secondary || '#1E40AF'};
        --text: ${theme.colors?.text || '#111827'};
        --text-secondary: ${theme.colors?.textSecondary || '#6B7280'};
        --background: ${theme.colors?.background || '#FFFFFF'};
        --surface: ${theme.colors?.surface || '#F9FAFB'};
      }
    `;
  }
  
  private async writeCompressedFile(filePath: string, content: string): Promise<void> {
    const dir = join(filePath, '..');
    await mkdir(dir, { recursive: true });
    
    // Écrire le fichier original
    await writeFile(filePath, content);
    this.totalSize += Buffer.byteLength(content);
    
    // Créer versions compressées
    const gzipped = await gzipAsync(content);
    await writeFile(`${filePath}.gz`, gzipped);
    
    const brotli = await brotliAsync(content);
    await writeFile(`${filePath}.br`, brotli);
    
    this.compressedSize += gzipped.length;
  }
  
  private renderBlocks(blocks: EditorBlock[]): string {
    // TODO: Implémenter le rendu complet des blocs
    // Pour l'instant, ajouter les attributs CMS de base
    return blocks.map(block => {
      const cmsAttributes = this.getCMSAttributesForBlock(block);
      return `<div id="${block.id}" class="block-${block.type}" ${cmsAttributes}>
        <!-- ${block.type} content -->
      </div>`;
    }).join('\n');
  }
  
  private getCMSAttributesForBlock(block: EditorBlock): string {
    const cmsMap: Record<string, string> = {
      'hero-centered': 'data-cms-section="hero"',
      'about-text-image': 'data-cms-section="about"',
      'services-grid': 'data-cms-section="services"',
      'contact-form-map': 'data-cms-section="contact"'
    };
    
    return cmsMap[block.type] || '';
  }
  
  private async createDirectoryStructure(outputDir: string): Promise<void> {
    const dirs = [
      outputDir,
      join(outputDir, 'assets'),
      join(outputDir, 'assets/css'),
      join(outputDir, 'assets/js'),
      join(outputDir, 'assets/images'),
      join(outputDir, 'admin'),
      join(outputDir, 'content')
    ];
    
    for (const dir of dirs) {
      await mkdir(dir, { recursive: true });
    }
  }
  
  private generatePageTitle(slug: string, client: Client): string {
    if (slug === 'home') {
      return `${client.businessName} - ${client.slogan || this.getBusinessTypeLabel(client.businessType)} ${client.city}`;
    }
    // TODO: Générer des titres spécifiques par page
    return `${slug.charAt(0).toUpperCase() + slug.slice(1)} - ${client.businessName}`;
  }
  
  private generatePageDescription(slug: string, client: Client): string {
    if (slug === 'home') {
      return `${client.businessName}, votre ${this.getBusinessTypeLabel(client.businessType)} à ${client.city}. ${client.description || 'Devis gratuit, intervention rapide.'}`;
    }
    // TODO: Générer des descriptions spécifiques par page
    return `${client.businessName} - ${slug}`;
  }
  
  private getBusinessTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      electricien: 'électricien',
      plombier: 'plombier',
      menuisier: 'menuisier',
      macon: 'maçon',
      peintre: 'peintre',
      carreleur: 'carreleur'
    };
    return labels[type] || type;
  }
  
  private generateOpeningHours(schedule: any): any[] {
    // TODO: Convertir le schedule en format Schema.org
    return [];
  }
  
  private extractServiceFromSlug(slug: string, client: Client): any {
    // TODO: Extraire le service depuis le slug
    return null;
  }
  
  private estimateLoadTime(size: number): number {
    // Estimation basée sur différentes vitesses de connexion
    const speed3G = 1.6 * 1024 * 1024 / 8; // 1.6 Mbps en bytes/s
    return Math.round((size / speed3G) * 100) / 100;
  }
  
  private async analyzeSEO(html: string, client: Client): Promise<{ score: number; issues: string[] }> {
    const issues: string[] = [];
    let score = 100;
    
    // Vérifications basiques
    if (!html.includes('<title>')) {
      issues.push('Missing title tag');
      score -= 10;
    }
    
    if (!html.includes('meta name="description"')) {
      issues.push('Missing meta description');
      score -= 10;
    }
    
    if (!html.includes('application/ld+json')) {
      issues.push('Missing structured data');
      score -= 15;
    }
    
    return { score, issues };
  }
  
  private async optimizeAndCopyImages(client: Client, outputDir: string): Promise<void> {
    // TODO: Implémenter l'optimisation des images avec sharp
  }
  
  private async generateSEOFiles(client: Client, pages: Map<string, any[]>, outputDir: string): Promise<void> {
    // Générer sitemap.xml
    const sitemap = this.generateSitemap(client, pages);
    await writeFile(join(outputDir, 'sitemap.xml'), sitemap);
    
    // Générer robots.txt
    const robots = `User-agent: *\nAllow: /\n\nSitemap: https://${client.domain || 'example.com'}/sitemap.xml`;
    await writeFile(join(outputDir, 'robots.txt'), robots);
  }
  
  private generateSitemap(client: Client, pages: Map<string, any[]>): string {
    const urls = [''];
    pages.forEach((_, slug) => urls.push(slug));
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://${client.domain || 'example.com'}${url ? `/${url}` : ''}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
  }
  
  private async generateServiceWorker(files: string[]): Promise<string> {
    return `
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/assets/css/main.css',
  '/assets/js/main.js',
  ${files.filter(f => f.endsWith('.html')).map(f => `'/${f}'`).join(',\n  ')}
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
  
  private async generateAdminInterface(outputDir: string, client: Client): Promise<void> {
    // TODO: Générer l'interface admin
    const adminHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Admin - ${client.businessName}</title>
</head>
<body>
  <h1>Interface d'administration</h1>
  <p>En construction...</p>
</body>
</html>`;
    
    await writeFile(join(outputDir, 'admin/index.html'), adminHtml);
  }
  
  private async generateCMSFiles(outputDir: string, client: Client, cmsPassword?: string): Promise<void> {
    const adminDir = join(outputDir, 'admin');
    await mkdir(adminDir, { recursive: true });
    
    // Copy CMS admin template
    const cmsDir = join(dirname(fileURLToPath(import.meta.url)), 'cms');
    await copyFile(
      join(cmsDir, 'admin-template.html'),
      join(adminDir, 'index.html')
    );
    
    // Copy CMS editor script
    await copyFile(
      join(cmsDir, 'cms-editor.js'),
      join(adminDir, 'cms-editor.js')
    );
    
    // Generate initial content.json
    const initialContent = {
      hero: {
        title: client.businessName,
        subtitle: client.slogan || `Votre ${this.getBusinessTypeLabel(client.businessType)} de confiance à ${client.city}`,
        backgroundImage: client.photos?.[0] || ''
      },
      about: {
        title: `À propos de ${client.businessName}`,
        description: `<p>${client.description || `Entreprise spécialisée dans les services de ${this.getBusinessTypeLabel(client.businessType)} à ${client.city} et ses environs.`}</p>`
      },
      services: client.services?.map(service => ({
        title: service.name,
        description: service.description,
        icon: this.getServiceIcon(service.name)
      })) || [],
      contact: {
        phone: client.phone,
        email: client.email,
        address: client.address,
        hours: this.formatSchedule(client.schedule)
      },
      seo: {
        title: `${client.businessName} - ${this.getBusinessTypeLabel(client.businessType)} ${client.city}`,
        description: client.description || `${client.businessName}, votre ${this.getBusinessTypeLabel(client.businessType)} à ${client.city}. Devis gratuit, intervention rapide.`,
        keywords: `${this.getBusinessTypeLabel(client.businessType)}, ${client.city}, ${client.services?.map(s => s.name).join(', ') || ''}`
      }
    };
    
    await writeFile(
      join(outputDir, 'content.json'),
      JSON.stringify(initialContent, null, 2)
    );
    
    // Generate Node.js server file for CMS
    const serverCode = `
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const PORT = process.env.PORT || 3001;
const CMS_PASSWORD = process.env.CMS_PASSWORD || '${cmsPassword || 'admin123'}';
const CONTENT_FILE = path.join(__dirname, 'content.json');

// Simple in-memory session store
const sessions = new Map();

// Serve static files
function serveStaticFile(res, filePath, contentType) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
}

// Parse JSON body
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch {
        resolve({});
      }
    });
  });
}

// Generate token
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Create server
const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  const url = new URL(req.url, \`http://localhost:\${PORT}\`);
  
  // Serve admin panel
  if (url.pathname === '/admin' || url.pathname === '/admin/') {
    serveStaticFile(res, path.join(__dirname, 'admin/index.html'), 'text/html');
  }
  else if (url.pathname === '/admin/cms-editor.js') {
    serveStaticFile(res, path.join(__dirname, 'admin/cms-editor.js'), 'application/javascript');
  }
  // API endpoints
  else if (url.pathname === '/api/cms/login' && req.method === 'POST') {
    const body = await parseBody(req);
    if (body.password === CMS_PASSWORD) {
      const token = generateToken();
      sessions.set(token, { expires: Date.now() + 24 * 60 * 60 * 1000 });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ token }));
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid password' }));
    }
  }
  else if (url.pathname === '/api/cms/verify' && req.method === 'POST') {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token && sessions.has(token)) {
      const session = sessions.get(token);
      if (Date.now() < session.expires) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ valid: true }));
      } else {
        sessions.delete(token);
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Token expired' }));
      }
    } else {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid token' }));
    }
  }
  else if (url.pathname === '/api/cms/content' && req.method === 'GET') {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !sessions.has(token)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    
    fs.readFile(CONTENT_FILE, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Failed to read content' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(data);
      }
    });
  }
  else if (url.pathname.startsWith('/api/cms/content/') && req.method === 'POST') {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token || !sessions.has(token)) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unauthorized' }));
      return;
    }
    
    const section = url.pathname.split('/').pop();
    const body = await parseBody(req);
    
    // Read existing content
    fs.readFile(CONTENT_FILE, 'utf8', (err, data) => {
      let content = {};
      if (!err) {
        try {
          content = JSON.parse(data);
        } catch {}
      }
      
      // Update section
      if (section === 'all') {
        content = { ...content, ...body };
      } else {
        content[section] = body[section];
      }
      
      // Write back
      fs.writeFile(CONTENT_FILE, JSON.stringify(content, null, 2), (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to save content' }));
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true }));
        }
      });
    });
  }
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

// Clean up expired sessions
setInterval(() => {
  const now = Date.now();
  for (const [token, session] of sessions.entries()) {
    if (now >= session.expires) {
      sessions.delete(token);
    }
  }
}, 60 * 60 * 1000);

server.listen(PORT, () => {
  console.log(\`CMS server running on port \${PORT}\`);
  console.log(\`Admin panel: http://localhost:\${PORT}/admin\`);
  console.log(\`Default password: \${CMS_PASSWORD}\`);
});
`;
    
    await writeFile(join(outputDir, 'cms-server.js'), serverCode);
    
    // Generate package.json for the CMS server
    const packageJson = {
      name: `${client.businessName.toLowerCase().replace(/\s+/g, '-')}-cms`,
      version: '1.0.0',
      description: `CMS for ${client.businessName}`,
      main: 'cms-server.js',
      scripts: {
        start: 'node cms-server.js',
        'start:prod': 'NODE_ENV=production node cms-server.js'
      },
      engines: {
        node: '>=14.0.0'
      }
    };
    
    await writeFile(
      join(outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Generate README for CMS usage
    const readme = `# CMS pour ${client.businessName}

## Installation

1. Assurez-vous d'avoir Node.js installé (version 14 ou supérieure)
2. Dans le dossier du site, exécutez : \`npm install\` (si nécessaire)

## Démarrage du CMS

\`\`\`bash
npm start
\`\`\`

Le serveur CMS sera accessible à : http://localhost:3001/admin

## Configuration

- **Port** : Par défaut 3001, modifiable avec la variable d'environnement PORT
- **Mot de passe** : Par défaut "${cmsPassword || 'admin123'}", modifiable avec CMS_PASSWORD

## Utilisation

1. Accédez à http://localhost:3001/admin
2. Connectez-vous avec le mot de passe
3. Modifiez le contenu directement dans l'interface
4. Les modifications sont sauvegardées automatiquement

## Déploiement

Pour déployer sur un serveur :

1. Uploadez tous les fichiers sur votre serveur
2. Installez Node.js sur le serveur
3. Démarrez le serveur CMS avec : \`NODE_ENV=production CMS_PASSWORD=votre-mot-de-passe-securise npm start\`

## Sécurité

- Changez le mot de passe par défaut en production
- Utilisez HTTPS en production
- Limitez l'accès au panneau d'administration par IP si possible
`;
    
    await writeFile(join(outputDir, 'CMS_README.md'), readme);
  }
  
  private getServiceIcon(serviceName: string): string {
    const icons: Record<string, string> = {
      'électricité': '⚡',
      'plomberie': '🔧',
      'chauffage': '🔥',
      'climatisation': '❄️',
      'menuiserie': '🪵',
      'peinture': '🎨',
      'maçonnerie': '🧱',
      'carrelage': '🏠',
      'rénovation': '🏗️',
      'dépannage': '🛠️'
    };
    
    const name = serviceName.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (name.includes(key)) return icon;
    }
    return '🔧';
  }
  
  private formatSchedule(schedule?: any): string {
    if (!schedule) return 'Lun-Ven: 8h-18h, Sam: 9h-12h';
    // TODO: Formater le schedule depuis l'objet
    return 'Lun-Ven: 8h-18h, Sam: 9h-12h';
  }
}

export const staticExportService = new StaticExportService();