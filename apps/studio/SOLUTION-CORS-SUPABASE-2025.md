# 🚨 SOLUTION CORS Supabase (Version 2025)

## ❌ Le problème
Supabase a retiré les paramètres CORS de l'interface. Maintenant, CORS est géré différemment.

## ✅ Solutions disponibles

### Solution 1 : Utiliser les bonnes clés et méthodes (RECOMMANDÉ)

Le problème vient peut-être du fait que vous utilisez l'API REST directement. Essayons avec le client Supabase :

1. **Vérifiez vos clés dans `.env.local`** :
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://zvcvhundfeqwufmvtmzd.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. **Le CMS utilise déjà le bon client**, mais vérifions que les tables existent

### Solution 2 : Créer les tables si elles n'existent pas

1. Allez dans Supabase Dashboard → **SQL Editor**
2. Exécutez ce script pour créer les tables :

```sql
-- Table cms_content (simplifiée pour test)
CREATE TABLE IF NOT EXISTS cms_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_id TEXT NOT NULL,
  page_slug TEXT NOT NULL,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes
CREATE INDEX IF NOT EXISTS idx_cms_content_site_id ON cms_content(site_id);
CREATE INDEX IF NOT EXISTS idx_cms_content_page_slug ON cms_content(page_slug);

-- Désactiver RLS temporairement pour tester
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;

-- Insérer des données de test
INSERT INTO cms_content (site_id, page_slug, content) 
VALUES (
  'site-1752866606272',
  'accueil',
  '{"title": "Page d''accueil", "blocks": []}'
) ON CONFLICT DO NOTHING;
```

### Solution 3 : Vérifier les permissions Supabase

1. Dans Supabase Dashboard → **Authentication → Policies**
2. Pour la table `cms_content`, créez une policy "Enable all" temporaire :
   - Policy name : `Allow all for testing`
   - Target roles : `anon`
   - WITH CHECK : `true`
   - USING : `true`

### Solution 4 : Alternative - Utiliser localStorage temporairement

Si Supabase pose trop de problèmes, on peut forcer le CMS à utiliser localStorage :

1. Éditez le fichier déployé `/admin/config.js` 
2. Remplacez les URLs Supabase par `null`
3. Le CMS basculera automatiquement sur localStorage

## 🔍 Debug : Voir l'erreur exacte

1. Ouvrez la console du navigateur (F12)
2. Allez dans l'onglet **Network**
3. Rechargez la page
4. Cherchez la requête qui échoue vers `supabase.co`
5. Cliquez dessus → onglet **Response**
6. Copiez l'erreur exacte

## 💡 Solution rapide pour tester

Dans la console du navigateur, testez directement :

```javascript
// Test de connexion Supabase
fetch('https://zvcvhundfeqwufmvtmzd.supabase.co/rest/v1/cms_content?site_id=eq.site-1752866606272', {
  headers: {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.F03jQKH5gPnggL1amanmNCaCBzhjXJaqwd-wM3FdWfM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2Y3ZodW5kZmVxd3VmbXZ0bXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxMzg3NzMsImV4cCI6MjA2NzcxNDc3M30.F03jQKH5gPnggL1amanmNCaCBzhjXJaqwd-wM3FdWfM'
  }
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

Si ça retourne une erreur, copiez-la ici.