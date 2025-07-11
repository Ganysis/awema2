# 🚀 Solution CORS avec Proxy API - CMS Multi-tenant

## 📅 Date : 11 Janvier 2025

## 🎯 Problème Résolu

Les clients AWEMA utiliseront des **domaines personnalisés** (ex: plombier-dupont.fr, electricien-martin.com) qui ne peuvent pas tous être ajoutés dans les CORS de Supabase.

## ✅ Solution Implémentée

### 1. Proxy API Universal (`/api/cms-proxy`)

Créé un endpoint proxy qui :
- **Accepte TOUTES les origines** (`Access-Control-Allow-Origin: *`)
- **Utilise la clé service** Supabase (bypass RLS)
- **Centralise toutes les opérations** CMS
- **Pas de configuration CORS** nécessaire

### 2. Modifications du CMS

Le CMS exporté utilise maintenant :
1. **En priorité** : Le proxy API (pas de CORS)
2. **En fallback** : Edge Functions Supabase
3. **En dernier** : Connexion directe (dev local)

### 3. Fichiers Modifiés

- ✅ `/app/api/cms-proxy/route.ts` - Endpoint proxy créé
- ✅ `/lib/services/cms-basic-fixed.ts` - CMS modifié pour utiliser le proxy
- ✅ `/lib/services/cms-export-integration.ts` - Config inclut l'URL du proxy
- ✅ `/scripts/test-cms-proxy.js` - Script de test

## 🔧 Configuration

### Variables d'environnement nécessaires :
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...  # Important pour le proxy
```

### URL du proxy :
- **Production** : `https://studio.awema.fr/api/cms-proxy`
- **Local** : `http://localhost:3000/api/cms-proxy`

## 🧪 Tester la Solution

```bash
# 1. S'assurer que le serveur est lancé
npm run dev

# 2. Tester le proxy
node scripts/test-cms-proxy.js
```

## 📝 Actions Supportées par le Proxy

- `login` - Authentification
- `getSite` - Infos du site
- `getContent` - Récupérer le contenu
- `updateContent` - Mettre à jour
- `getMedia` - Liste des médias
- `uploadMedia` - Ajouter un média
- `getFormSubmissions` - Voir les soumissions
- `saveFormSubmission` - Sauvegarder un formulaire

## 🎉 Avantages

1. **Zéro configuration CORS** pour les clients
2. **Fonctionne avec n'importe quel domaine**
3. **Sécurisé** (clé service côté serveur)
4. **Centralisé** (logs, monitoring, rate limiting)
5. **Évolutif** (cache, optimisations futures)

## 🚦 Workflow Complet

1. Client achète son domaine (plombier-dupont.fr)
2. Configure DNS vers Netlify
3. Accède à plombier-dupont.fr/admin
4. Le CMS utilise automatiquement le proxy
5. **Aucune configuration CORS nécessaire !**

## 🔒 Sécurité

- Le proxy utilise la clé service (jamais exposée)
- Validation du site_id à chaque requête
- Rate limiting possible au niveau du proxy
- Logs centralisés des accès

## 📊 Prochaines Étapes

1. ✅ Déployer le proxy en production
2. ⏳ Ajouter cache Redis pour performances
3. ⏳ Monitoring et alertes
4. ⏳ Rate limiting par IP/site
5. ⏳ Support WebSocket pour temps réel