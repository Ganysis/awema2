import { GeneratedPage } from './ai-site-generator.service';

interface InternalLink {
  text: string;
  href: string;
  title: string;
}

interface LinkContext {
  fromPage: GeneratedPage;
  toPage: GeneratedPage;
  linkType: 'navigation' | 'contextual' | 'footer';
}

export class InternalLinkBuilderService {
  async buildInternalLinks(pages: GeneratedPage[]): Promise<GeneratedPage[]> {
    // Créer une map pour accès rapide aux pages
    const pageMap = new Map<string, GeneratedPage>();
    pages.forEach(page => pageMap.set(page.slug, page));

    // Analyser les relations entre pages
    const pageRelations = this.analyzePageRelations(pages);

    // Construire les liens pour chaque page
    for (const page of pages) {
      // Ajouter les liens dans le contenu des blocs
      this.addLinksToBlocks(page, pageMap, pageRelations);
      
      // Ajouter breadcrumbs si nécessaire
      this.addBreadcrumbs(page, pageMap);
      
      // Optimiser le maillage interne
      this.optimizeInternalLinking(page, pages, pageRelations);
    }

    return pages;
  }

  private analyzePageRelations(pages: GeneratedPage[]): Map<string, string[]> {
    const relations = new Map<string, string[]>();
    
    for (const page of pages) {
      const relatedPages: string[] = [];
      
      // Pages de service liées entre elles
      if (page.slug.startsWith('/services/')) {
        pages.forEach(p => {
          if (p.slug.startsWith('/services/') && p.slug !== page.slug) {
            relatedPages.push(p.slug);
          }
        });
      }
      
      // Pages locales liées aux services
      if (page.slug.startsWith('/zones/')) {
        // Extraire le service du nom de la page
        const serviceName = page.name.split(' ').slice(0, -1).join(' ');
        pages.forEach(p => {
          if (p.slug.startsWith('/services/') && p.name.toLowerCase().includes(serviceName.toLowerCase())) {
            relatedPages.push(p.slug);
          }
        });
      }
      
      // Toutes les pages sont liées à la page d'accueil et contact
      if (!page.isHomePage && page.slug !== '/contact') {
        relatedPages.push('/');
        relatedPages.push('/contact');
      }
      
      relations.set(page.slug, relatedPages);
    }
    
    return relations;
  }

  private addLinksToBlocks(page: GeneratedPage, pageMap: Map<string, GeneratedPage>, relations: Map<string, string[]>) {
    const relatedPageSlugs = relations.get(page.slug) || [];
    
    for (const block of page.blocks) {
      switch (block.type) {
        case 'HeroV3':
          // Ajouter des liens dans les boutons si nécessaire
          this.updateHeroLinks(block, page, pageMap);
          break;
          
        case 'ContentV3':
          // Ajouter des liens contextuels dans le contenu
          this.addContentLinks(block, page, relatedPageSlugs, pageMap);
          break;
          
        case 'ServicesV3':
          // S'assurer que chaque service a un lien vers sa page
          this.updateServiceLinks(block, pageMap);
          break;
          
        case 'CTAV3':
          // Optimiser les CTA avec les bonnes pages de destination
          this.updateCTALinks(block, page, pageMap);
          break;
          
        case 'FooterV3':
          // Ajouter un sitemap complet dans le footer
          this.addFooterLinks(block, pageMap);
          break;
      }
    }
  }

  private updateHeroLinks(block: any, page: GeneratedPage, pageMap: Map<string, GeneratedPage>) {
    // Si on est sur une page locale, lier vers la page service correspondante
    if (page.slug.startsWith('/zones/')) {
      const serviceName = page.name.split(' ').slice(0, -1).join(' ');
      const servicePages = Array.from(pageMap.values()).filter(p => 
        p.slug.startsWith('/services/') && p.name.toLowerCase().includes(serviceName.toLowerCase())
      );
      
      if (servicePages.length > 0 && block.props.secondaryButton) {
        block.props.secondaryButton.href = servicePages[0].slug;
        block.props.secondaryButton.text = `Découvrir ${servicePages[0].name}`;
      }
    }
  }

  private addContentLinks(block: any, currentPage: GeneratedPage, relatedSlugs: string[], pageMap: Map<string, GeneratedPage>) {
    if (!block.props.content) return;
    
    // Ajouter des liens contextuels dans le contenu
    let content = block.props.content;
    const linksToAdd: InternalLink[] = [];
    
    // Identifier les mots-clés pour créer des liens
    relatedSlugs.forEach(slug => {
      const page = pageMap.get(slug);
      if (page && !page.isHomePage) {
        // Chercher des mentions du service/ville dans le contenu
        const keywords = this.extractKeywords(page.name);
        keywords.forEach(keyword => {
          if (content.toLowerCase().includes(keyword.toLowerCase())) {
            linksToAdd.push({
              text: keyword,
              href: page.slug,
              title: `En savoir plus sur ${page.name}`
            });
          }
        });
      }
    });
    
    // Ajouter un paragraphe avec des liens connexes si pertinent
    if (linksToAdd.length > 0) {
      const linksHtml = linksToAdd.slice(0, 3).map(link => 
        `<a href="${link.href}" title="${link.title}">${link.text}</a>`
      ).join(', ');
      
      block.props.content += `\n\n**Services connexes :** ${linksHtml}`;
    }
  }

  private updateServiceLinks(block: any, pageMap: Map<string, GeneratedPage>) {
    // S'assurer que chaque service pointe vers sa page dédiée
    for (let i = 1; i <= 6; i++) {
      const serviceName = block.props[`service${i}_name`];
      if (serviceName) {
        // Trouver la page correspondante
        const servicePage = Array.from(pageMap.values()).find(p => 
          p.slug.startsWith('/services/') && p.name === serviceName
        );
        
        if (servicePage) {
          block.props[`service${i}_link`] = servicePage.slug;
        }
      }
    }
  }

  private updateCTALinks(block: any, currentPage: GeneratedPage, pageMap: Map<string, GeneratedPage>) {
    // Optimiser les liens CTA selon le contexte
    if (currentPage.slug.startsWith('/zones/') && block.props.primaryButton) {
      // Sur une page locale, privilégier le contact direct
      if (!block.props.primaryButton.href.startsWith('tel:')) {
        block.props.primaryButton.href = '/contact';
        block.props.primaryButton.text = 'Demander un devis local';
      }
    }
    
    if (currentPage.slug.startsWith('/services/') && block.props.secondaryButton) {
      // Sur une page service, proposer d'autres services
      const otherServices = Array.from(pageMap.values()).filter(p => 
        p.slug.startsWith('/services/') && p.slug !== currentPage.slug
      );
      
      if (otherServices.length > 0) {
        block.props.secondaryButton = {
          text: 'Voir nos autres services',
          href: '/services'
        };
      }
    }
  }

  private addFooterLinks(block: any, pageMap: Map<string, GeneratedPage>) {
    if (!block.props.columns) return;
    
    // Organiser les pages par catégorie
    const servicePages = Array.from(pageMap.values())
      .filter(p => p.slug.startsWith('/services/'))
      .slice(0, 5);
    
    const zonePages = Array.from(pageMap.values())
      .filter(p => p.slug.startsWith('/zones/'))
      .slice(0, 5);
    
    // Mettre à jour ou ajouter les colonnes de liens
    const servicesColumn = block.props.columns.find((c: any) => c.title === 'Services');
    if (servicesColumn) {
      servicesColumn.links = servicePages.map(p => ({
        label: p.name,
        href: p.slug
      }));
    }
    
    // Ajouter une colonne zones si elle n'existe pas et qu'il y a des pages zones
    if (zonePages.length > 0) {
      const hasZonesColumn = block.props.columns.some((c: any) => c.title === 'Zones d\'intervention');
      if (!hasZonesColumn) {
        block.props.columns.push({
          title: 'Zones d\'intervention',
          links: zonePages.map(p => ({
            label: p.name.split(' ').pop(), // Juste la ville
            href: p.slug
          }))
        });
      }
    }
  }

  private addBreadcrumbs(page: GeneratedPage, pageMap: Map<string, GeneratedPage>) {
    // Ajouter des breadcrumbs pour améliorer la navigation
    const breadcrumbs: Array<{label: string, href: string}> = [
      { label: 'Accueil', href: '/' }
    ];
    
    if (page.slug.startsWith('/services/')) {
      breadcrumbs.push({ label: 'Services', href: '/services' });
      breadcrumbs.push({ label: page.name, href: page.slug });
    } else if (page.slug.startsWith('/zones/')) {
      breadcrumbs.push({ label: 'Zones d\'intervention', href: '/zones' });
      breadcrumbs.push({ label: page.name, href: page.slug });
    } else if (!page.isHomePage) {
      breadcrumbs.push({ label: page.name, href: page.slug });
    }
    
    // Stocker les breadcrumbs dans les métadonnées de la page
    (page as any).breadcrumbs = breadcrumbs;
  }

  private optimizeInternalLinking(page: GeneratedPage, allPages: GeneratedPage[], relations: Map<string, string[]>) {
    // Stratégie de maillage interne optimisée pour le SEO
    
    // 1. Toutes les pages doivent pointer vers la home (sauf la home elle-même)
    if (!page.isHomePage) {
      this.ensureLinkToHome(page);
    }
    
    // 2. Les pages de service doivent se lier entre elles (services connexes)
    if (page.slug.startsWith('/services/')) {
      this.linkRelatedServices(page, allPages);
    }
    
    // 3. Les pages locales doivent lier vers les services principaux
    if (page.slug.startsWith('/zones/')) {
      this.linkToMainServices(page, allPages);
    }
    
    // 4. Créer un maillage en silo pour les thématiques
    this.createSiloStructure(page, allPages, relations);
  }

  private ensureLinkToHome(page: GeneratedPage) {
    // Vérifier que la page a au moins un lien vers l'accueil
    const hasHomeLink = page.blocks.some(block => 
      JSON.stringify(block.props).includes('"href":"/"')
    );
    
    if (!hasHomeLink) {
      // Ajouter un lien dans le premier bloc de contenu trouvé
      const contentBlock = page.blocks.find(b => b.type === 'ContentV3');
      if (contentBlock && contentBlock.props.content) {
        contentBlock.props.content += '\n\nRetour à [l\'accueil](/).';
      }
    }
  }

  private linkRelatedServices(page: GeneratedPage, allPages: GeneratedPage[]) {
    const otherServices = allPages.filter(p => 
      p.slug.startsWith('/services/') && p.slug !== page.slug
    );
    
    if (otherServices.length > 0) {
      // Trouver un bloc approprié pour ajouter des liens
      const contentBlock = page.blocks.find(b => b.type === 'ContentV3');
      if (contentBlock) {
        const relatedLinks = otherServices.slice(0, 3).map(p => 
          `[${p.name}](${p.slug})`
        ).join(' • ');
        
        if (!contentBlock.props.relatedServices) {
          contentBlock.props.relatedServices = `Découvrez aussi nos services : ${relatedLinks}`;
        }
      }
    }
  }

  private linkToMainServices(page: GeneratedPage, allPages: GeneratedPage[]) {
    const servicePages = allPages.filter(p => p.slug.startsWith('/services/'));
    
    if (servicePages.length > 0) {
      // Ajouter des liens vers les services principaux dans le CTA
      const ctaBlock = page.blocks.find(b => b.type === 'CTAV3');
      if (ctaBlock && !ctaBlock.props.additionalLinks) {
        ctaBlock.props.additionalLinks = servicePages.slice(0, 3).map(p => ({
          text: p.name,
          href: p.slug
        }));
      }
    }
  }

  private createSiloStructure(page: GeneratedPage, allPages: GeneratedPage[], relations: Map<string, string[]>) {
    // Créer une structure en silo pour optimiser le PageRank interne
    
    // Les pages du même type doivent être interconnectées
    const sameTypePages = allPages.filter(p => {
      if (page.slug.startsWith('/services/')) return p.slug.startsWith('/services/');
      if (page.slug.startsWith('/zones/')) return p.slug.startsWith('/zones/');
      return false;
    }).filter(p => p.slug !== page.slug);
    
    // Ajouter des liens croisés intelligents
    if (sameTypePages.length > 0) {
      const maxLinks = Math.min(3, sameTypePages.length);
      const selectedPages = this.selectMostRelevantPages(page, sameTypePages, maxLinks);
      
      // Stocker les pages liées pour référence
      (page as any).linkedPages = selectedPages.map(p => p.slug);
    }
  }

  private selectMostRelevantPages(currentPage: GeneratedPage, pages: GeneratedPage[], count: number): GeneratedPage[] {
    // Sélectionner les pages les plus pertinentes basé sur la similarité des noms
    const scored = pages.map(page => ({
      page,
      score: this.calculateRelevanceScore(currentPage.name, page.name)
    }));
    
    scored.sort((a, b) => b.score - a.score);
    
    return scored.slice(0, count).map(s => s.page);
  }

  private calculateRelevanceScore(name1: string, name2: string): number {
    const words1 = name1.toLowerCase().split(' ');
    const words2 = name2.toLowerCase().split(' ');
    
    let score = 0;
    words1.forEach(word => {
      if (words2.includes(word)) score += 1;
    });
    
    return score;
  }

  private extractKeywords(text: string): string[] {
    // Extraire les mots-clés importants d'un texte
    const stopWords = ['le', 'la', 'les', 'de', 'du', 'des', 'un', 'une', 'et', 'à', 'pour'];
    const words = text.split(' ')
      .map(w => w.toLowerCase())
      .filter(w => w.length > 3 && !stopWords.includes(w));
    
    return [...new Set(words)];
  }
}