const express = require('express');
const router = express.Router();
const { getWeatherByCity } = require('../services/weather');
// Utiliser node-fetch de façon compatible avec CommonJS
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


router.get('/api/weather/:city', async (req, res) => {
  const { city } = req.params;
  console.log(`Requête météo reçue pour la ville: ${city}`);

  try {
    const currentWeather = await getWeatherByCity(city);
    const forecasts = await getForecastByCity(city);

    res.json({
      current: currentWeather,
      forecasts: forecasts
    });
  } catch (error) {
    console.error(`Erreur sur /api/weather pour ${city}:`, error.message);
    res.status(500).json({
      error: 'Erreur lors de la récupération de la météo',
      details: error.message
    });
  }
});

// API Météo - Ajoutons plus de logs pour le débogage
router.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Paris'; // Ville par défaut : Paris
  console.log(`Requête météo reçue pour la ville: ${city}`);

  try {
    const weather = await getWeatherByCity(city);
    console.log(`Réponse météo pour ${city}:`, weather);
    res.json(weather);
  } catch (error) {
    console.error(`Erreur sur /api/weather pour ${city}:`, error.message);
    res.status(500).json({
      error: 'Erreur lors de la récupération de la météo',
      details: error.message
    });
  }
});


// Endpoint pour récupérer les destinations
router.get('/api/destinations', async (req, res) => {
  try {
    const accessKey = process.env.VITE_UNSPLASH_API_KEY;
    const queries = ['paris', 'barcelona', 'venice', 'greece'];

    const destinations = await Promise.all(
      queries.map(async (query) => {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}&per_page=1`
        );
        const data = await response.json();
        const imageUrl = data.results[0]?.urls?.regular || 'default-image.jpg';

        // Retourne les données pour chaque destination
        switch (query) {
          case 'paris':
            return {
              image: imageUrl,
              name: 'Paris',
              location: 'France',
              price: 250,
              rating: 5,
              bestSeason: 'Printemps',
            };
          case 'barcelona':
            return {
              image: imageUrl,
              name: 'Barcelone',
              location: 'Espagne',
              price: 300,
              rating: 5,
              bestSeason: 'Été',
            };
          case 'venice':
            return {
              image: imageUrl,
              name: 'Venise',
              location: 'Italie',
              price: 350,
              rating: 5,
              bestSeason: 'Automne',
            };
          case 'greece':
            return {
              image: imageUrl,
              name: 'Santorin',
              location: 'Grèce',
              price: 400,
              rating: 4,
              bestSeason: 'Été',
            };
          default:
            return null;
        }
      })
    );

    res.json(destinations);
  } catch (error) {
    console.error('Erreur lors de la récupération des destinations:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;