# 🎯 GUIDE V2 - TRANSFORMATION UNIVERSELLE DES TEMPLATES THEMEFISHER

## 📌 PRINCIPE FONDAMENTAL

**CHAQUE template ThemeFisher doit pouvoir s'adapter à TOUS les métiers BTP**
- 1 template = 30+ variations métiers possibles
- Système de remplacement universel (Lorem → Contenu réel)
- Banque d'images SVG prêtes à l'emploi
- Injection dynamique des données client

---

## 1️⃣ DONNÉES CLIENT À RÉCUPÉRER (FORMULAIRE)

### Données Essentielles à Injecter
```javascript
const CLIENT_DATA = {
  // 🏢 IDENTITÉ ENTREPRISE
  businessName: "Plomberie Excellence",        // Nom de l'entreprise
  logo: {
    url: null,                                // Upload client ou...
    generated: true,                          // ...génération automatique
    text: "PE"                               // Initiales pour logo généré
  },

  // 📍 LOCALISATION
  location: {
    city: "Lyon",                           // Ville
    district: "3ème arrondissement",        // Quartier/Arrondissement
    postalCode: "69003",                    // Code postal
    department: "Rhône",                    // Département
    region: "Auvergne-Rhône-Alpes"         // Région
  },

  // 📞 CONTACT
  contact: {
    phone: "04 78 12 34 56",
    mobile: "06 12 34 56 78",
    email: "contact@plomberie-excellence.fr",
    address: "123 rue de la République, 69003 Lyon"
  },

  // 🔧 MÉTIER & SERVICES
  businessType: "plombier",                 // Type de métier
  services: [
    "Dépannage urgent 24/7",
    "Installation sanitaire",
    "Rénovation salle de bain",
    "Détection de fuites",
    "Entretien chaudière"
  ],

  // 🎨 PERSONNALISATION
  customization: {
    primaryColor: "#0066CC",               // Couleur principale (ou auto)
    accentColor: "#FF6B6B",               // Couleur accent (ou auto)
    sliderImages: [],                      // Images carousel uploadées
    teamPhoto: null,                      // Photo équipe
    certifications: []                    // Certifications/Labels
  },

  // 📊 OPTIONS
  options: {
    urgentService: true,                  // Service d'urgence 24/7
    freeQuote: true,                     // Devis gratuit
    warranty: "10 ans",                  // Garantie
    paymentMethods: ["CB", "Chèque", "Espèces"],
    socialMedia: {
      facebook: "",
      instagram: "",
      linkedin: ""
    }
  }
};
```

---

## 2️⃣ SYSTÈME DE REMPLACEMENT LOREM IPSUM

### Transformation en 2 Phases

#### PHASE 1: Template Lorem (Mockup)
```javascript
// TOUT le contenu textuel est en Lorem Ipsum
const LOREM_TEMPLATE = {
  // Header
  siteName: "Lorem Ipsum Dolor",
  tagline: "Sit amet consectetur adipiscing elit",

  // Hero Section
  heroTitle: "Lorem Ipsum Dolor Sit Amet",
  heroSubtitle: "Consectetur adipiscing elit sed do eiusmod",
  heroCTA: "Lorem Ipsum",

  // Services (3-6 blocs)
  services: [
    {
      title: "Lorem Ipsum",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit",
      icon: "{{SERVICE_ICON_1}}"  // Placeholder pour SVG
    },
    // ...
  ],

  // About
  aboutTitle: "Lorem Ipsum Dolor",
  aboutText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",

  // Testimonials
  testimonials: [
    {
      name: "Lorem I.",
      text: "Lorem ipsum dolor sit amet consectetur",
      rating: 5
    }
  ],

  // Contact
  contactTitle: "Lorem Ipsum",
  contactText: "Lorem ipsum dolor sit amet"
};
```

#### PHASE 2: Contenu Réel (Après sélection)
```javascript
// Remplacement par contenu enrichi DeepSeek
const REAL_CONTENT = {
  siteName: CLIENT_DATA.businessName,
  tagline: `Votre expert ${METIER} à ${VILLE} depuis 25 ans`,

  heroTitle: `${businessName} - Intervention rapide ${city}`,
  heroSubtitle: generateWithAI("hero_subtitle", CLIENT_DATA),
  heroCTA: "Devis Gratuit",

  services: CLIENT_DATA.services.map(service => ({
    title: service,
    description: generateWithAI("service_description", service),
    icon: getSVGForService(service)
  })),

  // ... etc
};
```

---

## 3️⃣ BANQUE D'IMAGES SVG PAR MÉTIER

### Structure des Assets SVG
```
/public/assets/svg/
├── icons/                      # Icônes universelles
│   ├── phone.svg
│   ├── email.svg
│   ├── location.svg
│   └── clock-24h.svg
│
├── metiers/                    # SVG spécifiques par métier
│   ├── plombier/
│   │   ├── icon-fuite.svg
│   │   ├── icon-tuyau.svg
│   │   ├── icon-robinet.svg
│   │   ├── icon-chaudiere.svg
│   │   ├── hero-plombier.svg
│   │   └── pattern-eau.svg
│   │
│   ├── electricien/
│   │   ├── icon-ampoule.svg
│   │   ├── icon-tableau.svg
│   │   ├── icon-prise.svg
│   │   ├── icon-cable.svg
│   │   ├── hero-electricien.svg
│   │   └── pattern-circuit.svg
│   │
│   ├── menuisier/
│   │   ├── icon-scie.svg
│   │   ├── icon-marteau.svg
│   │   ├── icon-planche.svg
│   │   ├── icon-porte.svg
│   │   ├── hero-menuisier.svg
│   │   └── pattern-bois.svg
│   │
│   ├── paysagiste/
│   │   ├── icon-arbre.svg
│   │   ├── icon-tondeuse.svg
│   │   ├── icon-feuille.svg
│   │   ├── icon-arrosoir.svg
│   │   ├── hero-paysagiste.svg
│   │   └── pattern-nature.svg
│   │
│   └── macon/
│       ├── icon-truelle.svg
│       ├── icon-brique.svg
│       ├── icon-niveau.svg
│       ├── icon-beton.svg
│       ├── hero-macon.svg
│       └── pattern-mur.svg
│
└── logos/                      # Logos générés
    └── generated/              # Logos auto-générés par métier
```

### Mapping SVG Automatique
```javascript
const SVG_MAPPING = {
  plombier: {
    hero: '/assets/svg/metiers/plombier/hero-plombier.svg',
    services: {
      'dépannage': '/assets/svg/metiers/plombier/icon-fuite.svg',
      'installation': '/assets/svg/metiers/plombier/icon-tuyau.svg',
      'rénovation': '/assets/svg/metiers/plombier/icon-robinet.svg',
      'chaudière': '/assets/svg/metiers/plombier/icon-chaudiere.svg'
    },
    pattern: '/assets/svg/metiers/plombier/pattern-eau.svg',
    defaultIcon: '/assets/svg/metiers/plombier/icon-tuyau.svg'
  },

  electricien: {
    hero: '/assets/svg/metiers/electricien/hero-electricien.svg',
    services: {
      'installation': '/assets/svg/metiers/electricien/icon-tableau.svg',
      'dépannage': '/assets/svg/metiers/electricien/icon-ampoule.svg',
      'mise aux normes': '/assets/svg/metiers/electricien/icon-cable.svg',
      'domotique': '/assets/svg/metiers/electricien/icon-prise.svg'
    },
    pattern: '/assets/svg/metiers/electricien/pattern-circuit.svg',
    defaultIcon: '/assets/svg/metiers/electricien/icon-ampoule.svg'
  }
  // ... autres métiers
};
```

---

## 4️⃣ SYSTÈME DE COULEURS DYNAMIQUES

### Palette par Métier
```javascript
const COLOR_SCHEMES = {
  plombier: {
    primary: '#0066CC',     // Bleu eau
    accent: '#FF6B6B',      // Rouge urgent
    secondary: '#4DA6FF',   // Bleu clair
    dark: '#003D7A',        // Bleu foncé
    light: '#E6F2FF'        // Bleu très clair
  },

  electricien: {
    primary: '#FFA500',     // Orange électrique
    accent: '#4169E1',      // Bleu royal
    secondary: '#FFD700',   // Jaune
    dark: '#CC8400',        // Orange foncé
    light: '#FFF5E6'        // Orange très clair
  },

  menuisier: {
    primary: '#8B4513',     // Brun bois
    accent: '#228B22',      // Vert nature
    secondary: '#D2691E',   // Chocolat
    dark: '#5D2F0B',        // Brun foncé
    light: '#F5E6D3'        // Beige clair
  },

  paysagiste: {
    primary: '#228B22',     // Vert forêt
    accent: '#87CEEB',      // Bleu ciel
    secondary: '#90EE90',   // Vert clair
    dark: '#0F4F0F',        // Vert foncé
    light: '#E6FFE6'        // Vert très clair
  },

  macon: {
    primary: '#696969',     // Gris béton
    accent: '#DC143C',      // Rouge brique
    secondary: '#A0522D',   // Terre cuite
    dark: '#404040',        // Gris foncé
    light: '#F0F0F0'        // Gris clair
  }
};
```

---

## 5️⃣ STRUCTURE DE TRANSFORMATION D'UN TEMPLATE

### Fichiers à Modifier Systématiquement

```javascript
const TEMPLATE_STRUCTURE = {
  // 1. Configuration Globale
  'src/config/site.config.js': {
    siteName: '{{BUSINESS_NAME}}',
    siteUrl: '{{SITE_URL}}',
    logo: '{{LOGO_URL}}',
    colors: '{{COLOR_SCHEME}}',
    metier: '{{BUSINESS_TYPE}}'
  },

  // 2. Layout Principal
  'src/layouts/Base.astro': {
    // Injection des couleurs CSS
    cssVariables: `
      --primary: ${COLOR_SCHEMES[metier].primary};
      --accent: ${COLOR_SCHEMES[metier].accent};
      --secondary: ${COLOR_SCHEMES[metier].secondary};
    `,
    // Meta tags SEO
    metaTags: generateSEOTags(CLIENT_DATA)
  },

  // 3. Composants
  'src/components/Header.astro': {
    logo: '{{LOGO}}',
    businessName: '{{BUSINESS_NAME}}',
    phone: '{{PHONE}}',
    urgentBadge: '{{URGENT_SERVICE}}'
  },

  'src/components/Hero.astro': {
    title: '{{HERO_TITLE}}',
    subtitle: '{{HERO_SUBTITLE}}',
    cta: '{{HERO_CTA}}',
    backgroundImage: '{{HERO_IMAGE}}',
    sliderImages: '{{SLIDER_IMAGES}}'
  },

  'src/components/Services.astro': {
    services: '{{SERVICES_LIST}}',
    icons: '{{SERVICE_ICONS}}'
  },

  'src/components/About.astro': {
    title: '{{ABOUT_TITLE}}',
    content: '{{ABOUT_CONTENT}}',
    teamPhoto: '{{TEAM_PHOTO}}',
    certifications: '{{CERTIFICATIONS}}'
  },

  'src/components/Contact.astro': {
    phone: '{{PHONE}}',
    email: '{{EMAIL}}',
    address: '{{ADDRESS}}',
    map: '{{GOOGLE_MAP}}',
    form: '{{CONTACT_FORM}}'
  },

  'src/components/Footer.astro': {
    businessName: '{{BUSINESS_NAME}}',
    address: '{{ADDRESS}}',
    phone: '{{PHONE}}',
    email: '{{EMAIL}}',
    socialLinks: '{{SOCIAL_LINKS}}',
    legalLinks: '{{LEGAL_LINKS}}'
  }
};
```

---

## 6️⃣ PROCESSUS DE TRANSFORMATION ÉTAPE PAR ÉTAPE

### Phase 1: Préparation du Template Lorem
```javascript
async function prepareLoremTemplate(template, metier) {
  // 1. Copier le template source
  const templatePath = `/templates/${template}`;
  const outputPath = `/output/lorem-${template}-${metier}`;

  // 2. Remplacer TOUT le texte par Lorem
  await replaceAllTextWithLorem(outputPath);

  // 3. Injecter les couleurs du métier
  await injectColorScheme(outputPath, COLOR_SCHEMES[metier]);

  // 4. Remplacer les images par des SVG métier
  await replacePlaceholderImages(outputPath, SVG_MAPPING[metier]);

  // 5. Ajouter le badge métier
  await addMetierBadge(outputPath, metier);

  return outputPath;
}
```

### Phase 2: Injection des Données Client
```javascript
async function injectClientData(loremTemplate, clientData) {
  const replacements = {
    // Identité
    '{{BUSINESS_NAME}}': clientData.businessName,
    '{{LOGO}}': clientData.logo.url || generateLogo(clientData),

    // Localisation
    '{{CITY}}': clientData.location.city,
    '{{POSTAL_CODE}}': clientData.location.postalCode,
    '{{DEPARTMENT}}': clientData.location.department,

    // Contact
    '{{PHONE}}': clientData.contact.phone,
    '{{EMAIL}}': clientData.contact.email,
    '{{ADDRESS}}': clientData.contact.address,

    // Services (avec icônes SVG)
    '{{SERVICES}}': clientData.services.map(service => ({
      title: service,
      icon: getSVGForService(service, clientData.businessType),
      description: 'Lorem ipsum...' // Phase 1
    })),

    // Images slider
    '{{SLIDER_IMAGES}}': clientData.customization.sliderImages.length > 0
      ? clientData.customization.sliderImages
      : getDefaultSliderImages(clientData.businessType)
  };

  await performReplacements(loremTemplate, replacements);
}
```

### Phase 3: Enrichissement IA (Après Sélection)
```javascript
async function enrichWithAI(template, clientData) {
  const pages = ['accueil', 'services', 'about', 'contact'];

  for (const page of pages) {
    const content = await generatePageContent(page, clientData);
    await replaceLoremWithContent(template, page, content);
  }

  // Générer les témoignages
  const testimonials = await generateTestimonials(clientData);
  await injectTestimonials(template, testimonials);

  // Optimiser le SEO
  const seoData = await generateSEOContent(clientData);
  await injectSEOData(template, seoData);
}
```

---

## 7️⃣ SYSTÈME DE GÉNÉRATION DE LOGO AUTOMATIQUE

```javascript
function generateLogo(clientData) {
  const initials = clientData.businessName
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  const colors = COLOR_SCHEMES[clientData.businessType];

  return `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="${colors.primary}"/>
      <text x="100" y="120" font-size="60" font-weight="bold"
            text-anchor="middle" fill="white">
        ${initials}
      </text>
    </svg>
  `;
}
```

---

## 8️⃣ IMAGES PAR DÉFAUT PAR MÉTIER

```javascript
const DEFAULT_IMAGES = {
  plombier: {
    slider: [
      '/images/plombier/salle-bain-moderne.jpg',
      '/images/plombier/intervention-urgence.jpg',
      '/images/plombier/installation-chaudiere.jpg'
    ],
    services: {
      'dépannage': '/images/plombier/depannage-fuite.jpg',
      'installation': '/images/plombier/installation-sanitaire.jpg',
      'rénovation': '/images/plombier/renovation-sdb.jpg'
    },
    hero: '/images/plombier/hero-plombier.jpg'
  },

  electricien: {
    slider: [
      '/images/electricien/tableau-electrique.jpg',
      '/images/electricien/installation-moderne.jpg',
      '/images/electricien/domotique.jpg'
    ],
    services: {
      'installation': '/images/electricien/installation.jpg',
      'dépannage': '/images/electricien/intervention.jpg',
      'mise aux normes': '/images/electricien/normes.jpg'
    },
    hero: '/images/electricien/hero-electricien.jpg'
  }
  // ... autres métiers
};
```

---

## 9️⃣ MATRICE TEMPLATE × MÉTIER

### Combinaisons Possibles
```javascript
const TEMPLATES = [
  'sydney',
  'nextspace',
  'locomotive',
  'bexer',
  'bigspring',
  'bookworm',
  'copper',
  'dexon',
  'geeky',
  'pinwheel'
];

const METIERS = [
  'plombier',
  'electricien',
  'menuisier',
  'paysagiste',
  'macon',
  'carreleur',
  'peintre',
  'chauffagiste',
  'couvreur',
  'serrurier'
];

// Total: 10 templates × 10 métiers = 100 variations possibles
```

### Génération Automatique de Toutes les Variantes
```javascript
async function generateAllVariants() {
  const variants = [];

  for (const template of TEMPLATES) {
    for (const metier of METIERS) {
      const variant = await prepareLoremTemplate(template, metier);
      variants.push({
        template,
        metier,
        path: variant,
        preview: `https://${template}-${metier}-lorem.netlify.app`
      });
    }
  }

  return variants; // 100 variantes prêtes
}
```

---

## 🔟 CHECKLIST DE TRANSFORMATION COMPLÈTE

### ✅ Phase Lorem (Mockup)
- [ ] Template copié
- [ ] Textes remplacés par Lorem Ipsum
- [ ] Couleurs métier appliquées
- [ ] SVG métier intégrés
- [ ] Logo généré ou placeholder
- [ ] Images par défaut du métier
- [ ] Build réussi
- [ ] Déployé sur Netlify

### ✅ Phase Données Client
- [ ] Nom entreprise injecté
- [ ] Logo uploadé ou généré
- [ ] Coordonnées complètes
- [ ] Services listés
- [ ] Images slider (si fournies)
- [ ] Couleurs personnalisées (si demandé)

### ✅ Phase Enrichissement IA
- [ ] Contenu homepage généré
- [ ] Descriptions services enrichies
- [ ] Page "À propos" rédigée
- [ ] Témoignages créés
- [ ] SEO optimisé
- [ ] Mots-clés locaux intégrés

### ✅ Phase Production
- [ ] CMS Sanity configuré
- [ ] Déployé sur Cloudflare
- [ ] DNS configuré (si domaine custom)
- [ ] Analytics installés
- [ ] Email de livraison envoyé

---

## 📊 DONNÉES MINIMALES REQUISES

```javascript
// Le STRICT MINIMUM pour générer un site
const MINIMUM_DATA = {
  businessName: "Entreprise XYZ",      // OBLIGATOIRE
  businessType: "plombier",            // OBLIGATOIRE
  location: {
    city: "Lyon"                       // OBLIGATOIRE
  },
  contact: {
    phone: "0X XX XX XX XX"           // OBLIGATOIRE
  }
};

// Tout le reste peut être généré/déduit automatiquement
```

---

## 🚀 COMMANDE DE TRANSFORMATION

```bash
# Transformer un template pour un métier
node transform-template.js \
  --template="sydney" \
  --metier="plombier" \
  --phase="lorem" \
  --output="./dist/sydney-plombier-lorem"

# Injecter les données client
node inject-client-data.js \
  --input="./dist/sydney-plombier-lorem" \
  --data="./client-123.json" \
  --output="./dist/sydney-plombier-123"

# Enrichir avec IA
node enrich-with-ai.js \
  --input="./dist/sydney-plombier-123" \
  --api-key="${DEEPSEEK_API_KEY}"

# Déployer
node deploy.js \
  --input="./dist/sydney-plombier-123" \
  --platform="cloudflare"
```

---

**Ce guide V2 contient TOUTES les spécifications pour qu'un agent puisse transformer N'IMPORTE QUEL template ThemeFisher en site personnalisé pour N'IMPORTE QUEL métier BTP.**

*Système universel : 1 template → 30+ métiers possibles*