-- Trouver les VRAIES tables dans la base

-- 1. Lister TOUTES les tables qui existent
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Chercher toutes les tables qui contiennent 'cms' ou 'content' ou 'site'
SELECT 
    table_name
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND (
    table_name LIKE '%cms%' OR 
    table_name LIKE '%content%' OR 
    table_name LIKE '%site%' OR
    table_name LIKE '%user%'
)
ORDER BY table_name;

-- 3. Si cms_users existe et a 28 entrées, voyons sa structure
SELECT 
    column_name, 
    data_type
FROM information_schema.columns 
WHERE table_name = 'cms_users'
LIMIT 10;

-- 4. Voir un exemple d'utilisateur
SELECT * FROM cms_users LIMIT 1;