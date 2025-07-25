# 🔥 SOLUTION RAPIDE - Erreur CMS Supabase

## ❌ Problème actuel
- Erreur 500 sur : `zvcvhundfeqwufmvtmzd.supabase.co/rest/v1/cms_content`
- Erreur JavaScript : `Unexpected identifier 'accueil'`
- CMS sans fonctionnalités

## ✅ Solution immédiate

### 1. Configurer CORS dans Supabase (2 min)

1. Connectez-vous à : https://supabase.com/dashboard
2. Sélectionnez votre projet : `zvcvhundfeqwufmvtmzd`
3. Allez dans : **Settings → API → CORS**
4. Dans "Allowed Origins", ajoutez :
   ```
   https://*.netlify.app
   http://localhost:3000
   http://localhost:3001
   ```
5. Si vous avez un domaine personnalisé, ajoutez-le aussi
6. Cliquez sur **Save**

### 2. Vérifier les tables (1 min)

1. Dans Supabase : **Table Editor**
2. Vérifiez que ces tables existent :
   - `cms_sites`
   - `cms_users`
   - `cms_content`
   - `cms_media`

Si elles n'existent pas :
1. Allez dans **SQL Editor**
2. Copiez le contenu de : `/apps/studio/lib/db/schema/supabase-tables.sql`
3. Exécutez

### 3. Tester le CMS

1. Rafraîchissez votre site déployé
2. Allez sur `/admin`
3. Connectez-vous avec :
   - Email : `admin@admin.fr`
   - Mot de passe : `admin`

## 🎯 Si ça ne marche toujours pas

### Option A : Désactiver temporairement RLS
1. Dans Supabase : **Authentication → Policies**
2. Pour chaque table `cms_*`, désactivez RLS temporairement
3. Testez à nouveau

### Option B : Vérifier les logs
1. Dans Supabase : **Logs → API Logs**
2. Cherchez les erreurs 500
3. Copiez l'erreur exacte

## 📝 Note importante
L'erreur "Unexpected identifier 'accueil'" disparaîtra une fois que Supabase répondra correctement.