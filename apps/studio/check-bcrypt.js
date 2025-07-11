const bcrypt = require('bcryptjs');

// Le mot de passe généré
const password = "A>an>D{k1*m_\!j(R";

// Vérifier que le hachage fonctionne
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Erreur:", err);
    return;
  }
  
  console.log("Mot de passe original:", password);
  console.log("Hash bcrypt généré:", hash);
  console.log("Commence par $2:", hash.startsWith('$2'));
  console.log("Longueur du hash:", hash.length);
  
  // Vérifier que le hash peut être vérifié
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error("Erreur de vérification:", err);
      return;
    }
    console.log("Vérification réussie:", result);
  });
});
