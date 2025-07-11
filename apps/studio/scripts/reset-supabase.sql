-- =====================================================
-- SCRIPT DE RESET COMPLET - ATTENTION: SUPPRIME TOUT!
-- =====================================================
-- Ce script supprime complètement le CMS pour repartir de zéro
-- À UTILISER AVEC PRÉCAUTION !

-- Désactiver temporairement les contraintes de clés étrangères
SET session_replication_role = 'replica';

-- =====================================================
-- 1. SUPPRIMER LES TRIGGERS
-- =====================================================
DROP TRIGGER IF EXISTS update_cms_sites_updated_at ON cms_sites;
DROP TRIGGER IF EXISTS update_cms_users_updated_at ON cms_users;
DROP TRIGGER IF EXISTS update_cms_content_updated_at ON cms_content;

-- =====================================================
-- 2. SUPPRIMER LES FONCTIONS
-- =====================================================
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP FUNCTION IF EXISTS verify_user_password(TEXT, TEXT, UUID);
DROP FUNCTION IF EXISTS create_user_session(UUID, INET, TEXT);
DROP FUNCTION IF EXISTS validate_session(TEXT);
DROP FUNCTION IF EXISTS create_cms_user(TEXT, TEXT, TEXT, TEXT, UUID);

-- =====================================================
-- 3. SUPPRIMER LES TABLES (dans l'ordre des dépendances)
-- =====================================================
DROP TABLE IF EXISTS cms_form_submissions CASCADE;
DROP TABLE IF EXISTS cms_backups CASCADE;
DROP TABLE IF EXISTS cms_audit_logs CASCADE;
DROP TABLE IF EXISTS cms_sessions CASCADE;
DROP TABLE IF EXISTS cms_versions CASCADE;
DROP TABLE IF EXISTS cms_media CASCADE;
DROP TABLE IF EXISTS cms_content CASCADE;
DROP TABLE IF EXISTS cms_users CASCADE;
DROP TABLE IF EXISTS cms_sites CASCADE;

-- =====================================================
-- 4. RÉACTIVER LES CONTRAINTES
-- =====================================================
SET session_replication_role = 'origin';

-- =====================================================
-- 5. MESSAGE DE CONFIRMATION
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '=== RESET TERMINÉ ===';
  RAISE NOTICE 'Toutes les tables et fonctions du CMS ont été supprimées.';
  RAISE NOTICE 'Vous pouvez maintenant exécuter setup-supabase-production.sql';
  RAISE NOTICE '=====================';
END $$;