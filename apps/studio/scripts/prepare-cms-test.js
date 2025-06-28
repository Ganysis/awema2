const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Créer le dossier de test
const testDir = path.join(__dirname, 'test-cms-export');
if (!fs.existsSync(testDir)) {
  fs.mkdirSync(testDir, { recursive: true });
}

// Créer le dossier admin
const adminDir = path.join(testDir, 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

// Copier le fichier HTML du CMS
const cmsHtmlSource = path.join(__dirname, '..', 'lib', 'cms-export', 'cms-admin.html');
const cmsHtmlDest = path.join(adminDir, 'index.html');

if (fs.existsSync(cmsHtmlSource)) {
  let cmsHtml = fs.readFileSync(cmsHtmlSource, 'utf8');
  
  // Modifier les URLs pour le test local
  cmsHtml = cmsHtml.replace('/api/cms/', 'http://localhost:3002/api/cms/');
  
  // Injecter des données de test complètes
  const testData = {
    pages: [
      {
        id: 'home',
        name: 'Accueil',
        slug: '/',
        meta: {
          title: 'Plomberie Dupont - Expert plombier à Paris',
          description: 'Plomberie Dupont, votre expert en plomberie depuis 1990. Dépannage, installation, rénovation.'
        },
        blocks: [
          {
            id: 'hero-1',
            type: 'hero-centered',
            isVisible: true,
            props: {
              title: 'Expert Plombier à Paris depuis 1990',
              subtitle: 'Dépannage rapide, installation et rénovation. Intervention 24/7 sur Paris et région parisienne.',
              buttonText: 'Demander un devis gratuit',
              buttonLink: '/contact',
              backgroundImage: '/images/hero-plumber.jpg'
            }
          },
          {
            id: 'services-1',
            type: 'services-grid-cards',
            isVisible: true,
            props: {
              title: 'Nos Services de Plomberie',
              subtitle: 'Une expertise complète pour tous vos besoins',
              services: [
                { 
                  title: 'Dépannage Urgent',
                  description: 'Intervention rapide 24/7 pour fuites, débouchage et urgences.',
                  icon: '🚨',
                  link: '/services/depannage'
                },
                { 
                  title: 'Installation Sanitaire',
                  description: 'Installation de salles de bain, WC, chauffe-eau et robinetterie.',
                  icon: '🔧',
                  link: '/services/installation'
                },
                {
                  title: 'Rénovation',
                  description: 'Rénovation complète de salle de bain et mise aux normes.',
                  icon: '🏗️',
                  link: '/services/renovation'
                },
                {
                  title: 'Entretien',
                  description: 'Contrats d\'entretien pour chaudières et installations.',
                  icon: '🔍',
                  link: '/services/entretien'
                }
              ]
            }
          },
          {
            id: 'features-1',
            type: 'features-clean',
            isVisible: true,
            props: {
              title: 'Pourquoi nous choisir ?',
              features: [
                {
                  title: '30 ans d\'expérience',
                  description: 'Une expertise reconnue depuis 1990',
                  icon: '⭐'
                },
                {
                  title: 'Devis gratuit',
                  description: 'Estimation transparente sans engagement',
                  icon: '📋'
                },
                {
                  title: 'Garantie 2 ans',
                  description: 'Toutes nos interventions sont garanties',
                  icon: '✅'
                },
                {
                  title: 'Disponible 24/7',
                  description: 'Urgences plomberie jour et nuit',
                  icon: '🕐'
                }
              ]
            }
          },
          {
            id: 'testimonials-1',
            type: 'testimonials-carousel',
            isVisible: true,
            props: {
              title: 'Ils nous font confiance',
              testimonials: [
                {
                  name: 'Marie Dubois',
                  role: 'Cliente depuis 2018',
                  content: 'Service impeccable ! Intervention rapide pour une fuite d\'eau. Je recommande vivement.',
                  rating: 5
                },
                {
                  name: 'Jean Martin',
                  role: 'Client professionnel',
                  content: 'Nous faisons appel à leurs services pour l\'entretien de nos bureaux. Toujours ponctuel et efficace.',
                  rating: 5
                },
                {
                  name: 'Sophie Laurent',
                  role: 'Propriétaire',
                  content: 'Rénovation complète de ma salle de bain. Travail soigné et dans les délais.',
                  rating: 5
                }
              ]
            }
          },
          {
            id: 'cta-1',
            type: 'cta-clean',
            isVisible: true,
            props: {
              title: 'Besoin d\'un plombier ?',
              subtitle: 'Contactez-nous pour un devis gratuit',
              buttonText: 'Appeler maintenant',
              buttonLink: 'tel:0123456789',
              secondaryButtonText: 'Demander un devis',
              secondaryButtonLink: '/contact'
            }
          }
        ]
      },
      {
        id: 'services',
        name: 'Services',
        slug: '/services',
        meta: {
          title: 'Nos Services de Plomberie - Plomberie Dupont',
          description: 'Découvrez tous nos services : dépannage, installation, rénovation et entretien.'
        },
        blocks: [
          {
            id: 'services-hero',
            type: 'hero-centered',
            isVisible: true,
            props: {
              title: 'Nos Services',
              subtitle: 'Une gamme complète de prestations pour tous vos besoins en plomberie'
            }
          },
          {
            id: 'services-list',
            type: 'services-list-detailed',
            isVisible: true,
            props: {
              title: 'Services détaillés',
              services: [
                {
                  title: 'Dépannage Urgent 24/7',
                  description: 'Fuite d\'eau, canalisation bouchée, panne de chauffe-eau... Nous intervenons rapidement pour toutes vos urgences plomberie.',
                  features: ['Intervention sous 1h', 'Disponible 24/7', 'Devis gratuit'],
                  price: 'À partir de 80€',
                  image: '/images/emergency.jpg'
                },
                {
                  title: 'Installation Sanitaire',
                  description: 'Installation complète de salle de bain, pose de WC, installation de chauffe-eau et robinetterie.',
                  features: ['Matériel de qualité', 'Installation aux normes', 'Garantie 2 ans'],
                  price: 'Sur devis',
                  image: '/images/installation.jpg'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'contact',
        name: 'Contact',
        slug: '/contact',
        meta: {
          title: 'Contactez-nous - Plomberie Dupont',
          description: 'Contactez Plomberie Dupont pour un devis gratuit ou une urgence.'
        },
        blocks: [
          {
            id: 'contact-1',
            type: 'contact-form-map',
            isVisible: true,
            props: {
              title: 'Contactez-nous',
              subtitle: 'Nous sommes à votre écoute pour tous vos projets',
              description: 'Remplissez le formulaire ci-dessous ou appelez-nous directement.',
              showMap: true,
              mapAddress: '123 Rue de la Paix, 75001 Paris',
              formFields: [
                { name: 'name', label: 'Nom', type: 'text', required: true },
                { name: 'email', label: 'Email', type: 'email', required: true },
                { name: 'phone', label: 'Téléphone', type: 'tel', required: true },
                { name: 'message', label: 'Message', type: 'textarea', required: true }
              ]
            }
          },
          {
            id: 'faq-1',
            type: 'faq-accordion',
            isVisible: true,
            props: {
              title: 'Questions fréquentes',
              questions: [
                {
                  question: 'Intervenez-vous le week-end ?',
                  answer: 'Oui, nous sommes disponibles 24/7 y compris les week-ends et jours fériés pour les urgences.'
                },
                {
                  question: 'Quels sont vos tarifs ?',
                  answer: 'Nos tarifs dépendent de l\'intervention. Nous proposons toujours un devis gratuit avant toute intervention.'
                },
                {
                  question: 'Dans quelles zones intervenez-vous ?',
                  answer: 'Nous intervenons sur tout Paris et la région parisienne dans un rayon de 30km.'
                }
              ]
            }
          }
        ]
      },
      {
        id: 'tarifs',
        name: 'Tarifs',
        slug: '/tarifs',
        meta: {
          title: 'Nos Tarifs - Plomberie Dupont',
          description: 'Découvrez nos tarifs transparents pour toutes nos prestations de plomberie.'
        },
        blocks: [
          {
            id: 'pricing-1',
            type: 'pricing-clean',
            isVisible: true,
            props: {
              title: 'Nos Tarifs',
              subtitle: 'Des prix transparents et sans surprise',
              plans: [
                {
                  name: 'Dépannage',
                  price: '80€',
                  period: 'intervention',
                  features: [
                    'Diagnostic gratuit',
                    'Intervention sous 1h',
                    'Petites réparations incluses',
                    'Garantie 6 mois'
                  ],
                  buttonText: 'Appeler',
                  buttonLink: 'tel:0123456789',
                  featured: false
                },
                {
                  name: 'Installation',
                  price: 'Sur devis',
                  period: '',
                  features: [
                    'Étude personnalisée',
                    'Matériel de qualité',
                    'Installation aux normes',
                    'Garantie 2 ans',
                    'SAV inclus'
                  ],
                  buttonText: 'Demander un devis',
                  buttonLink: '/contact',
                  featured: true
                },
                {
                  name: 'Contrat entretien',
                  price: '150€',
                  period: 'an',
                  features: [
                    '2 visites par an',
                    'Contrôle complet',
                    'Pièces incluses',
                    'Priorité intervention'
                  ],
                  buttonText: 'Souscrire',
                  buttonLink: '/contact',
                  featured: false
                }
              ]
            }
          }
        ]
      }
    ],
    businessInfo: {
      companyName: 'Plomberie Dupont & Fils',
      phone: '01 23 45 67 89',
      email: 'contact@plomberie-dupont.fr',
      address: '123 Rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      description: 'Votre expert en plomberie depuis 1990. Intervention rapide, travail soigné, prix transparents.',
      openingHours: {
        monday: '8h00 - 19h00',
        tuesday: '8h00 - 19h00',
        wednesday: '8h00 - 19h00',
        thursday: '8h00 - 19h00',
        friday: '8h00 - 19h00',
        saturday: '9h00 - 18h00',
        sunday: 'Urgences uniquement'
      },
      socialLinks: {
        facebook: 'https://facebook.com/plomberiedupont',
        instagram: 'https://instagram.com/plomberiedupont'
      }
    },
    globalHeader: {
      id: 'header-global',
      type: 'header-pro',
      props: {
        logo: 'Plomberie Dupont',
        menuItems: [
          { label: 'Accueil', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Tarifs', href: '/tarifs' },
          { label: 'Contact', href: '/contact' }
        ],
        ctaText: 'Urgence 24/7',
        ctaHref: 'tel:0123456789'
      }
    },
    globalFooter: {
      id: 'footer-global',
      type: 'footer-pro',
      props: {
        companyName: 'Plomberie Dupont & Fils',
        description: 'Votre expert plombier à Paris depuis 1990',
        quickLinks: [
          { label: 'Services', href: '/services' },
          { label: 'Tarifs', href: '/tarifs' },
          { label: 'Contact', href: '/contact' },
          { label: 'Mentions légales', href: '/mentions-legales' }
        ]
      }
    },
    theme: {
      colors: {
        primary: '#3B82F6',
        secondary: '#1E40AF',
        accent: '#F59E0B',
        background: '#FFFFFF',
        surface: '#F3F4F6',
        text: '#1F2937',
        textSecondary: '#6B7280'
      },
      typography: {
        fontFamily: {
          heading: 'Inter, sans-serif',
          body: 'Inter, sans-serif'
        }
      }
    }
  };
  
  cmsHtml = cmsHtml.replace(
    'window.CMS_INITIAL_DATA = {',
    `window.CMS_INITIAL_DATA = ${JSON.stringify(testData, null, 2)}; // {`
  );
  
  fs.writeFileSync(cmsHtmlDest, cmsHtml);
  console.log('✅ CMS HTML copié et configuré');
} else {
  console.log('⚠️  Fichier CMS HTML non trouvé, création d\'une version simplifiée...');
  
  // Créer une version simplifiée pour le test
  const simpleCmsHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS Test - Administration</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
            <h1 class="text-2xl font-bold mb-4">CMS de test</h1>
            <p class="text-gray-600 mb-4">Interface d'administration simplifiée</p>
            
            <div class="border rounded p-4 bg-blue-50">
                <h2 class="font-semibold mb-2">Instructions :</h2>
                <ol class="list-decimal ml-5 space-y-1">
                    <li>Connectez-vous avec admin@site.com / admin123</li>
                    <li>Modifiez le contenu des blocs</li>
                    <li>Les changements sont sauvegardés automatiquement</li>
                </ol>
            </div>
            
            <div class="mt-6">
                <a href="/" class="text-blue-600 hover:underline">← Retour au site</a>
            </div>
        </div>
    </div>
    
    <script>
        window.CMS_INITIAL_DATA = ${JSON.stringify(testData, null, 2)};
        console.log('CMS Test Mode - Data loaded:', window.CMS_INITIAL_DATA);
    </script>
</body>
</html>`;
  
  fs.writeFileSync(cmsHtmlDest, simpleCmsHtml);
}

// Copier le CMS core JS
const cmsCoreSource = path.join(__dirname, '..', 'lib', 'cms-export', 'cms-core.ts');
const cmsCoreDest = path.join(adminDir, 'cms-core.js');

// Pour le test, créer une version simplifiée du core
const simpleCmsCore = `
// Version simplifiée du CMS Core pour les tests
class CMSCore {
  constructor(data, apiEndpoint = 'http://localhost:3002/api/cms') {
    this.data = data;
    this.apiEndpoint = apiEndpoint;
    this.authToken = localStorage.getItem('cms_auth_token');
    console.log('CMS Core initialized with data:', data);
  }

  async login(email, password) {
    try {
      const response = await fetch(this.apiEndpoint + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const { token } = await response.json();
        this.authToken = token;
        localStorage.setItem('cms_auth_token', token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    this.authToken = null;
    localStorage.removeItem('cms_auth_token');
  }

  isAuthenticated() {
    return !!this.authToken;
  }

  async save() {
    if (!this.authToken) return false;

    try {
      const response = await fetch(this.apiEndpoint + '/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.authToken
        },
        body: JSON.stringify(this.data)
      });

      return response.ok;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    }
  }
}

window.CMSCore = CMSCore;
`;

fs.writeFileSync(cmsCoreDest, simpleCmsCore);

// Créer un fichier index.html de base
const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site de test avec CMS</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen bg-gray-50">
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 py-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900">Plomberie Dupont</h1>
                    <a href="/admin" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        🔧 Administration
                    </a>
                </div>
            </div>
        </header>
        
        <main class="max-w-7xl mx-auto px-4 py-12">
            <div class="bg-white rounded-lg shadow p-8">
                <h2 class="text-2xl font-semibold mb-4">Bienvenue sur notre site de test</h2>
                <p class="text-gray-600 mb-6">
                    Ce site inclut un CMS intégré. Cliquez sur "Administration" pour accéder à l'interface de gestion.
                </p>
                
                <div class="bg-blue-50 border border-blue-200 rounded p-4">
                    <h3 class="font-semibold text-blue-900 mb-2">Informations de connexion :</h3>
                    <ul class="text-blue-800">
                        <li>Email : admin@site.com</li>
                        <li>Mot de passe : admin123</li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</body>
</html>`;

fs.writeFileSync(path.join(testDir, 'index.html'), indexHtml);

// Créer le package.json pour les dépendances
const packageJson = {
  name: "cms-test-server",
  version: "1.0.0",
  scripts: {
    start: "node test-cms-local.js"
  },
  dependencies: {
    express: "^4.18.2"
  }
};

fs.writeFileSync(
  path.join(__dirname, 'package.json'), 
  JSON.stringify(packageJson, null, 2)
);

console.log(`
✅ Environnement de test CMS préparé !

📋 Prochaines étapes :

1. Installer les dépendances :
   cd scripts && npm install

2. Démarrer le serveur de test :
   npm start

3. Ouvrir le navigateur :
   http://localhost:3002

Le CMS sera disponible sur http://localhost:3002/admin
`);