# 🚀 SOLUTION IMMÉDIATE - Faire fonctionner le CMS

## Actions à faire dans l'ordre :

### 1. Dans Supabase SQL Editor (2 min)
Exécutez ce script pour désactiver RLS et corriger les permissions :

```sql
-- Désactiver RLS sur toutes les tables CMS
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;

-- Vérifier/créer la structure
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'cms_content'
);
```

### 2. Redéployer le site (5 min)

Le problème vient des fichiers déployés. Il faut redéployer avec les corrections :

1. Dans votre éditeur AWEMA Studio
2. Cliquez sur "Déployer avec CMS"
3. Utilisez les mêmes paramètres qu'avant
4. Attendez le déploiement

### 3. Alternative rapide - Forcer localStorage

Si Supabase continue de poser problème, on peut forcer le CMS à utiliser localStorage :

1. Dans votre navigateur, allez sur votre site déployé
2. Ouvrez la console (F12)
3. Exécutez :
```javascript
// Forcer localStorage
localStorage.setItem('CMS_USE_LOCAL', 'true');
localStorage.setItem('awema_site_data', JSON.stringify({
  pages: [{
    id: 'home',
    slug: 'accueil',
    title: 'Accueil',
    blocks: []
  }]
}));
// Recharger
location.reload();
```

### 4. Debug - Voir l'erreur exacte

Dans la console du navigateur :
```javascript
// Tester la connexion Supabase directement
const testSupabase = async () => {
  const response = await fetch('https://zvcvhundfeqwufmvtmzd.supabase.co/rest/v1/cms_content', {
    headers: {
      'apikey': window.CMS_CONFIG?.supabase?.anonKey || 'your-anon-key'
    }
  });
  console.log('Status:', response.status);
  console.log('Response:', await response.text());
};
testSupabase();
```

## 🎯 Résultat attendu

Une fois ces actions faites, le CMS devrait :
- Se connecter correctement (admin@admin.fr / admin)
- Afficher l'éditeur de pages
- Permettre d'ajouter/modifier des blocs
- Sauvegarder les changements

## ⚠️ Note importante

L'erreur "Unexpected identifier 'accueil'" disparaîtra une fois que Supabase répondra correctement, car elle est causée par un échec de chargement des données.