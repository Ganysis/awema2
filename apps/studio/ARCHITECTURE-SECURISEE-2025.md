# 🏗️ Architecture Sécurisée AWEMA CMS - Janvier 2025

## 🎯 Objectifs
- ✅ Support domaines personnalisés sans CORS
- ✅ Haute disponibilité (pas de SPOF)
- ✅ Sécurité maximale
- ✅ Performance optimale
- ✅ Coût minimal

## 🛠️ Stack Technique

### 1. **Netlify Edge Functions**
- Exécutées sur le CDN mondial de Netlify
- Démarrage instantané (pas de cold start)
- Support TypeScript natif
- Même domaine que le site = **PAS DE CORS**

### 2. **Supabase**
- Base de données PostgreSQL
- Row Level Security (RLS) activé
- Authentification sécurisée
- Backups automatiques

### 3. **Architecture**

```
┌─────────────────────────┐
│   Site Client           │
│ (plombier-dupont.fr)    │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│   CMS Interface         │
│   (/admin)              │
└───────────┬─────────────┘
            │ (même domaine)
            ▼
┌─────────────────────────┐
│ Netlify Edge Functions  │
│  (/api/cms/*)           │
└───────────┬─────────────┘
            │ (HTTPS + Auth)
            ▼
┌─────────────────────────┐
│      Supabase           │
│  (PostgreSQL + RLS)     │
└─────────────────────────┘
```

## 🔒 Sécurité

### Authentification
1. **Mot de passe** : Hachage bcrypt (10 rounds)
2. **Session** : Token UUID avec expiration 24h
3. **Vérification** : Fonction SQL `verify_user_password`
4. **Rate limiting** : Via Netlify (protection DDoS)

### Protection des données
1. **RLS Supabase** : Isolation par site_id
2. **HTTPS obligatoire** : Headers HSTS
3. **Clés sécurisées** : Service key côté serveur uniquement
4. **Headers sécurité** : X-Frame-Options, CSP, etc.

## 📁 Structure de déploiement

```
site-client.com/
├── index.html
├── admin/
│   ├── index.html
│   ├── cms.js
│   └── cms.css
├── netlify/
│   └── edge-functions/
│       └── cms-handler.ts
├── netlify.toml
└── assets/
    └── ...
```

## 🚀 Workflow de déploiement

1. **Génération du site**
   - Export statique optimisé
   - Injection des Edge Functions
   - Configuration Netlify

2. **Déploiement**
   - Upload sur Netlify
   - Edge Functions auto-déployées
   - DNS automatique

3. **Configuration Supabase**
   - Création du site dans la DB
   - Création user admin
   - Activation RLS

## 💰 Coûts

### Netlify (par site)
- **Gratuit** : 100GB bandwidth/mois
- **Edge Functions** : 3M requêtes/mois gratuit
- **Domaine custom** : Gratuit (client achète)

### Supabase (global)
- **Gratuit** : 500MB DB, 2GB bandwidth
- **~500 sites** sur le plan gratuit
- **Upgrade** : 25$/mois pour 8GB DB

### Total par site
- **0€/mois** jusqu'à 500 sites
- **0.05€/mois** après (25€/500 sites)

## 🎯 Avantages

1. **Pas de CORS** : Edge Functions sur même domaine
2. **Haute dispo** : CDN Netlify mondial
3. **Performance** : Edge = proche des utilisateurs
4. **Sécurité** : Isolation complète par site
5. **Scalabilité** : Illimitée avec Netlify
6. **Simplicité** : Une seule config Supabase

## 📝 Configuration requise

### Variables d'environnement
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NETLIFY_AUTH_TOKEN=nfp_xxx
```

### Supabase
1. Créer les tables (schema SQL fourni)
2. Créer la fonction `verify_user_password`
3. Activer RLS sur toutes les tables
4. Pas de configuration CORS nécessaire !

## 🔧 Implémentation

### 1. Edge Function
```typescript
// /api/cms/* routes
- POST /api/cms/auth/login
- GET  /api/cms/content
- POST /api/cms/content
- PUT  /api/cms/content
- GET  /api/cms/media
- POST /api/cms/media
- POST /api/cms/forms
```

### 2. CMS Client
```javascript
const cms = new AwemaCMS({
  apiBase: '/api/cms' // Même domaine !
});

await cms.login(email, password);
const content = await cms.getContent();
```

### 3. Déploiement
```bash
# Test local
netlify dev

# Déploiement
netlify deploy --prod
```

## ✅ Checklist de sécurité

- [ ] Mots de passe hachés avec bcrypt
- [ ] RLS activé sur toutes les tables
- [ ] HTTPS forcé avec HSTS
- [ ] Headers de sécurité configurés
- [ ] Service key jamais exposée
- [ ] Sessions avec expiration
- [ ] Logs d'accès activés
- [ ] Backups automatiques configurés

## 🎉 Résultat

- **100% autonome** : Chaque site indépendant
- **0 CORS** : Tout sur le même domaine
- **Ultra sécurisé** : Multiple couches de protection
- **Scalable** : De 1 à 10000 sites
- **Économique** : 0€ jusqu'à 500 sites