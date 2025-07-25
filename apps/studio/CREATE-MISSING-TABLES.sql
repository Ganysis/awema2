-- Créer les tables manquantes si elles n'existent pas

-- 1. Créer cms_sites si elle n'existe pas
CREATE TABLE IF NOT EXISTS cms_sites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    domain VARCHAR(255),
    plan VARCHAR(50) DEFAULT 'starter',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Créer cms_content si elle n'existe pas
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

-- 3. Désactiver RLS temporairement pour tester
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;

-- 4. Créer les policies pour lecture publique
CREATE POLICY IF NOT EXISTS "Allow public read cms_sites" ON cms_sites FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "Allow public read cms_content" ON cms_content FOR SELECT USING (true);

-- 5. Insérer des données de test
INSERT INTO cms_sites (
    id,
    site_name,
    subdomain,
    domain,
    plan,
    status
) VALUES (
    '00000000-0000-0000-0000-000000000001'::uuid,
    'Site Test CMS',
    'test-cms',
    'test-cms.netlify.app',
    'premium',
    'active'
) ON CONFLICT DO NOTHING;

-- 6. Insérer une page de test
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
    '00000000-0000-0000-0000-000000000001'::uuid,
    'index',
    'Page d''accueil',
    'homepage',
    '{"title": "Bienvenue sur AWEMA", "description": "Site de test CMS"}',
    '[]'::jsonb,
    '{"title": "AWEMA - Accueil", "description": "Site créé avec AWEMA Studio"}',
    true
) ON CONFLICT DO NOTHING;

-- 7. Vérifier que tout est créé
SELECT 'Tables créées avec succès!' as message;
SELECT * FROM cms_sites;
SELECT * FROM cms_content;