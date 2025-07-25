-- ANALYSE COMPLÈTE DU SCHÉMA SUPABASE (VERSION CORRIGÉE)

-- ========================================
-- 1. LISTER TOUTES LES TABLES
-- ========================================
SELECT '=== TOUTES LES TABLES ===' as section;
SELECT 
    schemaname,
    tablename as table_name,
    tableowner as owner
FROM pg_catalog.pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- ========================================
-- 2. STRUCTURE DÉTAILLÉE DE CHAQUE TABLE
-- ========================================
SELECT '=== STRUCTURE DES TABLES ===' as section;
SELECT 
    t.table_name,
    c.column_name,
    c.data_type,
    c.is_nullable,
    c.column_default
FROM information_schema.tables t
JOIN information_schema.columns c 
    ON t.table_name = c.table_name 
WHERE t.table_schema = 'public'
    AND t.table_type = 'BASE TABLE'
ORDER BY t.table_name, c.ordinal_position;

-- ========================================
-- 3. RELATIONS (FOREIGN KEYS)
-- ========================================
SELECT '=== FOREIGN KEYS ===' as section;
SELECT
    tc.table_name as from_table,
    kcu.column_name as from_column,
    ccu.table_name AS to_table,
    ccu.column_name AS to_column
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
    AND tc.table_schema = 'public';

-- ========================================
-- 4. COMPTER LES LIGNES
-- ========================================
SELECT '=== NOMBRE DE LIGNES PAR TABLE ===' as section;

-- Pour cms_users
SELECT 'cms_users' as table_name, COUNT(*) as row_count FROM cms_users
UNION ALL
-- Essayer cms_content
SELECT 'cms_content' as table_name, COUNT(*) as row_count FROM cms_content WHERE 1=1
UNION ALL
-- Essayer cms_sites
SELECT 'cms_sites' as table_name, COUNT(*) as row_count FROM cms_sites WHERE 1=1;

-- ========================================
-- 5. CHERCHER LES TABLES DU CMS
-- ========================================
SELECT '=== TABLES LIÉES AU CMS ===' as section;
SELECT DISTINCT
    table_name
FROM information_schema.tables
WHERE table_schema = 'public'
    AND (
        table_name LIKE '%cms%' OR
        table_name LIKE '%content%' OR
        table_name LIKE '%site%' OR
        table_name LIKE '%user%' OR
        table_name LIKE '%page%'
    )
ORDER BY table_name;

-- ========================================
-- 6. COLONNES AVEC site_id
-- ========================================
SELECT '=== TABLES AVEC site_id ===' as section;
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE column_name = 'site_id'
    AND table_schema = 'public'
ORDER BY table_name;

-- ========================================
-- 7. EXEMPLE DE DONNÉES cms_users
-- ========================================
SELECT '=== EXEMPLE cms_users ===' as section;
SELECT 
    id,
    email,
    site_id,
    role
FROM cms_users
LIMIT 3;

-- ========================================
-- 8. RLS STATUS SIMPLE
-- ========================================
SELECT '=== RLS STATUS ===' as section;
SELECT 
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
    AND tablename LIKE '%cms%'
ORDER BY tablename;