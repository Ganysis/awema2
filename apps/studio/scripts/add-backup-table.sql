-- Table pour stocker les informations de backup
CREATE TABLE IF NOT EXISTS backups (
    id VARCHAR(255) PRIMARY KEY,
    site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
    backup_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    size_bytes BIGINT,
    storage_path TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'daily' CHECK (type IN ('daily', 'weekly', 'monthly', 'manual')),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    INDEX idx_backups_site_date (site_id, backup_date DESC)
);

-- RLS pour les backups
ALTER TABLE backups ENABLE ROW LEVEL SECURITY;

-- Seul le service role peut accéder aux backups
CREATE POLICY "Service role manages backups" ON backups
    FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role');

-- Trigger pour nettoyer automatiquement les vieux backups
CREATE OR REPLACE FUNCTION cleanup_old_backups()
RETURNS TRIGGER AS $$
BEGIN
    -- Supprimer les backups de plus de 30 jours pour les sites gratuits
    DELETE FROM backups
    WHERE backup_date < NOW() - INTERVAL '30 days'
    AND site_id IN (
        SELECT id FROM sites WHERE plan = 'starter'
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_backups_trigger
AFTER INSERT ON backups
FOR EACH STATEMENT
EXECUTE FUNCTION cleanup_old_backups();

-- Créer le bucket de storage pour les backups (à exécuter dans la console Supabase)
-- INSERT INTO storage.buckets (id, name, public, file_size_limit)
-- VALUES ('backups', 'backups', false, 104857600)
-- ON CONFLICT (id) DO NOTHING;