// PATCH pour forcer le chargement du CMS
(function() {
    console.log('🚀 Forçage du chargement du CMS...');
    
    // Attendre que Supabase soit chargé
    const checkAndLoad = () => {
        if (window.cms && window.cms.showCMS) {
            // Forcer l'affichage du CMS
            window.cms.currentUser = {
                id: 'demo-admin',
                email: 'admin@admin.fr',
                site_id: '6bbf89df-f90c-4b26-b893-fa87616ef737',
                role: 'admin'
            };
            window.cms.saveSession(window.cms.currentUser);
            window.cms.showCMS();
            console.log('✅ CMS forcé à se charger !');
        } else {
            console.log('⏳ En attente du CMS...');
            setTimeout(checkAndLoad, 500);
        }
    };
    
    // Créer des données locales de secours
    localStorage.setItem('cms_session', JSON.stringify({
        user: {
            id: 'demo-admin',
            email: 'admin@admin.fr',
            site_id: '6bbf89df-f90c-4b26-b893-fa87616ef737',
            role: 'admin'
        },
        expires: Date.now() + (24 * 60 * 60 * 1000)
    }));
    
    localStorage.setItem('awema_site_data', JSON.stringify({
        pages: [{
            id: 'home-page',
            slug: 'index',
            title: 'Accueil',
            blocks: [],
            meta: {}
        }]
    }));
    
    // Lancer la vérification
    checkAndLoad();
})();