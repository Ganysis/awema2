import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const heroCentered: Block = {
  id: 'hero-centered',
  name: 'Centered Hero',
  description: 'Centered hero section with background options',
  category: BlockCategory.HERO,
  tags: ['hero', 'landing', 'centered', 'minimal'],
  thumbnail: '/blocks/hero-centered.jpg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Main headline text',
      required: true,

      defaultValue: 'Welcome to Excellence',

      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Enter headline',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Subtitle text',
      required: false,

      defaultValue: 'Delivering quality services since 2010',

      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Enter subtitle',
        group: 'Content',
        order: 2
      }
    },
    {
      name: 'description',
      type: PropType.STRING,
      description: 'Additional description text',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Enter description',
        group: 'Content',
        order: 3},
      required: false
    },
    {
      name: 'ctaText',
      type: PropType.STRING,
      description: 'Primary CTA button text',
      required: true,

      defaultValue: 'Get Started',

      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Button text',
        group: 'CTA',
        order: 4
      }
    },
    {
      name: 'ctaLink',
      type: PropType.STRING,
      description: 'Primary CTA button link',
      required: true,

      defaultValue: '#contact',

      editorConfig: {
        control: EditorControl.LINK_PICKER,
        placeholder: '#contact',
        group: 'CTA',
        order: 5
      }
    },
    {
      name: 'secondaryCtaText',
      type: PropType.STRING,
      description: 'Secondary CTA text',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Secondary button text',
        group: 'CTA',
        order: 6},
      required: false
    },
    {
      name: 'secondaryCtaLink',
      type: PropType.STRING,
      description: 'Secondary CTA link',
      editorConfig: {
        control: EditorControl.LINK_PICKER,
        placeholder: '#services',
        group: 'CTA',
        order: 7},
      required: false
    },
    {
      name: 'backgroundImage',
      type: PropType.STRING,
      description: 'Background image (optional)',
      editorConfig: {
        control: EditorControl.IMAGE_PICKER,
        helpText: 'Recommended size: 1920x1080px',
        group: 'Background',
        order: 8},
      required: false
    },
    {
      name: 'backgroundOverlay',
      type: PropType.STRING,
      description: 'Add overlay to background image',
      required: false,

      defaultValue: true,

      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Background',
        order: 9
      }
    }
  ],
  variants: [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean minimal style',
      modifications: {
        padding: 'large',
        animation: 'subtle'
      }
    },
    {
      id: 'bold',
      name: 'Bold',
      description: 'Bold typography and colors',
      modifications: {
        titleSize: 'extra-large',
        ctaStyle: 'bold'
      }
    },
    {
      id: 'video-bg',
      name: 'Video Background',
      description: 'Support for video backgrounds',
      modifications: {
        backgroundType: 'video'
      }
    }
  ],
  defaultProps: {
    title: 'Welcome to Excellence',
    subtitle: 'Delivering quality services since 2010',
    ctaText: 'Get Started',
    ctaLink: '#contact',
    backgroundOverlay: true
  }
};

export function renderHeroCentered(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const isMinimal = variants.includes('minimal');
  const isBold = variants.includes('bold');

  const html = `
    <section class="hero-centered ${isMinimal ? 'hero-minimal' : ''} ${isBold ? 'hero-bold' : ''}" role="banner">
      ${props.backgroundImage ? `
        <div class="hero-background">
          ${props.backgroundOverlay ? '<div class="hero-background-overlay"></div>' : ''}
          <img 
            src="${props.backgroundImage}" 
            alt=""
            class="hero-background-image"
            loading="eager"
            fetchpriority="high"
            aria-hidden="true"
          />
        </div>
      ` : ''}
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">${props.title}</h1>
          ${props.subtitle ? `<p class="hero-subtitle">${props.subtitle}</p>` : ''}
          ${props.description ? `<p class="hero-description">${props.description}</p>` : ''}
          <div class="hero-cta">
            <a href="${props.ctaLink}" class="btn btn-primary btn-lg">${props.ctaText}</a>
            ${props.secondaryCtaText ? `
              <a href="${props.secondaryCtaLink}" class="btn btn-outline btn-lg">${props.secondaryCtaText}</a>
            ` : ''}
          </div>
        </div>
      </div>
    </section>
  `;

  const css = `
    .hero-centered {
      position: relative;
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      text-align: center;
      overflow: hidden;
    }

    .hero-minimal {
      min-height: 80vh;
      padding: 6rem 0;
    }

    .hero-bold .hero-title {
      font-size: clamp(3rem, 7vw, 5rem) !important;
      font-weight: 900 !important;
    }

    .hero-background {
      position: absolute;
      inset: 0;
      z-index: -1;
    }

    .hero-background-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .hero-background-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, 
        rgba(0, 0, 0, 0.4) 0%, 
        rgba(0, 0, 0, 0.6) 100%
      );
    }

    .hero-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
      position: relative;
      z-index: 1;
    }

    .hero-content {
      animation: fadeInUp 1s ease-out;
    }

    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--color-text);
      letter-spacing: -0.02em;
    }

    .hero-background + .hero-container .hero-title,
    .hero-background + .hero-container .hero-subtitle,
    .hero-background + .hero-container .hero-description {
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: clamp(1.25rem, 2.5vw, 1.75rem);
      line-height: 1.4;
      color: var(--color-text-secondary);
      margin-bottom: 1rem;
      font-weight: 500;
    }

    .hero-description {
      font-size: clamp(1rem, 1.5vw, 1.125rem);
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin-bottom: 2.5rem;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .hero-bold .btn-primary {
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    @media (max-width: 768px) {
      .hero-centered {
        min-height: 60vh;
      }

      .hero-cta {
        flex-direction: column;
        align-items: center;
      }

      .hero-cta .btn {
        width: 100%;
        max-width: 280px;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  const criticalCSS = `
    .hero-centered {
      position: relative;
      min-height: 70vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 4rem 0;
      text-align: center;
    }
    .hero-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .hero-title {
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .hero-cta {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }
  `;

  return {
    html,
    css,
    criticalCSS,
    dependencies: []
  };
}