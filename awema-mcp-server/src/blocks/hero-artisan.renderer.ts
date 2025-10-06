/**
 * HERO ARTISAN - Spécialement conçu pour les artisans
 * Focus sur l'urgence, la confiance et l'appel à l'action
 */

export class HeroArtisanRenderer {
  render(data: any, variant: string = 'urgence-24-7'): { html: string; css: string } {
    const variants = {
      'urgence-24-7': this.renderUrgence247,
      'entreprise-familiale': this.renderEntrepriseFamiliale,
      'satisfaction-garantie': this.renderSatisfactionGarantie,
      'devis-gratuit': this.renderDevisGratuit
    };

    const renderFn = variants[variant] || variants['urgence-24-7'];
    return renderFn.call(this, data);
  }

  private renderUrgence247(data: any): { html: string; css: string } {
    const {
      businessName = 'Votre Artisan',
      businessType = 'Plombier',
      phone = '06 00 00 00 00',
      urgencyText = 'Intervention en 30 minutes',
      mainService = 'Dépannage urgent 24h/24 7j/7',
      cities = ['Paris', 'et alentours'],
      image = 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1920'
    } = data;

    const html = `
<section class="hero-urgence" id="hero">
  <div class="hero-urgence__overlay"></div>
  <div class="hero-urgence__container">
    <div class="hero-urgence__content">
      <div class="hero-urgence__badge">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7V12C2 16.5 4.5 20.74 8 22.5L12 24L16 22.5C19.5 20.74 22 16.5 22 12V7L12 2Z" stroke="currentColor" stroke-width="2"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2"/>
        </svg>
        <span>Entreprise certifiée</span>
      </div>
      
      <h1 class="hero-urgence__title">
        ${businessType} ${cities.join(' ')}
        <span class="hero-urgence__highlight">24h/24 - 7j/7</span>
      </h1>
      
      <p class="hero-urgence__subtitle">${mainService}</p>
      
      <div class="hero-urgence__urgency">
        <svg class="hero-urgence__urgency-icon" width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 6V12L16 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <span>${urgencyText}</span>
      </div>
      
      <div class="hero-urgence__cta">
        <a href="tel:${phone.replace(/\s/g, '')}" class="hero-urgence__phone">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 16.92V19.92C22 20.48 21.55 20.93 20.99 20.93C10.51 20.93 2 12.42 2 1.93C2 1.37 2.45 0.93 3.01 0.93H6.01C6.56 0.93 7.01 1.38 7.01 1.93C7.01 3.09 7.2 4.21 7.56 5.26C7.66 5.56 7.58 5.89 7.35 6.12L5.13 8.34C6.89 11.82 9.18 14.11 12.66 15.87L14.88 13.65C15.11 13.42 15.44 13.34 15.74 13.44C16.79 13.8 17.91 13.99 19.07 13.99C19.62 13.99 20.07 14.44 20.07 14.99V17.99" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span class="hero-urgence__phone-text">
            <small>Appelez maintenant</small>
            <strong>${phone}</strong>
          </span>
        </a>
        
        <a href="#devis" class="hero-urgence__devis">
          Devis gratuit
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
      
      <div class="hero-urgence__trust">
        <div class="hero-urgence__trust-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.09 8.26L21 9.27L16.5 13.97L17.59 21L12 17.77L6.41 21L7.5 13.97L3 9.27L9.91 8.26L12 2Z"/>
          </svg>
          <span>4.8/5 sur 250 avis</span>
        </div>
        <div class="hero-urgence__trust-item">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 11L12 14L22 4" stroke="currentColor" stroke-width="2"/>
            <path d="M21 12V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V5C3 3.9 3.9 3 5 3H16" stroke="currentColor" stroke-width="2"/>
          </svg>
          <span>Garantie décennale</span>
        </div>
      </div>
    </div>
    
    <div class="hero-urgence__image">
      <img src="${image}" alt="${businessType} en intervention">
      <div class="hero-urgence__image-badge">
        <span class="hero-urgence__experience">30 ans</span>
        <span>d'expérience</span>
      </div>
    </div>
  </div>
  
  <div class="hero-urgence__wave">
    <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
      <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H0Z" fill="white"/>
    </svg>
  </div>
</section>`;

    const css = `
/* HERO URGENCE ARTISAN */
.hero-urgence {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
  overflow: hidden;
}

.hero-urgence__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.hero-urgence__container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-urgence__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 2rem;
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.hero-urgence__title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  color: white;
  line-height: 1.1;
  margin-bottom: 1rem;
}

.hero-urgence__highlight {
  display: block;
  color: #fbbf24;
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.5);
}

.hero-urgence__subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
}

.hero-urgence__urgency {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(251, 191, 36, 0.2);
  border: 2px solid #fbbf24;
  border-radius: 0.5rem;
  color: #fbbf24;
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 2rem;
}

.hero-urgence__urgency-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}

.hero-urgence__cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.hero-urgence__phone {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 2rem;
  background: #fbbf24;
  color: #1e293b;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  transform: scale(1);
  transition: transform 0.2s;
  box-shadow: 0 10px 20px rgba(251, 191, 36, 0.3);
}

.hero-urgence__phone:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 30px rgba(251, 191, 36, 0.4);
}

.hero-urgence__phone-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-urgence__phone-text small {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;
}

.hero-urgence__phone-text strong {
  font-size: 1.5rem;
  font-weight: 800;
}

.hero-urgence__devis {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.25rem 2rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.2s;
}

.hero-urgence__devis:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateX(5px);
}

.hero-urgence__trust {
  display: flex;
  gap: 2rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.875rem;
}

.hero-urgence__trust-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.hero-urgence__image {
  position: relative;
  height: 600px;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.hero-urgence__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-urgence__image-badge {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: #fbbf24;
  color: #1e293b;
  padding: 1.5rem;
  border-radius: 50%;
  text-align: center;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.hero-urgence__experience {
  display: block;
  font-size: 2rem;
  line-height: 1;
}

.hero-urgence__wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 2;
}

.hero-urgence__wave svg {
  width: 100%;
  height: 100%;
}

/* Mobile */
@media (max-width: 768px) {
  .hero-urgence__container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-urgence__image {
    display: none;
  }
  
  .hero-urgence__cta {
    justify-content: center;
  }
  
  .hero-urgence__trust {
    justify-content: center;
    flex-wrap: wrap;
  }
}`;

    return { html, css };
  }

  private renderEntrepriseFamiliale(data: any): { html: string; css: string } {
    // Variation pour mettre en avant l'aspect familial
    return this.renderUrgence247(data); // À personnaliser
  }

  private renderSatisfactionGarantie(data: any): { html: string; css: string } {
    // Variation axée sur la satisfaction client
    return this.renderUrgence247(data); // À personnaliser
  }

  private renderDevisGratuit(data: any): { html: string; css: string } {
    // Variation focus sur devis gratuit
    return this.renderUrgence247(data); // À personnaliser
  }
}