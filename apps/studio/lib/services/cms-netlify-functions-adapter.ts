/**
 * Adaptateur CMS pour utiliser les Netlify Functions
 * Remplace les appels directs Supabase par des appels aux functions locales
 */

export function generateCMSWithNetlifyFunctions(): string {
  return `// CMS AWEMA avec Netlify Functions
(function() {
  'use strict';

  class AwemaCMSNetlify {
    constructor(config) {
      this.config = config;
      this.currentUser = null;
      this.apiUrl = config.api.url || '/.netlify/functions/cms-api';
      this.init();
    }

    async init() {
      // Vérifier si on est sur la page admin
      if (!window.location.pathname.startsWith('/admin')) {
        return;
      }

      // Utiliser le formulaire existant plutôt que d'en créer un nouveau
      const existingForm = document.getElementById('login-form');
      if (existingForm && !existingForm.hasAttribute('data-cms-bound')) {
        existingForm.setAttribute('data-cms-bound', 'true');
        existingForm.addEventListener('submit', (e) => {
          e.preventDefault();
          this.handleLogin(e);
        });
      }

      // Vérifier la session existante
      const savedSession = localStorage.getItem('awema_cms_session');
      if (savedSession) {
        try {
          this.currentUser = JSON.parse(savedSession);
          this.showCMS();
        } catch (e) {
          localStorage.removeItem('awema_cms_session');
          // Ne pas créer de nouveau formulaire, utiliser l'existant
        }
      }
    }

    async makeApiCall(action, params = {}) {
      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action,
            ...params,
            site_id: this.config.siteId
          })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.error || 'Erreur API');
        }

        return result.data;
      } catch (error) {
        console.error(\`Erreur API \${action}:\`, error);
        throw error;
      }
    }

    async handleLogin(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('login-error');
      const submitBtn = e.target.querySelector('button[type="submit"]');
      
      // UI Loading
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Connexion...';
      
      try {
        // Mode local si pas de connexion
        if (!navigator.onLine || this.config.api.url === 'local') {
          if (email === this.config.adminEmail && password === this.config.adminPassword) {
            this.currentUser = {
              id: 'local-admin',
              email: email,
              role: 'admin',
              site_id: this.config.siteId,
              full_name: 'Admin Local'
            };
            localStorage.setItem('awema_cms_session', JSON.stringify(this.currentUser));
            this.showCMS();
            return;
          } else {
            throw new Error('Identifiants incorrects');
          }
        }

        // Appel API via Netlify Function
        const authResult = await this.makeApiCall('login', { email, password });
        
        if (!authResult) {
          throw new Error('Identifiants invalides');
        }

        // Extraire l'utilisateur du résultat
        const user = authResult.user || authResult;
        
        // Sauvegarder la session
        this.currentUser = {
          id: user.id,
          email: user.email,
          role: user.role,
          site_id: user.site_id || this.config.siteId,
          full_name: user.full_name || user.email
        };
        
        localStorage.setItem('awema_cms_session', JSON.stringify(this.currentUser));
        this.showCMS();
        
      } catch (error) {
        console.error('Erreur de connexion:', error);
        if (errorDiv) {
          errorDiv.textContent = error.message;
          errorDiv.style.display = 'block';
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Se connecter';
      }
    }

    showLoginForm() {
      // Ne pas créer de nouveau formulaire, le HTML en a déjà un
      console.log('Formulaire de login déjà présent dans le HTML');
    }

    async showCMS() {
      // Masquer le formulaire de login
      const loginDiv = document.getElementById('cms-login');
      if (loginDiv) loginDiv.style.display = 'none';
      
      // Afficher et remplir le conteneur CMS
      const container = document.getElementById('cms-app');
      if (!container) {
        console.error('Container CMS non trouvé');
        return;
      }
      container.style.display = 'block';
      container.innerHTML = \`
        <div class="cms-dashboard">
          <header class="cms-header">
            <h1>CMS - \${this.config.siteName}</h1>
            <div class="user-info">
              <span>\${this.currentUser.email}</span>
              <button onclick="window.cms.logout()" class="btn-logout">Déconnexion</button>
            </div>
          </header>

          <nav class="cms-nav">
            <button class="nav-btn active" data-section="content">Contenu</button>
            <button class="nav-btn" data-section="media">Médias</button>
            <button class="nav-btn" data-section="forms">Formulaires</button>
            <button class="nav-btn" data-section="settings">Paramètres</button>
          </nav>

          <main class="cms-content">
            <div id="content-section" class="section active">
              <h2>Gestion du contenu</h2>
              <div class="loading">Chargement...</div>
            </div>
          </main>
        </div>
      \`;

      // Charger le contenu
      await this.loadContent();
      
      // Gérer la navigation
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => this.switchSection(e.target.dataset.section));
      });
    }

    async loadContent() {
      try {
        const content = await this.makeApiCall('getContent');
        
        const contentHtml = content.map(item => \`
          <div class="content-item" data-id="\${item.id}">
            <h3>\${item.page_slug}</h3>
            <p>Dernière modification : \${new Date(item.updated_at).toLocaleString()}</p>
            <button class="btn-edit" onclick="window.cms.editContent('\${item.id}')">Éditer</button>
          </div>
        \`).join('');

        document.getElementById('content-section').innerHTML = \`
          <h2>Gestion du contenu</h2>
          <div class="content-list">\${contentHtml}</div>
        \`;
        
      } catch (error) {
        console.error('Erreur chargement contenu:', error);
        document.getElementById('content-section').innerHTML = \`
          <h2>Gestion du contenu</h2>
          <div class="error">Erreur lors du chargement du contenu</div>
        \`;
      }
    }

    async editContent(contentId) {
      // Implémenter l'édition de contenu
      console.log('Edit content:', contentId);
    }

    switchSection(section) {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
      
      const sectionEl = document.getElementById(\`\${section}-section\`);
      if (sectionEl) {
        sectionEl.classList.add('active');
        document.querySelector(\`[data-section="\${section}"]\`).classList.add('active');
      }
    }

    logout() {
      localStorage.removeItem('awema_cms_session');
      localStorage.removeItem('awema_cms_token');
      this.currentUser = null;
      this.showLoginForm();
    }
  }

  // CSS minimal pour le CMS
  if (!document.getElementById('cms-styles')) {
    const style = document.createElement('style');
    style.id = 'cms-styles';
    style.textContent = \`
      .cms-dashboard { min-height: 100vh; background: #f5f5f5; }
      .cms-header { background: #2563eb; color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; }
      .cms-nav { background: white; padding: 1rem 2rem; border-bottom: 1px solid #e5e7eb; display: flex; gap: 1rem; }
      .nav-btn { padding: 0.5rem 1rem; background: none; border: none; cursor: pointer; font-size: 1rem; transition: all 0.2s; }
      .nav-btn:hover { color: #2563eb; }
      .nav-btn.active { color: #2563eb; border-bottom: 2px solid #2563eb; }
      .cms-content { padding: 2rem; }
      .section { display: none; }
      .section.active { display: block; }
      .content-item { background: white; padding: 1.5rem; margin-bottom: 1rem; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
      .btn-edit { background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
      .btn-logout { background: none; border: 1px solid white; color: white; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
      .loading { text-align: center; padding: 2rem; color: #6b7280; }
      .error { background: #fee; padding: 1rem; border-radius: 4px; color: #c00; }
      .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid #f3f3f3; border-top: 2px solid #2563eb; border-radius: 50%; animation: spin 1s linear infinite; }
      @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    \`;
    document.head.appendChild(style);
  }

  // Initialiser le CMS
  window.cms = new AwemaCMSNetlify(window.AWEMA_CMS_CONFIG);
})();`;
}