# API de Déploiement Automatique AWEMA

## Vue d'ensemble

L'API de déploiement automatique permet de déployer des sites en un clic avec CMS intégré et configuration complète.

## Endpoints

### 1. Déployer un site

**POST** `/api/deploy`

Déploie un nouveau site sur Netlify avec CMS Supabase configuré.

#### Paramètres

```json
{
  "siteId": "uuid-du-site",
  "siteName": "mon-site-pro",
  "projectData": {
    // Données complètes du projet (pages, theme, etc.)
  },
  "plan": "starter|pro|premium",
  "customDomain": "exemple.com" // Optionnel
  "adminEmail": "admin@exemple.com" // Optionnel
}
```

#### Réponse succès (200)

```json
{
  "success": true,
  "siteUrl": "https://mon-site-pro.netlify.app",
  "adminUrl": "https://mon-site-pro.netlify.app/admin",
  "credentials": {
    "email": "admin@mon-site-pro.awema.site",
    "password": "MotDePasseSecurise123!"
  },
  "dnsInstructions": {
    // Instructions DNS si domaine personnalisé
  }
}
```

#### Réponse erreur (400/500)

```json
{
  "error": "Description de l'erreur"
}
```

### 2. Vérifier le statut

**GET** `/api/deploy/status?deployId=xxx`

Vérifie le statut d'un déploiement en cours.

#### Réponse

```json
{
  "deployId": "xxx",
  "status": "building|ready|error",
  "url": "https://site.netlify.app",
  "timestamp": "2024-01-10T10:00:00Z"
}
```

## Exemples d'utilisation

### JavaScript/TypeScript

```typescript
// Déployer un site
const deployResponse = await fetch('/api/deploy', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    siteId: crypto.randomUUID(),
    siteName: 'mon-super-site',
    projectData: projectData,
    plan: 'pro',
    customDomain: 'monsupersite.com'
  })
});

const result = await deployResponse.json();

if (result.success) {
  console.log('Site déployé:', result.siteUrl);
  console.log('Identifiants admin:', result.credentials);
}
```

### cURL

```bash
# Déployer un site
curl -X POST https://studio.awema.fr/api/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "siteId": "123e4567-e89b-12d3-a456-426614174000",
    "siteName": "test-site",
    "projectData": {...},
    "plan": "starter"
  }'

# Vérifier le statut
curl https://studio.awema.fr/api/deploy/status?deployId=abc123
```

## Plans disponibles

### Starter (297€ + 19€/mois)
- Site statique optimisé
- Hébergement Netlify
- SSL inclus
- Domaine personnalisé
- Pas de CMS

### Pro (497€ + 39€/mois)
- Tout Starter +
- CMS basique
- Édition de contenu
- Sauvegarde automatique
- Support prioritaire

### Premium (797€ + 59€/mois)
- Tout Pro +
- CMS complet
- Multi-utilisateurs
- API avancée
- Analytics intégrés
- Support dédié

## Configuration requise

### Variables d'environnement

```env
# Netlify
NETLIFY_AUTH_TOKEN=nfp_xxxxxxxxxxxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_KEY=eyJhbGc...
```

### Limites

- Taux limite: 10 déploiements par minute
- Taille max du projet: 100MB
- Timeout: 5 minutes par déploiement

## Workflow complet

1. **Création du projet** dans l'éditeur AWEMA Studio
2. **Configuration** du plan et options
3. **Appel API** pour déploiement
4. **Réception** des identifiants
5. **Configuration DNS** si domaine personnalisé
6. **Accès** au site et panneau admin

## Sécurité

- Tous les mots de passe sont générés aléatoirement
- Communications chiffrées SSL/TLS
- Tokens d'API sécurisés
- Isolation multi-tenant dans Supabase

## Support

Pour toute question ou problème:
- Email: support@awema.fr
- Documentation: https://docs.awema.fr
- GitHub: https://github.com/awema/studio