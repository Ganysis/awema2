// PATCH UNIVERSEL - Fonctionne pour TOUS les sites
// Copiez ce code dans la console sur /admin de n'importe quel site

(function() {
    console.log('🔧 Application du patch universel AWEMA...');
    
    // 1. Corriger TOUTES les erreurs .asc
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        let url = args[0];
        
        if (typeof url === 'string') {
            // Enlever tous les .asc qui causent des erreurs
            if (url.includes('.asc')) {
                console.log('Correction URL:', url);
                url = url.replace(/\.asc/g, '');
                args[0] = url;
            }
        }
        
        return originalFetch.apply(this, args);
    };
    
    // 2. Si Supabase existe, patcher aussi directement
    if (window.supabase && window.supabase.from) {
        console.log('✅ Patch Supabase détecté');
        const originalFrom = window.supabase.from;
        
        window.supabase.from = function(table) {
            const query = originalFrom.call(this, table);
            const originalOrder = query.order;
            
            // Remplacer la méthode order
            query.order = function(column, options) {
                console.log('Order appelé avec:', column, options);
                // Forcer la bonne syntaxe
                if (typeof options === 'string' && options === 'asc') {
                    return originalOrder.call(this, column, { ascending: true });
                }
                return originalOrder.call(this, column, options);
            };
            
            return query;
        };
    }
    
    // 3. Créer des données de fallback si nécessaire
    window.CMS_FALLBACK_DATA = {
        pages: [{
            id: 'home',
            page_slug: 'index',
            page_title: 'Accueil',
            blocks: [],
            data: {
                page_title: 'Accueil',
                blocks: []
            }
        }]
    };
    
    console.log('✅ Patch appliqué avec succès !');
    console.log('🔄 Rechargement dans 2 secondes...');
    
    // 4. Recharger
    setTimeout(() => {
        location.reload();
    }, 2000);
})();