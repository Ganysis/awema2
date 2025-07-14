/**
 * EXPORT DE SECOURS - Génère TOUJOURS un site fonctionnel
 */

export class EmergencyExport {
  /**
   * Génère un site GARANTI fonctionnel même si tout le reste échoue
   */
  static generateEmergencySite(projectData: any): string {
    const { businessInfo = {}, pages = [], theme = {} } = projectData;
    const homePage = pages[0] || { blocks: [] };
    
    // Template HTML robuste avec styles inline
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessInfo.name || 'Mon Site'}</title>
    <style>
        /* Reset et base */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: #f8f9fa;
        }
        
        /* Utility classes */
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .text-center { text-align: center; }
        .py-5 { padding: 3rem 0; }
        .mb-3 { margin-bottom: 1rem; }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            background: ${theme.colors?.primary || '#3b82f6'};
            color: white;
            text-decoration: none;
            border-radius: 8px;
            transition: transform 0.2s;
        }
        .btn:hover { transform: translateY(-2px); }
        
        /* Sections */
        .hero {
            background: linear-gradient(135deg, ${theme.colors?.primary || '#3b82f6'}, ${theme.colors?.secondary || '#10b981'});
            color: white;
            padding: 4rem 0;
            text-align: center;
        }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.9; }
        
        .section {
            background: white;
            padding: 4rem 0;
            margin: 2rem 0;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .card {
            background: #f8f9fa;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
        }
        
        .card h3 { margin-bottom: 1rem; color: ${theme.colors?.primary || '#3b82f6'}; }
        
        /* Contact */
        .contact-form {
            max-width: 600px;
            margin: 0 auto;
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 500;
        }
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 6px;
            font-size: 16px;
        }
        
        /* Footer */
        footer {
            background: #1f2937;
            color: white;
            padding: 3rem 0;
            text-align: center;
            margin-top: 4rem;
        }
    </style>
</head>
<body>
    ${this.generateHeader(businessInfo)}
    ${this.generateHero(homePage.blocks)}
    ${this.generateContent(homePage.blocks, businessInfo)}
    ${this.generateContact(businessInfo)}
    ${this.generateFooter(businessInfo)}
    
    <script>
        // Smooth scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });
        
        // Form handler
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Message envoyé ! (En mode démo)');
            });
        }
    </script>
</body>
</html>`;
  }
  
  private static generateHeader(businessInfo: any): string {
    return `
    <header style="background: white; box-shadow: 0 2px 4px rgba(0,0,0,0.1); position: sticky; top: 0; z-index: 100;">
        <div class="container" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 20px;">
            <h2 style="color: #333;">${businessInfo.name || 'Mon Entreprise'}</h2>
            <nav>
                <a href="#services" style="margin: 0 1rem; color: #666; text-decoration: none;">Services</a>
                <a href="#about" style="margin: 0 1rem; color: #666; text-decoration: none;">À propos</a>
                <a href="#contact" style="margin: 0 1rem; color: #666; text-decoration: none;">Contact</a>
            </nav>
        </div>
    </header>`;
  }
  
  private static generateHero(blocks: any[]): string {
    const heroBlock = blocks.find(b => b.type?.includes('hero')) || {};
    const props = heroBlock.props || {};
    
    return `
    <section class="hero">
        <div class="container">
            <h1>${props.title || 'Bienvenue'}</h1>
            <p>${props.subtitle || 'Votre partenaire de confiance'}</p>
            <a href="#contact" class="btn">Contactez-nous</a>
        </div>
    </section>`;
  }
  
  private static generateContent(blocks: any[], businessInfo: any): string {
    let content = '';
    
    // Services
    const servicesBlock = blocks.find(b => b.type?.includes('services'));
    if (servicesBlock && servicesBlock.props?.services) {
      content += `
      <section id="services" class="section container">
          <h2 class="text-center mb-3">Nos Services</h2>
          <div class="grid">
              ${servicesBlock.props.services.map(s => `
                  <div class="card">
                      <h3>${s.title || 'Service'}</h3>
                      <p>${s.description || 'Description du service'}</p>
                  </div>
              `).join('')}
          </div>
      </section>`;
    }
    
    // About
    content += `
    <section id="about" class="section container">
        <h2 class="text-center mb-3">À propos</h2>
        <div style="max-width: 800px; margin: 0 auto; text-align: center;">
            <p>${businessInfo.description || 'Nous sommes une entreprise dédiée à fournir les meilleurs services à nos clients.'}</p>
        </div>
    </section>`;
    
    return content;
  }
  
  private static generateContact(businessInfo: any): string {
    return `
    <section id="contact" class="section container">
        <h2 class="text-center mb-3">Contactez-nous</h2>
        <div class="contact-form">
            <form id="contact-form">
                <div class="form-group">
                    <label>Nom</label>
                    <input type="text" required />
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" required />
                </div>
                <div class="form-group">
                    <label>Message</label>
                    <textarea rows="4" required></textarea>
                </div>
                <button type="submit" class="btn" style="width: 100%;">Envoyer</button>
            </form>
            
            <div style="margin-top: 3rem; text-align: center;">
                <p><strong>Téléphone:</strong> ${businessInfo.phone || '01 23 45 67 89'}</p>
                <p><strong>Email:</strong> ${businessInfo.email || 'contact@entreprise.fr'}</p>
            </div>
        </div>
    </section>`;
  }
  
  private static generateFooter(businessInfo: any): string {
    return `
    <footer>
        <div class="container">
            <p>&copy; 2024 ${businessInfo.name || 'Mon Entreprise'}. Tous droits réservés.</p>
            <p style="margin-top: 1rem; opacity: 0.8;">Site créé avec AWEMA Studio</p>
        </div>
    </footer>`;
  }
}