-- CORRIGER pour le site déployé cavamarcherawema.netlify.app

-- 1. Mettre à jour le domaine pour notre site
UPDATE cms_sites 
SET domain = 'cavamarcherawema.netlify.app'
WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 2. Vérifier
SELECT id::text as site_id, domain, site_name 
FROM cms_sites 
WHERE domain = 'cavamarcherawema.netlify.app';

-- 3. Si aucun résultat, créer une nouvelle entrée
INSERT INTO cms_sites (
    domain,
    site_name,
    config,
    status
) VALUES (
    'cavamarcherawema.netlify.app',
    'Ça Marche AWEMA',
    '{"theme": "modern", "features": ["cms", "seo"]}'::jsonb,
    'active'
) ON CONFLICT DO NOTHING
RETURNING id::text as new_site_id;

-- 4. Créer du contenu pour ce site
-- D'abord obtenir l'ID du site
WITH site AS (
    SELECT id FROM cms_sites WHERE domain = 'cavamarcherawema.netlify.app' LIMIT 1
)
INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    author_id
)
SELECT
    site.id,
    'index',
    'page',
    '{
        "page_title": "Accueil",
        "page_slug": "index",
        "blocks": []
    }'::jsonb,
    '{"seo": {"title": "AWEMA", "description": "Site test"}}'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
FROM site
ON CONFLICT (site_id, page_slug) DO NOTHING;

-- 5. Afficher le site_id à utiliser
SELECT 
    'Utilisez ce site_id dans le JavaScript:' as info,
    id::text as site_id_to_use
FROM cms_sites 
WHERE domain = 'cavamarcherawema.netlify.app';