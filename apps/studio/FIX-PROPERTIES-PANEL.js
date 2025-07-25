// PATCH pour corriger le panneau de propriétés
(function() {
  console.log('🔧 Correction du panneau de propriétés...');
  
  if (!window.visualEditor) {
    console.error('❌ visualEditor non trouvé');
    return;
  }
  
  // Remplacer showBlockProperties avec une version qui fonctionne
  window.visualEditor.showBlockProperties = function(block) {
    const panel = document.getElementById('properties-panel');
    if (!panel) return;
    
    console.log('Affichage des propriétés pour:', block);
    
    // Style pour le panneau
    const styles = `
      <style>
        .property-header {
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e5e7;
        }
        .property-header h3 {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #1d1d1f;
        }
        .block-type {
          display: inline-block;
          margin-top: 5px;
          padding: 4px 8px;
          background: #f5f5f7;
          border-radius: 4px;
          font-size: 12px;
          color: #666;
        }
        .property-group {
          margin-bottom: 20px;
        }
        .property-group label {
          display: block;
          margin-bottom: 6px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .property-group input,
        .property-group textarea,
        .property-group select {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d1d6;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.2s;
        }
        .property-group input:focus,
        .property-group textarea:focus,
        .property-group select:focus {
          outline: none;
          border-color: #007aff;
          box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
        }
        .property-group textarea {
          min-height: 80px;
          resize: vertical;
        }
      </style>
    `;
    
    panel.innerHTML = styles + `
      <div class="property-header">
        <h3>${this.getBlockName(block.type)}</h3>
        <span class="block-type">${block.type}</span>
      </div>
      <div class="properties-list">
        ${this.renderPropertiesFixed(block)}
      </div>
    `;
  };
  
  // Nouvelle méthode pour rendre les propriétés
  window.visualEditor.renderPropertiesFixed = function(block) {
    let html = '';
    const props = block.props || {};
    
    // Titre
    if (props.title !== undefined || block.type.includes('hero') || block.type.includes('features')) {
      html += `
        <div class="property-group">
          <label>Titre</label>
          <input type="text" 
                 value="${props.title || ''}" 
                 onchange="window.visualEditor.updateProp('title', this.value)"
                 oninput="window.visualEditor.updateProp('title', this.value)">
        </div>
      `;
    }
    
    // Sous-titre
    if (props.subtitle !== undefined || block.type.includes('hero') || block.type.includes('features')) {
      html += `
        <div class="property-group">
          <label>Sous-titre</label>
          <textarea onchange="window.visualEditor.updateProp('subtitle', this.value)"
                    oninput="window.visualEditor.updateProp('subtitle', this.value)">${props.subtitle || ''}</textarea>
        </div>
      `;
    }
    
    // Texte du bouton
    if (props.buttonText !== undefined || block.type.includes('hero') || block.type.includes('cta')) {
      html += `
        <div class="property-group">
          <label>Texte du bouton</label>
          <input type="text" 
                 value="${props.buttonText || ''}" 
                 onchange="window.visualEditor.updateProp('buttonText', this.value)"
                 oninput="window.visualEditor.updateProp('buttonText', this.value)">
        </div>
      `;
    }
    
    // Variante/Style
    if (props.variant !== undefined || true) {
      const variants = this.getBlockVariants(block.type);
      html += `
        <div class="property-group">
          <label>Style</label>
          <select onchange="window.visualEditor.updateProp('variant', this.value)">
            ${variants.map(v => `
              <option value="${v.value}" ${v.value === (props.variant || variants[0].value) ? 'selected' : ''}>
                ${v.label}
              </option>
            `).join('')}
          </select>
        </div>
      `;
    }
    
    // Boutons d'action
    html += `
      <div class="property-group" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e7;">
        <button onclick="window.visualEditor.duplicateBlock()" 
                style="width: 100%; padding: 10px; margin-bottom: 10px; background: #f5f5f7; border: 1px solid #d1d1d6; border-radius: 6px; cursor: pointer;">
          📋 Dupliquer ce bloc
        </button>
        <button onclick="window.visualEditor.deleteBlock()" 
                style="width: 100%; padding: 10px; background: #ff3b30; color: white; border: none; border-radius: 6px; cursor: pointer;">
          🗑️ Supprimer ce bloc
        </button>
      </div>
    `;
    
    return html;
  };
  
  // Méthode pour obtenir les variantes d'un bloc
  window.visualEditor.getBlockVariants = function(type) {
    const variants = {
      'hero-v3': [
        { value: 'gradient-modern', label: 'Gradient Moderne' },
        { value: 'split-content', label: 'Contenu Divisé' },
        { value: 'centered-bold', label: 'Centré Gras' },
        { value: 'video-background', label: 'Fond Vidéo' }
      ],
      'features-v3': [
        { value: 'cards-hover', label: 'Cartes avec Survol' },
        { value: 'grid-minimal', label: 'Grille Minimaliste' },
        { value: 'timeline-vertical', label: 'Timeline Verticale' },
        { value: 'bento-grid', label: 'Grille Bento' }
      ],
      'default': [
        { value: 'default', label: 'Style par défaut' }
      ]
    };
    
    return variants[type] || variants.default;
  };
  
  // Si un bloc est sélectionné, rafraîchir l'affichage
  if (window.visualEditor.selectedBlock) {
    window.visualEditor.showBlockProperties(window.visualEditor.selectedBlock);
  }
  
  console.log('✅ Panneau de propriétés corrigé !');
})();