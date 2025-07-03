import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { ClientFormData } from '@/types/client'

interface FormSubmissionClientEmailProps {
  formData: ClientFormData
}

export const FormSubmissionClientEmail = ({
  formData,
}: FormSubmissionClientEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Confirmation de votre demande - AWEMA Studio</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Merci pour votre confiance !</Heading>
          
          <Section style={section}>
            <Text style={text}>
              Bonjour {formData.businessName},
            </Text>
            <Text style={text}>
              Nous avons bien reçu votre demande de création de site web. 
              Notre équipe va maintenant analyser vos besoins et commencer à travailler sur votre projet.
            </Text>
            <Text style={text}>
              Vous serez contacté très prochainement pour discuter des prochaines étapes.
            </Text>
          </Section>

          <Section style={sectionHighlight}>
            <Heading as="h2" style={h2}>
              📋 Récapitulatif de votre demande
            </Heading>
            <Text style={text}>
              <strong>Type d'activité :</strong> {formData.businessType}
            </Text>
            <Text style={text}>
              <strong>Services proposés :</strong> {formData.services.length} service(s)
            </Text>
            <Text style={text}>
              <strong>Zone d'intervention :</strong> {formData.interventionCities.join(', ')}
            </Text>
            <Text style={text}>
              <strong>Style visuel choisi :</strong> {formData.visualStyle}
            </Text>
          </Section>

          <Section style={section}>
            <Heading as="h2" style={h2}>
              🚀 Prochaines étapes
            </Heading>
            <Text style={text}>
              1. <strong>Analyse de vos besoins</strong> - Notre équipe va étudier votre projet
            </Text>
            <Text style={text}>
              2. <strong>Création du site</strong> - Nous allons créer votre site web sur mesure
            </Text>
            <Text style={text}>
              3. <strong>Validation</strong> - Vous pourrez visualiser et valider votre site
            </Text>
            <Text style={text}>
              4. <strong>Mise en ligne</strong> - Votre site sera publié et accessible à tous
            </Text>
          </Section>

          <Section style={section}>
            <Text style={text}>
              Si vous avez des questions ou souhaitez apporter des modifications, 
              n'hésitez pas à nous contacter en répondant à cet email.
            </Text>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              Cordialement,<br />
              L'équipe AWEMA Studio
            </Text>
            <Text style={footer}>
              © {new Date().getFullYear()} AWEMA Studio. Tous droits réservés.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const section = {
  padding: '0 48px',
}

const sectionHighlight = {
  padding: '24px 48px',
  backgroundColor: '#f4f7ff',
  borderRadius: '8px',
  margin: '0 48px 24px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0 0 16px',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '8px 0',
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
  padding: '0 48px',
}

export default FormSubmissionClientEmail