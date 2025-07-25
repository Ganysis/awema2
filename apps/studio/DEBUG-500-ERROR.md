# Debug de l'erreur 500 sur Supabase

## Problème identifié

L'URL est bien corrigée (on voit le message "Protection globale: Correction .asc"), mais l'erreur 500 persiste.

## Causes possibles :

1. **RLS (Row Level Security) activé sans policies**
   - Les tables ont RLS activé mais pas de policies définies
   - Solution : Exécuter le script `CREATE-RLS-POLICIES.sql`

2. **Le site_id n'existe pas dans la base**
   - Le UUID `97ffb635-78b6-4983-81d4-f83d02b37f08` n'a pas de données
   - Solution : Exécuter `FIX-SITE-97ffb635.sql`

3. **Structure de table différente**
   - La table pourrait avoir des colonnes différentes
   - Vérifier avec : `SELECT column_name FROM information_schema.columns WHERE table_name = 'cms_content';`

## Actions à faire dans Supabase :

### 1. Vérifier RLS
```sql
-- Vérifier si RLS est activé
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename LIKE 'cms_%';
```

### 2. Si RLS est activé, créer une policy temporaire
```sql
-- Policy permissive temporaire pour debug
CREATE POLICY "temp_allow_all" ON cms_content
FOR ALL 
TO anon, authenticated
USING (true)
WITH CHECK (true);
```

### 3. Tester directement la requête
```sql
-- Tester la requête exacte qui échoue
SELECT * FROM cms_content 
WHERE site_id = '97ffb635-78b6-4983-81d4-f83d02b37f08'::uuid 
ORDER BY page_slug;
```

### 4. Vérifier les logs Supabase
Dans le dashboard Supabase :
- Aller dans "Logs" > "API logs"
- Filtrer par status 500
- Regarder le message d'erreur exact

## Solution rapide :

Si vous voulez juste que ça marche rapidement :

1. **Désactiver RLS temporairement** (pas recommandé en production) :
```sql
ALTER TABLE cms_content DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_sites DISABLE ROW LEVEL SECURITY;
ALTER TABLE cms_users DISABLE ROW LEVEL SECURITY;
```

2. **Ou utiliser le mode localStorage** :
Dans la console du site :
```javascript
localStorage.setItem('cms_mode', 'local');
location.reload();
```

## Prochaine étape :

Exécutez d'abord `FIX-SITE-97ffb635.sql` dans Supabase pour créer les données du site.