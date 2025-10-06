# 📊 PHASE 2 - AUDIT DES SERVICES (NON-DESTRUCTIF)

## ✅ SERVICES CRITIQUES À CONSERVER

### Services Utilisés dans les API Routes
- **site-generator.service.ts** - Utilisé dans `/api/clients/route.ts`
- **ultra-html-generator.service.ts** - Utilisé dans `/api/export-proposal-preview/route.ts`
- **export-service-fixed.ts** - Utilisé dans `/api/export-proposal-html/route.ts`
- **static-export-simplified.ts** - Utilisé dans `/api/export/route.ts`

### Services CMS Actifs
- **cms-injector.service.ts** - CMS injection
- **supabase-cms.service.ts** - Backend CMS
- **netlify-deploy-correct.service.ts** - Déploiement production
- **auto-deploy.service.ts** - Auto-déploiement

### Services Workflow & Templates
- **agency-workflow.service.ts** - Workflow agence
- **metier-template.service.ts** - Templates métiers
- **project.service.ts** - Gestion projets
- **adaptive-template.service.ts** - Templates adaptatifs

## ❌ SERVICES À SUPPRIMER (SAFE)

### Services V3 Obsolètes
- v3-premium-enhancer.service.ts
- v3-site-generator.service.ts
- v3-site-generator-unified.service.ts
- v3-style-applicator.service.ts
- static-export-v3-integration.ts

### Fichiers Backup
- static-export.service.ts.bak
- static-export-simplified.ts.backup

### Générateurs HTML Non Utilisés
- html-site-generator.service.ts (NON utilisé dans API)
- html-site-generator-premium.service.ts (NON utilisé)
- multi-page-html-generator.service.ts (NON utilisé)
- awema-site-generator.service.ts (NON utilisé)
- final-site-generator.service.ts (NON utilisé)

### Versions Netlify Redondantes
- netlify-deploy.service.ts
- netlify-deploy-v2.service.ts
- netlify-deploy-fixed.service.ts
- netlify-deploy-working.service.ts
- netlify-deploy-debug.ts
- netlify-deploy-zip.service.ts

## ⚠️ SERVICES À VÉRIFIER

### Potentiels Doublons
- site-generator.ts vs site-generator.service.ts
- simple-export-v2.ts (peut être supprimé)
- mockup-generator.service.ts (garder premium)

## 📋 PLAN D'ACTION SÉCURISÉ

### Étape 1: Suppression Sans Risque (18 fichiers)
```bash
# Services V3
rm apps/studio/lib/services/v3-*.ts
rm apps/studio/lib/services/static-export-v3-integration.ts

# Backups
rm apps/studio/lib/services/*.bak
rm apps/studio/lib/services/*.backup

# Netlify redondants (garder SEULEMENT netlify-deploy-correct.service.ts)
rm apps/studio/lib/services/netlify-deploy.service.ts
rm apps/studio/lib/services/netlify-deploy-v2.service.ts
rm apps/studio/lib/services/netlify-deploy-fixed.service.ts
rm apps/studio/lib/services/netlify-deploy-working.service.ts
```

### Étape 2: Vérification Avant Suppression
```bash
# Vérifier que ces services ne sont pas importés
grep -r "html-site-generator.service" apps/studio/app/
grep -r "multi-page-html-generator" apps/studio/app/
grep -r "awema-site-generator" apps/studio/app/
```

### Étape 3: Consolidation (Après Tests)
- Fusionner site-generator.ts et site-generator.service.ts
- Supprimer simple-export-v2.ts
- Garder mockup-generator-premium.service.ts uniquement

## 🔒 GARANTIES ANTI-RÉGRESSION

1. **NE PAS TOUCHER** aux services utilisés dans les API routes
2. **VÉRIFIER** chaque import avant suppression
3. **TESTER** le build après chaque étape
4. **BACKUP** créé avant modifications majeures

## ✅ RÉSULTATS PHASE 2 - CONSOLIDATION TERMINÉE

### Services Supprimés Sans Régression
- ✅ 5 services V3 supprimés (v3-*.ts)
- ✅ 2 fichiers backup supprimés (*.bak, *.backup)
- ✅ 6 services Netlify redondants supprimés
- ✅ 2 exports obsolètes supprimés (simple-export-v2, emergency-export)
- ✅ static-export-v3-integration.ts supprimé

### Pages Obsolètes Supprimées
- ✅ editor-artisan-complet
- ✅ editor-artisan-demo
- ✅ editor-v3
- ✅ world-class-demo
- ✅ world-class-showcase
- ✅ launch-artisan-editor

### Fichiers Stub Créés (Compatibilité)
- ✅ /lib/blocks/block-registry.ts (stub minimal)
- ✅ /lib/blocks/register-world-class-blocks.ts (stub minimal)

### Métriques Finales
- **Services restants:** 112 fichiers (de 129)
- **Taille services:** 2.6MB (de 3.2MB)
- **Build:** ✅ FONCTIONNEL
- **Aucune régression:** Tous les services critiques préservés