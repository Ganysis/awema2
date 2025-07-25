-- Créer les données pour le nouveau site avec UUID ef8d6ae3-0f91-4356-a2bc-3604c71bc17e

-- 1. Créer le site
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    'ef8d6ae3-0f91-4356-a2bc-3604c71bc17e'::uuid,
    'votre-nouveau-site.netlify.app',  -- Remplacez par le vrai domaine
    'Nouveau Site AWEMA',
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
    'ef8d6ae3-0f91-4356-a2bc-3604c71bc17e'::uuid,
    'index',
    'page',
    '{
        "page_title": "Accueil",
        "page_slug": "index",
        "blocks": []
    }'::jsonb,
    '{"seo": {}}'::jsonb,
    true,
    (SELECT id FROM cms_users WHERE email = 'admin@admin.fr' LIMIT 1)
) ON CONFLICT (site_id, page_slug) DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- 3. Vérifier
SELECT 'Site créé avec UUID: ef8d6ae3-0f91-4356-a2bc-3604c71bc17e' as info;