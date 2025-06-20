import { BlockCategory, PropType, EditorControl, PerformanceImpact } from '@awema/shared';
export const heroSplitScreen = {
    id: 'hero-split-screen',
    name: 'Split Screen Hero',
    description: 'Hero section with content on left and image on right',
    category: BlockCategory.HERO,
    tags: ['hero', 'landing', 'split-screen', 'cta'],
    thumbnail: '/blocks/hero-split-screen.jpg',
    performanceImpact: PerformanceImpact.MEDIUM,
    props: [
        {
            name: 'title',
            type: PropType.STRING,
            description: 'Main headline text',
            required: true,
            defaultValue: 'Transform Your Business',
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
            defaultValue: 'Professional solutions tailored to your needs',
            editorConfig: {
                control: EditorControl.TEXTAREA,
                placeholder: 'Enter subtitle',
                group: 'Content',
                order: 2
            }
        },
        {
            name: 'ctaText',
            type: PropType.STRING,
            description: 'Call to action button text',
            required: true,
            defaultValue: 'Get Started',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Button text',
                group: 'CTA',
                order: 3
            }
        },
        {
            name: 'ctaLink',
            type: PropType.STRING,
            description: 'CTA button link',
            required: true,
            defaultValue: '#contact',
            editorConfig: {
                control: EditorControl.LINK_PICKER,
                placeholder: '#contact',
                group: 'CTA',
                order: 4
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
                order: 5
            },
            required: false
        },
        {
            name: 'secondaryCtaLink',
            type: PropType.STRING,
            description: 'Secondary CTA link',
            editorConfig: {
                control: EditorControl.LINK_PICKER,
                placeholder: '#learn-more',
                group: 'CTA',
                order: 6
            },
            required: false
        },
        {
            name: 'image',
            type: PropType.STRING,
            description: 'Hero image',
            required: true,
            defaultValue: '/hero-default.jpg',
            editorConfig: {
                control: EditorControl.IMAGE_PICKER,
                helpText: 'Recommended size: 800x600px',
                group: 'Media',
                order: 7
            }
        },
        {
            name: 'imageAlt',
            type: PropType.STRING,
            description: 'Image alt text for SEO',
            required: true,
            defaultValue: 'Professional service',
            editorConfig: {
                control: EditorControl.TEXT,
                placeholder: 'Describe the image',
                group: 'Media',
                order: 8
            }
        }
    ],
    variants: [
        {
            id: 'image-left',
            name: 'Image Left',
            description: 'Image on left, content on right',
            modifications: {
                layout: 'reversed'
            }
        },
        {
            id: 'full-height',
            name: 'Full Height',
            description: 'Full viewport height hero',
            modifications: {
                height: '100vh'
            }
        },
        {
            id: 'gradient-overlay',
            name: 'Gradient Overlay',
            description: 'Add gradient overlay to image',
            modifications: {
                overlay: true
            }
        }
    ],
    defaultProps: {
        title: 'Transform Your Business',
        subtitle: 'Professional solutions tailored to your needs',
        ctaText: 'Get Started',
        ctaLink: '#contact',
        image: '/hero-default.jpg',
        imageAlt: 'Professional service'
    }
};
export function renderHeroSplitScreen(props, variants = []) {
    const isReversed = variants.includes('image-left');
    const isFullHeight = variants.includes('full-height');
    const hasOverlay = variants.includes('gradient-overlay');
    const html = `
    <section class="hero-split-screen ${isFullHeight ? 'hero-full-height' : ''}" role="banner">
      <div class="hero-container">
        <div class="hero-content ${isReversed ? 'hero-content--reversed' : ''}">
          <div class="hero-text">
            <h1 class="hero-title">${props.title}</h1>
            ${props.subtitle ? `<p class="hero-subtitle">${props.subtitle}</p>` : ''}
            <div class="hero-cta">
              <a href="${props.ctaLink}" class="btn btn-primary btn-lg">${props.ctaText}</a>
              ${props.secondaryCtaText ? `
                <a href="${props.secondaryCtaLink}" class="btn btn-secondary btn-lg">${props.secondaryCtaText}</a>
              ` : ''}
            </div>
          </div>
          <div class="hero-media">
            ${hasOverlay ? '<div class="hero-overlay"></div>' : ''}
            <img 
              src="${props.image}" 
              alt="${props.imageAlt}"
              class="hero-image"
              loading="eager"
              fetchpriority="high"
              width="800"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  `;
    const css = `
    .hero-split-screen {
      position: relative;
      padding: 4rem 0;
      overflow: hidden;
    }

    .hero-full-height {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }

    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }

    .hero-content--reversed {
      direction: rtl;
    }

    .hero-content--reversed > * {
      direction: ltr;
    }

    .hero-text {
      animation: fadeInUp 0.8s ease-out;
    }

    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
      color: var(--color-text);
    }

    .hero-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      line-height: 1.6;
      color: var(--color-text-secondary);
      margin-bottom: 2rem;
    }

    .hero-cta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .hero-media {
      position: relative;
      animation: fadeInRight 0.8s ease-out;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, var(--color-primary) 0%, transparent 100%);
      opacity: 0.2;
      z-index: 1;
    }

    .hero-image {
      width: 100%;
      height: auto;
      border-radius: var(--border-radius-lg);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .hero-content--reversed {
        direction: ltr;
      }

      .hero-text {
        order: 2;
      }

      .hero-media {
        order: 1;
      }

      .hero-cta {
        justify-content: center;
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeInRight {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `;
    const criticalCSS = `
    .hero-split-screen {
      position: relative;
      padding: 4rem 0;
    }
    .hero-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .hero-content {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 3rem;
      align-items: center;
    }
    .hero-title {
      font-size: clamp(2.5rem, 5vw, 3.5rem);
      font-weight: 800;
      line-height: 1.1;
      margin-bottom: 1.5rem;
    }
    .hero-image {
      width: 100%;
      height: auto;
      border-radius: var(--border-radius-lg);
    }
  `;
    return {
        html,
        css,
        criticalCSS,
        dependencies: []
    };
}
