const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Fonction pour obtenir les fonds colorés par business type
function getSectionBackground(index, businessType) {
  const backgroundsByBusiness = {
    plombier: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#EBF5FF' }, // Bleu très clair
      { backgroundColor: '#F0F9FF' }, // Bleu encore plus clair
      { backgroundGradient: 'linear-gradient(135deg, #EBF5FF 0%, #DBEAFE 100%)' },
      { backgroundColor: '#ffffff' }
    ],
    electricien: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FFFBEB' }, // Jaune très clair
      { backgroundColor: '#FEF3C7' }, // Jaune clair
      { backgroundGradient: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' },
      { backgroundColor: '#ffffff' }
    ],
    menuisier: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FEF5E7' }, // Marron très clair
      { backgroundColor: '#FAEBD7' }, // Beige
      { backgroundGradient: 'linear-gradient(135deg, #FAEBD7 0%, #DEB887 100%)' },
      { backgroundColor: '#ffffff' }
    ],
    peintre: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#FAF5FF' }, // Violet très clair
      { backgroundColor: '#F3E8FF' }, // Violet clair
      { backgroundGradient: 'linear-gradient(135deg, #F3E8FF 0%, #E9D5FF 100%)' },
      { backgroundColor: '#ffffff' }
    ],
    macon: [
      { backgroundColor: '#ffffff' },
      { backgroundColor: '#F5F5F5' }, // Gris très clair
      { backgroundColor: '#EEEEEE' }, // Gris clair
      { backgroundGradient: 'linear-gradient(135deg, #F5F5F5 0%, #E0E0E0 100%)' },
      { backgroundColor: '#ffffff' }
    ]
  };

  const backgrounds = backgroundsByBusiness[businessType] || backgroundsByBusiness.plombier;
  return backgrounds[index % backgrounds.length];
}

// Fonction pour obtenir des descriptions personnalisées
function getPersonalizedDescription(serviceName, businessType, company, city) {
  const descriptions = {
    plombier: {
      'débouchage canalisation': `Notre équipe à ${city} intervient rapidement pour déboucher vos canalisations. Avec ${company}, fini les éviers bouchés et les WC qui refoulent. Nous utilisons du matériel professionnel haute pression pour un résultat durable.`,
      'recherche de fuite': `Fuite d'eau invisible ? ${company} localise précisément l'origine de votre fuite à ${city} grâce à nos détecteurs thermiques et acoustiques dernière génération. Économisez sur votre facture d'eau !`,
      'installation sanitaire': `Installation complète ou rénovation de votre salle de bain à ${city}. ${company} pose vos équipements sanitaires avec précision : douche, baignoire, WC, lavabo. Travail soigné garanti.`
    },
    electricien: {
      'mise aux normes': `${company} met votre installation électrique aux normes NFC 15-100 à ${city}. Tableau électrique, différentiels, mise à la terre : nous sécurisons votre habitation. Certificat de conformité inclus.`,
      'tableau électrique': `Remplacement ou rénovation de votre tableau électrique à ${city}. ${company} installe des tableaux modernes avec disjoncteurs différentiels pour protéger vos équipements et votre famille.`,
      'dépannage électrique': `Panne de courant ? Court-circuit ? ${company} dépanne votre installation électrique 24h/7j à ${city}. Diagnostic rapide et réparation immédiate par nos électriciens qualifiés.`
    },
    menuisier: {
      'pose de parquet': `${company} pose tous types de parquets à ${city} : massif, contrecollé, stratifié. Pose clouée, collée ou flottante selon vos besoins. Finition impeccable pour un sol qui dure dans le temps.`,
      'aménagement sur mesure': `Créez l'intérieur de vos rêves avec ${company} à ${city}. Bibliothèques, dressings, placards sur mesure : nous concevons et fabriquons des meubles adaptés à votre espace.`
    },
    peintre: {
      'peinture intérieure': `Redonnez vie à votre intérieur avec ${company} à ${city}. Peinture murs et plafonds, choix des couleurs, protection des sols. Finition mate, satinée ou brillante selon vos goûts.`,
      'peinture extérieure': `${company} protège et embellit vos façades à ${city}. Peinture extérieure résistante aux intempéries, traitement anti-mousse inclus. Votre maison retrouve son éclat d'origine.`
    },
    macon: {
      'maçonnerie générale': `${company} réalise tous vos travaux de maçonnerie à ${city}. Construction de murs, dalles, fondations : nous bâtissons solide et durable. Respect des normes et des délais.`,
      'extension maison': `Agrandissez votre espace de vie avec ${company} à ${city}. Extension maison en parpaing, brique ou ossature. Étude personnalisée, permis de construire, réalisation clé en main.`
    }
  };

  const businessDescriptions = descriptions[businessType] || descriptions.plombier;
  const normalizedService = serviceName.toLowerCase();
  
  for (const [key, description] of Object.entries(businessDescriptions)) {
    if (normalizedService.includes(key) || key.includes(normalizedService)) {
      return description;
    }
  }
  
  return `${company} propose ses services de ${serviceName} à ${city}. Nos professionnels qualifiés interviennent avec sérieux et efficacité. Devis gratuit, travail garanti, satisfaction assurée.`;
}

async function applyVisualImprovements() {
  try {
    console.log('\n🎨 APPLICATION DES AMÉLIORATIONS VISUELLES\n');

    // Récupérer les projets existants
    const projects = await prisma.project.findMany({
      where: {
        client: {
          companyName: {
            in: [
              'Plomberie Express Paris',
              'Élec Pro Lyon',
              'L\'Atelier du Bois',
              'Couleurs Méditerranée',
              'Bâti Sud Construction'
            ]
          }
        }
      },
      include: {
        client: true
      }
    });

    console.log(`📊 ${projects.length} projets trouvés\n`);

    for (const project of projects) {
      console.log(`\n🔄 Amélioration de ${project.client.companyName}...`);
      
      // Extraire les données
      const tags = JSON.parse(project.client.tags || '{}');
      const businessType = tags.businessType || 'plombier';
      const city = tags.formData?.city || 'Paris';
      const projectData = JSON.parse(project.data || '{}');
      const pages = projectData.pages || [];
      
      // Appliquer les améliorations à chaque page
      for (const page of pages) {
        let sectionIndex = 0;
        
        for (const block of page.blocks) {
          // Ne pas modifier Header et Footer
          if (!['header-v3-perfect', 'footer-v3-perfect'].includes(block.type)) {
            // Ajouter le style de fond
            block.style = getSectionBackground(sectionIndex, businessType);
            sectionIndex++;
            
            // Personnaliser le contenu des services
            if (block.type === 'services-v3-perfect' && block.props) {
              for (let i = 1; i <= 6; i++) {
                const serviceName = block.props[`service${i}_name`];
                if (serviceName) {
                  block.props[`service${i}_description`] = getPersonalizedDescription(
                    serviceName,
                    businessType,
                    project.client.companyName,
                    city
                  );
                }
              }
            }
            
            // Personnaliser les titres Hero
            if (block.type === 'hero-v3-perfect' && block.props) {
              if (page.isHomePage) {
                block.props.title = `${project.client.companyName} - Votre ${businessType} à ${city}`;
                block.props.subtitle = `Intervention rapide • Devis gratuit • Travail garanti • Disponible 24h/7j`;
              }
            }
            
            // Personnaliser les CTA
            if (block.type === 'cta-v3-perfect' && block.props) {
              block.props.title = `Besoin d'un ${businessType} à ${city} ?`;
              block.props.subtitle = `${project.client.companyName} intervient rapidement pour tous vos besoins. Devis gratuit et sans engagement !`;
              
              // Ajouter un style de fond spécial pour le CTA
              block.style = {
                ...block.style,
                backgroundGradient: businessType === 'plombier' ? 
                  'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)' :
                  businessType === 'electricien' ?
                  'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)' :
                  businessType === 'menuisier' ?
                  'linear-gradient(135deg, #92400E 0%, #7C2F1B 100%)' :
                  businessType === 'peintre' ?
                  'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)' :
                  'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)'
              };
            }
          }
        }
      }
      
      // Sauvegarder les modifications
      projectData.pages = pages;
      await prisma.project.update({
        where: { id: project.id },
        data: {
          data: JSON.stringify(projectData)
        }
      });
      
      console.log(`✅ Améliorations appliquées !`);
      console.log(`🔗 Voir : http://localhost:3000/editor/${project.id}`);
      console.log(`👁️  Preview : http://localhost:3000/preview/${project.id}`);
    }

    console.log('\n\n✅ TOUTES LES AMÉLIORATIONS ONT ÉTÉ APPLIQUÉES !');
    console.log('\n📊 Résumé des améliorations :');
    console.log('• Fonds colorés alternés selon le métier');
    console.log('• Descriptions de services personnalisées');
    console.log('• Titres et CTA adaptés');
    console.log('• Styles de gradients pour les CTA');
    console.log('\n🚀 Les sites sont maintenant visuellement riches et uniques !');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

applyVisualImprovements();