import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { flightService } from '../services/api';

export default function FlightResults() {
  const [searchParams] = useSearchParams();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [cheapest, setCheapest] = useState(null);
  const [fastest, setFastest] = useState(null);
  const [best, setBest] = useState(null);

  const origin = searchParams.get('origin') || 'PAR';
  const destination = searchParams.get('destination');
  const dateDepart = searchParams.get('dateDepart');

  useEffect(() => {
    const toMinutes = (duration) => {
      const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      return hours * 60 + minutes;
    };

    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);

        // Validation des paramètres
        if (!origin || !destination || !dateDepart) {
          throw new Error('Paramètres de recherche incomplets');
        }

        const data = await flightService.searchFlights({
          origin,
          destination,
          date: dateDepart,
          returnDate: searchParams.get('dateRetour'),
          adults: parseInt(searchParams.get('voyageurs') || '1'),
          children: parseInt(searchParams.get('enfants') || '0')
        });

        if (!data || data.length === 0) {
          setError('Aucun vol trouvé pour ces critères');
          return;
        }

        setFlights(data);

        // Calcul des meilleurs vols
        const sortedByPrice = [...data].sort((a, b) =>
          parseFloat(a.price.total) - parseFloat(b.price.total)
        );

        const sortedByDuration = [...data].sort((a, b) =>
          toMinutes(a.itineraries[0].duration) - toMinutes(b.itineraries[0].duration)
        );

        setCheapest(sortedByPrice[0]);
        setFastest(sortedByDuration[0]);
        setBest(calculateBestFlight(data));

      } catch (err) {
        console.error('Erreur:', err);
        setError(err.message || 'Erreur lors de la recherche des vols');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [origin, destination, dateDepart]);


    const toMinutes = (duration) => {
      if (!duration || typeof duration !== 'string') return 0;

      // Cas format ISO 8601 (ex: "PT2H30M")
      if (duration.startsWith('PT')) {
        const match = duration.match(/PT(\d+H)?(\d+M)?/);
        if (!match) return 0;
        const hours = match[1] ? parseInt(match[1].replace('H', '')) : 0;
        const minutes = match[2] ? parseInt(match[2].replace('M', '')) : 0;
        return hours * 60 + minutes;
      }

      // Cas format "HH:MM"
      if (duration.includes(':')) {
        const [hours, minutes] = duration.split(':').map(Number);
        return hours * 60 + minutes;
      }

      // Sinon, retourne 0
      return 0;
    };

    const calculateFlightScore = (flight) => {
      // Prix (plus c'est bas, meilleur c'est)
      const priceScore = 1000 - parseFloat(flight.price.total);

      // Durée du vol (plus c'est court, meilleur c'est)
      const durationInMinutes = toMinutes(flight.duration);
      const durationScore = 1000 - durationInMinutes;

      // Nombre d'escales (moins il y en a, meilleur c'est)
      const stopScore = 1000 - (flight.numberOfStops * 200);

      // Score final (moyenne pondérée)
      return (priceScore * 0.4) + (durationScore * 0.4) + (stopScore * 0.2);
    };

    const calculateBestFlight = (flights) => {
      return flights.reduce((best, current) => {
        const currentScore = calculateFlightScore(current);
        const bestScore = best ? calculateFlightScore(best) : -Infinity;
        return currentScore > bestScore ? current : best;
      }, null);
    };


  return (
    <div className="container my-5">
      <h2 className="mb-4">Résultats des vols</h2>

      <div className="row mb-4 text-center">
        <div className="col-md-4">
          <div className="p-3 border rounded shadow-sm">
            <div className="text-muted">Le meilleur</div>
            <div className="fs-4 fw-bold text-success">{best?.price.total || '--'} €</div>
            <small className="text-muted">{best?.itineraries[0].duration.replace('PT', '').toLowerCase() || '--'}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded shadow-sm">
            <div className="text-muted">Le moins cher</div>
            <div className="fs-4 fw-bold text-primary">{cheapest?.price.total || '--'} €</div>
            <small className="text-muted">{cheapest?.itineraries[0].duration.replace('PT', '').toLowerCase() || '--'}</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="p-3 border rounded shadow-sm">
            <div className="text-muted">Le plus rapide</div>
            <div className="fs-4 fw-bold text-danger">{fastest?.price.total || '--'} €</div>
            <small className="text-muted">{fastest?.itineraries[0].duration.replace('PT', '').toLowerCase() || '--'}</small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-9">
          {loading && <p>Chargement des vols...</p>}
          {error && <div className="alert alert-danger">{error}</div>}

          {flights.length === 0 && !loading && !error && (
            <p className="text-muted">Aucun vol trouvé.</p>
          )}

          {flights.map((flight, index) => (
            <div className="card mb-4 shadow-sm" key={index}>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-3 text-center">
                    <h5 className="fw-bold mb-1">{flight.carrierCode}</h5>
                    <span className="badge bg-light text-dark">{flight.itineraries[0].segments.length === 1 ? 'Direct' : `${flight.itineraries[0].segments.length - 1} escale(s)`}</span>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-between">
                      <div>
                        <strong>{flight.itineraries[0].segments[0].departure.at.slice(11, 16)}</strong> - {flight.itineraries[0].segments[0].departure.iataCode}
                      </div>
                      <div>{flight.itineraries[0].duration.replace('PT', '').toLowerCase()}</div>
                      <div>
                        <strong>{flight.itineraries[0].segments.at(-1).arrival.at.slice(11, 16)}</strong> - {flight.itineraries[0].segments.at(-1).arrival.iataCode}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 text-center">
                    <div className="fs-4 fw-bold text-primary">{flight.price.total} €</div>
                    <button className="btn btn-outline-primary mt-2">Voir →</button>
                    <div className="text-muted small mt-1">
                      Ce billet est non-remboursable et non-modifiable
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-3">
          <div className="card mb-3">
            <img src="https://via.placeholder.com/250x140?text=Hotel+Deal" className="card-img-top" alt="pub hotel" />
            <div className="card-body text-center">
              <h6 className="card-title">Trouvez votre hôtel</h6>
              <p className="card-text small">Comparez les meilleures offres sur Booking, Expedia, et plus.</p>
              <a href="#" className="btn btn-sm btn-primary">Découvrir</a>
            </div>
          </div>

          <div className="card mb-3">
            <img src="https://via.placeholder.com/250x140?text=Location+Voiture" className="card-img-top" alt="pub voiture" />
            <div className="card-body text-center">
              <h6 className="card-title">Louez une voiture</h6>
              <p className="card-text small">Voitures à partir de 20€/jour. Réservez maintenant !</p>
              <a href="#" className="btn btn-sm btn-outline-primary">Réserver</a>
            </div>
          </div>

          <div className="card mb-3">
            <img src="https://via.placeholder.com/250x140?text=Assurance+Voyage" className="card-img-top" alt="pub assurance" />
            <div className="card-body text-center">
              <h6 className="card-title">Assurance Voyage</h6>
              <p className="card-text small">Protégez votre voyage avec notre assurance premium.</p>
              <a href="#" className="btn btn-sm btn-success">En savoir plus</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
