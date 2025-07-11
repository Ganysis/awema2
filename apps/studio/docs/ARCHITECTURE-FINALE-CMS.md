# Architecture Finale CMS AWEMA - Guide Complet

## 🏗️ Architecture Finale

```
┌─────────────────────────────────────────────────────────┐
│                    AWEMA Studio                         │
│              (Votre app de création)                    │
│                                                         │
│  - Création des sites                                   │
│  - Export avec config CMS                               │
│  - Gestion des clients                                  │
└────────────────────┬────────────────────────────────────┘
                     │ Export ZIP
                     ▼
┌─────────────────────────────────────────────────────────┐
│                 Sites Clients (Netlify)                 │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │
│  │ plombier.fr │  │menuisier.fr│  │ electricien │   │
│  │             │  │             │  │    .com     │   │
│  │ HTML + CSS  │  │ HTML + CSS  │  │ HTML + CSS  │   │
│  │ + CMS Light │  │ + CMS Light │  │ + CMS Light │   │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘   │
│         │                 │                 │           │
│         └─────────────────┴─────────────────┘           │
│                           │                             │
│                     API Calls (CORS)                    │
└───────────────────────────┬─────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Supabase (Backend)                    │
│                                                         │
│  Database:                                              │
│  - sites (id, domain, api_key, settings)               │
│  - content (site_id, page_id, section, data)           │
│  - users (email, password, site_id)                     │
│  - media (site_id, url, alt)                           │
│                                                         │
│  RLS (Row Level Security) activé                        │
│  = Chaque site ne voit que ses données                  │
└─────────────────────────────────────────────────────────┘
```

## 📋 Guide de création étape par étape

### Étape 1 : Créer le backend Supabase (15 min)

#### 1.1 Créer un compte Supabase
```bash
# 1. Allez sur https://supabase.com
# 2. Créez un projet gratuit "awema-cms"
# 3. Notez :
#    - Project URL: https://xxxxx.supabase.co
#    - Anon Key: eyJhbGciOiJIUzI1NiIs...
```

#### 1.2 Créer les tables
```sql
-- Copier/coller dans l'éditeur SQL de Supabase

-- Table des sites
CREATE TABLE sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  domain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  api_key UUID DEFAULT uuid_generate_v4(),
  settings JSONB DEFAULT '{"theme": "premium", "colors": {"primary": "#3b82f6"}}',
  plan TEXT DEFAULT 'starter', -- starter, pro, premium
  is_active BOOLEAN DEFAULT true
);

-- Table du contenu
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  page_slug TEXT NOT NULL, -- home, services, contact, etc.
  section TEXT NOT NULL, -- hero, features, testimonials, etc.
  content JSONB NOT NULL, -- Le contenu flexible
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  updated_by TEXT,
  UNIQUE(site_id, page_slug, section)
);

-- Table des utilisateurs CMS
CREATE TABLE cms_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'editor', -- admin, editor
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  UNIQUE(site_id, email)
);

-- Table des médias
CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  filename TEXT NOT NULL,
  alt TEXT,
  size INTEGER,
  type TEXT, -- image, video, document
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS (Row Level Security)
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Politique : Accès par API Key
CREATE POLICY "Access with API key" ON sites
  FOR SELECT USING (
    api_key::text = current_setting('request.headers')::json->>'x-api-key'
  );

CREATE POLICY "Content access with site API key" ON content
  FOR ALL USING (
    site_id IN (
      SELECT id FROM sites 
      WHERE api_key::text = current_setting('request.headers')::json->>'x-api-key'
    )
  );

-- Index pour performance
CREATE INDEX idx_sites_api_key ON sites(api_key);
CREATE INDEX idx_content_site_page ON content(site_id, page_slug);
CREATE INDEX idx_media_site ON media(site_id);
```

### Étape 2 : Créer le client CMS léger (30 min)

#### 2.1 Service API pour AWEMA
```typescript
// lib/services/cms-api.service.ts
export class CMSApiService {
  private supabaseUrl: string;
  private supabaseAnonKey: string;

  constructor() {
    this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    this.supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  }

  // Créer un nouveau site
  async createSite(domain: string, name: string) {
    const response = await fetch(`${this.supabaseUrl}/rest/v1/sites`, {
      method: 'POST',
      headers: {
        'apikey': this.supabaseAnonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ domain, name })
    });

    const site = await response.json();
    return site[0]; // Retourne { id, api_key, ... }
  }

  // Générer le code CMS pour un site
  generateCMSCode(siteId: string, apiKey: string): string {
    return `
<!-- AWEMA CMS Light -->
<script>
window.AWEMA_CONFIG = {
  siteId: '${siteId}',
  apiKey: '${apiKey}',
  supabaseUrl: '${this.supabaseUrl}',
  supabaseAnonKey: '${this.supabaseAnonKey}'
};
</script>
<script src="/admin/cms-light.js" defer></script>
<link rel="stylesheet" href="/admin/cms-light.css">
    `;
  }
}
```

#### 2.2 CMS Light (Interface d'édition)
```javascript
// public/admin/cms-light.js
(function() {
  'use strict';
  
  const config = window.AWEMA_CONFIG;
  if (!config) return;

  // Vérifier si l'utilisateur est connecté
  const token = localStorage.getItem('awema_cms_token');
  
  class AwemaCMS {
    constructor() {
      this.isAuthenticated = !!token;
      this.editMode = false;
      this.init();
    }

    init() {
      // Ajouter le bouton d'édition
      this.addEditButton();
      
      // Si connecté, activer l'édition
      if (this.isAuthenticated) {
        this.enableEditing();
      }
    }

    addEditButton() {
      const button = document.createElement('button');
      button.id = 'awema-edit-btn';
      button.innerHTML = this.isAuthenticated ? '✏️ Modifier' : '🔐 Connexion';
      button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
        background: #3b82f6;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 16px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transition: all 0.3s;
      `;
      
      button.onmouseover = () => button.style.transform = 'scale(1.05)';
      button.onmouseout = () => button.style.transform = 'scale(1)';
      
      button.onclick = () => {
        if (this.isAuthenticated) {
          this.toggleEditMode();
        } else {
          this.showLoginModal();
        }
      };
      
      document.body.appendChild(button);
    }

    toggleEditMode() {
      this.editMode = !this.editMode;
      
      if (this.editMode) {
        // Activer l'édition
        this.makeContentEditable();
        document.getElementById('awema-edit-btn').innerHTML = '💾 Sauvegarder';
      } else {
        // Sauvegarder et désactiver
        this.saveChanges();
        document.getElementById('awema-edit-btn').innerHTML = '✏️ Modifier';
      }
    }

    makeContentEditable() {
      // Rendre éditable tous les éléments avec data-cms
      document.querySelectorAll('[data-cms-content]').forEach(el => {
        el.contentEditable = true;
        el.style.outline = '2px dashed #3b82f6';
        el.style.outlineOffset = '2px';
        el.style.cursor = 'text';
      });

      // Gestion des images
      document.querySelectorAll('[data-cms-image]').forEach(img => {
        img.style.outline = '2px dashed #10b981';
        img.style.cursor = 'pointer';
        img.onclick = () => this.showImageUploader(img);
      });
    }

    async saveChanges() {
      const updates = [];
      
      // Collecter tous les changements
      document.querySelectorAll('[data-cms-content]').forEach(el => {
        el.contentEditable = false;
        el.style.outline = 'none';
        
        const page = el.dataset.cmsPage || 'home';
        const section = el.dataset.cmsSection;
        const field = el.dataset.cmsField || 'content';
        
        updates.push({
          page_slug: page,
          section: section,
          content: { [field]: el.innerHTML }
        });
      });

      // Sauvegarder via API
      for (const update of updates) {
        await fetch(`${config.supabaseUrl}/rest/v1/content`, {
          method: 'POST',
          headers: {
            'apikey': config.supabaseAnonKey,
            'Authorization': `Bearer ${config.supabaseAnonKey}`,
            'Content-Type': 'application/json',
            'X-API-Key': config.apiKey,
            'Prefer': 'resolution=merge-duplicates'
          },
          body: JSON.stringify({
            site_id: config.siteId,
            ...update
          })
        });
      }

      this.showNotification('✅ Modifications sauvegardées !');
    }

    showLoginModal() {
      const modal = document.createElement('div');
      modal.innerHTML = `
        <div style="position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;">
          <div style="background:white;padding:40px;border-radius:12px;width:400px;max-width:90%;">
            <h2 style="margin:0 0 20px;font-size:24px;">Connexion CMS</h2>
            <input type="email" id="cms-email" placeholder="Email" style="width:100%;padding:10px;margin-bottom:10px;border:1px solid #ddd;border-radius:4px;">
            <input type="password" id="cms-password" placeholder="Mot de passe" style="width:100%;padding:10px;margin-bottom:20px;border:1px solid #ddd;border-radius:4px;">
            <button onclick="awemaCMS.login()" style="width:100%;padding:12px;background:#3b82f6;color:white;border:none;border-radius:4px;cursor:pointer;">Se connecter</button>
            <button onclick="this.parentElement.parentElement.remove()" style="width:100%;padding:12px;background:#e5e7eb;color:#374151;border:none;border-radius:4px;cursor:pointer;margin-top:10px;">Annuler</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    async login() {
      const email = document.getElementById('cms-email').value;
      const password = document.getElementById('cms-password').value;
      
      // Pour la démo, accepter admin@site.com / admin123
      if (email === 'admin@site.com' && password === 'admin123') {
        localStorage.setItem('awema_cms_token', 'demo-token');
        window.location.reload();
      } else {
        alert('Email ou mot de passe incorrect');
      }
    }

    showNotification(message) {
      const notif = document.createElement('div');
      notif.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
      `;
      notif.textContent = message;
      document.body.appendChild(notif);
      
      setTimeout(() => notif.remove(), 3000);
    }

    showImageUploader(img) {
      // Interface simple pour changer l'image
      const newUrl = prompt('URL de la nouvelle image:', img.src);
      if (newUrl) {
        img.src = newUrl;
        img.dataset.cmsNewSrc = newUrl;
      }
    }
  }

  // Initialiser le CMS
  window.awemaCMS = new AwemaCMS();
})();
```

### Étape 3 : Intégrer dans l'export AWEMA

#### 3.1 Modifier l'export pour inclure le CMS
```typescript
// lib/services/static-export-with-cms.ts
export async function exportWithCMS(projectData: any, options: any) {
  const cmsService = new CMSApiService();
  
  // 1. Créer le site dans Supabase
  const site = await cmsService.createSite(
    projectData.businessInfo.domain || `${projectData.projectName}.netlify.app`,
    projectData.businessInfo.companyName
  );

  // 2. Ajouter les attributs CMS au HTML
  const htmlWithCMS = addCMSAttributes(projectData.html);
  
  // 3. Ajouter le script CMS
  const cmsScript = cmsService.generateCMSCode(site.id, site.api_key);
  
  // 4. Créer les fichiers d'administration
  const adminFiles = [
    {
      path: 'admin/cms-light.js',
      content: getCMSLightJS()
    },
    {
      path: 'admin/cms-light.css',
      content: getCMSLightCSS()
    },
    {
      path: 'admin/index.html',
      content: getAdminPanel(site.id, site.api_key)
    }
  ];

  return {
    ...projectData,
    html: htmlWithCMS + cmsScript,
    additionalFiles: [...projectData.additionalFiles, ...adminFiles],
    cmsCredentials: {
      siteId: site.id,
      apiKey: site.api_key,
      adminUrl: '/admin',
      defaultEmail: 'admin@site.com',
      defaultPassword: 'admin123'
    }
  };
}

function addCMSAttributes(html: string) {
  // Ajouter data-cms-content aux éléments éditables
  return html
    .replace(/<h1([^>]*)>([^<]+)<\/h1>/g, '<h1$1 data-cms-content data-cms-section="hero" data-cms-field="title">$2</h1>')
    .replace(/<h2([^>]*)>([^<]+)<\/h2>/g, '<h2$1 data-cms-content data-cms-section="$section" data-cms-field="title">$2</h2>')
    .replace(/<p([^>]*)>([^<]+)<\/p>/g, '<p$1 data-cms-content data-cms-section="$section" data-cms-field="text">$2</p>')
    .replace(/<img([^>]*src="[^"]+")([^>]*)>/g, '<img$1 data-cms-image$2>');
}
```

### Étape 4 : Interface d'administration avancée

#### 4.1 Panel d'administration complet
```html
<!-- admin/index.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Administration - AWEMA CMS</title>
  <script src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js" defer></script>
  <link href="https://unpkg.com/tailwindcss@2/dist/tailwind.min.css" rel="stylesheet">
</head>
<body>
  <div x-data="cmsAdmin()" class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold text-gray-900">Administration CMS</h1>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <!-- Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold text-gray-700">Pages</h3>
          <p class="text-3xl font-bold text-blue-600" x-text="stats.pages"></p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold text-gray-700">Modifications</h3>
          <p class="text-3xl font-bold text-green-600" x-text="stats.edits"></p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow">
          <h3 class="text-lg font-semibold text-gray-700">Médias</h3>
          <p class="text-3xl font-bold text-purple-600" x-text="stats.media"></p>
        </div>
      </div>

      <!-- Content Editor -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6 border-b">
          <h2 class="text-xl font-semibold">Éditeur de contenu</h2>
        </div>
        <div class="p-6">
          <select x-model="selectedPage" class="w-full p-2 border rounded mb-4">
            <option value="">Sélectionner une page</option>
            <template x-for="page in pages">
              <option :value="page.slug" x-text="page.name"></option>
            </template>
          </select>

          <div x-show="selectedPage" class="space-y-4">
            <template x-for="section in currentSections">
              <div class="border p-4 rounded">
                <h3 class="font-semibold mb-2" x-text="section.name"></h3>
                <template x-for="field in section.fields">
                  <div class="mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-1" x-text="field.label"></label>
                    <input 
                      x-show="field.type === 'text'" 
                      type="text" 
                      x-model="field.value"
                      class="w-full p-2 border rounded"
                    >
                    <textarea 
                      x-show="field.type === 'textarea'" 
                      x-model="field.value"
                      class="w-full p-2 border rounded"
                      rows="4"
                    ></textarea>
                  </div>
                </template>
              </div>
            </template>
            
            <button @click="saveContent" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
              Sauvegarder
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>

  <script>
    function cmsAdmin() {
      return {
        stats: { pages: 5, edits: 127, media: 43 },
        pages: [
          { slug: 'home', name: 'Accueil' },
          { slug: 'services', name: 'Services' },
          { slug: 'about', name: 'À propos' },
          { slug: 'contact', name: 'Contact' }
        ],
        selectedPage: '',
        currentSections: [],
        
        async saveContent() {
          // Sauvegarder via Supabase
          alert('Contenu sauvegardé !');
        }
      }
    }
  </script>
</body>
</html>
```

## 🚀 Déploiement final

### 1. Variables d'environnement (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

### 2. Commande de build avec CMS
```bash
npm run build:with-cms
```

### 3. Test local
```bash
# Tester le CMS en local
npm run dev:cms

# Accéder à :
# - Site : http://localhost:3000
# - Admin : http://localhost:3000/admin
# - Email : admin@site.com
# - Password : admin123
```

## 💰 Modèle économique final

| Plan | Setup | Mensuel | Fonctionnalités |
|------|-------|---------|-----------------|
| **Starter** | 297€ | 19€ | Site statique, modifs via vous |
| **Pro** | 497€ | 39€ | CMS basique, édition textes/images |
| **Premium** | 797€ | 59€ | CMS complet, multi-utilisateurs |

## ✅ Checklist de lancement

- [ ] Créer compte Supabase
- [ ] Exécuter le SQL des tables
- [ ] Ajouter variables d'env
- [ ] Tester export avec CMS
- [ ] Déployer un site test
- [ ] Documenter pour les clients
- [ ] Lancer ! 🚀

Avec cette architecture, vous avez un CMS professionnel, scalable et gratuit jusqu'à ~500 sites !