import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Contact Ultra-Moderne - Design MAGNIFIQUE mais technique simple
 * 8 variantes visuellement impressionnantes
 */
export const contactUltraModern: Block = {
  id: 'contact-ultra-modern',
  name: 'Contact Ultra-Moderne',
  description: 'Formulaire de contact avec 8 designs magnifiques et configuration simple',
  category: BlockCategory.CONTACT,
  tags: ['contact', 'form', 'modern', 'glassmorphism', 'gradient', 'animated'],
  thumbnail: '/blocks/contact-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.LOW,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel du formulaire',
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
      name: 'backgroundColor',
      type: PropType.STRING,
      description: 'Couleur de fond de la section',
      defaultValue: 'transparent',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Design',
        order: 2
      }
    },
    {
      name: 'backgroundGradient',
      type: PropType.STRING,
      description: 'Dégradé de fond',
      defaultValue: '',
      required: false,
      validation: {
        options: [
          { value: '', label: 'Aucun' },
          { value: 'purple-blue', label: 'Violet → Bleu' },
          { value: 'orange-pink', label: 'Orange → Rose' },
          { value: 'green-blue', label: 'Vert → Bleu' },
          { value: 'red-purple', label: 'Rouge → Violet' },
          { value: 'custom', label: 'Personnalisé' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Design',
        order: 3
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Parlons de votre projet',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Nous vous répondons sous 24h',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 5
      }
    },
    {
      name: 'recipientEmail',
      type: PropType.STRING,
      description: 'Email de réception des formulaires',
      defaultValue: '',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'contact@monentreprise.com',
        helpText: 'Email où seront envoyés les messages',
        group: 'Configuration',
        order: 6
      }
    },
    {
      name: 'fields',
      type: PropType.ARRAY,
      description: 'Champs du formulaire',
      defaultValue: [
        { name: 'name', label: 'Nom complet', type: 'text', required: true, icon: 'user', placeholder: 'Jean Dupont' },
        { name: 'email', label: 'Email', type: 'email', required: true, icon: 'mail', placeholder: 'email@exemple.com' },
        { name: 'phone', label: 'Téléphone', type: 'tel', required: false, icon: 'phone', placeholder: '06 12 34 56 78' },
        { name: 'subject', label: 'Objet', type: 'text', required: true, icon: 'message-circle', placeholder: 'Objet de votre demande' },
        { name: 'message', label: 'Votre message', type: 'textarea', required: true, rows: 5, icon: 'edit', placeholder: 'Décrivez votre projet...' }
      ],
      required: true,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        helpText: 'Ajoutez, supprimez et réorganisez les champs du formulaire',
        group: 'Configuration',
        order: 7,
        collectionSchema: {
          label: { 
            type: 'text', 
            label: 'Titre du champ', 
            defaultValue: 'Nouveau champ',
            placeholder: 'Ex: Votre nom complet'
          },
          name: { 
            type: 'text', 
            label: 'Identifiant technique', 
            defaultValue: '',
            placeholder: 'Généré automatiquement'
          },
          type: { 
            type: 'select', 
            label: 'Type de champ', 
            defaultValue: 'text',
            options: [
              { value: 'text', label: 'Texte simple' },
              { value: 'email', label: 'Adresse email' },
              { value: 'tel', label: 'Numéro de téléphone' },
              { value: 'number', label: 'Nombre' },
              { value: 'textarea', label: 'Message (zone de texte)' },
              { value: 'select', label: 'Choix dans une liste' },
              { value: 'date', label: 'Date' }
            ]
          },
          required: { 
            type: 'checkbox', 
            label: 'Champ obligatoire', 
            defaultValue: false 
          },
          placeholder: { 
            type: 'text', 
            label: 'Texte d\'aide (placeholder)', 
            defaultValue: '',
            placeholder: 'Ex: Entrez votre nom...'
          },
          icon: {
            type: 'select',
            label: 'Icône du champ',
            defaultValue: 'user',
            options: [
              { value: 'user', label: '👤 Personne' },
              { value: 'mail', label: '✉️ Email' },
              { value: 'phone', label: '📞 Téléphone' },
              { value: 'message-circle', label: '💬 Message' },
              { value: 'edit', label: '✏️ Édition' },
              { value: 'calendar', label: '📅 Calendrier' },
              { value: 'map-pin', label: '📍 Localisation' },
              { value: 'briefcase', label: '💼 Entreprise' },
              { value: 'home', label: '🏠 Domicile' }
            ]
          }
        },
        itemLabel: (item) => item.label || 'Champ sans titre',
        generateName: (item) => {
          // Génère automatiquement le name basé sur le label
          if (!item.name && item.label) {
            return item.label.toLowerCase()
              .replace(/[éèêë]/g, 'e')
              .replace(/[àâä]/g, 'a')
              .replace(/[ùûü]/g, 'u')
              .replace(/[îï]/g, 'i')
              .replace(/[ôö]/g, 'o')
              .replace(/[^a-z0-9]/g, '_')
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '');
          }
          return item.name || 'field_' + Math.random().toString(36).substr(2, 9);
        }
      }
    },
    {
      name: 'submitText',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Envoyer le message',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Configuration',
        order: 8
      }
    },
    {
      name: 'showMap',
      type: PropType.STRING,
      description: 'Afficher une carte',
      defaultValue: 'false',
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Carte',
        order: 9
      }
    },
    {
      name: 'mapPosition',
      type: PropType.STRING,
      description: 'Position de la carte',
      defaultValue: 'right',
      required: false,
      validation: {
        options: [
          { label: 'À droite', value: 'right' },
          { label: 'À gauche', value: 'left' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Carte',
        order: 10
      }
    },
    {
      name: 'mapAddress',
      type: PropType.STRING,
      description: 'Adresse pour la carte',
      defaultValue: '123 Rue de la Paix, 75001 Paris',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Adresse complète',
        group: 'Carte',
        order: 11
      }
    },
    {
      name: 'mapCoordinates',
      type: PropType.STRING,
      description: 'Coordonnées GPS (lat, lng)',
      defaultValue: JSON.stringify({ lat: 48.8566, lng: 2.3522 }),
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        helpText: 'Format: {"lat": 48.8566, "lng": 2.3522}',
        group: 'Carte',
        order: 12
      }
    },
    {
      name: 'showSocialLinks',
      type: PropType.STRING,
      description: 'Afficher les liens sociaux',
      defaultValue: 'true',
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 9
      }
    },
    {
      name: 'socialLinks',
      type: PropType.STRING,
      description: 'Liens sociaux',
      defaultValue: JSON.stringify([
        { platform: 'facebook', url: '#', icon: 'facebook' },
        { platform: 'instagram', url: '#', icon: 'instagram' },
        { platform: 'linkedin', url: '#', icon: 'linkedin' }
      ]),
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        helpText: 'Format JSON: [{platform, url, icon}, ...]',
        group: 'Options',
        order: 10
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    title: 'Parlons de votre projet',
    subtitle: 'Nous vous répondons sous 24h',
    submitText: 'Envoyer le message',
    showSocialLinks: true
  }
};

export function renderContactUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    backgroundColor = 'transparent',
    backgroundGradient = '',
    title = 'Parlons de votre projet',
    subtitle = '',
    recipientEmail = '',
    fields = [],
    submitText = 'Envoyer le message',
    showMap = false,
    mapPosition = 'right',
    mapAddress = '123 Rue de la Paix, 75001 Paris',
    mapCoordinates = { lat: 48.8566, lng: 2.3522 },
    showSocialLinks = true,
    socialLinks = []
  } = props;

  // Parse fields if string
  const fieldsList = typeof fields === 'string' ? JSON.parse(fields) : fields;
  const socialLinksList = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks;
  const mapCoords = typeof mapCoordinates === 'string' ? JSON.parse(mapCoordinates) : mapCoordinates;

  // Generate form HTML
  const generateFormField = (field: any, index: number) => {
    // Generate name if not provided
    const fieldName = field.name || field.label?.toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '') || `field_${index}`;
    
    const fieldId = `field-${fieldName}`;
    
    if (field.type === 'textarea') {
      return `
        <div class="form-field">
          <label for="${fieldId}" class="form-label">
            ${field.icon ? `<svg class="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-${field.icon}"/></svg>` : ''}
            ${field.label}
            ${field.required ? '<span class="required">*</span>' : ''}
          </label>
          <textarea
            id="${fieldId}"
            name="${fieldName}"
            class="form-textarea"
            rows="${field.rows || 4}"
            placeholder="${field.placeholder || ''}"
            ${field.required ? 'required' : ''}
          ></textarea>
        </div>
      `;
    }
    
    return `
      <div class="form-field">
        <label for="${fieldId}" class="form-label">
          ${field.icon ? `<svg class="form-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-${field.icon}"/></svg>` : ''}
          ${field.label}
          ${field.required ? '<span class="required">*</span>' : ''}
        </label>
        <input
          type="${field.type}"
          id="${fieldId}"
          name="${fieldName}"
          class="form-input"
          placeholder="${field.placeholder || ''}"
          ${field.required ? 'required' : ''}
        />
      </div>
    `;
  };

  // Background styles
  const backgroundStyle = backgroundColor !== 'transparent' ? `background-color: ${backgroundColor};` : '';
  const gradientClass = backgroundGradient ? `gradient-${backgroundGradient}` : '';

  const html = `
    <!-- SVG Icons Definition -->
    <svg style="display: none;">
      <symbol id="icon-user" viewBox="0 0 24 24">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </symbol>
      <symbol id="icon-mail" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </symbol>
      <symbol id="icon-phone" viewBox="0 0 24 24">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </symbol>
      <symbol id="icon-message-circle" viewBox="0 0 24 24">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </symbol>
      <symbol id="icon-edit" viewBox="0 0 24 24">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </symbol>
      <symbol id="icon-send" viewBox="0 0 24 24">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
      </symbol>
      <symbol id="icon-facebook" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </symbol>
      <symbol id="icon-instagram" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </symbol>
      <symbol id="icon-linkedin" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </symbol>
      <symbol id="icon-calendar" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </symbol>
      <symbol id="icon-map-pin" viewBox="0 0 24 24">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </symbol>
      <symbol id="icon-briefcase" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </symbol>
      <symbol id="icon-home" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </symbol>
    </svg>

    <section class="contact-ultra ${variant} ${gradientClass}" style="${backgroundStyle}">
      ${variant === 'particles' ? '<div class="particles-bg"></div>' : ''}
      
      <div class="container">
        ${showMap && !variant.includes('split-screen') ? `
          <div class="contact-with-map ${mapPosition === 'left' ? 'map-left' : 'map-right'}">
        ` : `
          <div class="contact-wrapper">
        `}
          
          ${showMap && mapPosition === 'left' ? `
            <div class="contact-map-wrapper">
              <div class="contact-map" id="contact-map-${Date.now()}" data-lat="${mapCoords.lat}" data-lng="${mapCoords.lng}">
                <div class="map-loading">
                  <div class="map-spinner"></div>
                  <p>Chargement de la carte...</p>
                </div>
              </div>
              <div class="map-info">
                <svg class="map-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>${mapAddress}</p>
              </div>
            </div>
          ` : ''}
          
          <div class="contact-content">
            <div class="contact-header">
              ${title ? `<h2 class="contact-title">${title}</h2>` : ''}
              ${subtitle ? `<p class="contact-subtitle">${subtitle}</p>` : ''}
              
              ${showSocialLinks && socialLinksList.length > 0 ? `
                <div class="social-links">
                  ${socialLinksList.map((link: any) => `
                    <a href="${link.url}" class="social-link" aria-label="${link.platform}">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <use href="#icon-${link.icon}"/>
                      </svg>
                    </a>
                  `).join('')}
                </div>
              ` : ''}
            </div>
            
            <form class="contact-form" action="/api/contact" method="POST" data-recipient="${recipientEmail}">
              <div class="form-grid">
                ${fieldsList.map((field: any, index: number) => generateFormField(field, index)).join('')}
              </div>
              
              <button type="submit" class="submit-button">
                <span>${submitText}</span>
                <svg class="submit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <use href="#icon-send"/>
                </svg>
              </button>
              
              <div class="form-message" style="display: none;"></div>
            </form>
          </div>
          
          ${showMap && mapPosition === 'right' ? `
            <div class="contact-map-wrapper">
              <div class="contact-map" id="contact-map-${Date.now()}" data-lat="${mapCoords.lat}" data-lng="${mapCoords.lng}">
                <div class="map-loading">
                  <div class="map-spinner"></div>
                  <p>Chargement de la carte...</p>
                </div>
              </div>
              <div class="map-info">
                <svg class="map-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <p>${mapAddress}</p>
              </div>
            </div>
          ` : ''}
          
          ${variant === 'split-screen' && !showMap ? `
            <div class="contact-visual">
              <div class="visual-content">
                <div class="visual-shape shape-1"></div>
                <div class="visual-shape shape-2"></div>
                <div class="visual-shape shape-3"></div>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </section>
  `;

  const css = `
    /* Base Styles */
    .contact-ultra {
      position: relative;
      padding: 80px 0;
      overflow: hidden;
      background: var(--color-background, #fff);
    }
    
    .contact-ultra .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    .contact-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 600px;
    }
    
    .contact-content {
      width: 100%;
      max-width: 600px;
    }
    
    .contact-header {
      text-align: center;
      margin-bottom: 40px;
    }
    
    .contact-title {
      font-family: var(--font-primary);
      font-size: clamp(32px, 5vw, 48px);
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 16px;
      line-height: 1.2;
    }
    
    .contact-subtitle {
      font-family: var(--font-secondary);
      font-size: 18px;
      color: var(--color-text-secondary, #666);
      margin: 0 0 24px;
      opacity: 0.8;
    }
    
    /* Social Links */
    .social-links {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 24px;
    }
    
    .social-link {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
      color: var(--color-primary, #007bff);
      transition: all 0.3s ease;
    }
    
    .social-link:hover {
      background: var(--color-primary);
      color: white;
      transform: translateY(-2px);
    }
    
    /* Form Styles */
    .contact-form {
      width: 100%;
    }
    
    .form-grid {
      display: grid;
      gap: 24px;
      margin-bottom: 32px;
    }
    
    .form-field {
      position: relative;
    }
    
    .form-label {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-secondary);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-text, #111);
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .form-icon {
      width: 20px;
      height: 20px;
      opacity: 0.5;
    }
    
    .required {
      color: var(--color-error, #dc3545);
    }
    
    .form-input,
    .form-textarea {
      width: 100%;
      padding: 16px 20px;
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text, #111);
      background: rgba(var(--color-background-rgb, 255, 255, 255), 0.8);
      border: 2px solid transparent;
      border-radius: 12px;
      outline: none;
      transition: all 0.3s ease;
    }
    
    .form-textarea {
      resize: vertical;
      min-height: 120px;
    }
    
    .form-input:focus,
    .form-textarea:focus {
      border-color: var(--color-primary, #007bff);
      background: var(--color-background, #fff);
      box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
    }
    
    /* Submit Button */
    .submit-button {
      width: 100%;
      padding: 18px 32px;
      font-family: var(--font-primary);
      font-size: 18px;
      font-weight: 600;
      color: white;
      background: var(--color-primary, #007bff);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .submit-button::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .submit-button:hover::before {
      width: 300%;
      height: 300%;
    }
    
    .submit-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(var(--color-primary-rgb, 0, 123, 255), 0.3);
    }
    
    .submit-icon {
      transition: transform 0.3s ease;
    }
    
    .submit-button:hover .submit-icon {
      transform: translateX(5px);
    }
    
    /* Map Styles */
    .contact-with-map {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: stretch;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .contact-with-map.map-left {
      grid-template-columns: 1fr 1fr;
    }
    
    .contact-with-map .contact-content {
      max-width: none;
    }
    
    .contact-map-wrapper {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .contact-map {
      width: 100%;
      height: 400px;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      background: var(--color-background-alt, #f5f5f5);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .map-loading {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: var(--color-background, #fff);
      color: var(--color-text-secondary, #666);
    }
    
    .map-spinner {
      width: 48px;
      height: 48px;
      border: 3px solid var(--color-border, #e0e0e0);
      border-top-color: var(--color-primary, #007bff);
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .map-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 20px;
      background: var(--color-background, #fff);
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    }
    
    .map-icon {
      color: var(--color-primary, #007bff);
      flex-shrink: 0;
    }
    
    .map-info p {
      margin: 0;
      font-family: var(--font-secondary);
      color: var(--color-text, #111);
    }
    
    /* Form Message */
    .form-message {
      margin-top: 20px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      text-align: center;
      display: none;
    }
    
    .form-message.success {
      background: rgba(var(--color-success-rgb, 40, 167, 69), 0.1);
      color: var(--color-success, #28a745);
      border: 1px solid var(--color-success);
    }
    
    .form-message.error {
      background: rgba(var(--color-error-rgb, 220, 53, 69), 0.1);
      color: var(--color-error, #dc3545);
      border: 1px solid var(--color-error);
    }
    
    /* Gradient Backgrounds */
    .gradient-purple-blue {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
    }
    
    .gradient-orange-pink {
      background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    }
    
    .gradient-green-blue {
      background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    }
    
    .gradient-red-purple {
      background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    }
    
    /* Variant: Glassmorphism */
    .glassmorphism {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
    }
    
    .glassmorphism .contact-content {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .glassmorphism .contact-title,
    .glassmorphism .contact-subtitle,
    .glassmorphism .form-label {
      color: white;
    }
    
    .glassmorphism .form-input,
    .glassmorphism .form-textarea {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .glassmorphism .form-input::placeholder,
    .glassmorphism .form-textarea::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
    
    .glassmorphism .social-link {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    /* Variant: Gradient Wave */
    .gradient-wave {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }
    
    .gradient-wave::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,133.3C960,128,1056,96,1152,90.7C1248,85,1344,107,1392,117.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") no-repeat bottom;
      background-size: cover;
    }
    
    /* Variant: Floating Cards */
    .floating-cards .contact-content {
      background: white;
      border-radius: 20px;
      padding: 48px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    .floating-cards::before,
    .floating-cards::after {
      content: '';
      position: absolute;
      border-radius: 20px;
      opacity: 0.1;
    }
    
    .floating-cards::before {
      top: -5%;
      left: 10%;
      width: 300px;
      height: 300px;
      background: var(--color-primary, #007bff);
      animation: float 6s ease-in-out infinite;
    }
    
    .floating-cards::after {
      bottom: -5%;
      right: 10%;
      width: 200px;
      height: 200px;
      background: var(--color-secondary, #6c757d);
      animation: float 8s ease-in-out infinite reverse;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50% { transform: translateY(-20px) rotate(10deg); }
    }
    
    /* Variant: Neon Glow */
    .neon-glow {
      background: #0a0a0a;
    }
    
    .neon-glow .contact-content {
      border: 2px solid var(--color-primary, #007bff);
      border-radius: 20px;
      padding: 48px;
      position: relative;
      box-shadow: 
        0 0 20px var(--color-primary),
        inset 0 0 20px rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
    }
    
    .neon-glow .contact-title {
      color: white;
      text-shadow: 0 0 20px var(--color-primary);
    }
    
    .neon-glow .contact-subtitle,
    .neon-glow .form-label {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .neon-glow .form-input,
    .neon-glow .form-textarea {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(var(--color-primary-rgb, 0, 123, 255), 0.3);
      color: white;
    }
    
    .neon-glow .form-input:focus,
    .neon-glow .form-textarea:focus {
      border-color: var(--color-primary);
      box-shadow: 0 0 10px var(--color-primary);
    }
    
    .neon-glow .submit-button {
      box-shadow: 0 0 20px var(--color-primary);
    }
    
    /* Map in variants */
    .glassmorphism .contact-map,
    .gradient-wave .contact-map,
    .floating-cards .contact-map,
    .neon-glow .contact-map,
    .minimal-luxe .contact-map,
    .particles .contact-map,
    .3d-perspective .contact-map {
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .glassmorphism .map-info,
    .particles .map-info,
    .neon-glow .map-info {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .glassmorphism .map-info p,
    .particles .map-info p,
    .neon-glow .map-info p {
      color: white;
    }
    
    /* Variant: Minimal Luxe */
    .minimal-luxe {
      background: #fafafa;
    }
    
    .minimal-luxe .contact-content {
      background: white;
      padding: 64px;
      border-radius: 0;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    }
    
    .minimal-luxe .contact-title {
      font-weight: 300;
      letter-spacing: -1px;
    }
    
    .minimal-luxe .form-input,
    .minimal-luxe .form-textarea {
      border: none;
      border-bottom: 2px solid #e0e0e0;
      border-radius: 0;
      padding-left: 0;
      padding-right: 0;
      background: transparent;
    }
    
    .minimal-luxe .form-input:focus,
    .minimal-luxe .form-textarea:focus {
      border-bottom-color: var(--color-primary);
      box-shadow: none;
    }
    
    .minimal-luxe .submit-button {
      background: #111;
      border-radius: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-size: 14px;
    }
    
    /* Variant: Split Screen */
    .split-screen .contact-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .split-screen .contact-content {
      padding: 48px;
      max-width: none;
    }
    
    .split-screen .contact-visual {
      background: linear-gradient(135deg, var(--color-primary, #007bff) 0%, var(--color-secondary, #6c757d) 100%);
      position: relative;
      overflow: hidden;
    }
    
    .visual-content {
      position: relative;
      width: 100%;
      height: 100%;
    }
    
    .visual-shape {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;
    }
    
    .shape-1 {
      width: 300px;
      height: 300px;
      background: white;
      top: -150px;
      right: -150px;
      animation: rotate 20s linear infinite;
    }
    
    .shape-2 {
      width: 200px;
      height: 200px;
      background: white;
      bottom: -100px;
      left: -100px;
      animation: rotate 15s linear infinite reverse;
    }
    
    .shape-3 {
      width: 150px;
      height: 150px;
      background: white;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: pulse 4s ease-in-out infinite;
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes pulse {
      0%, 100% { transform: translate(-50%, -50%) scale(1); }
      50% { transform: translate(-50%, -50%) scale(1.2); }
    }
    
    /* Variant: Particles */
    .particles {
      background: #1a1a2e;
      position: relative;
    }
    
    .particles-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .particles-bg::before {
      content: '';
      position: absolute;
      width: 2px;
      height: 2px;
      background: white;
      box-shadow: 
        100px 100px white,
        200px 150px white,
        300px 50px white,
        400px 200px white,
        500px 100px white,
        600px 150px white,
        700px 80px white,
        800px 180px white,
        900px 120px white,
        1000px 160px white;
      animation: particles 10s linear infinite;
    }
    
    @keyframes particles {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100vh); opacity: 0; }
    }
    
    .particles .contact-content {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 48px;
    }
    
    .particles .contact-title,
    .particles .contact-subtitle,
    .particles .form-label {
      color: white;
    }
    
    /* Variant: 3D Perspective */
    .3d-perspective {
      perspective: 1000px;
    }
    
    .3d-perspective .contact-content {
      background: white;
      padding: 48px;
      border-radius: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      transform: rotateX(5deg) rotateY(-5deg);
      transition: transform 0.3s ease;
    }
    
    .3d-perspective .contact-content:hover {
      transform: rotateX(0) rotateY(0);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .contact-ultra {
        padding: 60px 0;
      }
      
      .contact-content {
        padding: 32px 24px;
      }
      
      .glassmorphism .contact-content,
      .floating-cards .contact-content,
      .minimal-luxe .contact-content,
      .particles .contact-content,
      .3d-perspective .contact-content {
        padding: 32px 24px;
      }
      
      .contact-title {
        font-size: 28px;
      }
      
      .contact-with-map {
        grid-template-columns: 1fr;
        gap: 30px;
      }
      
      .contact-map {
        height: 300px;
      }
      
      .split-screen .contact-wrapper {
        grid-template-columns: 1fr;
      }
      
      .split-screen .contact-visual {
        height: 200px;
        order: -1;
      }
      
      .form-input,
      .form-textarea {
        padding: 14px 16px;
      }
      
      .submit-button {
        padding: 16px 24px;
        font-size: 16px;
      }
    }
    
    @media (max-width: 480px) {
      .contact-ultra {
        padding: 40px 0;
      }
      
      .contact-content {
        padding: 24px 16px;
      }
      
      .contact-title {
        font-size: 24px;
      }
      
      .contact-subtitle {
        font-size: 16px;
      }
      
      .social-links {
        gap: 12px;
      }
      
      .social-link {
        width: 40px;
        height: 40px;
      }
    }
  `;

  const js = `
    (function() {
      const forms = document.querySelectorAll('.contact-ultra .contact-form');
      
      forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          
          const submitButton = form.querySelector('.submit-button');
          const message = form.querySelector('.form-message');
          const recipientEmail = form.dataset.recipient;
          
          // Disable button
          submitButton.disabled = true;
          submitButton.innerHTML = '<span>Envoi en cours...</span>';
          
          // Get form data
          const formData = new FormData(form);
          const data = Object.fromEntries(formData);
          data.recipientEmail = recipientEmail;
          
          try {
            const response = await fetch('/api/contact', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
            });
            
            if (response.ok) {
              message.className = 'form-message success';
              message.textContent = 'Message envoyé avec succès! Nous vous répondrons sous 24h.';
              message.style.display = 'block';
              form.reset();
            } else {
              throw new Error('Erreur lors de l\\'envoi');
            }
          } catch (error) {
            message.className = 'form-message error';
            message.textContent = 'Erreur lors de l\\'envoi. Veuillez réessayer.';
            message.style.display = 'block';
          } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>${submitText}</span><svg class="submit-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><use href="#icon-send"/></svg>';
          }
        });
      });
      
      // Particles animation for particles variant
      const particlesSection = document.querySelector('.contact-ultra.particles');
      if (particlesSection) {
        const particlesBg = particlesSection.querySelector('.particles-bg');
        
        // Create more particles
        for (let i = 0; i < 50; i++) {
          const particle = document.createElement('div');
          particle.style.position = 'absolute';
          particle.style.width = '2px';
          particle.style.height = '2px';
          particle.style.background = 'white';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.opacity = Math.random();
          particle.style.animation = \`particles \${10 + Math.random() * 20}s linear infinite\`;
          particle.style.animationDelay = Math.random() * 10 + 's';
          particlesBg.appendChild(particle);
        }
      }
    })();
    
    // Map functionality - Simplified version
    ${showMap ? `
    (function() {
      // Load Google Maps
      function loadMap() {
        // Check if already loaded
        if (window.google && window.google.maps) {
          initMap();
          return;
        }
        
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
          // Wait for it to load
          existingScript.addEventListener('load', initMap);
          // Check if already loaded
          setTimeout(() => {
            if (window.google && window.google.maps) {
              initMap();
            }
          }, 100);
          return;
        }
        
        // Create script
        const script = document.createElement('script');
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCESD10stchdA2iIYB2iQqtfB1YNH1G4wc';
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);
      }
      
      // Initialize map
      function initMap() {
        const mapEl = document.querySelector('.contact-ultra .contact-map');
        if (!mapEl || mapEl.dataset.initialized === 'true') return;
        
        const lat = parseFloat(mapEl.dataset.lat || '48.8566');
        const lng = parseFloat(mapEl.dataset.lng || '2.3522');
        
        // Hide loading
        const loading = mapEl.querySelector('.map-loading');
        if (loading) loading.style.display = 'none';
        
        // Create map
        const map = new google.maps.Map(mapEl, {
          center: { lat, lng },
          zoom: 15
        });
        
        // Add marker
        new google.maps.Marker({
          position: { lat, lng },
          map: map
        });
        
        mapEl.dataset.initialized = 'true';
      }
      
      // Start loading
      if (document.readyState === 'complete') {
        loadMap();
      } else {
        window.addEventListener('load', loadMap);
      }
    })();
    ` : ''}
  `;

  return {
    html,
    css,
    js,
    dependencies: []
  };
}