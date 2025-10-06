#!/usr/bin/env node

/**
 * 🔧 Configuration email O2Switch pour AWEMA
 *
 * O2Switch utilise les paramètres SMTP suivants :
 * - Serveur SMTP : mail.awema.fr (ou le nom de votre domaine)
 * - Port : 465 (SSL) ou 587 (TLS)
 * - Authentification : Oui
 * - Nom d'utilisateur : votre adresse email complète
 * - Mot de passe : le mot de passe de votre compte email
 */

const nodemailer = require('nodemailer');

// Configuration O2Switch typique
const O2SWITCH_CONFIG = {
  // Option 1: Configuration SSL (Port 465)
  ssl: {
    host: 'mail.awema.fr', // Remplacer par votre domaine O2Switch
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@awema.fr', // Votre adresse email complète
      pass: 'VOTRE_MOT_DE_PASSE_EMAIL' // Mot de passe du compte email
    }
  },

  // Option 2: Configuration TLS (Port 587) - Recommandé
  tls: {
    host: 'mail.awema.fr', // Remplacer par votre domaine O2Switch
    port: 587,
    secure: false,
    auth: {
      user: 'noreply@awema.fr', // Votre adresse email complète
      pass: 'VOTRE_MOT_DE_PASSE_EMAIL' // Mot de passe du compte email
    },
    tls: {
      rejectUnauthorized: false // Pour les certificats auto-signés
    }
  }
};

// Variables d'environnement pour O2Switch
const ENV_CONFIG = `
# Configuration Email O2Switch
EMAIL_PROVIDER=smtp
SMTP_HOST=mail.awema.fr
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=noreply@awema.fr
SMTP_PASS=VOTRE_MOT_DE_PASSE_EMAIL
EMAIL_FROM=noreply@awema.fr
EMAIL_FROM_NAME=AWEMA
EMAIL_REPLY_TO=contact@awema.fr
`;

console.log('📧 Configuration Email O2Switch pour AWEMA\n');
console.log('==========================================\n');

// Test de connexion
async function testO2SwitchConnection() {
  console.log('🔧 Test de connexion SMTP O2Switch...\n');

  // Créer le transporteur avec TLS (port 587)
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.awema.fr',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true pour 465, false pour 587
    auth: {
      user: process.env.SMTP_USER || 'noreply@awema.fr',
      pass: process.env.SMTP_PASS || 'MOT_DE_PASSE'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    // Vérifier la connexion
    await transporter.verify();
    console.log('✅ Connexion SMTP réussie !');

    return transporter;
  } catch (error) {
    console.log('❌ Erreur de connexion:', error.message);
    console.log('\nVérifiez :');
    console.log('1. Le nom du serveur SMTP (mail.votre-domaine.fr)');
    console.log('2. Le nom d\'utilisateur (adresse email complète)');
    console.log('3. Le mot de passe du compte email');
    console.log('4. Le port (587 pour TLS ou 465 pour SSL)');

    return null;
  }
}

// Envoyer un email de test
async function sendTestEmail(transporter) {
  console.log('\n📤 Envoi d\'un email de test...\n');

  const testEmail = {
    from: {
      name: 'AWEMA Test',
      address: process.env.SMTP_USER || 'noreply@awema.fr'
    },
    to: 'test@example.com', // Remplacer par votre email de test
    subject: '🚀 Test configuration O2Switch - AWEMA',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #667eea;">Test Email O2Switch</h1>
        <p>Ceci est un email de test envoyé depuis AWEMA.</p>
        <p>Si vous recevez cet email, la configuration O2Switch fonctionne correctement !</p>

        <h2>Paramètres utilisés :</h2>
        <ul>
          <li>Serveur : ${process.env.SMTP_HOST || 'mail.awema.fr'}</li>
          <li>Port : ${process.env.SMTP_PORT || '587'}</li>
          <li>Utilisateur : ${process.env.SMTP_USER || 'noreply@awema.fr'}</li>
        </ul>

        <p style="margin-top: 30px; color: #718096; font-size: 12px;">
          Email envoyé le ${new Date().toLocaleString('fr-FR')}
        </p>
      </div>
    `,
    text: `Test Email O2Switch - AWEMA

Ceci est un email de test envoyé depuis AWEMA.
Si vous recevez cet email, la configuration O2Switch fonctionne correctement !

Paramètres utilisés :
- Serveur : ${process.env.SMTP_HOST || 'mail.awema.fr'}
- Port : ${process.env.SMTP_PORT || '587'}
- Utilisateur : ${process.env.SMTP_USER || 'noreply@awema.fr'}

Email envoyé le ${new Date().toLocaleString('fr-FR')}`
  };

  try {
    const info = await transporter.sendMail(testEmail);
    console.log('✅ Email envoyé avec succès !');
    console.log('   Message ID:', info.messageId);
    console.log('   Response:', info.response);

    return true;
  } catch (error) {
    console.log('❌ Erreur envoi email:', error.message);
    return false;
  }
}

// Afficher les instructions
function showInstructions() {
  console.log('\n📝 INSTRUCTIONS DE CONFIGURATION\n');
  console.log('================================\n');

  console.log('1. Connectez-vous à votre compte O2Switch');
  console.log('2. Créez une adresse email (ex: noreply@awema.fr)');
  console.log('3. Notez le mot de passe de cette adresse email');

  console.log('\n4. Ajoutez ces variables à votre .env.local :');
  console.log('----------------------------------------');
  console.log(ENV_CONFIG);

  console.log('5. Configuration dans le code :');
  console.log('----------------------------------------');
  console.log(`
// Dans email-mockups.service.ts, ajouter :

case 'smtp':
  transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  break;
`);

  console.log('\n6. Paramètres O2Switch standards :');
  console.log('------------------------------------');
  console.log('Serveur entrant (IMAP) : mail.votre-domaine.fr (port 993 SSL)');
  console.log('Serveur sortant (SMTP) : mail.votre-domaine.fr');
  console.log('  - Port 587 avec STARTTLS (recommandé)');
  console.log('  - Port 465 avec SSL/TLS');
  console.log('  - Port 25 sans chiffrement (non recommandé)');
  console.log('Authentification : Adresse email complète + mot de passe');

  console.log('\n7. URLs utiles O2Switch :');
  console.log('-------------------------');
  console.log('Webmail : https://webmail.o2switch.fr');
  console.log('cPanel : https://cpanel.o2switch.fr');
  console.log('Support : https://www.o2switch.fr/support');
}

// Main
async function main() {
  // Vérifier si les variables sont configurées
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('⚠️ Variables d\'environnement non configurées\n');
    showInstructions();

    console.log('\n💡 Pour tester avec vos identifiants :');
    console.log('---------------------------------------');
    console.log('SMTP_HOST=mail.awema.fr SMTP_USER=noreply@awema.fr SMTP_PASS=votremotdepasse node setup-email-o2switch.cjs');

    return;
  }

  // Tester la connexion
  const transporter = await testO2SwitchConnection();

  if (transporter) {
    // Demander si on veut envoyer un email de test
    console.log('\n💡 Pour envoyer un email de test, ajoutez --send-test');

    if (process.argv.includes('--send-test')) {
      await sendTestEmail(transporter);
    }

    console.log('\n✅ Configuration O2Switch prête !');
    console.log('Ajoutez les variables d\'environnement à votre .env.local');
  } else {
    console.log('\n❌ Configuration échouée');
    showInstructions();
  }
}

// Lancer le script
main().catch(console.error);