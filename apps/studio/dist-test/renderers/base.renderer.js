"use strict";
/**
 * Base Renderer V3 - Classe abstraite pour tous les renderers V3
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRendererV3 = void 0;
const shared_1 = require("@awema/shared");
class BaseRendererV3 {
    /**
     * Méthode générique pour obtenir les props du bloc
     * Peut être surchargée par les renderers spécifiques
     */
    getBlockProps() {
        const defaultData = this.getDefaultData();
        const props = [];
        // Parcourir les propriétés des données par défaut
        Object.entries(defaultData).forEach(([key, value]) => {
            // Ignorer certaines clés système
            if (key === 'id' || key === 'type' || key === '_internal')
                return;
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
    createPropFromValue(key, value) {
        const { type, control } = this.inferPropType(key, value);
        const prop = {
            name: key,
            label: this.formatLabel(key),
            type,
            required: false,
            defaultValue: value,
            description: this.getPropertyDescription(key),
            editorConfig: {
                control: control || shared_1.EditorControl.TEXT,
                group: this.getPropertyGroup(key),
                order: this.getPropertyOrder(key)
            }
        };
        // Ajouter les options pour les selects
        if (key === 'variant' && Array.isArray(value)) {
            prop.options = value;
            prop.editorConfig.control = shared_1.EditorControl.RADIO;
        }
        else if (type === shared_1.PropType.SELECT) {
            prop.options = this.getSelectOptions(key);
        }
        // Pour les collections, définir le schema des items
        if (type === shared_1.PropType.ARRAY && Array.isArray(value) && value.length > 0) {
            prop.itemSchema = this.getCollectionItemSchema(key, value[0]);
        }
        return prop;
    }
    /**
     * Infère le type de prop à partir de la clé et de la valeur
     */
    inferPropType(key, value) {
        // Variantes
        if (key === 'variant') {
            return { type: shared_1.PropType.SELECT, control: shared_1.EditorControl.RADIO };
        }
        // Images
        if (key.toLowerCase().includes('image') ||
            key.toLowerCase().includes('logo') ||
            key.toLowerCase().includes('avatar') ||
            key.toLowerCase().includes('icon')) {
            return { type: shared_1.PropType.IMAGE, control: shared_1.EditorControl.IMAGE_PICKER };
        }
        // Couleurs
        if (key.toLowerCase().includes('color') ||
            key.toLowerCase().includes('background')) {
            return { type: shared_1.PropType.COLOR, control: shared_1.EditorControl.COLOR_PICKER };
        }
        // URLs/Links
        if (key.toLowerCase().includes('url') ||
            key.toLowerCase().includes('link') ||
            key.toLowerCase().includes('href')) {
            return { type: shared_1.PropType.LINK, control: shared_1.EditorControl.TEXT };
        }
        // Nombres
        if (typeof value === 'number') {
            return { type: shared_1.PropType.NUMBER, control: shared_1.EditorControl.NUMBER };
        }
        // Booléens
        if (typeof value === 'boolean') {
            return { type: shared_1.PropType.BOOLEAN, control: shared_1.EditorControl.TOGGLE };
        }
        // Arrays
        if (Array.isArray(value)) {
            return { type: shared_1.PropType.ARRAY, control: shared_1.EditorControl.COLLECTION };
        }
        // Objects
        if (typeof value === 'object' && value !== null) {
            return { type: shared_1.PropType.OBJECT, control: shared_1.EditorControl.COLLECTION };
        }
        // Texte long
        if (key.toLowerCase().includes('description') ||
            key.toLowerCase().includes('content') ||
            key.toLowerCase().includes('text')) {
            return { type: shared_1.PropType.STRING, control: shared_1.EditorControl.TEXTAREA };
        }
        // Par défaut : string
        return { type: shared_1.PropType.STRING, control: shared_1.EditorControl.TEXT };
    }
    /**
     * Formate le label à partir du nom de la propriété
     */
    formatLabel(key) {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }
    /**
     * Obtient la description d'une propriété
     * À surcharger dans les renderers spécifiques
     */
    getPropertyDescription(key) {
        const descriptions = {
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
    getPropertyGroup(key) {
        const groups = {
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
    getPropertyOrder(key) {
        const orders = {
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
    getSelectOptions(key) {
        return [];
    }
    /**
     * Obtient le schema des items d'une collection
     */
    getCollectionItemSchema(key, sampleItem) {
        if (!sampleItem || typeof sampleItem !== 'object') {
            return [];
        }
        const schema = [];
        Object.entries(sampleItem).forEach(([itemKey, itemValue]) => {
            const prop = this.createPropFromValue(itemKey, itemValue);
            if (prop) {
                schema.push(prop);
            }
        });
        return schema;
    }
}
exports.BaseRendererV3 = BaseRendererV3;
