-- Créer les données pour le site 6bbf89df-f90c-4b26-b893-fa87616ef737

-- 1. Créer le site
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    '6bbf89df-f90c-4b26-b893-fa87616ef737'::uuid,
    'nouveau-site.netlify.app',
    'Site AWEMA Export',
    '{}'::jsonb,
    'active'
) ON CONFLICT (id) DO UPDATE SET
    status = 'active',
    updated_at = NOW();

-- 2. Créer le contenu initial
INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published
) VALUES (
    '6bbf89df-f90c-4b26-b893-fa87616ef737'::uuid,
    'index',
    'page',
    '{
        "page_title": "Accueil",
        "page_slug": "index",
        "blocks": []
    }'::jsonb,
    '{"seo": {}}'::jsonb,
    true
) ON CONFLICT (site_id, page_slug) DO UPDATE SET
    updated_at = NOW();

-- 3. Vérifier
SELECT 'Site créé:' as info;
SELECT * FROM cms_content WHERE site_id = '6bbf89df-f90c-4b26-b893-fa87616ef737'::uuid;