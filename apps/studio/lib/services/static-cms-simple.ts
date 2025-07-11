export function generateSimpleCMS(password: string = 'admin123') {
  return {
    html: `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CMS Administration</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; background: #f3f4f6; }
        .container { max-width: 400px; margin: 100px auto; padding: 20px; }
        .login-box { background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h1 { margin-bottom: 30px; color: #111827; }
        .form-group { margin-bottom: 20px; }
        label { display: block; margin-bottom: 5px; color: #374151; font-size: 14px; }
        input { width: 100%; padding: 10px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 16px; }
        button { width: 100%; padding: 12px; background: #3b82f6; color: white; border: none; border-radius: 4px; font-size: 16px; cursor: pointer; }
        button:hover { background: #2563eb; }
        .error { color: #ef4444; margin-top: 10px; font-size: 14px; display: none; }
        .info { background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 20px; color: #92400e; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="login-box">
            <h1>Administration CMS</h1>
            
            <div class="info">
                ⚠️ Le CMS nécessite un serveur pour fonctionner. Pour modifier votre site, utilisez AWEMA Studio.
            </div>
            
            <form id="loginForm">
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" id="email" value="admin@site.com" required>
                </div>
                
                <div class="form-group">
                    <label>Mot de passe</label>
                    <input type="password" id="password" required>
                </div>
                
                <button type="submit">Se connecter</button>
                
                <div class="error" id="error">Email ou mot de passe incorrect</div>
            </form>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 14px; color: #6b7280;">
                <p><strong>Pour modifier votre site :</strong></p>
                <ol style="margin-top: 10px; padding-left: 20px;">
                    <li>Retournez sur AWEMA Studio</li>
                    <li>Connectez-vous à votre compte</li>
                    <li>Modifiez votre site</li>
                    <li>Exportez et redéployez sur Netlify</li>
                </ol>
            </div>
        </div>
    </div>
    
    <script>
        // Simple validation côté client
        const PASSWORD = '${password}';
        
        document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const pass = document.getElementById('password').value;
            const error = document.getElementById('error');
            
            if (email === 'admin@site.com' && pass === PASSWORD) {
                // Montrer un message
                alert('Le CMS nécessite un serveur pour fonctionner. Utilisez AWEMA Studio pour modifier votre site.');
            } else {
                error.style.display = 'block';
            }
        });
    </script>
</body>
</html>`,
    
    files: []
  };
}