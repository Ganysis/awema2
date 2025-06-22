# Guide d'intégration de nouveaux blocs dans AWEMA Studio

Ce guide explique comment ajouter de nouveaux blocs dans AWEMA Studio. Les blocs sont les composants réutilisables qui constituent les pages web générées.

## 📋 Vue d'ensemble

Pour ajouter un nouveau bloc, vous devez modifier **6 fichiers** et suivre **7 étapes** :

1. Créer le fichier du bloc
2. Exporter depuis l'index de la catégorie
3. Importer et enregistrer dans TemplateComposer
4. Exporter depuis l'index principal
5. **Enregistrer le bloc dans le studio** (étape cruciale !)
6. Compiler le package
7. Redémarrer le serveur

## 📁 Structure des fichiers

```
packages/templates/src/
├── blocks/
│   ├── [category]/
│   │   ├── index.ts          # Export des blocs de la catégorie
│   │   └── mon-bloc.ts       # Définition du bloc
│   ├── TemplateComposer.ts   # Enregistrement des blocs
│   └── index.ts              # Export principal

apps/studio/
└── lib/
    └── blocks/
        └── block-registry.ts # Registre des blocs du studio ⚠️
```

## 🚀 Étapes détaillées

### 1. Créer le fichier du bloc

Créez un nouveau fichier dans le dossier approprié :
`packages/templates/src/blocks/[category]/[nom-du-bloc].ts`

```typescript
import { 
  Block, 
  BlockCategory, 
  PropType, 
  EditorControl, 
  PerformanceImpact, 
  RenderedBlock 
} from '@awema/shared';

/**
 * Définition du bloc
 */
export const monNouveauBloc: Block = {
  id: 'mon-nouveau-bloc',
  name: 'Mon Nouveau Bloc',
  description: 'Description détaillée du bloc',
  category: BlockCategory.CONTENT, // FAQ, HERO, GALLERY, etc.
  tags: ['tag1', 'tag2', 'responsive'],
  thumbnail: '/blocks/mon-bloc.jpg',
  performanceImpact: PerformanceImpact.LOW,
  variants: [], // Obligatoire, même si vide
  
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      required: true,
      defaultValue: 'Mon titre',
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 1
      }
    },
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Style de mise en page',
      required: true,
      defaultValue: 'modern',
      validation: {
        options: [
          { label: 'Moderne', value: 'modern' },
          { label: 'Classique', value: 'classic' },
          { label: 'Minimaliste', value: 'minimal' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 2
      }
    },
    {
      name: 'showButton',
      type: PropType.BOOLEAN,
      description: 'Afficher le bouton CTA',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 3
      }
    }
  ],
  
  defaultProps: {
    title: 'Mon titre',
    layout: 'modern',
    showButton: true
  }
};

/**
 * Fonction de rendu du bloc
 */
export function renderMonNouveauBloc(props: Record<string, any>): RenderedBlock {
  const { title, layout, showButton } = props;
  
  const html = `
    <section class="mon-bloc mon-bloc--${layout}">
      <div class="container">
        <h2>${title}</h2>
        ${showButton ? `
          <button class="mon-bloc__button">
            En savoir plus
          </button>
        ` : ''}
      </div>
    </section>
  `;
  
  const css = `
    .mon-bloc {
      padding: 60px 0;
    }
    
    .mon-bloc--modern {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    .mon-bloc--classic {
      background: #f7fafc;
      color: #2d3748;
    }
    
    .mon-bloc--minimal {
      background: white;
      color: #1a202c;
    }
    
    .mon-bloc__button {
      margin-top: 20px;
      padding: 12px 24px;
      background: #3182ce;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: background 0.3s;
    }
    
    .mon-bloc__button:hover {
      background: #2c5282;
    }
  `;
  
  const js = `
    document.querySelectorAll('.mon-bloc__button').forEach(button => {
      button.addEventListener('click', function() {
        console.log('Button clicked!');
      });
    });
  `;
  
  // CSS critique pour le chargement initial
  const criticalCSS = `
    .mon-bloc {
      padding: 60px 0;
    }
  `;
  
  return {
    html,
    css,
    js,
    criticalCSS,
    dependencies: [] // Librairies externes si nécessaire
  };
}
```

### 2. Exporter depuis l'index de la catégorie

Modifiez le fichier `packages/templates/src/blocks/[category]/index.ts` :

```typescript
// Ajoutez cette ligne
export { monNouveauBloc, renderMonNouveauBloc } from './mon-nouveau-bloc';
```

### 3. Importer et enregistrer dans TemplateComposer

Modifiez `packages/templates/src/TemplateComposer.ts` :

#### Ajouter l'import (lignes ~10-30)
```typescript
import { monNouveauBloc, renderMonNouveauBloc } from './blocks/[category]/mon-nouveau-bloc';
```

#### Enregistrer le bloc (dans la méthode `registerBlocks()`, lignes ~60-130)
```typescript
// Ajoutez ces deux lignes dans la section appropriée
this.blocks.set('mon-nouveau-bloc', monNouveauBloc);
this.renderers.set('mon-nouveau-bloc', renderMonNouveauBloc);
```

### 4. Exporter depuis l'index principal

Modifiez `packages/templates/src/index.ts` :

```typescript
// Ajoutez cette ligne dans la section des exports de blocs
export { monNouveauBloc, renderMonNouveauBloc } from './blocks/[category]/mon-nouveau-bloc';
```

### 5. Enregistrer le bloc dans le studio (CRUCIAL !)

**⚠️ ÉTAPE CRITIQUE : Sans cette étape, votre bloc n'apparaîtra PAS dans l'interface !**

Modifiez `/apps/studio/lib/blocks/block-registry.ts` :

#### Ajouter les imports (au début du fichier)
```typescript
// Ajoutez vos imports avec les autres imports de blocs
import {
  monNouveauBloc,
  renderMonNouveauBloc,
} from '@awema/templates';
```

#### Ajouter au registry (dans le tableau `blockRegistry`)
```typescript
// Ajoutez votre bloc dans la section appropriée
{
  block: monNouveauBloc,
  category: BlockCategory.CONTENT, // Même catégorie que dans votre bloc
  name: 'Mon Nouveau Bloc',
  description: 'Description détaillée du bloc',
},
```

#### Ajouter la fonction de rendu (dans l'objet `renderFunctions`)
```typescript
// Ajoutez la fonction de rendu avec l'ID exact de votre bloc
'mon-nouveau-bloc': renderMonNouveauBloc,
```

### 6. Compiler le package

**⚠️ IMPORTANT : Cette étape est OBLIGATOIRE**

Le projet utilise un script de transpilation personnalisé qui convertit les fichiers TypeScript en CommonJS :

```bash
cd packages/templates
npm run build
```

Ce script :
- Supprime le dossier `dist/` existant
- Transpile tous les fichiers `.ts` et `.js` de `src/` vers `dist/` en format CommonJS
- Crée automatiquement `index.d.ts` pour les types

**Note importante :** La compilation doit générer des fichiers CommonJS (pas ESM) pour être compatible avec Next.js. Si vous voyez des erreurs comme "No renderer found for block", vérifiez que les fichiers dans `dist/` utilisent bien `exports.` et non `export`.

**Vérification :** Après la compilation, vérifiez que votre bloc est bien présent :
```bash
# Vérifier que le fichier existe
ls dist/blocks/[category]/[nom-du-bloc].js

# Vérifier les exports
grep "exports.monNouveauBloc" dist/blocks/[category]/[nom-du-bloc].js
```

### 7. Redémarrer le serveur de développement

```bash
# IMPORTANT : Nettoyer le cache Next.js avant de redémarrer
cd apps/studio
rm -rf .next
npm run dev
```

**Note crucial :** Si vous voyez des erreurs d'import comme "Attempted import error: 'monNouveauBloc' is not exported", c'est souvent dû au cache de Next.js. Supprimez TOUJOURS le dossier `.next` avant de redémarrer.

**Configuration Next.js :** Si l'erreur persiste, vérifiez que `@awema/templates` n'est PAS dans `optimizePackageImports` dans `next.config.js`. Cette optimisation peut causer des problèmes avec les exports dynamiques.

## 📝 Structure des types

### Structure d'un Block

```typescript
interface Block {
  id: string;                        // Identifiant unique
  name: string;                      // Nom affiché dans l'interface
  description: string;               // Description du bloc
  category: BlockCategory;           // Catégorie du bloc
  tags: string[];                    // Tags pour la recherche
  thumbnail: string;                 // Chemin de l'image d'aperçu
  performanceImpact: PerformanceImpact;
  variants: BlockVariant[];          // Obligatoire (peut être vide)
  props: BlockProp[];               // Propriétés configurables
  defaultProps: Record<string, any>; // Valeurs par défaut
}
```

### Structure d'une BlockProp

```typescript
interface BlockProp {
  name: string;                      // Nom de la propriété
  type: PropType;                    // Type de donnée
  description: string;               // Description
  required: boolean;                 // Obligatoire ou non
  defaultValue?: any;                // Valeur par défaut
  validation?: {                     // Règles de validation
    options?: Array<{                // Pour les SELECT
      label: string;
      value: string;
    }>;
    min?: number;                    // Valeur minimale
    max?: number;                    // Valeur maximale
    pattern?: string;                // Expression régulière
  };
  editorConfig?: {                   // Configuration de l'éditeur
    control: EditorControl;          // Type de contrôle
    group?: string;                  // Groupe dans l'interface
    order?: number;                  // Ordre d'affichage
    helpText?: string;               // Texte d'aide
    placeholder?: string;            // Placeholder
  };
}
```

### Types disponibles

#### BlockCategory
- `HERO` - Sections héros
- `HEADER` - En-têtes
- `CONTENT` - Contenu
- `FEATURES` - Fonctionnalités
- `GALLERY` - Galeries
- `FAQ` - Questions fréquentes
- `PRICING` - Tarifs
- `TESTIMONIALS` - Témoignages
- `CONTACT` - Contact
- `FOOTER` - Pieds de page
- `CTA` - Appels à l'action

#### PropType
- `STRING` - Texte
- `NUMBER` - Nombre
- `BOOLEAN` - Booléen
- `COLOR` - Couleur
- `IMAGE` - Image
- `LINK` - Lien
- `ARRAY` - Tableau
- `OBJECT` - Objet

#### EditorControl
- `TEXT` - Champ texte
- `TEXTAREA` - Zone de texte
- `NUMBER` - Champ numérique
- `TOGGLE` - Interrupteur
- `SELECT` - Liste déroulante
- `COLOR_PICKER` - Sélecteur de couleur
- `IMAGE_PICKER` - Sélecteur d'image
- `LINK_PICKER` - Sélecteur de lien

#### PerformanceImpact
- `LOW` - Impact faible
- `MEDIUM` - Impact moyen
- `HIGH` - Impact élevé

## ✅ Checklist

- [ ] Fichier du bloc créé dans le bon dossier
- [ ] Export ajouté dans l'index de la catégorie
- [ ] Import et enregistrement dans TemplateComposer
- [ ] Export ajouté dans l'index principal
- [ ] **Bloc enregistré dans block-registry.ts du studio**
- [ ] Package compilé avec succès
- [ ] Serveur redémarré
- [ ] Bloc visible dans l'interface

## 🐛 Dépannage

### Le bloc n'apparaît pas dans l'interface

1. **Vérifiez que le bloc est enregistré dans `/apps/studio/lib/blocks/block-registry.ts`** (étape souvent oubliée !)
2. Vérifiez que tous les exports sont corrects dans `dist/index.js`
3. Assurez-vous que le build s'est terminé sans erreur
4. Supprimez le cache Next.js : `rm -rf apps/studio/.next`
5. Vérifiez la console du navigateur pour les erreurs

### Erreur "No renderer found for block: xxx"

Cette erreur signifie que la fonction de rendu n'est pas trouvée. Causes possibles :

1. **Format de module incorrect** : Vérifiez que les fichiers dans `dist/` sont en CommonJS (`exports.xxx`) et non en ESM (`export xxx`)
2. **Fonction non enregistrée** : Vérifiez que la fonction est bien dans `renderFunctions` dans `block-registry.ts`
3. **Cache** : Supprimez `.next` et redémarrez

### Erreur "Attempted import error: 'xxx' is not exported"

1. **Optimisation barrel** : Vérifiez que `@awema/templates` n'est PAS dans `optimizePackageImports` dans `next.config.js`
2. **Export manquant** : Vérifiez que l'export est présent dans `dist/index.js`
3. **Compilation** : Recompilez avec `npm run build` dans `packages/templates`

### Erreur TypeScript lors du build

1. Vérifiez que la propriété `variants: []` est présente
2. Vérifiez que toutes les propriétés ont `required: boolean`
3. Assurez-vous que tous les imports sont corrects

### Le SELECT apparaît comme un champ texte

1. Vérifiez que `validation.options` est bien défini
2. Redémarrez le serveur de développement

## 💡 Bonnes pratiques

1. **Nommage** : Utilisez des noms descriptifs et cohérents
2. **Performance** : Minimisez le CSS/JS critique
3. **Accessibilité** : Utilisez des balises sémantiques
4. **Responsive** : Testez sur différentes tailles d'écran
5. **Documentation** : Commentez votre code
6. **Validation** : Définissez des règles de validation appropriées
7. **Compilation** : Utilisez toujours CommonJS pour la compatibilité Next.js
8. **Tests** : Testez toujours après compilation en vérifiant :
   - Le bloc apparaît dans la liste
   - Le bloc se rend sans erreur
   - Les propriétés sont éditables
   - L'aperçu fonctionne

## 📚 Exemples

Pour des exemples complets, consultez les blocs existants :
- FAQ : `/packages/templates/src/blocks/faq/`
- Hero : `/packages/templates/src/blocks/hero/`
- Features : `/packages/templates/src/blocks/features/`

## ⚡ Résumé rapide des commandes

```bash
# 1. Créer le fichier du bloc
touch packages/templates/src/blocks/[category]/mon-nouveau-bloc.ts

# 2-4. Ajouter les exports (voir les étapes détaillées)

# 5. Enregistrer dans le studio
# Éditer: apps/studio/lib/blocks/block-registry.ts

# 6. Compiler
cd packages/templates
npm run build

# 7. Nettoyer et redémarrer
cd ../../apps/studio
rm -rf .next
npm run dev
```

---

*Dernière mise à jour : Juin 2025*