# 🔧 Patch immédiat pour faire fonctionner le CMS

## Le problème
- Le code utilise `site-1752866606272` (string)
- Supabase attend un UUID comme `00000000-0000-0000-0000-000000000001`

## Solution immédiate

### 1. Créer le site de test dans Supabase
Exécutez `SOLUTION-FINALE-CMS.sql` pour créer un site avec l'UUID : `00000000-0000-0000-0000-000000000001`

### 2. Patcher le site déployé
Dans la console du navigateur sur votre site déployé (`/admin`), exécutez :

```javascript
// Remplacer le site_id partout
window.SITE_ID = '00000000-0000-0000-0000-000000000001';
window.CMS_CONFIG = {
    ...window.CMS_CONFIG,
    siteId: '00000000-0000-0000-0000-000000000001'
};

// Patcher la fonction qui fait les requêtes
if (window.CMS_API && window.CMS_API.loadContent) {
    const original = window.CMS_API.loadContent;
    window.CMS_API.loadContent = async function() {
        // Forcer le bon site_id
        const SITE_ID = '00000000-0000-0000-0000-000000000001';
        try {
            const { data, error } = await window.supabase
                .from('cms_content')
                .select('*')
                .eq('site_id', SITE_ID)
                .order('page_slug');
            
            if (error) throw error;
            return data || [];
        } catch (err) {
            console.error('Erreur chargement:', err);
            return [];
        }
    };
}

// Recharger la page
location.reload();
```

### 3. Alternative : Modifier le déploiement

Pour une solution permanente, il faut modifier le code source pour générer des UUID valides :

```javascript
// Au lieu de :
const siteId = `site-${Date.now()}`;

// Utiliser :
const siteId = crypto.randomUUID ? crypto.randomUUID() : '00000000-0000-0000-0000-000000000001';
```

### 4. Test rapide

Après avoir exécuté le SQL et le patch JavaScript :
1. Rechargez la page `/admin`
2. Connectez-vous avec `admin@admin.fr` / `admin`
3. Le CMS devrait maintenant fonctionner !

## Note importante
L'erreur "Unexpected identifier 'accueil'" disparaîtra automatiquement une fois que Supabase répondra correctement avec les bonnes données.