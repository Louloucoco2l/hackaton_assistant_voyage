import { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, CloudSun, Loader } from 'lucide-react';
import axios from 'axios';

export default function WeatherWidget({ destination }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (destination && expanded) {
      fetchWeatherData();
    }
  }, [destination, expanded]);

const fetchWeatherData = async () => {
  setLoading(true);
  setError(null);
  try {
    console.log(`🔍 Recherche météo pour: ${destination}`);
    const response = await axios.get(
      `http://localhost:5000/api/weather/forecast/${encodeURIComponent(destination)}`
    );

    if (!response.data || !Array.isArray(response.data)) {
      throw new Error('Format de données invalide');
    }

    console.log('📊 Données reçues:', response.data);
    setWeatherData(response.data);

  } catch (err) {
    console.error("❌ Erreur météo:", err);
    const errorMessage = err.response?.data?.details ||
                        err.response?.data?.error ||
                        err.message ||
                        "Impossible de charger les données météo";
    setError(errorMessage);
    console.error('Détails de l\'erreur:', {
      status: err.response?.status,
      data: err.response?.data
    });
  } finally {
    setLoading(false);
  }
};

  const getIcon = (condition) => {
    switch (condition?.toLowerCase()) {
      case 'clear':
        return <Sun className="text-warning mb-1" size={20} />;
      case 'clouds':
        return <Cloud className="text-secondary mb-1" size={20} />;
      case 'rain':
        return <CloudRain className="text-info mb-1" size={20} />;
      case 'partly cloudy':
        return <CloudSun className="text-primary mb-1" size={20} />;
      default:
        return <Sun className="text-muted mb-1" size={20} />;
    }
  };

  const handleToggle = () => {
    if (destination) {
      setExpanded(!expanded);
    } else {
      alert("Veuillez d'abord entrer une destination.");
    }
  };

  return (
    <div className="mt-3 ms-2">
      <div onClick={handleToggle} style={{ cursor: 'pointer' }} className="d-flex align-items-center">
        <Sun className="text-warning me-2" size={18} />
        <span className="text-muted small fw-semibold">Voir la météo sur 5 jours</span>
      </div>

      {expanded && (
        <div className="card mt-3 shadow-sm border-0 px-3 py-2" style={{ maxWidth: '100%' }}>
          <div className="card-body p-2">
            <h6 className="card-title fw-bold text-capitalize mb-3">
              Prévisions à {destination}
            </h6>

            {loading && (
              <div className="text-center py-3">
                <Loader className="animate-spin" size={24} />
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {weatherData && (
              <div className="d-flex flex-wrap justify-content-start gap-4">
                {weatherData.map((day, index) => (
                  <div
                    key={index}
                    className="text-center px-3 py-2 border rounded bg-light"
                    style={{ minWidth: '100px' }}
                  >
                    <div className="fw-semibold">
                      {new Date(day.date).toLocaleDateString('fr-FR', { weekday: 'long' })}
                    </div>
                    <div>{getIcon(day.condition)}</div>
                    <div className="fw-bold">{Math.round(day.temperature)}°C</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}