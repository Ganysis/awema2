import { z } from 'zod';

// Schemas de validation
export const FormFieldConditionSchema = z.object({
  field: z.string(),
  operator: z.enum(['equals', 'contains', 'exists', 'greaterThan', 'lessThan', 'in', 'notIn', 'matches']),
  value: z.any(),
  weight: z.number().min(0).max(100).default(50)
});

export const TemplateActionSchema = z.object({
  type: z.enum(['addBlock', 'setVariant', 'setColor', 'setLayout', 'setContent', 'setPriority']),
  blockId: z.string().optional(),
  value: z.any(),
  position: z.number().optional(),
  priority: z.number().min(0).max(100).default(50)
});

export const TemplateRuleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  category: z.string(),
  conditions: z.array(FormFieldConditionSchema),
  actions: z.array(TemplateActionSchema),
  priority: z.number().default(50),
  tags: z.array(z.string()).default([])
});

// Types
export type FormFieldCondition = z.infer<typeof FormFieldConditionSchema>;
export type TemplateAction = z.infer<typeof TemplateActionSchema>;
export type TemplateRule = z.infer<typeof TemplateRuleSchema>;

// Interface pour les données du formulaire
export interface FormData {
  // Business Info
  businessName: string;
  businessType: string;
  yearEstablished?: number;
  numberOfEmployees?: number;
  
  // Services
  services: string[];
  hasUrgencyService: boolean;
  is24x7Available: boolean;
  serviceAreas: string[];
  specializations: string[];
  
  // Target & Goals
  targetAudience: string[];
  businessGoals: string[];
  uniqueSellingPoints: string[];
  
  // Features
  hasProcess: boolean;
  hasTestimonials: boolean;
  hasCertifications: boolean;
  hasGallery: boolean;
  hasPricing: boolean;
  
  // Style Preferences
  stylePreference: 'modern' | 'classic' | 'bold' | 'elegant' | 'minimal' | 'tech';
  colorPreference: 'vibrant' | 'muted' | 'monochrome' | 'gradient' | 'custom';
  layoutPreference: 'clean' | 'dense' | 'asymmetric' | 'centered';
  
  // Content
  contentTone: 'professional' | 'friendly' | 'urgent' | 'luxurious' | 'technical';
  hasExistingBranding: boolean;
  wantsAnimations: boolean;
  performancePriority: 'speed' | 'visuals' | 'balanced';
}

// Classe principale du moteur de règles
export class TemplateRulesEngine {
  private rules: Map<string, TemplateRule> = new Map();
  private blockCompatibility: Map<string, string[]> = new Map();
  
  constructor() {
    this.initializeDefaultRules();
    this.initializeBlockCompatibility();
  }

  // Évaluer toutes les règles pour un formulaire donné
  evaluateRules(formData: FormData): TemplateAction[] {
    const matchedActions: Array<TemplateAction & { score: number }> = [];
    
    // Parcourir toutes les règles
    for (const rule of this.rules.values()) {
      const score = this.evaluateRule(rule, formData);
      
      if (score > 0) {
        // Ajouter les actions avec leur score
        rule.actions.forEach(action => {
          matchedActions.push({
            ...action,
            score: score * (action.priority / 100)
          });
        });
      }
    }
    
    // Trier par score et retourner les actions
    return matchedActions
      .sort((a, b) => b.score - a.score)
      .map(({ score, ...action }) => action);
  }

  // Évaluer une règle unique
  private evaluateRule(rule: TemplateRule, formData: FormData): number {
    let totalScore = 0;
    let matchedConditions = 0;
    
    for (const condition of rule.conditions) {
      if (this.evaluateCondition(condition, formData)) {
        totalScore += condition.weight;
        matchedConditions++;
      }
    }
    
    // Retourner 0 si toutes les conditions ne sont pas remplies
    if (matchedConditions < rule.conditions.length) {
      return 0;
    }
    
    // Calculer le score final avec la priorité de la règle
    return (totalScore / rule.conditions.length) * (rule.priority / 100);
  }

  // Évaluer une condition
  private evaluateCondition(condition: FormFieldCondition, formData: FormData): boolean {
    const fieldValue = this.getFieldValue(condition.field, formData);
    
    switch (condition.operator) {
      case 'equals':
        return fieldValue === condition.value;
        
      case 'contains':
        if (Array.isArray(fieldValue)) {
          return fieldValue.includes(condition.value);
        }
        return String(fieldValue).includes(String(condition.value));
        
      case 'exists':
        return fieldValue !== undefined && fieldValue !== null && fieldValue !== '';
        
      case 'greaterThan':
        return Number(fieldValue) > Number(condition.value);
        
      case 'lessThan':
        return Number(fieldValue) < Number(condition.value);
        
      case 'in':
        return Array.isArray(condition.value) && condition.value.includes(fieldValue);
        
      case 'notIn':
        return Array.isArray(condition.value) && !condition.value.includes(fieldValue);
        
      case 'matches':
        return new RegExp(String(condition.value)).test(String(fieldValue));
        
      default:
        return false;
    }
  }

  // Obtenir la valeur d'un champ du formulaire
  private getFieldValue(fieldPath: string, formData: FormData): any {
    const parts = fieldPath.split('.');
    let value: any = formData;
    
    for (const part of parts) {
      value = value?.[part];
    }
    
    return value;
  }

  // Initialiser les règles par défaut
  private initializeDefaultRules() {
    // Règle : Service d'urgence
    this.addRule({
      id: 'urgency-service',
      name: 'Service Urgence 24/7',
      description: 'Ajoute des éléments d\'urgence si service 24/7',
      category: 'services',
      conditions: [
        { field: 'is24x7Available', operator: 'equals', value: true, weight: 100 }
      ],
      actions: [
        { type: 'addBlock', blockId: 'hero-v3-perfect', value: { variant: 'bold' }, position: 1, priority: 90 },
        { type: 'addBlock', blockId: 'cta-v3-perfect', value: { variant: 'urgent', countdown: true }, priority: 85 },
        { type: 'setColor', value: { accent: '#EF4444' }, priority: 70 }
      ],
      priority: 90,
      tags: ['urgency', 'conversion']
    });

    // Règle : Entreprise établie
    this.addRule({
      id: 'established-business',
      name: 'Entreprise Établie',
      description: 'Met en avant la confiance pour les entreprises anciennes',
      category: 'trust',
      conditions: [
        { field: 'yearEstablished', operator: 'lessThan', value: 2010, weight: 80 },
        { field: 'hasTestimonials', operator: 'equals', value: true, weight: 20 }
      ],
      actions: [
        { type: 'addBlock', blockId: 'content-v3-perfect', value: { type: 'stats', showYears: true }, priority: 80 },
        { type: 'addBlock', blockId: 'testimonials-v3-perfect', value: { variant: 'video-cards' }, priority: 85 },
        { type: 'setVariant', blockId: 'header-v3-perfect', value: 'corporate', priority: 70 }
      ],
      priority: 80,
      tags: ['trust', 'authority']
    });

    // Règle : Process détaillé
    this.addRule({
      id: 'detailed-process',
      name: 'Process Détaillé',
      description: 'Ajoute une timeline pour les process détaillés',
      category: 'content',
      conditions: [
        { field: 'hasProcess', operator: 'equals', value: true, weight: 100 }
      ],
      actions: [
        { type: 'addBlock', blockId: 'features-v3-perfect', value: { layout: 'timeline' }, position: 3, priority: 80 }
      ],
      priority: 75,
      tags: ['process', 'trust']
    });

    // Règle : Portfolio visuel
    this.addRule({
      id: 'visual-portfolio',
      name: 'Portfolio Visuel',
      description: 'Met en avant la galerie pour les métiers visuels',
      category: 'visual',
      conditions: [
        { field: 'hasGallery', operator: 'equals', value: true, weight: 60 },
        { field: 'businessType', operator: 'in', value: ['peintre', 'menuisier', 'carreleur'], weight: 40 }
      ],
      actions: [
        { type: 'addBlock', blockId: 'gallery-v3-perfect', value: { variant: 'masonry-flow' }, position: 2, priority: 85 },
        { type: 'setLayout', value: 'visual-focus', priority: 70 }
      ],
      priority: 85,
      tags: ['visual', 'portfolio']
    });

    // Règle : Tarification transparente
    this.addRule({
      id: 'transparent-pricing',
      name: 'Tarification Transparente',
      description: 'Ajoute les prix si transparence souhaitée',
      category: 'pricing',
      conditions: [
        { field: 'hasPricing', operator: 'equals', value: true, weight: 100 }
      ],
      actions: [
        { type: 'addBlock', blockId: 'pricing-v3-perfect', value: { toggle: true }, position: 4, priority: 75 }
      ],
      priority: 70,
      tags: ['pricing', 'transparency']
    });

    // Règle : Style moderne tech
    this.addRule({
      id: 'modern-tech-style',
      name: 'Style Tech Moderne',
      description: 'Style high-tech pour électriciens/domotique',
      category: 'style',
      conditions: [
        { field: 'businessType', operator: 'equals', value: 'electricien', weight: 50 },
        { field: 'stylePreference', operator: 'in', value: ['modern', 'tech'], weight: 50 }
      ],
      actions: [
        { type: 'setVariant', blockId: 'all', value: 'modern', priority: 80 },
        { type: 'setColor', value: { primary: '#8B5CF6', secondary: '#10B981' }, priority: 75 },
        { type: 'setContent', value: { tone: 'technical' }, priority: 70 }
      ],
      priority: 80,
      tags: ['style', 'tech']
    });
  }

  // Initialiser la matrice de compatibilité des blocs
  private initializeBlockCompatibility() {
    // Header doit toujours être en premier
    this.blockCompatibility.set('header-v3-perfect', []);
    
    // Hero vient après header
    this.blockCompatibility.set('hero-v3-perfect', ['header-v3-perfect']);
    
    // Features/Services après hero
    this.blockCompatibility.set('features-v3-perfect', ['hero-v3-perfect', 'content-v3-perfect']);
    this.blockCompatibility.set('services-v3-perfect', ['hero-v3-perfect', 'features-v3-perfect']);
    
    // Gallery après services
    this.blockCompatibility.set('gallery-v3-perfect', ['services-v3-perfect', 'features-v3-perfect']);
    
    // Testimonials vers la fin
    this.blockCompatibility.set('testimonials-v3-perfect', ['services-v3-perfect', 'gallery-v3-perfect']);
    
    // CTA avant contact
    this.blockCompatibility.set('cta-v3-perfect', ['testimonials-v3-perfect', 'pricing-v3-perfect']);
    
    // Contact et footer à la fin
    this.blockCompatibility.set('contact-v3-perfect', ['cta-v3-perfect']);
    this.blockCompatibility.set('footer-v3-perfect', ['contact-v3-perfect']);
  }

  // Ajouter une règle
  addRule(rule: TemplateRule) {
    const validatedRule = TemplateRuleSchema.parse(rule);
    this.rules.set(validatedRule.id, validatedRule);
  }

  // Obtenir toutes les règles
  getAllRules(): TemplateRule[] {
    return Array.from(this.rules.values());
  }

  // Obtenir les règles par catégorie
  getRulesByCategory(category: string): TemplateRule[] {
    return Array.from(this.rules.values()).filter(rule => rule.category === category);
  }

  // Obtenir les règles par tags
  getRulesByTags(tags: string[]): TemplateRule[] {
    return Array.from(this.rules.values()).filter(rule => 
      tags.some(tag => rule.tags.includes(tag))
    );
  }

  // Vérifier la compatibilité des blocs
  isBlockCompatible(blockId: string, existingBlocks: string[]): boolean {
    const requirements = this.blockCompatibility.get(blockId);
    if (!requirements) return true;
    
    return requirements.every(req => existingBlocks.includes(req));
  }

  // Obtenir l'ordre optimal des blocs
  getOptimalBlockOrder(blocks: string[]): string[] {
    const ordered: string[] = [];
    const remaining = new Set(blocks);
    
    while (remaining.size > 0) {
      for (const block of remaining) {
        if (this.isBlockCompatible(block, ordered)) {
          ordered.push(block);
          remaining.delete(block);
          break;
        }
      }
    }
    
    return ordered;
  }
}