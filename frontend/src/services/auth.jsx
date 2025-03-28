import axios from 'axios';
import api from './api';

// Service d'authentification
const authService = {
  // Inscription d'un nouvel utilisateur
  register: async (email, password, name) => {
    try {
      const response = await api.post('/users/register', {
        email,
        password,
        name
      });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  // Connexion d'un utilisateur
  login: async (email, password) => {
    try {
      const response = await api.post('/users/login', {
        email,
        password
      });

      // Stocker le token dans le localStorage
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem('user');
  },

  // Récupérer l'utilisateur actuel
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  // Vérifier si l'utilisateur est connecté
  isLoggedIn: () => {
    const user = authService.getCurrentUser();
    return !!user && !!user.token;
  },

  // Récupérer le token d'authentification
  getToken: () => {
    const user = authService.getCurrentUser();
    return user?.token;
  }
};

// Intercepteur pour ajouter le token aux requêtes
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authService;