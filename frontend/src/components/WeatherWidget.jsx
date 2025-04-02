import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [city, setCity] = useState('Paris');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        // Notez le changement ici: passage du paramètre dans l'URL
        const response = await axios.get(`/api/weather/${city}`);

        // Prendre seulement les informations météo actuelles
        setWeather({
          temperature: response.data.current.temperature,
          description: response.data.current.description,
          icon: response.data.current.icon,
          humidity: response.data.current.humidity,
          windSpeed: response.data.current.windSpeed
        });

        setLoading(false);
      } catch (err) {
        console.error("Erreur lors du chargement de la météo:", err);
        setError("Impossible de charger les données météo");
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="card shadow-sm h-100 weather-widget">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            Météo à <select value={city} onChange={handleCityChange} className="form-select-sm d-inline-block w-auto">
              <option value="Paris">Paris</option>
              <option value="Lyon">Lyon</option>
              <option value="Marseille">Marseille</option>
              <option value="Bordeaux">Bordeaux</option>
            </select>
          </h5>
        </div>

        {loading && <p className="text-center">Chargement...</p>}

        {error && <p className="text-danger text-center">{error}</p>}

        {!loading && !error && weather && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
