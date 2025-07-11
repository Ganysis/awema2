# 🚀 Guide de Test - Déploiement avec CMS Supabase

## Prérequis

- Compte GitHub
- Compte Netlify (gratuit)
- Compte Supabase (gratuit)
- Node.js installé

## 📋 Étape 1 : Configuration Supabase (15 min)

### 1.1 Créer un compte Supabase

1. Aller sur https://supabase.com
2. Cliquer sur "Start your project"
3. Se connecter avec GitHub
4. Créer une nouvelle organisation (ex: "awema-test")

### 1.2 Créer un nouveau projet

1. Cliquer sur "New project"
2. Remplir :
   - **Name**: `awema-cms`
   - **Database Password**: Générer un mot de passe fort (GARDEZ-LE!)
   - **Region**: Europe (Frankfurt) `eu-central-1`
   - **Plan**: Free tier
3. Cliquer sur "Create new project" (attendre ~2 min)

### 1.3 Récupérer les clés API

Une fois le projet créé :

1. Aller dans **Settings** > **API**
2. Copier ces valeurs :
   ```
   Project URL: https://zvcvhundfeqwufmvtmzd.supabase.co
   Anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.F03jQKH5gPnggL1amanmNCaCBzhjXJaqwd-wM3FdWfM
   Service role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MjEzODc3MywiZXhwIjoyMDY3NzE0NzczfQ.eTmQmgchXQJwOyh6kWpq_7GwiR5OBww2hjxiKE_7Z0Q
   ```

### 1.4 Exécuter le schema SQL

1. Aller dans **SQL Editor** (icône terminal)
2. Cliquer sur "+ New query"
3. Copier/coller TOUT le contenu de :
   ```
   /apps/studio/lib/db/schema/supabase-tables.sql
   ```
4. Cliquer sur "Run" (ou Ctrl+Enter)
5. Vérifier : "Success. No rows returned" ✅

### 1.5 Vérifier les tables

1. Aller dans **Table Editor**
2. Vous devez voir 9 tables :
   - sites
   - cms_users
   - content
   - media
   - content_versions
   - form_submissions
   - analytics_events
   - api_tokens
   - cache_entries

## 📋 Étape 2 : Configuration Netlify (5 min)

### 2.1 Créer un compte Netlify

1. Aller sur https://app.netlify.com/signup
2. Se connecter avec GitHub

### 2.2 Générer un token d'accès

1. Aller dans **User settings** (avatar en haut à droite)
2. Cliquer sur **Applications** > **Personal access tokens**
3. Cliquer sur **New access token**
4. Donner un nom : `awema-deploy`
5. Copier le token : `nfp_xxxxxxxxxxxxx` (GARDEZ-LE!)

## 📋 Étape 3 : Configuration du projet AWEMA (10 min)

### 3.1 Créer le fichier .env.local

1. Dans le dossier `/apps/studio/`, copier `.env.local.example` vers `.env.local`
2. Éditer `.env.local` avec vos valeurs :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://[votre-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs... (votre anon key)
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIs... (votre service key)

# Netlify
NETLIFY_AUTH_TOKEN=nfp_xxxxxxxxxxxxx (votre token)

# Configuration CMS par défaut
DEFAULT_CMS_ADMIN_EMAIL=test@awema.fr
DEFAULT_CMS_ADMIN_PASSWORD=TestAwema2024!

# Le reste peut rester par défaut
```

### 3.2 Installer les dépendances

```bash
cd apps/studio
npm install @supabase/supabase-js @netlify/api
```

### 3.3 Démarrer le serveur de développement

```bash
npm run dev
```

Vérifier que le site se lance sur http://localhost:3000

## 📋 Étape 4 : Test de déploiement (15 min)

### 4.1 Créer un projet test dans l'éditeur

1. Ouvrir http://localhost:3000
2. Cliquer sur "Nouveau projet"
3. Remplir le formulaire 8 étapes :
   - **Étape 1**: Infos entreprise (ex: "Plomberie Test")
   - **Étape 2**: Coordonnées
   - **Étape 3**: Services (ajouter 2-3 services)
   - **Étape 4**: Zones d'intervention
   - **Étape 5**: Horaires
   - **Étape 6**: Photos (optionnel)
   - **Étape 7**: Réseaux sociaux (optionnel)
   - **Étape 8**: Validation

### 4.2 Sauvegarder le projet

1. Dans l'éditeur, le projet se sauvegarde automatiquement
2. Noter l'ID du projet (visible dans l'URL ou localStorage)

### 4.3 Tester l'export ZIP d'abord

1. Cliquer sur "Exporter" > "Télécharger ZIP"
2. Vérifier que le ZIP contient :
   - `index.html`
   - `admin/` (dossier CMS)
   - `assets/`
   - `.env.example`

### 4.4 Tester le déploiement via l'API

#### Option A : Via l'interface (si disponible)

1. Cliquer sur "Déployer sur Netlify"
2. Choisir le plan "Pro" (pour avoir le CMS)
3. Entrer un nom de site : `test-plomberie`
4. Cliquer sur "Déployer"

#### Option B : Via cURL (ligne de commande)

```bash
# Récupérer les données du projet depuis localStorage
# Dans la console du navigateur (F12) :
const projectData = JSON.parse(localStorage.getItem('awema-project-[ID]'));
copy(JSON.stringify(projectData));

# Puis dans le terminal :
curl -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "siteId": "test-123",
    "siteName": "test-plomberie",
    "projectData": [COLLER ICI],
    "plan": "pro",
    "adminEmail": "test@example.com"
  }'
```

#### Option C : Via un script de test

Créer `test-deploy.js` :

```javascript
async function testDeploy() {
  // Récupérer le projet depuis localStorage
  const projectId = 'VOTRE_PROJECT_ID';
  const projectData = {
    // Ou créer un projet minimal
    settings: { siteName: 'Test Plomberie' },
    pages: [{
      id: 'home',
      slug: '/',
      title: 'Accueil',
      blocks: []
    }],
    theme: {},
    businessInfo: {
      name: 'Plomberie Test',
      phone: '01 23 45 67 89',
      email: 'contact@test.fr'
    }
  };

  const response = await fetch('http://localhost:3000/api/deploy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      siteId: crypto.randomUUID(),
      siteName: 'test-plomberie-' + Date.now(),
      projectData: projectData,
      plan: 'pro'
    })
  });

  const result = await response.json();
  console.log('Résultat:', result);
}

testDeploy();
```

### 4.5 Vérifier le déploiement

Si succès, vous devez recevoir :

```json
{
  "success": true,
  "siteUrl": "https://test-plomberie.netlify.app",
  "adminUrl": "https://test-plomberie.netlify.app/admin",
  "credentials": {
    "email": "admin@test-plomberie.awema.site",
    "password": "XyZ123!@#abc"
  }
}
```

### 4.6 Tester le CMS

1. Ouvrir `adminUrl` dans le navigateur
2. Se connecter avec les `credentials` reçus
3. Vérifier que vous pouvez :
   - Voir la liste des pages
   - Éditer le contenu
   - Sauvegarder les modifications

## 📋 Étape 5 : Vérifications dans Supabase

### 5.1 Vérifier la création du site

1. Dans Supabase, aller dans **Table Editor** > **sites**
2. Vous devez voir votre site avec :
   - name: "test-plomberie"
   - plan: "pro"
   - status: "active"

### 5.2 Vérifier l'utilisateur

1. Aller dans **Authentication** > **Users**
2. Vous devez voir l'email admin créé

### 5.3 Vérifier le contenu

1. Aller dans **Table Editor** > **content**
2. Vous devez voir les pages importées

## 🐛 Dépannage

### Erreur "Service non configuré"

→ Vérifier que `.env.local` contient toutes les clés

### Erreur Supabase

→ Vérifier que le schema SQL a bien été exécuté
→ Vérifier les clés API

### Erreur Netlify

→ Vérifier le token Netlify
→ Vérifier que le nom de site est unique

### Le CMS ne se connecte pas

→ Vérifier les CORS dans Supabase (Settings > API > CORS)
→ Ajouter l'URL Netlify aux domaines autorisés

## 📊 Checklist finale

- [ ] Compte Supabase créé et configuré
- [ ] Schema SQL exécuté sans erreur
- [ ] Token Netlify généré
- [ ] Fichier .env.local configuré
- [ ] Projet test créé dans l'éditeur
- [ ] Export ZIP fonctionne
- [ ] API /deploy répond
- [ ] Site déployé sur Netlify
- [ ] CMS accessible avec les identifiants
- [ ] Données visibles dans Supabase

## 🎉 Succès !

Si tout fonctionne, vous avez :
- Un site statique hébergé sur Netlify
- Un CMS fonctionnel connecté à Supabase
- Une architecture multi-tenant scalable
- 0€ de coût d'infrastructure !

## 📞 Support

En cas de problème :
1. Vérifier les logs dans la console (F12)
2. Vérifier les logs Netlify (dans le dashboard)
3. Vérifier les logs Supabase (dans Logs > API)

---

*Documentation de test AWEMA Studio v2 - CMS Multi-tenant*