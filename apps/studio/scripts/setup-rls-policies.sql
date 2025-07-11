-- Configuration des politiques RLS pour AWEMA CMS
-- Ces politiques permettent un fonctionnement sécurisé du système

-- =====================================================
-- 1. SITES - Politiques pour la table des sites
-- =====================================================

-- Activer RLS sur la table sites
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques si elles existent
DROP POLICY IF EXISTS "Service role can do everything" ON sites;
DROP POLICY IF EXISTS "Users can view their own site" ON sites;
DROP POLICY IF EXISTS "Admins can update their site" ON sites;

-- Politique 1: Service role peut tout faire (pour le déploiement automatique)
CREATE POLICY "Service role can do everything" ON sites
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Politique 2: Les utilisateurs peuvent voir leur propre site
CREATE POLICY "Users can view their own site" ON sites
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = sites.id 
            AND cms_users.id = auth.uid()
        )
    );

-- Politique 3: Les admins peuvent mettre à jour leur site
CREATE POLICY "Admins can update their site" ON sites
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = sites.id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = sites.id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- =====================================================
-- 2. CMS_USERS - Politiques pour les utilisateurs
-- =====================================================

-- Activer RLS
ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;

-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Service role can manage all users" ON cms_users;
DROP POLICY IF EXISTS "Users can view themselves" ON cms_users;
DROP POLICY IF EXISTS "Users can update themselves" ON cms_users;
DROP POLICY IF EXISTS "Site admins can manage site users" ON cms_users;

-- Politique 1: Service role peut tout faire
CREATE POLICY "Service role can manage all users" ON cms_users
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Politique 2: Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view themselves" ON cms_users
    FOR SELECT
    USING (auth.uid() = id);

-- Politique 3: Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update themselves" ON cms_users
    FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = role); -- Empêche de changer son propre rôle

-- Politique 4: Les admins du site peuvent gérer les utilisateurs de leur site
CREATE POLICY "Site admins can manage site users" ON cms_users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cms_users AS admin
            WHERE admin.id = auth.uid()
            AND admin.site_id = cms_users.site_id
            AND admin.role IN ('admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM cms_users AS admin
            WHERE admin.id = auth.uid()
            AND admin.site_id = cms_users.site_id
            AND admin.role IN ('admin', 'super_admin')
        )
    );

-- =====================================================
-- 3. CONTENT - Politiques pour le contenu
-- =====================================================

ALTER TABLE content ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to content" ON content;
DROP POLICY IF EXISTS "Users can view published content of their site" ON content;
DROP POLICY IF EXISTS "Admins can manage content of their site" ON content;

-- Service role accès complet
CREATE POLICY "Service role full access to content" ON content
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Les utilisateurs peuvent voir le contenu publié de leur site
CREATE POLICY "Users can view published content of their site" ON content
    FOR SELECT
    USING (
        is_published = true
        AND EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = content.site_id 
            AND cms_users.id = auth.uid()
        )
    );

-- Les admins peuvent gérer tout le contenu de leur site
CREATE POLICY "Admins can manage content of their site" ON content
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = content.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = content.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- =====================================================
-- 4. MEDIA - Politiques pour les médias
-- =====================================================

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to media" ON media;
DROP POLICY IF EXISTS "Users can view media of their site" ON media;
DROP POLICY IF EXISTS "Admins can manage media of their site" ON media;

-- Service role accès complet
CREATE POLICY "Service role full access to media" ON media
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- Les utilisateurs peuvent voir les médias de leur site
CREATE POLICY "Users can view media of their site" ON media
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = media.site_id 
            AND cms_users.id = auth.uid()
        )
    );

-- Les admins peuvent gérer les médias de leur site
CREATE POLICY "Admins can manage media of their site" ON media
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = media.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = media.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- =====================================================
-- 5. FORM_SUBMISSIONS - Politiques pour les soumissions
-- =====================================================

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access to submissions" ON form_submissions;
DROP POLICY IF EXISTS "Anyone can create submissions" ON form_submissions;
DROP POLICY IF EXISTS "Admins can view submissions of their site" ON form_submissions;

-- Service role accès complet
CREATE POLICY "Service role full access to submissions" ON form_submissions
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- N'importe qui peut soumettre un formulaire (visiteurs du site)
CREATE POLICY "Anyone can create submissions" ON form_submissions
    FOR INSERT
    WITH CHECK (true);

-- Les admins peuvent voir les soumissions de leur site
CREATE POLICY "Admins can view submissions of their site" ON form_submissions
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = form_submissions.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- =====================================================
-- 6. AUTRES TABLES
-- =====================================================

-- Content versions
ALTER TABLE content_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON content_versions
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Admins can manage versions" ON content_versions
    FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            JOIN content ON content.id = content_versions.content_id
            WHERE cms_users.site_id = content.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- Analytics events
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access analytics" ON analytics_events
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anyone can insert analytics" ON analytics_events
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins can view analytics" ON analytics_events
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM cms_users 
            WHERE cms_users.site_id = analytics_events.site_id 
            AND cms_users.id = auth.uid()
            AND cms_users.role IN ('admin', 'super_admin')
        )
    );

-- API tokens
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages tokens" ON api_tokens
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Users can view their tokens" ON api_tokens
    FOR SELECT
    USING (user_id = auth.uid());

-- Cache entries
ALTER TABLE cache_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages cache" ON cache_entries
    FOR ALL 
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- =====================================================
-- NOTES IMPORTANTES
-- =====================================================
-- 1. Ces politiques permettent :
--    - Au service role (clé de service) de tout faire
--    - Aux utilisateurs de voir leur contenu
--    - Aux admins de gérer leur site
--    - Aux visiteurs de soumettre des formulaires
--
-- 2. Pour que l'authentification fonctionne dans le CMS,
--    il faut utiliser Supabase Auth ou implémenter
--    une authentification personnalisée
--
-- 3. Le déploiement automatique utilise la clé de service
--    qui a le rôle 'service_role' et peut donc tout faire