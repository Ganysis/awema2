import { NextRequest, NextResponse } from 'next/server';
import { FeaturesRendererV3PerfectEnhanced } from '@/lib/v3/renderers/features-perfect-enhanced.renderer';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const variant = searchParams.get('variant') || 'grid-modern';
  const visualVariant = searchParams.get('visual') || 'modern';

  const renderer = new FeaturesRendererV3PerfectEnhanced();

  // Test data avec features déjà définies
  const testData = {
    title: `Features - ${variant}`,
    subtitle: `Démonstration de la variante ${variant}`,
    variant: variant as any,
    visualVariant: visualVariant as any,
    features: [
      {
        icon: '🚀',
        title: 'Performance Optimale',
        description: 'Notre solution est conçue pour offrir des performances exceptionnelles.',
        linkUrl: '#',
        linkText: 'En savoir plus',
        // Timeline specific
        date: 'Janvier 2024',
        status: 'completed',
        // Comparison table specific
        plans: { basic: true, pro: true, premium: true },
        // Flip card specific
        front: {
          icon: '🚀',
          title: 'Performance',
          subtitle: 'Vitesse et efficacité'
        },
        back: {
          title: 'Performance Détaillée',
          description: 'Architecture optimisée pour des temps de chargement ultra-rapides.',
          features: 'Chargement < 1s\nOptimisation CDN\nCache intelligent',
          buttonText: 'Découvrir',
          buttonUrl: '#'
        }
      },
      {
        icon: '🛡️',
        title: 'Sécurité Renforcée',
        description: 'Protection avancée de vos données avec les dernières technologies.',
        linkUrl: '#',
        linkText: 'En savoir plus',
        date: 'Février 2024',
        status: 'completed',
        plans: { basic: false, pro: true, premium: true },
        front: {
          icon: '🛡️',
          title: 'Sécurité',
          subtitle: 'Protection maximale'
        },
        back: {
          title: 'Sécurité Avancée',
          description: 'Chiffrement de bout en bout et protection contre les menaces.',
          features: 'SSL/TLS\nFirewall WAF\nDétection intrusions',
          buttonText: 'En savoir plus',
          buttonUrl: '#'
        }
      },
      {
        icon: '🎨',
        title: 'Design Moderne',
        description: 'Interface utilisateur élégante et intuitive pour une expérience optimale.',
        linkUrl: '#',
        linkText: 'Voir exemples',
        date: 'Mars 2024',
        status: 'in-progress',
        plans: { basic: true, pro: true, premium: true },
        front: {
          icon: '🎨',
          title: 'Design',
          subtitle: 'Moderne et élégant'
        },
        back: {
          title: 'Design System',
          description: 'Components réutilisables et design system complet.',
          features: 'Figma intégré\nDesign tokens\nAccessibilité A11y',
          buttonText: 'Explorer',
          buttonUrl: '#'
        }
      },
      {
        icon: '📱',
        title: 'Mobile First',
        description: 'Conception responsive adaptée à tous les appareils et écrans.',
        linkUrl: '#',
        linkText: 'Tester',
        date: 'Avril 2024',
        status: 'upcoming',
        plans: { basic: true, pro: true, premium: true },
        front: {
          icon: '📱',
          title: 'Mobile',
          subtitle: 'Responsive design'
        },
        back: {
          title: 'Mobile Optimisé',
          description: 'Experience native sur tous les appareils mobiles.',
          features: 'PWA ready\nTouch optimized\nOffline mode',
          buttonText: 'Découvrir',
          buttonUrl: '#'
        }
      },
      {
        icon: '⚡',
        title: 'API Puissante',
        description: 'API RESTful complète pour intégrer facilement nos services.',
        linkUrl: '#',
        linkText: 'Documentation',
        date: 'Mai 2024',
        status: 'upcoming',
        plans: { basic: false, pro: false, premium: true },
        front: {
          icon: '⚡',
          title: 'API',
          subtitle: 'RESTful & GraphQL'
        },
        back: {
          title: 'API Complète',
          description: 'Endpoints REST et GraphQL pour tous vos besoins.',
          features: 'REST API\nGraphQL\nWebhooks',
          buttonText: 'Docs API',
          buttonUrl: '#'
        }
      },
      {
        icon: '🌍',
        title: 'Global CDN',
        description: 'Distribution mondiale pour une latence minimale partout.',
        linkUrl: '#',
        linkText: 'Carte réseau',
        date: 'Juin 2024',
        status: 'upcoming',
        plans: { basic: false, pro: true, premium: true },
        front: {
          icon: '🌍',
          title: 'CDN',
          subtitle: 'Distribution globale'
        },
        back: {
          title: 'Réseau Mondial',
          description: '200+ points de présence dans le monde entier.',
          features: '< 50ms latence\n99.99% uptime\nAuto-scaling',
          buttonText: 'Voir carte',
          buttonUrl: '#'
        }
      }
    ],
    // Display options
    showIcon: true,
    iconStyle: variant === 'minimal' ? 'outline' : 'filled',
    showLink: true,
    columns: variant === 'masonry-creative' ? 3 : undefined,
    gap: 'md',
    alignment: variant === 'timeline-vertical' ? 'left' : 'center',
    animation: 'fade'
  };

  const context = {
    theme: {
      colors: {
        primary: '#667eea',
        secondary: '#764ba2'
      },
      typography: {
        fonts: {
          heading: 'Inter, system-ui, sans-serif',
          body: 'Inter, system-ui, sans-serif'
        }
      }
    }
  };

  const result = renderer.render(testData, context);

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Features - ${variant}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: Inter, system-ui, sans-serif;
            background: #f9fafb;
            min-height: 100vh;
        }
        ${result.css}
    </style>
</head>
<body>
    ${result.html}
    ${result.js ? `<script>${result.js}</script>` : ''}
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}