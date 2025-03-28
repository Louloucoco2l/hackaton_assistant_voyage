const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Importer les routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuration des vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Route pour l'API météo (OpenWeather)
app.get('/api/weather', async (req, res) => {
  try {
    const { city } = req.query;
    // Ici, tu intégreras l'API OpenWeather
    // Pour l'instant, retournons des données fictives
    res.json({
      city,
      temperature: 22,
      description: 'Ensoleillé',
      humidity: 65
    });
  } catch (error) {
    console.error('Erreur météo:', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des données météo' });
  }
});

// Route pour la recherche de vols
app.get('/api/flights', async (req, res) => {
  try {
    const { origin, destination, date } = req.query;
    // intégration API Skyscanner ou similaire TODO
    // Pour l'instant, données fictives TODO
    res.json({
      flights: [
        { id: 1, airline: 'Air France', departure: '08:00', arrival: '10:00', price: 120 },
        { id: 2, airline: 'Lufthansa', departure: '10:30', arrival: '12:30', price: 150 },
        { id: 3, airline: 'British Airways', departure: '14:00', arrival: '16:00', price: 135 }
      ]
    });
  } catch (error) {
    console.error('Erreur vols:', error.message);
    res.status(500).json({ error: 'Erreur lors de la recherche de vols' });
  }
});

// Route pour la recherche d'hôtels
app.get('/api/hotels', async (req, res) => {
  try {
    const { city, checkIn, checkOut } = req.query;
    // Ici, tu intégreras l'API Booking ou similaire
    // Pour l'instant, retournons des données fictives
    res.json({
      hotels: [
        { id: 1, name: 'Grand Hôtel', stars: 4, price: 120, rating: 8.7 },
        { id: 2, name: 'Hôtel Central', stars: 3, price: 85, rating: 8.2 },
        { id: 3, name: 'Luxury Palace', stars: 5, price: 210, rating: 9.1 }
      ]
    });
  } catch (error) {
    console.error('Erreur hôtels:', error.message);
    res.status(500).json({ error: 'Erreur lors de la recherche d\'hôtels' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;





