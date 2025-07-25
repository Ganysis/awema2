-- Solution immédiate pour faire fonctionner le CMS

-- Option 1 : Créer des policies permissives pour l'accès anonyme (RECOMMANDÉ)
-- Cela permet au CMS de fonctionner tout en gardant RLS activé

-- Policy pour cms_content : permettre la lecture à tous
CREATE POLICY IF NOT EXISTS "allow_anon_read_content" ON cms_content
FOR SELECT
TO anon
USING (published = true);

-- Policy pour cms_sites : permettre la lecture à tous
CREATE POLICY IF NOT EXISTS "allow_anon_read_sites" ON cms_sites
FOR SELECT
TO anon
USING (status = 'active');

-- Policy pour permettre toutes les opérations aux utilisateurs authentifiés
CREATE POLICY IF NOT EXISTS "allow_auth_all_content" ON cms_content
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "allow_auth_all_sites" ON cms_sites
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Option 2 : Si ça ne marche toujours pas, désactiver RLS temporairement
-- ⚠️ ATTENTION : Ceci désactive la sécurité, à utiliser uniquement pour tester

-- ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;

-- Pour réactiver RLS plus tard :
-- ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_sites ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;

-- Vérifier les policies créées
SELECT tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename IN ('cms_content', 'cms_sites')
ORDER BY tablename, policyname;