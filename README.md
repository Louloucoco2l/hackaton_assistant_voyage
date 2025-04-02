# TravelSmart - Assistant Personnel de Voyage

![TravelSmart Logo](https://placehold.co/600x200/5271ff/ffffff?text=TravelSmart&font=montserrat)

## 📋 Description

TravelSmart est un assistant personnel de voyage qui aide les utilisateurs à planifier leurs voyages en fonction de leurs préférences, du budget et des conditions météorologiques. L'application utilise des API externes pour fournir des informations en temps réel sur la météo et propose des données simulées pour les vols et les hôtels.

## 🏗️ Architecture

Le projet est structuré en deux parties principales :
- **Frontend** : Application React avec Vite
- **Backend** : Serveur Node.js avec Express
- **Base de données** : MySQL via WAMP

## 🚀 Installation

### Prérequis
- Node.js (v14 ou supérieur)
- WAMP (pour MySQL)
- npm ou yarn

### Étapes d'installation

1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-username/hackaton_assistant_voyage.git
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

4. **Configurer les variables d'environnement**
   
   Créer un fichier `.env` dans le dossier `backend` :
   ```
   PORT=5000
   OPENWEATHER_API_KEY=votre_clé_openweather
   SKYSCANNER_API_KEY=votre_clé_skyscanner
   BOOKING_API_KEY=votre_clé_booking
   FIREBASE_API_KEY=votre_clé_firebase
   ```

5. **Configurer la base de données**
   - Démarrer WAMP
   - Accéder à phpMyAdmin (généralement http://localhost/phpmyadmin)
   - Créer une base de données nommée `travelsmart`
   - Importer le fichier SQL fourni dans `backend/database/travelsmart.sql` (si disponible)

## 🖥️ Démarrage

1. **Démarrer le serveur backend**
   ```bash
   cd backend
   node server.js
   ```
   Le serveur sera accessible à l'adresse : http://localhost:5000

2. **Démarrer l'application frontend**
   ```bash
   cd frontend
   npm run dev
   ```
   L'application sera accessible à l'adresse : http://localhost:5173

## 🌐 API Endpoints

### Météo
- `GET /api/weather?city=Paris` - Obtenir les données météo pour une ville

### Vols (données simulées)
- `GET /api/flights` - Obtenir la liste des vols disponibles
- `GET /api/flights?departure=Paris&destination=Rome` - Filtrer les vols par départ et destination

### Hôtels (données simulées)
- `GET /api/hotels` - Obtenir la liste des hôtels disponibles
- `GET /api/hotels?city=Paris` - Filtrer les hôtels par ville

### Destinations
- `GET /api/destinations` - Obtenir la liste des destinations populaires

## 📁 Structure du Projet
```
hackaton_assistant_voyage/
├── backend/
│   ├── node_modules/
│   ├── public/
│   │   ├── images/
│   │   └── javascripts/
│   ├── routes/
│   │   ├── index.js
│   │   └── users.js
│   ├── services/
│   │   ├── weather.js
│   │   ├── db.js
│   │   └── firebase.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AboutSection.jsx
│   │   │   ├── Accueil.jsx
│   │   │   ├── AuthModal.jsx
│   │   │   ├── BudgetCalculator.jsx
│   │   │   ├── DestinationCard.jsx
│   │   │   ├── DestinationCardList.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── FlightSearch.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── HotelSearch.jsx
│   │   │   ├── PlannerSection.jsx
│   │   │   └── WeatherWidget.jsx
│   │   ├── pages/
│   │   │   ├── Auth.jsx
│   │   │   └── Search.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── auth.jsx
│   │   │   └── firebase.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── Destinationcards.css
│   │   │   ├── index.css
│   │   │   ├── style.css
│   │   │   └── WeatherWidget.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── package.json
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
- MySQL2
- Dotenv
- Cors

### API Externes
- OpenWeather API
- (Données simulées pour Skyscanner et Booking)

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
- Recherche de vols (simulée)
- Recherche d'hôtels (simulée)
- Interface utilisateur intuitive et responsive
- Sélection de destinations populaires

## 🔜 Prochaines Étapes

- Intégration d'API réelles pour les vols et hôtels
- Système d'authentification utilisateur
- Fonctionnalités de réservation
- Optimisation mobile
- Tests automatisés


