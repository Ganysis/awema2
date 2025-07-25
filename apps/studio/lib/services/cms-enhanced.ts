/**
 * CMS Enhanced - Version améliorée du CMS avec toutes les fonctionnalités
 * - Édition complète des pages
 * - Gestion des médias pour la galerie
 * - Infrastructure pour le blog
 */

export function generateEnhancedCMSScript(): string {
  return `
// CMS AWEMA Enhanced Edition
(function() {
  'use strict';

  class AwemaCMSEnhanced {
    constructor(config) {
      this.config = config;
      this.supabase = null;
      this.currentUser = null;
      this.currentSite = null;
      this.currentView = 'dashboard';
      this.mediaLibrary = [];
      this.init();
    }

    async init() {
      // Initialiser Supabase si disponible
      if (window.supabase && this.config.api?.url) {
        this.supabase = window.supabase.createClient(
          this.config.api.url,
          this.config.api.anonKey
        );
      }

      // Charger la bibliothèque de médias depuis localStorage
      this.loadMediaLibrary();

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
        // Mode local pour le développement
        if (!this.supabase || !this.config.api?.url?.includes('supabase')) {
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

        // Mode Supabase (à implémenter avec votre configuration)
        throw new Error('Configuration Supabase requise');

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
      const cmsApp = document.getElementById('cms-app');
      
      cmsApp.innerHTML = \`
        <div class="cms-container">
          <header class="cms-header">
            <div class="header-content">
              <h1>Administration - \${this.config.siteName}</h1>
              <nav class="cms-nav">
                <button class="nav-btn active" data-view="dashboard">
                  <i class="fas fa-tachometer-alt"></i> Tableau de bord
                </button>
                <button class="nav-btn" data-view="pages">
                  <i class="fas fa-file-alt"></i> Pages
                </button>
                <button class="nav-btn" data-view="media">
                  <i class="fas fa-images"></i> Médias
                </button>
                <button class="nav-btn" data-view="blog">
                  <i class="fas fa-blog"></i> Blog
                </button>
                <button class="nav-btn" data-view="settings">
                  <i class="fas fa-cog"></i> Paramètres
                </button>
                <button id="logout-btn" class="logout-btn">
                  <i class="fas fa-sign-out-alt"></i> Déconnexion
                </button>
              </nav>
            </div>
          </header>

          <main class="cms-main">
            <div id="cms-content" class="cms-content">
              <!-- Le contenu sera chargé ici -->
            </div>
          </main>
        </div>
      \`;

      // Ajouter les écouteurs d'événements
      this.setupNavigation();
      
      // Charger la vue par défaut
      this.loadView('dashboard');
    }

    setupNavigation() {
      // Navigation principale
      document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const view = e.currentTarget.dataset.view;
          this.loadView(view);
          
          // Mettre à jour l'état actif
          document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
        });
      });

      // Déconnexion
      document.getElementById('logout-btn').addEventListener('click', () => {
        this.logout();
      });
    }

    loadView(view) {
      this.currentView = view;
      const content = document.getElementById('cms-content');
      
      switch(view) {
        case 'dashboard':
          this.loadDashboard();
          break;
        case 'pages':
          this.loadPages();
          break;
        case 'media':
          this.loadMediaLibrary();
          break;
        case 'blog':
          this.loadBlog();
          break;
        case 'settings':
          this.loadSettings();
          break;
        default:
          this.loadDashboard();
      }
    }

    loadDashboard() {
      const content = document.getElementById('cms-content');
      
      content.innerHTML = \`
        <div class="dashboard">
          <h2>Tableau de bord</h2>
          
          <div class="stats-grid">
            <div class="stat-card">
              <i class="fas fa-file-alt stat-icon"></i>
              <div class="stat-content">
                <h3>Pages</h3>
                <p class="stat-value">5</p>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-images stat-icon"></i>
              <div class="stat-content">
                <h3>Médias</h3>
                <p class="stat-value">\${this.mediaLibrary.length}</p>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-blog stat-icon"></i>
              <div class="stat-content">
                <h3>Articles</h3>
                <p class="stat-value">0</p>
              </div>
            </div>
            
            <div class="stat-card">
              <i class="fas fa-envelope stat-icon"></i>
              <div class="stat-content">
                <h3>Messages</h3>
                <p class="stat-value">0</p>
              </div>
            </div>
          </div>
          
          <div class="quick-actions">
            <h3>Actions rapides</h3>
            <div class="action-buttons">
              <button class="action-btn" onclick="window.cms.loadView('pages')">
                <i class="fas fa-edit"></i> Modifier les pages
              </button>
              <button class="action-btn" onclick="window.cms.loadView('media')">
                <i class="fas fa-upload"></i> Ajouter des médias
              </button>
              <button class="action-btn" onclick="window.cms.loadView('blog')">
                <i class="fas fa-plus"></i> Créer un article
              </button>
            </div>
          </div>
        </div>
      \`;
    }

    async loadPages() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="pages-section">
          <div class="section-header">
            <h2>Gestion des pages</h2>
            <button class="btn-primary" onclick="window.cms.createPage()">
              <i class="fas fa-plus"></i> Nouvelle page
            </button>
          </div>
          
          <div id="pages-list" class="pages-list">
            <div class="loading">Chargement des pages...</div>
          </div>
        </div>
      \`;

      // Charger les pages
      try {
        const siteData = JSON.parse(localStorage.getItem('awema_site_data') || '{}');
        const pages = siteData.pages || [];
        
        const pagesList = document.getElementById('pages-list');
        
        if (pages.length === 0) {
          pagesList.innerHTML = '<p class="empty-state">Aucune page trouvée</p>';
          return;
        }
        
        pagesList.innerHTML = \`
          <div class="pages-grid">
            \${pages.map(page => \`
              <div class="page-card">
                <div class="page-info">
                  <h3>\${page.title || 'Sans titre'}</h3>
                  <p class="page-url">URL: \${page.slug || '/'}</p>
                  <p class="page-blocks">\${(page.blocks || []).length} blocs</p>
                </div>
                <div class="page-actions">
                  <button class="btn-icon" onclick="window.cms.editPage('\${page.id || page.slug}')" title="Modifier">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-icon" onclick="window.cms.previewPage('\${page.slug}')" title="Aperçu">
                    <i class="fas fa-eye"></i>
                  </button>
                  <button class="btn-icon danger" onclick="window.cms.deletePage('\${page.id || page.slug}')" title="Supprimer">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            \`).join('')}
          </div>
        \`;
      } catch (error) {
        console.error('Erreur chargement pages:', error);
        document.getElementById('pages-list').innerHTML = '<p class="error">Erreur lors du chargement des pages</p>';
      }
    }

    editPage(pageId) {
      // Charger l'éditeur de page
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="page-editor-container">
          <div class="editor-header">
            <button class="btn-back" onclick="window.cms.loadView('pages')">
              <i class="fas fa-arrow-left"></i> Retour
            </button>
            <h2>Édition de page</h2>
          </div>
          <div id="page-editor-content">
            <div class="loading">Chargement de l'éditeur...</div>
          </div>
        </div>
      \`;

      // Charger le script de l'éditeur de page
      if (window.pageEditor) {
        // Si déjà chargé, l'initialiser directement
        setTimeout(() => {
          window.pageEditor.init();
        }, 100);
      } else {
        // Sinon charger le script
        const script = document.createElement('script');
        script.src = '/admin/page-editor.js';
        document.body.appendChild(script);
      }
    }

    previewPage(slug) {
      window.open(slug, '_blank');
    }

    async deletePage(pageId) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
        return;
      }
      
      try {
        const siteData = JSON.parse(localStorage.getItem('awema_site_data') || '{}');
        if (siteData.pages) {
          siteData.pages = siteData.pages.filter(p => p.id !== pageId && p.slug !== pageId);
          localStorage.setItem('awema_site_data', JSON.stringify(siteData));
          
          // Recharger la liste
          this.loadPages();
        }
      } catch (error) {
        alert('Erreur lors de la suppression');
      }
    }

    loadMediaLibrary() {
      const content = document.getElementById('cms-content');
      
      content.innerHTML = \`
        <div class="media-section">
          <div class="section-header">
            <h2>Bibliothèque de médias</h2>
            <div class="media-actions">
              <button class="btn-primary" onclick="window.cms.showUploadModal()">
                <i class="fas fa-upload"></i> Ajouter des images
              </button>
            </div>
          </div>
          
          <div class="media-filters">
            <input type="search" placeholder="Rechercher..." class="search-input" id="media-search">
            <select id="media-filter" class="filter-select">
              <option value="all">Tous les types</option>
              <option value="image">Images</option>
              <option value="gallery">Galerie</option>
            </select>
          </div>
          
          <div id="media-grid" class="media-grid">
            \${this.renderMediaGrid()}
          </div>
        </div>
      \`;

      // Ajouter les écouteurs
      document.getElementById('media-search').addEventListener('input', (e) => {
        this.filterMedia(e.target.value);
      });
    }

    renderMediaGrid() {
      if (this.mediaLibrary.length === 0) {
        return '<p class="empty-state">Aucun média trouvé. Commencez par ajouter des images.</p>';
      }
      
      return this.mediaLibrary.map((media, index) => \`
        <div class="media-item" data-media-id="\${index}">
          <div class="media-preview">
            <img src="\${media.url}" alt="\${media.alt || 'Media'}" loading="lazy">
            <div class="media-overlay">
              <button class="btn-icon" onclick="window.cms.editMedia(\${index})" title="Modifier">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-icon" onclick="window.cms.deleteMedia(\${index})" title="Supprimer">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="media-info">
            <p class="media-title">\${media.title || 'Sans titre'}</p>
            <p class="media-size">\${this.formatFileSize(media.size || 0)}</p>
          </div>
        </div>
      \`).join('');
    }

    showUploadModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = \`
        <div class="modal-content upload-modal">
          <div class="modal-header">
            <h3>Ajouter des images</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="upload-area" id="upload-area">
              <i class="fas fa-cloud-upload-alt upload-icon"></i>
              <p>Glissez-déposez vos images ici</p>
              <p class="upload-info">ou</p>
              <label for="file-input" class="btn-secondary">
                Parcourir les fichiers
              </label>
              <input type="file" id="file-input" multiple accept="image/*" style="display: none;">
            </div>
            
            <div id="upload-preview" class="upload-preview"></div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
              Annuler
            </button>
            <button class="btn-primary" onclick="window.cms.uploadFiles()" id="upload-btn" disabled>
              <i class="fas fa-upload"></i> Ajouter à la bibliothèque
            </button>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
      
      // Setup drag & drop
      const uploadArea = document.getElementById('upload-area');
      const fileInput = document.getElementById('file-input');
      
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
      });
      
      uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        this.handleFiles(e.dataTransfer.files);
      });
      
      fileInput.addEventListener('change', (e) => {
        this.handleFiles(e.target.files);
      });
    }

    handleFiles(files) {
      const preview = document.getElementById('upload-preview');
      const uploadBtn = document.getElementById('upload-btn');
      
      preview.innerHTML = '';
      this.pendingUploads = [];
      
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          const item = {
            file: file,
            url: e.target.result,
            title: file.name.replace(/\\.[^/.]+$/, ''),
            size: file.size
          };
          
          this.pendingUploads.push(item);
          
          preview.innerHTML += \`
            <div class="upload-item">
              <img src="\${e.target.result}" alt="\${item.title}">
              <input type="text" placeholder="Titre" value="\${item.title}" 
                     onchange="window.cms.updateUploadTitle(\${this.pendingUploads.length - 1}, this.value)">
            </div>
          \`;
          
          uploadBtn.disabled = false;
        };
        
        reader.readAsDataURL(file);
      });
    }

    updateUploadTitle(index, title) {
      if (this.pendingUploads[index]) {
        this.pendingUploads[index].title = title;
      }
    }

    uploadFiles() {
      if (!this.pendingUploads || this.pendingUploads.length === 0) {
        return;
      }
      
      // Ajouter à la bibliothèque
      this.pendingUploads.forEach(item => {
        this.mediaLibrary.push({
          url: item.url,
          title: item.title,
          size: item.size,
          type: 'image',
          uploadedAt: new Date().toISOString()
        });
      });
      
      // Sauvegarder
      this.saveMediaLibrary();
      
      // Fermer la modal
      document.querySelector('.modal-overlay').remove();
      
      // Recharger la vue
      this.loadMediaLibrary();
    }

    editMedia(index) {
      const media = this.mediaLibrary[index];
      if (!media) return;
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = \`
        <div class="modal-content edit-modal">
          <div class="modal-header">
            <h3>Modifier le média</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="edit-preview">
              <img src="\${media.url}" alt="\${media.title || ''}">
            </div>
            
            <div class="edit-form">
              <div class="form-group">
                <label>Titre</label>
                <input type="text" id="edit-title" value="\${media.title || ''}" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Texte alternatif (SEO)</label>
                <input type="text" id="edit-alt" value="\${media.alt || ''}" class="form-input">
              </div>
              
              <div class="form-group">
                <label>Description</label>
                <textarea id="edit-description" class="form-textarea">\${media.description || ''}</textarea>
              </div>
              
              <div class="form-group">
                <label>Catégorie</label>
                <select id="edit-category" class="form-select">
                  <option value="all">Toutes</option>
                  <option value="nature" \${media.category === 'nature' ? 'selected' : ''}>Nature</option>
                  <option value="architecture" \${media.category === 'architecture' ? 'selected' : ''}>Architecture</option>
                  <option value="portrait" \${media.category === 'portrait' ? 'selected' : ''}>Portraits</option>
                  <option value="workspace" \${media.category === 'workspace' ? 'selected' : ''}>Espaces</option>
                  <option value="product" \${media.category === 'product' ? 'selected' : ''}>Produits</option>
                  <option value="event" \${media.category === 'event' ? 'selected' : ''}>Événements</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
              Annuler
            </button>
            <button class="btn-primary" onclick="window.cms.saveMediaEdit(\${index})">
              <i class="fas fa-save"></i> Enregistrer
            </button>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
    }

    saveMediaEdit(index) {
      const media = this.mediaLibrary[index];
      if (!media) return;
      
      // Récupérer les valeurs
      media.title = document.getElementById('edit-title').value;
      media.alt = document.getElementById('edit-alt').value;
      media.description = document.getElementById('edit-description').value;
      media.category = document.getElementById('edit-category').value;
      
      // Sauvegarder
      this.saveMediaLibrary();
      
      // Fermer la modal
      document.querySelector('.modal-overlay').remove();
      
      // Recharger la vue
      this.loadMediaLibrary();
    }

    deleteMedia(index) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
        return;
      }
      
      this.mediaLibrary.splice(index, 1);
      this.saveMediaLibrary();
      this.loadMediaLibrary();
    }

    loadBlog() {
      const content = document.getElementById('cms-content');
      
      content.innerHTML = \`
        <div class="blog-section">
          <div class="section-header">
            <h2>Gestion du blog</h2>
            <button class="btn-primary" onclick="window.cms.createPost()">
              <i class="fas fa-plus"></i> Nouvel article
            </button>
          </div>
          
          <div class="blog-notice">
            <i class="fas fa-info-circle"></i>
            <div>
              <h3>Module Blog en préparation</h3>
              <p>Le module de blog sera bientôt disponible. Il permettra de :</p>
              <ul>
                <li>Créer et gérer des articles de blog</li>
                <li>Organiser les articles par catégories et tags</li>
                <li>Planifier la publication des articles</li>
                <li>Gérer les commentaires et interactions</li>
              </ul>
            </div>
          </div>
          
          <div class="blog-preview">
            <h3>Aperçu des fonctionnalités à venir</h3>
            <div class="feature-grid">
              <div class="feature-card">
                <i class="fas fa-edit"></i>
                <h4>Éditeur riche</h4>
                <p>Éditeur WYSIWYG complet avec support des médias</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-calendar"></i>
                <h4>Planification</h4>
                <p>Programmez vos articles à l'avance</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-tags"></i>
                <h4>Taxonomies</h4>
                <p>Catégories et tags pour organiser le contenu</p>
              </div>
              <div class="feature-card">
                <i class="fas fa-chart-line"></i>
                <h4>Statistiques</h4>
                <p>Suivez les performances de vos articles</p>
              </div>
            </div>
          </div>
        </div>
      \`;
    }

    loadSettings() {
      const content = document.getElementById('cms-content');
      
      content.innerHTML = \`
        <div class="settings-section">
          <h2>Paramètres</h2>
          
          <div class="settings-tabs">
            <button class="tab-btn active" data-tab="general">Général</button>
            <button class="tab-btn" data-tab="seo">SEO</button>
            <button class="tab-btn" data-tab="security">Sécurité</button>
          </div>
          
          <div class="settings-content">
            <div id="general-settings" class="tab-content active">
              <h3>Paramètres généraux</h3>
              <div class="form-group">
                <label>Nom du site</label>
                <input type="text" value="\${this.config.siteName}" class="form-input">
              </div>
              <div class="form-group">
                <label>Email de contact</label>
                <input type="email" value="\${this.config.adminEmail}" class="form-input">
              </div>
              <button class="btn-primary">Enregistrer les modifications</button>
            </div>
          </div>
        </div>
      \`;
      
      // Setup tabs
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
        });
      });
    }

    // Utilitaires
    loadMediaLibrary() {
      const stored = localStorage.getItem('awema_media_library');
      if (stored) {
        try {
          this.mediaLibrary = JSON.parse(stored);
        } catch (e) {
          this.mediaLibrary = [];
        }
      }
    }

    saveMediaLibrary() {
      localStorage.setItem('awema_media_library', JSON.stringify(this.mediaLibrary));
    }

    formatFileSize(bytes) {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    filterMedia(searchTerm) {
      const items = document.querySelectorAll('.media-item');
      items.forEach(item => {
        const title = item.querySelector('.media-title').textContent.toLowerCase();
        if (title.includes(searchTerm.toLowerCase())) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    }

    logout() {
      localStorage.removeItem('awema_cms_session');
      this.currentUser = null;
      window.location.reload();
    }
  }

  // API globale pour l'intégration avec d'autres scripts
  window.CMS_API = {
    getMediaLibrary: () => window.cms?.mediaLibrary || [],
    addMedia: (media) => {
      if (window.cms) {
        window.cms.mediaLibrary.push(media);
        window.cms.saveMediaLibrary();
      }
    },
    loadContent: async () => {
      const siteData = localStorage.getItem('awema_site_data');
      return siteData ? JSON.parse(siteData) : { pages: [] };
    },
    saveContent: async (pageId, data) => {
      try {
        const siteData = JSON.parse(localStorage.getItem('awema_site_data') || '{}');
        if (!siteData.pages) siteData.pages = [];
        
        const pageIndex = siteData.pages.findIndex(p => p.id === pageId || p.slug === pageId);
        if (pageIndex >= 0) {
          siteData.pages[pageIndex] = { ...siteData.pages[pageIndex], ...data };
        } else {
          siteData.pages.push({ id: pageId, ...data });
        }
        
        localStorage.setItem('awema_site_data', JSON.stringify(siteData));
        return { success: true, local: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  };

  // Initialiser le CMS
  window.cms = new AwemaCMSEnhanced(window.AWEMA_CMS_CONFIG);
})();`;
}

export function generateEnhancedCMSStyles(): string {
  return `/* CMS AWEMA Enhanced Styles */
:root {
  --primary: #3B82F6;
  --primary-dark: #2563EB;
  --primary-light: #60A5FA;
  --secondary: #10B981;
  --danger: #EF4444;
  --warning: #F59E0B;
  --dark: #1F2937;
  --gray-900: #111827;
  --gray-800: #1F2937;
  --gray-700: #374151;
  --gray-600: #4B5563;
  --gray-500: #6B7280;
  --gray-400: #9CA3AF;
  --gray-300: #D1D5DB;
  --gray-200: #E5E7EB;
  --gray-100: #F3F4F6;
  --gray-50: #F9FAFB;
  --white: #FFFFFF;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow: 0 2px 8px rgba(0,0,0,0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  --radius: 0.5rem;
  --radius-sm: 0.375rem;
  --radius-lg: 0.75rem;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  background: var(--gray-50);
  color: var(--dark);
  line-height: 1.5;
}

/* Login Styles - déjà définis dans cms-export-integration.ts */

/* Container principal */
.cms-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--gray-50);
}

/* Header amélioré */
.cms-header {
  background: var(--white);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  padding: 1rem 2rem;
}

.cms-header h1 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  color: var(--gray-900);
}

.cms-nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  border-top: 1px solid var(--gray-200);
  padding-top: 1rem;
}

.nav-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-btn:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}

.nav-btn.active {
  background: var(--primary);
  color: var(--white);
  border-color: var(--primary);
}

.logout-btn {
  margin-left: auto;
  background: transparent;
  border: 1px solid var(--gray-300);
  padding: 0.5rem 1rem;
  border-radius: var(--radius-sm);
  color: var(--danger);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logout-btn:hover {
  background: var(--danger);
  color: var(--white);
  border-color: var(--danger);
}

/* Main content */
.cms-main {
  flex: 1;
  padding: 2rem;
}

.cms-content {
  max-width: 1400px;
  margin: 0 auto;
}

/* Dashboard */
.dashboard h2 {
  margin: 0 0 2rem 0;
  font-size: 1.875rem;
  color: var(--gray-900);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.2s;
}

.stat-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.stat-icon {
  font-size: 2.5rem;
  color: var(--primary);
  opacity: 0.8;
}

.stat-content h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  margin: 0.25rem 0 0 0;
  font-size: 2rem;
  font-weight: 700;
  color: var(--gray-900);
}

.quick-actions {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}

.quick-actions h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: var(--gray-900);
}

.action-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.action-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* Section headers */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  margin: 0;
  font-size: 1.875rem;
  color: var(--gray-900);
}

/* Buttons */
.btn-primary {
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.btn-secondary {
  padding: 0.75rem 1.5rem;
  background: var(--gray-200);
  color: var(--gray-700);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-secondary:hover {
  background: var(--gray-300);
  color: var(--gray-900);
}

.btn-icon {
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-icon:hover {
  background: var(--primary-dark);
  transform: scale(1.05);
}

.btn-icon.danger {
  background: var(--danger);
}

.btn-icon.danger:hover {
  background: #DC2626;
}

.btn-back {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  color: var(--gray-700);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-back:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}

/* Pages section */
.pages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.page-card {
  background: var(--white);
  padding: 1.5rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: start;
}

.page-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.page-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--gray-900);
}

.page-url {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-600);
  font-family: monospace;
}

.page-blocks {
  margin: 0.5rem 0 0 0;
  font-size: 0.875rem;
  color: var(--gray-500);
}

.page-actions {
  display: flex;
  gap: 0.5rem;
}

/* Media Library */
.media-section {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
}

.media-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  transition: all 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.filter-select {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  background: var(--white);
  cursor: pointer;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.media-item {
  background: var(--gray-50);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: 1px solid var(--gray-200);
  transition: all 0.2s;
}

.media-item:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.media-preview {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  background: var(--gray-200);
}

.media-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.media-item:hover .media-preview img {
  transform: scale(1.05);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-item:hover .media-overlay {
  opacity: 1;
}

.media-info {
  padding: 0.75rem;
}

.media-title {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-900);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-size {
  margin: 0.25rem 0 0 0;
  font-size: 0.75rem;
  color: var(--gray-500);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
}

.modal-content {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--gray-900);
}

.modal-close {
  width: 2rem;
  height: 2rem;
  padding: 0;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  color: var(--gray-500);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-close:hover {
  background: var(--gray-100);
  color: var(--gray-700);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid var(--gray-200);
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* Upload area */
.upload-area {
  border: 2px dashed var(--gray-300);
  border-radius: var(--radius-lg);
  padding: 3rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
}

.upload-area.drag-over {
  border-color: var(--primary);
  background: var(--gray-50);
}

.upload-icon {
  font-size: 3rem;
  color: var(--gray-400);
  margin-bottom: 1rem;
}

.upload-area p {
  margin: 0.5rem 0;
  color: var(--gray-600);
}

.upload-info {
  font-size: 0.875rem;
  color: var(--gray-500);
}

.upload-preview {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.upload-item {
  border: 1px solid var(--gray-200);
  border-radius: var(--radius);
  overflow: hidden;
}

.upload-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
}

.upload-item input {
  width: 100%;
  padding: 0.5rem;
  border: none;
  border-top: 1px solid var(--gray-200);
  font-size: 0.75rem;
}

/* Edit modal */
.edit-modal .modal-content {
  max-width: 800px;
}

.edit-modal .modal-body {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
}

.edit-preview img {
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid var(--gray-200);
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Forms */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--gray-700);
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem 1rem;
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-sm);
  font-size: 0.875rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-textarea {
  min-height: 100px;
  resize: vertical;
}

/* Blog section */
.blog-notice {
  background: var(--primary-light);
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  color: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  margin-bottom: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: start;
}

.blog-notice i {
  font-size: 2rem;
  opacity: 0.8;
}

.blog-notice h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.blog-notice p {
  margin: 0 0 1rem 0;
  opacity: 0.9;
}

.blog-notice ul {
  margin: 0;
  padding-left: 1.5rem;
}

.blog-notice li {
  margin: 0.25rem 0;
  opacity: 0.9;
}

.blog-preview h3 {
  margin: 2rem 0 1.5rem 0;
  font-size: 1.5rem;
  color: var(--gray-900);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  background: var(--white);
  padding: 2rem;
  border-radius: var(--radius-lg);
  border: 1px solid var(--gray-200);
  text-align: center;
  transition: all 0.2s;
}

.feature-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.feature-card i {
  font-size: 2.5rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.feature-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--gray-900);
}

.feature-card p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gray-600);
}

/* Settings */
.settings-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid var(--gray-200);
  margin-bottom: 2rem;
}

.tab-btn {
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  color: var(--gray-600);
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--gray-900);
}

.tab-btn.active {
  color: var(--primary);
  border-bottom-color: var(--primary);
}

.tab-content {
  display: none;
}

.tab-content.active {
  display: block;
}

.tab-content h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.25rem;
  color: var(--gray-900);
}

/* Utilities */
.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--gray-500);
  font-size: 0.875rem;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: var(--gray-600);
}

.error {
  color: var(--danger);
  text-align: center;
  padding: 1rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .cms-nav {
    flex-wrap: wrap;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .cms-header h1 {
    font-size: 1.25rem;
  }
  
  .cms-main {
    padding: 1rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .pages-grid {
    grid-template-columns: 1fr;
  }
  
  .media-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .modal-content {
    margin: 1rem;
  }
  
  .edit-modal .modal-body {
    grid-template-columns: 1fr;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
  }
}

/* Editor page specific */
.page-editor-container {
  background: var(--white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  overflow: hidden;
}

.editor-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--gray-200);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.editor-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--gray-900);
}

#page-editor-content {
  min-height: 600px;
}`;
}