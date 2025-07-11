-- AWEMA CMS Multi-tenant Schema - Version corrigée pour Supabase
-- Version: 2.1
-- Database: Supabase PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- 1. Sites (projets clients)
CREATE TABLE sites (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    subdomain VARCHAR(100) UNIQUE,
    plan VARCHAR(50) DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'premium')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'cancelled')),
    netlify_site_id VARCHAR(255),
    netlify_deploy_id VARCHAR(255),
    settings JSONB DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_deployed_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    -- Statistiques
    page_views INTEGER DEFAULT 0,
    form_submissions INTEGER DEFAULT 0,
    storage_used BIGINT DEFAULT 0,
    -- Limites selon le plan
    max_pages INTEGER DEFAULT 10,
    max_media_size BIGINT DEFAULT 52428800, -- 50MB par défaut
    max_form_submissions INTEGER DEFAULT 100,
    -- Features flags
    features JSONB DEFAULT '{"cms": true, "analytics": false, "forms": true, "seo": true}'
);

-- 2. Utilisateurs CMS
CREATE TABLE cms_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'client' CHECK (role IN ('super_admin', 'admin', 'client')),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    company VARCHAR(255),
    avatar_url VARCHAR(500),
    settings JSONB DEFAULT '{}',
    last_login_at TIMESTAMPTZ,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verification_token VARCHAR(255),
    password_reset_token VARCHAR(255),
    password_reset_expires TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(email, site_id)
);

-- 3. Contenu des sites
CREATE TABLE content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    page_id VARCHAR(255) NOT NULL,
    page_type VARCHAR(100) DEFAULT 'standard',
    page_title VARCHAR(255),
    page_slug VARCHAR(255),
    blocks JSONB DEFAULT '[]',
    seo JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES cms_users(id),
    updated_by UUID REFERENCES cms_users(id),
    version INTEGER DEFAULT 1,
    parent_version UUID,
    UNIQUE(site_id, page_id)
);

-- 4. Médias
CREATE TABLE media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255),
    mime_type VARCHAR(100),
    size BIGINT,
    width INTEGER,
    height INTEGER,
    url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    webp_url VARCHAR(500),
    alt_text VARCHAR(500),
    title VARCHAR(255),
    metadata JSONB DEFAULT '{}',
    folder VARCHAR(255) DEFAULT '/',
    uploaded_by UUID REFERENCES cms_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Historique des versions
CREATE TABLE content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID REFERENCES content(id) ON DELETE CASCADE NOT NULL,
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    version_number INTEGER NOT NULL,
    blocks JSONB NOT NULL,
    seo JSONB DEFAULT '{}',
    settings JSONB DEFAULT '{}',
    change_description TEXT,
    created_by UUID REFERENCES cms_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    restored_from UUID,
    UNIQUE(content_id, version_number)
);

-- 6. Formulaires et soumissions
CREATE TABLE form_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    form_id VARCHAR(255) NOT NULL,
    page_id VARCHAR(255),
    data JSONB NOT NULL,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    is_spam BOOLEAN DEFAULT FALSE,
    spam_score DECIMAL(3,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Analytics simplifiées (sans partitioning pour simplifier)
CREATE TABLE analytics_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('page_view', 'form_submit', 'click', 'custom')),
    page_path VARCHAR(500),
    event_data JSONB DEFAULT '{}',
    session_id VARCHAR(100),
    visitor_id VARCHAR(100),
    ip_address INET,
    user_agent TEXT,
    referrer TEXT,
    country_code VARCHAR(2),
    device_type VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Tokens API et webhooks
CREATE TABLE api_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(255) NOT NULL,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    permissions JSONB DEFAULT '["read"]',
    last_used_at TIMESTAMPTZ,
    expires_at TIMESTAMPTZ,
    created_by UUID REFERENCES cms_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE
);

-- 9. Cache et optimisations
CREATE TABLE cache_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_id UUID REFERENCES sites(id) ON DELETE CASCADE NOT NULL,
    cache_key VARCHAR(500) NOT NULL,
    cache_value JSONB,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, cache_key)
);

-- =====================================================
-- INDEX
-- =====================================================

-- Index pour améliorer les performances
CREATE INDEX idx_site_page ON content(site_id, page_slug);
CREATE INDEX idx_site_media ON media(site_id, folder);
CREATE INDEX idx_content_versions ON content_versions(content_id, created_at DESC);
CREATE INDEX idx_site_forms ON form_submissions(site_id, created_at DESC);
CREATE INDEX idx_site_analytics ON analytics_events(site_id, created_at DESC);
CREATE INDEX idx_session_analytics ON analytics_events(site_id, session_id);
CREATE INDEX idx_cache_expiry ON cache_entries(expires_at);
CREATE INDEX idx_sites_status ON sites(status) WHERE status = 'active';
CREATE INDEX idx_sites_plan ON sites(plan);
CREATE INDEX idx_content_published ON content(site_id, is_published) WHERE is_published = true;
CREATE INDEX idx_media_mime ON media(site_id, mime_type);
CREATE INDEX idx_forms_unread ON form_submissions(site_id, is_read) WHERE is_read = false;
CREATE INDEX idx_users_email ON cms_users(email);
CREATE INDEX idx_users_site ON cms_users(site_id);

-- =====================================================
-- VUES UTILES
-- =====================================================

-- Vue pour les statistiques des sites
CREATE VIEW site_stats AS
SELECT 
    s.id,
    s.name,
    s.domain,
    s.plan,
    COUNT(DISTINCT c.id) as page_count,
    COUNT(DISTINCT m.id) as media_count,
    COALESCE(SUM(m.size), 0) as total_storage,
    COUNT(DISTINCT f.id) as form_submission_count,
    MAX(c.updated_at) as last_content_update,
    MAX(f.created_at) as last_form_submission
FROM sites s
LEFT JOIN content c ON s.id = c.site_id
LEFT JOIN media m ON s.id = m.site_id
LEFT JOIN form_submissions f ON s.id = f.site_id
GROUP BY s.id;

-- Vue pour l'activité récente
CREATE VIEW recent_activity AS
SELECT 
    'content' as activity_type,
    c.site_id,
    c.id as resource_id,
    c.page_title as title,
    c.updated_at as activity_at,
    u.full_name as user_name,
    u.email as user_email
FROM content c
JOIN cms_users u ON c.updated_by = u.id
UNION ALL
SELECT 
    'media' as activity_type,
    m.site_id,
    m.id as resource_id,
    m.filename as title,
    m.created_at as activity_at,
    u.full_name as user_name,
    u.email as user_email
FROM media m
JOIN cms_users u ON m.uploaded_by = u.id
ORDER BY activity_at DESC;

-- =====================================================
-- FONCTIONS UTILES
-- =====================================================

-- Fonction pour générer un subdomain unique
CREATE OR REPLACE FUNCTION generate_unique_subdomain(base_name TEXT)
RETURNS TEXT AS $$
DECLARE
    subdomain TEXT;
    counter INT := 0;
BEGIN
    subdomain := regexp_replace(lower(base_name), '[^a-z0-9]', '-', 'g');
    subdomain := regexp_replace(subdomain, '-+', '-', 'g');
    subdomain := trim(both '-' from subdomain);
    
    WHILE EXISTS(SELECT 1 FROM sites WHERE subdomain = subdomain || CASE WHEN counter = 0 THEN '' ELSE '-' || counter::text END) LOOP
        counter := counter + 1;
    END LOOP;
    
    RETURN subdomain || CASE WHEN counter = 0 THEN '' ELSE '-' || counter::text END;
END;
$$ LANGUAGE plpgsql;

-- Fonction pour nettoyer les entrées de cache expirées
CREATE OR REPLACE FUNCTION cleanup_expired_cache()
RETURNS void AS $$
BEGIN
    DELETE FROM cache_entries WHERE expires_at < NOW();
END;
$$ LANGUAGE plpgsql;

-- Fonction pour calculer l'usage du stockage
CREATE OR REPLACE FUNCTION calculate_storage_usage(site_uuid UUID)
RETURNS BIGINT AS $$
BEGIN
    RETURN COALESCE((SELECT SUM(size) FROM media WHERE site_id = site_uuid), 0);
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- TRIGGERS
-- =====================================================

-- Trigger pour updated_at automatique
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON sites
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_users_updated_at BEFORE UPDATE ON cms_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_content_updated_at BEFORE UPDATE ON content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger pour versionning automatique
CREATE OR REPLACE FUNCTION create_content_version()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.blocks IS DISTINCT FROM NEW.blocks OR OLD.seo IS DISTINCT FROM NEW.seo THEN
        INSERT INTO content_versions (
            content_id, site_id, version_number, blocks, seo, settings, 
            created_by, change_description
        ) VALUES (
            NEW.id, NEW.site_id, NEW.version, OLD.blocks, OLD.seo, OLD.settings,
            NEW.updated_by, 'Automatic backup before update'
        );
        NEW.version := NEW.version + 1;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER content_versioning BEFORE UPDATE ON content
    FOR EACH ROW EXECUTE FUNCTION create_content_version();

-- Trigger pour limites de plan
CREATE OR REPLACE FUNCTION check_plan_limits()
RETURNS TRIGGER AS $$
DECLARE
    current_pages INTEGER;
    max_pages INTEGER;
BEGIN
    SELECT COUNT(*), MAX(s.max_pages) INTO current_pages, max_pages
    FROM content c
    JOIN sites s ON c.site_id = s.id
    WHERE c.site_id = NEW.site_id;
    
    IF current_pages >= max_pages THEN
        RAISE EXCEPTION 'Page limit reached for this plan';
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_page_limits BEFORE INSERT ON content
    FOR EACH ROW EXECUTE FUNCTION check_plan_limits();

-- =====================================================
-- POLITIQUES DE SÉCURITÉ (RLS)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE cache_entries ENABLE ROW LEVEL SECURITY;

-- Note: Les politiques RLS doivent être configurées selon vos besoins spécifiques
-- Voici des exemples basiques :

-- Politique pour les sites (accès selon l'utilisateur)
CREATE POLICY sites_policy ON sites
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = sites.id 
            AND cms_users.id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.id = auth.uid() 
            AND cms_users.role = 'super_admin'
        )
    );

-- Politique pour le contenu
CREATE POLICY content_policy ON content
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = content.site_id 
            AND cms_users.id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.id = auth.uid() 
            AND cms_users.role = 'super_admin'
        )
    );

-- Politique publique pour la lecture du contenu publié
CREATE POLICY public_content_read ON content
    FOR SELECT USING (is_published = true);

-- =====================================================
-- CONFIGURATION FINALE
-- =====================================================

-- Analyser les tables pour optimiser les requêtes
ANALYZE sites;
ANALYZE cms_users;
ANALYZE content;
ANALYZE media;

-- Message de succès
DO $$
BEGIN
    RAISE NOTICE 'Schema AWEMA CMS créé avec succès!';
    RAISE NOTICE 'Tables créées: sites, cms_users, content, media, content_versions, form_submissions, analytics_events, api_tokens, cache_entries';
    RAISE NOTICE 'Prochaine étape: Configurer Supabase Auth et créer un utilisateur admin';
END $$;