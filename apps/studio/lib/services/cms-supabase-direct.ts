/**
 * CMS avec Supabase Direct (sans Netlify Functions)
 * Solution qui évite les problèmes de CORS en utilisant directement l'API Supabase
 */

export class CMSSupabaseDirect {
  
  /**
   * Génère le fichier de configuration netlify.toml minimal
   */
  generateNetlifyToml(): string {
    return `[build]
  publish = "."

# Headers de sécurité
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Cache pour les assets
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"`;
  }

  /**
   * Génère le script CMS qui utilise Supabase directement
   */
  generateCMSScript(supabaseUrl: string, supabaseAnonKey: string, siteId: string): string {
    return `// CMS AWEMA - Version Supabase Direct
(function() {
  'use strict';

  // Configuration
  const SUPABASE_URL = '${supabaseUrl}';
  const SUPABASE_ANON_KEY = '${supabaseAnonKey}';
  const SITE_ID = '${siteId}';

  class CMSSupabaseDirect {
    constructor() {
      this.supabase = null;
      this.currentUser = null;
      this.currentContent = null;
      this.init();
    }

    async init() {
      // Charger Supabase SDK
      await this.loadSupabaseSDK();
      
      // Initialiser le client
      this.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      
      // Vérifier la session
      const session = this.getStoredSession();
      if (session && session.expires > Date.now()) {
        this.currentUser = session.user;
        this.showCMS();
      } else {
        this.showLogin();
      }
    }

    async loadSupabaseSDK() {
      if (window.supabase) return;
      
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
        script.onload = resolve;
        document.head.appendChild(script);
      });
    }

    getStoredSession() {
      const stored = localStorage.getItem('cms_session');
      if (!stored) return null;
      
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }

    saveSession(user) {
      const session = {
        user: user,
        expires: Date.now() + (24 * 60 * 60 * 1000) // 24h
      };
      localStorage.setItem('cms_session', JSON.stringify(session));
    }

    showLogin() {
      document.getElementById('cms-login').style.display = 'block';
      document.getElementById('cms-app').style.display = 'none';
      
      // Gérer le formulaire
      const form = document.getElementById('login-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.handleLogin();
      });
    }

    async handleLogin() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('login-error');
      
      try {
        // Pour la démo, accepter admin@admin.fr
        if (email === 'admin@admin.fr' && password === 'admin') {
          const user = {
            id: 'demo-admin',
            email: email,
            site_id: SITE_ID,
            role: 'admin'
          };
          
          this.currentUser = user;
          this.saveSession(user);
          this.showCMS();
          return;
        }
        
        // Sinon, vérifier dans Supabase
        const { data: users, error } = await this.supabase
          .from('cms_users')
          .select('*')
          .eq('email', email)
          .eq('site_id', SITE_ID)
          .limit(1);
        
        if (error || !users || users.length === 0) {
          throw new Error('Email ou mot de passe incorrect');
        }
        
        const user = users[0];
        // TODO: Vérifier le mot de passe avec bcrypt
        
        this.currentUser = user;
        this.saveSession(user);
        this.showCMS();
        
      } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.style.display = 'block';
      }
    }

    showCMS() {
      document.getElementById('cms-login').style.display = 'none';
      document.getElementById('cms-app').style.display = 'block';
      
      // Charger l'éditeur de pages
      this.loadPageEditor();
    }

    async loadPageEditor() {
      const container = document.getElementById('cms-content');
      
      // Charger le contenu depuis Supabase
      try {
        const { data: content, error } = await this.supabase
          .from('cms_content')
          .select('*')
          .eq('site_id', SITE_ID)
          .order('page_slug');
        
        if (!error && content && content.length > 0) {
          this.currentContent = content;
        } else {
          // Utiliser le contenu local
          this.currentContent = this.getLocalContent();
        }
        
        // Lancer l'éditeur de pages
        if (window.pageEditor) {
          window.pageEditor.init();
        } else {
          // Charger le script de l'éditeur
          const script = document.createElement('script');
          script.src = '/admin/page-editor.js';
          document.body.appendChild(script);
        }
        
      } catch (error) {
        console.error('Erreur chargement contenu:', error);
        // Fallback sur le contenu local
        this.currentContent = this.getLocalContent();
      }
    }

    getLocalContent() {
      const stored = localStorage.getItem('awema_site_data');
      if (!stored) return [];
      
      try {
        const data = JSON.parse(stored);
        return data.pages || [];
      } catch {
        return [];
      }
    }

    async saveContent(pageId, content) {
      try {
        // Sauvegarder dans Supabase
        const { error } = await this.supabase
          .from('cms_content')
          .upsert({
            id: pageId,
            site_id: SITE_ID,
            ...content,
            updated_at: new Date().toISOString()
          });
        
        if (error) throw error;
        
        return { success: true };
        
      } catch (error) {
        console.error('Erreur sauvegarde:', error);
        // Fallback sur localStorage
        this.saveLocalContent(pageId, content);
        return { success: true, local: true };
      }
    }

    saveLocalContent(pageId, content) {
      let siteData = {};
      const stored = localStorage.getItem('awema_site_data');
      if (stored) {
        siteData = JSON.parse(stored);
      }
      
      if (!siteData.pages) siteData.pages = [];
      
      const pageIndex = siteData.pages.findIndex(p => p.id === pageId);
      if (pageIndex >= 0) {
        siteData.pages[pageIndex] = { ...siteData.pages[pageIndex], ...content };
      } else {
        siteData.pages.push({ id: pageId, ...content });
      }
      
      localStorage.setItem('awema_site_data', JSON.stringify(siteData));
    }

    logout() {
      localStorage.removeItem('cms_session');
      this.currentUser = null;
      window.location.reload();
    }
  }

  // API globale pour l'éditeur de pages
  window.CMS_API = {
    loadContent: async function() {
      return window.cms.currentContent || [];
    },
    
    saveContent: async function(pageId, content) {
      return window.cms.saveContent(pageId, content);
    },
    
    logout: function() {
      window.cms.logout();
    }
  };

  // Initialiser le CMS
  window.cms = new CMSSupabaseDirect();
})();`;
  }

  /**
   * Génère la configuration admin qui se connecte directement à Supabase
   */
  generateAdminConfig(supabaseUrl: string, supabaseAnonKey: string, siteId: string): string {
    return `// Configuration CMS Direct
window.CMS_CONFIG = {
  mode: 'supabase-direct',
  supabase: {
    url: '${supabaseUrl}',
    anonKey: '${supabaseAnonKey}'
  },
  siteId: '${siteId}',
  features: {
    pageEditor: true,
    mediaUpload: true,
    autoSave: true,
    offlineMode: true
  }
};`;
  }

  /**
   * Génère le HTML de l'interface admin
   */
  generateAdminHTML(siteName: string): string {
    return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Administration - ${siteName}</title>
  <link rel="stylesheet" href="/admin/cms.css">
</head>
<body>
  <div id="cms-root">
    <!-- Login -->
    <div id="cms-login" class="cms-login-container">
      <div class="cms-login-box">
        <h1>Administration AWEMA</h1>
        <p class="cms-login-subtitle">Connectez-vous pour gérer votre site</p>
        
        <form id="login-form" class="cms-login-form">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required 
                   placeholder="admin@monsite.fr" value="admin@admin.fr">
          </div>
          
          <div class="form-group">
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password" required 
                   placeholder="••••••••" value="admin">
          </div>
          
          <div id="login-error" class="error-message" style="display: none;"></div>
          
          <button type="submit" class="btn-primary">
            Se connecter
          </button>
        </form>
        
        <div class="cms-login-footer">
          <p>Propulsé par <a href="https://awema.fr" target="_blank">AWEMA Studio</a></p>
        </div>
      </div>
    </div>
    
    <!-- CMS App -->
    <div id="cms-app" style="display: none;">
      <header class="cms-header">
        <h1>Éditeur de Pages</h1>
        <button onclick="window.CMS_API.logout()" class="btn-logout">Déconnexion</button>
      </header>
      
      <main id="cms-content" class="cms-main">
        <!-- L'éditeur de pages sera chargé ici -->
      </main>
    </div>
  </div>

  <!-- Configuration -->
  <script src="/admin/config.js"></script>
  
  <!-- CMS Core (Supabase Direct) -->
  <script src="/admin/cms.js"></script>
  
  <!-- Page Editor sera chargé dynamiquement -->
</body>
</html>`;
  }

  /**
   * Instructions pour configurer Supabase
   */
  generateSupabaseSetupGuide(): string {
    return `# Configuration Supabase pour le CMS

## 1. Configuration CORS dans Supabase

Allez dans votre projet Supabase > Settings > API > CORS et ajoutez :

- Votre domaine de production : https://monentreprise.com
- Votre sous-domaine Netlify : https://monsite.netlify.app
- Localhost pour le dev : http://localhost:3000
- Ou utilisez * pour autoriser tous les domaines (moins sécurisé)

## 2. Tables requises

Les tables cms_* doivent exister (déjà créées par nos scripts).

## 3. RLS (Row Level Security)

Pour la production, activez RLS sur les tables cms_* avec des policies appropriées.

## 4. Clés API

- URL Supabase : ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://votre-projet.supabase.co'}
- Clé Anon : Visible dans Settings > API

## 5. Test

1. Déployez votre site
2. Allez sur /admin
3. Connectez-vous avec admin@admin.fr / admin
4. L'éditeur devrait se charger sans erreur CORS

Cette solution évite complètement les Netlify Functions et fonctionne directement avec Supabase !`;
  }
}