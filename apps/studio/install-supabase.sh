#!/bin/bash

echo "📦 Installation de @supabase/supabase-js directement..."

# Aller dans le dossier studio
cd /home/Ganyc/Desktop/awema/awema2/apps/studio

# Installer directement dans node_modules
mkdir -p node_modules/@supabase

# Télécharger depuis npm registry
echo "Téléchargement de supabase-js..."
npm pack @supabase/supabase-js@latest
tar -xf supabase-supabase-js-*.tgz
mv package node_modules/@supabase/supabase-js
rm supabase-supabase-js-*.tgz

# Installer les dépendances de supabase-js
cd node_modules/@supabase/supabase-js
npm install --production

echo "✅ Installation terminée !"
echo ""
echo "Si ça ne fonctionne pas, installez pnpm :"
echo "  sudo npm install -g pnpm"
echo "  pnpm install"