# Hiérarchie des Utilisateurs AWEMA CMS

## 🔐 3 Niveaux d'Accès

### 1. 👑 Super Administrateur (VOUS)
- **Email** : admin@awema.fr
- **Mot de passe** : AwemaSuperAdmin2024!
- **Rôle** : `super_admin`
- **Accès** : TOUS les sites, toutes les fonctionnalités
- **site_id** : NULL (accès global)
- **Création** : Automatique au premier déploiement
- **Usage** : 
  - Gestion de tous les sites clients
  - Monitoring global
  - Support technique
  - Configuration système

### 2. 🏢 Administrateur Site (VOTRE CLIENT)
- **Email** : admin@[nom-du-site].fr
- **Mot de passe** : admin123 (par défaut)
- **Rôle** : `admin`
- **Accès** : Un site spécifique uniquement
- **site_id** : UUID du site
- **Création** : Automatique lors du déploiement
- **Usage** :
  - Gestion complète de SON site
  - Création d'utilisateurs
  - Configuration du site
  - Accès aux statistiques

### 3. 👤 Utilisateur Standard (CLIENT FINAL)
- **Email** : admin@admin.fr (convention)
- **Mot de passe** : admin
- **Rôle** : `editor`
- **Accès** : Un site spécifique, fonctions limitées
- **site_id** : UUID du site
- **Création** : Automatique lors du déploiement
- **Usage** :
  - Modification du contenu
  - Upload de médias
  - Gestion des formulaires
  - Pas d'accès aux paramètres

## 🚀 Flux de Création Automatique

Lors d'un déploiement :

```javascript
// 1. Le Super Admin est créé/vérifié (une seule fois)
await ensureSuperAdmin();
// → admin@awema.fr (vous)

// 2. Le site est créé
const site = await createSite({
  domain: 'plomberie-martin.fr',
  siteName: 'Plomberie Martin'
});

// 3. L'admin du site est créé
await createSiteAdmin({
  email: 'admin@plomberie-martin.fr',
  password: 'admin123',
  site_id: site.id
});

// 4. L'utilisateur standard est créé
await createStandardUser({
  email: 'admin@admin.fr',
  password: 'admin',
  site_id: site.id
});
```

## 📊 Tableau Récapitulatif

| Niveau | Email | Mot de passe | Rôle | Accès | Création |
|--------|-------|--------------|------|-------|----------|
| Super Admin | admin@awema.fr | AwemaSuperAdmin2024! | super_admin | Tous les sites | Une fois |
| Admin Site | admin@[site].fr | admin123 | admin | Un site | Par déploiement |
| Utilisateur | admin@admin.fr | admin | editor | Un site | Par déploiement |

## 🔒 Sécurité

- Les mots de passe sont hashés avec bcrypt (10 rounds)
- Les sessions expirent après 24h
- Rate limiting : 5 tentatives max
- Verrouillage compte : 15 minutes après échec
- Audit logs de toutes les actions

## 💡 Pour le Client

Quand vous livrez un site, communiquez :
- **URL Admin** : https://son-site.fr/admin
- **Email** : admin@admin.fr
- **Mot de passe** : admin

Le client peut ensuite :
1. Changer son mot de passe
2. Créer d'autres utilisateurs si besoin
3. Gérer son contenu en autonomie

## 🛠️ Commandes Utiles

```sql
-- Voir tous les super admins
SELECT * FROM cms_users WHERE role = 'super_admin';

-- Voir tous les sites
SELECT * FROM cms_sites ORDER BY created_at DESC;

-- Voir les utilisateurs d'un site
SELECT * FROM cms_users WHERE site_id = 'UUID-DU-SITE';

-- Réinitialiser un mot de passe
UPDATE cms_users 
SET password_hash = crypt('nouveau-mdp', gen_salt('bf', 10))
WHERE email = 'user@example.com';
```