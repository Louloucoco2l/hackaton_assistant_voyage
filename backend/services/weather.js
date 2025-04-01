import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeatherByCity = async (cityName) => {
  try {
    // Étape 1: Géocodage pour obtenir lat/lon
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      throw new Error(`Ville non trouvée: ${cityName}`);
    }

    const { lat, lon } = geoResponse.data[0];

    // Étape 2: Obtenir les données météo avec lat/lon
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    );

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
    console.error(`Erreur lors de la récupération de la météo pour ${cityName}:`, error);
    throw error;
  }
};

// Obtenir les prévisions sur 5 jours
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
};