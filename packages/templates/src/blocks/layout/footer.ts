import { Block, BlockCategory, PropType, EditorControl, PerformanceImpact, RenderedBlock } from '@awema/shared';

export const simpleFooter: Block = {
  id: 'simple-footer',
  name: 'Footer Simple',
  description: 'Pied de page simple avec informations de contact',
  category: BlockCategory.FOOTER,
  tags: ['footer', 'contact'],
  thumbnail: '/blocks/simple-footer.svg',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'companyName',
      type: PropType.STRING,
      description: 'Nom de l\'entreprise',
      required: true,
      defaultValue: 'MonEntreprise',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Nom de l\'entreprise',
        group: 'Informations',
        order: 1
      }
    },
    {
      name: 'address',
      type: PropType.STRING,
      description: 'Adresse',
      required: false,

      defaultValue: '',

      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Adresse complète',
        group: 'Informations',
        order: 2
      }
    },
    {
      name: 'phone',
      type: PropType.STRING,
      description: 'Téléphone',
      required: false,

      defaultValue: '',

      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: '01 23 45 67 89',
        group: 'Contact',
        order: 3
      }
    },
    {
      name: 'email',
      type: PropType.STRING,
      description: 'Email',
      required: false,

      defaultValue: '',

      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'contact@monentreprise.fr',
        group: 'Contact',
        order: 4
      }
    },
    {
      name: 'showAwemaLink',
      type: PropType.STRING,
      description: 'Afficher le lien Awema',
      required: false,

      defaultValue: true,

      editorConfig: {
        control: EditorControl.TOGGLE,
        group: 'Options',
        order: 5
      }
    }
  ],
  variants: [
    {
      id: 'default',
      name: 'Par défaut',
      description: 'Style par défaut',
      modifications: {}
    }
  ],
  defaultProps: {
    companyName: 'MonEntreprise',
    address: '',
    phone: '',
    email: '',
    showAwemaLink: true
  }
};

export function renderSimpleFooter(props: Record<string, any>, _variants: string[] = []): RenderedBlock {
  const { 
    companyName = 'MonEntreprise',
    address = '',
    phone = '',
    email = '',
    showAwemaLink = true
  } = props;

  const html = `
    <footer class="simple-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3>${companyName}</h3>
            ${address ? `<p class="address">${address.replace(/\n/g, '<br>')}</p>` : ''}
            <div class="contact">
              ${phone ? `<p><a href="tel:${phone.replace(/\s/g, '')}">${phone}</a></p>` : ''}
              ${email ? `<p><a href="mailto:${email}">${email}</a></p>` : ''}
            </div>
          </div>
          
          <div class="footer-bottom">
            <p>&copy; ${new Date().getFullYear()} ${companyName}. Tous droits réservés.</p>
            ${showAwemaLink ? `
              <p class="awema-credit">
                Créé avec <a href="https://awema.fr" target="_blank" rel="noopener">Awema</a>
              </p>
            ` : ''}
          </div>
        </div>
      </div>
    </footer>
  `;

  const css = `
    .simple-footer {
      background: #333;
      color: #fff;
      padding: 40px 0 20px;
      margin-top: auto;
    }
    
    .simple-footer .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .simple-footer .footer-content {
      text-align: center;
    }
    
    .simple-footer h3 {
      margin: 0 0 20px;
      font-size: 24px;
    }
    
    .simple-footer .address {
      margin: 10px 0;
      line-height: 1.6;
    }
    
    .simple-footer .contact {
      margin: 20px 0;
    }
    
    .simple-footer .contact p {
      margin: 5px 0;
    }
    
    .simple-footer a {
      color: #fff;
      text-decoration: none;
      transition: opacity 0.3s;
    }
    
    .simple-footer a:hover {
      opacity: 0.8;
    }
    
    .simple-footer .footer-bottom {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .simple-footer .footer-bottom p {
      margin: 5px 0;
      font-size: 14px;
      opacity: 0.8;
    }
    
    .simple-footer .awema-credit a {
      color: var(--primary, #007bff);
      font-weight: bold;
    }
    
    @media (min-width: 768px) {
      .simple-footer .footer-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      .simple-footer .footer-info {
        margin-bottom: 20px;
      }
    }
  `;

  return {
    html,
    css,
    js: '',
    dependencies: []
  };
}