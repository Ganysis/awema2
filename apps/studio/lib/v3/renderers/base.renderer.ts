/**
 * Base Renderer V3 - Classe abstraite pour tous les renderers V3
 */

import { z } from 'zod';
import { BlockRenderer, RenderResult, RenderContext } from '../types';
import { BlockProp, PropType, EditorControl } from '@awema/shared';

export abstract class BaseRendererV3<T> implements BlockRenderer<T> {
  abstract type: string;
  abstract version: string;
  
  abstract render(data: T, context?: RenderContext): RenderResult;
  abstract getDefaultCSS(): string;
  abstract getRequiredAssets(): any[];
  abstract validate(data: unknown): z.SafeParseReturnType<T, T>;
  abstract getDefaultData(): T;
  abstract renderPreview(data: T): string;
  
  /**
   * Méthode générique pour obtenir les props du bloc
   * Peut être surchargée par les renderers spécifiques
   */
  getBlockProps(): BlockProp[] {
    const defaultData = this.getDefaultData();
    const props: BlockProp[] = [];
    
    // Parcourir les propriétés des données par défaut
    Object.entries(defaultData as any).forEach(([key, value]) => {
      // Ignorer certaines clés système
      if (key === 'id' || key === 'type' || key === '_internal') return;
      
      const prop = this.createPropFromValue(key, value);
      if (prop) {
        props.push(prop);
      }
    });
    
    return props;
  }
  
  /**
   * Crée une BlockProp à partir d'une clé et d'une valeur
   */
  protected createPropFromValue(key: string, value: any): BlockProp | null {
    const { type, control } = this.inferPropType(key, value);
    
    const prop: BlockProp = {
      name: key,
      label: this.formatLabel(key),
      type,
      required: false,
      defaultValue: value,
      description: this.getPropertyDescription(key),
      editorConfig: {
        control: control || EditorControl.TEXT,
        group: this.getPropertyGroup(key),
        order: this.getPropertyOrder(key)
      }
    };
    
    // Ajouter les options pour les selects
    if (key === 'variant' && Array.isArray(value)) {
      prop.options = value;
      prop.editorConfig!.control = EditorControl.RADIO;
    } else if (type === PropType.SELECT) {
      prop.options = this.getSelectOptions(key);
    }
    
    // Pour les collections, définir le schema des items
    if (type === PropType.ARRAY && Array.isArray(value) && value.length > 0) {
      prop.itemSchema = this.getCollectionItemSchema(key, value[0]);
    }
    
    return prop;
  }
  
  /**
   * Infère le type de prop à partir de la clé et de la valeur
   */
  protected inferPropType(key: string, value: any): { type: PropType; control?: EditorControl } {
    // Variantes
    if (key === 'variant') {
      return { type: PropType.SELECT, control: EditorControl.RADIO };
    }
    
    // Images
    if (key.toLowerCase().includes('image') || 
        key.toLowerCase().includes('logo') || 
        key.toLowerCase().includes('avatar') ||
        key.toLowerCase().includes('icon')) {
      return { type: PropType.IMAGE, control: EditorControl.IMAGE_PICKER };
    }
    
    // Couleurs
    if (key.toLowerCase().includes('color') || 
        key.toLowerCase().includes('background')) {
      return { type: PropType.COLOR, control: EditorControl.COLOR_PICKER };
    }
    
    // URLs/Links
    if (key.toLowerCase().includes('url') || 
        key.toLowerCase().includes('link') ||
        key.toLowerCase().includes('href')) {
      return { type: PropType.LINK, control: EditorControl.TEXT };
    }
    
    // Nombres
    if (typeof value === 'number') {
      return { type: PropType.NUMBER, control: EditorControl.NUMBER };
    }
    
    // Booléens
    if (typeof value === 'boolean') {
      return { type: PropType.BOOLEAN, control: EditorControl.TOGGLE };
    }
    
    // Arrays
    if (Array.isArray(value)) {
      return { type: PropType.ARRAY, control: EditorControl.COLLECTION };
    }
    
    // Objects
    if (typeof value === 'object' && value !== null) {
      return { type: PropType.OBJECT, control: EditorControl.COLLECTION };
    }
    
    // Texte long
    if (key.toLowerCase().includes('description') || 
        key.toLowerCase().includes('content') ||
        key.toLowerCase().includes('text')) {
      return { type: PropType.STRING, control: EditorControl.TEXTAREA };
    }
    
    // Par défaut : string
    return { type: PropType.STRING, control: EditorControl.TEXT };
  }
  
  /**
   * Formate le label à partir du nom de la propriété
   */
  protected formatLabel(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
  
  /**
   * Obtient la description d'une propriété
   * À surcharger dans les renderers spécifiques
   */
  protected getPropertyDescription(key: string): string {
    const descriptions: Record<string, string> = {
      title: 'Titre principal du bloc',
      subtitle: 'Sous-titre ou texte secondaire',
      description: 'Description détaillée',
      variant: 'Style visuel du bloc',
      backgroundImage: 'Image de fond du bloc',
      buttons: 'Boutons d\'action',
      primaryColor: 'Couleur principale',
      secondaryColor: 'Couleur secondaire'
    };
    
    return descriptions[key] || '';
  }
  
  /**
   * Obtient le groupe d'une propriété pour l'organisation dans l'éditeur
   */
  protected getPropertyGroup(key: string): string {
    const groups: Record<string, string[]> = {
      'Contenu': ['title', 'subtitle', 'description', 'content', 'text', 'label'],
      'Visuel': ['variant', 'image', 'images', 'logo', 'avatar', 'background', 'icon', 'backgroundImage'],
      'Style': ['color', 'backgroundColor', 'primaryColor', 'secondaryColor', 'textColor'],
      'Actions': ['buttons', 'links', 'cta', 'form', 'href', 'url'],
      'Configuration': ['showTitle', 'showDescription', 'enabled', 'visible', 'autoplay'],
      'Données': ['items', 'features', 'services', 'testimonials', 'questions', 'plans', 'cards']
    };
    
    for (const [group, keys] of Object.entries(groups)) {
      if (keys.some(k => key.toLowerCase().includes(k.toLowerCase()))) {
        return group;
      }
    }
    
    return 'Général';
  }
  
  /**
   * Obtient l'ordre d'une propriété dans son groupe
   */
  protected getPropertyOrder(key: string): number {
    const orders: Record<string, number> = {
      variant: 1,
      title: 2,
      subtitle: 3,
      description: 4,
      backgroundImage: 5,
      buttons: 10
    };
    
    return orders[key] || 50;
  }
  
  /**
   * Obtient les options pour un champ select
   * À surcharger dans les renderers spécifiques
   */
  protected getSelectOptions(key: string): string[] {
    return [];
  }
  
  /**
   * Obtient le schema des items d'une collection
   */
  protected getCollectionItemSchema(key: string, sampleItem: any): BlockProp[] {
    if (!sampleItem || typeof sampleItem !== 'object') {
      return [];
    }
    
    const schema: BlockProp[] = [];
    
    Object.entries(sampleItem).forEach(([itemKey, itemValue]) => {
      const prop = this.createPropFromValue(itemKey, itemValue);
      if (prop) {
        schema.push(prop);
      }
    });
    
    return schema;
  }
}