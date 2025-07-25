-- Solution pour faire fonctionner le CMS

-- 1. Vérifier la structure de cms_content
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cms_content'
ORDER BY ordinal_position;

-- 2. Si site_id est bien UUID, cherchons s'il y a déjà des sites
SELECT * FROM cms_sites LIMIT 5;

-- 3. Créer un site de test avec UUID
INSERT INTO cms_sites (
    id,
    name,
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
) ON CONFLICT (id) DO NOTHING;

-- 4. Créer le contenu pour ce site
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
    '00000000-0000-0000-0000-000000000001'::uuid,  -- UUID du site test
    'index',
    'Page d''accueil',
    'homepage',
    '{"title": "Bienvenue sur AWEMA", "description": "Site de test CMS"}',
    '[]'::jsonb,
    '{"title": "AWEMA - Accueil", "description": "Site créé avec AWEMA Studio"}',
    true
) ON CONFLICT DO NOTHING;

-- 5. Créer un utilisateur admin pour ce site
INSERT INTO cms_users (
    email,
    site_id,
    role,
    is_active
) VALUES (
    'admin@admin.fr',
    '00000000-0000-0000-0000-000000000001'::uuid,
    'admin',
    true
) ON CONFLICT DO NOTHING;

-- 6. Vérifier que tout est créé
SELECT 
    s.id::text as site_id,
    s.name as site_name,
    s.subdomain,
    COUNT(c.id) as pages_count
FROM cms_sites s
LEFT JOIN cms_content c ON c.site_id = s.id
WHERE s.id = '00000000-0000-0000-0000-000000000001'::uuid
GROUP BY s.id, s.name, s.subdomain;

-- 7. IMPORTANT : Noter le site_id pour l'utiliser dans le code
-- Le site_id à utiliser est : 00000000-0000-0000-0000-000000000001