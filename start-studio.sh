#!/bin/bash

echo "🚀 Démarrage d'AWEMA Studio..."

# Aller à la racine du projet
cd /home/Ganyc/Desktop/awema/awema2

# Lancer avec pnpm
echo "📦 Lancement avec pnpm..."
npx pnpm@10.12.1 dev --filter @awema/studio

# Alternative : lancer seulement studio
# cd apps/studio && npm run dev