# Service Générateur de Mockups Netlify

## Vue d'ensemble

Le `NetlifyMockupGeneratorService` est responsable de la génération automatique de 3 mockups de sites web basés sur les templates ThemeFisher et leur déploiement sur Netlify avec des URLs temporaires.

## Fonctionnalités

- ✅ Génération de 3 mockups simultanés
- ✅ Injection de contenu Lorem Ipsum personnalisé
- ✅ Application automatique des couleurs par métier
- ✅ Build automatique des templates
- ✅ Déploiement sur Netlify via API
- ✅ URLs temporaires avec TTL configurable
- ✅ Gestion d'événements en temps réel
- ✅ Logs détaillés et gestion d'erreurs
- ✅ Nettoyage automatique des déploiements

## Architecture

```
NetlifyMockupGeneratorService
├── generateMockups()           # Point d'entrée principal
├── generateSingleMockup()      # Génération d'un mockup individuel
├── copyTemplateBase()          # Copie du template de base
├── injectContent()             # Injection du contenu personnalisé
├── applyBusinessColors()       # Application des couleurs métier
├── buildTemplate()             # Build du template
└── deployToNetlify()           # Déploiement sur Netlify
```

## Utilisation

### Import et initialisation

```typescript
import { netlifyMockupGenerator } from './lib/services/netlify-mockup-generator.service';
import { ClientFormData } from './types/mockup.types';
```

### Génération de mockups

```typescript
const formData: ClientFormData = {
  businessName: 'Plomberie Martin',
  businessType: 'plombier',
  location: 'Lyon 7ème',
  phone: '04 72 00 00 00',
  email: 'contact@plomberie-martin.fr',
  description: 'Expert en plomberie depuis 15 ans'
};

const result = await netlifyMockupGenerator.generateMockups(formData);

// Résultat
{
  success: true,
  mockups: [
    {
      templateName: 'sydney',
      netlifyUrl: 'https://sydney-1234567890.netlify.app',
      previewImage: 'https://sydney-1234567890.netlify.app/screenshot.png',
      deploymentId: 'abcd1234',
      status: 'ready',
      buildTime: 45
    }
    // ... 2 autres mockups
  ],
  totalTime: 120,
  errors: []
}
```

### Écoute des événements

```typescript
// Démarrage de génération
netlifyMockupGenerator.on('mockups.generation.started', (event) => {
  console.log('Génération démarrée pour:', event.data.formData.businessName);
});

// Progress en temps réel
netlifyMockupGenerator.on('mockups.generation.progress', (event) => {
  const { current, total, currentTemplate } = event.data.progress;
  console.log(`Progress: ${current}/${total} - ${currentTemplate}`);
});

// Génération terminée
netlifyMockupGenerator.on('mockups.generation.completed', (event) => {
  const urls = event.data.mockups.map(m => m.netlifyUrl);
  console.log('URLs générées:', urls);
});
```

## Configuration

### Variables d'environnement

```bash
# Token API Netlify (requis)
NETLIFY_API_TOKEN=your_netlify_api_token_here

# ID équipe Netlify (optionnel)
NETLIFY_TEAM_ID=your_team_id

# Configuration build
MOCKUP_BUILD_TIMEOUT=120000
MOCKUP_CLEANUP_HOURS=72
```

### Templates disponibles

1. **Sydney** - Moderne & Élégant
   - Catégorie: Premium
   - Métiers: Plombier, Électricien, Menuisier
   - Build: < 30 secondes

2. **NextSpace** - Tech & Innovation
   - Catégorie: Modern
   - Métiers: Électricien, Tech
   - Build: < 25 secondes

3. **Locomotive** - Puissant & Professionnel
   - Catégorie: Classic
   - Métiers: Paysagiste, Menuisier, Maçon
   - Build: < 35 secondes

### Couleurs par métier

```typescript
const colors = {
  plombier: { primary: '#1e40af', secondary: '#3b82f6' },
  electricien: { primary: '#f59e0b', secondary: '#fbbf24' },
  paysagiste: { primary: '#059669', secondary: '#10b981' },
  // ... autres métiers
};
```

## Workflow de génération

1. **Sélection des templates**
   - Basée sur le métier du client
   - Fallback sur templates par défaut
   - Maximum 3 templates

2. **Copie et personnalisation**
   - Copie du template de base
   - Injection du contenu client
   - Application des couleurs métier

3. **Build et optimisation**
   - Compilation du template
   - Optimisation des assets
   - Validation de la sortie

4. **Déploiement Netlify**
   - Création du site Netlify
   - Upload via API
   - Configuration DNS temporaire

5. **Finalisation**
   - Génération des URLs
   - Nettoyage des fichiers temporaires
   - Émission des événements

## Points d'intégration

### INPUT (Agent 1)
- Données du formulaire client
- Sélection optionnelle de templates

### OUTPUT (Agent 4, Agent 5)
- Array de 3 MockupResult
- URLs Netlify temporaires
- Images de prévisualisation

### EVENTS
- `mockups.generation.started`
- `mockups.generation.progress`
- `mockups.generation.completed`
- `mockups.generation.failed`

## Gestion d'erreurs

### Erreurs courantes
1. **Token Netlify invalide**
   - Vérifier NETLIFY_API_TOKEN
   - Régénérer le token si nécessaire

2. **Échec de build**
   - Vérifier la structure du template
   - Augmenter le timeout si nécessaire

3. **Quota Netlify dépassé**
   - Nettoyer les anciens déploiements
   - Utiliser un autre compte

### Récupération automatique
- Retry automatique (3 tentatives)
- Fallback sur template de base
- Génération partielle acceptée

## Performance

### Métriques typiques
- **Temps total**: 90-180 secondes pour 3 mockups
- **Build individuel**: 20-45 secondes
- **Déploiement**: 10-30 secondes
- **Parallélisation**: Bientôt disponible

### Optimisations
- Templates pré-optimisés
- Build incrémental
- Cache des assets
- CDN Netlify intégré

## Maintenance

### Nettoyage automatique
```typescript
// Nettoyer les déploiements expirés (72h par défaut)
await netlifyMockupGenerator.cleanupExpiredDeployments();
```

### Monitoring
- Logs détaillés avec timestamps
- Métriques de performance
- Alertes d'échec

## Tests

```bash
# Test complet du service
npm run test:mockup-generator

# Test avec données spécifiques
npm run test:mockup-generator -- --business=plombier
```

## Sécurité

- Validation des inputs clients
- Sanitisation du contenu injecté
- Isolation des builds
- TTL sur les URLs temporaires
- Nettoyage automatique des données

## Roadmap

- [ ] Génération d'images de prévisualisation
- [ ] Templates supplémentaires
- [ ] Build en parallèle
- [ ] Cache intelligent
- [ ] Analytics détaillées