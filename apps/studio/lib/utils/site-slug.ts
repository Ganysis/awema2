/**
 * Génère un slug valide pour un nom de site Netlify
 */
export function generateSiteSlug(name: string): string {
  // Convertir en minuscules et remplacer les caractères spéciaux
  let slug = name
    .toLowerCase()
    .trim()
    // Remplacer les accents
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Remplacer les espaces et caractères spéciaux par des tirets
    .replace(/[^a-z0-9]+/g, '-')
    // Supprimer les tirets en début et fin
    .replace(/^-+|-+$/g, '')
    // Limiter la longueur
    .substring(0, 50);
  
  // Si le slug est vide ou trop court, utiliser un nom par défaut
  if (!slug || slug.length < 3) {
    slug = 'mon-site-web';
  }
  
  // S'assurer que le slug ne commence pas par un chiffre
  if (/^\d/.test(slug)) {
    slug = 'site-' + slug;
  }
  
  return slug;
}