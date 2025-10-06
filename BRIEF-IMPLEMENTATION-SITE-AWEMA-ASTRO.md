# 🚀 BRIEF COMPLET - IMPLÉMENTATION SITE AWEMA.FR AVEC ASTRO

## 📋 MISSION DE L'AGENT

Transformer le template **BigSpring** (ThemeFisher) en site haute conversion pour AWEMA en utilisant Astro v5, avec toutes les landing pages, CTAs et funnel de conversion optimisés.

---

## 🎯 OBJECTIFS BUSINESS

### KPIs Cibles
- **Taux de conversion** : 15% (visiteur → lead)
- **Coût d'acquisition** : < 50€/client
- **Objectif CA** : 50K€/mois en 6 mois
- **MRR cible** : 22K€/mois

### Positionnement
- **Agence premium** pour artisans BTP
- **Prix** : Setup 1490-4990€ + 79-249€/mois
- **Promesse** : Site pro en 48h, résultats garantis

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack Obligatoire
```javascript
// Frontend
- Astro v5.7+ (SSG)
- Template BigSpring (ThemeFisher)
- Tailwind CSS v3
- Alpine.js (interactions)

// Intégrations
- Calendly (RDV)
- Crisp Chat (support)
- Google Analytics 4
- Google Ads Conversion
- Facebook Pixel
- Hotjar (heatmaps)

// Email & CRM
- Brevo (email automation)
- Pipedrive/HubSpot CRM
- Make/Zapier (workflows)

// Hosting
- Cloudflare Pages (gratuit)
- CDN mondial
- SSL automatique
```

---

## 📄 PAGES À CRÉER

### 1. Homepage (`/`)

#### Hero Section
```html
<!-- Headline Principal -->
<h1>Votre Site Web Professionnel en 48h</h1>
<h2>À partir de 97€/mois - Sans Frais Cachés</h2>

<!-- Sous-titre -->
<p>AWEMA crée des sites qui génèrent vraiment des clients
pour les artisans du BTP. +300 sites livrés.</p>

<!-- Trust Badges -->
⭐⭐⭐⭐⭐ 4.9/5 (127 avis) | +300 sites livrés | 48h chrono

<!-- CTAs -->
<button primary>Je veux ma maquette gratuite</button>
<button secondary>Découvrir les prix</button>
```

#### Sections Obligatoires
1. **Stats Bar** : +300 sites | 48h délai | 4.9/5 | 0€ technique
2. **Process 3 étapes** : Design → Production → Clients
3. **Demo Interactive** : Iframe avec switching métiers
4. **Pricing Table** : 3 formules avec CTA
5. **Testimonials** : 3 minimum avec photos
6. **Garanties** : 4 badges de réassurance
7. **CTA Footer** : Urgence avec timer

### 2. Landing Pages Métiers (`/site-internet-{metier}-{ville}`)

#### Structure Type
```markdown
# H1: Site Internet {Métier} {Ville} - 97€/mois

## Hero Ultra Ciblé
"{Métiers} de {Ville} : Doublez vos Devis
avec un Site Pro qui Convertit"

✓ 1er sur "{métier} {ville}" en 60 jours
✓ Formulaire de devis intégré
✓ Urgences 24/7 mis en avant

[CTA: Voir ma Maquette Gratuite en 24h]

## Problèmes/Solutions Spécifiques
## Démo Vidéo (2 min)
## Témoignages Métier
## Offre Spéciale Limitée
## FAQ Métier
```

#### Métiers à Créer
- plombier
- electricien
- menuisier
- macon
- paysagiste
- carreleur
- peintre
- chauffagiste
- couvreur
- serrurier

#### Villes Prioritaires
- lyon
- paris
- marseille
- toulouse
- nice
- nantes
- strasbourg
- montpellier
- bordeaux
- lille

**Total : 100 landing pages** (10 métiers × 10 villes)

### 3. Page Tarifs (`/tarifs`)

#### Tableau Comparatif Détaillé
```javascript
const plans = [
  {
    name: "STARTER",
    setup: "1 490€",
    monthly: "79€/mois",
    features: [
      "Site 5 pages",
      "Optimisé Google",
      "Formulaire contact",
      "Hébergement inclus",
      "Support email 48h",
      "1 modification/mois"
    ],
    cta: "Commander",
    popular: false
  },
  {
    name: "BUSINESS",
    setup: "2 990€",
    monthly: "149€/mois",
    features: [
      "Site 10-15 pages",
      "Réservation en ligne",
      "Blog intégré",
      "Photos professionnelles",
      "Support prioritaire 24h",
      "3 modifications/mois"
    ],
    cta: "Plus Populaire",
    popular: true,
    badge: "Recommandé"
  },
  {
    name: "PREMIUM",
    setup: "4 990€",
    monthly: "249€/mois",
    features: [
      "Site illimité",
      "E-commerce",
      "Multi-langues",
      "Support premium 4h",
      "Modifications illimitées",
      "Appel stratégique mensuel"
    ],
    cta: "Commander",
    popular: false
  }
];
```

### 4. Page Portfolio (`/realisations`)

```javascript
// Structure portfolio
const projects = [
  {
    title: "Plomberie Express Lyon",
    metier: "plombier",
    ville: "lyon",
    image: "/demos/plombier-lyon.jpg",
    results: "+32 clients en 2 mois",
    url: "https://demo-plombier.awema.fr",
    template: "sydney"
  },
  // ... 30+ exemples
];
```

### 5. Page Fonctionnalités (`/fonctionnalites`)

Liste complète avec icônes :
- Réservation en ligne
- Devis automatiques
- Chat WhatsApp intégré
- Galerie photos/vidéos HD
- Avis Google intégrés
- Blog SEO optimisé
- Multi-langues
- Paiement en ligne

### 6. Page À Propos (`/a-propos`)

- Story AWEMA
- Équipe avec photos
- Chiffres clés (+300 sites, 98% satisfaction)
- Certifications et partenariats

### 7. Blog SEO (`/blog`)

Articles à créer :
- "Comment avoir plus de clients en {métier}"
- "Combien coûte un site de {métier}"
- "SEO local pour {métier} : le guide complet"
- "{Métier} : les erreurs à éviter sur votre site"
- "Pourquoi 87% des {métiers} ratent leur site web"

---

## 🎨 ÉLÉMENTS DE CONVERSION

### Popups & Modals
```javascript
// Exit Intent Popup
setTimeout(() => {
  if (userIsLeaving) {
    showPopup({
      title: "Attendez ! Votre maquette gratuite",
      offer: "-30% si vous restez",
      cta: "Obtenir ma maquette"
    });
  }
}, 30000);

// Chat Proactif
setTimeout(() => {
  openChat("Bonjour ! Besoin d'aide pour votre site ?");
}, 45000);
```

### Urgence & Rareté
- Timer countdown "Offre expire dans 48h"
- "Plus que 3 créneaux cette semaine"
- "17 personnes regardent cette page"
- Badge "Offre limitée"

### Social Proof
- Widget avis Google en temps réel
- Compteur "23 sites créés ce mois"
- Notifications "Pierre de Lyon vient de commander"
- Logos clients reconnus

### Trust Badges
- "Satisfait ou Remboursé 30 jours"
- "Sans engagement"
- "0€ de frais techniques"
- "Propriété 100% à vous"

---

## 📧 SÉQUENCES EMAIL AUTOMATISÉES

### Email 1 - Maquettes (H+1)
```
Objet: 🎨 {Prénom}, vos 3 maquettes sont prêtes !

Bonjour {Prénom},

Voici vos 3 propositions pour {BusinessName} :

🔷 Design Modern Pro : [VOIR]
🔶 Design Premium : [VOIR]
🔵 Design Trust : [VOIR]

🎁 -30% si vous validez aujourd'hui

[Choisir ma Maquette →]

PS: 8 artisans regardent aussi ces maquettes.
```

### Email 2 - Urgence (J+1)
```
Objet: ⏰ Un concurrent vient de commander...

{Prénom},

Un {Métier} de {Ville} vient de valider son site.

Google ne met qu'UN seul site en #1.

[Réserver ma Place →]

L'offre -30% expire ce soir.
```

### Email 3 - Social Proof (J+3)
```
Objet: 📈 Comment Pierre a doublé son CA

Pierre a doublé son CA en 3 mois avec son site AWEMA.

Stats exactes :
• #1 sur Google
• 1847 visiteurs/mois
• 67 demandes de devis
• 15 nouveaux clients/mois

[Je veux les mêmes résultats →]
```

---

## 📊 TRACKING & ANALYTICS

### Tags à Implémenter
```javascript
// Google Analytics 4
gtag('event', 'view_mockup', {
  metier: 'plombier',
  ville: 'lyon',
  template: 'sydney'
});

// Facebook Pixel
fbq('track', 'Lead', {
  value: 2990,
  currency: 'EUR',
  metier: 'plombier'
});

// Google Ads Conversion
gtag('event', 'conversion', {
  'send_to': 'AW-123456789/AbC-D_efG',
  'value': 2990.0,
  'currency': 'EUR'
});
```

### Events à Tracker
- form_start
- form_submit
- mockup_view
- pricing_view
- calendly_book
- chat_open
- phone_click
- email_click

---

## 🔄 INTÉGRATIONS APIS

### Calendly
```javascript
// Widget Calendly
Calendly.initInlineWidget({
  url: 'https://calendly.com/awema/demo-30min',
  parentElement: document.getElementById('calendly-inline'),
  prefill: {
    name: formData.name,
    email: formData.email,
    customAnswers: {
      a1: formData.metier,
      a2: formData.ville
    }
  }
});
```

### Brevo (Email)
```javascript
// API Brevo
const brevo = new Brevo({
  apiKey: process.env.BREVO_API_KEY
});

await brevo.sendTransacEmail({
  templateId: 1, // Template "Maquettes Prêtes"
  to: [{email: client.email, name: client.name}],
  params: {
    NAME: client.name,
    BUSINESS: client.business,
    MOCKUP_URLS: mockupUrls
  }
});
```

### Crisp Chat
```javascript
// Configuration Crisp
window.$crisp = [];
window.CRISP_WEBSITE_ID = "YOUR_WEBSITE_ID";

$crisp.push(["set", "user:nickname", formData.name]);
$crisp.push(["set", "session:data", [[
  ["metier", formData.metier],
  ["ville", formData.ville],
  ["budget", formData.budget]
]]]);
```

---

## 🚀 FORMULAIRES

### Formulaire Principal (Maquette Gratuite)
```html
<form id="form-maquette">
  <!-- Étape 1: Contact -->
  <input type="text" name="name" placeholder="Nom complet" required>
  <input type="email" name="email" placeholder="Email" required>
  <input type="tel" name="phone" placeholder="Téléphone" required>

  <!-- Étape 2: Business -->
  <input type="text" name="business" placeholder="Nom de votre entreprise">
  <select name="metier" required>
    <option value="">Votre métier</option>
    <option value="plombier">Plombier</option>
    <!-- ... -->
  </select>
  <input type="text" name="ville" placeholder="Votre ville">

  <!-- Étape 3: Besoins -->
  <select name="budget">
    <option value="starter">Starter (97€/mois)</option>
    <option value="business">Business (149€/mois)</option>
    <option value="premium">Premium (249€/mois)</option>
  </select>

  <textarea name="message" placeholder="Décrivez votre projet"></textarea>

  <button type="submit">Recevoir mes 3 Maquettes Gratuites</button>
</form>
```

---

## 📱 RESPONSIVE & PERFORMANCE

### Breakpoints Obligatoires
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Optimisations Performance
- Images WebP avec fallback
- Lazy loading sur toutes images
- Critical CSS inline
- Fonts préchargées
- Bundle < 100KB
- Score Lighthouse 100/100

---

## 🎯 MOTS-CLÉS SEO PRIORITAIRES

### Keywords Principaux
- "création site internet {métier}"
- "site web {métier} {ville}"
- "site internet artisan"
- "agence web BTP"
- "site vitrine {métier}"
- "refonte site {métier}"

### Longue Traîne
- "combien coute site internet {métier}"
- "meilleur site web pour {métier}"
- "comment avoir plus clients {métier}"
- "site internet {métier} pas cher"
- "création site {métier} {ville}"

---

## ✅ CHECKLIST DE LIVRAISON

### Avant Mise en Production
- [ ] Toutes les pages créées (homepage + 100 landings)
- [ ] Formulaires testés et fonctionnels
- [ ] Tracking GA4 + Ads configuré
- [ ] Emails automatisés configurés
- [ ] Chat Crisp installé
- [ ] Calendly intégré
- [ ] SSL activé
- [ ] Redirections 301 en place
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] Score Lighthouse 100/100
- [ ] RGPD compliant
- [ ] Tests sur tous navigateurs
- [ ] Version mobile parfaite

### Post-Launch
- [ ] Google Search Console
- [ ] Campagnes Google Ads
- [ ] Pixel Facebook actif
- [ ] Monitoring uptime
- [ ] Backup automatique
- [ ] A/B testing CTAs

---

## 📞 CONTACTS & RESSOURCES

### APIs & Services
- **Cloudflare**: Account ID `596a12cfcd7eeda376f77b030d19aff5`
- **Netlify**: Token `nfp_x8tkR52sgdiX7XjaaymBmspi6DPSAe8Vf5b2`
- **Sanity**: Token `skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf`
- **Email SMTP**: `noreply@awema.fr` / `!Vesper1!`

### Templates BigSpring
- Download: https://themefisher.com/products/bigspring
- Demo: https://demo.themefisher.com/bigspring/
- Docs: https://docs.themefisher.com/bigspring/

### Ressources Design
- Icons: Heroicons, Tabler Icons
- Images: Unsplash API
- Fonts: Inter, Cal Sans

---

**CE BRIEF CONTIENT TOUT LE NÉCESSAIRE POUR CRÉER LE SITE AWEMA HAUTE CONVERSION**

*L'agent doit suivre ce brief à la lettre pour générer un site qui convertit à 15%+ et génère 50K€/mois*