-- Activer l'extension pgcrypto pour bcrypt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Fonction pour vérifier le mot de passe avec bcrypt
CREATE OR REPLACE FUNCTION verify_user_password(
  user_email TEXT,
  user_password TEXT,
  user_site_id UUID
) RETURNS TABLE (
  id UUID,
  email TEXT,
  role TEXT,
  site_id UUID,
  full_name TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_record RECORD;
BEGIN
  -- Récupérer l'utilisateur
  SELECT * INTO user_record
  FROM cms_users
  WHERE email = user_email
  AND site_id = user_site_id;
  
  -- Vérifier que l'utilisateur existe et que le mot de passe est correct
  IF user_record.id IS NOT NULL AND 
     user_record.password_hash = crypt(user_password, user_record.password_hash) THEN
    RETURN QUERY
    SELECT 
      user_record.id,
      user_record.email,
      user_record.role,
      user_record.site_id,
      user_record.full_name;
  END IF;
  
  -- Si aucune ligne n'est retournée, l'authentification a échoué
END;
$$;

-- Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION verify_user_password TO anon;
GRANT EXECUTE ON FUNCTION verify_user_password TO authenticated;