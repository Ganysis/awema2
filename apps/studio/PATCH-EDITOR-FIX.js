// PATCH pour corriger l'erreur de l'éditeur de pages
(function() {
    console.log('🔧 Patch de l\'éditeur de pages...');
    
    // Créer un pageEditor factice si nécessaire
    if (!window.pageEditor) {
        window.pageEditor = {
            init: function() {
                console.log('✅ Éditeur de pages initialisé (mode patch)');
                this.createBasicEditor();
            },
            
            createBasicEditor: function() {
                const container = document.getElementById('cms-content');
                if (!container) return;
                
                container.innerHTML = `
                    <div style="padding: 20px;">
                        <h2>Éditeur de pages CMS</h2>
                        <p style="color: #666;">L'éditeur principal n'a pas pu se charger à cause d'une erreur de syntaxe.</p>
                        
                        <div style="margin: 20px 0; padding: 20px; background: #f3f4f6; border-radius: 8px;">
                            <h3>Options disponibles :</h3>
                            
                            <button onclick="localStorage.setItem('cms_mode', 'local'); location.reload();" 
                                    style="display: block; margin: 10px 0; padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                🔄 Basculer en mode local (recommandé)
                            </button>
                            
                            <button onclick="location.href = '/'" 
                                    style="display: block; margin: 10px 0; padding: 10px 20px; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                🏠 Voir le site
                            </button>
                            
                            <button onclick="window.cms.logout()" 
                                    style="display: block; margin: 10px 0; padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer;">
                                🚪 Déconnexion
                            </button>
                        </div>
                        
                        <div style="margin-top: 20px; padding: 15px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 4px;">
                            <strong>⚠️ Pour corriger définitivement :</strong>
                            <p>Refaites un export depuis AWEMA Studio. Le nouveau code contient toutes les corrections.</p>
                        </div>
                    </div>
                `;
            }
        };
    }
    
    // Si l'éditeur existe mais que init n'est pas une fonction
    if (window.pageEditor && typeof window.pageEditor.init !== 'function') {
        console.log('🔄 Réparation de pageEditor.init...');
        window.pageEditor.init = function() {
            console.log('✅ Init réparé');
            if (window.pageEditor.createBasicEditor) {
                window.pageEditor.createBasicEditor();
            }
        };
    }
    
    // Forcer l'initialisation
    if (window.cms && window.cms.currentContent) {
        console.log('🚀 Initialisation forcée de l\'éditeur...');
        setTimeout(() => {
            if (window.pageEditor && window.pageEditor.init) {
                window.pageEditor.init();
            }
        }, 100);
    }
    
    console.log('✅ Patch appliqué !');
})();