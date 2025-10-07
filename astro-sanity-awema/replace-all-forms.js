const fs = require('fs');
const path = require('path');

const pagesToFix = [
  'site-internet-plombier-aix.astro',
  'site-internet-menuisier-aix.astro',
  'site-internet-macon-aix.astro',
  'site-internet-paysagiste-aix.astro',
  'site-internet-carreleur-aix.astro',
  'site-internet-plombier-marseille.astro',
  'site-internet-electricien-marseille.astro',
  'site-internet-menuisier-marseille.astro',
  'site-internet-macon-marseille.astro',
  'site-internet-paysagiste-marseille.astro',
  'site-internet-artisan.astro',
  'offre-lancement.astro',
  'migration-cloud.astro',
  'contact-intelligent.astro'
];

const pagesDir = path.join(__dirname, 'src', 'pages');

function replaceForms(filename) {
  const filepath = path.join(pagesDir, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`❌ ${filename} non trouvé`);
    return false;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // 1. Ajouter l'import si absent
  if (!content.includes('ContactFormWorking')) {
    // Trouver la ligne avec les imports
    const importMatch = content.match(/(import.*from.*;\n)+/);
    if (importMatch) {
      const lastImportIndex = content.lastIndexOf(importMatch[0]) + importMatch[0].length;
      content = content.slice(0, lastImportIndex) +
                'import ContactFormWorking from "@/components/ContactFormWorking.astro";\n' +
                content.slice(lastImportIndex);
      modified = true;
      console.log(`  ✓ Ajout import ContactFormWorking`);
    }
  }

  // 2. Supprimer l'ancien script en bas du fichier
  const scriptPattern = /<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/;
  if (content.match(scriptPattern)) {
    content = content.replace(scriptPattern, '');
    modified = true;
    console.log(`  ✓ Suppression ancien script`);
  }

  // 3. Remplacer le formulaire HTML par le composant
  // Pattern flexible pour capturer n'importe quel formulaire
  const formPattern = /<form[^>]*id="contact-form"[^>]*>[\s\S]*?<\/form>/;

  if (content.match(formPattern)) {
    // Garder le wrapper section si présent
    const sectionPattern = /(<section[^>]*id="formulaire"[^>]*>[\s\S]*?<div class="container">[\s\S]*?<div class="row[^"]*">[\s\S]*?<div class="[^"]*col-[^"]*">[\s\S]*?)(<div class="[^"]*>[\s\S]*?)?<form[^>]*id="contact-form"[^>]*>[\s\S]*?<\/form>([\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/section>)/;

    if (content.match(sectionPattern)) {
      content = content.replace(sectionPattern, (match, before, formWrapper, after) => {
        return before +
               `<ContactFormWorking\n            title="Discutons de votre projet"\n            submitText="Recevoir ma maquette gratuite →"\n          />` +
               after;
      });
      modified = true;
      console.log(`  ✓ Remplacement formulaire par composant`);
    } else {
      console.log(`  ⚠️  Structure de formulaire différente, traitement manuel nécessaire`);
    }
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ ${filename} mis à jour\n`);
    return true;
  } else {
    console.log(`⚠️  ${filename} - Aucune modification\n`);
    return false;
  }
}

console.log('🔧 Remplacement des formulaires par le composant fonctionnel...\n');

let fixedCount = 0;
pagesToFix.forEach(page => {
  console.log(`📄 ${page}...`);
  if (replaceForms(page)) {
    fixedCount++;
  }
});

console.log(`\n✨ Terminé ! ${fixedCount}/${pagesToFix.length} pages modifiées.`);
