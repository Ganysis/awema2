import { NextRequest, NextResponse } from 'next/server';

// Configuration email (à adapter selon votre service d'email)
const EMAIL_CONFIG = {
  to: process.env.CONTACT_EMAIL || 'contact@example.com',
  from: process.env.SENDER_EMAIL || 'noreply@example.com',
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation des données
    const { name, email, phone, subject, message } = data;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }
    
    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email invalide' },
        { status: 400 }
      );
    }
    
    // Log pour le développement
    console.log('📧 Nouveau message de contact:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    });
    
    // En production, vous pouvez utiliser un service comme:
    // - SendGrid: await sendGridMail.send({...})
    // - Nodemailer: await transporter.sendMail({...})
    // - Resend: await resend.emails.send({...})
    // - AWS SES: await ses.sendEmail({...}).promise()
    
    // Pour l'instant, on simule l'envoi
    const emailContent = `
      Nouveau message de contact
      
      Nom: ${name}
      Email: ${email}
      Téléphone: ${phone || 'Non fourni'}
      Sujet: ${subject || 'Non spécifié'}
      
      Message:
      ${message}
      
      ---
      Envoyé le ${new Date().toLocaleString('fr-FR')}
    `;
    
    // Dans un environnement de production, envoyez l'email ici
    // await sendEmail({
    //   to: EMAIL_CONFIG.to,
    //   from: EMAIL_CONFIG.from,
    //   subject: `Contact - ${subject || 'Nouveau message'}`,
    //   text: emailContent,
    //   replyTo: email
    // });
    
    // Sauvegarder dans la base de données si nécessaire
    // await prisma.contactMessage.create({
    //   data: { name, email, phone, subject, message }
    // });
    
    return NextResponse.json({
      success: true,
      message: 'Message envoyé avec succès'
    });
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}

// Options CORS pour permettre les requêtes depuis les sites exportés
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}