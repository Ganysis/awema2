# 🚀 Générateur Automatique de Sites BTP

## 📋 Métiers Supportés

1. **Plombier** (bleu) - Dépannage, rénovation SDB, débouchage
2. **Électricien** (orange) - Installation, tableau, domotique
3. **Menuisier** (marron) - Meubles sur mesure, parquet, escaliers
4. **Paysagiste** (vert) - Jardins, élagage, arrosage automatique
5. **Peintre** (rouge) - Intérieur, façade, décoration
6. **Carreleur** (violet) - Carrelage, faïence, terrasse
7. **Maçon** (gris) - Construction, extension, fondations

## 🎯 Comment Utiliser

### 1. Génération Simple
```bash
node generate-site-metier.cjs --metier=plombier --nom=Martin --ville=Lyon
```

### 2. Génération Complète
```bash
node generate-site-metier.cjs \
  --metier=electricien \
  --nom=Durand \
  --ville=Marseille \
  --telephone="04 91 23 45 67" \
  --email=contact@elec-durand.fr
```

**Note:** Le script utilise l'extension `.cjs` pour la compatibilité CommonJS.

## 🔧 Ce Qui Est Généré Automatiquement

### ✅ Configuration
- Nom de l'entreprise partout
- Ville et coordonnées
- Métadonnées SEO adaptées
- Logo avec nom et couleur du métier

### ✅ Images Cohérentes
- **Banner** : Image principale du métier
- **6 Services** : Photos spécifiques au métier
- **6 Gallery** : Portfolio de réalisations
- **7 Projets** : Images de projets réalisés
- **Toutes les images** sont cohérentes avec le métier

### ✅ Contenu Adapté
- Services spécifiques au métier
- Descriptions professionnelles
- Mots-clés SEO optimisés
- Témoignages adaptés

### ✅ Design
- Couleur principale selon le métier
- Logo personnalisé
- Icônes cohérentes

## 📊 Exemples de Commandes

### Plombier à Paris
```bash
node generate-site-metier.cjs --metier=plombier --nom=Dupont --ville=Paris
```

### Électricien à Lyon
```bash
node generate-site-metier.cjs --metier=electricien --nom=Volt+ --ville=Lyon
```

### Menuisier à Bordeaux
```bash
node generate-site-metier.cjs --metier=menuisier --nom=Lebois --ville=Bordeaux
```

### Paysagiste à Toulouse
```bash
node generate-site-metier.cjs --metier=paysagiste --nom=GreenPro --ville=Toulouse
```

## 🖼️ Images par Métier

Le système génère automatiquement des **placeholders SVG** avec :
- La couleur du métier
- Le nom du service/projet
- Un design professionnel

**Images générées :**
- 1 bannière principale
- 6 images de services
- 6 images de galerie
- 7 images de projets

**Note:** Dans un environnement de production, ces placeholders peuvent être remplacés par de vraies photos du métier.

## 🔄 Workflow Complet

1. **Client remplit formulaire** → Métier + Nom + Ville
2. **Script génère automatiquement** :
   - Logo personnalisé
   - Toutes les images cohérentes
   - Contenu adapté au métier
   - Configuration complète
3. **Site prêt en 30 secondes** ✨

## 📝 Structure des Données

```javascript
{
  metier: "plombier",
  nom: "Dupont",
  ville: "Paris",
  telephone: "01 23 45 67 89",
  email: "contact@plomberie-dupont.fr"
}
```

## 🎨 Couleurs par Métier

- **Plombier** : Bleu (#1e40af)
- **Électricien** : Orange (#f59e0b)
- **Menuisier** : Marron (#92400e)
- **Paysagiste** : Vert (#059669)
- **Peintre** : Rouge (#dc2626)
- **Carreleur** : Violet (#7c3aed)
- **Maçon** : Gris (#6b7280)

## 🚀 Déploiement Automatique

Après génération :
```bash
# Build le site
npm run build

# Déployer sur Netlify/Vercel
npm run deploy
```

## 💡 Avantages

- ✅ **100% automatisé** : 0 intervention manuelle
- ✅ **Images cohérentes** : Pas de palmiers pour un plombier !
- ✅ **SEO optimisé** : Mots-clés spécifiques au métier
- ✅ **Design professionnel** : Couleurs et logo adaptés
- ✅ **Rapide** : Site généré en 30 secondes

## 🔮 Évolutions Futures

- [ ] Plus de métiers (couvreur, chauffagiste, etc.)
- [ ] Multilangue
- [ ] Génération de blog avec articles
- [ ] Intégration Google Reviews
- [ ] Templates multiples par métier

---

**⚡ Un site professionnel BTP en 30 secondes !**