// CMS Enhanced - Fonctionnalités avancées pour le CMS

// Catalogue des blocs disponibles
const blockCatalog = {
  hero: {
    category: 'Hero',
    blocks: [
      {
        type: 'hero-centered',
        name: 'Hero Centré',
        icon: '🎯',
        defaultProps: {
          title: 'Titre principal',
          subtitle: 'Sous-titre descriptif',
          buttonText: 'En savoir plus',
          buttonLink: '/contact'
        }
      },
      {
        type: 'hero-split',
        name: 'Hero avec image',
        icon: '🖼️',
        defaultProps: {
          title: 'Titre principal',
          subtitle: 'Description',
          buttonText: 'Découvrir',
          buttonLink: '/services',
          image: '/images/hero.jpg'
        }
      }
    ]
  },
  services: {
    category: 'Services',
    blocks: [
      {
        type: 'services-grid-cards',
        name: 'Grille de services',
        icon: '🔧',
        defaultProps: {
          title: 'Nos Services',
          subtitle: 'Ce que nous proposons',
          services: [
            {
              title: 'Service 1',
              description: 'Description du service',
              icon: '🔧',
              link: '#'
            }
          ]
        }
      },
      {
        type: 'services-list-detailed',
        name: 'Liste détaillée',
        icon: '📋',
        defaultProps: {
          title: 'Services détaillés',
          services: []
        }
      }
    ]
  },
  features: {
    category: 'Features',
    blocks: [
      {
        type: 'features-clean',
        name: 'Features simple',
        icon: '✨',
        defaultProps: {
          title: 'Caractéristiques',
          features: [
            {
              title: 'Feature 1',
              description: 'Description',
              icon: '✅'
            }
          ]
        }
      },
      {
        type: 'features-modern',
        name: 'Features moderne',
        icon: '🎨',
        defaultProps: {
          title: 'Pourquoi nous choisir',
          subtitle: 'Les avantages',
          features: []
        }
      }
    ]
  },
  testimonials: {
    category: 'Témoignages',
    blocks: [
      {
        type: 'testimonials-carousel',
        name: 'Carrousel témoignages',
        icon: '💬',
        defaultProps: {
          title: 'Ce que disent nos clients',
          testimonials: [
            {
              name: 'Client',
              role: 'Poste',
              content: 'Témoignage',
              rating: 5
            }
          ]
        }
      },
      {
        type: 'testimonials-grid',
        name: 'Grille témoignages',
        icon: '📢',
        defaultProps: {
          title: 'Avis clients',
          testimonials: []
        }
      }
    ]
  },
  gallery: {
    category: 'Galerie',
    blocks: [
      {
        type: 'gallery-clean',
        name: 'Galerie simple',
        icon: '🖼️',
        defaultProps: {
          title: 'Nos réalisations',
          images: []
        }
      },
      {
        type: 'gallery-modern',
        name: 'Galerie moderne',
        icon: '📸',
        defaultProps: {
          title: 'Portfolio',
          subtitle: 'Nos derniers projets',
          images: []
        }
      }
    ]
  },
  pricing: {
    category: 'Tarifs',
    blocks: [
      {
        type: 'pricing-clean',
        name: 'Tarifs simple',
        icon: '💰',
        defaultProps: {
          title: 'Nos Tarifs',
          subtitle: 'Choisissez votre formule',
          plans: []
        }
      },
      {
        type: 'pricing-comparison',
        name: 'Comparaison tarifs',
        icon: '📊',
        defaultProps: {
          title: 'Comparez nos offres',
          plans: []
        }
      }
    ]
  },
  faq: {
    category: 'FAQ',
    blocks: [
      {
        type: 'faq-accordion',
        name: 'FAQ Accordéon',
        icon: '❓',
        defaultProps: {
          title: 'Questions fréquentes',
          questions: [
            {
              question: 'Question ?',
              answer: 'Réponse.'
            }
          ]
        }
      },
      {
        type: 'faq-columns',
        name: 'FAQ en colonnes',
        icon: '🤔',
        defaultProps: {
          title: 'FAQ',
          subtitle: 'Tout ce que vous devez savoir',
          questions: []
        }
      }
    ]
  },
  cta: {
    category: 'Call to Action',
    blocks: [
      {
        type: 'cta-clean',
        name: 'CTA Simple',
        icon: '📣',
        defaultProps: {
          title: 'Prêt à commencer ?',
          subtitle: 'Contactez-nous dès maintenant',
          buttonText: 'Nous contacter',
          buttonLink: '/contact'
        }
      },
      {
        type: 'cta-split',
        name: 'CTA avec image',
        icon: '🎯',
        defaultProps: {
          title: 'Passez à l\'action',
          subtitle: 'Ne manquez pas cette opportunité',
          buttonText: 'Commencer',
          buttonLink: '#',
          image: '/images/cta-bg.jpg'
        }
      }
    ]
  },
  contact: {
    category: 'Contact',
    blocks: [
      {
        type: 'contact-form-map',
        name: 'Formulaire avec carte',
        icon: '📍',
        defaultProps: {
          title: 'Contactez-nous',
          subtitle: 'Nous sommes à votre écoute',
          showMap: true,
          formFields: [
            { name: 'name', label: 'Nom', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: true },
            { name: 'message', label: 'Message', type: 'textarea', required: true }
          ]
        }
      },
      {
        type: 'contact-simple',
        name: 'Contact simple',
        icon: '✉️',
        defaultProps: {
          title: 'Entrons en contact',
          description: 'Remplissez le formulaire ci-dessous'
        }
      }
    ]
  },
  content: {
    category: 'Contenu',
    blocks: [
      {
        type: 'content-simple',
        name: 'Contenu simple',
        icon: '📄',
        defaultProps: {
          title: 'Titre de section',
          content: 'Votre contenu ici...'
        }
      },
      {
        type: 'content-with-image',
        name: 'Contenu avec image',
        icon: '📝',
        defaultProps: {
          title: 'À propos',
          content: 'Description...',
          image: '/images/about.jpg',
          imagePosition: 'right'
        }
      }
    ]
  }
};

// Gestionnaire de thème
class ThemeManager {
  constructor(cms) {
    this.cms = cms;
    this.presetThemes = {
      blue: {
        name: 'Bleu professionnel',
        colors: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#F59E0B',
          background: '#FFFFFF',
          surface: '#F3F4F6',
          text: '#1F2937',
          textSecondary: '#6B7280'
        }
      },
      green: {
        name: 'Vert nature',
        colors: {
          primary: '#10B981',
          secondary: '#059669',
          accent: '#F59E0B',
          background: '#FFFFFF',
          surface: '#F0FDF4',
          text: '#1F2937',
          textSecondary: '#6B7280'
        }
      },
      purple: {
        name: 'Violet moderne',
        colors: {
          primary: '#8B5CF6',
          secondary: '#6D28D9',
          accent: '#EC4899',
          background: '#FFFFFF',
          surface: '#F5F3FF',
          text: '#1F2937',
          textSecondary: '#6B7280'
        }
      },
      dark: {
        name: 'Mode sombre',
        colors: {
          primary: '#3B82F6',
          secondary: '#1E40AF',
          accent: '#F59E0B',
          background: '#111827',
          surface: '#1F2937',
          text: '#F9FAFB',
          textSecondary: '#D1D5DB'
        }
      }
    };
  }

  applyTheme(theme) {
    if (!this.cms.data.theme) {
      this.cms.data.theme = { colors: {} };
    }
    this.cms.data.theme.colors = { ...theme.colors };
    this.updateCSSVariables(theme.colors);
  }

  updateCSSVariables(colors) {
    const root = document.documentElement;
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
  }

  getThemeColors() {
    return this.cms.data.theme?.colors || this.presetThemes.blue.colors;
  }
}

// Gestionnaire de blocs avancé
class BlockManager {
  constructor(cms) {
    this.cms = cms;
  }

  addBlock(pageSlug, blockType, position = null) {
    const page = this.cms.data.pages.find(p => p.slug === pageSlug);
    if (!page) return null;

    // Trouver le bloc dans le catalogue
    let blockTemplate = null;
    for (const category of Object.values(blockCatalog)) {
      const found = category.blocks.find(b => b.type === blockType);
      if (found) {
        blockTemplate = found;
        break;
      }
    }

    if (!blockTemplate) return null;

    // Créer le nouveau bloc
    const newBlock = {
      id: `${blockType}-${Date.now()}`,
      type: blockType,
      isVisible: true,
      props: JSON.parse(JSON.stringify(blockTemplate.defaultProps)) // Deep clone
    };

    // Ajouter à la position spécifiée ou à la fin
    if (position !== null && position >= 0 && position <= page.blocks.length) {
      page.blocks.splice(position, 0, newBlock);
    } else {
      page.blocks.push(newBlock);
    }

    return newBlock;
  }

  removeBlock(pageSlug, blockId) {
    const page = this.cms.data.pages.find(p => p.slug === pageSlug);
    if (!page) return false;

    const index = page.blocks.findIndex(b => b.id === blockId);
    if (index === -1) return false;

    page.blocks.splice(index, 1);
    return true;
  }

  moveBlock(pageSlug, blockId, direction) {
    const page = this.cms.data.pages.find(p => p.slug === pageSlug);
    if (!page) return false;

    const index = page.blocks.findIndex(b => b.id === blockId);
    if (index === -1) return false;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Vérifier les limites
    if (newIndex < 0 || newIndex >= page.blocks.length) return false;

    // Échanger les positions
    const temp = page.blocks[index];
    page.blocks[index] = page.blocks[newIndex];
    page.blocks[newIndex] = temp;

    return true;
  }

  duplicateBlock(pageSlug, blockId) {
    const page = this.cms.data.pages.find(p => p.slug === pageSlug);
    if (!page) return null;

    const blockIndex = page.blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return null;

    const originalBlock = page.blocks[blockIndex];
    const duplicatedBlock = {
      ...JSON.parse(JSON.stringify(originalBlock)), // Deep clone
      id: `${originalBlock.type}-${Date.now()}`
    };

    page.blocks.splice(blockIndex + 1, 0, duplicatedBlock);
    return duplicatedBlock;
  }
}

// Éditeur de propriétés avancé
class PropertyEditor {
  static generateControls(block) {
    const controls = [];
    const props = block.props || {};

    // Analyser les props pour générer les contrôles appropriés
    Object.entries(props).forEach(([key, value]) => {
      const control = this.getControlForValue(key, value);
      if (control) controls.push(control);
    });

    return controls;
  }

  static getControlForValue(key, value) {
    // Détection automatique du type de contrôle
    if (key.includes('color') || key.includes('Color')) {
      return {
        type: 'color',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    if (key.includes('image') || key.includes('Image') || key.includes('icon')) {
      return {
        type: 'image',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    if (key.includes('link') || key.includes('Link') || key.includes('href')) {
      return {
        type: 'url',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    if (typeof value === 'boolean') {
      return {
        type: 'toggle',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    if (typeof value === 'number') {
      return {
        type: 'number',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    if (Array.isArray(value)) {
      return {
        type: 'array',
        key,
        label: this.formatLabel(key),
        value,
        itemType: value.length > 0 ? this.detectArrayItemType(value[0]) : 'object'
      };
    }
    
    if (typeof value === 'object' && value !== null) {
      return {
        type: 'object',
        key,
        label: this.formatLabel(key),
        value
      };
    }
    
    // Par défaut, texte
    return {
      type: key.includes('description') || key.includes('content') ? 'textarea' : 'text',
      key,
      label: this.formatLabel(key),
      value
    };
  }

  static detectArrayItemType(item) {
    if (typeof item === 'string') return 'string';
    if (typeof item === 'number') return 'number';
    if (typeof item === 'object') return 'object';
    return 'mixed';
  }

  static formatLabel(key) {
    // Convertir camelCase en texte lisible
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }
}

// Exporter les classes et le catalogue
window.CMS_ENHANCEMENTS = {
  blockCatalog,
  ThemeManager,
  BlockManager,
  PropertyEditor
};