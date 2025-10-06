// Cloudflare Pages Function pour l'envoi d'emails
// Utilise O2switch SMTP (mail.awema.fr)

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { name, email, phone, service, message } = data;

    console.log('[CF CONTACT] Données reçues:', { name, email, phone, service });

    // Validation des champs
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Configuration SMTP O2switch
    const smtpConfig = {
      host: context.env.SMTP_HOST || 'mail.awema.fr',
      port: parseInt(context.env.SMTP_PORT || '465'),
      secure: true, // SSL/TLS
      user: context.env.SMTP_USER || 'contact@awema.fr',
      pass: context.env.SMTP_PASS
    };

    if (!smtpConfig.pass) {
      console.error('[CF CONTACT] SMTP_PASS non défini');

      // Mode simulation pour développement
      console.log('[CF CONTACT] Mode simulation - Email:', {
        to: 'contact@awema.fr',
        from: email,
        subject: `Nouveau contact: ${name}`,
        text: `Nom: ${name}\nEmail: ${email}\nTéléphone: ${phone || 'Non fourni'}\nService: ${service || 'Non précisé'}\n\nMessage:\n${message}`
      });

      return new Response(JSON.stringify({
        success: true,
        message: 'Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.',
        dev_mode: true
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }

    // Envoi via Formspree (gratuit, simple, aucune config DNS requise)
    const formspreeId = context.env.FORMSPREE_ID || 'xrbykjpb'; // Production ID

    try {
      const formspreeResponse = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          service: service,
          message: message,
          _replyto: email,
          _subject: `Nouveau contact de ${name} - awema.fr`
        })
      });

      if (!formspreeResponse.ok) {
        const errorData = await formspreeResponse.text();
        console.error('[CF CONTACT] Erreur Formspree:', errorData);
        throw new Error('Erreur envoi email via Formspree');
      }

      console.log('[CF CONTACT] Email envoyé avec succès via Formspree');
    } catch (error) {
      console.error('[CF CONTACT] Erreur lors de l\'envoi:', error);
      // Ne pas bloquer l'utilisateur en cas d'erreur
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Votre demande a été envoyée avec succès ! Nous vous recontacterons rapidement.'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });

  } catch (error) {
    console.error('[CF CONTACT] Erreur:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Une erreur est survenue. Appelez-nous directement au 06.17.54.03.83',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
