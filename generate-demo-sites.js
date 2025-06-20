// Script pour générer 5 sites de démonstration avec différents métiers et variantes
const fs = require('fs').promises;
const path = require('path');

// Configuration des 5 sites de démonstration
const DEMO_SITES = [
  {
    id: 'electricien-ultra-pro',
    trade: 'electricien',
    variant: 'ultra-pro',
    data: {
      companyName: 'Élec Expert Pro',
      trade: 'Électricien',
      city: 'Paris',
      description: 'Électricien expert à Paris, spécialisé dans l\'installation, dépannage et rénovation électrique avec plus de 15 ans d\'expérience.',
      phone: '01 45 67 89 10',
      email: 'contact@elec-expert-pro.fr',
      address: '42 Avenue Victor Hugo',
      website: 'https://elec-expert-pro.fr'
    }
  },
  {
    id: 'plombier-premium',
    trade: 'plombier',
    variant: 'premium',
    data: {
      companyName: 'Plomberie Premium',
      trade: 'Plombier',
      city: 'Lyon',
      description: 'Plombier professionnel à Lyon, expert en installation sanitaire, dépannage urgent et rénovation de salle de bain.',
      phone: '04 78 90 12 34',
      email: 'contact@plomberie-premium.fr',
      address: '15 Rue de la République',
      website: 'https://plomberie-premium.fr'
    }
  },
  {
    id: 'menuisier-minimal',
    trade: 'menuisier',
    variant: 'minimal',
    data: {
      companyName: 'Menuiserie Moderne',
      trade: 'Menuisier',
      city: 'Bordeaux',
      description: 'Menuisier artisan à Bordeaux, création sur-mesure de meubles, cuisines et aménagements intérieurs en bois.',
      phone: '05 56 78 90 12',
      email: 'contact@menuiserie-moderne.fr',
      address: '28 Cours de l\'Intendance',
      website: 'https://menuiserie-moderne.fr'
    }
  },
  {
    id: 'peintre-ultra-pro',
    trade: 'peintre',
    variant: 'ultra-pro',
    data: {
      companyName: 'Peinture Excellence',
      trade: 'Peintre',
      city: 'Marseille',
      description: 'Peintre décorateur à Marseille, travaux de peinture intérieure et extérieure, décoration et ravalement de façade.',
      phone: '04 91 23 45 67',
      email: 'contact@peinture-excellence.fr',
      address: '50 Boulevard de la Canebière',
      website: 'https://peinture-excellence.fr'
    }
  },
  {
    id: 'carreleur-premium',
    trade: 'carreleur',
    variant: 'premium',
    data: {
      companyName: 'Carrelage Prestige',
      trade: 'Carreleur',
      city: 'Toulouse',
      description: 'Carreleur professionnel à Toulouse, pose de carrelage, faïence, mosaïque et rénovation complète de sols et murs.',
      phone: '05 61 34 56 78',
      email: 'contact@carrelage-prestige.fr',
      address: '12 Rue du Taur',
      website: 'https://carrelage-prestige.fr'
    }
  }
];

// Templates HTML pour chaque variante
const VARIANT_TEMPLATES = {
  'ultra-pro': {
    name: 'Ultra Pro',
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --primary: #0066ff;
            --secondary: #00d4ff;
            --dark: #0a0e27;
            --light: #ffffff;
            --gray: #8892b0;
        }
        
        body {
            font-family: 'Inter', sans-serif;
            background: var(--dark);
            color: var(--light);
            overflow-x: hidden;
        }
        
        /* Navigation Ultra Modern */
        nav {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(10, 14, 39, 0.9);
            backdrop-filter: blur(20px);
            z-index: 1000;
            padding: 1rem 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-decoration: none;
        }
        
        .nav-menu {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-link {
            color: var(--gray);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
        }
        
        .nav-link:hover {
            color: var(--light);
        }
        
        .nav-cta {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--light);
            padding: 0.75rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.3s;
        }
        
        .nav-cta:hover {
            transform: translateY(-2px);
        }
        
        /* Hero Section Ultra Pro */
        .hero-ultra {
            min-height: 100vh;
            display: flex;
            align-items: center;
            position: relative;
            background: radial-gradient(ellipse at center, rgba(0,102,255,0.1) 0%, transparent 70%);
        }
        
        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .hero-content h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: clamp(3rem, 6vw, 4.5rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
        }
        
        .gradient-text {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            color: var(--gray);
            margin-bottom: 2rem;
        }
        
        .hero-desc {
            font-size: 1.1rem;
            color: var(--gray);
            line-height: 1.8;
            margin-bottom: 3rem;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            flex-wrap: wrap;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: var(--light);
            padding: 1rem 2.5rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            display: inline-block;
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0,102,255,0.3);
        }
        
        .btn-secondary {
            background: transparent;
            color: var(--light);
            padding: 1rem 2.5rem;
            border: 2px solid var(--primary);
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s;
            display: inline-block;
        }
        
        .btn-secondary:hover {
            background: var(--primary);
            transform: translateY(-2px);
        }
        
        .hero-visual {
            position: relative;
        }
        
        .hero-image {
            width: 100%;
            height: 600px;
            background: linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,212,255,0.2)),
                        url('https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop') center/cover;
            border-radius: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .floating-card {
            position: absolute;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,255,255,0.2);
            border-radius: 20px;
            padding: 1.5rem;
        }
        
        .card-1 {
            top: 20px;
            right: -20px;
            animation: float 3s ease-in-out infinite;
        }
        
        .card-2 {
            bottom: 40px;
            left: -20px;
            animation: float 3s ease-in-out infinite 0.5s;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        .stat-label {
            font-size: 0.9rem;
            color: var(--gray);
        }
        
        /* Services Section */
        .services-ultra {
            padding: 8rem 0;
            background: #0f1221;
        }
        
        .services-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: var(--gray);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        
        .service-card {
            background: rgba(255,255,255,0.03);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 2.5rem;
            transition: all 0.3s;
            position: relative;
            overflow: hidden;
        }
        
        .service-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: linear-gradient(90deg, var(--primary), var(--secondary));
        }
        
        .service-card:hover {
            transform: translateY(-5px);
            background: rgba(255,255,255,0.05);
            border-color: var(--primary);
        }
        
        .service-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
        }
        
        .service-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }
        
        .service-desc {
            color: var(--gray);
            line-height: 1.6;
            margin-bottom: 2rem;
        }
        
        .service-features {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .service-features li {
            color: var(--gray);
            margin-bottom: 0.5rem;
            padding-left: 1.5rem;
            position: relative;
        }
        
        .service-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--primary);
        }
        
        .service-price {
            font-size: 1.3rem;
            font-weight: 700;
            color: var(--primary);
        }
        
        /* Contact Section */
        .contact-ultra {
            padding: 8rem 0;
            background: linear-gradient(135deg, rgba(0,102,255,0.1), rgba(0,212,255,0.1));
        }
        
        .contact-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }
        
        .contact-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 2rem;
        }
        
        .contact-desc {
            font-size: 1.2rem;
            color: var(--gray);
            margin-bottom: 3rem;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 3rem;
            flex-wrap: wrap;
            margin-bottom: 3rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 1rem;
            font-size: 1.1rem;
        }
        
        .contact-icon {
            font-size: 1.5rem;
            color: var(--primary);
        }
        
        /* Footer */
        footer {
            background: var(--dark);
            padding: 3rem 0;
            text-align: center;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .footer-logo {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2rem;
            font-weight: 700;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }
        
        .footer-desc {
            color: var(--gray);
            margin-bottom: 2rem;
        }
        
        .footer-bottom {
            color: var(--gray);
            font-size: 0.9rem;
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
        }
        
        @media (max-width: 768px) {
            .hero-container {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .hero-visual {
                display: none;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
            }
            
            .contact-info {
                flex-direction: column;
                gap: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-ultra">
        <div class="hero-container">
            <div class="hero-content">
                <h1>
                    <span class="gradient-text">${data.companyName}</span><br>
                    ${data.trade} Expert
                </h1>
                <p class="hero-subtitle">Votre spécialiste à ${data.city}</p>
                <p class="hero-desc">${data.description}</p>
                <div class="hero-buttons">
                    <a href="tel:${data.phone}" class="btn-primary">Appeler Maintenant</a>
                    <a href="#contact" class="btn-secondary">Devis Gratuit</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image"></div>
                <div class="floating-card card-1">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Ans d'expérience</div>
                </div>
                <div class="floating-card card-2">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Disponibilité</div>
                </div>
            </div>
        </div>
    </section>

    <section class="services-ultra" id="services">
        <div class="services-container">
            <div class="section-header">
                <h2 class="section-title">Nos <span class="gradient-text">Services Premium</span></h2>
                <p class="section-subtitle">Excellence et expertise à votre service</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">⚡</div>
                    <h3 class="service-title">Installation Complète</h3>
                    <p class="service-desc">Installation professionnelle avec matériel de qualité supérieure et garantie étendue.</p>
                    <ul class="service-features">
                        <li>Diagnostic gratuit</li>
                        <li>Matériel certifié</li>
                        <li>Garantie décennale</li>
                        <li>Suivi personnalisé</li>
                    </ul>
                    <div class="service-price">À partir de 85€/h</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🚨</div>
                    <h3 class="service-title">Urgence 24/7</h3>
                    <p class="service-desc">Intervention rapide pour toute urgence, disponible jour et nuit, week-ends et jours fériés.</p>
                    <ul class="service-features">
                        <li>Intervention sous 1h</li>
                        <li>Diagnostic inclus</li>
                        <li>Équipe qualifiée</li>
                        <li>Devis immédiat</li>
                    </ul>
                    <div class="service-price">Déplacement 75€</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🔧</div>
                    <h3 class="service-title">Rénovation & Mise aux Normes</h3>
                    <p class="service-desc">Modernisation complète de vos installations selon les dernières normes en vigueur.</p>
                    <ul class="service-features">
                        <li>Étude personnalisée</li>
                        <li>Conformité garantie</li>
                        <li>Financement possible</li>
                        <li>Travaux propres</li>
                    </ul>
                    <div class="service-price">Devis gratuit</div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-ultra" id="contact">
        <div class="contact-container">
            <h2 class="contact-title">Contactez-nous <span class="gradient-text">Maintenant</span></h2>
            <p class="contact-desc">${data.description}</p>
            
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <span>${data.phone}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${data.address}, ${data.city}</span>
                </div>
            </div>
            
            <a href="tel:${data.phone}" class="btn-primary">Appeler pour un Devis Gratuit</a>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-logo">${data.companyName}</div>
            <p class="footer-desc">Votre ${data.trade} de confiance à ${data.city}</p>
            <div class="footer-bottom">
                <p>© 2025 ${data.companyName} - Design Ultra Pro - Tous droits réservés</p>
            </div>
        </div>
    </footer>
</body>
</html>`
  },
  
  'premium': {
    name: 'Premium',
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} Premium ${data.city}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Poppins:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --gold: #d4af37;
            --dark-gold: #b8941f;
            --navy: #1a2332;
            --light: #ffffff;
            --gray: #6c757d;
            --cream: #faf7f0;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            color: var(--navy);
            line-height: 1.6;
        }
        
        /* Navigation Premium */
        nav {
            background: var(--light);
            padding: 1.5rem 0;
            box-shadow: 0 2px 20px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            font-weight: 700;
            color: var(--navy);
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        
        .logo::before {
            content: '♦';
            color: var(--gold);
        }
        
        .nav-menu {
            display: flex;
            gap: 3rem;
            list-style: none;
        }
        
        .nav-link {
            color: var(--navy);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
            position: relative;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--gold);
            transition: width 0.3s;
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        .nav-cta {
            background: var(--gold);
            color: var(--navy);
            padding: 0.75rem 2rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid var(--gold);
        }
        
        .nav-cta:hover {
            background: transparent;
            color: var(--gold);
        }
        
        /* Hero Premium */
        .hero-premium {
            min-height: 90vh;
            background: linear-gradient(135deg, var(--cream) 0%, var(--light) 100%);
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
        }
        
        .hero-content h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            line-height: 1.2;
            margin-bottom: 1.5rem;
            color: var(--navy);
        }
        
        .gold-text {
            color: var(--gold);
        }
        
        .hero-subtitle {
            font-size: 1.3rem;
            color: var(--gray);
            margin-bottom: 2rem;
            font-weight: 300;
        }
        
        .hero-desc {
            font-size: 1.1rem;
            color: var(--gray);
            line-height: 1.8;
            margin-bottom: 3rem;
        }
        
        .hero-buttons {
            display: flex;
            gap: 1.5rem;
            align-items: center;
        }
        
        .btn-gold {
            background: var(--gold);
            color: var(--navy);
            padding: 1rem 2.5rem;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
            border: 2px solid var(--gold);
        }
        
        .btn-gold:hover {
            background: var(--dark-gold);
            border-color: var(--dark-gold);
        }
        
        .btn-outline {
            background: transparent;
            color: var(--navy);
            padding: 1rem 2.5rem;
            border: 2px solid var(--navy);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s;
        }
        
        .btn-outline:hover {
            background: var(--navy);
            color: var(--light);
        }
        
        .hero-visual {
            position: relative;
        }
        
        .hero-image {
            width: 100%;
            height: 600px;
            background: url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop') center/cover;
            border-radius: 0;
            position: relative;
            box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        }
        
        .hero-badge {
            position: absolute;
            top: 30px;
            right: 30px;
            background: var(--gold);
            color: var(--navy);
            padding: 1rem 2rem;
            font-weight: 700;
            transform: rotate(5deg);
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        
        /* Services Premium */
        .services-premium {
            padding: 8rem 0;
            background: var(--light);
        }
        
        .services-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-title {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--navy);
        }
        
        .section-subtitle {
            font-size: 1.2rem;
            color: var(--gray);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
        }
        
        .service-card {
            background: var(--cream);
            padding: 3rem;
            text-align: center;
            transition: all 0.3s;
            position: relative;
            border: 1px solid var(--cream);
        }
        
        .service-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            border-color: var(--gold);
        }
        
        .service-icon {
            font-size: 3rem;
            margin-bottom: 1.5rem;
            color: var(--gold);
        }
        
        .service-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--navy);
        }
        
        .service-desc {
            color: var(--gray);
            line-height: 1.8;
            margin-bottom: 2rem;
        }
        
        .service-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--gold);
            font-family: 'Playfair Display', serif;
        }
        
        /* Features Premium */
        .features-premium {
            padding: 8rem 0;
            background: var(--navy);
            color: var(--light);
        }
        
        .features-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }
        
        .features-title {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 3rem;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 3rem;
        }
        
        .feature-item {
            text-align: center;
        }
        
        .feature-icon {
            font-size: 3rem;
            color: var(--gold);
            margin-bottom: 1rem;
        }
        
        .feature-title {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }
        
        .feature-desc {
            color: rgba(255,255,255,0.8);
        }
        
        /* Contact Premium */
        .contact-premium {
            padding: 8rem 0;
            background: linear-gradient(135deg, var(--cream) 0%, var(--light) 100%);
        }
        
        .contact-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }
        
        .contact-title {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 2rem;
            color: var(--navy);
        }
        
        .contact-desc {
            font-size: 1.2rem;
            color: var(--gray);
            margin-bottom: 3rem;
        }
        
        .contact-info {
            background: var(--light);
            padding: 3rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            margin-bottom: 3rem;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
        }
        
        .contact-icon {
            color: var(--gold);
            font-size: 1.5rem;
        }
        
        /* Footer */
        footer {
            background: var(--navy);
            color: var(--light);
            padding: 4rem 0 2rem;
            text-align: center;
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .footer-logo::before {
            content: '♦';
            color: var(--gold);
        }
        
        .footer-desc {
            color: rgba(255,255,255,0.8);
            margin-bottom: 3rem;
            font-size: 1.1rem;
        }
        
        .footer-bottom {
            padding-top: 2rem;
            border-top: 1px solid rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.6);
        }
        
        @media (max-width: 768px) {
            .hero-container {
                grid-template-columns: 1fr;
                text-align: center;
            }
            
            .hero-visual {
                display: none;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-premium">
        <div class="hero-container">
            <div class="hero-content">
                <h1>
                    <span class="gold-text">Excellence</span> &<br>
                    Savoir-faire
                </h1>
                <p class="hero-subtitle">${data.trade} Premium à ${data.city}</p>
                <p class="hero-desc">${data.description}</p>
                <div class="hero-buttons">
                    <a href="tel:${data.phone}" class="btn-gold">Consultation Gratuite</a>
                    <a href="#services" class="btn-outline">Nos Services</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image"></div>
                <div class="hero-badge">Premium Service</div>
            </div>
        </div>
    </section>

    <section class="services-premium" id="services">
        <div class="services-container">
            <div class="section-header">
                <h2 class="section-title">Services <span class="gold-text">Premium</span></h2>
                <p class="section-subtitle">Un savoir-faire d'exception à votre service</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-icon">👑</div>
                    <h3 class="service-title">Installation Premium</h3>
                    <p class="service-desc">Service haut de gamme avec matériaux premium et finitions soignées pour un résultat exceptionnel.</p>
                    <div class="service-price">Sur Devis</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">🛡️</div>
                    <h3 class="service-title">Service Conciergerie</h3>
                    <p class="service-desc">Accompagnement personnalisé et service sur-mesure pour répondre à toutes vos exigences.</p>
                    <div class="service-price">Service VIP</div>
                </div>
                
                <div class="service-card">
                    <div class="service-icon">💎</div>
                    <h3 class="service-title">Maintenance Premium</h3>
                    <p class="service-desc">Programme de maintenance préventive avec garantie étendue et service prioritaire.</p>
                    <div class="service-price">Forfait Annuel</div>
                </div>
            </div>
        </div>
    </section>

    <section class="features-premium">
        <div class="features-container">
            <h2 class="features-title">L'Excellence <span class="gold-text">à Chaque Étape</span></h2>
            
            <div class="features-grid">
                <div class="feature-item">
                    <div class="feature-icon">⭐</div>
                    <h3 class="feature-title">Expertise Confirmée</h3>
                    <p class="feature-desc">15 ans d'expérience au service de l'excellence</p>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">🏆</div>
                    <h3 class="feature-title">Certifications Premium</h3>
                    <p class="feature-desc">Toutes les certifications et labels qualité</p>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">🤝</div>
                    <h3 class="feature-title">Service Personnalisé</h3>
                    <p class="feature-desc">Un interlocuteur dédié pour votre projet</p>
                </div>
                
                <div class="feature-item">
                    <div class="feature-icon">✨</div>
                    <h3 class="feature-title">Garantie Satisfaction</h3>
                    <p class="feature-desc">100% satisfait ou nous revenons gratuitement</p>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-premium" id="contact">
        <div class="contact-container">
            <h2 class="contact-title">Prenez Rendez-vous</h2>
            <p class="contact-desc">Découvrez l'excellence de nos services premium</p>
            
            <div class="contact-info">
                <div class="contact-item">
                    <span class="contact-icon">📞</span>
                    <span>${data.phone}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📧</span>
                    <span>${data.email}</span>
                </div>
                <div class="contact-item">
                    <span class="contact-icon">📍</span>
                    <span>${data.address}, ${data.city}</span>
                </div>
            </div>
            
            <a href="tel:${data.phone}" class="btn-gold">Consultation Gratuite</a>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-logo">${data.companyName}</div>
            <p class="footer-desc">L'excellence au service de votre confort</p>
            <div class="footer-bottom">
                <p>© 2025 ${data.companyName} - Design Premium - Tous droits réservés</p>
            </div>
        </div>
    </footer>
</body>
</html>`
  },
  
  'minimal': {
    name: 'Minimal',
    generateHTML: (data) => `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.companyName} - ${data.trade} ${data.city}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        :root {
            --black: #000000;
            --white: #ffffff;
            --gray-100: #f7f7f7;
            --gray-300: #e5e5e5;
            --gray-500: #999999;
            --gray-700: #666666;
            --accent: #0066ff;
        }
        
        body {
            font-family: 'Inter', -apple-system, sans-serif;
            color: var(--black);
            line-height: 1.6;
            background: var(--white);
        }
        
        /* Navigation Minimal */
        nav {
            padding: 2rem 0;
            background: var(--white);
            border-bottom: 1px solid var(--gray-300);
        }
        
        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--black);
            text-decoration: none;
            letter-spacing: -0.5px;
        }
        
        .nav-menu {
            display: flex;
            gap: 3rem;
            list-style: none;
        }
        
        .nav-link {
            color: var(--gray-700);
            text-decoration: none;
            font-weight: 400;
            transition: color 0.3s;
            font-size: 0.95rem;
        }
        
        .nav-link:hover {
            color: var(--black);
        }
        
        .nav-cta {
            color: var(--black);
            text-decoration: none;
            font-weight: 500;
            border-bottom: 2px solid var(--black);
            padding-bottom: 2px;
            transition: opacity 0.3s;
        }
        
        .nav-cta:hover {
            opacity: 0.7;
        }
        
        /* Hero Minimal */
        .hero-minimal {
            padding: 8rem 0;
            background: var(--white);
        }
        
        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 6rem;
            align-items: center;
        }
        
        .hero-content h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            letter-spacing: -1px;
        }
        
        .hero-subtitle {
            font-size: 1.25rem;
            color: var(--gray-700);
            margin-bottom: 2rem;
            font-weight: 300;
        }
        
        .hero-desc {
            color: var(--gray-700);
            line-height: 1.8;
            margin-bottom: 3rem;
        }
        
        .hero-buttons {
            display: flex;
            gap: 2rem;
            align-items: center;
        }
        
        .btn-minimal {
            background: var(--black);
            color: var(--white);
            padding: 0.875rem 2rem;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            border: 1px solid var(--black);
            font-size: 0.95rem;
        }
        
        .btn-minimal:hover {
            background: var(--white);
            color: var(--black);
        }
        
        .btn-link {
            color: var(--black);
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px solid var(--black);
            padding-bottom: 2px;
            transition: opacity 0.3s;
            font-size: 0.95rem;
        }
        
        .btn-link:hover {
            opacity: 0.7;
        }
        
        .hero-visual {
            position: relative;
        }
        
        .hero-image {
            width: 100%;
            height: 500px;
            background: var(--gray-100);
            position: relative;
            overflow: hidden;
        }
        
        .hero-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%);
            transition: filter 0.3s;
        }
        
        .hero-image:hover img {
            filter: grayscale(0%);
        }
        
        /* Services Minimal */
        .services-minimal {
            padding: 8rem 0;
            background: var(--gray-100);
        }
        
        .services-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .section-header {
            margin-bottom: 4rem;
        }
        
        .section-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            letter-spacing: -0.5px;
        }
        
        .section-subtitle {
            color: var(--gray-700);
            font-size: 1.125rem;
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 4rem;
        }
        
        .service-card {
            background: transparent;
            padding: 0;
        }
        
        .service-number {
            font-size: 3rem;
            font-weight: 300;
            color: var(--gray-500);
            margin-bottom: 1rem;
        }
        
        .service-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }
        
        .service-desc {
            color: var(--gray-700);
            line-height: 1.8;
            margin-bottom: 1.5rem;
        }
        
        .service-link {
            color: var(--black);
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            transition: gap 0.3s;
        }
        
        .service-link:hover {
            gap: 1rem;
        }
        
        /* About Minimal */
        .about-minimal {
            padding: 8rem 0;
            background: var(--white);
        }
        
        .about-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }
        
        .about-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            letter-spacing: -0.5px;
        }
        
        .about-text {
            color: var(--gray-700);
            font-size: 1.125rem;
            line-height: 1.8;
            margin-bottom: 3rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3rem;
            margin-top: 4rem;
            padding-top: 4rem;
            border-top: 1px solid var(--gray-300);
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-number {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: var(--gray-700);
            font-size: 0.95rem;
        }
        
        /* Contact Minimal */
        .contact-minimal {
            padding: 8rem 0;
            background: var(--black);
            color: var(--white);
        }
        
        .contact-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
            text-align: center;
        }
        
        .contact-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 2rem;
            letter-spacing: -0.5px;
        }
        
        .contact-desc {
            color: rgba(255,255,255,0.8);
            font-size: 1.125rem;
            margin-bottom: 3rem;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 4rem;
            margin-bottom: 3rem;
        }
        
        .contact-item {
            font-size: 1rem;
            color: rgba(255,255,255,0.8);
        }
        
        .btn-minimal-light {
            background: var(--white);
            color: var(--black);
            padding: 0.875rem 2rem;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s;
            border: 1px solid var(--white);
            display: inline-block;
        }
        
        .btn-minimal-light:hover {
            background: transparent;
            color: var(--white);
        }
        
        /* Footer */
        footer {
            background: var(--white);
            padding: 3rem 0;
            border-top: 1px solid var(--gray-300);
        }
        
        .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-logo {
            font-size: 1.25rem;
            font-weight: 600;
            letter-spacing: -0.5px;
        }
        
        .footer-text {
            color: var(--gray-700);
            font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
            .hero-container {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .hero-visual {
                display: none;
            }
            
            .services-grid {
                grid-template-columns: 1fr;
                gap: 3rem;
            }
            
            .stats-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .contact-info {
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="nav-container">
            <a href="#" class="logo">${data.companyName}</a>
            <ul class="nav-menu">
                <li><a href="#" class="nav-link">Accueil</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#about" class="nav-link">À propos</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
            <a href="tel:${data.phone}" class="nav-cta">${data.phone}</a>
        </div>
    </nav>

    <section class="hero-minimal">
        <div class="hero-container">
            <div class="hero-content">
                <h1>${data.companyName}</h1>
                <p class="hero-subtitle">${data.trade} à ${data.city}</p>
                <p class="hero-desc">${data.description}</p>
                <div class="hero-buttons">
                    <a href="#contact" class="btn-minimal">Contactez-nous</a>
                    <a href="#services" class="btn-link">Voir nos services →</a>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-image">
                    <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=500&fit=crop" alt="${data.trade}">
                </div>
            </div>
        </div>
    </section>

    <section class="services-minimal" id="services">
        <div class="services-container">
            <div class="section-header">
                <h2 class="section-title">Services</h2>
                <p class="section-subtitle">Des solutions adaptées à vos besoins</p>
            </div>
            
            <div class="services-grid">
                <div class="service-card">
                    <div class="service-number">01</div>
                    <h3 class="service-title">Installation</h3>
                    <p class="service-desc">Installation professionnelle avec matériel de qualité et garantie complète.</p>
                    <a href="#contact" class="service-link">En savoir plus →</a>
                </div>
                
                <div class="service-card">
                    <div class="service-number">02</div>
                    <h3 class="service-title">Réparation</h3>
                    <p class="service-desc">Service de réparation rapide et efficace pour tous types d'interventions.</p>
                    <a href="#contact" class="service-link">En savoir plus →</a>
                </div>
                
                <div class="service-card">
                    <div class="service-number">03</div>
                    <h3 class="service-title">Entretien</h3>
                    <p class="service-desc">Programme d'entretien régulier pour garantir la longévité de vos installations.</p>
                    <a href="#contact" class="service-link">En savoir plus →</a>
                </div>
            </div>
        </div>
    </section>

    <section class="about-minimal" id="about">
        <div class="about-container">
            <h2 class="about-title">Une expertise reconnue</h2>
            <p class="about-text">
                Depuis plus de 15 ans, nous mettons notre savoir-faire au service de nos clients.
                Notre approche combine expertise technique, écoute attentive et solutions sur-mesure
                pour répondre à tous vos besoins en ${data.trade.toLowerCase()}.
            </p>
            
            <div class="stats-grid">
                <div class="stat-item">
                    <div class="stat-number">15+</div>
                    <div class="stat-label">Années d'expérience</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">500+</div>
                    <div class="stat-label">Clients satisfaits</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">24/7</div>
                    <div class="stat-label">Disponibilité</div>
                </div>
            </div>
        </div>
    </section>

    <section class="contact-minimal" id="contact">
        <div class="contact-container">
            <h2 class="contact-title">Parlons de votre projet</h2>
            <p class="contact-desc">
                Contactez-nous pour discuter de vos besoins et obtenir un devis gratuit.
            </p>
            
            <div class="contact-info">
                <div class="contact-item">${data.phone}</div>
                <div class="contact-item">${data.email}</div>
                <div class="contact-item">${data.city}</div>
            </div>
            
            <a href="tel:${data.phone}" class="btn-minimal-light">Appelez-nous</a>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-logo">${data.companyName}</div>
            <div class="footer-text">© 2025 ${data.companyName} - Design Minimal</div>
        </div>
    </footer>
</body>
</html>`
  }
};

// Fonction pour générer un site
async function generateSite(config) {
  console.log(`\n🎨 Génération du site: ${config.id}`);
  console.log(`   📋 Métier: ${config.trade}`);
  console.log(`   🎯 Variante: ${config.variant}`);
  console.log(`   🏢 Entreprise: ${config.data.companyName}`);
  console.log(`   📍 Ville: ${config.data.city}`);
  
  try {
    // Créer le dossier de sortie
    const outputDir = path.join(__dirname, 'public', 'generated-sites', config.id);
    await fs.mkdir(outputDir, { recursive: true });
    
    // Sélectionner le template selon la variante
    const template = VARIANT_TEMPLATES[config.variant];
    if (!template) {
      throw new Error(`Variante inconnue: ${config.variant}`);
    }
    
    // Générer le HTML
    const html = template.generateHTML(config.data);
    
    // Écrire le fichier
    const outputPath = path.join(outputDir, 'index.html');
    await fs.writeFile(outputPath, html);
    
    console.log(`   ✅ Site généré avec succès!`);
    console.log(`   📁 Fichier: ${outputPath}`);
    
    return { success: true, path: outputPath };
  } catch (error) {
    console.error(`   ❌ Erreur lors de la génération: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Fonction principale
async function generateAllDemoSites() {
  console.log('🚀 GÉNÉRATION DES 5 SITES DE DÉMONSTRATION');
  console.log('==========================================');
  
  const results = [];
  
  for (const site of DEMO_SITES) {
    const result = await generateSite(site);
    results.push({
      ...site,
      ...result
    });
  }
  
  console.log('\n📊 RÉSUMÉ DE LA GÉNÉRATION');
  console.log('==========================');
  
  const successful = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  console.log(`✅ Sites générés avec succès: ${successful}`);
  console.log(`❌ Échecs: ${failed}`);
  
  console.log('\n📝 DÉTAILS DES SITES GÉNÉRÉS:');
  results.forEach((result, index) => {
    console.log(`\n${index + 1}. ${result.data.companyName} (${result.id})`);
    console.log(`   - Métier: ${result.trade}`);
    console.log(`   - Variante: ${result.variant}`);
    console.log(`   - Ville: ${result.data.city}`);
    console.log(`   - Status: ${result.success ? '✅ Succès' : '❌ Échec'}`);
    if (result.success) {
      console.log(`   - Chemin: ${result.path}`);
    } else {
      console.log(`   - Erreur: ${result.error}`);
    }
  });
  
  console.log('\n🎉 GÉNÉRATION TERMINÉE!');
  console.log('Tous les sites sont disponibles dans: public/generated-sites/');
}

// Lancer la génération
generateAllDemoSites().catch(console.error);