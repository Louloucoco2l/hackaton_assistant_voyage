import React, { useState } from 'react';
import { flightService } from '../services/api';

export default function FlightSearch() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!origin || !destination || !date) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await flightService.searchFlights(origin, destination, date);
      setFlights(data.flights);
    } catch (err) {
      setError('Erreur lors de la recherche de vols. Veuillez réessayer.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-4">Recherche de vols</h3>

        <form onSubmit={handleSearch}>
          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="origin" className="form-label">Départ</label>
              <input
                type="text"
                className="form-control"
                id="origin"
                placeholder="Paris"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="destination" className="form-label">Destination</label>
              <input
                type="text"
                className="form-control"
                id="destination"
                placeholder="Londres"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Recherche en cours...' : 'Rechercher des vols'}
            </button>
          </div>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {flights.length > 0 && (
          <div className="mt-4">
            <h4>Résultats ({flights.length})</h4>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Compagnie</th>
                    <th>Départ</th>
                    <th>Arrivée</th>
                    <th>Prix</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {flights.map((flight) => (
                    <tr key={flight.id}>
                      <td>{flight.airline}</td>
                      <td>{flight.departure}</td>
                      <td>{flight.arrival}</td>
                      <td>{flight.price} €</td>
                      <td>
                        <button className="btn btn-sm btn-outline-primary">Sélectionner</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}