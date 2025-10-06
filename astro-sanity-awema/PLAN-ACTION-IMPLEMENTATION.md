# 🚀 PLAN D'ACTION - IMPLÉMENTATION SITE AWEMA

## 📊 RÉCAP STRATÉGIE FINALE VALIDÉE

### **NOS 3 FORMULES TERRITOIRE**

| | **LOCAL** | **ZONE** ⭐ | **RÉGION** |
|---|---|---|---|
| **Prix création** | 797€ | 1297€ | 1797€ |
| **Mensuel** | 79€/mois | 97€/mois | 127€/mois |
| **Pages site** | 8-10 | 12-15 | 20+ |
| **Villes incluses** | 3 | 5 | 10 |
| **GMB optimisé** | ✅ | ✅ | ✅ |
| **Posts GMB** | 4/mois | 8/mois | 30/mois |
| **Page collecte avis** | ✅ | ✅ | ✅ |
| **Modifications** | 3/mois | 5/mois | Illimitées |
| **Support** | WhatsApp | Prioritaire | Dédié |
| **Guides business** | ✅ | ✅ | ✅ |
| **Academy** | - | ✅ | ✅ |

---

## 🎯 PLAN D'ACTION IMMÉDIAT

### ✅ **PHASE 1 : PAGES CRITIQUES** (À faire maintenant)

#### 1. **Page Tarifs Nouvelle** `/tarifs-v2.astro`
- [ ] 3 cards formules (LOCAL, ZONE, RÉGION)
- [ ] Tableau comparatif détaillé
- [ ] Section upsells (Villes+, Croissance, Conversion)
- [ ] Boutons CTA "Choisir cette formule"
- [ ] FAQ pricing en bas

#### 2. **Page Fondateur Améliorée** `/fondateur.astro`
- [ ] Ajouter section "Mes résultats GMB"
- [ ] Screenshots Google My Business réels
- [ ] Avant/Après avis clients (3→100)
- [ ] Vidéo témoignage personnel

#### 3. **Page GMB Dédiée** `/google-my-business.astro`
- [ ] Explication importance GMB (70% des leads)
- [ ] Nos services GMB détaillés
- [ ] Exemples optimisations
- [ ] Case studies avec résultats

#### 4. **Page Ressources** `/ressources.astro`
- [ ] Section guides PDF téléchargeables
- [ ] Outils Excel à download
- [ ] Liens formations vidéo
- [ ] Accès Academy (membres only)

---

### 📝 **PHASE 2 : REFONTE HOMEPAGE** (Cette semaine)

#### **Hero Section**
```astro
<h1>Le Site BTP Qui Domine Google</h1>
<p>Créé par Yann, co-gérant BTP qui a fait x10 grâce au digital</p>
<div class="badges">
  - 300+ artisans accompagnés
  - 3847 prospects générés
  - 100/100 PageSpeed
</div>
```

#### **Section Formules (simplifiée)**
```astro
<!-- 3 cards côte à côte -->
LOCAL 797€ - 3 villes
ZONE 1297€ - 5 villes ⭐
RÉGION 1797€ - 10 villes
+ Bouton "Voir le détail"
```

#### **Section GMB/Avis**
```astro
<h2>Google My Business = 70% de vos leads</h2>
<!-- Stats visuelles -->
- Avant : 3 avis, page 3 Google
- Après : 100 avis 5★, position 1
<!-- Screenshot GMB optimisé -->
```

#### **Section Preuves**
```astro
<!-- Compteurs live -->
- Sites livrés : 312 (+1/jour)
- Prospects générés : 3847 (+5/h)
- Avis Google collectés : 8726
```

#### **Section Ressources**
```astro
<h2>Rejoignez 300+ artisans qui cartonnent</h2>
<!-- Grid 2x2 -->
- 📚 Guides business offerts
- 🎓 Formations mensuelles
- 💬 Communauté WhatsApp
- 🏆 Certification Artisan Digital
```

---

### 🔧 **PHASE 3 : PAGES SERVICES** (Semaine prochaine)

#### 1. **Landing Pages Métiers** (Update)
- [ ] `/plombier` → Ajouter section GMB
- [ ] `/electricien` → Ajouter collecte avis
- [ ] `/menuisier` → Ajouter guides offerts
- [ ] Etc pour tous métiers

#### 2. **Landing Pages Villes** (Update)
- [ ] Ajouter argument "5 villes dominées"
- [ ] Maps avec zones couvertes
- [ ] Témoignages locaux

#### 3. **Page Services** (Refonte)
- [ ] Réorganiser par formules (LOCAL/ZONE/RÉGION)
- [ ] Mettre en avant GMB
- [ ] Ajouter upsells

---

### 💻 **PHASE 4 : COMPOSANTS TECHNIQUES** (Semaine 2)

#### **1. Composant Pricing Cards**
```typescript
// components/PricingCard.astro
interface Props {
  name: string; // LOCAL, ZONE, RÉGION
  price: number;
  monthly: number;
  cities: number;
  features: string[];
  popular?: boolean;
}
```

#### **2. Composant GMB Stats**
```typescript
// components/GMBStats.astro
// Affiche avant/après GMB
- Avis : 3 → 100
- Position : Page 3 → Top 1
- Appels : 5/mois → 50/mois
```

#### **3. Composant Témoignage**
```typescript
// components/TestimonialCard.astro
// Version "crédible"
- Nom entreprise réel
- Ville
- Résultats chiffrés
- Photo/logo
```

#### **4. Widget Collecte Avis**
```typescript
// components/AvisWidget.astro
// Pour intégrer sur sites clients
- QR code
- Bouton "Laisser un avis"
- Compteur avis
```

---

### 📱 **PHASE 5 : OPTIMISATIONS** (Semaine 3)

#### **SEO**
- [ ] Meta titles avec "GMB" et "Avis Google"
- [ ] Schema LocalBusiness
- [ ] Pages villes avec contenu unique
- [ ] Alt texts toutes images

#### **Performance**
- [ ] Lazy loading images
- [ ] Preload fonts
- [ ] Minify CSS/JS
- [ ] CDN assets

#### **Tracking**
- [ ] Events GA4 sur CTA
- [ ] Heatmap Clarity pages clés
- [ ] Conversion goals
- [ ] Phone call tracking

#### **A/B Testing**
- [ ] Prix affichage (797€ vs "À partir de")
- [ ] CTA ("Devis" vs "Commencer")
- [ ] Hero headline variations

---

### 📋 **PHASE 6 : CONTENUS** (Semaine 4)

#### **Guides PDF à créer**
1. [ ] Guide Avis Google Master (15 pages)
2. [ ] Guide GMB Domination (20 pages)
3. [ ] Guide Devis Parfait (10 pages)
4. [ ] Guide Photos Chantier (8 pages)
5. [ ] Guide Réseaux Sociaux BTP (25 pages)

#### **Outils Excel**
1. [ ] Dashboard Business BTP
2. [ ] Calculateur Rentabilité
3. [ ] Tracker Prospects
4. [ ] Planning Chantiers

#### **Articles Blog**
1. [ ] "Comment passer de 3 à 100 avis Google"
2. [ ] "GMB : l'arme secrète des artisans"
3. [ ] "Dominer 5 villes avec un seul site"
4. [ ] "Notre client plombier fait x10 en 6 mois"

---

## 🎯 SCRIPTS À METTRE À JOUR

### **Chat/Support**
```javascript
// Scripts de réponse
const FAQ = {
  pricing: "3 formules : LOCAL 797€ (3 villes), ZONE 1297€ (5 villes), RÉGION 1797€ (10 villes)",
  gmb: "Optimisation GMB incluse dans toutes les formules + page collecte avis",
  ressources: "Guides business offerts d'une valeur de 500€ + Academy",
  garantie: "30 jours satisfait ou remboursé + support inclus"
}
```

### **Email Templates**
- [ ] Welcome email avec liens ressources
- [ ] Onboarding GMB (credentials needed)
- [ ] Demande avis post-livraison
- [ ] Newsletter Academy mensuelle

---

## 📊 KPIs À SUIVRE

### **Métriques Acquisition**
- Taux de conversion landing → devis
- Source trafic par formule
- Coût acquisition par canal
- Taux close appels

### **Métriques Produit**
- Répartition formules (LOCAL/ZONE/RÉGION)
- Taux adoption upsells
- Ticket moyen
- MRR growth

### **Métriques Satisfaction**
- NPS clients
- Taux de churn
- Reviews Google AWEMA
- Referral rate

---

## ⏱️ TIMELINE D'EXÉCUTION

| Semaine | Actions | Priorité |
|---------|---------|----------|
| **S1** (Maintenant) | Pages tarifs, fondateur, GMB, ressources | 🔴 CRITIQUE |
| **S2** | Refonte homepage + composants | 🔴 CRITIQUE |
| **S3** | Pages services/métiers/villes | 🟠 HAUTE |
| **S4** | Optimisations SEO/Perf | 🟡 MOYENNE |
| **S5** | Contenus guides/outils | 🟡 MOYENNE |
| **S6** | Tests et ajustements | 🟢 NORMALE |

---

## ✅ CHECKLIST FINALE PRÉ-LAUNCH

### **Technique**
- [ ] Site < 1 seconde chargement
- [ ] 100/100 PageSpeed tous devices
- [ ] 0 erreur console
- [ ] Analytics configuré
- [ ] Formulaires testés

### **Contenu**
- [ ] Toutes pages relues
- [ ] Images optimisées
- [ ] Meta SEO complètes
- [ ] Liens internes cohérents
- [ ] 404 personnalisée

### **Commercial**
- [ ] Pricing clair
- [ ] FAQ complète
- [ ] Process onboarding
- [ ] Templates emails
- [ ] Scripts téléphone

### **Legal**
- [ ] CGV à jour
- [ ] RGPD compliant
- [ ] Mentions légales
- [ ] Cookies banner
- [ ] Contrats types

---

## 🚀 GO-TO-MARKET

### **Semaine de lancement**
1. **Lundi** : Nouveau site live
2. **Mardi** : Email base clients
3. **Mercredi** : Posts LinkedIn/Facebook
4. **Jeudi** : Cold calling prospects
5. **Vendredi** : Analyse metrics

### **Objectifs Mois 1**
- 20 devis qualifiés
- 8 clients signés
- 3K€ MRR
- 50 downloads guides
- 30 membres Academy

---

## 💡 RAPPEL STRATÉGIE

> **Notre positionnement unique :**
> "Le seul créateur de sites BTP qui garantit votre domination Google"
>
> **Notre avantage concurrentiel :**
> - Fondateur co-gérant BTP (légitimité)
> - Technologie moderne (Astro vs WordPress)
> - GMB inclus partout (70% des leads)
> - Page collecte avis (différenciation)
> - Ressources gratuites (fidélisation)
>
> **Notre promesse :**
> "De 3 avis page 3 → 100 avis position 1"

---

**C'EST PARTI ! 🚀**

Première action : Créer la nouvelle page tarifs `/tarifs-v2.astro`