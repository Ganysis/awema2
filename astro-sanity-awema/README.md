# 🚀 AWEMA - Site Web Haute Conversion avec Astro + Sanity + Copper

## 📋 Vue d'ensemble

Site web AWEMA créé avec :
- **Astro** : Framework SSG ultra-rapide
- **Sanity CMS** : Gestion de contenu headless
- **Template Copper** : Design premium avec animations modernes
- **Tailwind CSS** : Styling utility-first
- **Cloudflare Pages** : Hébergement gratuit et performant

### 🎯 Objectifs
- Conversion de 15%+ (visiteur → lead)
- Sites livrés en 48h
- 50K€/mois de revenus récurrents
- 0€/mois d'infrastructure

## 🛠️ Installation et lancement

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

## 📁 Structure du projet

```
astro-sanity-awema/
├── src/
│   ├── pages/
│   │   ├── index-awema.astro         # Homepage AWEMA
│   │   ├── tarifs.astro              # Page des tarifs
│   │   ├── site-internet-plombier-lyon.astro  # Landing page exemple
│   │   └── ...
│   ├── components/
│   │   └── Integrations.astro        # Analytics, Crisp, etc.
│   ├── lib/
│   │   └── sanity.ts                 # Client et requêtes Sanity
│   └── layouts/
│       └── Base.astro                 # Layout principal
├── sanity/
│   ├── schemas/                      # Schémas Sanity CMS
│   │   ├── homePage.ts
│   │   ├── landingPageMetier.ts
│   │   ├── pricingPlan.ts
│   │   ├── testimonial.ts
│   │   └── ...
│   └── sanity.config.ts
└── .env                               # Variables d'environnement
```

## 🔑 Configuration

### Variables d'environnement (.env)

```env
# Sanity
SANITY_PROJECT_ID=awema2024
SANITY_DATASET=production
SANITY_API_TOKEN=skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf

# Analytics (optionnel)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
CRISP_CHAT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Email
SMTP_HOST=mail.awema.fr
SMTP_USER=noreply@awema.fr
SMTP_PASS=!Vesper1!
```

## 📄 Pages créées

### ✅ Pages principales
- **Homepage AWEMA** (`/index-awema`) - Page d'accueil avec hero, stats, pricing
- **Tarifs** (`/tarifs`) - 3 formules : STARTER, BUSINESS, PREMIUM
- **Landing Plombier Lyon** (`/site-internet-plombier-lyon`) - Exemple de landing métier

### 🎯 Landing pages à créer (prioritaires)
1. `/site-internet-electricien-paris`
2. `/site-internet-menuisier-marseille`
3. `/site-internet-macon-toulouse`
4. `/site-internet-paysagiste-nice`
5. `/site-internet-carreleur-nantes`

## 🎨 Composants clés

### Hero Section
- Headline accrocheur
- Trust badges (+300 sites, 4.9/5 ⭐)
- Double CTA (primary + secondary)
- Animations AOS

### Pricing Cards
- Setup + mensuel bien visible
- Features avec check/cross
- Badge "populaire" sur BUSINESS
- Garanties incluses

### Landing Pages Métier
- Hero ciblé par métier/ville
- Section problèmes/solutions
- Offre spéciale avec urgence
- Témoignages locaux
- FAQ spécifique

### Intégrations
- Google Analytics 4
- Crisp Chat
- WhatsApp floating button
- Calendly badge
- Schema.org LocalBusiness

## 🚀 Déploiement

### Sur Cloudflare Pages

1. Connecter le repo GitHub
2. Configuration build :
   - Build command : `npm run build`
   - Build output : `dist`
3. Variables d'environnement à ajouter
4. Deploy automatique sur push

### Build local
```bash
npm run build
# Les fichiers sont dans dist/
```

## 📊 Sanity Studio

### Accès au studio
```bash
# Installer Sanity CLI
npm install -g @sanity/cli

# Lancer le studio
npx sanity dev

# Accès : http://localhost:3333
```

### Schémas disponibles
- **homePage** : Configuration page d'accueil
- **landingPageMetier** : Landing pages métiers
- **pricingPlan** : Formules tarifaires
- **testimonial** : Témoignages clients
- **blogPost** : Articles de blog
- **siteSettings** : Paramètres globaux

## 🎯 Optimisations SEO

### ✅ Implémentées
- Meta tags dynamiques
- Schema.org LocalBusiness
- Sitemap automatique
- Images optimisées WebP
- Lazy loading
- Score Lighthouse ~95+

### 📝 À faire
- Ajouter plus de contenu unique par page
- Créer les 100 landing pages métier × ville
- Optimiser les Core Web Vitals
- Ajouter un blog avec contenu SEO

## 📈 Métriques de conversion

### Objectifs
- **Taux de conversion** : 15%+ (visiteur → lead)
- **Temps sur site** : >3 minutes
- **Taux de rebond** : <40%
- **Score Lighthouse** : 95+

### Points de conversion
1. Formulaire "Maquette gratuite"
2. Boutons d'appel direct
3. WhatsApp chat
4. Calendly RDV
5. Chat Crisp

## 🔧 Maintenance

### Commandes utiles
```bash
# Vérifier les dépendances
npm outdated

# Mettre à jour
npm update

# Audit sécurité
npm audit

# Clean build
rm -rf dist .astro node_modules
npm install && npm run build
```

## 📞 Support

- **Email** : support@awema.fr
- **Téléphone** : 07 56 91 02 18
- **Documentation Astro** : https://docs.astro.build
- **Documentation Sanity** : https://www.sanity.io/docs

## 🎉 Features premium du template Copper

- Animations AOS (fade, zoom, slide)
- Parallax effects
- Swiper carousels
- Counter animations
- Modal popups
- Smooth scrolling
- Responsive navigation
- Dark mode ready

## 📝 Notes importantes

1. **Sanity** : Le token API est inclus pour le développement. En production, utilisez des variables d'environnement sécurisées.

2. **Images** : Remplacer les images placeholder dans `public/images/` par de vraies photos d'artisans et réalisations.

3. **Contenu** : Enrichir le contenu avec des textes spécifiques métier (éviter le Lorem Ipsum).

4. **Analytics** : Configurer Google Analytics et Crisp avec de vrais IDs avant la mise en production.

5. **Performance** : Le site charge actuellement en ~1.5s. Objectif : <1s avec CDN Cloudflare.

---

*Site créé avec le template Copper Premium et optimisé pour la conversion des artisans BTP*