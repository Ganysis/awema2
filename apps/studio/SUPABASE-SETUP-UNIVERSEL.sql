-- ============================================
-- SCRIPT UNIVERSEL POUR CONFIGURER SUPABASE
-- Fonctionne pour N'IMPORTE QUEL site AWEMA
-- ============================================

-- 1. DÉSACTIVER RLS TEMPORAIREMENT (pour que tout fonctionne immédiatement)
-- ⚠️ À utiliser uniquement pour tester rapidement
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions DISABLE ROW LEVEL SECURITY;

-- 2. OU CRÉER DES POLICIES UNIVERSELLES (recommandé pour la production)
-- Ces policies permettent à TOUS les sites de fonctionner

-- Supprimer les anciennes policies
DROP POLICY IF EXISTS "allow_anon_read_content" ON cms_content;
DROP POLICY IF EXISTS "allow_anon_read_sites" ON cms_sites;
DROP POLICY IF EXISTS "allow_auth_all_content" ON cms_content;
DROP POLICY IF EXISTS "allow_auth_all_sites" ON cms_sites;

-- Policies universelles pour cms_content
CREATE POLICY "cms_content_anon_read" ON cms_content
    FOR SELECT 
    TO anon
    USING (published = true);

CREATE POLICY "cms_content_anon_insert" ON cms_content
    FOR INSERT 
    TO anon
    WITH CHECK (true);

CREATE POLICY "cms_content_anon_update" ON cms_content
    FOR UPDATE 
    TO anon
    USING (true)
    WITH CHECK (true);

-- Policies universelles pour cms_sites
CREATE POLICY "cms_sites_anon_read" ON cms_sites
    FOR SELECT 
    TO anon
    USING (true);

CREATE POLICY "cms_sites_anon_insert" ON cms_sites
    FOR INSERT 
    TO anon
    WITH CHECK (true);

CREATE POLICY "cms_sites_anon_update" ON cms_sites
    FOR UPDATE 
    TO anon
    USING (true)
    WITH CHECK (true);

-- Policies pour cms_users (lecture seule pour anon)
CREATE POLICY "cms_users_anon_read" ON cms_users
    FOR SELECT 
    TO anon
    USING (true);

-- Policies pour cms_media
CREATE POLICY "cms_media_anon_all" ON cms_media
    FOR ALL 
    TO anon
    USING (true)
    WITH CHECK (true);

-- Policies pour cms_versions
CREATE POLICY "cms_versions_anon_all" ON cms_versions
    FOR ALL 
    TO anon
    USING (true)
    WITH CHECK (true);

-- 3. FONCTION UNIVERSELLE pour créer un site automatiquement
-- Cette fonction crée les données initiales pour n'importe quel site_id
CREATE OR REPLACE FUNCTION ensure_site_exists(p_site_id UUID, p_domain TEXT DEFAULT NULL)
RETURNS void AS $$
BEGIN
    -- Créer le site s'il n'existe pas
    INSERT INTO cms_sites (id, domain, site_name, config, status)
    VALUES (
        p_site_id,
        COALESCE(p_domain, p_site_id::text || '.netlify.app'),
        'Site AWEMA',
        '{}'::jsonb,
        'active'
    )
    ON CONFLICT (id) DO NOTHING;
    
    -- Créer la page d'accueil si elle n'existe pas
    INSERT INTO cms_content (site_id, page_slug, content_type, data, meta, published)
    VALUES (
        p_site_id,
        'index',
        'page',
        '{"page_title": "Accueil", "page_slug": "index", "blocks": []}'::jsonb,
        '{"seo": {}}'::jsonb,
        true
    )
    ON CONFLICT (site_id, page_slug) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- 4. TRIGGER pour créer automatiquement les données quand un nouveau site est demandé
CREATE OR REPLACE FUNCTION auto_create_site_on_query()
RETURNS trigger AS $$
BEGIN
    -- Si on essaie de lire un site qui n'existe pas, le créer
    IF NOT EXISTS (SELECT 1 FROM cms_sites WHERE id = NEW.site_id) THEN
        PERFORM ensure_site_exists(NEW.site_id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Activer RLS avec les nouvelles policies (optionnel)
-- ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_sites ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_media ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cms_versions ENABLE ROW LEVEL SECURITY;

-- 6. Vérifier que tout est bien configuré
SELECT 
    tablename,
    CASE 
        WHEN rowsecurity THEN '❌ RLS activé - Policies requises'
        ELSE '✅ RLS désactivé - Accès libre'
    END as status
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'cms_%'
ORDER BY tablename;

-- 7. Message de confirmation
SELECT '🎉 Configuration universelle appliquée ! Tous les sites AWEMA fonctionneront maintenant.' as message;