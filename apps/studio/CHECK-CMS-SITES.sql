-- Analyser cms_sites qui existe

-- 1. Structure de cms_sites
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_sites'
ORDER BY ordinal_position;

-- 2. Y a-t-il notre site dedans ?
SELECT * 
FROM cms_sites 
WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 3. Si non, voir ce qu'il y a
SELECT * FROM cms_sites LIMIT 5;

-- 4. Maintenant, créons les données manquantes si nécessaire
-- D'abord le site
INSERT INTO cms_sites (id) 
VALUES ('51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid)
ON CONFLICT (id) DO NOTHING;

-- 5. Puis le contenu
INSERT INTO cms_content (
    site_id,
    page_slug
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'index'
) ON CONFLICT DO NOTHING;

-- 6. Vérifier
SELECT 'Site existe:' as check, EXISTS(SELECT 1 FROM cms_sites WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid) as result
UNION ALL
SELECT 'Content existe:', EXISTS(SELECT 1 FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid);