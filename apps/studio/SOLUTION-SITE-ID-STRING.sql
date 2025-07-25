-- SOLUTION : Le site utilise 'site-1752866606272' mais la DB attend un UUID

-- Option 1 : Convertir le string en UUID déterministe
-- On va créer un UUID à partir du string de manière cohérente
WITH site_uuid AS (
    -- Créer un UUID v5 basé sur le string (déterministe)
    SELECT uuid_generate_v5(uuid_ns_dns(), 'site-1752866606272') as id
)
-- Créer le site avec cet UUID
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) 
SELECT 
    id,
    'cavamarcherawema.netlify.app',
    'Ça Marche AWEMA',
    '{"theme": "modern", "features": ["cms", "seo"]}'::jsonb,
    'active'
FROM site_uuid
ON CONFLICT (id) DO UPDATE SET
    domain = EXCLUDED.domain,
    updated_at = NOW();

-- Obtenir l'UUID généré
SELECT 
    uuid_generate_v5(uuid_ns_dns(), 'site-1752866606272')::text as "UUID à utiliser",
    'site-1752866606272' as "Site ID original"
;

-- Option 2 : Utiliser un UUID fixe et patcher le JavaScript
-- Si l'option 1 ne marche pas, on peut utiliser un UUID fixe
-- et patcher le JavaScript pour l'utiliser

-- Créer avec UUID fixe
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    '12345678-1234-5678-1234-567812345678'::uuid,  -- UUID simple à retenir
    'cavamarcherawema.netlify.app',
    'Ça Marche AWEMA',
    '{"theme": "modern", "features": ["cms", "seo"]}'::jsonb,
    'active'
) ON CONFLICT (id) DO UPDATE SET
    domain = EXCLUDED.domain,
    updated_at = NOW();

-- Créer du contenu pour les deux options
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
    uuid_generate_v5(uuid_ns_dns(), 'site-1752866606272'),
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
ON CONFLICT (site_id, page_slug) DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- Vérifier
SELECT 
    id::text as site_id_uuid,
    domain,
    site_name
FROM cms_sites 
WHERE domain = 'cavamarcherawema.netlify.app';