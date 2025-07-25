-- Vérifier la structure EXACTE des tables

-- 1. Structure de cms_sites
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cms_sites'
ORDER BY ordinal_position;

-- 2. Structure de cms_content
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cms_content'
ORDER BY ordinal_position;

-- 3. Structure de cms_users
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'cms_users'
ORDER BY ordinal_position;

-- 4. Voir s'il y a déjà des données
SELECT COUNT(*) as sites_count FROM cms_sites;
SELECT COUNT(*) as content_count FROM cms_content;
SELECT COUNT(*) as users_count FROM cms_users;