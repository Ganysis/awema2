#!/bin/bash

# =====================================================
# SCRIPT D'INSTALLATION AUTOMATIQUE SUPABASE CMS
# =====================================================

echo "========================================="
echo "Installation du CMS Supabase - Production"
echo "========================================="

# Vérifier que le CLI Supabase est installé
if ! command -v supabase &> /dev/null; then
    echo "❌ Le CLI Supabase n'est pas installé."
    echo "Installez-le avec : npm install -g supabase"
    exit 1
fi

# Vérifier les variables d'environnement
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_KEY" ]; then
    echo "❌ Variables d'environnement manquantes."
    echo "Assurez-vous que SUPABASE_URL et SUPABASE_SERVICE_KEY sont définies."
    echo ""
    echo "Exemple :"
    echo "export SUPABASE_URL='https://votre-projet.supabase.co'"
    echo "export SUPABASE_SERVICE_KEY='votre-service-key'"
    exit 1
fi

echo "✅ Configuration détectée :"
echo "   URL : $SUPABASE_URL"
echo ""

# Demander confirmation
read -p "Voulez-vous continuer l'installation ? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Installation annulée."
    exit 1
fi

# Exécuter le script SQL
echo ""
echo "📝 Exécution du script SQL..."
echo "Cela va créer :"
echo "  - 9 tables (sites, users, content, media, versions, sessions, audit_logs, backups, form_submissions)"
echo "  - 4 fonctions de sécurité"
echo "  - Politiques RLS complètes"
echo "  - Triggers automatiques"
echo "  - Utilisateur admin de test"
echo ""

# Créer un fichier temporaire avec les informations de connexion
TEMP_CONFIG=$(mktemp)
cat > "$TEMP_CONFIG" << EOF
{
  "url": "$SUPABASE_URL",
  "serviceKey": "$SUPABASE_SERVICE_KEY"
}
EOF

# Exécuter le script SQL via le CLI
supabase db push --db-url "$SUPABASE_URL" < scripts/setup-supabase-production.sql

# Vérifier le résultat
if [ $? -eq 0 ]; then
    echo "✅ Script SQL exécuté avec succès !"
else
    echo "❌ Erreur lors de l'exécution du script SQL"
    rm -f "$TEMP_CONFIG"
    exit 1
fi

# Nettoyer
rm -f "$TEMP_CONFIG"

echo ""
echo "========================================="
echo "✅ INSTALLATION TERMINÉE AVEC SUCCÈS !"
echo "========================================="
echo ""
echo "📋 Récapitulatif :"
echo "  - Tables créées : 9"
echo "  - Fonctions de sécurité : 4"
echo "  - RLS activé sur toutes les tables"
echo "  - Rate limiting intégré"
echo "  - Audit logs automatiques"
echo ""
echo "👤 Utilisateur de test créé :"
echo "  - Email : admin@admin.fr"
echo "  - Mot de passe : admin"
echo "  - Rôle : admin"
echo ""
echo "🔒 Fonctionnalités de sécurité :"
echo "  - Mots de passe hashés avec bcrypt (10 rounds)"
echo "  - Protection contre brute force (5 tentatives max)"
echo "  - Sessions sécurisées avec tokens SHA256"
echo "  - Verrouillage de compte après échecs répétés"
echo "  - Audit logs de toutes les actions"
echo "  - RLS pour isolation multi-tenant"
echo ""
echo "📝 Prochaines étapes :"
echo "  1. Testez la connexion avec l'utilisateur admin"
echo "  2. Créez vos propres sites et utilisateurs"
echo "  3. Configurez les domaines dans Netlify"
echo "  4. Déployez vos premiers sites !"
echo ""
echo "💡 Documentation : /docs/ARCHITECTURE-FINALE-CMS.md"
echo "========================================="