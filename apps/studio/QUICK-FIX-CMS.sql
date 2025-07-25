-- SOLUTION RAPIDE POUR FAIRE FONCTIONNER LE CMS

-- 1. Vérifier si les tables existent
SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cms_content') as cms_content_exists;
SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'cms_sites') as cms_sites_exists;

-- 2. Si cms_content n'existe pas, la créer
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

-- 3. Si cms_sites n'existe pas, la créer
CREATE TABLE IF NOT EXISTS cms_sites (
    id UUID PRIMARY KEY,
    site_name VARCHAR(255),
    subdomain VARCHAR(100),
    domain VARCHAR(255),
    plan VARCHAR(50) DEFAULT 'premium',
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Désactiver RLS pour tester
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;

-- 5. Créer une policy simple pour lecture
DROP POLICY IF EXISTS "public_read" ON cms_content;
CREATE POLICY "public_read" ON cms_content FOR SELECT USING (true);

-- 6. Utiliser le site_id de l'admin existant
-- site_id: 51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5

-- Créer le site s'il n'existe pas
INSERT INTO cms_sites (id, site_name, subdomain) 
VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'Mon Site AWEMA',
    'mon-site'
) ON CONFLICT (id) DO NOTHING;

-- 7. Créer une page d'accueil
DELETE FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

INSERT INTO cms_content (
    site_id,
    page_slug,
    page_title,
    content,
    blocks
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'index',
    'Accueil',
    '{"title": "Bienvenue", "description": "Site AWEMA"}'::jsonb,
    '[{"id": "hero-1", "type": "hero-ultra-modern", "props": {"title": "Bienvenue sur AWEMA", "subtitle": "Créez des sites professionnels"}}]'::jsonb
);

-- 8. Vérifier
SELECT 'OK: Site créé' as status WHERE EXISTS (SELECT 1 FROM cms_sites WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid);
SELECT 'OK: Contenu créé' as status WHERE EXISTS (SELECT 1 FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid);

-- 9. Afficher le résultat
SELECT * FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;