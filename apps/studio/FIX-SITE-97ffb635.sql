-- Script pour créer/vérifier les données du site 97ffb635-78b6-4983-81d4-f83d02b37f08

-- 1. Vérifier si le site existe
SELECT 'Vérification du site...' as info;
SELECT id, site_name, domain, status FROM cms_sites WHERE id = '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid;

-- 2. Créer le site s'il n'existe pas
INSERT INTO cms_sites (
    id,
    domain,
    site_name,
    config,
    status
) VALUES (
    '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid,
    'nouveau-site.netlify.app',
    'Site AWEMA',
    '{}'::jsonb,
    'active'
) ON CONFLICT (id) DO UPDATE SET
    status = 'active',
    updated_at = NOW();

-- 3. Créer le contenu initial
INSERT INTO cms_content (
    site_id,
    page_slug,
    content_type,
    data,
    meta,
    published
) VALUES (
    '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid,
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

-- 4. Vérifier que les données sont bien créées
SELECT 'Contenu créé:' as info;
SELECT id, page_slug, content_type, published FROM cms_content 
WHERE site_id = '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid;

-- 5. Test de la requête problématique
SELECT 'Test de la requête:' as info;
SELECT * FROM cms_content 
WHERE site_id = '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid 
ORDER BY page_slug;

-- Note: Si cette requête fonctionne en SQL mais pas via l'API REST,
-- c'est probablement un problème de RLS (Row Level Security)