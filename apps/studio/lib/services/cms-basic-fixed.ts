/**
 * CMS Basique Corrigé - Sans Supabase Auth
 */

export function generateBasicCMSFixed(): string {
  return `// CMS AWEMA Basic Edition - Fixed Version
(function() {
  'use strict';

  class AwemaCMSBasic {
    constructor(config) {
      this.config = config;
      this.supabase = null;
      this.currentUser = null;
      this.currentSite = null;
      // URL du proxy - utilise l'URL de base ou localhost en dev
      this.proxyUrl = config.proxyUrl || 'https://studio.awema.fr/api/cms-proxy';
      this.init();
    }

    async init() {
      console.log('CMS Initialization...', this.config);
      
      // Initialiser Supabase si disponible (fallback local uniquement)
      if (window.supabase && this.config.api.url && this.config.api.anonKey) {
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
      if (btnText) btnText.style.display = 'none';
      if (btnLoading) btnLoading.style.display = 'inline';
      if (errorDiv) errorDiv.style.display = 'none';

      let session = null;
      
      try {
        // Mode local sans Supabase
        if (!this.supabase) {
          // Vérifier avec les identifiants du config
          if (email === this.config.adminEmail && password === this.config.adminPassword) {
            session = {
              id: 'local-admin',
              email: email,
              role: 'admin',
              siteId: this.config.siteId,
              fullName: 'Administrateur Local'
            };
            localStorage.setItem('awema_cms_session', JSON.stringify(session));
            this.currentUser = session;
            this.showCMS();
            return;
          } else {
            throw new Error('Email ou mot de passe incorrect');
          }
        }

        // Mode Proxy API - Contourne les problèmes CORS
        try {
          const response = await fetch(this.proxyUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-Site-ID': this.config.siteId
            },
            body: JSON.stringify({
              action: 'login',
              email,
              password,
              site_id: this.config.siteId
            })
          });
          
          const result = await response.json();
          
          if (!response.ok || !result.success) {
            throw new Error(result.error || 'Erreur de connexion');
          }
          
          // Stocker le token si fourni
          if (result.data && result.data.token) {
            localStorage.setItem('awema_cms_token', result.data.token);
          }
          
          // Créer une session locale
          if (result.data && result.data.user) {
            session = {
              id: result.data.user.id,
              email: result.data.user.email,
              role: result.data.user.role,
              siteId: this.config.siteId,
              fullName: result.data.user.full_name || result.data.user.fullName
            };
          }
        } catch (fetchError) {
          console.warn('Proxy API non disponible, utilisation du fallback Edge Function');
          
          // Fallback : Edge Function Supabase
          try {
            const edgeFunctionUrl = this.config.api.url + '/functions/v1/cms-login';
            const response = await fetch(edgeFunctionUrl, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': this.config.api.anonKey
              },
              body: JSON.stringify({
                email,
                password,
                siteId: this.config.siteId
              })
            });
            
            const result = await response.json();
            
            if (!response.ok) {
              throw new Error(result.error || 'Erreur de connexion');
            }
            
            // Stocker le token si fourni
            if (result.token) {
              localStorage.setItem('awema_cms_token', result.token);
            }
            
            // Créer une session locale
            session = {
              id: result.user.id,
              email: result.user.email,
              role: result.user.role,
              siteId: this.config.siteId,
              fullName: result.user.fullName
            };
          } catch (edgeError) {
          // Fallback : authentification locale sans rate limiting
          console.warn('Edge Function non disponible, utilisation du fallback local');
          
          const { data: users, error: userError } = await this.supabase
            .from('cms_users')
            .select('*')
            .eq('email', email)
            .eq('site_id', this.config.siteId);
            
          if (userError || !users || users.length === 0) {
            throw new Error('Utilisateur non trouvé');
          }
          
          const user = users[0];
          
          // Vérifier avec la fonction RPC
          const { data: authResult, error: authError } = await this.supabase
            .rpc('verify_user_password', {
              user_email: email,
              user_password: password,
              user_site_id: this.config.siteId
            });
            
          if (authError) {
            console.error('Erreur RPC:', authError);
            // Si la fonction n'existe pas, essayer la vérification directe
            if (authError.code === '42883' || authError.message.includes('function') || authError.message.includes('404')) {
              console.warn('Fonction verify_user_password non trouvée. Vérification directe du hash...');
              
              // Vérifier directement le hash bcrypt
              if (user.password_hash.startsWith('$2')) {
                console.error('Hash bcrypt détecté mais fonction de vérification manquante dans Supabase');
                throw new Error('Configuration Supabase incomplète. Voir FIX-SUPABASE-AUTH.md');
              } else {
                // Ancien format base64
                const passwordHash = btoa(password);
                if (user.password_hash !== passwordHash) {
                  throw new Error('Mot de passe incorrect');
                }
              }
            } else {
              throw new Error('Erreur de vérification du mot de passe');
            }
          } else if (!authResult || authResult.length === 0) {
            throw new Error('Mot de passe incorrect');
          }
          
          // Créer une session locale
          session = {
            id: user.id,
            email: user.email,
            role: user.role,
            siteId: user.site_id,
            fullName: user.full_name,
            company: user.company
          };
        }
        
        if (session) {
          localStorage.setItem('awema_cms_session', JSON.stringify(session));
          this.currentUser = session;
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
              <span class="cms-site-name">\${this.config.siteName}</span>
            </div>
            <nav class="cms-nav">
              <button class="nav-btn active" data-section="dashboard">
                <i class="fas fa-home"></i> Dashboard
              </button>
              <button class="nav-btn" data-section="pages">
                <i class="fas fa-file"></i> Pages
              </button>
              <button class="nav-btn" data-section="media">
                <i class="fas fa-image"></i> Médias
              </button>
              <button class="nav-btn" data-section="settings">
                <i class="fas fa-cog"></i> Paramètres
              </button>
            </nav>
            <div class="cms-user">
              <span>\${this.currentUser.email}</span>
              <button class="btn-logout" onclick="window.cms.logout()">
                <i class="fas fa-sign-out-alt"></i> Déconnexion
              </button>
            </div>
          </header>

          <main class="cms-main">
            <div id="cms-content" class="cms-content">
              <!-- Le contenu sera chargé ici -->
            </div>
          </main>
        </div>
      \`;

      // Configurer la navigation
      this.setupNavigation();
      
      // Charger le dashboard par défaut
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
            await this.loadPages();
            break;
          case 'media':
            await this.loadMedia();
            break;
          case 'settings':
            await this.loadSettings();
            break;
          default:
            content.innerHTML = '<div class="error">Section non trouvée</div>';
        }
      } catch (error) {
        console.error('Error loading section:', error);
        content.innerHTML = '<div class="error">Erreur lors du chargement</div>';
      }
    }

    async loadDashboard() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="dashboard">
          <h2>Tableau de bord</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <i class="fas fa-eye"></i>
              <h3>Visiteurs</h3>
              <p class="stat-number">0</p>
            </div>
            <div class="stat-card">
              <i class="fas fa-file"></i>
              <h3>Pages</h3>
              <p class="stat-number">1</p>
            </div>
            <div class="stat-card">
              <i class="fas fa-image"></i>
              <h3>Médias</h3>
              <p class="stat-number">0</p>
            </div>
            <div class="stat-card">
              <i class="fas fa-envelope"></i>
              <h3>Messages</h3>
              <p class="stat-number">0</p>
            </div>
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
              <button class="action-btn" onclick="window.cms.loadSection('media')">
                <i class="fas fa-upload"></i>
                Ajouter des médias
              </button>
            </div>
          </div>
        </div>
      \`;
    }

    async loadPages() {
      const content = document.getElementById('cms-content');
      
      // Pour le moment, afficher une interface simple
      content.innerHTML = \`
        <div class="pages-section">
          <h2>Gestion des pages</h2>
          <div class="pages-info">
            <p><i class="fas fa-info-circle"></i> La gestion complète des pages sera disponible dans la version Pro.</p>
            <p>Pour modifier vos pages, utilisez l'éditeur AWEMA Studio.</p>
          </div>
        </div>
      \`;
    }

    async loadMedia() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="media-section">
          <h2>Gestion des médias</h2>
          <div class="media-info">
            <p><i class="fas fa-info-circle"></i> La gestion des médias sera disponible dans la version Pro.</p>
          </div>
        </div>
      \`;
    }

    async loadSettings() {
      const content = document.getElementById('cms-content');
      content.innerHTML = \`
        <div class="settings-section">
          <h2>Paramètres</h2>
          <div class="settings-form">
            <h3>Informations du site</h3>
            <div class="form-group">
              <label>Nom du site</label>
              <input type="text" value="\${this.config.siteName}" readonly>
            </div>
            <div class="form-group">
              <label>Plan</label>
              <input type="text" value="\${this.config.plan}" readonly>
            </div>
            <div class="form-group">
              <label>Site ID</label>
              <input type="text" value="\${this.config.siteId}" readonly>
            </div>
          </div>
        </div>
      \`;
    }

    async logout() {
      localStorage.removeItem('awema_cms_session');
      this.currentUser = null;
      window.location.reload();
    }
  }

  // Initialiser le CMS
  if (window.AWEMA_CMS_CONFIG) {
    window.cms = new AwemaCMSBasic(window.AWEMA_CMS_CONFIG);
  } else {
    console.error('Configuration CMS manquante');
  }
})();`;
}