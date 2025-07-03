import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components'
import { ClientFormData } from '@/types/client'

interface FormSubmissionAdminEmailProps {
  formData: ClientFormData
  clientId: string
  projectId: string
  formLinkName: string
  formLinkDescription?: string
}

export const FormSubmissionAdminEmail = ({
  formData,
  clientId,
  projectId,
  formLinkName,
  formLinkDescription,
}: FormSubmissionAdminEmailProps) => {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'
  
  return (
    <Html>
      <Head />
      <Preview>Nouveau formulaire complété - {formData.businessName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🎉 Nouveau formulaire complété !</Heading>
          
          <Section style={section}>
            <Heading as="h2" style={h2}>
              Informations du client
            </Heading>
            <Text style={text}>
              <strong>Entreprise :</strong> {formData.businessName}
            </Text>
            <Text style={text}>
              <strong>Contact :</strong> {formData.email} / {formData.phone}
            </Text>
            <Text style={text}>
              <strong>Adresse :</strong> {formData.address}, {formData.city} ({formData.postalCode})
            </Text>
            <Text style={text}>
              <strong>Type d'activité :</strong> {formData.businessType}
            </Text>
          </Section>

          <Section style={sectionHighlight}>
            <Heading as="h2" style={h2}>
              Détails du projet
            </Heading>
            <Text style={text}>
              <strong>Formulaire :</strong> {formLinkName}
            </Text>
            {formLinkDescription && (
              <Text style={text}>
                <strong>Description :</strong> {formLinkDescription}
              </Text>
            )}
            <Text style={text}>
              <strong>Services :</strong> {formData.services.length} service(s) configuré(s)
            </Text>
            <Text style={text}>
              <strong>Zone d'intervention :</strong> {formData.interventionCities.join(', ')}
            </Text>
          </Section>

          <Section style={section}>
            <Button
              style={button}
              href={`${appUrl}/dashboard/projects/${projectId}`}
            >
              Voir le projet dans AWEMA Studio
            </Button>
          </Section>

          <Hr style={hr} />

          <Section>
            <Text style={footer}>
              Cet email a été envoyé automatiquement par AWEMA Studio.
            </Text>
            <Text style={footer}>
              Client ID: {clientId} | Projet ID: {projectId}
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
  margin: '0 48px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 48px',
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

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  margin: '16px 0',
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

export default FormSubmissionAdminEmail