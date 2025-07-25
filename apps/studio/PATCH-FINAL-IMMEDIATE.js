// PATCH FINAL - Copiez et collez dans la console sur /admin/

// 1. Forcer le rechargement complet sans cache
(function() {
    // Nettoyer le localStorage des anciennes erreurs
    localStorage.removeItem('cms_error');
    
    // Forcer un rechargement complet
    window.location.href = window.location.href + '?t=' + Date.now();
})();