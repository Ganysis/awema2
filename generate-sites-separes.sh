#!/bin/bash

# Script pour générer 5 sites séparés sur des ports différents

echo "🚀 GÉNÉRATION DE 5 SITES MÉTIERS SÉPARÉS"
echo "========================================"

# Arrêter tous les processus Node existants sur les ports
for port in 4331 4332 4333 4334 4335; do
    lsof -ti:$port | xargs kill -9 2>/dev/null
done

# Configuration des métiers
declare -A METIERS
METIERS["plombier"]="4331"
METIERS["electricien"]="4332"
METIERS["menuisier"]="4333"
METIERS["macon"]="4334"
METIERS["paysagiste"]="4335"

declare -A NOMS
NOMS["plombier"]="AquaExpert"
NOMS["electricien"]="VoltPro"
NOMS["menuisier"]="BoisMaster"
NOMS["macon"]="BatiPro"
NOMS["paysagiste"]="VertiJardin"

declare -A VILLES
VILLES["plombier"]="Paris"
VILLES["electricien"]="Lyon"
VILLES["menuisier"]="Toulouse"
VILLES["macon"]="Nantes"
VILLES["paysagiste"]="Strasbourg"

declare -A COULEURS
COULEURS["plombier"]="#0066CC"
COULEURS["electricien"]="#FF6600"
COULEURS["menuisier"]="#8B4513"
COULEURS["macon"]="#6B7280"
COULEURS["paysagiste"]="#059669"

# Créer un dossier temporaire pour chaque site
BASE_DIR="/tmp/sites-metiers"
rm -rf $BASE_DIR
mkdir -p $BASE_DIR

for metier in plombier electricien menuisier macon paysagiste; do
    echo ""
    echo "🔧 Génération site $metier..."
    echo "----------------------------"

    # Créer une copie du projet
    SITE_DIR="$BASE_DIR/$metier"
    echo "📁 Copie du projet vers $SITE_DIR..."
    cp -r /home/Ganyc/Desktop/awema/awema2 $SITE_DIR

    # Aller dans le dossier
    cd $SITE_DIR

    # Générer le site avec les bonnes données
    echo "🎨 Application du thème $metier..."
    node generate-complete-site-metier.cjs --metier=$metier --nom=${NOMS[$metier]} --ville=${VILLES[$metier]}

    # Vérifier les couleurs
    echo "🔍 Vérification des couleurs..."
    grep -q "${COULEURS[$metier]}" src/config/theme.json && echo "✅ Couleur OK: ${COULEURS[$metier]}" || echo "❌ Erreur couleur"

    # Lancer le serveur sur le bon port
    PORT=${METIERS[$metier]}
    echo "🚀 Lancement sur port $PORT..."
    npm run dev -- --port $PORT > /tmp/server-$metier.log 2>&1 &
    echo "✅ Site $metier lancé sur http://localhost:$PORT"

    # Attendre que le serveur démarre
    sleep 3
done

echo ""
echo "✨ TOUS LES SITES SONT PRÊTS !"
echo "================================"
echo ""
echo "📌 URLS DES SITES:"
echo "🔧 Plombier:     http://localhost:4331"
echo "⚡ Électricien:  http://localhost:4332"
echo "🪵 Menuisier:    http://localhost:4333"
echo "🧱 Maçon:        http://localhost:4334"
echo "🌿 Paysagiste:   http://localhost:4335"
echo ""
echo "Utilisez Ctrl+C pour arrêter tous les serveurs"

# Garder le script actif
wait