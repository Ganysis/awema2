# 🚀 BRIEF COMPLET - SITE AWEMA AVEC ASTRO + SANITY CMS

## 🎯 ANALYSE DES TEMPLATES - CHOIX FINAL

Après analyse des templates ThemeFisher, voici le **TOP 3 pour AWEMA** :

### 🥇 **COPPER** (MEILLEUR CHOIX)
- **Style** : Ultra moderne, animations fluides, design premium
- **Points forts** :
  - Hero avec effet parallax impressionnant
  - Sections pricing magnifiques avec toggle mensuel/annuel
  - Portfolio filtrable parfait pour les démos
  - Blog intégré style Medium
  - Animations scroll AOS intégrées
- **Parfait pour** : Agence tech moderne qui veut impressionner

### 🥈 **BIGSPRING** (Alternative solide)
- **Style** : SaaS moderne, clean, professionnel
- **Points forts** : Sections démos, pricing tables natives
- **Limite** : Moins "wow" que Copper

### 🥉 **DELTA** (Option créative)
- **Style** : Créatif, bold, coloré
- **Points forts** : Design unique, mémorable
- **Limite** : Peut-être trop créatif pour certains artisans

**RECOMMANDATION FINALE : COPPER** pour son équilibre parfait entre modernité, professionnalisme et effet "wow" qui convertit.

---

## 📋 ARCHITECTURE COMPLÈTE AVEC SANITY CMS

```
awema-site/
├── frontend/                    # Site Astro
│   ├── src/
│   │   ├── components/
│   │   │   ├── sections/       # Sections Copper adaptées
│   │   │   ├── landing/        # Composants landing pages
│   │   │   └── cms/            # Composants Sanity
│   │   ├── pages/
│   │   │   ├── index.astro
│   │   │   ├── [...slug].astro # Pages dynamiques Sanity
│   │   │   └── api/
│   │   └── lib/
│   │       ├── sanity.ts       # Client Sanity
│   │       └── queries.ts      # GROQ queries
│   └── astro.config.mjs
│
├── studio/                      # Sanity Studio
│   ├── schemas/
│   │   ├── documents/
│   │   │   ├── homePage.ts
│   │   │   ├── landingPage.ts
│   │   │   ├── pricing.ts
│   │   │   ├── testimonial.ts
│   │   │   └── blogPost.ts
│   │   └── objects/
│   │       ├── hero.ts
│   │       ├── cta.ts
│   │       └── seo.ts
│   ├── desk/
│   │   └── structure.ts        # Organisation du CMS
│   └── sanity.config.ts
│
└── package.json
```

---

## 🔧 CONFIGURATION SANITY CMS

### Installation et Setup

```bash
# Créer le projet Sanity
npm create sanity@latest -- --project awema-site --dataset production

# Configuration Sanity
export SANITY_PROJECT_ID="awema2024"
export SANITY_DATASET="production"
export SANITY_API_TOKEN="skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf"
```

### Schemas Sanity Principaux

#### 1. Schema Homepage
```typescript
// schemas/documents/homePage.ts
export default {
  name: 'homePage',
  title: 'Page Accueil',
  type: 'document',
  fields: [
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'headline',
          title: 'Titre Principal',
          type: 'string',
          initialValue: 'Votre Site Web Professionnel en 48h'
        },
        {
          name: 'subheadline',
          title: 'Sous-titre',
          type: 'string',
          initialValue: 'À partir de 97€/mois - Sans Frais Cachés'
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
          initialValue: 'AWEMA crée des sites qui génèrent vraiment des clients pour les artisans du BTP. +300 sites livrés.'
        },
        {
          name: 'ctaPrimary',
          title: 'CTA Principal',
          type: 'object',
          fields: [
            {name: 'text', type: 'string', title: 'Texte'},
            {name: 'link', type: 'string', title: 'Lien'}
          ]
        }
      ]
    },
    {
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'number', type: 'string'},
          {name: 'label', type: 'string'}
        ]
      }]
    },
    {
      name: 'pricing',
      title: 'Section Tarifs',
      type: 'reference',
      to: [{type: 'pricingSection'}]
    },
    {
      name: 'testimonials',
      title: 'Témoignages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'testimonial'}]}]
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo'
    }
  ]
}
```

#### 2. Schema Landing Page Métier
```typescript
// schemas/documents/landingPage.ts
export default {
  name: 'landingPageMetier',
  title: 'Landing Page Métier',
  type: 'document',
  fields: [
    {
      name: 'metier',
      title: 'Métier',
      type: 'string',
      options: {
        list: [
          {title: 'Plombier', value: 'plombier'},
          {title: 'Électricien', value: 'electricien'},
          {title: 'Menuisier', value: 'menuisier'},
          {title: 'Maçon', value: 'macon'},
          {title: 'Paysagiste', value: 'paysagiste'}
        ]
      }
    },
    {
      name: 'ville',
      title: 'Ville',
      type: 'string',
      options: {
        list: [
          {title: 'Lyon', value: 'lyon'},
          {title: 'Paris', value: 'paris'},
          {title: 'Marseille', value: 'marseille'},
          {title: 'Toulouse', value: 'toulouse'},
          {title: 'Nice', value: 'nice'}
        ]
      }
    },
    {
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: {
        source: (doc) => `site-internet-${doc.metier}-${doc.ville}`,
        maxLength: 96
      }
    },
    {
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Titre H1',
          type: 'string',
          description: 'Utilisez {metier} et {ville} comme variables'
        },
        {
          name: 'badges',
          title: 'Badges de confiance',
          type: 'array',
          of: [{type: 'string'}]
        }
      ]
    },
    {
      name: 'problems',
      title: 'Problèmes/Solutions',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'problem', type: 'string'},
          {name: 'solution', type: 'string'}
        ]
      }]
    },
    {
      name: 'offer',
      title: 'Offre Spéciale',
      type: 'object',
      fields: [
        {name: 'title', type: 'string'},
        {name: 'discount', type: 'string'},
        {name: 'features', type: 'array', of: [{type: 'string'}]},
        {name: 'urgency', type: 'string'}
      ]
    },
    {
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {name: 'question', type: 'string'},
          {name: 'answer', type: 'text'}
        ]
      }]
    }
  ]
}
```

#### 3. Schema Pricing
```typescript
// schemas/documents/pricing.ts
export default {
  name: 'pricingPlan',
  title: 'Formule Tarifaire',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nom de la formule',
      type: 'string'
    },
    {
      name: 'setupFee',
      title: 'Frais de setup',
      type: 'number'
    },
    {
      name: 'monthlyFee',
      title: 'Abonnement mensuel',
      type: 'number'
    },
    {
      name: 'features',
      title: 'Fonctionnalités',
      type: 'array',
      of: [{type: 'string'}]
    },
    {
      name: 'popular',
      title: 'Formule populaire?',
      type: 'boolean'
    },
    {
      name: 'ctaText',
      title: 'Texte du bouton',
      type: 'string'
    },
    {
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number'
    }
  ]
}
```

---

## 🎨 INTÉGRATION COPPER + SANITY

### Components Astro avec données Sanity

```astro
---
// src/components/HeroSanity.astro
import { sanityClient } from '../lib/sanity';
import { groq } from 'astro-sanity';

const query = groq`*[_type == "homePage"][0]{
  hero {
    headline,
    subheadline,
    description,
    ctaPrimary,
    ctaSecondary
  }
}`;

const data = await sanityClient.fetch(query);
const { hero } = data;
---

<!-- Hero Section style Copper avec animations -->
<section class="hero-copper relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
  <!-- Animation de fond style Copper -->
  <div class="absolute inset-0">
    <div class="hero-bg-animation"></div>
    <div class="floating-shapes"></div>
  </div>

  <div class="container mx-auto px-4 z-10">
    <div class="max-w-4xl mx-auto text-center text-white">
      <!-- Badge de confiance -->
      <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full mb-6" data-aos="fade-down">
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
        </span>
        <span class="text-sm">+300 sites livrés • 4.9/5 ⭐⭐⭐⭐⭐</span>
      </div>

      <!-- Headline avec effet typewriter -->
      <h1 class="text-5xl md:text-7xl font-bold mb-6 typewriter" data-aos="fade-up">
        {hero.headline}
      </h1>

      <!-- Subheadline avec gradient -->
      <h2 class="text-2xl md:text-3xl mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-semibold" data-aos="fade-up" data-aos-delay="100">
        {hero.subheadline}
      </h2>

      <!-- Description -->
      <p class="text-xl text-white/90 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
        {hero.description}
      </p>

      <!-- CTAs avec hover effects -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center" data-aos="fade-up" data-aos-delay="300">
        <a href={hero.ctaPrimary.link} class="btn-copper-primary group">
          <span>{hero.ctaPrimary.text}</span>
          <svg class="ml-2 group-hover:translate-x-2 transition-transform" width="20" height="20">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/>
          </svg>
        </a>
        <a href={hero.ctaSecondary.link} class="btn-copper-secondary">
          {hero.ctaSecondary.text}
        </a>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg width="30" height="30" class="text-white/50">
      <path d="M15 10v10M10 15l5 5 5-5" stroke="currentColor" stroke-width="2" fill="none"/>
    </svg>
  </div>
</section>

<style>
  /* Styles Copper Premium */
  .hero-bg-animation {
    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .floating-shapes::before,
  .floating-shapes::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(255,255,255,0.1), transparent);
    animation: float 20s infinite;
  }

  .floating-shapes::before {
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
  }

  .floating-shapes::after {
    width: 300px;
    height: 300px;
    bottom: -50px;
    left: -50px;
    animation-delay: 10s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.1); }
    50% { transform: translate(-20px, 20px) scale(0.9); }
    75% { transform: translate(40px, 10px) scale(1.05); }
  }

  .btn-copper-primary {
    @apply inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 font-bold rounded-full shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 transition-all duration-300;
  }

  .btn-copper-secondary {
    @apply inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300;
  }

  .typewriter {
    overflow: hidden;
    white-space: nowrap;
    animation: typing 3.5s steps(40, end);
  }

  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
</style>
```

### Pricing Component avec Sanity
```astro
---
// src/components/PricingSanity.astro
import { sanityClient } from '../lib/sanity';

const plans = await sanityClient.fetch(`
  *[_type == "pricingPlan"] | order(order) {
    name,
    setupFee,
    monthlyFee,
    features,
    popular,
    ctaText
  }
`);
---

<section class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Choisissez Votre Formule</h2>
      <p class="text-xl text-gray-600">Setup unique + Abonnement mensuel tout compris</p>

      <!-- Toggle Mensuel/Annuel style Copper -->
      <div class="inline-flex items-center gap-4 mt-8 p-1 bg-gray-200 rounded-full">
        <button class="px-6 py-2 bg-white rounded-full shadow">Mensuel</button>
        <button class="px-6 py-2">Annuel (-10%)</button>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {plans.map((plan) => (
        <div class={`pricing-card ${plan.popular ? 'popular' : ''}`}>
          {plan.popular && (
            <span class="popular-badge">Plus Populaire</span>
          )}

          <h3 class="text-2xl font-bold mb-2">{plan.name}</h3>

          <div class="price-display mb-6">
            <div class="setup-fee">
              <span class="text-sm text-gray-600">Setup</span>
              <span class="text-3xl font-bold">{plan.setupFee}€</span>
            </div>
            <div class="monthly-fee">
              <span class="text-4xl font-bold">{plan.monthlyFee}€</span>
              <span class="text-gray-600">/mois</span>
            </div>
          </div>

          <ul class="features-list mb-8">
            {plan.features.map((feature) => (
              <li class="flex items-start gap-2 mb-3">
                <svg class="w-5 h-5 text-green-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <button class={`w-full py-3 rounded-lg font-semibold transition-all ${
            plan.popular
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}>
            {plan.ctaText}
          </button>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .pricing-card {
    @apply bg-white rounded-2xl shadow-lg p-8 relative transform hover:scale-105 transition-all duration-300;
  }

  .pricing-card.popular {
    @apply shadow-2xl border-2 border-blue-500 scale-105;
  }

  .popular-badge {
    @apply absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-semibold;
  }
</style>
```

---

## 📱 STUDIO SANITY CONFIGURATION

### Structure du Studio
```typescript
// studio/desk/structure.ts
export const deskStructure = (S) =>
  S.list()
    .title('Contenu AWEMA')
    .items([
      S.listItem()
        .title('🏠 Homepage')
        .child(S.document().schemaType('homePage').documentId('homepage')),

      S.divider(),

      S.listItem()
        .title('📄 Landing Pages Métiers')
        .child(
          S.documentTypeList('landingPageMetier')
            .title('Landing Pages')
            .filter('_type == "landingPageMetier"')
        ),

      S.listItem()
        .title('💰 Tarifs')
        .child(S.documentTypeList('pricingPlan')),

      S.listItem()
        .title('⭐ Témoignages')
        .child(S.documentTypeList('testimonial')),

      S.listItem()
        .title('📝 Blog')
        .child(S.documentTypeList('blogPost')),

      S.divider(),

      S.listItem()
        .title('⚙️ Paramètres')
        .child(
          S.list()
            .title('Paramètres')
            .items([
              S.listItem()
                .title('SEO Global')
                .child(S.document().schemaType('seoSettings').documentId('seo')),
              S.listItem()
                .title('Navigation')
                .child(S.document().schemaType('navigation').documentId('nav')),
              S.listItem()
                .title('Footer')
                .child(S.document().schemaType('footer').documentId('footer'))
            ])
        )
    ]);
```

---

## 🚀 COMMANDES DE DÉPLOIEMENT

```bash
# Installation complète
npm create astro@latest -- --template copper awema-site
cd awema-site
npm install @sanity/client @astrojs/sanity @astrojs/tailwind @astrojs/sitemap

# Configuration Sanity
npm create sanity@latest -- --project awema-studio --dataset production
cd awema-studio
npm install

# Variables d'environnement (.env)
SANITY_PROJECT_ID="awema2024"
SANITY_DATASET="production"
SANITY_API_TOKEN="skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf"
PUBLIC_SANITY_PROJECT_ID="awema2024"
PUBLIC_SANITY_DATASET="production"

# Build et déploiement
npm run build
npm run deploy # Vers Cloudflare Pages
```

---

## 💬 PROMPT POUR L'AGENT D'IMPLÉMENTATION

```markdown
Tu es un expert développeur Astro/Sanity. Ta mission est de créer le site AWEMA haute conversion.

CONTEXTE:
- Template de base: COPPER de ThemeFisher (le plus stylé et moderne)
- CMS: Sanity Studio pour gestion du contenu
- Stack: Astro v5 + Tailwind CSS + Sanity CMS
- Hosting: Cloudflare Pages
- Objectif: Site qui convertit à 15%+ et génère 50K€/mois

ÉTAPES À SUIVRE:

1. SETUP INITIAL
   - Télécharger et installer le template Copper
   - Initialiser Astro avec les bonnes dépendances
   - Configurer Sanity Studio avec les schemas fournis
   - Connecter Astro à Sanity avec les tokens fournis

2. ADAPTATION COPPER
   - Adapter le design Copper aux besoins AWEMA
   - Garder les animations et effets premium
   - Intégrer les sections: Hero, Stats, Process, Demo, Pricing, Testimonials
   - Ajouter les éléments de conversion (urgence, social proof, trust badges)

3. CRÉATION DES PAGES
   - Homepage avec toutes les sections Sanity
   - 100 landing pages métiers (10 métiers × 10 villes)
   - Pages: Tarifs, Portfolio, Fonctionnalités, À propos, Blog
   - Toutes les pages doivent être éditables dans Sanity

4. INTÉGRATIONS
   - Calendly pour prise de RDV
   - Crisp Chat pour support live
   - Google Analytics 4 + Ads Conversion
   - Brevo pour emails automatisés
   - Formulaires avec validation et tracking

5. OPTIMISATIONS
   - Score Lighthouse 100/100
   - Images WebP avec lazy loading
   - Critical CSS inline
   - SEO parfait avec schema.org
   - RGPD compliant

6. SANITY STUDIO
   - Interface intuitive pour éditer tout le contenu
   - Preview en temps réel
   - Workflow de publication
   - Gestion multi-utilisateurs

LIVRABLES:
- Site complet fonctionnel
- Sanity Studio configuré
- Documentation d'utilisation
- Scripts de déploiement
- Checklist de lancement

TOKENS À UTILISER:
- Sanity API: skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf
- Cloudflare: ns6-ir43C9gBdMO1XWSIOEVAAsVY4CPTY4vUPK0t
- Email: noreply@awema.fr / !Vesper1!

Le site doit être MAGNIFIQUE, MODERNE et CONVERTIR comme une machine.
Utilise toute la puissance du template Copper avec ses animations et effets premium.
```

---

**CE BRIEF COMPLET PERMET DE CRÉER LE SITE AWEMA LE PLUS STYLÉ AVEC COPPER + SANITY CMS**

*L'agent peut maintenant créer un site premium qui impressionne et convertit à 15%+*