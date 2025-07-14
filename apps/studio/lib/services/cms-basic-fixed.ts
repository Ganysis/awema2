/**
 * CMS Basique avec support de l'éditeur de pages
 */

export function generateBasicCMSFixed(config: any): string {
  return `
// CMS AWEMA Basic avec éditeur de pages
(function() {
  'use strict';
  
  class AwemaCMSBasic {
    constructor(config) {
      this.config = config;
      this.currentUser = null;
      this.init();
    }
    
    async init() {
      console.log('CMS Basic initialization...');
      
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
        // Authentification locale
        if (email === this.config.adminEmail && password === this.config.adminPassword) {
          const session = {
            user: {
              id: 'local-admin',
              email: email,
              role: 'admin',
              site_id: this.config.siteId,
              full_name: 'Administrateur'
            },
            token: 'local-' + Date.now(),
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
          };
          
          localStorage.setItem('awema_cms_session', JSON.stringify(session));
          this.currentUser = session.user;
          this.showCMS();
        } else {
          throw new Error('Email ou mot de passe incorrect');
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
              <span class="cms-version">Basic</span>
            </div>
            <nav class="cms-nav">
              <button class="nav-btn active" data-section="dashboard">
                <i class="fas fa-home"></i> Dashboard
              </button>
              <button class="nav-btn" data-section="pages">
                <i class="fas fa-file-alt"></i> Pages
              </button>
              <button class="nav-btn" data-section="media">
                <i class="fas fa-images"></i> Médias
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
          case 'pages':
            await this.loadPageEditor();
            break;
          case 'media':
            await this.loadMedia();
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
            <p><i class="fas fa-check-circle"></i> CMS connecté en mode local</p>
            <p><i class="fas fa-info-circle"></i> Données stockées dans le navigateur</p>
            <p><i class="fas fa-edit"></i> Modification des pages uniquement</p>
          </div>
          
          <div class="quick-actions">
            <h3>Actions rapides</h3>
            <div class="actions-grid">
              <button class="action-btn" onclick="window.open('/', '_blank')">
                <i class="fas fa-external-link-alt"></i>
                Voir le site
              </button>
              <button class="action-btn" onclick="window.cms.loadSection('pages')">
                <i class="fas fa-edit"></i>
                Modifier les pages
              </button>
            </div>
          </div>
        </div>
      \`;
    }
    
    async loadPageEditor() {
      const content = document.getElementById('cms-content');
      if (!content) return;
      
      // Effacer le contenu pour l'éditeur
      content.innerHTML = '';
      
      // Si l'éditeur est déjà chargé, le réinitialiser
      if (window.pageEditor) {
        window.pageEditor.init();
        return;
      }
      
      // Charger le script de l'éditeur de pages
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '/admin/page-editor.js';
      script.onload = () => {
        console.log('Page editor script loaded');
        // L'éditeur s'initialise automatiquement
      };
      script.onerror = () => {
        content.innerHTML = '<div class="error">Erreur de chargement de l\\'éditeur de pages</div>';
      };
      document.head.appendChild(script);
    }
    
    async loadMedia() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="media-section">
          <h2>Gestion des médias</h2>
          <p><i class="fas fa-info-circle"></i> Fonctionnalité non disponible en mode Basic</p>
          <p>Passez à la version Pro pour gérer vos images et fichiers.</p>
        </div>
      \`;
    }
    
    logout() {
      localStorage.removeItem('awema_cms_session');
      window.location.reload();
    }
  }
  
  // Initialiser le CMS
  if (window.AWEMA_CMS_CONFIG) {
    window.cms = new AwemaCMSBasic(window.AWEMA_CMS_CONFIG);
  }
})();
`;
}