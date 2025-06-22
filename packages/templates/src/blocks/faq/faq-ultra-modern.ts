import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

/**
 * FAQ Ultra-Moderne AWEMA 2030
 * Système révolutionnaire avec 8 variantes ultra-modernes
 * Score cible: 9/10
 */
export const faqUltraModern: Block = {
  id: 'faq-ultra-modern',
  name: 'FAQ Ultra-Moderne',
  description: 'Système FAQ révolutionnaire avec 8 variantes ultra-modernes et fonctionnalités avancées',
  category: BlockCategory.FAQ,
  tags: ['faq', 'accordion', 'modern', 'interactive', 'glassmorphism', 'search', 'responsive'],
  thumbnail: '/blocks/faq-ultra-modern.jpg',
  performanceImpact: PerformanceImpact.LOW,
  variants: [],
  
  props: [
    {
      name: 'variant',
      type: PropType.STRING,
      description: 'Style visuel du FAQ',
      defaultValue: 'glassmorphism',
      required: true,
      validation: {
        options: [
          { label: 'Glassmorphism', value: 'glassmorphism' },
          { label: 'Cards Floating', value: 'floating-cards' },
          { label: 'Timeline Interactive', value: 'timeline' },
          { label: 'Tabs Moderne', value: 'modern-tabs' },
          { label: 'Search Powered', value: 'search-powered' },
          { label: 'Chat Style', value: 'chat-style' },
          { label: 'Minimal Luxe', value: 'minimal-luxe' },
          { label: 'Wave Motion', value: 'wave-motion' }
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
      defaultValue: 'Questions Fréquentes',
      required: true,
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
      defaultValue: 'Trouvez instantanément les réponses à vos questions',
      required: false,
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 3
      }
    },
    {
      name: 'questions',
      type: PropType.STRING,
      description: 'Questions et réponses',
      required: true,
      defaultValue: JSON.stringify([
        {
          id: 'delais',
          question: 'Quels sont vos délais d\'intervention ?',
          answer: 'Nous intervenons sous 24h pour les urgences et sous 3-5 jours pour les projets planifiés. Notre équipe réactive garantit une prise en charge rapide.',
          category: 'Délais',
          priority: 'high',
          keywords: ['délais', 'urgence', 'intervention', 'rapide']
        },
        {
          id: 'devis',
          question: 'Proposez-vous des devis gratuits ?',
          answer: 'Oui, tous nos devis sont 100% gratuits et sans engagement. Nous nous déplaçons gratuitement pour évaluer vos besoins et vous proposer la meilleure solution.',
          category: 'Tarifs',
          priority: 'high',
          keywords: ['devis', 'gratuit', 'tarif', 'prix']
        },
        {
          id: 'zones',
          question: 'Quelles sont vos zones d\'intervention ?',
          answer: 'Nous couvrons un rayon de 50km incluant toute la métropole. Contactez-nous pour confirmer si votre secteur est desservi.',
          category: 'Zones',
          priority: 'medium',
          keywords: ['zone', 'secteur', 'déplacement', 'métropole']
        },
        {
          id: 'garantie',
          question: 'Offrez-vous une garantie sur vos travaux ?',
          answer: 'Tous nos travaux sont garantis 2 ans pièces et main d\'œuvre. Nous utilisons uniquement des matériaux de qualité professionnelle.',
          category: 'Garantie',
          priority: 'medium',
          keywords: ['garantie', 'qualité', 'assurance', 'matériaux']
        },
        {
          id: 'urgence',
          question: 'Intervenez-vous en urgence ?',
          answer: 'Oui, nous avons un service d\'urgence 24h/7j pour les situations critiques. Un supplément de 30% s\'applique pour les interventions de nuit et weekend.',
          category: 'Urgence',
          priority: 'high',
          keywords: ['urgence', '24h', 'nuit', 'weekend', 'critique']
        }
      ]),
      validation: {
        max: 20
      },
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Contenu',
        order: 4,
        helpText: 'Format JSON avec id, question, answer, category, priority, keywords'
      }
    },
    {
      name: 'primaryColor',
      type: PropType.STRING,
      description: 'Couleur primaire',
      defaultValue: '#3B82F6',
      required: false,
      editorConfig: {
        control: EditorControl.COLOR_PICKER,
        group: 'Style',
        order: 5
      }
    },
    {
      name: 'enableSearch',
      type: PropType.BOOLEAN,
      description: 'Activer la recherche',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 6
      }
    },
    {
      name: 'enableCategories',
      type: PropType.BOOLEAN,
      description: 'Afficher les catégories',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Fonctionnalités',
        order: 7
      }
    },
    {
      name: 'showCTA',
      type: PropType.BOOLEAN,
      description: 'Afficher le CTA final',
      defaultValue: true,
      required: false,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'CTA',
        order: 8
      }
    },
    {
      name: 'ctaTitle',
      type: PropType.STRING,
      description: 'Titre du CTA',
      defaultValue: 'Vous ne trouvez pas votre réponse ?',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'CTA',
        order: 9
      }
    },
    {
      name: 'ctaButtonText',
      type: PropType.STRING,
      description: 'Texte du bouton CTA',
      defaultValue: 'Contactez-nous',
      required: false,
      editorConfig: {
        control: EditorControl.TEXT,
        group: 'CTA',
        order: 10
      }
    },
    {
      name: 'ctaButtonLink',
      type: PropType.STRING,
      description: 'Lien du bouton CTA',
      defaultValue: '#contact',
      required: false,
      editorConfig: {
        control: EditorControl.LINK_PICKER,
        group: 'CTA',
        order: 11
      }
    }
  ],

  defaultProps: {
    variant: 'glassmorphism',
    title: 'Questions Fréquentes',
    subtitle: 'Trouvez instantanément les réponses à vos questions',
    primaryColor: '#3B82F6',
    enableSearch: true,
    enableCategories: true,
    showCTA: true,
    ctaTitle: 'Vous ne trouvez pas votre réponse ?',
    ctaButtonText: 'Contactez-nous',
    ctaButtonLink: '#contact'
  }
};

/**
 * Fonction de rendu principale du bloc FAQ Ultra-Moderne
 */
export function renderFaqUltraModern(props: Record<string, any>): RenderedBlock {
  const questions = typeof props.questions === 'string' ? JSON.parse(props.questions) : props.questions;
  const categories = [...new Set(questions.map((q: any) => q.category))];
  
  // CSS Variables pour la personnalisation
  const cssVariables = `
    :root {
      --faq-primary: ${props.primaryColor || '#3B82F6'};
      --faq-primary-rgb: ${hexToRgb(props.primaryColor || '#3B82F6')};
      --faq-gradient: linear-gradient(135deg, var(--faq-primary) 0%, ${adjustColor(props.primaryColor || '#3B82F6', -20)} 100%);
      --faq-glass: rgba(255, 255, 255, 0.25);
      --faq-glass-border: rgba(255, 255, 255, 0.18);
      --faq-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
      --faq-backdrop: blur(8px);
    }
  `;

  // Fonctions de rendu pour chaque variante
  const getVariantHTML = (): string => {
    switch (props.variant) {
      case 'glassmorphism':
        return renderGlassmorphism();
      case 'floating-cards':
        return renderFloatingCards();
      case 'timeline':
        return renderTimeline();
      case 'modern-tabs':
        return renderModernTabs();
      case 'search-powered':
        return renderSearchPowered();
      case 'chat-style':
        return renderChatStyle();
      case 'minimal-luxe':
        return renderMinimalLuxe();
      case 'wave-motion':
        return renderWaveMotion();
      default:
        return renderGlassmorphism();
    }
  };

  const renderGlassmorphism = (): string => `
    <div class="faq-glassmorphism">
      ${props.enableSearch ? renderSearchBar() : ''}
      ${props.enableCategories ? renderCategoriesGlass() : ''}
      <div class="faq-glass-container">
        ${questions.map((q: any, i: number) => `
          <div class="faq-glass-item" data-category="${q.category}" data-keywords="${q.keywords?.join(' ')}" data-aos="fade-up" data-aos-delay="${i * 100}">
            <div class="faq-glass-question" data-faq="${q.id}">
              <h3>${q.question}</h3>
              <div class="faq-glass-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </div>
            </div>
            <div class="faq-glass-answer" id="answer-${q.id}">
              <div class="faq-glass-content">
                <p>${q.answer}</p>
                ${q.priority === 'high' ? '<span class="faq-priority-badge">Priorité Haute</span>' : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderFloatingCards = (): string => `
    <div class="faq-floating">
      ${props.enableSearch ? renderSearchBar() : ''}
      <div class="faq-floating-grid">
        ${questions.map((q: any, i: number) => `
          <div class="faq-floating-card" data-category="${q.category}" data-aos="zoom-in" data-aos-delay="${i * 80}">
            <div class="faq-floating-icon">
              <div class="faq-floating-icon-inner">${getIconForCategory(q.category)}</div>
            </div>
            <h3 class="faq-floating-question">${q.question}</h3>
            <p class="faq-floating-answer">${q.answer}</p>
            <div class="faq-floating-category">${q.category}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderTimeline = (): string => `
    <div class="faq-timeline">
      ${props.enableSearch ? renderSearchBar() : ''}
      <div class="faq-timeline-container">
        <div class="faq-timeline-line"></div>
        ${questions.map((q: any, i: number) => `
          <div class="faq-timeline-item ${i % 2 === 0 ? 'faq-timeline-left' : 'faq-timeline-right'}" data-aos="fade-${i % 2 === 0 ? 'right' : 'left'}" data-aos-delay="${i * 150}">
            <div class="faq-timeline-marker">
              <div class="faq-timeline-number">${i + 1}</div>
            </div>
            <div class="faq-timeline-content">
              <div class="faq-timeline-category">${q.category}</div>
              <h3 class="faq-timeline-question">${q.question}</h3>
              <p class="faq-timeline-answer">${q.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderModernTabs = (): string => `
    <div class="faq-modern-tabs">
      ${props.enableSearch ? renderSearchBar() : ''}
      <div class="faq-tabs-header">
        <button class="faq-tab-btn active" data-category="all">Toutes</button>
        ${categories.map(cat => `
          <button class="faq-tab-btn" data-category="${cat}">${cat}</button>
        `).join('')}
        <div class="faq-tab-indicator"></div>
      </div>
      <div class="faq-tabs-content">
        ${questions.map((q: any, i: number) => `
          <div class="faq-tab-item" data-category="${q.category}" data-aos="slide-up" data-aos-delay="${i * 50}">
            <div class="faq-tab-question" data-faq="${q.id}">
              <span class="faq-tab-number">${String(i + 1).padStart(2, '0')}</span>
              <h3>${q.question}</h3>
              <div class="faq-tab-toggle">
                <div class="faq-tab-toggle-line"></div>
                <div class="faq-tab-toggle-line"></div>
              </div>
            </div>
            <div class="faq-tab-answer" id="tab-answer-${q.id}">
              <p>${q.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderSearchPowered = (): string => `
    <div class="faq-search-powered">
      <div class="faq-search-hero">
        <h2>${props.title}</h2>
        <div class="faq-search-box">
          <div class="faq-search-input-wrapper">
            <svg class="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input type="text" class="faq-search-input" placeholder="Posez votre question..." autocomplete="off">
            <div class="faq-search-suggestions"></div>
          </div>
        </div>
      </div>
      <div class="faq-search-results">
        ${questions.map((q: any, i: number) => `
          <div class="faq-search-item" data-category="${q.category}" data-keywords="${q.keywords?.join(' ')}" data-aos="fade-up" data-aos-delay="${i * 60}">
            <div class="faq-search-question" data-faq="${q.id}">
              <div class="faq-search-meta">
                <span class="faq-search-category">${q.category}</span>
                ${q.priority === 'high' ? '<span class="faq-search-priority">★</span>' : ''}
              </div>
              <h3>${q.question}</h3>
            </div>
            <div class="faq-search-answer" id="search-answer-${q.id}">
              <p>${q.answer}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderChatStyle = (): string => `
    <div class="faq-chat">
      <div class="faq-chat-header">
        <div class="faq-chat-avatar">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div class="faq-chat-info">
          <h3>Assistant FAQ</h3>
          <span class="faq-chat-status">En ligne</span>
        </div>
      </div>
      <div class="faq-chat-messages">
        <div class="faq-chat-message faq-chat-bot">
          <div class="faq-chat-bubble">
            Bonjour ! Je suis là pour répondre à vos questions. Cliquez sur une question ci-dessous 👇
          </div>
        </div>
        ${questions.map((q: any, i: number) => `
          <div class="faq-chat-message faq-chat-user" data-aos="fade-left" data-aos-delay="${i * 100}">
            <div class="faq-chat-bubble faq-chat-question" data-faq="${q.id}">
              ${q.question}
            </div>
          </div>
          <div class="faq-chat-message faq-chat-bot faq-chat-hidden" id="chat-answer-${q.id}">
            <div class="faq-chat-bubble">
              ${q.answer}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderMinimalLuxe = (): string => `
    <div class="faq-minimal-luxe">
      ${props.enableSearch ? renderSearchBar() : ''}
      <div class="faq-luxe-container">
        ${questions.map((q: any, i: number) => `
          <div class="faq-luxe-item" data-category="${q.category}" data-aos="fade-up" data-aos-delay="${i * 80}">
            <div class="faq-luxe-question" data-faq="${q.id}">
              <span class="faq-luxe-number">${String(i + 1).padStart(2, '0')}</span>
              <h3>${q.question}</h3>
              <div class="faq-luxe-indicator"></div>
            </div>
            <div class="faq-luxe-answer" id="luxe-answer-${q.id}">
              <div class="faq-luxe-content">
                <p>${q.answer}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderWaveMotion = (): string => `
    <div class="faq-wave-motion">
      <div class="faq-wave-bg">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="faq-wave-fill"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="faq-wave-fill"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="faq-wave-fill"></path>
        </svg>
      </div>
      ${props.enableSearch ? renderSearchBar() : ''}
      <div class="faq-wave-container">
        ${questions.map((q: any, i: number) => `
          <div class="faq-wave-item" data-category="${q.category}" data-aos="wave-up" data-aos-delay="${i * 100}">
            <div class="faq-wave-card">
              <div class="faq-wave-question" data-faq="${q.id}">
                <h3>${q.question}</h3>
                <div class="faq-wave-ripple"></div>
              </div>
              <div class="faq-wave-answer" id="wave-answer-${q.id}">
                <p>${q.answer}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  const renderSearchBar = (): string => `
    <div class="faq-search-bar">
      <div class="faq-search-wrapper">
        <svg class="faq-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input type="text" class="faq-search-input" placeholder="Rechercher dans les questions..." autocomplete="off">
        <div class="faq-search-results-count"></div>
      </div>
    </div>
  `;

  const renderCategoriesGlass = (): string => `
    <div class="faq-categories">
      <button class="faq-category-btn active" data-category="all">Toutes</button>
      ${categories.map(cat => `
        <button class="faq-category-btn" data-category="${cat}">${cat}</button>
      `).join('')}
    </div>
  `;

  // Helper function pour les icônes de catégories
  function getIconForCategory(category: string): string {
    const icons: Record<string, string> = {
      'Délais': '⏰',
      'Tarifs': '💶',
      'Zones': '📍',
      'Garantie': '🛡️',
      'Urgence': '🚨',
      'Services': '🔧',
      'Contact': '📞',
    };
    return icons[category] || '❓';
  }

  // HTML principal
  const html = `
    <section class="faq-ultra-modern faq-variant-${props.variant}">
      <div class="faq-container">
        <div class="faq-header">
          <h2 class="faq-title" data-aos="fade-up">${props.title}</h2>
          ${props.subtitle ? `<p class="faq-subtitle" data-aos="fade-up" data-aos-delay="100">${props.subtitle}</p>` : ''}
        </div>
        
        ${getVariantHTML()}
        
        ${props.showCTA ? `
          <div class="faq-cta" data-aos="fade-up" data-aos-delay="300">
            <h3 class="faq-cta-title">${props.ctaTitle}</h3>
            <a href="${props.ctaButtonLink}" class="faq-cta-button">
              <span>${props.ctaButtonText}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        ` : ''}
      </div>
    </section>
  `;

  // CSS Ultra-Moderne Complet
  const css = `
    ${cssVariables}
    
    .faq-ultra-modern {
      padding: 80px 0;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      position: relative;
      overflow: hidden;
    }
    
    .faq-ultra-modern::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: 
        radial-gradient(circle at 20% 80%, rgba(var(--faq-primary-rgb), 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(var(--faq-primary-rgb), 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
      animation: backgroundShift 20s ease-in-out infinite;
    }
    
    @keyframes backgroundShift {
      0%, 100% { transform: translateX(0) translateY(0); }
      25% { transform: translateX(1%) translateY(-1%); }
      50% { transform: translateX(-1%) translateY(1%); }
      75% { transform: translateX(1%) translateY(1%); }
    }
    
    .faq-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
      position: relative;
      z-index: 1;
    }
    
    .faq-header {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .faq-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      background: var(--faq-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 20px;
      letter-spacing: -0.02em;
    }
    
    .faq-subtitle {
      font-size: 1.25rem;
      color: rgba(0, 0, 0, 0.7);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
    
    /* ========== GLASSMORPHISM VARIANT ========== */
    .faq-glassmorphism {
      display: flex;
      flex-direction: column;
      gap: 30px;
    }
    
    .faq-glass-container {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .faq-glass-item {
      background: var(--faq-glass);
      backdrop-filter: var(--faq-backdrop);
      border: 1px solid var(--faq-glass-border);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: var(--faq-shadow);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-glass-item:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
    }
    
    .faq-glass-question {
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .faq-glass-question h3 {
      font-size: 1.125rem;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.8);
      margin: 0;
      flex: 1;
      padding-right: 20px;
    }
    
    .faq-glass-icon {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--faq-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }
    
    .faq-glass-icon svg {
      width: 18px;
      height: 18px;
      color: white;
      transition: transform 0.3s ease;
    }
    
    .faq-glass-question.active .faq-glass-icon {
      transform: rotate(45deg);
    }
    
    .faq-glass-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-glass-answer.open {
      max-height: 500px;
    }
    
    .faq-glass-content {
      padding: 0 24px 24px;
    }
    
    .faq-glass-content p {
      color: rgba(0, 0, 0, 0.7);
      line-height: 1.7;
      margin: 0;
      font-size: 1rem;
    }
    
    .faq-priority-badge {
      display: inline-block;
      background: linear-gradient(45deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      margin-top: 12px;
    }
    
    /* ========== FLOATING CARDS VARIANT ========== */
    .faq-floating-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }
    
    .faq-floating-card {
      background: white;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .faq-floating-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--faq-gradient);
    }
    
    .faq-floating-card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }
    
    .faq-floating-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--faq-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .faq-floating-icon-inner {
      color: white;
      font-size: 24px;
      font-weight: bold;
    }
    
    .faq-floating-question {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 16px;
      line-height: 1.4;
    }
    
    .faq-floating-answer {
      color: #4a5568;
      line-height: 1.7;
      margin-bottom: 20px;
    }
    
    .faq-floating-category {
      display: inline-block;
      background: rgba(var(--faq-primary-rgb), 0.1);
      color: var(--faq-primary);
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    /* ========== TIMELINE VARIANT ========== */
    .faq-timeline-container {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 2px;
      background: var(--faq-gradient);
      transform: translateX(-50%);
    }
    
    .faq-timeline-item {
      display: flex;
      margin-bottom: 40px;
      position: relative;
    }
    
    .faq-timeline-left {
      flex-direction: row-reverse;
    }
    
    .faq-timeline-left .faq-timeline-content {
      text-align: right;
      margin-right: 60px;
    }
    
    .faq-timeline-right .faq-timeline-content {
      margin-left: 60px;
    }
    
    .faq-timeline-marker {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--faq-gradient);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
    }
    
    .faq-timeline-number {
      color: white;
      font-weight: bold;
      font-size: 1rem;
    }
    
    .faq-timeline-content {
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      flex: 1;
      max-width: calc(50% - 20px);
    }
    
    .faq-timeline-category {
      color: var(--faq-primary);
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }
    
    .faq-timeline-question {
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 12px;
    }
    
    .faq-timeline-answer {
      color: #4a5568;
      line-height: 1.7;
      margin: 0;
    }
    
    /* ========== MODERN TABS VARIANT ========== */
    .faq-tabs-header {
      display: flex;
      gap: 12px;
      margin-bottom: 40px;
      position: relative;
      justify-content: center;
      flex-wrap: wrap;
    }
    
    .faq-tab-btn {
      padding: 12px 24px;
      border: 2px solid transparent;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      color: rgba(0, 0, 0, 0.7);
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      position: relative;
    }
    
    .faq-tab-btn.active,
    .faq-tab-btn:hover {
      background: var(--faq-primary);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(var(--faq-primary-rgb), 0.3);
    }
    
    .faq-tab-indicator {
      position: absolute;
      bottom: -2px;
      height: 2px;
      background: var(--faq-gradient);
      transition: all 0.3s ease;
      border-radius: 1px;
    }
    
    .faq-tab-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 16px;
    }
    
    .faq-tab-question {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 20px 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .faq-tab-question:hover {
      transform: translateX(8px);
    }
    
    .faq-tab-number {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--faq-primary);
      min-width: 40px;
    }
    
    .faq-tab-question h3 {
      flex: 1;
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a202c;
    }
    
    .faq-tab-toggle {
      width: 24px;
      height: 24px;
      position: relative;
    }
    
    .faq-tab-toggle-line {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 16px;
      height: 2px;
      background: var(--faq-primary);
      transition: all 0.3s ease;
    }
    
    .faq-tab-toggle-line:first-child {
      transform: translate(-50%, -50%);
    }
    
    .faq-tab-toggle-line:last-child {
      transform: translate(-50%, -50%) rotate(90deg);
    }
    
    .faq-tab-question.active .faq-tab-toggle-line:last-child {
      opacity: 0;
    }
    
    .faq-tab-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-tab-answer.open {
      max-height: 300px;
    }
    
    .faq-tab-answer p {
      padding: 0 60px 20px;
      color: #4a5568;
      line-height: 1.7;
      margin: 0;
    }
    
    /* ========== SEARCH POWERED VARIANT ========== */
    .faq-search-hero {
      text-align: center;
      margin-bottom: 60px;
    }
    
    .faq-search-box {
      max-width: 700px;
      margin: 40px auto 0;
    }
    
    .faq-search-input-wrapper {
      position: relative;
    }
    
    .faq-search-suggestions {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      margin-top: 8px;
      max-height: 200px;
      overflow-y: auto;
      z-index: 10;
    }
    
    .faq-search-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      padding-bottom: 20px;
    }
    
    .faq-search-item:last-child {
      border-bottom: none;
      margin-bottom: 0;
    }
    
    .faq-search-question {
      cursor: pointer;
      padding: 16px;
      border-radius: 12px;
      transition: all 0.3s ease;
    }
    
    .faq-search-question:hover {
      background: rgba(var(--faq-primary-rgb), 0.05);
    }
    
    .faq-search-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    
    .faq-search-category {
      background: rgba(var(--faq-primary-rgb), 0.1);
      color: var(--faq-primary);
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .faq-search-priority {
      color: #f59e0b;
      font-size: 1.2rem;
    }
    
    .faq-search-question h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a202c;
    }
    
    .faq-search-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-search-answer.open {
      max-height: 300px;
    }
    
    .faq-search-answer p {
      padding: 16px;
      background: rgba(var(--faq-primary-rgb), 0.02);
      border-radius: 12px;
      margin: 16px;
      color: #4a5568;
      line-height: 1.7;
    }
    
    /* ========== CHAT STYLE VARIANT ========== */
    .faq-chat {
      max-width: 600px;
      margin: 0 auto;
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
    
    .faq-chat-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
      background: var(--faq-gradient);
      color: white;
    }
    
    .faq-chat-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .faq-chat-avatar svg {
      width: 24px;
      height: 24px;
    }
    
    .faq-chat-info h3 {
      margin: 0 0 4px;
      font-size: 1.125rem;
      font-weight: 600;
    }
    
    .faq-chat-status {
      font-size: 0.875rem;
      opacity: 0.9;
    }
    
    .faq-chat-messages {
      padding: 24px;
      max-height: 500px;
      overflow-y: auto;
    }
    
    .faq-chat-message {
      display: flex;
      margin-bottom: 16px;
    }
    
    .faq-chat-bot {
      justify-content: flex-start;
    }
    
    .faq-chat-user {
      justify-content: flex-end;
    }
    
    .faq-chat-bubble {
      max-width: 80%;
      padding: 12px 16px;
      border-radius: 18px;
      line-height: 1.5;
    }
    
    .faq-chat-bot .faq-chat-bubble {
      background: #f3f4f6;
      color: #374151;
    }
    
    .faq-chat-user .faq-chat-bubble {
      background: var(--faq-gradient);
      color: white;
    }
    
    .faq-chat-question {
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .faq-chat-question:hover {
      transform: scale(1.02);
    }
    
    .faq-chat-hidden {
      display: none;
    }
    
    /* ========== MINIMAL LUXE VARIANT ========== */
    .faq-luxe-container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .faq-luxe-item {
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }
    
    .faq-luxe-item:last-child {
      border-bottom: none;
    }
    
    .faq-luxe-question {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 32px 0;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .faq-luxe-question:hover {
      transform: translateX(8px);
    }
    
    .faq-luxe-number {
      font-size: 1.25rem;
      font-weight: bold;
      color: var(--faq-primary);
      font-family: 'SF Mono', monospace;
      min-width: 50px;
    }
    
    .faq-luxe-question h3 {
      flex: 1;
      margin: 0;
      font-size: 1.25rem;
      font-weight: 500;
      color: #1a202c;
      letter-spacing: -0.01em;
    }
    
    .faq-luxe-indicator {
      width: 20px;
      height: 2px;
      background: var(--faq-primary);
      position: relative;
      transition: all 0.3s ease;
    }
    
    .faq-luxe-indicator::after {
      content: '';
      position: absolute;
      top: -9px;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 20px;
      background: var(--faq-primary);
      transition: all 0.3s ease;
    }
    
    .faq-luxe-question.active .faq-luxe-indicator::after {
      opacity: 0;
    }
    
    .faq-luxe-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-luxe-answer.open {
      max-height: 300px;
    }
    
    .faq-luxe-content {
      padding: 0 74px 32px;
    }
    
    .faq-luxe-content p {
      color: #6b7280;
      line-height: 1.8;
      font-size: 1.125rem;
      margin: 0;
    }
    
    /* ========== WAVE MOTION VARIANT ========== */
    .faq-wave-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120px;
      z-index: -1;
    }
    
    .faq-wave-bg svg {
      width: 100%;
      height: 100%;
    }
    
    .faq-wave-fill {
      fill: var(--faq-primary);
    }
    
    .faq-wave-container {
      padding-top: 60px;
    }
    
    .faq-wave-item {
      margin-bottom: 24px;
    }
    
    .faq-wave-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    .faq-wave-question {
      padding: 24px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    
    .faq-wave-question h3 {
      margin: 0;
      font-size: 1.125rem;
      font-weight: 600;
      color: #1a202c;
      position: relative;
      z-index: 2;
    }
    
    .faq-wave-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(var(--faq-primary-rgb), 0.1);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.6s ease;
    }
    
    .faq-wave-question:hover .faq-wave-ripple {
      width: 300px;
      height: 300px;
    }
    
    .faq-wave-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-wave-answer.open {
      max-height: 300px;
    }
    
    .faq-wave-answer p {
      padding: 0 24px 24px;
      color: #4a5568;
      line-height: 1.7;
      margin: 0;
    }
    
    /* ========== SEARCH BAR ========== */
    .faq-search-bar {
      margin-bottom: 40px;
    }
    
    .faq-search-wrapper {
      position: relative;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .faq-search-input {
      width: 100%;
      padding: 16px 20px 16px 56px;
      border: 2px solid transparent;
      border-radius: 50px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      font-size: 1rem;
      transition: all 0.3s ease;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    }
    
    .faq-search-input:focus {
      outline: none;
      border-color: var(--faq-primary);
      background: white;
      box-shadow: 0 8px 32px rgba(var(--faq-primary-rgb), 0.2);
    }
    
    .faq-search-icon {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      color: var(--faq-primary);
    }
    
    .faq-search-results-count {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
      font-size: 0.875rem;
    }
    
    /* ========== CATEGORIES ========== */
    .faq-categories {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    
    .faq-category-btn {
      padding: 8px 20px;
      border: 2px solid transparent;
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      color: rgba(0, 0, 0, 0.7);
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }
    
    .faq-category-btn.active,
    .faq-category-btn:hover {
      background: var(--faq-primary);
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(var(--faq-primary-rgb), 0.3);
    }
    
    /* ========== CTA SECTION ========== */
    .faq-cta {
      text-align: center;
      padding: 60px 0;
      background: rgba(255, 255, 255, 0.5);
      backdrop-filter: blur(20px);
      border-radius: 24px;
      margin-top: 60px;
    }
    
    .faq-cta-title {
      font-size: 1.5rem;
      font-weight: 600;
      color: #1a202c;
      margin-bottom: 24px;
    }
    
    .faq-cta-button {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 16px 32px;
      background: var(--faq-gradient);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: 600;
      transition: all 0.3s ease;
      box-shadow: 0 4px 24px rgba(var(--faq-primary-rgb), 0.3);
    }
    
    .faq-cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(var(--faq-primary-rgb), 0.4);
    }
    
    .faq-cta-button svg {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }
    
    .faq-cta-button:hover svg {
      transform: translateX(4px);
    }
    
    /* ========== RESPONSIVE ========== */
    @media (max-width: 1024px) {
      .faq-timeline-line {
        left: 20px;
      }
      
      .faq-timeline-item {
        flex-direction: column;
      }
      
      .faq-timeline-left,
      .faq-timeline-right {
        flex-direction: column;
      }
      
      .faq-timeline-marker {
        left: 20px;
        transform: none;
      }
      
      .faq-timeline-content {
        margin-left: 60px !important;
        margin-right: 0 !important;
        text-align: left !important;
        max-width: none;
      }
    }
    
    @media (max-width: 768px) {
      .faq-ultra-modern {
        padding: 60px 0;
      }
      
      .faq-container {
        padding: 0 16px;
      }
      
      .faq-title {
        font-size: 2rem;
      }
      
      .faq-floating-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      
      .faq-floating-card {
        padding: 24px;
      }
      
      .faq-glass-question {
        padding: 20px;
      }
      
      .faq-glass-content {
        padding: 0 20px 20px;
      }
      
      .faq-categories {
        gap: 8px;
      }
      
      .faq-category-btn {
        padding: 6px 12px;
        font-size: 0.9rem;
      }
      
      .faq-tabs-header {
        gap: 8px;
      }
      
      .faq-tab-btn {
        padding: 8px 16px;
        font-size: 0.9rem;
      }
      
      .faq-tab-answer p {
        padding: 0 20px 20px;
      }
      
      .faq-luxe-content {
        padding: 0 20px 24px;
      }
      
      .faq-luxe-number {
        min-width: 30px;
        font-size: 1rem;
      }
      
      .faq-luxe-question {
        gap: 16px;
        padding: 24px 0;
      }
      
      .faq-luxe-question h3 {
        font-size: 1.125rem;
      }
    }
    
    /* ========== ANIMATIONS ========== */
    @keyframes wave-up {
      0% {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      100% {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    
    [data-aos="wave-up"] {
      animation: wave-up 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* ========== UTILITY CLASSES ========== */
    .faq-item-hidden {
      display: none !important;
    }
    
    .faq-hidden {
      display: none;
    }
  `;

  // CSS Critique optimisé
  const criticalCSS = `
    .faq-ultra-modern {
      padding: 80px 0;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      position: relative;
    }
    .faq-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }
    .faq-title {
      font-size: clamp(2.5rem, 5vw, 4rem);
      font-weight: 800;
      text-align: center;
      margin-bottom: 20px;
    }
    .faq-glass-item {
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(8px);
      border-radius: 20px;
      margin-bottom: 16px;
    }
    .faq-glass-question {
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
    }
  `;

  // JavaScript pour les interactions
  const js = `
    (function() {
      // FAQ Functionality
      const faqQuestions = document.querySelectorAll('[data-faq]');
      const searchInput = document.querySelector('.faq-search-input');
      const categoryBtns = document.querySelectorAll('.faq-category-btn, .faq-tab-btn');
      
      // Toggle FAQ answers
      faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
          const faqId = this.getAttribute('data-faq');
          const answer = document.getElementById(\`answer-\${faqId}\`) || 
                        document.getElementById(\`tab-answer-\${faqId}\`) ||
                        document.getElementById(\`search-answer-\${faqId}\`) ||
                        document.getElementById(\`chat-answer-\${faqId}\`) ||
                        document.getElementById(\`luxe-answer-\${faqId}\`) ||
                        document.getElementById(\`wave-answer-\${faqId}\`);
          
          if (!answer) return;
          
          const isOpen = answer.classList.contains('open');
          
          // Close all other answers (accordion behavior)
          document.querySelectorAll('.faq-glass-answer, .faq-tab-answer, .faq-search-answer, .faq-chat-message, .faq-luxe-answer, .faq-wave-answer').forEach(a => {
            if (a !== answer) {
              a.classList.remove('open');
              a.classList.add('faq-chat-hidden');
            }
          });
          
          document.querySelectorAll('[data-faq]').forEach(q => {
            q.classList.remove('active');
          });
          
          // Toggle current answer
          if (isOpen) {
            answer.classList.remove('open');
            answer.classList.add('faq-chat-hidden');
          } else {
            answer.classList.add('open');
            answer.classList.remove('faq-chat-hidden');
            this.classList.add('active');
          }
        });
      });
      
      // Search functionality
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          const searchTerm = this.value.toLowerCase();
          const items = document.querySelectorAll('[data-keywords]');
          let visibleCount = 0;
          
          items.forEach(item => {
            const keywords = item.getAttribute('data-keywords') || '';
            const question = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const answer = item.querySelector('p')?.textContent.toLowerCase() || '';
            
            const isVisible = 
              keywords.toLowerCase().includes(searchTerm) ||
              question.includes(searchTerm) ||
              answer.includes(searchTerm) ||
              searchTerm === '';
            
            if (isVisible) {
              item.classList.remove('faq-item-hidden');
              visibleCount++;
            } else {
              item.classList.add('faq-item-hidden');
            }
          });
          
          // Update results count
          const counter = document.querySelector('.faq-search-results-count');
          if (counter) {
            counter.textContent = \`\${visibleCount} résultat\${visibleCount !== 1 ? 's' : ''}\`;
          }
        });
      }
      
      // Category filtering
      categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const category = this.getAttribute('data-category');
          
          // Update active button
          categoryBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          
          // Filter items
          const items = document.querySelectorAll('[data-category]');
          items.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
              item.classList.remove('faq-item-hidden');
            } else {
              item.classList.add('faq-item-hidden');
            }
          });
          
          // Move tab indicator
          if (this.classList.contains('faq-tab-btn')) {
            const indicator = document.querySelector('.faq-tab-indicator');
            if (indicator) {
              const btnRect = this.getBoundingClientRect();
              const containerRect = this.parentElement.getBoundingClientRect();
              indicator.style.left = \`\${btnRect.left - containerRect.left}px\`;
              indicator.style.width = \`\${btnRect.width}px\`;
            }
          }
        });
      });
      
      // Initialize tab indicator position
      const firstTab = document.querySelector('.faq-tab-btn.active');
      const indicator = document.querySelector('.faq-tab-indicator');
      if (firstTab && indicator) {
        const btnRect = firstTab.getBoundingClientRect();
        const containerRect = firstTab.parentElement.getBoundingClientRect();
        indicator.style.left = \`\${btnRect.left - containerRect.left}px\`;
        indicator.style.width = \`\${btnRect.width}px\`;
      }
      
      // Smooth scroll for mobile
      if (window.innerWidth <= 768) {
        faqQuestions.forEach(question => {
          question.addEventListener('click', function() {
            setTimeout(() => {
              this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
          });
        });
      }
      
      // Enhanced search with suggestions
      if (searchInput) {
        const allQuestions = Array.from(document.querySelectorAll('[data-faq] h3')).map(h3 => h3.textContent);
        
        searchInput.addEventListener('input', function() {
          const value = this.value.toLowerCase();
          const suggestions = document.querySelector('.faq-search-suggestions');
          
          if (suggestions && value.length > 2) {
            const matches = allQuestions.filter(q => 
              q.toLowerCase().includes(value)
            ).slice(0, 5);
            
            if (matches.length > 0) {
              suggestions.innerHTML = matches.map(match => 
                \`<div class="suggestion-item" style="padding: 12px 16px; cursor: pointer; border-bottom: 1px solid #f0f0f0;">
                  \${match}
                </div>\`
              ).join('');
              suggestions.style.display = 'block';
            } else {
              suggestions.style.display = 'none';
            }
          } else if (suggestions) {
            suggestions.style.display = 'none';
          }
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
          const suggestions = document.querySelector('.faq-search-suggestions');
          if (suggestions && !searchInput.contains(e.target)) {
            suggestions.style.display = 'none';
          }
        });
      }
    })();
  `;

  return {
    html,
    css,
    js,
    criticalCSS,
    dependencies: []
  };
}

// Fonctions utilitaires
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? 
    `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
    '59, 130, 246';
}

function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
}