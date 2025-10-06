# 🚀 Tuto : Soumettre votre Sitemap à Google Search Console

## 📋 Prérequis
- Avoir un compte Google
- Le site doit être déployé sur votre domaine final (awema.fr)

---

## 🔐 Étape 1 : Accéder à Google Search Console

1. Allez sur https://search.google.com/search-console
2. Connectez-vous avec votre compte Google
3. Cliquez sur **"Ajouter une propriété"**

---

## 🌐 Étape 2 : Ajouter votre domaine

### Option A : Domaine complet (recommandé)
1. Sélectionnez **"Domaine"** (à gauche)
2. Entrez : `awema.fr`
3. Cliquez sur **"Continuer"**

### Option B : Préfixe d'URL
1. Sélectionnez **"Préfixe d'URL"** (à droite)
2. Entrez : `https://awema.fr`
3. Cliquez sur **"Continuer"**

---

## ✅ Étape 3 : Vérifier la propriété

Google propose plusieurs méthodes de vérification :

### Méthode 1 : DNS (Recommandée pour Option A)
1. Google vous donne un code TXT type : `google-site-verification=ABC123XYZ...`
2. Connectez-vous à votre compte O2switch
3. Allez dans **cPanel → Zone Editor**
4. Ajoutez un enregistrement **TXT** :
   - **Nom** : `@` (ou laissez vide)
   - **Valeur** : Collez le code Google
5. Attendez 10-30 min (propagation DNS)
6. Retournez sur Google Search Console → **"Vérifier"**

### Méthode 2 : Balise HTML (Recommandée pour Option B)
1. Google vous donne une balise HTML :
   ```html
   <meta name="google-site-verification" content="ABC123XYZ..." />
   ```
2. Ouvrez le fichier : `/src/layouts/Base.astro`
3. Ajoutez la balise dans la section `<head>` (ligne ~20)
4. Rebuild et déployez :
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name=awema-site
   ```
5. Retournez sur Google Search Console → **"Vérifier"**

### Méthode 3 : Fichier HTML
1. Téléchargez le fichier `googleXXXXXX.html`
2. Placez-le dans `/public/`
3. Rebuild et déployez
4. Vérifiez l'accès : `https://awema.fr/googleXXXXXX.html`
5. Retournez sur Google Search Console → **"Vérifier"**

---

## 📍 Étape 4 : Soumettre le Sitemap

1. Une fois la propriété vérifiée, cliquez sur **"Sitemaps"** (menu gauche)
2. Dans le champ **"Ajouter un sitemap"**, entrez :
   ```
   sitemap-index.xml
   ```
3. Cliquez sur **"Envoyer"**

✅ **C'est tout !** Google va commencer à indexer vos pages.

---

## 📊 Étape 5 : Vérifier l'indexation

### Voir le statut du sitemap
1. Allez dans **"Sitemaps"**
2. Vous verrez :
   - **État** : Réussite ✅
   - **URLs découvertes** : 58
   - **URLs indexées** : 0 → 58 (progressivement)

### Voir les pages indexées
1. Allez dans **"Couverture"** ou **"Pages"**
2. Vous verrez le nombre de pages :
   - **Valide** : Pages indexées avec succès
   - **Avertissement** : Pages avec problèmes mineurs
   - **Erreur** : Pages non indexées

---

## ⏱️ Combien de temps pour l'indexation ?

| Délai | Ce qui se passe |
|-------|-----------------|
| **2-4 heures** | Google découvre le sitemap |
| **1-3 jours** | Premières pages indexées (homepage, pages importantes) |
| **1-2 semaines** | Toutes les pages indexées |

---

## 🔥 Astuce Pro : Forcer l'indexation

Pour indexer une page rapidement :

1. Allez dans **"Inspection d'URL"** (barre du haut)
2. Entrez l'URL exacte : `https://awema.fr/plombier`
3. Cliquez sur **"Demander une indexation"**
4. Attendez 24-48h

⚠️ Limite : **10 demandes/jour** max

---

## 📈 Bonus : Optimisations Post-Indexation

### 1. Surveiller les performances
- **Rapport Performances** → Voir clics, impressions, CTR
- **Rapport Couverture** → Surveiller les erreurs

### 2. Corriger les erreurs
- **Erreurs 404** : Pages supprimées mais encore dans le sitemap
- **Soft 404** : Pages vides ou sans contenu
- **Problèmes d'exploration** : robots.txt bloque des pages

### 3. Améliorer le SEO
- **Données structurées** : Vérifier Schema.org
- **Core Web Vitals** : Vérifier les performances
- **Liens cassés** : Corriger les 404

---

## 🆘 Problèmes courants

### ❌ "Le sitemap est introuvable"
**Solution** : Vérifiez que le fichier existe :
```
https://awema.fr/sitemap-index.xml
```
Si ça ne charge pas → redéployez le site.

### ❌ "Erreur de format XML"
**Solution** : Vérifiez la syntaxe du sitemap (déjà OK dans votre cas).

### ❌ "Pages non indexées"
**Solutions** :
1. Attendez 1-2 semaines
2. Vérifiez `robots.txt` n'interdit pas l'indexation
3. Vérifiez que la page a du contenu (> 300 mots)
4. Demandez une indexation manuelle

### ❌ "Propriété non vérifiée"
**Solutions** :
1. Vérifiez que la balise/fichier est bien déployé
2. Attendez la propagation DNS (jusqu'à 48h)
3. Essayez une autre méthode de vérification

---

## ✅ Checklist finale

- [ ] Propriété Google Search Console créée
- [ ] Propriété vérifiée (DNS ou HTML)
- [ ] Sitemap soumis (`sitemap-index.xml`)
- [ ] Statut sitemap = "Réussite"
- [ ] Pages commencent à être indexées (sous 3 jours)

---

## 📚 Ressources

- [Centre d'aide Google Search Console](https://support.google.com/webmasters)
- [Guide des sitemaps XML](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Protocole Sitemaps](https://www.sitemaps.org/)

---

**Votre sitemap actuel** :
- **URL** : https://awema.fr/sitemap-index.xml
- **Pages** : 58 URLs
- **Priorités** : ✅ Optimisées (1.0 → 0.3)
- **Dates** : ✅ Mises à jour
- **Fréquence** : ✅ Définie (daily → yearly)

🎯 **Prêt pour Google !**
