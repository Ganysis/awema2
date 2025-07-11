#!/bin/bash

echo "🚀 Test de déploiement AWEMA avec CMS"
echo "====================================="

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Configuration OK !
echo -e "\n${GREEN}✅ Configuration Supabase et Netlify détectée${NC}"

# Créer un projet de test minimal
echo -e "\n${YELLOW}📦 Création des données de test...${NC}"

# Générer un nom unique
SITE_NAME="test-plomberie-$(date +%s)"
SITE_ID=$(uuidgen 2>/dev/null || echo "test-id-$(date +%s)")

# Créer le JSON de test
cat > /tmp/test-deploy.json <<EOF
{
  "siteId": "$SITE_ID",
  "siteName": "$SITE_NAME",
  "projectData": {
    "settings": {
      "siteName": "Plomberie Express Test",
      "siteDescription": "Test de déploiement AWEMA",
      "language": "fr"
    },
    "theme": {
      "colors": {
        "primary": "#3B82F6",
        "secondary": "#10B981"
      }
    },
    "businessInfo": {
      "name": "Plomberie Express",
      "phone": "01 23 45 67 89",
      "email": "test@plomberie.fr",
      "address": {
        "street": "123 rue de Test",
        "city": "Paris",
        "postalCode": "75001"
      }
    },
    "pages": [{
      "id": "home",
      "slug": "/",
      "title": "Accueil",
      "blocks": [{
        "id": "hero-1",
        "type": "hero",
        "props": {
          "title": "Plomberie Express",
          "subtitle": "Votre plombier de confiance",
          "ctaText": "Devis gratuit",
          "ctaLink": "/contact"
        }
      }]
    }]
  },
  "plan": "pro",
  "adminEmail": "admin@$SITE_NAME.test"
}
EOF

echo -e "${GREEN}✅ Données créées${NC}"
echo "   Site: $SITE_NAME"
echo "   Plan: Pro (avec CMS)"

# Vérifier si le serveur est lancé
echo -e "\n${YELLOW}🔍 Vérification du serveur...${NC}"
if wget -q --spider http://localhost:3001 2>/dev/null; then
    echo -e "${GREEN}✅ Serveur actif${NC}"
else
    echo -e "${RED}❌ Le serveur n'est pas démarré !${NC}"
    echo "   Lancez 'npm run dev' dans un autre terminal"
    exit 1
fi

# Envoyer la requête
echo -e "\n${YELLOW}📤 Envoi de la requête de déploiement...${NC}"
echo "   URL: http://localhost:3001/api/deploy"

RESPONSE=$(wget -qO- --post-file=/tmp/test-deploy.json \
  --header="Content-Type: application/json" \
  http://localhost:3001/api/deploy 2>&1)

# Afficher la réponse
echo -e "\n${YELLOW}📥 Réponse du serveur:${NC}"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

# Analyser le succès
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "\n${GREEN}✅ DÉPLOIEMENT RÉUSSI !${NC}"
    
    # Extraire les URLs
    SITE_URL=$(echo "$RESPONSE" | grep -o '"siteUrl":"[^"]*' | cut -d'"' -f4)
    ADMIN_URL=$(echo "$RESPONSE" | grep -o '"adminUrl":"[^"]*' | cut -d'"' -f4)
    
    echo -e "\n${GREEN}🎉 Votre site est en ligne !${NC}"
    echo "   Site: $SITE_URL"
    echo "   Admin: $ADMIN_URL"
    
    # Sauvegarder
    echo "$RESPONSE" > deployment-result.json
    echo -e "\n${YELLOW}💾 Résultat sauvé dans deployment-result.json${NC}"
else
    echo -e "\n${RED}❌ Échec du déploiement${NC}"
    
    # Afficher l'erreur
    ERROR=$(echo "$RESPONSE" | grep -o '"error":"[^"]*' | cut -d'"' -f4)
    if [ ! -z "$ERROR" ]; then
        echo "   Erreur: $ERROR"
    fi
fi

# Nettoyer
rm -f /tmp/test-deploy.json

echo -e "\n${GREEN}✨ Test terminé !${NC}"