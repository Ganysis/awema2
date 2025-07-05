import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Pricing Ultra-Moderne - Tables de prix révolutionnaires
 * 8 variantes visuelles spectaculaires
 */
export const pricingUltraModern: Block = {
  id: 'pricing-ultra-modern',
  name: 'Pricing Ultra-Moderne',
  description: 'Tables de prix avec animations 3D, toggle mensuel/annuel et 8 designs époustouflants',
  category: BlockCategory.PRICING,
  tags: ['pricing', 'modern', 'animated', '3d', 'interactive', 'calculator'],
  thumbnail: '/blocks/pricing-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel',
      defaultValue: 'glassmorphism',
      required: true,
      validation: {
        options: [
          { label: 'Glassmorphism', value: 'glassmorphism' },
          { label: 'Gradient Wave', value: 'gradient-wave' },
          { label: 'Floating Cards', value: 'floating-cards' },
          { label: 'Neon Glow', value: 'neon-glow' },
          { label: 'Minimal Luxe', value: 'minimal-luxe' },
          { label: 'Split Screen', value: 'split-screen' },
          { label: 'Particles Background', value: 'particles' },
          { label: '3D Perspective', value: '3d-perspective' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 1
      }
    },
    {
      name: 'layout',
      type: PropType.STRING,
      description: 'Type de mise en page',
      defaultValue: 'cards',
      required: true,
      validation: {
        options: [
          { label: 'Cards classiques', value: 'cards' },
          { label: 'Table comparative', value: 'table' },
          { label: 'Slider interactif', value: 'slider' },
          { label: 'Toggle moderne', value: 'toggle' },
          { label: 'Calculator', value: 'calculator' },
          { label: 'Timeline', value: 'timeline' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 2
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Nos Tarifs',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 3
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Des prix transparents, sans surprise',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'billingToggle',
      type: PropType.BOOLEAN,
      description: 'Toggle mensuel/annuel',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 5
      }
    },
    {
      name: 'annualDiscount',
      type: PropType.NUMBER,
      description: 'Réduction annuelle (%)',
      defaultValue: 20,
      required: false,
      validation: {
        min: 0,
        max: 50
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Fonctionnalités',
        order: 6,
        condition: { prop: 'billingToggle', value: true }
      }
    },
    {
      name: 'currency',
      type: PropType.STRING,
      description: 'Devise',
      defaultValue: '€',
      required: false,
      validation: {
        options: [
          { label: 'Euro (€)', value: '€' },
          { label: 'Dollar ($)', value: '$' },
          { label: 'Livre (£)', value: '£' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Tarifs',
        order: 7
      }
    },
    {
      name: 'numberOfPlans',
      type: PropType.NUMBER,
      description: 'Nombre de forfaits',
      defaultValue: 3,
      required: true,
      validation: {
        min: 1,
        max: 4
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Forfaits',
        order: 8,
        options: [
          { label: '1 forfait', value: 1 },
          { label: '2 forfaits', value: 2 },
          { label: '3 forfaits', value: 3 },
          { label: '4 forfaits', value: 4 }
        ]
      }
    },
    // Plan 1
    {
      name: 'plan1_name',
      type: PropType.STRING,
      description: 'Nom',
      defaultValue: 'Essentiel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 1',
        order: 9,
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    {
      name: 'plan1_price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 50,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Forfait 1',
        order: 10,
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    {
      name: 'plan1_unit',
      type: PropType.STRING,
      description: 'Unité',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Forfait 1',
        order: 11,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix fixe', value: '' }
        ],
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    {
      name: 'plan1_description',
      type: PropType.STRING,
      description: 'Description',
      defaultValue: 'Pour les petits besoins',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 1',
        order: 12,
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    {
      name: 'plan1_features',
      type: PropType.STRING,
      description: 'Caractéristiques (une par ligne)',
      defaultValue: 'Intervention sous 48h\nDevis gratuit\nGarantie 1 an\nSupport par email',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Forfait 1',
        order: 13,
        rows: 6,
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    {
      name: 'plan1_cta',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Choisir',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 1',
        order: 14,
        condition: { prop: 'numberOfPlans', value: 1 }
      }
    },
    // Plan 2
    {
      name: 'plan2_name',
      type: PropType.STRING,
      description: 'Nom',
      defaultValue: 'Professionnel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 2',
        order: 15,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 99,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Forfait 2',
        order: 16,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_unit',
      type: PropType.STRING,
      description: 'Unité',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Forfait 2',
        order: 17,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix fixe', value: '' }
        ],
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_description',
      type: PropType.STRING,
      description: 'Description',
      defaultValue: 'Le plus populaire',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 2',
        order: 18,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_features',
      type: PropType.STRING,
      description: 'Caractéristiques (une par ligne)',
      defaultValue: 'Intervention sous 24h\nDevis gratuit\nGarantie 2 ans\nSupport prioritaire\nMaintenance préventive\nRapport mensuel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Forfait 2',
        order: 19,
        rows: 6,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_highlighted',
      type: PropType.BOOLEAN,
      description: 'Mettre en avant ce forfait',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Forfait 2',
        order: 20,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    {
      name: 'plan2_badge',
      type: PropType.STRING,
      description: 'Badge',
      defaultValue: 'Populaire',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 2',
        order: 21,
        placeholder: 'Ex: Populaire, Meilleur choix, -20%',
        condition: { prop: 'plan2_highlighted', value: true }
      }
    },
    {
      name: 'plan2_cta',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Choisir',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 2',
        order: 22,
        condition: { prop: 'numberOfPlans', values: [2, 3, 4] }
      }
    },
    // Plan 3
    {
      name: 'plan3_name',
      type: PropType.STRING,
      description: 'Nom',
      defaultValue: 'Enterprise',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 3',
        order: 23,
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    {
      name: 'plan3_price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 199,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Forfait 3',
        order: 24,
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    {
      name: 'plan3_unit',
      type: PropType.STRING,
      description: 'Unité',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Forfait 3',
        order: 25,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix fixe', value: '' }
        ],
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    {
      name: 'plan3_description',
      type: PropType.STRING,
      description: 'Description',
      defaultValue: 'Pour les grandes structures',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 3',
        order: 26,
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    {
      name: 'plan3_features',
      type: PropType.STRING,
      description: 'Caractéristiques (une par ligne)',
      defaultValue: 'Intervention immédiate\nDevis gratuit\nGarantie 5 ans\nSupport 24/7\nMaintenance préventive\nRapport hebdomadaire\nTechnicien dédié\nFormation équipe',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Forfait 3',
        order: 27,
        rows: 6,
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    {
      name: 'plan3_cta',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Nous contacter',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 3',
        order: 28,
        condition: { prop: 'numberOfPlans', values: [3, 4] }
      }
    },
    // Plan 4
    {
      name: 'plan4_name',
      type: PropType.STRING,
      description: 'Nom',
      defaultValue: 'Premium',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 4',
        order: 29,
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'plan4_price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 299,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: 'Forfait 4',
        order: 30,
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'plan4_unit',
      type: PropType.STRING,
      description: 'Unité',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Forfait 4',
        order: 31,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix fixe', value: '' }
        ],
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'plan4_description',
      type: PropType.STRING,
      description: 'Description',
      defaultValue: 'Solution tout-en-un',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 4',
        order: 32,
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'plan4_features',
      type: PropType.STRING,
      description: 'Caractéristiques (une par ligne)',
      defaultValue: 'Tout du forfait Enterprise\n+ Audit complet annuel\n+ Formation illimitée\n+ Support dédié 24/7',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Forfait 4',
        order: 33,
        rows: 6,
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'plan4_cta',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Demander un devis',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Forfait 4',
        order: 34,
        condition: { prop: 'numberOfPlans', value: 4 }
      }
    },
    {
      name: 'showComparison',
      type: PropType.BOOLEAN,
      description: 'Afficher tableau comparatif',
      defaultValue: false,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 35
      }
    },
    {
      name: 'animateOnScroll',
      type: PropType.BOOLEAN,
      description: 'Animation au scroll',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Animations',
        order: 36
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    layout: 'cards',
    title: 'Nos Tarifs',
    billingToggle: true,
    currency: '€',
    animateOnScroll: true
  }
};

export function renderPricingUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    layout = 'cards',
    title = 'Nos Tarifs',
    subtitle = '',
    billingToggle = true,
    annualDiscount = 20,
    currency = '€',
    numberOfPlans = 3,
    showComparison = false,
    animateOnScroll = true
  } = props;

  // Build plans array from individual props
  const plansList = [];
  for (let i = 1; i <= numberOfPlans; i++) {
    const plan = {
      name: props[`plan${i}_name`] || `Plan ${i}`,
      price: props[`plan${i}_price`] || 0,
      unit: props[`plan${i}_unit`] || '/mois',
      description: props[`plan${i}_description`] || '',
      features: (props[`plan${i}_features`] || '').split('\n').filter((f: string) => f.trim()),
      highlighted: props[`plan${i}_highlighted`] || false,
      badge: props[`plan${i}_badge`] || '',
      ctaText: props[`plan${i}_cta`] || 'Choisir',
      ctaLink: '#contact'
    };
    plansList.push(plan);
  }

  const css = `
    .pricing-ultra-modern {
      padding: 4rem 2rem;
      position: relative;
      overflow: hidden;
    }
    
    .pricing-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .pricing-title {
      font-size: clamp(2rem, 4vw, 3.5rem);
      font-weight: 800;
      margin-bottom: 1rem;
    }
    
    .pricing-subtitle {
      font-size: 1.25rem;
      opacity: 0.8;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .billing-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin: 2rem 0;
    }
    
    .billing-option {
      font-size: 1.125rem;
      opacity: 0.7;
      transition: opacity 0.3s;
    }
    
    .billing-option.active {
      opacity: 1;
      font-weight: 600;
    }
    
    .toggle-switch {
      position: relative;
      width: 60px;
      height: 30px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 30px;
      cursor: pointer;
      transition: background 0.3s;
    }
    
    .toggle-switch.active {
      background: var(--color-primary, #3b82f6);
    }
    
    .toggle-slider {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 24px;
      height: 24px;
      background: white;
      border-radius: 50%;
      transition: transform 0.3s;
    }
    
    .toggle-switch.active .toggle-slider {
      transform: translateX(30px);
    }
    
    .discount-badge {
      background: #10b981;
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      margin-left: 0.5rem;
    }
    
    .pricing-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .pricing-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      align-items: start;
    }
    
    .pricing-card {
      position: relative;
      border-radius: 1.5rem;
      padding: 2.5rem;
      transition: all 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    
    .pricing-card.highlighted {
      transform: scale(1.05);
      z-index: 10;
    }
    
    .pricing-badge {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--color-primary, #3b82f6);
      color: white;
      padding: 0.5rem 1.5rem;
      border-radius: 2rem;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .pricing-name {
      font-size: 1.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .pricing-description {
      opacity: 0.8;
      margin-bottom: 1.5rem;
    }
    
    .pricing-price {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: baseline;
      gap: 0.25rem;
    }
    
    .pricing-currency {
      font-size: 1.5rem;
      opacity: 0.8;
    }
    
    .pricing-unit {
      font-size: 1rem;
      opacity: 0.6;
    }
    
    .pricing-features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      flex-grow: 1;
    }
    
    .pricing-feature {
      padding: 0.75rem 0;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .feature-icon {
      width: 20px;
      height: 20px;
      color: var(--color-primary, #3b82f6);
      flex-shrink: 0;
    }
    
    .pricing-cta {
      display: block;
      width: 100%;
      padding: 1rem 2rem;
      background: var(--color-primary, #3b82f6);
      color: white;
      text-align: center;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      margin-top: auto;
    }
    
    .pricing-cta:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
    }
    
    .pricing-card.highlighted .pricing-cta {
      background: white;
      color: var(--color-primary, #3b82f6);
    }
    
    /* Variant: Glassmorphism */
    .variant-glassmorphism {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .variant-glassmorphism .pricing-card {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .variant-glassmorphism .pricing-card.highlighted {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.3);
    }
    
    /* Variant: Gradient Wave */
    .variant-gradient-wave {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
      color: white;
    }
    
    .variant-gradient-wave .pricing-card {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(10px);
    }
    
    /* Variant: Neon Glow */
    .variant-neon-glow {
      background: #0a0a0a;
      color: white;
    }
    
    .variant-neon-glow .pricing-card {
      background: rgba(255, 255, 255, 0.05);
      border: 2px solid rgba(0, 255, 136, 0.3);
      box-shadow: 0 0 20px rgba(0, 255, 136, 0.2);
    }
    
    .variant-neon-glow .pricing-card.highlighted {
      border-color: #00ff88;
      box-shadow: 0 0 40px rgba(0, 255, 136, 0.5);
    }
    
    /* Variant: Minimal Luxe */
    .variant-minimal-luxe {
      background: #fafafa;
      color: #1a202c;
    }
    
    .variant-minimal-luxe .pricing-card {
      background: white;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }
    
    .variant-minimal-luxe .pricing-card.highlighted {
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    }
    
    /* Variant: Floating Cards */
    .variant-floating-cards .pricing-card {
      background: white;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }
    
    .variant-floating-cards .pricing-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    }
    
    .variant-floating-cards .pricing-card.highlighted {
      transform: translateY(-15px);
    }
    
    /* Variant: 3D Perspective */
    .variant-3d-perspective {
      perspective: 1000px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    .variant-3d-perspective .pricing-card {
      transform-style: preserve-3d;
      transform: rotateY(0deg);
      transition: transform 0.6s;
      background: rgba(255, 255, 255, 0.9);
    }
    
    .variant-3d-perspective .pricing-card:hover {
      transform: rotateY(10deg);
    }
    
    /* Layout: Table */
    .layout-table {
      overflow-x: auto;
    }
    
    .pricing-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 1rem;
    }
    
    .pricing-table th,
    .pricing-table td {
      padding: 1.5rem;
      text-align: center;
    }
    
    .pricing-table th:first-child,
    .pricing-table td:first-child {
      text-align: left;
    }
    
    .pricing-table tr {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }
    
    .pricing-table tr:hover {
      background: rgba(255, 255, 255, 0.15);
    }
    
    /* Layout: Slider */
    .layout-slider {
      position: relative;
      padding: 2rem 0;
    }
    
    .pricing-slider {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .slider-track {
      position: relative;
      height: 10px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 5px;
      margin: 3rem 0;
    }
    
    .slider-fill {
      position: absolute;
      height: 100%;
      background: var(--color-primary, #3b82f6);
      border-radius: 5px;
      transition: width 0.3s;
    }
    
    .slider-handle {
      position: absolute;
      width: 30px;
      height: 30px;
      background: white;
      border-radius: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      cursor: grab;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
    
    .slider-labels {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }
    
    .slider-result {
      text-align: center;
      margin-top: 3rem;
    }
    
    .slider-price {
      font-size: 4rem;
      font-weight: 800;
      margin-bottom: 1rem;
    }
    
    /* Animations */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease;
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
      
      .pricing-card.highlighted {
        transform: none;
      }
      
      .pricing-table {
        font-size: 0.875rem;
      }
    }
  `;

  const html = `
    <section class="pricing-ultra-modern variant-${variant}">
      ${title || subtitle ? `
        <div class="pricing-header">
          ${title ? `<h2 class="pricing-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="pricing-subtitle">${subtitle}</p>` : ''}
        </div>
      ` : ''}
      
      ${billingToggle ? `
        <div class="billing-toggle">
          <span class="billing-option ${!billingToggle ? 'active' : ''}">Mensuel</span>
          <div class="toggle-switch ${billingToggle ? 'active' : ''}" id="billing-toggle">
            <div class="toggle-slider"></div>
          </div>
          <span class="billing-option ${billingToggle ? 'active' : ''}">
            Annuel
            ${annualDiscount > 0 ? `<span class="discount-badge">-${annualDiscount}%</span>` : ''}
          </span>
        </div>
      ` : ''}
      
      <div class="pricing-container">
        ${layout === 'cards' ? `
          <div class="pricing-grid">
            ${plansList.map((plan: any, index: number) => `
              <div class="pricing-card ${plan.highlighted ? 'highlighted' : ''} ${animateOnScroll ? 'animate-on-scroll' : ''}" 
                   style="animation-delay: ${index * 0.1}s">
                ${plan.badge ? `<div class="pricing-badge">${plan.badge}</div>` : ''}
                
                <h3 class="pricing-name">${plan.name || ''}</h3>
                <p class="pricing-description">${plan.description || ''}</p>
                
                <div class="pricing-price">
                  <span class="pricing-currency">${currency}</span>
                  <span class="pricing-amount" data-monthly="${plan.price}" data-annual="${Math.round(plan.price * 12 * (1 - annualDiscount / 100))}">${plan.price}</span>
                  <span class="pricing-unit">${plan.unit || '/mois'}</span>
                </div>
                
                ${plan.features && plan.features.length > 0 ? `
                  <ul class="pricing-features">
                    ${plan.features.map((feature: string) => `
                      <li class="pricing-feature">
                        <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span>${feature}</span>
                      </li>
                    `).join('')}
                  </ul>
                ` : ''}
                
                ${plan.ctaText ? `
                  <a href="${plan.ctaLink || '#'}" class="pricing-cta">${plan.ctaText}</a>
                ` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${layout === 'table' ? `
          <div class="layout-table">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th>Fonctionnalités</th>
                  ${plansList.map((plan: any) => `
                    <th>
                      <div class="pricing-name">${plan.name}</div>
                      <div class="pricing-price">
                        <span class="pricing-currency">${currency}</span>
                        <span class="pricing-amount">${plan.price}</span>
                        <span class="pricing-unit">${plan.unit || '/mois'}</span>
                      </div>
                    </th>
                  `).join('')}
                </tr>
              </thead>
              <tbody>
                ${getAllFeatures(plansList).map((feature: string) => `
                  <tr>
                    <td>${feature}</td>
                    ${plansList.map((plan: any) => `
                      <td>
                        ${plan.features && plan.features.includes(feature) ? `
                          <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        ` : '-'}
                      </td>
                    `).join('')}
                  </tr>
                `).join('')}
                <tr>
                  <td></td>
                  ${plansList.map((plan: any) => `
                    <td>
                      ${plan.ctaText ? `
                        <a href="${plan.ctaLink || '#'}" class="pricing-cta">${plan.ctaText}</a>
                      ` : ''}
                    </td>
                  `).join('')}
                </tr>
              </tbody>
            </table>
          </div>
        ` : ''}
        
        ${layout === 'slider' ? `
          <div class="layout-slider">
            <div class="pricing-slider">
              <div class="slider-track">
                <div class="slider-fill" style="width: 50%"></div>
                <div class="slider-handle" style="left: 50%"></div>
              </div>
              <div class="slider-labels">
                <span>1 intervention</span>
                <span>10 interventions</span>
              </div>
              <div class="slider-result">
                <div class="slider-price">
                  <span class="pricing-currency">${currency}</span>
                  <span id="calculated-price">250</span>
                </div>
                <p>Prix estimé pour 5 interventions</p>
                <a href="#contact" class="pricing-cta">Obtenir un devis précis</a>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;

  const js = `
    ${billingToggle ? `
    // Billing toggle
    const toggle = document.getElementById('billing-toggle');
    let isAnnual = ${billingToggle};
    
    if (toggle) {
      toggle.addEventListener('click', function() {
        isAnnual = !isAnnual;
        this.classList.toggle('active');
        
        // Update prices
        document.querySelectorAll('.pricing-amount').forEach(el => {
          const monthly = parseFloat(el.getAttribute('data-monthly'));
          const annual = parseFloat(el.getAttribute('data-annual'));
          
          if (isAnnual) {
            el.textContent = Math.round(annual / 12);
          } else {
            el.textContent = monthly;
          }
        });
        
        // Update active states
        document.querySelectorAll('.billing-option').forEach((opt, i) => {
          opt.classList.toggle('active', i === (isAnnual ? 1 : 0));
        });
      });
    }
    ` : ''}
    
    ${layout === 'slider' ? `
    // Price slider
    const slider = document.querySelector('.slider-handle');
    const fill = document.querySelector('.slider-fill');
    const price = document.getElementById('calculated-price');
    let isDragging = false;
    
    if (slider) {
      slider.addEventListener('mousedown', () => isDragging = true);
      document.addEventListener('mouseup', () => isDragging = false);
      document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const track = document.querySelector('.slider-track');
        const rect = track.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        const percent = x / rect.width;
        
        slider.style.left = percent * 100 + '%';
        fill.style.width = percent * 100 + '%';
        
        // Calculate price (1-10 interventions)
        const interventions = Math.round(1 + percent * 9);
        const basePrice = 50;
        const totalPrice = interventions * basePrice;
        
        price.textContent = totalPrice;
        document.querySelector('.slider-result p').textContent = 
          'Prix estimé pour ' + interventions + ' intervention' + (interventions > 1 ? 's' : '');
      });
    }
    ` : ''}
    
    ${animateOnScroll ? `
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
      observer.observe(el);
    });
    ` : ''}
  `;

  return { html, css, js, dependencies: [] };
}

// Helper function to get all unique features
function getAllFeatures(plans: any[]): string[] {
  const features = new Set<string>();
  plans.forEach(plan => {
    if (plan.features) {
      plan.features.forEach((f: string) => features.add(f));
    }
  });
  return Array.from(features);
}