-- Script pour corriger les problèmes de permissions Supabase
-- Exécuter dans Supabase SQL Editor

-- 1. Désactiver RLS temporairement sur toutes les tables cms_*
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;

-- 2. Vérifier que la table cms_content existe et a la bonne structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cms_content';

-- 3. Insérer des données de test si la table est vide
INSERT INTO cms_content (
  site_id, 
  page_slug, 
  page_title,
  content,
  blocks,
  seo
) VALUES (
  'site-1752866606272',
  'accueil',
  'Page d''accueil',
  '{"title": "Bienvenue", "description": "Site de test"}',
  '[]',
  '{}'
) ON CONFLICT (site_id, page_slug) DO NOTHING;

-- 4. Vérifier que les données sont bien présentes
SELECT * FROM cms_content WHERE site_id = 'site-1752866606272';

-- 5. Pour la production, réactiver RLS avec des policies appropriées
-- ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow anonymous read" ON cms_content FOR SELECT USING (true);
-- CREATE POLICY "Allow authenticated write" ON cms_content FOR ALL USING (auth.role() = 'authenticated');