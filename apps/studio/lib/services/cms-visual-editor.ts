/**
 * CMS Visual Editor - Éditeur visuel professionnel avec preview live
 */

export function generateVisualEditorScript(): string {
  return `
// CMS Visual Editor - Version professionnelle
(function() {
  'use strict';

  class VisualEditor {
    constructor() {
      this.currentPage = null;
      this.selectedBlock = null;
      this.isDragging = false;
      this.blocks = [];
      this.init();
    }

    async init() {
      console.log('🚀 Initialisation du Visual Editor...');
      
      // Créer l'interface complète
      this.createInterface();
      
      // Charger les données
      await this.loadPageData();
      
      // Activer le drag & drop
      this.setupDragDrop();
      
      // Auto-save toutes les 30 secondes
      setInterval(() => this.autoSave(), 30000);
    }

    createInterface() {
      document.body.innerHTML = \`
        <div class="visual-editor">
          <!-- Header -->
          <header class="editor-header">
            <div class="header-left">
              <button class="btn-icon" onclick="window.location.href='/'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                </svg>
              </button>
              <h1>Éditeur Visuel AWEMA</h1>
              <span class="page-name">Accueil</span>
            </div>
            <div class="header-center">
              <div class="device-switcher">
                <button class="device-btn active" data-device="desktop">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </button>
                <button class="device-btn" data-device="tablet">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
                <button class="device-btn" data-device="mobile">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            <div class="header-right">
              <span class="save-status" id="save-status">
                <span class="status-dot"></span>
                <span class="status-text">Sauvegardé</span>
              </span>
              <button class="btn-primary" onclick="visualEditor.save()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
                  <polyline points="17 21 17 13 7 13 7 21"/>
                  <polyline points="7 3 7 8 15 8"/>
                </svg>
                Publier
              </button>
            </div>
          </header>

          <!-- Main Layout -->
          <div class="editor-layout">
            <!-- Sidebar gauche - Blocs -->
            <aside class="sidebar-left">
              <div class="sidebar-header">
                <h3>Blocs disponibles</h3>
              </div>
              <div class="blocks-library">
                <div class="block-category">
                  <h4>Essentiels</h4>
                  <div class="block-item" draggable="true" data-block-type="hero-v3">
                    <div class="block-icon">🏔️</div>
                    <div class="block-name">Hero</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="features-v3">
                    <div class="block-icon">✨</div>
                    <div class="block-name">Features</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="services-v3">
                    <div class="block-icon">🛠️</div>
                    <div class="block-name">Services</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="gallery-v3">
                    <div class="block-icon">🖼️</div>
                    <div class="block-name">Galerie</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="testimonials-v3">
                    <div class="block-icon">💬</div>
                    <div class="block-name">Témoignages</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="pricing-v3">
                    <div class="block-icon">💰</div>
                    <div class="block-name">Tarifs</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="faq-v3">
                    <div class="block-icon">❓</div>
                    <div class="block-name">FAQ</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="contact-v3">
                    <div class="block-icon">📧</div>
                    <div class="block-name">Contact</div>
                  </div>
                  <div class="block-item" draggable="true" data-block-type="cta-v3">
                    <div class="block-icon">🎯</div>
                    <div class="block-name">Call to Action</div>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Zone centrale - Preview -->
            <main class="preview-area">
              <div class="preview-container" id="preview-container">
                <iframe 
                  id="preview-frame" 
                  class="preview-frame desktop"
                  src="/"
                ></iframe>
                <div class="preview-overlay" id="preview-overlay"></div>
              </div>
              <div class="drop-zone-empty" id="drop-zone-empty" style="display: none;">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <line x1="12" y1="8" x2="12" y2="16"/>
                  <line x1="8" y1="12" x2="16" y2="12"/>
                </svg>
                <h3>Glissez des blocs ici</h3>
                <p>Commencez à construire votre page en ajoutant des blocs</p>
              </div>
            </main>

            <!-- Sidebar droite - Propriétés -->
            <aside class="sidebar-right">
              <div class="properties-panel" id="properties-panel">
                <div class="panel-empty">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" opacity="0.3">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
                  </svg>
                  <p>Sélectionnez un bloc pour modifier ses propriétés</p>
                </div>
              </div>
            </aside>
          </div>

          <!-- Barre d'outils flottante -->
          <div class="floating-toolbar" id="floating-toolbar" style="display: none;">
            <button class="tool-btn" onclick="visualEditor.moveBlockUp()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 19V5M5 12l7-7 7 7"/>
              </svg>
            </button>
            <button class="tool-btn" onclick="visualEditor.moveBlockDown()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M19 12l-7 7-7-7"/>
              </svg>
            </button>
            <button class="tool-btn" onclick="visualEditor.duplicateBlock()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            </button>
            <button class="tool-btn danger" onclick="visualEditor.deleteBlock()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
              </svg>
            </button>
          </div>
        </div>

        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f7;
            overflow: hidden;
          }

          .visual-editor {
            display: flex;
            flex-direction: column;
            height: 100vh;
          }

          /* Header */
          .editor-header {
            background: white;
            border-bottom: 1px solid #e5e5e7;
            padding: 0 20px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 100;
          }

          .header-left, .header-center, .header-right {
            display: flex;
            align-items: center;
            gap: 16px;
          }

          .btn-icon {
            width: 40px;
            height: 40px;
            border: none;
            background: transparent;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-icon:hover {
            background: #f5f5f7;
          }

          .page-name {
            padding: 6px 12px;
            background: #f5f5f7;
            border-radius: 6px;
            font-size: 14px;
            color: #666;
          }

          .device-switcher {
            display: flex;
            background: #f5f5f7;
            border-radius: 8px;
            padding: 4px;
            gap: 4px;
          }

          .device-btn {
            width: 36px;
            height: 36px;
            border: none;
            background: transparent;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .device-btn.active {
            background: white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          }

          .save-status {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 14px;
            color: #666;
          }

          .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #34c759;
          }

          .btn-primary {
            padding: 8px 20px;
            background: #007aff;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
          }

          .btn-primary:hover {
            background: #0051d5;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,122,255,0.3);
          }

          /* Layout */
          .editor-layout {
            display: flex;
            flex: 1;
            overflow: hidden;
          }

          /* Sidebars */
          .sidebar-left, .sidebar-right {
            background: white;
            border-right: 1px solid #e5e5e7;
            width: 280px;
            overflow-y: auto;
          }

          .sidebar-right {
            border-right: none;
            border-left: 1px solid #e5e5e7;
            width: 320px;
          }

          .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid #e5e5e7;
          }

          .sidebar-header h3 {
            font-size: 16px;
            font-weight: 600;
          }

          /* Blocks Library */
          .blocks-library {
            padding: 20px;
          }

          .block-category h4 {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 12px;
          }

          .block-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            background: #f5f5f7;
            border-radius: 8px;
            margin-bottom: 8px;
            cursor: grab;
            transition: all 0.2s;
          }

          .block-item:hover {
            background: #e5e5e7;
            transform: translateX(4px);
          }

          .block-item.dragging {
            opacity: 0.5;
            cursor: grabbing;
          }

          .block-icon {
            font-size: 24px;
          }

          .block-name {
            font-size: 14px;
            font-weight: 500;
          }

          /* Preview Area */
          .preview-area {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px;
            background: #f5f5f7;
            position: relative;
          }

          .preview-container {
            width: 100%;
            height: 100%;
            max-width: 1440px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.08);
            overflow: hidden;
            position: relative;
            transition: all 0.3s;
          }

          .preview-frame {
            width: 100%;
            height: 100%;
            border: none;
            transition: all 0.3s;
          }

          .preview-frame.tablet {
            max-width: 768px;
            margin: 0 auto;
          }

          .preview-frame.mobile {
            max-width: 375px;
            margin: 0 auto;
          }

          .preview-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
          }

          .drop-zone-empty {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #999;
          }

          .drop-zone-empty h3 {
            margin-top: 16px;
            font-size: 20px;
            font-weight: 600;
            color: #666;
          }

          /* Properties Panel */
          .properties-panel {
            padding: 20px;
          }

          .panel-empty {
            text-align: center;
            padding: 40px 20px;
            color: #999;
          }

          .panel-empty p {
            margin-top: 12px;
            font-size: 14px;
          }

          /* Floating Toolbar */
          .floating-toolbar {
            position: fixed;
            background: white;
            border-radius: 8px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.12);
            padding: 8px;
            display: flex;
            gap: 4px;
            z-index: 200;
          }

          .tool-btn {
            width: 36px;
            height: 36px;
            border: none;
            background: transparent;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
          }

          .tool-btn:hover {
            background: #f5f5f7;
          }

          .tool-btn.danger:hover {
            background: #ff3b30;
            color: white;
          }

          /* Animations */
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          .block-preview {
            animation: fadeIn 0.3s ease;
          }

          /* Drag & Drop */
          .drop-indicator {
            height: 4px;
            background: #007aff;
            border-radius: 2px;
            margin: 8px 0;
            opacity: 0;
            transition: opacity 0.2s;
          }

          .drop-indicator.active {
            opacity: 1;
          }
        </style>
      \`;
    }

    async loadPageData() {
      try {
        // Essayer de charger depuis l'API
        if (window.CMS_API && window.CMS_API.loadContent) {
          const content = await window.CMS_API.loadContent();
          if (content && content.length > 0) {
            this.blocks = content[0].blocks || content[0].data?.blocks || [];
            this.currentPage = {
              id: content[0].id,
              title: content[0].page_title || content[0].data?.page_title || 'Sans titre'
            };
          }
        }
      } catch (error) {
        console.error('Erreur chargement:', error);
      }

      // Si pas de blocs, utiliser des données par défaut
      if (!this.blocks || this.blocks.length === 0) {
        this.blocks = [
          {
            id: 'hero-' + Date.now(),
            type: 'hero-v3',
            props: {
              title: 'Bienvenue sur votre site',
              subtitle: 'Créez un site professionnel en quelques clics',
              buttonText: 'Commencer',
              variant: 'gradient-modern'
            }
          },
          {
            id: 'features-' + Date.now(),
            type: 'features-v3',
            props: {
              title: 'Nos fonctionnalités',
              subtitle: 'Découvrez ce qui nous rend unique',
              variant: 'cards-hover'
            }
          }
        ];
      }

      // Sélectionner automatiquement le premier bloc
      if (this.blocks.length > 0) {
        setTimeout(() => {
          this.selectBlock(this.blocks[0]);
        }, 500);
      }

      // Rafraîchir la preview
      this.refreshPreview();
    }

    setupDragDrop() {
      // Drag depuis la bibliothèque
      document.querySelectorAll('.block-item').forEach(item => {
        item.addEventListener('dragstart', (e) => {
          this.isDragging = true;
          e.dataTransfer.effectAllowed = 'copy';
          e.dataTransfer.setData('blockType', item.dataset.blockType);
          item.classList.add('dragging');
        });

        item.addEventListener('dragend', () => {
          this.isDragging = false;
          item.classList.remove('dragging');
        });
      });

      // Drop dans la preview
      const previewFrame = document.getElementById('preview-frame');
      const previewOverlay = document.getElementById('preview-overlay');

      previewOverlay.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!this.isDragging) return;
        
        // Afficher indicateur de drop
        this.showDropIndicator(e);
      });

      previewOverlay.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!this.isDragging) return;

        const blockType = e.dataTransfer.getData('blockType');
        if (blockType) {
          this.addBlock(blockType);
        }
      });

      // Rendre la preview cliquable
      this.setupClickableBlocks();
    }

    setupClickableBlocks() {
      const overlay = document.getElementById('preview-overlay');
      if (!overlay) return;

      overlay.style.pointerEvents = 'auto';
      overlay.innerHTML = '';

      // Créer des zones cliquables pour chaque bloc
      this.updateClickableZones();
    }

    updateClickableZones() {
      const overlay = document.getElementById('preview-overlay');
      if (!overlay) return;

      overlay.innerHTML = '';
      
      this.blocks.forEach((block, index) => {
        const zone = document.createElement('div');
        zone.className = 'block-click-zone';
        zone.dataset.blockId = block.id;
        zone.style.cssText = \`
          position: absolute;
          top: \${index * 300}px;
          left: 0;
          right: 0;
          height: 280px;
          border: 2px solid transparent;
          cursor: pointer;
          transition: all 0.2s;
        \`;

        zone.addEventListener('mouseenter', () => {
          zone.style.border = '2px solid #007aff';
          zone.style.background = 'rgba(0, 122, 255, 0.05)';
        });

        zone.addEventListener('mouseleave', () => {
          if (this.selectedBlock?.id !== block.id) {
            zone.style.border = '2px solid transparent';
            zone.style.background = 'transparent';
          }
        });

        zone.addEventListener('click', () => {
          this.selectBlock(block);
          // Mettre à jour l'affichage de toutes les zones
          document.querySelectorAll('.block-click-zone').forEach(z => {
            z.style.border = '2px solid transparent';
            z.style.background = 'transparent';
          });
          zone.style.border = '2px solid #007aff';
          zone.style.background = 'rgba(0, 122, 255, 0.05)';
        });

        overlay.appendChild(zone);
      });
    }

    addBlock(type) {
      const newBlock = {
        id: type + '-' + Date.now(),
        type: type,
        props: this.getDefaultProps(type)
      };

      this.blocks.push(newBlock);
      this.refreshPreview();
      this.selectBlock(newBlock);
      this.setSaveStatus('modified');
    }

    getDefaultProps(type) {
      const defaults = {
        'hero-v3': {
          title: 'Titre principal',
          subtitle: 'Sous-titre accrocheur',
          buttonText: 'En savoir plus',
          variant: 'gradient-modern'
        },
        'features-v3': {
          title: 'Nos fonctionnalités',
          subtitle: 'Découvrez ce qui nous rend unique',
          variant: 'cards-hover',
          features: []
        },
        'services-v3': {
          title: 'Nos services',
          subtitle: 'Ce que nous proposons',
          variant: 'grid-icons',
          services: []
        },
        'gallery-v3': {
          title: 'Galerie photos',
          variant: 'masonry-flow',
          images: []
        },
        'testimonials-v3': {
          title: 'Ce que disent nos clients',
          variant: 'cards-modern',
          testimonials: []
        },
        'pricing-v3': {
          title: 'Nos tarifs',
          subtitle: 'Choisissez la formule adaptée',
          variant: 'cards-gradient',
          plans: []
        },
        'faq-v3': {
          title: 'Questions fréquentes',
          variant: 'accordion-modern',
          items: []
        },
        'contact-v3': {
          title: 'Contactez-nous',
          subtitle: 'Nous sommes là pour vous aider',
          variant: 'split-map'
        },
        'cta-v3': {
          title: 'Prêt à commencer ?',
          subtitle: 'Rejoignez-nous dès aujourd\\'hui',
          buttonText: 'Commencer',
          variant: 'gradient-wave'
        }
      };

      return defaults[type] || {};
    }

    selectBlock(block) {
      this.selectedBlock = block;
      this.showBlockProperties(block);
      this.showFloatingToolbar(block);
    }

    showBlockProperties(block) {
      const panel = document.getElementById('properties-panel');
      
      panel.innerHTML = \`
        <div class="property-header">
          <h3>\${this.getBlockName(block.type)}</h3>
          <span class="block-type">\${block.type}</span>
        </div>
        <div class="properties-list">
          \${this.renderProperties(block)}
        </div>
      \`;
    }

    renderProperties(block) {
      // Rendu dynamique des propriétés selon le type de bloc
      let html = '<style>' + this.getPropertyStyles() + '</style>';
      const props = block.props || {};

      // Titre (toujours affiché pour la plupart des blocs)
      if (props.title !== undefined || this.shouldHaveTitle(block.type)) {
        html += \`
          <div class="property-group">
            <label>Titre</label>
            <input type="text" value="\${this.escapeHtml(props.title || '')}" 
                   onchange="visualEditor.updateProp('title', this.value)"
                   oninput="visualEditor.updateProp('title', this.value)">
          </div>
        \`;
      }

      // Sous-titre
      if (props.subtitle !== undefined || this.shouldHaveSubtitle(block.type)) {
        html += \`
          <div class="property-group">
            <label>Sous-titre</label>
            <textarea onchange="visualEditor.updateProp('subtitle', this.value)"
                      oninput="visualEditor.updateProp('subtitle', this.value)">\${this.escapeHtml(props.subtitle || '')}</textarea>
          </div>
        \`;
      }

      // Texte du bouton
      if (props.buttonText !== undefined || this.shouldHaveButton(block.type)) {
        html += \`
          <div class="property-group">
            <label>Texte du bouton</label>
            <input type="text" value="\${this.escapeHtml(props.buttonText || '')}" 
                   onchange="visualEditor.updateProp('buttonText', this.value)"
                   oninput="visualEditor.updateProp('buttonText', this.value)">
          </div>
        \`;
      }

      // Variante/Style
      html += \`
        <div class="property-group">
          <label>Style</label>
          <select onchange="visualEditor.updateProp('variant', this.value)">
            \${this.getVariantOptions(block.type, props.variant)}
          </select>
        </div>
      \`;

      // Boutons d'action
      html += \`
        <div class="property-group" style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e5e7;">
          <button onclick="visualEditor.duplicateBlock()" 
                  style="width: 100%; padding: 10px; margin-bottom: 10px; background: #f5f5f7; border: 1px solid #d1d1d6; border-radius: 6px; cursor: pointer; font-weight: 500;">
            📋 Dupliquer ce bloc
          </button>
          <button onclick="visualEditor.deleteBlock()" 
                  style="width: 100%; padding: 10px; background: #ff3b30; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: 500;">
            🗑️ Supprimer ce bloc
          </button>
        </div>
      \`;

      return html;
    }

    getPropertyStyles() {
      return \`
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
      \`;
    }

    shouldHaveTitle(type) {
      return ['hero-v3', 'features-v3', 'services-v3', 'gallery-v3', 'testimonials-v3', 
              'pricing-v3', 'faq-v3', 'contact-v3', 'cta-v3'].includes(type);
    }

    shouldHaveSubtitle(type) {
      return ['hero-v3', 'features-v3', 'services-v3', 'pricing-v3', 'contact-v3', 'cta-v3'].includes(type);
    }

    shouldHaveButton(type) {
      return ['hero-v3', 'cta-v3'].includes(type);
    }

    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    getBlockName(type) {
      const names = {
        'hero-v3': 'Hero Section',
        'features-v3': 'Fonctionnalités',
        'services-v3': 'Services',
        'gallery-v3': 'Galerie',
        'testimonials-v3': 'Témoignages',
        'pricing-v3': 'Tarifs',
        'faq-v3': 'FAQ',
        'contact-v3': 'Contact',
        'cta-v3': 'Call to Action'
      };
      return names[type] || type;
    }

    getVariantOptions(type, current) {
      const variants = {
        'hero-v3': [
          'gradient-modern',
          'split-content',
          'centered-bold',
          'video-background',
          'particle-effect',
          'parallax-layers'
        ],
        'features-v3': [
          'cards-hover',
          'grid-minimal',
          'timeline-vertical',
          'bento-grid',
          'carousel-3d',
          'masonry-creative'
        ],
        // ... autres variantes
      };

      const options = variants[type] || [];
      return options.map(v => 
        \`<option value="\${v}" \${v === current ? 'selected' : ''}>\${this.formatVariantName(v)}</option>\`
      ).join('');
    }

    formatVariantName(variant) {
      return variant
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }

    updateProp(key, value) {
      if (!this.selectedBlock) return;
      
      this.selectedBlock.props[key] = value;
      this.refreshPreview();
      this.setSaveStatus('modified');
    }

    showFloatingToolbar(block) {
      const toolbar = document.getElementById('floating-toolbar');
      // Positionner la toolbar près du bloc sélectionné
      toolbar.style.display = 'flex';
      toolbar.style.top = '100px';
      toolbar.style.left = '50%';
      toolbar.style.transform = 'translateX(-50%)';
    }

    moveBlockUp() {
      if (!this.selectedBlock) return;
      
      const index = this.blocks.findIndex(b => b.id === this.selectedBlock.id);
      if (index > 0) {
        [this.blocks[index], this.blocks[index - 1]] = [this.blocks[index - 1], this.blocks[index]];
        this.refreshPreview();
        this.setSaveStatus('modified');
      }
    }

    moveBlockDown() {
      if (!this.selectedBlock) return;
      
      const index = this.blocks.findIndex(b => b.id === this.selectedBlock.id);
      if (index < this.blocks.length - 1) {
        [this.blocks[index], this.blocks[index + 1]] = [this.blocks[index + 1], this.blocks[index]];
        this.refreshPreview();
        this.setSaveStatus('modified');
      }
    }

    duplicateBlock() {
      if (!this.selectedBlock) return;
      
      const newBlock = {
        ...this.selectedBlock,
        id: this.selectedBlock.type + '-' + Date.now(),
        props: { ...this.selectedBlock.props }
      };
      
      const index = this.blocks.findIndex(b => b.id === this.selectedBlock.id);
      this.blocks.splice(index + 1, 0, newBlock);
      this.refreshPreview();
      this.selectBlock(newBlock);
      this.setSaveStatus('modified');
    }

    deleteBlock() {
      if (!this.selectedBlock) return;
      
      if (confirm('Supprimer ce bloc ?')) {
        this.blocks = this.blocks.filter(b => b.id !== this.selectedBlock.id);
        this.selectedBlock = null;
        document.getElementById('floating-toolbar').style.display = 'none';
        document.getElementById('properties-panel').innerHTML = \`
          <div class="panel-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" opacity="0.3">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
            </svg>
            <p>Sélectionnez un bloc pour modifier ses propriétés</p>
          </div>
        \`;
        this.refreshPreview();
        this.setSaveStatus('modified');
      }
    }

    refreshPreview() {
      console.log('Refresh preview avec', this.blocks.length, 'blocs');
      
      // Sauvegarder les données pour que la preview les charge
      const pageData = {
        id: this.currentPage?.id || 'home-page',
        title: this.currentPage?.title || 'Accueil',
        slug: 'index',
        blocks: this.blocks,
        meta: {}
      };
      
      // Sauvegarder en localStorage
      localStorage.setItem('awema_page_blocks', JSON.stringify(this.blocks));
      localStorage.setItem('awema_site_data', JSON.stringify({
        pages: [pageData]
      }));
      
      // Recharger l'iframe
      const frame = document.getElementById('preview-frame');
      if (frame) {
        // Ajouter un timestamp pour forcer le rechargement
        const currentSrc = frame.src.split('?')[0];
        frame.src = currentSrc + '?t=' + Date.now();
      }
      
      // Afficher/masquer la zone vide
      const emptyZone = document.getElementById('drop-zone-empty');
      if (emptyZone) {
        emptyZone.style.display = this.blocks.length === 0 ? 'block' : 'none';
      }
      
      // Mettre à jour les zones cliquables après un délai
      setTimeout(() => {
        this.updateClickableZones();
      }, 1000);
    }

    showDropIndicator(e) {
      // Logique pour afficher l'indicateur de drop au bon endroit
      console.log('Drop indicator at', e.clientY);
    }

    setSaveStatus(status) {
      const statusEl = document.getElementById('save-status');
      const dot = statusEl.querySelector('.status-dot');
      const text = statusEl.querySelector('.status-text');
      
      switch(status) {
        case 'saving':
          dot.style.background = '#ff9500';
          text.textContent = 'Sauvegarde...';
          break;
        case 'saved':
          dot.style.background = '#34c759';
          text.textContent = 'Sauvegardé';
          break;
        case 'modified':
          dot.style.background = '#ff9500';
          text.textContent = 'Modifications non sauvegardées';
          break;
        case 'error':
          dot.style.background = '#ff3b30';
          text.textContent = 'Erreur de sauvegarde';
          break;
      }
    }

    async save() {
      this.setSaveStatus('saving');
      
      try {
        // Vérifier que currentPage existe
        if (!this.currentPage) {
          this.currentPage = {
            id: 'home-page',
            title: 'Accueil'
          };
        }
        
        const dataToSave = {
          blocks: this.blocks,
          page_title: this.currentPage.title,
          page_slug: 'index',
          data: {
            blocks: this.blocks,
            page_title: this.currentPage.title
          }
        };
        
        if (window.CMS_API && window.CMS_API.saveContent) {
          await window.CMS_API.saveContent(this.currentPage.id, dataToSave);
          this.setSaveStatus('saved');
        } else {
          // Sauvegarde locale
          localStorage.setItem('awema_page_blocks', JSON.stringify(this.blocks));
          localStorage.setItem('awema_site_data', JSON.stringify({
            pages: [{
              id: this.currentPage.id,
              title: this.currentPage.title,
              slug: 'index',
              blocks: this.blocks
            }]
          }));
          this.setSaveStatus('saved');
        }
        
        setTimeout(() => {
          this.setSaveStatus('saved');
        }, 2000);
      } catch (error) {
        console.error('Erreur sauvegarde:', error);
        this.setSaveStatus('error');
      }
    }

    async autoSave() {
      if (document.querySelector('.status-text').textContent === 'Modifications non sauvegardées') {
        await this.save();
      }
    }
  }

  // Initialiser l'éditeur
  window.visualEditor = new VisualEditor();

  // Gestion des messages depuis l'iframe
  window.addEventListener('message', (e) => {
    if (e.data.type === 'blockClicked') {
      const block = window.visualEditor.blocks.find(b => b.id === e.data.blockId);
      if (block) {
        window.visualEditor.selectBlock(block);
      }
    }
  });
})();
`;
}