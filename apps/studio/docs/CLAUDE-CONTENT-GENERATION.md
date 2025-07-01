# Guide : Génération de Contenu avec Claude AI

## 🚀 Vue d'ensemble

AWEMA Studio intègre maintenant Claude AI pour générer du contenu SEO optimisé directement dans l'éditeur. Cette fonctionnalité permet de créer rapidement du contenu de qualité pour vos pages.

## 🔧 Configuration

### 1. Obtenir une clé API Claude

1. Créez un compte sur [console.anthropic.com](https://console.anthropic.com)
2. Générez une clé API
3. Copiez la clé (format : `sk-ant-api03-...`)

### 2. Configurer la clé dans AWEMA Studio

**Option A : Variable d'environnement (Recommandé)**
```bash
# Dans le fichier .env
ANTHROPIC_API_KEY="sk-ant-api03-votre-cle-ici"
```

**Option B : Directement dans l'interface**
- Lors de la première utilisation, une popup vous demandera la clé
- La clé sera utilisée uniquement pour votre session

## 📝 Utilisation dans l'éditeur

### 1. Accéder au générateur

1. Allez dans l'onglet **SEO** de l'éditeur
2. Sélectionnez une page à optimiser
3. Cliquez sur l'onglet **"Générateur IA"** (avec l'icône ✨)

### 2. Types de contenu disponibles

#### **Page complète**
- Génère une page entière avec intro, sections et conclusion
- Idéal pour créer rapidement une nouvelle page
- Structure SEO optimisée avec H1, H2, etc.

#### **Section**
- Génère un paragraphe ou une section spécifique
- Parfait pour enrichir une page existante
- 150-200 mots ciblés

#### **Meta SEO**
- Génère titre et meta description optimisés
- Respecte les limites de caractères (60/160)
- Intègre automatiquement les mots-clés

#### **FAQ**
- Génère 6-8 questions-réponses pertinentes
- Format optimisé pour le schema FAQ
- Questions basées sur le service/produit

### 3. Options de génération

**Ton du contenu :**
- **Professionnel** : Formel, expertise mise en avant
- **Amical** : Accessible, proche du client
- **Technique** : Détaillé, pour un public averti
- **Décontracté** : Conversationnel, moderne

**Mots-clés :**
- Ajoutez vos mots-clés cibles séparés par des virgules
- Le système les intégrera naturellement dans le contenu
- Densité optimale de 1-3%

### 4. Processus de génération

1. **Sélectionnez** le type de contenu
2. **Choisissez** le ton approprié
3. **Décrivez** ce que vous voulez générer
4. **Ajoutez** vos mots-clés (optionnel)
5. **Cliquez** sur "Générer le contenu"
6. **Prévisualisez** le résultat
7. **Utilisez** ou régénérez si nécessaire

## 💡 Exemples de prompts efficaces

### Pour une page de service :
```
"Page de services de plomberie avec focus sur les urgences et interventions 24/7"
```

### Pour une section :
```
"Paragraphe sur nos garanties et certifications en tant qu'électricien agréé"
```

### Pour des meta tags :
```
"Meta tags pour page d'accueil entreprise de jardinage à Lyon"
```

### Pour une FAQ :
```
"FAQ sur les tarifs et modalités d'intervention pour un serrurier"
```

## 🎯 Bonnes pratiques

1. **Soyez spécifique** dans vos descriptions
2. **Mentionnez la localisation** pour le SEO local
3. **Incluez les points différenciants** de l'entreprise
4. **Vérifiez et personnalisez** le contenu généré
5. **Testez différents tons** selon votre audience

## ⚡ Mode dégradé

Si Claude n'est pas disponible ou configuré :
- Le système utilise des **templates intelligents**
- Contenu de qualité basé sur les meilleures pratiques SEO
- Personnalisation selon le type de business
- Intégration automatique des informations de l'entreprise

## 📊 Limites et tarification

- **Modèle utilisé** : Claude 3 Haiku (rapide et économique)
- **Limite par génération** : 1000 tokens (~750 mots)
- **Coût estimé** : ~0.001€ par génération
- **Sans clé API** : Templates gratuits illimités

## 🔒 Sécurité

- Les clés API ne sont jamais stockées côté client
- Transmission sécurisée via HTTPS
- Aucun contenu n'est conservé par Claude
- Respect du RGPD

## 🐛 Dépannage

**"API Claude non configurée"**
→ Ajoutez votre clé API dans le champ prévu ou dans .env

**"Erreur de génération"**
→ Vérifiez votre connexion internet et la validité de la clé

**"Contenu trop court"**
→ Soyez plus descriptif dans votre prompt

**"Limite de tokens atteinte"**
→ Divisez votre demande en sections plus petites

## 🚀 Astuce Pro

Pour un meilleur SEO, générez d'abord les meta tags, puis le contenu de la page en mentionnant les mots-clés identifiés. Cela assure une cohérence parfaite entre les meta données et le contenu.