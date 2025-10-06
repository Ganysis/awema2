# Dashboard Admin Workflow - AWEMA 2.0

## 🎯 Vue d'Ensemble

Le Dashboard Admin Workflow est une interface complète de gestion des workflows clients d'AWEMA 2.0. Il permet de suivre en temps réel le parcours de chaque client depuis la réception du formulaire jusqu'au déploiement final du site.

## 🚀 Fonctionnalités Principales

### Vue Kanban Interactive
- **Drag & Drop** : Déplacement des workflows entre les colonnes
- **7 Statuts** : form_received → mockups_ready → sent → viewed → chosen → enriched → deployed
- **Actions rapides** : Boutons d'action contextuels sur chaque carte
- **Couleurs distinctives** : Chaque statut a sa propre couleur

### Vue Tableau Avancée
- **Tri multi-critères** : Par nom, statut, métier, date
- **Sélection multiple** : Actions en lot sur plusieurs workflows
- **Filtrage avancé** : Par statut, métier, recherche textuelle
- **Export de données** : CSV et JSON

### Statistiques Temps Réel
- **Métriques globales** : Total workflows, taux de conversion
- **Performances** : Temps moyen de choix, génération
- **Revenus** : Calculs automatiques basés sur les déploiements
- **Répartition** : Distribution par statut avec graphiques

### Mises à Jour Temps Réel
- **WebSocket** : Connexion temps réel entre tous les utilisateurs
- **Notifications** : Alertes automatiques pour les nouveaux événements
- **Synchronisation** : État partagé entre tous les onglets/utilisateurs

## 📁 Architecture Technique

```
/apps/studio/app/admin-dashboard/
├── page.tsx                     # Page principale du dashboard
│
/apps/studio/components/admin/
├── WorkflowKanban.tsx          # Vue Kanban avec drag & drop
├── WorkflowCard.tsx            # Carte individuelle de workflow
├── WorkflowTable.tsx           # Vue tableau avec tri/filtrage
├── WorkflowStats.tsx           # Composant statistiques
└── WorkflowConnectionStatus.tsx # Indicateur connexion temps réel

/apps/studio/lib/
├── types/workflow.types.ts     # Types TypeScript complets
├── stores/workflow.store.ts    # Store Zustand global
└── hooks/useWorkflowWebSocket.ts # Hook WebSocket personnalisé

/apps/studio/app/api/admin/workflows/
├── route.ts                    # API REST principale
├── [id]/route.ts              # Gestion workflow individuel
└── [id]/actions/route.ts      # Actions sur workflows
```

## 🔄 États du Workflow

| Statut | Description | Actions Disponibles |
|--------|-------------|-------------------|
| **form_received** | Formulaire client reçu | Générer mockups |
| **mockups_ready** | Mockups générés | Envoyer email |
| **sent** | Email envoyé au client | Relancer |
| **viewed** | Client a consulté l'email | Relancer |
| **chosen** | Client a choisi un template | Enrichir contenu |
| **enriched** | Contenu enrichi | Déployer site |
| **deployed** | Site déployé | - |

## 🛠️ Utilisation

### Démarrage
```bash
cd /apps/studio
npm run dev

# Accès: http://localhost:3000/admin-dashboard
```

### Création de Données de Test
```bash
# Créer des données d'exemple
npm run test-admin-dashboard create

# Nettoyer les données de test
npm run test-admin-dashboard cleanup

# Voir un résumé des données
npm run test-admin-dashboard summary
```

### Actions Principales

#### 1. Vue Kanban
- **Drag & Drop** : Glissez les cartes entre colonnes pour changer le statut
- **Actions rapides** : Cliquez sur les boutons d'action pour déclencher des processus
- **Détails** : Hover sur une carte pour voir plus d'informations

#### 2. Vue Tableau
- **Tri** : Cliquez sur les en-têtes de colonnes pour trier
- **Sélection** : Cochez plusieurs workflows pour des actions en lot
- **Filtrage** : Utilisez les champs de recherche et sélecteurs

#### 3. Filtres Avancés
- **Recherche textuelle** : Nom, email ou ville du client
- **Statut** : Filtrer par un ou plusieurs statuts
- **Métier** : Plombier, électricien, paysagiste, etc.
- **Date** : Plage de dates personnalisée

## 🔗 Points d'Intégration

### Avec les Autres Agents

#### Agent 1 (Formulaire Client)
- **INPUT** : Réception des nouveaux formulaires clients
- **Création automatique** : Workflow créé avec statut `form_received`

#### Agent 3 (Génération Mockups)
- **Déclenchement** : Action "Générer mockups"
- **SYNC** : URLs mockups synchronisées automatiquement

#### Agent 5 (Email Client)
- **Déclenchement** : Action "Envoyer email"
- **Tracking** : Suivi des ouvertures et clics

#### Agent 7 (Enrichissement Contenu)
- **Déclenchement** : Action "Enrichir contenu"
- **Progression** : Suivi du processus d'enrichissement

#### Agent 8 (Déploiement)
- **Déclenchement** : Action "Déployer site"
- **URL finale** : URL de déploiement retournée

### Base de Données
```sql
-- Structure des tables principales
clients (id, name, email, phone, businessType, city)
workflows (id, clientId, status, metadata)
workflow_mockups (id, workflowId, title, url, isChosen)
workflow_actions (id, workflowId, type, description)
```

## 📊 API Endpoints

### GET `/api/admin/workflows`
Récupère la liste des workflows avec filtres
```javascript
// Paramètres optionnels
?status=sent&businessType=plombier&search=paris
```

### PUT `/api/admin/workflows/[id]`
Met à jour un workflow
```javascript
{
  "status": "chosen",
  "metadata": { "chosenMockupId": "abc123" }
}
```

### POST `/api/admin/workflows/[id]/actions`
Exécute une action sur un workflow
```javascript
{
  "action": "generate_mockups",
  "metadata": { "priority": "high" }
}
```

## 🎨 Interface Utilisateur

### Design System
- **Framework** : Tailwind CSS
- **Composants** : shadcn/ui
- **Icônes** : Lucide React
- **Animations** : CSS Transitions + Framer Motion (si nécessaire)

### Responsive Design
- **Mobile** : Vue simplifiée avec navigation par onglets
- **Tablet** : Vue Kanban adaptée
- **Desktop** : Interface complète avec sidebar

### Dark Mode
- Support complet du mode sombre
- Basculement automatique selon les préférences système

## 🔔 Notifications & Temps Réel

### WebSocket Events
```javascript
// Événements écoutés
workflow_updated    // Mise à jour d'un workflow
workflow_created    // Nouveau workflow
workflow_deleted    // Workflow supprimé
stats_updated       // Nouvelles statistiques

// Événements émis
request_stats       // Demander les stats
request_workflows   // Demander les workflows
```

### Notifications Toast
- **Succès** : Actions réussies
- **Erreurs** : Problèmes de connexion ou API
- **Info** : Mises à jour temps réel

## 🧪 Tests & Debugging

### Tests Automatisés
```bash
# Tests unitaires des composants
npm run test:components

# Tests d'intégration API
npm run test:api

# Tests E2E dashboard
npm run test:e2e:dashboard
```

### Debug Mode
```javascript
// Activer le debug WebSocket
localStorage.setItem('workflow-debug', 'true');

// Voir les logs détaillés
console.log(useWorkflowStore.getState());
```

### Métriques de Performance
- **Temps de chargement** : < 2s pour 1000 workflows
- **Mises à jour temps réel** : < 100ms latence
- **Memory usage** : < 50MB pour session longue

## 🔒 Sécurité & Permissions

### Authentification
- Accès réservé aux administrateurs
- Token JWT requis
- Session expiration automatique

### Permissions
- **Admin complet** : Toutes les actions
- **Manager** : Vue + actions limitées
- **Viewer** : Vue seule

### Audit Trail
- Toutes les actions sont loggées
- Historique complet par workflow
- Export des logs d'audit

## 📈 Performance & Optimisation

### Optimisations Frontend
- **Lazy loading** : Composants chargés à la demande
- **Virtual scrolling** : Pour les grandes listes
- **Debounced search** : Recherche optimisée
- **Memoization** : Re-renders minimisés

### Optimisations Backend
- **Index DB** : Requêtes optimisées
- **Caching** : Redis pour les stats fréquentes
- **Pagination** : Limitation des résultats
- **Connection pooling** : Base de données

### Monitoring
- **Uptime** : Surveillance 24/7
- **Performance** : Métriques temps réel
- **Erreurs** : Logging centralisé
- **Usage** : Analytics d'utilisation

## 🚀 Déploiement & Production

### Variables d'Environnement
```bash
# WebSocket
WEBSOCKET_URL=wss://yourdomain.com
WEBSOCKET_PATH=/api/ws/workflows

# Database
DATABASE_URL=postgresql://...
REDIS_URL=redis://...

# Auth
JWT_SECRET=your-secret
ADMIN_TOKEN=admin-token
```

### Build & Deploy
```bash
# Production build
npm run build

# Deploy to Vercel/Netlify
npm run deploy

# Health check
curl https://yourdomain.com/api/health
```

## 📚 Documentation Avancée

### Architecture Patterns
- **Store Pattern** : Zustand pour état global
- **Observer Pattern** : WebSocket événements
- **Repository Pattern** : Couche d'accès données
- **Factory Pattern** : Création des composants

### Best Practices
- **TypeScript strict** : Types complets
- **Error boundaries** : Gestion d'erreurs React
- **Loading states** : UX optimisée
- **Accessibility** : Support screen readers

---

*Dashboard Admin Workflow v2.0 - Dernière mise à jour : Septembre 2025*