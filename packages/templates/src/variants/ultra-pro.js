import { LayoutStyle } from '@awema/shared';
export const ultraProVariant = {
    id: 'ultra-pro',
    name: 'Ultra Pro 2030',
    description: 'Modern futuristic design with bold gradients and animations',
    thumbnail: '/variants/ultra-pro.jpg',
    colorScheme: {
        name: 'Ultra Pro',
        colors: {
            primary: '#00D9FF', // Electric cyan
            secondary: '#FF00FF', // Magenta
            accent: '#00FF88', // Neon green
            background: '#0A0E27', // Deep space blue
            text: '#FFFFFF' // White
        }
    },
    layoutStyle: LayoutStyle.MODERN
};
export const ultraProStyles = `
  /* Ultra Pro 2030 Variables */
  :root {
    --color-primary: #00D9FF;
    --color-primary-dark: #00A8CC;
    --color-primary-light: #33E3FF;
    --color-secondary: #FF00FF;
    --color-secondary-dark: #CC00CC;
    --color-secondary-light: #FF33FF;
    --color-accent: #00FF88;
    --color-background: #0A0E27;
    --color-background-alt: #0F1433;
    --color-text: #FFFFFF;
    --color-text-secondary: #B8BED9;
    --color-border: #1A2144;
    --color-error: #FF3366;
    --color-warning: #FFB800;
    --color-success: #00FF88;
    
    --border-radius: 12px;
    --border-radius-lg: 24px;
    --border-radius-xl: 32px;
    
    --shadow-sm: 0 2px 8px rgba(0, 217, 255, 0.1);
    --shadow-md: 0 4px 20px rgba(0, 217, 255, 0.15);
    --shadow-lg: 0 8px 40px rgba(0, 217, 255, 0.2);
    --shadow-glow: 0 0 30px rgba(0, 217, 255, 0.5);
    
    --gradient-primary: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
    --gradient-dark: linear-gradient(180deg, var(--color-background) 0%, #0A0E27 100%);
    --gradient-text: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  }

  /* Global Styles */
  body {
    background-color: var(--color-background);
    color: var(--color-text);
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 800;
    letter-spacing: -0.02em;
  }

  /* Gradient Text Effect */
  .gradient-text {
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Buttons */
  .btn {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-radius: var(--border-radius-xl);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  .btn:hover::before {
    width: 300px;
    height: 300px;
  }

  .btn-primary {
    background: var(--gradient-primary);
    color: var(--color-background);
    border: none;
    box-shadow: var(--shadow-glow);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 40px rgba(0, 217, 255, 0.4);
  }

  .btn-secondary {
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
  }

  .btn-secondary:hover {
    background: var(--color-primary);
    color: var(--color-background);
    box-shadow: var(--shadow-glow);
  }

  .btn-outline {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
  }

  .btn-outline:hover {
    border-color: var(--color-primary);
    color: var(--color-primary);
  }

  /* Cards with Glow Effect */
  .service-card,
  .testimonial-card,
  .contact-form-wrapper {
    background: rgba(15, 20, 51, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid var(--color-border);
    position: relative;
  }

  .service-card::before,
  .testimonial-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: var(--gradient-primary);
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  .service-card:hover::before,
  .testimonial-card:hover::before {
    opacity: 1;
  }

  /* Animated Background */
  .hero-split-screen,
  .hero-centered {
    position: relative;
    overflow: hidden;
  }

  .hero-split-screen::before,
  .hero-centered::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--color-primary) 0%, transparent 70%);
    opacity: 0.1;
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(180deg);
    }
  }

  /* Neon Glow Icons */
  .service-icon {
    background: rgba(0, 217, 255, 0.1);
    border: 1px solid var(--color-primary);
    box-shadow: inset 0 0 20px rgba(0, 217, 255, 0.2);
  }

  .service-icon svg {
    filter: drop-shadow(0 0 10px currentColor);
  }

  /* Form Inputs */
  .form-input,
  .form-textarea,
  .form-select {
    background: rgba(15, 20, 51, 0.5);
    border: 1px solid var(--color-border);
    color: var(--color-text);
  }

  .form-input:focus,
  .form-textarea:focus,
  .form-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px rgba(0, 217, 255, 0.2), var(--shadow-glow);
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 12px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gradient-primary);
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-primary);
  }

  /* Animations */
  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
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

  .hero-text {
    animation: slideInFromLeft 1s ease-out;
  }

  .hero-media {
    animation: slideInFromRight 1s ease-out;
  }

  /* Responsive */
  @media (max-width: 768px) {
    :root {
      --border-radius: 8px;
      --border-radius-lg: 16px;
      --border-radius-xl: 24px;
    }
  }
`;
