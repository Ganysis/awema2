/**
 * CMS API Service
 * Handles content management for deployed sites
 */

import { createHash } from 'crypto';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

export interface CMSContent {
  hero: {
    title: string;
    subtitle: string;
    backgroundImage?: string;
  };
  about: {
    title: string;
    description: string;
  };
  services: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  contact: {
    phone: string;
    email: string;
    address: string;
    hours: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  [key: string]: any;
}

export interface CMSConfig {
  password: string;
  contentPath: string;
  secretKey: string;
}

export class CMSApi {
  private config: CMSConfig;
  private sessions: Map<string, { expires: number }> = new Map();

  constructor(config: Partial<CMSConfig> = {}) {
    this.config = {
      password: config.password || process.env.CMS_PASSWORD || 'admin123',
      contentPath: config.contentPath || './content.json',
      secretKey: config.secretKey || process.env.CMS_SECRET || 'your-secret-key-here'
    };
  }

  /**
   * Generate authentication token
   */
  private generateToken(sessionId: string): string {
    const hash = createHash('sha256');
    hash.update(`${sessionId}:${this.config.secretKey}`);
    return hash.digest('hex');
  }

  /**
   * Verify authentication token
   */
  public verifyToken(token: string): boolean {
    // Check if token exists in sessions and is not expired
    for (const [sessionId, session] of this.sessions.entries()) {
      if (this.generateToken(sessionId) === token) {
        if (Date.now() < session.expires) {
          // Extend session
          session.expires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
          return true;
        } else {
          // Remove expired session
          this.sessions.delete(sessionId);
        }
      }
    }
    return false;
  }

  /**
   * Login with password
   */
  public login(password: string): { success: boolean; token?: string; error?: string } {
    if (password === this.config.password) {
      const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const token = this.generateToken(sessionId);
      
      // Store session
      this.sessions.set(sessionId, {
        expires: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      });

      return { success: true, token };
    }
    
    return { success: false, error: 'Invalid password' };
  }

  /**
   * Load content from file
   */
  public async loadContent(): Promise<CMSContent> {
    try {
      const data = await readFile(this.config.contentPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // Return default content if file doesn't exist
      return this.getDefaultContent();
    }
  }

  /**
   * Save content to file
   */
  public async saveContent(content: Partial<CMSContent>): Promise<{ success: boolean; error?: string }> {
    try {
      // Load existing content
      const existingContent = await this.loadContent();
      
      // Merge with new content
      const updatedContent = { ...existingContent, ...content };
      
      // Save to file
      await writeFile(
        this.config.contentPath,
        JSON.stringify(updatedContent, null, 2),
        'utf-8'
      );

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save content' 
      };
    }
  }

  /**
   * Save specific section
   */
  public async saveSection(section: string, data: any): Promise<{ success: boolean; error?: string }> {
    try {
      const content = await this.loadContent();
      content[section] = data;
      
      await writeFile(
        this.config.contentPath,
        JSON.stringify(content, null, 2),
        'utf-8'
      );

      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to save section' 
      };
    }
  }

  /**
   * Get default content structure
   */
  private getDefaultContent(): CMSContent {
    return {
      hero: {
        title: 'Bienvenue sur notre site',
        subtitle: 'Votre partenaire de confiance',
        backgroundImage: ''
      },
      about: {
        title: 'À propos de nous',
        description: '<p>Nous sommes une entreprise dédiée à fournir les meilleurs services à nos clients.</p>'
      },
      services: [
        {
          title: 'Service 1',
          description: 'Description du service 1',
          icon: '🔧'
        },
        {
          title: 'Service 2', 
          description: 'Description du service 2',
          icon: '🏠'
        }
      ],
      contact: {
        phone: '01 23 45 67 89',
        email: 'contact@exemple.com',
        address: '123 Rue Example, 75000 Paris',
        hours: 'Lun-Ven: 9h-18h, Sam: 9h-12h'
      },
      seo: {
        title: 'Accueil - Mon Site',
        description: 'Description de votre site pour les moteurs de recherche',
        keywords: 'mot-clé1, mot-clé2, mot-clé3'
      }
    };
  }

  /**
   * Clean up expired sessions
   */
  public cleanupSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now >= session.expires) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

/**
 * Express middleware for CMS API
 */
export function createCMSMiddleware(config?: Partial<CMSConfig>) {
  const cms = new CMSApi(config);

  // Clean up sessions periodically
  setInterval(() => cms.cleanupSessions(), 60 * 60 * 1000); // Every hour

  return {
    // Login endpoint
    login: async (req: any, res: any) => {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ error: 'Password required' });
      }

      const result = cms.login(password);
      
      if (result.success) {
        res.json({ token: result.token });
      } else {
        res.status(401).json({ error: result.error });
      }
    },

    // Verify token endpoint
    verify: async (req: any, res: any) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token) {
        return res.status(401).json({ error: 'No token provided' });
      }

      if (cms.verifyToken(token)) {
        res.json({ valid: true });
      } else {
        res.status(401).json({ error: 'Invalid token' });
      }
    },

    // Get content endpoint
    getContent: async (req: any, res: any) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token || !cms.verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      try {
        const content = await cms.loadContent();
        res.json(content);
      } catch (error) {
        res.status(500).json({ error: 'Failed to load content' });
      }
    },

    // Save content endpoint
    saveContent: async (req: any, res: any) => {
      const token = req.headers.authorization?.replace('Bearer ', '');
      
      if (!token || !cms.verifyToken(token)) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      const { section } = req.params;
      const data = req.body;

      try {
        let result;
        if (section && section !== 'all') {
          result = await cms.saveSection(section, data[section]);
        } else {
          result = await cms.saveContent(data);
        }

        if (result.success) {
          res.json({ success: true });
        } else {
          res.status(500).json({ error: result.error });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to save content' });
      }
    }
  };
}

/**
 * Standalone CMS server implementation
 * Can be used for simple Node.js deployments
 */
export function createStandaloneCMSServer(port = 3001, config?: Partial<CMSConfig>) {
  const http = require('http');
  const url = require('url');
  const cms = new CMSApi(config);

  const server = http.createServer(async (req: any, res: any) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    // Parse JSON body
    let body = '';
    req.on('data', (chunk: any) => body += chunk);
    
    req.on('end', async () => {
      let data: any = {};
      try {
        if (body) data = JSON.parse(body);
      } catch (e) {}

      // Route handling
      if (pathname === '/api/cms/login' && req.method === 'POST') {
        const result = cms.login(data.password);
        if (result.success) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ token: result.token }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: result.error }));
        }
      } 
      else if (pathname === '/api/cms/verify' && req.method === 'POST') {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token && cms.verifyToken(token)) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ valid: true }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid token' }));
        }
      }
      else if (pathname === '/api/cms/content' && req.method === 'GET') {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token && cms.verifyToken(token)) {
          const content = await cms.loadContent();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(content));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
      }
      else if (pathname.startsWith('/api/cms/content/') && req.method === 'POST') {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (token && cms.verifyToken(token)) {
          const section = pathname.split('/').pop();
          const result = section === 'all' 
            ? await cms.saveContent(data)
            : await cms.saveSection(section!, data[section!]);
          
          if (result.success) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true }));
          } else {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: result.error }));
          }
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Unauthorized' }));
        }
      }
      else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
      }
    });
  });

  server.listen(port, () => {
    console.log(`CMS API server running on port ${port}`);
  });

  return server;
}

/**
 * Generate CMS integration code for static sites
 */
export function generateCMSIntegration(apiUrl = '/api/cms'): string {
  return `
<!-- CMS Integration -->
<script>
(function() {
  // Load content from CMS
  fetch('${apiUrl}/content')
    .then(response => response.json())
    .then(content => {
      // Update hero section
      if (content.hero) {
        const heroTitle = document.querySelector('[data-cms="hero.title"]');
        if (heroTitle) heroTitle.textContent = content.hero.title;
        
        const heroSubtitle = document.querySelector('[data-cms="hero.subtitle"]');
        if (heroSubtitle) heroSubtitle.textContent = content.hero.subtitle;
        
        const heroImage = document.querySelector('[data-cms="hero.backgroundImage"]');
        if (heroImage && content.hero.backgroundImage) {
          heroImage.style.backgroundImage = 'url(' + content.hero.backgroundImage + ')';
        }
      }

      // Update about section
      if (content.about) {
        const aboutTitle = document.querySelector('[data-cms="about.title"]');
        if (aboutTitle) aboutTitle.textContent = content.about.title;
        
        const aboutDesc = document.querySelector('[data-cms="about.description"]');
        if (aboutDesc) aboutDesc.innerHTML = content.about.description;
      }

      // Update services
      if (content.services) {
        const servicesContainer = document.querySelector('[data-cms="services"]');
        if (servicesContainer) {
          servicesContainer.innerHTML = content.services.map(service => \`
            <div class="service-item">
              <span class="service-icon">\${service.icon}</span>
              <h3>\${service.title}</h3>
              <p>\${service.description}</p>
            </div>
          \`).join('');
        }
      }

      // Update contact info
      if (content.contact) {
        Object.keys(content.contact).forEach(key => {
          const element = document.querySelector(\`[data-cms="contact.\${key}"]\`);
          if (element) element.textContent = content.contact[key];
        });
      }

      // Update SEO
      if (content.seo) {
        if (content.seo.title) document.title = content.seo.title;
        
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && content.seo.description) {
          metaDesc.content = content.seo.description;
        }
        
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && content.seo.keywords) {
          metaKeywords.content = content.seo.keywords;
        }
      }
    })
    .catch(error => {
      console.warn('CMS content not available, using default content');
    });
})();
</script>
`;
}

/**
 * Export utilities for integrating CMS into static export
 */
export const CMSExportUtils = {
  /**
   * Add CMS data attributes to HTML elements
   */
  addCMSAttributes(html: string): string {
    // This would parse the HTML and add data-cms attributes
    // For now, return as-is
    return html;
  },

  /**
   * Generate admin panel files
   */
  async generateAdminFiles(outputDir: string): Promise<void> {
    const { readFile } = await import('fs/promises');
    const { join, dirname } = await import('path');
    const { fileURLToPath } = await import('url');
    const { copyFile, mkdir } = await import('fs/promises');

    // Ensure admin directory exists
    const adminDir = join(outputDir, 'admin');
    await mkdir(adminDir, { recursive: true });

    // Copy admin template
    const currentDir = dirname(fileURLToPath(import.meta.url));
    await copyFile(
      join(currentDir, 'admin-template.html'),
      join(adminDir, 'index.html')
    );

    // Copy CMS editor script
    await copyFile(
      join(currentDir, 'cms-editor.js'),
      join(adminDir, 'cms-editor.js')
    );
  },

  /**
   * Generate simple Node.js server file for CMS
   */
  generateServerFile(): string {
    return `
const { createStandaloneCMSServer } = require('./cms-api');

// Start CMS server
const port = process.env.PORT || 3001;
createStandaloneCMSServer(port, {
  password: process.env.CMS_PASSWORD || 'admin123',
  contentPath: './content.json'
});

console.log(\`CMS server running on port \${port}\`);
console.log(\`Admin panel: http://localhost:\${port}/admin\`);
`;
  }
};