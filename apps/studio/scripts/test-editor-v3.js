#!/usr/bin/env node

/**
 * Script pour créer un projet de test avec des blocs V3
 */

const fs = require('fs').promises;
const path = require('path');

async function createV3TestProject() {
  console.log('=== Création d\'un projet de test avec blocs V3 ===\n');

  try {
    // Créer un projet via l'API
    const projectData = {
      name: 'Test V3 Blocks Preview',
      clientName: 'Test Client',
      description: 'Projet pour tester l\'affichage des blocs V3',
      industry: 'technology',
      pages: [
        {
          id: '1',
          name: 'Accueil',
          slug: '/',
          blocks: [
            {
              id: 'hero-1',
              type: 'hero-v3-perfect',
              props: {
                variant: 'split-modern',
                content: {
                  title: 'Test Hero V3 Perfect',
                  subtitle: 'Architecture moderne',
                  description: 'Test du système de rendu V3 avec toutes les fonctionnalités modernes et avancées pour un affichage parfait.',
                  primaryButton: {
                    text: 'Commencer maintenant',
                    link: '#start'
                  },
                  secondaryButton: {
                    text: 'En savoir plus',
                    link: '#more'
                  }
                },
                media: {
                  type: 'image',
                  src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
                  alt: 'Hero moderne'
                },
                settings: {
                  height: 'screen',
                  contentPosition: 'center-left',
                  theme: 'light'
                }
              }
            },
            {
              id: 'features-1',
              type: 'features-v3-perfect',
              props: {
                variant: 'bento-box',
                content: {
                  title: 'Fonctionnalités V3',
                  subtitle: 'Découvrez nos services',
                  features: [
                    {
                      id: '1',
                      icon: 'zap',
                      title: 'Ultra rapide',
                      description: 'Performance optimale garantie',
                      color: '#3b82f6'
                    },
                    {
                      id: '2',
                      icon: 'shield',
                      title: 'Sécurisé',
                      description: 'Protection maximale de vos données',
                      color: '#10b981'
                    },
                    {
                      id: '3',
                      icon: 'globe',
                      title: 'Global',
                      description: 'Accessible partout dans le monde',
                      color: '#8b5cf6'
                    },
                    {
                      id: '4',
                      icon: 'trending-up',
                      title: 'Évolutif',
                      description: 'Croissance sans limites',
                      color: '#f59e0b'
                    }
                  ]
                }
              }
            },
            {
              id: 'services-1',
              type: 'services-v3-perfect',
              props: {
                variant: 'cards-3d',
                content: {
                  title: 'Nos Services V3',
                  subtitle: 'Excellence et innovation',
                  services: [
                    {
                      id: '1',
                      icon: 'code',
                      title: 'Développement Web',
                      description: 'Sites web modernes et performants avec les dernières technologies',
                      price: 'À partir de 2000€',
                      features: ['React/Next.js', 'API REST', 'Responsive', 'SEO optimisé'],
                      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
                    },
                    {
                      id: '2',
                      icon: 'smartphone',
                      title: 'Applications Mobiles',
                      description: 'Apps iOS et Android natives ou hybrides',
                      price: 'À partir de 5000€',
                      features: ['React Native', 'Flutter', 'Native iOS/Android', 'Publication stores'],
                      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop'
                    },
                    {
                      id: '3',
                      icon: 'cloud',
                      title: 'Cloud & DevOps',
                      description: 'Infrastructure moderne et scalable',
                      price: 'Sur devis',
                      features: ['AWS/Azure', 'CI/CD', 'Docker/K8s', 'Monitoring'],
                      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
                    }
                  ]
                }
              }
            }
          ]
        }
      ]
    };

    // Sauvegarder le projet dans un fichier
    const outputPath = path.join(__dirname, 'test-v3-project.json');
    await fs.writeFile(outputPath, JSON.stringify(projectData, null, 2));
    
    console.log('✅ Projet de test créé:', outputPath);
    console.log('\n📝 Pour tester:');
    console.log('1. Créez le projet via l\'API:');
    console.log('   curl -X POST http://localhost:3001/api/projects \\');
    console.log('     -H "Content-Type: application/json" \\');
    console.log('     -d @scripts/test-v3-project.json');
    console.log('\n2. Ou utilisez le script test-project-data.js pour créer le projet');
    console.log('\n3. Ouvrez l\'éditeur et vérifiez la preview des blocs V3');

    // Créer aussi un fichier HTML de test statique
    const testHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test V3 Blocks Static</title>
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        margin: 0;
        padding: 20px;
        background: #f3f4f6;
      }
      .test-section {
        background: white;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .block-info {
        background: #e5e7eb;
        padding: 10px;
        border-radius: 4px;
        margin-bottom: 10px;
        font-family: monospace;
      }
      iframe {
        width: 100%;
        height: 600px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
      }
    </style>
</head>
<body>
    <h1>Test des blocs V3 Perfect</h1>
    
    <div class="test-section">
      <h2>1. Hero V3 Perfect</h2>
      <div class="block-info">
        Type: hero-v3-perfect<br>
        Variant: split-modern
      </div>
      <iframe id="hero-preview"></iframe>
    </div>

    <div class="test-section">
      <h2>2. Features V3 Perfect</h2>
      <div class="block-info">
        Type: features-v3-perfect<br>
        Variant: bento-box
      </div>
      <iframe id="features-preview"></iframe>
    </div>

    <div class="test-section">
      <h2>3. Services V3 Perfect</h2>
      <div class="block-info">
        Type: services-v3-perfect<br>
        Variant: cards-3d
      </div>
      <iframe id="services-preview"></iframe>
    </div>

    <script>
      // Test de rendu pour chaque bloc
      const blocks = ${JSON.stringify(projectData.pages[0].blocks, null, 2)};
      
      blocks.forEach((block, index) => {
        const iframe = document.getElementById(block.type.replace('-v3-perfect', '') + '-preview');
        if (iframe) {
          // Simuler le rendu du bloc
          iframe.srcdoc = \`
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { 
                  margin: 0; 
                  font-family: system-ui, -apple-system, sans-serif;
                  background: #f9fafb;
                }
                .loading {
                  padding: 40px;
                  text-align: center;
                  color: #6b7280;
                }
              </style>
            </head>
            <body>
              <div class="loading">
                <h3>Bloc \${block.type}</h3>
                <p>ID: \${block.id}</p>
                <p>Variant: \${block.props.variant}</p>
                <pre style="text-align: left; background: #f3f4f6; padding: 10px; border-radius: 4px;">
\${JSON.stringify(block.props, null, 2)}
                </pre>
              </div>
            </body>
            </html>
          \`;
        }
      });
    </script>
</body>
</html>
    `;

    await fs.writeFile(path.join(__dirname, 'test-v3-static.html'), testHtml);
    console.log('\n✅ Page de test statique créée: test-v3-static.html');

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

// Exécuter
createV3TestProject();