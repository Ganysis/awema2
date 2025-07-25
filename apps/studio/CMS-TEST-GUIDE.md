# Guide de Test du CMS AWEMA

## 🎯 Objectif
Valider que le CMS intégré fonctionne correctement avec toutes les fonctionnalités promises.

## ✅ Checklist de Test

### 1. Export et Déploiement
- [ ] Créer un nouveau projet dans AWEMA Studio
- [ ] Ajouter plusieurs blocs (Hero, Content, Gallery, Contact, etc.)
- [ ] Cliquer sur "Déployer" et sélectionner le plan "Premium"
- [ ] Vérifier que l'export génère bien les fichiers CMS

### 2. Connexion au CMS
- [ ] Ouvrir le site exporté et naviguer vers `/admin`
- [ ] Vérifier que la page de connexion s'affiche correctement
- [ ] Se connecter avec les identifiants fournis lors de l'export
- [ ] Vérifier que le dashboard s'affiche sans erreurs

### 3. Dashboard
- [ ] Vérifier l'affichage des statistiques (nombre de pages, médias, etc.)
- [ ] Vérifier que les pages récentes s'affichent
- [ ] Tester la navigation entre les sections (Pages, Médias, Paramètres)

### 4. Édition de Pages
- [ ] Cliquer sur "Pages" dans le menu
- [ ] Sélectionner une page à éditer
- [ ] Vérifier que l'éditeur de page se charge
- [ ] Tester les fonctionnalités suivantes :
  - [ ] Modifier le titre de la page
  - [ ] Modifier l'URL de la page
  - [ ] Sélectionner un bloc existant
  - [ ] Modifier les propriétés d'un bloc
  - [ ] Ajouter un nouveau bloc
  - [ ] Supprimer un bloc
  - [ ] Réorganiser les blocs (déplacer haut/bas)
  - [ ] Sauvegarder les modifications

### 5. Gestion des Médias
- [ ] Cliquer sur "Médias" dans le menu
- [ ] Tester l'upload d'une nouvelle image
- [ ] Vérifier que l'image s'affiche dans la galerie
- [ ] Tester la suppression d'une image
- [ ] Vérifier l'intégration avec les blocs Gallery

### 6. Persistence des Données
- [ ] Faire des modifications dans une page
- [ ] Sauvegarder
- [ ] Rafraîchir la page
- [ ] Vérifier que les modifications sont conservées
- [ ] Se déconnecter et se reconnecter
- [ ] Vérifier que les données sont toujours présentes

### 7. Design et UX
- [ ] Vérifier que l'interface est moderne et professionnelle
- [ ] Tester la responsivité sur mobile/tablet
- [ ] Vérifier les animations et transitions
- [ ] S'assurer qu'il n'y a pas d'erreurs visuelles

## 🐛 Problèmes Connus

### Erreur "CMS bientôt accessible"
**Solution** : S'assurer de sélectionner le plan "Pro" ou "Premium" lors du déploiement

### Erreur de syntaxe dans page-editor.js
**Solution** : Corrigé dans la dernière version (template literals échappés)

### Erreurs Supabase 404/500
**Solution** : Le CMS utilise maintenant localStorage, pas de dépendance Supabase

## 📝 Notes de Test

### Identifiants par défaut
- Email : `admin@site.com`
- Mot de passe : `admin123`

### Stockage des données
- Toutes les données sont stockées dans localStorage
- Clé principale : `awema_cms_data`
- Backup automatique à chaque sauvegarde

### Fonctionnalités non implémentées
- Blog (prévu pour une future version)
- Multi-utilisateurs
- Versioning avancé

## 🚀 Prochaines Étapes

1. Tester l'intégration complète
2. Corriger les bugs trouvés
3. Améliorer l'ergonomie selon les retours
4. Ajouter les fonctionnalités manquantes

---

*Dernière mise à jour : 11/01/2025*