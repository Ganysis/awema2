/**
 * Configuration des noms de tables Supabase
 * 
 * Ce fichier permet de gérer les différentes conventions de nommage
 * selon le script SQL utilisé pour créer les tables.
 */

export interface SupabaseTablesConfig {
  sites: string;
  users: string;
  content: string;
  media: string;
  versions: string;
  sessions: string;
  auditLogs: string;
  backups: string;
  formSubmissions: string;
  analyticsEvents?: string;
  apiTokens?: string;
  cacheEntries?: string;
}

/**
 * Configuration pour le script setup-supabase-production.sql
 * Toutes les tables ont le préfixe cms_
 */
export const PRODUCTION_TABLES: SupabaseTablesConfig = {
  sites: 'cms_sites',
  users: 'cms_users',
  content: 'cms_content',
  media: 'cms_media',
  versions: 'cms_versions',
  sessions: 'cms_sessions',
  auditLogs: 'cms_audit_logs',
  backups: 'cms_backups',
  formSubmissions: 'cms_form_submissions'
};

/**
 * Configuration pour le script supabase-tables.sql
 * Seule la table users a le préfixe cms_
 */
export const STANDARD_TABLES: SupabaseTablesConfig = {
  sites: 'sites',
  users: 'cms_users',
  content: 'content',
  media: 'media',
  versions: 'content_versions',
  sessions: 'sessions', // Non défini dans ce schema
  auditLogs: 'audit_logs', // Non défini dans ce schema
  backups: 'backups', // Non défini dans ce schema
  formSubmissions: 'form_submissions',
  analyticsEvents: 'analytics_events',
  apiTokens: 'api_tokens',
  cacheEntries: 'cache_entries'
};

/**
 * Configuration actuelle - À modifier selon votre installation
 * 
 * Si vous avez exécuté setup-supabase-production.sql : utilisez PRODUCTION_TABLES
 * Si vous avez exécuté supabase-tables.sql : utilisez STANDARD_TABLES
 */
export const SUPABASE_TABLES = PRODUCTION_TABLES;

/**
 * Helper pour obtenir le nom de table correct
 */
export function getTableName(table: keyof SupabaseTablesConfig): string {
  return SUPABASE_TABLES[table];
}