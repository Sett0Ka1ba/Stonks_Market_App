Stock Market App - Application de suivi boursier
Description
Stock Market App est une application web complète permettant aux utilisateurs de suivre les données du marché boursier en temps réel. Cette plateforme offre la possibilité de rechercher des actions, visualiser leurs performances via des graphiques interactifs, et enregistrer des favoris dans un profil utilisateur.
Fonctionnalités clés

Recherche d'actions : Trouvez rapidement des informations sur n'importe quelle action cotée en bourse
Visualisation de données : Consultez les prix actuels, les variations et l'historique des cours
Graphiques interactifs : Analysez les tendances grâce à des graphiques d'évolution des prix
Profil utilisateur : Créez un compte pour personnaliser votre expérience
Gestion des favoris : Enregistrez vos actions préférées pour un accès rapide
Interface responsive : Expérience utilisateur optimisée sur tous les appareils

Technologies utilisées
Frontend

React / TypeScript
React Router pour la navigation
Recharts pour les visualisations graphiques
Axios pour les requêtes API

Backend

Node.js / TypeScript
Express.js comme framework web
MongoDB pour le stockage des données
JWT pour l'authentification

Infrastructure

Docker pour la conteneurisation
Docker Compose pour orchestrer les services

Installation
Prérequis

Node.js (v14 ou supérieur)
npm ou yarn
Docker et Docker Compose
MongoDB

Installation locale

Clonez le dépôt

bashgit clone https://github.com/Sett0Ka1ba/Stonks_Market_App.git
cd Stonks_Market_App

Installation des dépendances du frontend

bashcd frontend
npm install

Installation des dépendances du backend

bashcd ../backend
npm install

Configuration des variables d'environnement

bash# Dans le dossier backend, créez un fichier .env
echo "PORT=5000" > .env
echo "MONGODB_URI=mongodb://localhost:27017/stockmarket" >> .env
echo "JWT_SECRET=votre_secret_jwt_securise" >> .env
echo "STOCK_API_URL=votre_url_api" >> .env
echo "STOCK_API_KEY=votre_cle_api" >> .env

Démarrage de l'application avec Docker

bash# À la racine du projet
docker-compose up --build
Utilisation

Accédez à l'application via votre navigateur à l'adresse http://localhost:3000
Créez un compte utilisateur ou connectez-vous
Recherchez des actions en utilisant leur symbole (ex: AAPL pour Apple)
Consultez les détails et graphiques des actions
Ajoutez des actions à vos favoris pour les retrouver facilement

Structure du projet
.
├── frontend/                 # Code source React/TypeScript
│   ├── public/               # Fichiers statiques
│   └── src/                  # Code source
│       ├── api/              # Services API
│       ├── assets/           # Images et ressources
│       ├── components/       # Composants React
│       └── types/            # Définitions TypeScript
├── backend/                  # Code source Node.js/Express
│   ├── src/                  # Code source
│   │   ├── middleware/       # Middlewares Express
│   │   ├── models/           # Modèles MongoDB
│   │   └── routes/           # Routes API
│   └── dist/                 # Code compilé (généré)
└── docker-compose.yml        # Configuration Docker Compose
Développement
Démarrage en mode développement
Frontend:
bashcd frontend
npm start
Backend:
bashcd backend
npm run dev
Build de production
Frontend:
bashcd frontend
npm run build
Backend:
bashcd backend
npm run build
Contribution
Ce projet étant à but pédagogique, les contributions sont les bienvenues. Pour contribuer:

Forkez le projet
Créez une branche pour votre fonctionnalité (git checkout -b feature/amazing-feature)
Committez vos changements (git commit -m 'Add some amazing feature')
Poussez vers la branche (git push origin feature/amazing-feature)
Ouvrez une Pull Request

Licence
Ce projet est distribué sous licence MIT. Voir le fichier LICENSE pour plus d'informations.
Contact
Votre Nom - [Sett0Ka1ba]
Lien du projet: https://github.com/Sett0Ka1ba/Stonks_Market_App
