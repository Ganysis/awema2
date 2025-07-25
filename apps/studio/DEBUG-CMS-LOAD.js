// Script de debug pour comprendre ce qui bloque
console.log('🔍 Debug du CMS...');

// 1. Vérifier si les éléments HTML existent
console.log('Login div:', document.getElementById('cms-login'));
console.log('App div:', document.getElementById('cms-app'));

// 2. Vérifier l'état du CMS
console.log('window.cms:', window.cms);
console.log('window.CMS_API:', window.CMS_API);
console.log('window.supabase:', window.supabase);

// 3. Vérifier la session
console.log('Session stockée:', localStorage.getItem('cms_session'));

// 4. Vérifier les erreurs dans la console
const errors = [];
const originalError = console.error;
console.error = function(...args) {
    errors.push(args);
    originalError.apply(console, args);
};

// 5. Forcer l'affichage du formulaire de login
const showLogin = () => {
    const loginDiv = document.getElementById('cms-login');
    const appDiv = document.getElementById('cms-app');
    
    if (loginDiv) {
        loginDiv.style.display = 'block';
        console.log('✅ Formulaire de login affiché');
    } else {
        console.error('❌ Div login introuvable');
    }
    
    if (appDiv) {
        appDiv.style.display = 'none';
    }
};

// 6. Si rien n'est visible, créer un formulaire de login basique
if (!document.getElementById('cms-login') && !document.getElementById('cms-app')) {
    console.log('📝 Création d\'un formulaire de login de secours...');
    
    document.body.innerHTML = `
        <div style="max-width: 400px; margin: 100px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h2>CMS AWEMA - Login</h2>
            <p>Le CMS ne s'est pas chargé correctement. Utilisez ce formulaire de secours :</p>
            <form onsubmit="event.preventDefault(); localStorage.setItem('cms_mode', 'local'); location.reload();">
                <button type="submit" style="padding: 10px 20px; background: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer;">
                    Activer le mode local
                </button>
            </form>
            <br>
            <p style="color: #666; font-size: 14px;">Ou rechargez la page avec Ctrl+F5</p>
        </div>
    `;
} else {
    showLogin();
}

console.log('Erreurs capturées:', errors);