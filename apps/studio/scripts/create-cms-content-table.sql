-- Script pour créer la table cms_content si elle n'existe pas
-- Et corriger les problèmes de permissions

-- Créer la table cms_content si elle n'existe pas
CREATE TABLE IF NOT EXISTS cms_content (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    site_id UUID NOT NULL,
    page_id VARCHAR(255) NOT NULL,
    page_title VARCHAR(255),
    page_slug VARCHAR(255),
    blocks JSONB DEFAULT '[]'::jsonb,
    seo JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    version INTEGER DEFAULT 1,
    is_published BOOLEAN DEFAULT true,
    published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(site_id, page_slug)
);

-- Créer un index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_cms_content_site_id ON cms_content(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_content_page_slug ON cms_content(page_slug);

-- Activer RLS
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

-- Créer une politique pour permettre la lecture publique
CREATE POLICY "Enable read access for all users" ON cms_content
    FOR SELECT USING (true);

-- Créer une politique pour permettre l'insertion pour tous (temporaire pour les tests)
CREATE POLICY "Enable insert for all users" ON cms_content
    FOR INSERT WITH CHECK (true);

-- Créer une politique pour permettre la mise à jour pour tous (temporaire pour les tests)
CREATE POLICY "Enable update for all users" ON cms_content
    FOR UPDATE USING (true);

-- Note: Pour la production, remplacez les politiques ci-dessus par des politiques plus restrictives
-- Par exemple :
-- CREATE POLICY "Enable write access for authenticated users only" ON cms_content
--     FOR ALL USING (auth.role() = 'authenticated');

-- Créer une fonction pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Créer un trigger pour mettre à jour automatiquement updated_at
CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON cms_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();