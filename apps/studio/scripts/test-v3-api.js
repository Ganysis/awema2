#!/usr/bin/env node

/**
 * Script pour tester le rendu des blocs V3 via l'API
 */

const fs = require('fs').promises;
const path = require('path');

async function testV3ViaAPI() {
  console.log('=== Test du rendu V3 via l\'API ===\n');

  try {
    // 1. Tester l'endpoint de rendu
    console.log('1. Test de l\'endpoint /api/test-render...');
    
    const testBlock = {
      blockType: 'hero-v3-perfect',
      props: {
        variant: 'split-modern',
        content: {
          title: 'Test Hero V3 Perfect',
          subtitle: 'Architecture moderne',
          description: 'Test du système de rendu V3 avec toutes les fonctionnalités',
          primaryButton: {
            text: 'Commencer',
            link: '#start'
          },
          secondaryButton: {
            text: 'En savoir plus',
            link: '#more'
          }
        },
        media: {
          type: 'image',
          src: '/api/placeholder/600/400',
          alt: 'Hero image'
        },
        settings: {
          height: 'screen',
          contentPosition: 'center-left',
          theme: 'light'
        }
      }
    };

    // Créer un petit serveur de test pour vérifier
    console.log('\n2. Vérification du registry...');
    
    // Vérifier les imports dans block-registry
    const blockRegistryPath = path.join(__dirname, '../lib/blocks/block-registry.ts');
    const content = await fs.readFile(blockRegistryPath, 'utf8');
    
    // Chercher les patterns clés
    const patterns = {
      'Import V3': /import.*HeroRendererV3Perfect.*from/,
      'Instance V3': /const heroV3 = new HeroRendererV3Perfect/,
      'Wrapper function': /const renderHeroV3Perfect = /,
      'Registry entry': /'hero-v3-perfect': renderHeroV3Perfect/
    };

    console.log('\nVérifications du code:');
    for (const [name, pattern] of Object.entries(patterns)) {
      const found = pattern.test(content);
      console.log(`- ${name}: ${found ? '✅' : '❌'}`);
    }

    // 3. Analyser la structure du wrapper
    console.log('\n3. Analyse du wrapper de rendu...');
    const wrapperMatch = content.match(/const renderHeroV3Perfect = \(props: any\) => \{([^}]+)\}/s);
    if (wrapperMatch) {
      console.log('✅ Wrapper trouvé:');
      console.log(wrapperMatch[0].substring(0, 200) + '...');
    } else {
      console.log('❌ Wrapper non trouvé');
    }

    // 4. Créer un test HTML simple
    console.log('\n4. Création d\'un test HTML statique...');
    
    const testHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test V3 Blocks Preview</title>
    <script>
      // Simuler le contexte de l'éditeur
      window.testV3Render = async function() {
        try {
          const response = await fetch('/api/test-render', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(${JSON.stringify(testBlock, null, 2)})
          });
          
          const result = await response.json();
          console.log('API Response:', result);
          
          if (result.success && result.html) {
            document.getElementById('preview').innerHTML = result.html;
          } else {
            document.getElementById('preview').innerHTML = '<p style="color: red;">Erreur: ' + (result.error || 'Pas de HTML') + '</p>';
          }
        } catch (error) {
          console.error('Erreur:', error);
          document.getElementById('preview').innerHTML = '<p style="color: red;">Erreur: ' + error.message + '</p>';
        }
      };
    </script>
</head>
<body>
    <h1>Test V3 Blocks Preview</h1>
    <button onclick="testV3Render()">Tester le rendu V3</button>
    <hr>
    <div id="preview" style="border: 1px solid #ccc; padding: 20px; margin-top: 20px;">
      <p>Cliquez sur le bouton pour tester le rendu</p>
    </div>
    
    <h2>Test direct avec le code du bloc</h2>
    <pre>${JSON.stringify(testBlock, null, 2)}</pre>
</body>
</html>
    `;

    await fs.writeFile(path.join(__dirname, 'test-v3-api.html'), testHtml);
    console.log('✅ Fichier de test créé: test-v3-api.html');
    console.log('   Ouvrez ce fichier dans le navigateur avec le serveur Next.js en cours d\'exécution');

    // 5. Vérifier tous les blocs V3
    console.log('\n5. Liste des blocs V3 dans le registry...');
    const v3Blocks = content.match(/'[^']*-v3-perfect': render[^,]+/g);
    if (v3Blocks) {
      console.log('Blocs V3 trouvés:');
      v3Blocks.forEach(block => {
        console.log(`- ${block}`);
      });
    } else {
      console.log('❌ Aucun bloc V3 trouvé dans le registry');
    }

    // 6. Vérifier le problème potentiel
    console.log('\n6. Diagnostic du problème...');
    
    // Vérifier si les renderers retournent bien un objet {html, css, js}
    const renderPattern = /const result = (\w+)\.render\(props, \{ isExport: false \}\);/g;
    const renderMatches = content.match(renderPattern);
    
    if (renderMatches) {
      console.log(`✅ ${renderMatches.length} appels de render trouvés`);
      
      // Vérifier le format de retour
      const returnPattern = /return result\.html \+ `<style>\$\{result\.css\}<\/style><script>\$\{result\.js\}<\/script>`;/;
      if (returnPattern.test(content)) {
        console.log('✅ Format de retour correct (HTML + CSS + JS)');
      } else {
        console.log('❌ Format de retour incorrect');
      }
    }

    console.log('\n✅ Test terminé. Vérifiez les résultats ci-dessus.');
    console.log('\n📝 Actions recommandées:');
    console.log('1. Vérifier que le serveur Next.js est en cours d\'exécution (npm run dev)');
    console.log('2. Ouvrir test-v3-api.html dans le navigateur');
    console.log('3. Vérifier la console du navigateur pour les erreurs');
    console.log('4. Vérifier les logs du serveur Next.js');

  } catch (error) {
    console.error('\n❌ Erreur:', error);
  }
}

// Exécuter le test
testV3ViaAPI();