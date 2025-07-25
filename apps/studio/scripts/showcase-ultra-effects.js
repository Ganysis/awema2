const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function showcaseUltraEffects() {
  try {
    console.log('✨ Création des templates de démonstration avec effets ultra...\n');
    
    // Templates avec différents effets visuels
    const templates = [
      {
        name: 'Cyber Neon - Futuriste',
        description: 'Design cyberpunk avec effets néon et grilles futuristes',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'transparent-glass',
            props: { 
              businessName: 'TechPro Solutions',
              ctaText: 'ACTIVATE'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'centered-split',
            props: {
              title: 'FUTURE IS NOW',
              subtitle: 'Technologies de demain, disponibles aujourd\'hui',
              primaryButtonText: '⚡ DÉMARRER',
              secondaryButtonText: 'EXPLORER'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'neon-glow',
            props: {
              title: 'PRÊT POUR LE FUTUR ?',
              subtitle: 'Rejoignez la révolution technologique',
              buttonText: 'ACTIVATE NOW'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'cyber-grid',
            props: {
              businessName: 'TechPro Solutions'
            }
          }
        ],
        theme: {
          name: 'Cyber Neon',
          colors: {
            primary: '#00ffff',
            secondary: '#ff00ff',
            accent: '#0088ff',
            background: '#0a0a0a',
            text: '#ffffff'
          }
        }
      },
      {
        name: 'Aurora Dreams - Onirique',
        description: 'Aurores boréales et effets morphing liquides',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'float-shadow',
            props: { 
              businessName: 'Dream Creators',
              ctaText: 'Commencer'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'gradient-overlay',
            props: {
              title: 'Créons ensemble l\'extraordinaire',
              subtitle: 'Où l\'imagination rencontre la réalité',
              primaryButtonText: 'Découvrir la magie',
              secondaryButtonText: 'Notre vision'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'liquid-morph',
            props: {
              title: 'Laissez-vous emporter',
              subtitle: 'Par un monde de possibilités infinies'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'aurora',
            props: {
              businessName: 'Dream Creators'
            }
          }
        ],
        theme: {
          name: 'Aurora Dreams',
          colors: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb',
            background: '#0f0c29',
            text: '#ffffff'
          }
        }
      },
      {
        name: 'Retro Wave - Synthwave',
        description: 'Style années 80 avec effets glitch et néons',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'neon-glow',
            props: { 
              businessName: 'RETROTECH',
              ctaText: 'PLAY'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'diagonal-split',
            props: {
              title: 'DISRUPT THE ORDINARY',
              subtitle: 'Welcome to the digital playground',
              primaryButtonText: 'BREAK BARRIERS',
              secondaryButtonText: 'EXPLORE'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'glitch-effect',
            props: {
              title: 'ERROR 404: BORING NOT FOUND',
              subtitle: 'Glitch into a new dimension'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'retro-synthwave',
            props: {
              businessName: 'RETROTECH'
            }
          }
        ],
        theme: {
          name: 'Retro Synthwave',
          colors: {
            primary: '#ff006e',
            secondary: '#8338ec',
            accent: '#3a86ff',
            background: '#0f0c29',
            text: '#ffffff'
          }
        }
      },
      {
        name: 'Particle Universe - Cosmique',
        description: 'Particules flottantes et explosions visuelles',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'modern-split',
            props: { 
              businessName: 'Cosmos Studio',
              ctaText: 'Explorer'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'fullscreen-video',
            props: {
              title: 'Libérez votre potentiel créatif',
              subtitle: 'Chaque idée est une étoile qui attend de briller',
              primaryButtonText: '✨ Exploser les limites'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'particle-explosion',
            props: {
              title: 'Créez votre univers',
              subtitle: 'Avec des possibilités infinies'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'particle-flow',
            props: {
              businessName: 'Cosmos Studio'
            }
          }
        ],
        theme: {
          name: 'Particle Universe',
          colors: {
            primary: '#ff006e',
            secondary: '#8338ec',
            accent: '#3a86ff',
            background: '#0f0c29',
            text: '#ffffff'
          }
        }
      },
      {
        name: 'Glass Luxury - Premium',
        description: 'Glassmorphism et effets 3D sophistiqués',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'transparent-glass',
            props: { 
              businessName: 'LuxeTech Premium',
              ctaText: 'Contact'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'centered-content',
            props: {
              title: 'Une nouvelle dimension pour vos projets',
              subtitle: 'Excellence et innovation en parfaite harmonie',
              primaryButtonText: 'Explorer en 3D',
              secondaryButtonText: 'Portfolio'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: '3d-flip',
            props: {
              title: 'Prêt pour une expérience unique ?',
              subtitle: 'Découvrez la profondeur de nos services'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'glassmorphism',
            props: {
              businessName: 'LuxeTech Premium'
            }
          }
        ],
        theme: {
          name: 'Glass Luxury',
          colors: {
            primary: '#1e3c72',
            secondary: '#2a5298',
            accent: '#4a90e2',
            background: 'rgba(255, 255, 255, 0.05)',
            text: '#ffffff'
          }
        }
      },
      {
        name: 'Ocean Flow - Aquatique',
        description: 'Vagues animées et fluidité aquatique',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'float-shadow',
            props: { 
              businessName: 'AquaFlow Design',
              ctaText: 'Plonger'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'gradient-overlay',
            props: {
              title: 'Surfez sur la vague du succès',
              subtitle: 'Fluide, moderne et toujours en mouvement',
              primaryButtonText: '🌊 Plonger maintenant'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'wave-animation',
            props: {
              title: 'Prêt à faire des vagues ?',
              subtitle: 'Rejoignez le mouvement'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'waves',
            props: {
              businessName: 'AquaFlow Design'
            }
          }
        ],
        theme: {
          name: 'Ocean Flow',
          colors: {
            primary: '#06beb6',
            secondary: '#48b1bf',
            accent: '#00a8cc',
            background: '#f0f9ff',
            text: '#1a202c'
          }
        }
      },
      {
        name: 'Countdown Rush - Urgence',
        description: 'Compte à rebours et cartes flottantes dynamiques',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'sticky-shrink',
            props: { 
              businessName: 'Flash Deals Pro',
              ctaText: '🔥 Offres'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'asymmetric-content',
            props: {
              title: 'Offre limitée : Ne manquez pas cette opportunité',
              subtitle: 'Les meilleures affaires disparaissent vite !',
              primaryButtonText: '🎯 Profiter de l\'offre'
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'countdown',
            props: {
              title: 'Plus que quelques heures !',
              subtitle: 'Saisissez cette offre exceptionnelle',
              countdownDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
            }
          },
          {
            type: 'cta-ultra-modern',
            variant: 'floating-cards',
            props: {
              title: 'Innovation • Performance • Excellence',
              subtitle: 'Découvrez toutes nos offres exclusives'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'floating',
            props: {
              businessName: 'Flash Deals Pro'
            }
          }
        ],
        theme: {
          name: 'Countdown Rush',
          colors: {
            primary: '#f2994a',
            secondary: '#f2c94c',
            accent: '#eb5757',
            background: '#fef9f3',
            text: '#2d3436'
          }
        }
      },
      {
        name: 'Morphing Art - Artistique',
        description: 'Formes morphing et métal liquide',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'modern-split',
            props: { 
              businessName: 'Artflow Studio',
              ctaText: 'Créer'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'content-overlay',
            props: {
              title: 'L\'art en perpétuelle transformation',
              subtitle: 'Chaque création est unique et vivante',
              primaryButtonText: '🎨 Commencer à créer'
            }
          },
          {
            type: 'services-v3-perfect',
            variant: 'bento-grid',
            props: {
              title: 'Services créatifs'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'morphing-shapes',
            props: {
              businessName: 'Artflow Studio'
            }
          }
        ],
        theme: {
          name: 'Morphing Art',
          colors: {
            primary: '#667eea',
            secondary: '#764ba2',
            accent: '#f093fb',
            background: '#fafafa',
            text: '#2d3748'
          }
        }
      },
      {
        name: 'Zen Minimal - Épuré',
        description: 'Minimalisme zen et métal liquide',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'minimal-center',
            props: { 
              businessName: 'ZenSpace',
              ctaText: 'Contact'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'minimal-centered',
            props: {
              title: 'La simplicité est la sophistication ultime',
              subtitle: 'Créons ensemble avec sérénité',
              primaryButtonText: 'Commencer'
            }
          },
          {
            type: 'features-v3-perfect',
            variant: 'minimal-grid',
            props: {
              title: 'Notre approche'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'minimalist-zen',
            props: {
              businessName: 'ZenSpace'
            }
          }
        ],
        theme: {
          name: 'Zen Minimal',
          colors: {
            primary: '#333333',
            secondary: '#666666',
            accent: '#999999',
            background: '#fafafa',
            text: '#333333'
          }
        }
      },
      {
        name: 'Liquid Metal - Industriel',
        description: 'Métal liquide et design industriel',
        blocks: [
          {
            type: 'header-v3-perfect',
            variant: 'industrial-bold',
            props: { 
              businessName: 'MetalWorks Pro',
              ctaText: 'Devis'
            }
          },
          {
            type: 'hero-v3-perfect',
            variant: 'split-content',
            props: {
              title: 'Force et précision industrielle',
              subtitle: 'Solutions métalliques sur mesure',
              primaryButtonText: '🔧 Obtenir un devis'
            }
          },
          {
            type: 'gallery-v3-perfect',
            variant: 'masonry-flow',
            props: {
              title: 'Nos réalisations'
            }
          },
          {
            type: 'footer-v3-perfect',
            variant: 'liquid-metal',
            props: {
              businessName: 'MetalWorks Pro'
            }
          }
        ],
        theme: {
          name: 'Liquid Metal',
          colors: {
            primary: '#414345',
            secondary: '#232526',
            accent: '#e0e0e0',
            background: '#f5f5f5',
            text: '#1a1a1a'
          }
        }
      }
    ];
    
    // Créer ou mettre à jour les templates
    for (const template of templates) {
      const existing = await prisma.template.findFirst({
        where: { name: template.name }
      });
      
      if (existing) {
        await prisma.template.update({
          where: { id: existing.id },
          data: {
            description: template.description,
            blocks: JSON.stringify(template.blocks),
            theme: JSON.stringify(template.theme),
            category: 'showcase',
            tags: JSON.stringify(['ultra-effects', 'modern', 'animated', 'premium'])
          }
        });
        console.log(`✅ Template mis à jour : ${template.name}`);
      } else {
        await prisma.template.create({
          data: {
            name: template.name,
            description: template.description,
            blocks: JSON.stringify(template.blocks),
            theme: JSON.stringify(template.theme),
            category: 'showcase',
            tags: JSON.stringify(['ultra-effects', 'modern', 'animated', 'premium']),
            isActive: true
          }
        });
        console.log(`✅ Template créé : ${template.name}`);
      }
    }
    
    console.log('\n\n🎉 Templates de démonstration créés avec succès !');
    console.log('\n📋 LIENS POUR VISUALISER :');
    console.log('🔗 Interface Admin : http://localhost:3000/admin/templates');
    console.log('🔗 Éditeur : http://localhost:3000/editor\n');
    
    console.log('✨ EFFETS DISPONIBLES :');
    console.log('   - CTA : neon-glow, liquid-morph, glitch-effect, particle-explosion, 3d-flip, wave-animation, countdown, floating-cards');
    console.log('   - Footer : cyber-grid, aurora, glassmorphism, particle-flow, morphing-shapes, retro-synthwave, liquid-metal, minimalist-zen\n');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

showcaseUltraEffects().catch(console.error);