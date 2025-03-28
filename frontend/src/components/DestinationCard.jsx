import { useState } from 'react';
import { Tag, MapPin, Calendar } from 'lucide-react';

const DestinationCard = ({ image, name, location, price, rating, bestSeason }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="card text-white shadow overflow-hidden border-0 position-relative h-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'pointer', backgroundColor: '#000' }}
    >
      <div className="ratio ratio-4x3">
        <img src={image} alt={name} className="object-fit-cover w-100 h-100" />
      </div>

      {/* Gradient overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
        }}
      />

      {/* Recommandé tag */}
      <div className="position-absolute top-0 start-0 m-3">
        <div className="bg-white text-primary rounded-pill px-3 py-1 d-flex align-items-center small fw-medium shadow-sm">
          <Tag size={12} className="me-1" />
          Recommandé
        </div>
      </div>

      {/* Info texte en bas */}
      <div className="position-absolute bottom-0 w-100 p-3">
        <h5 className="fw-bold mb-1">{name}</h5>
        <div className="d-flex align-items-center text-white-50 small mb-2">
          <MapPin size={16} className="me-1" />
          {location}
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi bi-star-fill me-1 ${i < rating ? 'text-warning' : 'text-secondary'}`}
                style={{ fontSize: '0.9rem' }}
              ></i>
            ))}
          </div>
          <div className="d-flex align-items-center small">
            <Calendar size={16} className="me-1" />
            {bestSeason}
          </div>
        </div>

        <div className={`transition fade ${isHovered ? 'show' : ''}`}>
          <div className="d-flex justify-content-between align-items-center pt-2 border-top mt-2">
            <div>
              <span className="h5 fw-bold">{price} €</span>
              <span className="small ms-1">/ personne</span>
            </div>
            <button className="btn btn-sm btn-primary">Explorer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
