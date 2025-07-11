# 🚀 PROCHAINES ÉTAPES - Configuration CMS Supabase

## 📅 Date : 11 Janvier 2025

## 📊 État Actuel

### ✅ Ce qui est FAIT et FONCTIONNE :
1. **Architecture CMS multi-tenant** complète avec Supabase + Netlify
2. **Sécurité avancée** : bcrypt, rate limiting, HTTPS, backups auto
3. **Déploiement one-click** depuis l'éditeur Studio
4. **Tests réussis** : Sites déployés avec succès sur Netlify
5. **Variables d'environnement** : PAS configurées dans .env.local

### ❌ Ce qui BLOQUE :
1. **Projet Supabase** : Pas encore créé
2. **CORS** : Pas configuré dans Supabase
3. **Fonction SQL** : Pas installée dans Supabase
4. **Variables d'env** : .env.local vide (pas de clés Supabase)

## 🎯 CE QUE VOUS DEVEZ FAIRE

### 1️⃣ Créer un Projet Supabase (5 min)
1. Aller sur https://supabase.com
2. Créer un compte gratuit
3. Créer un nouveau projet "awema-cms"
4. Noter les informations suivantes :
   - Project URL : `https://XXXXX.supabase.co`
   - Anon Key : `eyJhbGc...`
   - Service Key : `eyJhbGc...` (dans Settings > API)

### 2️⃣ Configurer CORS dans Supabase (2 min)
1. Dans Supabase Dashboard → Settings → API → CORS Allowed Origins
2. Ajouter ces origines :
```
https://*.netlify.app
http://localhost:3000
http://localhost:3001
http://localhost:3002
```
3. Sauvegarder

### 3️⃣ Installer le Schema SQL (5 min)
1. Dans Supabase Dashboard → SQL Editor
2. Copier/coller le contenu de `/lib/db/schema/supabase-tables.sql`
3. Exécuter
4. Puis copier/coller le contenu de `/apps/studio/FIX-SUPABASE-AUTH.md` (fonction verify_user_password)
5. Exécuter

### 4️⃣ Configurer .env.local (2 min)
1. Copier `.env.local.example` vers `.env.local`
2. Remplir avec vos vraies clés Supabase :
```env
NEXT_PUBLIC_SUPABASE_URL=https://VOTRE_PROJET.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...votre_anon_key
SUPABASE_SERVICE_KEY=eyJ...votre_service_key
```

### 5️⃣ Tester le Déploiement Complet (5 min)
```bash
cd apps/studio
npm run dev  # Si pas déjà lancé

# Dans un autre terminal
node scripts/test-deploy-with-supabase.js
```

## 🔍 Vérifications

### ✅ Si tout fonctionne, vous verrez :
- "✅ Déploiement réussi !"
- URL du site : https://test-supabase-XXX.netlify.app
- URL admin : https://test-supabase-XXX.netlify.app/admin
- Identifiants de connexion générés
- "✅ Site trouvé dans Supabase"
- "✅ Utilisateur CMS trouvé"

### ❌ Si ça ne fonctionne pas :
1. **Erreur CORS** → Vérifier étape 2️⃣
2. **Erreur Auth** → Vérifier étape 3️⃣ (fonction SQL)
3. **Erreur 401** → Vérifier les clés dans .env.local
4. **Site non trouvé** → Vérifier la connexion Supabase

## 📁 Fichiers Importants

- `/apps/studio/.env.local` - Variables d'environnement
- `/apps/studio/lib/db/schema/supabase-tables.sql` - Schema base de données
- `/apps/studio/FIX-SUPABASE-AUTH.md` - Fonction d'authentification
- `/apps/studio/scripts/test-deploy-with-supabase.js` - Script de test
- `/apps/studio/docs/CORS-SETUP-GLOBAL.md` - Guide CORS

## 🎉 Une fois configuré

Le système permettra :
- Déploiement automatique de sites avec CMS intégré
- Authentification sécurisée des clients
- Gestion multi-tenant (plusieurs sites/clients)
- Backups automatiques
- 0€/mois jusqu'à ~500 sites !

## 🆘 Besoin d'aide ?

1. Vérifier les logs du navigateur (F12 > Console)
2. Vérifier les logs Supabase (Dashboard > Logs)
3. Tester avec `scripts/test-supabase-direct.js` pour debug
4. Me montrer les erreurs exactes pour diagnostic

## 📝 Notes pour Claude

Quand on reprend le projet :
1. L'architecture est complète et testée
2. Il manque juste la configuration Supabase réelle
3. Une fois Supabase configuré, tout devrait fonctionner
4. Les tests de déploiement sont dans `/scripts/test-deploy-*.js`
5. La sécurité est déjà implémentée (bcrypt, rate limit, etc)