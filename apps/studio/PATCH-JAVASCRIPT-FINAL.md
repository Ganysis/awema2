# 🎯 Patch JavaScript Final - Utiliser le bon site_id

## Le site_id correct est : `51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5`

Dans la console du navigateur sur votre site déployé (`/admin`), exécutez :

```javascript
// 1. Remplacer le site_id partout
window.SITE_ID = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5';
window.CMS_CONFIG = {
    ...window.CMS_CONFIG,
    siteId: '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'
};

// 2. Corriger l'ordre dans la requête
const originalFetch = window.fetch;
window.fetch = function(...args) {
    let url = args[0];
    if (typeof url === 'string' && url.includes('order=page_slug.asc')) {
        // Enlever le .asc qui cause l'erreur 500
        url = url.replace('order=page_slug.asc', 'order=page_slug');
        args[0] = url;
    }
    return originalFetch.apply(this, args);
};

// 3. Si window.supabase existe, patcher directement
if (window.supabase) {
    // Sauvegarder l'ancienne méthode
    const originalFrom = window.supabase.from;
    
    // Remplacer pour utiliser le bon site_id
    window.supabase.from = function(table) {
        const result = originalFrom.call(this, table);
        
        // Si c'est cms_content, forcer le bon site_id
        if (table === 'cms_content') {
            const originalEq = result.eq;
            result.eq = function(column, value) {
                if (column === 'site_id') {
                    // Forcer le bon UUID
                    return originalEq.call(this, column, '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5');
                }
                return originalEq.call(this, column, value);
            };
        }
        
        return result;
    };
}

// 4. Recharger la page
console.log('Patch appliqué ! Site ID: 51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5');
location.reload();
```

## Alternative : Tester manuellement

Si le patch ne fonctionne pas, testez directement dans la console :

```javascript
// Test direct Supabase
const testQuery = async () => {
    const { data, error } = await window.supabase
        .from('cms_content')
        .select('*')
        .eq('site_id', '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5')
        .order('page_slug');
    
    console.log('Data:', data);
    console.log('Error:', error);
};

testQuery();
```