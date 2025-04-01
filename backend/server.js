import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Configuration
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Routes API
app.get('/api/weather/:city', async (req, res) => {
  try {
    const { city } = req.params;

    // Récupérer les coordonnées de la ville
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OPENWEATHER_API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      return res.status(404).json({ message: 'Ville non trouvée' });
    }

    const { lat, lon } = geoResponse.data[0];

    // Récupérer les données météo actuelles
    const currentWeatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${OPENWEATHER_API_KEY}`
    );

    // Récupérer les prévisions sur 5 jours
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${OPENWEATHER_API_KEY}`
    );

    // Formater les données météo actuelles
    const currentWeather = {
      city: currentWeatherResponse.data.name,
      temperature: currentWeatherResponse.data.main.temp,
      description: currentWeatherResponse.data.weather[0].description,
      icon: currentWeatherResponse.data.weather[0].icon,
      humidity: currentWeatherResponse.data.main.humidity,
      windSpeed: currentWeatherResponse.data.wind.speed,
      date: new Date(currentWeatherResponse.data.dt * 1000).toISOString().split('T')[0]
    };

    // Formater les prévisions sur 5 jours
    // OpenWeather renvoie des prévisions toutes les 3 heures, nous prenons une prévision par jour
    const dailyForecasts = [];
    const processedDates = new Set();

    forecastResponse.data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];

      // Ne prendre qu'une prévision par jour
      if (!processedDates.has(date) && date !== currentWeather.date) {
        processedDates.add(date);
        dailyForecasts.push({
          date,
          temperature: forecast.main.temp,
          description: forecast.weather[0].description,
          icon: forecast.weather[0].icon,
          humidity: forecast.main.humidity,
          windSpeed: forecast.wind.speed
        });
      }
    });

    // Limiter à 5 jours maximum
    const forecasts = dailyForecasts.slice(0, 5);

    res.json({
      current: currentWeather,
      forecasts
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des données météo:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour les destinations populaires
app.get('/api/destinations', (req, res) => {
  // Données statiques pour les destinations populaires
  const destinations = [
    { id: 1, name: 'Paris', country: 'France' },
    { id: 2, name: 'Londres', country: 'Royaume-Uni' },
    { id: 3, name: 'Rome', country: 'Italie' },
    { id: 4, name: 'Barcelone', country: 'Espagne' },
    { id: 5, name: 'Amsterdam', country: 'Pays-Bas' }
  ];

  res.json(destinations);
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});