const fs = require('fs');
const path = require('path');

const pagesData = [
  {
    filename: 'site-internet-menuisier-lyon.astro',
    metier: 'Menuisier',
    ville: 'Lyon',
    color: 'amber',
    problems: [
      { icon: '🪵', problem: 'Portfolio mal présenté', description: 'Vos créations sur-mesure ne sont pas mises en valeur' },
      { icon: '📐', problem: 'Devis complexes', description: 'Difficile d\'expliquer les options et finitions par téléphone' },
      { icon: '🏠', problem: 'Clients indécis', description: 'Les prospects hésitent sans voir vos réalisations' },
      { icon: '💼', problem: 'Image artisanale dépassée', description: 'Les Lyonnais recherchent des menuisiers modernes' }
    ],
    solutions: [
      { icon: '🖼️', solution: 'Galerie 3D interactive', description: 'Portfolio avec zoom, avant/après et vues 360°' },
      { icon: '📊', solution: 'Configurateur en ligne', description: 'Devis instantané avec choix des essences et finitions' },
      { icon: '⭐', solution: 'Avis clients vérifiés', description: 'Témoignages avec photos des projets réalisés' },
      { icon: '🎯', solution: 'SEO local optimisé', description: 'Top 3 sur "menuisier Lyon" et quartiers' }
    ],
    testimonials: [
      { name: 'Jean-Marc Rousseau', company: 'Menuiserie Rousseau', location: 'Lyon 7ème', content: 'Mon site AWEMA a révolutionné mon activité. Les clients peuvent voir mes créations en détail et je reçois des demandes pour du sur-mesure haut de gamme.', rating: 5, results: ['+40% de devis', 'Projets premium'] },
      { name: 'Antoine Fabre', company: 'AF Bois & Design', location: 'Écully', content: 'Le configurateur de devis me fait gagner un temps fou ! Les clients arrivent avec leur projet déjà défini, c\'est un vrai plus.', rating: 5, results: ['Gain 15h/semaine', 'Devis pré-qualifiés'] }
    ]
  },
  {
    filename: 'site-internet-menuisier-paris.astro',
    metier: 'Menuisier',
    ville: 'Paris',
    color: 'amber',
    problems: [
      { icon: '🏢', problem: 'Concurrence des grandes enseignes', description: 'IKEA et Leroy Merlin dominent le marché parisien' },
      { icon: '💰', problem: 'Clients exigeants', description: 'Les Parisiens veulent du sur-mesure mais comparent les prix' },
      { icon: '🚪', problem: 'Projets haussmanniens complexes', description: 'Difficile de montrer votre expertise en rénovation' },
      { icon: '📱', problem: 'Peu de visibilité', description: 'Les architectes d\'intérieur ne vous connaissent pas' }
    ],
    solutions: [
      { icon: '🏆', solution: 'Positionnement artisan premium', description: 'Site qui valorise le sur-mesure et l\'artisanat français' },
      { icon: '🏗️', solution: 'Portfolio spécial Haussmann', description: 'Galerie dédiée aux rénovations d\'appartements anciens' },
      { icon: '👔', solution: 'Espace pro architectes', description: 'Section dédiée avec tarifs pro et catalogue' },
      { icon: '💎', solution: 'Image haut de gamme', description: 'Design élégant qui attire une clientèle CSP++' }
    ],
    testimonials: [
      { name: 'Philippe Moreau', company: 'PM Créations Bois', location: 'Paris 8ème', content: 'Grâce à mon site AWEMA, je travaille maintenant avec 3 architectes d\'intérieur réguliers. Mon CA a triplé en 1 an !', rating: 5, results: ['CA x3', '3 partenaires pro'] },
      { name: 'Laurent Dubois', company: 'L\'Atelier du Bois', location: 'Paris 15ème', content: 'Mon portfolio en ligne impressionne les clients. Je décroche des projets à 30-50k€ régulièrement maintenant.', rating: 5, results: ['Projets 30-50k€', 'Clients premium'] }
    ]
  },
  {
    filename: 'site-internet-macon-lyon.astro',
    metier: 'Maçon',
    ville: 'Lyon',
    color: 'gray',
    problems: [
      { icon: '🏗️', problem: 'Gros chantiers inaccessibles', description: 'Les promoteurs ne vous connaissent pas' },
      { icon: '📋', problem: 'Devis longs à établir', description: 'Visites sur place chronophages pour chaque projet' },
      { icon: '🏠', problem: 'Extensions mal valorisées', description: 'Votre expertise en agrandissement n\'est pas visible' },
      { icon: '⏰', problem: 'Planning surchargé', description: 'Difficile de gérer les demandes et les urgences' }
    ],
    solutions: [
      { icon: '🎯', solution: 'Visibilité promoteurs', description: 'Page dédiée aux professionnels avec références' },
      { icon: '📸', solution: 'Estimation par photos', description: 'Système de pré-devis avec envoi de photos' },
      { icon: '🏡', solution: 'Showcase extensions', description: 'Portfolio spécialisé avec coûts indicatifs' },
      { icon: '📅', solution: 'Calendrier en ligne', description: 'Les clients voient vos disponibilités' }
    ],
    testimonials: [
      { name: 'Michel Perret', company: 'MP Construction', location: 'Lyon 9ème', content: 'Mon site AWEMA m\'a ouvert les portes des promoteurs locaux. Je travaille maintenant sur des chantiers de 100-200k€.', rating: 5, results: ['Chantiers 100-200k€', 'Clients pros'] },
      { name: 'Karim Benzema', company: 'KB Maçonnerie', location: 'Vénissieux', content: 'Le système de pré-devis en ligne me fait gagner 2 jours par semaine. Je me déplace uniquement pour les projets sérieux.', rating: 5, results: ['Gain 2j/semaine', 'Projets qualifiés'] }
    ]
  },
  {
    filename: 'site-internet-macon-paris.astro',
    metier: 'Maçon',
    ville: 'Paris',
    color: 'gray',
    problems: [
      { icon: '🏗️', problem: 'Marché ultra-concurrentiel', description: 'Des centaines de maçons se battent pour les mêmes chantiers' },
      { icon: '🏢', problem: 'Rénovations complexes', description: 'Les immeubles parisiens demandent une expertise spécifique' },
      { icon: '💶', problem: 'Marges faibles', description: 'Les intermédiaires prennent trop de commission' },
      { icon: '📍', problem: 'Zones d\'intervention floues', description: 'Les clients ne savent pas si vous intervenez chez eux' }
    ],
    solutions: [
      { icon: '🗼', solution: 'Expert rénovation parisienne', description: 'Mise en avant de votre expertise immeubles anciens' },
      { icon: '🗺️', solution: 'Carte interactive', description: 'Les clients vérifient instantanément votre zone' },
      { icon: '💎', solution: 'Direct sans intermédiaire', description: 'Devis directs, marges préservées' },
      { icon: '🏆', solution: 'Certifications visibles', description: 'RGE, Qualibat mis en avant pour rassurer' }
    ],
    testimonials: [
      { name: 'François Lefort', company: 'FL Rénovation', location: 'Paris 11ème', content: 'Mon site AWEMA me positionne comme LE spécialiste de la rénovation d\'immeubles. J\'ai décroché 2 gros chantiers de copropriété.', rating: 5, results: ['2 copropriétés', '+300k€ CA'] },
      { name: 'Ahmed Belkacem', company: 'AB Construction', location: 'Paris 19ème', content: 'Fini les plateformes ! Je travaille en direct, mes marges ont augmenté de 40% et je choisis mes chantiers.', rating: 5, results: ['Marges +40%', 'Clients directs'] }
    ]
  },
  {
    filename: 'site-internet-paysagiste-lyon.astro',
    metier: 'Paysagiste',
    ville: 'Lyon',
    color: 'green',
    problems: [
      { icon: '🌿', problem: 'Portfolio peu attrayant', description: 'Vos créations de jardins ne sont pas mises en valeur' },
      { icon: '🏡', problem: 'Clients indécis', description: 'Difficile de faire visualiser le projet final' },
      { icon: '📅', problem: 'Saisonnalité marquée', description: 'Creux d\'activité en hiver difficiles à gérer' },
      { icon: '💰', problem: 'Devis complexes', description: 'Entre plantes, travaux et entretien, c\'est compliqué' }
    ],
    solutions: [
      { icon: '📸', solution: 'Portfolio avant/après', description: 'Transformations spectaculaires de jardins lyonnais' },
      { icon: '🎨', solution: 'Simulateur 3D', description: 'Visualisation du jardin futur avec les plantes' },
      { icon: '❄️', solution: 'Services 4 saisons', description: 'Mise en avant entretien et jardins d\'hiver' },
      { icon: '💵', solution: 'Devis modulaires', description: 'Options claires : création, entretien, arrosage' }
    ],
    testimonials: [
      { name: 'Sylvie Martin', company: 'Les Jardins de Sylvie', location: 'Lyon 5ème', content: 'Mon site AWEMA montre vraiment la beauté de mes créations. J\'ai doublé mes demandes de jardins complets à 20-30k€.', rating: 5, results: ['Demandes x2', 'Projets 20-30k€'] },
      { name: 'Julien Vert', company: 'JV Paysages', location: 'Tassin', content: 'Le simulateur 3D fait la différence ! Les clients signent plus facilement quand ils peuvent visualiser leur futur jardin.', rating: 5, results: ['Taux conversion +60%', 'Vente facilitée'] }
    ]
  },
  {
    filename: 'site-internet-paysagiste-paris.astro',
    metier: 'Paysagiste',
    ville: 'Paris',
    color: 'green',
    problems: [
      { icon: '🏢', problem: 'Peu d\'espaces verts', description: 'Marché limité aux terrasses et petits jardins' },
      { icon: '💸', problem: 'Clientèle exigeante', description: 'Les Parisiens veulent du design végétal haut de gamme' },
      { icon: '🌱', problem: 'Tendance écolo complexe', description: 'Demande croissante mais expertise mal valorisée' },
      { icon: '🏗️', problem: 'Accès difficiles', description: 'Logistique complexe en centre-ville' }
    ],
    solutions: [
      { icon: '🌿', solution: 'Expert terrasses & toits', description: 'Spécialisation espaces urbains et toitures végétalisées' },
      { icon: '🎨', solution: 'Design végétal premium', description: 'Portfolio artistique façon magazine déco' },
      { icon: '♻️', solution: 'Label éco-responsable', description: 'Mise en avant permaculture et biodiversité urbaine' },
      { icon: '🚚', solution: 'Process logistique', description: 'Transparence sur les modalités d\'intervention' }
    ],
    testimonials: [
      { name: 'Marie Dubois', company: 'Green Paris', location: 'Paris 16ème', content: 'AWEMA a transformé mon image. Je suis passée de jardinière à designer végétal. Mes tarifs ont doublé et les clients adorent !', rating: 5, results: ['Tarifs x2', 'Image premium'] },
      { name: 'Thomas Green', company: 'Urban Garden', location: 'Paris 7ème', content: 'Mon expertise en toitures végétalisées est enfin visible. J\'ai décroché 3 projets de copropriétés cette année.', rating: 5, results: ['3 copropriétés', 'Spécialisation reconnue'] }
    ]
  },
  {
    filename: 'site-internet-carreleur-lyon.astro',
    metier: 'Carreleur',
    ville: 'Lyon',
    color: 'blue',
    problems: [
      { icon: '🎨', problem: 'Créations mal valorisées', description: 'Vos mosaïques et designs ne sont pas visibles' },
      { icon: '🏠', problem: 'Concurrence low-cost', description: 'Difficile de justifier vos tarifs qualité' },
      { icon: '📐', problem: 'Projets complexes', description: 'Les salles de bain design demandent du conseil' },
      { icon: '🔧', problem: 'Image peu moderne', description: 'Les clients cherchent des carreleurs créatifs' }
    ],
    solutions: [
      { icon: '🖼️', solution: 'Galerie haute définition', description: 'Portfolio avec zoom sur les finitions parfaites' },
      { icon: '💎', solution: 'Positionnement qualité', description: 'Mise en avant garantie 10 ans et expertise' },
      { icon: '🛁', solution: 'Spécialiste salles de bain', description: 'Inspirations et tendances 2025' },
      { icon: '📱', solution: 'Devis photo rapide', description: 'Estimation par photos en 24h' }
    ],
    testimonials: [
      { name: 'Roberto Silva', company: 'RS Carrelage', location: 'Lyon 2ème', content: 'Mon site AWEMA valorise enfin mon savoir-faire. Je travaille maintenant sur des projets haut de gamme avec des architectes.', rating: 5, results: ['Projets premium', 'Partenaires architectes'] },
      { name: 'David Petit', company: 'DP Carrelage Design', location: 'Oullins', content: 'Le portfolio HD fait toute la différence. Les clients voient la qualité de mes finitions et acceptent mes tarifs.', rating: 5, results: ['Tarifs acceptés', 'Clients qualité'] }
    ]
  }
];

function generateLandingPage(data) {
  return `---
import Base from "@/layouts/Base.astro";
import { Image } from "astro:assets";

// Données statiques pour la landing page ${data.metier} ${data.ville}
const landingData = {
  metier: "${data.metier}",
  ville: "${data.ville}",
  hero: {
    headline: "Site Internet Professionnel pour ${data.metier} à ${data.ville}",
    subheadline: "Développez votre activité de ${data.metier.toLowerCase()} avec un site web qui génère des clients qualifiés automatiquement",
    ctaText: "Obtenir ma maquette gratuite",
    trustBadges: ["97€/mois tout compris", "Livré en 48h", "Expert ${data.metier.toLowerCase()}"]
  },
  problems: ${JSON.stringify(data.problems, null, 4)},
  solutions: ${JSON.stringify(data.solutions, null, 4)},
  specialOffer: {
    title: "Offre Spéciale ${data.metier}s ${data.ville}",
    description: "Profitez de notre expertise BTP pour dominer votre marché local",
    originalPrice: "1990€",
    discountPrice: "990€",
    monthlyPrice: "97€/mois",
    urgency: "Plus que 2 places disponibles ce mois-ci",
    features: [
      "Maquette gratuite en 24h",
      "Site 10 pages optimisé SEO",
      "Galerie photos HD",
      "Formulaire de devis intelligent",
      "Avis clients intégrés",
      "Formation incluse"
    ]
  },
  testimonials: ${JSON.stringify(data.testimonials, null, 4)},
  faq: [
    {
      question: "Pourquoi un site spécialisé pour ${data.metier.toLowerCase()} ?",
      answer: "Nous connaissons parfaitement les besoins des ${data.metier.toLowerCase()}s : types de prestations, processus de devis, galeries de réalisations, certifications... Votre site est conçu spécifiquement pour convertir vos visiteurs en clients."
    },
    {
      question: "Comment être sûr d'être visible sur Google à ${data.ville} ?",
      answer: "Notre méthode SEO local a fait ses preuves sur +50 artisans en France. Nous optimisons pour '${data.metier.toLowerCase()} ${data.ville}' et toutes les variantes. Premiers résultats en 4-6 semaines."
    },
    {
      question: "Puis-je modifier mon site moi-même ?",
      answer: "Oui ! Interface simple et intuitive. Vous pouvez modifier textes, photos, tarifs, ajouter des réalisations... Formation incluse et support illimité."
    }
  ]
};

const seoData = {
  meta_title: \`Site Internet \${landingData.metier} \${landingData.ville} | AWEMA - 97€/mois\`,
  meta_description: \`Création de site web professionnel pour \${landingData.metier.toLowerCase()} à \${landingData.ville}. Générez plus de clients avec un site optimisé SEO. Maquette gratuite en 24h.\`,
};
---

<Base {...seoData}>
  <!-- Hero Section avec urgence -->
  <section class="section bg-gradient-to-br from-${data.color}-50 to-white relative overflow-hidden">
    <div class="absolute top-0 right-0 bg-red-500 text-white px-6 py-2 rounded-bl-2xl font-bold animate-pulse">
      🔥 Offre -50% limitée
    </div>

    <div class="container">
      <div class="row gy-5 items-center">
        <div class="lg:col-7">
          <div class="mb-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <span class="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            {landingData.specialOffer.urgency}
          </div>

          <h1 class="text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            {landingData.hero.headline}
          </h1>

          <p class="text-xl mb-8 text-gray-600">
            {landingData.hero.subheadline}
          </p>

          <!-- Trust Badges -->
          <div class="flex flex-wrap gap-4 mb-8">
            {landingData.hero.trustBadges.map((badge) => (
              <span class="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-md text-sm font-semibold">
                ✓ {badge}
              </span>
            ))}
          </div>

          <!-- CTA Principal -->
          <div class="flex flex-wrap gap-4">
            <a href="#formulaire" class="btn btn-xl btn-primary shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
              {landingData.hero.ctaText}
              <span class="ml-2">→</span>
            </a>
            <a href="tel:0756910218" class="btn btn-xl btn-outline-primary">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
              </svg>
              07 56 91 02 18
            </a>
          </div>
        </div>

        <div class="lg:col-5">
          <div class="relative">
            <Image
              class="w-full h-auto rounded-lg shadow-2xl"
              width={600}
              height={500}
              alt={\`Site web \${landingData.metier} \${landingData.ville}\`}
              src="/images/screenshots/banner-shot.png"
              format="webp"
            />
            <!-- Badge sur l'image -->
            <div class="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-3">
              <div class="text-2xl font-bold text-primary">+300</div>
              <div class="text-sm text-gray-600">Sites livrés</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Section Problèmes/Solutions -->
  <section class="section">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">
          Vos problèmes actuels vs Notre solution
        </h2>
        <p class="text-xl text-gray-600">
          Nous connaissons les défis des {landingData.metier.toLowerCase()}s à {landingData.ville}
        </p>
      </div>

      <div class="row gy-8">
        <!-- Colonne Problèmes -->
        <div class="lg:col-6">
          <h3 class="text-2xl font-bold mb-6 text-red-600">❌ Sans site professionnel</h3>
          <div class="space-y-4">
            {landingData.problems.map((item) => (
              <div class="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                <div class="flex items-start">
                  <span class="text-3xl mr-4">{item.icon}</span>
                  <div>
                    <h4 class="font-bold mb-2 text-gray-900">{item.problem}</h4>
                    <p class="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <!-- Colonne Solutions -->
        <div class="lg:col-6">
          <h3 class="text-2xl font-bold mb-6 text-green-600">✅ Avec votre site AWEMA</h3>
          <div class="space-y-4">
            {landingData.solutions.map((item) => (
              <div class="bg-green-50 rounded-lg p-6 border-l-4 border-green-500">
                <div class="flex items-start">
                  <span class="text-3xl mr-4">{item.icon}</span>
                  <div>
                    <h4 class="font-bold mb-2 text-gray-900">{item.solution}</h4>
                    <p class="text-gray-700">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Offre Spéciale -->
  <section class="section bg-gradient-to-r from-${data.color}-600 to-${data.color}-700 text-white">
    <div class="container">
      <div class="bg-white/10 backdrop-blur rounded-2xl p-8 lg:p-12">
        <div class="text-center mb-8">
          <h2 class="text-4xl font-bold mb-4">{landingData.specialOffer.title}</h2>
          <p class="text-xl opacity-90">{landingData.specialOffer.description}</p>
        </div>

        <div class="row gy-8 items-center">
          <div class="lg:col-7">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              {landingData.specialOffer.features.map((feature) => (
                <div class="flex items-center">
                  <svg class="w-6 h-6 text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div class="lg:col-5">
            <div class="bg-white rounded-xl p-8 text-gray-900 text-center">
              <div class="mb-4">
                <span class="text-xl line-through text-gray-400">{landingData.specialOffer.originalPrice}</span>
                <span class="text-5xl font-bold text-${data.color}-600 ml-4">{landingData.specialOffer.discountPrice}</span>
              </div>
              <p class="text-2xl font-semibold mb-6">
                Puis {landingData.specialOffer.monthlyPrice}
              </p>
              <a href="#formulaire" class="btn btn-primary btn-xl w-full mb-4">
                Je profite de l'offre
              </a>
              <p class="text-sm text-red-600 font-medium animate-pulse">
                ⚠️ {landingData.specialOffer.urgency}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Témoignages -->
  <section class="section bg-light">
    <div class="container">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">
          Ils ont transformé leur activité
        </h2>
        <p class="text-xl text-gray-600">
          Découvrez les résultats de nos clients {landingData.metier.toLowerCase()}s
        </p>
      </div>

      <div class="row gy-6">
        {landingData.testimonials.map((testimonial) => (
          <div class="lg:col-6">
            <div class="bg-white rounded-xl shadow-lg p-8 h-full">
              <div class="flex mb-4">
                {[...Array(testimonial.rating)].map(() => (
                  <svg class="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>

              <p class="text-lg mb-6 italic">"{testimonial.content}"</p>

              <div class="flex items-center justify-between">
                <div>
                  <div class="font-bold">{testimonial.name}</div>
                  <div class="text-gray-600">{testimonial.company}</div>
                  <div class="text-sm text-gray-500">{testimonial.location}</div>
                </div>
                <div class="text-right">
                  {testimonial.results.map((result) => (
                    <div class="text-sm font-semibold text-green-600">
                      ✓ {result}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section">
    <div class="container">
      <div class="row justify-center">
        <div class="lg:col-8">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold mb-4">Questions fréquentes</h2>
            <p class="text-xl text-gray-600">
              Tout ce que vous devez savoir sur votre futur site
            </p>
          </div>

          <div class="space-y-6">
            {landingData.faq.map((item, index) => (
              <details class="bg-white rounded-lg shadow-md p-6 group">
                <summary class="font-bold text-lg cursor-pointer flex items-center justify-between">
                  {item.question}
                  <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </summary>
                <p class="mt-4 text-gray-700">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Formulaire de contact -->
  <section class="section bg-gradient-to-br from-gray-50 to-white" id="formulaire">
    <div class="container">
      <div class="row justify-center">
        <div class="lg:col-8">
          <div class="bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
            <div class="text-center mb-8">
              <h2 class="text-4xl font-bold mb-4">
                Recevez votre maquette gratuite en 24h
              </h2>
              <p class="text-xl text-gray-600">
                Remplissez ce formulaire et découvrez votre futur site
              </p>
              <div class="mt-4 inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                ⏰ Temps de remplissage : 2 minutes
              </div>
            </div>

            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="${data.metier} Dupont"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="contact@exemple.fr"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Votre zone d'intervention
                </label>
                <input
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder={\`\${landingData.ville} et environs\`}
                  value={\`\${landingData.ville}\`}
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Message (optionnel)
                </label>
                <textarea
                  rows="4"
                  class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Décrivez vos besoins spécifiques..."
                ></textarea>
              </div>

              <div class="flex items-start">
                <input
                  type="checkbox"
                  required
                  class="mt-1 mr-3"
                />
                <label class="text-sm text-gray-600">
                  J'accepte d'être contacté par AWEMA pour recevoir ma maquette gratuite et des informations sur leurs services
                </label>
              </div>

              <button
                type="submit"
                class="w-full btn btn-primary btn-xl py-4 text-lg font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
              >
                Recevoir ma maquette gratuite →
              </button>

              <p class="text-center text-sm text-gray-500">
                Ou appelez-nous directement au{" "}
                <a href="tel:0756910218" class="text-primary font-semibold">
                  07 56 91 02 18
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Final -->
  <section class="section bg-${data.color}-600 text-white">
    <div class="container text-center">
      <h2 class="text-4xl font-bold mb-6">
        Ne laissez plus vos concurrents prendre vos clients
      </h2>
      <p class="text-xl mb-8 opacity-90">
        Chaque jour sans site professionnel, c'est des clients qui vont chez vos concurrents
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="#formulaire" class="btn btn-white btn-xl">
          Je veux ma maquette gratuite
        </a>
        <a href="tel:0756910218" class="btn btn-outline-white btn-xl">
          Appeler maintenant
        </a>
      </div>
    </div>
  </section>
</Base>`;
}

// Créer toutes les pages
pagesData.forEach(data => {
  const content = generateLandingPage(data);
  const filePath = path.join(__dirname, 'src', 'pages', data.filename);

  fs.writeFileSync(filePath, content);
  console.log(`✅ Créé: ${data.filename}`);
});

console.log('\n🚀 Toutes les landing pages ont été créées avec succès!');