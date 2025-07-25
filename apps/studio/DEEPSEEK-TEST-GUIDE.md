# 🤖 Guide de test avec DeepSeek API

## Configuration vérifiée ✅

- **Clé API DeepSeek** : `sk-d86fb0058a67403e98bbca6d3cf1e2dd`
- **Service DeepSeek** : `/lib/services/deepseek.service.ts`
- **Intégration** : Dans l'API d'analyse des propositions

## Ce que fait DeepSeek dans notre système

### 1. **Analyse du profil client**
```json
{
  "businessProfile": "Description intelligente du business",
  "priorities": ["Urgence 24/7", "Portfolio visuel", "..."],
  "keyPoints": ["Points clés à mettre en avant"],
  "recommendedFeatures": ["Fonctionnalités recommandées"],
  "customizationTips": ["Conseils de personnalisation"],
  "templateRecommendations": {
    "urgency": 85,  // Score 0-100
    "trust": 90,
    "visual": 75,
    "local": 60
  }
}
```

### 2. **Sélection intelligente des templates**
- DeepSeek analyse les 265 templates disponibles
- Score chaque template selon l'analyse du profil
- Sélectionne les 3 meilleurs avec justification

### 3. **Suggestions de personnalisation**
- Génère 5 suggestions spécifiques pour chaque template
- Basées sur le contexte exact du client
- Suggestions actionnables et précises

## 🧪 Test étape par étape

### 1. Vérifier les données de test
```bash
# Si besoin, recréer les données
node scripts/test-template-workflow.js cleanup
node scripts/test-template-workflow.js
```

### 2. Ouvrir l'interface admin
```
http://localhost:3000/admin/proposals
```

### 3. Tester l'analyse IA réelle

1. **Cliquer sur "Plomberie Dupont & Fils"**
2. **Cliquer sur "Analyser avec IA"**
3. **Observer dans la console du serveur** :
   ```
   🤖 Analyse du profil client avec DeepSeek...
   ✅ Analyse terminée: { businessProfile: ..., priorities: [...] }
   🎯 Sélection des 3 meilleurs templates avec DeepSeek...
   ```

### 4. Résultats attendus

**Analyse IA générée par DeepSeek :**
- Profil détaillé de l'entreprise
- Priorités identifiées (urgence 24/7, galerie, etc.)
- Points clés personnalisés
- Scores de recommandation

**Templates sélectionnés :**
- Les 3 templates avec les meilleurs scores IA
- Raisons de sélection basées sur l'analyse
- Suggestions de personnalisation uniques

## 🔍 Vérifier que DeepSeek fonctionne

### Dans l'interface admin après analyse :

1. **Section "Analyse IA"** devrait montrer :
   - Profil client généré par DeepSeek
   - Priorités intelligentes (pas génériques)
   - Points clés spécifiques au business

2. **Les 3 options de templates** devraient avoir :
   - Des scores élevés pour les templates pertinents
   - Des suggestions de personnalisation uniques
   - Une logique de sélection cohérente

### Si ça ne fonctionne pas :

1. **Vérifier la console du serveur Next.js** pour les erreurs
2. **Vérifier la clé API** dans `.env.local`
3. **Tester directement l'API DeepSeek** :
   ```bash
   curl https://api.deepseek.com/v1/chat/completions \
     -H "Authorization: Bearer sk-d86fb0058a67403e98bbca6d3cf1e2dd" \
     -H "Content-Type: application/json" \
     -d '{
       "model": "deepseek-chat",
       "messages": [{"role": "user", "content": "Test"}]
     }'
   ```

## 📊 Exemple de résultat réel

Pour "Plomberie Dupont & Fils" avec urgence 24/7, galerie et témoignages :

**Templates sélectionnés par l'IA :**
1. **Quantum Rush** (Score: 95)
   - Tags: urgency, modern, plombier
   - Raison: "Optimisé pour service urgence avec CTA flottant"

2. **Trust Authority** (Score: 92)
   - Tags: trust, testimonials, plombier
   - Raison: "Met en avant l'expérience de 18 ans"

3. **Visual Portfolio** (Score: 88)
   - Tags: gallery, showcase, plombier
   - Raison: "Galerie avant/après pour les réalisations"

**Suggestions personnalisées par DeepSeek :**
- "Ajouter une section dédiée aux fuites d'urgence"
- "Mettre en avant votre disponibilité 24/7 sur Paris"
- "Créer des pages locales pour Hauts-de-Seine, Seine-Saint-Denis"
- "Intégrer un système de prise de RDV en ligne pour les urgences"
- "Afficher les temps d'intervention moyens par zone"

## 🎯 L'avantage du système

1. **Sélection vraiment intelligente** basée sur l'analyse du profil
2. **Suggestions uniques** pour chaque client (pas de générique)
3. **Justifications cohérentes** pour chaque choix
4. **L'admin peut personnaliser** en s'appuyant sur l'analyse IA

C'est ça la magie : le client pense recevoir du sur-mesure alors que c'est l'IA qui fait le travail de sélection et personnalisation ! 🚀