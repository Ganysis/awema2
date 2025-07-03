import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * CTA Ultra-Moderne - Cohérence visuelle avec Contact Ultra-Modern
 * 8 variantes identiques pour harmonie parfaite
 */
export const ctaUltraModern: Block = {
  id: 'cta-ultra-modern',
  name: 'CTA Ultra-Moderne',
  description: 'Appel à l\'action avec 8 designs magnifiques et animations avancées',
  category: BlockCategory.CTA,
  tags: ['cta', 'call-to-action', 'modern', 'animated', 'glassmorphism', 'gradient'],
  thumbnail: '/blocks/cta-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.LOW,
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel (même que Contact)',
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
      name: 'eyebrow',
      type: PropType.STRING,
      description: 'Texte au-dessus du titre',
      defaultValue: '🚀 Offre limitée',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Ex: Offre spéciale, Nouveau',
        group: 'Contenu',
        order: 4
      }
    },
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre principal',
      defaultValue: 'Prêt à transformer votre projet en réalité ?',
      required: true,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 5
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre',
      defaultValue: 'Contactez-nous aujourd\'hui et bénéficiez d\'un devis gratuit sous 24h',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 6
      }
    },
    {
      name: 'features',
      type: PropType.ARRAY,
      description: 'Points forts (optionnel)',
      defaultValue: [
        { icon: 'check', text: 'Devis gratuit' },
        { icon: 'clock', text: 'Réponse sous 24h' },
        { icon: 'shield', text: 'Garantie 2 ans' }
      ],
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        helpText: 'Ajoutez des points forts',
        group: 'Contenu',
        order: 7
      }
    },
    {
      name: 'primaryButton',
      type: PropType.OBJECT,
      description: 'Bouton principal',
      defaultValue: {
        text: 'Obtenir mon devis gratuit',
        link: '/contact',
        style: 'primary',
        icon: 'arrow-right'
      },
      required: true,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Boutons',
        order: 8
      }
    },
    {
      name: 'secondaryButton',
      type: PropType.OBJECT,
      description: 'Bouton secondaire',
      defaultValue: {
        text: 'Voir nos réalisations',
        link: '/portfolio',
        style: 'secondary',
        icon: 'external-link'
      },
      required: false,
      editorConfig: {
        control: EditorControl.MULTI_SELECT,
        group: 'Boutons',
        order: 9
      }
    },
    {
      name: 'showCountdown',
      type: PropType.STRING,
      description: 'Afficher un compte à rebours',
      defaultValue: 'false',
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 10
      }
    },
    {
      name: 'countdownDate',
      type: PropType.STRING,
      description: 'Date de fin (format: YYYY-MM-DD HH:MM)',
      defaultValue: '',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: '2024-12-31 23:59',
        helpText: 'Format: AAAA-MM-JJ HH:MM',
        group: 'Options',
        order: 11
      }
    },
    {
      name: 'urgencyText',
      type: PropType.STRING,
      description: 'Texte d\'urgence',
      defaultValue: '⏰ Offre valable jusqu\'au {date}',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Options',
        order: 12
      }
    },
    {
      name: 'animation',
      type: PropType.STRING,
      description: 'Animation du CTA',
      defaultValue: 'fade-up',
      required: false,
      validation: {
        options: [
          { value: 'none', label: 'Aucune' },
          { value: 'fade-up', label: 'Apparition du bas' },
          { value: 'fade-down', label: 'Apparition du haut' },
          { value: 'zoom-in', label: 'Zoom avant' },
          { value: 'slide-in', label: 'Glissement latéral' },
          { value: 'bounce', label: 'Rebond' }
        ]
      },
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Options',
        order: 13
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    title: 'Prêt à transformer votre projet en réalité ?',
    subtitle: 'Contactez-nous aujourd\'hui et bénéficiez d\'un devis gratuit sous 24h',
    primaryButton: {
      text: 'Obtenir mon devis gratuit',
      link: '/contact',
      style: 'primary'
    }
  }
};

export function renderCtaUltraModern(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    backgroundColor = 'transparent',
    backgroundGradient = '',
    eyebrow = '',
    title = 'Prêt à transformer votre projet en réalité ?',
    subtitle = '',
    features = [],
    primaryButton = { text: 'Obtenir mon devis', link: '/contact' },
    secondaryButton = null,
    showCountdown = false,
    countdownDate = '',
    urgencyText = '',
    animation = 'fade-up'
  } = props;

  // Parse arrays if needed
  const featuresList = typeof features === 'string' ? JSON.parse(features) : features;
  
  // Background styles
  const backgroundStyle = backgroundColor !== 'transparent' ? `background-color: ${backgroundColor};` : '';
  const gradientClass = backgroundGradient ? `gradient-${backgroundGradient}` : '';
  
  // Animation attributes
  const animationAttrs = animation !== 'none' ? `data-aos="${animation}" data-aos-duration="1000"` : '';

  const html = `
    <!-- SVG Icons Definition -->
    <svg style="display: none;">
      <symbol id="icon-check" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"></polyline>
      </symbol>
      <symbol id="icon-clock" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </symbol>
      <symbol id="icon-arrow-right" viewBox="0 0 24 24">
        <line x1="5" y1="12" x2="19" y2="12"></line>
        <polyline points="12 5 19 12 12 19"></polyline>
      </symbol>
      <symbol id="icon-external-link" viewBox="0 0 24 24">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
      </symbol>
      <symbol id="icon-star" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </symbol>
      <symbol id="icon-zap" viewBox="0 0 24 24">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </symbol>
    </svg>

    <section class="cta-ultra ${variant} ${gradientClass}" style="${backgroundStyle}" ${animationAttrs}>
      ${variant === 'particles' ? '<div class="particles-bg"></div>' : ''}
      
      <div class="container">
        <div class="cta-wrapper">
          ${variant === 'split-screen' ? `
            <div class="cta-visual">
              <div class="visual-content">
                <div class="visual-shape shape-1"></div>
                <div class="visual-shape shape-2"></div>
                <div class="visual-shape shape-3"></div>
              </div>
            </div>
          ` : ''}
          
          <div class="cta-content">
            ${eyebrow ? `<div class="cta-eyebrow">${eyebrow}</div>` : ''}
            
            ${title ? `<h2 class="cta-title">${title}</h2>` : ''}
            
            ${subtitle ? `<p class="cta-subtitle">${subtitle}</p>` : ''}
            
            ${featuresList.length > 0 ? `
              <ul class="cta-features">
                ${featuresList.map((feature: any) => `
                  <li class="cta-feature">
                    <svg class="feature-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <use href="#icon-${feature.icon || 'check'}"/>
                    </svg>
                    <span>${feature.text}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            
            ${showCountdown && countdownDate ? `
              <div class="cta-countdown" data-countdown="${countdownDate}">
                <div class="countdown-item">
                  <span class="countdown-value" data-days>00</span>
                  <span class="countdown-label">Jours</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value" data-hours>00</span>
                  <span class="countdown-label">Heures</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value" data-minutes>00</span>
                  <span class="countdown-label">Minutes</span>
                </div>
                <div class="countdown-item">
                  <span class="countdown-value" data-seconds>00</span>
                  <span class="countdown-label">Secondes</span>
                </div>
              </div>
              ${urgencyText ? `<p class="cta-urgency">${urgencyText}</p>` : ''}
            ` : ''}
            
            <div class="cta-buttons">
              ${primaryButton ? `
                <a href="${primaryButton.link}" class="cta-button primary">
                  <span>${primaryButton.text}</span>
                  ${primaryButton.icon ? `
                    <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <use href="#icon-${primaryButton.icon}"/>
                    </svg>
                  ` : ''}
                </a>
              ` : ''}
              
              ${secondaryButton ? `
                <a href="${secondaryButton.link}" class="cta-button secondary">
                  <span>${secondaryButton.text}</span>
                  ${secondaryButton.icon ? `
                    <svg class="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <use href="#icon-${secondaryButton.icon}"/>
                    </svg>
                  ` : ''}
                </a>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  const css = `
    /* Base Styles - Cohérence avec Contact Ultra-Modern */
    .cta-ultra {
      position: relative;
      padding: 80px 0;
      overflow: hidden;
      background: var(--color-background, #fff);
    }
    
    .cta-ultra .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      position: relative;
      z-index: 1;
    }
    
    .cta-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
    }
    
    .cta-content {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }
    
    /* Typography - Utilise les variables globales */
    .cta-eyebrow {
      display: inline-block;
      font-family: var(--font-secondary);
      font-size: 14px;
      font-weight: 600;
      color: var(--color-primary, #007bff);
      background: rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
      padding: 6px 16px;
      border-radius: 30px;
      margin-bottom: 20px;
      letter-spacing: 0.5px;
    }
    
    .cta-title {
      font-family: var(--font-primary);
      font-size: clamp(36px, 6vw, 56px);
      font-weight: 700;
      color: var(--color-text, #111);
      margin: 0 0 20px;
      line-height: 1.1;
    }
    
    .cta-subtitle {
      font-family: var(--font-secondary);
      font-size: 20px;
      color: var(--color-text-secondary, #666);
      margin: 0 0 30px;
      opacity: 0.9;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }
    
    /* Features */
    .cta-features {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 24px;
      list-style: none;
      padding: 0;
      margin: 0 0 40px;
    }
    
    .cta-feature {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-text, #111);
    }
    
    .feature-icon {
      color: var(--color-primary, #007bff);
      flex-shrink: 0;
    }
    
    /* Countdown */
    .cta-countdown {
      display: flex;
      justify-content: center;
      gap: 24px;
      margin: 30px 0;
    }
    
    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: rgba(var(--color-primary-rgb, 0, 123, 255), 0.05);
      border-radius: 12px;
      min-width: 80px;
    }
    
    .countdown-value {
      font-family: var(--font-primary);
      font-size: 36px;
      font-weight: 700;
      color: var(--color-primary, #007bff);
      line-height: 1;
    }
    
    .countdown-label {
      font-family: var(--font-secondary);
      font-size: 12px;
      color: var(--color-text-secondary, #666);
      margin-top: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .cta-urgency {
      font-family: var(--font-secondary);
      font-size: 16px;
      color: var(--color-error, #dc3545);
      margin: 20px 0;
      font-weight: 600;
    }
    
    /* Buttons */
    .cta-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      margin-top: 40px;
    }
    
    .cta-button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 18px 32px;
      font-family: var(--font-primary);
      font-size: 18px;
      font-weight: 600;
      border-radius: 12px;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .cta-button.primary {
      background: var(--color-primary, #007bff);
      color: white;
      box-shadow: 0 4px 20px rgba(var(--color-primary-rgb, 0, 123, 255), 0.3);
    }
    
    .cta-button.primary::before {
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
    
    .cta-button.primary:hover::before {
      width: 300%;
      height: 300%;
    }
    
    .cta-button.primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 30px rgba(var(--color-primary-rgb, 0, 123, 255), 0.4);
    }
    
    .cta-button.secondary {
      background: transparent;
      color: var(--color-text, #111);
      border: 2px solid var(--color-border, #e0e0e0);
    }
    
    .cta-button.secondary:hover {
      background: var(--color-background-alt, #f5f5f5);
      border-color: var(--color-primary, #007bff);
      color: var(--color-primary, #007bff);
      transform: translateY(-2px);
    }
    
    .button-icon {
      transition: transform 0.3s ease;
    }
    
    .cta-button:hover .button-icon {
      transform: translateX(4px);
    }
    
    /* Gradient Backgrounds - Même que Contact */
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
    
    /* Variant: Glassmorphism - Identique à Contact */
    .glassmorphism {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
    }
    
    .glassmorphism .cta-content {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 24px;
      padding: 48px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .glassmorphism .cta-title,
    .glassmorphism .cta-subtitle,
    .glassmorphism .cta-feature {
      color: white;
    }
    
    .glassmorphism .cta-eyebrow {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    .glassmorphism .countdown-item {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .glassmorphism .countdown-value {
      color: white;
    }
    
    .glassmorphism .countdown-label {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .glassmorphism .cta-button.secondary {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: white;
    }
    
    .glassmorphism .cta-button.secondary:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: white;
    }
    
    /* Variant: Gradient Wave */
    .gradient-wave {
      background: linear-gradient(135deg, var(--color-primary, #667eea) 0%, var(--color-secondary, #764ba2) 100%);
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
    
    .gradient-wave .cta-title,
    .gradient-wave .cta-subtitle,
    .gradient-wave .cta-feature {
      color: white;
    }
    
    .gradient-wave .cta-eyebrow {
      background: rgba(255, 255, 255, 0.2);
      color: white;
    }
    
    /* Variant: Floating Cards */
    .floating-cards .cta-content {
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
      top: 10%;
      left: 5%;
      width: 250px;
      height: 250px;
      background: var(--color-primary, #007bff);
      animation: float 6s ease-in-out infinite;
    }
    
    .floating-cards::after {
      bottom: 10%;
      right: 5%;
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
    
    .neon-glow .cta-content {
      border: 2px solid var(--color-primary, #007bff);
      border-radius: 20px;
      padding: 48px;
      position: relative;
      box-shadow: 
        0 0 20px var(--color-primary),
        inset 0 0 20px rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
    }
    
    .neon-glow .cta-title {
      color: white;
      text-shadow: 0 0 20px var(--color-primary);
    }
    
    .neon-glow .cta-subtitle,
    .neon-glow .cta-feature {
      color: rgba(255, 255, 255, 0.8);
    }
    
    .neon-glow .cta-eyebrow {
      background: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      box-shadow: 0 0 10px var(--color-primary);
    }
    
    .neon-glow .countdown-item {
      background: rgba(var(--color-primary-rgb, 0, 123, 255), 0.1);
      border: 1px solid var(--color-primary);
      box-shadow: 0 0 10px var(--color-primary);
    }
    
    .neon-glow .countdown-value {
      color: var(--color-primary);
      text-shadow: 0 0 10px var(--color-primary);
    }
    
    .neon-glow .cta-button.primary {
      box-shadow: 0 0 20px var(--color-primary);
    }
    
    .neon-glow .cta-button.secondary {
      background: transparent;
      border: 1px solid var(--color-primary);
      color: var(--color-primary);
      box-shadow: 0 0 10px var(--color-primary);
    }
    
    /* Variant: Minimal Luxe */
    .minimal-luxe {
      background: #fafafa;
    }
    
    .minimal-luxe .cta-content {
      background: white;
      padding: 64px;
      border-radius: 0;
      box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
    }
    
    .minimal-luxe .cta-title {
      font-weight: 300;
      letter-spacing: -1px;
    }
    
    .minimal-luxe .cta-eyebrow {
      background: transparent;
      color: var(--color-text-secondary);
      padding: 0;
      margin-bottom: 40px;
      font-size: 12px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    
    .minimal-luxe .cta-button {
      border-radius: 0;
    }
    
    .minimal-luxe .cta-button.primary {
      background: #111;
      box-shadow: none;
    }
    
    .minimal-luxe .cta-button.primary:hover {
      background: #000;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }
    
    .minimal-luxe .cta-button.secondary {
      border-color: #111;
    }
    
    .minimal-luxe .countdown-item {
      background: transparent;
      border: 1px solid #e0e0e0;
      border-radius: 0;
    }
    
    /* Variant: Split Screen */
    .split-screen .cta-wrapper {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .split-screen .cta-content {
      padding: 48px;
      text-align: left;
      max-width: none;
    }
    
    .split-screen .cta-buttons {
      justify-content: flex-start;
    }
    
    .split-screen .cta-visual {
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
      animation: particles-float 10s linear infinite;
    }
    
    @keyframes particles-float {
      from { transform: translateY(0); opacity: 1; }
      to { transform: translateY(-100vh); opacity: 0; }
    }
    
    .particles .cta-content {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      padding: 48px;
    }
    
    .particles .cta-title,
    .particles .cta-subtitle,
    .particles .cta-feature {
      color: white;
    }
    
    .particles .cta-eyebrow {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .particles .countdown-item {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .particles .countdown-value {
      color: var(--color-primary, #007bff);
    }
    
    .particles .countdown-label {
      color: rgba(255, 255, 255, 0.6);
    }
    
    /* Variant: 3D Perspective */
    .3d-perspective {
      perspective: 1000px;
    }
    
    .3d-perspective .cta-content {
      background: white;
      padding: 48px;
      border-radius: 20px;
      box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
      transform: rotateX(5deg) rotateY(-5deg);
      transition: transform 0.3s ease;
    }
    
    .3d-perspective .cta-content:hover {
      transform: rotateX(0) rotateY(0);
    }
    
    /* Responsive */
    @media (max-width: 768px) {
      .cta-ultra {
        padding: 60px 0;
      }
      
      .cta-content {
        padding: 32px 24px;
      }
      
      .glassmorphism .cta-content,
      .floating-cards .cta-content,
      .neon-glow .cta-content,
      .minimal-luxe .cta-content,
      .particles .cta-content,
      .3d-perspective .cta-content {
        padding: 32px 24px;
      }
      
      .cta-title {
        font-size: 32px;
      }
      
      .cta-subtitle {
        font-size: 18px;
      }
      
      .split-screen .cta-wrapper {
        grid-template-columns: 1fr;
      }
      
      .split-screen .cta-content {
        text-align: center;
      }
      
      .split-screen .cta-buttons {
        justify-content: center;
      }
      
      .split-screen .cta-visual {
        height: 200px;
        order: -1;
      }
      
      .cta-features {
        flex-direction: column;
        align-items: center;
      }
      
      .cta-countdown {
        gap: 12px;
      }
      
      .countdown-item {
        padding: 12px;
        min-width: 60px;
      }
      
      .countdown-value {
        font-size: 28px;
      }
      
      .cta-buttons {
        flex-direction: column;
        width: 100%;
      }
      
      .cta-button {
        width: 100%;
        justify-content: center;
      }
    }
    
    @media (max-width: 480px) {
      .cta-ultra {
        padding: 40px 0;
      }
      
      .cta-title {
        font-size: 28px;
      }
      
      .cta-subtitle {
        font-size: 16px;
      }
      
      .cta-button {
        padding: 16px 24px;
        font-size: 16px;
      }
    }
  `;

  const js = `
    (function() {
      // Countdown functionality
      const countdownElements = document.querySelectorAll('.cta-countdown[data-countdown]');
      
      countdownElements.forEach(countdown => {
        const targetDate = new Date(countdown.dataset.countdown).getTime();
        
        function updateCountdown() {
          const now = new Date().getTime();
          const distance = targetDate - now;
          
          if (distance < 0) {
            countdown.style.display = 'none';
            const urgency = countdown.nextElementSibling;
            if (urgency && urgency.classList.contains('cta-urgency')) {
              urgency.textContent = 'Offre expirée';
            }
            return;
          }
          
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
          countdown.querySelector('[data-days]').textContent = String(days).padStart(2, '0');
          countdown.querySelector('[data-hours]').textContent = String(hours).padStart(2, '0');
          countdown.querySelector('[data-minutes]').textContent = String(minutes).padStart(2, '0');
          countdown.querySelector('[data-seconds]').textContent = String(seconds).padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
      });
      
      // Particles animation for particles variant
      const particlesSection = document.querySelector('.cta-ultra.particles');
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
          particle.style.animation = \`particles-float \${10 + Math.random() * 20}s linear infinite\`;
          particle.style.animationDelay = Math.random() * 10 + 's';
          particlesBg.appendChild(particle);
        }
      }
      
      // Button ripple effect
      const buttons = document.querySelectorAll('.cta-button');
      buttons.forEach(button => {
        button.addEventListener('click', function(e) {
          const ripple = document.createElement('span');
          ripple.classList.add('ripple');
          
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = x + 'px';
          ripple.style.top = y + 'px';
          
          this.appendChild(ripple);
          
          setTimeout(() => ripple.remove(), 600);
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