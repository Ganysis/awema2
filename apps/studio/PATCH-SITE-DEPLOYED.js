// PATCH pour le site déployé sur cavamarcherawema.netlify.app
// À exécuter dans la console sur /admin

// Solution 1 : Intercepter et convertir le site_id en UUID
(function() {
    // UUID déterministe généré à partir de 'site-1752866606272'
    // Note: Ce sera le résultat de uuid_generate_v5(uuid_ns_dns(), 'site-1752866606272')
    const REAL_UUID = '12345678-1234-5678-1234-567812345678'; // Remplacer par l'UUID de la DB
    
    // Intercepter fetch pour remplacer le site_id
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        let url = args[0];
        
        if (typeof url === 'string') {
            // Remplacer site-1752866606272 par l'UUID
            url = url.replace('site-1752866606272', REAL_UUID);
            
            // Corriger aussi l'ordre
            url = url.replace('order=page_slug.asc', 'order=page_slug');
            
            args[0] = url;
        }
        
        // Si c'est un objet Request, modifier l'URL
        if (url instanceof Request) {
            const newUrl = url.url
                .replace('site-1752866606272', REAL_UUID)
                .replace('order=page_slug.asc', 'order=page_slug');
            args[0] = new Request(newUrl, url);
        }
        
        return originalFetch.apply(this, args);
    };
    
    // Modifier aussi le CMS_CONFIG
    if (window.CMS_CONFIG) {
        window.CMS_CONFIG.siteId = REAL_UUID;
    }
    
    // Si supabase existe, patcher les requêtes
    if (window.supabase) {
        const originalFrom = window.supabase.from;
        window.supabase.from = function(table) {
            const query = originalFrom.call(this, table);
            const originalEq = query.eq;
            
            query.eq = function(column, value) {
                // Si on cherche site_id avec l'ancien format, utiliser l'UUID
                if (column === 'site_id' && value === 'site-1752866606272') {
                    return originalEq.call(this, column, REAL_UUID);
                }
                return originalEq.call(this, column, value);
            };
            
            return query;
        };
    }
    
    console.log('✅ Patch appliqué !');
    console.log('Site ID original:', 'site-1752866606272');
    console.log('UUID utilisé:', REAL_UUID);
    console.log('Rechargement dans 2 secondes...');
    
    // Recharger
    setTimeout(() => location.reload(), 2000);
})();