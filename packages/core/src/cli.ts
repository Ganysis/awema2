#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import * as fs from 'fs-extra';
import * as path from 'path';
import { TemplateComposer, LandingPageConfig } from '@awema/templates';

// Available trades and variants
const TRADES = {
  electricien: {
    name: 'Electricien',
    nameFr: 'Électricien',
    services: [
      { icon: 'zap', title: 'Installation électrique', description: 'Installation complète de systèmes électriques', price: 'À partir de 299€' },
      { icon: 'tool', title: 'Dépannage urgent', description: 'Service de dépannage 24/7 avec intervention rapide', price: 'À partir de 149€' },
      { icon: 'shield', title: 'Mise aux normes', description: 'Mise en conformité et certification électrique', price: 'À partir de 199€' },
      { icon: 'home', title: 'Domotique', description: 'Installation de systèmes domotiques modernes', price: 'À partir de 499€' }
    ],
    testimonials: [
      { name: 'Marie Dubois', role: 'Propriétaire', content: 'Service impeccable et rapide. Je recommande vivement!', rating: 5 },
      { name: 'Jean Martin', role: 'Gérant restaurant', content: 'Intervention en urgence parfaite. Très professionnel.', rating: 5 },
      { name: 'Sophie Laurent', role: 'Syndic', content: 'Nous faisons confiance à cette entreprise depuis 5 ans.', rating: 5 }
    ]
  },
  plombier: {
    name: 'Plombier',
    nameFr: 'Plombier',
    services: [
      { icon: 'droplet', title: 'Détection de fuites', description: 'Détection et réparation de fuites avec équipement moderne', price: 'À partir de 175€' },
      { icon: 'settings', title: 'Installation sanitaire', description: 'Installation et remplacement de tuyauterie', price: 'À partir de 450€' },
      { icon: 'thermometer', title: 'Chauffe-eau', description: 'Installation et entretien de chauffe-eau', price: 'À partir de 350€' },
      { icon: 'home', title: 'Rénovation salle de bain', description: 'Plomberie complète pour rénovation', price: 'Sur devis' }
    ],
    testimonials: [
      { name: 'Pierre Durand', role: 'Particulier', content: 'Travail soigné et prix correct. Très satisfait!', rating: 5 },
      { name: 'Lucie Bernard', role: 'Propriétaire', content: 'Équipe professionnelle et ponctuelle.', rating: 5 }
    ]
  },
  menuisier: {
    name: 'Menuisier',
    nameFr: 'Menuisier',
    services: [
      { icon: 'tool', title: 'Menuiserie sur mesure', description: 'Création de meubles et aménagements personnalisés', price: 'Sur devis' },
      { icon: 'home', title: 'Pose de parquet', description: 'Installation professionnelle de tous types de parquets', price: 'À partir de 45€/m²' },
      { icon: 'settings', title: 'Rénovation', description: 'Rénovation complète de menuiseries anciennes', price: 'Sur devis' },
      { icon: 'shield', title: 'Isolation', description: 'Amélioration de l\'isolation par menuiseries', price: 'À partir de 250€' }
    ],
    testimonials: [
      { name: 'Marc Petit', role: 'Architecte', content: 'Travail d\'artisan de grande qualité.', rating: 5 },
      { name: 'Claire Moreau', role: 'Particulier', content: 'Très beau travail sur notre cuisine.', rating: 5 }
    ]
  },
  peintre: {
    name: 'Peintre',
    nameFr: 'Peintre en bâtiment',
    services: [
      { icon: 'droplet', title: 'Peinture intérieure', description: 'Peinture de qualité pour tous vos espaces intérieurs', price: 'À partir de 25€/m²' },
      { icon: 'home', title: 'Ravalement façade', description: 'Rénovation complète de façades extérieures', price: 'Sur devis' },
      { icon: 'tool', title: 'Enduits décoratifs', description: 'Application d\'enduits décoratifs haut de gamme', price: 'À partir de 45€/m²' },
      { icon: 'shield', title: 'Protection anti-humidité', description: 'Traitement et protection contre l\'humidité', price: 'À partir de 35€/m²' }
    ],
    testimonials: [
      { name: 'Émilie Rousseau', role: 'Décoratrice', content: 'Finitions parfaites, je recommande!', rating: 5 },
      { name: 'Thomas Leroy', role: 'Promoteur', content: 'Toujours un travail de qualité.', rating: 5 }
    ]
  },
  carreleur: {
    name: 'Carreleur',
    nameFr: 'Carreleur',
    services: [
      { icon: 'tool', title: 'Pose de carrelage', description: 'Pose professionnelle tous types de carrelages', price: 'À partir de 35€/m²' },
      { icon: 'droplet', title: 'Salle de bain', description: 'Carrelage complet pour salles de bain', price: 'À partir de 45€/m²' },
      { icon: 'home', title: 'Terrasse', description: 'Carrelage extérieur résistant aux intempéries', price: 'À partir de 55€/m²' },
      { icon: 'settings', title: 'Rénovation', description: 'Rénovation et remplacement de carrelages anciens', price: 'Sur devis' }
    ],
    testimonials: [
      { name: 'Nathalie Simon', role: 'Propriétaire', content: 'Travail minutieux et résultat superbe.', rating: 5 },
      { name: 'Robert Blanc', role: 'Hôtelier', content: 'Excellent travail sur notre hall d\'entrée.', rating: 5 }
    ]
  }
};

const VARIANTS = ['ultra-pro', 'premium', 'minimal'];

const program = new Command();

program
  .name('awema')
  .description('AWEMA CLI - Generate high-performance websites for trades')
  .version('1.0.0');

program
  .command('generate')
  .description('Generate a new website')
  .option('-t, --trade <trade>', 'Trade/profession (electricien, plombier, menuisier, peintre, carreleur)')
  .option('-v, --variant <variant>', 'Design variant (ultra-pro, premium, minimal)', 'ultra-pro')
  .option('-n, --name <name>', 'Business name')
  .option('-o, --output <path>', 'Output directory', path.join(process.cwd(), '..', 'preview-server', 'output'))
  .option('--no-optimize', 'Skip optimization steps')
  .action(async (options: any) => {
    const spinner = ora();
    
    try {
      // Validate trade
      if (!options.trade || !TRADES[options.trade as keyof typeof TRADES]) {
        console.error(chalk.red('Error: Invalid or missing trade.'));
        console.log('Available trades:', Object.keys(TRADES).join(', '));
        process.exit(1);
      }
      
      // Validate variant
      if (!VARIANTS.includes(options.variant)) {
        console.error(chalk.red('Error: Invalid variant.'));
        console.log('Available variants:', VARIANTS.join(', '));
        process.exit(1);
      }
      
      const trade = TRADES[options.trade as keyof typeof TRADES];
      const businessName = options.name || `${trade.nameFr} Pro Services`;
      const outputName = `${options.trade}-${options.variant}-${Date.now()}`;
      const outputPath = path.join(options.output, outputName);
      
      console.log(chalk.cyan('\n🚀 AWEMA Site Generator\n'));
      console.log(chalk.gray('Trade:'), chalk.white(trade.name));
      console.log(chalk.gray('Variant:'), chalk.white(options.variant));
      console.log(chalk.gray('Business:'), chalk.white(businessName));
      console.log(chalk.gray('Output:'), chalk.white(outputPath));
      console.log();
      
      // Create output directory
      spinner.start('Creating output directory...');
      await fs.ensureDir(outputPath);
      await fs.ensureDir(path.join(outputPath, 'css'));
      await fs.ensureDir(path.join(outputPath, 'js'));
      await fs.ensureDir(path.join(outputPath, 'images'));
      spinner.succeed('Output directory created');
      
      // Generate site configuration
      spinner.start('Generating site configuration...');
      const config: LandingPageConfig & { variant: string } = {
        variant: options.variant,
        businessName: businessName,
        businessType: trade.nameFr,
        contactInfo: {
          phone: '01 23 45 67 89',
          email: `contact@${businessName.toLowerCase().replace(/\s+/g, '-')}.fr`,
          address: '123 rue de la République, 75001 Paris',
          hours: 'Lun-Ven: 8h-18h, Sam: 9h-12h, Urgences 24/7'
        },
        services: trade.services,
        testimonials: trade.testimonials.map((t: any, i: number) => ({
          ...t,
          image: `/testimonial-${i + 1}.jpg`
        })),
        heroImage: `/${options.trade}-hero.jpg`,
        colorScheme: options.variant === 'ultra-pro' ? {
          primary: '#00D9FF',
          secondary: '#FF00FF',
          accent: '#00FF88'
        } : undefined
      };
      spinner.succeed('Configuration generated');
      
      // Generate site
      spinner.start('Generating website...');
      const composer = new TemplateComposer();
      
      // Create blocks for the landing page
      const blocks = [
        {
          blockId: 'simple-header',
          order: 0,
          props: {
            companyName: config.businessName,
            navItems: ['Accueil', 'Services', 'À propos', 'Contact']
          },
          variants: []
        },
        {
          blockId: 'hero-centered',
          order: 1,
          props: {
            title: `${config.businessName} - ${config.businessType} Professionnel`,
            subtitle: 'Service de qualité, prix compétitifs et satisfaction garantie',
            ctaText: 'Demander un devis',
            ctaLink: '#contact'
          },
          variants: []
        },
        {
          blockId: 'services-grid-cards',
          order: 2,
          props: {
            title: 'Nos Services',
            subtitle: 'Des solutions adaptées à vos besoins',
            services: config.services
          },
          variants: []
        },
        {
          blockId: 'features-clean',
          order: 3,
          props: {
            title: 'Pourquoi nous choisir ?',
            features: config.features.map((feature: string) => ({
              title: feature,
              description: '',
              icon: 'check'
            }))
          },
          variants: []
        },
        {
          blockId: 'contact-form-map',
          order: 4,
          props: {
            title: 'Contactez-nous',
            phone: config.phone,
            email: config.email
          },
          variants: []
        },
        {
          blockId: 'simple-footer',
          order: 5,
          props: {
            companyName: config.businessName,
            phone: config.phone,
            email: config.email
          },
          variants: []
        }
      ];
      
      const pageContent = composer.composePage({
        template: 'landing-page',
        variant: config.theme?.variant || 'minimal',
        blocks,
        customStyles: ''
      });
      
      // Generate complete HTML
      const html = generateCompleteHTML(config, pageContent);
      spinner.succeed('Website generated');
      
      // Write files
      spinner.start('Writing files...');
      await fs.writeFile(path.join(outputPath, 'index.html'), html);
      await fs.writeFile(path.join(outputPath, 'css', 'main.css'), pageContent.css);
      
      // Generate sitemap
      const sitemap = generateSitemap(businessName);
      await fs.writeFile(path.join(outputPath, 'sitemap.xml'), sitemap);
      
      // Generate robots.txt
      const robots = generateRobotsTxt(businessName);
      await fs.writeFile(path.join(outputPath, 'robots.txt'), robots);
      
      // Write JS if present
      if (pageContent.js) {
        await fs.writeFile(path.join(outputPath, 'js', 'main.js'), pageContent.js);
      }
      spinner.succeed('Files written');
      
      // Generate performance report
      const stats = await generateStats(outputPath);
      
      console.log(chalk.green('\n✅ Site generated successfully!\n'));
      console.log(chalk.cyan('📊 Generation Statistics:'));
      console.log(chalk.gray('  Files:'), `${stats.fileCount} files`);
      console.log(chalk.gray('  Size:'), `${stats.totalSize} KB`);
      console.log(chalk.gray('  HTML:'), `${stats.htmlSize} KB`);
      console.log(chalk.gray('  CSS:'), `${stats.cssSize} KB`);
      if (stats.jsSize > 0) {
        console.log(chalk.gray('  JS:'), `${stats.jsSize} KB`);
      }
      
      console.log(chalk.yellow('\n🌐 Preview your site:'));
      console.log(chalk.white(`   http://localhost:3001/sites/${outputName}`));
      console.log(chalk.gray('\n   Run "pnpm preview" to start the preview server'));
      
    } catch (error) {
      spinner.fail('Generation failed');
      console.error(chalk.red('\nError:'), (error as Error).message);
      process.exit(1);
    }
  });

program
  .command('list-trades')
  .description('List available trades')
  .action(() => {
    console.log(chalk.cyan('\n📋 Available Trades:\n'));
    Object.entries(TRADES).forEach(([key, trade]) => {
      console.log(chalk.yellow(`  ${key}`), chalk.gray('-'), trade.nameFr);
    });
    console.log();
  });

program
  .command('list-variants')
  .description('List available design variants')
  .action(() => {
    console.log(chalk.cyan('\n🎨 Available Variants:\n'));
    console.log(chalk.yellow('  ultra-pro'), chalk.gray('- Modern, vibrant design with gradients'));
    console.log(chalk.yellow('  premium'), chalk.gray('- Elegant, professional design'));
    console.log(chalk.yellow('  minimal'), chalk.gray('- Clean, minimalist design'));
    console.log();
  });

// Helper functions
function generateCompleteHTML(config: any, pageContent: any): string {
  const fontLinks = config.variant === 'premium' ? `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  ` : `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  `;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.businessName} - ${config.businessType} Professionnel</title>
    <meta name="description" content="${config.businessType} professionnel. Service de qualité, prix compétitifs et satisfaction garantie.">
    
    <!-- Critical CSS -->
    <style>${pageContent.criticalCSS}</style>
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="css/main.css">
    
    <!-- Fonts -->
    ${fontLinks}
    
    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="alternate icon" href="/favicon.ico">
</head>
<body>
    <!-- SVG Icons -->
    ${generateSVGIcons()}
    
    ${pageContent.html}
    
    ${pageContent.js ? `<script src="js/main.js" defer></script>` : ''}
</body>
</html>`;
}

function generateSVGIcons(): string {
  return `<svg style="display: none;">
    <symbol id="icon-zap" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </symbol>
    <symbol id="icon-tool" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </symbol>
    <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    </symbol>
    <symbol id="icon-home" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </symbol>
    <symbol id="icon-droplet" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
    </symbol>
    <symbol id="icon-settings" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3m20.12-6.12l-4.24 4.24m-9.76 9.76l-4.24 4.24m0-16.97l4.24 4.24m9.76 9.76l4.24 4.24"></path>
    </symbol>
    <symbol id="icon-thermometer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
    </symbol>
    <symbol id="icon-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </symbol>
    <symbol id="icon-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </symbol>
    <symbol id="icon-map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </symbol>
    <symbol id="icon-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </symbol>
    <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </symbol>
    <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="20 6 9 17 4 12"></polyline>
    </symbol>
    <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="15 18 9 12 15 6"></polyline>
    </symbol>
    <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="9 18 15 12 9 6"></polyline>
    </symbol>
  </svg>`;
}

function generateSitemap(businessName: string): string {
  const domain = businessName.toLowerCase().replace(/\s+/g, '-');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.${domain}.fr/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
}

function generateRobotsTxt(businessName: string): string {
  const domain = businessName.toLowerCase().replace(/\s+/g, '-');
  return `User-agent: *
Allow: /
Sitemap: https://www.${domain}.fr/sitemap.xml`;
}

async function generateStats(outputPath: string): Promise<any> {
  const stats = {
    fileCount: 0,
    totalSize: 0,
    htmlSize: 0,
    cssSize: 0,
    jsSize: 0
  };
  
  try {
    const files = await fs.readdir(outputPath, { recursive: true });
    
    for (const file of files) {
      const filePath = path.join(outputPath, file.toString());
      const stat = await fs.stat(filePath);
      
      if (stat.isFile()) {
        stats.fileCount++;
        const sizeInKB = Math.round(stat.size / 1024);
        stats.totalSize += sizeInKB;
        
        if (file.toString().endsWith('.html')) {
          stats.htmlSize += sizeInKB;
        } else if (file.toString().endsWith('.css')) {
          stats.cssSize += sizeInKB;
        } else if (file.toString().endsWith('.js')) {
          stats.jsSize += sizeInKB;
        }
      }
    }
  } catch (error) {
    console.error('Error generating stats:', error);
  }
  
  return stats;
}

// Run the CLI
program.parse(process.argv);