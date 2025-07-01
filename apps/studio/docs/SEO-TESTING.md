# Guide de Test des Services SEO

## 🚀 Vue d'ensemble

Le système SEO d'AWEMA Studio comprend plusieurs services avancés qui peuvent être testés de différentes manières.

## 📋 Services SEO disponibles

1. **SEO AI Engine** - Analyse et optimisation avec IA
2. **SEO Content Generator** - Génération de contenu optimisé
3. **Advanced SEO Service** - Meta tags et données structurées
4. **SEO Monitoring** - Suivi des performances
5. **Analytics Service** - Intégration Google Analytics

## 🧪 Méthodes de test

### 1. Interface Web de Test

Accédez à la page de test interactive :

```bash
npm run dev
# Puis visitez : http://localhost:3000/test-seo
```

Cette page permet de :
- Tester chaque service individuellement
- Voir les résultats en temps réel
- Explorer les données générées

### 2. Tests en ligne de commande

```bash
# Test rapide des services
npx ts-node scripts/test-seo-services.ts

# Test de l'export avec SEO
npx ts-node scripts/test-seo-export.ts
```

### 3. Tests unitaires

```bash
# Lancer tous les tests SEO
npm test -- __tests__/seo-services.test.ts

# Avec coverage
npm test -- --coverage __tests__/seo-services.test.ts
```

## 🔍 Vérification dans l'éditeur

### Dans l'interface principale :

1. **Onglet SEO dans l'éditeur**
   - Cliquez sur l'onglet "SEO" dans l'éditeur
   - Modifiez les métadonnées de la page
   - Observez le score SEO en temps réel

2. **Modal d'export**
   - Cliquez sur "Exporter"
   - Activez les options SEO :
     - ✅ SEO Avancé
     - ✅ Génération de contenu
     - ✅ Analytics
     - ✅ Monitoring SEO

3. **Preview avec SEO**
   - Les meta tags sont visibles dans le code source
   - Les données structurées sont intégrées

## 📊 Points de vérification

### ✅ Meta Tags
- Title avec mots-clés
- Description optimisée
- Open Graph tags
- Twitter Cards

### ✅ Données structurées
- Schema.org LocalBusiness
- Breadcrumbs
- FAQ Schema
- Service Schema

### ✅ Fichiers SEO
- `sitemap.xml` généré
- `robots.txt` configuré
- URLs canoniques

### ✅ Performance
- Scripts optimisés
- CSS critique inline
- Images optimisées

### ✅ CMS SEO
- Module SEO intégré
- Édition des meta tags
- Preview SERP

## 🐛 Débogage

Si les services SEO ne fonctionnent pas :

1. **Vérifier la console**
   ```javascript
   // Dans la console du navigateur
   console.log(window.__SEO_DATA__);
   ```

2. **Inspecter le HTML généré**
   - Rechercher `<meta name="description"`
   - Rechercher `application/ld+json`
   - Vérifier les scripts Analytics

3. **Logs des services**
   ```typescript
   // Activer les logs détaillés
   const seoService = new SEOAIEngineService(businessInfo);
   console.log('SEO Service initialized:', seoService);
   ```

## 📈 Métriques de succès

- **Score SEO** : > 80/100
- **Meta tags** : Tous présents
- **Structured data** : Valide selon Google
- **Core Web Vitals** : Tous verts
- **Sitemap** : Généré avec toutes les pages

## 🎯 Exemples d'utilisation

### Génération de contenu SEO

```typescript
const generator = new SEOContentGeneratorService(siteData);
const content = await generator.generateContent('plomberie', {
  targetKeywords: ['plombier paris', 'urgence'],
  includeLocalSEO: true,
  includeFAQ: true
});
```

### Analyse SEO avec IA

```typescript
const engine = new SEOAIEngineService(businessInfo);
const analysis = await engine.analyzePage(
  pageTitle,
  pageContent,
  currentSEO
);
console.log(`Score: ${analysis.score}/100`);
```

### Export avec SEO complet

```typescript
const exportData = await StaticExportService.exportSite(projectData, {
  enableAdvancedSEO: true,
  generateSEOContent: true,
  enableAnalytics: true,
  ga4MeasurementId: 'G-XXXXXXX'
});
```

## 🚀 Performance

Les services SEO sont optimisés pour :
- Génération rapide (< 2s pour un site complet)
- Pas d'impact sur les Core Web Vitals
- Cache intelligent des résultats
- Minification automatique

## 📝 Notes

- Les services SEO utilisent des données simulées en développement
- En production, connecter les vraies APIs (Google Analytics, Search Console)
- Le contenu généré est en français par défaut
- Personnalisable selon le type de business