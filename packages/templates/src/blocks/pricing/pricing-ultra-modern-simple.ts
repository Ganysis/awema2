import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * Pricing Ultra-Moderne Simplifié - Interface ergonomique
 * 3 forfaits fixes avec tous les champs visibles
 */
export const pricingUltraModernSimple: Block = {
  id: 'pricing-ultra-modern-simple',
  name: 'Pricing Ultra-Moderne Simple',
  description: 'Tables de prix avec interface simplifiée et 8 designs époustouflants',
  category: BlockCategory.PRICING,
  tags: ['pricing', 'modern', 'animated', '3d', 'interactive'],
  thumbnail: '/blocks/pricing-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  render: renderPricingUltraModernSimple,
  
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
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section',
      defaultValue: 'Nos Tarifs',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'Contenu',
        order: 2
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
        order: 3
      }
    },
    // FORFAIT 1
    {
      name: 'plan1Title',
      type: PropType.STRING,
      description: 'Titre du forfait',
      defaultValue: 'Essentiel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '💼 Forfait 1',
        order: 10
      }
    },
    {
      name: 'plan1Price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 50,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: '💼 Forfait 1',
        order: 11
      }
    },
    {
      name: 'plan1Unit',
      type: PropType.STRING,
      description: 'Unité de prix',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: '💼 Forfait 1',
        order: 12,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix unique', value: '' }
        ]
      }
    },
    {
      name: 'plan1Description',
      type: PropType.STRING,
      description: 'Description courte',
      defaultValue: 'Pour les petits besoins',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '💼 Forfait 1',
        order: 13
      }
    },
    {
      name: 'plan1Features',
      type: PropType.STRING,
      description: 'Fonctionnalités (une par ligne)',
      defaultValue: 'Intervention sous 48h\nDevis gratuit\nGarantie 1 an\nSupport par email',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: '💼 Forfait 1',
        order: 14,
        rows: 6
      }
    },
    {
      name: 'plan1Button',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Choisir ce forfait',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '💼 Forfait 1',
        order: 15
      }
    },
    // FORFAIT 2
    {
      name: 'plan2Title',
      type: PropType.STRING,
      description: 'Titre du forfait',
      defaultValue: 'Professionnel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '⭐ Forfait 2 (Populaire)',
        order: 20
      }
    },
    {
      name: 'plan2Price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 99,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: '⭐ Forfait 2 (Populaire)',
        order: 21
      }
    },
    {
      name: 'plan2Unit',
      type: PropType.STRING,
      description: 'Unité de prix',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: '⭐ Forfait 2 (Populaire)',
        order: 22,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix unique', value: '' }
        ]
      }
    },
    {
      name: 'plan2Description',
      type: PropType.STRING,
      description: 'Description courte',
      defaultValue: 'Le plus populaire',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '⭐ Forfait 2 (Populaire)',
        order: 23
      }
    },
    {
      name: 'plan2Features',
      type: PropType.STRING,
      description: 'Fonctionnalités (une par ligne)',
      defaultValue: 'Intervention sous 24h\nDevis gratuit\nGarantie 2 ans\nSupport prioritaire\nMaintenance préventive\nRapport mensuel',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: '⭐ Forfait 2 (Populaire)',
        order: 24,
        rows: 6
      }
    },
    {
      name: 'plan2Button',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Choisir ce forfait',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '⭐ Forfait 2 (Populaire)',
        order: 25
      }
    },
    {
      name: 'plan2Highlighted',
      type: PropType.BOOLEAN,
      description: 'Mettre en avant ce forfait',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: '⭐ Forfait 2 (Populaire)',
        order: 26
      }
    },
    {
      name: 'plan2Badge',
      type: PropType.STRING,
      description: 'Badge (ex: Populaire)',
      defaultValue: 'Populaire',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '⭐ Forfait 2 (Populaire)',
        order: 27
      }
    },
    // FORFAIT 3
    {
      name: 'plan3Title',
      type: PropType.STRING,
      description: 'Titre du forfait',
      defaultValue: 'Enterprise',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '🏢 Forfait 3',
        order: 30
      }
    },
    {
      name: 'plan3Price',
      type: PropType.NUMBER,
      description: 'Prix',
      defaultValue: 199,
      required: false,
      editorConfig: {
        control: EditorControl.NUMBER,
        group: '🏢 Forfait 3',
        order: 31
      }
    },
    {
      name: 'plan3Unit',
      type: PropType.STRING,
      description: 'Unité de prix',
      defaultValue: '/mois',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: '🏢 Forfait 3',
        order: 32,
        options: [
          { label: 'Par mois', value: '/mois' },
          { label: 'Par an', value: '/an' },
          { label: 'Par intervention', value: '/intervention' },
          { label: 'Prix unique', value: '' }
        ]
      }
    },
    {
      name: 'plan3Description',
      type: PropType.STRING,
      description: 'Description courte',
      defaultValue: 'Pour les grandes structures',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '🏢 Forfait 3',
        order: 33
      }
    },
    {
      name: 'plan3Features',
      type: PropType.STRING,
      description: 'Fonctionnalités (une par ligne)',
      defaultValue: 'Intervention immédiate\nDevis gratuit\nGarantie 5 ans\nSupport 24/7\nMaintenance préventive\nRapport hebdomadaire\nTechnicien dédié\nFormation équipe',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: '🏢 Forfait 3',
        order: 34,
        rows: 6
      }
    },
    {
      name: 'plan3Button',
      type: PropType.STRING,
      description: 'Texte du bouton',
      defaultValue: 'Nous contacter',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: '🏢 Forfait 3',
        order: 35
      }
    },
    {
      name: 'currency',
      type: PropType.STRING,
      description: 'Devise',
      defaultValue: '€',
      required: false,
      editorConfig: {
        control: EditorControl.SELECT,
        group: 'Options',
        order: 40,
        options: [
          { label: 'Euro (€)', value: '€' },
          { label: 'Dollar ($)', value: '$' },
          { label: 'Livre (£)', value: '£' }
        ]
      }
    },
    {
      name: 'billingToggle',
      type: PropType.BOOLEAN,
      description: 'Afficher toggle mensuel/annuel',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 41
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
        group: 'Options',
        order: 42
      }
    }
  ],
  
  variants: [],
  defaultProps: {
    variant: 'glassmorphism',
    title: 'Nos Tarifs',
    currency: '€',
    billingToggle: true
  }
};

export function renderPricingUltraModernSimple(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const {
    variant = 'glassmorphism',
    title = 'Nos Tarifs',
    subtitle = '',
    // Plan 1
    plan1Title = 'Essentiel',
    plan1Price = 50,
    plan1Unit = '/mois',
    plan1Description = 'Pour les petits besoins',
    plan1Features = '',
    plan1Button = 'Choisir',
    // Plan 2
    plan2Title = 'Professionnel',
    plan2Price = 99,
    plan2Unit = '/mois',
    plan2Description = 'Le plus populaire',
    plan2Features = '',
    plan2Button = 'Choisir',
    plan2Highlighted = true,
    plan2Badge = 'Populaire',
    // Plan 3
    plan3Title = 'Enterprise',
    plan3Price = 199,
    plan3Unit = '/mois',
    plan3Description = 'Pour les grandes structures',
    plan3Features = '',
    plan3Button = 'Nous contacter',
    // Options
    currency = '€',
    billingToggle = true,
    annualDiscount = 20
  } = props;

  // Convert features strings to arrays
  const plan1FeaturesList = plan1Features.split('\n').filter((f: string) => f.trim());
  const plan2FeaturesList = plan2Features.split('\n').filter((f: string) => f.trim());
  const plan3FeaturesList = plan3Features.split('\n').filter((f: string) => f.trim());

  const css = `
    .pricing-ultra-modern-simple {
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
    
    /* Other variants... */
    
    @media (max-width: 768px) {
      .pricing-grid {
        grid-template-columns: 1fr;
      }
      
      .pricing-card.highlighted {
        transform: none;
      }
    }
  `;

  const html = `
    <section class="pricing-ultra-modern-simple variant-${variant}">
      ${title || subtitle ? `
        <div class="pricing-header">
          ${title ? `<h2 class="pricing-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="pricing-subtitle">${subtitle}</p>` : ''}
        </div>
      ` : ''}
      
      ${billingToggle ? `
        <div class="billing-toggle">
          <span class="billing-option active">Mensuel</span>
          <div class="toggle-switch" id="billing-toggle-simple">
            <div class="toggle-slider"></div>
          </div>
          <span class="billing-option">
            Annuel
            ${annualDiscount > 0 ? `<span class="discount-badge">-${annualDiscount}%</span>` : ''}
          </span>
        </div>
      ` : ''}
      
      <div class="pricing-container">
        <div class="pricing-grid">
          <!-- Plan 1 -->
          <div class="pricing-card">
            <h3 class="pricing-name">${plan1Title}</h3>
            <p class="pricing-description">${plan1Description}</p>
            
            <div class="pricing-price">
              <span class="pricing-currency">${currency}</span>
              <span class="pricing-amount" data-monthly="${plan1Price}" data-annual="${Math.round(plan1Price * 12 * (1 - annualDiscount / 100))}">${plan1Price}</span>
              <span class="pricing-unit">${plan1Unit}</span>
            </div>
            
            ${plan1FeaturesList.length > 0 ? `
              <ul class="pricing-features">
                ${plan1FeaturesList.map((feature: string) => `
                  <li class="pricing-feature">
                    <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>${feature}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            
            <a href="#contact" class="pricing-cta">${plan1Button}</a>
          </div>
          
          <!-- Plan 2 -->
          <div class="pricing-card ${plan2Highlighted ? 'highlighted' : ''}">
            ${plan2Badge && plan2Highlighted ? `<div class="pricing-badge">${plan2Badge}</div>` : ''}
            
            <h3 class="pricing-name">${plan2Title}</h3>
            <p class="pricing-description">${plan2Description}</p>
            
            <div class="pricing-price">
              <span class="pricing-currency">${currency}</span>
              <span class="pricing-amount" data-monthly="${plan2Price}" data-annual="${Math.round(plan2Price * 12 * (1 - annualDiscount / 100))}">${plan2Price}</span>
              <span class="pricing-unit">${plan2Unit}</span>
            </div>
            
            ${plan2FeaturesList.length > 0 ? `
              <ul class="pricing-features">
                ${plan2FeaturesList.map((feature: string) => `
                  <li class="pricing-feature">
                    <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>${feature}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            
            <a href="#contact" class="pricing-cta">${plan2Button}</a>
          </div>
          
          <!-- Plan 3 -->
          <div class="pricing-card">
            <h3 class="pricing-name">${plan3Title}</h3>
            <p class="pricing-description">${plan3Description}</p>
            
            <div class="pricing-price">
              <span class="pricing-currency">${currency}</span>
              <span class="pricing-amount" data-monthly="${plan3Price}" data-annual="${Math.round(plan3Price * 12 * (1 - annualDiscount / 100))}">${plan3Price}</span>
              <span class="pricing-unit">${plan3Unit}</span>
            </div>
            
            ${plan3FeaturesList.length > 0 ? `
              <ul class="pricing-features">
                ${plan3FeaturesList.map((feature: string) => `
                  <li class="pricing-feature">
                    <svg class="feature-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span>${feature}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
            
            <a href="#contact" class="pricing-cta">${plan3Button}</a>
          </div>
        </div>
      </div>
    </section>
  `;

  const js = billingToggle ? `
    // Billing toggle  
    const toggle = document.getElementById('billing-toggle-simple');
    let isAnnual = false;
    
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
  ` : '';

  return { html, css, js, dependencies: [] };
}