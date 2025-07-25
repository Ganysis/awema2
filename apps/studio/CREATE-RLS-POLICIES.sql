-- Policies RLS sécurisées pour le CMS AWEMA
-- À exécuter dans Supabase SQL Editor

-- 1. D'abord, vérifier si RLS est activé
SELECT 
  tablename,
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'cms_%';

-- 2. Si RLS est activé, créer les policies appropriées

-- POLICY 1 : Lecture publique des contenus publiés
CREATE POLICY "Lecture publique des contenus" 
ON cms_content 
FOR SELECT 
USING (true);  -- Tout le monde peut lire

-- POLICY 2 : Lecture publique des infos de sites
CREATE POLICY "Lecture publique des sites" 
ON cms_sites 
FOR SELECT 
USING (true);

-- POLICY 3 : Les utilisateurs authentifiés peuvent modifier leur contenu
CREATE POLICY "Modification par utilisateurs authentifiés" 
ON cms_content 
FOR ALL 
USING (
  -- Vérifier que l'utilisateur a accès à ce site
  EXISTS (
    SELECT 1 FROM cms_users 
    WHERE cms_users.email = auth.jwt()->>'email'
    AND cms_users.site_id = cms_content.site_id
  )
);

-- POLICY 4 : Lecture des médias publics
CREATE POLICY "Lecture publique des médias" 
ON cms_media 
FOR SELECT 
USING (true);

-- POLICY 5 : Upload de médias par utilisateurs authentifiés
CREATE POLICY "Upload médias par utilisateurs" 
ON cms_media 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM cms_users 
    WHERE cms_users.email = auth.jwt()->>'email'
    AND cms_users.site_id = cms_media.site_id
  )
);

-- 3. Pour le développement/test, policy temporaire plus permissive
-- (À RETIRER EN PRODUCTION)
CREATE POLICY "Dev - Accès complet avec anon key" 
ON cms_content 
FOR ALL 
USING (
  -- Autoriser si c'est la clé anon (pour dev)
  current_setting('request.jwt.claim.role', true) = 'anon'
)
WITH CHECK (
  current_setting('request.jwt.claim.role', true) = 'anon'
);

-- 4. Vérifier que les policies sont créées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual 
FROM pg_policies 
WHERE tablename LIKE 'cms_%';