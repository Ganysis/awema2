import { Block, BlockCategory, PropType, EditorControl, RenderedBlock, PerformanceImpact } from '@awema/shared';

export const faqClean: Block = {
  id: 'faq-clean',
  name: 'FAQ',
  description: 'Questions fréquemment posées avec accordéon',
  category: BlockCategory.FAQ,
  tags: ['faq', 'questions', 'accordion', 'clean'],
  variants: [
    {
      id: 'gray-background',
      name: 'Fond gris',
      description: 'Ajoute un fond gris à la section',
      modifications: {}
    },
    {
      id: 'centered',
      name: 'Centré',
      description: 'Centre le titre et le sous-titre',
      modifications: {}
    }
  ],
  thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400',
  performanceImpact: PerformanceImpact.LOW,
  props: [
    {
      name: 'title',
      type: PropType.STRING,
      description: 'Titre de la section FAQ',
      defaultValue: 'Questions Fréquentes',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le titre'
      },
      required: false
    },
    {
      name: 'subtitle',
      type: PropType.STRING,
      description: 'Sous-titre optionnel',
      defaultValue: 'Retrouvez les réponses à vos questions',
      editorConfig: {
        control: EditorControl.TEXT,
        placeholder: 'Entrez le sous-titre'
      },
      required: false
    },
    {
      name: 'questions',
      type: PropType.STRING,
      description: 'Liste des questions/réponses',
      defaultValue: JSON.stringify([
        {
          question: 'Quels sont vos délais d\'intervention ?',
          answer: 'Nous intervenons dans les 24 à 48h pour les demandes standard. Pour les urgences, nous proposons un service d\'intervention express.'
        },
        {
          question: 'Proposez-vous des devis gratuits ?',
          answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer une solution adaptée.'
        },
        {
          question: 'Quelles sont vos zones d\'intervention ?',
          answer: 'Nous intervenons dans un rayon de 50km autour de notre siège. Consultez notre page "Zones d\'intervention" pour plus de détails.'
        },
        {
          question: 'Acceptez-vous les paiements échelonnés ?',
          answer: 'Oui, nous proposons des facilités de paiement pour les projets importants. N\'hésitez pas à nous en parler lors de l\'établissement du devis.'
        }
      ]),
      validation: {
        min: 1,
        max: 20
      },
      editorConfig: {
        control: EditorControl.TEXTAREA,
        placeholder: 'Format JSON pour les questions',
        helpText: 'Chaque élément doit avoir: question et answer'
      },
      required: false
    }
  ],
  defaultProps: {
    title: 'Questions Fréquentes',
    subtitle: 'Retrouvez les réponses à vos questions',
    questions: JSON.stringify([
      {
        question: 'Quels sont vos délais d\'intervention ?',
        answer: 'Nous intervenons dans les 24 à 48h pour les demandes standard. Pour les urgences, nous proposons un service d\'intervention express.'
      },
      {
        question: 'Proposez-vous des devis gratuits ?',
        answer: 'Oui, tous nos devis sont gratuits et sans engagement. Nous nous déplaçons pour évaluer vos besoins et vous proposer une solution adaptée.'
      },
      {
        question: 'Quelles sont vos zones d\'intervention ?',
        answer: 'Nous intervenons dans un rayon de 50km autour de notre siège. Consultez notre page "Zones d\'intervention" pour plus de détails.'
      },
      {
        question: 'Acceptez-vous les paiements échelonnés ?',
        answer: 'Oui, nous proposons des facilités de paiement pour les projets importants. N\'hésitez pas à nous en parler lors de l\'établissement du devis.'
      }
    ])
  }
};

export function renderFaqClean(props: Record<string, any>, variants: string[] = []): RenderedBlock {
  const hasBackground = variants.includes('gray-background');
  const isCentered = variants.includes('centered');
  
  const html = `
    <section class="faq-section ${hasBackground ? 'faq-section--gray' : ''}">
      <div class="faq-container">
        <div class="faq-header ${isCentered ? 'faq-header--centered' : ''}">
          <h2 class="faq-title">${props.title}</h2>
          ${props.subtitle ? `<p class="faq-subtitle">${props.subtitle}</p>` : ''}
        </div>
        <div class="faq-list">
          ${JSON.parse(props.questions).map((item: any, index: number) => `
            <div class="faq-item" data-aos="fade-up" data-aos-delay="${index * 50}">
              <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${index}">
                <span>${item.question}</span>
                <svg class="faq-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div class="faq-answer" id="faq-answer-${index}">
                <div class="faq-answer-content">
                  ${item.answer}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  const css = `
    .faq-section {
      padding: 5rem 0;
      position: relative;
    }

    .faq-section--gray {
      background-color: #f8f9fa;
    }

    .faq-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    .faq-header {
      margin-bottom: 3rem;
    }

    .faq-header--centered {
      text-align: center;
    }

    .faq-title {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: var(--color-text);
    }

    .faq-subtitle {
      font-size: 1.25rem;
      color: var(--color-text-secondary);
    }

    .faq-list {
      border-top: 1px solid #e5e7eb;
    }

    .faq-item {
      border-bottom: 1px solid #e5e7eb;
    }

    .faq-question {
      width: 100%;
      padding: 1.5rem 0;
      background: none;
      border: none;
      font-size: 1.125rem;
      font-weight: 600;
      text-align: left;
      color: var(--color-text);
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: color 0.2s ease;
    }

    .faq-question:hover {
      color: var(--color-primary);
    }

    .faq-icon {
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }

    .faq-question[aria-expanded="true"] .faq-icon {
      transform: rotate(180deg);
    }

    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease;
    }

    .faq-answer-content {
      padding: 0 0 1.5rem 0;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }

    .faq-item.active .faq-answer {
      max-height: 500px;
    }

    @media (max-width: 768px) {
      .faq-title {
        font-size: 2rem;
      }

      .faq-question {
        font-size: 1rem;
      }
    }
  `;

  const js = `
    (function() {
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
          const isActive = item.classList.contains('active');
          
          // Close all other items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove('active');
              otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle current item
          if (isActive) {
            item.classList.remove('active');
            question.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
          }
        });
      });
    })();
  `;

  const criticalCSS = `
    .faq-section { padding: 5rem 0; }
    .faq-container { max-width: 800px; margin: 0 auto; padding: 0 1.5rem; }
    .faq-list { border-top: 1px solid #e5e7eb; }
    .faq-item { border-bottom: 1px solid #e5e7eb; }
    .faq-question { width: 100%; padding: 1.5rem 0; background: none; border: none; }
  `;

  return {
    html,
    css,
    js,
    criticalCSS,
    dependencies: []
  };
}