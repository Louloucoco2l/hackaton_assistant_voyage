import { useState, useEffect } from 'react';
import { weatherService } from '../services/api';
import { useDestination } from '../context/DestinationContext';
import '../styles/WeatherWidget.css';

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [forecasts, setForecasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Utilisation du contexte pour récupérer la destination sélectionnée
  const { selectedDestination } = useDestination();

  // Ville par défaut si aucune n'est sélectionnée
  const city = selectedDestination || 'Paris';

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await weatherService.getWeather(city);

        // Définir les données météo actuelles
        setWeather(response.current);

        // Définir les prévisions
        setForecasts(response.forecasts);

        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de la météo:", err);
        setError("Impossible de charger les données météo");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]); // Recalcul lorsque la ville change

  // Fonction pour formater la date
  const formatDate = (dateStr) => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  return (
    <div className="card shadow-sm h-100 weather-widget">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            Météo à {city}
          </h5>
        </div>

        {loading && <p className="text-center">Chargement...</p>}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && weather && (
          <>
            {/* Météo actuelle */}
            <div className="text-center my-3">
              <div className="d-flex justify-content-center align-items-center">
                <span className="badge bg-primary rounded-pill fs-5">
                  {Math.round(weather.temperature)}°C
                </span>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                  alt={weather.description}
                  className="weather-icon"
                />
              </div>
              <p className="text-capitalize mb-0">{weather.description}</p>
            </div>

            <div className="row mt-3 mb-4">
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

            {/* Prévisions sur 5 jours */}
            {forecasts.length > 0 && (
              <>
                <h6 className="mt-3 mb-3">Prévisions sur 5 jours</h6>
                <div className="d-flex justify-content-between forecast-container">
                  {forecasts.map((forecast, index) => (
                    <div key={index} className="text-center forecast-day">
                      <div className="forecast-date">{formatDate(forecast.date)}</div>
                      <img
                        src={`https://openweathermap.org/img/wn/${forecast.icon}.png`}
                        alt={forecast.description}
                        className="forecast-icon"
                      />
                      <div className="forecast-temp">{Math.round(forecast.temperature)}°C</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
