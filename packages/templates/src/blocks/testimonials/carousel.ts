import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock, DependencyType } from '@awema/shared';

export const testimonialsCarousel: Block = {
  id: 'testimonials-carousel',
  name: 'Testimonials Carousel',
  description: 'Display customer testimonials in a carousel',
  category: BlockCategory.TESTIMONIALS,
  tags: ['testimonials', 'reviews', 'carousel', 'social-proof'],
  thumbnail: '/blocks/testimonials-carousel.jpg',
  performanceImpact: PerformanceImpact.MEDIUM,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Section title',
      required: true,
      defaultValue: 'What Our Customers Say',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Enter section title',
        group: 'Content',
        order: 1
      }
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Section subtitle',
      required: false,
      defaultValue: 'Read reviews from our satisfied customers',
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Enter subtitle',
        group: 'Content',
        order: 2
      }
    },
    {
      name: 'testimonials',
      type: PropType.STRING,
      description: 'List of testimonials',
      required: true,
      defaultValue: JSON.stringify([
        {
          name: 'John Smith',
          role: 'Homeowner',
          content: 'Excellent service! They arrived on time and completed the job perfectly. Highly recommend!',
          rating: 5,
          image: '/testimonial-1.jpg'
        },
        {
          name: 'Sarah Johnson',
          role: 'Business Owner',
          content: 'Professional team with great attention to detail. They saved us time and money.',
          rating: 5,
          image: '/testimonial-2.jpg'
        },
        {
          name: 'Mike Davis',
          role: 'Property Manager',
          content: 'We\'ve been using their services for years. Always reliable and fair pricing.',
          rating: 5,
          image: '/testimonial-3.jpg'
        }
      ]),
      editorConfig: {
        control: EditorControl.TEXTAREA,
        group: 'Testimonials',
        order: 3,
        helpText: 'Format JSON: [{name, role, content, rating, image}, ...]'
      }
    },
    {
      name: 'showRating',
      type: PropType.BOOLEAN,
      description: 'Show star ratings',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Display',
        order: 4
      }
    },
    {
      name: 'showImages',
      type: PropType.BOOLEAN,
      description: 'Show customer images',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Display',
        order: 5
      }
    },
    {
      name: 'autoplay',
      type: PropType.BOOLEAN,
      description: 'Auto-rotate testimonials',
      required: false,
      defaultValue: true,
      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Behavior',
        order: 6
      }
    },
    {
      name: 'autoplaySpeed',
      type: PropType.NUMBER,
      description: 'Autoplay speed in milliseconds',
      required: false,
      defaultValue: 5000,
      validation: {
        min: 2000,
        max: 10000
      },
      editorConfig: {
        control: EditorControl.SLIDER,
        group: 'Behavior',
        order: 7
      }
    }
  ],
  variants: [
    {
      id: 'cards',
      name: 'Card Style',
      description: 'Display as cards instead of carousel',
      modifications: {
        display: 'cards'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal Style',
      description: 'Clean minimal design',
      modifications: {
        style: 'minimal'
      }
    },
    {
      id: 'dark',
      name: 'Dark Theme',
      description: 'Dark background theme',
      modifications: {
        theme: 'dark'
      }
    }
  ],
  defaultProps: {
    title: 'What Our Customers Say',
    subtitle: 'Read reviews from our satisfied customers',
    showRating: true,
    showImages: true,
    autoplay: true,
    autoplaySpeed: 5000
  }
};

export function renderTestimonialsCarousel(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const isCards = variants.includes('cards');
  const isMinimal = variants.includes('minimal');
  const isDark = variants.includes('dark');
  
  // Parse testimonials if it's a string
  const testimonials = typeof props.testimonials === 'string' ? JSON.parse(props.testimonials) : props.testimonials;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => `
      <svg class="star ${i < rating ? 'star-filled' : ''}" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    `).join('');
  };

  const html = `
    <section class="testimonials ${isDark ? 'testimonials--dark' : ''} ${isMinimal ? 'testimonials--minimal' : ''}" aria-labelledby="testimonials-title">
      <div class="testimonials-container">
        <div class="testimonials-header">
          <h2 id="testimonials-title" class="testimonials-title">${props.title}</h2>
          ${props.subtitle ? `<p class="testimonials-subtitle">${props.subtitle}</p>` : ''}
        </div>
        ${isCards ? `
          <div class="testimonials-grid">
            ${testimonials.map((testimonial: any, index: number) => `
              <article class="testimonial-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                ${props.showRating && testimonial.rating ? `
                  <div class="testimonial-rating" aria-label="${testimonial.rating} out of 5 stars">
                    ${renderStars(testimonial.rating)}
                  </div>
                ` : ''}
                <blockquote class="testimonial-content">
                  <p>"${testimonial.content}"</p>
                </blockquote>
                <div class="testimonial-author">
                  ${props.showImages && testimonial.image ? `
                    <img 
                      src="${testimonial.image}" 
                      alt="${testimonial.name}"
                      class="testimonial-image"
                      loading="lazy"
                      width="60"
                      height="60"
                    />
                  ` : ''}
                  <div class="testimonial-info">
                    <cite class="testimonial-name">${testimonial.name}</cite>
                    ${testimonial.role ? `<span class="testimonial-role">${testimonial.role}</span>` : ''}
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        ` : `
          <div class="testimonials-carousel" data-autoplay="${props.autoplay}" data-speed="${props.autoplaySpeed}">
            <div class="carousel-track">
              ${testimonials.map((testimonial: any, index: number) => `
                <article class="testimonial-slide" data-slide="${index}">
                  ${props.showRating && testimonial.rating ? `
                    <div class="testimonial-rating" aria-label="${testimonial.rating} out of 5 stars">
                      ${renderStars(testimonial.rating)}
                    </div>
                  ` : ''}
                  <blockquote class="testimonial-content">
                    <p>"${testimonial.content}"</p>
                  </blockquote>
                  <div class="testimonial-author">
                    ${props.showImages && testimonial.image ? `
                      <img 
                        src="${testimonial.image}" 
                        alt="${testimonial.name}"
                        class="testimonial-image"
                        loading="lazy"
                        width="80"
                        height="80"
                      />
                    ` : ''}
                    <div class="testimonial-info">
                      <cite class="testimonial-name">${testimonial.name}</cite>
                      ${testimonial.role ? `<span class="testimonial-role">${testimonial.role}</span>` : ''}
                    </div>
                  </div>
                </article>
              `).join('')}
            </div>
            <div class="carousel-dots">
              ${props.testimonials.map((_: any, index: number) => `
                <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-slide="${index}" aria-label="Go to slide ${index + 1}"></button>
              `).join('')}
            </div>
            <button class="carousel-prev" aria-label="Previous testimonial">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button class="carousel-next" aria-label="Next testimonial">
              <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        `}
      </div>
    </section>
  `;

  const css = `
    .testimonials {
      padding: 5rem 0;
      background-color: var(--color-background);
      overflow: hidden;
    }

    .testimonials--dark {
      background-color: var(--color-text);
      color: var(--color-background);
    }

    .testimonials--minimal {
      padding: 6rem 0;
    }

    .testimonials-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .testimonials-header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .testimonials-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 800;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .testimonials--dark .testimonials-title {
      color: var(--color-background);
    }

    .testimonials-subtitle {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      color: var(--color-text-secondary);
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .testimonials--dark .testimonials-subtitle {
      color: var(--color-background);
      opacity: 0.8;
    }

    /* Grid Layout */
    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 2rem;
    }

    .testimonial-card {
      background: var(--color-background-alt);
      padding: 2rem;
      border-radius: var(--border-radius-lg);
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .testimonials--dark .testimonial-card {
      background: rgba(255, 255, 255, 0.1);
    }

    /* Carousel Layout */
    .testimonials-carousel {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }

    .carousel-track {
      display: flex;
      transition: transform 0.5s ease;
    }

    .testimonial-slide {
      flex: 0 0 100%;
      text-align: center;
      padding: 0 2rem;
    }

    /* Testimonial Content */
    .testimonial-rating {
      display: flex;
      justify-content: center;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
    }

    .testimonials-grid .testimonial-rating {
      justify-content: flex-start;
    }

    .star {
      color: var(--color-border);
    }

    .star-filled {
      color: #FFB800;
    }

    .testimonial-content {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      line-height: 1.7;
      margin-bottom: 2rem;
      flex-grow: 1;
    }

    .testimonials--minimal .testimonial-content {
      font-style: italic;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
    }

    .testimonials-grid .testimonial-author {
      justify-content: flex-start;
    }

    .testimonial-image {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
    }

    .carousel-track .testimonial-image {
      width: 80px;
      height: 80px;
    }

    .testimonial-info {
      text-align: left;
    }

    .testimonial-name {
      display: block;
      font-weight: 700;
      font-style: normal;
      color: var(--color-text);
    }

    .testimonials--dark .testimonial-name {
      color: var(--color-background);
    }

    .testimonial-role {
      display: block;
      font-size: 0.875rem;
      color: var(--color-text-secondary);
      margin-top: 0.25rem;
    }

    .testimonials--dark .testimonial-role {
      color: var(--color-background);
      opacity: 0.7;
    }

    /* Carousel Controls */
    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }

    .carousel-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: none;
      background: var(--color-border);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .carousel-dot.active {
      background: var(--color-primary);
      transform: scale(1.2);
    }

    .carousel-prev,
    .carousel-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: var(--color-background);
      border: 1px solid var(--color-border);
      border-radius: 50%;
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      z-index: 2;
      color: var(--color-text);
    }

    .carousel-prev:hover,
    .carousel-next:hover {
      background: var(--color-primary);
      color: white;
      border-color: var(--color-primary);
    }

    .carousel-prev {
      left: -24px;
    }

    .carousel-next {
      right: -24px;
    }

    @media (max-width: 768px) {
      .testimonials {
        padding: 3rem 0;
      }

      .testimonials-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .testimonial-slide {
        padding: 0 1rem;
      }

      .carousel-prev,
      .carousel-next {
        display: none;
      }
    }
  `;

  const criticalCSS = `
    .testimonials {
      padding: 5rem 0;
      background-color: var(--color-background);
    }
    .testimonials-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }
    .testimonials-carousel {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }
    .testimonial-content {
      font-size: clamp(1.125rem, 2vw, 1.375rem);
      line-height: 1.7;
      margin-bottom: 2rem;
    }
  `;

  const js = props.autoplay ? `
    (function() {
      const carousel = document.querySelector('.testimonials-carousel');
      if (!carousel) return;

      const track = carousel.querySelector('.carousel-track');
      const slides = carousel.querySelectorAll('.testimonial-slide');
      const dots = carousel.querySelectorAll('.carousel-dot');
      const prevBtn = carousel.querySelector('.carousel-prev');
      const nextBtn = carousel.querySelector('.carousel-next');
      
      let currentIndex = 0;
      const totalSlides = slides.length;
      const autoplay = carousel.dataset.autoplay === 'true';
      const speed = parseInt(carousel.dataset.speed) || 5000;
      
      function goToSlide(index) {
        currentIndex = index;
        track.style.transform = \`translateX(-\${index * 100}%)\`;
        
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
      }
      
      function nextSlide() {
        goToSlide((currentIndex + 1) % totalSlides);
      }
      
      function prevSlide() {
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
      }
      
      // Event listeners
      prevBtn?.addEventListener('click', prevSlide);
      nextBtn?.addEventListener('click', nextSlide);
      
      dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
      });
      
      // Autoplay
      if (autoplay) {
        let interval = setInterval(nextSlide, speed);
        
        carousel.addEventListener('mouseenter', () => clearInterval(interval));
        carousel.addEventListener('mouseleave', () => {
          interval = setInterval(nextSlide, speed);
        });
      }
      
      // Touch support
      let touchStartX = 0;
      let touchEndX = 0;
      
      carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
      
      function handleSwipe() {
        if (touchEndX < touchStartX - 50) nextSlide();
        if (touchEndX > touchStartX + 50) prevSlide();
      }
    })();
  ` : '';

  return {
    html,
    css,
    criticalCSS,
    js,
    dependencies: [
      {
        type: DependencyType.ICON,
        resource: 'feather-icons',
        critical: false
      }
    ]
  };
}