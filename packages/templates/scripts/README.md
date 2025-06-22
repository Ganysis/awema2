# Scripts pour la gestion des blocs

## update-blocks-imports.js

Ce script scanne automatiquement le dossier `src/blocks` et met à jour les imports dans les fichiers suivants :
- `src/TemplateComposer.ts` : Met à jour les imports et la méthode `registerBlocks()`
- `src/index.ts` : Met à jour les exports des blocs

### Utilisation

```bash
npm run update-blocks
```

### Ce que fait le script

1. **Scan des blocs** : Parcourt tous les sous-dossiers de `src/blocks` (sauf `layout`)
2. **Collecte des fichiers** : Trouve tous les fichiers TypeScript (sauf `.d.ts` et `index.ts`)
3. **Génération des noms** : Convertit les noms de fichiers kebab-case en camelCase
4. **Mise à jour automatique** :
   - Importe tous les blocs trouvés dans `TemplateComposer.ts`
   - Enregistre tous les blocs dans la méthode `registerBlocks()`
   - Exporte tous les blocs dans `index.ts`

### Quand l'utiliser

- Après avoir ajouté un nouveau bloc
- Après avoir renommé un bloc
- Après avoir supprimé un bloc
- Pour s'assurer que tous les blocs sont correctement importés

### Structure attendue des blocs

Chaque bloc doit suivre cette structure :
```typescript
// src/blocks/[category]/[block-name].ts
export const blockName: Block = {
  // Définition du bloc
};

export function renderBlockName(props: any, variants: string[]): RenderedBlock {
  // Fonction de rendu
}
```

### Exemple

Si vous ajoutez un nouveau fichier `src/blocks/hero/video-background.ts`, le script va :
1. Détecter le nouveau fichier
2. Ajouter l'import : `import { videoBackground, renderVideoBackground } from './blocks/hero/video-background';`
3. Enregistrer le bloc : 
   ```typescript
   this.blocks.set('video-background', videoBackground);
   this.renderers.set('video-background', renderVideoBackground);
   ```
4. Exporter le bloc : `export { videoBackground, renderVideoBackground } from './blocks/hero/video-background';`

### Notes

- Le script préserve l'ordre alphabétique par catégorie puis par nom de fichier
- Les blocs du dossier `layout` sont ignorés (header, footer)
- Après l'exécution, lancez `npm run build` pour compiler les changements