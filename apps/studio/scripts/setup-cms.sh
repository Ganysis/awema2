#!/bin/bash
# Script de setup du CMS en 5 minutes

echo "🚀 Setup AWEMA CMS avec Supabase"

# 1. Créer un projet Supabase
echo "1. Allez sur https://supabase.com et créez un projet gratuit"
echo "2. Notez votre URL et ANON KEY"
read -p "Appuyez sur Entrée quand c'est fait..."

# 2. Variables
read -p "Supabase URL: " SUPABASE_URL
read -p "Supabase ANON KEY: " SUPABASE_ANON_KEY

# 3. Créer le fichier de config
cat > cms-config.json <<EOF
{
  "supabase": {
    "url": "$SUPABASE_URL",
    "anonKey": "$SUPABASE_ANON_KEY"
  }
}
EOF

# 4. SQL pour Supabase
cat > setup-database.sql <<EOF
-- Tables pour le CMS multi-tenant
CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  domain TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  api_key UUID DEFAULT gen_random_uuid(),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  page TEXT NOT NULL,
  section TEXT NOT NULL,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(site_id, page, section)
);

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID REFERENCES sites(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  alt TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
EOF

echo "✅ Configuration créée !"
echo "📋 Copiez le contenu de setup-database.sql dans l'éditeur SQL de Supabase"
echo ""
echo "🎉 Votre CMS est prêt ! Coût total : 0€/mois"