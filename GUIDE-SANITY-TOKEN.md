# 📝 GUIDE : Obtenir votre Personal Access Token Sanity

## 🔐 ÉTAPE 1 : Connexion à Sanity

Exécutez cette commande dans votre terminal :

```bash
sanity login
```

### Ce qui va se passer :
1. Le terminal affichera plusieurs options de connexion :
   - **Google** (recommandé si vous avez un compte Google)
   - **GitHub**
   - **Email/Password**

2. Choisissez votre méthode préférée avec les flèches ↑↓ et appuyez sur Entrée

3. **Si vous choisissez Google ou GitHub** :
   - Votre navigateur s'ouvrira automatiquement
   - Connectez-vous avec vos identifiants
   - Autorisez Sanity CLI
   - Retournez au terminal - vous verrez "Login successful!"

4. **Si vous choisissez Email/Password** :
   - Entrez votre email
   - Entrez votre mot de passe
   - Si vous n'avez pas de compte, il vous proposera d'en créer un

## 🚀 ÉTAPE 2 : Créer un projet Sanity

Une fois connecté, créez un nouveau projet pour AWEMA :

```bash
sanity init --create-project "awema-sites" --dataset production
```

### Questions qui vont apparaître :

1. **"Select project template"** → Choisissez `Clean project with no predefined schemas`
2. **"Use TypeScript?"** → Répondez `Y` (oui)
3. **"Package manager to use"** → Choisissez `npm`

Le projet sera créé et vous recevrez :
- **Project ID** : Un identifiant unique (ex: `abc123xyz`)
- **Dataset** : `production`

## 🔑 ÉTAPE 3 : Obtenir le Personal Access Token

### Option A : Via le navigateur (RECOMMANDÉ)

1. Exécutez :
```bash
sanity manage
```

2. Cela ouvrira votre projet dans le navigateur

3. Dans le menu de gauche, cliquez sur **API**

4. Allez dans l'onglet **Tokens**

5. Cliquez sur **"+ Add API token"**

6. Configurez le token :
   - **Name** : `awema-deployment`
   - **Permissions** : `Editor` (ou `Deploy Studio` pour plus de permissions)
   - **Expiry** : Choisissez selon vos besoins (Never expire pour dev)

7. Cliquez sur **"Save"**

8. **IMPORTANT** : Copiez immédiatement le token ! Il ne sera plus visible après.

### Option B : Via le terminal

```bash
# Lister vos projets
sanity projects list

# Noter le Project ID qui apparaît
# Puis générer un token via curl (remplacez PROJECT_ID)
curl -X POST https://api.sanity.io/v1/projects/PROJECT_ID/tokens \
  -H "Authorization: Bearer YOUR_AUTH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"label": "awema-deployment", "roleName": "editor"}'
```

## 📋 ÉTAPE 4 : Sauvegarder vos credentials

Une fois que vous avez tout, ajoutez ces informations à votre `.env.production-real` :

```env
# Sanity Configuration
SANITY_PROJECT_ID=votre_project_id_ici
SANITY_DATASET=production
SANITY_API_TOKEN=votre_token_ici
SANITY_STUDIO_URL=https://votre_project_id.sanity.studio
```

## 🧪 ÉTAPE 5 : Tester la configuration

Créez un fichier `test-sanity-connection.js` :

```javascript
const sanityClient = require('@sanity/client')

const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2025-01-01'
})

// Test de connexion
client.fetch('*[_type == "project"][0]')
  .then(result => {
    console.log('✅ Connexion Sanity réussie!')
    console.log('Résultat:', result || 'Pas de données (normal au début)')
  })
  .catch(err => {
    console.error('❌ Erreur:', err.message)
  })
```

## 💡 COMMANDES UTILES

```bash
# Vérifier si vous êtes connecté
sanity debug --secrets

# Voir vos projets
sanity projects list

# Ouvrir le dashboard
sanity manage

# Se déconnecter
sanity logout

# Se reconnecter
sanity login
```

## ⚠️ NOTES IMPORTANTES

1. **Ne partagez JAMAIS votre token** - C'est comme un mot de passe
2. **Sauvegardez le token immédiatement** - Il n'est visible qu'une fois
3. **Organisation ID** : `ojvLwCYLO` (déjà configuré)
4. **Si vous perdez le token** : Créez-en un nouveau dans le dashboard

## 🆘 EN CAS DE PROBLÈME

Si `sanity login` ne fonctionne pas :

1. **Vérifiez votre connexion internet**

2. **Essayez avec npx** :
```bash
npx sanity@latest login
```

3. **Connexion manuelle** :
   - Allez sur https://www.sanity.io/manage
   - Connectez-vous via le navigateur
   - Créez le projet manuellement
   - Générez le token via l'interface web

## ✅ RÉSULTAT ATTENDU

Après ces étapes, vous devriez avoir :
- ✅ Être connecté à Sanity CLI
- ✅ Un projet créé (Project ID)
- ✅ Un Personal Access Token
- ✅ Tout configuré dans `.env.production-real`

Vous pourrez alors utiliser Sanity dans le workflow AWEMA !