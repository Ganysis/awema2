# Base de données AWEMA Studio - Guide d'installation

## 🚀 Installation rapide

### 1. Installer les dépendances

```bash
cd apps/studio
npm install prisma @prisma/client bcrypt jsonwebtoken zod
npm install -D @types/bcrypt @types/jsonwebtoken
```

### 2. Configuration de l'environnement

Copier le fichier `.env.example` vers `.env` :

```bash
cp .env.example .env
```

Modifier les variables dans `.env` :

```env
# Pour PostgreSQL (recommandé pour production)
DATABASE_URL="postgresql://user:password@localhost:5432/awema_studio"

# OU pour SQLite (développement)
DATABASE_URL="file:./dev.db"

# IMPORTANT: Changer ces valeurs
JWT_SECRET="votre-clé-secrète-très-longue-et-sécurisée"
CMS_PASSWORD="votre-mot-de-passe-cms"
```

### 3. Initialiser la base de données

```bash
# Générer le client Prisma
npx prisma generate

# Créer les tables
npx prisma migrate dev --name init

# (Optionnel) Voir la base de données
npx prisma studio
```

### 4. Créer un utilisateur admin

```bash
npx prisma db seed
```

Ou manuellement via Prisma Studio :
1. Ouvrir `npx prisma studio`
2. Aller dans la table `users`
3. Créer un utilisateur avec le rôle `SUPER_ADMIN`

## 📊 Structure de la base de données

### Tables principales

- **users** : Utilisateurs du système
- **clients** : Clients (artisans)
- **projects** : Sites web des clients
- **contents** : Contenu des sites
- **leads** : Formulaires de contact
- **media** : Images et fichiers
- **analytics** : Statistiques des sites

### Relations

```
Client (1) → (N) Projects
Project (1) → (N) Contents
Project (1) → (N) Leads
Project (1) → (N) Media
```

## 🔌 API Endpoints

### Authentification
- `POST /api/auth` - Login/Register/Logout
- `GET /api/auth` - Vérifier token

### Clients
- `GET /api/clients` - Liste des clients
- `POST /api/clients` - Créer un client
- `GET /api/clients/[id]` - Détails client
- `PUT /api/clients/[id]` - Modifier client
- `DELETE /api/clients/[id]` - Supprimer client

### Projets
- `GET /api/projects` - Liste des projets
- `POST /api/projects` - Créer un projet
- `GET /api/projects/[id]` - Détails projet
- `PUT /api/projects/[id]` - Modifier projet
- `POST /api/projects/[id]/publish` - Publier
- `DELETE /api/projects/[id]/publish` - Dépublier

### Leads
- `GET /api/leads` - Liste des leads (auth)
- `POST /api/leads` - Créer un lead (public)

### CMS
- `GET /api/cms/[projectId]/content` - Contenu du site
- `POST /api/cms/[projectId]/content` - Sauvegarder contenu

## 🔒 Sécurité

### Authentification
- JWT avec expiration configurable
- Bcrypt pour les mots de passe
- Sessions stockées en base

### Rate Limiting
- Protection contre le spam
- Configurable par endpoint

### Permissions
- SUPER_ADMIN : Accès total
- ADMIN : Gestion clients/projets
- USER : Accès limité
- CLIENT : Lecture seule

## 🛠️ Maintenance

### Sauvegardes
```bash
# PostgreSQL
pg_dump awema_studio > backup.sql

# SQLite
cp dev.db backup.db
```

### Migrations
```bash
# Créer une migration
npx prisma migrate dev --name description

# Appliquer en production
npx prisma migrate deploy
```

### Nettoyage
```bash
# Nettoyer les sessions expirées
npx prisma db execute --sql "DELETE FROM sessions WHERE expiresAt < NOW()"

# Nettoyer les logs anciens (90 jours)
npx prisma db execute --sql "DELETE FROM activity_logs WHERE createdAt < NOW() - INTERVAL '90 days'"
```

## 🐛 Troubleshooting

### Erreur de connexion
- Vérifier DATABASE_URL
- Vérifier que PostgreSQL/SQLite est démarré
- Vérifier les permissions

### Erreur de migration
```bash
# Reset complet (ATTENTION: perd les données)
npx prisma migrate reset
```

### Performance
- Ajouter des index si nécessaire
- Utiliser `prisma.$queryRaw` pour requêtes complexes
- Activer le cache de requêtes

## 📈 Monitoring

### Logs Prisma
```typescript
// Dans prisma.ts
new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})
```

### Métriques
- Temps de réponse des requêtes
- Nombre de connexions actives
- Taille de la base de données

## 🚀 Prochaines étapes

1. **Tester l'API** avec Postman/Insomnia
2. **Intégrer** avec le dashboard existant
3. **Configurer** les sauvegardes automatiques
4. **Monitorer** les performances
5. **Documenter** l'API avec Swagger