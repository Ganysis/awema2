// PATCH pour activer l'édition des blocs
(function() {
  console.log('🔧 Activation de l\'édition des blocs...');
  
  if (!window.visualEditor) {
    console.error('❌ visualEditor non trouvé');
    return;
  }
  
  // 1. Ajouter des blocs de test si vide
  if (!window.visualEditor.blocks || window.visualEditor.blocks.length === 0) {
    window.visualEditor.blocks = [
      {
        id: 'hero-1',
        type: 'hero-v3',
        props: {
          title: 'Bienvenue sur votre site',
          subtitle: 'Créez un site professionnel en quelques clics',
          buttonText: 'Commencer',
          variant: 'gradient-modern'
        }
      },
      {
        id: 'features-1',
        type: 'features-v3',
        props: {
          title: 'Nos fonctionnalités',
          subtitle: 'Découvrez ce qui nous rend unique',
          variant: 'cards-hover'
        }
      }
    ];
  }
  
  // 2. Rendre l'iframe cliquable
  const overlay = document.getElementById('preview-overlay');
  if (overlay) {
    overlay.style.pointerEvents = 'auto';
    overlay.style.background = 'rgba(0,0,0,0.01)';
    
    // Ajouter des zones cliquables pour chaque bloc
    overlay.innerHTML = '';
    window.visualEditor.blocks.forEach((block, index) => {
      const blockZone = document.createElement('div');
      blockZone.style.cssText = `
        position: absolute;
        top: ${index * 300}px;
        left: 0;
        right: 0;
        height: 280px;
        border: 2px solid transparent;
        cursor: pointer;
        transition: all 0.2s;
      `;
      
      blockZone.onmouseover = () => {
        blockZone.style.border = '2px solid #007aff';
        blockZone.style.background = 'rgba(0, 122, 255, 0.1)';
      };
      
      blockZone.onmouseout = () => {
        blockZone.style.border = '2px solid transparent';
        blockZone.style.background = 'transparent';
      };
      
      blockZone.onclick = () => {
        console.log('Bloc sélectionné:', block);
        window.visualEditor.selectBlock(block);
      };
      
      overlay.appendChild(blockZone);
    });
  }
  
  // 3. Corriger la méthode updateProp
  const originalUpdateProp = window.visualEditor.updateProp;
  window.visualEditor.updateProp = function(key, value) {
    console.log('Mise à jour:', key, '=', value);
    
    if (!this.selectedBlock) {
      console.error('Aucun bloc sélectionné');
      return;
    }
    
    // Mettre à jour la propriété
    if (!this.selectedBlock.props) {
      this.selectedBlock.props = {};
    }
    this.selectedBlock.props[key] = value;
    
    // Rafraîchir l'affichage
    this.refreshPreview();
    this.setSaveStatus('modified');
    
    // Mettre à jour le panneau de propriétés
    this.showBlockProperties(this.selectedBlock);
  };
  
  // 4. Améliorer refreshPreview pour vraiment mettre à jour
  window.visualEditor.refreshPreview = function() {
    console.log('Refresh preview avec', this.blocks.length, 'blocs');
    
    // Sauvegarder en local pour que la preview se mette à jour
    localStorage.setItem('awema_page_blocks', JSON.stringify(this.blocks));
    localStorage.setItem('awema_site_data', JSON.stringify({
      pages: [{
        id: this.currentPage?.id || 'home-page',
        title: this.currentPage?.title || 'Accueil',
        slug: 'index',
        blocks: this.blocks
      }]
    }));
    
    // Recharger l'iframe
    const frame = document.getElementById('preview-frame');
    if (frame) {
      frame.src = frame.src;
    }
    
    // Masquer la zone vide
    const emptyZone = document.getElementById('drop-zone-empty');
    if (emptyZone) {
      emptyZone.style.display = this.blocks.length === 0 ? 'block' : 'none';
    }
  };
  
  // 5. Ajouter un bouton de test pour ajouter un bloc
  const sidebar = document.querySelector('.blocks-library');
  if (sidebar && !document.getElementById('test-add-block')) {
    const testBtn = document.createElement('button');
    testBtn.id = 'test-add-block';
    testBtn.innerHTML = '+ Ajouter un bloc Hero';
    testBtn.style.cssText = `
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      background: #007aff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
    `;
    testBtn.onclick = () => {
      window.visualEditor.addBlock('hero-v3');
    };
    sidebar.insertBefore(testBtn, sidebar.firstChild);
  }
  
  // 6. Sélectionner le premier bloc automatiquement
  if (window.visualEditor.blocks.length > 0) {
    window.visualEditor.selectBlock(window.visualEditor.blocks[0]);
  }
  
  console.log('✅ Édition des blocs activée !');
  console.log('Blocs disponibles:', window.visualEditor.blocks);
  console.log('Cliquez sur un bloc dans la preview pour le sélectionner');
})();