# 🚀 GUIDE COMPLET - AGENT DE TRANSFORMATION DES TEMPLATES THEMEFISHER

## 📌 VUE D'ENSEMBLE

Ce guide contient TOUTES les informations nécessaires pour créer un agent capable de transformer les templates ThemeFisher en sites de production pour les clients AWEMA.

**Objectif** : Transformer un template ThemeFisher générique en site personnalisé pour un métier BTP spécifique (plombier, électricien, menuisier, etc.)

---

## 1️⃣ ARCHITECTURE TECHNIQUE

### Stack Actuelle
```
Frontend:     Astro v5.7.13 (SSG)
CSS:         Tailwind CSS v4.1.6
Build:       Vite
Déploiement: Cloudflare Pages / Netlify
CMS:         Sanity
IA:          DeepSeek
Email:       O2Switch SMTP
```

### Structure du Projet
```
/home/Ganyc/Desktop/awema/awema2/
├── src/                    # Templates Astro
│   ├── components/         # Composants réutilisables
│   ├── content/           # Contenu Markdown
│   ├── layouts/           # Layouts de base
│   └── pages/             # Pages du site
├── apps/studio/           # Application Next.js (dashboard)
│   ├── lib/services/      # Services métier
│   └── app/api/          # API endpoints
├── public/               # Assets statiques
└── dist/                # Build de production
```

---

## 2️⃣ TEMPLATES THEMEFISHER DISPONIBLES

### Templates Actuels
1. **Sydney** - Design moderne et épuré
2. **NextSpace** - Corporate et professionnel
3. **Locomotive** - Créatif et dynamique
4. **Bexer** - Business et services
5. **Bigspring** - SaaS et startups
6. **Bookworm** - Blog et contenu
7. **Copper** - Portfolio créatif
8. **Dexon** - Agence digitale
9. **Geeky** - Tech et innovation
10. **Pinwheel** - Minimaliste

### Localisation des Templates
```bash
# Templates source
/src/                      # Structure Astro
/src/components/          # Composants
/src/content/            # Contenu
/src/layouts/           # Layouts
/src/pages/            # Pages
```

---

## 3️⃣ CONFIGURATION MÉTIERS BTP

### Métiers Supportés
```javascript
const METIERS_CONFIG = {
  plombier: {
    nom: 'Plomberie',
    couleur_principale: '#0066CC',  // Bleu
    couleur_accent: '#FF6B6B',
    services: [
      'Dépannage urgent 24/7',
      'Installation sanitaire',
      'Rénovation salle de bain',
      'Détection de fuites',
      'Entretien chaudière'
    ],
    mots_cles: ['plomberie', 'fuite', 'urgence', 'sanitaire', 'chaudière']
  },

  electricien: {
    nom: 'Électricité',
    couleur_principale: '#FFA500',  // Orange
    couleur_accent: '#4169E1',
    services: [
      'Installation électrique',
      'Mise aux normes',
      'Dépannage urgent',
      'Domotique',
      'Tableau électrique'
    ],
    mots_cles: ['électricité', 'installation', 'dépannage', 'normes', 'domotique']
  },

  menuisier: {
    nom: 'Menuiserie',
    couleur_principale: '#8B4513',  // Marron
    couleur_accent: '#228B22',
    services: [
      'Menuiserie sur mesure',
      'Pose de parquet',
      'Escaliers',
      'Portes et fenêtres',
      'Aménagement intérieur'
    ],
    mots_cles: ['menuiserie', 'bois', 'parquet', 'escalier', 'aménagement']
  },

  paysagiste: {
    nom: 'Paysagisme',
    couleur_principale: '#228B22',  // Vert
    couleur_accent: '#87CEEB',
    services: [
      'Création de jardins',
      'Entretien espaces verts',
      'Élagage',
      'Arrosage automatique',
      'Terrasses et allées'
    ],
    mots_cles: ['jardin', 'paysagiste', 'espaces verts', 'entretien', 'création']
  },

  macon: {
    nom: 'Maçonnerie',
    couleur_principale: '#696969',  // Gris
    couleur_accent: '#DC143C',
    services: [
      'Construction neuve',
      'Rénovation',
      'Extension',
      'Ravalement façade',
      'Terrassement'
    ],
    mots_cles: ['maçonnerie', 'construction', 'rénovation', 'béton', 'façade']
  }
};
```

---

## 4️⃣ APIS ET TOKENS DE PRODUCTION

### Tous les Tokens Configurés
```env
# ✅ CLOUDFLARE (Déploiement)
CLOUDFLARE_ACCOUNT_ID=596a12cfcd7eeda376f77b030d19aff5
CLOUDFLARE_API_TOKEN=ns6-ir43C9gBdMO1XWSIOEVAAsVY4CPTY4vUPK0t

# ✅ DEEPSEEK AI (Enrichissement contenu)
DEEPSEEK_API_KEY=sk-d86fb0058a67403e98bbca6d3cf1e2dd
DEEPSEEK_API_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_TEMPERATURE=0.7
DEEPSEEK_MAX_TOKENS=4000

# ✅ NETLIFY (Mockups)
NETLIFY_API_TOKEN=nfp_x8tkR52sgdiX7XjaaymBmspi6DPSAe8Vf5b2

# ✅ SANITY CMS
SANITY_ORGANIZATION_ID=ojvLwCYLO
SANITY_API_TOKEN=skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf
SANITY_PROJECT_ID=awema-sites
SANITY_DATASET=production

# ✅ EMAIL O2SWITCH
EMAIL_PROVIDER=smtp
SMTP_HOST=mail.awema.fr
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@awema.fr
SMTP_PASS=!Vesper1!
EMAIL_FROM=noreply@awema.fr
EMAIL_FROM_NAME=AWEMA
EMAIL_REPLY_TO=contact@awema.fr

# ✅ SUPABASE (Base de données)
NEXT_PUBLIC_SUPABASE_URL=https://tnlapfiszzpbetbfpbtx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGFwZmlzenpwYmV0YmZwYnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODkyNzIsImV4cCI6MjA3MjQ2NTI3Mn0.Ankm2Taj9ZWWwaakzIlfmDDni0YYgUwi-SQlwNAr-mk
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGFwZmlzenpwYmV0YmZwYnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njg4OTI3MiwiZXhwIjoyMDcyNDY1MjcyfQ.29xYHX8xeZQ_-DqC0qtSgFYs5UKWm1yGuMbXmt-jkbQ

# Database
DATABASE_URL="file:./dev.db"
JWT_SECRET=super-secret-key-change-in-production-abc123xyz789
```

---

## 5️⃣ WORKFLOW DE TRANSFORMATION

### Phase 1: Génération des Mockups (Lorem Ipsum)
```javascript
// 1. Client remplit formulaire
const formData = {
  businessName: "Plomberie Excellence",
  businessType: "plombier",
  location: "Lyon",
  email: "contact@plomberie.fr",
  phone: "04 78 12 34 56",
  services: ["Dépannage", "Installation", "Rénovation"]
};

// 2. Génération de 3 mockups sur Netlify
const mockups = [
  { template: 'sydney', url: 'https://plomberie-sydney-xxx.netlify.app' },
  { template: 'nextspace', url: 'https://plomberie-nextspace-xxx.netlify.app' },
  { template: 'locomotive', url: 'https://plomberie-locomotive-xxx.netlify.app' }
];

// 3. Envoi par email O2Switch
await sendMockupsEmail(formData, mockups);
```

### Phase 2: Enrichissement après Sélection
```javascript
// 4. Client sélectionne un template
const selectedTemplate = 'sydney';

// 5. Configuration Sanity CMS
await setupSanityCMS(clientId, selectedTemplate);

// 6. Enrichissement avec DeepSeek
const enrichedContent = await generateContent({
  business: formData,
  template: selectedTemplate,
  pages: ['accueil', 'services', 'apropos', 'contact']
});

// 7. Déploiement sur Cloudflare
const productionUrl = await deployToCloudflare(enrichedSite);
```

---

## 6️⃣ TRANSFORMATION DU TEMPLATE

### Étapes de Transformation

#### 1. Adaptation des Couleurs
```javascript
// Remplacer les couleurs du template
function adaptColors(template, metier) {
  const colors = METIERS_CONFIG[metier];

  // Tailwind config
  return {
    primary: colors.couleur_principale,
    accent: colors.couleur_accent,
    secondary: adjustBrightness(colors.couleur_principale, 20)
  };
}
```

#### 2. Remplacement du Contenu
```javascript
// Points de remplacement dans le template
const contentReplacements = {
  // Header
  '{{site_title}}': businessName,
  '{{site_tagline}}': `Votre expert ${metier} à ${ville}`,

  // Hero Section
  '{{hero_title}}': `${businessName} - ${metier} de confiance`,
  '{{hero_description}}': enrichedContent.hero,
  '{{hero_cta}}': 'Devis Gratuit',

  // Services
  '{{services_list}}': services.map(s => generateServiceBlock(s)),

  // Contact
  '{{phone}}': phone,
  '{{email}}': email,
  '{{address}}': `${ville}, France`
};
```

#### 3. Adaptation des Images
```javascript
// Banque d'images par métier
const imageBank = {
  plombier: [
    '/images/plombier/hero-1.jpg',
    '/images/plombier/service-1.jpg',
    // ...
  ],
  electricien: [
    '/images/electricien/hero-1.jpg',
    '/images/electricien/service-1.jpg',
    // ...
  ]
};
```

#### 4. Génération du Contenu avec DeepSeek
```javascript
async function generatePageContent(page, business) {
  const prompt = `
    Génère le contenu pour la page ${page} d'un site de ${business.metier}.
    Entreprise: ${business.name}
    Ville: ${business.location}
    Services: ${business.services.join(', ')}

    Le contenu doit:
    - Faire 200-300 mots
    - Être optimisé SEO
    - Inclure les mots-clés locaux
    - Être professionnel et engageant
  `;

  const response = await deepseek.generate(prompt);
  return response.content;
}
```

---

## 7️⃣ STRUCTURE DES FICHIERS À MODIFIER

### Fichiers Principaux
```
src/
├── layouts/Base.astro          # Layout principal - couleurs, fonts
├── components/
│   ├── Header.astro            # Navigation - logo, menu
│   ├── Footer.astro            # Footer - infos contact
│   ├── Hero.astro              # Section hero - titre, CTA
│   └── Services.astro          # Liste des services
├── pages/
│   ├── index.astro             # Page d'accueil
│   ├── services.astro          # Page services
│   ├── about.astro             # Page à propos
│   └── contact.astro           # Page contact
└── content/
    ├── services/               # Fichiers markdown services
    └── testimonials/           # Témoignages clients
```

### Points d'Injection de Contenu
```javascript
// Dans chaque fichier .astro
const {
  businessName,
  businessType,
  location,
  services,
  phone,
  email,
  primaryColor,
  accentColor
} = Astro.props;
```

---

## 8️⃣ COMMANDES DE BUILD ET DÉPLOIEMENT

### Build Local
```bash
# Installation des dépendances
npm install

# Build du site
npm run build

# Preview local
npm run preview
```

### Déploiement Netlify (Mockups)
```javascript
const netlify = require('netlify');
const client = new netlify.NetlifyAPI(NETLIFY_API_TOKEN);

// Créer un site
const site = await client.createSite({
  name: `${businessType}-${template}-${Date.now()}`
});

// Déployer
await client.deploy(site.id, './dist');
```

### Déploiement Cloudflare (Production)
```bash
# Via Wrangler CLI
wrangler pages deploy dist --project-name=${projectName}

# Ou via API
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -d '{"name":"'${projectName}'"}'
```

---

## 9️⃣ SERVICES À UTILISER

### Services Disponibles
```javascript
// 1. Service de génération de mockups
import { NetlifyMockupService } from '@/lib/services/netlify-mockup.service';

// 2. Service d'enrichissement IA
import { DeepSeekEnrichmentService } from '@/lib/services/deepseek-enrichment.service';

// 3. Service email
import { EmailMockupsService } from '@/lib/services/email-mockups.service';

// 4. Service Sanity CMS
import { SanityCMSService } from '@/lib/services/sanity-cms.service';

// 5. Service de déploiement
import { CloudflareDeployService } from '@/lib/services/cloudflare-deploy.service';
```

---

## 🔟 EXEMPLES DE TRANSFORMATION COMPLÈTE

### Exemple: Plombier à Lyon
```javascript
// Input
const client = {
  businessName: "Plomberie Excellence Lyon",
  businessType: "plombier",
  location: "Lyon 3ème",
  email: "contact@plomberie-lyon.fr",
  phone: "04 78 12 34 56"
};

// Output après transformation
const siteGenere = {
  url: "https://plomberie-excellence-lyon.pages.dev",
  template: "sydney",
  colors: {
    primary: "#0066CC",
    accent: "#FF6B6B"
  },
  pages: {
    accueil: "Contenu enrichi par IA...",
    services: "5 services détaillés...",
    apropos: "Histoire de l'entreprise...",
    contact: "Formulaire + coordonnées"
  }
};
```

---

## 📋 CHECKLIST DE TRANSFORMATION

### Avant Transformation
- [ ] Formulaire client complet
- [ ] Template sélectionné
- [ ] Métier identifié
- [ ] Services listés

### Pendant Transformation
- [ ] Couleurs adaptées au métier
- [ ] Logo généré/uploadé
- [ ] Contenu enrichi par IA
- [ ] Images métier intégrées
- [ ] SEO local optimisé
- [ ] Formulaire de contact configuré

### Après Transformation
- [ ] Site déployé sur Cloudflare
- [ ] CMS Sanity configuré
- [ ] Email de confirmation envoyé
- [ ] Analytics configurés

---

## 🛠️ OUTILS ET SCRIPTS UTILES

### Scripts de Test
```bash
# Tester la génération
node test-workflow-complet-awema.cjs

# Tester les APIs
node test-netlify-sanity.cjs

# Tester l'email
node setup-email-o2switch.cjs
```

### Fichiers de Configuration
- `.env.production-real` - Tous les tokens de production
- `.env.local` - Configuration développement
- `CLAUDE.md` - Instructions spécifiques au projet

---

## 🚨 POINTS D'ATTENTION

### Sécurité
- Ne jamais commiter les tokens
- Utiliser les variables d'environnement
- Valider toutes les entrées utilisateur

### Performance
- Optimiser les images
- Minifier CSS/JS
- Utiliser le cache CDN Cloudflare

### SEO
- Méta tags dynamiques
- Schema.org pour local business
- Sitemap XML
- Robots.txt

---

## 📞 SUPPORT ET DOCUMENTATION

### Documentation Technique
- Astro: https://docs.astro.build
- Sanity: https://www.sanity.io/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
- DeepSeek: https://platform.deepseek.com/docs

### Fichiers Importants
- `/src/` - Templates Astro
- `/apps/studio/lib/services/` - Services métier
- `/STATUS-AWEMA-3.0.md` - État du système
- `/API_KEYS_AWEMA.md` - Tokens (confidentiel)

---

## 💡 WORKFLOW AUTOMATISÉ COMPLET

```mermaid
graph TD
    A[Formulaire Client] --> B[Génération 3 Mockups]
    B --> C[Envoi Email O2Switch]
    C --> D[Client Sélectionne]
    D --> E[Configuration Sanity CMS]
    E --> F[Enrichissement DeepSeek]
    F --> G[Build Astro]
    G --> H[Déploiement Cloudflare]
    H --> I[Site en Production]
```

---

**Ce guide contient TOUT ce qu'il faut pour créer un agent de transformation des templates ThemeFisher en sites de production AWEMA.**

*Dernière mise à jour: 25/09/2025*