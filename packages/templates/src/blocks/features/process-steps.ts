import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const processSteps: Block = {
  id: 'process-steps',
  name: 'Processus / Étapes',
  description: 'Présentation des étapes de votre processus de travail',
  category: BlockCategory.FEATURES,
  tags: ['process', 'steps', 'timeline', 'workflow', 'procedure'],
  thumbnail: '/blocks/process-steps.svg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      required: false,
      defaultValue: 'Notre Processus',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de la section',
        group: 'Contenu',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      required: false,
      defaultValue: 'Comment nous travaillons pour vous',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Sous-titre de la section',
        group: 'Contenu',
        order: 2
      }
    },
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style de présentation',
      required: true,
      defaultValue: 'timeline-vertical',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Style',
        order: 3
      },
      validation: {
        options: [
          { value: 'timeline-vertical', label: 'Timeline Verticale' },
          { value: 'timeline-horizontal', label: 'Timeline Horizontale' },
          { value: 'cards', label: 'Cartes' },
          { value: 'numbered', label: 'Liste Numérotée' },
          { value: 'zigzag', label: 'Zigzag' }
        ]
      }
    },
    {
      name: 'numberOfSteps',
      type: PropType.STRING,
      description: 'Nombre d\'étapes',
      required: true,
      defaultValue: '4',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étapes',
        order: 4
      },
      validation: {
        options: [
          { value: '2', label: '2 étapes' },
          { value: '3', label: '3 étapes' },
          { value: '4', label: '4 étapes' },
          { value: '5', label: '5 étapes' },
          { value: '6', label: '6 étapes' }
        ]
      }
    },
    // Étape 1
    {
      name: 'step1_icon',
      type: PropType.STRING,
      description: 'Icône étape 1',
      required: false,
      defaultValue: 'phone',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 1',
        order: 10
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step1_title',
      type: PropType.STRING,
      description: 'Titre étape 1',
      required: false,
      defaultValue: 'Premier Contact',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 1',
        order: 11
      }
    },
    {
      name: 'step1_description',
      type: PropType.STRING,
      description: 'Description étape 1',
      required: false,
      defaultValue: 'Nous discutons de votre projet et de vos besoins spécifiques',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 1',
        order: 12
      }
    },
    {
      name: 'step1_duration',
      type: PropType.STRING,
      description: 'Durée étape 1',
      required: false,
      defaultValue: '15 min',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 1',
        order: 13
      }
    },
    // Étape 2
    {
      name: 'step2_icon',
      type: PropType.STRING,
      description: 'Icône étape 2',
      required: false,
      defaultValue: 'document',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 2',
        order: 20
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step2_title',
      type: PropType.STRING,
      description: 'Titre étape 2',
      required: false,
      defaultValue: 'Devis Gratuit',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 2',
        order: 21
      }
    },
    {
      name: 'step2_description',
      type: PropType.STRING,
      description: 'Description étape 2',
      required: false,
      defaultValue: 'Nous établissons un devis détaillé et transparent',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 2',
        order: 22
      }
    },
    {
      name: 'step2_duration',
      type: PropType.STRING,
      description: 'Durée étape 2',
      required: false,
      defaultValue: '24h',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 2',
        order: 23
      }
    },
    // Étape 3
    {
      name: 'step3_icon',
      type: PropType.STRING,
      description: 'Icône étape 3',
      required: false,
      defaultValue: 'tools',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 3',
        order: 30
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step3_title',
      type: PropType.STRING,
      description: 'Titre étape 3',
      required: false,
      defaultValue: 'Réalisation',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 3',
        order: 31
      }
    },
    {
      name: 'step3_description',
      type: PropType.STRING,
      description: 'Description étape 3',
      required: false,
      defaultValue: 'Notre équipe intervient selon le planning convenu',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 3',
        order: 32
      }
    },
    {
      name: 'step3_duration',
      type: PropType.STRING,
      description: 'Durée étape 3',
      required: false,
      defaultValue: '1-5 jours',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 3',
        order: 33
      }
    },
    // Étape 4
    {
      name: 'step4_icon',
      type: PropType.STRING,
      description: 'Icône étape 4',
      required: false,
      defaultValue: 'check',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 4',
        order: 40
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step4_title',
      type: PropType.STRING,
      description: 'Titre étape 4',
      required: false,
      defaultValue: 'Finition & Contrôle',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 4',
        order: 41
      }
    },
    {
      name: 'step4_description',
      type: PropType.STRING,
      description: 'Description étape 4',
      required: false,
      defaultValue: 'Nous vérifions la qualité et votre satisfaction',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 4',
        order: 42
      }
    },
    {
      name: 'step4_duration',
      type: PropType.STRING,
      description: 'Durée étape 4',
      required: false,
      defaultValue: '1h',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 4',
        order: 43
      }
    },
    // Étape 5
    {
      name: 'step5_icon',
      type: PropType.STRING,
      description: 'Icône étape 5',
      required: false,
      defaultValue: 'star',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 5',
        order: 50
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step5_title',
      type: PropType.STRING,
      description: 'Titre étape 5',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 5',
        order: 51
      }
    },
    {
      name: 'step5_description',
      type: PropType.STRING,
      description: 'Description étape 5',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 5',
        order: 52
      }
    },
    {
      name: 'step5_duration',
      type: PropType.STRING,
      description: 'Durée étape 5',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 5',
        order: 53
      }
    },
    // Étape 6
    {
      name: 'step6_icon',
      type: PropType.STRING,
      description: 'Icône étape 6',
      required: false,
      defaultValue: 'star',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Étape 6',
        order: 60
      },
      validation: {
        options: [
          { value: 'phone', label: '📞 Téléphone' },
          { value: 'email', label: '✉️ Email' },
          { value: 'calendar', label: '📅 Calendrier' },
          { value: 'document', label: '📄 Document' },
          { value: 'tools', label: '🔧 Outils' },
          { value: 'check', label: '✅ Validation' },
          { value: 'star', label: '⭐ Étoile' },
          { value: 'user', label: '👤 Utilisateur' },
          { value: 'home', label: '🏠 Maison' },
          { value: 'truck', label: '🚚 Camion' },
          { value: 'clock', label: '🕐 Horloge' },
          { value: 'euro', label: '€ Euro' },
          { value: 'chat', label: '💬 Discussion' },
          { value: 'search', label: '🔍 Recherche' },
          { value: 'settings', label: '⚙️ Réglages' },
          { value: 'paint', label: '🎨 Peinture' },
          { value: 'measure', label: '📏 Mesure' },
          { value: 'safety', label: '🦺 Sécurité' }
        ]
      }
    },
    {
      name: 'step6_title',
      type: PropType.STRING,
      description: 'Titre étape 6',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Titre de l\'étape',
        group: 'Étape 6',
        order: 61
      }
    },
    {
      name: 'step6_description',
      type: PropType.STRING,
      description: 'Description étape 6',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Description de l\'étape',
        group: 'Étape 6',
        order: 62
      }
    },
    {
      name: 'step6_duration',
      type: PropType.STRING,
      description: 'Durée étape 6',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15 min, 1h, 24h',
        group: 'Étape 6',
        order: 63
      }
    },
    {
      name: 'showDuration',
      type: PropType.STRING,
      description: 'Afficher la durée',
      required: false,
      defaultValue: 'true',
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 70
      }
    }
  ],
  variants: [
    {
      id: 'timeline-vertical',
      name: 'Timeline Verticale',
      description: 'Timeline verticale avec connecteurs',
      modifications: {}
    },
    {
      id: 'timeline-horizontal',
      name: 'Timeline Horizontale',
      description: 'Timeline horizontale avec progression',
      modifications: {}
    },
    {
      id: 'cards',
      name: 'Cartes',
      description: 'Cartes avec numéros',
      modifications: {}
    },
    {
      id: 'numbered',
      name: 'Liste Numérotée',
      description: 'Liste avec grands numéros',
      modifications: {}
    },
    {
      id: 'zigzag',
      name: 'Zigzag',
      description: 'Disposition en zigzag',
      modifications: {}
    }
  ],
  defaultProps: {
    title: 'Notre Processus',
    subtitle: 'Comment nous travaillons pour vous',
    variant: 'timeline-vertical',
    numberOfSteps: '4',
    step1_icon: 'phone',
    step1_title: 'Premier Contact',
    step1_description: 'Nous discutons de votre projet et de vos besoins spécifiques',
    step1_duration: '15 min',
    step2_icon: 'document',
    step2_title: 'Devis Gratuit',
    step2_description: 'Nous établissons un devis détaillé et transparent',
    step2_duration: '24h',
    step3_icon: 'tools',
    step3_title: 'Réalisation',
    step3_description: 'Notre équipe intervient selon le planning convenu',
    step3_duration: '1-5 jours',
    step4_icon: 'check',
    step4_title: 'Finition & Contrôle',
    step4_description: 'Nous vérifions la qualité et votre satisfaction',
    step4_duration: '1h',
    showDuration: true
  }
};

export function renderProcessSteps(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    title = 'Notre Processus',
    subtitle = '',
    variant = 'timeline-vertical',
    numberOfSteps = '4',
    showDuration = true
  } = props;

  // Build steps array from individual props
  const stepsList = [];
  const numSteps = parseInt(numberOfSteps);
  
  for (let i = 1; i <= numSteps; i++) {
    const stepTitle = props[`step${i}_title`];
    if (stepTitle) {
      stepsList.push({
        id: i.toString(),
        number: i.toString().padStart(2, '0'),
        title: stepTitle,
        description: props[`step${i}_description`] || '',
        icon: props[`step${i}_icon`] || 'default',
        duration: props[`step${i}_duration`] || ''
      });
    }
  }

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
      email: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/></svg>',
      calendar: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
      document: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
      tools: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
      check: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      star: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      user: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      home: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      truck: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>',
      clock: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      euro: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 19.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5c1.5 0 2.8.7 3.5 1.5M7 10.5h8M7 14.5h8"/></svg>',
      chat: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
      search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
      settings: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v6m0 6v6m4.22-10.22l4.24-4.24M6.34 18.66l4.24-4.24m0 0l4.24 4.24M6.34 5.34l4.24 4.24"/></svg>',
      paint: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 11V7a2 2 0 00-2-2H5a2 2 0 00-2 2v13a1 1 0 001 1h.5a.5.5 0 00.5-.5v-7a2 2 0 012-2h12a1 1 0 001-1z"/><path d="M3 10h18"/></svg>',
      measure: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 21L3 3m0 0v6m0-6h6m12 0v6m0-6h-6"/></svg>',
      safety: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      default: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
    };
    return icons[iconName] || icons.default;
  };

  // Generate HTML based on variant
  const generateStepHTML = (step: any, index: number) => {
    const icon = getIcon(step.icon || 'default');
    
    switch (variant) {
      case 'timeline-vertical':
        return `
          <div class="step-item timeline-vertical" data-step="${index + 1}">
            <div class="step-marker">
              <div class="step-number">${step.number}</div>
              <div class="step-line"></div>
            </div>
            <div class="step-content">
              <div class="step-icon">${icon}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
              ${showDuration && step.duration ? `<span class="step-duration">${step.duration}</span>` : ''}
            </div>
          </div>
        `;
      
      case 'timeline-horizontal':
        return `
          <div class="step-item timeline-horizontal" data-step="${index + 1}">
            <div class="step-content">
              <div class="step-number">${step.number}</div>
              <div class="step-icon">${icon}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
              ${showDuration && step.duration ? `<span class="step-duration">${step.duration}</span>` : ''}
            </div>
            ${index < stepsList.length - 1 ? '<div class="step-connector"></div>' : ''}
          </div>
        `;
      
      case 'cards':
        return `
          <div class="step-item card-style" data-step="${index + 1}">
            <div class="step-card">
              <div class="step-header">
                <span class="step-number">${step.number}</span>
                <div class="step-icon">${icon}</div>
              </div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
              ${showDuration && step.duration ? `<span class="step-duration">${step.duration}</span>` : ''}
            </div>
          </div>
        `;
      
      case 'numbered':
        return `
          <div class="step-item numbered-style" data-step="${index + 1}">
            <div class="step-number-large">${step.number}</div>
            <div class="step-content">
              <div class="step-icon">${icon}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
              ${showDuration && step.duration ? `<span class="step-duration">${step.duration}</span>` : ''}
            </div>
          </div>
        `;
      
      case 'zigzag':
        return `
          <div class="step-item zigzag-style ${index % 2 === 0 ? 'left' : 'right'}" data-step="${index + 1}">
            <div class="step-content">
              <div class="step-number">${step.number}</div>
              <div class="step-icon">${icon}</div>
              <h3 class="step-title">${step.title}</h3>
              <p class="step-description">${step.description}</p>
              ${showDuration && step.duration ? `<span class="step-duration">${step.duration}</span>` : ''}
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  };

  const html = `
    <section class="process-steps-section ${variant}">
      <div class="container">
        ${title || subtitle ? `
          <div class="section-header">
            ${title ? `<h2 class="section-title">${title}</h2>` : ''}
            ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
          </div>
        ` : ''}
        
        <div class="steps-container ${variant}">
          ${stepsList.map((step: any, index: number) => generateStepHTML(step, index)).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .process-steps-section {
      padding: 80px 0;
      background: var(--color-background, #fff);
      overflow: hidden;
    }
    
    .process-steps-section .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .process-steps-section .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .process-steps-section .section-title {
      font-size: 48px;
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 20px;
    }
    
    .process-steps-section .section-subtitle {
      font-size: 20px;
      color: var(--color-text-secondary, #666);
      margin: 0;
    }
    
    /* Common styles */
    .step-icon {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary-50, #f0f7ff);
      color: var(--color-primary, #007bff);
      border-radius: 12px;
      margin-bottom: 20px;
    }
    
    .step-title {
      font-size: 24px;
      font-weight: 600;
      color: var(--color-text, #111);
      margin: 0 0 12px;
    }
    
    .step-description {
      font-size: 16px;
      color: var(--color-text-secondary, #666);
      line-height: 1.6;
      margin: 0;
    }
    
    .step-duration {
      display: inline-block;
      margin-top: 12px;
      padding: 6px 16px;
      background: var(--color-primary-50, #f0f7ff);
      color: var(--color-primary, #007bff);
      font-size: 14px;
      font-weight: 600;
      border-radius: 20px;
    }
    
    /* Timeline Vertical */
    .steps-container.timeline-vertical {
      position: relative;
      padding-left: 60px;
    }
    
    .timeline-vertical .step-item {
      position: relative;
      padding-bottom: 60px;
    }
    
    .timeline-vertical .step-item:last-child {
      padding-bottom: 0;
    }
    
    .timeline-vertical .step-marker {
      position: absolute;
      left: -60px;
      top: 0;
      width: 60px;
    }
    
    .timeline-vertical .step-number {
      width: 48px;
      height: 48px;
      background: var(--color-primary, #007bff);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: 700;
      position: relative;
      z-index: 2;
    }
    
    .timeline-vertical .step-line {
      position: absolute;
      top: 48px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: calc(100% + 60px);
      background: var(--color-border, #e5e7eb);
    }
    
    .timeline-vertical .step-item:last-child .step-line {
      display: none;
    }
    
    .timeline-vertical .step-content {
      background: var(--color-surface, #f9fafb);
      padding: 30px;
      border-radius: 12px;
      position: relative;
    }
    
    .timeline-vertical .step-content::before {
      content: '';
      position: absolute;
      left: -8px;
      top: 20px;
      width: 16px;
      height: 16px;
      background: var(--color-surface, #f9fafb);
      transform: rotate(45deg);
    }
    
    /* Timeline Horizontal */
    .steps-container.timeline-horizontal {
      display: flex;
      align-items: flex-start;
      overflow-x: auto;
      padding: 20px 0;
    }
    
    .timeline-horizontal .step-item {
      flex: 0 0 280px;
      display: flex;
      align-items: flex-start;
      position: relative;
    }
    
    .timeline-horizontal .step-content {
      background: var(--color-surface, #f9fafb);
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      width: 100%;
    }
    
    .timeline-horizontal .step-number {
      font-size: 48px;
      font-weight: 700;
      color: var(--color-primary-200, #c7e2ff);
      margin-bottom: 20px;
    }
    
    .timeline-horizontal .step-icon {
      margin: 0 auto 20px;
    }
    
    .timeline-horizontal .step-connector {
      position: absolute;
      top: 60px;
      right: -40px;
      width: 80px;
      height: 2px;
      background: var(--color-border, #e5e7eb);
    }
    
    .timeline-horizontal .step-connector::after {
      content: '';
      position: absolute;
      right: -8px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid var(--color-border, #e5e7eb);
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
    }
    
    /* Cards Style */
    .steps-container.cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 30px;
    }
    
    .card-style .step-card {
      background: var(--color-surface, #f9fafb);
      padding: 40px 30px;
      border-radius: 16px;
      text-align: center;
      height: 100%;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    
    .card-style .step-card:hover {
      transform: translateY(-5px);
      border-color: var(--color-primary, #007bff);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    .card-style .step-header {
      position: relative;
      margin-bottom: 30px;
    }
    
    .card-style .step-number {
      position: absolute;
      top: -10px;
      right: -10px;
      background: var(--color-primary, #007bff);
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 700;
    }
    
    .card-style .step-icon {
      margin: 0 auto;
    }
    
    /* Numbered Style */
    .steps-container.numbered {
      display: grid;
      gap: 40px;
    }
    
    .numbered-style {
      display: grid;
      grid-template-columns: 120px 1fr;
      gap: 40px;
      align-items: center;
    }
    
    .numbered-style .step-number-large {
      font-size: 80px;
      font-weight: 900;
      color: var(--color-primary-200, #c7e2ff);
      line-height: 1;
      text-align: center;
    }
    
    .numbered-style .step-content {
      background: var(--color-surface, #f9fafb);
      padding: 30px;
      border-radius: 12px;
    }
    
    /* Zigzag Style */
    .steps-container.zigzag {
      display: grid;
      gap: 60px;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .zigzag-style {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      align-items: center;
    }
    
    .zigzag-style.left .step-content {
      grid-column: 1;
    }
    
    .zigzag-style.right {
      direction: rtl;
    }
    
    .zigzag-style.right .step-content {
      direction: ltr;
    }
    
    .zigzag-style .step-content {
      background: var(--color-surface, #f9fafb);
      padding: 40px;
      border-radius: 16px;
      position: relative;
    }
    
    .zigzag-style .step-number {
      position: absolute;
      top: -20px;
      right: -20px;
      width: 60px;
      height: 60px;
      background: var(--color-primary, #007bff);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      font-weight: 700;
    }
    
    /* Animations */
    .step-item {
      opacity: 0;
      transform: translateY(30px);
      animation: fadeInUp 0.6s ease forwards;
    }
    
    .step-item:nth-child(1) { animation-delay: 0.1s; }
    .step-item:nth-child(2) { animation-delay: 0.2s; }
    .step-item:nth-child(3) { animation-delay: 0.3s; }
    .step-item:nth-child(4) { animation-delay: 0.4s; }
    .step-item:nth-child(5) { animation-delay: 0.5s; }
    
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Responsive */
    @media (max-width: 1024px) {
      .zigzag-style {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .zigzag-style.right {
        direction: ltr;
      }
    }
    
    @media (max-width: 768px) {
      .process-steps-section {
        padding: 60px 0;
      }
      
      .process-steps-section .section-title {
        font-size: 36px;
      }
      
      .process-steps-section .section-subtitle {
        font-size: 18px;
      }
      
      .steps-container.timeline-vertical {
        padding-left: 40px;
      }
      
      .timeline-vertical .step-marker {
        left: -40px;
        width: 40px;
      }
      
      .timeline-vertical .step-number {
        width: 36px;
        height: 36px;
        font-size: 14px;
      }
      
      .timeline-horizontal .step-item {
        flex: 0 0 240px;
      }
      
      .numbered-style {
        grid-template-columns: 80px 1fr;
        gap: 20px;
      }
      
      .numbered-style .step-number-large {
        font-size: 60px;
      }
      
      .step-title {
        font-size: 20px;
      }
      
      .step-description {
        font-size: 14px;
      }
    }
    
    @media (max-width: 480px) {
      .process-steps-section .section-title {
        font-size: 28px;
      }
      
      .steps-container.timeline-vertical {
        padding-left: 0;
      }
      
      .timeline-vertical .step-marker {
        position: static;
        margin-bottom: 20px;
      }
      
      .timeline-vertical .step-line {
        display: none;
      }
      
      .timeline-vertical .step-content::before {
        display: none;
      }
      
      .numbered-style {
        grid-template-columns: 1fr;
        text-align: center;
      }
      
      .numbered-style .step-number-large {
        margin-bottom: 20px;
      }
    }
  `;

  const js = `
    (function() {
      // Intersection Observer for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
          }
        });
      }, {
        threshold: 0.1
      });
      
      // Observe all step items
      const steps = document.querySelectorAll('.step-item');
      steps.forEach(step => {
        step.style.animationPlayState = 'paused';
        observer.observe(step);
      });
      
      // Add progress bar for horizontal timeline
      const horizontalContainer = document.querySelector('.steps-container.timeline-horizontal');
      if (horizontalContainer) {
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        progressBar.style.cssText = 'position: absolute; bottom: 0; left: 0; height: 4px; background: var(--color-primary); transition: width 0.3s ease;';
        horizontalContainer.appendChild(progressBar);
        
        const updateProgress = () => {
          const scrollLeft = horizontalContainer.scrollLeft;
          const scrollWidth = horizontalContainer.scrollWidth - horizontalContainer.clientWidth;
          const progress = (scrollLeft / scrollWidth) * 100;
          progressBar.style.width = progress + '%';
        };
        
        horizontalContainer.addEventListener('scroll', updateProgress);
      }
    })();
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}