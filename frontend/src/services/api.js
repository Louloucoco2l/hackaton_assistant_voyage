// src/services/api.js
import axios from 'axios';

// Création d'une instance axios avec une URL de base
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Service pour la météo
export const weatherService = {
  getWeather: async (city) => {
    try {
      const response = await api.get(`/weather?city=${city}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données météo:', error);
      throw error;
    }
  }
};

// Service pour les vols
export const flightService = {
  searchFlights: async (origin, destination, date) => {
    try {
      const response = await api.get(`/flights?origin=${origin}&destination=${destination}&date=${date}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche de vols:', error);
      throw error;
    }
  }
};

// Service pour les hôtels
export const hotelService = {
  searchHotels: async (city, checkIn, checkOut) => {
    try {
      const response = await api.get(`/hotels?city=${city}&checkIn=${checkIn}&checkOut=${checkOut}`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la recherche d\'hôtels:', error);
      throw error;
    }
  }
};

export default api;
