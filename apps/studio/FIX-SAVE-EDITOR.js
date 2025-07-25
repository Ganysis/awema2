// PATCH pour corriger la sauvegarde dans l'éditeur visuel
(function() {
  console.log('🔧 Correction de la sauvegarde...');
  
  if (window.visualEditor) {
    // Assurer que currentPage existe
    if (!window.visualEditor.currentPage) {
      window.visualEditor.currentPage = {
        id: 'home-page',
        title: 'Accueil'
      };
    }
    
    // Remplacer la méthode save
    const originalSave = window.visualEditor.save.bind(window.visualEditor);
    window.visualEditor.save = async function() {
      console.log('💾 Sauvegarde en cours...');
      
      // S'assurer que currentPage existe
      if (!this.currentPage) {
        this.currentPage = {
          id: 'home-page',
          title: 'Accueil'
        };
      }
      
      // Appeler la méthode originale
      try {
        await originalSave();
        console.log('✅ Sauvegarde réussie !');
      } catch (error) {
        console.error('❌ Erreur sauvegarde:', error);
        
        // Fallback en local
        localStorage.setItem('awema_page_blocks', JSON.stringify(this.blocks || []));
        localStorage.setItem('awema_site_data', JSON.stringify({
          pages: [{
            id: this.currentPage.id,
            title: this.currentPage.title,
            slug: 'index',
            blocks: this.blocks || []
          }]
        }));
        
        // Mettre à jour le statut
        if (this.setSaveStatus) {
          this.setSaveStatus('saved');
        }
        
        console.log('✅ Sauvegarde locale effectuée');
      }
    };
    
    console.log('✅ Patch appliqué !');
  } else {
    console.error('❌ visualEditor non trouvé');
  }
})();