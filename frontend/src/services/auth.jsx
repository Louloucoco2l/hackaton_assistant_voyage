import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebase";
import api from './api';

// Service d'authentification
const authService = {
  // Inscription d'un nouvel utilisateur avec Firebase + MySQL
  register: async (email, password, name) => {
    try {
      // 1. Créer l'utilisateur dans Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Enregistrer l'utilisateur dans MySQL via votre API
      const response = await api.post('/users', {
        id: user.uid,
        email: user.email,
        displayName: name
      });

      // 3. Obtenir le token d'identification Firebase
      const idToken = await user.getIdToken();

      // 4. Stocker les informations utilisateur dans localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        name,
        token: idToken
      };
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  },

  // Connexion d'un utilisateur avec Firebase
  login: async (email, password) => {
    try {
      // 1. Connexion via Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Mettre à jour la date de dernière connexion dans MySQL
      await api.put(`/users/${user.uid}/login`);

      // 3. Obtenir le token d'identification Firebase
      const idToken = await user.getIdToken();

      // 4. Récupérer les informations utilisateur depuis votre API
      const userResponse = await api.get(`/users/${user.uid}`);

      // 5. Stocker les informations utilisateur dans localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        name: userResponse.data.display_name,
        token: idToken
      };
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  },

  // Connexion avec Google
  loginWithGoogle: async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Vérifier si l'utilisateur existe déjà dans MySQL, sinon le créer
      try {
        await api.get(`/users/${user.uid}`);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          await api.post('/users', {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          });
        } else {
          throw error;
        }
      }

      // Mettre à jour la date de dernière connexion
      await api.put(`/users/${user.uid}/login`);

      // Obtenir le token d'identification Firebase
      const idToken = await user.getIdToken();

      // Stocker les informations utilisateur dans localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
        token: idToken
      };
      localStorage.setItem('user', JSON.stringify(userData));

      return userData;
    } catch (error) {
      console.error("Erreur de connexion avec Google:", error);
      throw error;
    }
  },

  // Déconnexion
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      throw error;
    }
  },

  // Réinitialisation du mot de passe
  resetPassword: async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error("Erreur de réinitialisation du mot de passe:", error);
      throw error;
    }
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
  },

  // Rafraîchir le token
  refreshToken: async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const newToken = await currentUser.getIdToken(true);
        const user = authService.getCurrentUser();
        if (user) {
          user.token = newToken;
          localStorage.setItem('user', JSON.stringify(user));
        }
        return newToken;
      } catch (error) {
        console.error("Erreur lors du rafraîchissement du token:", error);
        throw error;
      }
    }
    return null;
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

// Intercepteur pour gérer les erreurs d'authentification
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si l'erreur est 401 (non autorisé) et que nous n'avons pas déjà essayé de rafraîchir le token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Essayer de rafraîchir le token
        const newToken = await authService.refreshToken();

        if (newToken) {
          // Mettre à jour le token dans la requête originale
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Si le rafraîchissement échoue, déconnecter l'utilisateur
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default authService;