-- Désactiver temporairement les RLS pour permettre l'insertion
ALTER TABLE sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE content DISABLE ROW LEVEL SECURITY;
ALTER TABLE media DISABLE ROW LEVEL SECURITY;
ALTER TABLE content_versions DISABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events DISABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens DISABLE ROW LEVEL SECURITY;
ALTER TABLE cache_entries DISABLE ROW LEVEL SECURITY;

-- Note: Exécuter ce script dans l'éditeur SQL de Supabase
-- IMPORTANT: Réactiver les RLS après les tests avec enable-rls.sql