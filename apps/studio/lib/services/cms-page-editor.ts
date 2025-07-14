/**
 * Éditeur de pages simplifié pour le CMS
 * Permet uniquement l'édition des blocs existants
 */

export function generatePageEditorScript(): string {
  return `
// Éditeur de pages CMS - Version simplifiée
(function() {
  'use strict';

  class PageEditorCMS {
    constructor() {
      this.currentPage = null;
      this.selectedBlockId = null;
      this.autoSaveTimeout = null;
    }

    async init() {
      // Charger la première page
      await this.loadPages();
    }

    async loadPages() {
      try {
        // Utiliser la nouvelle API CMS
        if (window.CMS_API && window.CMS_API.loadContent) {
          const content = await window.CMS_API.loadContent();
          
          if (Array.isArray(content) && content.length > 0) {
            // Format Supabase
            this.currentPage = content[0];
            this.render();
            return;
          } else if (content.pages && content.pages.length > 0) {
            // Format localStorage
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
        
        // Fallback direct sur localStorage
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
      const container = document.getElementById('cms-content');
      
      container.innerHTML = \`
        <div class="page-editor">
          <div class="editor-header">
            <h2>Éditeur de page : \${this.currentPage.page_title || 'Sans titre'}</h2>
            <span id="save-status" class="save-status"></span>
          </div>
          
          <div class="editor-layout">
            <!-- Liste des blocs -->
            <div class="blocks-list">
              <h3>Blocs de la page</h3>
              <p class="help-text">Cliquez sur un bloc pour le modifier</p>
              <div id="blocks-container"></div>
            </div>
            
            <!-- Aperçu -->
            <div class="preview-area">
              <h3>Aperçu</h3>
              <iframe id="preview-frame" class="preview-frame"></iframe>
            </div>
            
            <!-- Propriétés -->
            <div class="properties-panel">
              <h3>Propriétés</h3>
              <div id="properties-container">
                <p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>
              </div>
            </div>
          </div>
        </div>
        
        <style>
          .page-editor {
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          
          .editor-header {
            padding: 1rem;
            background: #fff;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          
          .save-status {
            font-size: 0.875rem;
            color: #059669;
          }
          
          .editor-layout {
            flex: 1;
            display: grid;
            grid-template-columns: 300px 1fr 350px;
            gap: 1px;
            background: #e5e7eb;
            overflow: hidden;
          }
          
          .blocks-list, .preview-area, .properties-panel {
            background: #fff;
            overflow-y: auto;
            padding: 1rem;
          }
          
          .blocks-list h3, .preview-area h3, .properties-panel h3 {
            margin: 0 0 1rem 0;
            font-size: 1.125rem;
            font-weight: 600;
          }
          
          .help-text {
            font-size: 0.875rem;
            color: #6b7280;
            margin-bottom: 1rem;
          }
          
          .block-item {
            padding: 0.75rem;
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.2s;
          }
          
          .block-item:hover {
            border-color: #d1d5db;
            background: #f9fafb;
          }
          
          .block-item.selected {
            border-color: #3b82f6;
            background: #eff6ff;
          }
          
          .block-item h4 {
            margin: 0 0 0.25rem 0;
            font-weight: 500;
          }
          
          .block-item p {
            margin: 0;
            font-size: 0.875rem;
            color: #6b7280;
          }
          
          .preview-frame {
            width: 100%;
            height: calc(100% - 2rem);
            border: 1px solid #e5e7eb;
            border-radius: 0.5rem;
          }
          
          .property-group {
            margin-bottom: 1.5rem;
          }
          
          .property-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            margin-bottom: 0.5rem;
            color: #374151;
          }
          
          .property-input {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 0.875rem;
          }
          
          .property-input:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
          }
          
          .property-textarea {
            min-height: 100px;
            resize: vertical;
          }
          
          .empty-state {
            text-align: center;
            color: #9ca3af;
            padding: 2rem;
          }
        </style>
      \`;
      
      this.renderBlocks();
      this.updatePreview();
    }

    renderBlocks() {
      const container = document.getElementById('blocks-container');
      const blocks = this.currentPage.blocks || [];
      
      container.innerHTML = blocks.map(block => \`
        <div class="block-item \${block.id === this.selectedBlockId ? 'selected' : ''}" 
             data-block-id="\${block.id}"
             onclick="window.pageEditor.selectBlock('\${block.id}')">
          <h4>\${this.getBlockName(block)}</h4>
          <p>\${block.props?.title || block.props?.heading || 'Contenu du bloc'}</p>
        </div>
      \`).join('');
    }

    getBlockName(block) {
      const names = {
        // Ultra Modern blocks
        'hero-ultra-modern': 'Hero Ultra-Modern',
        'contact-ultra-modern': 'Contact Ultra-Modern',
        'cta-ultra-modern': 'CTA Ultra-Modern',
        'content-ultra-modern': 'Contenu Ultra-Modern',
        'features-ultra-modern': 'Features Ultra-Modern',
        'testimonials-ultra-modern': 'Témoignages Ultra-Modern',
        'gallery-ultra-modern': 'Galerie Ultra-Modern',
        'header-ultra-modern': 'Header Ultra-Modern',
        'footer-ultra-modern': 'Footer Ultra-Modern',
        'pricing-ultra-modern': 'Tarifs Ultra-Modern',
        'faq-ultra-modern': 'FAQ Ultra-Modern',
        // Legacy blocks
        'hero-centered': 'Hero Centré',
        'hero-split': 'Hero Split',
        'services-grid': 'Grille de Services',
        'features-grid': 'Grille de Fonctionnalités',
        'content-left': 'Contenu Gauche',
        'content-right': 'Contenu Droite',
        'cta-centered': 'CTA Centré',
        'contact-form': 'Formulaire de Contact',
        'faq-accordion': 'FAQ Accordéon',
        'testimonials-slider': 'Témoignages',
        'gallery-grid': 'Galerie',
        'pricing-table': 'Tableau de Prix'
      };
      return names[block.type] || block.type;
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
    }

    renderProperties(block) {
      const container = document.getElementById('properties-container');
      
      if (!block) {
        container.innerHTML = '<p class="empty-state">Sélectionnez un bloc pour modifier ses propriétés</p>';
        return;
      }
      
      // Générer les champs selon le type de bloc
      const fields = this.getFieldsForBlock(block);
      
      container.innerHTML = fields.map(field => \`
        <div class="property-group">
          <label class="property-label">\${field.label}</label>
          \${this.renderField(field, block)}
        </div>
      \`).join('');
    }

    getFieldsForBlock(block) {
      // Champs communs à tous les blocs
      const fields = [];
      
      // Détection intelligente des champs selon les propriétés existantes
      const props = block.props || {};
      
      // Champs texte simples
      const textFields = ['title', 'subtitle', 'heading', 'label', 'name'];
      const textareaFields = ['description', 'content', 'text', 'about', 'bio'];
      const urlFields = ['buttonLink', 'link', 'url', 'href'];
      const buttonFields = ['buttonText', 'ctaText', 'submitText'];
      
      // Parcourir les propriétés du bloc
      Object.keys(props).forEach(key => {
        // Skip les arrays et objets complexes pour l'instant
        if (Array.isArray(props[key]) || (typeof props[key] === 'object' && props[key] !== null)) {
          return;
        }
        
        let field = {
          key: key,
          value: props[key],
          label: this.formatLabel(key),
          type: 'text'
        };
        
        // Déterminer le type de champ
        if (textareaFields.some(f => key.toLowerCase().includes(f))) {
          field.type = 'textarea';
        } else if (urlFields.some(f => key.toLowerCase().includes(f))) {
          field.type = 'url';
        } else if (key.toLowerCase().includes('email')) {
          field.type = 'email';
        } else if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) {
          field.type = 'tel';
        } else if (key.toLowerCase().includes('number') || key.toLowerCase().includes('price') || key.toLowerCase().includes('amount')) {
          field.type = 'number';
        } else if (typeof props[key] === 'boolean') {
          field.type = 'checkbox';
        }
        
        fields.push(field);
      });
      
      // Ajouter des champs spécifiques selon le type de bloc
      switch(block.type) {
        case 'hero-ultra-modern':
        case 'hero-centered':
        case 'hero-split':
          if (!props.backgroundImage) {
            fields.push({
              key: 'backgroundImage',
              label: 'Image de fond (URL)',
              type: 'url',
              value: ''
            });
          }
          break;
          
        case 'contact-ultra-modern':
        case 'contact-form':
          if (!props.mapAddress) {
            fields.push({
              key: 'mapAddress',
              label: 'Adresse pour la carte',
              type: 'text',
              value: ''
            });
          }
          break;
      }
      
      return fields;
    }
    
    formatLabel(key) {
      // Convertir camelCase en texte lisible
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace(/^Button /, '')
        .replace(/^Cta /, 'CTA ');
    }

    renderField(field, block) {
      const value = field.value || '';
      const onchange = \`window.pageEditor.updateBlockProperty('\${block.id}', '\${field.key}', this.value)\`;
      const oncheck = \`window.pageEditor.updateBlockProperty('\${block.id}', '\${field.key}', this.checked)\`;
      
      switch (field.type) {
        case 'textarea':
          return \`<textarea class="property-input property-textarea" 
                           onchange="\${onchange}" 
                           oninput="\${onchange}">\${value}</textarea>\`;
                           
        case 'checkbox':
          return \`<label class="flex items-center">
                    <input type="checkbox" 
                           \${value ? 'checked' : ''}
                           onchange="\${oncheck}" />
                    <span class="ml-2">Activer</span>
                  </label>\`;
                  
        case 'number':
          return \`<input type="number" 
                         class="property-input" 
                         value="\${value}" 
                         onchange="\${onchange}"
                         oninput="\${onchange}" />\`;
                         
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

    updateBlockProperty(blockId, key, value) {
      const block = this.currentPage.blocks.find(b => b.id === blockId);
      if (!block) return;
      
      // Mettre à jour la propriété
      if (!block.props) block.props = {};
      block.props[key] = value;
      
      // Rafraîchir l'aperçu
      this.updatePreview();
      
      // Auto-save après 2 secondes
      this.scheduleAutoSave();
    }

    updatePreview() {
      const iframe = document.getElementById('preview-frame');
      const content = this.generatePreviewHTML();
      
      iframe.srcdoc = content;
    }

    generatePreviewHTML() {
      // Générer un HTML simple pour l'aperçu
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
              background: #f9fafb;
              margin: 0;
              padding: 0;
            }
            .block { 
              margin: 1rem;
              border: 2px dashed transparent;
              border-radius: 0.5rem;
              overflow: hidden;
              transition: all 0.2s;
              background: white;
              box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
            }
            .block:hover {
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .block.selected { 
              border-color: #3b82f6;
              box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
            
            /* Styles spécifiques pour les aperçus */
            .hero-preview { min-height: 300px; }
            .features-preview { min-height: 200px; }
            .testimonials-preview { min-height: 200px; }
            .gallery-preview { min-height: 250px; }
            .contact-preview { min-height: 300px; }
            .pricing-preview { min-height: 250px; }
            .faq-preview { min-height: 200px; }
            .header-preview { min-height: 60px; }
            .footer-preview { min-height: 200px; }
            
            /* Améliorer l'apparence des éléments */
            input, textarea {
              border: 1px solid #d1d5db;
              border-radius: 0.375rem;
              font-size: 0.875rem;
            }
            
            button {
              font-weight: 500;
              transition: all 0.2s;
            }
            
            button:hover {
              transform: translateY(-1px);
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
          </style>
        </head>
        <body>
          \${blocks.map(block => this.renderBlockPreview(block)).join('')}
        </body>
        </html>
      \`;
    }

    renderBlockPreview(block) {
      const isSelected = block.id === this.selectedBlockId;
      
      // Rendu spécifique selon le type de bloc
      let content = '';
      
      switch(block.type) {
        case 'hero-ultra-modern':
        case 'hero-centered':
        case 'hero-split':
          content = \`
            <div class="hero-preview p-16 bg-gradient-to-br from-blue-50 to-indigo-100 text-center">
              \${block.props?.title ? \`<h1 class="text-4xl font-bold mb-4">\${block.props.title}</h1>\` : ''}
              \${block.props?.subtitle ? \`<p class="text-xl text-gray-600 mb-6">\${block.props.subtitle}</p>\` : ''}
              \${block.props?.buttonText ? \`<button class="px-6 py-3 bg-blue-600 text-white rounded-lg">\${block.props.buttonText}</button>\` : ''}
            </div>
          \`;
          break;
          
        case 'features-ultra-modern':
        case 'features-grid':
          const features = block.props?.features || [];
          content = \`
            <div class="features-preview p-8">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold text-center mb-8">\${block.props.title}</h2>\` : ''}
              <div class="grid grid-cols-3 gap-4">
                \${features.slice(0, 3).map(f => \`
                  <div class="border rounded-lg p-4">
                    <h3 class="font-semibold mb-2">\${f.title || 'Feature'}</h3>
                    <p class="text-sm text-gray-600">\${f.description || ''}</p>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          break;
          
        case 'testimonials-ultra-modern':
        case 'testimonials-slider':
          const testimonials = block.props?.testimonials || [];
          content = \`
            <div class="testimonials-preview p-8 bg-gray-50">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold text-center mb-6">\${block.props.title}</h2>\` : ''}
              \${testimonials[0] ? \`
                <div class="max-w-2xl mx-auto text-center">
                  <p class="text-lg italic mb-4">"\${testimonials[0].text || 'Témoignage client'}"</p>
                  <p class="font-semibold">\${testimonials[0].name || 'Client'}</p>
                  <p class="text-sm text-gray-600">\${testimonials[0].role || ''}</p>
                </div>
              \` : '<p class="text-center text-gray-500">Aucun témoignage</p>'}
            </div>
          \`;
          break;
          
        case 'gallery-ultra-modern':
        case 'gallery-grid':
          const images = block.props?.images || [];
          content = \`
            <div class="gallery-preview p-8">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold text-center mb-6">\${block.props.title}</h2>\` : ''}
              <div class="grid grid-cols-4 gap-2">
                \${images.slice(0, 8).map(img => \`
                  <div class="aspect-square bg-gray-300 rounded-lg flex items-center justify-center">
                    <span class="text-gray-500">IMG</span>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          break;
          
        case 'contact-ultra-modern':
        case 'contact-form':
          content = \`
            <div class="contact-preview p-8 bg-blue-50">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold mb-4">\${block.props.title}</h2>\` : ''}
              \${block.props?.description ? \`<p class="text-gray-600 mb-6">\${block.props.description}</p>\` : ''}
              <div class="grid grid-cols-2 gap-8">
                <div class="space-y-3">
                  <input class="w-full p-2 border rounded" placeholder="Nom" />
                  <input class="w-full p-2 border rounded" placeholder="Email" />
                  <textarea class="w-full p-2 border rounded h-20" placeholder="Message"></textarea>
                  <button class="px-4 py-2 bg-blue-600 text-white rounded">Envoyer</button>
                </div>
                <div class="bg-gray-200 rounded-lg flex items-center justify-center">
                  <span class="text-gray-500">MAP</span>
                </div>
              </div>
            </div>
          \`;
          break;
          
        case 'pricing-ultra-modern':
        case 'pricing-table':
          const plans = block.props?.plans || [];
          content = \`
            <div class="pricing-preview p-8">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold text-center mb-8">\${block.props.title}</h2>\` : ''}
              <div class="grid grid-cols-3 gap-4">
                \${plans.slice(0, 3).map(plan => \`
                  <div class="border rounded-lg p-6 text-center">
                    <h3 class="font-bold mb-2">\${plan.name || 'Plan'}</h3>
                    <p class="text-3xl font-bold mb-4">\${plan.price || '0'}€</p>
                    <button class="w-full py-2 bg-blue-600 text-white rounded">Choisir</button>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          break;
          
        case 'faq-ultra-modern':
        case 'faq-accordion':
          const faqs = block.props?.faqs || [];
          content = \`
            <div class="faq-preview p-8">
              \${block.props?.title ? \`<h2 class="text-3xl font-bold text-center mb-6">\${block.props.title}</h2>\` : ''}
              <div class="space-y-2 max-w-3xl mx-auto">
                \${faqs.slice(0, 3).map(faq => \`
                  <div class="border rounded-lg p-4">
                    <h3 class="font-semibold">\${faq.question || 'Question'}</h3>
                    <p class="text-gray-600 mt-2 text-sm">\${faq.answer || 'Réponse'}</p>
                  </div>
                \`).join('')}
              </div>
            </div>
          \`;
          break;
          
        case 'header-ultra-modern':
          content = \`
            <div class="header-preview border-b bg-white p-4">
              <div class="flex justify-between items-center">
                <span class="text-xl font-bold">\${block.props?.logo?.text || 'LOGO'}</span>
                <nav class="flex space-x-6">
                  <a href="#" class="text-gray-700">Accueil</a>
                  <a href="#" class="text-gray-700">Services</a>
                  <a href="#" class="text-gray-700">Contact</a>
                </nav>
              </div>
            </div>
          \`;
          break;
          
        case 'footer-ultra-modern':
          content = \`
            <div class="footer-preview bg-gray-900 text-white p-8">
              <div class="grid grid-cols-4 gap-8 mb-6">
                <div>
                  <h4 class="font-bold mb-2">À propos</h4>
                  <p class="text-sm text-gray-400">\${block.props?.about || 'Description de l\\'entreprise'}</p>
                </div>
                <div>
                  <h4 class="font-bold mb-2">Services</h4>
                  <p class="text-sm text-gray-400">Liste des services</p>
                </div>
                <div>
                  <h4 class="font-bold mb-2">Contact</h4>
                  <p class="text-sm text-gray-400">\${block.props?.phone || '01 23 45 67 89'}</p>
                  <p class="text-sm text-gray-400">\${block.props?.email || 'contact@site.fr'}</p>
                </div>
                <div>
                  <h4 class="font-bold mb-2">Suivez-nous</h4>
                  <div class="flex space-x-2">
                    <span class="w-8 h-8 bg-gray-700 rounded"></span>
                    <span class="w-8 h-8 bg-gray-700 rounded"></span>
                    <span class="w-8 h-8 bg-gray-700 rounded"></span>
                  </div>
                </div>
              </div>
              <div class="text-center text-sm text-gray-400 border-t border-gray-800 pt-4">
                \${block.props?.copyright || '© 2024 Tous droits réservés'}
              </div>
            </div>
          \`;
          break;
          
        default:
          // Rendu générique pour les autres blocs
          content = \`
            <div class="generic-preview p-6">
              \${block.props?.title ? \`<h2 class="text-2xl font-bold mb-2">\${block.props.title}</h2>\` : ''}
              \${block.props?.subtitle ? \`<p class="text-gray-600 mb-4">\${block.props.subtitle}</p>\` : ''}
              \${block.props?.description ? \`<p class="text-gray-700">\${block.props.description}</p>\` : ''}
              \${block.props?.buttonText ? \`<button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">\${block.props.buttonText}</button>\` : ''}
            </div>
          \`;
      }
      
      return \`
        <div class="block \${isSelected ? 'selected' : ''}" data-block-id="\${block.id}">
          <div class="text-xs text-gray-500 mb-2 px-4 py-1 bg-gray-100 inline-block rounded">\${this.getBlockName(block)}</div>
          \${content}
        </div>
      \`;
    }

    scheduleAutoSave() {
      // Annuler le timeout précédent
      if (this.autoSaveTimeout) {
        clearTimeout(this.autoSaveTimeout);
      }
      
      // Programmer une nouvelle sauvegarde
      this.autoSaveTimeout = setTimeout(() => {
        this.saveChanges();
      }, 2000);
    }

    async saveChanges() {
      const statusEl = document.getElementById('save-status');
      statusEl.textContent = 'Sauvegarde...';
      
      try {
        // Utiliser la nouvelle API CMS
        if (window.CMS_API && window.CMS_API.saveContent) {
          const result = await window.CMS_API.saveContent(this.currentPage.id, {
            page_title: this.currentPage.page_title,
            page_slug: this.currentPage.page_slug,
            blocks: this.currentPage.blocks,
            seo: this.currentPage.seo
          });
          
          if (result.success) {
            statusEl.textContent = result.local ? '✓ Sauvegardé (local)' : '✓ Sauvegardé';
            setTimeout(() => {
              statusEl.textContent = '';
            }, 3000);
            
            // Ne pas recharger si sauvegarde réussie
            return;
          }
        }
        
        // Fallback direct sur localStorage
        let siteData = {};
        const storedData = localStorage.getItem('awema_site_data');
        if (storedData) {
          siteData = JSON.parse(storedData);
        }
        
        // Mettre à jour la page
        if (!siteData.pages) siteData.pages = [];
        const pageIndex = siteData.pages.findIndex(p => p.slug === this.currentPage.page_slug);
        const pageData = {
          id: this.currentPage.id,
          title: this.currentPage.page_title,
          slug: this.currentPage.page_slug,
          blocks: this.currentPage.blocks,
          meta: this.currentPage.seo
        };
        
        if (pageIndex >= 0) {
          siteData.pages[pageIndex] = pageData;
        } else {
          siteData.pages.push(pageData);
        }
        
        localStorage.setItem('awema_site_data', JSON.stringify(siteData));
        
        statusEl.textContent = '✓ Sauvegardé (local)';
        setTimeout(() => {
          statusEl.textContent = '';
        }, 3000);
        
      } catch (error) {
        statusEl.textContent = '✗ Erreur de sauvegarde';
        console.error('Erreur:', error);
      }
    }
  }

  // Initialiser l'éditeur
  window.pageEditor = new PageEditorCMS();
  
  // Attendre que le DOM soit prêt
  if (document.getElementById('cms-content')) {
    window.pageEditor.init();
  } else {
    // Si appelé depuis le CMS, attendre un peu
    setTimeout(() => {
      window.pageEditor.init();
    }, 100);
  }
})();`;
}