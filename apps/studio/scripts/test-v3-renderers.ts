/**
 * Test complet des renderers V3
 */

import { RenderEngineV3 } from '../lib/v3/core/render-engine-with-logs';
import { HeroRendererV3 } from '../lib/v3/renderers/hero.renderer';
import { ContactRendererV3 } from '../lib/v3/renderers/contact.renderer';
import { FeaturesRendererV3 } from '../lib/v3/renderers/features.renderer';
import { GalleryRendererV3 } from '../lib/v3/renderers/gallery.renderer';
import { FAQRendererV3 } from '../lib/v3/renderers/faq.renderer';
import { PricingRendererV3 } from '../lib/v3/renderers/pricing.renderer';
import { logger } from '../lib/v3/core/logger';
import * as fs from 'fs';
import * as path from 'path';

async function testAllRenderers() {
  logger.info('TestV3', 'main', '🚀 Démarrage des tests renderers V3');
  
  // Créer le moteur de rendu
  const engine = new RenderEngineV3();
  
  // Enregistrer tous les renderers
  engine.registerRenderer(new HeroRendererV3());
  engine.registerRenderer(new ContactRendererV3());
  engine.registerRenderer(new FeaturesRendererV3());
  engine.registerRenderer(new GalleryRendererV3());
  engine.registerRenderer(new FAQRendererV3());
  engine.registerRenderer(new PricingRendererV3());
  
  logger.info('TestV3', 'main', '✅ Tous les renderers enregistrés');
  
  // Créer les blocs de test
  const blocks = [
    {
      id: 'hero-1',
      type: 'hero-ultra-modern',
      data: {
        variant: 'gradient-animated',
        title: 'Votre Artisan de Confiance',
        subtitle: 'Expert en rénovation depuis 2010',
        description: 'Transformons vos projets en réalité avec passion et expertise',
        cta: {
          primary: {
            text: 'Demander un devis',
            link: '#contact'
          },
          secondary: {
            text: 'Voir nos réalisations',
            link: '#gallery'
          }
        }
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    },
    {
      id: 'features-1',
      type: 'features-ultra-modern',
      data: {
        variant: 'grid-cards',
        title: 'Nos Services',
        features: [
          {
            id: '1',
            title: 'Rénovation complète',
            description: 'De A à Z, nous gérons tout',
            icon: '🏠'
          },
          {
            id: '2',
            title: 'Électricité',
            description: 'Installation et mise aux normes',
            icon: '⚡'
          },
          {
            id: '3',
            title: 'Plomberie',
            description: 'Dépannage et installation',
            icon: '🔧'
          }
        ]
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    },
    {
      id: 'gallery-1',
      type: 'gallery-ultra-modern',
      data: {
        variant: 'masonry-flow',
        title: 'Nos Réalisations',
        items: [
          {
            id: '1',
            src: '/images/project1.jpg',
            alt: 'Rénovation cuisine',
            title: 'Cuisine moderne',
            category: 'cuisine'
          },
          {
            id: '2',
            src: '/images/project2.jpg',
            alt: 'Salle de bain',
            title: 'Salle de bain luxe',
            category: 'salle-de-bain'
          }
        ]
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    },
    {
      id: 'pricing-1',
      type: 'pricing-ultra-modern',
      data: {
        variant: 'cards-modern',
        title: 'Nos Tarifs',
        plans: [
          {
            id: '1',
            name: 'Basic',
            price: {
              amount: 500,
              currency: '€',
              period: 'once'
            },
            features: [
              { text: 'Devis gratuit', included: true },
              { text: 'Garantie 1 an', included: true },
              { text: 'Support prioritaire', included: false }
            ],
            cta: {
              text: 'Choisir',
              link: '#contact',
              variant: 'outline',
              fullWidth: true
            }
          },
          {
            id: '2',
            name: 'Pro',
            price: {
              amount: 1500,
              currency: '€',
              period: 'once'
            },
            features: [
              { text: 'Devis gratuit', included: true },
              { text: 'Garantie 2 ans', included: true },
              { text: 'Support prioritaire', included: true }
            ],
            cta: {
              text: 'Choisir Pro',
              link: '#contact',
              variant: 'primary',
              fullWidth: true
            },
            recommended: true
          }
        ]
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    },
    {
      id: 'faq-1',
      type: 'faq-ultra-modern',
      data: {
        variant: 'accordion-classic',
        title: 'Questions Fréquentes',
        items: [
          {
            id: '1',
            question: 'Quels sont vos délais ?',
            answer: 'Nos délais varient de 2 à 6 semaines selon la complexité du projet.'
          },
          {
            id: '2',
            question: 'Proposez-vous des garanties ?',
            answer: 'Oui, tous nos travaux sont garantis de 1 à 5 ans selon le type.'
          }
        ]
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    },
    {
      id: 'contact-1',
      type: 'contact-ultra-modern',
      data: {
        variant: 'split-modern',
        title: 'Contactez-nous',
        info: {
          phone: '01 23 45 67 89',
          email: 'contact@artisan.fr',
          address: '123 rue de la Paix, 75001 Paris',
          hours: 'Lun-Ven: 8h-18h, Sam: 9h-12h'
        },
        form: {
          fields: [
            { name: 'name', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ],
          submitText: 'Envoyer'
        }
      },
      metadata: {
        version: '3.0.0',
        createdAt: new Date().toISOString()
      }
    }
  ];
  
  // Rendre tous les blocs
  logger.info('TestV3', 'main', `📦 Rendu de ${blocks.length} blocs...`);
  
  const results = [];
  let allSuccess = true;
  
  for (const block of blocks) {
    logger.info('TestV3', 'main', `🎨 Rendu du bloc ${block.type}#${block.id}`);
    
    const result = await engine.renderBlock(block);
    results.push({ block, result });
    
    if (result.errors.length > 0) {
      logger.error('TestV3', 'main', `❌ Erreurs pour ${block.type}`, undefined, {
        errors: result.errors
      });
      allSuccess = false;
    } else {
      logger.info('TestV3', 'main', `✅ ${block.type} rendu avec succès`, {
        htmlLength: result.html.length,
        cssLength: result.css.length,
        jsLength: result.js.length,
        renderTime: result.performance?.renderTime
      });
    }
  }
  
  // Générer le HTML complet
  logger.info('TestV3', 'main', '📄 Génération du HTML complet...');
  
  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Renderers V3 - AWEMA Studio</title>
  <style>
    /* Reset et styles de base */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1f2937;
    }
    
    /* Variables CSS */
    :root {
      --primary: #3b82f6;
      --primary-100: #dbeafe;
      --primary-600: #2563eb;
      --secondary: #10b981;
      --secondary-600: #059669;
      --success: #10b981;
      --success-100: #d1fae5;
      --success-700: #065f46;
      --warning: #f59e0b;
      --error: #ef4444;
      --error-100: #fee2e2;
      --error-700: #b91c1c;
      --text: #1f2937;
      --text-secondary: #6b7280;
      --bg-elevated: #ffffff;
      --bg-secondary: #f9fafb;
      --bg-hover: #f3f4f6;
      --border: #e5e7eb;
    }
    
    /* Animations */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Espacement entre sections */
    section + section {
      margin-top: 4rem;
    }
    
    /* CSS des blocs */
${results.map(r => r.result.css).join('\n\n')}
  </style>
</head>
<body>
  <!-- Test info -->
  <div style="background: #f3f4f6; padding: 2rem; text-align: center; margin-bottom: 2rem;">
    <h1>Test Renderers V3 - AWEMA Studio</h1>
    <p>Généré le ${new Date().toLocaleString('fr-FR')}</p>
    <p>${blocks.length} blocs rendus | ${allSuccess ? '✅ Tous réussis' : '❌ Des erreurs sont survenues'}</p>
  </div>
  
  <!-- Blocs rendus -->
${results.map(r => r.result.html).join('\n\n')}
  
  <!-- JavaScript des blocs -->
  <script>
${results.map(r => r.result.js).filter(js => js).join('\n\n')}
  </script>
  
  <!-- Logs de debug -->
  <script>
    console.log('🚀 Page de test V3 chargée');
    console.log('📦 Blocs rendus:', ${JSON.stringify(blocks.map(b => ({ id: b.id, type: b.type })))});
    
    // Afficher les performances
    const performances = ${JSON.stringify(results.map(r => ({
      block: r.block.type,
      renderTime: r.result.performance?.renderTime,
      cssSize: r.result.performance?.cssSize,
      jsSize: r.result.performance?.jsSize
    })))};
    
    console.table(performances);
  </script>
</body>
</html>`;
  
  // Sauvegarder le fichier
  const outputPath = path.join(__dirname, 'test-v3-renderers.html');
  fs.writeFileSync(outputPath, html);
  
  logger.info('TestV3', 'main', `✅ Fichier HTML généré: ${outputPath}`);
  
  // Afficher le résumé
  logger.info('TestV3', 'main', '📊 RÉSUMÉ DES TESTS');
  logger.info('TestV3', 'main', `- Blocs testés: ${blocks.length}`);
  logger.info('TestV3', 'main', `- Succès: ${results.filter(r => r.result.errors.length === 0).length}`);
  logger.info('TestV3', 'main', `- Erreurs: ${results.filter(r => r.result.errors.length > 0).length}`);
  logger.info('TestV3', 'main', `- Taille HTML totale: ${html.length} caractères`);
  
  // Afficher les logs
  const logs = logger.getLogs();
  logger.info('TestV3', 'main', `📝 Total des logs: ${logs.length}`);
  
  return {
    success: allSuccess,
    results,
    outputPath
  };
}

// Exécuter les tests
testAllRenderers()
  .then(result => {
    logger.info('TestV3', 'main', result.success ? '✅ TOUS LES TESTS RÉUSSIS!' : '❌ Des tests ont échoué');
    process.exit(result.success ? 0 : 1);
  })
  .catch(error => {
    logger.error('TestV3', 'main', '💥 Erreur fatale', error);
    process.exit(1);
  });