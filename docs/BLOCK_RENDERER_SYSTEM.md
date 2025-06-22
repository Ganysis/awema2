# Système de Rendu des Blocs AWEMA Studio

## Vue d'ensemble

Le système de rendu des blocs dans AWEMA Studio permet de transformer les définitions de blocs en HTML/CSS/JS rendu. Il est essentiel que les IDs des blocs soient cohérents à travers tout le système pour éviter l'erreur "No renderer found for block".

## Script d'Auto-Enregistrement

Un script automatique `packages/templates/scripts/auto-register-blocks.js` facilite l'ajout de nouveaux blocs :

```bash
cd packages/templates
node scripts/auto-register-blocks.js
npm run build
# Redémarrer le serveur de dev
```

### Ce que fait le script :
- ✅ Détecte automatiquement les nouveaux blocs
- ✅ Extrait l'ID réel depuis le fichier source
- ✅ Génère tous les imports/exports nécessaires
- ✅ Met à jour TemplateComposer et block-registry
- ✅ Supporte toutes les catégories y compris `layout`

### Ce que vous devez faire :
1. Créer le bloc avec la structure correcte (voir exemples ci-dessous)
2. Lancer le script
3. Build et redémarrer

### ⚠️ Points d'attention

#### Apostrophes dans les descriptions
Le script gère correctement les apostrophes échappées dans les descriptions. Utilisez `\'` pour les apostrophes :
```typescript
description: 'Section d\'appel à l\'action'  // ✅ Correct
description: "Section d'appel à l'action"    // ✅ Correct aussi
```

#### Éviter les imports dupliqués
Si le script génère des imports en double dans TemplateComposer.ts :
1. Arrêtez le serveur de développement
2. Corrigez manuellement les doublons
3. Relancez le script
4. Le script a été mis à jour pour éviter ce problème

#### Vérification après exécution
Après avoir lancé le script, vérifiez toujours :
- Pas d'imports en double dans TemplateComposer.ts
- Pas d'erreurs TypeScript dans la console
- Le preview fonctionne pour tous les blocs

## Architecture

### 1. Définition des blocs (`packages/templates/src/blocks/`)

Chaque bloc est défini avec :
- Un **ID unique complet** (ex: `hero-centered`, `services-grid-cards`)
- Une catégorie
- Des propriétés par défaut
- Des variantes de style

```typescript
export const heroCentered: Block = {
  id: 'hero-centered',  // ID complet, pas juste 'centered'
  name: 'Hero Centered',
  category: 'hero',
  // ...
};
```

### 2. Fonction de rendu (`render*`)

Chaque bloc a une fonction de rendu correspondante qui génère le HTML/CSS/JS :

```typescript
export function renderHeroCentered(props: HeroProps): RenderedBlock {
  return {
    html: `...`,
    css: `...`,
    js: `...`
  };
}
```

### 3. Exports centralisés (`packages/templates/src/index.ts`)

Tous les blocs et leurs renderers doivent être exportés :

```typescript
export { heroCentered, renderHeroCentered } from './blocks/hero/centered';
```

### 4. Registration dans TemplateComposer

Le TemplateComposer enregistre les blocs avec leur **ID complet** :

```typescript
private registerBlocks() {
  this.blocks.set('hero-centered', heroCentered);  // Utiliser l'ID complet
  this.blocks.set('hero-split-screen', heroSplitScreen);
  // ...
}
```

### 5. Mapping des renderers (`apps/studio/lib/blocks/block-registry.ts`)

Le registre mappe les IDs de blocs aux fonctions de rendu :

```typescript
const blockRenderers: Record<string, BlockRenderer> = {
  'hero-centered': renderHeroCentered,  // ID complet, pas 'centered'
  'hero-split-screen': renderHeroSplitScreen,
  // ...
};
```

## Points critiques pour éviter les erreurs

### 1. Cohérence des IDs

**❌ INCORRECT :**
```typescript
// Définition du bloc
export const heroCentered: Block = {
  id: 'hero-centered',
  // ...
};

// Dans TemplateComposer
this.blocks.set('centered', heroCentered);  // ID court

// Dans block-registry
'centered': renderHeroCentered,  // ID court
```

**✅ CORRECT :**
```typescript
// Définition du bloc
export const heroCentered: Block = {
  id: 'hero-centered',
  // ...
};

// Dans TemplateComposer
this.blocks.set('hero-centered', heroCentered);  // ID complet

// Dans block-registry
'hero-centered': renderHeroCentered,  // ID complet
```

### 2. Convention de nommage

Les IDs de blocs suivent le format : `[catégorie]-[nom]`

- `hero-centered`, `hero-split-screen`
- `services-grid-cards`, `services-list-detailed`
- `testimonials-carousel`
- `features-icon-grid`
- `gallery-masonry`
- `faq-ultra-modern`
- `pricing-tables`
- `cta-section`
- `contact-form-map`

### 3. Ajout d'un nouveau bloc

Pour ajouter un nouveau bloc :

1. **Créer le fichier du bloc** dans `packages/templates/src/blocks/[catégorie]/[nom].ts`
2. **Définir le bloc** avec un ID complet : `[catégorie]-[nom]`
3. **Créer la fonction de rendu** : `render[NomPascalCase]`
4. **Exporter** dans `packages/templates/src/index.ts`
5. **Enregistrer** dans `TemplateComposer.registerBlocks()` avec l'ID complet
6. **Mapper le renderer** dans `block-registry.ts` avec l'ID complet

### 4. Débogage

Si vous rencontrez l'erreur "No renderer found for block: [id]" :

1. Vérifiez que l'ID du bloc dans sa définition correspond exactement
2. Vérifiez que le bloc est enregistré dans TemplateComposer avec le bon ID
3. Vérifiez que le renderer est mappé dans block-registry.ts avec le bon ID
4. Vérifiez que le bloc et son renderer sont exportés dans index.ts

## Flux de rendu

1. **CollectionEditor** récupère les blocs depuis `page.blocks`
2. **BlockItem** demande le rendu via `getBlockRenderer(block.id)`
3. **block-registry** cherche la fonction de rendu pour cet ID
4. La fonction de rendu génère le HTML/CSS/JS
5. Le preview affiche le résultat

## Exemple complet

```typescript
// 1. Définition (packages/templates/src/blocks/hero/awesome.ts)
export const heroAwesome: Block = {
  id: 'hero-awesome',
  name: 'Hero Awesome',
  category: 'hero',
  props: { title: 'Welcome' }
};

export function renderHeroAwesome(props: HeroProps): RenderedBlock {
  return {
    html: `<section class="hero-awesome"><h1>${props.title}</h1></section>`,
    css: `.hero-awesome { padding: 4rem; }`,
    js: ''
  };
}

// 2. Export (packages/templates/src/index.ts)
export { heroAwesome, renderHeroAwesome } from './blocks/hero/awesome';

// 3. Registration (packages/templates/src/TemplateComposer.ts)
this.blocks.set('hero-awesome', heroAwesome);

// 4. Mapping (apps/studio/lib/blocks/block-registry.ts)
import { renderHeroAwesome } from '@awema/templates';
const blockRenderers = {
  'hero-awesome': renderHeroAwesome,
  // ...
};
```

En suivant ces conventions, le système de rendu fonctionnera correctement sans erreurs.

## Gestion des Couleurs et Données Globales

### Flux des données du formulaire vers les blocs

1. **Collecte des données** (`apps/studio/app/dashboard/new/page.tsx`)
   - Formulaire 8 étapes collecte :
     - Informations entreprise (nom, type, slogan)
     - Couleurs (primaryColor, secondaryColor, accentColor)
     - Typographie, services, photos, etc.

2. **Génération du site** (`apps/studio/lib/services/site-generator.ts`)
   - `generateSiteFromClient()` crée les blocs avec les props spécifiques
   - `generateTheme()` crée l'objet theme avec couleurs et typographie
   - Chaque bloc reçoit ses props directement

3. **Preview** (`apps/studio/lib/services/preview-generator.ts`)
   - Génère les variables CSS depuis les couleurs du thème
   - Les couleurs sont appliquées via CSS variables :
     ```css
     --color-primary: #couleur_choisie;
     --color-secondary: #couleur_choisie;
     --color-accent: #couleur_choisie;
     ```

4. **Rendu des blocs**
   - Les blocs utilisent les variables CSS : `bg-primary-600`, `text-primary-700`
   - Les données business sont passées en props : `props.businessName`, `props.phone`

### Exemple d'utilisation dans un bloc

```typescript
export function renderMonBloc(props: BlockProps): RenderedBlock {
  return {
    html: `
      <section class="bg-primary-50">
        <h2 class="text-primary-900">${props.title || 'Titre par défaut'}</h2>
        <p>Appelez-nous au ${props.phone}</p>
      </section>
    `,
    css: `
      /* Les couleurs utilisent les variables CSS globales */
      .mon-bloc {
        background: var(--color-primary-50);
        color: var(--color-primary-900);
      }
    `,
    js: ''
  };
}
```

### Limitation actuelle

Les fonctions de rendu ne reçoivent pas directement l'objet theme. Les couleurs sont appliquées uniquement via les variables CSS et les classes Tailwind qui les utilisent. Pour une personnalisation plus poussée, il faudrait passer le theme comme paramètre additionnel aux fonctions de rendu.

## Catégories disponibles

Les catégories suivantes sont supportées par le script :
- `hero` - Sections d'en-tête principales
- `header` - En-têtes de navigation
- `services` - Présentation des services
- `contact` - Formulaires et infos de contact
- `testimonials` - Témoignages clients
- `footer` - Pieds de page
- `content` - Contenu général (texte/image)
- `features` - Points forts et avantages
- `gallery` - Galeries photos
- `faq` - Questions fréquentes
- `pricing` - Tableaux de tarifs
- `cta` - Appels à l'action
- `layout` - Éléments de mise en page (header/footer)