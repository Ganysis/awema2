export function generateCMSSEOModule(): string {
  return `
<!-- SEO Module for CMS -->
<div id="seo-module" class="seo-module">
  <style>
    .seo-module {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .seo-tabs {
      display: flex;
      gap: 1rem;
      border-bottom: 2px solid #e5e7eb;
      margin-bottom: 2rem;
    }

    .seo-tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      font-size: 0.875rem;
      font-weight: 500;
      color: #6b7280;
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
    }

    .seo-tab:hover {
      color: #374151;
    }

    .seo-tab.active {
      color: #3b82f6;
    }

    .seo-tab.active::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: #3b82f6;
    }

    .seo-content {
      display: none;
    }

    .seo-content.active {
      display: block;
    }

    .seo-score {
      display: flex;
      align-items: center;
      gap: 2rem;
      padding: 1.5rem;
      background: #f9fafb;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }

    .seo-score-circle {
      position: relative;
      width: 100px;
      height: 100px;
    }

    .seo-score-circle svg {
      transform: rotate(-90deg);
    }

    .seo-score-value {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      font-weight: 700;
    }

    .seo-field {
      margin-bottom: 1.5rem;
    }

    .seo-label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .seo-input,
    .seo-textarea {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      transition: all 0.2s;
    }

    .seo-input:focus,
    .seo-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    .seo-textarea {
      min-height: 100px;
      resize: vertical;
    }

    .seo-char-count {
      display: flex;
      justify-content: space-between;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #6b7280;
    }

    .seo-char-count.warning {
      color: #f59e0b;
    }

    .seo-char-count.error {
      color: #ef4444;
    }

    .serp-preview {
      padding: 1.5rem;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      margin-bottom: 2rem;
    }

    .serp-title {
      color: #1a0dab;
      font-size: 1.25rem;
      margin-bottom: 0.25rem;
      cursor: pointer;
      text-decoration: none;
    }

    .serp-title:hover {
      text-decoration: underline;
    }

    .serp-url {
      color: #006621;
      font-size: 0.875rem;
      margin-bottom: 0.5rem;
    }

    .serp-description {
      color: #545454;
      font-size: 0.875rem;
      line-height: 1.5;
    }

    .seo-suggestions {
      background: #eff6ff;
      border: 1px solid #dbeafe;
      border-radius: 0.5rem;
      padding: 1rem;
      margin-bottom: 1.5rem;
    }

    .seo-suggestion {
      display: flex;
      align-items: start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    .seo-suggestion:last-child {
      margin-bottom: 0;
    }

    .seo-suggestion-icon {
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      color: #3b82f6;
    }

    .seo-suggestion-text {
      font-size: 0.875rem;
      color: #1e40af;
    }

    .seo-actions {
      display: flex;
      gap: 1rem;
      margin-top: 2rem;
    }

    .seo-button {
      padding: 0.75rem 1.5rem;
      border-radius: 0.375rem;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s;
      cursor: pointer;
      border: none;
    }

    .seo-button-primary {
      background: #3b82f6;
      color: white;
    }

    .seo-button-primary:hover {
      background: #2563eb;
    }

    .seo-button-secondary {
      background: white;
      color: #374151;
      border: 1px solid #e5e7eb;
    }

    .seo-button-secondary:hover {
      background: #f9fafb;
    }

    .schema-builder {
      background: #f9fafb;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .schema-type-selector {
      margin-bottom: 1.5rem;
    }

    .schema-preview {
      background: #1f2937;
      color: #d1d5db;
      padding: 1rem;
      border-radius: 0.375rem;
      font-family: monospace;
      font-size: 0.75rem;
      overflow-x: auto;
    }

    .analytics-config {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .analytics-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .analytics-card-title {
      font-weight: 600;
      margin-bottom: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .analytics-status {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }

    .analytics-status.active {
      background: #d1fae5;
      color: #065f46;
    }

    .analytics-status.inactive {
      background: #fee2e2;
      color: #991b1b;
    }

    .keyword-analysis {
      margin-top: 1.5rem;
    }

    .keyword-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .keyword-tag {
      padding: 0.25rem 0.75rem;
      background: #e5e7eb;
      border-radius: 9999px;
      font-size: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .keyword-tag button {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0;
      line-height: 1;
    }

    .keyword-tag button:hover {
      color: #374151;
    }

    @media (max-width: 768px) {
      .seo-tabs {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }

      .seo-score {
        flex-direction: column;
        text-align: center;
      }

      .analytics-config {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <div class="seo-tabs">
    <button class="seo-tab active" onclick="switchSEOTab('basic')">
      SEO de base
    </button>
    <button class="seo-tab" onclick="switchSEOTab('social')">
      Réseaux sociaux
    </button>
    <button class="seo-tab" onclick="switchSEOTab('schema')">
      Schema.org
    </button>
    <button class="seo-tab" onclick="switchSEOTab('analytics')">
      Analytics
    </button>
    <button class="seo-tab" onclick="switchSEOTab('monitoring')">
      Monitoring
    </button>
  </div>

  <!-- Basic SEO Tab -->
  <div id="seo-basic" class="seo-content active">
    <div class="seo-score">
      <div class="seo-score-circle">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" stroke="#e5e7eb" stroke-width="8" fill="none" />
          <circle id="seo-score-progress" cx="50" cy="50" r="45" stroke="#3b82f6" stroke-width="8" fill="none"
            stroke-dasharray="283" stroke-dashoffset="283" />
        </svg>
        <div class="seo-score-value" id="seo-score-value">0</div>
      </div>
      <div>
        <h3 style="margin: 0 0 0.5rem 0; font-size: 1.25rem; font-weight: 600;">Score SEO</h3>
        <p style="margin: 0; color: #6b7280;">Optimisez votre contenu pour améliorer votre référencement</p>
      </div>
    </div>

    <div class="serp-preview">
      <h4 style="margin: 0 0 1rem 0; font-size: 0.875rem; color: #6b7280;">Aperçu Google</h4>
      <div class="serp-title" id="serp-title">Titre de la page</div>
      <div class="serp-url" id="serp-url">https://example.com/page</div>
      <div class="serp-description" id="serp-description">Description de la page qui apparaîtra dans les résultats de recherche</div>
    </div>

    <div class="seo-suggestions" id="seo-suggestions" style="display: none;">
      <h4 style="margin: 0 0 0.75rem 0; font-size: 0.875rem; font-weight: 600; color: #1e40af;">Suggestions d'amélioration</h4>
      <div id="seo-suggestions-list"></div>
    </div>

    <div class="seo-field">
      <label class="seo-label" for="seo-title">
        Titre SEO
      </label>
      <input type="text" id="seo-title" class="seo-input" placeholder="Titre optimisé pour les moteurs de recherche" maxlength="60">
      <div class="seo-char-count">
        <span id="seo-title-count">0 / 60 caractères</span>
        <span id="seo-title-status">Optimal : 30-60 caractères</span>
      </div>
    </div>

    <div class="seo-field">
      <label class="seo-label" for="seo-description">
        Meta Description
      </label>
      <textarea id="seo-description" class="seo-textarea" placeholder="Description engageante pour augmenter le taux de clic" maxlength="160"></textarea>
      <div class="seo-char-count">
        <span id="seo-description-count">0 / 160 caractères</span>
        <span id="seo-description-status">Optimal : 120-160 caractères</span>
      </div>
    </div>

    <div class="seo-field">
      <label class="seo-label" for="seo-keywords">
        Mots-clés cibles
      </label>
      <input type="text" id="seo-keywords" class="seo-input" placeholder="mot-clé1, mot-clé2, mot-clé3">
      <div class="keyword-analysis" id="keyword-analysis">
        <div class="keyword-list" id="keyword-list"></div>
        <button class="seo-button seo-button-secondary" onclick="analyzeKeywords()">
          Analyser les mots-clés
        </button>
      </div>
    </div>

    <div class="seo-field">
      <label class="seo-label" for="seo-canonical">
        URL Canonique
      </label>
      <input type="url" id="seo-canonical" class="seo-input" placeholder="https://example.com/page">
    </div>
  </div>

  <!-- Social Media Tab -->
  <div id="seo-social" class="seo-content">
    <h3 style="margin: 0 0 1.5rem 0;">Open Graph (Facebook, LinkedIn)</h3>
    
    <div class="seo-field">
      <label class="seo-label" for="og-title">Titre OG</label>
      <input type="text" id="og-title" class="seo-input" placeholder="Titre pour les réseaux sociaux">
    </div>

    <div class="seo-field">
      <label class="seo-label" for="og-description">Description OG</label>
      <textarea id="og-description" class="seo-textarea" placeholder="Description pour les réseaux sociaux"></textarea>
    </div>

    <div class="seo-field">
      <label class="seo-label" for="og-image">Image OG</label>
      <div style="display: flex; gap: 0.5rem;">
        <input type="url" id="og-image" class="seo-input" placeholder="URL de l'image" style="flex: 1;">
        <button class="seo-button seo-button-secondary" onclick="selectOGImage()">
          Choisir
        </button>
      </div>
      <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #6b7280;">
        Recommandé : 1200x630px pour un affichage optimal
      </p>
    </div>

    <h3 style="margin: 2rem 0 1.5rem 0;">Twitter Card</h3>
    
    <div class="seo-field">
      <label class="seo-label" for="twitter-card">Type de carte</label>
      <select id="twitter-card" class="seo-input">
        <option value="summary">Summary</option>
        <option value="summary_large_image" selected>Summary Large Image</option>
        <option value="app">App</option>
        <option value="player">Player</option>
      </select>
    </div>
  </div>

  <!-- Schema.org Tab -->
  <div id="seo-schema" class="seo-content">
    <div class="schema-builder">
      <div class="schema-type-selector">
        <label class="seo-label">Type de données structurées</label>
        <select id="schema-type" class="seo-input" onchange="updateSchemaBuilder()">
          <option value="">Sélectionner un type</option>
          <option value="LocalBusiness">LocalBusiness</option>
          <option value="Service">Service</option>
          <option value="FAQPage">FAQ</option>
          <option value="BreadcrumbList">Fil d'Ariane</option>
          <option value="Organization">Organisation</option>
          <option value="Review">Avis</option>
          <option value="HowTo">Guide pratique</option>
        </select>
      </div>

      <div id="schema-fields"></div>

      <div class="seo-field">
        <label class="seo-label">Aperçu JSON-LD</label>
        <pre class="schema-preview" id="schema-preview">{
  "@context": "https://schema.org",
  "@type": "...",
  ...
}</pre>
      </div>
    </div>
  </div>

  <!-- Analytics Tab -->
  <div id="seo-analytics" class="seo-content">
    <div class="analytics-config">
      <div class="analytics-card">
        <h4 class="analytics-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 20V10M12 20V4M6 20v-6"></path>
          </svg>
          Google Analytics 4
        </h4>
        <div class="analytics-status inactive" id="ga4-status">
          <span class="status-dot">●</span>
          Inactif
        </div>
        <div class="seo-field" style="margin-top: 1rem;">
          <label class="seo-label" for="ga4-id">ID de mesure</label>
          <input type="text" id="ga4-id" class="seo-input" placeholder="G-XXXXXXXXXX">
        </div>
      </div>

      <div class="analytics-card">
        <h4 class="analytics-card-title">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          Google Tag Manager
        </h4>
        <div class="analytics-status inactive" id="gtm-status">
          <span class="status-dot">●</span>
          Inactif
        </div>
        <div class="seo-field" style="margin-top: 1rem;">
          <label class="seo-label" for="gtm-id">Container ID</label>
          <input type="text" id="gtm-id" class="seo-input" placeholder="GTM-XXXXXX">
        </div>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <h4 style="margin: 0 0 1rem 0;">Événements de conversion</h4>
      <div id="conversion-events">
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <input type="checkbox" id="track-form-submit" checked>
          <span style="font-size: 0.875rem;">Soumission de formulaire</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <input type="checkbox" id="track-phone-click" checked>
          <span style="font-size: 0.875rem;">Clic sur numéro de téléphone</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <input type="checkbox" id="track-cta-click" checked>
          <span style="font-size: 0.875rem;">Clic sur CTA</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="track-scroll-depth">
          <span style="font-size: 0.875rem;">Profondeur de scroll</span>
        </label>
      </div>
    </div>
  </div>

  <!-- Monitoring Tab -->
  <div id="seo-monitoring" class="seo-content">
    <div class="analytics-config">
      <div class="analytics-card">
        <h4 class="analytics-card-title">Core Web Vitals</h4>
        <div id="core-web-vitals">
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.875rem;">LCP (Largest Contentful Paint)</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: #10b981;">2.3s</span>
            </div>
            <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: #10b981; height: 100%; width: 70%;"></div>
            </div>
          </div>
          <div style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.875rem;">FID (First Input Delay)</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: #10b981;">45ms</span>
            </div>
            <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: #10b981; height: 100%; width: 85%;"></div>
            </div>
          </div>
          <div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
              <span style="font-size: 0.875rem;">CLS (Cumulative Layout Shift)</span>
              <span style="font-size: 0.875rem; font-weight: 600; color: #f59e0b;">0.15</span>
            </div>
            <div style="background: #e5e7eb; height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: #f59e0b; height: 100%; width: 50%;"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="analytics-card">
        <h4 class="analytics-card-title">Search Console</h4>
        <div class="seo-field">
          <label class="seo-label" for="search-console-property">Propriété</label>
          <input type="text" id="search-console-property" class="seo-input" placeholder="sc-domain:example.com">
        </div>
        <button class="seo-button seo-button-secondary" style="margin-top: 1rem;" onclick="connectSearchConsole()">
          Connecter Search Console
        </button>
      </div>
    </div>

    <div style="margin-top: 2rem;">
      <h4 style="margin: 0 0 1rem 0;">Alertes automatiques</h4>
      <div>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <input type="checkbox" id="alert-404" checked>
          <span style="font-size: 0.875rem;">Erreurs 404</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem;">
          <input type="checkbox" id="alert-performance" checked>
          <span style="font-size: 0.875rem;">Baisse de performance</span>
        </label>
        <label style="display: flex; align-items: center; gap: 0.5rem;">
          <input type="checkbox" id="alert-ranking">
          <span style="font-size: 0.875rem;">Changement de position</span>
        </label>
      </div>
    </div>
  </div>

  <div class="seo-actions">
    <button class="seo-button seo-button-primary" onclick="saveSEOSettings()">
      Enregistrer les modifications
    </button>
    <button class="seo-button seo-button-secondary" onclick="generateSEOReport()">
      Générer un rapport SEO
    </button>
  </div>
</div>

<script>
// SEO Module JavaScript
const seoModule = {
  currentTab: 'basic',
  currentPageSEO: {},
  
  init() {
    this.loadCurrentPageSEO();
    this.setupEventListeners();
    this.updateSEOScore();
    this.updateSERPPreview();
  },

  loadCurrentPageSEO() {
    // Load SEO data from current page
    const pageData = window.cmsEnhanced?.getCurrentPageData?.() || {};
    this.currentPageSEO = pageData.seo || {};
    
    // Populate fields
    document.getElementById('seo-title').value = this.currentPageSEO.title || '';
    document.getElementById('seo-description').value = this.currentPageSEO.description || '';
    document.getElementById('seo-keywords').value = this.currentPageSEO.keywords || '';
    document.getElementById('seo-canonical').value = this.currentPageSEO.canonicalUrl || '';
    
    // Social fields
    document.getElementById('og-title').value = this.currentPageSEO.ogTitle || '';
    document.getElementById('og-description').value = this.currentPageSEO.ogDescription || '';
    document.getElementById('og-image').value = this.currentPageSEO.ogImage || '';
    document.getElementById('twitter-card').value = this.currentPageSEO.twitterCard || 'summary_large_image';
    
    // Analytics
    document.getElementById('ga4-id').value = this.currentPageSEO.ga4MeasurementId || '';
    document.getElementById('gtm-id').value = this.currentPageSEO.gtmContainerId || '';
  },

  setupEventListeners() {
    // Title input
    const titleInput = document.getElementById('seo-title');
    titleInput.addEventListener('input', () => {
      this.updateCharCount('title', titleInput.value, 60);
      this.updateSERPPreview();
      this.updateSEOScore();
    });

    // Description input
    const descInput = document.getElementById('seo-description');
    descInput.addEventListener('input', () => {
      this.updateCharCount('description', descInput.value, 160);
      this.updateSERPPreview();
      this.updateSEOScore();
    });

    // Keywords input
    const keywordsInput = document.getElementById('seo-keywords');
    keywordsInput.addEventListener('input', () => {
      this.updateKeywordTags();
      this.updateSEOScore();
    });

    // Analytics inputs
    document.getElementById('ga4-id').addEventListener('input', (e) => {
      this.updateAnalyticsStatus('ga4', e.target.value);
    });

    document.getElementById('gtm-id').addEventListener('input', (e) => {
      this.updateAnalyticsStatus('gtm', e.target.value);
    });
  },

  updateCharCount(field, value, maxLength) {
    const length = value.length;
    const countEl = document.getElementById(\`seo-\${field}-count\`);
    const statusEl = document.getElementById(\`seo-\${field}-status\`);
    
    countEl.textContent = \`\${length} / \${maxLength} caractères\`;
    
    if (field === 'title') {
      if (length < 30) {
        countEl.parentElement.className = 'seo-char-count warning';
        statusEl.textContent = 'Trop court';
      } else if (length > 60) {
        countEl.parentElement.className = 'seo-char-count error';
        statusEl.textContent = 'Trop long';
      } else {
        countEl.parentElement.className = 'seo-char-count';
        statusEl.textContent = 'Optimal';
      }
    } else if (field === 'description') {
      if (length < 120) {
        countEl.parentElement.className = 'seo-char-count warning';
        statusEl.textContent = 'Trop court';
      } else if (length > 160) {
        countEl.parentElement.className = 'seo-char-count error';
        statusEl.textContent = 'Trop long';
      } else {
        countEl.parentElement.className = 'seo-char-count';
        statusEl.textContent = 'Optimal';
      }
    }
  },

  updateSERPPreview() {
    const title = document.getElementById('seo-title').value || 'Titre de la page';
    const description = document.getElementById('seo-description').value || 'Description de la page';
    const url = window.location.hostname + (window.location.pathname === '/' ? '' : window.location.pathname);
    
    document.getElementById('serp-title').textContent = 
      title.length > 60 ? title.substring(0, 60) + '...' : title;
    document.getElementById('serp-description').textContent = 
      description.length > 160 ? description.substring(0, 160) + '...' : description;
    document.getElementById('serp-url').textContent = 'https://' + url;
  },

  updateSEOScore() {
    let score = 0;
    const suggestions = [];
    
    // Title checks
    const title = document.getElementById('seo-title').value;
    if (title) {
      score += 20;
      if (title.length >= 30 && title.length <= 60) score += 10;
      else suggestions.push({
        icon: '💡',
        text: 'Le titre devrait faire entre 30 et 60 caractères'
      });
    } else {
      suggestions.push({
        icon: '⚠️',
        text: 'Ajoutez un titre SEO pour améliorer votre référencement'
      });
    }
    
    // Description checks
    const description = document.getElementById('seo-description').value;
    if (description) {
      score += 20;
      if (description.length >= 120 && description.length <= 160) score += 10;
      else suggestions.push({
        icon: '💡',
        text: 'La description devrait faire entre 120 et 160 caractères'
      });
    } else {
      suggestions.push({
        icon: '⚠️',
        text: 'Ajoutez une meta description pour augmenter le taux de clic'
      });
    }
    
    // Keywords check
    if (document.getElementById('seo-keywords').value) score += 10;
    else suggestions.push({
      icon: '💡',
      text: 'Ajoutez des mots-clés cibles pour mieux cibler votre audience'
    });
    
    // Open Graph check
    if (document.getElementById('og-image').value) score += 10;
    else suggestions.push({
      icon: '💡',
      text: 'Ajoutez une image Open Graph pour les réseaux sociaux'
    });
    
    // Analytics check
    if (document.getElementById('ga4-id').value) score += 10;
    
    // Update score display
    document.getElementById('seo-score-value').textContent = score;
    const progress = document.getElementById('seo-score-progress');
    const circumference = 283;
    const offset = circumference - (score / 100) * circumference;
    progress.style.strokeDashoffset = offset;
    
    // Color based on score
    if (score >= 80) progress.style.stroke = '#10b981';
    else if (score >= 60) progress.style.stroke = '#f59e0b';
    else progress.style.stroke = '#ef4444';
    
    // Update suggestions
    this.updateSuggestions(suggestions);
  },

  updateSuggestions(suggestions) {
    const container = document.getElementById('seo-suggestions');
    const list = document.getElementById('seo-suggestions-list');
    
    if (suggestions.length === 0) {
      container.style.display = 'none';
      return;
    }
    
    container.style.display = 'block';
    list.innerHTML = suggestions.map(s => \`
      <div class="seo-suggestion">
        <span class="seo-suggestion-icon">\${s.icon}</span>
        <span class="seo-suggestion-text">\${s.text}</span>
      </div>
    \`).join('');
  },

  updateKeywordTags() {
    const keywords = document.getElementById('seo-keywords').value
      .split(',')
      .map(k => k.trim())
      .filter(k => k);
      
    const list = document.getElementById('keyword-list');
    list.innerHTML = keywords.map(k => \`
      <span class="keyword-tag">
        \${k}
        <button onclick="seoModule.removeKeyword('\${k}')" title="Supprimer">×</button>
      </span>
    \`).join('');
  },

  removeKeyword(keyword) {
    const input = document.getElementById('seo-keywords');
    const keywords = input.value
      .split(',')
      .map(k => k.trim())
      .filter(k => k && k !== keyword);
    input.value = keywords.join(', ');
    this.updateKeywordTags();
    this.updateSEOScore();
  },

  updateAnalyticsStatus(type, value) {
    const statusEl = document.getElementById(\`\${type}-status\`);
    if (value) {
      statusEl.className = 'analytics-status active';
      statusEl.innerHTML = '<span class="status-dot">●</span> Actif';
    } else {
      statusEl.className = 'analytics-status inactive';
      statusEl.innerHTML = '<span class="status-dot">●</span> Inactif';
    }
  },

  async analyzeKeywords() {
    const keywords = document.getElementById('seo-keywords').value;
    if (!keywords) return;
    
    // Simulate keyword analysis
    alert('Analyse des mots-clés en cours... (fonctionnalité simulée)');
  },

  selectOGImage() {
    // Open media selector if available
    if (window.cmsEnhanced?.openMediaSelector) {
      window.cmsEnhanced.openMediaSelector((url) => {
        document.getElementById('og-image').value = url;
      });
    } else {
      alert('Sélecteur d\\'images non disponible');
    }
  },

  updateSchemaBuilder() {
    const type = document.getElementById('schema-type').value;
    const fieldsContainer = document.getElementById('schema-fields');
    
    if (!type) {
      fieldsContainer.innerHTML = '';
      return;
    }
    
    // Generate fields based on schema type
    const schemas = {
      LocalBusiness: ['name', 'address', 'telephone', 'openingHours', 'priceRange'],
      Service: ['name', 'description', 'provider', 'areaServed', 'serviceType'],
      FAQPage: ['questions'],
      BreadcrumbList: ['items'],
      Organization: ['name', 'url', 'logo', 'contactPoint', 'sameAs'],
      Review: ['itemReviewed', 'reviewRating', 'author', 'datePublished'],
      HowTo: ['name', 'description', 'steps', 'totalTime']
    };
    
    const fields = schemas[type] || [];
    fieldsContainer.innerHTML = fields.map(field => \`
      <div class="seo-field">
        <label class="seo-label" for="schema-\${field}">\${field}</label>
        <input type="text" id="schema-\${field}" class="seo-input" placeholder="\${field}">
      </div>
    \`).join('');
    
    this.updateSchemaPreview();
  },

  updateSchemaPreview() {
    const type = document.getElementById('schema-type').value;
    if (!type) return;
    
    const schema = {
      '@context': 'https://schema.org',
      '@type': type
    };
    
    // Add field values
    const inputs = document.querySelectorAll('[id^="schema-"]:not(#schema-type):not(#schema-preview)');
    inputs.forEach(input => {
      if (input.value) {
        const field = input.id.replace('schema-', '');
        schema[field] = input.value;
      }
    });
    
    document.getElementById('schema-preview').textContent = JSON.stringify(schema, null, 2);
  },

  connectSearchConsole() {
    alert('Connexion à Search Console... (fonctionnalité à implémenter)');
  },

  async saveSEOSettings() {
    const seoData = {
      title: document.getElementById('seo-title').value,
      description: document.getElementById('seo-description').value,
      keywords: document.getElementById('seo-keywords').value,
      canonicalUrl: document.getElementById('seo-canonical').value,
      ogTitle: document.getElementById('og-title').value,
      ogDescription: document.getElementById('og-description').value,
      ogImage: document.getElementById('og-image').value,
      twitterCard: document.getElementById('twitter-card').value,
      ga4MeasurementId: document.getElementById('ga4-id').value,
      gtmContainerId: document.getElementById('gtm-id').value,
      // Add more fields as needed
    };
    
    // Save to current page
    if (window.cmsEnhanced?.updatePageSEO) {
      await window.cmsEnhanced.updatePageSEO(seoData);
      alert('Paramètres SEO enregistrés avec succès !');
    } else {
      console.log('SEO Data to save:', seoData);
      alert('Fonction de sauvegarde non disponible');
    }
  },

  generateSEOReport() {
    const score = parseInt(document.getElementById('seo-score-value').textContent);
    const title = document.getElementById('seo-title').value;
    const description = document.getElementById('seo-description').value;
    
    const report = \`
# Rapport SEO
Date: \${new Date().toLocaleDateString('fr-FR')}

## Score global: \${score}/100

### Optimisations actuelles:
- Titre: \${title ? '✅' : '❌'} \${title || 'Non défini'}
- Description: \${description ? '✅' : '❌'} \${description || 'Non définie'}
- Mots-clés: \${document.getElementById('seo-keywords').value ? '✅' : '❌'}
- Image OG: \${document.getElementById('og-image').value ? '✅' : '❌'}
- Analytics: \${document.getElementById('ga4-id').value ? '✅' : '❌'}

### Recommandations:
\${score < 80 ? '- Complétez tous les champs SEO de base\\n- Ajoutez des données structurées\\n- Configurez le suivi Analytics' : '- Continuez à optimiser votre contenu\\n- Surveillez vos positions\\n- Analysez la concurrence'}
    \`;
    
    // Download report
    const blob = new Blob([report], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rapport-seo.md';
    a.click();
    URL.revokeObjectURL(url);
  }
};

// Tab switching
function switchSEOTab(tab) {
  document.querySelectorAll('.seo-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.seo-content').forEach(c => c.classList.remove('active'));
  
  document.querySelector(\`.seo-tab:nth-child(\${
    { basic: 1, social: 2, schema: 3, analytics: 4, monitoring: 5 }[tab]
  })\`).classList.add('active');
  document.getElementById(\`seo-\${tab}\`).classList.add('active');
  
  seoModule.currentTab = tab;
}

// Initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => seoModule.init());
} else {
  seoModule.init();
}

// Export for CMS integration
window.seoModule = seoModule;
</script>
`;
}