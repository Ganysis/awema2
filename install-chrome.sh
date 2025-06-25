#!/bin/bash

echo "📦 Installation de Google Chrome..."

# Télécharge Chrome
echo "1. Téléchargement de Chrome..."
wget -q -O /tmp/google-chrome-stable_current_amd64.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

# Installe Chrome
echo "2. Installation (nécessite le mot de passe sudo)..."
sudo dpkg -i /tmp/google-chrome-stable_current_amd64.deb

# Corrige les dépendances si nécessaire
echo "3. Correction des dépendances..."
sudo apt-get install -f -y

# Nettoie
rm /tmp/google-chrome-stable_current_amd64.deb

echo "✅ Chrome installé ! Lance-le avec: google-chrome"