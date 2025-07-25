// PATCH POUR cavamarcherawema.netlify.app
// Copiez tout ce code dans la console sur /admin

// 1. Créer le site dans la DB avec le bon UUID
// D'abord, exécutez ce SQL dans Supabase :
/*
INSERT INTO cms_sites (
    id,
    domain,
    site_name
) VALUES (
    '6077b1aa-684b-450b-88dc-a6b3c4e10478'::uuid,
    'cavamarcherawema.netlify.app',
    'Ça Marche AWEMA'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    published,
    author_id
) VALUES (
    '6077b1aa-684b-450b-88dc-a6b3c4e10478'::uuid,
    'index',
    'page',
    '{"page_title": "Accueil", "blocks": []}'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
) ON CONFLICT DO NOTHING;
*/

// 2. Puis exécutez ce JavaScript dans la console
(function() {
    // Corriger l'erreur .asc
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        let url = args[0];
        if (typeof url === 'string' && url.includes('order=page_slug.asc')) {
            url = url.replace('order=page_slug.asc', 'order=page_slug');
            args[0] = url;
        }
        return originalFetch.apply(this, args);
    };
    
    console.log('✅ Patch appliqué ! Rechargement...');
    setTimeout(() => location.reload(), 1000);
})();