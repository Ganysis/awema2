#!/usr/bin/env node

/**
 * Génère un export statique avec tous les blocs V3 Perfect
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Import des renderers
import { HeroRendererV3Perfect } from '../lib/v3/renderers/hero-perfect.renderer.js';
import { FeaturesRendererV3Perfect } from '../lib/v3/renderers/features-perfect.renderer.js';
import { ServicesRendererV3Perfect } from '../lib/v3/renderers/services-perfect.renderer.js';
import { GalleryRendererV3Perfect } from '../lib/v3/renderers/gallery-perfect.renderer.js';
import { ContentRendererV3Perfect } from '../lib/v3/renderers/content-perfect.renderer.js';
import { TestimonialsRendererV3Perfect } from '../lib/v3/renderers/testimonials-perfect.renderer.js';
import { PricingRendererV3Perfect } from '../lib/v3/renderers/pricing-perfect.renderer.js';
import { FAQRendererV3Perfect } from '../lib/v3/renderers/faq-perfect.renderer.js';
import { CTARendererV3Perfect } from '../lib/v3/renderers/cta-perfect.renderer.js';
import { ContactRendererV3Perfect } from '../lib/v3/renderers/contact-perfect.renderer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Génération de l\'export V3 Perfect\n');

// Configuration du site
const siteConfig = {
  name: 'Demo V3 Perfect',
  title: 'AWEMA Studio - Blocs V3 Perfect',
  description: 'Démonstration de tous les blocs V3 avec design magnifique et ergonomie parfaite',
  primaryColor: '#6366f1',
  secondaryColor: '#764ba2'
};

// Renderers
const renderers = {
  hero: new HeroRendererV3Perfect(),
  features: new FeaturesRendererV3Perfect(),
  services: new ServicesRendererV3Perfect(),
  gallery: new GalleryRendererV3Perfect(),
  content: new ContentRendererV3Perfect(),
  testimonials: new TestimonialsRendererV3Perfect(),
  pricing: new PricingRendererV3Perfect(),
  faq: new FAQRendererV3Perfect(),
  cta: new CTARendererV3Perfect(),
  contact: new ContactRendererV3Perfect()
};

// Configuration des blocs
const blocks = [
  {
    type: 'hero',
    data: {
      variant: 'gradient-animated',
      title: 'Bienvenue sur AWEMA Studio V3',
      subtitle: 'Découvrez la nouvelle génération de blocs avec un design magnifique et une ergonomie parfaite',
      description: 'Plus de 80 variantes spectaculaires pour créer des sites web exceptionnels.',
      buttons: [
        {
          text: 'Commencer maintenant',
          link: '#features',
          style: 'primary',
          icon: '🚀'
        },
        {
          text: 'Voir la démo',
          link: '#gallery',
          style: 'secondary',
          icon: '▶️'
        }
      ],
      image: {
        url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200',
        alt: 'Team working'
      }
    }
  },
  {
    type: 'features',
    data: {
      variant: 'bento-box',
      title: 'Fonctionnalités exceptionnelles',
      subtitle: 'Tout ce dont vous avez besoin pour créer des sites web modernes'
    }
  },
  {
    type: 'services',
    data: {
      variant: 'hexagon-grid',
      title: 'Nos services',
      subtitle: 'Des solutions adaptées à tous vos besoins'
    }
  },
  {
    type: 'gallery',
    data: {
      variant: 'masonry-modern',
      title: 'Portfolio',
      subtitle: 'Découvrez nos dernières réalisations'
    }
  },
  {
    type: 'content',
    data: {
      variant: 'magazine-layout',
      title: 'Notre histoire',
      subtitle: 'Une aventure passionnante dans le monde du web'
    }
  },
  {
    type: 'testimonials',
    data: {
      variant: 'carousel-modern',
      title: 'Ce que disent nos clients',
      subtitle: 'Plus de 1000 professionnels satisfaits'
    }
  },
  {
    type: 'pricing',
    data: {
      variant: 'cards-modern',
      title: 'Tarifs transparents',
      subtitle: 'Choisissez la formule qui vous convient'
    }
  },
  {
    type: 'faq',
    data: {
      variant: 'accordion-modern',
      title: 'Questions fréquentes',
      subtitle: 'Tout ce que vous devez savoir'
    }
  },
  {
    type: 'cta',
    data: {
      variant: 'gradient-wave',
      title: 'Prêt à transformer votre présence en ligne ?',
      subtitle: 'Rejoignez des milliers de professionnels satisfaits'
    }
  },
  {
    type: 'contact',
    data: {
      variant: 'split-modern',
      title: 'Contactez-nous',
      subtitle: 'Nous sommes là pour vous accompagner'
    }
  }
];

// Générer le HTML
console.log('📝 Génération du HTML...');

let allCSS = '';
let allJS = '';
let allHTML = '';

blocks.forEach(block => {
  const renderer = renderers[block.type];
  if (!renderer) {
    console.error(`❌ Renderer non trouvé pour ${block.type}`);
    return;
  }
  
  // Obtenir les données par défaut et merger avec les données custom
  const defaultData = renderer.getDefaultData();
  const mergedData = { ...defaultData, ...block.data };
  
  // Valider
  const validation = renderer.validate(mergedData);
  if (!validation.success) {
    console.error(`❌ Validation échouée pour ${block.type}:`, validation.error);
    return;
  }
  
  // Rendre
  const result = renderer.render(validation.data, { isExport: true });
  
  allHTML += result.html + '\n\n';
  allCSS += `\n/* === ${block.type.toUpperCase()} === */\n${result.css}\n`;
  allJS += `\n// === ${block.type.toUpperCase()} ===\n${result.js}\n`;
  
  console.log(`✓ ${block.type} généré`);
});

// Template HTML complet
const htmlTemplate = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${siteConfig.description}">
  <title>${siteConfig.title}</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
  
  <style>
    /* Reset & Base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    :root {
      --primary: ${siteConfig.primaryColor};
      --secondary: ${siteConfig.secondaryColor};
      --text-primary: #1f2937;
      --text-secondary: #6b7280;
      --bg-primary: #ffffff;
      --bg-secondary: #f9fafb;
    }
    
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      line-height: 1.6;
      color: var(--text-primary);
      background: var(--bg-primary);
      overflow-x: hidden;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
    
    a {
      color: inherit;
      text-decoration: none;
    }
    
    /* Animations globales */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
      from { transform: translateX(-100%); }
      to { transform: translateX(0); }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    
    /* Utility classes */
    .animated {
      animation: fadeIn 0.6s ease forwards;
    }
    
    ${allCSS}
  </style>
</head>
<body>
  ${allHTML}
  
  <script>
    // Utility functions
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    ${allJS}
  </script>
</body>
</html>`;

// Créer le dossier d'export
const exportDir = path.join(__dirname, 'v3-export');
if (!fs.existsSync(exportDir)) {
  fs.mkdirSync(exportDir, { recursive: true });
}

// Écrire le fichier
const outputPath = path.join(exportDir, 'index.html');
fs.writeFileSync(outputPath, htmlTemplate);

console.log('\n✅ Export généré avec succès !');
console.log(`📁 Fichier : ${outputPath}`);
console.log(`📏 Taille : ${(Buffer.byteLength(htmlTemplate) / 1024).toFixed(2)} KB`);
console.log('\n🌐 Pour visualiser : ouvrez le fichier dans votre navigateur');
console.log('📤 Pour déployer : utilisez la fonction de déploiement dans AWEMA Studio');