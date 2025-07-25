-- Correction du problème UUID dans cms_content

-- 1. D'abord, vérifier la structure de la table
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_content'
ORDER BY ordinal_position;

-- 2. Vérifier s'il y a déjà des données
SELECT * FROM cms_content LIMIT 5;

-- 3. Si site_id est de type UUID, utiliser un UUID valide
-- Générer un nouveau UUID pour le site
DO $$
DECLARE
    new_site_id UUID := gen_random_uuid();
BEGIN
    -- Afficher le nouveau site_id
    RAISE NOTICE 'Nouveau site_id UUID: %', new_site_id;
    
    -- Insérer les données avec un UUID valide
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
        new_site_id,
        'index',
        'Page d''accueil',
        'homepage',
        '{"title": "Bienvenue", "description": "Site de test CMS"}',
        '[]'::jsonb,
        '{}'::jsonb,
        true
    );
END $$;

-- 4. Alternative : Si vous voulez vraiment utiliser 'site-1752866606272'
-- Il faut d'abord changer le type de la colonne (DANGEREUX en production!)
-- ALTER TABLE cms_content ALTER COLUMN site_id TYPE TEXT;

-- 5. Voir toutes les données après insertion
SELECT site_id, page_slug, page_title FROM cms_content;

-- 6. Pour le développement, créer un site de test avec un UUID fixe
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
    '00000000-0000-0000-0000-000000000001'::uuid,  -- UUID de test fixe
    'index',
    'Page d''accueil TEST',
    'homepage',
    '{"title": "Site de Test", "description": "CMS AWEMA"}',
    '[]'::jsonb,
    '{}'::jsonb,
    true
) ON CONFLICT DO NOTHING;

-- Récupérer le site_id pour l'utiliser dans le code
SELECT 
    site_id::text as site_id_string,
    page_slug,
    page_title 
FROM cms_content;