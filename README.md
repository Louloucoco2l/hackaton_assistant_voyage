# TravelSmart - Assistant Personnel de Voyage

![TravelSmart Logo](https://placehold.co/600x200/5271ff/ffffff?text=TravelSmart&font=montserrat)

## 📋 Description

TravelSmart est un assistant personnel de voyage qui aide les utilisateurs à planifier leurs voyages en fonction de leurs préférences, du budget et des conditions météorologiques. L'application utilise des API externes pour fournir des informations en temps réel 

## 🏗️ Architecture

Le projet est structuré en deux parties principales :
- **Frontend** : Application React avec Vite
- **Backend** : Serveur Node.js avec Express
- **Base de données** : MySQL via WAMP

## 🚀 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- npm 

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/Louloucoco2l/hackaton_assistant_voyage.git
   cd hackaton_assistant_voyage
   ```

2. **Installer les dépendances du backend**
   ```bash
   cd backend
   npm install
   ```

3. **Installer les dépendances du frontend**
   ```bash
   cd ../frontend
   npm install
   ```
   
4. **Les fichiers .env sont inclus dans le dépôt, rien a faire à ce sujet**
## 🖥️ Démarrage

1. **Démarrer le serveur backend**
   ```bash
   cd backend
   node server.js ou npm run dev
   ```
   Le serveur sera accessible à l'adresse : http://localhost:5000

2. **Démarrer l'application frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   L'application sera accessible à l'adresse : http://localhost:5173


## 📁 Structure du Projet
```
hackaton_assistant_voyage/
├── backend/
│   ├── services/
│   │   ├── amadeusService.js
│   │   ├── bookingService.js
│   │   ├── db.js
│   │   ├── firebase.js
│   │   └── weather.js
│   ├── node_modules/
│   ├── package.json
│   ├── package-lock.json
│   ├── test-env.js
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── Accueil.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── ChatAssistant.jsx
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── DestinationCardList.jsx
│   │   │   ├── FloatingChatBot.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HotelSearch.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── PlannerSection.jsx
│   │   │   └── TravelTipsCard.jsx
│   │   │   └── WeatherWidget.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── TravelContext.jsx
│   │   ├── pages/
│   │   │   ├── FlightDetails.jsx
│   │   │   ├── FlightResults.jsx
│   │   │   └── HotelResults.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── firebase.js
│   │   │   └── hotelService.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── Main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── .gitignore

```

## 🔧 Technologies Utilisées

### Frontend
- React
- Vite
- Bootstrap
- Axios

### Backend
- Node.js
- Express
- Dotenv
- Cors

### API Externes
- OpenWeather API
- amadeus pour les vols et hôtels
- firebase 
- OpenRouter (ChatGPT)

## 🧪 Tests

Pour exécuter les tests (si disponibles) :

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test
```

## 📝 Fonctionnalités

- Affichage des conditions météorologiques pour différentes destinations
- Recherche de vols 
- Recherche d'hôtels
- Discussion avec une IA
- Inscription et connexion avec Firebase
- Interface utilisateur intuitive et responsive
- Sélection de destinations populaires


