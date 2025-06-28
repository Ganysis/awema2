const express = require('express');
const path = require('path');
const fs = require('fs');

// Créer l'application Express
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json());

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'test-cms-export')));

// Route spécifique pour /admin
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-cms-export', 'admin', 'index.html'));
});

// Route pour /admin/*
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'test-cms-export', 'admin', 'index.html'));
});

// Simuler les Netlify Functions localement
// Route d'authentification
app.post('/api/cms/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  // Credentials par défaut pour le test
  const ADMIN_EMAIL = 'admin@site.com';
  const ADMIN_PASSWORD = 'admin123';
  
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: Buffer.from(`${email}:${Date.now()}`).toString('base64'),
      message: 'Connexion réussie'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Identifiants incorrects'
    });
  }
});

// Route de sauvegarde
app.post('/api/cms/save', (req, res) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Non autorisé'
    });
  }
  
  // Sauvegarder les données dans un fichier local
  const data = req.body;
  const dataPath = path.join(__dirname, 'test-cms-export', 'cms-data.json');
  
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  res.json({
    success: true,
    message: 'Données sauvegardées avec succès',
    timestamp: new Date().toISOString()
  });
});

// Route pour récupérer les données sauvegardées
app.get('/api/cms/data', (req, res) => {
  const dataPath = path.join(__dirname, 'test-cms-export', 'cms-data.json');
  
  if (fs.existsSync(dataPath)) {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    res.json(data);
  } else {
    res.status(404).json({ error: 'No data found' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`
🚀 CMS Test Server démarré !

📋 Instructions :
1. Ouvrez http://localhost:${PORT}/admin
2. Connectez-vous avec :
   - Email : admin@site.com
   - Mot de passe : admin123

✅ Le serveur simule les Netlify Functions localement
✅ Les modifications sont sauvegardées dans cms-data.json
✅ Vous pouvez tester toutes les fonctionnalités du CMS

Appuyez sur Ctrl+C pour arrêter le serveur.
  `);
});