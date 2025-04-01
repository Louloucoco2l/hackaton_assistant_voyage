import { useState } from 'react';
import '../styles/DestinationCard.css';
import DestinationCard from './DestinationCard';

const DestinationCard = ({ destination }) => {
  const [imageError, setImageError] = useState(false);

  // Fonction pour gérer les erreurs de chargement d'image
  const handleImageError = () => {
    setImageError(true);
  };

  // Générer une image de dégradé avec le nom de la ville
  const generateGradientImage = () => {
    return (
      <div className="destination-gradient">
        <span className="destination-name-overlay">{destination.name}</span>
      </div>
    );
  };

  return (
    <div className="destination-card">
      <div className="destination-badge">
        <span>❤️ Recommandé</span>
      </div>

      <div className="destination-image-container">
        {imageError || !destination.image ? (
          generateGradientImage()
        ) : (
          <img
            src={destination.image}
            alt={destination.name}
            onError={handleImageError}
            className="destination-image"
          />
        )}
        <div className="destination-overlay">
          <h3 className="destination-name">{destination.name}</h3>
          <p className="destination-country">{destination.country}</p>
        </div>
      </div>

      <div className="destination-icons">
        <span className="destination-icon location-icon">📍</span>
        <span className="destination-icon calendar-icon">📅</span>
      </div>
    </div>
  );
};

export default DestinationCard;