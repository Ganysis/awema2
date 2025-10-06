# 🧪 GUIDE COMPLET - AGENT DE TEST AWEMA V2

## 📋 QUE PEUT TESTER L'AGENT ?

### 1️⃣ **TESTS DE GÉNÉRATION DE TEMPLATES HTML**

#### Ce qui est testé :
- ✅ **Présence des templates modulaires** (10 templates)
  - plombier-urgence-modulaire.ts
  - electricien-swiss-modulaire.ts
  - menuisier-artisan-modulaire.ts
  - architecte-moderne-modulaire.ts
  - Et 6 autres...

- ✅ **Présence des templates non-modulaires** (20 templates)
  - Templates architecte (3)
  - Templates corporate (4)
  - Templates par métier (11)
  - Utilitaires (2)

- ✅ **Génération via API** (si serveur actif)
  - POST /api/generate-site
  - POST /api/generate-multi-page
  - POST /api/generate-plombier-modulaire

#### Comment vérifier :
```bash
# L'agent vérifie automatiquement :
- /lib/templates/*.ts (30 fichiers)
- /lib/templates/base/template-modulaire-base.ts
- /lib/templates/base/sections-library.ts
```

---

### 2️⃣ **TESTS DU SYSTÈME CMS**

#### Ce qui est testé :
- ✅ **Services CMS essentiels**
  - cms-injector.service.ts (injection dans HTML)
  - supabase-cms.service.ts (backend persistance)
  - cms-integration.service.ts (intégration globale)
  - cms-template-bridge.service.ts (bridge HTML/CMS)

- ✅ **Configuration Supabase**
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY
  - SUPABASE_SERVICE_ROLE_KEY

- ✅ **Fonctionnalités CMS** (si configuré)
  - Injection data-cms dans HTML
  - Sauvegarde automatique
  - Versioning
  - Multi-tenant

#### Comment configurer :
```bash
# 1. Copier le fichier exemple
cp apps/studio/.env.example apps/studio/.env.local

# 2. Ajouter vos clés Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxxx...
```

---

### 3️⃣ **TESTS DE DÉPLOIEMENT**

#### Ce qui est testé :
- ✅ **Service Netlify principal**
  - netlify-deploy-correct.service.ts (seul service conservé)
  - Suppression des 6 versions redondantes

- ✅ **Export statique**
  - static-export-simplified.ts
  - export-service-fixed.ts
  - Génération HTML/CSS/JS

- ✅ **Configuration Netlify**
  - NETLIFY_AUTH_TOKEN
  - NETLIFY_SITE_ID

#### Comment déployer :
```bash
# 1. Configurer le token Netlify
NETLIFY_AUTH_TOKEN=nfp_xxxxx...

# 2. L'agent teste automatiquement :
- Présence du service
- Token configuré
- Export fonctionnel
```

---

### 4️⃣ **TESTS DES ENDPOINTS API**

#### Endpoints testés automatiquement :
```javascript
// APIs de base
GET  /api/projects      // Liste des projets
GET  /api/clients       // Liste des clients
POST /api/projects      // Créer un projet
GET  /api/export        // Export HTML

// APIs de génération
POST /api/generate-site              // Site complet
POST /api/generate-multi-page        // Site multi-pages
POST /api/generate-plombier-modulaire // Template spécifique

// APIs CMS
POST /api/cms/save      // Sauvegarder contenu
GET  /api/cms/load      // Charger contenu
POST /api/cms/export-deploy // Export + déploiement

// APIs workflow
POST /api/workflow/start    // Démarrer workflow
GET  /api/workflow/status   // Status workflow
```

#### Comment tester les APIs :
```bash
# 1. Démarrer le serveur
cd /home/Ganyc/Desktop/awema/awema2/apps/studio
npm run dev

# 2. L'agent teste automatiquement chaque endpoint
# et rapporte le status HTTP (200, 404, 500...)
```

---

### 5️⃣ **TESTS DE BUILD**

#### Ce qui est testé :
- ✅ **Build Next.js complet**
  - Compilation TypeScript
  - Build des pages
  - Génération statique
  - Optimisations

- ✅ **Packages monorepo**
  - @awema/shared
  - @awema/templates
  - @awema/studio
  - 13 packages au total

#### Erreurs détectées :
```bash
# L'agent détecte :
- Erreurs TypeScript
- Imports manquants
- Dépendances cassées
- Timeout de build (>2min)
```

---

### 6️⃣ **TESTS DE PERFORMANCE**

#### Métriques analysées :
- ✅ **Taille des répertoires**
  - /public (actuellement 53MB - ⚠️ trop gros)
  - /lib/services (2.6MB - ✅ ok)
  - /lib/templates (1.9MB - ✅ ok)

- ✅ **Nombre de fichiers**
  - 124 services (.ts)
  - 30 templates (.ts)
  - 2,060 fichiers HTML générés

- ✅ **Recommandations**
  - Si /public > 50MB → Nettoyage recommandé
  - Si services > 150 → Consolidation suggérée
  - Si build > 2min → Optimisation nécessaire

---

## 🚀 COMMENT UTILISER L'AGENT

### Installation et lancement :
```bash
# 1. Se placer dans le bon répertoire
cd /home/Ganyc/Desktop/awema/awema2

# 2. Lancer l'agent de test
cd apps/studio && node test-agent-a-z.js

# 3. Attendre 30-60 secondes pour tous les tests
```

### Options avancées :
```bash
# Tester avec serveur actif
npm run dev &  # Démarrer le serveur en arrière-plan
node test-agent-a-z.js  # Lancer les tests

# Tester une catégorie spécifique (modifier le code)
// Dans test-agent-a-z.js, commenter les tests non désirés :
// await testTemplateGeneration();  // ✅ Garder
// await testCMSSystem();           // ✅ Garder
// await testDeploymentSystem();    // ❌ Ignorer
```

---

## 📊 COMPRENDRE LE RAPPORT

### Structure du rapport :
```
============================================================
  1️⃣  TEST GÉNÉRATION TEMPLATES HTML
============================================================
✅ Import template modulaire: trouvé
⚠️ Génération API: serveur non accessible
✅ Inventaire templates: 30 total

[Répété pour chaque catégorie...]

📊 RAPPORT FINAL
============================================================
Score par catégorie:
  Templates: 67% (2/3 succès)
  CMS: 75% (3/4 succès)
  ...

🚫 POINTS DE BLOCAGE:
  ❌ Build - Erreur compilation

⚠️ RECOMMANDATIONS:
  ⚠️ Configurer Supabase
  ⚠️ Nettoyer /public

🎯 SCORE GLOBAL: 50%
```

### Interprétation des scores :
- **80-100%** ✅ Production ready
- **60-79%** 🟡 Fonctionnel avec warnings
- **40-59%** 🟠 Problèmes à corriger
- **0-39%** 🔴 Blocages critiques

---

## 🔧 RÉSOUDRE LES PROBLÈMES COURANTS

### Problème : "API non disponible"
```bash
# Solution : Démarrer le serveur
cd apps/studio
npm run dev
# Puis relancer l'agent dans un autre terminal
```

### Problème : "Build failed"
```bash
# Solution : Corriger les erreurs TypeScript
npm run type-check  # Voir les erreurs
# Corriger les imports manquants
# Relancer l'agent
```

### Problème : "Variables non configurées"
```bash
# Solution : Créer .env.local
cp .env.example .env.local
# Éditer et ajouter vos clés
nano .env.local
```

### Problème : "/public trop gros"
```bash
# Solution : Nettoyer les fichiers générés
rm -rf public/generated-sites/*
rm -rf public/demo-sites/*
# Garder seulement quelques exemples
```

---

## 📈 ÉVOLUTION DE L'AGENT

### Fonctionnalités futures possibles :
- Tests E2E avec Playwright
- Tests de performance Lighthouse
- Tests d'accessibilité
- Tests de sécurité
- Génération de code coverage
- Intégration CI/CD

### Pour étendre l'agent :
```javascript
// Ajouter un nouveau test dans test-agent-a-z.js :
async function testNewFeature() {
  logSection('🆕 TEST NOUVELLE FONCTIONNALITÉ');
  
  try {
    // Votre logique de test
    addTestResult('Nouvelle', 'Mon test', 'success', 'Détails');
  } catch (error) {
    addTestResult('Nouvelle', 'Mon test', 'error', error.message);
  }
}

// L'ajouter dans runAllTests() :
await testNewFeature();
```

---

## 📁 FICHIERS DE L'AGENT

- **`apps/studio/test-agent-a-z.js`** - Code source de l'agent
- **`TEST-REPORT-[DATE].json`** - Rapports JSON sauvegardés
- **`TEST-PLAN-A-Z.md`** - Checklist manuelle des tests
- **`GUIDE-AGENT-TEST.md`** - Ce guide

L'agent est conçu pour être **simple**, **rapide** et **informatif**. Il donne une vue d'ensemble de la santé du projet en moins d'une minute !