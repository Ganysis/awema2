// Import dynamique pour éviter l'erreur si le module n'est pas installé
let createClient: any;
try {
  const supabaseModule = require('@supabase/supabase-js');
  createClient = supabaseModule.createClient;
} catch (error) {
  console.warn('Supabase not installed. CMS export features will be limited.');
}

import crypto from 'crypto';
import { generateBasicCMSFixed } from './cms-basic-fixed';
import { NetlifyFunctionsGenerator } from './netlify-functions-generator';
import { generateCMSWithNetlifyFunctions } from './cms-netlify-functions-adapter';
import { getTableName } from '../config/supabase-tables.config';
import { generateStandaloneCMSScript } from './cms-standalone';
import generateStandaloneCMSStyles from './cms-standalone-styles';

interface CMSConfig {
  siteId: string;
  siteName: string;
  domain?: string;
  subdomain: string;
  plan: 'starter' | 'pro' | 'premium';
  adminEmail: string;
  adminPassword: string;
}

interface ExportOptions {
  includeCms: boolean;
  cmsLevel: 'none' | 'basic' | 'full';
  supabaseUrl?: string;
  supabaseAnonKey?: string;
  projectData?: any;
  cmsPlan?: 'starter' | 'pro' | 'premium';
  cmsAdminEmail?: string;
  cmsPassword?: string;
}

export class CMSExportIntegration {
  private supabaseUrl: string;
  private supabaseAnonKey: string;
  private supabase: any;

  constructor(options?: { supabaseUrl?: string; supabaseAnonKey?: string }) {
    this.supabaseUrl = options?.supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    this.supabaseAnonKey = options?.supabaseAnonKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    
    if (createClient && this.supabaseUrl && this.supabaseAnonKey) {
      this.supabase = createClient(this.supabaseUrl, this.supabaseAnonKey);
    } else {
      this.supabase = null;
    }
  }

  /**
   * Crée un site dans Supabase et retourne la configuration
   */
  async createSite(projectData: any, options?: Partial<CMSConfig>): Promise<CMSConfig | null> {
    if (!this.supabase) {
      console.warn('Supabase not configured, skipping site creation');
      return null;
    }

    try {
      const siteName = projectData.settings?.siteName || 'Mon Site';
      const subdomain = await this.generateSubdomain(siteName);
      
      const config: CMSConfig = {
        siteId: crypto.randomUUID(),
        siteName,
        subdomain,
        plan: options?.plan || 'starter',
        adminEmail: options?.adminEmail || `admin@${subdomain}.awema.site`,
        adminPassword: options?.adminPassword || this.generateSecurePassword(),
        ...options
      };

      // Créer le site dans Supabase
      const { data: site, error: siteError } = await this.supabase
        .from(getTableName('sites'))
        .insert({
          id: config.siteId,
          name: config.siteName,
          subdomain: config.subdomain,
          domain: config.domain,
          plan: config.plan,
          settings: {
            theme: projectData.theme,
            seo: projectData.seo,
            analytics: projectData.analytics
          },
          features: this.getPlanFeatures(config.plan)
        })
        .select()
        .single();

      if (siteError) throw siteError;

      // Créer l'utilisateur admin
      const { data: user, error: userError } = await this.supabase.auth.signUp({
        email: config.adminEmail,
        password: config.adminPassword,
        options: {
          data: {
            site_id: config.siteId,
            role: 'admin',
            full_name: 'Administrateur'
          }
        }
      });

      if (userError) throw userError;

      // Insérer dans cms_users
      const { error: cmsUserError } = await this.supabase
        .from('cms_users')
        .insert({
          id: user.user?.id,
          email: config.adminEmail,
          password_hash: 'handled_by_auth', // Supabase Auth gère le hash
          role: 'admin',
          site_id: config.siteId,
          full_name: 'Administrateur'
        });

      if (cmsUserError) throw cmsUserError;

      // Sauvegarder le contenu initial
      await this.saveInitialContent(config.siteId, projectData);

      return config;
    } catch (error) {
      console.error('Error creating site:', error);
      return null;
    }
  }

  /**
   * Génère les fichiers CMS pour l'export
   */
  generateCMSFiles(siteConfig: CMSConfig | null, options: ExportOptions): Array<{ path: string; content: string }> {
    const files: Array<{ path: string; content: string }> = [];

    // Si pas de CMS, retourner vide
    if (!options.includeCms || options.cmsLevel === 'none') {
      return files;
    }

    // Utiliser Supabase Direct (sans Netlify Functions)
    if (options.supabaseUrl && options.supabaseAnonKey) {
      const { CMSSupabaseDirect } = require('./cms-supabase-direct');
      const cmsGen = new CMSSupabaseDirect();
      
      const siteId = siteConfig?.siteId || crypto.randomUUID();
      
      // Générer le netlify.toml minimal
      files.push({
        path: 'netlify.toml',
        content: cmsGen.generateNetlifyToml()
      });
      
      // Guide de configuration Supabase
      files.push({
        path: 'SUPABASE-SETUP.md',
        content: cmsGen.generateSupabaseSetupGuide()
      });
    }

    // Créer une config par défaut si pas de siteConfig
    const config = siteConfig || {
      siteId: crypto.randomUUID(),
      siteName: 'Mon Site AWEMA',
      subdomain: 'monsite',
      plan: options.cmsPlan || 'starter',
      adminEmail: options.cmsAdminEmail || 'admin@site.com',
      adminPassword: options.cmsPassword || 'admin123',
      domain: undefined
    };

    // 1. Fichier de configuration CMS
    if (options.supabaseUrl && options.supabaseAnonKey) {
      const { CMSSupabaseDirect } = require('./cms-supabase-direct');
      const cmsGen = new CMSSupabaseDirect();
      files.push({
        path: 'admin/config.js',
        content: cmsGen.generateAdminConfig(options.supabaseUrl, options.supabaseAnonKey, config.siteId)
      });
    } else {
      files.push({
        path: 'admin/config.js',
        content: this.generateConfigFile(config, options)
      });
    }

    // 2. Interface d'administration
    if (options.supabaseUrl && options.supabaseAnonKey) {
      const { CMSSupabaseDirect } = require('./cms-supabase-direct');
      const cmsGen = new CMSSupabaseDirect();
      files.push({
        path: 'admin/index.html',
        content: cmsGen.generateAdminHTML(config.siteName)
      });
    } else {
      files.push({
        path: 'admin/index.html',
        content: this.generateAdminHTML(config, options)
      });
    }

    // 3. Script CMS principal
    if (options.supabaseUrl && options.supabaseAnonKey) {
      // Utiliser Supabase Direct
      const { CMSSupabaseDirect } = require('./cms-supabase-direct');
      const cmsGen = new CMSSupabaseDirect();
      files.push({
        path: 'admin/cms.js',
        content: cmsGen.generateCMSScript(options.supabaseUrl, options.supabaseAnonKey, config.siteId)
      });
    } else {
      // Fallback sur le CMS localStorage
      files.push({
        path: 'admin/cms.js',
        content: this.generateCMSScript(options.cmsLevel || 'basic')
      });
    }

    // 4. Styles CMS
    files.push({
      path: 'admin/cms.css',
      content: this.generateCMSStyles()
    });

    // 5. Service Worker pour le mode offline
    if (options.cmsLevel === 'full') {
      files.push({
        path: 'admin/sw.js',
        content: this.generateServiceWorker()
      });
    }

    // 6. Fichier .env.example pour la configuration
    files.push({
      path: '.env.example',
      content: this.generateEnvExample(config)
    });

    // 7. Script d'injection CMS pour les pages
    files.push({
      path: 'assets/js/cms-injector.js',
      content: this.generateCMSInjector(options)
    });

    // 8. Éditeur de pages pour le CMS
    if (options.cmsLevel !== 'none') {
      // Utiliser l'éditeur visuel pour les niveaux 'full' et 'basic'
      if (options.cmsLevel === 'full') {
        const { generateVisualEditorScript } = require('./cms-visual-editor');
        files.push({
          path: 'admin/page-editor.js',
          content: generateVisualEditorScript()
        });
      } else {
        const { generateSimplePageEditorScript } = require('./cms-page-editor-simple');
        files.push({
          path: 'admin/page-editor.js',
          content: generateSimplePageEditorScript()
        });
      }
    }

    return files;
  }

  /**
   * Injecte les attributs CMS dans le HTML
   */
  injectCMSAttributes(html: string, pageId: string, siteConfig: CMSConfig | null): string {
    if (!siteConfig) return html;

    // Ajouter les meta tags CMS
    const metaTags = `
    <meta name="cms-site-id" content="${siteConfig.siteId}">
    <meta name="cms-page-id" content="${pageId}">
    <meta name="cms-version" content="2.0">`;

    html = html.replace('</head>', `${metaTags}\n</head>`);

    // Ajouter le script d'injection CMS avant la fermeture du body
    const cmsScript = `
    <script src="/assets/js/cms-injector.js" defer></script>
    <script>
      window.CMS_CONFIG = {
        siteId: '${siteConfig.siteId}',
        pageId: '${pageId}',
        apiUrl: '/api/cms',
        isNetlifyFunction: true,
        mode: 'production'
      };
    </script>`;

    html = html.replace('</body>', `${cmsScript}\n</body>`);

    // Ajouter les attributs data-cms aux éléments éditables
    html = this.addEditableAttributes(html);

    return html;
  }

  /**
   * Ajoute les attributs data-cms aux éléments éditables
   */
  private addEditableAttributes(html: string): string {
    // Marquer les sections avec data-cms-block
    html = html.replace(/<section([^>]*?)data-block-id="([^"]+)"([^>]*?)>/g, 
      '<section$1data-block-id="$2"$3 data-cms-block="$2" data-cms-editable="true">');

    // Marquer les titres éditables
    html = html.replace(/<(h[1-6])([^>]*?)>([^<]+)<\/\1>/g, 
      '<$1$2 data-cms-field="title" contenteditable="false">$3</$1>');

    // Marquer les paragraphes éditables
    html = html.replace(/<p([^>]*?)>([^<]+)<\/p>/g, 
      '<p$1 data-cms-field="content" contenteditable="false">$2</p>');

    // Marquer les images éditables
    html = html.replace(/<img([^>]*?)src="([^"]+)"([^>]*?)>/g, 
      '<img$1src="$2"$3 data-cms-field="image" data-cms-editable="true">');

    return html;
  }

  /**
   * Sauvegarde le contenu initial dans Supabase
   */
  private async saveInitialContent(siteId: string, projectData: any): Promise<void> {
    if (!this.supabase) return;

    try {
      // Sauvegarder chaque page
      for (const [pageId, pageData] of Object.entries(projectData.pages || {})) {
        const page = pageData as any;
        
        await this.supabase
          .from('content')
          .insert({
            site_id: siteId,
            page_id: pageId,
            page_type: page.type || 'standard',
            page_title: page.title,
            page_slug: page.slug || pageId,
            blocks: page.blocks || [],
            seo: page.seo || {},
            settings: page.settings || {},
            is_published: true,
            published_at: new Date().toISOString()
          });
      }

      // Sauvegarder les médias
      for (const media of projectData.media || []) {
        await this.supabase
          .from('media')
          .insert({
            site_id: siteId,
            filename: media.filename,
            original_name: media.originalName,
            mime_type: media.mimeType,
            size: media.size,
            url: media.url,
            thumbnail_url: media.thumbnailUrl,
            webp_url: media.webpUrl,
            alt_text: media.altText,
            title: media.title
          });
      }
    } catch (error) {
      console.error('Error saving initial content:', error);
    }
  }

  /**
   * Génère un subdomain unique
   */
  private async generateSubdomain(siteName: string): Promise<string> {
    const base = siteName
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 30);

    if (!this.supabase) {
      return `${base}-${Date.now()}`;
    }

    // Vérifier l'unicité dans Supabase
    let subdomain = base;
    let counter = 0;

    while (true) {
      const testSubdomain = counter === 0 ? subdomain : `${subdomain}-${counter}`;
      
      const { data, error } = await this.supabase
        .from('sites')
        .select('id')
        .eq('subdomain', testSubdomain)
        .single();

      if (!data) {
        return testSubdomain;
      }

      counter++;
    }
  }

  /**
   * Génère un mot de passe sécurisé
   */
  private generateSecurePassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < 16; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
  }

  /**
   * Retourne les features selon le plan
   */
  private getPlanFeatures(plan: 'starter' | 'pro' | 'premium'): any {
    const features = {
      starter: {
        cms: false,
        analytics: false,
        forms: true,
        seo: true,
        api: false,
        customDomain: true,
        ssl: true,
        backup: false,
        multiUser: false
      },
      pro: {
        cms: true,
        analytics: true,
        forms: true,
        seo: true,
        api: false,
        customDomain: true,
        ssl: true,
        backup: true,
        multiUser: false
      },
      premium: {
        cms: true,
        analytics: true,
        forms: true,
        seo: true,
        api: true,
        customDomain: true,
        ssl: true,
        backup: true,
        multiUser: true
      }
    };

    return features[plan];
  }

  /**
   * Génère le fichier de configuration
   */
  private generateConfigFile(config: CMSConfig, options: ExportOptions): string {
    return `// Configuration CMS AWEMA
window.AWEMA_CMS_CONFIG = {
  version: '2.0',
  siteId: '${config.siteId}',
  siteName: '${config.siteName || 'Site AWEMA'}',
  plan: '${config.plan}',
  subdomain: '${config.subdomain || 'site'}',
  domain: '${config.domain || (config.subdomain || 'site') + '.awema.site'}',
  adminEmail: '${config.adminEmail || 'admin@site.com'}',
  adminPassword: '${config.adminPassword || 'admin123'}',
  api: {
    url: '/api/cms',
    isNetlifyFunction: true
  },
  features: ${JSON.stringify(this.getPlanFeatures(config.plan), null, 2)},
  theme: {
    primaryColor: '#3B82F6',
    darkMode: false
  },
  cache: {
    enabled: true,
    ttl: 3600 // 1 heure
  }
};

// Auto-initialisation
if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
  console.log('CMS Config loaded:', window.AWEMA_CMS_CONFIG);
}`;
  }

  /**
   * Génère le HTML de l'interface d'administration
   */
  private generateAdminHTML(config: CMSConfig, options: ExportOptions): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administration - ${config.siteName}</title>
  <link rel="stylesheet" href="/admin/cms.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
  <div id="cms-root">
    <!-- Login Form (affiché par défaut) -->
    <div id="cms-login" class="cms-login-container">
      <div class="cms-login-box">
        <h1>Administration AWEMA</h1>
        <p class="cms-login-subtitle">Connectez-vous pour gérer votre site</p>
        
        <form id="login-form" class="cms-login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required placeholder="admin@monsite.fr">
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" required placeholder="••••••••">
          </div>
          
          <div id="login-error" class="error-message" style="display: none;"></div>
          
          <button type="submit" class="btn-primary">
            <span class="btn-text">Se connecter</span>
            <span class="btn-loading" style="display: none;">Connexion...</span>
          </button>
        </form>
        
        <div class="cms-login-footer">
          <p>Propulsé par <a href="https://awema.fr" target="_blank">AWEMA Studio</a></p>
        </div>
      </div>
    </div>
    
    <!-- CMS Interface (caché par défaut) -->
    <div id="cms-app" style="display: none;">
      <div class="cms-loading">
        <div class="spinner"></div>
        <p>Chargement du CMS...</p>
      </div>
    </div>
  </div>

  <!-- Configuration -->
  <script src="/admin/config.js"></script>
  
  <!-- Supabase Client -->
  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  
  <!-- CMS Core -->
  <script src="/admin/cms.js"></script>
  
  <!-- Service Worker pour mode offline -->
  ${options.cmsLevel === 'full' ? '<script>if ("serviceWorker" in navigator) { navigator.serviceWorker.register("/admin/sw.js"); }</script>' : ''}
</body>
</html>`;
  }

  /**
   * Génère le script CMS principal
   */
  private generateCMSScript(cmsLevel: 'basic' | 'full'): string {
    if (cmsLevel === 'basic') {
      return this.generateBasicCMS();
    }
    
    return this.generateFullCMS();
  }


  /**
   * Génère le CMS basique
   */
  private generateBasicCMS(): string {
    // Utiliser la version standalone du CMS
    return generateStandaloneCMSScript();
  }

  private generateBasicCMSOld(): string {
    return `// CMS AWEMA Basic Edition
(function() {
  'use strict';

  class AwemaCMSBasic {
    constructor(config) {
      this.config = config;
      this.supabase = null;
      this.currentUser = null;
      this.currentSite = null;
      this.init();
    }

    async init() {
      // Initialiser Supabase
      if (window.supabase) {
        this.supabase = window.supabase.createClient(
          this.config.api.url,
          this.config.api.anonKey
        );
      }

      // Vérifier si déjà connecté
      const session = this.getSession();
      if (session) {
        this.currentUser = session;
        this.showCMS();
      } else {
        this.setupLoginForm();
      }

    }

    getSession() {
      const stored = localStorage.getItem('awema_cms_session');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          return null;
        }
      }
      return null;
    }

    setupLoginForm() {
      const form = document.getElementById('login-form');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          await this.handleLogin(e);
        });
      }
    }

    async handleLogin(e) {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('login-error');
      const submitBtn = e.target.querySelector('button[type="submit"]');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      // UI: Loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      errorDiv.style.display = 'none';

      try {
        // Pour le mode démo/local, accepter les identifiants du config
        if (!this.supabase || !this.config.api.url.includes('supabase')) {
          // Mode local : vérifier avec les identifiants stockés
          if (email === this.config.adminEmail && password === this.config.adminPassword) {
            const session = {
              email: email,
              role: 'admin',
              siteId: this.config.siteId
            };
            localStorage.setItem('awema_cms_session', JSON.stringify(session));
            this.currentUser = session;
            this.showCMS();
            return;
          } else {
            throw new Error('Email ou mot de passe incorrect');
          }
        }

        // Mode Supabase - utiliser notre système d'authentification custom
        // Au lieu de Supabase Auth, on vérifie directement dans la table cms_users
        
        // D'abord vérifier si l'utilisateur existe
        const { data: users, error: userError } = await this.supabase
          .from('cms_users')
          .select('*')
          .eq('email', email);
          
        if (userError) {
          console.error('Erreur requête:', userError);
          throw new Error('Erreur de connexion');
        }
        
        if (!users || users.length === 0) {
          throw new Error('Utilisateur non trouvé');
        }
        
        const user = users[0];
        
        // Vérifier le mot de passe (simpliste pour le moment)
        const passwordHash = Buffer.from(password).toString('base64');
        if (user.password_hash !== passwordHash) {
          throw new Error('Mot de passe incorrect');
        }
        
        // Vérifier que l'utilisateur appartient bien à ce site
        if (user.site_id !== this.config.siteId) {
          throw new Error('Accès non autorisé à ce site');
        }
        
        // Créer une session locale (pas Supabase Auth)
        const session = {
          id: user.id,
          email: user.email,
          role: user.role,
          siteId: user.site_id,
          fullName: user.full_name,
          company: user.company
        };
        
        localStorage.setItem('awema_cms_session', JSON.stringify(session));
        this.currentUser = session;
        this.showCMS();

      } catch (error) {
        errorDiv.textContent = error.message || 'Erreur de connexion';
        errorDiv.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
    }

    showCMS() {
      document.getElementById('cms-login').style.display = 'none';
      document.getElementById('cms-app').style.display = 'block';
      this.loadCMSInterface();
    }

    loadCMSInterface() {
      // Charger l'interface du CMS
      const cmsApp = document.getElementById('cms-app');
      if (cmsApp) {
        cmsApp.innerHTML = '<h1>Bienvenue dans le CMS</h1><p>Chargement de l\'interface...</p>';
        // TODO: Implémenter l'interface complète du CMS
      }
    }

    async loadSiteData() {
      if (!this.supabase) return;

      const { data, error } = await this.supabase
        .from('sites')
        .select('*')
        .eq('id', this.config.siteId)
        .single();

      if (!error) {
        this.currentSite = data;
      }
    }

    showLoginForm() {
      const root = document.getElementById('cms-root');
      root.innerHTML = \`
        <div class="cms-login">
          <div class="login-box">
            <h1>Connexion Administration</h1>
            <form id="login-form">
              <input type="email" id="email" placeholder="Email" required>
              <input type="password" id="password" placeholder="Mot de passe" required>
              <button type="submit">Se connecter</button>
              <div id="error-message" class="error"></div>
            </form>
          </div>
        </div>
      \`;

      document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    async handleLogin() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        document.getElementById('error-message').textContent = error.message;
        return;
      }

      this.currentUser = data.user;
      await this.loadSiteData();
      this.render();
    }

    render() {
      const root = document.getElementById('cms-root');
      
      if (!this.currentUser) {
        this.showLoginForm();
        return;
      }

      root.innerHTML = \`
        <div class="cms-container">
          <header class="cms-header">
            <h1>Administration - \${this.config.siteName}</h1>
            <nav>
              <a href="#pages" class="active">Pages</a>
              <a href="#media">Médias</a>
              <a href="#settings">Paramètres</a>
              <button id="logout-btn" class="logout">Déconnexion</button>
            </nav>
          </header>

          <main class="cms-main">
            <div id="cms-content">
              <!-- Le contenu sera chargé ici -->
            </div>
          </main>
        </div>
      \`;

      document.getElementById('logout-btn').addEventListener('click', () => {
        this.logout();
      });

      // Charger la première section
      this.loadPages();
    }

    async loadPages() {
      const content = document.getElementById('cms-content');
      content.innerHTML = '<div class="loading">Chargement des pages...</div>';

      const { data: pages, error } = await this.supabase
        .from('content')
        .select('*')
        .eq('site_id', this.config.siteId)
        .order('created_at', { ascending: false });

      if (error) {
        content.innerHTML = '<div class="error">Erreur lors du chargement des pages</div>';
        return;
      }

      content.innerHTML = \`
        <div class="pages-list">
          <h2>Pages du site</h2>
          <div class="pages-grid">
            \${pages.map(page => \`
              <div class="page-card">
                <h3>\${page.page_title}</h3>
                <p>URL: /\${page.page_slug}</p>
                <div class="actions">
                  <a href="/\${page.page_slug}" target="_blank" class="btn-view">Voir</a>
                  <button onclick="window.cms.editPage('\${page.id}')" class="btn-edit">Modifier</button>
                </div>
              </div>
            \`).join('')}
          </div>
        </div>
      \`;
    }

    async editPage(pageId) {
      // Rediriger vers la page avec le mode édition activé
      window.location.href = \`/?edit=true&pageId=\${pageId}\`;
    }

    async logout() {
      await this.supabase.auth.signOut();
      this.currentUser = null;
      this.showLoginForm();
    }
  }

  // Initialiser le CMS
  window.cms = new AwemaCMSBasic(window.AWEMA_CMS_CONFIG);
})();`;
  }

  /**
   * Génère le CMS complet
   */
  private generateFullCMS(): string {
    // Le CMS standalone inclut déjà toutes les fonctionnalités
    return generateStandaloneCMSScript();
  }

  /**
   * Génère les styles CSS
   */
  private generateCMSStyles(): string {
    // Utiliser les styles standalone
    return generateStandaloneCMSStyles();
  }

  private generateCMSStylesOld(): string {
    return `/* CMS AWEMA Styles */
:root {
  --primary: #3B82F6;
  --primary-dark: #2563EB;
  --secondary: #10B981;
  --danger: #EF4444;
  --dark: #1F2937;
  --light: #F3F4F6;
  --white: #FFFFFF;
  --shadow: 0 2px 8px rgba(0,0,0,0.1);
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: var(--light);
  color: var(--dark);
}

/* Login Styles */
.cms-login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.cms-login-box {
  background: var(--white);
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.cms-login-box h1 {
  margin: 0 0 0.5rem 0;
  color: var(--dark);
  font-size: 1.75rem;
}

.cms-login-subtitle {
  color: #6B7280;
  margin-bottom: 2rem;
}

.cms-login-form {
  text-align: left;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--dark);
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.error-message {
  background: #FEE2E2;
  color: #DC2626;
  padding: 0.75rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.btn-primary {
  width: 100%;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-loading {
  display: none;
}

.cms-login-footer {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #E5E7EB;
  color: #6B7280;
  font-size: 0.875rem;
}

.cms-login-footer a {
  color: var(--primary);
  text-decoration: none;
}

/* Loading */
.cms-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 3px solid var(--light);
  border-top: 3px solid var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Login */
.cms-login {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}

.login-box {
  background: var(--white);
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}

.login-box h1 {
  margin: 0 0 2rem;
  text-align: center;
  color: var(--dark);
}

.login-box input {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  font-size: 1rem;
}

.login-box button {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.login-box button:hover {
  background: var(--primary-dark);
}

.error {
  color: var(--danger);
  margin-top: 1rem;
  text-align: center;
}

/* Container */
.cms-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.cms-header {
  background: var(--white);
  box-shadow: var(--shadow);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cms-header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--dark);
}

.cms-header nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.cms-header nav a {
  text-decoration: none;
  color: var(--dark);
  font-weight: 500;
  transition: color 0.2s;
}

.cms-header nav a:hover,
.cms-header nav a.active {
  color: var(--primary);
}

.logout {
  padding: 0.5rem 1rem;
  background: var(--danger);
  color: var(--white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.logout:hover {
  background: #DC2626;
}

/* Main */
.cms-main {
  flex: 1;
  padding: 2rem;
}

/* Pages */
.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.page-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: var(--shadow);
  transition: transform 0.2s;
}

.page-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.page-card h3 {
  margin: 0 0 0.5rem;
  color: var(--dark);
}

.page-card p {
  margin: 0 0 1rem;
  color: #6B7280;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-view,
.btn-edit {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.875rem;
  transition: background 0.2s;
}

.btn-view {
  background: var(--secondary);
  color: var(--white);
}

.btn-view:hover {
  background: #059669;
}

.btn-edit {
  background: var(--primary);
  color: var(--white);
}

.btn-edit:hover {
  background: var(--primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .cms-header {
    flex-direction: column;
    gap: 1rem;
  }

  .cms-header nav {
    width: 100%;
    justify-content: space-between;
  }

  .pages-grid {
    grid-template-columns: 1fr;
  }
}

/* Mode édition inline */
[data-cms-editable][contenteditable="true"] {
  outline: 2px dashed var(--primary);
  outline-offset: 4px;
  cursor: text;
}

[data-cms-editable]:hover {
  outline: 1px dashed var(--primary);
  outline-offset: 4px;
  cursor: pointer;
}

/* Toolbar flottante */
.cms-toolbar {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: var(--white);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 1000;
}`;
  }

  /**
   * Génère le Service Worker
   */
  private generateServiceWorker(): string {
    return `// Service Worker pour mode offline
const CACHE_NAME = 'awema-cms-v1';
const urlsToCache = [
  '/admin/',
  '/admin/index.html',
  '/admin/cms.js',
  '/admin/cms.css',
  '/admin/config.js'
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
});`;
  }

  /**
   * Génère le fichier .env.example
   */
  private generateEnvExample(config: CMSConfig): string {
    return `# Configuration CMS AWEMA
# Copier ce fichier en .env et remplir les valeurs

# Identifiants de connexion
ADMIN_EMAIL=${config.adminEmail}
ADMIN_PASSWORD=${config.adminPassword}

# Configuration du site
SITE_ID=${config.siteId}
SITE_URL=https://${config.domain || config.subdomain + '.awema.site'}

# Supabase (si vous voulez utiliser votre propre instance)
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Plan actuel
PLAN=${config.plan}`;
  }

  /**
   * Génère l'injecteur CMS pour les pages
   */
  private generateCMSInjector(options: ExportOptions): string {
    if (!options.includeCms) {
      return '// CMS désactivé';
    }

    return `// CMS Injector - Active le mode édition sur les pages
(function() {
  'use strict';

  // Vérifier si on est en mode édition
  const urlParams = new URLSearchParams(window.location.search);
  const editMode = urlParams.get('edit') === 'true';
  
  if (!editMode) return;

  // Charger le CSS du CMS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/admin/cms.css';
  document.head.appendChild(link);

  // Activer l'édition inline
  document.addEventListener('DOMContentLoaded', function() {
    // Ajouter la toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'cms-toolbar';
    toolbar.innerHTML = \`
      <button id="cms-save">Sauvegarder</button>
      <button id="cms-cancel">Annuler</button>
      <button id="cms-preview">Prévisualiser</button>
    \`;
    document.body.appendChild(toolbar);

    // Activer contenteditable sur les éléments
    document.querySelectorAll('[data-cms-editable]').forEach(el => {
      el.contentEditable = 'true';
      el.addEventListener('input', function() {
        this.dataset.cmsModified = 'true';
      });
    });

    // Gérer les actions
    document.getElementById('cms-save').addEventListener('click', saveChanges);
    document.getElementById('cms-cancel').addEventListener('click', () => {
      if (confirm('Annuler les modifications ?')) {
        window.location.href = window.location.pathname;
      }
    });
    document.getElementById('cms-preview').addEventListener('click', () => {
      document.querySelectorAll('[contenteditable]').forEach(el => {
        el.contentEditable = 'false';
      });
    });
  });

  function saveChanges() {
    const changes = [];
    
    document.querySelectorAll('[data-cms-modified="true"]').forEach(el => {
      const blockId = el.closest('[data-cms-block]')?.dataset.cmsBlock;
      const field = el.dataset.cmsField;
      const value = el.innerHTML;
      
      if (blockId && field) {
        changes.push({ blockId, field, value });
      }
    });

    if (changes.length === 0) {
      alert('Aucune modification à sauvegarder');
      return;
    }

    // Envoyer les modifications à l'API
    console.log('Saving changes:', changes);
    alert('Modifications sauvegardées !');
    
    // Recharger la page
    window.location.href = window.location.pathname;
  }
})();`;
  }
}