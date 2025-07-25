# GUIDE DE DÉPLOIEMENT NETLIFY DROP

## 🚀 Instructions pas à pas

### 1. Ouvrir Netlify Drop
Allez sur : https://app.netlify.com/drop

### 2. Déployer chaque site


#### Site 1 : Plomberie Express Paris
- **Fichier** : netlify-drop-ready/plomberie-express-paris.zip (0.01 MB)
- **Type** : plombier (thème bleu)
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/plomberie-express-paris/
- **Action** : Glissez tout le dossier sur la page Netlify Drop

#### Site 2 : Élec Pro Lyon
- **Fichier** : netlify-drop-ready/elec-pro-lyon.zip (0.00 MB)
- **Type** : électricien (thème jaune)
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/elec-pro-lyon/
- **Action** : Glissez tout le dossier sur la page Netlify Drop

#### Site 3 : L'Atelier du Bois
- **Fichier** : netlify-drop-ready/atelier-du-bois.zip (0.00 MB)
- **Type** : menuisier (thème marron)
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/atelier-du-bois/
- **Action** : Glissez tout le dossier sur la page Netlify Drop

#### Site 4 : Couleurs Méditerranée
- **Fichier** : netlify-drop-ready/couleurs-mediterranee.zip (0.00 MB)
- **Type** : peintre (thème violet)
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/couleurs-mediterranee/
- **Action** : Glissez tout le dossier sur la page Netlify Drop

#### Site 5 : Bâti Sud Construction
- **Fichier** : netlify-drop-ready/bati-sud-construction.zip (0.00 MB)
- **Type** : maçon (thème gris)
- **Action** : Glissez le fichier ZIP sur la page Netlify Drop

OU si les ZIPs ne fonctionnent pas :
- **Dossier** : netlify-ready/bati-sud-construction/
- **Action** : Glissez tout le dossier sur la page Netlify Drop


### 3. Après chaque déploiement

Pour chaque site déployé, Netlify vous donnera une URL comme :
- https://amazing-einstein-123456.netlify.app

**IMPORTANT** : Notez chaque URL dans le fichier NETLIFY-URLS-TRACKER.md

### 4. Personnaliser les URLs (optionnel)

Dans Netlify, vous pouvez :
1. Cliquer sur "Site settings"
2. Aller dans "Domain management"
3. Cliquer sur "Change site name"
4. Utiliser un nom plus court comme : plomberie-paris-awema

## 📊 Vérification après déploiement

Une fois tous les sites déployés, vérifiez que chaque site a :
- ✅ Fonds colorés alternés (différents selon le métier)
- ✅ Contenu personnalisé avec le nom de l'entreprise
- ✅ Au moins 7-10 sections colorées
- ✅ Des gradients CSS appliqués

## 🔍 Analyse des sites

Après avoir noté toutes les URLs, lancez :
```bash
node scripts/analyze-deployed-sites.js
```

---

Date de génération : 22/07/2025 19:39:17
