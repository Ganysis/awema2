# Correction du CMS - Étapes à suivre

## 1. Exécuter le script SQL dans Supabase

Copiez et exécutez ce SQL dans l'éditeur SQL de Supabase :

```sql
-- Créer le site et l'utilisateur admin
DO $$
DECLARE
  v_site_id UUID := '12c462ff-f73b-4f7a-bc41-16afafbff10a';
  v_user_id UUID;
BEGIN
  -- Créer le site s'il n'existe pas
  INSERT INTO cms_sites (id, domain, site_name, status)
  VALUES (
    v_site_id,
    'test-supabase-1752247164393.netlify.app',
    'Test Supabase Site',
    'active'
  )
  ON CONFLICT (id) DO NOTHING;

  -- Créer l'utilisateur admin
  INSERT INTO cms_users (email, password_hash, full_name, role, site_id)
  VALUES (
    'admin@admin.fr',
    crypt('admin', gen_salt('bf', 10)),
    'Administrateur',
    'admin',
    v_site_id
  )
  ON CONFLICT (email, site_id) DO UPDATE
  SET password_hash = crypt('admin', gen_salt('bf', 10));
  
  RAISE NOTICE '✅ Configuration terminée !';
END $$;
```

## 2. Configurer CORS dans Supabase

1. Allez dans votre dashboard Supabase
2. Settings → API
3. Dans "CORS Allowed Origins", ajoutez :
   ```
   https://test-supabase-1752247164393.netlify.app
   https://*.netlify.app
   ```
4. Cliquez sur "Save"

## 3. Désactiver temporairement RLS (pour tester)

```sql
-- Désactiver RLS temporairement pour tester
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sessions DISABLE ROW LEVEL SECURITY;
```

## 4. Vérifier l'utilisateur

```sql
-- Vérifier que l'utilisateur existe
SELECT id, email, role, site_id 
FROM cms_users 
WHERE email = 'admin@admin.fr';
```

## 5. Tester la connexion

Une fois ces étapes terminées, retournez sur :
https://test-supabase-1752247164393.netlify.app/admin

Et connectez-vous avec :
- Email : admin@admin.fr
- Mot de passe : admin