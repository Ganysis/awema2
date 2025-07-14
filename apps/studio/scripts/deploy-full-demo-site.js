#!/usr/bin/env node

/**
 * Script pour déployer un site de démonstration avec TOUS les blocs Ultra-Modern
 * Parfait pour tester l'éditeur CMS intégré
 */

const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// Configuration du site de démo
const DEMO_CONFIG = {
  projectName: 'AWEMA Demo - Tous les Blocs',
  exportPath: path.join(__dirname, '..', 'demo-site-complete'),
  zipPath: path.join(__dirname, '..', 'demo-site-complete.zip'),
  exportOptions: {
    includeCms: true,
    cmsLevel: 'full',
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xyzcompany.supabase.co',
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.test',
    projectData: {
      settings: {
        siteName: 'AWEMA Demo - Test CMS',
        logo: { 
          text: 'AWEMA Demo',
          imageUrl: '/assets/logo.png'
        },
        favicon: '/favicon.ico'
      },
      theme: {
        primaryColor: '#3b82f6',
        secondaryColor: '#10b981',
        accentColor: '#f59e0b',
        darkColor: '#1f2937',
        lightColor: '#f9fafb',
        font: {
          heading: 'Inter',
          body: 'Inter'
        }
      },
      seo: {
        title: 'AWEMA Demo - Tous les Blocs Ultra-Modern',
        description: 'Site de démonstration avec tous les blocs Ultra-Modern pour tester l\'éditeur CMS',
        keywords: ['awema', 'cms', 'demo', 'ultra-modern', 'blocks'],
        ogImage: '/og-image.jpg'
      },
      analytics: {
        googleAnalyticsId: 'G-DEMO123456'
      },
      pages: [{
        id: 'home',
        title: 'Accueil - Demo Complète',
        slug: '/',
        meta: {
          title: 'AWEMA Demo - Testez tous les blocs Ultra-Modern',
          description: 'Page de démonstration avec l\'ensemble des blocs disponibles dans AWEMA Studio',
          keywords: ['demo', 'awema', 'blocks', 'cms']
        },
        blocks: [
          // HEADER
          {
            id: 'header-main',
            type: 'header-ultra-modern',
            props: {
              variant: 'floating-blur',
              logo: {
                text: 'AWEMA Demo',
                imageUrl: ''
              },
              navigation: [
                { label: 'Accueil', href: '#hero' },
                { label: 'Services', href: '#services' },
                { label: 'À propos', href: '#about' },
                { label: 'Portfolio', href: '#gallery' },
                { label: 'Tarifs', href: '#pricing' },
                { label: 'Contact', href: '#contact' }
              ],
              ctaButton: {
                text: 'Devis Gratuit',
                href: '#contact'
              },
              sticky: true,
              darkMode: true,
              searchEnabled: true,
              mobileMenuStyle: 'slide-over'
            }
          },
          
          // HERO ULTRA-MODERN
          {
            id: 'hero-main',
            type: 'hero-ultra-modern',
            props: {
              variant: 'gradient-wave',
              title: 'Bienvenue sur AWEMA Demo',
              subtitle: 'Découvrez tous les blocs Ultra-Modern en action',
              description: 'Cette page de démonstration présente l\'ensemble des blocs disponibles dans AWEMA Studio. Testez l\'éditeur CMS pour voir comment modifier chaque élément facilement.',
              buttonText: 'Explorer les blocs',
              buttonLink: '#features',
              secondaryButtonText: 'Voir la démo vidéo',
              secondaryButtonLink: '#video',
              backgroundImage: '',
              backgroundVideo: '',
              height: 'screen',
              alignment: 'center',
              overlay: true,
              overlayOpacity: 30,
              animation: 'float'
            }
          },
          
          // FEATURES ULTRA-MODERN
          {
            id: 'features-main',
            type: 'features-ultra-modern',
            props: {
              title: 'Fonctionnalités Ultra-Modernes',
              subtitle: 'Découvrez nos capacités exceptionnelles',
              description: 'Chaque fonctionnalité est conçue pour offrir une expérience utilisateur optimale',
              layout: 'grid',
              columns: 3,
              features: [
                {
                  icon: 'star',
                  title: 'Design Moderne',
                  description: 'Interface épurée et intuitive avec les dernières tendances',
                  image: '/assets/feature-1.jpg',
                  link: '#'
                },
                {
                  icon: 'zap',
                  title: 'Performance Ultra',
                  description: 'Chargement instantané et optimisation maximale',
                  image: '/assets/feature-2.jpg',
                  link: '#'
                },
                {
                  icon: 'shield',
                  title: 'Sécurité Renforcée',
                  description: 'Protection SSL et sauvegarde automatique quotidienne',
                  image: '/assets/feature-3.jpg',
                  link: '#'
                },
                {
                  icon: 'smartphone',
                  title: 'Mobile First',
                  description: 'Parfaitement adapté à tous les écrans',
                  image: '/assets/feature-4.jpg',
                  link: '#'
                },
                {
                  icon: 'globe',
                  title: 'SEO Optimisé',
                  description: 'Visible sur Google dès le premier jour',
                  image: '/assets/feature-5.jpg',
                  link: '#'
                },
                {
                  icon: 'users',
                  title: 'Support 24/7',
                  description: 'Équipe dédiée à votre succès',
                  image: '/assets/feature-6.jpg',
                  link: '#'
                }
              ],
              showImages: true,
              animated: true,
              filterEnabled: true
            }
          },
          
          // CONTENT ULTRA-MODERN (Timeline)
          {
            id: 'content-timeline',
            type: 'content-ultra-modern',
            props: {
              variant: 'timeline',
              title: 'Notre Histoire',
              subtitle: 'Une évolution constante vers l\'excellence',
              items: [
                {
                  year: '2020',
                  title: 'Création d\'AWEMA',
                  description: 'Lancement de notre plateforme révolutionnaire',
                  image: '/assets/timeline-1.jpg'
                },
                {
                  year: '2021',
                  title: 'Premier Succès',
                  description: '1000 sites créés en une année',
                  image: '/assets/timeline-2.jpg'
                },
                {
                  year: '2022',
                  title: 'Innovation Continue',
                  description: 'Lancement des blocs Ultra-Modern',
                  image: '/assets/timeline-3.jpg'
                },
                {
                  year: '2023',
                  title: 'Expansion Internationale',
                  description: 'Présence dans 15 pays',
                  image: '/assets/timeline-4.jpg'
                },
                {
                  year: '2024',
                  title: 'Leader du Marché',
                  description: 'Plus de 10 000 clients satisfaits',
                  image: '/assets/timeline-5.jpg'
                }
              ]
            }
          },
          
          // SERVICES/PRICING ULTRA-MODERN
          {
            id: 'pricing-main',
            type: 'pricing-ultra-modern',
            props: {
              variant: 'gradient-cards',
              title: 'Nos Tarifs Transparents',
              subtitle: 'Choisissez l\'offre qui vous correspond',
              description: 'Sans engagement, évolutif selon vos besoins',
              plans: [
                {
                  name: 'Starter',
                  price: '29',
                  period: 'mois',
                  description: 'Parfait pour débuter',
                  features: [
                    'Site vitrine 5 pages',
                    'Design responsive',
                    'SSL inclus',
                    'Support email',
                    'Mises à jour mensuelles'
                  ],
                  highlighted: false,
                  buttonText: 'Commencer',
                  buttonLink: '#contact'
                },
                {
                  name: 'Professional',
                  price: '59',
                  period: 'mois',
                  description: 'Le plus populaire',
                  features: [
                    'Site vitrine 10 pages',
                    'CMS intégré',
                    'Blog inclus',
                    'Support prioritaire',
                    'Analytics avancés',
                    'Sauvegarde quotidienne'
                  ],
                  highlighted: true,
                  badge: 'Recommandé',
                  buttonText: 'Choisir Pro',
                  buttonLink: '#contact'
                },
                {
                  name: 'Enterprise',
                  price: '99',
                  period: 'mois',
                  description: 'Pour les grandes ambitions',
                  features: [
                    'Pages illimitées',
                    'CMS complet',
                    'Multi-langue',
                    'Support 24/7',
                    'API personnalisée',
                    'Formation incluse',
                    'SLA garanti'
                  ],
                  highlighted: false,
                  buttonText: 'Contact Commercial',
                  buttonLink: '#contact'
                }
              ],
              showComparison: true,
              currency: '€'
            }
          },
          
          // TESTIMONIALS ULTRA-MODERN
          {
            id: 'testimonials-main',
            type: 'testimonials-ultra-modern',
            props: {
              title: 'Ils nous font confiance',
              subtitle: 'Découvrez les témoignages de nos clients',
              layout: 'carousel-3d',
              testimonials: [
                {
                  text: 'AWEMA a transformé notre présence en ligne. Le CMS est intuitif et les résultats dépassent nos attentes.',
                  name: 'Marie Dupont',
                  role: 'CEO, TechStart',
                  company: 'TechStart SAS',
                  image: '/assets/testimonial-1.jpg',
                  rating: 5,
                  verified: true
                },
                {
                  text: 'Un service exceptionnel ! L\'équipe est réactive et le site est magnifique. Je recommande vivement.',
                  name: 'Jean Martin',
                  role: 'Directeur Marketing',
                  company: 'InnovateCorp',
                  image: '/assets/testimonial-2.jpg',
                  rating: 5,
                  verified: true
                },
                {
                  text: 'Le meilleur investissement pour notre entreprise. ROI visible dès le premier mois.',
                  name: 'Sophie Bernard',
                  role: 'Fondatrice',
                  company: 'EcoGreen Solutions',
                  image: '/assets/testimonial-3.jpg',
                  rating: 5,
                  verified: true
                },
                {
                  text: 'Interface moderne, performances au top, et un support client irréprochable.',
                  name: 'Thomas Petit',
                  role: 'CTO',
                  company: 'DataViz Pro',
                  image: '/assets/testimonial-4.jpg',
                  rating: 5,
                  verified: true
                }
              ],
              showRating: true,
              showCompany: true,
              autoplay: true,
              autoplaySpeed: 5000
            }
          },
          
          // GALLERY ULTRA-MODERN
          {
            id: 'gallery-main',
            type: 'gallery-ultra-modern',
            props: {
              variant: 'masonry-flow',
              title: 'Notre Portfolio',
              subtitle: 'Découvrez nos dernières réalisations',
              description: 'Chaque projet est unique et sur mesure',
              images: [
                {
                  src: '/assets/gallery-1.jpg',
                  alt: 'Projet Site E-commerce',
                  title: 'E-commerce Moderne',
                  category: 'web',
                  tags: ['ecommerce', 'responsive', 'modern']
                },
                {
                  src: '/assets/gallery-2.jpg',
                  alt: 'Application Mobile',
                  title: 'App Mobile Cross-Platform',
                  category: 'mobile',
                  tags: ['mobile', 'app', 'ios', 'android']
                },
                {
                  src: '/assets/gallery-3.jpg',
                  alt: 'Dashboard Analytics',
                  title: 'Dashboard Temps Réel',
                  category: 'web',
                  tags: ['dashboard', 'analytics', 'data']
                },
                {
                  src: '/assets/gallery-4.jpg',
                  alt: 'Site Vitrine Restaurant',
                  title: 'Restaurant Gastronomique',
                  category: 'web',
                  tags: ['restaurant', 'vitrine', 'elegant']
                },
                {
                  src: '/assets/gallery-5.jpg',
                  alt: 'Plateforme SaaS',
                  title: 'Solution SaaS B2B',
                  category: 'web',
                  tags: ['saas', 'b2b', 'platform']
                },
                {
                  src: '/assets/gallery-6.jpg',
                  alt: 'Blog Professionnel',
                  title: 'Blog & Magazine',
                  category: 'web',
                  tags: ['blog', 'content', 'magazine']
                },
                {
                  src: '/assets/gallery-7.jpg',
                  alt: 'Portfolio Artiste',
                  title: 'Portfolio Créatif',
                  category: 'portfolio',
                  tags: ['portfolio', 'creative', 'artist']
                },
                {
                  src: '/assets/gallery-8.jpg',
                  alt: 'Marketplace',
                  title: 'Marketplace Multi-Vendeurs',
                  category: 'web',
                  tags: ['marketplace', 'ecommerce', 'platform']
                }
              ],
              columns: 4,
              gap: 'medium',
              lightbox: true,
              lightboxStyle: 'modern-dark',
              filterEnabled: true,
              categories: ['all', 'web', 'mobile', 'portfolio'],
              hoverEffect: 'zoom-rotate',
              lazy: true
            }
          },
          
          // FAQ ULTRA-MODERN
          {
            id: 'faq-main',
            type: 'faq-ultra-modern',
            props: {
              variant: 'gradient-cards',
              title: 'Questions Fréquentes',
              subtitle: 'Tout ce que vous devez savoir',
              description: 'Trouvez rapidement les réponses à vos questions',
              faqs: [
                {
                  question: 'Comment fonctionne le CMS intégré ?',
                  answer: 'Notre CMS est accessible via /admin sur votre site. Il permet de modifier tous les contenus, images et paramètres sans toucher au code. L\'interface est intuitive et ne nécessite aucune compétence technique.',
                  category: 'cms'
                },
                {
                  question: 'Puis-je modifier mon site après la livraison ?',
                  answer: 'Absolument ! C\'est l\'avantage principal de notre CMS. Vous pouvez modifier textes, images, ajouter des pages, gérer votre blog, et bien plus encore. Nous offrons également une formation gratuite.',
                  category: 'cms'
                },
                {
                  question: 'Quels sont les délais de création ?',
                  answer: 'Un site vitrine standard est livré en 5-7 jours ouvrés. Pour des projets plus complexes avec fonctionnalités sur mesure, comptez 2-4 semaines selon le cahier des charges.',
                  category: 'general'
                },
                {
                  question: 'Le site est-il optimisé pour le référencement ?',
                  answer: 'Oui, tous nos sites sont optimisés SEO dès la conception : structure HTML5 sémantique, vitesse de chargement, responsive design, meta tags, sitemap XML, schema.org, et plus encore.',
                  category: 'seo'
                },
                {
                  question: 'Quelle est votre politique de maintenance ?',
                  answer: 'Nous proposons des forfaits de maintenance mensuels incluant : mises à jour de sécurité, sauvegardes quotidiennes, monitoring 24/7, support technique, et évolutions mineures.',
                  category: 'support'
                },
                {
                  question: 'Puis-je avoir mon propre nom de domaine ?',
                  answer: 'Bien sûr ! Nous pouvons soit utiliser votre domaine existant, soit vous accompagner dans l\'achat d\'un nouveau. L\'hébergement est inclus dans nos forfaits.',
                  category: 'technical'
                },
                {
                  question: 'Comment se passe le paiement ?',
                  answer: 'Nous acceptons les virements, cartes bancaires et PayPal. Le paiement se fait en 3 fois : 30% à la commande, 40% à la validation de la maquette, et 30% à la livraison.',
                  category: 'payment'
                },
                {
                  question: 'Proposez-vous une garantie ?',
                  answer: 'Oui, nous offrons une garantie satisfait ou remboursé de 30 jours, ainsi qu\'une garantie technique de 6 mois sur tous les développements.',
                  category: 'general'
                }
              ],
              categories: [
                { id: 'all', label: 'Toutes' },
                { id: 'cms', label: 'CMS' },
                { id: 'general', label: 'Général' },
                { id: 'seo', label: 'SEO' },
                { id: 'support', label: 'Support' },
                { id: 'technical', label: 'Technique' },
                { id: 'payment', label: 'Paiement' }
              ],
              expandIcon: 'plus',
              searchEnabled: true,
              searchPlaceholder: 'Rechercher une question...'
            }
          },
          
          // CONTACT ULTRA-MODERN
          {
            id: 'contact-main',
            type: 'contact-ultra-modern',
            props: {
              variant: 'split-modern',
              title: 'Contactez-nous',
              subtitle: 'Discutons de votre projet',
              description: 'Notre équipe est à votre écoute pour transformer vos idées en réalité digitale.',
              formFields: [
                { name: 'name', label: 'Nom complet', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: false },
                { name: 'company', label: 'Entreprise', type: 'text', required: false },
                { name: 'subject', label: 'Sujet', type: 'select', required: true, options: [
                  'Demande de devis',
                  'Question technique',
                  'Support',
                  'Partenariat',
                  'Autre'
                ]},
                { name: 'message', label: 'Message', type: 'textarea', required: true, rows: 5 }
              ],
              submitText: 'Envoyer le message',
              phone: '+33 1 23 45 67 89',
              email: 'contact@awema-demo.fr',
              address: '123 Avenue des Champs, 75008 Paris',
              hours: {
                monday: '9h00 - 18h00',
                tuesday: '9h00 - 18h00',
                wednesday: '9h00 - 18h00',
                thursday: '9h00 - 18h00',
                friday: '9h00 - 17h00',
                saturday: 'Fermé',
                sunday: 'Fermé'
              },
              mapEnabled: true,
              mapPosition: 'right',
              mapAddress: '123 Avenue des Champs, 75008 Paris, France',
              socialLinks: [
                { platform: 'linkedin', url: 'https://linkedin.com/company/awema' },
                { platform: 'twitter', url: 'https://twitter.com/awema' },
                { platform: 'facebook', url: 'https://facebook.com/awema' }
              ]
            }
          },
          
          // CTA ULTRA-MODERN
          {
            id: 'cta-bottom',
            type: 'cta-ultra-modern',
            props: {
              variant: 'gradient-animated',
              title: 'Prêt à transformer votre présence en ligne ?',
              subtitle: 'Rejoignez des milliers d\'entreprises satisfaites',
              description: 'Commencez dès aujourd\'hui avec une consultation gratuite et sans engagement.',
              primaryButton: {
                text: 'Démarrer Maintenant',
                link: '#contact'
              },
              secondaryButton: {
                text: 'Voir les Tarifs',
                link: '#pricing'
              },
              backgroundImage: '',
              backgroundGradient: true,
              statistics: [
                { value: '10K+', label: 'Clients Satisfaits' },
                { value: '99%', label: 'Satisfaction' },
                { value: '24/7', label: 'Support' }
              ]
            }
          },
          
          // FOOTER ULTRA-MODERN
          {
            id: 'footer-main',
            type: 'footer-ultra-modern',
            props: {
              variant: 'gradient-wave',
              logo: {
                text: 'AWEMA Demo',
                imageUrl: ''
              },
              about: 'AWEMA est la plateforme de création de sites web nouvelle génération. Nous combinons design moderne, performance optimale et facilité d\'utilisation.',
              columns: [
                {
                  title: 'Services',
                  links: [
                    { label: 'Création de Sites', href: '#' },
                    { label: 'E-commerce', href: '#' },
                    { label: 'Applications Web', href: '#' },
                    { label: 'Maintenance', href: '#' }
                  ]
                },
                {
                  title: 'Entreprise',
                  links: [
                    { label: 'À Propos', href: '#' },
                    { label: 'Notre Équipe', href: '#' },
                    { label: 'Carrières', href: '#' },
                    { label: 'Contact', href: '#contact' }
                  ]
                },
                {
                  title: 'Ressources',
                  links: [
                    { label: 'Blog', href: '#' },
                    { label: 'Documentation', href: '#' },
                    { label: 'Support', href: '#' },
                    { label: 'FAQ', href: '#faq' }
                  ]
                },
                {
                  title: 'Légal',
                  links: [
                    { label: 'Mentions Légales', href: '#' },
                    { label: 'CGV', href: '#' },
                    { label: 'Politique de Confidentialité', href: '#' },
                    { label: 'Cookies', href: '#' }
                  ]
                }
              ],
              contact: {
                phone: '+33 1 23 45 67 89',
                email: 'contact@awema-demo.fr',
                address: '123 Avenue des Champs, 75008 Paris'
              },
              social: [
                { platform: 'facebook', url: 'https://facebook.com/awema' },
                { platform: 'twitter', url: 'https://twitter.com/awema' },
                { platform: 'linkedin', url: 'https://linkedin.com/company/awema' },
                { platform: 'instagram', url: 'https://instagram.com/awema' },
                { platform: 'youtube', url: 'https://youtube.com/awema' }
              ],
              newsletter: {
                enabled: true,
                title: 'Newsletter',
                description: 'Recevez nos dernières actualités et conseils',
                placeholder: 'Votre email',
                buttonText: 'S\'inscrire',
                gdprText: 'En vous inscrivant, vous acceptez notre politique de confidentialité'
              },
              copyright: '© 2024 AWEMA Demo. Tous droits réservés.',
              bottomLinks: [
                { label: 'Plan du Site', href: '#' },
                { label: 'Accessibilité', href: '#' },
                { label: 'Paramètres Cookies', href: '#' }
              ],
              badges: [
                { type: 'ssl', alt: 'Site Sécurisé SSL' },
                { type: 'gdpr', alt: 'Conforme RGPD' },
                { type: 'france', alt: 'Made in France' }
              ]
            }
          }
        ]
      }]
    }
  }
};

async function deployDemoSite() {
  console.log('🚀 Déploiement du site de démonstration AWEMA\n');
  
  try {
    // 1. Nettoyer le dossier précédent
    console.log('1️⃣ Nettoyage du dossier de démonstration...');
    if (fs.existsSync(DEMO_CONFIG.exportPath)) {
      fs.rmSync(DEMO_CONFIG.exportPath, { recursive: true, force: true });
    }
    fs.mkdirSync(DEMO_CONFIG.exportPath, { recursive: true });
    
    // 2. Importer les services
    console.log('2️⃣ Import des services d\'export...');
    const { StaticExportService } = require('../lib/services/static-export-simplified');
    
    // 3. Créer l'instance d'export
    const exportService = new StaticExportService();
    
    // 4. Exporter le site
    console.log('3️⃣ Export du site avec tous les blocs Ultra-Modern...');
    const files = await exportService.exportToStatic(
      DEMO_CONFIG.exportOptions.projectData,
      DEMO_CONFIG.exportOptions
    );
    
    console.log(`   ✅ ${files.length} fichiers générés`);
    
    // 5. Écrire les fichiers
    console.log('4️⃣ Écriture des fichiers sur le disque...');
    let htmlFiles = 0;
    let cssFiles = 0;
    let jsFiles = 0;
    let adminFiles = 0;
    
    for (const file of files) {
      const filePath = path.join(DEMO_CONFIG.exportPath, file.path);
      const dir = path.dirname(filePath);
      
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      
      fs.writeFileSync(filePath, file.content);
      
      // Compter les types de fichiers
      if (file.path.endsWith('.html')) htmlFiles++;
      else if (file.path.endsWith('.css')) cssFiles++;
      else if (file.path.endsWith('.js')) jsFiles++;
      if (file.path.startsWith('admin/')) adminFiles++;
    }
    
    console.log(`   📄 ${htmlFiles} fichiers HTML`);
    console.log(`   🎨 ${cssFiles} fichiers CSS`);
    console.log(`   ⚡ ${jsFiles} fichiers JavaScript`);
    console.log(`   🔧 ${adminFiles} fichiers admin (CMS)`);
    
    // 6. Vérifier les fichiers CMS critiques
    console.log('\n5️⃣ Vérification du CMS intégré...');
    const requiredFiles = [
      'admin/index.html',
      'admin/cms.js',
      'admin/cms.css',
      'admin/config.js',
      'admin/page-editor.js',
      'netlify.toml',
      'index.html'
    ];
    
    let allPresent = true;
    for (const file of requiredFiles) {
      const exists = fs.existsSync(path.join(DEMO_CONFIG.exportPath, file));
      console.log(`   ${exists ? '✅' : '❌'} ${file}`);
      if (!exists) allPresent = false;
    }
    
    if (!allPresent) {
      throw new Error('Des fichiers essentiels sont manquants !');
    }
    
    // 7. Créer le ZIP
    console.log('\n6️⃣ Création du fichier ZIP pour le déploiement...');
    
    // Supprimer l'ancien ZIP s'il existe
    if (fs.existsSync(DEMO_CONFIG.zipPath)) {
      fs.unlinkSync(DEMO_CONFIG.zipPath);
    }
    
    await new Promise((resolve, reject) => {
      const output = fs.createWriteStream(DEMO_CONFIG.zipPath);
      const archive = archiver('zip', { zlib: { level: 9 } });
      
      output.on('close', () => {
        console.log(`   ✅ ZIP créé: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
        resolve();
      });
      
      archive.on('error', reject);
      
      archive.pipe(output);
      archive.directory(DEMO_CONFIG.exportPath, false);
      archive.finalize();
    });
    
    // 8. Résumé et instructions
    console.log('\n' + '='.repeat(60));
    console.log('✨ SITE DE DÉMONSTRATION PRÊT !\n');
    console.log('📦 Fichiers générés :');
    console.log(`   - Dossier : ${DEMO_CONFIG.exportPath}`);
    console.log(`   - ZIP : ${DEMO_CONFIG.zipPath}`);
    
    console.log('\n🚀 Pour déployer sur Netlify :');
    console.log('   1. Allez sur https://app.netlify.com');
    console.log('   2. Glissez le fichier ZIP sur la page');
    console.log('   3. Attendez le déploiement (30 secondes)');
    console.log('   4. Votre site sera en ligne !');
    
    console.log('\n🧪 Pour tester localement :');
    console.log(`   cd ${DEMO_CONFIG.exportPath}`);
    console.log('   npx serve -s . -p 3002');
    console.log('   Puis ouvrez http://localhost:3002');
    
    console.log('\n🔑 Accès au CMS :');
    console.log('   URL : https://votre-site.netlify.app/admin');
    console.log('   Email : admin@admin.fr');
    console.log('   Mot de passe : admin');
    
    console.log('\n📝 Fonctionnalités à tester :');
    console.log('   ✓ Navigation entre les blocs');
    console.log('   ✓ Sélection d\'un bloc pour l\'éditer');
    console.log('   ✓ Modification des propriétés');
    console.log('   ✓ Aperçu en temps réel');
    console.log('   ✓ Sauvegarde automatique');
    console.log('   ✓ Responsive sur mobile/tablet');
    
    console.log('\n⚠️  Configuration Supabase (si vous voulez la persistence) :');
    console.log('   1. Créez un projet Supabase');
    console.log('   2. Ajoutez votre domaine dans Settings > API > CORS');
    console.log('   3. Remplacez les clés dans le fichier admin/config.js');
    console.log('   4. Les tables cms_* doivent exister (voir nos scripts SQL)');
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 Tout est prêt ! Bon test du CMS AWEMA !');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du déploiement :', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Lancer le déploiement
deployDemoSite();