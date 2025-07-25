// FIX IMMÉDIAT - Page blanche
(function() {
    console.log('🔧 Fix page blanche...');
    
    // Attendre un peu que tout soit chargé
    setTimeout(() => {
        const content = document.getElementById('cms-content');
        
        if (!content) {
            console.error('❌ Pas de div cms-content !');
            return;
        }
        
        // Si le contenu est vide, afficher quelque chose
        if (content.innerHTML.trim() === '' || content.innerHTML.includes('loading')) {
            console.log('✅ Ajout du contenu manquant...');
            
            content.innerHTML = `
                <div style="padding: 20px; max-width: 1200px; margin: 0 auto;">
                    <div style="background: white; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                        <h2 style="margin-bottom: 20px;">Éditeur de Pages AWEMA</h2>
                        
                        <div style="background: #f3f4f6; padding: 20px; border-radius: 6px; margin-bottom: 20px;">
                            <h3>Page actuelle : Accueil</h3>
                            <p>L'éditeur visuel n'a pas pu se charger complètement.</p>
                        </div>
                        
                        <div style="display: grid; gap: 10px;">
                            <button onclick="localStorage.setItem('cms_mode', 'local'); location.reload();" 
                                    style="padding: 12px 24px; background: #3b82f6; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
                                🔄 Activer le mode local (recommandé)
                            </button>
                            
                            <button onclick="location.href = '/'" 
                                    style="padding: 12px 24px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
                                🏠 Voir le site
                            </button>
                            
                            <button onclick="
                                const script = document.createElement('script');
                                script.src = '/admin/page-editor.js';
                                script.onload = () => {
                                    if (window.pageEditor && window.pageEditor.init) {
                                        window.pageEditor.init();
                                    }
                                };
                                document.body.appendChild(script);
                            " style="padding: 12px 24px; background: #6366f1; color: white; border: none; border-radius: 6px; font-size: 16px; cursor: pointer;">
                                🔧 Recharger l'éditeur
                            </button>
                        </div>
                        
                        <div style="margin-top: 30px; padding: 15px; background: #fef3c7; border: 1px solid #f59e0b; border-radius: 6px;">
                            <strong>💡 Note :</strong> Pour une expérience optimale, utilisez le mode local ou refaites un export depuis AWEMA Studio.
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Vérifier si pageEditor existe
        if (!window.pageEditor) {
            console.log('📦 Chargement manuel de page-editor.js...');
            const script = document.createElement('script');
            script.src = '/admin/page-editor.js';
            script.onload = () => {
                console.log('✅ Script chargé');
                if (window.pageEditor && window.pageEditor.init) {
                    window.pageEditor.init();
                }
            };
            script.onerror = (e) => {
                console.error('❌ Erreur chargement script:', e);
            };
            document.body.appendChild(script);
        } else if (window.pageEditor.init) {
            console.log('🚀 Init pageEditor...');
            window.pageEditor.init();
        }
        
    }, 1000);
})();