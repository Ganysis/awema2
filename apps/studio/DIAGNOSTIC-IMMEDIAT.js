// DIAGNOSTIC IMMÉDIAT - Copiez dans la console

console.log('=== DIAGNOSTIC CMS ===');

// 1. Vérifier les éléments HTML
console.log('cms-content:', document.getElementById('cms-content'));
console.log('cms-app:', document.getElementById('cms-app'));
console.log('Contenu cms-content:', document.getElementById('cms-content')?.innerHTML);

// 2. Vérifier l'état du CMS
console.log('window.cms:', window.cms);
console.log('window.pageEditor:', window.pageEditor);
console.log('window.CMS_API:', window.CMS_API);

// 3. Vérifier les erreurs
if (window.cms && window.cms.currentContent) {
    console.log('Contenu actuel:', window.cms.currentContent);
}

// 4. Forcer l'affichage de quelque chose
const content = document.getElementById('cms-content');
if (content && content.innerHTML.trim() === '') {
    console.log('⚠️ cms-content est vide ! Ajout de contenu...');
    content.innerHTML = `
        <div style="padding: 20px;">
            <h2>Debug: Le contenu ne s'est pas chargé</h2>
            <p>window.pageEditor existe: ${!!window.pageEditor}</p>
            <p>window.pageEditor.init existe: ${!!(window.pageEditor && window.pageEditor.init)}</p>
            <button onclick="location.reload()" style="padding: 10px; background: #3b82f6; color: white; border: none; border-radius: 4px;">
                Recharger
            </button>
        </div>
    `;
}

// 5. Tenter de charger manuellement l'éditeur
if (window.pageEditor && window.pageEditor.init) {
    console.log('🚀 Tentative d\'init manuelle...');
    try {
        window.pageEditor.init();
    } catch (e) {
        console.error('Erreur init:', e);
    }
}