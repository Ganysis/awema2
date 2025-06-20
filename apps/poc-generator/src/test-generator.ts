import { AWEMAGenerator } from '@awema/core';
import {
  Project,
  ProjectStatus,
  TemplateCategory,
  Environment,
  GeneratorConfig,
  OGType,
  TwitterCard,
  ChangeFrequency,
  FontDisplay,
  ScriptTarget,
  CacheStrategy,
  ImageFormat,
  PlaceholderType
} from '@awema/shared';
import * as path from 'path';

async function testGenerator() {
  console.log('🚀 Starting AWEMA Generator POC Test...\n');
  
  const startTime = Date.now();
  
  // Create a sample project
  const project: Project = {
    id: 'poc-project-1',
    name: 'Tech Solutions Inc',
    domain: 'techsolutions.example.com',
    businessInfo: {
      companyName: 'Tech Solutions Inc',
      industry: {
        category: 'Technology',
        subCategory: 'Software Development',
        keywords: ['software', 'web development', 'mobile apps', 'cloud solutions']
      },
      description: 'We provide cutting-edge software solutions for businesses of all sizes',
      targetAudience: {
        demographics: {
          ageRange: [25, 55],
          gender: ['male', 'female', 'all'] as any,
          income: 'medium' as any,
          education: ['bachelors', 'masters'] as any,
          location: ['United States', 'Canada', 'Europe']
        },
        psychographics: {
          interests: ['technology', 'innovation', 'business growth'],
          values: ['efficiency', 'quality', 'innovation'],
          lifestyle: ['tech-savvy', 'professional', 'entrepreneurial'],
          challenges: ['digital transformation', 'scalability', 'security']
        },
        behaviors: ['online research', 'comparison shopping', 'value quality over price']
      },
      services: [
        {
          id: 'web-dev',
          name: 'Web Development',
          description: 'Custom web applications built with modern technologies',
          features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Secure'],
          category: 'Development'
        },
        {
          id: 'mobile-dev',
          name: 'Mobile Development',
          description: 'Native and cross-platform mobile applications',
          features: ['iOS & Android', 'React Native', 'Flutter', 'Native Performance'],
          category: 'Development'
        },
        {
          id: 'cloud-services',
          name: 'Cloud Services',
          description: 'Scalable cloud infrastructure and deployment',
          features: ['AWS', 'Google Cloud', 'Azure', '24/7 Support'],
          category: 'Infrastructure'
        }
      ],
      contact: {
        email: 'info@techsolutions.com',
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Tech Street',
          city: 'San Francisco',
          state: 'CA',
          postalCode: '94105',
          country: 'USA'
        },
        hours: {
          monday: { open: '9:00', close: '18:00' },
          tuesday: { open: '9:00', close: '18:00' },
          wednesday: { open: '9:00', close: '18:00' },
          thursday: { open: '9:00', close: '18:00' },
          friday: { open: '9:00', close: '18:00' },
          saturday: { closed: true },
          sunday: { closed: true }
        }
      },
      socialMedia: {
        facebook: 'https://facebook.com/techsolutions',
        linkedin: 'https://linkedin.com/company/techsolutions',
        twitter: 'https://twitter.com/techsolutions'
      },
      branding: {
        colors: {
          primary: '#0066cc',
          secondary: '#0052a3',
          accent: '#ff6b6b'
        },
        tagline: 'Innovating Your Digital Future',
        mission: 'To empower businesses with cutting-edge technology solutions',
        values: ['Innovation', 'Quality', 'Integrity', 'Customer Success']
      },
      location: {
        coordinates: {
          lat: 37.7749,
          lng: -122.4194
        },
        serviceArea: ['San Francisco Bay Area', 'California', 'Remote'],
        isOnline: true
      }
    },
    template: {
      templateId: 'modern-business',
      variant: 'light',
      customizations: {
        colors: {
          primary: '#0066cc',
          secondary: '#0052a3',
          accent: '#ff6b6b',
          background: '#ffffff',
          text: '#333333',
          textSecondary: '#666666',
          border: '#e0e0e0',
          error: '#ff0000',
          warning: '#ffaa00',
          success: '#00aa00'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter',
          mono: 'Fira Code',
          baseSize: '16px',
          scale: 1.25
        },
        spacing: {
          baseUnit: 8,
          scale: 1.5
        },
        borderRadius: '4px',
        animations: true
      }
    },
    pages: [
      {
        id: 'home',
        path: '/',
        title: 'Home',
        description: 'Welcome to Tech Solutions - Your partner in digital innovation',
        blocks: [
          {
            id: 'header-1',
            blockId: 'header',
            order: 1,
            props: {},
            variants: [],
            hidden: false
          },
          {
            id: 'hero-1',
            blockId: 'hero',
            order: 2,
            props: {
              title: 'Transform Your Business with Technology',
              subtitle: 'We build custom software solutions that drive growth and innovation',
              ctaText: 'Get Started Today',
              ctaLink: '#contact'
            },
            variants: [],
            hidden: false
          },
          {
            id: 'features-1',
            blockId: 'features',
            order: 3,
            props: {
              title: 'Our Services'
            },
            variants: [],
            hidden: false
          },
          {
            id: 'cta-1',
            blockId: 'cta',
            order: 4,
            props: {
              title: 'Ready to Transform Your Business?',
              subtitle: 'Let\'s discuss how we can help you achieve your goals',
              primaryText: 'Schedule a Consultation',
              primaryLink: '#contact'
            },
            variants: [],
            hidden: false
          },
          {
            id: 'footer-1',
            blockId: 'footer',
            order: 5,
            props: {},
            variants: [],
            hidden: false
          }
        ],
        meta: {
          title: 'Tech Solutions - Custom Software Development',
          description: 'Transform your business with custom software solutions. Web development, mobile apps, and cloud services.',
          keywords: ['software development', 'web development', 'mobile apps', 'cloud services']
        },
        isHomePage: true
      }
    ],
    assets: [],
    seo: {
      title: 'Tech Solutions Inc',
      description: 'Custom software development company specializing in web, mobile, and cloud solutions',
      keywords: ['software development', 'web development', 'mobile apps', 'cloud services'],
      author: 'Tech Solutions Inc',
      locale: 'en_US',
      robots: {
        index: true,
        follow: true,
        maxSnippet: 160,
        maxImagePreview: 'large'
      },
      openGraph: {
        type: OGType.WEBSITE,
        title: 'Tech Solutions - Custom Software Development',
        description: 'Transform your business with custom software solutions',
        url: 'https://techsolutions.example.com',
        siteName: 'Tech Solutions Inc',
        locale: 'en_US'
      },
      twitter: {
        card: TwitterCard.SUMMARY_LARGE_IMAGE,
        site: '@techsolutions',
        title: 'Tech Solutions - Custom Software Development',
        description: 'Transform your business with custom software solutions'
      },
      structuredData: [],
      sitemap: {
        enabled: true,
        changeFrequency: ChangeFrequency.WEEKLY,
        priority: 0.8
      }
    },
    performance: {
      optimization: {
        minifyHTML: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true,
        removeWhitespace: true,
        inlineCSS: false,
        inlineJS: false,
        criticalCSS: true,
        lazyLoading: true,
        bundleAssets: true
      },
      caching: {
        enabled: true,
        strategy: CacheStrategy.PUBLIC,
        maxAge: 86400,
        staleWhileRevalidate: 3600,
        public: true
      },
      compression: {
        gzip: true,
        brotli: true,
        level: 6,
        threshold: 1024
      },
      images: {
        formats: [ImageFormat.WEBP, ImageFormat.JPEG],
        quality: 85,
        lazy: true,
        responsive: true,
        webp: true,
        avif: false,
        sizes: [
          { width: 640, suffix: '-sm' },
          { width: 1024, suffix: '-md' },
          { width: 1920, suffix: '-lg' }
        ],
        placeholder: PlaceholderType.BLUR
      },
      fonts: {
        subset: true,
        preload: true,
        display: FontDisplay.SWAP,
        fallbacks: ['Arial', 'sans-serif'],
        variableFont: false
      },
      scripts: {
        defer: true,
        async: false,
        module: true,
        concatenate: true,
        treeShake: true,
        sourceMaps: false,
        target: ScriptTarget.ES2020
      },
      styles: {
        purgeUnused: true,
        autoprefixer: true,
        postcss: true,
        cssModules: false,
        cssInJs: false,
        extractCritical: true
      },
      preloading: {
        fonts: true,
        images: false,
        scripts: false,
        styles: true,
        preconnect: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
        dnsPrefetch: ['https://www.google-analytics.com']
      }
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    status: ProjectStatus.READY
  };

  // Generator configuration
  const config: GeneratorConfig = {
    outputPath: path.join(process.cwd(), 'generated-sites', project.id),
    baseUrl: `https://${project.domain}`,
    environment: Environment.PRODUCTION,
    performance: project.performance,
    seo: project.seo,
    debug: true
  };

  // Create generator instance
  const generator = new AWEMAGenerator(config, {
    parallel: true,
    workers: 4,
    cache: true,
    watch: false,
    verbose: true,
    dryRun: false
  });

  try {
    // Generate the site
    console.log('📦 Generating site...\n');
    const result = await generator.generate(project);
    
    const endTime = Date.now();
    const totalTime = endTime - startTime;
    
    if (result.success) {
      console.log('✅ Generation completed successfully!\n');
      console.log('📊 Generation Statistics:');
      console.log(`   - Total time: ${totalTime}ms (${(totalTime / 1000).toFixed(2)}s)`);
      console.log(`   - Files generated: ${result.metrics.filesGenerated}`);
      console.log(`   - Total size: ${formatBytes(result.metrics.totalSize)}`);
      console.log(`   - Compressed size: ${formatBytes(result.metrics.compressedSize)}`);
      console.log(`   - Performance score: ${result.metrics.performanceScore}/100`);
      console.log(`   - SEO score: ${result.metrics.seoScore}/100`);
      console.log(`   - Output path: ${result.outputPath}\n`);
      
      if (result.warnings.length > 0) {
        console.log('⚠️  Warnings:');
        result.warnings.forEach(warning => console.log(`   - ${warning}`));
        console.log('');
      }
      
      console.log('📁 Generated files:');
      result.files.forEach(file => {
        console.log(`   - ${file.path} (${formatBytes(file.size)}${file.optimized ? ' - optimized' : ''})`);
      });
      
      if (totalTime < 5000) {
        console.log('\n🎉 Goal achieved: Site generated in less than 5 seconds!');
      }
    } else {
      console.error('❌ Generation failed!\n');
      console.error('Errors:');
      result.errors.forEach(error => {
        console.error(`   - ${error.code}: ${error.message}`);
        if (error.stack) {
          console.error(`     ${error.stack}`);
        }
      });
    }
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Run the test
testGenerator().catch(console.error);