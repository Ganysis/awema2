import { LayoutStyle } from '@awema/shared';
export const premiumVariant = {
    id: 'premium',
    name: 'Premium Elegant',
    description: 'Sophisticated design with subtle animations and premium feel',
    thumbnail: '/variants/premium.jpg',
    colorScheme: {
        name: 'Premium',
        colors: {
            primary: '#2563EB', // Royal blue
            secondary: '#7C3AED', // Purple
            accent: '#F59E0B', // Gold
            background: '#FFFFFF', // White
            text: '#111827' // Dark gray
        }
    },
    layoutStyle: LayoutStyle.ELEGANT
};
export const premiumStyles = `
  /* Premium Elegant Variables */
  :root {
    --color-primary: #2563EB;
    --color-primary-dark: #1D4ED8;
    --color-primary-light: #DBEAFE;
    --color-secondary: #7C3AED;
    --color-secondary-dark: #6D28D9;
    --color-secondary-light: #EDE9FE;
    --color-accent: #F59E0B;
    --color-background: #FFFFFF;
    --color-background-alt: #F9FAFB;
    --color-text: #111827;
    --color-text-secondary: #6B7280;
    --color-border: #E5E7EB;
    --color-error: #EF4444;
    --color-warning: #F59E0B;
    --color-success: #10B981;
    
    --border-radius: 8px;
    --border-radius-lg: 16px;
    --border-radius-xl: 24px;
    
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    
    --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    --gradient-subtle: linear-gradient(180deg, var(--color-background) 0%, var(--color-background-alt) 100%);
  }

  /* Global Styles */
  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: 'Playfair Display', Georgia, serif;
    line-height: 1.6;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    letter-spacing: -0.01em;
    color: var(--color-text);
  }

  p, .btn, input, textarea, select {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Buttons */
  .btn {
    font-weight: 500;
    letter-spacing: 0.01em;
    border-radius: var(--border-radius);
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
  }

  .btn-primary {
    background: var(--color-primary);
    color: white;
    border: none;
    box-shadow: var(--shadow-md);
  }

  .btn-primary:hover {
    background: var(--color-primary-dark);
    box-shadow: var(--shadow-lg);
    transform: translateY(-1px);
  }

  .btn-secondary {
    background: white;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: white;
  }

  .btn-outline {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .btn-outline:hover {
    background: var(--color-background-alt);
    border-color: var(--color-text-secondary);
  }

  /* Cards */
  .service-card,
  .testimonial-card {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    transition: all 0.3s ease;
  }

  .service-card:hover,
  .testimonial-card:hover {
    box-shadow: var(--shadow-xl);
    transform: translateY(-4px);
    border-color: transparent;
  }

  /* Premium Accent */
  .service-icon {
    background: var(--color-primary-light);
    color: var(--color-primary);
  }

  .service-card:hover .service-icon {
    background: var(--gradient-primary);
    color: white;
  }

  /* Hero Sections */
  .hero-split-screen,
  .hero-centered {
    background: var(--gradient-subtle);
  }

  .hero-title {
    position: relative;
    display: inline-block;
  }

  .hero-title::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 4px;
    background: var(--color-accent);
    border-radius: 2px;
  }

  /* Form Styling */
  .contact-form-wrapper {
    background: var(--color-background);
    border: 1px solid var(--color-border);
    box-shadow: var(--shadow-lg);
  }

  .form-input,
  .form-textarea,
  .form-select {
    background: var(--color-background-alt);
    border: 1px solid var(--color-border);
    transition: all 0.2s ease;
  }

  .form-input:hover,
  .form-textarea:hover,
  .form-select:hover {
    border-color: var(--color-text-secondary);
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    background: var(--color-background);
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
  }

  /* Testimonials */
  .testimonial-content {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 1.25rem;
    font-style: italic;
    color: var(--color-text-secondary);
  }

  .testimonial-content::before,
  .testimonial-content::after {
    content: '"';
    font-size: 3rem;
    color: var(--color-accent);
    line-height: 0;
    vertical-align: -0.4em;
  }

  .testimonial-content::before {
    margin-right: 0.25rem;
  }

  .testimonial-content::after {
    margin-left: 0.25rem;
  }

  /* Premium Details */
  .service-link {
    position: relative;
    color: var(--color-primary);
    text-decoration: none;
  }

  .service-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-accent);
    transition: width 0.3s ease;
  }

  .service-link:hover::after {
    width: 100%;
  }

  /* Subtle Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hero-text,
  .service-card,
  .testimonial-slide {
    animation: slideUp 0.8s ease-out;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background-alt);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-secondary);
  }

  /* Section Dividers */
  section {
    position: relative;
  }

  section::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 1px;
    background: var(--gradient-primary);
  }

  section:last-of-type::after {
    display: none;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .hero-title::after {
      width: 40px;
      height: 3px;
    }

    .testimonial-content {
      font-size: 1.125rem;
    }

    .testimonial-content::before,
    .testimonial-content::after {
      font-size: 2rem;
    }
  }
`;
