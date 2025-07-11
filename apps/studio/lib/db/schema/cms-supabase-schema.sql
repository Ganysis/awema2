-- Schéma Supabase pour le CMS multi-tenant AWEMA
-- Ce schéma remplace localStorage par une vraie base de données

-- Table des sites (multi-tenant)
CREATE TABLE cms_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  domain TEXT UNIQUE,
  subdomain TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  
  -- Index pour les recherches
  INDEX idx_cms_sites_project_id (project_id),
  INDEX idx_cms_sites_domain (domain),
  INDEX idx_cms_sites_subdomain (subdomain)
);

-- Table du contenu CMS (remplace localStorage)
CREATE TABLE cms_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES cms_sites(id) ON DELETE CASCADE,
  key TEXT NOT NULL, -- Ex: 'pages', 'businessInfo', 'theme', etc.
  data JSONB NOT NULL, -- Le contenu JSON
  version INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_by UUID REFERENCES auth.users(id),
  
  -- Contrainte unique pour éviter les doublons
  UNIQUE(site_id, key),
  
  -- Index pour les recherches
  INDEX idx_cms_content_site_id (site_id),
  INDEX idx_cms_content_key (key)
);

-- Table de l'historique des versions (remplace version-history localStorage)
CREATE TABLE cms_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES cms_sites(id) ON DELETE CASCADE,
  content_id UUID NOT NULL REFERENCES cms_content(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  data JSONB NOT NULL, -- Snapshot du contenu
  type TEXT NOT NULL, -- 'manual', 'auto'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Index pour les recherches
  INDEX idx_cms_versions_site_id (site_id),
  INDEX idx_cms_versions_content_id (content_id),
  INDEX idx_cms_versions_created_at (created_at DESC)
);

-- Table des médias uploadés
CREATE TABLE cms_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES cms_sites(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL, -- 'image', 'video', 'document'
  mime_type TEXT,
  size INTEGER,
  width INTEGER,
  height INTEGER,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Index pour les recherches
  INDEX idx_cms_media_site_id (site_id),
  INDEX idx_cms_media_type (type),
  INDEX idx_cms_media_created_at (created_at DESC)
);

-- Table des sessions CMS (remplace auth token localStorage)
CREATE TABLE cms_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES cms_sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  
  -- Index pour les recherches
  INDEX idx_cms_sessions_token (token),
  INDEX idx_cms_sessions_user_id (user_id),
  INDEX idx_cms_sessions_expires_at (expires_at)
);

-- Table des permissions CMS
CREATE TABLE cms_permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES cms_sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor', -- 'admin', 'editor', 'viewer'
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  
  -- Contrainte unique
  UNIQUE(site_id, user_id),
  
  -- Index
  INDEX idx_cms_permissions_site_user (site_id, user_id)
);

-- Row Level Security (RLS) pour multi-tenant
ALTER TABLE cms_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_permissions ENABLE ROW LEVEL SECURITY;

-- Policies RLS pour cms_sites
CREATE POLICY "Users can view their own sites" ON cms_sites
  FOR SELECT
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM cms_permissions
      WHERE cms_permissions.site_id = cms_sites.id
      AND cms_permissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own sites" ON cms_sites
  FOR UPDATE
  USING (
    created_by = auth.uid() OR
    EXISTS (
      SELECT 1 FROM cms_permissions
      WHERE cms_permissions.site_id = cms_sites.id
      AND cms_permissions.user_id = auth.uid()
      AND cms_permissions.role IN ('admin', 'editor')
    )
  );

-- Policies RLS pour cms_content
CREATE POLICY "Users can view content of their sites" ON cms_content
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM cms_sites
      WHERE cms_sites.id = cms_content.site_id
      AND (
        cms_sites.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM cms_permissions
          WHERE cms_permissions.site_id = cms_sites.id
          AND cms_permissions.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Users can modify content of their sites" ON cms_content
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM cms_sites
      WHERE cms_sites.id = cms_content.site_id
      AND (
        cms_sites.created_by = auth.uid() OR
        EXISTS (
          SELECT 1 FROM cms_permissions
          WHERE cms_permissions.site_id = cms_sites.id
          AND cms_permissions.user_id = auth.uid()
          AND cms_permissions.role IN ('admin', 'editor')
        )
      )
    )
  );

-- Fonction pour nettoyer les sessions expirées
CREATE OR REPLACE FUNCTION cleanup_expired_cms_sessions()
RETURNS void AS $$
BEGIN
  DELETE FROM cms_sessions WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Fonction trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_cms_sites_updated_at BEFORE UPDATE ON cms_sites
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON cms_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Fonction pour créer une nouvelle version
CREATE OR REPLACE FUNCTION create_cms_version()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO cms_versions (
    site_id,
    content_id,
    version_number,
    data,
    type,
    description,
    created_by
  ) VALUES (
    NEW.site_id,
    NEW.id,
    NEW.version,
    OLD.data,
    'auto',
    'Version automatique avant modification',
    NEW.updated_by
  );
  
  -- Incrémenter le numéro de version
  NEW.version = OLD.version + 1;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger pour créer automatiquement des versions
CREATE TRIGGER create_version_on_update
  BEFORE UPDATE OF data ON cms_content
  FOR EACH ROW
  WHEN (OLD.data IS DISTINCT FROM NEW.data)
  EXECUTE FUNCTION create_cms_version();

-- Vue pour faciliter l'accès au contenu actuel
CREATE VIEW cms_current_content AS
SELECT
  cs.id as site_id,
  cs.domain,
  cs.subdomain,
  cs.name as site_name,
  cc.key,
  cc.data,
  cc.version,
  cc.updated_at,
  u.email as updated_by_email
FROM cms_sites cs
JOIN cms_content cc ON cc.site_id = cs.id
LEFT JOIN auth.users u ON u.id = cc.updated_by
WHERE cs.is_active = true;

-- Index pour optimiser les performances
CREATE INDEX idx_cms_content_updated_at ON cms_content(updated_at DESC);
CREATE INDEX idx_cms_versions_version_number ON cms_versions(version_number DESC);
CREATE INDEX idx_cms_media_filename ON cms_media(filename);

-- Fonction helper pour obtenir le contenu d'un site
CREATE OR REPLACE FUNCTION get_cms_site_content(p_site_id UUID)
RETURNS TABLE (
  key TEXT,
  data JSONB,
  version INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    cc.key,
    cc.data,
    cc.version,
    cc.updated_at
  FROM cms_content cc
  WHERE cc.site_id = p_site_id
  ORDER BY cc.key;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour sauvegarder tout le contenu d'un site
CREATE OR REPLACE FUNCTION save_cms_site_content(
  p_site_id UUID,
  p_content JSONB,
  p_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_key TEXT;
  v_data JSONB;
BEGIN
  -- Parcourir chaque clé du contenu
  FOR v_key, v_data IN SELECT * FROM jsonb_each(p_content)
  LOOP
    -- Upsert le contenu
    INSERT INTO cms_content (site_id, key, data, updated_by)
    VALUES (p_site_id, v_key, v_data, p_user_id)
    ON CONFLICT (site_id, key)
    DO UPDATE SET
      data = EXCLUDED.data,
      updated_by = EXCLUDED.updated_by;
  END LOOP;
  
  RETURN TRUE;
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;