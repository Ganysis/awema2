-- ANALYSE SIMPLE - Qu'est-ce qui existe VRAIMENT ?

-- 1. Lister TOUTES les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- 2. On sait que cms_users existe avec 28 lignes
-- Voyons sa structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_users'
ORDER BY ordinal_position;

-- 3. Chercher TOUTES les tables qui ont une colonne site_id
SELECT table_name 
FROM information_schema.columns 
WHERE column_name = 'site_id' 
AND table_schema = 'public';

-- 4. Pour chaque table trouvée, voir si elle contient des données pour notre site
-- site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'