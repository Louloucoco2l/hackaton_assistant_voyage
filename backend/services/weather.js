const axios = require('axios');
require('dotenv').config();

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
      return {
        city: cityName,
        temperature: 0,
        description: "Information non disponible",
        icon: "01d",
        humidity: 0,
        windSpeed: 0,
        date: new Date().toISOString().split('T')[0]
      };
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
      date: new Date(weatherResponse.data.dt * 1000).toISOString().split('T')[0]
    };
  } catch (error) {
    console.error(`Erreur lors de la récupération de la météo pour ${cityName}:`, error.message);
    return {
      city: cityName,
      temperature: 0,
      description: "Erreur de chargement",
      icon: "01d",
      humidity: 0,
      windSpeed: 0,
      date: new Date().toISOString().split('T')[0]
    };
  }
};

const getForecastByCity = async (cityName) => {
  try {
    // Étape 1: Géocodage pour obtenir lat/lon
    const geoResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );

    if (!geoResponse.data || geoResponse.data.length === 0) {
      return []; // Retourne un tableau vide en cas d'erreur
    }

    const { lat, lon } = geoResponse.data[0];

    // Étape 2: Obtenir les prévisions
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=fr&appid=${API_KEY}`
    );

    // Traitement des prévisions pour n'avoir qu'une par jour
    const dailyForecasts = [];
    const processedDates = new Set();
    const currentDate = new Date().toISOString().split('T')[0];

    forecastResponse.data.list.forEach(forecast => {
      const date = new Date(forecast.dt * 1000).toISOString().split('T')[0];

      // Ne prendre qu'une prévision par jour et pas celle d'aujourd'hui
      if (!processedDates.has(date) && date !== currentDate) {
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
    return dailyForecasts.slice(0, 5);
  } catch (error) {
    console.error(`Erreur lors de la récupération des prévisions pour ${cityName}:`, error);
    return []; // Retourne un tableau vide en cas d'erreur
  }
};

module.exports = { getWeatherByCity, getForecastByCity };
