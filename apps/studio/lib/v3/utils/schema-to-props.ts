/**
 * Convertit un schema Zod V3 en format BlockProp pour l'éditeur
 */

import { BlockProp, PropType, EditorControl } from '@awema/shared';
import { z } from 'zod';

export function schemaToProps(schema: any, data: any): BlockProp[] {
  const props: BlockProp[] = [];

  // Helper pour déterminer le type de contrôle
  function getControlType(key: string, value: any): { type: PropType; control?: EditorControl } {
    // Variantes
    if (key === 'variant') {
      return { 
        type: PropType.SELECT,
        control: EditorControl.RADIO
      };
    }

    // Images
    if (key.toLowerCase().includes('image') || key.toLowerCase().includes('logo') || key.toLowerCase().includes('avatar')) {
      return { 
        type: PropType.IMAGE,
        control: EditorControl.IMAGE_PICKER
      };
    }

    // Couleurs
    if (key.toLowerCase().includes('color') || key.toLowerCase().includes('background')) {
      return { 
        type: PropType.COLOR,
        control: EditorControl.COLOR_PICKER
      };
    }

    // Nombres
    if (typeof value === 'number') {
      return { type: PropType.NUMBER };
    }

    // Booléens
    if (typeof value === 'boolean') {
      return { type: PropType.BOOLEAN };
    }

    // Arrays
    if (Array.isArray(value)) {
      return { 
        type: PropType.ARRAY,
        control: EditorControl.COLLECTION
      };
    }

    // Texte long
    if (key.toLowerCase().includes('description') || key.toLowerCase().includes('content')) {
      return { 
        type: PropType.STRING,
        control: EditorControl.TEXTAREA
      };
    }

    // Par défaut : string
    return { type: PropType.STRING };
  }

  // Convertir les propriétés principales
  Object.entries(data).forEach(([key, value]) => {
    // Ignorer certaines clés système
    if (key === 'id' || key === 'type') return;

    const { type, control } = getControlType(key, value);

    // Créer la prop de base
    const prop: BlockProp = {
      name: key,
      label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
      type,
      required: false,
      editorConfig: {
        control: control || EditorControl.TEXT,
        group: getGroupForKey(key)
      }
    };

    // Ajouter les options pour les selects
    if (key === 'variant' && Array.isArray(value)) {
      prop.options = value;
    }

    // Pour les collections, définir le schema des items
    if (type === PropType.ARRAY && Array.isArray(value) && value.length > 0) {
      const firstItem = value[0];
      if (typeof firstItem === 'object') {
        prop.itemSchema = Object.keys(firstItem).map(itemKey => ({
          name: itemKey,
          label: itemKey.charAt(0).toUpperCase() + itemKey.slice(1).replace(/([A-Z])/g, ' $1').trim(),
          type: typeof firstItem[itemKey] === 'string' ? PropType.STRING : PropType.STRING,
          required: false
        }));
      }
    }

    props.push(prop);
  });

  return props;
}

// Groupes par défaut
function getGroupForKey(key: string): string {
  const groups: Record<string, string[]> = {
    'Contenu': ['title', 'subtitle', 'description', 'content', 'text', 'label'],
    'Visuel': ['variant', 'image', 'images', 'logo', 'avatar', 'background', 'icon'],
    'Style': ['color', 'backgroundColor', 'primaryColor', 'secondaryColor', 'textColor'],
    'Actions': ['buttons', 'links', 'cta', 'form'],
    'Configuration': ['showTitle', 'showDescription', 'enabled', 'visible'],
    'Données': ['items', 'features', 'services', 'testimonials', 'questions', 'plans', 'cards']
  };

  for (const [group, keys] of Object.entries(groups)) {
    if (keys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
      return group;
    }
  }

  return 'Général';
}

// Helper pour obtenir les options d'une énumération Zod
export function getZodEnumOptions(zodEnum: z.ZodEnum<any>): string[] {
  return Object.values(zodEnum.enum);
}