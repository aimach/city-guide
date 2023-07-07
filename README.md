# City Guide

#lancer le projet
docker compose up

#bug

- Bug front :
  npm install --save-dev @types/react dans le cas ou le package React n'est pas présent.

- Bug des variables d'environnement avec Docker :
  => Variable d'environnement non reconnue à l'utilisation du package 'dotenv'
  => **Résolution** : création d'une ligne 'env_file' dans la partie backend du fichier docker-compose.dev.yml qui indique le chemin jusqu'au fichier .env (situé à la racine du dossier /backend) et suppression de la dépendance 'dotenv'.
- Erreur eslint :
  => Dans le fichier eslintrc.js modifier la valeur de la propieté project en ajoutant /backend/ devant tsconfig `["./backend/tsconfig.json"]`

Cannot find type definition file for 'prop-types'.
The file is in the program because:
Entry point for implicit type library 'prop-types'
dans le fichier tsconfig.json (Frontend et Backend) il manque cette ligne '"types": ["prop-types"]'.
