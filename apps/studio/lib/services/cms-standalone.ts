/**
 * CMS Standalone - Version complète qui fonctionne vraiment
 * Sans dépendance externe, tout en localStorage
 */

export function generateStandaloneCMSScript(): string {
  return `
// CMS AWEMA Standalone Edition
(function() {
  'use strict';

  // Configuration globale
  const CMS_CONFIG = window.AWEMA_CMS_CONFIG || {
    siteName: 'Mon Site',
    adminEmail: 'admin@site.com',
    adminPassword: 'admin123'
  };

  // Gestionnaire de données
  class DataManager {
    constructor() {
      this.storageKey = 'awema_cms_data';
      this.mediaKey = 'awema_cms_media';
      this.authKey = 'awema_cms_auth';
    }

    // Pages
    getPages() {
      const data = this.getSiteData();
      return data.pages || [];
    }

    getPage(id) {
      const pages = this.getPages();
      return pages.find(p => p.id === id);
    }

    savePage(page) {
      const data = this.getSiteData();
      const pages = data.pages || [];
      const index = pages.findIndex(p => p.id === page.id);
      
      if (index >= 0) {
        pages[index] = page;
      } else {
        pages.push(page);
      }
      
      data.pages = pages;
      this.saveSiteData(data);
    }

    deletePage(id) {
      const data = this.getSiteData();
      data.pages = (data.pages || []).filter(p => p.id !== id);
      this.saveSiteData(data);
    }

    // Médias
    getMedia() {
      const stored = localStorage.getItem(this.mediaKey);
      return stored ? JSON.parse(stored) : [];
    }

    addMedia(media) {
      const mediaList = this.getMedia();
      mediaList.push({
        ...media,
        id: crypto.randomUUID(),
        uploadedAt: new Date().toISOString()
      });
      localStorage.setItem(this.mediaKey, JSON.stringify(mediaList));
      return mediaList;
    }

    deleteMedia(id) {
      const mediaList = this.getMedia().filter(m => m.id !== id);
      localStorage.setItem(this.mediaKey, JSON.stringify(mediaList));
      return mediaList;
    }

    // Site data
    getSiteData() {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Erreur parsing données:', e);
        }
      }
      
      // Charger depuis awema_site_data si disponible
      const awemaData = localStorage.getItem('awema_site_data');
      if (awemaData) {
        try {
          const parsed = JSON.parse(awemaData);
          this.saveSiteData(parsed);
          return parsed;
        } catch (e) {
          console.error('Erreur parsing awema_site_data:', e);
        }
      }
      
      return { pages: [], settings: {} };
    }

    saveSiteData(data) {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
      // Synchroniser avec awema_site_data
      localStorage.setItem('awema_site_data', JSON.stringify(data));
    }

    // Auth
    isAuthenticated() {
      const auth = localStorage.getItem(this.authKey);
      if (!auth) return false;
      
      try {
        const data = JSON.parse(auth);
        // Vérifier si le token n'est pas expiré (24h)
        const expires = new Date(data.expires);
        return expires > new Date();
      } catch (e) {
        return false;
      }
    }

    login(email, password) {
      if (email === CMS_CONFIG.adminEmail && password === CMS_CONFIG.adminPassword) {
        const expires = new Date();
        expires.setHours(expires.getHours() + 24);
        
        localStorage.setItem(this.authKey, JSON.stringify({
          email,
          expires: expires.toISOString()
        }));
        return true;
      }
      return false;
    }

    logout() {
      localStorage.removeItem(this.authKey);
    }
  }

  // Application CMS
  class CMSApp {
    constructor() {
      this.dataManager = new DataManager();
      this.currentView = 'dashboard';
      this.selectedPage = null;
      this.selectedBlock = null;
      this.init();
    }

    init() {
      // Vérifier l'authentification
      if (!this.dataManager.isAuthenticated()) {
        this.showLogin();
      } else {
        this.showApp();
      }
    }

    showLogin() {
      document.body.innerHTML = \`
        <div class="cms-login-wrapper">
          <div class="cms-login-container">
            <div class="cms-login-box">
              <div class="cms-logo">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <h1>AWEMA CMS</h1>
              <p class="subtitle">Connectez-vous pour gérer votre site</p>
              
              <form id="login-form" class="cms-login-form">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" id="email" required placeholder="admin@site.com" value="admin@site.com">
                </div>
                
                <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <input type="password" id="password" required placeholder="••••••••" value="admin123">
                </div>
                
                <div id="error-message" class="error-message" style="display: none;"></div>
                
                <button type="submit" class="btn-primary btn-block">
                  <span class="btn-text">Se connecter</span>
                  <div class="btn-spinner" style="display: none;"></div>
                </button>
              </form>
            </div>
          </div>
        </div>
      \`;

      // Event listeners
      document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleLogin();
      });
    }

    handleLogin() {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('error-message');
      const button = document.querySelector('button[type="submit"]');
      const btnText = button.querySelector('.btn-text');
      const btnSpinner = button.querySelector('.btn-spinner');

      // UI feedback
      button.disabled = true;
      btnText.style.display = 'none';
      btnSpinner.style.display = 'block';
      errorDiv.style.display = 'none';

      setTimeout(() => {
        if (this.dataManager.login(email, password)) {
          this.showApp();
        } else {
          errorDiv.textContent = 'Email ou mot de passe incorrect';
          errorDiv.style.display = 'block';
          button.disabled = false;
          btnText.style.display = 'block';
          btnSpinner.style.display = 'none';
        }
      }, 500);
    }

    showApp() {
      document.body.innerHTML = \`
        <div class="cms-app">
          <aside class="cms-sidebar">
            <div class="cms-brand">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>AWEMA</span>
            </div>
            
            <nav class="cms-nav">
              <a href="#" class="nav-item active" data-view="dashboard">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                  <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                </svg>
                <span>Tableau de bord</span>
              </a>
              
              <a href="#" class="nav-item" data-view="pages">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Pages</span>
              </a>
              
              <a href="#" class="nav-item" data-view="media">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                  <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Médias</span>
              </a>
              
              <a href="#" class="nav-item" data-view="settings">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 1V6M12 18V23M4.22 4.22L7.05 7.05M16.95 16.95L19.78 19.78M1 12H6M18 12H23M4.22 19.78L7.05 16.95M16.95 7.05L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Paramètres</span>
              </a>
            </nav>
            
            <div class="cms-sidebar-footer">
              <button class="btn-logout" onclick="window.cmsApp.logout()">
                <svg class="icon" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 17L21 12L16 7M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </aside>
          
          <main class="cms-main">
            <header class="cms-header">
              <h1 id="view-title">Tableau de bord</h1>
              <div class="header-actions" id="header-actions"></div>
            </header>
            
            <div class="cms-content" id="cms-content">
              <!-- Contenu dynamique -->
            </div>
          </main>
        </div>
      \`;

      // Setup navigation
      this.setupNavigation();
      
      // Load initial view
      this.loadView('dashboard');
    }

    setupNavigation() {
      document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          const view = item.dataset.view;
          
          // Update active state
          document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          
          // Load view
          this.loadView(view);
        });
      });
    }

    loadView(view) {
      this.currentView = view;
      const title = document.getElementById('view-title');
      const content = document.getElementById('cms-content');
      const actions = document.getElementById('header-actions');
      
      switch(view) {
        case 'dashboard':
          title.textContent = 'Tableau de bord';
          actions.innerHTML = '';
          this.renderDashboard(content);
          break;
          
        case 'pages':
          title.textContent = 'Gestion des pages';
          actions.innerHTML = \`
            <button class="btn-primary" onclick="window.cmsApp.createPage()">
              <svg class="icon" viewBox="0 0 24 24" fill="none">
                <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              Nouvelle page
            </button>
          \`;
          this.renderPages(content);
          break;
          
        case 'media':
          title.textContent = 'Bibliothèque de médias';
          actions.innerHTML = \`
            <button class="btn-primary" onclick="window.cmsApp.uploadMedia()">
              <svg class="icon" viewBox="0 0 24 24" fill="none">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Ajouter des images
            </button>
          \`;
          this.renderMedia(content);
          break;
          
        case 'settings':
          title.textContent = 'Paramètres';
          actions.innerHTML = '';
          this.renderSettings(content);
          break;
      }
    }

    renderDashboard(container) {
      const pages = this.dataManager.getPages();
      const media = this.dataManager.getMedia();
      
      container.innerHTML = \`
        <div class="dashboard-grid">
          <div class="stat-card">
            <div class="stat-icon pages">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h3>Pages</h3>
              <p class="stat-value">\${pages.length}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon media">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
                <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
                <path d="M21 15L16 10L5 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h3>Médias</h3>
              <p class="stat-value">\${media.length}</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon visitors">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h3>Visiteurs</h3>
              <p class="stat-value">-</p>
            </div>
          </div>
          
          <div class="stat-card">
            <div class="stat-icon messages">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <div class="stat-content">
              <h3>Messages</h3>
              <p class="stat-value">-</p>
            </div>
          </div>
        </div>
        
        <div class="dashboard-recent">
          <h2>Pages récentes</h2>
          <div class="recent-pages">
            \${pages.slice(0, 5).map(page => \`
              <div class="recent-page-item">
                <div class="page-info">
                  <h4>\${page.title || 'Sans titre'}</h4>
                  <p>\${page.slug || '/'}</p>
                </div>
                <button class="btn-edit" onclick="window.cmsApp.editPage('\${page.id}')">
                  Modifier
                </button>
              </div>
            \`).join('') || '<p class="empty-state">Aucune page créée</p>'}
          </div>
        </div>
      \`;
    }

    renderPages(container) {
      const pages = this.dataManager.getPages();
      
      container.innerHTML = \`
        <div class="pages-grid">
          \${pages.map(page => \`
            <div class="page-card">
              <div class="page-header">
                <h3>\${page.title || 'Sans titre'}</h3>
                <div class="page-actions">
                  <button class="btn-icon" onclick="window.cmsApp.editPage('\${page.id}')" title="Modifier">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.2786 1.87868 20.5544 1.93355 20.8118 2.04015C21.0692 2.14676 21.303 2.30301 21.5 2.5C21.697 2.69698 21.8532 2.93083 21.9598 3.18822C22.0665 3.44562 22.1213 3.72142 22.1213 4C22.1213 4.27857 22.0665 4.55438 21.9598 4.81178C21.8532 5.06917 21.697 5.30302 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="btn-icon" onclick="window.cmsApp.deletePage('\${page.id}')" title="Supprimer">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="page-content">
                <p class="page-url">URL: \${page.slug || '/'}</p>
                <p class="page-blocks">\${(page.blocks || []).length} blocs</p>
                <p class="page-updated">Modifié: \${new Date(page.updatedAt || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
          \`).join('') || '<p class="empty-state">Aucune page créée. Cliquez sur "Nouvelle page" pour commencer.</p>'}
        </div>
      \`;
    }

    renderMedia(container) {
      const media = this.dataManager.getMedia();
      
      container.innerHTML = \`
        <div class="media-filters">
          <input type="search" placeholder="Rechercher..." class="search-input" id="media-search">
        </div>
        
        <div class="media-grid">
          \${media.map(item => \`
            <div class="media-item" data-id="\${item.id}">
              <div class="media-preview">
                <img src="\${item.url}" alt="\${item.alt || item.title || ''}">
                <div class="media-overlay">
                  <button class="btn-icon" onclick="window.cmsApp.editMedia('\${item.id}')" title="Modifier">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.2786 1.87868 20.5544 1.93355 20.8118 2.04015C21.0692 2.14676 21.303 2.30301 21.5 2.5C21.697 2.69698 21.8532 2.93083 21.9598 3.18822C22.0665 3.44562 22.1213 3.72142 22.1213 4C22.1213 4.27857 22.0665 4.55438 21.9598 4.81178C21.8532 5.06917 21.697 5.30302 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                  <button class="btn-icon" onclick="window.cmsApp.deleteMediaItem('\${item.id}')" title="Supprimer">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div class="media-info">
                <p class="media-title">\${item.title || 'Sans titre'}</p>
                <p class="media-size">\${this.formatFileSize(item.size || 0)}</p>
              </div>
            </div>
          \`).join('') || '<p class="empty-state">Aucun média. Cliquez sur "Ajouter des images" pour commencer.</p>'}
        </div>
      \`;
      
      // Search functionality
      const searchInput = document.getElementById('media-search');
      if (searchInput) {
        searchInput.addEventListener('input', (e) => {
          const term = e.target.value.toLowerCase();
          document.querySelectorAll('.media-item').forEach(item => {
            const title = item.querySelector('.media-title').textContent.toLowerCase();
            item.style.display = title.includes(term) ? '' : 'none';
          });
        });
      }
    }

    renderSettings(container) {
      const siteData = this.dataManager.getSiteData();
      const settings = siteData.settings || {};
      
      container.innerHTML = \`
        <div class="settings-container">
          <div class="settings-section">
            <h2>Informations du site</h2>
            <form id="settings-form" class="settings-form">
              <div class="form-group">
                <label for="site-name">Nom du site</label>
                <input type="text" id="site-name" value="\${settings.siteName || CMS_CONFIG.siteName || ''}" placeholder="Mon Site">
              </div>
              
              <div class="form-group">
                <label for="site-description">Description</label>
                <textarea id="site-description" rows="3" placeholder="Description de votre site">\${settings.description || ''}</textarea>
              </div>
              
              <div class="form-group">
                <label for="contact-email">Email de contact</label>
                <input type="email" id="contact-email" value="\${settings.contactEmail || ''}" placeholder="contact@monsite.fr">
              </div>
              
              <button type="submit" class="btn-primary">
                Enregistrer les modifications
              </button>
            </form>
          </div>
          
          <div class="settings-section">
            <h2>Maintenance</h2>
            <div class="maintenance-actions">
              <button class="btn-secondary" onclick="window.cmsApp.exportData()">
                Exporter les données
              </button>
              <button class="btn-secondary" onclick="window.cmsApp.importData()">
                Importer des données
              </button>
            </div>
          </div>
        </div>
      \`;
      
      // Form handler
      document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveSettings();
      });
    }

    // Page editing
    editPage(pageId) {
      this.selectedPage = this.dataManager.getPage(pageId);
      if (!this.selectedPage) return;
      
      // Load page editor
      const script = document.createElement('script');
      script.src = '/admin/page-editor.js';
      script.onload = () => {
        if (window.pageEditor) {
          window.pageEditor.loadPage(this.selectedPage);
        }
      };
      document.body.appendChild(script);
    }

    createPage() {
      const newPage = {
        id: crypto.randomUUID(),
        title: 'Nouvelle page',
        slug: '/nouvelle-page',
        blocks: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      this.dataManager.savePage(newPage);
      this.editPage(newPage.id);
    }

    deletePage(pageId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
        this.dataManager.deletePage(pageId);
        this.loadView('pages');
      }
    }

    // Media handling
    uploadMedia() {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'image/*';
      
      input.onchange = (e) => {
        const files = e.target.files;
        Array.from(files).forEach(file => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.dataManager.addMedia({
              url: e.target.result,
              title: file.name.replace(/\\.[^/.]+$/, ''),
              size: file.size,
              type: file.type
            });
            this.loadView('media');
          };
          reader.readAsDataURL(file);
        });
      };
      
      input.click();
    }

    deleteMediaItem(mediaId) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
        this.dataManager.deleteMedia(mediaId);
        this.loadView('media');
      }
    }

    editMedia(mediaId) {
      // TODO: Implement media editing
      alert('Édition des médias bientôt disponible');
    }

    // Settings
    saveSettings() {
      const siteData = this.dataManager.getSiteData();
      siteData.settings = {
        ...siteData.settings,
        siteName: document.getElementById('site-name').value,
        description: document.getElementById('site-description').value,
        contactEmail: document.getElementById('contact-email').value
      };
      
      this.dataManager.saveSiteData(siteData);
      alert('Paramètres enregistrés !');
    }

    exportData() {
      const data = this.dataManager.getSiteData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'cms-backup-' + new Date().toISOString().split('T')[0] + '.json';
      a.click();
      URL.revokeObjectURL(url);
    }

    importData() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (confirm('Cela remplacera toutes les données actuelles. Continuer ?')) {
              this.dataManager.saveSiteData(data);
              this.loadView(this.currentView);
              alert('Données importées avec succès !');
            }
          } catch (error) {
            alert('Erreur lors de l\'import : ' + error.message);
          }
        };
        reader.readAsText(file);
      };
      
      input.click();
    }

    // Utilities
    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    logout() {
      if (confirm('Voulez-vous vraiment vous déconnecter ?')) {
        this.dataManager.logout();
        this.showLogin();
      }
    }
  }

  // Initialize
  window.cmsApp = new CMSApp();
})();`;
}