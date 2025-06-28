const fs = require('fs');
const path = require('path');

// Données de test complètes
const testData = {
  pages: [
    {
      id: 'home',
      name: 'Accueil',
      slug: '/',
      meta: {
        title: 'Plomberie Dupont - Expert plombier à Paris',
        description: 'Plomberie Dupont, votre expert en plomberie depuis 1990.'
      },
      blocks: [
        {
          id: 'hero-1',
          type: 'hero-centered',
          isVisible: true,
          props: {
            title: 'Expert Plombier à Paris depuis 1990',
            subtitle: 'Dépannage rapide, installation et rénovation. Intervention 24/7.',
            buttonText: 'Demander un devis gratuit',
            buttonLink: '/contact'
          }
        },
        {
          id: 'services-1',
          type: 'services-grid-cards',
          isVisible: true,
          props: {
            title: 'Nos Services de Plomberie',
            subtitle: 'Une expertise complète pour tous vos besoins'
          }
        },
        {
          id: 'features-1',
          type: 'features-clean',
          isVisible: true,
          props: {
            title: 'Pourquoi nous choisir ?',
            subtitle: 'Des avantages qui font la différence'
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
            buttonLink: 'tel:0123456789'
          }
        }
      ]
    },
    {
      id: 'services',
      name: 'Services',
      slug: '/services',
      blocks: [
        {
          id: 'services-hero',
          type: 'hero-centered',
          isVisible: true,
          props: {
            title: 'Nos Services',
            subtitle: 'Une gamme complète de prestations'
          }
        }
      ]
    },
    {
      id: 'contact',
      name: 'Contact',
      slug: '/contact',
      blocks: [
        {
          id: 'contact-1',
          type: 'contact-form-map',
          isVisible: true,
          props: {
            title: 'Contactez-nous',
            subtitle: 'Nous sommes à votre écoute',
            description: 'Remplissez le formulaire ou appelez-nous.'
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
    description: 'Votre expert en plomberie depuis 1990.'
  },
  theme: {
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF'
    }
  }
};

// Lire le fichier HTML actuel
const htmlPath = path.join(__dirname, 'test-cms-export', 'admin', 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Trouver où injecter les données
const scriptTag = '<script src="/admin/cms-core.js"></script>';
const dataScript = `
    <!-- CMS Data -->
    <script>
        window.CMS_INITIAL_DATA = ${JSON.stringify(testData, null, 2)};
    </script>
`;

// Injecter les données avant le script cms-core.js
htmlContent = htmlContent.replace(scriptTag, dataScript + '\n    ' + scriptTag);

// Sauvegarder le fichier
fs.writeFileSync(htmlPath, htmlContent);

console.log('✅ Données CMS injectées avec succès !');
console.log('📄 Pages créées :', testData.pages.length);
console.log('🧩 Blocs totaux :', testData.pages.reduce((sum, p) => sum + p.blocks.length, 0));