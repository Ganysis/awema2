import type { EditorBlock, Page } from '@/lib/store/editor-store';
import { getBlockRenderFunction } from '@/lib/blocks/block-registry';

/**
 * Service d'export CORRIGÉ qui fonctionne vraiment
 */
export class ExportServiceFixed {
  static async exportSite(projectData: any, options: any = {}): Promise<any> {
    const {
      pages = [],
      theme = {},
      businessInfo = {},
      globalHeader,
      globalFooter,
      projectName = 'Mon Site'
    } = projectData;

    // CSS complet avec TOUS les styles nécessaires
    const completeCSS = `
/* Reset CSS */
*, *::before, *::after { box-sizing: border-box; }
* { margin: 0; padding: 0; }
html, body { height: 100%; }
body { line-height: 1.5; -webkit-font-smoothing: antialiased; }
img, picture, video, canvas, svg { display: block; max-width: 100%; }
input, button, textarea, select { font: inherit; }
p, h1, h2, h3, h4, h5, h6 { overflow-wrap: break-word; }

/* Variables */
:root {
  --primary: ${theme.colors?.primary || '#3b82f6'};
  --secondary: ${theme.colors?.secondary || '#10b981'};
  --accent: ${theme.colors?.accent || '#f59e0b'};
  --text: #1f2937;
  --bg: #ffffff;
  --border: #e5e7eb;
}

/* Base */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Typography */
h1 { font-size: 2.5rem; font-weight: 800; line-height: 1.2; }
h2 { font-size: 2rem; font-weight: 700; line-height: 1.3; }
h3 { font-size: 1.5rem; font-weight: 600; line-height: 1.4; }
p { margin-bottom: 1rem; }

/* Buttons - IMPORTANT */
.btn, button, a.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:hover, button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: var(--secondary);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

/* Forms - IMPORTANT */
form { width: 100%; }

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text);
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  background: white;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Glassmorphism */
.glassmorphism {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* Gradients */
.gradient-wave {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
}

.gradient-primary {
  background: linear-gradient(135deg, var(--primary), var(--secondary));
}

/* Sections */
section {
  padding: 4rem 0;
}

/* Grid */
.grid {
  display: grid;
  gap: 2rem;
}

@media (min-width: 768px) {
  .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
`;

    let allHTML = '';
    let allCSS = completeCSS;
    let allJS = '';

    // Helper pour nettoyer et valider les props
    const sanitizeProps = (props: any): any => {
      if (!props) return {};
      
      const cleaned = { ...props };
      
      // Gérer les cas spéciaux
      Object.keys(cleaned).forEach(key => {
        const value = cleaned[key];
        
        // Si undefined, supprimer ou donner valeur par défaut
        if (value === undefined) {
          if (key.includes('title') || key.includes('text')) {
            cleaned[key] = '';
          } else if (key.includes('items') || key.includes('fields')) {
            cleaned[key] = [];
          } else {
            delete cleaned[key];
          }
        }
        
        // Parser JSON si nécessaire
        if (typeof value === 'string' && value.startsWith('{')) {
          try {
            cleaned[key] = JSON.parse(value);
          } catch (e) {
            // Garder tel quel
          }
        }
      });
      
      return cleaned;
    };

    // Fonction de rendu sécurisé
    const renderBlockSafe = (block: EditorBlock): void => {
      try {
        console.log(`[Export] Rendu du bloc ${block.type}`);
        
        const renderFn = getBlockRenderFunction(block.type);
        if (!renderFn) {
          console.warn(`[Export] Pas de fonction de rendu pour ${block.type}`);
          allHTML += `<!-- Bloc ${block.type} non supporté -->`;
          return;
        }
        
        const cleanProps = sanitizeProps(block.props);
        const result = renderFn(cleanProps, []);
        
        if (result) {
          if (result.html) allHTML += result.html;
          if (result.css) allCSS += '\n' + result.css;
          if (result.js) allJS += '\n' + result.js;
        }
      } catch (error) {
        console.error(`[Export] Erreur bloc ${block.type}:`, error);
        allHTML += `<!-- Erreur rendu ${block.type} -->`;
      }
    };

    // Rendre header
    if (globalHeader) {
      renderBlockSafe(globalHeader);
    }

    // Rendre les blocs de la page
    const homePage = pages.find((p: Page) => p.slug === '/') || pages[0];
    if (homePage?.blocks) {
      homePage.blocks.forEach(renderBlockSafe);
    }

    // Rendre footer - IMPORTANT
    if (globalFooter) {
      renderBlockSafe(globalFooter);
    }

    // JavaScript pour maps et interactivité
    const completeJS = `
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Form submission
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Collecter les données
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    alert('Message envoyé ! (Mode démo)');
    
    // Reset form
    form.reset();
  });
});

// Google Maps - IMPORTANT
function initMap() {
  const mapElements = document.querySelectorAll('.map-container');
  
  mapElements.forEach(mapEl => {
    const lat = parseFloat(mapEl.dataset.lat || '48.8566');
    const lng = parseFloat(mapEl.dataset.lng || '2.3522');
    const zoom = parseInt(mapEl.dataset.zoom || '14');
    
    const map = new google.maps.Map(mapEl, {
      center: { lat, lng },
      zoom: zoom,
      styles: [
        {
          featureType: "all",
          elementType: "geometry",
          stylers: [{ color: "#f5f5f5" }]
        }
      ]
    });
    
    new google.maps.Marker({
      position: { lat, lng },
      map: map,
      title: 'Notre localisation'
    });
  });
}

// Charger Google Maps si nécessaire
if (document.querySelector('.map-container')) {
  const script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGpR8FPL3BzAP3Ev1H64oAZFbXbXPEKmA&callback=initMap';
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

${allJS}
`;

    // HTML final
    const finalHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.name || projectName}</title>
    <meta name="description" content="${businessInfo.description || 'Site web professionnel'}">
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='0.9em' font-size='90'%3E🌟%3C/text%3E%3C/svg%3E">
    
    <style>${allCSS}</style>
</head>
<body>
    ${allHTML}
    
    <script>${completeJS}</script>
</body>
</html>`;

    // Retourner le résultat
    return {
      html: finalHTML,
      css: allCSS,
      js: completeJS,
      additionalFiles: options.includeCms ? this.generateCMSFiles(projectData, options) : [],
      assets: []
    };
  }

  // Générer les fichiers CMS
  private static generateCMSFiles(projectData: any, options: any): any[] {
    // CMS basique pour l'instant
    return [{
      path: 'admin/index.html',
      content: `<!DOCTYPE html>
<html>
<head>
    <title>CMS - ${projectData.businessInfo?.name || 'Admin'}</title>
    <style>
      body { font-family: sans-serif; padding: 2rem; }
      .container { max-width: 1200px; margin: 0 auto; }
    </style>
</head>
<body>
    <div class="container">
        <h1>CMS en construction</h1>
        <p>Le CMS sera bientôt disponible.</p>
    </div>
</body>
</html>`
    }];
  }
}

// Export pour compatibilité
export const StaticExportService = ExportServiceFixed;