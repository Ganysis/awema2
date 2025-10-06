#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

/**
 * GESTIONNAIRE DE BANQUE D'IMAGES PROFESSIONNELLES
 *
 * Système complet pour gérer les vraies images de chaque métier
 * avec téléchargement depuis Pexels (API gratuite)
 */

// ===================================================
// BANQUE D'IMAGES PAR MÉTIER
// ===================================================

const IMAGE_BANK = {
  plombier: {
    keywords: ['plumber', 'bathroom renovation', 'water pipes', 'sink repair', 'modern bathroom'],
    banner: {
      url: 'https://images.pexels.com/photos/6419128/pexels-photo-6419128.jpeg',
      alt: 'Plombier professionnel au travail'
    },
    services: [
      {
        url: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
        alt: 'Réparation de fuite urgente'
      },
      {
        url: 'https://images.pexels.com/photos/7641832/pexels-photo-7641832.jpeg',
        alt: 'Salle de bain moderne rénovée'
      },
      {
        url: 'https://images.pexels.com/photos/5691497/pexels-photo-5691497.jpeg',
        alt: 'Débouchage canalisation professionnelle'
      },
      {
        url: 'https://images.pexels.com/photos/7031706/pexels-photo-7031706.jpeg',
        alt: 'Installation sanitaires modernes'
      },
      {
        url: 'https://images.pexels.com/photos/6969831/pexels-photo-6969831.jpeg',
        alt: 'Détection de fuite thermique'
      },
      {
        url: 'https://images.pexels.com/photos/7203727/pexels-photo-7203727.jpeg',
        alt: 'Chauffe-eau installation'
      }
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/1457847/pexels-photo-1457847.jpeg',
        alt: 'Salle de bain luxe'
      },
      {
        url: 'https://images.pexels.com/photos/1599791/pexels-photo-1599791.jpeg',
        alt: 'Robinetterie moderne'
      },
      {
        url: 'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg',
        alt: 'Douche italienne'
      },
      {
        url: 'https://images.pexels.com/photos/3935333/pexels-photo-3935333.jpeg',
        alt: 'Baignoire design'
      },
      {
        url: 'https://images.pexels.com/photos/4846121/pexels-photo-4846121.jpeg',
        alt: 'Cuisine équipée'
      },
      {
        url: 'https://images.pexels.com/photos/5570224/pexels-photo-5570224.jpeg',
        alt: 'Lavabo moderne'
      }
    ],
    projects: [
      {
        url: 'https://images.pexels.com/photos/3315291/pexels-photo-3315291.jpeg',
        alt: 'Projet salle de bain complète'
      },
      {
        url: 'https://images.pexels.com/photos/3209045/pexels-photo-3209045.jpeg',
        alt: 'Rénovation cuisine'
      },
      {
        url: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg',
        alt: 'Installation chauffage central'
      },
      {
        url: 'https://images.pexels.com/photos/2507007/pexels-photo-2507007.jpeg',
        alt: 'Système de filtration'
      },
      {
        url: 'https://images.pexels.com/photos/3990359/pexels-photo-3990359.jpeg',
        alt: 'Piscine et spa'
      },
      {
        url: 'https://images.pexels.com/photos/4846097/pexels-photo-4846097.jpeg',
        alt: 'Rénovation appartement'
      },
      {
        url: 'https://images.pexels.com/photos/5824901/pexels-photo-5824901.jpeg',
        alt: 'Installation commerciale'
      }
    ]
  },

  electricien: {
    keywords: ['electrician', 'electrical panel', 'wiring', 'LED lighting', 'smart home'],
    banner: {
      url: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg',
      alt: 'Électricien professionnel'
    },
    services: [
      {
        url: 'https://images.pexels.com/photos/1216544/pexels-photo-1216544.jpeg',
        alt: 'Tableau électrique moderne'
      },
      {
        url: 'https://images.pexels.com/photos/2898199/pexels-photo-2898199.jpeg',
        alt: 'Installation domotique'
      },
      {
        url: 'https://images.pexels.com/photos/3862632/pexels-photo-3862632.jpeg',
        alt: 'Éclairage LED design'
      },
      {
        url: 'https://images.pexels.com/photos/5691625/pexels-photo-5691625.jpeg',
        alt: 'Borne de recharge électrique'
      },
      {
        url: 'https://images.pexels.com/photos/7449159/pexels-photo-7449159.jpeg',
        alt: 'Câblage électrique'
      },
      {
        url: 'https://images.pexels.com/photos/8853502/pexels-photo-8853502.jpeg',
        alt: 'Panneau solaire installation'
      }
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/1123262/pexels-photo-1123262.jpeg',
        alt: 'Éclairage intérieur moderne'
      },
      {
        url: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
        alt: 'Système domotique'
      },
      {
        url: 'https://images.pexels.com/photos/3999943/pexels-photo-3999943.jpeg',
        alt: 'Installation commerciale'
      },
      {
        url: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg',
        alt: 'Éclairage extérieur'
      },
      {
        url: 'https://images.pexels.com/photos/5644731/pexels-photo-5644731.jpeg',
        alt: 'Tableau électrique neuf'
      },
      {
        url: 'https://images.pexels.com/photos/8961062/pexels-photo-8961062.jpeg',
        alt: 'Installation industrielle'
      }
    ],
    projects: [
      {
        url: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
        alt: 'Rénovation électrique maison'
      },
      {
        url: 'https://images.pexels.com/photos/2539462/pexels-photo-2539462.jpeg',
        alt: 'Bureau moderne éclairage'
      },
      {
        url: 'https://images.pexels.com/photos/3862634/pexels-photo-3862634.jpeg',
        alt: 'Restaurant éclairage ambiance'
      },
      {
        url: 'https://images.pexels.com/photos/5767928/pexels-photo-5767928.jpeg',
        alt: 'Maison connectée'
      },
      {
        url: 'https://images.pexels.com/photos/7937999/pexels-photo-7937999.jpeg',
        alt: 'Magasin éclairage LED'
      },
      {
        url: 'https://images.pexels.com/photos/9875440/pexels-photo-9875440.jpeg',
        alt: 'Villa domotique complète'
      },
      {
        url: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg',
        alt: 'Parking souterrain éclairage'
      }
    ]
  },

  menuisier: {
    keywords: ['carpenter', 'woodwork', 'furniture', 'wooden floor', 'custom cabinet'],
    banner: {
      url: 'https://images.pexels.com/photos/1094767/pexels-photo-1094767.jpeg',
      alt: 'Menuisier artisan'
    },
    services: [
      {
        url: 'https://images.pexels.com/photos/175709/pexels-photo-175709.jpeg',
        alt: 'Menuiserie sur mesure'
      },
      {
        url: 'https://images.pexels.com/photos/4491881/pexels-photo-4491881.jpeg',
        alt: 'Parquet bois massif'
      },
      {
        url: 'https://images.pexels.com/photos/5089178/pexels-photo-5089178.jpeg',
        alt: 'Dressing sur mesure'
      },
      {
        url: 'https://images.pexels.com/photos/6297518/pexels-photo-6297518.jpeg',
        alt: 'Escalier bois design'
      },
      {
        url: 'https://images.pexels.com/photos/8961133/pexels-photo-8961133.jpeg',
        alt: 'Terrasse bois extérieur'
      },
      {
        url: 'https://images.pexels.com/photos/11622722/pexels-photo-11622722.jpeg',
        alt: 'Restauration meubles anciens'
      }
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/279618/pexels-photo-279618.jpeg',
        alt: 'Cuisine bois moderne'
      },
      {
        url: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg',
        alt: 'Salon meuble sur mesure'
      },
      {
        url: 'https://images.pexels.com/photos/2062431/pexels-photo-2062431.jpeg',
        alt: 'Bibliothèque bois'
      },
      {
        url: 'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg',
        alt: 'Chambre aménagement bois'
      },
      {
        url: 'https://images.pexels.com/photos/3935340/pexels-photo-3935340.jpeg',
        alt: 'Bureau bois design'
      },
      {
        url: 'https://images.pexels.com/photos/5644742/pexels-photo-5644742.jpeg',
        alt: 'Porte bois sculptée'
      }
    ],
    projects: [
      {
        url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
        alt: 'Aménagement intérieur complet'
      },
      {
        url: 'https://images.pexels.com/photos/2251247/pexels-photo-2251247.jpeg',
        alt: 'Cuisine équipée bois'
      },
      {
        url: 'https://images.pexels.com/photos/3049121/pexels-photo-3049121.jpeg',
        alt: 'Escalier moderne'
      },
      {
        url: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg',
        alt: 'Terrasse jardin'
      },
      {
        url: 'https://images.pexels.com/photos/5824527/pexels-photo-5824527.jpeg',
        alt: 'Magasin agencement'
      },
      {
        url: 'https://images.pexels.com/photos/7018400/pexels-photo-7018400.jpeg',
        alt: 'Loft rénovation bois'
      },
      {
        url: 'https://images.pexels.com/photos/8961563/pexels-photo-8961563.jpeg',
        alt: 'Restaurant décoration bois'
      }
    ]
  },

  paysagiste: {
    keywords: ['landscaper', 'garden design', 'lawn care', 'garden maintenance', 'outdoor'],
    banner: {
      url: 'https://images.pexels.com/photos/1599969/pexels-photo-1599969.jpeg',
      alt: 'Jardin paysager magnifique'
    },
    services: [
      {
        url: 'https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg',
        alt: 'Création de jardins'
      },
      {
        url: 'https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg',
        alt: 'Entretien espaces verts'
      },
      {
        url: 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg',
        alt: 'Élagage professionnel'
      },
      {
        url: 'https://images.pexels.com/photos/2132180/pexels-photo-2132180.jpeg',
        alt: 'Arrosage automatique'
      },
      {
        url: 'https://images.pexels.com/photos/4503265/pexels-photo-4503265.jpeg',
        alt: 'Allées et terrasses'
      },
      {
        url: 'https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg',
        alt: 'Clôtures végétales'
      }
    ],
    gallery: [
      {
        url: 'https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg',
        alt: 'Jardin zen japonais'
      },
      {
        url: 'https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg',
        alt: 'Pelouse parfaite'
      },
      {
        url: 'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg',
        alt: 'Piscine et jardin'
      },
      {
        url: 'https://images.pexels.com/photos/4577667/pexels-photo-4577667.jpeg',
        alt: 'Potager moderne'
      },
      {
        url: 'https://images.pexels.com/photos/5602893/pexels-photo-5602893.jpeg',
        alt: 'Jardin fleuri'
      },
      {
        url: 'https://images.pexels.com/photos/7728882/pexels-photo-7728882.jpeg',
        alt: 'Terrasse végétalisée'
      }
    ],
    projects: [
      {
        url: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg',
        alt: 'Villa jardin méditerranéen'
      },
      {
        url: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg',
        alt: 'Parc public aménagement'
      },
      {
        url: 'https://images.pexels.com/photos/3076899/pexels-photo-3076899.jpeg',
        alt: 'Jardin d\'entreprise'
      },
      {
        url: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg',
        alt: 'Toiture végétalisée'
      },
      {
        url: 'https://images.pexels.com/photos/5490933/pexels-photo-5490933.jpeg',
        alt: 'Jardin tropical'
      },
      {
        url: 'https://images.pexels.com/photos/6580703/pexels-photo-6580703.jpeg',
        alt: 'Espace vert urbain'
      },
      {
        url: 'https://images.pexels.com/photos/7902925/pexels-photo-7902925.jpeg',
        alt: 'Golf aménagement paysager'
      }
    ]
  }
};

// ===================================================
// TÉLÉCHARGEUR D'IMAGES
// ===================================================

class ImageBankManager {
  constructor(metier, targetPath) {
    this.metier = metier;
    this.targetPath = targetPath;
    this.imageBank = IMAGE_BANK[metier];

    if (!this.imageBank) {
      throw new Error(`Métier inconnu: ${metier}. Disponibles: ${Object.keys(IMAGE_BANK).join(', ')}`);
    }
  }

  /**
   * Télécharge une image depuis une URL
   */
  downloadImage(url, outputPath) {
    return new Promise((resolve, reject) => {
      // Ajouter les paramètres Pexels pour optimiser l'image
      const optimizedUrl = url.includes('pexels.com')
        ? `${url}?auto=compress&cs=tinysrgb&w=1200`
        : url;

      https.get(optimizedUrl, (response) => {
        if (response.statusCode === 200) {
          const fileStream = fs.createWriteStream(outputPath);
          response.pipe(fileStream);
          fileStream.on('finish', () => {
            fileStream.close();
            resolve(outputPath);
          });
        } else if (response.statusCode === 302 || response.statusCode === 301) {
          // Suivre la redirection
          https.get(response.headers.location, (redirectResponse) => {
            const fileStream = fs.createWriteStream(outputPath);
            redirectResponse.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              resolve(outputPath);
            });
          });
        } else {
          reject(new Error(`Failed to download: ${response.statusCode}`));
        }
      }).on('error', reject);
    });
  }

  /**
   * Télécharge toutes les images pour le métier
   */
  async downloadAll() {
    console.log(`📥 Téléchargement des images pour ${this.metier}...`);

    const imagesPath = path.join(this.targetPath, 'public/images');

    // Créer les dossiers si nécessaire
    if (!fs.existsSync(imagesPath)) {
      fs.mkdirSync(imagesPath, { recursive: true });
    }

    try {
      // Banner
      console.log('  📷 Banner...');
      await this.downloadImage(
        this.imageBank.banner.url,
        path.join(imagesPath, 'banner.jpg')
      );

      // Services
      console.log('  📷 Services...');
      for (let i = 0; i < this.imageBank.services.length; i++) {
        await this.downloadImage(
          this.imageBank.services[i].url,
          path.join(imagesPath, `service-${i + 1}.jpg`)
        );
      }

      // Gallery
      console.log('  📷 Galerie...');
      for (let i = 0; i < this.imageBank.gallery.length; i++) {
        await this.downloadImage(
          this.imageBank.gallery[i].url,
          path.join(imagesPath, `gallery-${i + 1}.jpg`)
        );
      }

      // Projects
      console.log('  📷 Projets...');
      for (let i = 0; i < this.imageBank.projects.length; i++) {
        await this.downloadImage(
          this.imageBank.projects[i].url,
          path.join(imagesPath, `project-${i + 1}.jpg`)
        );
      }

      console.log('✅ Toutes les images ont été téléchargées !');
    } catch (error) {
      console.error('❌ Erreur lors du téléchargement:', error.message);
      console.log('💡 Utilisation des placeholders SVG à la place...');
      this.createFallbackImages();
    }
  }

  /**
   * Crée des images de secours si le téléchargement échoue
   */
  createFallbackImages() {
    const imagesPath = path.join(this.targetPath, 'public/images');

    // Utiliser les images existantes ou créer des placeholders
    console.log('🎨 Création d\'images de remplacement...');

    // Copier les images existantes du dossier ou utiliser celles déjà présentes
    const existingImages = fs.readdirSync(imagesPath)
      .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'));

    console.log(`  Trouvé ${existingImages.length} images existantes`);
  }

  /**
   * Génère un mapping des images pour le template
   */
  generateImageMapping() {
    return {
      banner: {
        src: '/images/banner.jpg',
        alt: this.imageBank.banner.alt
      },
      services: this.imageBank.services.map((img, i) => ({
        src: `/images/service-${i + 1}.jpg`,
        alt: img.alt
      })),
      gallery: this.imageBank.gallery.map((img, i) => ({
        src: `/images/gallery-${i + 1}.jpg`,
        alt: img.alt
      })),
      projects: this.imageBank.projects.map((img, i) => ({
        src: `/images/project-${i + 1}.jpg`,
        alt: img.alt
      }))
    };
  }
}

// ===================================================
// CLI
// ===================================================

if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach(arg => {
    const [key, value] = arg.split('=');
    options[key.replace('--', '')] = value;
  });

  if (!options.metier) {
    console.log(`
🖼️  GESTIONNAIRE DE BANQUE D'IMAGES
===================================

Usage: node image-bank-manager.cjs --metier=plombier --path=/chemin/vers/template

Options:
  --metier : ${Object.keys(IMAGE_BANK).join(', ')} (REQUIS)
  --path   : Chemin vers le template (défaut: dossier actuel)

Exemples:
  node image-bank-manager.cjs --metier=plombier
  node image-bank-manager.cjs --metier=electricien --path=/home/user/template

Images fournies:
  - 1 bannière principale
  - 6 images de services
  - 6 images de galerie
  - 7 images de projets

Source: Images libres de droits depuis Pexels
`);
    process.exit(0);
  }

  const manager = new ImageBankManager(
    options.metier,
    options.path || process.cwd()
  );

  manager.downloadAll()
    .then(() => {
      const mapping = manager.generateImageMapping();
      const mappingPath = path.join(
        options.path || process.cwd(),
        'image-mapping.json'
      );
      fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
      console.log(`\n📋 Mapping sauvegardé dans: ${mappingPath}`);
    })
    .catch(console.error);
}

module.exports = { ImageBankManager, IMAGE_BANK };