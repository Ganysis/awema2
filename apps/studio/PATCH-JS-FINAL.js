// PATCH JAVASCRIPT FINAL
// À exécuter dans la console du navigateur sur /admin

// 1. Forcer le bon site_id partout
window.SITE_ID = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5';
window.CMS_CONFIG = {
    ...window.CMS_CONFIG,
    siteId: '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'
};

// 2. Corriger la requête qui cause l'erreur 500
const originalFetch = window.fetch;
window.fetch = function(...args) {
    let url = args[0];
    if (typeof url === 'string' && url.includes('order=page_slug.asc')) {
        url = url.replace('order=page_slug.asc', 'order=page_slug');
        args[0] = url;
    }
    return originalFetch.apply(this, args);
};

// 3. Adapter le CMS à la vraie structure (data dans JSONB)
if (window.CMS_API) {
    // Sauvegarder l'original
    const originalLoad = window.CMS_API.loadContent;
    
    // Remplacer pour adapter la structure
    window.CMS_API.loadContent = async function() {
        try {
            const { data, error } = await window.supabase
                .from('cms_content')
                .select('*')
                .eq('site_id', '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5')
                .order('page_slug');
            
            if (error) throw error;
            
            // Adapter la structure pour le CMS
            const adapted = (data || []).map(item => ({
                id: item.id,
                page_slug: item.page_slug,
                page_title: item.data?.page_title || 'Sans titre',
                blocks: item.data?.blocks || [],
                seo: item.meta?.seo || {},
                content: item.data?.content || item.data
            }));
            
            return adapted;
        } catch (err) {
            console.error('Erreur:', err);
            return [];
        }
    };
    
    // Adapter aussi la sauvegarde
    const originalSave = window.CMS_API.saveContent;
    window.CMS_API.saveContent = async function(pageId, pageData) {
        try {
            const { error } = await window.supabase
                .from('cms_content')
                .update({
                    data: {
                        page_title: pageData.page_title,
                        page_slug: pageData.page_slug,
                        blocks: pageData.blocks || []
                    },
                    meta: {
                        seo: pageData.seo || {}
                    }
                })
                .eq('id', pageId);
            
            if (error) throw error;
            return { success: true };
        } catch (err) {
            console.error('Erreur save:', err);
            return { success: false, error: err.message };
        }
    };
}

console.log('✅ Patch appliqué ! Site ID:', window.SITE_ID);
console.log('Rechargez la page pour appliquer les changements');

// 4. Recharger automatiquement
setTimeout(() => location.reload(), 1000);