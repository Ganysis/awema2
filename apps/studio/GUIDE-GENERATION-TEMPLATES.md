# 🚀 Guide d'utilisation du système de génération de templates avec IA

## État actuel du système

✅ **FONCTIONNEL** : Le système de génération de templates par IA est maintenant pleinement opérationnel avec DeepSeek.

## Composants installés et configurés

1. **DeepSeek API** ✅
   - Clé API configurée dans `.env.local`
   - Service de génération de contenu IA
   - Analyse de profils business
   - Personnalisation automatique

2. **Template Generator Engine** ✅
   - 5 patterns prédéfinis (Urgence, Confiance, Visuel, Premium, Local)
   - Génération intelligente basée sur les données client
   - Scoring automatique des templates

3. **Adaptive Template Service** ✅
   - 10+ structures de templates uniques
   - Variations automatiques
   - Thèmes et styles personnalisés

4. **Interface Admin** ✅
   - Accessible à : http://localhost:3000/admin/proposals
   - Gestion des propositions de templates
   - Analyse IA intégrée
   - Personnalisation et envoi

## Comment utiliser le système

### 1. Créer un client et une proposition

```bash
# Créer des données de test
node scripts/setup-test-data.js
```

### 2. Accéder à l'interface admin

Ouvrez votre navigateur à : **http://localhost:3000/admin/proposals**

### 3. Analyser une proposition

1. Cliquez sur une proposition avec le statut "PENDING"
2. Cliquez sur le bouton "Analyser avec l'IA" (icône baguette magique)
3. L'analyse prend environ 10-20 secondes
4. 3 variations de templates seront générées automatiquement

### 4. Personnaliser les templates

- Chaque template peut être prévisualisé
- Ajoutez des notes personnalisées
- Mettez en avant des points spécifiques
- Rédigez un message personnalisé pour le client

### 5. Envoyer au client

- Cliquez sur "Envoyer la proposition"
- Le client recevra un lien pour visualiser les 3 options
- Il pourra choisir son template préféré

## API disponibles

### Templates
- `GET /api/templates` - Liste des templates disponibles
- `POST /api/templates/generate-variants` - Générer des variantes

### Admin
- `GET /api/admin/template-proposals` - Liste des propositions
- `POST /api/admin/template-proposals/{id}/analyze` - Analyser avec IA
- `POST /api/admin/template-proposals/{id}/customize` - Personnaliser
- `POST /api/admin/template-proposals/{id}/send` - Envoyer au client

### Génération de site
- `POST /api/generate-site` - Générer un site complet avec IA

## Données de test créées

Après avoir exécuté `setup-test-data.js`, vous avez :
- 1 client test (Plomberie Express Test)
- 1 proposition en attente d'analyse
- Formulaire complet avec tous les détails business

## Processus de génération

1. **Analyse du profil** : DeepSeek analyse les données du formulaire
2. **Sélection de patterns** : Le système choisit les meilleurs patterns
3. **Personnalisation** : Le contenu est adapté au business
4. **Scoring** : Chaque template reçoit un score de pertinence
5. **Présentation** : 3 options sont présentées au client

## Exemples de résultats

### Template "Urgence Master"
- Pour les services 24/7
- Boutons d'urgence flottants
- Couleurs vives (rouge/vert)
- Animations d'attention

### Template "Trust Builder"  
- Pour les entreprises établies
- Témoignages en avant
- Certifications visibles
- Design professionnel

### Template "Visual Showcase"
- Pour les métiers visuels
- Galeries avant/après
- Portfolio interactif
- Design moderne

## Résolution de problèmes

### Le serveur ne répond pas
```bash
# Redémarrer le serveur
npm run dev
```

### Erreur DeepSeek
- Vérifiez la clé API dans `.env.local`
- Vérifiez votre connexion internet

### Base de données vide
```bash
# Recréer les données
node scripts/setup-test-data.js
```

## Prochaines étapes

1. Tester avec de vrais clients
2. Affiner les prompts DeepSeek
3. Ajouter plus de patterns de templates
4. Implémenter le tracking des conversions

---

💡 **Astuce** : L'interface admin est conçue pour être utilisée par l'équipe AWEMA, pas par les clients finaux. Les clients reçoivent un lien personnalisé pour voir leurs propositions.