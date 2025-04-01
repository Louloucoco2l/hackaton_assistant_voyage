import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDestination } from '../context/DestinationContext';
import '../styles/WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utiliser le contexte pour accéder à la destination sélectionnée
  const { selectedDestination } = useDestination();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/weather/${selectedDestination}`);
        setWeather(response.data);
        setError(null);
      } catch (err) {
        console.error('Erreur lors de la récupération de la météo:', err);
        setError('Impossible de charger les données météo');
      } finally {
        setLoading(false);
      }
    };

    if (selectedDestination) {
      fetchWeather();
    }
  }, [selectedDestination]);

  if (loading) {
    return (
      <div className="card shadow-sm h-100">
        <div className="card-body text-center p-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card shadow-sm h-100">
        <div className="card-body text-center p-4">
          <div className="text-danger">
            <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm h-100 weather-widget">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">Météo à {weather.city}</h5>
          <span className="badge bg-primary rounded-pill">{Math.round(weather.temperature)}°C</span>
        </div>

        <div className="text-center my-3">
          <img
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="weather-icon"
          />
          <p className="text-capitalize mb-0">{weather.description}</p>
        </div>

        <div className="row mt-3">
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-droplet-fill text-primary me-2"></i>
              <span>Humidité: {weather.humidity}%</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="bi bi-wind text-primary me-2"></i>
              <span>Vent: {weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;