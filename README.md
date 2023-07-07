# City Guide

- Bug des variables d'environnement avec Docker :
  => Variable d'environnement non reconnue à l'utilisation du package 'dotenv'
  => **Résolution** : création d'une ligne 'env_file' dans la partie backend du fichier docker-compose.dev.yml qui indique le chemin jusqu'au fichier .env (situé à la racine du dossier /backend) et suppression de la dépendance 'dotenv'.
- Erreur eslint :
  => Dans le fichier eslintrc.js modifier la valeur de la propieté project en ajoutant /backend/ devant tsconfig `["./backend/tsconfig.json"]`
