import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function POST({ request }) {
  try {
    const contentType = request.headers.get('content-type');

    // Log pour debug
    console.log('Content-Type reçu:', contentType);

    let data;
    if (contentType && contentType.includes('application/json')) {
      const text = await request.text();
      console.log('Body reçu:', text);

      if (!text) {
        return new Response(JSON.stringify({
          success: false,
          error: 'Corps de requête vide'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Erreur parsing JSON:', e);
        return new Response(JSON.stringify({
          success: false,
          error: 'JSON invalide'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      return new Response(JSON.stringify({
        success: false,
        error: 'Content-Type doit être application/json'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { metier, nomEntreprise, ville, telephone, email, description, services } = data;

    if (!metier) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Métier requis'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    console.log(`🚀 Génération du site pour ${metier}...`);

    // Exécuter le script de génération
    const projectRoot = path.resolve(__dirname, '../../..');
    const scriptPath = path.join(projectRoot, 'generate-site-metier-complet.cjs');

    console.log('Script path:', scriptPath);

    try {
      const output = execSync(`node ${scriptPath} ${metier}`, {
        cwd: projectRoot,
        encoding: 'utf8'
      });

      console.log('Output:', output);

      // Retourner le succès avec les détails
      return new Response(JSON.stringify({
        success: true,
        message: `Site généré avec succès pour ${metier}!`,
        details: {
          metier,
          entreprise: nomEntreprise,
          ville,
          url: 'http://localhost:4321'
        }
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (execError) {
      console.error('Erreur exec:', execError);
      throw execError;
    }

  } catch (error) {
    console.error('Erreur génération complète:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message || 'Erreur inconnue'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function GET() {
  return new Response(JSON.stringify({
    message: 'Utilisez POST pour générer un site',
    metiers: ['plombier', 'electricien', 'menuisier', 'macon', 'paysagiste']
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}