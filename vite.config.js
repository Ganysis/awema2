import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    watch: {
      // Ignorer les gros dossiers générés
      ignored: [
        '**/awema-template-factory/**',
        '**/apps/studio/**',
        '**/generated-sites/**',
        '**/mockups/**',
        '**/deployments/**',
        '**/node_modules/**',
        '**/.git/**'
      ]
    }
  }
});