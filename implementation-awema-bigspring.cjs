#!/usr/bin/env node

/**
 * 🚀 SCRIPT D'IMPLÉMENTATION AWEMA.FR AVEC BIGSPRING
 *
 * Transforme le template BigSpring en site haute conversion pour AWEMA
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration AWEMA
const AWEMA_CONFIG = {
  // Identité
  brand: {
    name: 'AWEMA',
    tagline: 'Sites Web pour Artisans BTP',
    logo: '/images/awema-logo.svg',
    email: 'contact@awema.fr',
    phone: '09 72 55 35 86',
    address: 'Lyon, France'
  },

  // Proposition de valeur
  value: {
    headline: 'Votre Site Web Professionnel en 48h',
    subheadline: 'À partir de 97€/mois - Sans Frais Cachés',
    promise: 'AWEMA crée des sites qui génèrent vraiment des clients pour les artisans du BTP. +300 sites livrés.',
    cta_primary: 'Voir une Démo Gratuite',
    cta_secondary: 'Découvrir les Prix'
  },

  // Social Proof
  stats: {
    sites_delivered: '+300',
    delivery_time: '48h',
    google_rating: '4.9/5',
    technical_cost: '0€'
  },

  // Pricing
  plans: [
    {
      name: 'STARTER',
      price: '97€',
      period: '/mois',
      features: [
        'Site 5 pages',
        'Optimisé Google',
        'Formulaire contact',
        'Hébergement inclus'
      ],
      cta: 'Commander',
      popular: false
    },
    {
      name: 'PRO',
      price: '147€',
      period: '/mois',
      features: [
        'Site 10 pages',
        'Réservation en ligne',
        'Blog intégré',
        'Photos professionnelles'
      ],
      cta: 'Plus Populaire',
      popular: true
    },
    {
      name: 'PREMIUM',
      price: '247€',
      period: '/mois',
      features: [
        'Site illimité',
        'E-commerce',
        'Multi-langues',
        'Support prioritaire'
      ],
      cta: 'Commander',
      popular: false
    }
  ],

  // Témoignages
  testimonials: [
    {
      text: "J'ai doublé mes devis en 3 mois",
      author: 'Pierre D.',
      role: 'Plombier Lyon',
      rating: 5
    },
    {
      text: "Enfin visible sur Google !",
      author: 'Marie L.',
      role: 'Électricienne Marseille',
      rating: 5
    },
    {
      text: "ROI en 2 mois, incroyable",
      author: 'Jean C.',
      role: 'Maçon Toulouse',
      rating: 5
    }
  ],

  // Process
  process: [
    {
      step: 1,
      title: 'Choisissez votre Design',
      description: '3 maquettes personnalisées en 24h',
      icon: 'design'
    },
    {
      step: 2,
      title: "On s'occupe de Tout",
      description: 'Contenu, SEO, mise en ligne',
      icon: 'build'
    },
    {
      step: 3,
      title: 'Recevez des Clients',
      description: 'Site optimisé Google dès le jour 1',
      icon: 'growth'
    }
  ],

  // Garanties
  guarantees: [
    'Satisfait ou Remboursé 30 jours',
    'Aucun frais technique caché',
    'Propriété totale du site',
    'Formation incluse'
  ]
};

// Métiers pour landing pages
const METIERS = [
  'plombier',
  'electricien',
  'menuisier',
  'macon',
  'paysagiste',
  'carreleur',
  'peintre',
  'chauffagiste',
  'couvreur',
  'serrurier'
];

// Villes cibles
const VILLES = [
  'lyon',
  'paris',
  'marseille',
  'toulouse',
  'nice',
  'nantes',
  'strasbourg',
  'montpellier',
  'bordeaux',
  'lille'
];

/**
 * Génère le contenu de la homepage
 */
async function generateHomepage() {
  const homepage = `---
title: "${AWEMA_CONFIG.value.headline}"
meta_title: "AWEMA - Création Sites Internet Artisans BTP | 97€/mois"
description: "${AWEMA_CONFIG.value.promise}"
---

import Layout from "@/layouts/Base.astro";
import Hero from "@/components/Hero.astro";
import Stats from "@/components/Stats.astro";
import Process from "@/components/Process.astro";
import Demo from "@/components/Demo.astro";
import Pricing from "@/components/Pricing.astro";
import Testimonials from "@/components/Testimonials.astro";
import Guarantees from "@/components/Guarantees.astro";
import CTA from "@/components/CTA.astro";

<Layout>
  <Hero
    title="${AWEMA_CONFIG.value.headline}"
    subtitle="${AWEMA_CONFIG.value.subheadline}"
    description="${AWEMA_CONFIG.value.promise}"
    primaryCTA="${AWEMA_CONFIG.value.cta_primary}"
    secondaryCTA="${AWEMA_CONFIG.value.cta_secondary}"
    primaryLink="/demo-gratuite"
    secondaryLink="/tarifs"
  />

  <Stats stats={${JSON.stringify(AWEMA_CONFIG.stats, null, 2)}} />

  <Process steps={${JSON.stringify(AWEMA_CONFIG.process, null, 2)}} />

  <Demo
    title="Découvrez Votre Futur Site"
    metiers={["Plombier", "Électricien", "Menuisier", "Maçon", "Paysagiste"]}
    cta="Je veux le même"
  />

  <Pricing plans={${JSON.stringify(AWEMA_CONFIG.plans, null, 2)}} />

  <Testimonials items={${JSON.stringify(AWEMA_CONFIG.testimonials, null, 2)}} />

  <Guarantees items={${JSON.stringify(AWEMA_CONFIG.guarantees, null, 2)}} />

  <CTA
    title="⚡ Offre Limitée : -20% pour les 10 prochains clients"
    button="Réserver mon Créneau"
    link="https://calendly.com/awema/demo"
    urgency={true}
  />
</Layout>`;

  return homepage;
}

/**
 * Génère une landing page métier
 */
function generateLandingPage(metier, ville) {
  const metierCapitalized = metier.charAt(0).toUpperCase() + metier.slice(1);
  const villeCapitalized = ville.charAt(0).toUpperCase() + ville.slice(1);

  return `---
title: "Site Internet ${metierCapitalized} ${villeCapitalized} - 97€/mois"
meta_title: "Création Site Web ${metierCapitalized} ${villeCapitalized} | AWEMA"
description: "Site professionnel pour ${metier} à ${villeCapitalized}. 1er sur Google en 60 jours. Devis en ligne, urgences 24/7. Maquette gratuite en 24h."
---

import Layout from "@/layouts/Landing.astro";
import HeroLanding from "@/components/HeroLanding.astro";
import Problems from "@/components/Problems.astro";
import VideoDemo from "@/components/VideoDemo.astro";
import TestimonialsMetier from "@/components/TestimonialsMetier.astro";
import OfferSpecial from "@/components/OfferSpecial.astro";
import FAQ from "@/components/FAQ.astro";

<Layout>
  <HeroLanding
    title="${metierCapitalized}s de ${villeCapitalized} : Doublez vos Devis avec un Site Pro qui Convertit"
    badges={[
      "1er sur '${metier} ${villeCapitalized}' en 60 jours",
      "Formulaire de devis intégré",
      "Urgences 24/7 mis en avant"
    ]}
    cta="Voir ma Maquette Gratuite en 24h"
    ctaLink="/formulaire-maquette?metier=${metier}&ville=${ville}"
  />

  <Problems
    problems={[
      {
        problem: "Personne ne me trouve sur Google",
        solution: "SEO local optimisé + Google My Business"
      },
      {
        problem: "Les gens appellent pour les prix",
        solution: "Grille tarifaire claire sur le site"
      },
      {
        problem: "Mes concurrents ont de meilleurs sites",
        solution: "Design moderne qui inspire confiance"
      }
    ]}
  />

  <VideoDemo
    title="Regardez le Site de ${metierCapitalized} Durand"
    videoUrl="/demos/demo-${metier}.mp4"
    description="Un vrai site de ${metier} créé par AWEMA"
  />

  <TestimonialsMetier
    metier="${metier}"
    testimonials={[
      {
        text: "32 nouveaux clients en 2 mois",
        author: "${metierCapitalized} Express",
        location: "${villeCapitalized}"
      },
      {
        text: "Mon téléphone n'arrête plus de sonner",
        author: "SOS ${metierCapitalized}",
        location: "${villeCapitalized}"
      }
    ]}
  />

  <OfferSpecial
    title="🔥 OFFRE SPÉCIALE ${metierCapitalized.toUpperCase()}S ${villeCapitalized.toUpperCase()}"
    features={[
      "Maquette GRATUITE en 24h",
      "-30% les 3 premiers mois",
      "Badge 'Urgence 24/7' offert",
      "Module réservation en ligne inclus"
    ]}
    cta="Obtenir ma Maquette Gratuite"
    ctaLink="/formulaire-maquette?metier=${metier}&ville=${ville}&promo=30"
  />

  <FAQ
    questions={[
      {
        q: "Puis-je modifier les tarifs moi-même ?",
        a: "OUI, vous avez un accès complet au back-office"
      },
      {
        q: "Le site fonctionne sur mobile ?",
        a: "OUI, 80% des recherches sont sur mobile, c'est notre priorité"
      },
      {
        q: "Combien de temps pour être sur Google ?",
        a: "30-60 jours pour les premières positions"
      },
      {
        q: "Vous gérez les avis clients ?",
        a: "OUI, système d'avis Google intégré"
      }
    ]}
  />
</Layout>`;
}

/**
 * Génère les composants custom
 */
async function generateComponents() {
  const components = {
    'Stats.astro': `---
export interface Props {
  stats: Record<string, string>;
}

const { stats } = Astro.props;
---

<section class="py-12 bg-gray-50">
  <div class="container mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {Object.entries(stats).map(([key, value]) => (
        <div class="flex flex-col">
          <span class="text-3xl font-bold text-primary">{value}</span>
          <span class="text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
        </div>
      ))}
    </div>
  </div>
</section>`,

    'Demo.astro': `---
export interface Props {
  title: string;
  metiers: string[];
  cta: string;
}

const { title, metiers, cta } = Astro.props;
---

<section class="py-16">
  <div class="container mx-auto">
    <h2 class="text-3xl font-bold text-center mb-8">{title}</h2>

    <div class="flex justify-center gap-4 mb-8">
      {metiers.map((metier) => (
        <button
          class="px-6 py-3 bg-white border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition"
          data-metier={metier.toLowerCase()}
        >
          {metier}
        </button>
      ))}
    </div>

    <div class="bg-white rounded-lg shadow-xl p-4">
      <iframe
        id="demo-frame"
        src="/demos/plombier"
        class="w-full h-[600px] border-0 rounded"
      />
    </div>

    <div class="text-center mt-8">
      <a href="/formulaire-maquette" class="btn btn-primary btn-lg">
        {cta} →
      </a>
    </div>
  </div>
</section>

<script>
  const buttons = document.querySelectorAll('[data-metier]');
  const frame = document.getElementById('demo-frame');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const metier = btn.dataset.metier;
      frame.src = \`/demos/\${metier}\`;

      buttons.forEach(b => b.classList.remove('bg-primary', 'text-white'));
      btn.classList.add('bg-primary', 'text-white');
    });
  });
</script>`
  };

  return components;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Génération du site AWEMA haute conversion...\n');

  try {
    // 1. Générer la homepage
    console.log('📄 Génération de la homepage...');
    const homepage = await generateHomepage();
    await fs.writeFile('src/pages/index.astro', homepage);
    console.log('✅ Homepage générée');

    // 2. Générer les landing pages métiers
    console.log('\n📄 Génération des landing pages...');
    for (const metier of METIERS.slice(0, 3)) { // Top 3 métiers pour commencer
      for (const ville of VILLES.slice(0, 3)) { // Top 3 villes
        const landingPage = generateLandingPage(metier, ville);
        const filename = `site-internet-${metier}-${ville}.astro`;
        await fs.writeFile(`src/pages/${filename}`, landingPage);
        console.log(`✅ Landing page ${metier} ${ville}`);
      }
    }

    // 3. Générer les composants
    console.log('\n📦 Génération des composants...');
    const components = await generateComponents();
    for (const [filename, content] of Object.entries(components)) {
      await fs.writeFile(`src/components/${filename}`, content);
      console.log(`✅ Composant ${filename}`);
    }

    console.log('\n🎉 Site AWEMA généré avec succès !');
    console.log('\n📋 Prochaines étapes :');
    console.log('1. npm install');
    console.log('2. npm run dev');
    console.log('3. Configurer Calendly');
    console.log('4. Ajouter les démos métiers');
    console.log('5. Setup Google Analytics');

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

// Lancer la génération
if (require.main === module) {
  main();
}

module.exports = { AWEMA_CONFIG, generateHomepage, generateLandingPage };