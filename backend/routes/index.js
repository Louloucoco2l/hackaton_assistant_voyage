const express = require('express');
const router = express.Router();
const { getWeather } = require('../services/weather');
const fetch = require('node-fetch');

// API bateau (bateau qui flotte pas)
router.get('/api/weather', async (req, res) => {
  const city = req.query.city || 'Paris'; // Ville par défaut : Paris
  try {
    const weather = await getWeather(city);
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la météo' });
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

module.exports = router;