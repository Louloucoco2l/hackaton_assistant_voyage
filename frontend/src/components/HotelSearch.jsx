import React, { useState } from 'react';
import { hotelService } from '../services/api';

export default function HotelSearch() {
  const [city, setCity] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!city || !checkIn || !checkOut) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await hotelService.searchHotels(city, checkIn, checkOut);
      setHotels(data.hotels);
    } catch (err) {
      setError('Erreur lors de la recherche d hôtels. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Recherche d'hôtels</h3>

        <form onSubmit={handleSearch}>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="city" className="form-label">Ville</label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Paris"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="checkIn" className="form-label">Arrivée</label>
              <input
                type="date"
                className="form-control"
                id="checkIn"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="checkOut" className="form-label">Départ</label>
              <input
                type="date"
                className="form-control"
                id="checkOut"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Recherche en cours...' : 'Rechercher des hôtels'}
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {hotels.length > 0 && (
          <div className="mt-4">
            <h4>Résultats ({hotels.length})</h4>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              {hotels.map((hotel) => (
                <div className="col" key={hotel.id}>
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{hotel.name}</h5>
                      <div className="mb-2">
                        {'★'.repeat(hotel.stars)}
                      </div>
                      <p className="card-text">
                        <strong>{hotel.price} € </strong>
                        <span className="text-muted">/ nuit</span>
                      </p>
                      <p className="card-text">
                        <span className="badge bg-success">{hotel.rating}/10</span>
                      </p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-sm btn-outline-primary w-100">
                        Voir les détails
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}