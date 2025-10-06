import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, service, message } = data;

    // Configuration O2Switch
    const transporter = nodemailer.createTransport({
      host: 'smtp.o2switch.net',
      port: 587,
      secure: false,
      auth: {
        user: 'contact@awema.fr',
        pass: '!Vesper1!'
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Email pour AWEMA
    const mailToAwema = {
      from: 'contact@awema.fr',
      to: 'contact@awema.fr',
      subject: `🚀 Nouveau lead AWEMA - ${name} - ${service || 'Site BTP'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">🎉 Nouveau Contact AWEMA</h1>
          </div>
          <div style="padding: 20px; background: #f5f5f5;">
            <div style="background: white; padding: 20px; border-radius: 10px; margin-bottom: 20px;">
              <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Informations du Contact</h2>
              <p><strong>👤 Nom :</strong> ${name}</p>
              <p><strong>📧 Email :</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>📞 Téléphone :</strong> <a href="tel:${phone?.replace(/\s/g, '')}">${phone || 'Non renseigné'}</a></p>
              <p><strong>🛠️ Service :</strong> ${service || 'Non spécifié'}</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 10px;">
              <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
              <p style="white-space: pre-wrap;">${message || 'Pas de message'}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: #667eea; color: white; border-radius: 10px; text-align: center;">
              <p style="margin: 0;"><strong>⚡ Action requise :</strong> Rappeler sous 2h maximum !</p>
            </div>
          </div>
        </div>
      `
    };

    // Email de confirmation pour le client
    const mailToClient = {
      from: 'contact@awema.fr',
      to: email,
      subject: 'Confirmation - Votre demande AWEMA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0;">Merci pour votre confiance !</h1>
          </div>
          <div style="padding: 30px; background: #f5f5f5;">
            <p>Bonjour ${name},</p>
            <p>Nous avons bien reçu votre demande concernant <strong>${service || 'la création de votre site internet'}</strong>.</p>
            <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <h2 style="color: #667eea;">🚀 Prochaines étapes :</h2>
              <ol>
                <li>Un expert AWEMA vous rappelle sous <strong>2h ouvrées</strong></li>
                <li>Audit gratuit de votre présence digitale actuelle</li>
                <li>Proposition personnalisée adaptée à votre métier</li>
                <li>Création de votre site en <strong>7 jours</strong></li>
              </ol>
            </div>
            <div style="background: #667eea; color: white; padding: 20px; border-radius: 10px; text-align: center;">
              <p style="margin: 0 0 10px 0;"><strong>Besoin urgent ?</strong></p>
              <p style="margin: 0;">📞 Appelez directement : <a href="tel:0617540383" style="color: white; text-decoration: none;"><strong>06.17.54.03.83</strong></a></p>
            </div>
            <p style="margin-top: 20px; text-align: center; color: #666; font-size: 14px;">
              À très vite,<br>
              <strong>L'équipe AWEMA</strong><br>
              Spécialiste sites BTP depuis 2020
            </p>
          </div>
        </div>
      `
    };

    // Envoi des emails
    await transporter.sendMail(mailToAwema);
    await transporter.sendMail(mailToClient);

    return new Response(JSON.stringify({
      success: true,
      message: 'Votre demande a été envoyée avec succès !'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Erreur envoi email:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Erreur lors de l\'envoi. Appelez-nous au 06.17.54.03.83'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};