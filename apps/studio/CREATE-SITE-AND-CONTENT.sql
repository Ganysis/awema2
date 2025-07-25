-- CRÉER LE SITE ET LE CONTENU CORRECTEMENT

-- 1. Créer le site avec les bons champs
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'site-awema.netlify.app',
    'Site AWEMA Test',
    '{"theme": "modern", "features": ["cms", "seo"]}'::jsonb,
    'active'
) ON CONFLICT (id) DO UPDATE SET
    domain = EXCLUDED.domain,
    site_name = EXCLUDED.site_name,
    updated_at = NOW();

-- 2. Créer le contenu
INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    author_id
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'index',
    'page',
    '{
        "page_title": "Accueil",
        "page_slug": "index",
        "blocks": [
            {
                "id": "hero-1",
                "type": "hero-ultra-modern",
                "props": {
                    "title": "Bienvenue sur AWEMA",
                    "subtitle": "Créez des sites professionnels"
                }
            }
        ]
    }'::jsonb,
    '{"seo": {"title": "AWEMA", "description": "Site test"}}'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
) ON CONFLICT (site_id, page_slug) DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- 3. Vérifier que tout est créé
SELECT 
    cs.site_name,
    cs.domain,
    COUNT(cc.id) as pages_count
FROM cms_sites cs
LEFT JOIN cms_content cc ON cs.id = cc.site_id
WHERE cs.id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid
GROUP BY cs.id, cs.site_name, cs.domain;