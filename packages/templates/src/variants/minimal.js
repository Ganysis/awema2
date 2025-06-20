import { LayoutStyle } from '@awema/shared';
export const minimalVariant = {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Clean, minimalist design with focus on content and whitespace',
    thumbnail: '/variants/minimal.jpg',
    colorScheme: {
        name: 'Minimal',
        colors: {
            primary: '#000000', // Black
            secondary: '#666666', // Dark gray
            accent: '#0066CC', // Blue accent
            background: '#FFFFFF', // White
            text: '#333333' // Dark gray
        }
    },
    layoutStyle: LayoutStyle.MINIMAL
};
export const minimalStyles = `
  /* Minimal Clean Variables */
  :root {
    --color-primary: #000000;
    --color-primary-dark: #000000;
    --color-primary-light: #F5F5F5;
    --color-secondary: #666666;
    --color-secondary-dark: #333333;
    --color-secondary-light: #999999;
    --color-accent: #0066CC;
    --color-background: #FFFFFF;
    --color-background-alt: #FAFAFA;
    --color-text: #333333;
    --color-text-secondary: #666666;
    --color-border: #EEEEEE;
    --color-error: #CC0000;
    --color-warning: #FF9900;
    --color-success: #339900;
    
    --border-radius: 0;
    --border-radius-lg: 0;
    --border-radius-xl: 0;
    
    --shadow-sm: none;
    --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-xl: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  /* Global Styles */
  * {
    box-sizing: border-box;
  }

  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 400;
    letter-spacing: -0.01em;
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    line-height: 1.2;
  }

  h2 {
    font-size: 2rem;
    line-height: 1.3;
  }

  h3 {
    font-size: 1.5rem;
    line-height: 1.4;
  }

  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  /* Links */
  a {
    color: var(--color-accent);
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.7;
  }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    font-weight: 400;
    text-align: center;
    border: 1px solid;
    transition: all 0.2s ease;
    cursor: pointer;
    background: transparent;
  }

  .btn-primary {
    background: var(--color-primary);
    color: var(--color-background);
    border-color: var(--color-primary);
  }

  .btn-primary:hover {
    background: var(--color-background);
    color: var(--color-primary);
  }

  .btn-secondary {
    background: var(--color-background);
    color: var(--color-primary);
    border-color: var(--color-primary);
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: var(--color-background);
  }

  .btn-outline {
    background: transparent;
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .btn-outline:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  /* Layout */
  section {
    padding: 4rem 0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Hero */
  .hero-split-screen,
  .hero-centered {
    padding: 6rem 0;
  }

  .hero-title {
    font-weight: 300;
    margin-bottom: 2rem;
  }

  .hero-subtitle {
    font-weight: 300;
    color: var(--color-text-secondary);
    margin-bottom: 3rem;
  }

  .hero-image {
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }

  .hero-image:hover {
    filter: grayscale(0%);
  }

  /* Services */
  .services-grid {
    padding: 6rem 0;
    background: var(--color-background);
  }

  .service-card {
    background: var(--color-background);
    padding: 2rem;
    border: 1px solid var(--color-border);
    transition: border-color 0.2s ease;
  }

  .service-card:hover {
    border-color: var(--color-primary);
  }

  .service-icon {
    display: none;
  }

  .service-title {
    font-size: 1.25rem;
    font-weight: 400;
    margin-bottom: 1rem;
  }

  .service-description {
    color: var(--color-text-secondary);
    line-height: 1.8;
  }

  .service-link {
    color: var(--color-primary);
    font-weight: 400;
    text-decoration: underline;
    text-underline-offset: 4px;
  }

  /* Contact */
  .contact-section {
    background: var(--color-background-alt);
    padding: 6rem 0;
  }

  .contact-form-wrapper {
    background: var(--color-background);
    padding: 3rem;
    border: 1px solid var(--color-border);
    box-shadow: none;
  }

  .form-label {
    font-size: 0.875rem;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-secondary);
  }

  .form-input,
  .form-textarea,
  .form-select {
    background: var(--color-background);
    border: none;
    border-bottom: 1px solid var(--color-border);
    padding: 0.5rem 0;
    transition: border-color 0.2s ease;
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-bottom-color: var(--color-primary);
    box-shadow: none;
  }

  /* Testimonials */
  .testimonials {
    padding: 6rem 0;
  }

  .testimonial-content {
    font-weight: 300;
    font-style: normal;
    color: var(--color-text);
  }

  .testimonial-content p {
    quotes: none;
  }

  .testimonial-content p::before,
  .testimonial-content p::after {
    content: '';
  }

  .testimonial-rating {
    display: none;
  }

  .testimonial-image {
    display: none;
  }

  .testimonial-name {
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 0.875rem;
  }

  .testimonial-role {
    font-size: 0.75rem;
    color: var(--color-text-secondary);
  }

  /* Carousel */
  .carousel-dots {
    margin-top: 3rem;
  }

  .carousel-dot {
    width: 40px;
    height: 1px;
    background: var(--color-border);
    border-radius: 0;
  }

  .carousel-dot.active {
    background: var(--color-primary);
  }

  .carousel-prev,
  .carousel-next {
    display: none;
  }

  /* Spacing */
  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.5rem; }
  .mb-2 { margin-bottom: 1rem; }
  .mb-3 { margin-bottom: 2rem; }
  .mb-4 { margin-bottom: 3rem; }
  .mb-5 { margin-bottom: 4rem; }

  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.5rem; }
  .mt-2 { margin-top: 1rem; }
  .mt-3 { margin-top: 2rem; }
  .mt-4 { margin-top: 3rem; }
  .mt-5 { margin-top: 4rem; }

  /* Grid */
  .grid {
    display: grid;
    gap: 2rem;
  }

  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  /* Utility Classes */
  .text-center {
    text-align: center;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .uppercase {
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* Animations - Minimal */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-out;
  }

  /* Responsive */
  @media (max-width: 768px) {
    section {
      padding: 3rem 0;
    }

    h1 {
      font-size: 2rem;
    }

    h2 {
      font-size: 1.5rem;
    }

    .grid-cols-2,
    .grid-cols-3 {
      grid-template-columns: 1fr;
    }

    .hero-split-screen,
    .hero-centered {
      padding: 4rem 0;
    }
  }

  /* Print Styles */
  @media print {
    * {
      background: transparent !important;
      color: #000 !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }

    a,
    a:visited {
      text-decoration: underline;
    }

    a[href]:after {
      content: " (" attr(href) ")";
    }
  }
`;
