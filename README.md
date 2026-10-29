# Morts pour la France en Corse (React + Vite)

## Développement local
Prérequis : Node.js 18 ou plus (https://nodejs.org).

    npm install
    npm run dev

## Build de production
    npm run build

Le dossier `dist/` contient le site final (HTML, CSS, JS statiques).

## Déploiement sur o2switch
1. Lancer `npm run build` sur votre poste.
2. Dans cPanel > Gestionnaire de fichiers, ouvrir `public_html`
   (ou le dossier du sous-domaine).
3. Téléverser le CONTENU du dossier `dist/` (index.html + dossier assets/).
4. Ouvrir le domaine. Aucun Node n'est nécessaire sur le serveur.
