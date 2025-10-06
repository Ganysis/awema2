# 🚀 Intégration MCP Complète - AWEMA Studio

L'intégration du serveur MCP (Model Context Protocol) est maintenant complète ! Voici comment l'utiliser.

## ✅ Ce qui a été fait

### 1. API de communication
- **Endpoint** : `/api/mcp/analyze-url`
- **Méthode** : POST
- **Fonction** : Analyse des sites web et génération de blocs V3

### 2. Interface scanner
- **URL** : `/test-mcp-scanner`
- **Fonctionnalités** :
  - Analyse d'URL avec extraction de couleurs, mise en page, contenu
  - Génération automatique de blocs V3 artisan
  - Redirection vers l'éditeur avec les blocs générés

### 3. Pont HTTP MCP
- **Script** : `http-bridge.ts`
- **Port** : 3010
- **Mode démo** : Fonctionne même sans serveur MCP réel

### 4. Scripts de démarrage
- `start-mcp-http.sh` : Démarre le pont HTTP
- Configuration via `.env.mcp`

## 🎯 Utilisation

### 1. Démarrer le serveur MCP (optionnel)
```bash
./start-mcp-http.sh
```

### 2. Utiliser le scanner
1. Aller sur http://localhost:3000/test-mcp-scanner
2. Entrer une URL de site artisan
3. Cliquer sur "Scanner"
4. Examiner les résultats :
   - Couleurs détectées
   - Blocs identifiés
   - Recommandations
5. Cliquer sur "Générer les blocs"
6. L'éditeur s'ouvre avec les blocs créés

### 3. Mode démo
Si le serveur MCP n'est pas démarré, l'application utilise automatiquement des données de démonstration pour montrer le workflow complet.

## 📊 Flux de données

```
User → Scanner UI → API Next.js → MCP Bridge → MCP Server
                                      ↓
                                 (Demo fallback)
                                      ↓
                              ← Blocs V3 générés ←
```

## 🔧 Personnalisation

### Ajouter de nouveaux types de blocs
Dans `/api/mcp/analyze-url/route.ts`, fonction `transformToV3Blocks()` :
```typescript
case 'nouveau-type':
  return {
    ...baseBlock,
    type: 'nouveau-bloc-v3',
    data: {
      // Mapper les données
    }
  };
```

### Modifier les recommandations
Dans `/api/mcp/analyze-url/route.ts`, fonction `generateRecommendations()` :
```typescript
if (condition) {
  recommendations.push({
    type: 'nouveau-type',
    priority: 'haute',
    suggestion: 'Votre suggestion'
  });
}
```

## 🎨 Templates artisan disponibles

- **Plombier** : Template complet avec urgence, services, zones
- **Électricien** : Template avec certifications, avant/après
- **Chauffagiste** : À créer
- **Serrurier** : À créer
- **Menuisier** : À créer
- **Peintre** : À créer

## 🚀 Prochaines étapes

1. **Créer les templates manquants** pour chauffagiste, serrurier, menuisier, peintre
2. **Améliorer l'analyse** avec de vrais scrapers web
3. **Ajouter l'export** des designs itérés
4. **Système A/B** pour comparer les variantes

## 💡 Tips

- Le scanner fonctionne mieux avec des sites artisans existants
- Les couleurs orange (#ff6900) sont automatiquement détectées comme "artisan"
- Les blocs générés sont éditables dans l'éditeur V3
- Utilisez les données de démo pour tester sans serveur MCP

## 🐛 Dépannage

### "Le serveur MCP n'est pas démarré"
C'est normal ! L'application fonctionne en mode démo automatiquement.

### Les blocs ne se chargent pas dans l'éditeur
Vérifier que le projectId est bien passé dans l'URL : `/editor-v3-local?projectId=mcp-scan-XXX`

### Erreur 500 lors de l'analyse
Vérifier les logs du serveur Next.js et du pont HTTP si démarré.

---

L'intégration MCP est maintenant prête à l'emploi ! 🎉