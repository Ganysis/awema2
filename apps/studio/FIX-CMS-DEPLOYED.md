# 🔧 FIX IMMÉDIAT - Corriger le CMS déjà déployé

## Le problème

Le site déployé utilise encore l'ancienne version du code avec `.order('page_slug.asc')` qui cause l'erreur 500.

## Solution 1 : Insérer des données de test

Dans Supabase SQL Editor, exécutez :

```sql
-- Vider et recréer les données de test
DELETE FROM cms_content WHERE site_id = 'site-1752866606272';

-- Insérer une page d'accueil
INSERT INTO cms_content (
    site_id,
    page_slug,
    page_title,
    page_type,
    content,
    blocks,
    seo,
    is_published
) VALUES (
    'site-1752866606272',
    'index',  -- Utiliser 'index' au lieu de 'accueil'
    'Page d''accueil',
    'homepage',
    '{"title": "Bienvenue", "description": "Site de test CMS"}',
    '[]'::jsonb,
    '{}'::jsonb,
    true
);

-- Vérifier
SELECT * FROM cms_content WHERE site_id = 'site-1752866606272';
```

## Solution 2 : Forcer le CMS en mode localStorage

Dans la console du navigateur sur votre site déployé :

```javascript
// Override pour forcer localStorage
window.CMS_CONFIG = {
    ...window.CMS_CONFIG,
    supabase: null  // Désactiver Supabase
};

// Créer des données locales
localStorage.setItem('cms_site_data', JSON.stringify({
    pages: [{
        id: 'home',
        slug: 'index',
        title: 'Accueil',
        blocks: []
    }],
    site: {
        id: 'site-1752866606272',
        name: 'Mon Site'
    }
}));

// Recharger
location.reload();
```

## Solution 3 : Patch JavaScript temporaire

Dans la console, avant de recharger :

```javascript
// Intercepter et corriger les requêtes Supabase
const originalFetch = window.fetch;
window.fetch = function(...args) {
    let url = args[0];
    if (typeof url === 'string' && url.includes('order=page_slug.asc')) {
        // Corriger l'URL
        url = url.replace('order=page_slug.asc', 'order=page_slug');
        args[0] = url;
    }
    return originalFetch.apply(this, args);
};
```

## Solution 4 : Redéployer VRAIMENT

Le problème est que le site utilise l'ancien code. Pour forcer un nouveau déploiement :

1. Dans AWEMA Studio, modifiez légèrement quelque chose (ex: un texte)
2. Sauvegardez
3. Déployez à nouveau
4. Cette fois, le nouveau code sera utilisé

## Vérification

Pour vérifier quelle version est déployée, dans la console :

```javascript
// Chercher la fonction qui fait la requête
console.log(window.CMS_API?.loadContent?.toString());
```

Si vous voyez `.order('page_slug')` sans `.asc`, c'est la nouvelle version.
Si vous voyez `.order('page_slug.asc')`, c'est l'ancienne.