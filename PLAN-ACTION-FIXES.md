# 🔧 PLAN D'ACTION - RÉSOLUTION DES PROBLÈMES AWEMA V2

## 1️⃣ INSTALLER SQLITE3 CLI (2 min)

```bash
# Installation
sudo apt-get update
sudo apt-get install sqlite3

# Vérification
sqlite3 --version
```

## 2️⃣ CORRIGER LES MÉTHODES MANQUANTES (5 min)

Les méthodes `generateHomePageInternal` et `generateNavigation` sont déjà présentes mais avec des noms différents. 

**Solution:** Créer des alias dans le fichier de base
```typescript
// Dans /apps/studio/lib/templates/base/template-modulaire-base.ts
// Ajouter après la ligne 68:

generateHomePageInternal(data: ClientFormData, structure: any, config: any): string {
  return this.generateHomePage(data, structure, config);
}

generateNavigation(data: ClientFormData, currentPage?: string): string {
  return this.generateNavigationHTML(data, currentPage);
}
```

## 3️⃣ CONFIGURER SUPABASE (5 min)

### Option A: Sans Supabase (Recommandé pour commencer)
```bash
# Créer .env.local avec des valeurs factices
cat > apps/studio/.env.local << 'EOF'
# Supabase (optionnel - désactivé pour l'instant)
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_service_key
EOF
```

### Option B: Avec Supabase (Si vous avez un compte)
1. Aller sur https://supabase.com
2. Créer un nouveau projet gratuit
3. Récupérer les clés dans Settings > API
4. Ajouter dans .env.local

## 4️⃣ CONFIGURER NETLIFY (3 min)

### Option A: Sans déploiement (Pour tests locaux)
```bash
# Ajouter dans .env.local
echo "NETLIFY_AUTH_TOKEN=placeholder_token" >> apps/studio/.env.local
echo "NETLIFY_SITE_ID=placeholder_site_id" >> apps/studio/.env.local
```

### Option B: Avec Netlify (Pour déploiement réel)
1. Créer un compte sur https://netlify.com
2. Aller dans User Settings > Applications > Personal Access Tokens
3. Créer un nouveau token
4. Ajouter dans .env.local

## 5️⃣ COMPLÉTER NETLIFY.TOML (2 min)

```bash
# Créer un netlify.toml complet
cat > apps/studio/netlify.toml << 'EOF'
[build]
  command = "npm run build"
  publish = "out"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
EOF
```

## 6️⃣ NETTOYER LES TEMPLATES (10 min)

### Supprimer les backups
```bash
# Supprimer les fichiers .backup
rm apps/studio/lib/templates/*.backup
rm apps/studio/lib/templates/base/*.backup

# Supprimer les templates dupliqués ou non utilisés
ls -lah apps/studio/lib/templates/*.ts | sort -k5 -rh | head -20
# Identifier les plus gros et supprimer les duplicatas
```

### Compresser les templates
```bash
# Option: Minifier les templates
# npm install -g terser
# for file in apps/studio/lib/templates/*.ts; do
#   terser "$file" -o "$file.min.ts"
# done
```

## 7️⃣ OPTIMISER LE BUILD .NEXT (15 min)

### Nettoyer le cache
```bash
# Supprimer le cache de build
rm -rf apps/studio/.next
rm -rf apps/studio/node_modules/.cache

# Rebuild propre
cd apps/studio
npm run build
```

### Optimiser next.config.js
```javascript
// Dans apps/studio/next.config.js
module.exports = {
  // Optimisations
  swcMinify: true,
  compress: true,
  
  // Réduire la taille du build
  productionBrowserSourceMaps: false,
  
  // Optimisation des images
  images: {
    domains: ['localhost'],
    formats: ['image/webp'],
  },
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        crypto: false,
      };
    }
    return config;
  },
}
```

## 8️⃣ NETTOYER LES FICHIERS HTML (5 min)

### Analyse rapide
```bash
# Compter les fichiers
find apps/studio/public -name "*.html" | wc -l

# Voir la répartition
du -sh apps/studio/public/*/
```

### Nettoyage sélectif
```bash
# ATTENTION: Garder quelques exemples

# 1. Supprimer les sites générés de test
rm -rf apps/studio/public/generated-sites/*

# 2. Garder seulement 5 démos
cd apps/studio/public/demo-sites
ls -t | tail -n +6 | xargs rm -rf

# 3. Supprimer les fichiers test
rm apps/studio/public/test-*.html
rm apps/studio/public/showcase-*.html

# Vérifier le résultat
find apps/studio/public -name "*.html" | wc -l
# Objectif: < 100 fichiers
```

## 📊 RÉSUMÉ DES ACTIONS

| Action | Temps | Impact | Priorité |
|--------|-------|--------|----------|
| SQLite3 | 2 min | Test DB | Basse |
| Méthodes | 5 min | Build | HAUTE |
| Supabase | 5 min | CMS | Moyenne |
| Netlify | 3 min | Deploy | Moyenne |
| netlify.toml | 2 min | Config | Moyenne |
| Templates | 10 min | -1.5MB | Moyenne |
| Build .next | 15 min | -70MB | HAUTE |
| HTML files | 5 min | -40MB | HAUTE |

**Temps total estimé:** 47 minutes

## 🚀 COMMANDES RAPIDES (TOUT EN UN)

```bash
# 1. Configuration minimale
cat > apps/studio/.env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_service_key
NETLIFY_AUTH_TOKEN=placeholder_token
NETLIFY_SITE_ID=placeholder_site_id
DATABASE_URL="file:./prisma/dev.db"
EOF

# 2. Nettoyage rapide
rm -rf apps/studio/public/generated-sites/*
rm -rf apps/studio/public/demo-sites/*
rm apps/studio/public/test-*.html
rm apps/studio/lib/templates/*.backup
rm -rf apps/studio/.next

# 3. Rebuild
cd apps/studio
npm run build
```

## ✅ VÉRIFICATION

Après ces actions, relancer l'agent de test:
```bash
cd apps/studio
node test-agent-complete.js
```

Le score devrait passer de 76% à ~90% !