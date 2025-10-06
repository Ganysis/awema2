import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import { defineConfig } from "astro/config";
import remarkCollapse from "remark-collapse";
import remarkToc from "remark-toc";
import sharp from "sharp";
import config from "./src/config/config.json";

let highlighter;
async function getHighlighter() {
  if (!highlighter) {
    const { getHighlighter } = await import("shiki");
    highlighter = await getHighlighter({ theme: "one-dark-pro" });
  }
  return highlighter;
}

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url ? config.site.base_url : "https://awema.fr",
  base: config.site.base_path ? config.site.base_path : "/",
  trailingSlash: config.site.trailing_slash ? "always" : "never",
  image: {
    service: sharp(),
    // Image optimization settings
    domains: ['cdn.sanity.io'],
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.sanity.io'
    }]
  },
  // Build optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small stylesheets
    split: true // Code splitting for better caching
  },
  // Output configuration for Cloudflare Pages (static + Functions)
  output: 'static',
  // Compression
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    define: {
      'process.env.SANITY_PROJECT_ID': JSON.stringify('awema2024'),
      'process.env.SANITY_DATASET': JSON.stringify('production'),
      'process.env.SANITY_API_TOKEN': JSON.stringify('skluO6R2zq34AsSP0DzJHWfgmhH4AArjdnTxFjVJ6uIawMlxne5pnEGXPY8YL68jlpF0Eqx4SxOmWMpsf'),
    },
    // Build optimizations
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor chunks for better caching
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['@headlessui/react', '@heroicons/react'],
            'animation-vendor': ['aos', 'swiper'],
          },
          // Asset naming for cache optimization
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js'
        }
      },
      // Minification
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log', 'console.info'],
        },
        format: {
          comments: false,
        }
      },
      // CSS code splitting
      cssCodeSplit: true,
      // Asset inlining threshold (4kb)
      assetsInlineLimit: 4096,
      // Chunk size warnings
      chunkSizeWarningLimit: 500,
      // Source maps only in dev
      sourcemap: false
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', 'aos'],
      exclude: ['@astrojs/mdx']
    },
    // Server optimizations
    server: {
      hmr: {
        overlay: false
      }
    }
  },
  integrations: [
    react(),
    sitemap({
      customPages: [],
      filter: (page) => !page.includes('/404') && !page.includes('/thank-you'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Configuration des priorités par type de page
      serialize(item) {
        // Homepage - priorité maximale
        if (item.url === 'https://awema.fr/') {
          return {
            ...item,
            priority: 1.0,
            changefreq: 'daily'
          };
        }

        // Pages métiers - haute priorité
        if (item.url.includes('/plombier') ||
            item.url.includes('/electricien') ||
            item.url.includes('/macon') ||
            item.url.includes('/paysagiste') ||
            item.url.includes('/peintre')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly'
          };
        }

        // Pages SEO locales - très haute priorité
        if (item.url.includes('site-internet-')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'weekly'
          };
        }

        // Pages outils - haute priorité
        if (item.url.includes('/outils/')) {
          return {
            ...item,
            priority: 0.8,
            changefreq: 'monthly'
          };
        }

        // Pages importantes
        if (item.url.includes('/tarifs') ||
            item.url.includes('/contact') ||
            item.url.includes('/realisations')) {
          return {
            ...item,
            priority: 0.9,
            changefreq: 'weekly'
          };
        }

        // Blog - priorité moyenne
        if (item.url.includes('/blog')) {
          return {
            ...item,
            priority: 0.7,
            changefreq: 'weekly'
          };
        }

        // Pages légales - basse priorité
        if (item.url.includes('/mentions-legales') ||
            item.url.includes('/cgv') ||
            item.url.includes('/privacy-policy')) {
          return {
            ...item,
            priority: 0.3,
            changefreq: 'yearly'
          };
        }

        // Par défaut
        return {
          ...item,
          priority: 0.6,
          changefreq: 'monthly'
        };
      }
    }),
    AutoImport({
      imports: [
        "@/shortcodes/Button",
        "@/shortcodes/Notice",
        "@/shortcodes/Video",
        "@/shortcodes/Youtube",
        "@/shortcodes/Tabs",
        "@/shortcodes/Tab",
        "@/shortcodes/Accordion",
        "@/shortcodes/ChangedLog",
      ],
    }),
    mdx(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [
        remarkCollapse,
        {
          test: "Table of contents",
        },
      ],
    ],
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
    extendDefaultPlugins: true,
    highlighter: getHighlighter,
  },
});
