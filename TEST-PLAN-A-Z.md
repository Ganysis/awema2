# 🧪 PLAN DE TEST COMPLET AWEMA 2.0 - De A à Z

## 📋 CHECKLIST GLOBALE

### ✅ Phase 1 : Test de Génération de Site
- [ ] Formulaire 275 champs
- [ ] Génération template
- [ ] Injection de contenu
- [ ] Multi-pages
- [ ] SEO & Performance

### ✅ Phase 2 : Test du CMS
- [ ] Upload photos
- [ ] Catégories & métadonnées
- [ ] Édition contenu
- [ ] Synchronisation
- [ ] Auto-save

### ✅ Phase 3 : Test de Déploiement
- [ ] Export statique
- [ ] Netlify deploy
- [ ] Supabase sync
- [ ] Domaine personnalisé
- [ ] SSL & CDN

---

## 🚀 ÉTAPE 1 : PRÉPARATION ENVIRONNEMENT

### 1.1 Vérifier les dépendances
```bash
# Vérifier Node.js
node --version  # >= 18.0.0

# Vérifier les packages
cd /home/Ganyc/Desktop/awema/awema2/apps/studio
npm list
```

### 1.2 Variables d'environnement
```bash
# Vérifier .env
cat .env | grep -E "RESEND|SUPABASE|NETLIFY"
```

### 1.3 Démarrer le serveur
```bash
npm run dev
# Ouvrir http://localhost:3000
```

---

## 🎨 ÉTAPE 2 : TEST GÉNÉRATION DE SITE

### 2.1 Créer un projet test complet
```javascript
// Aller à : http://localhost:3000/test-generation
// Ou créer via API :

const testData = {
  // INFORMATIONS BUSINESS
  business: {
    name: "Pro Plomberie Express",
    type: "plombier",
    description: "Expert plomberie depuis 15 ans",
    slogan: "Votre confort, notre priorité",
    values: ["Rapidité", "Qualité", "Transparence"],
    story: "Entreprise familiale créée en 2009...",
    certifications: ["Qualibat", "RGE", "Artisan d'Art"],
    garanties: ["Garantie décennale", "Assurance RC Pro"],
    experience: "15 ans"
  },

  // SERVICES (minimum 3)
  services: [
    {
      title: "Dépannage urgence",
      description: "Intervention 24/7 en moins de 30min",
      price: "À partir de 89€",
      duration: "30min - 2h",
      icon: "🔧"
    },
    {
      title: "Installation sanitaire",
      description: "Pose complète salle de bain",
      price: "Sur devis",
      duration: "2-5 jours",
      icon: "🚿"
    },
    {
      title: "Rénovation",
      description: "Modernisation plomberie ancienne",
      price: "Sur devis",
      duration: "1-2 semaines",
      icon: "🏠"
    }
  ],

  // CONTACT
  contact: {
    phone: "01 42 42 42 42",
    mobile: "06 12 34 56 78",
    email: "contact@pro-plomberie.fr",
    address: "123 rue de la République",
    city: "Paris",
    zip: "75008",
    emergency: true,
    whatsapp: true
  },

  // ZONE D'INTERVENTION
  coverage: {
    main_city: "Paris",
    department: "75",
    cities: ["Paris 8", "Paris 16", "Paris 17", "Neuilly"],
    radius: "20km"
  },

  // HORAIRES
  hours: {
    lundi: { open: "08:00", close: "19:00" },
    mardi: { open: "08:00", close: "19:00" },
    mercredi: { open: "08:00", close: "19:00" },
    jeudi: { open: "08:00", close: "19:00" },
    vendredi: { open: "08:00", close: "19:00" },
    samedi: { open: "09:00", close: "17:00" },
    dimanche: { closed: true, emergency: true }
  },

  // STYLE & DESIGN
  style: {
    template: "corporate-premium",
    primaryColor: "#2563eb",
    secondaryColor: "#10b981",
    font: "Inter",
    animations: true,
    darkMode: false
  },

  // SEO
  seo: {
    title: "Plombier Paris 8 - Dépannage Urgence 24/7",
    description: "Expert plomberie à Paris 8e. Intervention rapide, devis gratuit. ☎️ 01 42 42 42 42",
    keywords: ["plombier paris", "dépannage plomberie", "urgence fuite"],
    localKeywords: ["plombier paris 8", "plomberie neuilly"],
    competitors: ["leroy-merlin.fr", "plombier.com"]
  },

  // TÉMOIGNAGES
  testimonials: [
    {
      author: "Marie D.",
      rating: 5,
      text: "Intervention rapide et efficace. Je recommande !",
      date: "2024-12-15"
    },
    {
      author: "Jean P.",
      rating: 5,
      text: "Excellent travail, équipe professionnelle",
      date: "2024-11-20"
    }
  ],

  // GALERIE
  gallery: [
    {
      title: "Rénovation salle de bain",
      category: "renovation",
      before: "/images/before1.jpg",
      after: "/images/after1.jpg"
    }
  ],

  // OPTIONS
  options: {
    blog: true,
    gallery: true,
    testimonials: true,
    faq: true,
    newsletter: true,
    chatbot: false,
    booking: false
  }
};

// Envoyer à l'API
fetch('/api/generate-site', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(testData)
});
```

### 2.2 Points de vérification
- [ ] **Structure** : Toutes les pages générées (index, services, about, contact, blog)
- [ ] **Contenu** : Aucune section vide, tous les {{}} remplacés
- [ ] **Images** : Placeholders si pas d'images fournies
- [ ] **Responsive** : Test sur mobile/tablet/desktop
- [ ] **Footer** : Présence de "Site créé par AWEMA"

---

## 🎯 ÉTAPE 3 : TEST INJECTION INTELLIGENTE

### 3.1 Tester les fallbacks
```javascript
// Test avec données manquantes
const minimalData = {
  business: { name: "Test Minimal" },
  contact: { phone: "01 23 45 67 89" }
};

// Vérifier que le système :
// 1. Utilise les defaults métier
// 2. Génère du contenu IA si configuré
// 3. Ne laisse JAMAIS de sections vides
```

### 3.2 Vérifier l'adaptation responsive
- [ ] Si 1 seul service → centrage correct
- [ ] Si 2 boutons CTA → disposition côte à côte
- [ ] Si galerie vide → section masquée proprement
- [ ] Grilles adaptatives selon contenu

---

## 📸 ÉTAPE 4 : TEST CMS ULTRA ADVANCED

### 4.1 Accéder au CMS
```bash
# Ouvrir dans le navigateur
http://localhost:3000/test-cms-ultra

# Cliquer sur "Charger le CMS Ultra Advanced"
```

### 4.2 Test Catégories Photos
1. **Créer catégories**
   - [ ] Cliquer "+ Nouvelle Catégorie"
   - [ ] Nom : "Réalisations"
   - [ ] Couleur : Bleu
   - [ ] Icône : 🏗️
   - [ ] Vérifier compteur (0)

2. **Supprimer catégorie**
   - [ ] Survol → X apparaît
   - [ ] Confirmation suppression
   - [ ] Photos réassignées à "Sans catégorie"

### 4.3 Test Upload Photos
1. **Drag & Drop**
   - [ ] Glisser 3-5 images
   - [ ] Vérifier preview
   - [ ] Limite 10MB respectée

2. **Métadonnées**
   - [ ] Éditer une photo (crayon)
   - [ ] Titre : "Rénovation cuisine moderne" (max 60 car)
   - [ ] Description : "Transformation complète..." (max 160 car)
   - [ ] Alt text : "cuisine-renovee-moderne"
   - [ ] Catégorie : "Réalisations"
   - [ ] Tags : "cuisine, moderne, rénovation"

### 4.4 Test Organisation
- [ ] Drag & drop pour réorganiser
- [ ] Filtrage par catégorie
- [ ] Suppression rapide
- [ ] Compteurs mis à jour

### 4.5 Test Autres Sections
- [ ] **Blog** : Créer un article test
- [ ] **SEO** : Ajouter mots-clés
- [ ] **Horaires** : Modifier planning
- [ ] **Légal** : Remplir SIRET/TVA

### 4.6 Test Synchronisation
- [ ] Vérifier localStorage (F12 → Application → Local Storage)
- [ ] Recharger page → données persistantes
- [ ] Auto-save après 30 secondes

---

## 🚀 ÉTAPE 5 : TEST PERFORMANCE & SEO

### 5.1 Lighthouse
```bash
# Dans Chrome DevTools
1. F12 → Lighthouse
2. Cocher toutes les catégories
3. Mobile + Throttling 4G
4. Generate report

# Scores attendus :
✅ Performance > 95
✅ Accessibility > 95
✅ Best Practices > 95
✅ SEO > 95
```

### 5.2 Vérifications SEO
```html
<!-- Vérifier dans le code source -->
- [ ] <title> unique et optimisé
- [ ] <meta description> présente
- [ ] Open Graph tags
- [ ] Schema.org LocalBusiness
- [ ] Sitemap.xml généré
- [ ] Robots.txt correct
```

### 5.3 Test Vitesse
```bash
# PageSpeed Insights
https://pagespeed.web.dev/
→ Entrer l'URL du site test
→ Score mobile > 90

# GTmetrix
https://gtmetrix.com/
→ Grade A attendu
```

---

## 🌐 ÉTAPE 6 : TEST DÉPLOIEMENT

### 6.1 Export Statique
```bash
# Générer build production
npm run build

# Vérifier dossier out/
ls -la out/
# Doit contenir : HTML, CSS, JS, images optimisées
```

### 6.2 Test Local Build
```bash
# Servir le build localement
npx serve out -p 5000

# Ouvrir http://localhost:5000
# Vérifier que tout fonctionne
```

### 6.3 Configuration Netlify (si compte disponible)
```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy test
netlify deploy --dir=out

# Deploy production
netlify deploy --prod --dir=out
```

### 6.4 Test Supabase (si configuré)
```javascript
// Test connexion
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Test écriture
const { data, error } = await supabase
  .from('cms_data')
  .insert({ site_id: 'test-1', data: testData });

console.log('Success:', !error);
```

---

## 📊 ÉTAPE 7 : VALIDATION FINALE

### 7.1 Checklist Complète
```markdown
## GÉNÉRATION
✅ Site multi-pages généré
✅ Aucune section vide
✅ Footer avec crédit AWEMA
✅ Responsive parfait
✅ Images optimisées

## CMS
✅ Upload fonctionnel
✅ Catégories créées
✅ Métadonnées éditées
✅ Synchronisation OK
✅ Persistance données

## PERFORMANCE
✅ Lighthouse > 95
✅ Temps chargement < 2s
✅ Images WebP
✅ CSS/JS minifiés
✅ Gzip activé

## SEO
✅ Meta tags complets
✅ Schema.org présent
✅ Sitemap généré
✅ Content > 2000 mots
✅ Alt texts images

## DÉPLOIEMENT
✅ Build sans erreur
✅ Export statique OK
✅ Preview fonctionnel
✅ Config DNS ready
✅ SSL automatique
```

### 7.2 Rapport de Test
```javascript
// Générer rapport automatique
const testReport = {
  date: new Date().toISOString(),
  version: "AWEMA 2.0",
  tests: {
    generation: { passed: true, score: 100 },
    cms: { passed: true, score: 95 },
    performance: { passed: true, lighthouse: 96 },
    seo: { passed: true, score: 92 },
    deployment: { passed: true, time: "28s" }
  },
  issues: [],
  recommendations: [
    "Optimiser images avant upload",
    "Ajouter cache headers",
    "Implémenter PWA"
  ],
  ready_for_production: true
};

console.log('TEST REPORT:', testReport);
```

---

## 🎯 COMMANDES RAPIDES POUR TESTER

```bash
# 1. Démarrer le projet
cd /home/Ganyc/Desktop/awema/awema2/apps/studio
npm run dev

# 2. Ouvrir les pages de test
open http://localhost:3000/test-cms-ultra        # Test CMS
open http://localhost:3000/test-generation       # Test génération
open http://localhost:3000/test-world-class      # Test templates

# 3. Générer un site test via curl
curl -X POST http://localhost:3000/api/generate-site \
  -H "Content-Type: application/json" \
  -d '{"business":{"name":"Test Plombier"},"contact":{"phone":"0123456789"}}'

# 4. Vérifier les logs
tail -f .next/server/logs.txt

# 5. Build production
npm run build
npm run start

# 6. Lighthouse CLI
npx lighthouse http://localhost:3000 --view

# 7. Test API CMS
curl http://localhost:3000/api/test-cms-load
```

---

## ⚠️ PROBLÈMES COURANTS & SOLUTIONS

### Erreur : "Cannot find module"
```bash
npm install
npm run dev
```

### Erreur : "Port 3000 already in use"
```bash
lsof -i :3000
kill -9 [PID]
```

### CMS ne se charge pas
```javascript
// Vérifier console (F12)
// Si erreur CORS, ajouter dans next.config.js:
headers: [
  {
    source: '/api/:path*',
    headers: [
      { key: 'Access-Control-Allow-Origin', value: '*' }
    ]
  }
]
```

### Images trop lourdes
```bash
# Installer sharp pour optimisation
npm install sharp
```

---

## 🚀 LANCEMENT DES TESTS

**Prêt à tester ?** Suivez ces étapes dans l'ordre :

1. **Ouvrir 3 terminaux**
   - Terminal 1 : `npm run dev`
   - Terminal 2 : Logs et monitoring
   - Terminal 3 : Commandes de test

2. **Ouvrir Chrome avec DevTools**
   - F12 ouvert en permanence
   - Onglet Network pour performances
   - Onglet Console pour erreurs

3. **Documenter chaque test**
   - Screenshots des résultats
   - Copier les scores Lighthouse
   - Noter les temps de chargement

4. **Si tout est ✅**
   → Passer à la création des 10 templates !

---

*Plan de test AWEMA 2.0 - À exécuter intégralement avant production*