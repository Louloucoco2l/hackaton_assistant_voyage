import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { getForecastByCity } from './services/weather.js';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { searchFlights, searchAirports, getCityAirport, searchHotels } from './services/amadeusService.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Charger .env avec un chemin absolu
dotenv.config({ path: join(__dirname, '.env') });
// Vérification immédiate de la clé API
console.log('OpenWeather API Key:', process.env.OPENWEATHER_API_KEY ? '✅ Présente' : '❌ Manquante');

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route de test
app.get('/test', (req, res) => {
  res.json({
    message: "Server is running!",
    env: {
      hasOpenWeatherKey: !!process.env.OPENWEATHER_API_KEY,
      keyLength: process.env.OPENWEATHER_API_KEY?.length
    }
  });
});

// 🔹 Chat route (OpenRouter)
app.post('/api/chat', async (req, res) => {
  try {
    console.log('🔑 Clé utilisée :', process.env.OPENROUTER_API_KEY);

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'Assistant de voyage'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages: req.body.messages
      })
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      console.error('Réponse inattendue :', JSON.stringify(data, null, 2));
      return res.status(500).json({ error: 'Réponse inattendue du modèle' });
    }

    res.json({ reply: data.choices[0].message.content });
  } catch (err) {
    console.error('Erreur OpenRouter :', err.message);
    res.status(500).json({ error: 'Erreur avec OpenRouter' });
  }
});


app.get('/api/airports/search/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const airports = await searchAirports(city);
    res.json(airports);
  } catch (error) {
    console.error('Erreur recherche aéroports:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/airports/city/:city', async (req, res) => {
  try {
    const { city } = req.params;
    const airport = await getCityAirport(city);
    res.json(airport);
  } catch (error) {
    console.error('Erreur recherche aéroport:', error);
    res.status(500).json({ error: error.message });
  }
});


// 🔹 Vols Amadeus
app.post('/api/flights', async (req, res) => {
  try {
    const { origin, destination, date, returnDate, adults, children } = req.body;

    let originCode = origin;
    let destinationCode = destination;

    // Si ce n'est pas un code IATA, on cherche le code
    if (origin.length > 3) {
      const originAirport = await getCityAirport(origin);
      if (!originAirport || !originAirport.iataCode) {
        return res.status(400).json({ error: `Aucun aéroport trouvé pour ${origin}` });
      }
      originCode = originAirport.iataCode;
    }
    if (destination.length > 3) {
      const destAirport = await getCityAirport(destination);
      if (!destAirport || !destAirport.iataCode) {
        return res.status(400).json({ error: `Aucun aéroport trouvé pour ${destination}` });
      }
      destinationCode = destAirport.iataCode;
    }

    const flights = await searchFlights({
      origin: originCode,
      destination: destinationCode,
      date,
      returnDate,
      adults,
      children
    });

    res.json({ flights });
  } catch (error) {
    console.error('Erreur recherche vols:', error);
    res.status(500).json({ error: error.message });
  }
});

// meteo
app.get('/api/weather/forecast/:city', async (req, res) => {
  try {
    const { city } = req.params;
    console.log(`📍 Nouvelle requête météo pour: ${city}`);

    if (!process.env.OPENWEATHER_API_KEY) {
      throw new Error('Clé API OpenWeather non configurée');
    }

    const forecast = await getForecastByCity(city);

    if (!forecast || !Array.isArray(forecast)) {
      throw new Error('Format de données météo invalide');
    }

    console.log(`✅ Données météo envoyées pour ${city}`);
    res.json(forecast);

  } catch (error) {
    console.error('❌ Erreur route météo:', error.message);
    res.status(500).json({
      error: 'Erreur lors de la récupération des données météo',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// 🔹 Hôtels Amadeus
app.post('/api/hotels/search', async (req, res) => {
  try {
    const { city, checkInDate, checkOutDate, adults } = req.body;

    const airport = await getCityAirport(city);
    if (!airport || !airport.iataCode) {
      return res.status(400).json({ error: `Aucun aéroport trouvé pour ${city}` });
    }

    const hotels = await searchHotels({
      cityCode: airport.iataCode,
      checkInDate,
      checkOutDate,
      adults
    });

    res.json({ hotels });
  } catch (error) {
    console.error('Erreur recherche hôtels:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Serveur backend lancé sur http://localhost:${port}`);
});

