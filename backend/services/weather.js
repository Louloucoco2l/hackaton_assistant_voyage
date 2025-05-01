import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getForecastByCity = async (cityName) => {
  try {
    if (!API_KEY) {
      throw new Error('Clé API OpenWeather manquante');
    }

    // 1. Géocodage
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error(`Ville non trouvée: ${cityName}`);
    }

    const { lat, lon } = geoResponse.data[0];

    // 2. Prévisions météo
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    );

    const dailyForecasts = [];
    const processedDates = new Set();

    // Traitement des données de prévision
    forecastResponse.data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];

      if (!processedDates.has(date)) {
        processedDates.add(date);

        // Vérification de l'existence des propriétés
        const temperature = forecast.main?.temp ?? 0;
        const condition = forecast.weather?.[0]?.main ?? 'Unknown';
        const description = forecast.weather?.[0]?.description ?? 'Description non disponible';
        const humidity = forecast.main?.humidity ?? 0;
        const windSpeed = forecast.wind?.speed ?? 0;

        dailyForecasts.push({
          date,
          temperature: Math.round(temperature),
          condition,
          description,
          humidity,
          windSpeed: Math.round(windSpeed)
        });
      }
    });

    return dailyForecasts.slice(0, 5);

  } catch (error) {
    console.error('Erreur dans getForecastByCity:', error);
    if (error.response) {
      console.error('Détails de l\'erreur API:', {
        status: error.response.status,
        data: error.response.data
      });
    }
    throw error;
  }
};