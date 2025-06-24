import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const statsNumbers: Block = {
  id: 'stats-numbers',
  name: 'Statistiques / Chiffres',
  description: 'Chiffres clés et statistiques avec animations',
  category: BlockCategory.FEATURES,
  tags: ['stats', 'numbers', 'counter', 'statistics', 'achievements'],
  thumbnail: '/blocks/stats-numbers.svg',
  performanceImpact: PerformanceImpact.MEDIUM,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      required: false,
      defaultValue: 'Nos Chiffres Parlent',
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
      defaultValue: 'Une expertise reconnue par nos clients',
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
      defaultValue: 'cards',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Style',
        order: 3
      },
      validation: {
        options: [
          { value: 'cards', label: 'Cartes' },
          { value: 'inline', label: 'En ligne' },
          { value: 'circles', label: 'Cercles' },
          { value: 'minimal', label: 'Minimaliste' },
          { value: 'gradient', label: 'Dégradé' }
        ]
      }
    },
    {
      name: 'numberOfStats',
      type: PropType.STRING,
      description: 'Nombre de statistiques',
      required: true,
      defaultValue: '4',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistiques',
        order: 4
      },
      validation: {
        options: [
          { value: '2', label: '2 statistiques' },
          { value: '3', label: '3 statistiques' },
          { value: '4', label: '4 statistiques' },
          { value: '5', label: '5 statistiques' },
          { value: '6', label: '6 statistiques' }
        ]
      }
    },
    // Stat 1
    {
      name: 'stat1_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '15',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 1',
        order: 10
      }
    },
    {
      name: 'stat1_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '+',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 1',
        order: 11
      }
    },
    {
      name: 'stat1_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: 'Années d\'expérience',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 1',
        order: 12
      }
    },
    {
      name: 'stat1_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'experience',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 1',
        order: 13
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat1_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'primary',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 1',
        order: 14
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    // Stat 2
    {
      name: 'stat2_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '500',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 2',
        order: 20
      }
    },
    {
      name: 'stat2_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '+',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 2',
        order: 21
      }
    },
    {
      name: 'stat2_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: 'Clients satisfaits',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 2',
        order: 22
      }
    },
    {
      name: 'stat2_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'clients',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 2',
        order: 23
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat2_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'success',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 2',
        order: 24
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    // Stat 3
    {
      name: 'stat3_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '98',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 3',
        order: 30
      }
    },
    {
      name: 'stat3_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '%',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 3',
        order: 31
      }
    },
    {
      name: 'stat3_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: 'Taux de satisfaction',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 3',
        order: 32
      }
    },
    {
      name: 'stat3_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'satisfaction',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 3',
        order: 33
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat3_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'accent',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 3',
        order: 34
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    // Stat 4
    {
      name: 'stat4_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '24',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 4',
        order: 40
      }
    },
    {
      name: 'stat4_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '/7',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 4',
        order: 41
      }
    },
    {
      name: 'stat4_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: 'Disponibilité',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 4',
        order: 42
      }
    },
    {
      name: 'stat4_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'availability',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 4',
        order: 43
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat4_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'warning',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 4',
        order: 44
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    // Stat 5
    {
      name: 'stat5_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 5',
        order: 50
      }
    },
    {
      name: 'stat5_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 5',
        order: 51
      }
    },
    {
      name: 'stat5_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 5',
        order: 52
      }
    },
    {
      name: 'stat5_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'star',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 5',
        order: 53
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat5_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'primary',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 5',
        order: 54
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    // Stat 6
    {
      name: 'stat6_number',
      type: PropType.STRING,
      description: 'Nombre',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: 15, 500, 98',
        group: 'Statistique 6',
        order: 60
      }
    },
    {
      name: 'stat6_suffix',
      type: PropType.STRING,
      description: 'Suffixe',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: +, %, /7',
        group: 'Statistique 6',
        order: 61
      }
    },
    {
      name: 'stat6_label',
      type: PropType.STRING,
      description: 'Label',
      required: false,
      defaultValue: '',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Description de la statistique',
        group: 'Statistique 6',
        order: 62
      }
    },
    {
      name: 'stat6_icon',
      type: PropType.STRING,
      description: 'Icône',
      required: false,
      defaultValue: 'star',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 6',
        order: 63
      },
      validation: {
        options: [
          { value: 'experience', label: '💼 Expérience' },
          { value: 'clients', label: '👥 Clients' },
          { value: 'satisfaction', label: '❤️ Satisfaction' },
          { value: 'availability', label: '⏰ Disponibilité' },
          { value: 'projects', label: '📊 Projets' },
          { value: 'team', label: '👥 Équipe' },
          { value: 'quality', label: '⭐ Qualité' },
          { value: 'speed', label: '⚡ Rapidité' },
          { value: 'award', label: '🏆 Récompense' },
          { value: 'certified', label: '✅ Certifié' },
          { value: 'location', label: '📍 Localisation' },
          { value: 'money', label: '💰 Prix' },
          { value: 'warranty', label: '🛡️ Garantie' },
          { value: 'tools', label: '🔧 Équipements' },
          { value: 'eco', label: '🌱 Écologique' }
        ]
      }
    },
    {
      name: 'stat6_color',
      type: PropType.STRING,
      description: 'Couleur',
      required: false,
      defaultValue: 'primary',
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Statistique 6',
        order: 64
      },
      validation: {
        options: [
          { value: 'primary', label: 'Primaire' },
          { value: 'success', label: 'Succès (vert)' },
          { value: 'accent', label: 'Accent' },
          { value: 'warning', label: 'Attention (orange)' }
        ]
      }
    },
    {
      name: 'animateOnScroll',
      type: PropType.STRING,
      description: 'Animer les compteurs au défilement',
      required: false,
      defaultValue: 'true',
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 70
      }
    },
    {
      name: 'showIcons',
      type: PropType.STRING,
      description: 'Afficher les icônes',
      required: false,
      defaultValue: 'true',
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 71
      }
    }
  ],
  variants: [
    {
      id: 'cards',
      name: 'Cartes',
      description: 'Statistiques dans des cartes',
      modifications: {}
    },
    {
      id: 'inline',
      name: 'En ligne',
      description: 'Statistiques alignées horizontalement',
      modifications: {}
    },
    {
      id: 'circles',
      name: 'Cercles',
      description: 'Statistiques dans des cercles',
      modifications: {}
    },
    {
      id: 'minimal',
      name: 'Minimaliste',
      description: 'Design épuré',
      modifications: {}
    },
    {
      id: 'gradient',
      name: 'Dégradé',
      description: 'Avec fond dégradé',
      modifications: {}
    }
  ],
  defaultProps: {
    title: 'Nos Chiffres Parlent',
    subtitle: 'Une expertise reconnue par nos clients',
    variant: 'cards',
    numberOfStats: '4',
    stat1_number: '15',
    stat1_suffix: '+',
    stat1_label: 'Années d\'expérience',
    stat1_icon: 'experience',
    stat1_color: 'primary',
    stat2_number: '500',
    stat2_suffix: '+',
    stat2_label: 'Clients satisfaits',
    stat2_icon: 'clients',
    stat2_color: 'success',
    stat3_number: '98',
    stat3_suffix: '%',
    stat3_label: 'Taux de satisfaction',
    stat3_icon: 'satisfaction',
    stat3_color: 'accent',
    stat4_number: '24',
    stat4_suffix: '/7',
    stat4_label: 'Disponibilité',
    stat4_icon: 'availability',
    stat4_color: 'warning',
    animateOnScroll: true,
    showIcons: true
  }
};

export function renderStatsNumbers(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    title = 'Nos Chiffres Parlent',
    subtitle = '',
    variant = 'cards',
    numberOfStats = '4',
    animateOnScroll = true,
    showIcons = true
  } = props;

  // Build stats array from individual props
  const statsList = [];
  const numStats = parseInt(numberOfStats);
  
  for (let i = 1; i <= numStats; i++) {
    const statNumber = props[`stat${i}_number`];
    if (statNumber) {
      statsList.push({
        id: i.toString(),
        number: statNumber,
        suffix: props[`stat${i}_suffix`] || '',
        label: props[`stat${i}_label`] || '',
        icon: props[`stat${i}_icon`] || 'default',
        color: props[`stat${i}_color`] || 'primary'
      });
    }
  }

  // Icon mapping
  const getIcon = (iconName: string) => {
    const icons: Record<string, string> = {
      experience: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      clients: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>',
      satisfaction: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
      availability: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
      projects: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
      team: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 00-3 3v7a3 3 0 006 0V5a3 3 0 00-3-3z"/><path d="M19 13a3 3 0 00-3 3v3a3 3 0 006 0v-3a3 3 0 00-3-3zM5 13a3 3 0 00-3 3v3a3 3 0 006 0v-3a3 3 0 00-3-3z"/></svg>',
      quality: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      speed: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
      award: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
      certified: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      location: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>',
      money: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
      warranty: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      tools: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>',
      eco: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 00-9.95 9h11.64L12 2zm0 20a10 10 0 009.95-9H10.31L12 22z"/></svg>',
      star: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
      default: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
    };
    return icons[iconName] || icons.default;
  };

  // Get color class
  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: 'primary',
      success: 'success',
      accent: 'accent',
      warning: 'warning',
      danger: 'danger',
      info: 'info'
    };
    return colors[color] || 'primary';
  };

  // Generate HTML based on variant
  const generateStatHTML = (stat: any, index: number) => {
    const icon = getIcon(stat.icon || 'default');
    const colorClass = getColorClass(stat.color || 'primary');
    
    switch (variant) {
      case 'cards':
        return `
          <div class="stat-item card-variant ${colorClass}" data-stat="${index}">
            <div class="stat-card">
              ${showIcons ? `<div class="stat-icon">${icon}</div>` : ''}
              <div class="stat-number-wrapper">
                <span class="stat-number" data-target="${stat.number}">${animateOnScroll ? '0' : stat.number}</span>
                ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
              </div>
              <p class="stat-label">${stat.label}</p>
            </div>
          </div>
        `;
      
      case 'inline':
        return `
          <div class="stat-item inline-variant ${colorClass}" data-stat="${index}">
            ${showIcons ? `<div class="stat-icon">${icon}</div>` : ''}
            <div class="stat-content">
              <div class="stat-number-wrapper">
                <span class="stat-number" data-target="${stat.number}">${animateOnScroll ? '0' : stat.number}</span>
                ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
              </div>
              <p class="stat-label">${stat.label}</p>
            </div>
          </div>
        `;
      
      case 'circles':
        return `
          <div class="stat-item circle-variant ${colorClass}" data-stat="${index}">
            <div class="stat-circle">
              <div class="circle-content">
                <div class="stat-number-wrapper">
                  <span class="stat-number" data-target="${stat.number}">${animateOnScroll ? '0' : stat.number}</span>
                  ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
                </div>
              </div>
              ${showIcons ? `<div class="stat-icon">${icon}</div>` : ''}
            </div>
            <p class="stat-label">${stat.label}</p>
          </div>
        `;
      
      case 'minimal':
        return `
          <div class="stat-item minimal-variant ${colorClass}" data-stat="${index}">
            <div class="stat-number-wrapper">
              <span class="stat-number" data-target="${stat.number}">${animateOnScroll ? '0' : stat.number}</span>
              ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
            </div>
            <p class="stat-label">${stat.label}</p>
          </div>
        `;
      
      case 'gradient':
        return `
          <div class="stat-item gradient-variant ${colorClass}" data-stat="${index}">
            <div class="stat-gradient-card">
              ${showIcons ? `<div class="stat-icon">${icon}</div>` : ''}
              <div class="stat-number-wrapper">
                <span class="stat-number" data-target="${stat.number}">${animateOnScroll ? '0' : stat.number}</span>
                ${stat.suffix ? `<span class="stat-suffix">${stat.suffix}</span>` : ''}
              </div>
              <p class="stat-label">${stat.label}</p>
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  };

  const html = `
    <section class="stats-section ${variant}-section">
      <div class="container">
        ${title || subtitle ? `
          <div class="section-header">
            ${title ? `<h2 class="section-title">${title}</h2>` : ''}
            ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
          </div>
        ` : ''}
        
        <div class="stats-container ${variant}">
          ${statsList.map((stat: any, index: number) => generateStatHTML(stat, index)).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .stats-section {
      padding: 80px 0;
      background: var(--color-background, #fff);
      position: relative;
      overflow: hidden;
    }
    
    .gradient-section {
      background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-accent-50) 100%);
    }
    
    .stats-section .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .stats-section .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .stats-section .section-title {
      font-size: 48px;
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 20px;
    }
    
    .stats-section .section-subtitle {
      font-size: 20px;
      color: var(--color-text-secondary, #666);
      margin: 0;
    }
    
    /* Common styles */
    .stat-number-wrapper {
      display: flex;
      align-items: baseline;
      justify-content: center;
      gap: 4px;
    }
    
    .stat-number {
      font-size: 48px;
      font-weight: 800;
      line-height: 1;
      color: var(--color-primary, #007bff);
    }
    
    .stat-suffix {
      font-size: 32px;
      font-weight: 600;
      color: var(--color-primary, #007bff);
    }
    
    .stat-label {
      font-size: 18px;
      color: var(--color-text-secondary, #666);
      margin: 12px 0 0;
      font-weight: 500;
    }
    
    .stat-icon {
      color: var(--color-primary, #007bff);
      margin-bottom: 20px;
    }
    
    /* Color variations */
    .stat-item.primary .stat-number,
    .stat-item.primary .stat-suffix,
    .stat-item.primary .stat-icon {
      color: var(--color-primary, #007bff);
    }
    
    .stat-item.success .stat-number,
    .stat-item.success .stat-suffix,
    .stat-item.success .stat-icon {
      color: var(--color-success, #10b981);
    }
    
    .stat-item.accent .stat-number,
    .stat-item.accent .stat-suffix,
    .stat-item.accent .stat-icon {
      color: var(--color-accent, #8b5cf6);
    }
    
    .stat-item.warning .stat-number,
    .stat-item.warning .stat-suffix,
    .stat-item.warning .stat-icon {
      color: var(--color-warning, #f59e0b);
    }
    
    /* Cards Variant */
    .stats-container.cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .card-variant .stat-card {
      background: var(--color-surface, #f9fafb);
      padding: 40px 30px;
      border-radius: 16px;
      text-align: center;
      height: 100%;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .card-variant .stat-card::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, var(--color-primary-100) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .card-variant:hover .stat-card::before {
      opacity: 0.1;
    }
    
    .card-variant:hover .stat-card {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    
    /* Inline Variant */
    .stats-container.inline {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: 40px;
    }
    
    .inline-variant {
      display: flex;
      align-items: center;
      gap: 20px;
    }
    
    .inline-variant .stat-icon {
      width: 64px;
      height: 64px;
      background: var(--color-primary-50, #f0f7ff);
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    
    /* Circles Variant */
    .stats-container.circles {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
    }
    
    .circle-variant {
      text-align: center;
    }
    
    .circle-variant .stat-circle {
      width: 160px;
      height: 160px;
      margin: 0 auto 20px;
      position: relative;
    }
    
    .circle-variant .circle-content {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 4px solid var(--color-primary-200, #c7e2ff);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      background: var(--color-background, #fff);
    }
    
    .circle-variant .stat-icon {
      position: absolute;
      bottom: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 48px;
      background: var(--color-primary, #007bff);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    
    .circle-variant .stat-icon svg {
      width: 24px;
      height: 24px;
    }
    
    /* Minimal Variant */
    .stats-container.minimal {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 60px;
      text-align: center;
    }
    
    .minimal-variant {
      position: relative;
    }
    
    .minimal-variant::after {
      content: '';
      position: absolute;
      bottom: -30px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: var(--color-primary, #007bff);
    }
    
    /* Gradient Variant */
    .stats-container.gradient {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
    }
    
    .gradient-variant .stat-gradient-card {
      background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-600) 100%);
      padding: 40px 30px;
      border-radius: 20px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    
    .gradient-variant.success .stat-gradient-card {
      background: linear-gradient(135deg, var(--color-success) 0%, var(--color-success-600) 100%);
    }
    
    .gradient-variant.accent .stat-gradient-card {
      background: linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-600) 100%);
    }
    
    .gradient-variant.warning .stat-gradient-card {
      background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-warning-600) 100%);
    }
    
    .gradient-variant .stat-number,
    .gradient-variant .stat-suffix,
    .gradient-variant .stat-icon,
    .gradient-variant .stat-label {
      color: white;
    }
    
    .gradient-variant .stat-icon {
      opacity: 0.9;
    }
    
    .gradient-variant:hover .stat-gradient-card {
      transform: translateY(-5px) scale(1.02);
    }
    
    /* Animations */
    @keyframes countUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .stat-item {
      opacity: 0;
      transform: translateY(30px);
    }
    
    .stat-item.animated {
      animation: countUp 0.6s ease forwards;
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .stats-section {
        padding: 60px 0;
      }
      
      .stats-section .section-title {
        font-size: 36px;
      }
      
      .stats-section .section-subtitle {
        font-size: 18px;
      }
      
      .stat-number {
        font-size: 36px;
      }
      
      .stat-suffix {
        font-size: 24px;
      }
      
      .stat-label {
        font-size: 16px;
      }
      
      .stats-container.inline {
        flex-direction: column;
        align-items: center;
      }
      
      .inline-variant {
        flex-direction: column;
        text-align: center;
      }
      
      .circle-variant .stat-circle {
        width: 140px;
        height: 140px;
      }
    }
    
    @media (max-width: 480px) {
      .stats-section .section-title {
        font-size: 28px;
      }
      
      .stats-container.cards {
        grid-template-columns: 1fr;
      }
      
      .stat-number {
        font-size: 32px;
      }
      
      .stat-suffix {
        font-size: 20px;
      }
      
      .circle-variant .stat-circle {
        width: 120px;
        height: 120px;
      }
    }
  `;

  const js = `
    (function() {
      ${animateOnScroll ? `
      // Counter animation
      const animateCounter = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
          if (!startTimestamp) startTimestamp = timestamp;
          const progress = Math.min((timestamp - startTimestamp) / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
          element.textContent = Math.floor(easeProgress * (end - start) + start);
          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };
        window.requestAnimationFrame(step);
      };
      
      // Intersection Observer for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('animated', 'counted');
            
            const numberElement = entry.target.querySelector('.stat-number');
            if (numberElement) {
              const target = parseInt(numberElement.getAttribute('data-target'));
              animateCounter(numberElement, 0, target, 2000);
            }
          }
        });
      }, {
        threshold: 0.5
      });
      
      // Observe all stat items
      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach(item => {
        observer.observe(item);
      });
      ` : `
      // Add animated class immediately if no scroll animation
      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add('animated');
        }, index * 100);
      });
      `}
      
      // Add hover effect for gradient variant
      const gradientCards = document.querySelectorAll('.gradient-variant .stat-gradient-card');
      gradientCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          card.style.background = \`radial-gradient(circle at \${x}px \${y}px, rgba(255,255,255,0.1) 0%, transparent 50%), \${window.getComputedStyle(card).background}\`;
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.background = '';
        });
      });
    })();
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}