import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDestination } from '../context/DestinationContext';
import '../styles/DestinationCard.css';

const DestinationCard = ({ destination, onClick }) => {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card destination-card h-100" onClick={onClick}>
        <div className="badge bg-primary bg-opacity-10 text-primary position-absolute m-2">
          ❤️ Recommandé
        </div>
        <div className="destination-image-container">
          {destination.image ? (
            <img
              src={destination.image}
              alt={destination.name}
              className="card-img-top destination-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://via.placeholder.com/300x200/6c757d/ffffff?text=${destination.name}`;
              }}
            />
          ) : (
            <div className="destination-gradient">
              <span className="destination-name-overlay">{destination.name}</span>
            </div>
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
    </div>
  );
};

const DestinationCardList = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedDestination } = useDestination();

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/api/destinations');
        setDestinations(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des destinations:', error);
        // Données de secours en cas d'erreur
        setDestinations([
          { id: 1, name: 'Paris', country: 'France', image: 'https://placehold.co/600x400?text=Paris' },
          { id: 2, name: 'Londres', country: 'Royaume-Uni', image: 'https://placehold.co/600x400?text=Londres' },
          { id: 3, name: 'Rome', country: 'Italie', image: 'https://placehold.co/600x400?text=Rome' },
          { id: 4, name: 'Barcelone', country: 'Espagne', image: 'https://placehold.co/600x400?text=Barcelone' },
          { id: 5, name: 'Amsterdam', country: 'Pays-Bas', image: 'https://placehold.co/600x400?text=Amsterdam' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const handleDestinationClick = (destination) => {
    setSelectedDestination(destination.name);
    // Faire défiler jusqu'à la section météo
    document.querySelector('.weather-widget')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold mb-3 px-3 py-2 rounded-pill">
            DESTINATIONS
          </span>
          <h2 className="fw-bold">Destinations populaires</h2>
          <p className="text-muted">
            Laissez-vous inspirer par nos destinations les plus appréciées et commencez à planifier votre prochain voyage.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={() => handleDestinationClick(destination)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default DestinationCardList;