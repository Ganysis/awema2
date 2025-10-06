# 📋 Guide de Modification du Contenu selon le Métier

## 🎯 Principe
Tous les contenus du template NextSpace sont modifiables selon le métier sélectionné dans le formulaire minimal. Voici les points de modification principaux :

## 📁 Fichiers à Modifier

### 1. **Images** (`/public/images/`)
- `banner.png` - Bannière principale
- `gallery-1.jpg` à `gallery-6.jpg` - Carrousel portfolio
- `project-1.jpg` à `project-7.jpg` - Images des projets
- `service-1.jpg` à `service-4.jpg` - Images des services
- `banner-testimonial.png` - Image section témoignages

### 2. **Contenu Principal** (`/src/content/homepage/-index.md`)
- **Banner** : Titre, description, texte rotatif
- **Gallery** : Titre, description, liste des images
- **Fun Facts** : Métriques et statistiques
- **Services** : Activation et configuration

### 3. **Services** (`/src/content/services/`)
- `service-1.md` : Service principal (ex: Dépannage Urgent)
- `service-2.md` : Service secondaire (ex: Rénovation)
- `service-3.md` : Service tertiaire (ex: Débouchage)
- `service-4.md` à `service-6.md` : Services additionnels

### 4. **Projets** (`/src/content/projects/`)
- `project-1.md` à `project-7.md` : Réalisations avec images et descriptions

### 5. **Témoignages** (`/src/content/reviews/-index.md`)
- Liste des témoignages clients
- Noms, fonctions et avis

### 6. **Section CTA** (`/src/content/sections/call-to-action.md`)
- Titre d'appel à l'action
- Description
- Boutons et liens

### 7. **FAQ** (`/src/content/faqs/-index.md`)
- Questions fréquentes selon le métier

## 🔄 Exemples de Contenu par Métier

### Plombier
```yaml
Services:
- Dépannage Urgent 24/7
- Rénovation Salle de Bain
- Débouchage Canalisations
- Installation Sanitaires

Images: Salles de bain, robinetterie, canalisations
Couleurs: Bleu (#1e40af)
```

### Électricien
```yaml
Services:
- Dépannage Électrique
- Installation Tableau Électrique
- Mise aux Normes
- Domotique

Images: Tableaux électriques, installations, éclairages
Couleurs: Jaune/Orange (#f59e0b)
```

### Menuisier
```yaml
Services:
- Fabrication sur Mesure
- Pose de Parquet
- Aménagement Intérieur
- Restauration Mobilier

Images: Bois, meubles, ateliers, réalisations
Couleurs: Marron (#92400e)
```

### Paysagiste
```yaml
Services:
- Création de Jardins
- Entretien Espaces Verts
- Élagage
- Arrosage Automatique

Images: Jardins, plantes, aménagements extérieurs
Couleurs: Vert (#059669)
```

## 🛠️ Processus de Modification

### 1. **Étape Initiale - Formulaire Minimal**
Le formulaire capture :
- Nom de l'entreprise
- Secteur d'activité
- Couleur principale
- Coordonnées de base

### 2. **Injection Automatique**
Script qui modifie automatiquement :
1. Remplace les images par celles du secteur
2. Met à jour tous les textes Lorem Ipsum
3. Adapte les services selon le métier
4. Applique la charte couleur
5. Configure les métriques pertinentes

### 3. **Points de Personnalisation**
```javascript
const contentMapping = {
  plomberie: {
    banner: {
      title: "Votre expert plombier à [VILLE]",
      content: "Dépannage urgent, installation et rénovation"
    },
    services: [
      "Dépannage Urgent",
      "Rénovation Salle de Bain",
      "Débouchage Canalisations"
    ],
    metrics: {
      projects: "2500+",
      experience: "15 ans",
      satisfaction: "98%",
      intervention: "45min"
    }
  },
  // ... autres métiers
};
```

## 📍 Zones de Contenu Modifiables

1. **Header/Navigation**
   - Logo
   - Menu items
   - Contact rapide

2. **Hero Banner**
   - Titre principal
   - Sous-titre
   - Image de fond
   - Boutons CTA

3. **Portfolio/Galerie**
   - Images défilantes
   - Titre section
   - Description

4. **Services**
   - 3-6 services principaux
   - Icônes et descriptions
   - Liens détaillés

5. **Projets/Réalisations**
   - 7 projets avec images
   - Descriptions
   - Catégories

6. **Témoignages**
   - Avis clients
   - Photos/avatars
   - Noms et fonctions

7. **Footer**
   - Informations légales
   - Liens rapides
   - Réseaux sociaux
   - Coordonnées

## ⚡ Script d'Injection Rapide

```bash
# Utilisation
npm run inject-content -- --metier="plomberie" --ville="Paris" --couleur="#1e40af"
```

## 📝 Notes Importantes

- Toutes les images doivent être en format JPG/PNG optimisé
- Les textes Lorem Ipsum sont automatiquement remplacés
- La couleur principale s'applique aux boutons, liens et accents
- Le contenu doit rester cohérent avec le secteur d'activité
- Prévoir des variantes pour différentes villes/régions

## 🔗 Fichiers de Configuration

- `/src/config/config.json` : Configuration générale
- `/src/config/theme.json` : Thème et couleurs
- `/src/config/menu.json` : Navigation

---

*Ce guide permet de transformer rapidement le template pour n'importe quel métier du BTP en modifiant les contenus appropriés.*