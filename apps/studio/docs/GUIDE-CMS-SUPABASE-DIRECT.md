# 🚀 Guide CMS AWEMA avec Supabase Direct

## 🎯 Vue d'ensemble

La solution **Supabase Direct** permet d'avoir un CMS fonctionnel sans les complications des Netlify Functions. Le CMS se connecte directement à Supabase depuis le navigateur, éliminant ainsi tous les problèmes de CORS et de configuration.

## ✅ Avantages

1. **Aucun problème de CORS** avec les domaines personnalisés
2. **Pas de Netlify Functions** à configurer
3. **Mode offline** avec fallback sur localStorage
4. **Performance optimale** (connexion directe)
5. **Déploiement simple** (juste des fichiers statiques)

## 🛠️ Configuration

### 1. Dans AWEMA Studio

L'export avec CMS est automatique si vous avez configuré Supabase :

```javascript
// Dans .env.local
NEXT_PUBLIC_SUPABASE_URL=https://votre-projet.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Export du site

Lors de l'export, assurez-vous que :
- **Include CMS** est activé
- **CMS Level** est sur "Full" pour toutes les fonctionnalités

### 3. Configuration Supabase

#### Étape 1 : CORS
Dans votre projet Supabase :
1. Allez dans **Settings > API > CORS**
2. Ajoutez vos domaines :
   ```
   https://monsite.com
   https://www.monsite.com
   https://monsite.netlify.app
   http://localhost:3000
   ```
   Ou utilisez `*` pour autoriser tous les domaines (moins sécurisé)

#### Étape 2 : Tables
Les tables sont déjà créées par nos scripts SQL :
- `cms_sites`
- `cms_users`
- `cms_content`
- `cms_media`
- `cms_versions`

#### Étape 3 : RLS (Production)
Pour la production, activez Row Level Security :
```sql
-- Lecture publique du contenu
CREATE POLICY "Public read" ON cms_content
  FOR SELECT USING (true);

-- Écriture authentifiée
CREATE POLICY "Authenticated write" ON cms_content
  FOR ALL USING (auth.uid() IS NOT NULL);
```

## 📦 Déploiement

### Sur Netlify

1. **Méthode ZIP** :
   - Exportez votre site avec CMS
   - Créez un ZIP du dossier exporté
   - Glissez le ZIP sur Netlify

2. **Méthode Git** :
   - Commitez les fichiers exportés
   - Connectez votre repo à Netlify
   - Déployez automatiquement

### Configuration DNS

Pour un domaine personnalisé :
1. Ajoutez le domaine dans Netlify
2. Configurez les DNS chez votre registrar
3. Le CMS fonctionnera automatiquement sur `votredomaine.com/admin`

## 🎨 Utilisation du CMS

### 1. Connexion

Accédez à `https://votresite.com/admin` et connectez-vous :
- **Email** : admin@admin.fr
- **Mot de passe** : admin

> Pour la production, créez un vrai utilisateur dans Supabase

### 2. Éditeur de pages

L'éditeur permet de :
- **Visualiser** tous les blocs de la page
- **Sélectionner** un bloc pour l'éditer
- **Modifier** les propriétés du bloc
- **Prévisualiser** en temps réel
- **Sauvegarder** automatiquement (toutes les 2 secondes)

### 3. Types de blocs supportés

Tous les blocs Ultra-Modern sont supportés avec aperçu visuel :
- Hero (8 variantes)
- Features (6 modes)
- Testimonials (8 designs)
- Gallery (8 styles)
- Contact (8 variantes)
- Pricing (8 layouts)
- FAQ (8 designs)
- Header/Footer

### 4. Édition des propriétés

L'éditeur détecte automatiquement le type de champ :
- **Texte** : Titre, nom, label
- **Textarea** : Description, contenu, bio
- **URL** : Liens, images
- **Email** : Adresses email
- **Tel** : Numéros de téléphone
- **Number** : Prix, quantités
- **Checkbox** : Options on/off

## 🔧 Dépannage

### Erreur CORS

Si vous voyez une erreur CORS :
1. Vérifiez la configuration dans Supabase
2. Assurez-vous que votre domaine est dans la liste
3. Essayez avec `*` temporairement pour tester

### Le contenu ne se sauvegarde pas

1. Vérifiez la console du navigateur
2. Si Supabase est inaccessible, le CMS utilise localStorage
3. Vérifiez que les tables existent dans Supabase

### Page blanche sur /admin

1. Vérifiez que tous les fichiers admin/* sont présents
2. Regardez la console pour les erreurs JavaScript
3. Vérifiez que les URLs Supabase sont correctes

## 📊 Monitoring

### Vérifier les sauvegardes

Dans l'éditeur, un indicateur montre :
- **"✓ Sauvegardé"** : Sauvegarde réussie dans Supabase
- **"✓ Sauvegardé (local)"** : Sauvegarde en localStorage (mode offline)
- **"Sauvegarde..."** : Sauvegarde en cours

### Logs Supabase

Dans votre dashboard Supabase :
1. **Database > Logs** pour voir les requêtes
2. **Authentication > Logs** pour les connexions
3. **Storage > Logs** pour les médias

## 🚀 Optimisations

### 1. Cache navigateur

Le CMS utilise le cache pour :
- Les données statiques
- Les configurations
- Les assets (images, CSS, JS)

### 2. Lazy loading

Les blocs sont chargés à la demande pour améliorer les performances.

### 3. Compression

Toutes les communications avec Supabase sont compressées automatiquement.

## 🔐 Sécurité

### Pour la production

1. **Changez les identifiants par défaut**
2. **Activez RLS dans Supabase**
3. **Utilisez l'authentification Supabase**
4. **Limitez les CORS aux domaines nécessaires**
5. **Activez les backups automatiques**

### Exemple d'authentification sécurisée

```javascript
// Au lieu de admin@admin.fr
const { data, error } = await supabase.auth.signInWithPassword({
  email: userEmail,
  password: userPassword
});
```

## 📱 Responsive

L'éditeur CMS est entièrement responsive :
- **Desktop** : Interface 3 colonnes
- **Tablet** : Interface 2 colonnes
- **Mobile** : Interface empilée

## 🎉 Conclusion

La solution Supabase Direct offre la meilleure expérience pour un CMS multi-tenant :
- **Simple** à déployer
- **Fiable** sans problèmes de CORS
- **Performant** avec connexion directe
- **Flexible** avec mode offline

Pour toute question, consultez la documentation complète ou contactez le support AWEMA.