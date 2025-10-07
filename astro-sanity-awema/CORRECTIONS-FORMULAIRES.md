# Corrections des Formulaires - AWEMA

## Problème Identifié

Les formulaires ne fonctionnaient pas car :
1. ❌ Balise `<form>` sans attribut `id="contact-form"`
2. ❌ Champs `<input>` et `<textarea>` sans attributs `name`
3. ❌ Le JavaScript ne pouvait pas trouver le formulaire
4. ❌ FormData retournait `undefined` pour tous les champs

## Solution Appliquée

### Pages Métiers Corrigées (10 pages)

Toutes les pages suivantes ont été corrigées avec :
- ✅ `id="contact-form"` sur le `<form>`
- ✅ `name="name"` sur le champ nom
- ✅ `name="email"` sur le champ email
- ✅ `name="phone"` sur le champ téléphone
- ✅ `name="city"` sur le champ ville (si présent)
- ✅ `name="message"` sur le champ message
- ✅ Script de redirection vers `/merci` après succès

**Liste des pages :**
1. ✅ `site-internet-electricien-aix.astro`
2. ✅ `site-internet-plombier-aix.astro`
3. ✅ `site-internet-menuisier-aix.astro`
4. ✅ `site-internet-macon-aix.astro`
5. ✅ `site-internet-paysagiste-aix.astro`
6. ✅ `site-internet-carreleur-aix.astro`
7. ✅ `site-internet-plombier-marseille.astro`
8. ✅ `site-internet-electricien-marseille.astro`
9. ✅ `site-internet-menuisier-marseille.astro`
10. ✅ `site-internet-macon-marseille.astro`
11. ✅ `site-internet-paysagiste-marseille.astro`

### Pages Services Corrigées

#### contact-intelligent.astro
- ✅ Correction de l'id dans le script : `contact-form` → `contact-form-intelligent`
- ✅ Adaptation du mapping des champs :
  - `prenom` + `nom` → `name`
  - `telephone` → `phone`
  - `metier` → `service`

#### Pages déjà fonctionnelles
- ✅ `site-internet-artisan.astro` (déjà correct)
- ✅ `offre-lancement.astro` (déjà correct)
- ✅ `migration-cloud.astro` (déjà correct)
- ✅ `contact.astro` (référence)

## Structure du Formulaire Type

```html
<form id="contact-form">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="tel" name="phone" required />
  <input type="text" name="city" />
  <textarea name="message"></textarea>
  <button type="submit">Envoyer</button>
</form>

<script>
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
        service: 'Contact',
        message: formData.get('message') || 'Demande de contact'
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
          // Redirection vers /merci pour tracking Google Ads
          window.location.href = '/merci';
        } else {
          throw new Error(result.message || 'Erreur lors de l\'envoi');
        }
      } catch (error) {
        console.error('Erreur:', error);
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4';
        errorDiv.innerHTML = `<strong>Erreur:</strong> ${error.message}<br><small>Appelez-nous au 06.17.54.03.83</small>`;
        form.appendChild(errorDiv);

        setTimeout(() => {
          errorDiv.remove();
        }, 8000);
      }
    });
  });
</script>
```

## API Backend

L'API `/api/contact` (Cloudflare Function) attend :

```json
{
  "name": "Jean Dupont",
  "email": "jean@exemple.fr",
  "phone": "06 12 34 56 78",
  "service": "Électricien - Aix-en-Provence",
  "message": "Je souhaite un devis"
}
```

Et envoie les données à **Formspree** (ID: `xrbykjpb`).

## Tests à Effectuer

Avant de déployer en production, tester :

1. ✅ Build réussi (`npm run build`)
2. ⏳ Remplir et soumettre formulaire sur `site-internet-electricien-aix`
3. ⏳ Vérifier redirection vers `/merci`
4. ⏳ Vérifier réception email via Formspree
5. ⏳ Tester sur 2-3 autres pages métiers
6. ⏳ Tester `contact-intelligent` (formulaire multi-étapes)

## Prochaines Étapes

1. ⏳ Tester localement avec `npm run dev`
2. ⏳ Vérifier 3 formulaires différents
3. ⏳ Déployer sur Cloudflare Pages
4. ⏳ Tester en production
5. ⏳ Monitorer les soumissions Formspree

---

**Date :** 2025-10-07
**Statut :** ✅ Corrections terminées, en attente de tests
