/**
 * Éditeur de pages simplifié et fonctionnel
 */

export function generateSimplePageEditorScript(): string {
  return `
// Page Editor Simple - Version qui fonctionne vraiment
(function() {
  'use strict';

  class SimplePageEditor {
    constructor() {
      this.currentPage = null;
      this.selectedBlock = null;
      this.hasChanges = false;
    }

    init() {
      // Méthode init pour la compatibilité avec cms-supabase-direct
      console.log('Page Editor initialisé');
      this.loadInitialContent();
    }

    async loadInitialContent() {
      // Charger le contenu initial
      if (window.CMS_API && window.CMS_API.loadContent) {
        const content = await window.CMS_API.loadContent();
        if (content && content.length > 0) {
          // Adapter le format du contenu
          const page = {
            id: content[0].id || 'home-page',
            title: content[0].page_title || content[0].data?.page_title || 'Accueil',
            blocks: content[0].blocks || content[0].data?.blocks || []
          };
          this.loadPage(page);
        } else {
          // Page par défaut
          this.loadPage({
            id: 'home-page',
            title: 'Accueil',
            blocks: []
          });
        }
      } else {
        // Fallback
        this.loadPage({
          id: 'home-page',
          title: 'Accueil',
          blocks: []
        });
      }
    }

    loadPage(page) {
      this.currentPage = page;
      this.render();
    }

    render() {
      // Remplacer tout le contenu de la page
      document.body.innerHTML = \`
        <div class="editor-container">
          <header class="editor-header">
            <div class="header-left">
              <button class="btn-back" onclick="window.location.reload()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                </svg>
                Retour
              </button>
              <h1>Édition : \${this.currentPage?.title || 'Sans titre'}</h1>
            </div>
            <div class="header-right">
              <span id="save-status"></span>
              <button class="btn-save" onclick="window.pageEditor.save()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H14L21 10V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z"/>
                  <path d="M17 21V13H7V21M7 3V8H15"/>
                </svg>
                Enregistrer
              </button>
            </div>
          </header>
          
          <div class="editor-layout">
            <aside class="editor-sidebar">
              <div class="sidebar-section">
                <h3>Informations de la page</h3>
                <div class="form-group">
                  <label>Titre de la page</label>
                  <input type="text" id="page-title" value="\${this.currentPage?.title || ''}" 
                         onchange="window.pageEditor.updatePageInfo('title', this.value)">
                </div>
                <div class="form-group">
                  <label>URL de la page</label>
                  <input type="text" id="page-slug" value="\${this.currentPage?.slug || ''}" 
                         onchange="window.pageEditor.updatePageInfo('slug', this.value)">
                </div>
              </div>
              
              <div class="sidebar-section">
                <h3>Blocs de la page</h3>
                <div id="blocks-list" class="blocks-list"></div>
                <button class="btn-add-block" onclick="window.pageEditor.showAddBlockModal()">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Ajouter un bloc
                </button>
              </div>
            </aside>
            
            <main class="editor-main">
              <div class="editor-canvas" id="editor-canvas">
                <div class="preview-container" id="preview-container"></div>
              </div>
            </main>
            
            <aside class="properties-panel" id="properties-panel">
              <h3>Propriétés du bloc</h3>
              <div id="properties-content">
                <p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>
              </div>
            </aside>
          </div>
        </div>
      \`;
      
      this.renderBlocks();
      this.renderPreview();
    }

    renderBlocks() {
      const container = document.getElementById('blocks-list');
      const blocks = this.currentPage?.blocks || [];
      
      container.innerHTML = blocks.map((block, index) => \`
        <div class="block-item \${block.id === this.selectedBlock?.id ? 'selected' : ''}" 
             onclick="window.pageEditor.selectBlock('\${block.id}')">
          <div class="block-info">
            <span class="block-type">\${this.getBlockLabel(block.type)}</span>
            <span class="block-title">\${block.props?.title || 'Sans titre'}</span>
          </div>
          <div class="block-actions">
            <button onclick="event.stopPropagation(); window.pageEditor.moveBlock(\${index}, -1)" 
                    \${index === 0 ? 'disabled' : ''}>↑</button>
            <button onclick="event.stopPropagation(); window.pageEditor.moveBlock(\${index}, 1)" 
                    \${index === blocks.length - 1 ? 'disabled' : ''}>↓</button>
            <button onclick="event.stopPropagation(); window.pageEditor.deleteBlock('\${block.id}')">×</button>
          </div>
        </div>
      \`).join('');
    }

    renderPreview() {
      const container = document.getElementById('preview-container');
      const blocks = this.currentPage?.blocks || [];
      
      container.innerHTML = \`
        <div class="page-preview">
          \${blocks.map(block => this.renderBlock(block)).join('')}
        </div>
      \`;
    }

    renderBlock(block) {
      const isSelected = block.id === this.selectedBlock?.id;
      
      return \`
        <div class="preview-block \${isSelected ? 'selected' : ''}" 
             data-block-id="\${block.id}"
             onclick="window.pageEditor.selectBlock('\${block.id}')">
          <div class="block-label">\${this.getBlockLabel(block.type)}</div>
          <div class="block-content">
            \${this.renderBlockContent(block)}
          </div>
        </div>
      \`;
    }

    renderBlockContent(block) {
      const props = block.props || {};
      
      // Rendu simple selon le type
      switch(block.type) {
        case 'hero-ultra-modern':
          return \`
            <div class="hero-preview">
              <h1>\${props.title || 'Titre du Hero'}</h1>
              <p>\${props.subtitle || 'Sous-titre'}</p>
              \${props.buttonText ? '<button>' + props.buttonText + '</button>' : ''}
            </div>
          \`;
          
        case 'content-ultra-modern':
          return \`
            <div class="content-preview">
              <h2>\${props.title || 'Titre du contenu'}</h2>
              <p>\${props.content || 'Contenu de la section...'}</p>
            </div>
          \`;
          
        case 'features-ultra-modern':
          return \`
            <div class="features-preview">
              <h2>\${props.title || 'Nos fonctionnalités'}</h2>
              <div class="features-grid">
                \${[1,2,3].map(i => 
                  '<div class="feature-item">' +
                    '<h3>Feature ' + i + '</h3>' +
                    '<p>Description...</p>' +
                  '</div>'
                ).join('')}
              </div>
            </div>
          \`;
          
        case 'gallery-ultra-modern':
          const imageCount = this.countImages(props);
          return \`
            <div class="gallery-preview">
              <h2>\${props.title || 'Galerie'}</h2>
              <p>\${imageCount} image(s)</p>
              <div class="gallery-grid">
                \${[1,2,3,4].map(i => '<div class="gallery-placeholder">IMG</div>').join('')}
              </div>
            </div>
          \`;
          
        case 'contact-ultra-modern':
          return \`
            <div class="contact-preview">
              <h2>\${props.title || 'Contactez-nous'}</h2>
              <div class="contact-grid">
                <div class="contact-form">
                  <input placeholder="Nom">
                  <input placeholder="Email">
                  <textarea placeholder="Message"></textarea>
                  <button>Envoyer</button>
                </div>
                <div class="contact-map">MAP</div>
              </div>
            </div>
          \`;
          
        default:
          return \`
            <div class="default-preview">
              <p>Bloc \${block.type}</p>
            </div>
          \`;
      }
    }

    selectBlock(blockId) {
      this.selectedBlock = this.currentPage?.blocks.find(b => b.id === blockId);
      this.renderBlocks();
      this.renderPreview();
      this.renderProperties();
    }

    renderProperties() {
      const container = document.getElementById('properties-content');
      
      if (!this.selectedBlock) {
        container.innerHTML = '<p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>';
        return;
      }
      
      const props = this.selectedBlock.props || {};
      const fields = this.getFieldsForBlock(this.selectedBlock.type);
      
      container.innerHTML = fields.map(field => \`
        <div class="property-field">
          <label>\${field.label}</label>
          \${this.renderField(field, props[field.key] || '')}
        </div>
      \`).join('');
    }

    getFieldsForBlock(type) {
      const commonFields = [
        { key: 'title', label: 'Titre', type: 'text' },
        { key: 'subtitle', label: 'Sous-titre', type: 'text' }
      ];
      
      switch(type) {
        case 'hero-ultra-modern':
          return [
            ...commonFields,
            { key: 'buttonText', label: 'Texte du bouton', type: 'text' },
            { key: 'buttonLink', label: 'Lien du bouton', type: 'text' }
          ];
          
        case 'content-ultra-modern':
          return [
            { key: 'title', label: 'Titre', type: 'text' },
            { key: 'content', label: 'Contenu', type: 'textarea' }
          ];
          
        case 'features-ultra-modern':
          return [
            { key: 'title', label: 'Titre', type: 'text' },
            { key: 'subtitle', label: 'Sous-titre', type: 'text' },
            { key: 'feature1_title', label: 'Feature 1 - Titre', type: 'text' },
            { key: 'feature1_description', label: 'Feature 1 - Description', type: 'textarea' }
          ];
          
        case 'gallery-ultra-modern':
          return [
            { key: 'title', label: 'Titre', type: 'text' },
            { key: 'subtitle', label: 'Sous-titre', type: 'text' },
            { key: 'columns_desktop', label: 'Colonnes (desktop)', type: 'number' }
          ];
          
        case 'contact-ultra-modern':
          return [
            { key: 'title', label: 'Titre', type: 'text' },
            { key: 'subtitle', label: 'Sous-titre', type: 'text' },
            { key: 'email', label: 'Email de réception', type: 'email' },
            { key: 'phone', label: 'Téléphone', type: 'text' },
            { key: 'address', label: 'Adresse', type: 'textarea' }
          ];
          
        default:
          return commonFields;
      }
    }

    renderField(field, value) {
      const onChange = "window.pageEditor.updateProperty('" + field.key + "', this.value)";
      
      switch(field.type) {
        case 'textarea':
          return '<textarea onchange="' + onChange + '" oninput="' + onChange + '">' + value + '</textarea>';
        case 'number':
          return '<input type="number" value="' + value + '" onchange="' + onChange + '" oninput="' + onChange + '">';
        case 'email':
          return '<input type="email" value="' + value + '" onchange="' + onChange + '" oninput="' + onChange + '">';
        default:
          return '<input type="text" value="' + value + '" onchange="' + onChange + '" oninput="' + onChange + '">';
      }
    }

    updateProperty(key, value) {
      if (!this.selectedBlock) return;
      
      if (!this.selectedBlock.props) {
        this.selectedBlock.props = {};
      }
      
      this.selectedBlock.props[key] = value;
      this.hasChanges = true;
      this.renderPreview();
      this.updateSaveStatus('Modifications non sauvegardées');
    }

    updatePageInfo(field, value) {
      if (this.currentPage) {
        this.currentPage[field] = value;
        this.hasChanges = true;
        this.updateSaveStatus('Modifications non sauvegardées');
      }
    }

    moveBlock(index, direction) {
      const blocks = this.currentPage.blocks;
      const newIndex = index + direction;
      
      if (newIndex < 0 || newIndex >= blocks.length) return;
      
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      
      this.hasChanges = true;
      this.renderBlocks();
      this.renderPreview();
    }

    deleteBlock(blockId) {
      if (confirm('Supprimer ce bloc ?')) {
        this.currentPage.blocks = this.currentPage.blocks.filter(b => b.id !== blockId);
        
        if (this.selectedBlock?.id === blockId) {
          this.selectedBlock = null;
          this.renderProperties();
        }
        
        this.hasChanges = true;
        this.renderBlocks();
        this.renderPreview();
      }
    }

    showAddBlockModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = \`
        <div class="modal-content">
          <div class="modal-header">
            <h2>Ajouter un bloc</h2>
            <button onclick="this.closest('.modal-overlay').remove()">×</button>
          </div>
          <div class="modal-body">
            <div class="block-templates">
              \${this.getBlockTemplates().map(template => {
                const type = template.type;
                return '<div class="block-template" onclick="window.pageEditor.addBlock(&quot;' + type + '&quot;)">' +
                  '<div class="template-icon">' + template.icon + '</div>' +
                  '<h3>' + template.name + '</h3>' +
                  '<p>' + template.description + '</p>' +
                '</div>';
              }).join('')}
            </div>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
    }

    getBlockTemplates() {
      return [
        {
          type: 'hero-ultra-modern',
          name: 'Hero',
          icon: '🏔️',
          description: 'Section d\\\'accueil avec titre et CTA'
        },
        {
          type: 'content-ultra-modern',
          name: 'Contenu',
          icon: '📝',
          description: 'Section de contenu texte'
        },
        {
          type: 'features-ultra-modern',
          name: 'Fonctionnalités',
          icon: '✨',
          description: 'Liste de fonctionnalités'
        },
        {
          type: 'gallery-ultra-modern',
          name: 'Galerie',
          icon: '🖼️',
          description: 'Galerie d\\\'images'
        },
        {
          type: 'contact-ultra-modern',
          name: 'Contact',
          icon: '📧',
          description: 'Formulaire de contact'
        }
      ];
    }

    addBlock(type) {
      const newBlock = {
        id: crypto.randomUUID(),
        type: type,
        props: this.getDefaultProps(type)
      };
      
      this.currentPage.blocks.push(newBlock);
      
      // Fermer la modal
      document.querySelector('.modal-overlay').remove();
      
      // Sélectionner le nouveau bloc
      this.selectBlock(newBlock.id);
      
      this.hasChanges = true;
      this.renderBlocks();
      this.renderPreview();
    }

    getDefaultProps(type) {
      switch(type) {
        case 'hero-ultra-modern':
          return {
            title: 'Bienvenue',
            subtitle: 'Créez votre site web professionnel',
            buttonText: 'Commencer',
            buttonLink: '#contact'
          };
        case 'content-ultra-modern':
          return {
            title: 'À propos',
            content: 'Présentez votre entreprise ici...'
          };
        case 'features-ultra-modern':
          return {
            title: 'Nos services',
            subtitle: 'Ce que nous proposons'
          };
        case 'gallery-ultra-modern':
          return {
            title: 'Notre portfolio',
            subtitle: 'Découvrez nos réalisations',
            columns_desktop: 3
          };
        case 'contact-ultra-modern':
          return {
            title: 'Contactez-nous',
            subtitle: 'Nous sommes là pour vous aider'
          };
        default:
          return {};
      }
    }

    getBlockLabel(type) {
      const labels = {
        'hero-ultra-modern': 'Hero',
        'content-ultra-modern': 'Contenu',
        'features-ultra-modern': 'Fonctionnalités',
        'gallery-ultra-modern': 'Galerie',
        'contact-ultra-modern': 'Contact'
      };
      return labels[type] || type;
    }

    countImages(props) {
      let count = 0;
      for (let i = 1; i <= 20; i++) {
        if (props['image' + i + '_src']) count++;
      }
      return count;
    }

    updateSaveStatus(message, type = 'info') {
      const status = document.getElementById('save-status');
      status.textContent = message;
      status.className = 'save-status ' + type;
    }

    async save() {
      this.updateSaveStatus('Sauvegarde en cours...', 'saving');
      
      // Simuler un délai
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Sauvegarder dans le dataManager
      if (window.cmsApp && window.cmsApp.dataManager) {
        window.cmsApp.dataManager.savePage(this.currentPage);
        this.hasChanges = false;
        this.updateSaveStatus('Sauvegardé', 'success');
        
        setTimeout(() => {
          this.updateSaveStatus('');
        }, 3000);
      } else {
        this.updateSaveStatus('Erreur de sauvegarde', 'error');
      }
    }
  }

  // Initialiser l'éditeur
  window.pageEditor = new SimplePageEditor();
})();`;
}