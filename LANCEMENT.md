# 🚀 Comment lancer AWEMA Studio

## Option 1 : Lancer TOUT le projet (recommandé)
```bash
cd /home/Ganyc/Desktop/awema/awema2
npm run dev
```
Cela lance :
- **Studio** (dashboard) : http://localhost:3000
- **Documentation** : http://localhost:3001
- Tous les autres services

## Option 2 : Lancer SEULEMENT Studio (plus rapide)
```bash
cd /home/Ganyc/Desktop/awema/awema2
npx pnpm@10.12.1 dev --filter @awema/studio
```
- **Studio** (dashboard) : http://localhost:3000

## Option 3 : Depuis le dossier Studio directement
```bash
cd /home/Ganyc/Desktop/awema/awema2/apps/studio
npm run dev
```
- **Studio** (dashboard) : http://localhost:3000

## 📍 URLs importantes

- **Dashboard clients** : http://localhost:3000/dashboard
- **Créer un client** : http://localhost:3000/dashboard/new
- **Page d'accueil** : http://localhost:3000
- **Test API** : http://localhost:3000/test-clients

## ⚠️ En cas de problème

1. Si port déjà utilisé :
```bash
lsof -ti:3000 | xargs kill -9
```

2. Si erreur bcrypt :
```bash
cd /home/Ganyc/Desktop/awema/awema2
npx pnpm@10.12.1 install --force
```

## 🎯 Résumé rapide
Depuis la racine du projet : `npm run dev`
Puis ouvre : http://localhost:3000/dashboard