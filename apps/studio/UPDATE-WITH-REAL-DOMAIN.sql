-- METTRE À JOUR avec le VRAI domaine déployé

-- 1. D'abord, voyons quels domaines existent déjà
SELECT id, domain, site_name, status 
FROM cms_sites 
ORDER BY created_at DESC
LIMIT 10;

-- 2. Si vous connaissez le domaine de votre site déployé, mettez-le ici
-- Remplacez 'VOTRE-SITE.netlify.app' par le vrai domaine
UPDATE cms_sites 
SET domain = 'VOTRE-SITE.netlify.app'  -- <-- REMPLACEZ ICI
WHERE id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'::uuid;

-- 3. Alternative : Si vous voulez utiliser le site_id d'un site déjà déployé
-- Cherchons les sites qui ont l'air d'être déployés
SELECT 
    s.id::text as site_id,
    s.domain,
    s.site_name,
    u.email as admin_email
FROM cms_sites s
JOIN cms_users u ON u.site_id = s.id
WHERE s.domain LIKE '%.netlify.app'
   OR s.domain LIKE '%.com'
   OR s.domain LIKE '%.fr'
ORDER BY s.created_at DESC;

-- 4. Pour débugger : voir quel site_id est utilisé dans le JavaScript du site déployé
-- Dans la console du navigateur sur le site déployé, tapez :
-- window.SITE_ID ou window.CMS_CONFIG?.siteId