#!/bin/bash

# Script de test rapide pour le déploiement CMS
# Usage: ./scripts/quick-test.sh

echo "🚀 Test rapide du déploiement AWEMA avec CMS"
echo "============================================"

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que nous sommes dans le bon dossier
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: Exécutez ce script depuis /apps/studio/${NC}"
    exit 1
fi

# 1. Vérifier les variables d'environnement
echo -e "\n${YELLOW}📋 Vérification de la configuration...${NC}"

if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ Fichier .env.local manquant!${NC}"
    echo "   Copiez .env.local.example vers .env.local et configurez-le"
    exit 1
fi

# Vérifier les variables requises
required_vars=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "NETLIFY_AUTH_TOKEN"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if ! grep -q "^$var=" .env.local || grep -q "^$var=.*YOUR_" .env.local; then
        missing_vars+=($var)
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo -e "${RED}❌ Variables manquantes ou non configurées:${NC}"
    printf '%s\n' "${missing_vars[@]}"
    exit 1
fi

echo -e "${GREEN}✅ Configuration OK${NC}"

# 2. Vérifier si le serveur est démarré
echo -e "\n${YELLOW}🔍 Vérification du serveur...${NC}"

if ! curl -s http://localhost:3000 > /dev/null; then
    echo -e "${YELLOW}⚠️  Le serveur n'est pas démarré${NC}"
    echo "   Démarrage du serveur..."
    npm run dev &
    SERVER_PID=$!
    echo "   Attente du démarrage (10s)..."
    sleep 10
else
    echo -e "${GREEN}✅ Serveur actif${NC}"
fi

# 3. Test simple avec curl
echo -e "\n${YELLOW}🧪 Test de déploiement...${NC}"

# Générer un nom unique
SITE_NAME="test-$(date +%s)"
echo "   Nom du site: $SITE_NAME"

# Créer les données de test
cat > /tmp/test-deploy.json <<EOF
{
  "siteId": "$(uuidgen || echo 'test-'$(date +%s))",
  "siteName": "$SITE_NAME",
  "projectData": {
    "settings": {
      "siteName": "Test Plomberie"
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
          "subtitle": "Dépannage 24/7"
        }
      }]
    }],
    "theme": {},
    "businessInfo": {
      "name": "Plomberie Express",
      "phone": "01 23 45 67 89",
      "email": "test@plomberie.fr"
    }
  },
  "plan": "pro"
}
EOF

# Envoyer la requête
echo "   Envoi de la requête..."
RESPONSE=$(curl -s -X POST http://localhost:3000/api/deploy \
  -H "Content-Type: application/json" \
  -d @/tmp/test-deploy.json)

# Analyser la réponse
if echo "$RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ Déploiement réussi!${NC}"
    
    # Extraire les infos
    SITE_URL=$(echo "$RESPONSE" | grep -o '"siteUrl":"[^"]*' | cut -d'"' -f4)
    ADMIN_URL=$(echo "$RESPONSE" | grep -o '"adminUrl":"[^"]*' | cut -d'"' -f4)
    EMAIL=$(echo "$RESPONSE" | grep -o '"email":"[^"]*' | cut -d'"' -f4)
    PASSWORD=$(echo "$RESPONSE" | grep -o '"password":"[^"]*' | cut -d'"' -f4)
    
    echo -e "\n${GREEN}📊 Résultats:${NC}"
    echo "   Site URL: $SITE_URL"
    echo "   Admin URL: $ADMIN_URL"
    echo "   Email: $EMAIL"
    echo "   Password: $PASSWORD"
    
    # Sauvegarder les résultats
    echo "$RESPONSE" > test-results.json
    echo -e "\n${YELLOW}💾 Résultats sauvegardés dans test-results.json${NC}"
    
else
    echo -e "${RED}❌ Échec du déploiement${NC}"
    echo "Réponse:"
    echo "$RESPONSE" | jq . 2>/dev/null || echo "$RESPONSE"
fi

# Nettoyer
rm -f /tmp/test-deploy.json

# Arrêter le serveur si on l'a démarré
if [ ! -z "$SERVER_PID" ]; then
    echo -e "\n${YELLOW}🛑 Arrêt du serveur...${NC}"
    kill $SERVER_PID 2>/dev/null
fi

echo -e "\n${GREEN}✨ Test terminé!${NC}"