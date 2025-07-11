-- =====================================================
-- SCRIPT POUR CRÉER L'UTILISATEUR ADMIN MANQUANT
-- =====================================================

-- 1. D'abord, récupérer le site_id depuis le CMS déployé
-- Le site_id visible dans l'erreur est : 12c462ff-f73b-4f7a-bc41-16afafbff10a

DO $$
DECLARE
  v_site_id UUID := '12c462ff-f73b-4f7a-bc41-16afafbff10a';
  v_user_id UUID;
BEGIN
  -- Vérifier si le site existe, sinon le créer
  IF NOT EXISTS (SELECT 1 FROM cms_sites WHERE id = v_site_id) THEN
    INSERT INTO cms_sites (id, domain, site_name, status)
    VALUES (
      v_site_id,
      'test-supabase-1752247164393.netlify.app',
      'Test Supabase Site',
      'active'
    );
    RAISE NOTICE 'Site créé avec ID: %', v_site_id;
  END IF;

  -- Créer l'utilisateur admin
  v_user_id := create_cms_user(
    'admin@admin.fr',
    'admin',
    'Administrateur',
    'admin',
    v_site_id
  );
  
  RAISE NOTICE '✅ Utilisateur admin créé avec succès !';
  RAISE NOTICE '   ID: %', v_user_id;
  RAISE NOTICE '   Email: admin@admin.fr';
  RAISE NOTICE '   Mot de passe: admin';
  RAISE NOTICE '   Site ID: %', v_site_id;
  
EXCEPTION
  WHEN OTHERS THEN
    -- Si la fonction n'existe pas, créer directement
    IF SQLERRM LIKE '%create_cms_user%' THEN
      INSERT INTO cms_users (email, password_hash, full_name, role, site_id)
      VALUES (
        'admin@admin.fr',
        crypt('admin', gen_salt('bf', 10)),
        'Administrateur',
        'admin',
        v_site_id
      )
      ON CONFLICT (email, site_id) DO NOTHING;
      
      RAISE NOTICE '✅ Utilisateur créé directement (sans fonction)';
    ELSE
      RAISE;
    END IF;
END $$;

-- Vérifier que l'utilisateur a bien été créé
SELECT 
  id,
  email,
  full_name,
  role,
  site_id,
  created_at
FROM cms_users 
WHERE email = 'admin@admin.fr' 
AND site_id = '12c462ff-f73b-4f7a-bc41-16afafbff10a';