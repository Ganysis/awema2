# 🚀 Guide de test de la personnalisation des templates

## 1. Démarrer l'application

```bash
cd /home/Ganyc/Desktop/awema/awema2/apps/studio
npm run dev
```

## 2. Accéder à l'interface admin

Ouvrez votre navigateur et allez à :
```
http://localhost:3000/admin/proposals
```

## 3. Tester avec un client existant

### Option A : Utiliser le client de test existant
1. **Cliquez sur "Plomberie Dupont & Fils"** dans la liste
2. **Cliquez sur "Analyser avec IA"** 
3. **Attendez environ 30-60 secondes** (l'IA génère du contenu personnalisé)
4. **Cliquez sur "Visualiser"** pour voir les templates personnalisés

### Option B : Créer un nouveau client test

```bash
# Dans un nouveau terminal
node scripts/test-template-workflow.js cleanup
node scripts/test-template-workflow.js
```

Puis rafraîchissez la page admin.

## 4. Ce que vous devriez voir

### Avant (templates génériques) :
- Titre : "Votre expert artisan"
- Services : "Service 1", "Service 2", "Service 3"
- Contenu : Lorem ipsum générique

### Après (templates personnalisés) :
- **Titre** : "Plomberie Dupont & Fils - Votre Plombier Expert 24/7"
- **Services détaillés** :
  - "Dépannage Urgent - Fuite d'eau, canalisation bouchée (Dès 80€)"
  - "Installation Sanitaire - Salle de bain complète (Sur devis)"
  - "Chauffage & Chaudière - Installation, entretien (Dès 150€)"
- **Histoire unique** : "Fondée en 2006, Plomberie Dupont & Fils est devenue..."
- **FAQ métier** : "Intervenez-vous en urgence pour une fuite d'eau ?"
- **Témoignages réalistes** : "Fuite réparée en 30 minutes un dimanche..."

## 5. Vérifier la personnalisation

Dans l'interface admin, après l'analyse IA :

1. **Section "Analyse IA"** : Vous verrez le profil détaillé généré
2. **Onglets des 3 templates** : Chaque template aura :
   - Du contenu spécifique au plombier
   - Des services avec prix réels
   - Une histoire d'entreprise unique
   - Des témoignages mentionnant des services précis

3. **Bouton "Visualiser"** : La prévisualisation montrera :
   - Les textes personnalisés (pas de lorem ipsum)
   - Les services spécifiques avec icônes adaptées
   - Les sections métier (urgences 24/7 pour plombier)

## 6. Tester avec d'autres métiers

Créez un nouveau client avec un autre métier pour voir les différences :

```javascript
// Dans scripts/test-other-profession.js
const testData = {
  businessType: 'electricien', // ou 'menuisier', 'jardinier'
  businessName: 'Élec Pro Services',
  services: ['Mise aux normes', 'Domotique', 'Dépannage'],
  is24x7Available: false,
  hasGallery: true
};
```

## 7. Observer dans la console

Pendant l'analyse, regardez la console du serveur Next.js :
```
🤖 Analyse du profil client avec DeepSeek...
✅ Analyse terminée: { businessProfile: "Expert en plomberie...", ... }
🎯 Sélection des 3 meilleurs templates avec DeepSeek...
📝 Génération du contenu personnalisé...
```

## 💡 Points clés à vérifier

1. **Contenu unique** : Chaque template a un contenu différent et spécifique
2. **Cohérence métier** : Les services, prix et durées correspondent au métier
3. **Personnalisation profonde** : Histoire, valeurs, certifications adaptées
4. **Blocs spécialisés** : Sections spécifiques selon le type d'entreprise
5. **SEO local** : Mentions des villes et zones d'intervention

## 🐛 En cas de problème

1. **"Analyser avec IA" ne fait rien** : Vérifiez la clé DeepSeek dans `.env.local`
2. **Contenu générique** : L'IA peut avoir échoué, vérifiez la console
3. **Blocs manquants** : Rafraîchissez la page après l'analyse

## 📊 Exemple de résultat attendu

Pour un électricien, vous devriez voir :
- **Hero** : "Élec Pro Services - Électricien Certifié"
- **Services** : "Mise aux normes NF C 15-100", "Installation domotique", etc.
- **Sécurité** : Section dédiée avec certifications Consuel, Qualifelec
- **FAQ** : "Ma maison est-elle aux normes électriques ?"