import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Heading,
  Text,
  Link,
  Img,
  Button,
  Hr,
  Font
} from '@react-email/components';

interface MockupData {
  id: string;
  name: string;
  url: string;
  screenshot?: string;
  description: string;
  style: 'modern' | 'premium' | 'tech' | 'robust';
  features?: string[];
}

interface WorkflowData {
  clientName: string;
  clientEmail: string;
  businessName: string;
  metier: string;
  ville: string;
  phone?: string;
}

interface MockupProposalEmailProps {
  workflow: WorkflowData;
  mockups: MockupData[];
  compareUrl: string;
  trackingPixelUrl: string;
  unsubscribeUrl: string;
  privacyUrl: string;
  baseUrl: string;
}

const MockupProposalEmail = ({
  workflow,
  mockups,
  compareUrl,
  trackingPixelUrl,
  unsubscribeUrl,
  privacyUrl,
  baseUrl
}: MockupProposalEmailProps) => {
  const previewText = `🎨 Vos 3 propositions de site web pour ${workflow.businessName} sont prêtes !`;

  const gradientButton = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '10px',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '600',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px 28px',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  };

  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#ffffff',
    padding: '40px 30px',
    textAlign: 'center' as const,
  };

  const contentStyle = {
    padding: '40px 30px',
  };

  const mockupCardStyle = {
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    marginBottom: '25px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  };

  const compareSectionStyle = {
    background: 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)',
    border: '2px solid #e2e8f0',
    borderRadius: '16px',
    padding: '35px 25px',
    textAlign: 'center' as const,
    margin: '45px 0',
  };

  const footerStyle = {
    backgroundColor: '#2d3748',
    color: '#a0aec0',
    padding: '35px 30px',
    textAlign: 'center' as const,
  };

  const getBadgeStyle = (style: string) => {
    const baseStyle = {
      display: 'inline-block',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
      padding: '4px 12px',
      borderRadius: '20px',
      marginBottom: '12px',
      border: '1px solid',
    };

    switch (style) {
      case 'modern':
        return { ...baseStyle, background: '#ebf8ff', color: '#2b6cb0', borderColor: '#bee3f8' };
      case 'premium':
        return { ...baseStyle, background: '#f0fff4', color: '#276749', borderColor: '#9ae6b4' };
      case 'tech':
        return { ...baseStyle, background: '#fef5e7', color: '#b7791f', borderColor: '#f6e05e' };
      case 'robust':
        return { ...baseStyle, background: '#fed7d7', color: '#c53030', borderColor: '#feb2b2' };
      default:
        return { ...baseStyle, background: '#f7fafc', color: '#4a5568', borderColor: '#e2e8f0' };
    }
  };

  return (
    <Html lang="fr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={['Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <title>{previewText}</title>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
      </Head>
      <Body style={{ backgroundColor: '#f8fafc', padding: '20px 0', fontFamily: 'Inter, Arial, sans-serif' }}>
        <Container style={containerStyle}>
          {/* Header */}
          <Section style={headerStyle}>
            <Heading style={{
              fontSize: '32px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              letterSpacing: '-0.5px',
              color: '#ffffff'
            }}>
              🎨 Vos propositions sont prêtes !
            </Heading>
            <Text style={{
              fontSize: '18px',
              opacity: 0.95,
              margin: 0,
              color: '#ffffff'
            }}>
              3 designs uniques pour{' '}
              <span style={{
                background: 'linear-gradient(90deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}>
                {workflow.businessName}
              </span>
            </Text>
          </Section>

          {/* Content */}
          <Section style={contentStyle}>
            {/* Greeting */}
            <Text style={{
              fontSize: '18px',
              lineHeight: 1.7,
              marginBottom: '35px',
              color: '#2d3748'
            }}>
              Bonjour <strong>{workflow.clientName}</strong>,<br /><br />
              Nous avons créé <strong>3 propositions personnalisées</strong> pour{' '}
              <span style={{
                background: 'linear-gradient(90deg, #667eea, #764ba2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '700'
              }}>
                {workflow.businessName}
              </span>.<br />
              Chaque design est spécialement adapté à votre activité de{' '}
              <strong>{workflow.metier}</strong> à {workflow.ville}.
            </Text>

            {/* Mockups */}
            {mockups.map((mockup, index) => (
              <Section key={mockup.id} style={mockupCardStyle}>
                {mockup.screenshot && (
                  <Img
                    src={`cid:screenshot-${mockup.id}`}
                    alt={mockup.name}
                    width="100%"
                    height="220"
                    style={{
                      width: '100%',
                      height: '220px',
                      objectFit: 'cover',
                      borderBottom: '1px solid #e2e8f0'
                    }}
                  />
                )}
                <Section style={{ padding: '25px' }}>
                  <div style={getBadgeStyle(mockup.style)}>
                    {mockup.style}
                  </div>
                  <Heading style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#1a202c',
                    margin: '0 0 8px 0',
                    letterSpacing: '-0.3px'
                  }}>
                    {mockup.name}
                  </Heading>
                  <Text style={{
                    color: '#718096',
                    fontSize: '15px',
                    lineHeight: 1.6,
                    marginBottom: '20px'
                  }}>
                    {mockup.description}
                  </Text>

                  {mockup.features && (
                    <Section style={{ marginBottom: '20px' }}>
                      {mockup.features.map((feature, i) => (
                        <span key={i} style={{
                          background: '#edf2f7',
                          color: '#4a5568',
                          fontSize: '12px',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontWeight: '500',
                          marginRight: '8px',
                          marginBottom: '8px',
                          display: 'inline-block'
                        }}>
                          {feature}
                        </span>
                      ))}
                    </Section>
                  )}

                  <Button href={mockup.url} style={gradientButton}>
                    Voir cette proposition →
                  </Button>
                </Section>
              </Section>
            ))}

            {/* Compare Section */}
            <Section style={compareSectionStyle}>
              <Heading style={{
                fontSize: '24px',
                color: '#1a202c',
                margin: '0 0 12px 0',
                fontWeight: '700'
              }}>
                💡 Besoin d'aide pour choisir ?
              </Heading>
              <Text style={{
                color: '#4a5568',
                fontSize: '16px',
                lineHeight: 1.6,
                marginBottom: '25px',
                maxWidth: '80%',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Comparez les 3 propositions côte à côte pour voir celle qui correspond le mieux à votre vision.
              </Text>
              <Button
                href={compareUrl}
                style={{
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  borderRadius: '12px',
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: '700',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                  padding: '18px 36px',
                  boxShadow: '0 6px 16px rgba(72, 187, 120, 0.3)',
                }}
              >
                Comparer les 3 propositions
              </Button>
            </Section>

            {/* Urgency */}
            <Section style={{
              background: 'linear-gradient(135deg, #fed7d7 0%, #fbb6ce 100%)',
              borderLeft: '6px solid #f56565',
              padding: '25px',
              borderRadius: '12px',
              margin: '35px 0',
              boxShadow: '0 4px 12px rgba(245, 101, 101, 0.15)'
            }}>
              <Text style={{ margin: 0 }}>
                <strong style={{ color: '#c53030', fontWeight: '700' }}>
                  <span style={{ fontSize: '1.5em', marginRight: '10px' }}>⏰</span>
                  Offre limitée :
                </strong>{' '}
                Ces propositions personnalisées sont disponibles pendant{' '}
                <strong style={{ color: '#c53030', fontWeight: '700' }}>72 heures</strong>.
                Après ce délai, elles ne seront plus accessibles.
              </Text>
            </Section>

            {/* Contact */}
            <Section style={{
              background: '#f7fafc',
              borderRadius: '12px',
              padding: '30px 25px',
              textAlign: 'center',
              margin: '40px 0'
            }}>
              <Text style={{
                fontSize: '16px',
                color: '#4a5568',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                Une question ? Une hésitation ?<br />
                Notre équipe est là pour vous accompagner !
              </Text>
              {workflow.phone && (
                <Button
                  href={`tel:${workflow.phone}`}
                  style={{
                    background: '#1a202c',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '18px',
                    display: 'inline-block'
                  }}
                >
                  📞 {workflow.phone}
                </Button>
              )}
              <Text style={{
                marginTop: '15px',
                fontSize: '14px',
                color: '#718096'
              }}>
                Ou répondez simplement à cet email
              </Text>
            </Section>

            {/* Signature */}
            <Section style={{ textAlign: 'center', marginTop: '40px', color: '#718096' }}>
              <Text>
                Cordialement,<br />
                <strong style={{ color: '#1a202c' }}>L'équipe AWEMA</strong><br />
                <em>Création de sites web professionnels</em>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footerStyle}>
            <Heading style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '15px'
            }}>
              AWEMA
            </Heading>
            <Text style={{ marginBottom: '20px' }}>
              Création de sites web professionnels qui convertissent
            </Text>
            <Section style={{ margin: '20px 0' }}>
              <Link href={`${baseUrl}/portfolio`} style={{ color: '#81e6d9', textDecoration: 'none', margin: '0 15px', fontSize: '14px' }}>
                Portfolio
              </Link>
              <Link href={`${baseUrl}/contact`} style={{ color: '#81e6d9', textDecoration: 'none', margin: '0 15px', fontSize: '14px' }}>
                Contact
              </Link>
              <Link href={unsubscribeUrl} style={{ color: '#81e6d9', textDecoration: 'none', margin: '0 15px', fontSize: '14px' }}>
                Se désabonner
              </Link>
              <Link href={privacyUrl} style={{ color: '#81e6d9', textDecoration: 'none', margin: '0 15px', fontSize: '14px' }}>
                Politique de confidentialité
              </Link>
            </Section>
            <Text style={{ fontSize: '14px', opacity: 0.8, marginTop: '15px' }}>
              © 2025 AWEMA - Tous droits réservés<br />
              Cet email a été envoyé à {workflow.clientEmail}
            </Text>
          </Section>
        </Container>

        {/* Tracking Pixel */}
        <Img
          src={trackingPixelUrl}
          width="1"
          height="1"
          alt=""
          style={{ display: 'none', visibility: 'hidden', opacity: 0 }}
        />
      </Body>
    </Html>
  );
};

export default MockupProposalEmail;

// Composant pour les relances
interface MockupReminderEmailProps {
  workflow: WorkflowData;
  mockups: MockupData[];
  mockupsUrl: string;
  trackingPixelUrl: string;
  unsubscribeUrl: string;
  privacyUrl: string;
}

export const MockupReminderEmail = ({
  workflow,
  mockups,
  mockupsUrl,
  trackingPixelUrl,
  unsubscribeUrl,
  privacyUrl
}: MockupReminderEmailProps) => {
  const previewText = `⏰ Plus que 24h pour voir vos propositions ${workflow.businessName} !`;

  return (
    <Html lang="fr">
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily={['Arial', 'sans-serif']}
          webFont={{
            url: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <title>{previewText}</title>
      </Head>
      <Body style={{ backgroundColor: '#f8fafc', padding: '20px 0', fontFamily: 'Inter, Arial, sans-serif' }}>
        <Container style={{
          maxWidth: '600px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          overflow: 'hidden',
        }}>
          {/* Header urgent */}
          <Section style={{
            background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
            color: '#ffffff',
            padding: '35px 30px',
            textAlign: 'center',
          }}>
            <Heading style={{
              fontSize: '28px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              letterSpacing: '-0.5px'
            }}>
              ⏰ Plus que 24h !
            </Heading>
            <Text style={{ fontSize: '16px', opacity: 0.95, margin: 0 }}>
              Vos propositions expirent bientôt
            </Text>
          </Section>

          <Section style={{ padding: '40px 30px' }}>
            {/* Banner urgence */}
            <Section style={{
              background: 'linear-gradient(135deg, #fed7d7 0%, #fbb6ce 100%)',
              border: '2px solid #f56565',
              borderRadius: '12px',
              padding: '25px',
              textAlign: 'center',
              marginBottom: '35px',
              boxShadow: '0 4px 12px rgba(245, 101, 101, 0.2)'
            }}>
              <Heading style={{
                fontSize: '24px',
                color: '#c53030',
                margin: '0 0 10px 0',
                fontWeight: '700'
              }}>
                🚨 DERNIÈRE CHANCE
              </Heading>
              <div style={{
                background: '#c53030',
                color: 'white',
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '20px',
                fontWeight: '700',
                margin: '15px 0'
              }}>
                24H RESTANTES
              </div>
              <Text style={{ color: '#744210', fontSize: '16px', fontWeight: '500', margin: 0 }}>
                Vos propositions personnalisées expirent demain
              </Text>
            </Section>

            <Text style={{
              fontSize: '18px',
              color: '#2d3748',
              marginBottom: '30px',
              lineHeight: 1.7
            }}>
              Bonjour <strong>{workflow.clientName}</strong>,<br /><br />
              Vous avez peut-être manqué nos <strong>3 propositions de site web</strong> pour{' '}
              <strong>{workflow.businessName}</strong> ?<br /><br />
              Ces designs personnalisés ont été créés spécialement pour votre activité de{' '}
              <strong>{workflow.metier}</strong> et ne seront plus disponibles après demain.
            </Text>

            {/* Mini aperçu */}
            <Row style={{ margin: '30px 0' }}>
              {mockups.slice(0, 3).map((mockup) => (
                <Column key={mockup.id} style={{
                  width: '33.33%',
                  padding: '15px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  background: '#f7fafc',
                  margin: '0 5px',
                  textAlign: 'center'
                }}>
                  {mockup.screenshot && (
                    <Img
                      src={`cid:thumb-${mockup.id}`}
                      alt={mockup.name}
                      width="100%"
                      height="80"
                      style={{
                        width: '100%',
                        height: '80px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        marginBottom: '8px'
                      }}
                    />
                  )}
                  <Text style={{
                    fontSize: '12px',
                    color: '#718096',
                    fontWeight: '600',
                    margin: 0
                  }}>
                    {mockup.name}
                  </Text>
                </Column>
              ))}
            </Row>

            {/* CTA Principal */}
            <Section style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '35px',
              borderRadius: '16px',
              textAlign: 'center',
              margin: '35px 0'
            }}>
              <Heading style={{
                fontSize: '22px',
                margin: '0 0 15px 0',
                fontWeight: '700'
              }}>
                🎯 Ne ratez pas cette opportunité
              </Heading>
              <Text style={{ opacity: 0.9, marginBottom: '25px' }}>
                Découvrez vos 3 propositions personnalisées avant qu'il ne soit trop tard !
              </Text>
              <Button
                href={mockupsUrl}
                style={{
                  background: '#ffffff',
                  color: '#667eea',
                  textDecoration: 'none',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
                  display: 'inline-block'
                }}
              >
                Voir mes propositions →
              </Button>
            </Section>

            {/* Aide */}
            <Section style={{
              background: '#f0fff4',
              borderLeft: '4px solid #48bb78',
              padding: '20px',
              borderRadius: '6px',
              margin: '30px 0'
            }}>
              <Text style={{ color: '#276749', fontWeight: '600', margin: 0 }}>
                💡 <strong>Besoin d'aide ?</strong><br />
                Notre équipe est disponible au <strong>{workflow.phone || '04 XX XX XX XX'}</strong><br />
                Ou répondez simplement à cet email.
              </Text>
            </Section>

            <Section style={{ textAlign: 'center', marginTop: '35px', color: '#718096' }}>
              <Text>
                Cordialement,<br />
                <strong style={{ color: '#1a202c' }}>L'équipe AWEMA</strong>
              </Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={{
            backgroundColor: '#2d3748',
            color: '#a0aec0',
            padding: '30px',
            textAlign: 'center',
            fontSize: '14px'
          }}>
            <Text style={{ marginBottom: '10px' }}>
              © 2025 AWEMA - Création de sites web professionnels
            </Text>
            <Text>
              <Link href={unsubscribeUrl} style={{ color: '#81e6d9', textDecoration: 'none' }}>
                Se désabonner
              </Link>
              {' | '}
              <Link href={privacyUrl} style={{ color: '#81e6d9', textDecoration: 'none' }}>
                Politique de confidentialité
              </Link>
            </Text>
          </Section>
        </Container>

        {/* Tracking */}
        <Img
          src={trackingPixelUrl}
          width="1"
          height="1"
          alt=""
          style={{ display: 'none' }}
        />
      </Body>
    </Html>
  );
};