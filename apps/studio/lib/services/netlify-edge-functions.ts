/**
 * Générateur de Netlify Edge Functions
 * Plus rapide et plus fiable que les Functions classiques
 */

export class NetlifyEdgeFunctionsGenerator {
  /**
   * Génère le fichier de configuration Netlify
   */
  generateNetlifyToml(): string {
    return `# Configuration Netlify
[build]
  publish = "."

# Edge Functions pour le CMS
[[edge_functions]]
  path = "/api/cms/*"
  function = "cms-handler"

# Headers de sécurité
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Strict-Transport-Security = "max-age=31536000; includeSubDomains"

[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    Cache-Control = "no-store, no-cache, must-revalidate"`;
  }

  /**
   * Génère l'Edge Function principale
   */
  generateEdgeFunction(siteId: string, supabaseUrl: string, supabaseKey: string): string {
    return `// netlify/edge-functions/cms-handler.ts
import { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "${supabaseUrl}";
const SUPABASE_KEY = "${supabaseKey}";
const SITE_ID = "${siteId}";

export default async (request: Request, context: Context) => {
  const url = new URL(request.url);
  const path = url.pathname.replace("/api/cms/", "");
  
  // Headers de réponse (pas de CORS nécessaire car même domaine)
  const headers = {
    "Content-Type": "application/json",
    "Cache-Control": "no-store"
  };

  // OPTIONS pour preflight (au cas où)
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 200, headers });
  }

  try {
    const body = await request.json().catch(() => ({}));
    
    switch (path) {
      case "auth/login":
        return handleLogin(body, headers);
      
      case "content":
        return handleContent(request.method, body, headers);
      
      case "media":
        return handleMedia(request.method, body, headers);
      
      case "forms":
        return handleForms(request.method, body, headers);
      
      default:
        return new Response(
          JSON.stringify({ error: "Route not found" }),
          { status: 404, headers }
        );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers }
    );
  }
};

async function handleLogin(body: any, headers: any) {
  const { email, password } = body;
  
  // Appel RPC Supabase pour vérifier le mot de passe
  const response = await fetch(\`\${SUPABASE_URL}/rest/v1/rpc/verify_user_password\`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": \`Bearer \${SUPABASE_KEY}\`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_email: email,
      user_password: password,
      user_site_id: SITE_ID
    })
  });

  if (!response.ok) {
    const error = await response.text();
    return new Response(
      JSON.stringify({ error: "Authentication failed", details: error }),
      { status: 401, headers }
    );
  }

  const users = await response.json();
  if (!users || users.length === 0) {
    return new Response(
      JSON.stringify({ error: "Invalid credentials" }),
      { status: 401, headers }
    );
  }

  // Créer une session
  const user = users[0];
  const session = {
    user,
    token: crypto.randomUUID(),
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };

  return new Response(
    JSON.stringify({ success: true, session }),
    { status: 200, headers }
  );
}

async function handleContent(method: string, body: any, headers: any) {
  const endpoint = \`\${SUPABASE_URL}/rest/v1/content\`;
  
  switch (method) {
    case "GET":
      const getUrl = \`\${endpoint}?site_id=eq.\${SITE_ID}&order=created_at.desc\`;
      const getResponse = await fetch(getUrl, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": \`Bearer \${SUPABASE_KEY}\`
        }
      });
      const content = await getResponse.json();
      return new Response(JSON.stringify(content), { headers });
    
    case "POST":
      const postResponse = await fetch(endpoint, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": \`Bearer \${SUPABASE_KEY}\`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify({ ...body, site_id: SITE_ID })
      });
      const created = await postResponse.json();
      return new Response(JSON.stringify(created), { headers });
    
    case "PUT":
      const putUrl = \`\${endpoint}?id=eq.\${body.id}&site_id=eq.\${SITE_ID}\`;
      const putResponse = await fetch(putUrl, {
        method: "PATCH",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": \`Bearer \${SUPABASE_KEY}\`,
          "Content-Type": "application/json",
          "Prefer": "return=representation"
        },
        body: JSON.stringify(body.data)
      });
      const updated = await putResponse.json();
      return new Response(JSON.stringify(updated), { headers });
    
    default:
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers }
      );
  }
}

async function handleMedia(method: string, body: any, headers: any) {
  // Similaire à handleContent mais pour la table media
  const endpoint = \`\${SUPABASE_URL}/rest/v1/media\`;
  
  if (method === "GET") {
    const response = await fetch(
      \`\${endpoint}?site_id=eq.\${SITE_ID}&order=created_at.desc\`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": \`Bearer \${SUPABASE_KEY}\`
        }
      }
    );
    const media = await response.json();
    return new Response(JSON.stringify(media), { headers });
  }
  
  // POST pour enregistrer les métadonnées d'un média uploadé
  if (method === "POST") {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_KEY,
        "Authorization": \`Bearer \${SUPABASE_KEY}\`,
        "Content-Type": "application/json",
        "Prefer": "return=representation"
      },
      body: JSON.stringify({ ...body, site_id: SITE_ID })
    });
    const created = await response.json();
    return new Response(JSON.stringify(created), { headers });
  }
  
  return new Response(
    JSON.stringify({ error: "Method not allowed" }),
    { status: 405, headers }
  );
}

async function handleForms(method: string, body: any, headers: any) {
  if (method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers }
    );
  }
  
  // Sauvegarder une soumission de formulaire
  const response = await fetch(\`\${SUPABASE_URL}/rest/v1/form_submissions\`, {
    method: "POST",
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": \`Bearer \${SUPABASE_KEY}\`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    },
    body: JSON.stringify({
      site_id: SITE_ID,
      form_id: body.form_id || "contact",
      data: body.data,
      metadata: {
        timestamp: new Date().toISOString(),
        ip: body.ip || "unknown",
        user_agent: body.user_agent || "unknown"
      }
    })
  });
  
  const result = await response.json();
  return new Response(JSON.stringify(result), { headers });
}`;
  }

  /**
   * Génère le CMS adapté pour Edge Functions
   */
  generateCMSForEdgeFunctions(): string {
    return `// CMS AWEMA avec Edge Functions
(function() {
  'use strict';

  class AwemaCMSEdge {
    constructor(config) {
      this.config = config;
      this.apiBase = '/api/cms';
      this.currentUser = null;
      this.currentSite = null;
      this.init();
    }

    async init() {
      console.log('CMS Edge Functions initialization...');
      
      // Vérifier si déjà connecté
      const session = this.getSession();
      if (session && session.user) {
        this.currentUser = session.user;
        this.showCMS();
      } else {
        this.setupLoginForm();
      }
    }

    getSession() {
      const stored = localStorage.getItem('awema_cms_session');
      if (stored) {
        try {
          const session = JSON.parse(stored);
          if (session.expires && new Date(session.expires) > new Date()) {
            return session;
          }
        } catch (e) {}
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
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (errorDiv) errorDiv.style.display = 'none';

      try {
        // Tentative de connexion locale d'abord
        if (email === this.config.adminEmail && password === this.config.adminPassword) {
          const session = {
            user: {
              id: 'local-admin',
              email: email,
              role: 'admin',
              site_id: this.config.siteId,
              full_name: 'Administrateur Local'
            },
            token: 'local-' + Date.now(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          };
          
          localStorage.setItem('awema_cms_session', JSON.stringify(session));
          this.currentUser = session.user;
          this.showCMS();
          return;
        }

        // Sinon, utiliser l'Edge Function
        const response = await fetch(this.apiBase + '/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Connexion échouée');
        }

        if (result.session) {
          localStorage.setItem('awema_cms_session', JSON.stringify(result.session));
          this.currentUser = result.session.user;
          this.showCMS();
        }

      } catch (error) {
        console.error('Login error:', error);
        if (errorDiv) {
          errorDiv.textContent = error.message || 'Erreur de connexion';
          errorDiv.style.display = 'block';
        }
      } finally {
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'inline';
        if (btnLoading) btnLoading.style.display = 'none';
      }
    }

    showCMS() {
      const loginDiv = document.getElementById('cms-login');
      const appDiv = document.getElementById('cms-app');
      
      if (loginDiv) loginDiv.style.display = 'none';
      if (appDiv) {
        appDiv.style.display = 'block';
        this.loadCMSInterface();
      }
    }

    loadCMSInterface() {
      const appDiv = document.getElementById('cms-app');
      if (!appDiv) return;

      appDiv.innerHTML = \`
        <div class="cms-wrapper">
          <header class="cms-header">
            <div class="cms-logo">
              <h1>CMS AWEMA</h1>
              <span class="cms-version">Edge Functions</span>
            </div>
            <nav class="cms-nav">
              <button class="nav-btn active" data-section="dashboard">
                <i class="fas fa-home"></i> Dashboard
              </button>
              <button class="nav-btn" data-section="content">
                <i class="fas fa-file-alt"></i> Contenu
              </button>
              <button class="nav-btn" data-section="media">
                <i class="fas fa-images"></i> Médias
              </button>
              <button class="nav-btn" data-section="forms">
                <i class="fas fa-envelope"></i> Formulaires
              </button>
            </nav>
            <div class="cms-user">
              <span>\${this.currentUser.email}</span>
              <button onclick="window.cms.logout()" class="btn-logout">
                <i class="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </header>
          
          <main id="cms-content" class="cms-content">
            <!-- Le contenu sera chargé ici -->
          </main>
        </div>
      \`;

      this.setupNavigation();
      this.loadSection('dashboard');
    }

    setupNavigation() {
      const navButtons = document.querySelectorAll('.nav-btn');
      navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          navButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const section = btn.dataset.section;
          this.loadSection(section);
        });
      });
    }

    async loadSection(section) {
      const content = document.getElementById('cms-content');
      if (!content) return;

      content.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';

      try {
        switch(section) {
          case 'dashboard':
            await this.loadDashboard();
            break;
          case 'content':
            await this.loadContent();
            break;
          case 'media':
            await this.loadMedia();
            break;
          case 'forms':
            await this.loadForms();
            break;
          default:
            content.innerHTML = '<div class="error">Section non trouvée</div>';
        }
      } catch (error) {
        console.error('Error loading section:', error);
        content.innerHTML = '<div class="error">Erreur: ' + error.message + '</div>';
      }
    }

    async loadDashboard() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="dashboard">
          <h2>Tableau de bord</h2>
          <div class="info-card">
            <p><i class="fas fa-check-circle"></i> CMS connecté via Edge Functions</p>
            <p><i class="fas fa-shield-alt"></i> Connexion sécurisée</p>
            <p><i class="fas fa-bolt"></i> Performance optimale</p>
          </div>
          
          <div class="quick-actions">
            <h3>Actions rapides</h3>
            <div class="actions-grid">
              <button class="action-btn" onclick="window.open('/', '_blank')">
                <i class="fas fa-external-link-alt"></i>
                Voir le site
              </button>
              <button class="action-btn" onclick="window.cms.loadSection('content')">
                <i class="fas fa-edit"></i>
                Gérer le contenu
              </button>
            </div>
          </div>
        </div>
      \`;
    }

    async loadContent() {
      const content = document.getElementById('cms-content');
      content.innerHTML = '<div class="loading">Chargement du contenu...</div>';
      
      try {
        const data = await this.request('/content');
        
        content.innerHTML = \`
          <div class="content-section">
            <h2>Gestion du contenu</h2>
            <div class="content-list">
              \${data.length ? data.map(item => \`
                <div class="content-item">
                  <h3>\${item.page_title || 'Sans titre'}</h3>
                  <p>Modifié le: \${new Date(item.updated_at).toLocaleDateString()}</p>
                </div>
              \`).join('') : '<p>Aucun contenu trouvé</p>'}
            </div>
          </div>
        \`;
      } catch (error) {
        content.innerHTML = '<div class="error">Erreur de chargement: ' + error.message + '</div>';
      }
    }

    async loadMedia() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="media-section">
          <h2>Gestion des médias</h2>
          <p><i class="fas fa-info-circle"></i> Fonctionnalité disponible dans la version Pro</p>
        </div>
      \`;
    }

    async loadForms() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="forms-section">
          <h2>Soumissions de formulaires</h2>
          <p><i class="fas fa-info-circle"></i> Aucune soumission pour le moment</p>
        </div>
      \`;
    }

    async request(endpoint, options = {}) {
      const url = this.apiBase + endpoint;
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Erreur réseau' }));
        throw new Error(error.error || 'Requête échouée');
      }

      return response.json();
    }

    logout() {
      localStorage.removeItem('awema_cms_session');
      window.location.reload();
    }
  }

  // Initialiser le CMS
  if (window.AWEMA_CMS_CONFIG) {
    window.cms = new AwemaCMSEdge(window.AWEMA_CMS_CONFIG);
  }
})();`;
  }

  /**
   * Génère tous les fichiers nécessaires
   */
  generateFiles(siteId: string, supabaseUrl: string, supabaseKey: string): Array<{path: string, content: string}> {
    return [
      {
        path: 'netlify.toml',
        content: this.generateNetlifyToml()
      },
      {
        path: 'netlify/edge-functions/cms-handler.ts',
        content: this.generateEdgeFunction(siteId, supabaseUrl, supabaseKey)
      },
      {
        path: 'admin/cms-edge.js',
        content: this.generateCMSForEdgeFunctions()
      }
    ];
  }
}