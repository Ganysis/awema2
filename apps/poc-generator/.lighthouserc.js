/**
 * Lighthouse CI Configuration
 * Defines performance assertions for AWEMA Phase 1
 */

module.exports = {
  ci: {
    collect: {
      staticDistDir: './generated-sites',
      url: [
        'http://localhost/electrician-ultra-pro/index.html',
        'http://localhost/plumber-premium/index.html',
        'http://localhost/poc-project-1/index.html'
      ],
      numberOfRuns: 3,
      settings: {
        preset: 'desktop',
        throttling: {
          cpuSlowdownMultiplier: 1,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
          requestLatencyMs: 0,
          rttMs: 0
        }
      }
    },
    assert: {
      preset: 'lighthouse:no-pwa',
      assertions: {
        // Performance metrics
        'categories:performance': ['error', { minScore: 0.95 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 1.0 }],
        
        // Core Web Vitals
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'max-potential-fid': ['error', { maxNumericValue: 100 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3400 }],
        
        // Resource efficiency
        'uses-optimized-images': 'error',
        'uses-text-compression': 'error',
        'uses-responsive-images': 'warn',
        'efficient-animated-content': 'warn',
        
        // Best practices
        'no-document-write': 'error',
        'no-vulnerable-libraries': 'error',
        'js-libraries': 'warn',
        'image-aspect-ratio': 'warn',
        
        // Accessibility
        'color-contrast': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'meta-description': 'error',
        'link-text': 'error',
        
        // Bundle size check (100KB = 102400 bytes)
        'resource-summary:script:size': ['error', { maxNumericValue: 51200 }], // 50KB for JS
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 51200 }], // 50KB for CSS
        'resource-summary:total:size': ['error', { maxNumericValue: 102400 }], // 100KB total
        
        // Network efficiency
        'network-requests': ['warn', { maxNumericValue: 50 }],
        'network-rtt': ['warn', { maxNumericValue: 100 }],
        'network-server-latency': ['warn', { maxNumericValue: 100 }],
        
        // Modern web features
        'uses-http2': 'warn',
        'uses-passive-event-listeners': 'error',
        'uses-rel-preconnect': 'warn',
        
        // Security
        'is-on-https': 'off', // Disabled for local testing
        'geolocation-on-start': 'error',
        'notification-on-start': 'error',
        
        // SEO essentials
        'meta-viewport': 'error',
        'http-status-code': 'error',
        'font-size': 'error',
        'tap-targets': 'error',
        'robots-txt': 'warn',
        
        // Performance budgets
        'performance-budget': 'error',
        'timing-budget': 'error'
      }
    },
    upload: {
      target: 'temporary-public-storage'
    },
    server: {
      port: 9001,
      storage: {
        storageMethod: 'sql',
        sqlDatabasePath: './lighthouse-ci.db'
      }
    }
  }
};