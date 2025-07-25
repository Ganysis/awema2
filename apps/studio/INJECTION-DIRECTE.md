# Solution : Injection directe dans le HTML

Le problème est que le JavaScript se charge trop vite. Voici une solution radicale :

## Option 1 : Modifier temporairement le localStorage

1. Dans la console, exécutez :
```javascript
// Forcer le mode local
localStorage.setItem('cms_mode', 'local');
localStorage.setItem('cms_bypass_supabase', 'true');
localStorage.setItem('awema_site_data', JSON.stringify({
    site: {
        id: 'ef8d6ae3-0f91-4356-a2bc-3604c71bc17e',
        name: 'Mon Site'
    },
    pages: [{
        id: 'home',
        slug: 'index', 
        title: 'Accueil',
        blocks: []
    }]
}));
```

2. Puis rechargez la page

## Option 2 : Utiliser l'inspecteur pour modifier le code

1. Ouvrez l'onglet **Sources** (ou Debugger)
2. Trouvez le fichier `cms.js`
3. Ajoutez un breakpoint au début
4. Rechargez la page
5. Quand le breakpoint s'active, modifiez la variable ou passez en mode local

## Option 3 : Désactiver temporairement JavaScript

1. Ouvrez les DevTools (F12)
2. Allez dans Settings (engrenage)
3. Cochez "Disable JavaScript"
4. Rechargez la page
5. Réactivez JavaScript
6. Exécutez le patch

## Option 4 : Script d'injection au démarrage

Dans la console, créez un script qui s'exécute immédiatement :

```javascript
// Créer un script qui patch fetch AVANT tout
const script = document.createElement('script');
script.textContent = `
(function() {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        let url = args[0];
        if (typeof url === 'string' && url.includes('.asc')) {
            url = url.replace(/\.asc/g, '');
            args[0] = url;
        }
        return originalFetch.apply(this, args);
    };
})();
`;
document.documentElement.insertBefore(script, document.documentElement.firstChild);
location.reload();
```

## La vraie solution

Le problème vient du fait que le code généré utilise une mauvaise syntaxe. Il faudrait :

1. Trouver où ce code est généré (probablement dans un template)
2. Corriger `.order('page_slug.asc')` en `.order('page_slug')`
3. Redéployer

En attendant, utilisez l'Option 1 (localStorage) qui est la plus simple.