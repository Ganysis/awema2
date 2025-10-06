# ✅ TODO - Corrections QA AWEMA

**Date** : 2025-10-01
**Score actuel** : 90/100
**Objectif** : 98/100

---

## 🚨 CRITIQUE - À faire MAINTENANT (2 min)

### ✅ Corriger le lien cassé /a-propos
- **Fichier** : `/src/pages/index.astro` ligne 485
- **Action** : Remplacer `href="/a-propos"` par `href="/mon-histoire"`
- **Command** :
```bash
sed -i 's|href="/a-propos"|href="/mon-histoire"|g' src/pages/index.astro
```

---

## ⚠️ IMPORTANT - À faire cette semaine

### 1. Uniformiser le numéro de téléphone (30 min)
- **Action** : Garder UNIQUEMENT `06 17 54 03 83`
- **Étapes** :
  1. Ajouter dans `/src/config/config.json` :
     ```json
     "contact": {
       "phone": "06 17 54 03 83",
       "email": "contact@awema.fr"
     }
     ```
  2. Remplacer tous les numéros hardcodés par `{config.contact.phone}`
  3. Supprimer `07 56 91 02 18` et `09 72 55 35 86`

### 2. Corriger l'adresse dans contact.astro (2 min)
- **Fichier** : `/src/pages/contact.astro` ligne 232
- **Action** : Remplacer "Lyon, France" par "Velaux" ou "Aix-en-Provence"
```bash
sed -i 's|Lyon, France|Aix-en-Provence|g' src/pages/contact.astro
```

### 3. Ajouter Schema.org manquants (1h)
Ajouter des schémas sur ces 4 pages :
- `/tarifs` : Service + Offers
- `/tarifs-sites-web` : Offers détaillé avec priceSpecification
- `/realisations` : ItemList des projets
- `/contact` : ContactPage

**Template Schema Offer à ajouter** :
```javascript
{
  "@context": "https://schema.org",
  "@type": "Offer",
  "name": "Site Web Artisan BTP",
  "description": "Site vitrine professionnel pour artisan",
  "price": "697",
  "priceCurrency": "EUR",
  "priceSpecification": {
    "@type": "PriceSpecification",
    "price": "697",
    "priceCurrency": "EUR"
  }
}
```

---

## 💡 RECOMMANDÉ - À faire ce mois-ci

### 4. Créer les images manquantes (2h)
- ✅ **Optionnel** : `banner-shot-9.png` à `banner-shot-12.png` (fallback OK actuellement)
- ✅ **Important** : `/public/images/og-image.jpg` (1200x630px) pour OpenGraph
  - Créer une image avec le logo AWEMA + slogan
  - Optimiser pour partage Facebook, LinkedIn, Twitter

### 5. Enrichir Schema.org (30 min)
Ajouter `aggregateRating` sur les pages principales :
```javascript
"aggregateRating": {
  "@type": "AggregateRating",
  "ratingValue": "4.9",
  "reviewCount": "300"
}
```

### 6. Optimiser les images existantes (1h)
- Compresser les screenshots (actuellement 228-427 KB)
- Objectif : < 150 KB par image
- Outil : `imagemin` ou `sharp`

### 7. Ajouter preload pour images critiques (15 min)
Dans `/src/layouts/Base.astro` :
```html
<link rel="preconnect" href="https://images.unsplash.com" />
<link rel="dns-prefetch" href="https://images.unsplash.com" />
```

### 8. Améliorer l'accessibilité (30 min)
- Ajouter `aria-current="page"` sur le menu actif
- Ajouter un skip link : `<a href="#main-content" class="sr-only">Aller au contenu</a>`
- Vérifier le contraste des textes gris (WCAG AA)

---

## 📊 Checklist de validation

Après corrections, vérifier :

- [ ] Lien /a-propos corrigé (404 résolu)
- [ ] Un seul numéro de téléphone sur tout le site
- [ ] Adresse cohérente partout
- [ ] Schema.org présent sur les 9 pages principales
- [ ] Images OG créées et testées (Facebook debugger)
- [ ] Score Lighthouse > 95 sur toutes les pages
- [ ] Test mobile sur 3 devices (iPhone, Samsung, iPad)
- [ ] Formulaires testés (envoi + réception email)

---

## 🚀 Commandes rapides

### Test local
```bash
npm run dev
# Vérifier : http://localhost:4321
```

### Build de production
```bash
npm run build
npm run preview
```

### Vérifier les liens cassés
```bash
npx broken-link-checker http://localhost:4321 -ro
```

### Test Lighthouse
```bash
npx lighthouse http://localhost:4321 --view
```

---

## 📈 Score attendu après corrections

| Avant | Après |
|-------|-------|
| 90/100 | **98/100** |

### Gains attendus :
- Bug critique : 0 (était 1)
- Warnings : 2 (était 5)
- Schema.org : 10/10 (était 9/10)
- Images : 9/10 (était 7/10)
- Navigation : 10/10 (déjà OK)

---

**Temps total estimé** : ~5h
**Impact** : Production-ready à 100%
