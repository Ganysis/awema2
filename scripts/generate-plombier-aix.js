#!/usr/bin/env node

/**
 * Script de génération d'un site complet pour Plomberie Aixoise
 * Utilise le système AWEMA existant avec des photos réelles Unsplash
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration du client
const CLIENT_DATA = {
  businessName: "Plomberie Aixoise - Dépannage 24/7",
  businessType: "plombier",
  location: {
    city: "Aix-en-Provence",
    postalCode: "13090",
    department: "Bouches-du-Rhône"
  },
  contact: {
    phone: "04 42 21 34 56",
    email: "contact@plomberie-aixoise.fr",
    address: "15 Cours Mirabeau, 13090 Aix-en-Provence"
  },
  services: [
    {
      title: "Dépannage d'Urgence 24/7",
      description: "Intervention rapide pour tous vos problèmes de plomberie urgents",
      icon: "🚨",
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80"
    },
    {
      title: "Installation Sanitaire",
      description: "Installation complète de salles de bain et équipements sanitaires",
      icon: "🚿",
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80"
    },
    {
      title: "Rénovation Plomberie",
      description: "Rénovation complète de votre système de plomberie",
      icon: "🔧",
      image: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80"
    },
    {
      title: "Chauffage & Chaudière",
      description: "Installation et entretien de chauffage et chaudières",
      icon: "🔥",
      image: "https://images.unsplash.com/photo-1565636580598-b3838bd0e3e5?w=800&q=80"
    },
    {
      title: "Recherche de Fuite",
      description: "Détection et réparation de fuites avec matériel professionnel",
      icon: "💧",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
    },
    {
      title: "Débouchage Canalisation",
      description: "Débouchage rapide de toutes vos canalisations",
      icon: "🚰",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=800&q=80"
    }
  ],
  testimonials: [
    {
      name: "Marie Dupont",
      rating: 5,
      text: "Intervention très rapide pour une fuite d'eau. Plombier professionnel et prix raisonnable. Je recommande vivement!"
    },
    {
      name: "Jean Martin",
      rating: 5,
      text: "Excellent service pour la rénovation de ma salle de bain. Travail soigné et équipe sympathique."
    },
    {
      name: "Sophie Bernard",
      rating: 5,
      text: "Dépannage en urgence un dimanche soir. Très réactif et efficace. Merci pour votre professionnalisme!"
    }
  ],
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&q=80",
      title: "Salle de bain moderne"
    },
    {
      url: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
      title: "Installation robinetterie"
    },
    {
      url: "https://images.unsplash.com/photo-1595514535116-d0c3aa2c2e7d?w=800&q=80",
      title: "Tuyauterie professionnelle"
    },
    {
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      title: "Plombier au travail"
    },
    {
      url: "https://images.unsplash.com/photo-1604709621325-0523a8c3d97a?w=800&q=80",
      title: "Installation chaudière"
    },
    {
      url: "https://images.unsplash.com/photo-1585128903994-9788298932b4?w=800&q=80",
      title: "Réparation évier"
    }
  ]
};

// Template HTML complet
function generateHTML() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${CLIENT_DATA.businessName} - Plombier ${CLIENT_DATA.location.city}</title>
    <meta name="description" content="Plomberie Aixoise, votre expert plombier à Aix-en-Provence. Dépannage 24/7, installation, rénovation. Intervention rapide ☎️ ${CLIENT_DATA.contact.phone}">
    <meta name="keywords" content="plombier aix-en-provence, plomberie urgence aix, dépannage plombier 13090, plombier 24/7 aix">

    <!-- Open Graph -->
    <meta property="og:title" content="${CLIENT_DATA.businessName}">
    <meta property="og:description" content="Expert plombier à Aix-en-Provence - Dépannage 24/7">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="fr_FR">

    <!-- Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%230066CC'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-11h4v6h-4z'/%3E%3C/svg%3E">

    <!-- Styles -->
    <style>
        /* Variables CSS */
        :root {
            --primary: #0066CC;
            --primary-dark: #0052A3;
            --primary-light: #E6F2FF;
            --secondary: #FF6B35;
            --text-dark: #1A1A1A;
            --text-gray: #666666;
            --bg-light: #F8F9FA;
            --white: #FFFFFF;
            --shadow-sm: 0 2px 4px rgba(0,0,0,0.08);
            --shadow-md: 0 4px 8px rgba(0,0,0,0.12);
            --shadow-lg: 0 8px 16px rgba(0,0,0,0.16);
            --radius: 8px;
            --radius-lg: 16px;
        }

        /* Reset et base */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
            line-height: 1.6;
            color: var(--text-dark);
            background: var(--white);
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Header */
        header {
            background: var(--white);
            box-shadow: var(--shadow-sm);
            position: sticky;
            top: 0;
            z-index: 1000;
        }

        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 0;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--primary);
            text-decoration: none;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links a {
            color: var(--text-dark);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }

        .nav-links a:hover {
            color: var(--primary);
        }

        .header-cta {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .phone-btn {
            background: var(--secondary);
            color: var(--white);
            padding: 0.75rem 1.5rem;
            border-radius: var(--radius);
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .phone-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }

        /* Hero Section */
        .hero {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: var(--white);
            padding: 5rem 0;
            position: relative;
            overflow: hidden;
        }

        .hero-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .hero-text h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            line-height: 1.2;
        }

        .hero-text .subtitle {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: rgba(255,255,255,0.9);
        }

        .hero-text p {
            font-size: 1.125rem;
            margin-bottom: 2rem;
            color: rgba(255,255,255,0.85);
        }

        .hero-badges {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .badge {
            background: rgba(255,255,255,0.2);
            padding: 0.5rem 1rem;
            border-radius: var(--radius);
            backdrop-filter: blur(10px);
        }

        .cta-group {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }

        .btn-primary {
            background: var(--secondary);
            color: var(--white);
            padding: 1rem 2rem;
            border-radius: var(--radius);
            text-decoration: none;
            font-weight: 600;
            font-size: 1.125rem;
            transition: transform 0.3s, box-shadow 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .btn-secondary {
            background: rgba(255,255,255,0.2);
            color: var(--white);
            padding: 1rem 2rem;
            border: 2px solid var(--white);
            border-radius: var(--radius);
            text-decoration: none;
            font-weight: 600;
            font-size: 1.125rem;
            transition: background 0.3s;
        }

        .btn-secondary:hover {
            background: rgba(255,255,255,0.3);
        }

        .hero-image {
            position: relative;
        }

        .hero-image img {
            width: 100%;
            height: auto;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
        }

        /* Services Section */
        .services {
            padding: 5rem 0;
            background: var(--bg-light);
        }

        .section-header {
            text-align: center;
            margin-bottom: 3rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .section-header p {
            font-size: 1.125rem;
            color: var(--text-gray);
            max-width: 600px;
            margin: 0 auto;
        }

        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .service-card {
            background: var(--white);
            border-radius: var(--radius-lg);
            overflow: hidden;
            box-shadow: var(--shadow-sm);
            transition: transform 0.3s, box-shadow 0.3s;
        }

        .service-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-lg);
        }

        .service-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }

        .service-content {
            padding: 1.5rem;
        }

        .service-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .service-content h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--primary);
        }

        .service-content p {
            color: var(--text-gray);
            line-height: 1.6;
        }

        /* Urgence Banner */
        .urgence-banner {
            background: var(--secondary);
            color: var(--white);
            padding: 2rem 0;
            text-align: center;
        }

        .urgence-content {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .urgence-content h3 {
            font-size: 1.5rem;
        }

        .urgence-phone {
            font-size: 2rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        /* About Section */
        .about {
            padding: 5rem 0;
        }

        .about-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }

        .about-text h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .about-text p {
            color: var(--text-gray);
            margin-bottom: 1.5rem;
            line-height: 1.8;
        }

        .features-list {
            list-style: none;
            margin-top: 2rem;
        }

        .features-list li {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 0;
            color: var(--text-dark);
        }

        .features-list li:before {
            content: "✓";
            background: var(--primary);
            color: var(--white);
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .about-images {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }

        .about-images img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: var(--radius-lg);
        }

        /* Testimonials */
        .testimonials {
            padding: 5rem 0;
            background: var(--bg-light);
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: var(--white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
        }

        .stars {
            color: #FFD700;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            color: var(--text-gray);
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-style: italic;
        }

        .testimonial-author {
            font-weight: 600;
            color: var(--text-dark);
        }

        /* Contact Section */
        .contact {
            padding: 5rem 0;
            background: linear-gradient(135deg, var(--primary-light) 0%, var(--white) 100%);
        }

        .contact-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: start;
        }

        .contact-info h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--text-dark);
        }

        .contact-info p {
            color: var(--text-gray);
            margin-bottom: 2rem;
            line-height: 1.8;
        }

        .contact-details {
            list-style: none;
        }

        .contact-details li {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem 0;
            color: var(--text-dark);
            font-size: 1.125rem;
        }

        .contact-form {
            background: var(--white);
            padding: 2rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-md);
        }

        .form-group {
            margin-bottom: 1.5rem;
        }

        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-dark);
            font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: var(--radius);
            font-size: 1rem;
            transition: border-color 0.3s;
        }

        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            outline: none;
            border-color: var(--primary);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .btn-submit {
            background: var(--primary);
            color: var(--white);
            padding: 1rem 2rem;
            border: none;
            border-radius: var(--radius);
            font-size: 1.125rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s;
            width: 100%;
        }

        .btn-submit:hover {
            background: var(--primary-dark);
        }

        /* Gallery Section */
        .gallery {
            padding: 5rem 0;
        }

        .gallery-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }

        .gallery-item {
            position: relative;
            overflow: hidden;
            border-radius: var(--radius-lg);
            height: 300px;
            cursor: pointer;
        }

        .gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s;
        }

        .gallery-item:hover img {
            transform: scale(1.1);
        }

        .gallery-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.7) 100%);
            display: flex;
            align-items: flex-end;
            padding: 1rem;
            opacity: 0;
            transition: opacity 0.3s;
        }

        .gallery-item:hover .gallery-overlay {
            opacity: 1;
        }

        .gallery-overlay h4 {
            color: var(--white);
        }

        /* Footer */
        footer {
            background: var(--text-dark);
            color: var(--white);
            padding: 3rem 0 1rem;
        }

        .footer-content {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-bottom: 2rem;
        }

        .footer-section h3 {
            margin-bottom: 1rem;
            color: var(--white);
        }

        .footer-section p,
        .footer-section ul {
            color: rgba(255,255,255,0.8);
            line-height: 1.8;
        }

        .footer-section ul {
            list-style: none;
        }

        .footer-section ul li {
            padding: 0.25rem 0;
        }

        .footer-section a {
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            transition: color 0.3s;
        }

        .footer-section a:hover {
            color: var(--secondary);
        }

        .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.6);
        }

        /* Mobile Menu */
        .mobile-menu-toggle {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
        }

        .mobile-menu-toggle span {
            display: block;
            width: 25px;
            height: 3px;
            background: var(--text-dark);
            margin: 5px 0;
            transition: 0.3s;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }

            .mobile-menu-toggle {
                display: block;
            }

            .hero-content {
                grid-template-columns: 1fr;
            }

            .hero-text h1 {
                font-size: 2rem;
            }

            .hero-text .subtitle {
                font-size: 1.25rem;
            }

            .hero-image {
                order: -1;
            }

            .about-content {
                grid-template-columns: 1fr;
            }

            .about-images {
                grid-template-columns: 1fr;
            }

            .contact-content {
                grid-template-columns: 1fr;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }

            .testimonials-grid {
                grid-template-columns: 1fr;
            }

            .gallery-grid {
                grid-template-columns: 1fr;
            }

            .footer-content {
                grid-template-columns: 1fr;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="container">
            <nav>
                <a href="#" class="logo">💧 ${CLIENT_DATA.businessName}</a>

                <ul class="nav-links">
                    <li><a href="#accueil">Accueil</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#gallery">Réalisations</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <div class="header-cta">
                    <a href="tel:${CLIENT_DATA.contact.phone.replace(/\s/g, '')}" class="phone-btn">
                        📞 ${CLIENT_DATA.contact.phone}
                    </a>
                    <button class="mobile-menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="accueil">
        <div class="container">
            <div class="hero-content">
                <div class="hero-text">
                    <h1>${CLIENT_DATA.businessName}</h1>
                    <p class="subtitle">Votre expert plombier à ${CLIENT_DATA.location.city}</p>
                    <p>Intervention rapide, travail soigné et tarifs transparents. Disponible 24h/24 et 7j/7 pour tous vos besoins en plomberie.</p>

                    <div class="hero-badges">
                        <span class="badge">🚨 Urgence 24/7</span>
                        <span class="badge">✓ Devis gratuit</span>
                        <span class="badge">⭐ 100% satisfait</span>
                    </div>

                    <div class="cta-group">
                        <a href="tel:${CLIENT_DATA.contact.phone.replace(/\s/g, '')}" class="btn-primary">
                            📞 Appeler maintenant
                        </a>
                        <a href="#contact" class="btn-secondary">
                            Demander un devis
                        </a>
                    </div>
                </div>

                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80" alt="Plombier professionnel à Aix-en-Provence">
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section class="services" id="services">
        <div class="container">
            <div class="section-header">
                <h2>Nos Services de Plomberie</h2>
                <p>Une gamme complète de services pour tous vos besoins en plomberie</p>
            </div>

            <div class="services-grid">
                ${CLIENT_DATA.services.map(service => `
                <div class="service-card">
                    <img src="${service.image}" alt="${service.title}">
                    <div class="service-content">
                        <div class="service-icon">${service.icon}</div>
                        <h3>${service.title}</h3>
                        <p>${service.description}</p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Urgence Banner -->
    <section class="urgence-banner">
        <div class="container">
            <div class="urgence-content">
                <h3>🚨 URGENCE PLOMBERIE ?</h3>
                <div class="urgence-phone">
                    <span>Appelez-nous 24/7 :</span>
                    <a href="tel:${CLIENT_DATA.contact.phone.replace(/\s/g, '')}" style="color: inherit;">
                        ${CLIENT_DATA.contact.phone}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about" id="about">
        <div class="container">
            <div class="about-content">
                <div class="about-text">
                    <h2>Votre Plombier de Confiance à ${CLIENT_DATA.location.city}</h2>
                    <p>
                        Depuis plus de 15 ans, ${CLIENT_DATA.businessName} est votre partenaire de confiance pour tous vos travaux de plomberie à ${CLIENT_DATA.location.city} et ses environs.
                    </p>
                    <p>
                        Notre équipe de plombiers qualifiés intervient rapidement pour résoudre tous vos problèmes de plomberie, qu'il s'agisse d'une urgence ou de travaux planifiés. Nous garantissons un travail de qualité, des tarifs transparents et une satisfaction client à 100%.
                    </p>

                    <ul class="features-list">
                        <li>Intervention en moins de 30 minutes</li>
                        <li>Devis gratuit et sans engagement</li>
                        <li>Garantie sur tous nos travaux</li>
                        <li>Tarifs transparents et compétitifs</li>
                        <li>Plombiers certifiés et expérimentés</li>
                        <li>Service disponible 24h/24 et 7j/7</li>
                    </ul>
                </div>

                <div class="about-images">
                    <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80" alt="Équipe de plombiers">
                    <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80" alt="Travaux de plomberie">
                    <img src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80" alt="Installation sanitaire">
                    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="Réparation plomberie">
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
        <div class="container">
            <div class="section-header">
                <h2>Témoignages Clients</h2>
                <p>Ce que nos clients disent de nos services</p>
            </div>

            <div class="testimonials-grid">
                ${CLIENT_DATA.testimonials.map(testimonial => `
                <div class="testimonial-card">
                    <div class="stars">
                        ${'⭐'.repeat(testimonial.rating)}
                    </div>
                    <p class="testimonial-text">"${testimonial.text}"</p>
                    <p class="testimonial-author">- ${testimonial.name}</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Gallery Section -->
    <section class="gallery" id="gallery">
        <div class="container">
            <div class="section-header">
                <h2>Nos Réalisations</h2>
                <p>Découvrez quelques-uns de nos travaux récents</p>
            </div>

            <div class="gallery-grid">
                ${CLIENT_DATA.gallery.map(item => `
                <div class="gallery-item">
                    <img src="${item.url}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h4>${item.title}</h4>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section class="contact" id="contact">
        <div class="container">
            <div class="contact-content">
                <div class="contact-info">
                    <h2>Contactez-nous</h2>
                    <p>
                        Besoin d'un plombier à ${CLIENT_DATA.location.city} ? N'hésitez pas à nous contacter pour une intervention rapide ou pour obtenir un devis gratuit.
                    </p>

                    <ul class="contact-details">
                        <li>
                            📍 <strong>Adresse:</strong> ${CLIENT_DATA.contact.address}
                        </li>
                        <li>
                            📞 <strong>Téléphone:</strong> <a href="tel:${CLIENT_DATA.contact.phone.replace(/\s/g, '')}">${CLIENT_DATA.contact.phone}</a>
                        </li>
                        <li>
                            ✉️ <strong>Email:</strong> <a href="mailto:${CLIENT_DATA.contact.email}">${CLIENT_DATA.contact.email}</a>
                        </li>
                        <li>
                            🕐 <strong>Horaires:</strong> 24h/24, 7j/7 pour les urgences
                        </li>
                    </ul>
                </div>

                <form class="contact-form" id="contactForm">
                    <div class="form-group">
                        <label for="name">Nom complet *</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Téléphone *</label>
                        <input type="tel" id="phone" name="phone" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email">
                    </div>

                    <div class="form-group">
                        <label for="service">Type de service *</label>
                        <select id="service" name="service" required>
                            <option value="">Choisissez un service...</option>
                            ${CLIENT_DATA.services.map(service => `
                            <option value="${service.title}">${service.title}</option>
                            `).join('')}
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="message">Décrivez votre problème *</label>
                        <textarea id="message" name="message" required></textarea>
                    </div>

                    <button type="submit" class="btn-submit">
                        Envoyer la demande
                    </button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>À propos</h3>
                    <p>
                        ${CLIENT_DATA.businessName} est votre expert plombier à ${CLIENT_DATA.location.city}.
                        Intervention rapide, travail de qualité et prix justes garantis.
                    </p>
                </div>

                <div class="footer-section">
                    <h3>Services</h3>
                    <ul>
                        ${CLIENT_DATA.services.map(service => `
                        <li><a href="#services">${service.title}</a></li>
                        `).join('')}
                    </ul>
                </div>

                <div class="footer-section">
                    <h3>Zone d'intervention</h3>
                    <p>
                        ${CLIENT_DATA.location.city}, ${CLIENT_DATA.location.department} et communes alentours :
                        Venelles, Les Milles, Luynes, Puyricard, Eguilles, Cabriès, Bouc-Bel-Air, Gardanne...
                    </p>
                </div>

                <div class="footer-section">
                    <h3>Contact</h3>
                    <p>
                        📞 ${CLIENT_DATA.contact.phone}<br>
                        ✉️ ${CLIENT_DATA.contact.email}<br>
                        📍 ${CLIENT_DATA.contact.address}
                    </p>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; 2024 ${CLIENT_DATA.businessName} - Tous droits réservés | Site créé par AWEMA</p>
            </div>
        </div>
    </footer>

    <!-- JavaScript -->
    <script>
        // Mobile menu toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (mobileToggle) {
            mobileToggle.addEventListener('click', () => {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            });
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();

                // Collect form data
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData);

                // Here you would normally send the data to a server
                console.log('Form submitted:', data);

                // Show success message
                alert('Merci pour votre demande ! Nous vous recontactons dans les plus brefs délais.');

                // Reset form
                contactForm.reset();
            });
        }

        // Header scroll effect
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.08)';
            }

            lastScroll = currentScroll;
        });

        // Schema.org structured data
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Plumber",
            "name": "${CLIENT_DATA.businessName}",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "${CLIENT_DATA.contact.address}",
                "addressLocality": "${CLIENT_DATA.location.city}",
                "postalCode": "${CLIENT_DATA.location.postalCode}",
                "addressCountry": "FR"
            },
            "telephone": "${CLIENT_DATA.contact.phone}",
            "email": "${CLIENT_DATA.contact.email}",
            "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday",
                    "Friday", "Saturday", "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
            },
            "priceRange": "€€",
            "image": "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80",
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "${CLIENT_DATA.testimonials.length}"
            }
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(schemaData);
        document.head.appendChild(script);
    </script>
</body>
</html>`;
}

// Créer le dossier de sortie et générer le site
async function generateSite() {
  const outputDir = path.join(__dirname, '..', 'sites-generes', 'plombier-aix');

  console.log('🚀 Génération du site pour Plomberie Aixoise...');

  // Créer le dossier de sortie
  await fs.mkdir(outputDir, { recursive: true });

  // Générer et écrire le HTML
  const html = generateHTML();
  await fs.writeFile(path.join(outputDir, 'index.html'), html);

  // Créer un fichier robots.txt
  const robots = `User-agent: *
Allow: /
Sitemap: https://plomberie-aixoise.fr/sitemap.xml`;
  await fs.writeFile(path.join(outputDir, 'robots.txt'), robots);

  // Créer un sitemap.xml simple
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://plomberie-aixoise.fr/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
  await fs.writeFile(path.join(outputDir, 'sitemap.xml'), sitemap);

  // Créer un fichier manifest.json pour PWA
  const manifest = JSON.stringify({
    name: CLIENT_DATA.businessName,
    short_name: "Plomberie Aixoise",
    description: "Expert plombier à Aix-en-Provence - Dépannage 24/7",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0066CC",
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 192 192' fill='%230066CC'%3E%3Cpath d='M96 16C51.8 16 16 51.8 16 96s35.8 80 80 80 80-35.8 80-80-35.8-80-80-80zm0 144c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64zm-16-88h32v48h-32z'/%3E%3C/svg%3E",
        sizes: "192x192",
        type: "image/svg+xml"
      }
    ]
  }, null, 2);
  await fs.writeFile(path.join(outputDir, 'manifest.json'), manifest);

  console.log('✅ Site généré avec succès dans:', outputDir);
  console.log('📁 Fichiers créés:');
  console.log('   - index.html (site complet)');
  console.log('   - robots.txt');
  console.log('   - sitemap.xml');
  console.log('   - manifest.json');
  console.log('\n📊 Statistiques:');
  console.log(`   - ${CLIENT_DATA.services.length} services`);
  console.log(`   - ${CLIENT_DATA.testimonials.length} témoignages`);
  console.log(`   - ${CLIENT_DATA.gallery.length} images de galerie`);
  console.log('\n🎨 Design:');
  console.log('   - Couleur primaire: #0066CC (bleu plombier)');
  console.log('   - Couleur secondaire: #FF6B35 (orange CTA)');
  console.log('   - Images Unsplash professionnelles');
  console.log('   - Responsive mobile-first');
  console.log('\n🚀 Pour voir le site:');
  console.log(`   cd ${outputDir}`);
  console.log('   python3 -m http.server 8080');
  console.log('   Puis ouvrir: http://localhost:8080');
}

// Exécuter la génération
generateSite().catch(console.error);