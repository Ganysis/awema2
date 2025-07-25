// PATCH IMMÉDIAT - À exécuter AVANT le chargement
// 1. D'abord, stoppez le CMS actuel et appliquez ce patch

// Stopper toute exécution en cours
window.stop();

// Appliquer le patch AVANT tout
const originalFetch = window.fetch;
window.fetch = function(...args) {
    let url = args[0];
    
    if (typeof url === 'string') {
        // Corriger l'URL AVANT la requête
        if (url.includes('.asc')) {
            console.log('🔧 Correction URL:', url);
            url = url.replace(/\.asc/g, '');
            args[0] = url;
        }
    }
    
    return originalFetch.apply(this, args);
};

// Forcer les données locales pour éviter l'erreur
localStorage.setItem('cms_use_local', 'true');
localStorage.setItem('awema_site_data', JSON.stringify({
    pages: [{
        id: 'home-page',
        slug: 'index',
        title: 'Accueil',
        blocks: [],
        meta: {}
    }]
}));

console.log('✅ Patch appliqué ! Rechargement...');

// Recharger complètement
setTimeout(() => {
    location.reload(true);
}, 500);