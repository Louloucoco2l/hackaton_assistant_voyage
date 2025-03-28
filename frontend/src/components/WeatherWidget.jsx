import { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

const WeatherWidget = ({ destination = "Paris" }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: 22,
    condition: 'sunny',
    humidity: 45,
    windSpeed: 12,
    forecast: [
      { day: 'Lun', temp: 22, condition: 'sunny' },
      { day: 'Mar', temp: 23, condition: 'sunny' },
      { day: 'Mer', temp: 20, condition: 'cloudy' },
      { day: 'Jeu', temp: 18, condition: 'rainy' },
      { day: 'Ven', temp: 19, condition: 'cloudy' },
    ],
  });

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={24} className="text-warning" />;
      case 'cloudy':
        return <Cloud size={24} className="text-secondary" />;
      case 'rainy':
        return <CloudRain size={24} className="text-primary" />;
      case 'snowy':
        return <CloudSnow size={24} className="text-info" />;
      default:
        return <Sun size={24} className="text-warning" />;
    }
  };

  return (
    <Card className="shadow h-100">
      <Card.Body>
        <Card.Title>Météo à {destination}</Card.Title>
        <p className="text-muted mb-4">Prévisions pour votre voyage</p>

        <div className="d-flex align-items-center mb-4">
          <div className="me-4">
            {getWeatherIcon(weatherData.condition)}
          </div>
          <div>
            <div className="h3 mb-0">{weatherData.temperature}°C</div>
            <small className="text-muted text-capitalize">
              {weatherData.condition === 'sunny' ? 'Ensoleillé' :
               weatherData.condition === 'cloudy' ? 'Nuageux' :
               weatherData.condition === 'rainy' ? 'Pluvieux' : 'Neigeux'}
            </small>
          </div>
          <div className="ms-auto text-end">
            <div>
              <small className="text-muted me-1">Humidité :</small>
              <strong>{weatherData.humidity}%</strong>
            </div>
            <div>
              <small className="text-muted me-1">Vent :</small>
              <strong>{weatherData.windSpeed} km/h</strong>
            </div>
          </div>
        </div>

        <Row className="text-center">
          {weatherData.forecast.map((day, index) => (
            <Col key={index}>
              <div className="border rounded p-2 mb-2">
                <div className="fw-medium">{day.day}</div>
                <div className="my-1">{getWeatherIcon(day.condition)}</div>
                <div className="fw-bold">{day.temp}°</div>
              </div>
            </Col>
          ))}
        </Row>

        <hr />
        <p className="text-muted small mb-0">
          Planifiez vos activités en fonction de la météo. TravelSmart vous recommandera les meilleures journées pour chaque activité.
        </p>
      </Card.Body>
    </Card>
  );
};

export default WeatherWidget;
