-- Maintenant qu'on sait que cms_content existe, analysons-la

-- 1. Structure de cms_content
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_content'
ORDER BY ordinal_position;

-- 2. Y a-t-il des données dans cms_content ?
SELECT COUNT(*) as total_content FROM cms_content;

-- 3. Y a-t-il des données pour notre site_id ?
SELECT COUNT(*) as content_for_site 
FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 4. Si oui, voir ce qu'il y a
SELECT * 
FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid
LIMIT 5;

-- 5. Quelles tables ont site_id ?
SELECT table_name 
FROM information_schema.columns 
WHERE column_name = 'site_id' 
AND table_schema = 'public';

-- 6. Voir s'il y a une table cms_sites
SELECT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'cms_sites'
) as cms_sites_exists;