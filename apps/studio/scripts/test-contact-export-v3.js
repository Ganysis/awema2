#!/usr/bin/env node

/**
 * Test d'export d'un bloc Contact avec le système V3
 */

const fs = require('fs').promises;
const path = require('path');

console.log('🧪 Test d\'export Contact V3...\n');

async function testContactExport() {
  try {
    // Importer les modules V3
    const { RenderEngineV3 } = require('../lib/v3/core/render-engine');
    const { ContactRendererV3 } = require('../lib/v3/renderers/contact.renderer');
    const { contactDataSchema, contactDefaults } = require('../lib/v3/schemas/blocks/contact');
    
    console.log('✅ Modules V3 importés');
    
    // Créer le moteur de rendu
    const renderEngine = new RenderEngineV3({
      enableCache: true,
      enableValidation: true,
      enablePerformanceTracking: true
    });
    
    console.log('✅ Moteur de rendu créé');
    
    // Enregistrer le renderer Contact
    const contactRenderer = new ContactRendererV3();
    renderEngine.registerRenderer('contact-ultra-modern', contactRenderer, contactDataSchema);
    
    console.log('✅ Renderer Contact enregistré');
    
    // Créer des données de test
    const testContactData = {
      meta: {
        id: 'contact-test-1',
        type: 'contact-ultra-modern',
        version: '3.0.0',
        created: new Date(),
        modified: new Date(),
        validationStatus: 'valid'
      },
      data: {
        variant: 'gradient-wave',
        layout: 'split-right',
        title: 'Contactez-nous',
        subtitle: 'Nous sommes là pour vous aider',
        description: 'N\'hésitez pas à nous contacter pour toute question ou demande de devis gratuit.',
        
        contactInfo: {
          phone: '01 23 45 67 89',
          email: 'contact@monentreprise.fr',
          address: '123 Rue de la République, 75001 Paris',
          hours: {
            weekdays: '9h00 - 18h00',
            saturday: '9h00 - 12h00',
            sunday: 'Fermé'
          }
        },
        
        form: {
          fields: [
            {
              type: 'text',
              name: 'name',
              label: 'Nom complet',
              placeholder: 'Jean Dupont',
              required: true,
              errorMessage: 'Veuillez entrer votre nom'
            },
            {
              type: 'email',
              name: 'email',
              label: 'Email',
              placeholder: 'jean.dupont@email.com',
              required: true,
              pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
              errorMessage: 'Email invalide'
            },
            {
              type: 'tel',
              name: 'phone',
              label: 'Téléphone',
              placeholder: '06 12 34 56 78',
              required: false
            },
            {
              type: 'select',
              name: 'subject',
              label: 'Sujet',
              placeholder: 'Choisissez un sujet',
              required: true,
              options: [
                { value: 'devis', label: 'Demande de devis' },
                { value: 'info', label: 'Demande d\'information' },
                { value: 'rdv', label: 'Prise de rendez-vous' },
                { value: 'autre', label: 'Autre' }
              ]
            },
            {
              type: 'textarea',
              name: 'message',
              label: 'Message',
              placeholder: 'Décrivez votre projet ou votre demande...',
              required: true,
              rows: 5,
              errorMessage: 'Veuillez entrer un message'
            }
          ],
          submitButton: {
            text: 'Envoyer le message',
            loadingText: 'Envoi en cours...'
          },
          successMessage: 'Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
          errorMessage: 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement par téléphone.',
          webhookUrl: null // Pas de webhook pour le test
        },
        
        map: {
          enabled: true,
          coordinates: {
            lat: 48.8566,
            lng: 2.3522
          },
          zoom: 15,
          apiKey: null // Clé API Google Maps (optionnelle pour le test)
        }
      }
    };
    
    console.log('\n📝 Données de test créées:');
    console.log(`   - Variant: ${testContactData.data.variant}`);
    console.log(`   - Layout: ${testContactData.data.layout}`);
    console.log(`   - ${testContactData.data.form.fields.length} champs de formulaire`);
    console.log(`   - Map: ${testContactData.data.map.enabled ? 'Activée' : 'Désactivée'}`);
    
    // Rendre le bloc
    console.log('\n🎨 Rendu du bloc Contact...');
    const renderResult = await renderEngine.renderBlock(testContactData);
    
    console.log('\n✅ Rendu terminé !');
    console.log(`   - Temps de rendu: ${renderResult.performance.renderTime.toFixed(2)}ms`);
    console.log(`   - Taille HTML: ${renderResult.html.length} caractères`);
    console.log(`   - Taille CSS: ${renderResult.performance.cssSize} caractères`);
    console.log(`   - Taille JS: ${renderResult.performance.jsSize} caractères`);
    console.log(`   - Erreurs: ${renderResult.errors.length}`);
    console.log(`   - Avertissements: ${renderResult.warnings.length}`);
    
    if (renderResult.warnings.length > 0) {
      console.log('\n⚠️  Avertissements:');
      renderResult.warnings.forEach(w => console.log(`   - ${w}`));
    }
    
    // Créer le HTML complet
    const fullHTML = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Contact V3 - AWEMA Studio</title>
    
    <!-- CSS Reset -->
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        line-height: 1.6;
        color: #1f2937;
      }
      
      /* Variables CSS */
      :root {
        --primary: #3b82f6;
        --primary-dark: #2563eb;
        --primary-50: #eff6ff;
        --secondary: #10b981;
        --secondary-50: #f0fdf4;
        --error: #ef4444;
        --text: #1f2937;
        --text-secondary: #6b7280;
        --border: #e5e7eb;
        --bg-elevated: #f9fafb;
      }
    </style>
    
    <!-- CSS du bloc -->
    <style>
${renderResult.css}
    </style>
</head>
<body>
    <!-- HTML du bloc -->
    ${renderResult.html}
    
    <!-- JavaScript du bloc -->
    <script>
${renderResult.js}
    </script>
</body>
</html>`;
    
    // Sauvegarder le fichier
    const outputPath = path.join(__dirname, 'test-contact-v3-output.html');
    await fs.writeFile(outputPath, fullHTML);
    
    console.log(`\n💾 Export sauvegardé: ${outputPath}`);
    console.log('\n🚀 Pour visualiser le résultat:');
    console.log(`   1. Ouvrir le fichier dans un navigateur`);
    console.log(`   2. Vérifier le formulaire et les interactions`);
    console.log(`   3. Tester la validation en temps réel`);
    console.log(`   4. Vérifier le responsive (mobile/desktop)`);
    
    // Test de validation avec données invalides
    console.log('\n🔍 Test de validation avec données invalides...');
    const invalidData = {
      variant: 'invalid-variant',
      title: '', // Titre requis manquant
      form: {
        fields: [] // Champs requis manquants
      }
    };
    
    const validationResult = contactDataSchema.safeParse(invalidData);
    if (!validationResult.success) {
      console.log('✅ Validation a correctement échoué:');
      validationResult.error.issues.forEach(issue => {
        console.log(`   - ${issue.path.join('.')}: ${issue.message}`);
      });
    }
    
    console.log('\n🎉 Test terminé avec succès !');
    
  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error);
    process.exit(1);
  }
}

// Lancer le test
testContactExport();