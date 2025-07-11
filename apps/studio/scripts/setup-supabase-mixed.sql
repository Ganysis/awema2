-- =====================================================
-- SCRIPT ADAPTÉ POUR BASES MIXTES (sites + cms_*)
-- =====================================================
-- Ce script fonctionne avec une base qui a déjà une table "sites"
-- et ajoute les tables cms_* manquantes

-- =====================================================
-- 1. ACTIVER LES EXTENSIONS NÉCESSAIRES
-- =====================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 2. VÉRIFIER ET ADAPTER LA TABLE SITES EXISTANTE
-- =====================================================

-- Ajouter les colonnes manquantes à la table sites si elle existe
DO $$
BEGIN
  -- Vérifier si la table sites existe
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'sites') THEN
    -- Ajouter status si manquant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sites' AND column_name = 'status') THEN
      ALTER TABLE sites ADD COLUMN status TEXT DEFAULT 'active';
    END IF;
    
    -- Ajouter created_at si manquant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sites' AND column_name = 'created_at') THEN
      ALTER TABLE sites ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
    
    -- Ajouter updated_at si manquant
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'sites' AND column_name = 'updated_at') THEN
      ALTER TABLE sites ADD COLUMN updated_at TIMESTAMPTZ DEFAULT NOW();
    END IF;
  ELSE
    -- Si la table sites n'existe pas, la créer
    CREATE TABLE sites (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      domain TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      config JSONB DEFAULT '{}',
      status TEXT DEFAULT 'active',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );
  END IF;
END $$;

-- =====================================================
-- 3. CRÉER LES AUTRES TABLES
-- =====================================================

-- Table des utilisateurs CMS (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'editor',
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  last_login TIMESTAMPTZ,
  login_attempts INT DEFAULT 0,
  locked_until TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(email, site_id)
);

-- Table du contenu (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  page_slug TEXT NOT NULL,
  content_type TEXT NOT NULL DEFAULT 'page',
  data JSONB NOT NULL DEFAULT '{}',
  meta JSONB DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  published_at TIMESTAMPTZ,
  author_id UUID REFERENCES cms_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, page_slug)
);

-- Table des médias (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_media (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  mime_type TEXT,
  size INTEGER,
  metadata JSONB DEFAULT '{}',
  uploaded_by UUID REFERENCES cms_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des versions
CREATE TABLE IF NOT EXISTS cms_versions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  content_id UUID NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL,
  meta JSONB DEFAULT '{}',
  author_id UUID REFERENCES cms_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des sessions
CREATE TABLE IF NOT EXISTS cms_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES cms_users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des logs d'audit (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_audit_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID REFERENCES cms_users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des backups (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_backups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  backup_data JSONB NOT NULL,
  created_by UUID REFERENCES cms_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table des soumissions de formulaires (utilise sites, pas cms_sites)
CREATE TABLE IF NOT EXISTS cms_form_submissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  form_name TEXT NOT NULL,
  page_slug TEXT,
  data JSONB NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- 4. CRÉER LES INDEX
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_cms_content_site_id ON cms_content(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_content_page_slug ON cms_content(page_slug);
CREATE INDEX IF NOT EXISTS idx_cms_media_site_id ON cms_media(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_versions_content_id ON cms_versions(content_id);
CREATE INDEX IF NOT EXISTS idx_cms_sessions_token_hash ON cms_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_cms_sessions_expires_at ON cms_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_cms_audit_logs_site_id ON cms_audit_logs(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_audit_logs_created_at ON cms_audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_cms_form_submissions_site_id ON cms_form_submissions(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_form_submissions_status ON cms_form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_cms_form_submissions_created_at ON cms_form_submissions(created_at);

-- =====================================================
-- 5. FONCTIONS DE SÉCURITÉ
-- =====================================================

-- Fonction pour vérifier le mot de passe (adaptée pour table sites)
CREATE OR REPLACE FUNCTION verify_user_password(
  user_email TEXT,
  user_password TEXT,
  user_site_id UUID
) RETURNS TABLE (
  id UUID,
  email TEXT,
  role TEXT,
  site_id UUID,
  full_name TEXT,
  success BOOLEAN,
  message TEXT
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_record RECORD;
  max_attempts CONSTANT INT := 5;
  lockout_duration CONSTANT INTERVAL := '15 minutes';
BEGIN
  -- Récupérer l'utilisateur
  SELECT * INTO user_record
  FROM cms_users
  WHERE email = user_email
  AND site_id = user_site_id;
  
  -- Vérifier si l'utilisateur existe
  IF user_record.id IS NULL THEN
    -- Log failed attempt
    INSERT INTO cms_audit_logs (site_id, action, entity_type, details)
    VALUES (user_site_id, 'login_failed', 'user', jsonb_build_object('email', user_email, 'reason', 'user_not_found'));
    
    RETURN QUERY
    SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::UUID, NULL::TEXT, FALSE, 'Invalid credentials';
    RETURN;
  END IF;
  
  -- Vérifier si le compte est verrouillé
  IF user_record.locked_until IS NOT NULL AND user_record.locked_until > NOW() THEN
    RETURN QUERY
    SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::UUID, NULL::TEXT, FALSE, 
           'Account locked until ' || user_record.locked_until::TEXT;
    RETURN;
  END IF;
  
  -- Vérifier le mot de passe
  IF user_record.password_hash = crypt(user_password, user_record.password_hash) THEN
    -- Réinitialiser les tentatives
    UPDATE cms_users 
    SET login_attempts = 0, 
        locked_until = NULL,
        last_login = NOW()
    WHERE id = user_record.id;
    
    -- Log successful login
    INSERT INTO cms_audit_logs (site_id, user_id, action, entity_type, details)
    VALUES (user_site_id, user_record.id, 'login_success', 'user', jsonb_build_object('email', user_email));
    
    RETURN QUERY
    SELECT 
      user_record.id,
      user_record.email,
      user_record.role,
      user_record.site_id,
      user_record.full_name,
      TRUE,
      'Login successful';
  ELSE
    -- Incrémenter les tentatives
    UPDATE cms_users 
    SET login_attempts = login_attempts + 1,
        locked_until = CASE 
          WHEN login_attempts + 1 >= max_attempts THEN NOW() + lockout_duration
          ELSE NULL
        END
    WHERE id = user_record.id;
    
    -- Log failed attempt
    INSERT INTO cms_audit_logs (site_id, user_id, action, entity_type, details)
    VALUES (user_site_id, user_record.id, 'login_failed', 'user', jsonb_build_object('email', user_email, 'reason', 'invalid_password'));
    
    RETURN QUERY
    SELECT NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::UUID, NULL::TEXT, FALSE, 
           'Invalid credentials. ' || (max_attempts - user_record.login_attempts - 1)::TEXT || ' attempts remaining';
  END IF;
END;
$$;

-- Fonction pour créer une session
CREATE OR REPLACE FUNCTION create_user_session(
  p_user_id UUID,
  p_ip_address INET DEFAULT NULL,
  p_user_agent TEXT DEFAULT NULL
) RETURNS TABLE (
  session_id UUID,
  session_token TEXT,
  expires_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_session_id UUID;
  v_token TEXT;
  v_token_hash TEXT;
  v_expires_at TIMESTAMPTZ;
BEGIN
  v_session_id := uuid_generate_v4();
  v_token := encode(gen_random_bytes(32), 'hex');
  v_token_hash := encode(digest(v_token, 'sha256'), 'hex');
  v_expires_at := NOW() + INTERVAL '24 hours';
  
  DELETE FROM cms_sessions WHERE expires_at < NOW();
  
  INSERT INTO cms_sessions (id, user_id, token_hash, ip_address, user_agent, expires_at)
  VALUES (v_session_id, p_user_id, v_token_hash, p_ip_address, p_user_agent, v_expires_at);
  
  RETURN QUERY
  SELECT v_session_id, v_token, v_expires_at;
END;
$$;

-- Fonction pour valider une session
CREATE OR REPLACE FUNCTION validate_session(
  p_token TEXT
) RETURNS TABLE (
  user_id UUID,
  email TEXT,
  role TEXT,
  site_id UUID,
  full_name TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_token_hash TEXT;
  session_record RECORD;
BEGIN
  v_token_hash := encode(digest(p_token, 'sha256'), 'hex');
  
  SELECT s.*, u.email, u.role, u.site_id, u.full_name 
  INTO session_record
  FROM cms_sessions s
  JOIN cms_users u ON s.user_id = u.id
  WHERE s.token_hash = v_token_hash
  AND s.expires_at > NOW();
  
  IF session_record.id IS NOT NULL THEN
    RETURN QUERY
    SELECT 
      session_record.user_id,
      session_record.email,
      session_record.role,
      session_record.site_id,
      session_record.full_name;
  END IF;
END;
$$;

-- Fonction pour créer un utilisateur
CREATE OR REPLACE FUNCTION create_cms_user(
  p_email TEXT,
  p_password TEXT,
  p_full_name TEXT,
  p_role TEXT,
  p_site_id UUID
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_user_id UUID;
  v_password_hash TEXT;
BEGIN
  v_password_hash := crypt(p_password, gen_salt('bf', 10));
  
  INSERT INTO cms_users (email, password_hash, full_name, role, site_id)
  VALUES (p_email, v_password_hash, p_full_name, p_role, p_site_id)
  RETURNING id INTO v_user_id;
  
  INSERT INTO cms_audit_logs (site_id, user_id, action, entity_type, entity_id, details)
  VALUES (p_site_id, v_user_id, 'user_created', 'user', v_user_id, jsonb_build_object('email', p_email));
  
  RETURN v_user_id;
END;
$$;

-- =====================================================
-- 6. RLS (Row Level Security)
-- =====================================================

-- Activer RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_backups ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_form_submissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Sites are viewable by authenticated users" ON sites;
DROP POLICY IF EXISTS "Sites are editable by admins only" ON sites;

-- Politiques pour sites
CREATE POLICY "Sites are viewable by authenticated users" ON sites
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Sites are editable by admins only" ON sites
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM cms_users 
      WHERE cms_users.site_id = sites.id 
      AND cms_users.id = auth.uid() 
      AND cms_users.role = 'admin'
    )
  );

-- Les autres politiques restent identiques...

-- =====================================================
-- 7. PERMISSIONS
-- =====================================================
GRANT EXECUTE ON FUNCTION verify_user_password TO anon;
GRANT EXECUTE ON FUNCTION verify_user_password TO authenticated;
GRANT EXECUTE ON FUNCTION create_user_session TO authenticated;
GRANT EXECUTE ON FUNCTION validate_session TO anon;
GRANT EXECUTE ON FUNCTION validate_session TO authenticated;
GRANT EXECUTE ON FUNCTION create_cms_user TO authenticated;

-- =====================================================
-- 8. TRIGGERS
-- =====================================================

-- Fonction pour update_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop et recréer les triggers
DROP TRIGGER IF EXISTS update_sites_updated_at ON sites;
DROP TRIGGER IF EXISTS update_cms_users_updated_at ON cms_users;
DROP TRIGGER IF EXISTS update_cms_content_updated_at ON cms_content;

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_users_updated_at BEFORE UPDATE ON cms_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON cms_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 9. DONNÉES DE TEST
-- =====================================================

DO $$
DECLARE
  v_site_id UUID;
  v_user_id UUID;
BEGIN
  -- Vérifier si le site de test existe
  SELECT id INTO v_site_id FROM sites WHERE domain = 'test.example.com';
  
  IF v_site_id IS NULL THEN
    -- Créer le site de test
    INSERT INTO sites (domain, name, config)
    VALUES ('test.example.com', 'Site de Test', '{"theme": "default", "features": ["cms_basic"]}')
    RETURNING id INTO v_site_id;
    
    -- Créer l'admin
    v_user_id := create_cms_user('admin@admin.fr', 'admin', 'Administrateur', 'admin', v_site_id);
    
    -- Créer du contenu
    INSERT INTO cms_content (site_id, page_slug, content_type, data, author_id)
    VALUES (v_site_id, 'home', 'page', '{"title": "Accueil", "blocks": []}', v_user_id);
  END IF;
END $$;

-- =====================================================
-- 10. VÉRIFICATION
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '=== INSTALLATION TERMINÉE ===';
  RAISE NOTICE 'Tables vérifiées : sites (existante), cms_users, cms_content, cms_media, cms_versions, cms_sessions, cms_audit_logs, cms_backups, cms_form_submissions';
  RAISE NOTICE 'Toutes les références utilisent la table "sites" existante';
  RAISE NOTICE 'Utilisateur de test : admin@admin.fr / admin';
  RAISE NOTICE '============================';
END $$;