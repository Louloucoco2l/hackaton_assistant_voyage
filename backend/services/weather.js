const axios = require('axios');
require('dotenv').config();

// Utilisez CommonJS si c'est ce que votre backend utilise
const API_KEY = process.env.OPENWEATHER_API_KEY;

const getWeatherByCity = async (cityName) => {
  try {
    console.log(`Recherche de la météo pour ${cityName} avec la clé API: ${API_KEY.substring(0, 3)}...`);

    // Étape 1: Géocodage pour obtenir lat/lon
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      console.log(`Aucune donnée géographique trouvée pour: ${cityName}`);
      // Retourner des données par défaut plutôt que de lever une erreur
      return {
        city: cityName,
        temperature: 0,
        description: "Information non disponible",
        icon: "01d",
        humidity: 0,
        windSpeed: 0,
        coordinates: { lat: 0, lon: 0 }
      };
    }

    const { lat, lon } = geoResponse.data[0];
    console.log(`Coordonnées pour ${cityName}: lat=${lat}, lon=${lon}`);

    // Étape 2: Obtenir les données météo avec lat/lon
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    );

    console.log(`Données météo reçues pour ${cityName}`);

    return {
      city: cityName,
      temperature: weatherResponse.data.main.temp,
      description: weatherResponse.data.weather[0].description,
      icon: weatherResponse.data.weather[0].icon,
      humidity: weatherResponse.data.main.humidity,
      windSpeed: weatherResponse.data.wind.speed,
      coordinates: { lat, lon }
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de la météo pour ${cityName}:`, error.message);
    console.error(`Stack trace:`, error.stack);

    // Retourner des données par défaut plutôt que de propager l'erreur
    return {
      city: cityName,
      temperature: 0,
      description: "Erreur de chargement",
      icon: "01d",
      humidity: 0,
      windSpeed: 0,
      coordinates: { lat: 0, lon: 0 }
    };
  }
};

module.exports = { getWeatherByCity };



// Obtenir les prévisions sur 5 jours TODO
/*
export const getForecastByCity = async (cityName) => {
  try {
    // Étape 1: Géocodage
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error(`Ville non trouvée: ${cityName}`);
    }

    const { lat, lon } = geoResponse.data[0];

    // Étape 2: Obtenir les prévisions
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    );

    // Traiter et formater les données de prévision
    const forecastData = forecastResponse.data.list.map(item => ({
      date: new Date(item.dt * 1000),
      temperature: item.main.temp,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed
    }));

    return forecastData;
  } catch (error) {
    console.error(`Erreur lors de la récupération des prévisions pour ${cityName}:`, error);
    throw error;
  }
};*/
