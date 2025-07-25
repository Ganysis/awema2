/**
 * Éditeur de pages amélioré pour le CMS
 * Intègre la gestion des médias et une meilleure ergonomie
 */

export function generateEnhancedPageEditorScript(): string {
  return `
// Éditeur de pages CMS Enhanced
(function() {
  'use strict';

  class PageEditorEnhanced {
    constructor() {
      this.currentPage = null;
      this.selectedBlockId = null;
      this.autoSaveTimeout = null;
      this.hasChanges = false;
    }

    async init() {
      // Injecter l'ID de l'éditeur dans le conteneur
      const container = document.getElementById('cms-content');
      if (container) {
        container.id = 'page-editor-content';
      }
      
      // Charger la première page
      await this.loadPages();
    }

    async loadPages() {
      try {
        // Utiliser l'API CMS
        if (window.CMS_API && window.CMS_API.loadContent) {
          const content = await window.CMS_API.loadContent();
          
          if (content.pages && content.pages.length > 0) {
            const homePage = content.pages.find(p => p.slug === '/') || content.pages[0];
            this.currentPage = {
              id: homePage.id || 'home-page',
              page_title: homePage.title || 'Accueil',
              page_slug: homePage.slug || '/',
              blocks: homePage.blocks || [],
              seo: homePage.meta || {}
            };
            this.render();
            return;
          }
        }
        
        // Fallback localStorage
        const storedData = localStorage.getItem('awema_site_data');
        if (storedData) {
          const siteData = JSON.parse(storedData);
          if (siteData.pages && siteData.pages.length > 0) {
            const homePage = siteData.pages.find(p => p.slug === '/') || siteData.pages[0];
            this.currentPage = {
              id: homePage.id || 'home-page',
              page_title: homePage.title || 'Accueil',
              page_slug: homePage.slug || '/',
              blocks: homePage.blocks || [],
              seo: homePage.meta || {}
            };
            this.render();
          }
        }
      } catch (error) {
        console.error('Erreur chargement pages:', error);
      }
    }

    render() {
      const container = document.getElementById('page-editor-content') || document.getElementById('cms-content');
      
      container.innerHTML = \`
        <div class="page-editor-enhanced">
          <div class="editor-header">
            <div class="header-info">
              <h2>Édition : \${this.currentPage.page_title || 'Sans titre'}</h2>
              <span class="page-url">URL: \${this.currentPage.page_slug}</span>
            </div>
            <div class="header-actions">
              <span id="save-status" class="save-status"></span>
              <button class="btn-save" onclick="window.pageEditor.saveChanges()">
                <i class="fas fa-save"></i> Enregistrer
              </button>
            </div>
          </div>
          
          <div class="editor-layout">
            <!-- Sidebar gauche : blocs -->
            <div class="sidebar-left">
              <div class="sidebar-header">
                <h3>Blocs de la page</h3>
                <button class="btn-add-block" onclick="window.pageEditor.showAddBlockModal()">
                  <i class="fas fa-plus"></i> Ajouter
                </button>
              </div>
              <div id="blocks-list" class="blocks-list"></div>
            </div>
            
            <!-- Zone centrale : aperçu -->
            <div class="preview-area">
              <div class="preview-toolbar">
                <button class="preview-mode active" data-mode="desktop">
                  <i class="fas fa-desktop"></i>
                </button>
                <button class="preview-mode" data-mode="tablet">
                  <i class="fas fa-tablet-alt"></i>
                </button>
                <button class="preview-mode" data-mode="mobile">
                  <i class="fas fa-mobile-alt"></i>
                </button>
              </div>
              <div class="preview-container" id="preview-container">
                <iframe id="preview-frame" class="preview-frame"></iframe>
              </div>
            </div>
            
            <!-- Sidebar droite : propriétés -->
            <div class="sidebar-right">
              <div class="sidebar-header">
                <h3>Propriétés du bloc</h3>
              </div>
              <div id="properties-container" class="properties-container">
                <p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>
              </div>
            </div>
          </div>
        </div>
      \`;
      
      this.renderBlocks();
      this.updatePreview();
      this.setupEventListeners();
    }

    setupEventListeners() {
      // Preview modes
      document.querySelectorAll('.preview-mode').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.preview-mode').forEach(b => b.classList.remove('active'));
          e.currentTarget.classList.add('active');
          
          const mode = e.currentTarget.dataset.mode;
          const container = document.getElementById('preview-container');
          
          switch(mode) {
            case 'tablet':
              container.style.maxWidth = '768px';
              break;
            case 'mobile':
              container.style.maxWidth = '375px';
              break;
            default:
              container.style.maxWidth = '100%';
          }
        });
      });
    }

    renderBlocks() {
      const container = document.getElementById('blocks-list');
      const blocks = this.currentPage.blocks || [];
      
      container.innerHTML = blocks.map((block, index) => \`
        <div class="block-item \${block.id === this.selectedBlockId ? 'selected' : ''}" 
             data-block-id="\${block.id}">
          <div class="block-content" onclick="window.pageEditor.selectBlock('\${block.id}')">
            <div class="block-icon">\${this.getBlockIcon(block)}</div>
            <div class="block-info">
              <h4>\${this.getBlockName(block)}</h4>
              <p>\${this.getBlockDescription(block)}</p>
            </div>
          </div>
          <div class="block-actions">
            <button class="btn-move" data-direction="up" data-index="\${index}" 
                    \${index === 0 ? 'disabled' : ''}>
              <i class="fas fa-chevron-up"></i>
            </button>
            <button class="btn-move" data-direction="down" data-index="\${index}"
                    \${index === blocks.length - 1 ? 'disabled' : ''}>
              <i class="fas fa-chevron-down"></i>
            </button>
            <button class="btn-delete" onclick="window.pageEditor.deleteBlock('\${block.id}')">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      \`).join('');
      
      // Ajouter les écouteurs pour les boutons de déplacement
      document.querySelectorAll('.btn-move').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const index = parseInt(e.currentTarget.dataset.index);
          const direction = e.currentTarget.dataset.direction;
          this.moveBlock(index, direction);
        });
      });
    }

    getBlockIcon(block) {
      const icons = {
        'hero': '🏔️',
        'features': '✨',
        'gallery': '🖼️',
        'testimonials': '💬',
        'contact': '📧',
        'pricing': '💰',
        'faq': '❓',
        'content': '📝',
        'cta': '📢',
        'header': '🔝',
        'footer': '🔚'
      };
      
      for (const [key, icon] of Object.entries(icons)) {
        if (block.type.includes(key)) return icon;
      }
      return '📦';
    }

    getBlockName(block) {
      const names = {
        'hero-ultra-modern': 'Hero Ultra-Modern',
        'contact-ultra-modern': 'Contact Ultra-Modern',
        'gallery-ultra-modern': 'Galerie Ultra-Modern',
        'features-ultra-modern': 'Features Ultra-Modern',
        'testimonials-ultra-modern': 'Témoignages Ultra-Modern',
        'pricing-ultra-modern': 'Tarifs Ultra-Modern',
        'faq-ultra-modern': 'FAQ Ultra-Modern',
        'content-ultra-modern': 'Contenu Ultra-Modern',
        'cta-ultra-modern': 'CTA Ultra-Modern',
        'header-ultra-modern': 'Header Ultra-Modern',
        'footer-ultra-modern': 'Footer Ultra-Modern'
      };
      return names[block.type] || block.type;
    }

    getBlockDescription(block) {
      const props = block.props || {};
      if (props.title) return props.title;
      if (props.heading) return props.heading;
      if (block.type.includes('gallery')) {
        const imageCount = this.countGalleryImages(props);
        return \`\${imageCount} image\${imageCount > 1 ? 's' : ''}\`;
      }
      if (block.type.includes('features')) {
        const featureCount = this.countFeatures(props);
        return \`\${featureCount} fonctionnalité\${featureCount > 1 ? 's' : ''}\`;
      }
      return 'Contenu du bloc';
    }

    countGalleryImages(props) {
      let count = 0;
      for (let i = 1; i <= 20; i++) {
        if (props[\`image\${i}_src\`]) count++;
      }
      return count;
    }

    countFeatures(props) {
      let count = 0;
      for (let i = 1; i <= 10; i++) {
        if (props[\`feature\${i}_title\`]) count++;
      }
      return count;
    }

    selectBlock(blockId) {
      this.selectedBlockId = blockId;
      const block = this.currentPage.blocks.find(b => b.id === blockId);
      
      // Mettre à jour la sélection visuelle
      document.querySelectorAll('.block-item').forEach(el => {
        el.classList.toggle('selected', el.dataset.blockId === blockId);
      });
      
      // Afficher les propriétés
      this.renderProperties(block);
      
      // Scroll to block in preview
      const iframe = document.getElementById('preview-frame');
      if (iframe && iframe.contentWindow) {
        const blockEl = iframe.contentWindow.document.querySelector(\`[data-block-id="\${blockId}"]\`);
        if (blockEl) {
          blockEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Highlight temporaire
          blockEl.style.outline = '3px solid #3B82F6';
          setTimeout(() => {
            blockEl.style.outline = '';
          }, 2000);
        }
      }
    }

    renderProperties(block) {
      const container = document.getElementById('properties-container');
      
      if (!block) {
        container.innerHTML = '<p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>';
        return;
      }
      
      // Générer les champs selon le type de bloc
      const fields = this.getFieldsForBlock(block);
      
      // Grouper les champs par catégorie
      const groups = {};
      fields.forEach(field => {
        const group = field.group || 'Général';
        if (!groups[group]) groups[group] = [];
        groups[group].push(field);
      });
      
      container.innerHTML = Object.entries(groups).map(([groupName, groupFields]) => \`
        <div class="property-group">
          <h4 class="property-group-title">\${groupName}</h4>
          \${groupFields.map(field => \`
            <div class="property-field">
              <label class="property-label">\${field.label}</label>
              \${this.renderField(field, block)}
            </div>
          \`).join('')}
        </div>
      \`).join('');
    }

    getFieldsForBlock(block) {
      const fields = [];
      const props = block.props || {};
      
      // Champs spécifiques selon le type
      if (block.type.includes('gallery')) {
        // Pour la galerie, gérer les images
        fields.push({
          key: '_gallery_manager',
          label: 'Gérer les images',
          type: 'gallery_manager',
          group: 'Images'
        });
        
        // Compter les images existantes
        let imageCount = 0;
        for (let i = 1; i <= 20; i++) {
          if (props[\`image\${i}_src\`]) imageCount++;
        }
        
        if (imageCount > 0) {
          fields.push({
            key: '_gallery_info',
            label: \`\${imageCount} image(s) dans la galerie\`,
            type: 'info',
            group: 'Images'
          });
        }
      }
      
      // Parcourir les propriétés existantes
      Object.entries(props).forEach(([key, value]) => {
        // Skip les propriétés d'images individuelles pour la galerie
        if (block.type.includes('gallery') && key.startsWith('image') && key.includes('_')) {
          return;
        }
        
        const field = {
          key: key,
          value: value,
          label: this.formatLabel(key),
          type: this.getFieldType(key, value),
          group: this.getFieldGroup(key)
        };
        
        // Ajouter des options pour les champs spécifiques
        if (key === 'variant' || key === 'visualVariant') {
          field.options = this.getVariantOptions(block.type, key);
        }
        
        fields.push(field);
      });
      
      return fields;
    }

    getFieldType(key, value) {
      // Types spécifiques selon le nom
      if (key.includes('description') || key.includes('content') || key.includes('text')) {
        return 'textarea';
      }
      if (key.includes('url') || key.includes('link')) {
        return 'url';
      }
      if (key.includes('email')) {
        return 'email';
      }
      if (key.includes('phone') || key.includes('tel')) {
        return 'tel';
      }
      if (key.includes('number') || key.includes('columns') || key.includes('count')) {
        return 'number';
      }
      if (typeof value === 'boolean') {
        return 'checkbox';
      }
      if (key === 'variant' || key === 'visualVariant' || key.includes('style') || key.includes('type')) {
        return 'select';
      }
      
      return 'text';
    }

    getFieldGroup(key) {
      if (key.includes('title') || key.includes('subtitle') || key.includes('heading')) {
        return 'Contenu';
      }
      if (key.includes('variant') || key.includes('visual') || key.includes('style')) {
        return 'Apparence';
      }
      if (key.includes('columns') || key.includes('gap') || key.includes('spacing')) {
        return 'Mise en page';
      }
      if (key.includes('show') || key.includes('enable') || key.includes('display')) {
        return 'Affichage';
      }
      if (key.includes('seo') || key.includes('meta') || key.includes('alt')) {
        return 'SEO';
      }
      
      return 'Général';
    }

    formatLabel(key) {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/_/g, ' ')
        .replace(/^Button /, '')
        .replace(/^Cta /, 'CTA ');
    }

    getVariantOptions(blockType, key) {
      if (key === 'visualVariant') {
        return [
          { value: 'modern', label: '🎨 Moderne' },
          { value: 'minimal', label: '⚡ Minimaliste' },
          { value: 'bold', label: '🔥 Audacieux' },
          { value: 'elegant', label: '✨ Élégant' }
        ];
      }
      
      if (blockType.includes('gallery') && key === 'variant') {
        return [
          { value: 'masonry-flow', label: '🎭 Masonry' },
          { value: 'grid-uniform', label: '⬜ Grille' },
          { value: 'carousel-fullscreen', label: '🎠 Carrousel' },
          { value: 'instagram-style', label: '📱 Instagram' }
        ];
      }
      
      return [];
    }

    renderField(field, block) {
      const value = field.value || '';
      const onchange = \`window.pageEditor.updateBlockProperty('\${block.id}', '\${field.key}', this.value)\`;
      const oncheck = \`window.pageEditor.updateBlockProperty('\${block.id}', '\${field.key}', this.checked)\`;
      
      switch (field.type) {
        case 'gallery_manager':
          return \`
            <button class="btn-gallery-manager" onclick="window.pageEditor.openGalleryManager('\${block.id}')">
              <i class="fas fa-images"></i> Ouvrir le gestionnaire d'images
            </button>
          \`;
          
        case 'info':
          return \`<p class="field-info">\${field.label}</p>\`;
          
        case 'textarea':
          return \`<textarea class="property-input property-textarea" 
                           onchange="\${onchange}" 
                           oninput="\${onchange}">\${value}</textarea>\`;
                           
        case 'checkbox':
          return \`<label class="checkbox-label">
                    <input type="checkbox" 
                           \${value ? 'checked' : ''}
                           onchange="\${oncheck}" />
                    <span>Activer</span>
                  </label>\`;
                  
        case 'number':
          return \`<input type="number" 
                         class="property-input" 
                         value="\${value}" 
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
                         
        case 'select':
          const options = field.options || [];
          return \`<select class="property-input property-select" onchange="\${onchange}">
                    \${options.map(opt => \`
                      <option value="\${opt.value}" \${value === opt.value ? 'selected' : ''}>
                        \${opt.label}
                      </option>
                    \`).join('')}
                  </select>\`;
                  
        case 'email':
          return \`<input type="email" 
                         class="property-input" 
                         value="\${value}" 
                         placeholder="email@exemple.fr"
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
                         
        case 'tel':
          return \`<input type="tel" 
                         class="property-input" 
                         value="\${value}" 
                         placeholder="01 23 45 67 89"
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
                         
        case 'url':
          return \`<input type="url" 
                         class="property-input" 
                         value="\${value}" 
                         placeholder="https://exemple.com"
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
                         
        default:
          return \`<input type="text" 
                         class="property-input" 
                         value="\${value}" 
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
      }
    }

    openGalleryManager(blockId) {
      const block = this.currentPage.blocks.find(b => b.id === blockId);
      if (!block) return;
      
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = \`
        <div class="modal-content gallery-manager-modal">
          <div class="modal-header">
            <h3>Gestionnaire d'images de la galerie</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="gallery-tabs">
              <button class="tab-btn active" data-tab="current">Images actuelles</button>
              <button class="tab-btn" data-tab="library">Bibliothèque de médias</button>
            </div>
            
            <div class="tab-content" id="current-tab">
              <div class="current-images" id="current-images"></div>
              <button class="btn-add-from-library" onclick="window.pageEditor.switchToLibraryTab()">
                <i class="fas fa-plus"></i> Ajouter depuis la bibliothèque
              </button>
            </div>
            
            <div class="tab-content" id="library-tab" style="display: none;">
              <div class="library-grid" id="library-grid"></div>
            </div>
          </div>
          
          <div class="modal-footer">
            <button class="btn-secondary" onclick="this.closest('.modal-overlay').remove()">
              Annuler
            </button>
            <button class="btn-primary" onclick="window.pageEditor.saveGalleryChanges('\${blockId}')">
              <i class="fas fa-save"></i> Enregistrer les modifications
            </button>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
      
      // Setup tabs
      modal.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          modal.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          modal.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
          
          e.target.classList.add('active');
          const tabId = e.target.dataset.tab + '-tab';
          modal.querySelector('#' + tabId).style.display = 'block';
        });
      });
      
      // Charger les images actuelles
      this.loadCurrentGalleryImages(block);
      
      // Charger la bibliothèque
      this.loadMediaLibrary();
    }

    loadCurrentGalleryImages(block) {
      const container = document.getElementById('current-images');
      const props = block.props || {};
      const images = [];
      
      // Extraire les images existantes
      for (let i = 1; i <= 20; i++) {
        if (props[\`image\${i}_src\`]) {
          images.push({
            index: i,
            src: props[\`image\${i}_src\`],
            title: props[\`image\${i}_title\`] || '',
            description: props[\`image\${i}_description\`] || '',
            category: props[\`image\${i}_category\`] || 'all',
            alt: props[\`image\${i}_alt\`] || ''
          });
        }
      }
      
      if (images.length === 0) {
        container.innerHTML = '<p class="empty-state">Aucune image dans la galerie. Ajoutez-en depuis la bibliothèque.</p>';
        return;
      }
      
      container.innerHTML = \`
        <div class="gallery-images-grid">
          \${images.map((img, idx) => \`
            <div class="gallery-image-item" data-index="\${img.index}">
              <div class="image-preview">
                <img src="\${img.src}" alt="\${img.alt}">
                <div class="image-actions">
                  <button class="btn-edit-image" onclick="window.pageEditor.editGalleryImage(\${img.index})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-remove-image" onclick="window.pageEditor.removeGalleryImage(\${img.index})">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
              <div class="image-info">
                <input type="text" placeholder="Titre" value="\${img.title}" 
                       class="image-title" data-index="\${img.index}">
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
      
      // Stocker temporairement les modifications
      this.tempGalleryImages = images;
    }

    loadMediaLibrary() {
      const container = document.getElementById('library-grid');
      const mediaLibrary = window.CMS_API?.getMediaLibrary() || [];
      
      if (mediaLibrary.length === 0) {
        container.innerHTML = \`
          <p class="empty-state">
            Aucune image dans la bibliothèque. 
            <a href="#" onclick="window.cms.loadView('media'); return false;">
              Ajouter des images
            </a>
          </p>
        \`;
        return;
      }
      
      container.innerHTML = \`
        <div class="media-selection-grid">
          \${mediaLibrary.map((media, idx) => \`
            <div class="media-select-item" data-media-index="\${idx}">
              <img src="\${media.url}" alt="\${media.alt || media.title || ''}">
              <div class="media-select-info">
                <p>\${media.title || 'Sans titre'}</p>
              </div>
              <div class="media-select-checkbox">
                <input type="checkbox" id="media-\${idx}" data-media-index="\${idx}">
              </div>
            </div>
          \`).join('')}
        </div>
      \`;
      
      // Ajouter les écouteurs pour la sélection
      container.querySelectorAll('.media-select-item').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.type !== 'checkbox') {
            const checkbox = item.querySelector('input[type="checkbox"]');
            checkbox.checked = !checkbox.checked;
          }
          item.classList.toggle('selected', item.querySelector('input[type="checkbox"]').checked);
        });
      });
    }

    switchToLibraryTab() {
      document.querySelector('[data-tab="library"]').click();
    }

    saveGalleryChanges(blockId) {
      const block = this.currentPage.blocks.find(b => b.id === blockId);
      if (!block) return;
      
      // Récupérer les images sélectionnées depuis la bibliothèque
      const selectedMediaIndexes = [];
      document.querySelectorAll('#library-tab input[type="checkbox"]:checked').forEach(cb => {
        selectedMediaIndexes.push(parseInt(cb.dataset.mediaIndex));
      });
      
      // Construire la nouvelle liste d'images
      const newImages = [...(this.tempGalleryImages || [])];
      const mediaLibrary = window.CMS_API?.getMediaLibrary() || [];
      
      selectedMediaIndexes.forEach(idx => {
        const media = mediaLibrary[idx];
        if (media) {
          newImages.push({
            index: newImages.length + 1,
            src: media.url,
            title: media.title || '',
            description: media.description || '',
            category: media.category || 'all',
            alt: media.alt || ''
          });
        }
      });
      
      // Mettre à jour les propriétés du bloc
      const newProps = { ...block.props };
      
      // Effacer toutes les images existantes
      for (let i = 1; i <= 20; i++) {
        delete newProps[\`image\${i}_src\`];
        delete newProps[\`image\${i}_title\`];
        delete newProps[\`image\${i}_description\`];
        delete newProps[\`image\${i}_category\`];
        delete newProps[\`image\${i}_alt\`];
      }
      
      // Ajouter les nouvelles images
      newImages.forEach((img, idx) => {
        const i = idx + 1;
        newProps[\`image\${i}_src\`] = img.src;
        newProps[\`image\${i}_title\`] = img.title;
        newProps[\`image\${i}_description\`] = img.description;
        newProps[\`image\${i}_category\`] = img.category;
        newProps[\`image\${i}_alt\`] = img.alt;
      });
      
      block.props = newProps;
      
      // Fermer la modal
      document.querySelector('.modal-overlay').remove();
      
      // Rafraîchir l'affichage
      this.renderBlocks();
      this.renderProperties(block);
      this.updatePreview();
      this.scheduleAutoSave();
    }

    removeGalleryImage(index) {
      if (confirm('Supprimer cette image de la galerie ?')) {
        this.tempGalleryImages = this.tempGalleryImages.filter(img => img.index !== index);
        
        // Recharger l'affichage
        const block = this.currentPage.blocks.find(b => b.id === this.selectedBlockId);
        this.loadCurrentGalleryImages(block);
      }
    }

    moveBlock(index, direction) {
      const blocks = [...this.currentPage.blocks];
      const newIndex = direction === 'up' ? index - 1 : index + 1;
      
      if (newIndex < 0 || newIndex >= blocks.length) return;
      
      // Échanger les blocs
      [blocks[index], blocks[newIndex]] = [blocks[newIndex], blocks[index]];
      
      this.currentPage.blocks = blocks;
      this.renderBlocks();
      this.updatePreview();
      this.scheduleAutoSave();
    }

    deleteBlock(blockId) {
      if (!confirm('Supprimer ce bloc ?')) return;
      
      this.currentPage.blocks = this.currentPage.blocks.filter(b => b.id !== blockId);
      
      if (this.selectedBlockId === blockId) {
        this.selectedBlockId = null;
        this.renderProperties(null);
      }
      
      this.renderBlocks();
      this.updatePreview();
      this.scheduleAutoSave();
    }

    showAddBlockModal() {
      const modal = document.createElement('div');
      modal.className = 'modal-overlay';
      modal.innerHTML = \`
        <div class="modal-content add-block-modal">
          <div class="modal-header">
            <h3>Ajouter un bloc</h3>
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="block-categories">
              <button class="category-btn active" data-category="all">Tous</button>
              <button class="category-btn" data-category="hero">Hero</button>
              <button class="category-btn" data-category="content">Contenu</button>
              <button class="category-btn" data-category="features">Features</button>
              <button class="category-btn" data-category="gallery">Galerie</button>
              <button class="category-btn" data-category="contact">Contact</button>
            </div>
            
            <div class="block-templates-grid">
              \${this.getBlockTemplates().map(template => \`
                <div class="block-template" data-category="\${template.category}" 
                     onclick="window.pageEditor.addBlock('\${template.type}')">
                  <div class="template-icon">\${template.icon}</div>
                  <h4>\${template.name}</h4>
                  <p>\${template.description}</p>
                </div>
              \`).join('')}
            </div>
          </div>
        </div>
      \`;
      
      document.body.appendChild(modal);
      
      // Setup category filters
      modal.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          modal.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
          e.target.classList.add('active');
          
          const category = e.target.dataset.category;
          modal.querySelectorAll('.block-template').forEach(template => {
            if (category === 'all' || template.dataset.category === category) {
              template.style.display = '';
            } else {
              template.style.display = 'none';
            }
          });
        });
      });
    }

    getBlockTemplates() {
      return [
        {
          type: 'hero-ultra-modern',
          name: 'Hero Ultra-Modern',
          icon: '🏔️',
          category: 'hero',
          description: 'Section hero avec 8 variantes modernes'
        },
        {
          type: 'features-ultra-modern',
          name: 'Features Ultra-Modern',
          icon: '✨',
          category: 'features',
          description: 'Présentation des fonctionnalités'
        },
        {
          type: 'gallery-ultra-modern',
          name: 'Galerie Ultra-Modern',
          icon: '🖼️',
          category: 'gallery',
          description: 'Galerie d\'images avec lightbox'
        },
        {
          type: 'testimonials-ultra-modern',
          name: 'Témoignages Ultra-Modern',
          icon: '💬',
          category: 'content',
          description: 'Témoignages clients'
        },
        {
          type: 'contact-ultra-modern',
          name: 'Contact Ultra-Modern',
          icon: '📧',
          category: 'contact',
          description: 'Formulaire de contact avec carte'
        },
        {
          type: 'pricing-ultra-modern',
          name: 'Tarifs Ultra-Modern',
          icon: '💰',
          category: 'content',
          description: 'Tableaux de prix'
        },
        {
          type: 'faq-ultra-modern',
          name: 'FAQ Ultra-Modern',
          icon: '❓',
          category: 'content',
          description: 'Questions fréquentes'
        },
        {
          type: 'content-ultra-modern',
          name: 'Contenu Ultra-Modern',
          icon: '📝',
          category: 'content',
          description: 'Bloc de contenu flexible'
        },
        {
          type: 'cta-ultra-modern',
          name: 'CTA Ultra-Modern',
          icon: '📢',
          category: 'content',
          description: 'Appel à l\'action'
        }
      ];
    }

    addBlock(type) {
      const newBlock = {
        id: crypto.randomUUID(),
        type: type,
        props: this.getDefaultPropsForType(type)
      };
      
      this.currentPage.blocks.push(newBlock);
      
      // Fermer la modal
      document.querySelector('.modal-overlay').remove();
      
      // Sélectionner le nouveau bloc
      this.selectBlock(newBlock.id);
      
      // Rafraîchir
      this.renderBlocks();
      this.updatePreview();
      this.scheduleAutoSave();
    }

    getDefaultPropsForType(type) {
      // Retourner des props par défaut selon le type
      const defaults = {
        'hero-ultra-modern': {
          title: 'Bienvenue sur notre site',
          subtitle: 'Découvrez nos services exceptionnels',
          buttonText: 'En savoir plus',
          buttonLink: '#contact',
          variant: 'gradient-wave',
          visualVariant: 'modern'
        },
        'gallery-ultra-modern': {
          title: 'Notre Galerie',
          subtitle: 'Découvrez nos réalisations',
          variant: 'masonry-flow',
          visualVariant: 'modern',
          showOverlay: true,
          enableLightbox: true,
          columns_desktop: 3,
          columns_tablet: 2,
          columns_mobile: 1,
          gap: 'md'
        },
        'features-ultra-modern': {
          title: 'Nos Services',
          subtitle: 'Ce que nous proposons',
          variant: 'cards-hover',
          visualVariant: 'modern'
        },
        'contact-ultra-modern': {
          title: 'Contactez-nous',
          subtitle: 'Nous sommes là pour vous aider',
          variant: 'split-map',
          visualVariant: 'modern',
          showMap: true
        }
      };
      
      return defaults[type] || {};
    }

    updateBlockProperty(blockId, key, value) {
      const block = this.currentPage.blocks.find(b => b.id === blockId);
      if (!block) return;
      
      if (!block.props) block.props = {};
      block.props[key] = value;
      
      this.hasChanges = true;
      this.updatePreview();
      this.scheduleAutoSave();
    }

    updatePreview() {
      const iframe = document.getElementById('preview-frame');
      const content = this.generatePreviewHTML();
      
      iframe.srcdoc = content;
    }

    generatePreviewHTML() {
      const blocks = this.currentPage.blocks || [];
      
      return \`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2/dist/tailwind.min.css" rel="stylesheet">
          <style>
            body { 
              font-family: system-ui, -apple-system, sans-serif;
              margin: 0;
              padding: 0;
              background: #f9fafb;
            }
            
            /* Styles preview améliorés */
            .block-preview {
              position: relative;
              min-height: 100px;
              transition: all 0.3s;
            }
            
            .block-preview:hover {
              box-shadow: 0 0 0 2px #3B82F6;
            }
            
            .block-label {
              position: absolute;
              top: 0;
              left: 0;
              background: #3B82F6;
              color: white;
              padding: 0.25rem 0.75rem;
              font-size: 0.75rem;
              font-weight: 500;
              z-index: 10;
              opacity: 0;
              transition: opacity 0.2s;
            }
            
            .block-preview:hover .block-label {
              opacity: 1;
            }
            
            /* Preview des différents blocs */
            .hero-preview {
              min-height: 400px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              color: white;
              padding: 4rem 2rem;
            }
            
            .gallery-preview {
              padding: 3rem 2rem;
              background: white;
            }
            
            .gallery-grid {
              display: grid;
              gap: 1rem;
              margin-top: 2rem;
            }
            
            .gallery-image {
              aspect-ratio: 1;
              background: #e5e7eb;
              border-radius: 0.5rem;
              overflow: hidden;
            }
            
            .gallery-image img {
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
            
            .features-preview {
              padding: 3rem 2rem;
              background: #f9fafb;
            }
            
            .contact-preview {
              padding: 3rem 2rem;
              background: white;
            }
            
            /* Responsive grid */
            @media (min-width: 768px) {
              .gallery-grid {
                grid-template-columns: repeat(2, 1fr);
              }
            }
            
            @media (min-width: 1024px) {
              .gallery-grid {
                grid-template-columns: repeat(3, 1fr);
              }
            }
          </style>
        </head>
        <body>
          \${blocks.map(block => this.renderBlockPreview(block)).join('')}
          
          <script>
            // Communication avec l'éditeur
            document.querySelectorAll('.block-preview').forEach(block => {
              block.addEventListener('click', () => {
                const blockId = block.dataset.blockId;
                window.parent.pageEditor.selectBlock(blockId);
              });
            });
          </script>
        </body>
        </html>
      \`;
    }

    renderBlockPreview(block) {
      let content = '';
      const props = block.props || {};
      
      switch(block.type) {
        case 'hero-ultra-modern':
          content = \`
            <div class="hero-preview">
              <div>
                \${props.title ? \`<h1 class="text-5xl font-bold mb-4">\${props.title}</h1>\` : ''}
                \${props.subtitle ? \`<p class="text-xl mb-8 opacity-90">\${props.subtitle}</p>\` : ''}
                \${props.buttonText ? \`<button class="px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold">\${props.buttonText}</button>\` : ''}
              </div>
            </div>
          \`;
          break;
          
        case 'gallery-ultra-modern':
          const images = [];
          for (let i = 1; i <= 20; i++) {
            if (props[\`image\${i}_src\`]) {
              images.push({
                src: props[\`image\${i}_src\`],
                title: props[\`image\${i}_title\`] || ''
              });
            }
          }
          
          const columns = props.columns_desktop || 3;
          
          content = \`
            <div class="gallery-preview">
              \${props.title ? \`<h2 class="text-3xl font-bold text-center mb-2">\${props.title}</h2>\` : ''}
              \${props.subtitle ? \`<p class="text-gray-600 text-center mb-8">\${props.subtitle}</p>\` : ''}
              <div class="gallery-grid" style="grid-template-columns: repeat(\${columns}, 1fr);">
                \${images.length > 0 ? 
                  images.map(img => \`
                    <div class="gallery-image">
                      <img src="\${img.src}" alt="\${img.title}" />
                    </div>
                  \`).join('') : 
                  \`<div class="col-span-\${columns} text-center text-gray-500 py-12">
                    Aucune image dans la galerie
                  </div>\`
                }
              </div>
            </div>
          \`;
          break;
          
        case 'features-ultra-modern':
          content = \`
            <div class="features-preview">
              \${props.title ? \`<h2 class="text-3xl font-bold text-center mb-2">\${props.title}</h2>\` : ''}
              \${props.subtitle ? \`<p class="text-gray-600 text-center mb-8">\${props.subtitle}</p>\` : ''}
              <div class="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
                \${[1,2,3].map(i => \`
                  <div class="bg-white p-6 rounded-lg shadow-sm">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg mb-4"></div>
                    <h3 class="font-semibold mb-2">Feature \${i}</h3>
                    <p class="text-sm text-gray-600">Description de la fonctionnalité</p>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          break;
          
        case 'contact-ultra-modern':
          content = \`
            <div class="contact-preview">
              \${props.title ? \`<h2 class="text-3xl font-bold mb-2">\${props.title}</h2>\` : ''}
              \${props.subtitle ? \`<p class="text-gray-600 mb-8">\${props.subtitle}</p>\` : ''}
              <div class="grid grid-cols-2 gap-8">
                <div class="space-y-4">
                  <input class="w-full p-3 border rounded-lg" placeholder="Nom" />
                  <input class="w-full p-3 border rounded-lg" placeholder="Email" />
                  <textarea class="w-full p-3 border rounded-lg h-32" placeholder="Message"></textarea>
                  <button class="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold">Envoyer</button>
                </div>
                <div class="bg-gray-200 rounded-lg flex items-center justify-center">
                  <span class="text-gray-500">Carte</span>
                </div>
              </div>
            </div>
          \`;
          break;
          
        default:
          content = \`
            <div class="p-12 bg-white">
              <div class="text-center">
                <div class="text-4xl mb-4">\${this.getBlockIcon(block)}</div>
                <h3 class="text-xl font-semibold mb-2">\${this.getBlockName(block)}</h3>
                \${props.title ? \`<p class="text-gray-600">\${props.title}</p>\` : ''}
              </div>
            </div>
          \`;
      }
      
      return \`
        <div class="block-preview" data-block-id="\${block.id}">
          <div class="block-label">\${this.getBlockName(block)}</div>
          \${content}
        </div>
      \`;
    }

    scheduleAutoSave() {
      if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
      }
      
      const statusEl = document.getElementById('save-status');
      statusEl.textContent = 'Modifications en cours...';
      statusEl.className = 'save-status pending';
      
      this.autoSaveTimeout = setTimeout(() => {
        this.saveChanges(true);
      }, 2000);
    }

    async saveChanges(isAutoSave = false) {
      const statusEl = document.getElementById('save-status');
      statusEl.textContent = 'Sauvegarde...';
      statusEl.className = 'save-status saving';
      
      try {
        // Utiliser l'API CMS
        if (window.CMS_API && window.CMS_API.saveContent) {
          const result = await window.CMS_API.saveContent(this.currentPage.id, {
            page_title: this.currentPage.page_title,
            page_slug: this.currentPage.page_slug,
            blocks: this.currentPage.blocks,
            seo: this.currentPage.seo
          });
          
          if (result.success) {
            statusEl.textContent = isAutoSave ? '✓ Sauvegarde automatique' : '✓ Sauvegardé';
            statusEl.className = 'save-status success';
            this.hasChanges = false;
            
            setTimeout(() => {
              statusEl.textContent = '';
              statusEl.className = 'save-status';
            }, 3000);
            
            return;
          }
        }
        
        throw new Error('Échec de la sauvegarde');
        
      } catch (error) {
        statusEl.textContent = '✗ Erreur de sauvegarde';
        statusEl.className = 'save-status error';
        console.error('Erreur:', error);
        
        if (!isAutoSave) {
          alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
        }
      }
    }
  }

  // Initialiser l'éditeur
  window.pageEditor = new PageEditorEnhanced();
  
  // Auto-init si dans le bon contexte
  if (document.getElementById('page-editor-content') || document.getElementById('cms-content')) {
    window.pageEditor.init();
  }
})();`;
}