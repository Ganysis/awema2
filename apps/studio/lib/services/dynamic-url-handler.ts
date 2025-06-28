/**
 * Gestionnaire d'URLs dynamiques pour sites exportés
 * Permet au site de s'adapter automatiquement au domaine utilisé
 */

export class DynamicURLHandler {
  /**
   * Génère un script qui détecte et utilise le domaine actuel
   */
  static generateDynamicBaseScript(): string {
    return `
<script>
  // Configuration dynamique de l'URL de base
  (function() {
    // Détecte le domaine actuel
    const currentDomain = window.location.origin;
    
    // Stocke dans une variable globale
    window.SITE_CONFIG = {
      baseUrl: currentDomain,
      isDevelopment: currentDomain.includes('localhost') || currentDomain.includes('127.0.0.1'),
      isNetlifyPreview: currentDomain.includes('netlify.app'),
      isCustomDomain: !currentDomain.includes('netlify.app') && !currentDomain.includes('localhost')
    };
    
    // Fonction helper pour créer des URLs absolues
    window.createAbsoluteUrl = function(path) {
      if (!path) return currentDomain;
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
      }
      const cleanPath = path.startsWith('/') ? path : '/' + path;
      return currentDomain + cleanPath;
    };
    
    // Fonction pour mettre à jour tous les liens du site
    window.updateAllLinks = function() {
      // Mettre à jour les liens <a>
      document.querySelectorAll('a[href^="/"]').forEach(link => {
        const originalHref = link.getAttribute('href');
        if (originalHref && !link.dataset.processed) {
          link.href = window.createAbsoluteUrl(originalHref);
          link.dataset.processed = 'true';
        }
      });
      
      // Mettre à jour les formulaires
      document.querySelectorAll('form[action^="/"]').forEach(form => {
        const originalAction = form.getAttribute('action');
        if (originalAction && !form.dataset.processed) {
          form.action = window.createAbsoluteUrl(originalAction);
          form.dataset.processed = 'true';
        }
      });
      
      // Mettre à jour les images
      document.querySelectorAll('img[src^="/"]').forEach(img => {
        const originalSrc = img.getAttribute('src');
        if (originalSrc && !img.dataset.processed) {
          img.src = window.createAbsoluteUrl(originalSrc);
          img.dataset.processed = 'true';
        }
      });
    };
    
    // Mettre à jour les liens au chargement
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', window.updateAllLinks);
    } else {
      window.updateAllLinks();
    }
    
    // Observer pour les nouveaux éléments ajoutés dynamiquement
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          window.updateAllLinks();
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  })();
</script>
    `;
  }

  /**
   * Génère un composant React pour gérer les URLs dynamiques
   */
  static generateReactUrlProvider(): string {
    return `
// URL Provider pour React
import React, { createContext, useContext, useEffect, useState } from 'react';

interface UrlContextType {
  baseUrl: string;
  createUrl: (path: string) => string;
  isCustomDomain: boolean;
}

const UrlContext = createContext<UrlContextType>({
  baseUrl: '',
  createUrl: (path) => path,
  isCustomDomain: false
});

export function UrlProvider({ children }: { children: React.ReactNode }) {
  const [baseUrl, setBaseUrl] = useState('');
  const [isCustomDomain, setIsCustomDomain] = useState(false);

  useEffect(() => {
    // Détecte le domaine actuel
    const currentDomain = window.location.origin;
    setBaseUrl(currentDomain);
    setIsCustomDomain(!currentDomain.includes('netlify.app') && !currentDomain.includes('localhost'));
  }, []);

  const createUrl = (path: string) => {
    if (!path) return baseUrl;
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    const cleanPath = path.startsWith('/') ? path : '/' + path;
    return baseUrl + cleanPath;
  };

  return (
    <UrlContext.Provider value={{ baseUrl, createUrl, isCustomDomain }}>
      {children}
    </UrlContext.Provider>
  );
}

export const useUrl = () => useContext(UrlContext);

// Composant Link adaptatif
export function DynamicLink({ href, children, ...props }: any) {
  const { createUrl } = useUrl();
  const absoluteUrl = createUrl(href);
  
  return (
    <a href={absoluteUrl} {...props}>
      {children}
    </a>
  );
}
    `;
  }

  /**
   * Génère les meta tags dynamiques pour le SEO
   */
  static generateDynamicMetaTags(): string {
    return `
<script>
  // Mise à jour dynamique des meta tags
  (function() {
    const currentUrl = window.location.href;
    const currentDomain = window.location.origin;
    
    // Mise à jour de la balise canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = currentUrl;
    
    // Mise à jour des Open Graph tags
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.content = currentUrl;
    }
    
    // Mise à jour du sitemap
    const sitemap = document.querySelector('link[rel="sitemap"]');
    if (sitemap) {
      sitemap.href = currentDomain + '/sitemap.xml';
    }
  })();
</script>
    `;
  }
}

/**
 * Service de workflow pour l'achat de domaine
 */
export class DomainPurchaseWorkflow {
  /**
   * Génère un guide étape par étape pour l'achat de domaine
   */
  static generatePurchaseGuide(siteName: string): string {
    return `
# 🌐 Guide d'achat et configuration de votre domaine

## 📋 Workflow recommandé

### Étape 1 : Déploiement initial
1. Votre site est actuellement accessible sur : **${siteName}.netlify.app**
2. Tous les liens s'adapteront automatiquement au domaine final
3. Vous pouvez partager cette URL temporaire pour validation

### Étape 2 : Choix et achat du domaine

#### Option A : Via Netlify (Recommandé - 15€/an)
1. Connectez-vous à [Netlify](https://app.netlify.com)
2. Allez dans Settings > Domain management
3. Cliquez sur "Add custom domain"
4. Recherchez et achetez votre domaine directement
5. **Avantages** :
   - Configuration DNS automatique
   - SSL automatique inclus
   - Renouvellement simplifié
   - Support technique inclus

#### Option B : Via un registrar externe
**Registrars recommandés :**
- [Gandi.net](https://www.gandi.net) - ~15€/an
- [OVH](https://www.ovh.com) - ~10€/an
- [Namecheap](https://www.namecheap.com) - ~12€/an

### Étape 3 : Configuration automatique

Une fois le domaine acheté :
1. Retournez dans l'interface AWEMA Studio
2. Cliquez sur "Configurer mon domaine"
3. Entrez votre nouveau domaine
4. Suivez les instructions DNS générées automatiquement

## 🔄 Adaptation automatique des URLs

Votre site utilise un système intelligent qui :
- ✅ Détecte automatiquement le domaine utilisé
- ✅ Adapte tous les liens internes
- ✅ Met à jour les balises SEO
- ✅ Fonctionne sur n'importe quel domaine

## 🚀 Avantages de cette approche

1. **Flexibilité** : Changez de domaine sans recompiler
2. **Test facile** : Validez sur .netlify.app avant l'achat
3. **Migration simple** : Passez d'un domaine à l'autre
4. **SEO préservé** : Les redirections sont gérées

## ⏱️ Timeline typique

- **Jour 1** : Déploiement sur .netlify.app
- **Jour 1-7** : Test et validation du site
- **Jour 7** : Achat du domaine
- **Jour 7** : Configuration DNS (5 min - 48h)
- **Jour 8** : Site live sur votre domaine !

## 🆘 Support

Besoin d'aide pour choisir ou configurer votre domaine ?
- Documentation : [DNS-CONFIGURATION.md](/admin/DNS-CONFIGURATION.md)
- Support Netlify : support@netlify.com
- Forum AWEMA : forum.awema.fr
    `;
  }

  /**
   * Génère un formulaire de pré-configuration de domaine
   */
  static generateDomainPreConfigForm(): string {
    return `
<!-- Formulaire de pré-configuration du domaine -->
<div class="domain-preconfig-form">
  <h3>Préparez votre domaine</h3>
  
  <form id="domain-preconfig">
    <div class="form-group">
      <label>Domaine souhaité</label>
      <input type="text" name="desired_domain" placeholder="mon-entreprise.fr" />
      <small>Nous vérifierons la disponibilité</small>
    </div>
    
    <div class="form-group">
      <label>Alternatives</label>
      <input type="text" name="alternative_1" placeholder="mon-entreprise.com" />
      <input type="text" name="alternative_2" placeholder="entreprise-ville.fr" />
    </div>
    
    <div class="form-group">
      <label>Budget annuel</label>
      <select name="budget">
        <option value="15">15€/an (Netlify)</option>
        <option value="10-20">10-20€/an (Standard)</option>
        <option value="20+">20€+/an (Premium)</option>
      </select>
    </div>
    
    <button type="submit">Recevoir les recommandations</button>
  </form>
  
  <script>
    document.getElementById('domain-preconfig').addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      // Vérifier la disponibilité via API
      const domains = [
        formData.get('desired_domain'),
        formData.get('alternative_1'),
        formData.get('alternative_2')
      ].filter(Boolean);
      
      // Afficher les résultats
      const results = await checkDomainAvailability(domains);
      displayDomainRecommendations(results, formData.get('budget'));
    });
  </script>
</div>
    `;
  }
}