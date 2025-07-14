/**
 * CMS fonctionnant uniquement en local (sans API)
 * Solution de contournement pour les problèmes d'Edge Functions
 */

export function generateLocalOnlyCMS(): string {
  return `
class LocalCMS {
  constructor() {
    this.currentUser = null;
    this.siteData = this.loadLocalData();
  }
  
  loadLocalData() {
    const stored = localStorage.getItem('awema_cms_data');
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Données par défaut
    return {
      pages: [{
        id: 'home-page',
        page_title: 'Accueil',
        page_slug: '/',
        blocks: window.INITIAL_BLOCKS || [],
        seo: {
          title: 'Bienvenue',
          description: 'Site créé avec AWEMA'
        }
      }]
    };
  }
  
  saveLocalData() {
    localStorage.setItem('awema_cms_data', JSON.stringify(this.siteData));
  }
  
  login(email, password) {
    // Auth locale simple
    if (email === 'admin@admin.fr' && password === 'admin') {
      this.currentUser = {
        email: email,
        role: 'admin'
      };
      localStorage.setItem('awema_cms_user', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }
  
  logout() {
    this.currentUser = null;
    localStorage.removeItem('awema_cms_user');
  }
  
  isAuthenticated() {
    if (!this.currentUser) {
      const stored = localStorage.getItem('awema_cms_user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    }
    return !!this.currentUser;
  }
  
  getPages() {
    return this.siteData.pages || [];
  }
  
  updatePage(pageId, data) {
    const pageIndex = this.siteData.pages.findIndex(p => p.id === pageId);
    if (pageIndex >= 0) {
      this.siteData.pages[pageIndex] = {
        ...this.siteData.pages[pageIndex],
        ...data,
        updated_at: new Date().toISOString()
      };
      this.saveLocalData();
      return true;
    }
    return false;
  }
}

// Initialisation globale
window.CMS = new LocalCMS();

// Gestionnaire de login
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const errorDiv = document.getElementById('login-error');
      
      if (window.CMS.login(email, password)) {
        // Masquer le formulaire de login
        const loginSection = document.querySelector('.login-section');
        if (loginSection) loginSection.style.display = 'none';
        
        // Afficher l'interface admin
        const adminInterface = document.getElementById('admin-interface');
        if (adminInterface) {
          adminInterface.classList.remove('hidden');
          
          // Charger l'éditeur de pages
          if (window.pageEditor) {
            window.pageEditor.init();
          }
        }
      } else {
        if (errorDiv) {
          errorDiv.textContent = 'Email ou mot de passe incorrect';
          errorDiv.classList.remove('hidden');
        }
      }
    });
  }
  
  // Vérifier si déjà connecté
  if (window.CMS.isAuthenticated()) {
    const loginSection = document.querySelector('.login-section');
    if (loginSection) loginSection.style.display = 'none';
    
    const adminInterface = document.getElementById('admin-interface');
    if (adminInterface) {
      adminInterface.classList.remove('hidden');
      if (window.pageEditor) {
        window.pageEditor.init();
      }
    }
  }
});`;
}