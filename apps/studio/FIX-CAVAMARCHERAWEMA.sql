-- Créer les données pour le site cavamarcherawema avec le bon UUID

-- 1. Créer le site
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    '6077b1aa-684b-450b-88dc-a6b3c4e10478'::uuid,
    'cavamarcherawema.netlify.app',
    'Ça Marche AWEMA',
    '{}'::jsonb,
    'active'
) ON CONFLICT (id) DO UPDATE SET
    domain = EXCLUDED.domain,
    updated_at = NOW();

-- 2. Créer le contenu
INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published,
    author_id
) VALUES (
    '6077b1aa-684b-450b-88dc-a6b3c4e10478'::uuid,
    'index',
    'page',
    '{
        "page_title": "Accueil",
        "blocks": []
    }'::jsonb,
    '{"seo": {}}'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
) ON CONFLICT (site_id, page_slug) DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- 3. Vérifier
SELECT 'Site créé avec UUID: 6077b1aa-684b-450b-88dc-a6b3c4e10478' as info;