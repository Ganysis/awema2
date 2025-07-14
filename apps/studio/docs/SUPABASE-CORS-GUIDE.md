# 🔧 Guide Configuration CORS Supabase

## Où trouver la configuration CORS

### Option 1 : Dans les Settings API

1. Allez sur : https://app.supabase.com/project/zvcvhundfeqwufmvtmzd
2. Dans le menu de gauche, cliquez sur **Settings** (icône engrenage)
3. Puis cliquez sur **API**
4. Cherchez la section **CORS** ou **Allowed Origins**

### Option 2 : Configuration Edge Functions

Si vous ne trouvez pas CORS dans API Settings :

1. Allez dans **Edge Functions**
2. Regardez s'il y a une configuration CORS là

### Option 3 : Solution Alternative - Headers Personnalisés

Si CORS n'est pas configurable directement, vous pouvez :

1. **Utiliser un wildcard temporairement** (moins sécurisé mais fonctionne) :
   - Certains projets Supabase acceptent tous les domaines par défaut
   - Testez directement le site pour voir si ça fonctionne

2. **Créer une Edge Function avec CORS** :
   ```sql
   -- Dans SQL Editor
   CREATE OR REPLACE FUNCTION handle_cors()
   RETURNS void
   LANGUAGE plpgsql
   AS $$
   BEGIN
     -- Cette fonction est juste un placeholder
     -- Les vrais headers CORS sont gérés par Supabase
   END;
   $$;
   ```

### Option 4 : Vérifier la Documentation Supabase

La configuration CORS peut varier selon :
- La version de votre projet Supabase
- Le plan que vous utilisez (Free/Pro)
- La région de votre projet

### 🚨 Solution Rapide

**Si vous ne trouvez pas la configuration CORS :**

1. **Testez d'abord** : Supabase autorise peut-être déjà votre domaine
   - Allez sur https://awema-fixed-1752348301629.netlify.app/admin
   - Essayez de vous connecter
   - Si ça fonctionne, CORS est déjà OK !

2. **Alternative sans CORS** : Mode localStorage
   - Le CMS fonctionne aussi en mode offline
   - Les données sont stockées localement
   - Pas besoin de configuration CORS

### 📝 Test de Connexion Supabase

Pour tester si CORS fonctionne, ouvrez la console du navigateur sur votre site et exécutez :

```javascript
// Test de connexion Supabase
fetch('https://zvcvhundfeqwufmvtmzd.supabase.co/rest/v1/cms_content?select=*', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.F03jQKH5gPnggL1amanmNCaCBzhjXJaqwd-wM3FdWfM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.F03jQKH5gPnggL1amanmNCaCBzhjXJaqwd-wM3FdWfM'
  }
})
.then(r => r.json())
.then(data => console.log('✅ CORS OK!', data))
.catch(err => console.error('❌ CORS Error:', err));
```

### 🎯 Si rien ne fonctionne

Le CMS AWEMA a un **mode fallback automatique** :
- Si Supabase n'est pas accessible → localStorage
- Les données sont sauvegardées localement
- Vous pouvez quand même utiliser le CMS !

### 💡 Astuce

Parfois, Supabase configure CORS automatiquement pour :
- Les domaines Netlify (*.netlify.app)
- Les domaines localhost
- Les domaines HTTPS

Essayez d'abord votre site, il se peut que CORS soit déjà configuré ! 🎉