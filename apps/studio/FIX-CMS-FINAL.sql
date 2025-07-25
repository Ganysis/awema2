-- SOLUTION FINALE avec la VRAIE structure

-- 1. Voir s'il y a déjà du contenu pour notre site
SELECT * FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 2. Voir la structure de cms_sites
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_sites'
ORDER BY ordinal_position;

-- 3. Créer/mettre à jour le site
INSERT INTO cms_sites (id) 
VALUES ('51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid)
ON CONFLICT (id) DO NOTHING;

-- 4. Supprimer l'ancien contenu s'il existe
DELETE FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid
AND page_slug = 'index';

-- 5. Créer le contenu avec la BONNE structure
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
        "title": "Page d''accueil",
        "blocks": [
            {
                "id": "hero-1",
                "type": "hero-ultra-modern",
                "props": {
                    "title": "Bienvenue sur AWEMA",
                    "subtitle": "Créez des sites professionnels",
                    "ctaText": "Commencer",
                    "ctaLink": "#contact"
                }
            }
        ],
        "content": {
            "title": "Bienvenue",
            "description": "Site créé avec AWEMA Studio"
        }
    }'::jsonb,
    '{
        "seo": {
            "title": "AWEMA - Accueil",
            "description": "Site professionnel créé avec AWEMA Studio"
        }
    }'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
);

-- 6. Vérifier que tout est créé
SELECT 
    page_slug,
    content_type,
    data->>'title' as page_title,
    jsonb_array_length(data->'blocks') as blocks_count,
    published
FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 7. IMPORTANT : Le site_id à utiliser est
SELECT '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5' as "SITE_ID À UTILISER DANS LE JAVASCRIPT";