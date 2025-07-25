-- Utiliser le site_id existant pour créer les données

-- 1. D'abord, vérifions si cms_sites existe avec ce site_id
SELECT * FROM cms_sites WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 2. Si cms_sites n'existe pas, la créer d'abord
CREATE TABLE IF NOT EXISTS cms_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name VARCHAR(255),
    subdomain VARCHAR(100),
    domain VARCHAR(255),
    plan VARCHAR(50) DEFAULT 'premium',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Si cms_content n'existe pas, la créer
CREATE TABLE IF NOT EXISTS cms_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id UUID NOT NULL,
    page_slug VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    page_type VARCHAR(50) DEFAULT 'standard',
    content JSONB DEFAULT '{}',
    blocks JSONB DEFAULT '[]',
    seo JSONB DEFAULT '{}',
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(site_id, page_slug)
);

-- 4. Désactiver RLS pour le moment
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;

-- 5. Insérer le site avec l'ID existant
INSERT INTO cms_sites (
    id,
    site_name,
    subdomain,
    domain,
    plan,
    status
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,  -- Le site_id de l'admin
    'Site AWEMA',
    'site-awema',
    'site-awema.netlify.app',
    'premium',
    'active'
) ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW();

-- 6. Insérer du contenu pour ce site
INSERT INTO cms_content (
    site_id,
    page_slug,
    page_title,
    page_type,
    content,
    blocks,
    seo,
    is_published
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,  -- Le même site_id
    'index',
    'Page d''accueil',
    'homepage',
    '{"title": "Bienvenue sur AWEMA", "description": "Site créé avec AWEMA Studio"}',
    '[{"id": "hero-1", "type": "hero-ultra-modern", "props": {"title": "Bienvenue", "subtitle": "Site de test CMS"}}]'::jsonb,
    '{"title": "AWEMA - Accueil", "description": "Site professionnel"}',
    true
) ON CONFLICT (site_id, page_slug) DO UPDATE SET
    updated_at = NOW();

-- 7. Vérifier que tout est créé
SELECT 'Site ID à utiliser: 51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5' as info;
SELECT * FROM cms_sites WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;
SELECT * FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 8. IMPORTANT : Le site_id à utiliser dans le JavaScript est :
-- 51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5