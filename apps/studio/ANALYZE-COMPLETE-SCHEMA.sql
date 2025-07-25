-- ANALYSE COMPLÈTE DU SCHÉMA SUPABASE
-- Exécutez ce script pour tout comprendre

-- ========================================
-- 1. LISTER TOUTES LES TABLES
-- ========================================
SELECT '=== TOUTES LES TABLES ===' as section;
SELECT 
    schemaname,
    tablename as table_name,
    tableowner as owner
FROM pg_catalog.pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY schemaname, tablename;

-- ========================================
-- 2. STRUCTURE DÉTAILLÉE DE CHAQUE TABLE
-- ========================================
SELECT '=== STRUCTURE DES TABLES ===' as section;

-- Méthode générique pour voir TOUTES les colonnes de TOUTES les tables
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.character_maximum_length,
    c.is_nullable,
    c.column_default
FROM information_schema.tables t
JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
    AND t.table_schema = c.table_schema
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;

-- ========================================
-- 3. TOUTES LES CLÉS ÉTRANGÈRES
-- ========================================
SELECT '=== RELATIONS ENTRE TABLES (Foreign Keys) ===' as section;
SELECT
    tc.table_name as from_table,
    kcu.column_name as from_column,
    ccu.table_name AS to_table,
    ccu.column_name AS to_column,
    tc.constraint_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
    AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
    AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public'
ORDER BY tc.table_name;

-- ========================================
-- 4. INDEXES
-- ========================================
SELECT '=== INDEXES ===' as section;
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
ORDER BY tablename, indexname;

-- ========================================
-- 5. RLS (Row Level Security)
-- ========================================
SELECT '=== RLS STATUS ===' as section;
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ========================================
-- 6. POLICIES
-- ========================================
SELECT '=== POLICIES RLS ===' as section;
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ========================================
-- 7. VUES (Views)
-- ========================================
SELECT '=== VUES ===' as section;
SELECT 
    table_name as view_name,
    view_definition
FROM information_schema.views
WHERE table_schema = 'public'
ORDER BY table_name;

-- ========================================
-- 8. DONNÉES EXISTANTES (sample)
-- ========================================
SELECT '=== ÉCHANTILLON DE DONNÉES ===' as section;

-- Compter les lignes dans chaque table
SELECT 
    schemaname,
    tablename,
    n_live_tup as row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

-- ========================================
-- 9. SPÉCIFIQUE CMS - Recherche intelligente
-- ========================================
SELECT '=== TABLES LIÉES AU CMS ===' as section;

-- Chercher toutes les tables qui pourraient être liées au CMS
SELECT DISTINCT
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_schema = 'public'
    AND (
        table_name LIKE '%cms%' OR
        table_name LIKE '%content%' OR
        table_name LIKE '%page%' OR
        table_name LIKE '%site%' OR
        table_name LIKE '%user%' OR
        table_name LIKE '%media%' OR
        column_name LIKE '%site_id%' OR
        column_name LIKE '%page%'
    )
ORDER BY table_name, ordinal_position;

-- ========================================
-- 10. DIAGNOSTIC FINAL
-- ========================================
SELECT '=== DIAGNOSTIC CMS ===' as section;

-- Vérifier spécifiquement cms_users et ses relations
SELECT 
    'cms_users existe avec ' || COUNT(*) || ' utilisateurs' as status
FROM cms_users;

-- Chercher la table qui contient site_id = '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5'
-- Cette requête va chercher dans TOUTES les tables
DO $$
DECLARE
    r RECORD;
    result_count INTEGER;
BEGIN
    FOR r IN 
        SELECT table_name 
        FROM information_schema.columns 
        WHERE column_name = 'site_id' 
        AND table_schema = 'public'
    LOOP
        EXECUTE format('SELECT COUNT(*) FROM %I WHERE site_id = %L', 
                      r.table_name, 
                      '51d168f6-4fcd-4c0e-90d3-c0eade2dd3e5') 
        INTO result_count;
        
        IF result_count > 0 THEN
            RAISE NOTICE 'Table % contient % lignes pour ce site_id', r.table_name, result_count;
        END IF;
    END LOOP;
END $$;