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
