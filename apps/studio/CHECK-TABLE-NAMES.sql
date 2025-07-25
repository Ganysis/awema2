-- Vérifier les vraies tables dans Supabase

-- 1. Lister toutes les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- 2. Si les tables ont le préfixe cms_
-- Voir la structure de cms_content
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'cms_content'
ORDER BY ordinal_position;

-- 3. Si les tables n'ont PAS le préfixe cms_
-- Voir la structure de content
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'content'
ORDER BY ordinal_position;

-- 4. Solution temporaire : créer une vue si nécessaire
-- Si la table s'appelle 'content' mais le code cherche 'cms_content'
CREATE OR REPLACE VIEW cms_content AS 
SELECT * FROM content;

-- 5. Pareil pour les autres tables
CREATE OR REPLACE VIEW cms_sites AS 
SELECT * FROM sites;

CREATE OR REPLACE VIEW cms_users AS 
SELECT * FROM users;

CREATE OR REPLACE VIEW cms_media AS 
SELECT * FROM media;