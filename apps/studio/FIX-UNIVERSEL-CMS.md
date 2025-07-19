# 🚀 Solution UNIVERSELLE pour tous les sites AWEMA

## Le problème résolu une fois pour toutes

Cette solution permet à **N'IMPORTE QUEL site déployé** de fonctionner, peu importe son ID.

## 1️⃣ Configuration Supabase (une seule fois)

### Option A : Solution rapide (développement)
```sql
-- Désactiver RLS pour un accès immédiat
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_media DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_versions DISABLE ROW LEVEL SECURITY;
```

### Option B : Solution sécurisée (production)
Exécutez le script complet `SUPABASE-SETUP-UNIVERSEL.sql` qui :
- Crée des policies universelles pour tous les sites
- Permet l'accès anonyme en lecture/écriture
- Fonctionne pour n'importe quel site_id

## 2️⃣ Correction dans le code (déjà appliquée)

Le code source inclut maintenant :
- ✅ Protection automatique contre les erreurs `.asc`
- ✅ Apostrophes correctement échappées
- ✅ Double protection dans le JavaScript généré

## 3️⃣ Pour les sites déjà déployés

Si un site a été déployé AVANT les corrections :

### Option 1 : Patch temporaire
Dans la console du navigateur sur `/admin/` :
```javascript
// Copier-coller le contenu de PATCH-UNIVERSEL.js
```

### Option 2 : Redéployer
Refaire un export depuis AWEMA Studio et redéployer

## 4️⃣ Vérification

Après configuration :
1. N'importe quel site déployé fonctionnera
2. Pas besoin de créer manuellement les données pour chaque site
3. Le CMS se chargera automatiquement

## 🎯 Résultat

- **Tous les nouveaux déploiements** : Fonctionnent directement
- **Sites existants** : Utilisez le patch ou redéployez
- **Supabase** : Configuré une fois pour tous les sites

Plus jamais besoin de :
- Créer manuellement des entrées pour chaque site_id
- Modifier des scripts SQL pour chaque déploiement
- S'inquiéter des erreurs `.asc` ou de syntaxe

## 📝 Notes importantes

1. **CORS dans Supabase** : Ajoutez `https://*.netlify.app` dans les domaines autorisés
2. **Clés API** : Les mêmes clés Supabase fonctionnent pour tous les sites
3. **Sécurité** : Pour la production, utilisez les policies plutôt que de désactiver RLS