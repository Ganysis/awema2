# Analyse des Coûts par Site avec Netlify Functions

## 📊 Coûts Netlify (Hébergement + Functions)

### Plan Gratuit Netlify
- **Bandwidth** : 100 GB/mois
- **Build minutes** : 300 min/mois
- **Netlify Functions** : 125 000 requêtes/mois
- **Concurrent builds** : 1
- **Sites** : Illimités

### Estimation pour 1 site artisan type :
- **Trafic moyen** : 1000-5000 visiteurs/mois
- **Bandwidth** : ~2-10 GB/mois
- **Requêtes CMS** : ~500-2000/mois (admin + formulaires)
- **Build** : 1-2/mois (mises à jour CMS)

**Coût : 0€/mois** ✅

### Si dépassement (Plan Pro à 19$/mois par équipe) :
- 1 TB bandwidth
- 1M requêtes Functions
- Builds illimités

## 💾 Coûts Supabase (Base de données)

### Plan Gratuit Supabase
- **Database** : 500 MB
- **Storage** : 1 GB
- **Bandwidth** : 2 GB
- **Edge Functions** : 500k invocations
- **Projets** : 2

### Estimation stockage par site :
```
- Table cms_sites : ~1 KB
- Table cms_users : ~2 KB (2-3 utilisateurs)
- Table cms_content : ~50 KB (pages + blocs)
- Table cms_media : ~5 KB (métadonnées)
- Table cms_form_submissions : ~20 KB/mois
- Autres tables : ~10 KB

Total : ~100 KB par site
= 5000 sites possibles avec 500 MB
```

**Coût : 0€/mois pour ~500 sites** ✅

### Si dépassement (Plan Pro à 25$/mois) :
- 8 GB database
- 100 GB storage
- 250 GB bandwidth

## 🧮 Calcul du Coût Total

### Scénario 1 : Petit volume (< 100 sites)
- **Netlify** : 0€ (largement dans les limites gratuites)
- **Supabase** : 0€ (< 50 MB utilisés)
- **Total** : 0€/mois

### Scénario 2 : Volume moyen (100-500 sites)
- **Netlify** : 0€ (chaque site a ses propres limites)
- **Supabase** : 0€ (< 500 MB utilisés)
- **Total** : 0€/mois

### Scénario 3 : Gros volume (500+ sites)
- **Netlify** : 0€ (toujours gratuit par site)
- **Supabase** : 25$/mois (Plan Pro)
- **Total** : 25$/mois = 0.05€/site/mois

### Scénario 4 : Site à fort trafic
Si un site dépasse 125k requêtes Functions/mois :
- **Option A** : Facturer le client 15€/mois
- **Option B** : Optimiser le cache CMS
- **Option C** : Limiter les requêtes API

## 💰 Modèle de Tarification Recommandé

### Starter (297€ + 19€/mois)
- Site statique
- CMS basique (localStorage)
- 0€ de coûts d'infra

### Pro (497€ + 39€/mois)
- CMS complet Supabase
- Formulaires illimités
- Analytics
- Coût réel : ~0.05€/mois

### Premium (797€ + 59€/mois)
- Tout Pro +
- Domaine personnalisé
- Support prioritaire
- Backups automatiques

## 🎯 Optimisations pour Réduire les Coûts

### 1. Cache Agressif
```javascript
// Cache les requêtes CMS côté client
const cache = new Map();
const CACHE_TTL = 3600000; // 1 heure

async function fetchWithCache(action, params) {
  const key = `${action}-${JSON.stringify(params)}`;
  const cached = cache.get(key);
  
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetchFromAPI(action, params);
  cache.set(key, { data, time: Date.now() });
  return data;
}
```

### 2. Bundling des Requêtes
```javascript
// Grouper plusieurs actions en une seule requête
async function batchRequests(actions) {
  return fetch('/.netlify/functions/cms-api', {
    method: 'POST',
    body: JSON.stringify({
      action: 'batch',
      requests: actions
    })
  });
}
```

### 3. Static First
- Générer le maximum en statique
- CMS seulement pour les vraies modifications
- Webhooks pour rebuild seulement si nécessaire

## 📈 Projection sur 1000 Sites

### Coûts Infrastructure
- **Netlify** : 0€ (chaque site indépendant)
- **Supabase** : 25€/mois (Plan Pro suffit)
- **Domaines** : À la charge des clients
- **Total** : 25€/mois = 0.025€/site/mois

### Revenus (base 39€/mois/site)
- **MRR** : 39 000€/mois
- **Coûts** : 25€/mois
- **Marge** : 99.94%

## ✅ Conclusion

**Coût réel par site : Entre 0€ et 0.05€/mois**

C'est quasi-négligeable comparé aux 39-59€/mois facturés. La marge est excellente et permet de se concentrer sur l'acquisition client plutôt que sur l'optimisation des coûts d'infrastructure.