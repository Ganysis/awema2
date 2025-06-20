import { TemplateComposer, LandingPageConfig } from '@awema/templates';
import * as fs from 'fs/promises';
import * as path from 'path';

async function generateExampleSites() {
  const composer = new TemplateComposer();

  // Example 1: Electrician landing page with ultra-pro variant
  const electricianConfig: LandingPageConfig & { variant: string } = {
    variant: 'ultra-pro',
    businessName: 'ElectricPro Solutions',
    businessType: 'Electrical Services',
    contactInfo: {
      phone: '(555) 123-4567',
      email: 'info@electricpro.com',
      address: '123 Main Street, Tech City, TC 12345',
      hours: 'Mon-Fri: 7AM-6PM, Sat: 8AM-2PM, Emergency 24/7'
    },
    services: [
      {
        icon: 'zap',
        title: 'Electrical Installation',
        description: 'Professional installation of electrical systems for homes and businesses',
        price: 'From $299'
      },
      {
        icon: 'tool',
        title: 'Emergency Repairs',
        description: '24/7 emergency electrical repair services with rapid response',
        price: 'From $149'
      },
      {
        icon: 'shield',
        title: 'Safety Inspections',
        description: 'Comprehensive electrical safety inspections and certifications',
        price: 'From $199'
      },
      {
        icon: 'home',
        title: 'Smart Home Setup',
        description: 'Modern smart home electrical installations and automation',
        price: 'From $499'
      }
    ],
    testimonials: [
      {
        name: 'David Chen',
        role: 'Homeowner',
        content: 'ElectricPro solved our electrical issues quickly and professionally. Their 24/7 service saved us!',
        rating: 5,
        image: '/testimonial-1.jpg'
      },
      {
        name: 'Maria Rodriguez',
        role: 'Restaurant Owner',
        content: 'Excellent commercial electrical work. They minimized downtime and delivered on schedule.',
        rating: 5,
        image: '/testimonial-2.jpg'
      },
      {
        name: 'James Wilson',
        role: 'Property Manager',
        content: 'We use ElectricPro for all our properties. Reliable, fair pricing, and great communication.',
        rating: 5,
        image: '/testimonial-3.jpg'
      }
    ],
    heroImage: '/electrician-hero.jpg',
    colorScheme: {
      primary: '#00D9FF',
      secondary: '#FF00FF',
      accent: '#00FF88'
    }
  };

  // Example 2: Plumber site with premium variant
  const plumberConfig: LandingPageConfig & { variant: string } = {
    variant: 'premium',
    businessName: 'Premium Plumbing Services',
    businessType: 'Plumbing',
    contactInfo: {
      phone: '(555) 987-6543',
      email: 'service@premiumplumbing.com',
      address: '456 Oak Avenue, Riverside, RS 54321',
      hours: 'Mon-Sat: 8AM-6PM, Emergency Service Available'
    },
    services: [
      {
        icon: 'droplet',
        title: 'Leak Detection & Repair',
        description: 'Advanced leak detection technology and expert repair services',
        price: 'From $175'
      },
      {
        icon: 'settings',
        title: 'Pipe Installation',
        description: 'New pipe installation and replacement with warranty',
        price: 'From $450'
      },
      {
        icon: 'thermometer',
        title: 'Water Heater Services',
        description: 'Installation, repair, and maintenance of water heaters',
        price: 'From $350'
      },
      {
        icon: 'home',
        title: 'Bathroom Renovation',
        description: 'Complete bathroom plumbing for renovations and remodels',
        price: 'Custom Quote'
      }
    ],
    testimonials: [
      {
        name: 'Elizabeth Thompson',
        role: 'Homeowner',
        content: 'Premium Plumbing exceeded our expectations. Professional, clean, and efficient work.',
        rating: 5,
        image: '/testimonial-4.jpg'
      },
      {
        name: 'Robert Johnson',
        role: 'Building Manager',
        content: 'They handle all our commercial plumbing needs. Always reliable and professional.',
        rating: 5,
        image: '/testimonial-5.jpg'
      }
    ],
    heroImage: '/plumber-hero.jpg'
  };

  // Generate the sites
  const sites = [
    { name: 'electrician-ultra-pro', config: electricianConfig },
    { name: 'plumber-premium', config: plumberConfig }
  ];

  for (const site of sites) {
    console.log(`\nGenerating ${site.name} site...`);
    
    // Generate the page content
    const pageContent = composer.generateLandingPage(site.config);
    
    // Create output directory
    const outputDir = path.join(process.cwd(), 'generated-sites', site.name);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.mkdir(path.join(outputDir, 'css'), { recursive: true });
    await fs.mkdir(path.join(outputDir, 'js'), { recursive: true });
    
    // Generate complete HTML
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${site.config.businessName} - Professional ${site.config.businessType}</title>
    <meta name="description" content="Professional ${site.config.businessType} services. Quality work, competitive prices, and excellent customer service.">
    
    <!-- Critical CSS -->
    <style>${pageContent.criticalCSS}</style>
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://unpkg.com/feather-icons@4.29.0/dist/feather.css">
    
    <!-- Main CSS -->
    <link rel="stylesheet" href="css/main.css">
    
    <!-- Fonts -->
    ${site.config.variant === 'premium' ? `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    ` : `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    `}
</head>
<body>
    <!-- SVG Icons -->
    <svg style="display: none;">
        <symbol id="icon-wrench" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </symbol>
        <symbol id="icon-tools" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </symbol>
        <symbol id="icon-shield-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <polyline points="9 12 12 15 16 10"></polyline>
        </symbol>
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
        <symbol id="icon-arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
        </symbol>
        <symbol id="icon-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
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
        <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6"></polyline>
        </symbol>
        <symbol id="icon-chevron-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"></polyline>
        </symbol>
    </svg>

    ${pageContent.html}
    
    ${pageContent.js ? `<script>${pageContent.js}</script>` : ''}
</body>
</html>`;

    // Write files
    await fs.writeFile(path.join(outputDir, 'index.html'), html);
    await fs.writeFile(path.join(outputDir, 'css', 'main.css'), pageContent.css);
    
    // Generate sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.${site.config.businessName.toLowerCase().replace(/\s+/g, '')}.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`;
    
    await fs.writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);
    
    // Generate robots.txt
    const robots = `User-agent: *
Allow: /
Sitemap: https://www.${site.config.businessName.toLowerCase().replace(/\s+/g, '')}.com/sitemap.xml`;
    
    await fs.writeFile(path.join(outputDir, 'robots.txt'), robots);
    
    console.log(`✓ Generated ${site.name} site in generated-sites/${site.name}/`);
    console.log(`  - Variant: ${site.config.variant}`);
    console.log(`  - Blocks: 4`);
    console.log(`  - Files: index.html, css/main.css, sitemap.xml, robots.txt`);
  }
}

// Run the generator
generateExampleSites()
  .then(() => console.log('\n✅ All sites generated successfully!'))
  .catch(error => console.error('❌ Error generating sites:', error));