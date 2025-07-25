// Blocs spécifiques par profession avec leurs configurations
export interface ProfessionBlock {
  type: string;
  variant: string;
  position: number;
  props: any;
  professionSpecific: true;
}

// Analyse et génération de blocs spécifiques par métier
export function getRecommendedBlocks(
  businessType: string, 
  aiAnalysis: any,
  formData: any
): ProfessionBlock[] {
  const blocks: ProfessionBlock[] = [];
  
  switch (businessType) {
    case 'plombier':
      // Bloc urgences spécifique plombier
      if (formData.availability?.is24x7) {
        blocks.push({
          type: 'content-v3-perfect',
          variant: 'emergency-services',
          position: 3,
          professionSpecific: true,
          props: {
            title: 'Urgences Plomberie 24/7',
            emergencyTypes: [
              { icon: '💧', title: 'Fuite d\'eau', time: '30min' },
              { icon: '🚿', title: 'Débouchage urgent', time: '45min' },
              { icon: '🔥', title: 'Chaudière en panne', time: '1h' },
              { icon: '🚰', title: 'Rupture canalisation', time: '30min' }
            ],
            phoneNumber: formData.phone,
            guaranteedResponse: '30 minutes'
          }
        });
      }
      
      // Bloc processus intervention
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'intervention-process',
        position: 5,
        professionSpecific: true,
        props: {
          title: 'Notre processus d\'intervention',
          steps: [
            { number: '1', title: 'Appel', description: 'Diagnostic par téléphone' },
            { number: '2', title: 'Déplacement', description: 'Intervention rapide' },
            { number: '3', title: 'Devis', description: 'Gratuit et transparent' },
            { number: '4', title: 'Réparation', description: 'Travaux garantis' }
          ]
        }
      });
      break;
      
    case 'electricien':
      // Bloc sécurité électrique
      blocks.push({
        type: 'features-v3-perfect',
        variant: 'safety-certifications',
        position: 3,
        professionSpecific: true,
        props: {
          title: 'Sécurité & Conformité',
          features: [
            { icon: '⚡', title: 'Norme NF C 15-100', description: 'Installation aux normes' },
            { icon: '🛡️', title: 'Consuel', description: 'Attestation de conformité' },
            { icon: '🔒', title: 'Garantie décennale', description: 'Protection totale' },
            { icon: '✅', title: 'Diagnostic gratuit', description: 'Vérification complète' }
          ]
        }
      });
      
      // Bloc domotique
      if (formData.services?.some((s: any) => s.toLowerCase().includes('domotique'))) {
        blocks.push({
          type: 'content-v3-perfect',
          variant: 'smart-home',
          position: 6,
          professionSpecific: true,
          props: {
            title: 'Maison Connectée',
            features: [
              'Éclairage intelligent',
              'Volets automatisés',
              'Chauffage connecté',
              'Sécurité domotique'
            ],
            brands: ['Somfy', 'Legrand', 'Schneider', 'Delta Dore']
          }
        });
      }
      break;
      
    case 'menuisier':
      // Bloc matériaux et essences
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'materials-showcase',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Matériaux & Essences',
          materials: [
            { name: 'Chêne', properties: ['Robuste', 'Noble', 'Durable'] },
            { name: 'Hêtre', properties: ['Clair', 'Résistant', 'Moderne'] },
            { name: 'Pin', properties: ['Économique', 'Chaleureux', 'Polyvalent'] },
            { name: 'Exotiques', properties: ['Unique', 'Résistant', 'Prestigieux'] }
          ],
          certifications: ['PEFC', 'FSC', 'Bois français']
        }
      });
      
      // Bloc processus création
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'creation-process',
        position: 5,
        professionSpecific: true,
        props: {
          title: 'De l\'idée à la réalisation',
          steps: [
            { phase: 'Conception', description: 'Étude et plans 3D' },
            { phase: 'Sélection', description: 'Choix des matériaux' },
            { phase: 'Fabrication', description: 'Atelier traditionnel' },
            { phase: 'Finition', description: 'Vernis et protection' },
            { phase: 'Installation', description: 'Pose professionnelle' }
          ]
        }
      });
      break;
      
    case 'jardinier':
    case 'paysagiste':
      // Bloc services saisonniers
      blocks.push({
        type: 'services-v3-perfect',
        variant: 'seasonal-services',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Services par saison',
          seasons: {
            spring: {
              title: 'Printemps',
              services: ['Taille', 'Semis', 'Préparation sols'],
              icon: '🌸'
            },
            summer: {
              title: 'Été',
              services: ['Arrosage', 'Tonte', 'Entretien'],
              icon: '☀️'
            },
            autumn: {
              title: 'Automne',
              services: ['Ramassage feuilles', 'Plantation', 'Protection'],
              icon: '🍂'
            },
            winter: {
              title: 'Hiver',
              services: ['Élagage', 'Protection gel', 'Préparation'],
              icon: '❄️'
            }
          }
        }
      });
      
      // Bloc approche écologique
      if (formData.ecoFriendly || formData.labels?.includes('eco')) {
        blocks.push({
          type: 'features-v3-perfect',
          variant: 'eco-approach',
          position: 5,
          professionSpecific: true,
          props: {
            title: 'Jardinage Écologique',
            features: [
              { icon: '🌱', title: 'Zéro pesticide', description: 'Protection naturelle' },
              { icon: '♻️', title: 'Compostage', description: 'Valorisation déchets' },
              { icon: '💧', title: 'Récupération eau', description: 'Gestion durable' },
              { icon: '🐝', title: 'Biodiversité', description: 'Refuge insectes' }
            ]
          }
        });
      }
      break;
      
    case 'macon':
      // Bloc types de construction
      blocks.push({
        type: 'services-v3-perfect',
        variant: 'construction-types',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Types de construction',
          categories: [
            {
              title: 'Gros œuvre',
              services: ['Fondations', 'Murs porteurs', 'Dalles', 'Charpente']
            },
            {
              title: 'Second œuvre',
              services: ['Cloisons', 'Enduits', 'Isolation', 'Carrelage']
            },
            {
              title: 'Rénovation',
              services: ['Ravalement', 'Extension', 'Surélévation', 'Réhabilitation']
            }
          ]
        }
      });
      break;
      
    case 'peintre':
      // Bloc nuancier et finitions
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'color-expertise',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Expertise Couleurs & Finitions',
          services: [
            { type: 'Peinture décorative', techniques: ['Patine', 'Glacis', 'Stuc'] },
            { type: 'Enduits', techniques: ['Tadelakt', 'Béton ciré', 'Chaux'] },
            { type: 'Papiers peints', techniques: ['Pose', 'Raccords', 'Panoramiques'] }
          ],
          brands: ['Farrow & Ball', 'Little Greene', 'Tollens', 'Zolpan']
        }
      });
      break;
      
    case 'carreleur':
      // Bloc types de pose
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'laying-techniques',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Techniques de pose',
          techniques: [
            { name: 'Pose droite', description: 'Classique et intemporelle' },
            { name: 'Pose diagonale', description: 'Agrandit visuellement' },
            { name: 'Pose décalée', description: 'Style parquet' },
            { name: 'Opus romain', description: 'Mélange de formats' },
            { name: 'Mosaïque', description: 'Créations personnalisées' }
          ],
          materials: ['Grès cérame', 'Faïence', 'Pierre naturelle', 'Mosaïque']
        }
      });
      break;
      
    case 'couvreur':
      // Bloc types de toiture
      blocks.push({
        type: 'services-v3-perfect',
        variant: 'roofing-types',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Types de couverture',
          roofTypes: [
            { type: 'Tuiles', materials: ['Terre cuite', 'Béton', 'Ardoise'] },
            { type: 'Zinc', advantages: ['Durabilité', 'Étanchéité', 'Moderne'] },
            { type: 'Ardoise', advantages: ['Prestige', 'Longévité', 'Tradition'] },
            { type: 'Végétalisée', advantages: ['Écologique', 'Isolation', 'Esthétique'] }
          ],
          services: ['Réfection', 'Isolation', 'Zinguerie', 'Velux']
        }
      });
      
      // Bloc urgences toiture
      if (formData.availability?.is24x7) {
        blocks.push({
          type: 'cta-v3-perfect',
          variant: 'roof-emergency',
          position: 3,
          professionSpecific: true,
          props: {
            title: 'Urgence Toiture 24/7',
            subtitle: 'Bâchage et sécurisation rapide',
            emergencies: ['Tempête', 'Fuite', 'Tuiles cassées', 'Infiltrations'],
            phoneNumber: formData.phone
          }
        });
      }
      break;
      
    case 'serrurier':
      // Bloc sécurité et urgences
      blocks.push({
        type: 'services-v3-perfect',
        variant: 'security-services',
        position: 3,
        professionSpecific: true,
        props: {
          title: 'Sécurité & Dépannage',
          categories: [
            {
              title: 'Urgences 24/7',
              services: ['Ouverture porte', 'Remplacement serrure', 'Extraction clé'],
              icon: '🚨'
            },
            {
              title: 'Sécurisation',
              services: ['Blindage', 'Serrure multipoints', 'Cylindre haute sécurité'],
              icon: '🔒'
            },
            {
              title: 'Contrôle accès',
              services: ['Interphone', 'Digicode', 'Badge RFID'],
              icon: '🎛️'
            }
          ],
          certifications: ['A2P', 'NF', 'Assurance agréé']
        }
      });
      break;
      
    case 'chauffagiste':
      // Bloc types de chauffage
      blocks.push({
        type: 'services-v3-perfect',
        variant: 'heating-systems',
        position: 4,
        professionSpecific: true,
        props: {
          title: 'Solutions de chauffage',
          systems: [
            {
              type: 'Chaudière gaz',
              benefits: ['Économique', 'Performant', 'Compact'],
              brands: ['Viessmann', 'Vaillant', 'De Dietrich']
            },
            {
              type: 'Pompe à chaleur',
              benefits: ['Écologique', 'Économies', 'Aides État'],
              brands: ['Daikin', 'Mitsubishi', 'Atlantic']
            },
            {
              type: 'Chaudière fioul',
              benefits: ['Autonomie', 'Puissance', 'Fiabilité'],
              brands: ['Bosch', 'Chappée', 'Saint Roch']
            }
          ],
          services: ['Installation', 'Entretien', 'Dépannage', 'Contrat maintenance']
        }
      });
      
      // Bloc économies d'énergie
      blocks.push({
        type: 'content-v3-perfect',
        variant: 'energy-savings',
        position: 5,
        professionSpecific: true,
        props: {
          title: 'Économies d\'énergie',
          solutions: [
            { title: 'Thermostat connecté', savings: 'Jusqu\'à 25%' },
            { title: 'Isolation tuyaux', savings: 'Jusqu\'à 10%' },
            { title: 'Désembouage', savings: 'Jusqu\'à 15%' },
            { title: 'Chaudière condensation', savings: 'Jusqu\'à 30%' }
          ],
          certifications: ['RGE', 'QualiPAC', 'QualiBat']
        }
      });
      break;
  }
  
  return blocks;
}