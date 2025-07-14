import { Block } from '@awema/templates';

export const headerUltraModern: Block = {
  id: 'header-ultra-modern',
  type: 'header-ultra-modern',
  category: 'header',
  name: 'Header Ultra-Moderne',
  description: 'En-tête ultra-moderne avec 8 variantes visuelles, mega menus et fonctionnalités avancées',
  props: {
    variant: {
      type: 'select',
      label: 'Variante visuelle',
      default: 'transparent-blur',
      options: [
        { value: 'transparent-blur', label: 'Transparent avec blur' },
        { value: 'gradient-shift', label: 'Gradient animé' },
        { value: 'solid-shadow', label: 'Solide avec ombre' },
        { value: 'minimal-line', label: 'Minimaliste avec ligne' },
        { value: 'elevated-card', label: 'Carte surélevée' },
        { value: 'split-color', label: 'Couleurs divisées' },
        { value: 'neon-glow', label: 'Effet néon' },
        { value: 'morphing-shape', label: 'Formes morphing' }
      ]
    },
    logo: {
      type: 'object',
      label: 'Logo',
      fields: {
        type: {
          type: 'select',
          label: 'Type de logo',
          default: 'text',
          options: [
            { value: 'text', label: 'Texte' },
            { value: 'image', label: 'Image' },
            { value: 'both', label: 'Image + Texte' }
          ]
        },
        text: {
          type: 'text',
          label: 'Texte du logo',
          default: 'Logo'
        },
        image: {
          type: 'image',
          label: 'Image du logo'
        },
        fontSize: {
          type: 'number',
          label: 'Taille du texte (px)',
          default: 24,
          min: 16,
          max: 48
        }
      }
    },
    menuItems: {
      type: 'array',
      label: 'Éléments du menu',
      itemType: 'object',
      fields: {
        label: {
          type: 'text',
          label: 'Libellé',
          default: 'Lien'
        },
        link: {
          type: 'text',
          label: 'URL',
          default: '#'
        },
        type: {
          type: 'select',
          label: 'Type',
          default: 'link',
          options: [
            { value: 'link', label: 'Lien simple' },
            { value: 'dropdown', label: 'Menu déroulant' },
            { value: 'megamenu', label: 'Mega menu' }
          ]
        },
        submenu: {
          type: 'array',
          label: 'Sous-menu',
          itemType: 'object',
          fields: {
            label: {
              type: 'text',
              label: 'Libellé',
              default: 'Sous-lien'
            },
            link: {
              type: 'text',
              label: 'URL',
              default: '#'
            },
            description: {
              type: 'text',
              label: 'Description'
            },
            icon: {
              type: 'icon',
              label: 'Icône'
            }
          }
        }
      },
      default: [
        { label: 'Accueil', link: '/', type: 'link' },
        { label: 'Services', link: '#services', type: 'dropdown' },
        { label: 'À propos', link: '#about', type: 'link' },
        { label: 'Contact', link: '#contact', type: 'link' }
      ]
    },
    ctaButton: {
      type: 'object',
      label: 'Bouton CTA',
      fields: {
        text: {
          type: 'text',
          label: 'Texte',
          default: 'Devis gratuit'
        },
        link: {
          type: 'text',
          label: 'Lien',
          default: '#contact'
        },
        style: {
          type: 'select',
          label: 'Style',
          default: 'primary',
          options: [
            { value: 'primary', label: 'Principal' },
            { value: 'secondary', label: 'Secondaire' },
            { value: 'gradient', label: 'Dégradé' },
            { value: 'outline', label: 'Contour' }
          ]
        }
      }
    },
    searchEnabled: {
      type: 'boolean',
      label: 'Activer la recherche',
      default: false
    },
    searchStyle: {
      type: 'select',
      label: 'Style de recherche',
      default: 'modal',
      options: [
        { value: 'modal', label: 'Modal plein écran' },
        { value: 'dropdown', label: 'Menu déroulant' },
        { value: 'inline', label: 'En ligne' },
        { value: 'instant', label: 'Recherche instantanée' }
      ]
    },
    darkMode: {
      type: 'boolean',
      label: 'Mode sombre',
      default: false
    },
    darkModeToggle: {
      type: 'boolean',
      label: 'Bouton dark mode',
      default: false
    },
    languageSelector: {
      type: 'boolean',
      label: 'Sélecteur de langue',
      default: false
    },
    languages: {
      type: 'array',
      label: 'Langues disponibles',
      itemType: 'object',
      fields: {
        code: {
          type: 'text',
          label: 'Code',
          default: 'fr'
        },
        label: {
          type: 'text',
          label: 'Libellé',
          default: 'Français'
        },
        flag: {
          type: 'text',
          label: 'Emoji drapeau',
          default: '🇫🇷'
        }
      },
      default: [
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' }
      ]
    },
    sticky: {
      type: 'boolean',
      label: 'Header sticky',
      default: true
    },
    stickyBehavior: {
      type: 'select',
      label: 'Comportement sticky',
      default: 'always',
      options: [
        { value: 'always', label: 'Toujours visible' },
        { value: 'scrollUp', label: 'Visible au scroll up' },
        { value: 'shrink', label: 'Rétrécir au scroll' }
      ]
    },
    mobileMenuStyle: {
      type: 'select',
      label: 'Style menu mobile',
      default: 'slide',
      options: [
        { value: 'slide', label: 'Glissement latéral' },
        { value: 'fullscreen', label: 'Plein écran' },
        { value: 'push', label: 'Push content' },
        { value: 'accordion', label: 'Accordéon' },
        { value: 'morphing', label: 'Morphing animé' }
      ]
    },
    announcement: {
      type: 'object',
      label: 'Barre d\'annonce',
      fields: {
        enabled: {
          type: 'boolean',
          label: 'Activer',
          default: false
        },
        text: {
          type: 'text',
          label: 'Texte',
          default: '🎉 Offre spéciale : -20% ce mois-ci !'
        },
        link: {
          type: 'text',
          label: 'Lien'
        },
        closeable: {
          type: 'boolean',
          label: 'Peut être fermée',
          default: true
        }
      }
    }
  }
};