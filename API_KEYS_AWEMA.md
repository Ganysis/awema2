# 🔑 CLÉS API AWEMA - DOCUMENT CONFIDENTIEL

> **⚠️ IMPORTANT**: Ce document contient des informations sensibles. Ne jamais le partager publiquement ou le commiter sur GitHub.

## 📅 Date de mise à jour: Janvier 2025

---

## 1. 🌐 SUPABASE
```env
# URL de la base de données
NEXT_PUBLIC_SUPABASE_URL=https://tnlapfiszzpbetbfpbtx.supabase.co

# Clé publique (anon key) - peut être exposée côté client
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGFwZmlzenpwYmV0YmZwYnR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY4ODkyNzIsImV4cCI6MjA3MjQ2NTI3Mn0.Ankm2Taj9ZWWwaakzIlfmDDni0YYgUwi-SQlwNAr-mk

# Clé service (admin) - JAMAIS exposer côté client
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRubGFwZmlzenpwYmV0YmZwYnR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1Njg4OTI3MiwiZXhwIjoyMDcyNDY1MjcyfQ.29xYHX8xeZQ_-DqC0qtSgFYs5UKWm1yGuMbXmt-jkbQ
```

---

## 2. 🤖 DEEPSEEK AI
```env
# Clé API pour génération de contenu
DEEPSEEK_API_KEY=sk-d86fb0058a67403e98bbca6d3cf1e2dd

# Configuration
DEEPSEEK_API_URL=https://api.deepseek.com/v1/chat/completions
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_MAX_TOKENS=4000
DEEPSEEK_TEMPERATURE=0.7
```

---

## 3. 🔐 JWT & SESSION
```env
# Secret pour les tokens JWT (CHANGER EN PRODUCTION!)
JWT_SECRET=super-secret-key-change-in-production-abc123xyz789
SESSION_SECRET=another-super-secret-key-for-sessions-xyz456abc789
```

---

## 4. 🚀 NETLIFY (À CONFIGURER)
```env
# Token API Netlify - REQUIS pour déploiement automatique
NETLIFY_API_TOKEN=TODO_ADD_YOUR_TOKEN

# ID du site (optionnel)
NETLIFY_SITE_ID=optional

# ID de l'équipe (à récupérer depuis: https://app.netlify.com/teams/TEAM_ID)
NETLIFY_TEAM_ID=TODO_ADD_YOUR_TEAM_ID
```

### 📝 Comment obtenir le token Netlify:
1. Aller sur https://app.netlify.com/user/applications
2. Créer un nouveau token personnel
3. Copier et remplacer `TODO_ADD_YOUR_TOKEN`

---

## 5. 📧 EMAIL - RESEND (À CONFIGURER)
```env
# API Key Resend pour envoi d'emails
RESEND_API_KEY=TODO_ADD_YOUR_KEY
```

### 📝 Comment obtenir la clé Resend:
1. Créer un compte sur https://resend.com
2. Aller dans API Keys
3. Créer une nouvelle clé
4. Copier et remplacer `TODO_ADD_YOUR_KEY`

---

## 6. 📧 EMAIL - BREVO (ALTERNATIVE - À CONFIGURER)
```env
# API Key Brevo (ex SendinBlue)
BREVO_API_KEY=TODO_ADD_YOUR_KEY
```

### 📝 Comment obtenir la clé Brevo:
1. Créer un compte sur https://www.brevo.com
2. Aller dans SMTP & API > API Keys
3. Créer une nouvelle clé
4. Copier et remplacer `TODO_ADD_YOUR_KEY`

---

## 7. 📝 SANITY CMS (NOUVELLE ARCHITECTURE AWEMA 3.0)
```env
# Organisation Sanity (ACTIF)
SANITY_ORGANIZATION_ID=ojvLwCYLO

# Configuration du projet (après création):
SANITY_PROJECT_ID=[A CREER - voir commandes ci-dessous]
SANITY_DATASET=production
SANITY_API_TOKEN=[A GENERER - voir commandes ci-dessous]
SANITY_MANAGEMENT_TOKEN=[A GENERER pour gestion automatique]
SANITY_STUDIO_URL=https://awema-sites.sanity.studio
```

### 🔑 Commandes pour obtenir le Personal Access Token Sanity:
```bash
# 1. Installer Sanity CLI globalement
npm install -g @sanity/cli

# 2. Se connecter à Sanity (ouvrira le navigateur)
sanity login

# 3. Créer un nouveau projet (si pas encore fait)
sanity init --create-project "awema-sites" --dataset production

# 4. Générer un token d'accès
sanity manage
# Aller dans: API > Tokens > Add API Token
# Nom: "awema-deployment"
# Permissions: Editor (ou Deploy Studio pour management)

# 5. Récupérer le Project ID
sanity projects list
```

### 📝 État actuel:
- **Organisation ID**: ojvLwCYLO ✅
- **Agent 6** implémenté avec simulations de test
- Le système est prêt pour intégration Sanity réelle
- Architecture: **Astro + Sanity + Cloudflare** (0€/mois)

---

## 8. ☁️ CLOUDFLARE PAGES (NOUVELLE ARCHITECTURE) ✅
```env
# Configuration Cloudflare ACTIVE
CLOUDFLARE_ACCOUNT_ID=596a12cfcd7eeda376f77b030d19aff5
CLOUDFLARE_API_TOKEN=ns6-ir43C9gBdMO1XWSIOEVAAsVY4CPTY4vUPK0t
CLOUDFLARE_ZONE_ID=optional  # Sera défini par domaine
```

### ✅ Statut:
- **Account ID**: Configuré et actif
- **API Token**: Configuré avec permissions Pages
- **Prêt pour**: Déploiement automatique sur Cloudflare Pages

### 🚀 Capacités activées:
- Déploiement illimité gratuit
- CDN mondial inclus
- SSL automatique
- Analytics intégrés
- 0€/mois pour 100+ sites

---

## 9. 📊 ANALYTICS (OPTIONNEL)
```env
# Google Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## 10. ⚙️ CONFIGURATION DES FEATURES
```env
# Activer/Désactiver les fonctionnalités
ENABLE_NETLIFY_DEPLOY=false     # Ancienne architecture (en cours d'abandon)
ENABLE_RESEND_EMAIL=false       # Mettre true quand Resend configuré
ENABLE_SANITY_SETUP=false       # Mettre true après création projet Sanity
ENABLE_CLOUDFLARE_DEPLOY=true   # ✅ ACTIVÉ - Nouvelle architecture
```

### 🔄 État de la migration:
- **Ancienne stack**: Next.js + Netlify + Supabase ❌
- **Nouvelle stack**: Astro + Sanity + Cloudflare ✅
- **Statut actuel**:
  - Cloudflare: **ACTIF** ✅
  - Sanity: Organisation créée, en attente du projet
  - Astro: Templates prêts

---

## 🔒 SÉCURITÉ - BONNES PRATIQUES

### ✅ À FAIRE:
- [ ] Changer tous les secrets par défaut avant la production
- [ ] Ne jamais commiter ce fichier sur Git
- [ ] Utiliser un gestionnaire de secrets (ex: Vault, AWS Secrets Manager)
- [ ] Rotation régulière des clés API
- [ ] Limiter les permissions au strict minimum
- [ ] Utiliser des variables d'environnement différentes par environnement

### ❌ À NE PAS FAIRE:
- Ne jamais exposer les clés service/admin côté client
- Ne jamais logger les clés dans la console
- Ne jamais envoyer les clés par email ou messagerie
- Ne jamais utiliser les mêmes clés en dev et production

---

## 📞 SUPPORT

Pour toute question sur les clés API:
- Documentation Supabase: https://supabase.com/docs
- Documentation DeepSeek: https://platform.deepseek.com/docs
- Documentation Netlify: https://docs.netlify.com
- Documentation Sanity: https://www.sanity.io/docs
- Documentation Cloudflare: https://developers.cloudflare.com

---

**Dernière mise à jour**: Janvier 2025
**Architecture actuelle**: Migration vers Astro + Sanity + Cloudflare
**Statut clés**:
- Cloudflare ✅ (Account ID + Token actifs)
- Sanity 🔄 (Organisation ID actif, projet à créer)
- DeepSeek ✅ (Clé active)
- Supabase ✅ (Fonctionnel)
**Par**: Système AWEMA
**Classification**: CONFIDENTIEL 🔴

---

## 🚨 RAPPEL SÉCURITÉ
**NE JAMAIS PERDRE CES CLÉS !**
- Faire des backups réguliers
- Stocker dans un gestionnaire de mots de passe
- Ne jamais commiter sur Git
- Rotation tous les 6 mois recommandée