const fs = require('fs');
const path = require('path');

// Liste des pages à corriger
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

// Patterns pour les formulaires de pages métiers
const metierFormPatterns = {
  formTag: /<form\s+class="space-y-6">/g,
  nameInput: /(<input\s+type="text"\s+)(required\s+class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="Jean Dupont"\s+\/>)/g,
  companyInput: /(<input\s+type="text"\s+)(class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="Entreprise Dupont \(optionnel\)"\s+\/>)/g,
  emailInput: /(<input\s+type="email"\s+)(required\s+class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="contact@exemple\.fr"\s+\/>)/g,
  phoneInput: /(<input\s+type="tel"\s+)(required\s+class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="06 12 34 56 78"\s+\/>)/g,
  cityInput: /(<input\s+type="text"\s+)(required\s+class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="Aix-en-Provence"\s+\/>)/g,
  messageTextarea: /(<textarea\s+)(rows="4"\s+class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"\s+placeholder="Décrivez votre projet\.\.\."><\/textarea>)/g
};

// Script JavaScript à ajouter si absent
const formScript = `<script>
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Envoi en cours...';

      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('trade') ? \`\${formData.get('trade')} - \${formData.get('city')}\` : formData.get('service') || 'Contact',
        message: formData.get('message') || \`Demande de contact\`
      };

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok && result.success) {
          // Redirection vers la page de remerciement (pour tracking Google Ads)
          window.location.href = '/merci';
        } else {
          throw new Error(result.message || 'Erreur lors de l\\'envoi');
        }
      } catch (error) {
        console.error('Erreur:', error);
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4';
        errorDiv.innerHTML = \`<strong>Erreur:</strong> \${error.message}<br><small>Appelez-nous au 06.17.54.03.83</small>\`;
        form.appendChild(errorDiv);

        setTimeout(() => {
          errorDiv.remove();
        }, 8000);
      }
    });
  });
</script>`;

function fixPage(filename) {
  const filepath = path.join(pagesDir, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`❌ Fichier non trouvé: ${filename}`);
    return false;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;

  // 1. Ajouter id="contact-form" au formulaire
  if (content.match(metierFormPatterns.formTag)) {
    content = content.replace(metierFormPatterns.formTag, '<form id="contact-form" class="space-y-6">');
    modified = true;
    console.log(`  ✓ Ajout id="contact-form" au <form>`);
  }

  // 2. Ajouter name aux inputs
  if (content.match(metierFormPatterns.nameInput)) {
    content = content.replace(metierFormPatterns.nameInput, '$1name="name" $2');
    modified = true;
    console.log(`  ✓ Ajout name="name"`);
  }

  if (content.match(metierFormPatterns.companyInput)) {
    content = content.replace(metierFormPatterns.companyInput, '$1name="company" $2');
    modified = true;
    console.log(`  ✓ Ajout name="company"`);
  }

  if (content.match(metierFormPatterns.emailInput)) {
    content = content.replace(metierFormPatterns.emailInput, '$1name="email" $2');
    modified = true;
    console.log(`  ✓ Ajout name="email"`);
  }

  if (content.match(metierFormPatterns.phoneInput)) {
    content = content.replace(metierFormPatterns.phoneInput, '$1name="phone" $2');
    modified = true;
    console.log(`  ✓ Ajout name="phone"`);
  }

  if (content.match(metierFormPatterns.cityInput)) {
    content = content.replace(metierFormPatterns.cityInput, '$1name="city" $2');
    modified = true;
    console.log(`  ✓ Ajout name="city"`);
  }

  if (content.match(metierFormPatterns.messageTextarea)) {
    content = content.replace(metierFormPatterns.messageTextarea, '$1name="message" $2');
    modified = true;
    console.log(`  ✓ Ajout name="message"`);
  }

  // 3. Ajouter le script si absent
  if (!content.includes('document.getElementById(\'contact-form\')')) {
    // Trouver la position juste avant </Base>
    const baseCloseTag = '</Base>';
    const baseIndex = content.lastIndexOf(baseCloseTag);

    if (baseIndex !== -1) {
      content = content.slice(0, baseIndex) + formScript + '\n' + content.slice(baseIndex);
      modified = true;
      console.log(`  ✓ Ajout du script de gestion du formulaire`);
    }
  }

  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`✅ ${filename} corrigé\n`);
    return true;
  } else {
    console.log(`⚠️  ${filename} - Aucune modification nécessaire\n`);
    return false;
  }
}

console.log('🔧 Correction des formulaires...\n');

let fixedCount = 0;
pagesToFix.forEach(page => {
  console.log(`📄 Traitement de ${page}...`);
  if (fixPage(page)) {
    fixedCount++;
  }
});

console.log(`\n✨ Terminé ! ${fixedCount}/${pagesToFix.length} pages corrigées.`);
