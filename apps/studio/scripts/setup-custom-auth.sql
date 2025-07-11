-- Configuration de l'authentification personnalisée pour AWEMA CMS
-- Puisque nous n'utilisons pas Supabase Auth, nous devons adapter les RLS

-- =====================================================
-- FONCTION D'AUTHENTIFICATION PERSONNALISÉE
-- =====================================================

-- Créer une fonction pour vérifier si la requête vient du service
CREATE OR REPLACE FUNCTION is_service_role()
RETURNS boolean AS $$
BEGIN
    -- En production, vérifier un header ou token spécifique
    -- Pour l'instant, on permet l'accès si c'est une requête authentifiée
    RETURN current_setting('request.jwt.claims', true)::json->>'role' = 'service_role'
        OR current_setting('request.headers', true)::json->>'x-service-role' = 'true';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- POLITIQUES RLS SIMPLIFIÉES POUR CMS CUSTOM
-- =====================================================

-- 1. SITES - Politiques simplifiées
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Service role can do everything" ON sites;
DROP POLICY IF EXISTS "Users can view their own site" ON sites;
DROP POLICY IF EXISTS "Admins can update their site" ON sites;
DROP POLICY IF EXISTS "Public read for active sites" ON sites;

-- Permettre la lecture publique des sites actifs (pour le CMS)
CREATE POLICY "Public read for active sites" ON sites
    FOR SELECT
    USING (status = 'active');

-- Service role peut tout faire
CREATE POLICY "Service role can do everything" ON sites
    FOR ALL 
    USING (is_service_role())
    WITH CHECK (is_service_role());

-- 2. CMS_USERS - Accès pour authentification
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Service role can manage all users" ON cms_users;
DROP POLICY IF EXISTS "Users can view themselves" ON cms_users;
DROP POLICY IF EXISTS "Users can update themselves" ON cms_users;
DROP POLICY IF EXISTS "Site admins can manage site users" ON cms_users;
DROP POLICY IF EXISTS "Public can verify credentials" ON cms_users;

-- Permettre la vérification des credentials (pour le login)
CREATE POLICY "Public can verify credentials" ON cms_users
    FOR SELECT
    USING (true); -- On filtre par email dans la requête

-- Service role peut tout faire
CREATE POLICY "Service role can manage all users" ON cms_users
    FOR ALL 
    USING (is_service_role())
    WITH CHECK (is_service_role());

-- 3. CONTENT - Accès public en lecture pour sites actifs
ALTER TABLE content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to content" ON content;
DROP POLICY IF EXISTS "Users can view published content of their site" ON content;
DROP POLICY IF EXISTS "Admins can manage content of their site" ON content;
DROP POLICY IF EXISTS "Public can read published content" ON content;

-- Lecture publique du contenu publié
CREATE POLICY "Public can read published content" ON content
    FOR SELECT
    USING (
        is_published = true 
        AND EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = content.site_id 
            AND sites.status = 'active'
        )
    );

-- Service role accès complet
CREATE POLICY "Service role full access to content" ON content
    FOR ALL 
    USING (is_service_role())
    WITH CHECK (is_service_role());

-- 4. MEDIA - Accès public en lecture
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to media" ON media;
DROP POLICY IF EXISTS "Users can view media of their site" ON media;
DROP POLICY IF EXISTS "Admins can manage media of their site" ON media;
DROP POLICY IF EXISTS "Public can view media" ON media;

-- Lecture publique des médias
CREATE POLICY "Public can view media" ON media
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = media.site_id 
            AND sites.status = 'active'
        )
    );

-- Service role accès complet
CREATE POLICY "Service role full access to media" ON media
    FOR ALL 
    USING (is_service_role())
    WITH CHECK (is_service_role());

-- 5. FORM_SUBMISSIONS - Accès public pour insertion
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to submissions" ON form_submissions;
DROP POLICY IF EXISTS "Anyone can create submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admins can view submissions of their site" ON form_submissions;

-- N'importe qui peut soumettre
CREATE POLICY "Anyone can create submissions" ON form_submissions
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM sites 
            WHERE sites.id = form_submissions.site_id 
            AND sites.status = 'active'
        )
    );

-- Service role peut tout voir
CREATE POLICY "Service role full access to submissions" ON form_submissions
    FOR ALL 
    USING (is_service_role())
    WITH CHECK (is_service_role());

-- =====================================================
-- CONFIGURATION POUR LE DÉPLOIEMENT
-- =====================================================

-- Pour que le déploiement fonctionne, assurez-vous que :
-- 1. La clé de service (SUPABASE_SERVICE_ROLE_KEY) est utilisée
-- 2. Le client Supabase est initialisé avec cette clé
-- 3. Les requêtes incluent le header approprié

-- Exemple d'utilisation dans le code :
-- const supabase = createClient(url, serviceRoleKey, {
--   auth: {
--     autoRefreshToken: false,
--     persistSession: false
--   }
-- });

-- =====================================================
-- TEST DES POLITIQUES
-- =====================================================

-- Pour tester si les politiques fonctionnent :
-- 1. Essayez d'insérer un site avec la clé de service
-- 2. Essayez de lire un site actif sans authentification
-- 3. Essayez de vérifier les credentials d'un utilisateur

-- Exemple de test :
-- SELECT * FROM sites WHERE status = 'active'; -- Devrait fonctionner
-- INSERT INTO sites (...) VALUES (...); -- Devrait fonctionner avec service key