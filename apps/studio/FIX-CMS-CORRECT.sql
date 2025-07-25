-- SOLUTION CORRIGÉE avec tous les champs obligatoires

-- 1. D'abord, voir la structure exacte de cms_sites
SELECT 
    column_name, 
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'cms_sites'
ORDER BY ordinal_position;

-- 2. Voir s'il y a déjà des sites pour comprendre le format
SELECT * FROM cms_sites LIMIT 2;

-- 3. Créer le site avec TOUS les champs obligatoires
INSERT INTO cms_sites (
    id,
    domain,
    name,
    config,
    status
) VALUES (
    '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid,
    'site-awema.netlify.app',  -- domain obligatoire
    'Site AWEMA Test',          -- name probablement obligatoire aussi
    '{}'::jsonb,                -- config par défaut
    'active'                    -- status
) ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW();

-- 4. Maintenant créer le contenu
DELETE FROM cms_content 
WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid
AND page_slug = 'index';

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
                    "subtitle": "Créez des sites professionnels",
                    "ctaText": "Commencer",
                    "ctaLink": "#contact"
                }
            }
        ]
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

-- 5. Vérifier
SELECT 'Site créé' as status FROM cms_sites WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid
UNION ALL
SELECT 'Contenu créé' FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 6. Voir le résultat
SELECT * FROM cms_content WHERE site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;